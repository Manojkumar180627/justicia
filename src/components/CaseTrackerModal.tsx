import React, { useState } from 'react';
import {
  X,
  FolderGit2,
  Search,
  Calendar,
  Building2,
  Users,
  FileText,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_CASES } from '../data/legalData';
import { CaseRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface CaseTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseTrackerModal: React.FC<CaseTrackerModalProps> = ({ isOpen, onClose }) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseRecord>(MOCK_CASES[0]);

  if (!isOpen) return null;

  const filteredCases = MOCK_CASES.filter(
    (c) =>
      c.cnrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.includes(searchQuery) ||
      c.petitioner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.respondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.court.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="case-tracker-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="case-tracker-modal-container"
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
              📂
            </div>
            <div>
              <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-wide text-[#F3F0E8]">
                {t.caseTracker.modalTitle}
              </h2>
              <p className="text-xs text-[#CBB184] font-medium tracking-wider uppercase">
                {t.caseTracker.modalSubtitle}
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

        {/* Content Body */}
        <div
          className={`flex-1 overflow-hidden flex flex-col md:flex-row ${
            isDark ? 'bg-[#080D1D]' : 'bg-[#F7F7F8]'
          }`}
        >
          {/* Left Case List */}
          <div
            className={`w-full md:w-80 border-r flex flex-col overflow-hidden max-h-[40vh] md:max-h-none ${
              isDark
                ? 'bg-[#111A2C] border-[#2A3950]'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            <div className={`p-3 border-b ${isDark ? 'border-[#2A3950]' : 'border-[#E5E7EB]'}`}>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t.caseTracker.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl focus:outline-hidden ${
                    isDark
                      ? 'bg-[#080D1D] text-[#F3F0E8] border border-[#2A3950] focus:border-[#CBB184]'
                      : 'bg-gray-50 text-gray-800 border border-gray-200 focus:border-[#C9A227]'
                  }`}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-500/10 scrollbar-thin">
              {filteredCases.map((cs) => {
                const isSelected = selectedCase.cnrNumber === cs.cnrNumber;
                return (
                  <button
                    key={cs.cnrNumber}
                    onClick={() => setSelectedCase(cs)}
                    className={`w-full text-left p-3.5 transition-colors ${
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                        {cs.caseType} {cs.caseNumber}/{cs.year}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          cs.status === 'Disposed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : cs.status === 'Listed'
                            ? 'bg-amber-500/20 text-[#CBB184] border border-[#CBB184]/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {cs.status}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-bold mt-2 truncate ${
                        isSelected
                          ? isDark
                            ? 'text-[#CBB184]'
                            : 'text-[#080F20]'
                          : isDark
                          ? 'text-[#F3F0E8]'
                          : 'text-gray-800'
                      }`}
                    >
                      {cs.petitioner}
                    </h4>
                    <p
                      className={`text-[11px] truncate ${
                        isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                      }`}
                    >
                      vs. {cs.respondent}
                    </p>
                    <span className="text-[10px] text-gray-400 block mt-1">
                      {cs.court}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Case Detailed Docket View */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#1A2436] border-[#2A3950]'
                  : 'bg-white border-[#E5E7EB] shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#CBB184]/20 text-[#CBB184] border border-[#CBB184]/30">
                    CNR: {selectedCase.cnrNumber}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-400">
                    Stage: {selectedCase.stage}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedCase.status === 'Disposed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-[#CBB184] border border-[#CBB184]/30'
                  }`}
                >
                  Status: {selectedCase.status}
                </span>
              </div>

              <h3
                className={`font-playfair text-xl sm:text-2xl font-bold mt-4 ${
                  isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                }`}
              >
                {selectedCase.petitioner}
              </h3>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-[#CBB184]' : 'text-[#856404]'
                }`}
              >
                VERSUS
              </p>
              <h4
                className={`font-playfair text-lg sm:text-xl font-bold ${
                  isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                }`}
              >
                {selectedCase.respondent}
              </h4>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-[#111A2C] border-[#2A3950]'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    Court & Bench
                  </span>
                  <span
                    className={`font-semibold block mt-0.5 ${
                      isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                    }`}
                  >
                    {selectedCase.court} ({selectedCase.bench})
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    Next Hearing / Listing Date
                  </span>
                  <span className="font-semibold text-[#CBB184] block mt-0.5">
                    {selectedCase.nextHearingDate}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider block ${
                      isDark ? 'text-[#91A0B8]' : 'text-gray-500'
                    }`}
                  >
                    Coram / Presiding Bench
                  </span>
                  <span
                    className={`font-semibold block mt-0.5 ${
                      isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                    }`}
                  >
                    {selectedCase.coram}
                  </span>
                </div>
              </div>
            </div>

            {/* Case History Timeline */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#1A2436] border-[#2A3950]'
                  : 'bg-white border-[#E5E7EB] shadow-xs'
              }`}
            >
              <h4
                className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                  isDark ? 'text-[#F3F0E8]' : 'text-[#080F20]'
                }`}
              >
                Proceedings & Cause List Registry History
              </h4>

              <div className="relative pl-6 border-l-2 border-[#CBB184]/40 space-y-4 text-xs">
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#CBB184] ring-4 ring-[#1A2436]" />
                  <span className="text-[10px] text-gray-400 font-mono">
                    Next Listing: {selectedCase.nextHearingDate}
                  </span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F3F0E8]' : 'text-gray-800'
                    }`}
                  >
                    Listed for Final Arguments before Division Bench
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-gray-500 ring-4 ring-[#1A2436]" />
                  <span className="text-[10px] text-gray-400 font-mono">Previous Hearing: 14 Oct 2025</span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F3F0E8]' : 'text-gray-800'
                    }`}
                  >
                    Rejoinder affidavit filed by Petitioner Counsel; Registry indexed.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-gray-500 ring-4 ring-[#1A2436]" />
                  <span className="text-[10px] text-gray-400 font-mono">Institution: 04 Jan 2024</span>
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F3F0E8]' : 'text-gray-800'
                    }`}
                  >
                    Writ Petition Registered & Notice Issued to Respondent Union/State.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
