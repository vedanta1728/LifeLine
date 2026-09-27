/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, CheckCircle2, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { effectiveOffline, simulatedOffline, toggleSimulatedOffline, language } = useApp();

  return (
    <div className={`border-b transition-colors px-4 py-2.5 ${
      effectiveOffline 
        ? 'bg-amber-500/10 border-amber-200 text-amber-950' 
        : 'bg-emerald-500/10 border-emerald-200 text-emerald-950'
    }`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          {effectiveOffline ? (
            <WifiOff className="w-4 h-4 text-amber-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          )}
          <span className="font-semibold">
            {effectiveOffline ? (
              language === 'hi' 
                ? 'ऑफलाइन मोड — इस डिवाइस पर मुख्य प्राथमिक चिकित्सा निर्देश उपलब्ध हैं।'
                : 'OFFLINE MODE — Core emergency guidance is available on this device.'
            ) : (
              language === 'hi'
                ? 'इंटरनेट से जुड़े हैं — सभी निर्देश स्थानीय रूप से सुरक्षित और ऑफलाइन उपलब्ध हैं।'
                : 'OFFLINE READY — All first-aid guides are cached and work without internet.'
            )}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="hidden md:inline text-gray-600 italic">
            {language === 'hi'
              ? '“मुख्य प्राथमिक चिकित्सा के लिए इंटरनेट की आवश्यकता नहीं है।”'
              : '“Internet is not required for the core first-aid guidance.”'}
          </span>

          <button
            onClick={toggleSimulatedOffline}
            className="underline font-medium hover:text-gray-900 cursor-pointer flex items-center gap-1"
            title="Toggle network simulation"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">
              {simulatedOffline ? 'Restore Network' : 'Simulate Offline'}
            </span>
            <span className="sm:hidden">
              {simulatedOffline ? 'Online' : 'Offline'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
