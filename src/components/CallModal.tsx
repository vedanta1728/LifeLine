/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, X, Copy, Check, AlertCircle, ShieldAlert } from 'lucide-react';

export const CallModal: React.FC = () => {
  const { isCallModalOpen, callingDetails, closeCallModal, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isCallModalOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(callingDetails.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isMobile = typeof navigator !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Close */}
        <div className="flex justify-end -mt-2 -mr-2">
          <button
            onClick={closeCallModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pulsing Emergency Icon */}
        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/30">
          <PhoneCall className="w-8 h-8 animate-bounce" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-950 font-mono tracking-tight mb-1">
          {callingDetails.title}
        </h3>

        {/* Large Prominent Number Display */}
        <div className="my-4 py-3 px-6 bg-red-50 rounded-2xl border border-red-200 inline-block">
          <span className="text-4xl font-black text-red-600 font-mono tracking-widest">
            {callingDetails.number}
          </span>
        </div>

        {/* Mobile vs Desktop / Browser Message (Section 18 Error Handling) */}
        {!isMobile ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-4 text-left">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  {language === 'hi' 
                    ? 'ब्राउज़र में कॉलिंग समर्थित नहीं है' 
                    : 'Calling not supported in this browser'}
                </span>
                <p className="mt-0.5 text-amber-800">
                  {language === 'hi'
                    ? `इस ब्राउज़र में सीधे कॉल समर्थित नहीं है। कृपया अपने फोन से मैन्युअल रूप से ${callingDetails.number} डायल करें।`
                    : `Calling isn't supported in this browser. Please dial ${callingDetails.number} manually.`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mb-4">
            {language === 'hi'
              ? 'आपके फोन के डायलर को खोलने का प्रयास किया गया। यदि यह नहीं खुला, तो नीचे दिए गए नंबर पर कॉल करें।'
              : 'Direct call dialer triggered. If your dialer did not open automatically, dial the number directly.'}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Native Tel Link */}
          <a
            href={`tel:${callingDetails.number}`}
            className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-red-600/25 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>
              {language === 'hi' 
                ? `${callingDetails.number} पर कॉल करें` 
                : `DIAL ${callingDetails.number}`}
            </span>
          </a>

          {/* Copy Number */}
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
            <span>
              {copied 
                ? (language === 'hi' ? 'नंबर कॉपी हो गया!' : 'Number copied!') 
                : (language === 'hi' ? 'नंबर कॉपी करें' : 'COPY NUMBER')}
            </span>
          </button>
        </div>

        {/* Emergency Operator Advice */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 text-left space-y-1">
          <p>• {language === 'hi' ? 'शांत रहें और ऑपरेटर से बात करें।' : 'Stay calm and speak clearly to the dispatcher.'}</p>
          <p>• {language === 'hi' ? 'सबसे पहले अपना सटीक स्थान बताएं।' : 'State your exact location and landmarks first.'}</p>
        </div>
      </div>
    </div>
  );
};
