/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_GUIDES } from '../data/emergencyGuides';
import { EmergencyGuideId } from '../types/emergency';
import { 
  Bandage, 
  Flame, 
  Heart, 
  Wind, 
  AlertCircle, 
  Activity, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface FirstAidCardListProps {
  onSelectGuide?: (id: EmergencyGuideId) => void;
}

export const FirstAidCardList: React.FC<FirstAidCardListProps> = ({ onSelectGuide }) => {
  const { language, openGuide } = useApp();
  const guides = EMERGENCY_GUIDES[language] || EMERGENCY_GUIDES['en'];

  const handleSelect = (id: EmergencyGuideId) => {
    if (onSelectGuide) {
      onSelectGuide(id);
    } else {
      openGuide(id);
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'bandage':
        return <Bandage className="w-7 h-7 text-red-600 stroke-[2.2]" />;
      case 'flame':
        return <Flame className="w-7 h-7 text-orange-600 stroke-[2.2]" />;
      case 'heart':
        return <Heart className="w-7 h-7 text-red-600 stroke-[2.2] animate-pulse" />;
      case 'airway':
        return <Wind className="w-7 h-7 text-blue-600 stroke-[2.2]" />;
      case 'snake':
        return <AlertCircle className="w-7 h-7 text-amber-600 stroke-[2.2]" />;
      case 'bone':
        return <Activity className="w-7 h-7 text-purple-600 stroke-[2.2]" />;
      default:
        return <ShieldAlert className="w-7 h-7 text-red-600 stroke-[2.2]" />;
    }
  };

  return (
    <section className="py-2">
      {/* Heading (Section 6) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">
            {language === 'hi' ? 'क्या हुआ है?' : 'What happened?'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {language === 'hi' 
              ? 'आपातकालीन विषय चुनें और तुरंत चरण-दर-चरण निर्देश देखें' 
              : 'Select an emergency for immediate verified step-by-step guidance'}
          </p>
        </div>
      </div>

      {/* 6 Large Emergency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {guides.map((guide) => (
          <button
            key={guide.id}
            onClick={() => handleSelect(guide.id)}
            className="group w-full text-left bg-white border border-gray-200/80 hover:border-red-400/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all active:scale-[0.99] flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <div className="flex items-center space-x-4">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-red-50/70 border border-gray-100 flex items-center justify-center flex-shrink-0 transition-colors">
                {renderIcon(guide.iconType)}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {guide.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                  <span>{guide.steps.length} {language === 'hi' ? 'चरण' : 'steps'}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">
                    {language === 'hi' 
                      ? `सत्यापित: ${guide.lastVerified || 'सितंबर 2026'}` 
                      : `Verified ${guide.lastVerified || 'Sep 2026'}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Trailing arrow */}
            <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-gray-400 transition-all flex-shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
