import React, { useState, useEffect } from 'react';
import {
  Scale,
  ArrowRight,
  BookOpen,
  Shield,
  Award,
  Sparkles,
  Building,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface WelcomeIntroScreenProps {
  onStartPortal: () => void;
}

export const WelcomeIntroScreen: React.FC<WelcomeIntroScreenProps> = ({ onStartPortal }) => {
  const { settings, t } = useSettings();
  const isDark = settings.darkMode;

  // Phase 1: Loading (1.4s), Phase 2: Reveal intro, Phase 3: Transitioning out
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    // 1.2s loading effect before smoothly showing the welcome intro
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Staged reveal sequence
      const t1 = setTimeout(() => setAnimStep(1), 80);   // Step 1: Background & Icon
      const t2 = setTimeout(() => setAnimStep(2), 350);  // Step 2: JUSTICIA Title
      const t3 = setTimeout(() => setAnimStep(3), 650);  // Step 3: Subtitle
      const t4 = setTimeout(() => setAnimStep(4), 950);  // Step 4: Description
      const t5 = setTimeout(() => setAnimStep(5), 1250); // Step 5: START PORTAL Button

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [isLoading]);

  const handleStart = () => {
    setIsTransitioningOut(true);
    setTimeout(() => {
      onStartPortal();
    }, 650);
  };

  return (
    <div
      id="justicia-welcome-screen-root"
      className={`fixed inset-0 z-50 overflow-hidden select-none flex flex-col items-center justify-between transition-all duration-700 ${
        isDark ? 'bg-[#060A17] text-[#F3F0E8]' : 'bg-[#F7F7F8] text-slate-900'
      } ${
        isTransitioningOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. Cinematic Background Layer: Supreme Court Pillars & Constitutional Seal Motif */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          animStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft gradient backdrop */}
        <div className={`absolute inset-0 bg-radial ${
          isDark ? 'from-[#131F38]/60 via-[#090E1F] to-[#04060E]' : 'from-amber-100/50 via-slate-100 to-[#F7F7F8]'
        }`} />

        {/* Architectural Judicial Pillars & Pediment SVG Motif */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          isDark ? 'opacity-25' : 'opacity-30'
        }`}>
          <svg
            className={`w-full max-w-5xl h-auto transition-all duration-700 ${
              isDark ? 'text-[#CBB184] drop-shadow-[0_0_20px_rgba(203,177,132,0.18)]' : 'text-[#996515] drop-shadow-[0_0_15px_rgba(153,101,21,0.15)]'
            }`}
            viewBox="0 0 1000 600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            {/* Supreme Court Apex Gable / Triangular Pediment */}
            <polygon points="500,40 120,170 880,170" fill="currentColor" fillOpacity="0.08" />
            <line x1="100" y1="175" x2="900" y2="175" strokeWidth="3" />
            <line x1="120" y1="185" x2="880" y2="185" strokeWidth="2" />

            {/* Pediment Scales Emblem */}
            <circle cx="500" cy="120" r="28" strokeWidth="2" fill="currentColor" fillOpacity="0.06" />
            <line x1="500" y1="100" x2="500" y2="140" strokeWidth="2" />
            <line x1="480" y1="112" x2="520" y2="112" strokeWidth="2" />

            {/* Classic Judicial Pillars */}
            {[180, 290, 400, 510, 620, 730, 820].map((x, i) => (
              <g key={i}>
                <rect x={x} y="190" width="30" height="300" rx="3" fill="currentColor" fillOpacity="0.06" />
                <line x1={x - 4} y1="190" x2={x + 34} y2="190" strokeWidth="2.5" />
                <line x1={x - 6} y1="490" x2={x + 36} y2="490" strokeWidth="2.5" />
                <line x1={x + 10} y1="195" x2={x + 10} y2="485" strokeDasharray="4 4" strokeWidth="1.2" />
                <line x1={x + 20} y1="195" x2={x + 20} y2="485" strokeDasharray="4 4" strokeWidth="1.2" />
              </g>
            ))}

            {/* Base Plinth / Steps */}
            <line x1="60" y1="495" x2="940" y2="495" strokeWidth="3.5" />
            <line x1="40" y1="515" x2="960" y2="515" strokeWidth="3.5" />
            <line x1="20" y1="535" x2="980" y2="535" strokeWidth="4.5" />
          </svg>
        </div>

        {/* Soft Vignette Overlay */}
        <div className={`absolute inset-0 pointer-events-none bg-radial ${
          isDark ? 'from-transparent via-[#060A17]/40 to-[#03060E]/85' : 'from-transparent via-[#F7F7F8]/30 to-slate-200/60'
        }`} />
      </div>

      {/* Top Subtle Seal Header */}
      <header
        className={`w-full max-w-6xl px-6 py-6 flex items-center justify-between z-20 transition-all duration-700 ${
          animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-md ${
            isDark ? 'bg-[#111A2C] border-[#CBB184]/40' : 'bg-white border-amber-300'
          }`}>
            <Scale className="w-4 h-4 text-[#CBB184]" />
          </div>
          <span className={`text-xs font-semibold tracking-widest uppercase ${
            isDark ? 'text-gray-400' : 'text-slate-600'
          }`}>
            Official Law & Jurisprudence Portal
          </span>
        </div>

        <div className={`flex items-center gap-2 text-xs font-medium tracking-wide border px-3 py-1 rounded-full backdrop-blur-md ${
          isDark
            ? 'text-[#CBB184] bg-[#111A2C]/80 border-[#CBB184]/30'
            : 'text-[#996515] bg-amber-50/90 border-amber-300'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>India Legal Grid • Live</span>
        </div>
      </header>

      {/* 2. Main Center Content Experience */}
      <main className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center text-center relative z-20">
        {/* Initial Loading Animation Stage (1 to 2 seconds) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
            {/* Animated Emblem / Scales Container */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl border border-[#CBB184]/30 animate-ping opacity-25" />
              <div className="absolute inset-0 rounded-2xl border-2 border-[#CBB184]/40 border-t-[#CBB184] animate-spin" />
              <div className={`w-16 h-16 rounded-xl border flex items-center justify-center shadow-xl ${
                isDark ? 'bg-[#111A2C] border-[#CBB184]/50' : 'bg-white border-amber-400'
              }`}>
                <Scale className="w-8 h-8 text-[#CBB184] animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-[#CBB184] font-semibold uppercase">
              <span>Initializing Legal Intelligence...</span>
            </div>
          </div>
        ) : (
          /* Staged Welcome Intro Reveal */
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
            {/* Step 2: Scales Emblem */}
            <div
              className={`transition-all duration-500 ease-out transform ${
                animStep >= 1
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-75 translate-y-4'
              }`}
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#CBB184]/20 via-[#DFCA9F]/30 to-[#CBB184]/20 rounded-3xl blur-md opacity-60" />
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 shadow-2xl flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-b from-[#16233B] to-[#0D1629] border-[#CBB184]/60'
                    : 'bg-gradient-to-b from-white to-amber-50/80 border-amber-400'
                }`}>
                  <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-[#CBB184] drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Step 3: JUSTICIA Title */}
            <h1
              className={`font-playfair text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-transparent bg-clip-text px-6 pb-2 inline-block overflow-visible transition-all duration-700 ease-out ${
                isDark
                  ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F3F0E8] to-[#CBB184]'
                  : 'bg-gradient-to-b from-slate-900 via-slate-800 to-[#996515]'
              } ${
                animStep >= 2
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-5 blur-xs'
              }`}
            >
              JUSTICIA
            </h1>

            {/* Step 4: LAW & CONSTITUTION PORTAL OF INDIA */}
            <div
              className={`mt-3 sm:mt-4 flex flex-col items-center gap-1.5 transition-all duration-600 ease-out ${
                animStep >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p className={`text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] uppercase ${
                isDark ? 'text-[#CBB184]/90' : 'text-[#996515]'
              }`}>
                Law & Constitution Portal of India
              </p>
            </div>

            {/* Step 5: Short Professional Description */}
            <p
              className={`mt-4 sm:mt-5 text-sm sm:text-base max-w-lg font-light leading-relaxed transition-all duration-600 ease-out ${
                isDark ? 'text-gray-300' : 'text-slate-600'
              } ${
                animStep >= 4
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Your gateway to explore Indian laws, constitutional knowledge, and legal intelligence.
            </p>

            {/* Step 6: START PORTAL → Button */}
            <div
              className={`mt-8 sm:mt-10 transition-all duration-600 ease-out ${
                animStep >= 5
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
            >
              <button
                id="btn-start-portal"
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#CBB184] via-[#DFCA9F] to-[#CBB184] text-[#080D1D] font-bold text-sm sm:text-base tracking-wider uppercase shadow-2xl shadow-[#CBB184]/25 hover:shadow-[#CBB184]/40 hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                {/* Subtle shine sweep effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span>START PORTAL</span>
                <ArrowRight className="w-5 h-5 text-[#080D1D] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Feature Pills */}
            <div
              className={`mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 transition-all duration-700 ${
                animStep >= 5 ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className={`px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-xs ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-200/60 border-slate-300 text-slate-700'
              }`}>
                <BookOpen className="w-3 h-3 text-[#CBB184]" />
                <span>395 Articles</span>
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-xs ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-200/60 border-slate-300 text-slate-700'
              }`}>
                <Building className="w-3 h-3 text-[#CBB184]" />
                <span>1500+ Central Acts</span>
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-xs ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-200/60 border-slate-300 text-slate-700'
              }`}>
                <Sparkles className="w-3 h-3 text-[#CBB184]" />
                <span>AI Legal Assistant</span>
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-xs ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-200/60 border-slate-300 text-slate-700'
              }`}>
                <Award className="w-3 h-3 text-[#CBB184]" />
                <span>e-Courts Integration</span>
              </span>
            </div>
          </div>
        )}
      </main>

      {/* 3. Bottom Legal Authority Seal & Compliances */}
      <footer
        className={`w-full max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t z-20 transition-all duration-700 ${
          isDark ? 'border-white/5 text-gray-400' : 'border-slate-200 text-slate-500'
        } ${
          animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-[#CBB184]">{t.dashboard.satyameva}</span>
          <span>•</span>
          <span>Department of Justice & Constitutional Framework</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Secured • Department of Justice Standards Compliant</span>
        </div>
      </footer>
    </div>
  );
};
