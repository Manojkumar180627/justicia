import React from 'react';
import { Check, CheckCircle2, ArrowLeft, RotateCcw, Bell, Moon, Sliders, Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SettingsPageProps {
  onBackToDashboard?: () => void;
}

interface LanguageOption {
  key: SupportedLanguage;
  label: string;
  nativeLabel: string;
  region: string;
}

const LANGUAGES: LanguageOption[] = [
  { key: 'en', label: 'English', nativeLabel: 'English', region: 'Pan-India & High Courts' },
  { key: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', region: 'Supreme Court & Official' },
  { key: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', region: 'Madras High Court & State' },
  { key: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', region: 'AP & Telangana High Courts' },
];

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBackToDashboard }) => {
  const { settings, updateSetting, resetDefaults, t, toast } = useSettings();

  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const handleToggle = (key: 'darkMode' | 'compactView' | 'pushNotifications') => {
    updateSetting(key, !settings[key]);
  };

  const handleLanguageChange = (langKey: SupportedLanguage) => {
    updateSetting('language', langKey);
  };

  return (
    <div
      id="justicia-settings-page"
      className={`w-full min-h-[calc(100vh-64px)] flex flex-col font-inter transition-colors duration-300 ${
        isCompact ? 'px-4 sm:px-6 py-5 md:py-8' : 'px-4 sm:px-6 md:px-8 py-8 md:py-12'
      } ${
        isDark
          ? 'bg-[#080D1D] text-[#F3F0E8] selection:bg-[#CBB184]/30 selection:text-[#F3F0E8]'
          : 'bg-[#F7F7F8] text-[#1F2937] selection:bg-[#C9A227]/20 selection:text-[#080F20]'
      }`}
    >
      {/* Centered Constrained Container (900px - 1000px) */}
      <div className="w-full max-w-[1000px] mx-auto flex flex-col">
        {/* Navigation Breadcrumb / Back Action */}
        {onBackToDashboard && (
          <button
            id="settings-back-to-dashboard-btn"
            onClick={onBackToDashboard}
            className={`self-start inline-flex items-center gap-2 text-xs font-medium mb-6 transition-colors duration-200 group ${
              isDark ? 'text-[#91A0B8] hover:text-[#DFC79C]' : 'text-[#6B7280] hover:text-[#080F20]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <span>{t.settings.returnToDashboard}</span>
          </button>
        )}

        {/* Page Header */}
        <header
          id="settings-page-header"
          className={`${isCompact ? 'mb-6 sm:mb-8' : 'mb-10 sm:mb-12'}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#CBB184]/15 text-[#CBB184] border border-[#CBB184]/30">
                  {t.nav.securePortal}
                </span>
                <span className={`text-xs ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}>
                  {t.nav.version}
                </span>
              </div>
              <h1
                id="settings-heading-title"
                className={`font-playfair font-bold tracking-tight leading-tight ${
                  isCompact ? 'text-[24px] sm:text-[28px]' : 'text-[28px] sm:text-[32px]'
                } ${isDark ? 'text-[#F3F0E8]' : 'text-[#1F2937]'}`}
              >
                {t.settings.pageTitle}
              </h1>
              <p
                id="settings-heading-subtitle"
                className={`mt-2 font-normal leading-relaxed ${
                  isCompact ? 'text-[13px] sm:text-[14px]' : 'text-[15px] sm:text-[16px]'
                } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
              >
                {t.settings.pageSubtitle}
              </p>
            </div>

            {/* Quick Reset Button */}
            <button
              id="settings-reset-defaults-btn"
              onClick={resetDefaults}
              className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 shadow-xs ${
                isDark
                  ? 'bg-[#1A2436] hover:bg-[#223046] border-[#2A3950] hover:border-[#CBB184]/60 text-[#91A0B8] hover:text-[#F3F0E8]'
                  : 'bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900'
              }`}
              title="Reset all preferences to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#CBB184]" />
              <span>{t.settings.resetDefaults}</span>
            </button>
          </div>
        </header>

        {/* Settings Sections Container */}
        <div className={`flex flex-col ${isCompact ? 'space-y-6 sm:space-y-8' : 'space-y-10 sm:space-y-12'}`}>
          {/* ========================================================================= */}
          {/* SECTION 1 — APPEARANCE                                                    */}
          {/* ========================================================================= */}
          <section id="settings-section-appearance" aria-labelledby="heading-appearance">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Moon className="w-4 h-4 text-[#CBB184]" />
              <h2
                id="heading-appearance"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#CBB184]"
              >
                {t.settings.appearance}
              </h2>
            </div>

            <div className={`flex flex-col ${isCompact ? 'space-y-2.5' : 'space-y-4'}`}>
              {/* Setting Card 1 — Dark Mode */}
              <div
                id="setting-card-dark-mode"
                className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                  isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
                } ${
                  isDark
                    ? 'bg-[#1A2436] hover:bg-[#1E2B40] border-[#2A3950] hover:border-[#3D5270] shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                    : 'bg-white hover:bg-gray-50/80 border-[#E5E7EB] hover:border-[#D1D5DB] shadow-xs'
                }`}
              >
                <div className="flex flex-col text-left pr-2">
                  <span
                    className={`font-semibold leading-tight transition-colors ${
                      isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                    } ${isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'}`}
                  >
                    {t.settings.darkModeTitle}
                  </span>
                  <span
                    className={`mt-1 leading-snug ${
                      isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                    } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
                  >
                    {t.settings.darkModeSub}
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  id="toggle-dark-mode"
                  type="button"
                  role="switch"
                  aria-checked={settings.darkMode}
                  aria-label="Toggle Dark Mode"
                  onClick={() => handleToggle('darkMode')}
                  className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#CBB184]/40 hover:shadow-[0_0_12px_rgba(203,177,132,0.3)] ${
                    settings.darkMode ? 'bg-[#CBB184]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Setting Card 2 — Compact View */}
              <div
                id="setting-card-compact-view"
                className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                  isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
                } ${
                  isDark
                    ? 'bg-[#1A2436] hover:bg-[#1E2B40] border-[#2A3950] hover:border-[#3D5270] shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                    : 'bg-white hover:bg-gray-50/80 border-[#E5E7EB] hover:border-[#D1D5DB] shadow-xs'
                }`}
              >
                <div className="flex flex-col text-left pr-2">
                  <span
                    className={`font-semibold leading-tight transition-colors ${
                      isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                    } ${isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'}`}
                  >
                    {t.settings.compactViewTitle}
                  </span>
                  <span
                    className={`mt-1 leading-snug ${
                      isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                    } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
                  >
                    {t.settings.compactViewSub}
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  id="toggle-compact-view"
                  type="button"
                  role="switch"
                  aria-checked={settings.compactView}
                  aria-label="Toggle Compact View"
                  onClick={() => handleToggle('compactView')}
                  className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#CBB184]/40 hover:shadow-[0_0_12px_rgba(203,177,132,0.3)] ${
                    settings.compactView ? 'bg-[#CBB184]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                      settings.compactView ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2 — NOTIFICATIONS                                                 */}
          {/* ========================================================================= */}
          <section id="settings-section-notifications" aria-labelledby="heading-notifications">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Bell className="w-4 h-4 text-[#CBB184]" />
              <h2
                id="heading-notifications"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#CBB184]"
              >
                {t.settings.notifications}
              </h2>
            </div>

            {/* Push Notifications Card */}
            <div
              id="setting-card-push-notifications"
              className={`group relative w-full rounded-[16px] border flex items-center justify-between gap-4 transition-all duration-250 ease-out hover:-translate-y-0.5 ${
                isCompact ? 'min-h-[72px] p-4' : 'min-h-[86px] p-5 sm:p-6'
              } ${
                isDark
                  ? 'bg-[#1A2436] hover:bg-[#1E2B40] border-[#2A3950] hover:border-[#3D5270] shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                  : 'bg-white hover:bg-gray-50/80 border-[#E5E7EB] hover:border-[#D1D5DB] shadow-xs'
              }`}
            >
              <div className="flex flex-col text-left pr-2">
                <span
                  className={`font-semibold leading-tight transition-colors ${
                    isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                  } ${isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'}`}
                >
                  {t.settings.pushNotificationsTitle}
                </span>
                <span
                  className={`mt-1 leading-snug ${
                    isCompact ? 'text-[12px] sm:text-[13px]' : 'text-[13px] sm:text-[14px]'
                  } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
                >
                  {t.settings.pushNotificationsSub}
                </span>
              </div>

              {/* Toggle Switch */}
              <button
                id="toggle-push-notifications"
                type="button"
                role="switch"
                aria-checked={settings.pushNotifications}
                aria-label="Toggle Push Notifications"
                onClick={() => handleToggle('pushNotifications')}
                className={`relative shrink-0 w-13 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#CBB184]/40 hover:shadow-[0_0_12px_rgba(203,177,132,0.3)] ${
                  settings.pushNotifications ? 'bg-[#CBB184]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3 — LANGUAGE & REGION                                             */}
          {/* ========================================================================= */}
          <section id="settings-section-language-region" aria-labelledby="heading-language-region">
            <div className="flex items-center gap-2 mb-3 select-none">
              <Globe className="w-4 h-4 text-[#CBB184]" />
              <h2
                id="heading-language-region"
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[2px] text-[#CBB184]"
              >
                {t.settings.languageRegion}
              </h2>
            </div>

            {/* Language Selection Card */}
            <div
              id="setting-card-language-selection"
              className={`w-full rounded-[16px] border flex flex-col transition-all duration-250 ease-out ${
                isCompact ? 'p-4 sm:p-5' : 'p-6 sm:p-7'
              } ${
                isDark
                  ? 'bg-[#1A2436] border-[#2A3950] shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                  : 'bg-white border-[#E5E7EB] shadow-xs'
              }`}
            >
              <div className="mb-4">
                <h3
                  className={`font-semibold leading-tight ${
                    isCompact ? 'text-[14px] sm:text-[15px]' : 'text-[15px] sm:text-[16px]'
                  } ${isDark ? 'text-[#F3F0E8]' : 'text-[#1F2937]'}`}
                >
                  {t.settings.interfaceLanguageTitle}
                </h3>
                <p
                  className={`mt-1 text-[13px] ${
                    isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'
                  }`}
                >
                  {t.settings.interfaceLanguageSub}
                </p>
              </div>

              {/* Segmented Options Button Group */}
              <div
                id="language-options-group"
                role="radiogroup"
                aria-label="Interface Language Selection"
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1"
              >
                {LANGUAGES.map((lang) => {
                  const isSelected = settings.language === lang.key;

                  return (
                    <button
                      key={lang.key}
                      id={`language-option-${lang.key}`}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleLanguageChange(lang.key)}
                      className={`h-[46px] px-4 rounded-xl text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 transition-all duration-250 select-none cursor-pointer focus:outline-hidden ${
                        isSelected
                          ? isDark
                            ? 'bg-[#CBB184]/15 border-2 border-[#CBB184] text-[#F3F0E8] shadow-[0_0_14px_rgba(203,177,132,0.22)] font-semibold'
                            : 'bg-[#C9A227]/10 border-2 border-[#C9A227] text-[#080F20] shadow-xs font-semibold'
                          : isDark
                          ? 'bg-[#111A2C]/70 border border-[#2A3950] text-[#91A0B8] hover:border-[#3D5270] hover:text-[#F3F0E8] hover:bg-[#111A2C]'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <span className="truncate">{lang.nativeLabel}</span>
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 stroke-[2.5] ${
                            isDark ? 'text-[#CBB184]' : 'text-[#C9A227]'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Context Note for Legal Texts */}
              <div
                className={`mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] ${
                  isDark ? 'border-[#2A3950]/60 text-[#91A0B8]' : 'border-gray-100 text-[#6B7280]'
                }`}
              >
                <span>{t.settings.dualDiglotNote}</span>
                <span className="text-[#CBB184] font-medium shrink-0">
                  {t.settings.autoSyncBadge}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Global Floating Toast */}
        {toast && (
          <div
            id="settings-toast-notification"
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              isDark
                ? 'bg-[#111A2C] text-[#F3F0E8] border border-[#CBB184]/70'
                : 'bg-[#080F20] text-white border border-[#C9A227]/50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#CBB184] shrink-0" />
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
