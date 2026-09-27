/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Send, 
  Copy, 
  Share2, 
  Check, 
  AlertCircle, 
  Loader2,
  Navigation,
  User,
  AlertTriangle
} from 'lucide-react';

interface EmergencyMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmergencyType?: string;
}

export const EmergencyMessageModal: React.FC<EmergencyMessageModalProps> = ({
  isOpen,
  onClose,
  initialEmergencyType = 'Severe Bleeding'
}) => {
  const { 
    userName, 
    setUserName, 
    emergencyContact, 
    language 
  } = useApp();

  const [name, setName] = useState(userName);
  const [emergencyType, setEmergencyType] = useState(initialEmergencyType);
  const [customNotes, setCustomNotes] = useState(
    language === 'hi' 
      ? 'मुझे तत्काल आपातकालीन सहायता की आवश्यकता है। कृपया तुरंत मुझसे संपर्क करें।'
      : 'I need emergency assistance. Please contact me.'
  );

  // Geolocation state
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'acquired' | 'unavailable'>('idle');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState<string>('');

  // Toast / feedback states
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    setName(userName);
  }, [userName]);

  useEffect(() => {
    if (initialEmergencyType) {
      setEmergencyType(initialEmergencyType);
    }
  }, [initialEmergencyType]);

  if (!isOpen) return null;

  const handleAcquireLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('unavailable');
      setLocationErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('loading');
    setLocationErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: Number(position.coords.latitude.toFixed(5)),
          lng: Number(position.coords.longitude.toFixed(5)),
          accuracy: Math.round(position.coords.accuracy)
        });
        setLocationStatus('acquired');
      },
      (error) => {
        setLocationStatus('unavailable');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationErrorMsg('Location permission was denied. Please enable location permissions in browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationErrorMsg('Location information is currently unavailable from your device.');
            break;
          case error.TIMEOUT:
            setLocationErrorMsg('Location request timed out. Please check signal and retry.');
            break;
          default:
            setLocationErrorMsg('Unable to acquire location at this moment.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 30000
      }
    );
  };

  // Compile final message
  const generateMessageText = () => {
    let msg = `[LIFELINE SOS ALERT]\n`;
    if (name.trim()) {
      msg += `Name: ${name.trim()}\n`;
    }
    msg += `Emergency Type: ${emergencyType}\n`;
    msg += `Message: ${customNotes.trim()}\n`;

    if (coordinates) {
      msg += `Location: ${coordinates.lat}, ${coordinates.lng} (Accuracy: ~${coordinates.accuracy}m)\n`;
      msg += `Map Link: https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}\n`;
    } else {
      msg += `Location: [Location not acquired - Please share landmarks]\n`;
    }

    msg += `Sent via LifeLine Offline Emergency Assistant`;
    return msg;
  };

  const handleSendMessage = () => {
    if (name.trim()) {
      setUserName(name.trim());
    }
    const finalMsg = generateMessageText();
    const targetPhone = emergencyContact?.phone || '';
    
    // Open native SMS app via sms: URI
    // Cross-platform format: sms:PHONE?body=MSG or sms:?body=MSG
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';
    const smsUrl = targetPhone 
      ? `sms:${targetPhone}${separator}body=${encodeURIComponent(finalMsg)}` 
      : `sms:${separator}body=${encodeURIComponent(finalMsg)}`;

    try {
      window.location.href = smsUrl;
    } catch {
      // Fallback to copy
      navigator.clipboard.writeText(finalMsg);
      setCopyFeedback(true);
    }
  };

  const handleCopyMessage = async () => {
    if (name.trim()) {
      setUserName(name.trim());
    }
    const finalMsg = generateMessageText();
    try {
      await navigator.clipboard.writeText(finalMsg);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    } catch {
      // Fallback
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    }
  };

  const handleShareMessage = async () => {
    if (name.trim()) {
      setUserName(name.trim());
    }
    const finalMsg = generateMessageText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LifeLine Emergency SOS Alert',
          text: finalMsg
        });
        setShareFeedback('Shared successfully');
        setTimeout(() => setShareFeedback(null), 3000);
      } catch (err) {
        // User cancelled or aborted
        if ((err as Error).name !== 'AbortError') {
          handleCopyMessage();
        }
      }
    } else {
      // Web Share API unavailable
      handleCopyMessage();
      setShareFeedback('Sharing not supported on this browser. Message copied to clipboard!');
      setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden my-auto">
        
        {/* Header (Section 9) */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-red-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-950 tracking-tight font-mono">
              {language === 'hi' ? 'आपातकालीन संदेश भेजें' : 'Send Emergency Message'}
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'hi' ? 'एसएमएस या शेयर के माध्यम से तुरंत सहायता संदेश' : 'Prepared emergency broadcast for contacts & responders'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Field: Your name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'आपका नाम' : 'Your Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Alex Morgan'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 font-medium"
              />
            </div>
          </div>

          {/* Field: Emergency type */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'आपातकाल का प्रकार' : 'Emergency Type'}
            </label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
            >
              <option value="Severe Bleeding">{language === 'hi' ? 'अत्यधिक रक्तस्राव (Severe Bleeding)' : 'Severe Bleeding'}</option>
              <option value="Burns">{language === 'hi' ? 'जलना / बर्न (Burns)' : 'Burns'}</option>
              <option value="CPR / Unresponsive">{language === 'hi' ? 'सीपीआर / बेहोशी (CPR / Unresponsive)' : 'CPR / Unresponsive'}</option>
              <option value="Choking">{language === 'hi' ? 'दम घुटना (Choking)' : 'Choking'}</option>
              <option value="Snake Bite">{language === 'hi' ? 'सांप का काटना (Snake Bite)' : 'Snake Bite'}</option>
              <option value="Fracture / Trauma">{language === 'hi' ? 'हड्डी टूटना (Fracture / Trauma)' : 'Fracture / Trauma'}</option>
              <option value="General SOS">{language === 'hi' ? 'सामान्य आपातकाल (General SOS)' : 'General SOS'}</option>
            </select>
          </div>

          {/* Field: Message (editable) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'संदेश (Message)' : 'Message'}
            </label>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium leading-relaxed"
              placeholder="I need emergency assistance. Please contact me."
            />
          </div>

          {/* Location Acquisition Section (Section 9) */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  {language === 'hi' ? 'भौगोलिक स्थिति' : 'Geolocation'}
                </span>
              </div>

              {/* Status display (Section 9: Location acquired or Location unavailable) */}
              <div>
                {locationStatus === 'acquired' && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {language === 'hi' ? 'स्थान प्राप्त हुआ' : 'Location acquired'}
                  </span>
                )}
                {locationStatus === 'unavailable' && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {language === 'hi' ? 'स्थान अनुपलब्ध' : 'Location unavailable'}
                  </span>
                )}
                {locationStatus === 'loading' && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {language === 'hi' ? 'खोज रहे हैं...' : 'Acquiring...'}
                  </span>
                )}
              </div>
            </div>

            {/* BUTTON: USE CURRENT LOCATION (Section 9) */}
            <button
              type="button"
              onClick={handleAcquireLocation}
              disabled={locationStatus === 'loading'}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 text-gray-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-red-600" />
              <span>{language === 'hi' ? 'वर्तमान स्थान का उपयोग करें' : 'USE CURRENT LOCATION'}</span>
            </button>

            {/* Coordinates display or honest error */}
            {coordinates && locationStatus === 'acquired' && (
              <div className="mt-2.5 p-2 bg-white rounded-lg border border-emerald-200 text-xs text-emerald-950 font-mono">
                <div>Coords: {coordinates.lat}, {coordinates.lng}</div>
                <div className="text-[11px] text-gray-500">Accuracy: ±{coordinates.accuracy} meters</div>
              </div>
            )}

            {locationErrorMsg && (
              <p className="mt-2 text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                {locationErrorMsg}
              </p>
            )}
          </div>

          {/* Emergency Contact target notice */}
          {emergencyContact ? (
            <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <span className="font-bold text-blue-900">
                {language === 'hi' ? 'निर्दिष्ट संपर्क:' : 'Configured Contact:'}
              </span>{' '}
              {emergencyContact.name} ({emergencyContact.phone})
            </div>
          ) : (
            <div className="text-xs text-gray-500 bg-gray-50 rounded-xl p-2.5 border border-gray-200">
              {language === 'hi' 
                ? 'सुझाव: सेटिंग्स में अपना आपातकालीन संपर्क नंबर जोड़ें।' 
                : 'Tip: Add an emergency contact number in Settings for 1-tap dispatch.'}
            </div>
          )}

          {/* Feedback toasts */}
          {copyFeedback && (
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center animate-fade-in flex items-center justify-center space-x-1.5">
              <Check className="w-4 h-4" />
              <span>{language === 'hi' ? 'संदेश क्लिपबोर्ड पर कॉपी हो गया!' : 'Message copied to clipboard!'}</span>
            </div>
          )}

          {shareFeedback && (
            <div className="p-2.5 bg-gray-800 text-white rounded-xl text-xs font-bold text-center">
              {shareFeedback}
            </div>
          )}
        </div>

        {/* Modal Actions (SEND MESSAGE, COPY MESSAGE, SHARE) (Section 9) */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
          {/* SEND MESSAGE */}
          <button
            onClick={handleSendMessage}
            className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'hi' ? 'संदेश भेजें (SMS)' : 'SEND MESSAGE'}</span>
          </button>

          {/* COPY MESSAGE */}
          <button
            onClick={handleCopyMessage}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 text-gray-800 font-bold text-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            title="Copy message to clipboard"
          >
            <Copy className="w-4 h-4 text-gray-600" />
            <span>{language === 'hi' ? 'कॉपी' : 'COPY'}</span>
          </button>

          {/* SHARE */}
          <button
            onClick={handleShareMessage}
            className="py-3 px-4 rounded-xl bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 text-gray-800 font-bold text-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            title="Share via device share sheet"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>{language === 'hi' ? 'शेयर' : 'SHARE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
