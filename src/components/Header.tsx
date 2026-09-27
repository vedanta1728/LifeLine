/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Wifi, WifiOff, Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    voiceGuidance,
    setVoiceGuidance,
    effectiveOffline,
    simulatedOffline,
    toggleSimulatedOffline,
    openDemoModal,
    openAboutModal
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold tracking-wider text-xl text-gray-900 font-mono">
                LIFELINE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                MVP
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              {language === 'hi' 
                ? 'आपातकालीन सहायता, जब आप ऑफलाइन हों तब भी।' 
                : "Emergency assistance, even when you're offline."}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* OFFLINE READY Indicator (Section 5) */}
          <button
            onClick={toggleSimulatedOffline}
            title={effectiveOffline ? "Offline mode active (Click to toggle simulation)" : "Core content cached locally (Click to test offline mode)"}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              effectiveOffline 
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${effectiveOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="tracking-wide">
              {effectiveOffline ? 'OFFLINE ACTIVE' : 'OFFLINE READY'}
            </span>
            {effectiveOffline ? <WifiOff className="w-3.5 h-3.5 ml-0.5" /> : <Wifi className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Quick Language switch */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors"
            title="Toggle Language / भाषा बदलें"
          >
            {language === 'en' ? 'हिन्दी' : 'EN'}
          </button>

          {/* Demo walkthrough shortcut */}
          <button
            onClick={openDemoModal}
            className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Launch Hackathon Demo Walkthrough"
            aria-label="Demo Mode"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Project presentation modal */}
          <button
            onClick={openAboutModal}
            className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            title="About LifeLine Hackathon Project"
            aria-label="About LifeLine"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Mobile subtitle for small screens */}
      <div className="sm:hidden px-4 pb-2 border-t border-gray-100 bg-gray-50/50">
        <p className="text-[11px] text-gray-500 text-center">
          {language === 'hi' 
            ? 'आपातकालीन सहायता, जब आप ऑफलाइन हों तब भी।' 
            : "Emergency assistance, even when you're offline."}
        </p>
      </div>
    </header>
  );
};
