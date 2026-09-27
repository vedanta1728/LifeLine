/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, HeartHandshake, PhoneCall, Settings, AlertOctagon } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { currentTab, setCurrentTab, initiateCall, closeGuide, language } = useApp();

  const handleTabChange = (tab: 'home' | 'first-aid' | 'emergency' | 'settings') => {
    closeGuide();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg sm:hidden">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around relative">
        
        {/* Tab 1: Home */}
        <button
          onClick={() => handleTabChange('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'home' ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {language === 'hi' ? 'होम' : 'Home'}
          </span>
        </button>

        {/* Tab 2: First Aid */}
        <button
          onClick={() => handleTabChange('first-aid')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'first-aid' ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <HeartHandshake className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {language === 'hi' ? 'प्राथमिक चिकित्सा' : 'First Aid'}
          </span>
        </button>

        {/* Center Prominent SOS Action (Section 14: Keep SOS action visually prominent) */}
        <div className="-mt-5 flex flex-col items-center">
          <button
            onClick={() => initiateCall('112', '112 Emergency Dispatch')}
            className="w-13 h-13 rounded-full bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-red-600/40 border-3 border-white cursor-pointer"
            aria-label="Direct SOS 112 Call"
          >
            <span className="text-xs font-black tracking-wider font-mono">
              SOS
            </span>
          </button>
          <span className="text-[9px] font-black text-red-600 tracking-wider uppercase mt-0.5">
            112
          </span>
        </div>

        {/* Tab 3: Emergency */}
        <button
          onClick={() => handleTabChange('emergency')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'emergency' ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {language === 'hi' ? 'आपातकाल' : 'Emergency'}
          </span>
        </button>

        {/* Tab 4: Settings */}
        <button
          onClick={() => handleTabChange('settings')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'settings' ? 'text-red-600 font-bold' : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {language === 'hi' ? 'सेटिंग्स' : 'Settings'}
          </span>
        </button>
      </div>
    </nav>
  );
};
