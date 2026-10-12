import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Bookmark,
  Settings,
  ChevronRight,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { NavItemKey } from '../types';
import { useSettings } from '../context/SettingsContext';

interface SidebarProps {
  activeTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  hasEnteredPortal?: boolean;
  onStartPortal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  mobileOpen,
  onCloseMobile,
  hasEnteredPortal = true,
  onStartPortal,
}) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;
  const isCompact = settings.compactView;

  const navItems: {
    key: NavItemKey;
    label: string;
    icon: React.ElementType;
    badge?: string;
    route: string;
    isStartItem?: boolean;
  }[] = !hasEnteredPortal
    ? [
        {
          key: 'dashboard' as NavItemKey,
          label: 'Start Portal',
          icon: Sparkles,
          badge: 'START',
          route: '/',
          isStartItem: true,
        },
      ]
    : [
        { key: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard, route: '/dashboard' },
        { key: 'ai_bot', label: t.nav.ai_bot, icon: Bot, badge: 'AI', route: '/ai-legal-bot' },
        { key: 'bookmarks', label: t.nav.bookmarks, icon: Bookmark, route: '/bookmarks' },
        { key: 'settings', label: t.nav.settings, icon: Settings, route: '/settings' },
      ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        id="app-left-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r ${
          isDark
            ? 'bg-[#080F20] text-[#F9FAFB] border-white/10'
            : 'bg-[#0C1527] text-white border-slate-700/50'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[220px]'
        } w-[240px]`}
      >
        {/* Top Logo Area */}
        <div
          id="sidebar-logo-container"
          className="h-[64px] flex items-center justify-between px-4 border-b border-white/10 bg-[#0A1122]/90 select-none"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              id="sidebar-brand-icon"
              className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#1A2740] to-[#111A2E] border border-[#CBB184]/40 flex items-center justify-center text-lg shadow-sm"
              title="Justicia - Indian Legal System"
            >
              ⚖️
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-serif-legal font-bold tracking-[2.5px] text-[15px] text-[#F9FAFB] leading-tight truncate">
                  {t.nav.brandName}
                </span>
                <span className="text-[9px] uppercase tracking-[2px] text-[#CBB184] font-medium leading-tight">
                  {t.nav.brandTag}
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            id="sidebar-mobile-close-btn"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav
          id="sidebar-nav-list"
          className={`flex-1 overflow-y-auto px-2.5 scrollbar-thin ${
            isCompact ? 'py-2.5 space-y-1' : 'py-4 space-y-1.5'
          }`}
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <div key={item.key} className="relative group">
                <button
                  id={`nav-item-${item.key}`}
                  onClick={() => {
                    if (item.isStartItem && onStartPortal) {
                      onStartPortal();
                    } else {
                      onSelectTab(item.key);
                    }
                    if (mobileOpen) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 rounded-xl text-left text-[13px] font-medium transition-all duration-300 ease-out select-none ${
                    isCompact ? 'py-2' : 'py-2.5'
                  } ${
                    isActive
                      ? 'bg-white/[0.08] text-[#F9FAFB] border border-white/[0.15] shadow-sm'
                      : 'text-gray-400 hover:text-[#F9FAFB] hover:bg-white/[0.04] border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Left Accent indicator for active */}
                  {isActive && (
                    <span
                      id={`active-pill-${item.key}`}
                      className="absolute left-1 top-2 bottom-2 w-1 bg-[#CBB184] rounded-full shadow-[0_0_8px_rgba(203,177,132,0.6)]"
                    />
                  )}

                  {/* Icon */}
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 ${
                      isActive
                        ? 'text-[#CBB184] scale-105'
                        : 'text-gray-400 group-hover:text-gray-200 group-hover:scale-105'
                    }`}
                  />

                  {/* Label (if not collapsed or in mobile drawer) */}
                  {(!isCollapsed || mobileOpen) && (
                    <span className="flex-1 truncate tracking-wide text-xs sm:text-[13px]">
                      {item.label}
                    </span>
                  )}

                  {/* AI or Sub-badge */}
                  {item.badge && (!isCollapsed || mobileOpen) && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#CBB184]/20 text-[#CBB184] border border-[#CBB184]/30">
                      {item.badge}
                    </span>
                  )}

                  {/* Right chevron for active item if not collapsed */}
                  {isActive && (!isCollapsed || mobileOpen) && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#CBB184] opacity-80 shrink-0" />
                  )}
                </button>

                {/* Tooltip for collapsed desktop state */}
                {isCollapsed && !mobileOpen && (
                  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1 bg-[#111A2E] text-white text-xs rounded-md shadow-lg border border-white/10 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Bottom Section: Divider + Secure Portal */}
        <div
          id="sidebar-bottom-section"
          className="p-3 border-t border-white/10 bg-[#0A1122]/90 flex flex-col gap-2 select-none"
        >
          {(!isCollapsed || mobileOpen) ? (
            <div className="flex items-center justify-between px-2 py-1 text-gray-400">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CBB184] shrink-0" />
                <span className="text-[11px] tracking-wide text-gray-400 font-medium truncate">
                  {t.nav.securePortal}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">
                {settings.language.toUpperCase()}
              </span>
            </div>
          ) : (
            <div
              className="flex items-center justify-center py-1 text-gray-400"
              title={`${t.nav.securePortal} – 256-bit Encrypted Judicial Network`}
            >
              <ShieldCheck className="w-4 h-4 text-[#CBB184]" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
