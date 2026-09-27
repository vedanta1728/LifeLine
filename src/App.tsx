/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { OfflineBanner } from './components/OfflineBanner';
import { LandingIntro } from './components/LandingIntro';
import { SOSCard } from './components/SOSCard';
import { DashboardStats } from './components/DashboardStats';
import { FirstAidCardList } from './components/FirstAidCardList';
import { FirstAidDetail } from './components/FirstAidDetail';
import { EmergencyMessageModal } from './components/EmergencyMessageModal';
import { EmergencyContactsScreen } from './components/EmergencyContactsScreen';
import { CallModal } from './components/CallModal';
import { SettingsScreen } from './components/SettingsScreen';
import { HackathonPresentation } from './components/HackathonPresentation';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';
import { BottomNavBar } from './components/BottomNavBar';
import { 
  HeartHandshake, 
  Home as HomeIcon, 
  PhoneCall, 
  Settings as SettingsIcon, 
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Search
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    showIntro,
    activeGuideId,
    closeGuide,
    currentTab,
    setCurrentTab,
    isMessageModalOpen,
    closeMessageModal,
    selectedEmergencyType,
    openDemoModal,
    language
  } = useApp();

  // If user hasn't completed intro, show landing screen (Section 20)
  if (showIntro) {
    return <LandingIntro />;
  }

  // If user is actively reading a specific first-aid guide (Section 7 & 8)
  if (activeGuideId) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <Header />
        <OfflineBanner />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-4">
          <FirstAidDetail guideId={activeGuideId} onBack={closeGuide} />
        </main>
        <CallModal />
        <EmergencyMessageModal
          isOpen={isMessageModalOpen}
          onClose={closeMessageModal}
          initialEmergencyType={selectedEmergencyType}
        />
        <DemoWalkthroughModal />
        <HackathonPresentation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col text-gray-900 pb-16 sm:pb-8">
      {/* Top Header */}
      <Header />

      {/* Offline Status Banner (Section 11) */}
      <OfflineBanner />

      {/* Desktop Navigation Tabs (Hidden on mobile where BottomNavBar handles it) */}
      <div className="hidden sm:block border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 flex space-x-8">
          <button
            onClick={() => setCurrentTab('home')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              currentTab === 'home'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>{language === 'hi' ? 'होम' : 'Home'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('first-aid')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              currentTab === 'first-aid'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{language === 'hi' ? 'प्राथमिक चिकित्सा' : 'First Aid'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('emergency')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              currentTab === 'emergency'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              currentTab === 'settings'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 space-y-6">
        {/* Tab 1: HOME SCREEN (Section 5) */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            {/* SOS Card */}
            <SOSCard />

            {/* Dashboard Statistics (Section 17) */}
            <DashboardStats />

            {/* First-Aid Section (Section 6: "What happened?") */}
            <FirstAidCardList />

            {/* Quick Demo Trigger for Hackathon Presentation */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5 text-gray-700">
                <Sparkles className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="font-semibold">
                  {language === 'hi' 
                    ? 'हैकथॉन जूरी डेमो: 7-चरणीय गंभीर रक्तस्राव सिमुलेशन' 
                    : 'Hackathon Jury Demo: 7-step Severe Bleeding walkthrough'}
                </span>
              </div>
              <button
                onClick={openDemoModal}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'डेमो खोलें' : 'Launch Demo'}
              </button>
            </div>

            {/* Disclaimer Footer Note */}
            <div className="text-center pt-2 pb-4">
              <p className="text-[11px] text-gray-400 max-w-md mx-auto leading-relaxed">
                {language === 'hi'
                  ? 'लाइफलाइन केवल आपातकालीन प्राथमिक मार्गदर्शन है। जानलेवा स्थितियों में हमेशा आपातकालीन सेवाओं (112) को कॉल करें।'
                  : 'LifeLine is an offline emergency guidance tool and does not replace professional medical personnel or emergency dispatch.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: FIRST AID DIRECTORY */}
        {currentTab === 'first-aid' && (
          <div className="space-y-4">
            <FirstAidCardList />
            
            <div className="p-4 bg-red-50/60 rounded-2xl border border-red-100 text-xs text-red-950 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  {language === 'hi' ? 'सत्यापित प्राथमिक चिकित्सा' : 'Verified First-Aid Protocols'}
                </span>
                <p className="mt-0.5 text-red-900">
                  {language === 'hi'
                    ? 'ये सभी निर्देश अंतरराष्ट्रीय आपातकालीन प्राथमिक चिकित्सा मानकों (रेड क्रॉस / एएचए) पर आधारित हैं और आपके डिवाइस पर स्थानीय रूप से सुरक्षित हैं।'
                    : 'All instructions are based on international conservative first-aid standards and remain 100% accessible without internet.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: EMERGENCY CONTACTS (Section 10) */}
        {currentTab === 'emergency' && <EmergencyContactsScreen />}

        {/* Tab 4: SETTINGS (Section 13) */}
        {currentTab === 'settings' && <SettingsScreen />}
      </main>

      {/* Mobile Quick Action Bottom Navigation Bar (Section 14) */}
      <BottomNavBar />

      {/* Global Interactive Modals */}
      <CallModal />
      <EmergencyMessageModal
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
        initialEmergencyType={selectedEmergencyType}
      />
      <DemoWalkthroughModal />
      <HackathonPresentation />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
