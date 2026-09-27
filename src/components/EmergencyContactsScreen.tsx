/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_EMERGENCY_NUMBERS } from '../data/emergencyContacts';
import { 
  PhoneCall, 
  Shield, 
  Flame, 
  HeartHandshake, 
  UserCheck, 
  PlusCircle, 
  MessageSquare,
  AlertTriangle,
  LifeBuoy
} from 'lucide-react';

export const EmergencyContactsScreen: React.FC = () => {
  const { 
    initiateCall, 
    emergencyContact, 
    setCurrentTab, 
    openMessageModal,
    language 
  } = useApp();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'police':
        return <Shield className="w-5 h-5 text-blue-600" />;
      case 'medical':
        return <HeartHandshake className="w-5 h-5 text-red-600" />;
      case 'fire':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'specialized':
        return <LifeBuoy className="w-5 h-5 text-amber-600" />;
      default:
        return <PhoneCall className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 font-mono tracking-tight">
          {language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {language === 'hi'
            ? 'सत्यापित आधिकारिक आपातकालीन हेल्पलाइन नंबर और व्यक्तिगत संपर्क'
            : 'Verified official emergency dispatch numbers and personal contacts'}
        </p>
      </div>

      {/* 112 Universal SOS Card (Section 10) */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-red-600/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-black tracking-widest uppercase mb-3">
            {language === 'hi' ? 'सार्वभौमिक आपातकालीन नंबर' : 'Universal Emergency SOS'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight mb-1">
            112
          </h2>
          <p className="text-sm font-semibold text-red-100 max-w-sm mb-6">
            {language === 'hi'
              ? '112 — आपातकालीन सहायता (पुलिस, चिकित्सा व अग्निशामक सेवा हेतु सिंगल आपातकालीन नंबर)'
              : '112 — All-in-one Emergency Response (Police, Ambulance, and Fire Rescue across India & Europe)'}
          </p>

          {/* LARGE "CALL 112" BUTTON (Section 10) */}
          <button
            onClick={() => initiateCall('112', '112 Universal Emergency Response')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white hover:bg-gray-100 active:scale-[0.99] text-red-700 font-black text-base sm:text-lg rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>{language === 'hi' ? '112 पर कॉल करें' : 'CALL 112'}</span>
          </button>
        </div>
      </div>

      {/* Personal Emergency Contact Section */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-gray-700" />
            <h3 className="text-base font-bold text-gray-900">
              {language === 'hi' ? 'व्यक्तिगत आपातकालीन संपर्क' : 'Personal Emergency Contact'}
            </h3>
          </div>
          <button
            onClick={() => setCurrentTab('settings')}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
          >
            {emergencyContact 
              ? (language === 'hi' ? 'बदलें' : 'Edit') 
              : (language === 'hi' ? 'जोड़ें' : 'Configure')}
          </button>
        </div>

        {emergencyContact ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-200 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-gray-900 text-base">{emergencyContact.name}</span>
                {emergencyContact.relationship && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-semibold">
                    {emergencyContact.relationship}
                  </span>
                )}
              </div>
              <p className="text-sm font-mono text-gray-600 mt-0.5">{emergencyContact.phone}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => initiateCall(emergencyContact.phone, emergencyContact.name)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'कॉल' : 'Call'}</span>
              </button>
              <button
                onClick={() => openMessageModal('Emergency for Contact')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                <span>{language === 'hi' ? 'एसएमएस' : 'SMS'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
            <PlusCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">
              {language === 'hi' ? 'कोई आपातकालीन संपर्क नहीं जोड़ा गया है' : 'No emergency contact set'}
            </p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 mb-3">
              {language === 'hi' 
                ? 'अपने परिवार के सदस्य या मित्र का नंबर सहेजें' 
                : 'Save a trusted family member or friend to reach them in 1 tap'}
            </p>
            <button
              onClick={() => setCurrentTab('settings')}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'संपर्क जोड़ें' : 'Add Emergency Contact'}
            </button>
          </div>
        )}
      </div>

      {/* Official Emergency Helplines (Section 10: Police, Ambulance, Fire, etc.) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-1">
          {language === 'hi' ? 'आधिकारिक आपातकालीन हेल्पलाइन' : 'Official Emergency Helplines'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OFFICIAL_EMERGENCY_NUMBERS.filter(n => n.id !== 'universal-112').map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between gap-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  {getCategoryIcon(service.category)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-gray-900 font-mono">
                      {service.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                      {service.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                    {service.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => initiateCall(service.number, service.title)}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-700 border border-gray-200 text-gray-800 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer flex-shrink-0"
                title={`Call ${service.number}`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'कॉल' : 'Call'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Advisory */}
      <div className="p-4 bg-gray-100/80 rounded-2xl border border-gray-200 text-xs text-gray-600 flex items-start space-x-3">
        <AlertTriangle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
        <p>
          {language === 'hi'
            ? 'आपातकालीन नंबरों पर कॉल करते समय अपना पता और लैंडमार्क सबसे पहले बताएं। अनावश्यक रूप से आपातकालीन लाइनों को व्यस्त न रखें।'
            : 'When speaking to dispatchers, state your exact location and landmarks first. Keep emergency lines free for active crises.'}
        </p>
      </div>
    </div>
  );
};
