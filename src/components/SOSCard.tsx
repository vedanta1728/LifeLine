/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, MessageSquareShare, AlertTriangle } from 'lucide-react';

export const SOSCard: React.FC = () => {
  const { initiateCall, openMessageModal, language } = useApp();

  return (
    <div className="bg-white rounded-3xl border border-red-100 shadow-md shadow-red-950/5 p-6 sm:p-8 text-center relative overflow-hidden">
      {/* Subtle background emergency halo glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Primary SOS Action Button */}
      <div className="relative mb-4 flex justify-center">
        <button
          onClick={() => initiateCall('112', '112 Emergency Dispatch')}
          className="relative group w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white shadow-xl shadow-red-600/30 flex flex-col items-center justify-center transition-all cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2"
          aria-label="Call Emergency SOS 112"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-25 pointer-events-none" />

          <span className="text-4xl sm:text-5xl font-black tracking-widest font-mono">
            SOS
          </span>
          <span className="text-[12px] font-bold tracking-widest uppercase mt-1 opacity-90">
            112
          </span>
        </button>
      </div>

      {/* Clear Label */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
        {language === 'hi' ? 'आपातकालीन सेवाओं को कॉल करें' : 'Call Emergency Services'}
      </h2>
      <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
        {language === 'hi'
          ? 'भारत और यूरोप में 112 पर तुरंत पुलिस, एम्बुलेंस या फायर ब्रिगेड से जुड़ें'
          : 'Instantly connect to police, medical dispatch, or fire rescue via universal 112'}
      </p>

      {/* Secondary Action: Emergency Message (Section 5) */}
      <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => openMessageModal('General Emergency SOS')}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold text-sm transition-colors cursor-pointer"
        >
          <MessageSquareShare className="w-4 h-4 text-red-600" />
          <span>{language === 'hi' ? 'आपातकालीन संदेश भेजें' : 'Emergency Message'}</span>
        </button>

        <button
          onClick={() => initiateCall('112', '112 Emergency Dispatch')}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 font-semibold text-sm transition-colors cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 text-red-600" />
          <span>{language === 'hi' ? 'डायल 112' : 'Direct Dial 112'}</span>
        </button>
      </div>
    </div>
  );
};
