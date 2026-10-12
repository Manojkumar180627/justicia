import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Settings as SettingsIcon,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { RECENT_NOTIFICATIONS } from '../data/legalData';
import { useSettings } from '../context/SettingsContext';
import { SupportedLanguage } from '../types';

interface TopNavProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenAiBot: () => void;
  isCollapsed: boolean;
}

const LANGUAGE_OPTIONS: { key: SupportedLanguage; label: string; native: string }[] = [
  { key: 'en', label: 'English', native: 'English' },
  { key: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { key: 'te', label: 'Telugu', native: 'తెలుగు' },
  { key: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

export const TopNav: React.FC<TopNavProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenSettings,
  onOpenAiBot,
  isCollapsed,
}) => {
  const { settings, updateSetting, t } = useSettings();
  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(RECENT_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = settings.pushNotifications
    ? notifications.filter((n) => n.unread).length
    : 0;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifPanelOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header
      id="app-top-header"
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
        isCompact ? 'h-[56px]' : 'h-[64px]'
      } ${
        isDark
          ? 'bg-[#080D1D] text-[#F3F0E8] border-b border-[#2A3950]'
          : 'bg-white text-[#1F2937] border-b border-[#E5E7EB] shadow-xs'
      } ${isCollapsed ? 'left-0 lg:left-[76px]' : 'left-0 lg:left-[220px]'}`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Hamburger & Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
          {/* Hamburger Menu Icon */}
          <button
            id="topnav-hamburger-btn"
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl active:scale-95 transition-all duration-200 ${
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div
            id="topnav-search-wrapper"
            className="relative w-full max-w-[320px] sm:max-w-[400px]"
          >
            <div
              onClick={onOpenSearch}
              className={`w-full px-3.5 pl-10 rounded-xl flex items-center justify-between cursor-pointer group transition-all duration-300 ${
                isCompact ? 'h-9 text-xs' : 'h-10 text-xs sm:text-[13px]'
              } ${
                isDark
                  ? 'bg-[#111A2C] text-gray-200 border border-[#2A3950] hover:border-[#CBB184]/50 shadow-inner'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#C9A227]/60 shadow-xs'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenSearch();
                }
              }}
              aria-label={t.topNav.searchPlaceholder}
            >
              <Search
                className={`w-4 h-4 absolute left-3.5 transition-colors ${
                  isDark
                    ? 'text-gray-400 group-hover:text-[#CBB184]'
                    : 'text-gray-400 group-hover:text-[#C9A227]'
                }`}
              />
              <span
                className={`font-normal truncate ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {t.topNav.searchPlaceholder}
              </span>
              <kbd
                className={`hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded ${
                  isDark
                    ? 'text-gray-400 bg-white/5 border border-white/10'
                    : 'text-gray-500 bg-gray-200/70 border border-gray-300'
                }`}
              >
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action + Notifications + User Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Quick AI Bot Launcher Pill */}
          <button
            id="topnav-ai-bot-btn"
            onClick={onOpenAiBot}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-[#1A2740] to-[#111A2E] border border-[#CBB184]/40 text-[#CBB184] hover:border-[#CBB184] hover:shadow-[0_0_12px_rgba(203,177,132,0.25)]'
                : 'bg-amber-50/80 border border-[#C9A227]/50 text-[#856404] hover:bg-amber-100/60'
            }`}
            title="Ask Indian Legal AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="tracking-wide">{t.topNav.aiAssistant}</span>
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative" ref={notifRef}>
            <button
              id="topnav-notifications-btn"
              onClick={() => setNotifPanelOpen(!notifPanelOpen)}
              className={`relative p-2 rounded-xl active:scale-95 transition-all duration-200 ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label={t.topNav.notifications}
              aria-expanded={notifPanelOpen}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span
                  id="topnav-notification-indicator"
                  className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#CBB184] rounded-full ring-2 ring-[#080D1D] animate-pulse"
                />
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notifPanelOpen && (
              <div
                id="topnav-notifications-dropdown"
                className={`absolute right-0 mt-2 w-[min(24rem,calc(100vw-1rem))] rounded-2xl shadow-2xl overflow-hidden z-50 text-left animate-in fade-in zoom-in-95 duration-200 border max-h-[80vh] overflow-y-auto ${
                  isDark
                    ? 'bg-[#111A2C] border-[#2A3950]'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div
                  className={`px-4 py-3 border-b flex items-center justify-between ${
                    isDark
                      ? 'bg-[#0A1122]/90 border-[#2A3950]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-[#CBB184]' : 'text-[#856404]'
                      }`}
                    >
                      {t.topNav.notifications}
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-[#CBB184]/20 text-[#CBB184] px-1.5 py-0.5 rounded-full border border-[#CBB184]/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className={`text-[11px] transition-colors ${
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {t.topNav.markAllRead}
                    </button>
                  )}
                </div>

                <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-500/10 scrollbar-thin">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 transition-colors cursor-pointer ${
                        isDark
                          ? item.unread
                            ? 'bg-white/[0.04] hover:bg-white/[0.07]'
                            : 'hover:bg-white/[0.02]'
                          : item.unread
                          ? 'bg-amber-50/50 hover:bg-amber-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`text-xs font-semibold leading-snug ${
                            isDark ? 'text-[#F3F0E8]' : 'text-[#1F2937]'
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#CBB184] shrink-0 mt-1" />
                        )}
                      </div>
                      <p
                        className={`text-[11px] mt-1 leading-relaxed line-clamp-2 ${
                          isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'
                        }`}
                      >
                        {item.summary}
                      </p>
                      <div
                        className={`flex items-center justify-between mt-2 text-[10px] ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            isDark
                              ? 'bg-white/5 border-white/10 text-gray-300'
                              : 'bg-gray-100 border-gray-200 text-gray-700'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`p-2 border-t text-center ${
                    isDark
                      ? 'border-[#2A3950] bg-[#0A1122] text-[#91A0B8]'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                >
                  <span className="text-[11px] font-medium">
                    National Judicial Data Grid (NJDG) Sync Active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              id="topnav-language-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 select-none cursor-pointer ${
                isDark
                  ? 'bg-[#111A2C] border-[#2A3950] text-gray-200 hover:border-[#CBB184]/70 hover:text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#C9A227]/70 hover:text-gray-900'
              }`}
              title="Change Language"
              aria-label="Change Language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#CBB184]" />
              <span className="hidden sm:inline font-semibold">
                {LANGUAGE_OPTIONS.find((l) => l.key === settings.language)?.native || 'English'}
              </span>
              <span className="sm:hidden font-semibold uppercase">
                {settings.language}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div
                id="topnav-language-dropdown"
                className={`absolute right-0 mt-2 w-44 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150 border ${
                  isDark
                    ? 'bg-[#111A2C] border-[#2A3950] text-[#F3F0E8]'
                    : 'bg-white border-gray-200 text-gray-800'
                }`}
              >
                <div
                  className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider border-b ${
                    isDark ? 'text-gray-400 border-white/5' : 'text-gray-500 border-gray-100'
                  }`}
                >
                  Choose Web Language
                </div>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    id={`topnav-lang-${opt.key}`}
                    onClick={() => {
                      updateSetting('language', opt.key);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
                      settings.language === opt.key
                        ? isDark
                          ? 'bg-[#CBB184]/15 text-[#CBB184] font-semibold'
                          : 'bg-amber-50 text-[#856404] font-semibold'
                        : isDark
                        ? 'hover:bg-white/[0.04] text-gray-300 hover:text-white'
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs">{opt.native}</span>
                      <span className="text-[10px] opacity-70">{opt.label}</span>
                    </div>
                    {settings.language === opt.key && (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Portal Settings Direct Action Button */}
          <button
            id="topnav-settings-btn"
            onClick={onOpenSettings}
            className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-200 select-none ${
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title={t.topNav.portalSettings}
            aria-label={t.topNav.portalSettings}
          >
            <SettingsIcon className="w-5 h-5 text-[#CBB184]" />
            <span className="hidden md:inline text-xs font-medium tracking-wide">
              {t.topNav.portalSettings}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
