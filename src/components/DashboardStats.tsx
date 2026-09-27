/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { BookCheck, Languages, HardDriveDownload } from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {language === 'hi' ? 'आपातकाल के लिए तैयार' : 'Prepared for emergencies'}
        </h3>
        <span className="text-[11px] text-gray-400 font-medium">
          {language === 'hi' ? 'स्थानीय कैश सक्रिय' : 'Local Storage Cache'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Stat 1 */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2">
            <BookCheck className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">6</span>
          <span className="text-xs text-gray-600 font-medium mt-0.5">
            {language === 'hi' ? 'गाइड उपलब्ध' : 'Emergency Guides'}
          </span>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <Languages className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-gray-900 font-mono">2</span>
          <span className="text-xs text-gray-600 font-medium mt-0.5">
            {language === 'hi' ? 'भाषाएं (EN / HI)' : 'Languages'}
          </span>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
            <HardDriveDownload className="w-4 h-4" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">100%</span>
          <span className="text-xs text-gray-600 font-medium mt-0.5">
            {language === 'hi' ? 'ऑफलाइन सक्षम' : 'Offline Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};
