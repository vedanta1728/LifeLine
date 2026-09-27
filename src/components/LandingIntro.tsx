/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, ArrowRight, Zap, WifiOff, HeartPulse } from 'lucide-react';

export const LandingIntro: React.FC = () => {
  const { completeIntro, language, setLanguage } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-[#F9FAFB] flex flex-col justify-between p-6 overflow-y-auto">
      {/* Top bar with language selector */}
      <div className="max-w-md mx-auto w-full flex justify-end items-center pt-2">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              language === 'en' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              language === 'hi' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-md mx-auto w-full my-auto text-center py-6">
        {/* Logo Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20 mb-6">
          <ShieldAlert className="w-10 h-10 stroke-[2.2]" />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-950 font-mono mb-2">
          LIFELINE
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-medium text-gray-700 max-w-xs mx-auto mb-8 leading-snug">
          {language === 'hi'
            ? 'आपातकालीन सहायता जो हमेशा आपके साथ रहती है।'
            : 'Emergency guidance that stays with you.'}
        </p>

        {/* Core Value Pillars */}
        <div className="grid grid-cols-3 gap-3 mb-10 text-left">
          <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-xs">
            <WifiOff className="w-5 h-5 text-red-600 mb-2" />
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {language === 'hi' ? 'ऑफलाइन' : 'Offline'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {language === 'hi' ? 'बिना इंटरनेट चलता है' : 'Zero network required'}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-xs">
            <Zap className="w-5 h-5 text-red-600 mb-2" />
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित' : 'Instant'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {language === 'hi' ? '1-टैप आपातकाल' : 'Instant 1-tap SOS'}
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-xs">
            <HeartPulse className="w-5 h-5 text-red-600 mb-2" />
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {language === 'hi' ? 'सत्यापित' : 'Verified'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {language === 'hi' ? 'सरल प्राथमिक सहायता' : 'Simple first-aid'}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={completeIntro}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-red-600/25 flex items-center justify-center space-x-2 text-lg transition-all cursor-pointer"
        >
          <span>{language === 'hi' ? 'आगे बढ़ें' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Bottom Sub-text */}
        <p className="text-xs font-medium text-gray-500 tracking-wider mt-4">
          Offline-first • Fast • Simple
        </p>
      </div>

      {/* Safety & Medical Disclaimer */}
      <div className="max-w-md mx-auto w-full text-center pb-2">
        <p className="text-[11px] text-gray-400 max-w-sm mx-auto leading-relaxed">
          {language === 'hi'
            ? 'सूचना: लाइफलाइन केवल आपातकालीन मार्गदर्शन प्रदान करती है और यह प्रशिक्षित डॉक्टरों या आपातकालीन सेवाओं का विकल्प नहीं है।'
            : 'Notice: LifeLine provides conservative guidance and does not replace professional medical personnel or emergency dispatch.'}
        </p>
      </div>
    </div>
  );
};
