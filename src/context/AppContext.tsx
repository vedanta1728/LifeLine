/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, EmergencyGuideId, EmergencyContact } from '../types/emergency';

interface AppContextType {
  // Localization & Display Settings
  language: Language;
  setLanguage: (lang: Language) => void;
  voiceGuidance: boolean;
  setVoiceGuidance: (enabled: boolean) => void;
  largeText: boolean;
  setLargeText: (enabled: boolean) => void;
  
  // User Profile & Contacts
  userName: string;
  setUserName: (name: string) => void;
  emergencyContact: EmergencyContact | null;
  setEmergencyContact: (contact: EmergencyContact | null) => void;
  
  // Navigation & Screen View
  currentTab: 'home' | 'first-aid' | 'emergency' | 'settings';
  setCurrentTab: (tab: 'home' | 'first-aid' | 'emergency' | 'settings') => void;
  activeGuideId: EmergencyGuideId | null;
  openGuide: (id: EmergencyGuideId) => void;
  closeGuide: () => void;
  showIntro: boolean;
  completeIntro: () => void;
  revisitIntro: () => void;
  
  // Network status & Offline demo simulation
  isOnline: boolean;
  simulatedOffline: boolean;
  toggleSimulatedOffline: () => void;
  effectiveOffline: boolean;

  // Emergency Call fallback modal
  isCallModalOpen: boolean;
  callingDetails: { number: string; title: string };
  initiateCall: (number?: string, title?: string) => void;
  closeCallModal: () => void;

  // Emergency Message modal
  isMessageModalOpen: boolean;
  openMessageModal: (initialType?: string) => void;
  closeMessageModal: () => void;
  selectedEmergencyType: string;

  // Hackathon Demo Walkthrough
  isDemoModalOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;

  // Presentation / About Project modal
  isAboutModalOpen: boolean;
  openAboutModal: () => void;
  closeAboutModal: () => void;

  // Text-to-Speech
  isSpeaking: boolean;
  isTtsSupported: boolean;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  
  // Reset all saved state
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('lifeline_language');
      return saved === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lifeline_language', lang);
    } catch {
      // Storage unavailable
    }
  };

  // 2. Voice Guidance
  const [voiceGuidance, setVoiceGuidanceState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('lifeline_voice_guidance');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const setVoiceGuidance = (enabled: boolean) => {
    setVoiceGuidanceState(enabled);
    try {
      localStorage.setItem('lifeline_voice_guidance', String(enabled));
    } catch {
      // Storage unavailable
    }
    if (!enabled) {
      stopSpeech();
    }
  };

  // 3. Large Text
  const [largeText, setLargeTextState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('lifeline_large_text');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const setLargeText = (enabled: boolean) => {
    setLargeTextState(enabled);
    try {
      localStorage.setItem('lifeline_large_text', String(enabled));
    } catch {
      // Storage unavailable
    }
  };

  // 4. User Name
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      return localStorage.getItem('lifeline_user_name') || '';
    } catch {
      return '';
    }
  });

  const setUserName = (name: string) => {
    setUserNameState(name);
    try {
      localStorage.setItem('lifeline_user_name', name);
    } catch {
      // Storage unavailable
    }
  };

  // 5. Emergency Contact
  const [emergencyContact, setEmergencyContactState] = useState<EmergencyContact | null>(() => {
    try {
      const saved = localStorage.getItem('lifeline_emergency_contact');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setEmergencyContact = (contact: EmergencyContact | null) => {
    setEmergencyContactState(contact);
    try {
      if (contact) {
        localStorage.setItem('lifeline_emergency_contact', JSON.stringify(contact));
      } else {
        localStorage.removeItem('lifeline_emergency_contact');
      }
    } catch {
      // Storage unavailable
    }
  };

  // 6. Intro screen
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lifeline_intro_completed') !== 'true';
    } catch {
      return true;
    }
  });

  const completeIntro = () => {
    setShowIntro(false);
    try {
      localStorage.setItem('lifeline_intro_completed', 'true');
    } catch {
      // Storage unavailable
    }
  };

  const revisitIntro = () => {
    setShowIntro(true);
  };

  // 7. Navigation
  const [currentTab, setCurrentTab] = useState<'home' | 'first-aid' | 'emergency' | 'settings'>('home');
  const [activeGuideId, setActiveGuideId] = useState<EmergencyGuideId | null>(null);

  const openGuide = (id: EmergencyGuideId) => {
    setActiveGuideId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGuide = () => {
    stopSpeech();
    setActiveGuideId(null);
  };

  // 8. Online / Offline state
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulatedOffline = () => {
    setSimulatedOffline(prev => !prev);
  };

  const effectiveOffline = !isOnline || simulatedOffline;

  // 9. Call Modal State
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [callingDetails, setCallingDetails] = useState<{ number: string; title: string }>({
    number: '112',
    title: 'Emergency Services (112)'
  });

  const initiateCall = (number = '112', title = 'Emergency Services (112)') => {
    setCallingDetails({ number, title });
    // Attempt standard tel: protocol
    // On mobile devices, window.location.href = tel:... triggers native dialer.
    // In desktop browser or iframe, it typically fails silently or triggers protocol handler.
    // As instructed: "Do not pretend that a call was successfully placed if the browser cannot actually place one."
    // We open a clear, verified confirmation & manual dial modal.
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `tel:${number}`;
      }
    } catch {
      // Ignored
    }
    // Always show the accessible modal with direct manual dial instructions and copy number
    setIsCallModalOpen(true);
  };

  const closeCallModal = () => {
    setIsCallModalOpen(false);
  };

  // 10. Message Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<string>('Severe Bleeding');

  const openMessageModal = (initialType = 'Severe Bleeding') => {
    setSelectedEmergencyType(initialType);
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  // 11. Demo & About Modal
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  // 12. Text to Speech
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const isTtsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stopSpeech = useCallback(() => {
    if (isTtsSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignored
      }
    }
    setIsSpeaking(false);
  }, [isTtsSupported]);

  const speakText = useCallback((text: string) => {
    if (!isTtsSupported) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.95; // Slightly measured pace for emergency comprehension
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  }, [isTtsSupported, language]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  // 13. Reset Data
  const resetAllData = () => {
    try {
      localStorage.removeItem('lifeline_language');
      localStorage.removeItem('lifeline_voice_guidance');
      localStorage.removeItem('lifeline_large_text');
      localStorage.removeItem('lifeline_user_name');
      localStorage.removeItem('lifeline_emergency_contact');
      localStorage.removeItem('lifeline_intro_completed');
    } catch {
      // Ignored
    }
    setLanguageState('en');
    setVoiceGuidanceState(true);
    setLargeTextState(false);
    setUserNameState('');
    setEmergencyContactState(null);
    setShowIntro(true);
    setActiveGuideId(null);
    setCurrentTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        voiceGuidance,
        setVoiceGuidance,
        largeText,
        setLargeText,
        userName,
        setUserName,
        emergencyContact,
        setEmergencyContact,
        currentTab,
        setCurrentTab,
        activeGuideId,
        openGuide,
        closeGuide,
        showIntro,
        completeIntro,
        revisitIntro,
        isOnline,
        simulatedOffline,
        toggleSimulatedOffline,
        effectiveOffline,
        isCallModalOpen,
        callingDetails,
        initiateCall,
        closeCallModal,
        isMessageModalOpen,
        openMessageModal,
        closeMessageModal,
        selectedEmergencyType,
        isDemoModalOpen,
        openDemoModal,
        closeDemoModal,
        isAboutModalOpen,
        openAboutModal,
        closeAboutModal,
        isSpeaking,
        isTtsSupported,
        speakText,
        stopSpeech,
        resetAllData
      }}
    >
      <div className={largeText ? 'text-lg leading-relaxed' : 'text-base'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
