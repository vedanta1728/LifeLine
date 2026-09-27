/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  Volume2, 
  Type, 
  UserPlus, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Save,
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    language,
    setLanguage,
    voiceGuidance,
    setVoiceGuidance,
    largeText,
    setLargeText,
    emergencyContact,
    setEmergencyContact,
    userName,
    setUserName,
    openDemoModal,
    openAboutModal,
    revisitIntro,
    resetAllData
  } = useApp();

  // Local state for contact editing
  const [contactName, setContactName] = useState(emergencyContact?.name || '');
  const [contactPhone, setContactPhone] = useState(emergencyContact?.phone || '');
  const [contactRelation, setContactRelation] = useState(emergencyContact?.relationship || '');
  const [savedContactSuccess, setSavedContactSuccess] = useState(false);

  // Local state for personal profile
  const [profileName, setProfileName] = useState(userName);
  const [savedProfileSuccess, setSavedProfileSuccess] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      alert(language === 'hi' ? 'कृपया नाम और फोन नंबर दर्ज करें' : 'Please provide both name and phone number');
      return;
    }
    setEmergencyContact({
      name: contactName.trim(),
      phone: contactPhone.trim(),
      relationship: contactRelation.trim() || undefined
    });
    setSavedContactSuccess(true);
    setTimeout(() => setSavedContactSuccess(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(profileName.trim());
    setSavedProfileSuccess(true);
    setTimeout(() => setSavedProfileSuccess(false), 3000);
  };

  const handleConfirmReset = () => {
    if (window.confirm(
      language === 'hi' 
        ? 'क्या आप सभी सहेजे गए डेटा को रीसेट करना चाहते हैं?' 
        : 'Are you sure you want to reset all saved settings and contacts?'
    )) {
      resetAllData();
    }
  };

  return (
    <div className="pb-28 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 font-mono tracking-tight">
          {language === 'hi' ? 'सेटिंग्स' : 'Settings'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {language === 'hi'
            ? 'भाषा, आवाज मार्गदर्शन, व्यक्तिगत संपर्क और सुगम्यता प्राथमिकताएं'
            : 'Language, voice guidance, personal contact, and accessibility preferences'}
        </p>
      </div>

      {/* 1. Language Option (Section 12 & 13) */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {language === 'hi' ? 'भाषा (Language)' : 'Language'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'hi' ? 'स्थानीय प्राथमिक सहायता सामग्री भाषा चुनें' : 'Choose local first-aid content language'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('en')}
            className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-red-600 border-red-600 text-white shadow-xs'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>English</span>
            {language === 'en' && <Check className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setLanguage('hi')}
            className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
              language === 'hi'
                ? 'bg-red-600 border-red-600 text-white shadow-xs'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>हिन्दी (Hindi)</span>
            {language === 'hi' && <Check className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Voice Guidance (Section 13: On / Off) */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {language === 'hi' ? 'आवाज मार्गदर्शन (Voice Guidance)' : 'Voice Guidance'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'hi' ? 'ब्राउज़र टेक्स्ट-टू-स्पीच द्वारा पढ़कर सुनाएं' : 'Browser Text-to-Speech audio assistance'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setVoiceGuidance(!voiceGuidance)}
            className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
              voiceGuidance ? 'bg-red-600' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={voiceGuidance}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                voiceGuidance ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Large Text (Section 13: On / Off) */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {language === 'hi' ? 'बड़ा टेक्स्ट (Large Text)' : 'Large Text'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'hi' ? 'तनावपूर्ण परिस्थितियों या दृष्टि बाधा के लिए बड़ा फॉन्ट' : 'Increase typography size for stressful situations'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setLargeText(!largeText)}
            className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
              largeText ? 'bg-red-600' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={largeText}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                largeText ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. Emergency Contact (Section 13) */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {language === 'hi' ? 'आपातकालीन संपर्क (Emergency Contact)' : 'Emergency Contact'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'hi' ? '1-टैप एसओएस कॉलिंग और एसएमएस हेतु संपर्क' : 'Saved contact for instant 1-tap SOS SMS and calls'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveContact} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {language === 'hi' ? 'संपर्क का नाम' : 'Contact Name'}
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={language === 'hi' ? 'उदा. डॉ. शर्मा / माताजी' : 'e.g. Sarah / Mom'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                {language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              {language === 'hi' ? 'संबंध (वैकल्पिक)' : 'Relationship (Optional)'}
            </label>
            <input
              type="text"
              value={contactRelation}
              onChange={(e) => setContactRelation(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. परिवार, डॉक्टर, मित्र' : 'e.g. Spouse, Physician, Friend'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'संपर्क सहेजें' : 'Save Contact'}</span>
            </button>

            {savedContactSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>{language === 'hi' ? 'सफलतापूर्वक सहेजा गया' : 'Saved successfully'}</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 5. User Profile Name */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-1">
          {language === 'hi' ? 'आपका नाम (एसओएस संदेश हेतु)' : 'Your Name (For SOS Broadcasts)'}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {language === 'hi' ? 'यह नाम आपके आपातकालीन संदेशों में स्वतः शामिल किया जाता है।' : 'Pre-fills your emergency SOS SMS message.'}
        </p>

        <form onSubmit={handleSaveProfile} className="flex gap-2">
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Your name"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'सहेजें' : 'Save'}
          </button>
        </form>
        {savedProfileSuccess && (
          <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'नाम सहेज लिया गया' : 'Profile name saved'}</span>
          </p>
        )}
      </div>

      {/* 6. Hackathon / Presentation Links */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {language === 'hi' ? 'प्रोजेक्ट और डेमो' : 'Project & Demo Tools'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={openDemoModal}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-left flex items-center justify-between text-xs font-bold text-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>{language === 'hi' ? 'हैकथॉन डेमो चलाएं' : 'Run Hackathon Demo'}</span>
            </div>
            <span className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-mono">DEMO</span>
          </button>

          <button
            onClick={openAboutModal}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-left flex items-center justify-between text-xs font-bold text-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{language === 'hi' ? 'प्रोजेक्ट के बारे में' : 'About the Project'}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <button
            onClick={revisitIntro}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-left flex items-center space-x-2 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>{language === 'hi' ? 'इंट्रो स्क्रीन दोबारा देखें' : 'Replay Intro Screen'}</span>
          </button>

          <button
            onClick={handleConfirmReset}
            className="py-3 px-4 rounded-xl bg-white hover:bg-rose-50 border border-gray-200 text-left flex items-center space-x-2 text-xs font-bold text-rose-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>{language === 'hi' ? 'सभी डेटा रीसेट करें' : 'Reset All Local Data'}</span>
          </button>
        </div>
      </div>

      {/* 7. About LifeLine Mandatory Disclaimer (Section 13) */}
      {/* «“LifeLine provides general emergency guidance and does not replace trained medical professionals or emergency responders.”» */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-gray-900 font-mono tracking-wider uppercase">
          About LifeLine
        </h4>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto italic leading-relaxed">
          {language === 'hi'
            ? '“लाइफलाइन सामान्य आपातकालीन मार्गदर्शन प्रदान करती है और यह प्रशिक्षित चिकित्सा पेशेवरों या आपातकालीन सेवाओं का विकल्प नहीं है।”'
            : '“LifeLine provides general emergency guidance and does not replace trained medical professionals or emergency responders.”'}
        </p>
        <p className="text-[11px] text-gray-400 pt-1">
          LifeLine v1.0.0 • Offline-first Emergency Assistant • Hackathon MVP
        </p>
      </div>
    </div>
  );
};
