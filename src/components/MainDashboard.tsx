import React, { useState } from 'react';
import {
  BookOpen,
  Scale,
  Landmark,
  ArrowRight,
  ShieldAlert,
  Search,
  Sparkles,
  ExternalLink,
  Flame,
  FileCheck2,
  HelpCircle,
} from 'lucide-react';
import { LegalCardItem, NavItemKey, UserPortalSettings, SupportedLanguage } from '../types';

import { useSettings } from '../context/SettingsContext';

interface MainDashboardProps {
  onOpenConstitution: () => void;
  onOpenLaws: () => void;
  onOpenCourtSystem: () => void;
  onOpenSearch: () => void;
  onOpenAiBot: () => void;
  onOpenCaseTracker?: () => void;
  onSelectTab: (tab: NavItemKey) => void;
  settings?: UserPortalSettings;
}

const TRANSLATIONS: Record<
  SupportedLanguage,
  {
    satyameva: string;
    portalSubtitle: string;
    mainTitle: string;
    mainSubtitle: string;
    quickSearch: string;
    reloadPreview: string;
    constitutionTitle: string;
    constitutionSub: string;
    constitutionBadge: string;
    lawsTitle: string;
    lawsSub: string;
    lawsBadge: string;
    courtsTitle: string;
    courtsSub: string;
    courtsBadge: string;
    exploreProvisions: string;
    viewHierarchy: string;
    criminalReforms: string;
    docketStatus: string;
    aiAssistant: string;
  }
> = {
  en: {
    satyameva: 'TRUTH ALONE TRIUMPHS',
    portalSubtitle: 'National Legal Knowledge & Information Repository',
    mainTitle: 'INDIAN LEGAL SYSTEM',
    mainSubtitle:
      'Comprehensive, authoritative access to the Constitutional framework, Central statutes, Bharatiya Sanhitas, and the multi-tiered judicial hierarchy of the Republic of India.',
    quickSearch: 'Instant Citation & Statute Search',
    reloadPreview: 'Reload Preview Effect',
    constitutionTitle: 'CONSTITUTION OF INDIA',
    constitutionSub: 'Explore articles, schedules, amendments and constitutional provisions.',
    constitutionBadge: 'Supreme Law of the Land',
    lawsTitle: 'LAWS OF INDIA',
    lawsSub: 'Browse Indian laws, acts, statutes and legal regulations.',
    lawsBadge: 'Central & State Statutes',
    courtsTitle: 'COURT SYSTEM',
    courtsSub: 'Explore the Supreme Court, High Courts, District Courts and judicial hierarchy.',
    courtsBadge: 'Judicial Hierarchy',
    exploreProvisions: 'Explore Provisions',
    viewHierarchy: 'View Judicial Hierarchy',
    criminalReforms: 'Criminal Law Reforms (2024–26)',
    docketStatus: 'National Case Docket Status',
    aiAssistant: 'Vidhi AI Research Bot',
  },
  hi: {
    satyameva: 'सत्यमेव जयते',
    portalSubtitle: 'राष्ट्रीय विधिक ज्ञान एवं सूचना भंडार',
    mainTitle: 'भारतीय विधिक प्रणाली',
    mainSubtitle:
      'भारत गणराज्य के संवैधानिक ढांचे, केंद्रीय संविधियों, भारतीय संहिताओं और बहुस्तरीय न्यायिक पदानुक्रम तक प्रामाणिक पहुंच।',
    quickSearch: 'त्वरित उद्धरण एवं अधिनियम खोज',
    reloadPreview: 'पूर्वावलोकन प्रभाव रीलोड करें',
    constitutionTitle: 'भारत का संविधान',
    constitutionSub: 'अनुच्छेदों, अनुसूचियों, संशोधनों और संवैधानिक प्रावधानों का अन्वेषण करें।',
    constitutionBadge: 'देश का सर्वोच्च कानून',
    lawsTitle: 'भारतीय विधियां एवं अधिनियम',
    lawsSub: 'भारतीय कानूनों, अधिनियमों, संविधियों एवं विधिक विनियमों को देखें।',
    lawsBadge: 'केंद्रीय एवं राज्य संविधियां',
    courtsTitle: 'न्यायिक व्यवस्था एवं न्यायालय',
    courtsSub: 'सर्वोच्च न्यायालय, उच्च न्यायालयों, जिला न्यायालयों एवं पदानुक्रम की जानकारी।',
    courtsBadge: 'न्यायिक पदानुक्रम',
    exploreProvisions: 'प्रावधान देखें',
    viewHierarchy: 'न्यायिक पदानुक्रम देखें',
    criminalReforms: 'आपराधिक कानून सुधार (2024-26)',
    docketStatus: 'राष्ट्रीय केस वाद सूची स्थिति',
    aiAssistant: 'विधि एआई रिसर्च बॉट',
  },
  ta: {
    satyameva: 'வாய்மையே வெல்லும்',
    portalSubtitle: 'தேசிய சட்ட அறிவு மற்றும் தகவல் களஞ்சியம்',
    mainTitle: 'இந்திய சட்ட அமைப்பு',
    mainSubtitle:
      'இந்தியக் குடியரசின் அரசியலமைப்பு கட்டமைப்பு, மத்திய சட்டங்கள் மற்றும் நீதித்துறை படிநிலைகளுக்கான விரிவான தளம்.',
    quickSearch: 'உடனடி மேற்கோள் & சட்டத் தேடல்',
    reloadPreview: 'முன்னோட்டத்தை புதுப்பிக்கவும்',
    constitutionTitle: 'இந்திய அரசியலமைப்பு',
    constitutionSub: 'சரத்துக்கள், அட்டவணைகள் மற்றும் அரசியலமைப்பு விதிகளை ஆராயுங்கள்.',
    constitutionBadge: 'நாட்டின் உச்ச சட்டம்',
    lawsTitle: 'இந்திய சட்டங்கள்',
    lawsSub: 'இந்திய சட்டங்கள், சட்டப்பிரிவுகள் மற்றும் விதிமுறைகளை உலாவுக.',
    lawsBadge: 'மத்திய & மாநில சட்டங்கள்',
    courtsTitle: 'நீதிமன்ற அமைப்பு',
    courtsSub: 'உச்ச நீதிமன்றம், உயர் நீதிமன்றங்கள் மற்றும் மாவட்ட நீதிமன்றங்களின் படிநிலை.',
    courtsBadge: 'நீதித்துறை படிநிலை',
    exploreProvisions: 'விதிமுறைகளை ஆராய்க',
    viewHierarchy: 'படிநிலையைப் பார்க்கவும்',
    criminalReforms: 'குற்றவியல் சட்ட சீர்திருத்தங்கள்',
    docketStatus: 'வழக்கு நிலை கண்காணிப்பு',
    aiAssistant: 'விதி AI சட்ட உதவியாளர்',
  },
  te: {
    satyameva: 'సత్యమేవ జయతే',
    portalSubtitle: 'జాతీయ న్యాయ విజ్ఞాన మరియు సమాచార భాండాగారము',
    mainTitle: 'భారతీయ న్యాయ వ్యవస్థ',
    mainSubtitle:
      'భారత గణతంత్ర రాజ్య రాజ్యాంగ చట్రం, కేంద్ర చట్టాలు మరియు న్యాయవ్యవస్థకు సంబంధించిన అధికారిక సమాచారం.',
    quickSearch: 'తక్షణ సెర్చ్ & చట్టాల శోధన',
    reloadPreview: 'ప్రివ్యూ రీలోడ్ చేయండి',
    constitutionTitle: 'భారత రాజ్యాంగం',
    constitutionSub: 'రాజ్యాంగ అధికరణలు, షెడ్యూళ్ళు మరియు సవరణలను అన్వేషించండి.',
    constitutionBadge: 'దేశ అత్యున్నత చట్టం',
    lawsTitle: 'భారతీయ చట్టాలు',
    lawsSub: 'భారతీయ చట్టాలు, శాసనాలు మరియు నిబంధనలను బ్రౌజ్ చేయండి.',
    lawsBadge: 'కేంద్ర & రాష్ట్ర చట్టాలు',
    courtsTitle: 'న్యాయస్థానాల వ్యవస్థ',
    courtsSub: 'సుప్రీం కోర్టు, హైకోర్టులు మరియు జిల్లా కోర్టుల పూర్తి సమాచారం.',
    courtsBadge: 'న్యాయవ్యవస్థ క్రమం',
    exploreProvisions: 'నిబంధనలను వీక్షించండి',
    viewHierarchy: 'న్యాయవ్యవస్థను చూడండి',
    criminalReforms: 'క్రిమినల్ న్యాయ సంస్కరణలు',
    docketStatus: 'కేసు స్థితి పరిశీలన',
    aiAssistant: 'విధి AI లీగల్ అసిస్టెంట్',
  },
};

export const MainDashboard: React.FC<MainDashboardProps> = ({
  onOpenConstitution,
  onOpenLaws,
  onOpenCourtSystem,
  onOpenSearch,
  onOpenAiBot,
  onOpenCaseTracker,
  onSelectTab,
  settings: propSettings,
}) => {
  const { settings: ctxSettings } = useSettings();
  const settings = propSettings || ctxSettings;
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);

  const isDark = settings.darkMode;
  const isCompact = settings.compactView;
  const langKey = settings.language || 'en';
  const t = TRANSLATIONS[langKey] || TRANSLATIONS.en;

  const cards: LegalCardItem[] = [
    {
      id: 'constitution',
      title: t.constitutionTitle,
      subtitle: t.constitutionSub,
      iconName: 'BookOpen',
      emoji: '📜',
      badge: t.constitutionBadge,
      meta: '395 Articles • 12 Schedules • 106 Amendments',
    },
    {
      id: 'laws',
      title: t.lawsTitle,
      subtitle: t.lawsSub,
      iconName: 'Scale',
      emoji: '⚖️',
      badge: t.lawsBadge,
      meta: 'BNS 2023 • BNSS • BSA • CPC • Companies Act',
    },
    {
      id: 'courts',
      title: t.courtsTitle,
      subtitle: t.courtsSub,
      iconName: 'Landmark',
      emoji: '🏛️',
      badge: t.courtsBadge,
      meta: 'Apex Court • 25 High Courts • 670+ District Courts',
    },
  ];

  const handleCardClick = (id: 'constitution' | 'laws' | 'courts') => {
    if (id === 'constitution') onOpenConstitution();
    else if (id === 'laws') onOpenLaws();
    else if (id === 'courts') onOpenCourtSystem();
  };

  const toggleSkeletonDemo = () => {
    setIsLoadingSkeleton(true);
    setTimeout(() => setIsLoadingSkeleton(false), 900);
  };

  return (
    <div
      id="main-dashboard-content"
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both ${
        isCompact ? 'py-5 md:py-7' : 'py-8 md:py-12'
      }`}
    >
      {/* Top Banner / Emblematical Tag */}
      <div
        id="dashboard-emblem-badge"
        className={`flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs mb-4 text-xs font-medium tracking-wide select-none transition-colors ${
          isDark
            ? 'bg-[#111A2C] border-[#2A3950] text-[#F3F0E8]'
            : 'bg-white border-[#D1D5DB] text-[#1F2937]'
        }`}
      >
        <span className="text-sm">🇮🇳</span>
        <span
          className={`font-serif-legal font-semibold tracking-wider ${
            isDark ? 'text-[#CBB184]' : 'text-[#080F20]'
          }`}
        >
          {t.satyameva}
        </span>
        <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>•</span>
        <span className={`font-normal ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}>
          {t.portalSubtitle}
        </span>
      </div>

      {/* Main Title - Playfair Display, Uppercase, Center, 32-42px, Letter Spacing ~3px */}
      <div className={`text-center max-w-3xl ${isCompact ? 'mb-6 md:mb-8' : 'mb-8 md:mb-12'}`}>
        <h1
          id="main-dashboard-title"
          className={`font-playfair font-medium uppercase leading-tight select-none tracking-[2.5px] sm:tracking-[3.5px] ${
            isCompact ? 'text-[26px] sm:text-[32px] md:text-[36px]' : 'text-[30px] sm:text-[36px] md:text-[42px]'
          } ${isDark ? 'text-[#F3F0E8]' : 'text-[#1F2937]'}`}
        >
          {t.mainTitle}
        </h1>
        <p
          className={`mt-3 font-normal max-w-2xl mx-auto leading-relaxed ${
            isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
          } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
        >
          {t.mainSubtitle}
        </p>

        {/* Action strip with Skeleton Loading Trigger & Quick Search */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            id="dashboard-quick-search-btn"
            onClick={onOpenSearch}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium shadow-xs hover:shadow-md transition-all duration-200 ${
              isDark
                ? 'bg-[#1A2436] border-[#2A3950] text-[#F3F0E8] hover:border-[#CBB184] hover:text-[#DFC79C]'
                : 'bg-white border-[#D1D5DB] text-[#1F2937] hover:border-[#C9A227] hover:text-[#080F20]'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-[#CBB184]" />
            <span>{t.quickSearch}</span>
          </button>

          <button
            id="dashboard-skeleton-toggle-btn"
            onClick={toggleSkeletonDemo}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-transparent border border-dashed text-xs transition-colors ${
              isDark
                ? 'border-[#2A3950] text-[#91A0B8] hover:text-[#F3F0E8] hover:border-[#3D5270]'
                : 'border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400'
            }`}
            title="Preview skeleton loading state"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{t.reloadPreview}</span>
          </button>
        </div>
      </div>

      {/* Main Legal System Cards Layout */}
      {isLoadingSkeleton ? (
        // Skeleton Loading view
        <div className="w-full flex flex-col items-center gap-6 md:gap-8 my-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
            <div
              className={`w-full sm:w-[360px] h-[210px] rounded-[24px] p-6 shadow-sm border animate-pulse flex flex-col items-center justify-center gap-3 ${
                isDark ? 'bg-[#1A2436] border-[#2A3950]' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
              <div className={`w-44 h-5 rounded ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
              <div className={`w-60 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
              <div className={`w-48 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
            </div>
            <div
              className={`w-full sm:w-[360px] h-[210px] rounded-[24px] p-6 shadow-sm border animate-pulse flex flex-col items-center justify-center gap-3 ${
                isDark ? 'bg-[#1A2436] border-[#2A3950]' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
              <div className={`w-44 h-5 rounded ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
              <div className={`w-60 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
              <div className={`w-48 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
            </div>
          </div>
          <div
            className={`w-full sm:w-[360px] h-[210px] rounded-[24px] p-6 shadow-sm border animate-pulse flex flex-col items-center justify-center gap-3 ${
              isDark ? 'bg-[#1A2436] border-[#2A3950]' : 'bg-white border-gray-200'
            }`}
          >
            <div className={`w-14 h-14 rounded-full ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
            <div className={`w-44 h-5 rounded ${isDark ? 'bg-[#111A2C]' : 'bg-gray-200'}`} />
            <div className={`w-60 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
            <div className={`w-48 h-3 rounded ${isDark ? 'bg-[#111A2C]/60' : 'bg-gray-100'}`} />
          </div>
        </div>
      ) : (
        <div
          id="legal-system-cards-container"
          className={`w-full flex flex-col items-center select-none ${
            isCompact ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8'
          }`}
        >
          {/* Row 1: Two cards [ Constitution of India ] & [ Laws of India ] */}
          <div
            className={`flex flex-col md:flex-row items-center justify-center w-full ${
              isCompact ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8'
            }`}
          >
            {cards.slice(0, 2).map((card) => (
              <div
                key={card.id}
                id={`legal-card-${card.id}`}
                onClick={() => handleCardClick(card.id as any)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.id as any);
                  }
                }}
                className={`group relative w-full sm:max-w-[360px] md:max-w-[360px] lg:max-w-[380px] rounded-[24px] flex flex-col items-center justify-center text-center cursor-pointer border transition-all duration-300 ease-out hover:-translate-y-2 ${
                  isCompact ? 'min-h-[170px] md:h-[190px] p-5' : 'min-h-[200px] md:h-[220px] p-6'
                } ${
                  isDark
                    ? 'bg-[#1A2436] border-[#2A3950] hover:border-[#CBB184] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]'
                    : 'bg-white border-[#D1D5DB]/80 hover:border-[#C9A227] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 8px 30px rgba(0,0,0,0.25)'
                    : '0 8px 30px rgba(0,0,0,0.06)',
                }}
              >
                {/* Top Badge Tag */}
                <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-[#CBB184] bg-[#CBB184]/10 px-2 py-0.5 rounded-full border border-[#CBB184]/20 transition-colors group-hover:bg-[#CBB184] group-hover:text-[#080D1D]">
                  {card.badge}
                </span>

                {/* Icon above heading with subtle scaling */}
                <div
                  id={`card-icon-${card.id}`}
                  className={`rounded-2xl text-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 shadow-xs border ${
                    isCompact ? 'w-12 h-12 mb-2.5' : 'w-14 h-14 mb-3.5'
                  } ${
                    isDark
                      ? 'bg-[#111A2C] border-[#2A3950] group-hover:border-[#CBB184]/50'
                      : 'bg-[#080F20]/5 group-hover:bg-[#080F20] border-gray-100 group-hover:border-[#C9A227]/40'
                  }`}
                >
                  <span className="transition-transform duration-300">{card.emoji}</span>
                </div>

                {/* Uppercase Heading in Playfair Display */}
                <h2
                  id={`card-heading-${card.id}`}
                  className={`font-playfair font-bold tracking-[1.5px] uppercase transition-colors leading-tight ${
                    isCompact ? 'text-[15px] sm:text-[16px]' : 'text-[17px] sm:text-[18px]'
                  } ${isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'}`}
                >
                  {card.title}
                </h2>

                {/* Subtle Subtitle */}
                <p
                  className={`font-normal leading-relaxed px-2 line-clamp-2 ${
                    isCompact ? 'text-[11px] sm:text-xs mt-1' : 'text-xs sm:text-[13px] mt-2'
                  } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
                >
                  {card.subtitle}
                </p>

                {/* Subtle bottom meta tag & explore arrow */}
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#CBB184] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>{t.exploreProvisions}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Third Card Centered Below [ Court System ] */}
          <div className="flex justify-center w-full">
            {cards.slice(2, 3).map((card) => (
              <div
                key={card.id}
                id={`legal-card-${card.id}`}
                onClick={() => handleCardClick(card.id as any)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.id as any);
                  }
                }}
                className={`group relative w-full sm:max-w-[360px] md:max-w-[360px] lg:max-w-[380px] rounded-[24px] flex flex-col items-center justify-center text-center cursor-pointer border transition-all duration-300 ease-out hover:-translate-y-2 ${
                  isCompact ? 'min-h-[170px] md:h-[190px] p-5' : 'min-h-[200px] md:h-[220px] p-6'
                } ${
                  isDark
                    ? 'bg-[#1A2436] border-[#2A3950] hover:border-[#CBB184] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]'
                    : 'bg-white border-[#D1D5DB]/80 hover:border-[#C9A227] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 8px 30px rgba(0,0,0,0.25)'
                    : '0 8px 30px rgba(0,0,0,0.06)',
                }}
              >
                {/* Top Badge Tag */}
                <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-[#CBB184] bg-[#CBB184]/10 px-2 py-0.5 rounded-full border border-[#CBB184]/20 transition-colors group-hover:bg-[#CBB184] group-hover:text-[#080D1D]">
                  {card.badge}
                </span>

                {/* Icon above heading with subtle scaling */}
                <div
                  id={`card-icon-${card.id}`}
                  className={`rounded-2xl text-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 shadow-xs border ${
                    isCompact ? 'w-12 h-12 mb-2.5' : 'w-14 h-14 mb-3.5'
                  } ${
                    isDark
                      ? 'bg-[#111A2C] border-[#2A3950] group-hover:border-[#CBB184]/50'
                      : 'bg-[#080F20]/5 group-hover:bg-[#080F20] border-gray-100 group-hover:border-[#C9A227]/40'
                  }`}
                >
                  <span className="transition-transform duration-300">{card.emoji}</span>
                </div>

                {/* Uppercase Heading in Playfair Display */}
                <h2
                  id={`card-heading-${card.id}`}
                  className={`font-playfair font-bold tracking-[1.5px] uppercase transition-colors leading-tight ${
                    isCompact ? 'text-[15px] sm:text-[16px]' : 'text-[17px] sm:text-[18px]'
                  } ${isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'}`}
                >
                  {card.title}
                </h2>

                {/* Subtle Subtitle */}
                <p
                  className={`font-normal leading-relaxed px-2 line-clamp-2 ${
                    isCompact ? 'text-[11px] sm:text-xs mt-1' : 'text-xs sm:text-[13px] mt-2'
                  } ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}
                >
                  {card.subtitle}
                </p>

                {/* Subtle bottom explore arrow */}
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#CBB184] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>{t.viewHierarchy}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Quick Legal Modules / Bottom Functional Tray */}
      <div
        id="dashboard-bottom-quick-bar"
        className={`w-full border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-left ${
          isCompact ? 'mt-8 pt-5' : 'mt-12 pt-8'
        } ${isDark ? 'border-[#2A3950]' : 'border-[#E5E7EB]'}`}
      >
        <div
          id="quick-module-bns-reform"
          onClick={onOpenLaws}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            isDark
              ? 'bg-[#1A2436] border-[#2A3950] hover:border-[#CBB184]/60 hover:shadow-lg'
              : 'bg-white border-[#E5E7EB] hover:border-[#C9A227]/60 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#CBB184]">
            <Flame className="w-4 h-4 text-[#CBB184]" />
            <span>{t.criminalReforms}</span>
          </div>
          <h3
            className={`text-sm font-semibold mt-1 ${
              isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'
            }`}
          >
            BNS, BNSS & BSA Transition Tables
          </h3>
          <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}>
            Section-by-section comparison index between IPC 1860, CrPC 1973, and newly enacted Sanhitas.
          </p>
        </div>

        <div
          id="quick-module-case-tracker"
          onClick={() => {
            if (onOpenCaseTracker) onOpenCaseTracker();
            else onOpenSearch();
          }}
          className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
            isDark
              ? 'bg-[#1A2436] border-[#2A3950] hover:border-[#CBB184]/60 hover:shadow-lg'
              : 'bg-white border-[#E5E7EB] hover:border-[#C9A227]/60 hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>{t.docketStatus}</span>
          </div>
          <h3
            className={`text-sm font-semibold mt-1 ${
              isDark ? 'text-[#F3F0E8] group-hover:text-white' : 'text-[#1F2937] group-hover:text-[#080F20]'
            }`}
          >
            Real-time CNR & Diary Lookup
          </h3>
          <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-[#91A0B8]' : 'text-[#6B7280]'}`}>
            Track daily orders, interim stays, caveats, and next hearing dates across all High Courts.
          </p>
        </div>

        <div
          id="quick-module-ai-assistant"
          onClick={() => onSelectTab('ai_bot')}
          className="p-4 rounded-2xl bg-gradient-to-br from-[#111A2C] to-[#1A2436] text-white border border-[#2A3950] hover:border-[#CBB184] hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#CBB184]">
            <Sparkles className="w-4 h-4 text-[#CBB184] animate-pulse" />
            <span>{t.aiAssistant}</span>
          </div>
          <h3 className="text-sm font-semibold text-white mt-1 font-serif-legal">
            Automated Statutory Citations
          </h3>
          <p className="text-xs text-[#91A0B8] mt-1 line-clamp-2">
            Formulate legal propositions, draft writ petitions grounds, and cite binding Supreme Court precedents.
          </p>
        </div>
      </div>
    </div>
  );
};
