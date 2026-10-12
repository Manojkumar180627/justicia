import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  Search,
  BookOpen,
  Scale,
  Landmark,
  FileText,
  Copy,
  Check,
  Download,
  Filter,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BookmarkItem } from '../types';
import { useSettings } from '../context/SettingsContext';

interface BookmarksPageProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onOpenConstitution?: () => void;
  onOpenLaws?: () => void;
  onOpenCourtSystem?: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarks,
  onRemoveBookmark,
  onOpenConstitution,
  onOpenLaws,
  onOpenCourtSystem,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(bookmarks.map((b) => b.category)))];

  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportBookmarks = () => {
    const exportText = bookmarks
      .map(
        (b, i) =>
          `${i + 1}. [${b.category}] ${b.title}\n   Reference: ${b.reference}\n   Saved: ${b.savedDate}\n`
      )
      .join('\n');

    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `justicia-legal-bookmarks-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('constitution') || cat.includes('article')) return Scale;
    if (cat.includes('court') || cat.includes('jurisdiction')) return Landmark;
    if (cat.includes('sanhita') || cat.includes('act') || cat.includes('law')) return BookOpen;
    return FileText;
  };

  return (
    <div
      id="bookmarks-page-root"
      className={`min-h-[calc(100vh-64px)] flex flex-col ${
        isDark ? 'bg-[#080D1D] text-[#F3F0E8]' : 'bg-[#F7F7F8] text-[#1F2937]'
      }`}
    >
      {/* 1. Page Header */}
      <div
        className={`px-6 py-6 border-b sticky top-0 z-10 backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#0A1122]/90 border-[#2A3950]' : 'bg-white/90 border-[#E5E7EB]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1A2740] to-[#111A2E] border border-[#CBB184]/50 flex items-center justify-center text-[#DFC79C] shadow-md">
              <Bookmark className="w-6 h-6 text-[#CBB184]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  className={`font-playfair text-xl sm:text-2xl font-bold tracking-wide ${
                    isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                  }`}
                >
                  SAVED LEGAL REPOSITORY
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#CBB184]/20 text-[#DFC79C] border border-[#CBB184]/40 uppercase tracking-wider">
                  {bookmarks.length} {bookmarks.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm mt-0.5 ${
                  isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                }`}
              >
                Constitutional Articles, Central Statutes, Criminal Codes & Judicial Precedents
              </p>
            </div>
          </div>

          {/* Export / Quick Actions */}
          {bookmarks.length > 0 && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportBookmarks}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-[#111A2C] border-[#2A3950] text-gray-200 hover:text-[#DFC79C] hover:border-[#CBB184]/50'
                    : 'bg-white border-gray-200 text-gray-700 hover:text-[#080F20] hover:border-[#C9A227] shadow-xs'
                }`}
                title="Export saved references to text file"
              >
                <Download className="w-4 h-4 text-[#CBB184]" />
                <span>Export Brief</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved articles, statutory sections, or keywords..."
              className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border transition-all focus:outline-hidden ${
                isDark
                  ? 'bg-[#111A2C] text-white placeholder-gray-500 border-[#2A3950] focus:border-[#CBB184]'
                  : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-[#C9A227] shadow-xs'
              }`}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 text-xs scrollbar-none">
            <span
              className={`font-semibold shrink-0 flex items-center gap-1 text-[11px] ${
                isDark ? 'text-[#91A0B8]' : 'text-gray-500'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-[#CBB184]" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#CBB184] text-[#080D1D] border-[#CBB184] shadow-sm'
                    : isDark
                    ? 'bg-[#111A2C] border-[#2A3950] text-gray-300 hover:text-white hover:border-[#CBB184]/50'
                    : 'bg-white border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-400 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Bookmarks Grid List */}
        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((bm) => {
              const Icon = getCategoryIcon(bm.category);
              return (
                <div
                  key={bm.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group ${
                    isDark
                      ? 'bg-[#111A2C]/90 border-[#2A3950] hover:border-[#CBB184]/70 hover:bg-[#142036]'
                      : 'bg-white border-[#E5E7EB] hover:border-[#C9A227]/70 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Category Pill & Saved Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#CBB184]/20 text-[#DFC79C] border border-[#CBB184]/30">
                        <Icon className="w-3 h-3 text-[#CBB184]" />
                        <span>{bm.category}</span>
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          isDark ? 'text-[#91A0B8]' : 'text-gray-400'
                        }`}
                      >
                        Saved {bm.savedDate}
                      </span>
                    </div>

                    {/* Bookmark Title */}
                    <h3
                      className={`text-sm sm:text-base font-bold tracking-tight leading-snug group-hover:text-[#DFC79C] transition-colors ${
                        isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                      }`}
                    >
                      {bm.title}
                    </h3>

                    {/* Reference / Citation text */}
                    <p
                      className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                        isDark ? 'text-[#91A0B8]' : 'text-gray-600'
                      }`}
                    >
                      {bm.reference}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div
                    className={`mt-5 pt-3.5 border-t flex items-center justify-between gap-2 ${
                      isDark ? 'border-[#2A3950]' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopyCitation(`${bm.title} — ${bm.reference}`, bm.id)
                        }
                        className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title="Copy legal citation to clipboard"
                      >
                        {copiedId === bm.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#CBB184]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Direct Jump Action */}
                      {bm.category.toLowerCase().includes('constitution') && onOpenConstitution && (
                        <button
                          onClick={onOpenConstitution}
                          className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                            isDark
                              ? 'bg-white/5 hover:bg-white/10 text-[#DFC79C]'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                          }`}
                          title="Open in Constitution viewer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Article</span>
                        </button>
                      )}

                      {bm.category.toLowerCase().includes('sanhita') && onOpenLaws && (
                        <button
                          onClick={onOpenLaws}
                          className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                            isDark
                              ? 'bg-white/5 hover:bg-white/10 text-[#DFC79C]'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                          }`}
                          title="Open in Laws repository"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Act</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            className={`p-12 sm:p-16 rounded-3xl border text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-6 ${
              isDark
                ? 'bg-[#0B1325]/70 border-[#2A3950]'
                : 'bg-white border-gray-200 shadow-xs'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#CBB184]/15 border border-[#CBB184]/30 flex items-center justify-center mb-4 text-[#DFC79C]">
              <Bookmark className="w-8 h-8 opacity-70" />
            </div>
            <h3
              className={`font-playfair text-lg sm:text-xl font-bold ${
                isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
              }`}
            >
              {searchQuery || selectedCategory !== 'All'
                ? 'No matching bookmarks found'
                : 'No legal provisions bookmarked yet'}
            </h3>
            <p
              className={`text-xs sm:text-sm max-w-md mt-2 leading-relaxed ${
                isDark ? 'text-[#91A0B8]' : 'text-gray-500'
              }`}
            >
              {searchQuery || selectedCategory !== 'All'
                ? 'Try adjusting your search query or switching the category filter.'
                : 'You can bookmark Constitutional Articles, Central Statutes, and Court Procedural Guides from across the portal for instant retrieval here.'}
            </p>

            {/* Quick Explore CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {onOpenConstitution && (
                <button
                  onClick={onOpenConstitution}
                  className="px-4 py-2 rounded-xl bg-[#CBB184] text-[#080D1D] font-bold text-xs flex items-center gap-2 hover:bg-[#DFC79C] transition-all cursor-pointer shadow-sm"
                >
                  <Scale className="w-3.5 h-3.5 text-[#080D1D]" />
                  <span>Browse Constitution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenLaws && (
                <button
                  onClick={onOpenLaws}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#111A2C] border-[#2A3950] text-gray-200 hover:text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#CBB184]" />
                  <span>Explore Central Acts</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
