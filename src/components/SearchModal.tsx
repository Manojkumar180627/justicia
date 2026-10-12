import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  BookOpen,
  Scale,
  Landmark,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CONSTITUTION_ARTICLES, STATUTES_DATA, COURT_TIERS, MOCK_CASES } from '../data/legalData';
import { legalSearchEngine } from '../services/legalSearchEngine';
import { useSettings } from '../context/SettingsContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: () => void;
  onSelectStatute: () => void;
  onSelectCourt: () => void;
  onSelectCase: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectStatute,
  onSelectCourt,
  onSelectCase,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Provisions' | 'Articles' | 'Laws' | 'Courts' | 'Cases'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Aggregate results
  const articleResults = CONSTITUTION_ARTICLES.filter(
    (a) =>
      a.number.toLowerCase().includes(query.toLowerCase()) ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).map((a) => ({
    type: 'Articles' as const,
    title: `${a.number}: ${a.title}`,
    subtitle: a.part,
    category: 'Constitution',
    action: onSelectArticle,
  }));

  const statuteResults = STATUTES_DATA.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.shortCode.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  ).map((s) => ({
    type: 'Laws' as const,
    title: s.title,
    subtitle: `${s.shortCode} • ${s.category} • ${s.totalSections} Sections`,
    category: 'Statute',
    action: onSelectStatute,
  }));

  const courtResults = COURT_TIERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
      (c.hindiName && c.hindiName.toLowerCase().includes(query.toLowerCase()))
  ).map((c) => ({
    type: 'Courts' as const,
    title: c.name,
    subtitle: `${c.level} Tier • ${c.presidedBy}`,
    category: 'Judiciary',
    action: onSelectCourt,
  }));

  const caseResults = MOCK_CASES.filter(
    (cs) =>
      cs.cnrNumber.toLowerCase().includes(query.toLowerCase()) ||
      cs.petitioner.toLowerCase().includes(query.toLowerCase()) ||
      cs.respondent.toLowerCase().includes(query.toLowerCase())
  ).map((cs) => ({
    type: 'Cases' as const,
    title: `${cs.petitioner} v. ${cs.respondent}`,
    subtitle: `CNR: ${cs.cnrNumber} • ${cs.court} • ${cs.status}`,
    category: 'Case Record',
    action: onSelectCase,
  }));

  const provisionResults = query.trim().length > 1
    ? legalSearchEngine.search({ query, limit: 10 }).map((res) => ({
        type: 'Provisions' as const,
        title: res.document.title,
        subtitle: `${res.document.act_name} • ${res.document.official_citation}`,
        category: 'Section Provision',
        action: onSelectStatute,
      }))
    : [];

  const allCombined = [...provisionResults, ...articleResults, ...statuteResults, ...courtResults, ...caseResults];

  const displayResults =
    filterType === 'All' ? allCombined : allCombined.filter((item) => item.type === filterType);

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
    >
      <div
        id="search-modal-container"
        className={`w-full max-w-2xl rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#111A2C] border-[#2A3950] text-[#F3F0E8]'
            : 'bg-white border-[#D1D5DB] text-[#1F2937]'
        }`}
      >
        {/* Search input header */}
        <div
          className={`p-4 border-b flex items-center gap-3 ${
            isDark ? 'bg-[#080D1D] border-[#2A3950]' : 'bg-[#080F20] text-white border-white/10'
          }`}
        >
          <Search className="w-5 h-5 text-[#CBB184] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={t.legalSearch.searchPrompt}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400 text-sm focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white p-1 rounded-lg text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div
          className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto scrollbar-none text-xs ${
            isDark ? 'bg-[#0A1122] border-[#2A3950]' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <span
            className={`text-[11px] font-semibold uppercase mr-1 ${
              isDark ? 'text-[#91A0B8]' : 'text-gray-500'
            }`}
          >
            Filter:
          </span>
          {(['All', 'Provisions', 'Articles', 'Laws', 'Courts', 'Cases'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterType === tab
                  ? 'bg-[#CBB184] text-[#080D1D] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#91A0B8] hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-500/10 scrollbar-thin">
          {displayResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-[#CBB184] opacity-80" />
              <p>No legal references found for "{query}".</p>
              <p className="mt-1 text-[11px] opacity-75">
                Try searching "Article 21", "BNS", "High Court", or "CNR".
              </p>
            </div>
          ) : (
            displayResults.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  res.action();
                }}
                className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-amber-50/50'
                }`}
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#CBB184]/20 text-[#CBB184] border border-[#CBB184]/30">
                      {res.category}
                    </span>
                    <h4
                      className={`text-xs font-semibold truncate ${
                        isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                      }`}
                    >
                      {res.title}
                    </h4>
                  </div>
                  <p
                    className={`text-[11px] mt-0.5 truncate ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    {res.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#CBB184] shrink-0 text-xs font-medium">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-3 border-t flex items-center justify-between text-[11px] ${
            isDark ? 'bg-[#080D1D] border-[#2A3950] text-[#91A0B8]' : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}
        >
          <span>Use ⌘K to quickly access search anytime</span>
          <span className="text-[#CBB184]">NJDG + e-Courts Indexed</span>
        </div>
      </div>
    </div>
  );
};
