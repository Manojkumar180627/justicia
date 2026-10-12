import React, { useState } from 'react';
import {
  X,
  Scale,
  Search,
  BookMarked,
  Filter,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { STATUTES_DATA } from '../data/legalData';
import { LegalStatute } from '../types';
import { useSettings } from '../context/SettingsContext';

interface LawsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (item: { title: string; category: 'Statute'; reference: string }) => void;
}

export const LawsModal: React.FC<LawsModalProps> = ({ isOpen, onClose, onBookmark }) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [selectedStatute, setSelectedStatute] = useState<LegalStatute>(STATUTES_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Criminal', 'Civil', 'Commercial', 'Technology'];

  const filteredStatutes = STATUTES_DATA.filter((st) => {
    const matchesCategory = selectedCategory === 'All' || st.category === selectedCategory;
    const matchesSearch =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.shortCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (sec: { section: string; title: string }) => {
    navigator.clipboard?.writeText?.(`${sec.section} - ${sec.title}, ${selectedStatute.title}`);
    setCopiedSection(sec.section);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  return (
    <div
      id="laws-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="laws-modal-container"
        className={`w-full max-w-5xl h-[88vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#111A2C] border-[#2A3950] text-[#F3F0E8]'
            : 'bg-white border-[#D1D5DB] text-[#1F2937]'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#080D1D] text-white flex items-center justify-between border-b border-[#2A3950] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A2740] border border-[#CBB184]/40 flex items-center justify-center text-xl">
              ⚖️
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F3F0E8]">
                {t.laws.modalTitle}
              </h2>
              <p className="text-xs text-[#CBB184] font-medium tracking-wider uppercase">
                {t.laws.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div
          className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDark ? 'bg-[#0A1122] border-[#2A3950]' : 'bg-gray-50 border-[#E5E7EB]'
          }`}
        >
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#CBB184] text-[#080D1D] font-bold shadow-xs'
                    : isDark
                    ? 'text-[#91A0B8] hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t.laws.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl focus:outline-hidden ${
                isDark
                  ? 'bg-[#111A2C] text-[#F3F0E8] border border-[#2A3950] focus:border-[#CBB184]'
                  : 'bg-white text-gray-800 border border-gray-200 focus:border-[#C9A227]'
              }`}
            />
          </div>
        </div>

        {/* Body Content */}
        <div
          className={`flex-1 overflow-hidden flex flex-col md:flex-row ${
            isDark ? 'bg-[#080D1D]' : 'bg-[#F7F7F8]'
          }`}
        >
          {/* Statutes list */}
          <div
            className={`w-full md:w-80 border-r flex flex-col overflow-y-auto divide-y scrollbar-thin max-h-[40vh] md:max-h-none ${
              isDark
                ? 'bg-[#111A2C] border-[#2A3950] divide-[#2A3950]/50'
                : 'bg-white border-[#E5E7EB] divide-[#E5E7EB]'
            }`}
          >
            {filteredStatutes.map((st) => {
              const isSelected = selectedStatute.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatute(st)}
                  className={`w-full text-left p-4 transition-colors ${
                    isSelected
                      ? isDark
                        ? 'bg-[#1A2436] border-l-4 border-[#CBB184]'
                        : 'bg-amber-50/70 border-l-4 border-[#C9A227]'
                      : isDark
                      ? 'hover:bg-white/[0.03]'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#CBB184]/20 text-[#CBB184] border border-[#CBB184]/30">
                      {st.shortCode} ({st.year})
                    </span>
                    <span
                      className={`text-[10px] ${
                        isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                      }`}
                    >
                      {st.category}
                    </span>
                  </div>
                  <h4
                    className={`text-xs font-bold mt-1.5 leading-snug ${
                      isSelected
                        ? isDark
                          ? 'text-[#CBB184]'
                          : 'text-[#080F20]'
                        : isDark
                        ? 'text-[#F3F0E8]'
                        : 'text-gray-800'
                    }`}
                  >
                    {st.title}
                  </h4>
                  <p
                    className={`text-[11px] line-clamp-2 mt-1 ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    {st.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Statute Details */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#1A2436] border-[#2A3950]'
                  : 'bg-white border-[#E5E7EB] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#CBB184]/20 text-[#CBB184] border border-[#CBB184]/30">
                    {selectedStatute.category} Law • Act No. of {selectedStatute.year}
                  </span>
                  <h3
                    className={`font-playfair text-2xl font-bold mt-2 ${
                      isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                    }`}
                  >
                    {selectedStatute.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    Enacted by: {selectedStatute.enactedBy} • Total Sections: {selectedStatute.totalSections}
                  </p>
                </div>

                <button
                  onClick={() =>
                    onBookmark({
                      title: selectedStatute.title,
                      category: 'Statute',
                      reference: selectedStatute.shortCode,
                    })
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors shrink-0 ${
                    isDark
                      ? 'bg-[#111A2C] border-[#2A3950] text-[#91A0B8] hover:text-[#F3F0E8]'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 text-[#CBB184]" />
                  <span>Bookmark Act</span>
                </button>
              </div>

              <p
                className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#D0DBEA]' : 'text-gray-700'
                }`}
              >
                {selectedStatute.description}
              </p>
            </div>

            {/* Key Sections Accordion / Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                  }`}
                >
                  Key Sections & Statutory Provisions
                </h4>
                <span
                  className={`text-xs ${
                    isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                  }`}
                >
                  Click copy to extract formal citation
                </span>
              </div>

              {selectedStatute.keySections.map((sec, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#1A2436] border-[#2A3950] hover:border-[#CBB184]/50'
                      : 'bg-white border-[#E5E7EB] hover:border-[#C9A227]/60 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#CBB184]/20 text-[#CBB184] font-bold text-xs">
                        {sec.section}
                      </span>
                      <h5
                        className={`text-xs font-bold ${
                          isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                        }`}
                      >
                        {sec.title}
                      </h5>
                    </div>

                    <button
                      onClick={() => handleCopyCitation(sec)}
                      className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
                        copiedSection === sec.section
                          ? 'text-emerald-400'
                          : isDark
                          ? 'text-[#91A0B8] hover:text-[#CBB184]'
                          : 'text-gray-500 hover:text-[#080F20]'
                      }`}
                    >
                      {copiedSection === sec.section ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <span>Copy Citation</span>
                      )}
                    </button>
                  </div>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-600'
                    }`}
                  >
                    {sec.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
