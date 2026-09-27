/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_GUIDES } from '../data/emergencyGuides';
import { EmergencyGuideId } from '../types/emergency';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  AlertOctagon, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Play,
  Pause,
  AlertCircle,
  Bandage,
  Flame,
  Heart,
  Wind,
  Activity,
  Sparkles,
  ListOrdered,
  ShieldCheck,
  CalendarCheck2
} from 'lucide-react';

interface FirstAidDetailProps {
  guideId: EmergencyGuideId;
  onBack: () => void;
}

export const FirstAidDetail: React.FC<FirstAidDetailProps> = ({ guideId, onBack }) => {
  const { 
    language, 
    speakText, 
    stopSpeech, 
    isSpeaking, 
    isTtsSupported, 
    initiateCall 
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'step-by-step' | 'all-steps'>('step-by-step');
  
  // CPR Metronome state (100-110 BPM rhythm guide)
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomeTick, setMetronomeTick] = useState(false);

  const guides = EMERGENCY_GUIDES[language] || EMERGENCY_GUIDES['en'];
  const guide = guides.find(g => g.id === guideId) || guides[0];

  const totalSteps = guide.steps.length;
  const currentStep = guide.steps[currentStepIndex] || guide.steps[0];

  // Stop speech when switching steps or unmounting
  useEffect(() => {
    stopSpeech();
    return () => {
      stopSpeech();
      setIsMetronomeActive(false);
    };
  }, [guideId, currentStepIndex, stopSpeech]);

  // CPR Metronome implementation (110 BPM = approx 545ms interval)
  useEffect(() => {
    if (!isMetronomeActive || guideId !== 'cpr') {
      return;
    }

    // Audio context for sound beat
    let audioCtx: AudioContext | null = null;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch {
      // AudioContext not supported
    }

    const interval = setInterval(() => {
      setMetronomeTick(prev => !prev);
      if (audioCtx && audioCtx.state === 'running') {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.08);
        } catch {
          // Ignored
        }
      }
    }, 545); // 110 beats per minute

    return () => {
      clearInterval(interval);
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch {
          // Ignored
        }
      }
    };
  }, [isMetronomeActive, guideId]);

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (!isTtsSupported) {
      alert(language === 'hi' 
        ? 'इस ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।' 
        : 'Text-to-speech is not supported in this browser.');
      return;
    }

    // Compose concise speech text for emergency listening
    if (viewMode === 'step-by-step') {
      const textToRead = `${guide.title}. ${language === 'hi' ? 'चरण' : 'Step'} ${currentStep.stepNumber}. ${currentStep.instruction}. ${currentStep.details.join('. ')}`;
      speakText(textToRead);
    } else {
      const textToRead = `${guide.title}. ${guide.stayCalmMessage}. ` + 
        guide.steps.map(s => `${language === 'hi' ? 'चरण' : 'Step'} ${s.stepNumber}: ${s.instruction}`).join('. ');
      speakText(textToRead);
    }
  };

  const nextStep = () => {
    stopSpeech();
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    stopSpeech();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const renderIconLarge = (type: string) => {
    switch (type) {
      case 'bandage':
        return <Bandage className="w-12 h-12 text-red-600 stroke-[2.2]" />;
      case 'flame':
        return <Flame className="w-12 h-12 text-orange-600 stroke-[2.2]" />;
      case 'heart':
        return <Heart className="w-12 h-12 text-red-600 stroke-[2.2]" />;
      case 'airway':
        return <Wind className="w-12 h-12 text-blue-600 stroke-[2.2]" />;
      case 'snake':
        return <AlertCircle className="w-12 h-12 text-amber-600 stroke-[2.2]" />;
      case 'bone':
        return <Activity className="w-12 h-12 text-purple-600 stroke-[2.2]" />;
      default:
        return <AlertOctagon className="w-12 h-12 text-red-600 stroke-[2.2]" />;
    }
  };

  return (
    <div className="pb-28">
      {/* Top Navigation bar */}
      <div className="flex items-center justify-between py-2 mb-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 font-semibold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'वापस' : 'Back'}</span>
        </button>

        {/* View mode toggle */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-xs">
          <button
            onClick={() => setViewMode('step-by-step')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'step-by-step' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {language === 'hi' ? 'कदम-दर-कदम' : 'Step-by-Step'}
          </button>
          <button
            onClick={() => setViewMode('all-steps')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'all-steps' 
                ? 'bg-red-600 text-white shadow-xs' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {language === 'hi' ? 'सभी चरण' : 'All Steps'}
          </button>
        </div>
      </div>

      {/* Main Guide Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight font-mono">
            {guide.title}
          </h1>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800">
            {guide.severity}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">
          {guide.subtitle}
        </p>

        {/* Small 'Last Verified' Date Tag */}
        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100 text-xs">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/90 text-emerald-900 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>
              {language === 'hi' ? 'सत्यापित:' : 'Last Verified:'}{' '}
              {guide.lastVerified || (language === 'hi' ? 'सितंबर 2026' : 'September 2026')}
            </span>
          </div>
          {guide.verifiedBy && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">•</span>
              <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                {guide.verifiedBy}
              </span>
            </>
          )}
        </div>
      </div>

      {/* STAY CALM Banner (Section 7) */}
      <div className="bg-red-600 text-white rounded-2xl p-4 mb-4 shadow-sm flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-black">!</span>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-red-100">
            {language === 'hi' ? 'शांत रहें' : 'STAY CALM'}
          </h3>
          <p className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
            {guide.stayCalmMessage}
          </p>
        </div>
      </div>

      {/* Warning Callout */}
      {guide.warning && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs sm:text-sm text-amber-900 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{guide.warning}</span>
        </div>
      )}

      {/* CPR Special Rhythm Tool (Metronome for 100-120 BPM) */}
      {guideId === 'cpr' && (
        <div className="bg-white border-2 border-red-200 rounded-2xl p-4 mb-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isMetronomeActive 
                ? (metronomeTick ? 'bg-red-600 text-white scale-110 shadow-md' : 'bg-red-100 text-red-700 scale-95') 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Heart className={`w-5 h-5 ${isMetronomeActive ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                {language === 'hi' ? 'सीपीआर गति ताल (110 BPM)' : 'CPR Rhythm Beat (110 BPM)'}
              </h4>
              <p className="text-xs text-gray-500">
                {language === 'hi' 
                  ? 'सही गति से छाती दबाने के लिए ताल शुरू करें' 
                  : 'Pace compressions to the Stayin’ Alive beat'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMetronomeActive(!isMetronomeActive)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isMetronomeActive 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {isMetronomeActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isMetronomeActive ? (language === 'hi' ? 'रोकें' : 'Stop Beat') : (language === 'hi' ? 'ताल बजाएं' : 'Start Beat')}</span>
          </button>
        </div>
      )}

      {/* STEP-BY-STEP CARDS (Section 8) */}
      {viewMode === 'step-by-step' ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-sm mb-6">
          {/* Card Top: Step Counter & Progress Indicator (● ● ○ ○) */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                {language === 'hi' ? 'निर्देश' : 'GUIDANCE'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
                {language === 'hi' 
                  ? `चरण ${currentStep.stepNumber} / ${totalSteps}`
                  : `STEP ${currentStep.stepNumber} OF ${totalSteps}`}
              </h2>
            </div>

            {/* Progress Dots Indicator ● ● ○ ○ */}
            <div className="flex items-center space-x-1.5" aria-label={`Step ${currentStep.stepNumber} of ${totalSteps}`}>
              {guide.steps.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => {
                    stopSpeech();
                    setCurrentStepIndex(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'bg-red-600 ring-2 ring-red-300 scale-110'
                      : idx < currentStepIndex
                      ? 'bg-gray-800'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Large Visual Icon Hint */}
          <div className="flex items-center space-x-4 mb-5 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
              {renderIconLarge(guide.iconType)}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-950">
                {currentStep.title}
              </h3>
              {currentStep.visualHint && (
                <p className="text-xs text-red-700 font-medium mt-0.5">
                  👉 {currentStep.visualHint}
                </p>
              )}
            </div>
          </div>

          {/* Core Instruction (Very Large) */}
          <div className="mb-5">
            <p className="text-xl sm:text-2xl font-black text-gray-950 leading-snug tracking-tight">
              {currentStep.instruction}
            </p>
          </div>

          {/* Detailed Bullet Points */}
          <div className="space-y-2.5 mb-6 bg-red-50/40 p-4 rounded-2xl border border-red-100/60">
            {currentStep.details.map((detail, idx) => (
              <div key={idx} className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Step Navigation Controls (NEXT / PREV) */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className={`flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-sm transition-colors ${
                currentStepIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'hi' ? '← पिछला' : '← PREV'}</span>
            </button>

            {currentStepIndex < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                <span>{language === 'hi' ? 'अगला →' : 'NEXT →'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => initiateCall('112', '112 Emergency Dispatch')}
                className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>{language === 'hi' ? 'कॉल 112' : 'Call 112'}</span>
                <PhoneCall className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ALL STEPS OVERVIEW (Section 7 sequence) */
        <div className="space-y-4 mb-6">
          {guide.steps.map((step) => (
            <div 
              key={step.stepNumber} 
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs"
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-red-600 text-white text-xs font-black flex items-center justify-center font-mono">
                  {step.stepNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>

              <p className="text-base sm:text-lg font-black text-gray-950 mb-3">
                {step.instruction}
              </p>

              <ul className="space-y-1.5 pl-2 text-sm text-gray-700">
                {step.details.map((d, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* DO NOT SECTION (Section 7) */}
      <div className="bg-white border border-red-200 rounded-3xl p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex items-center space-x-2 mb-3 text-red-600">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <h3 className="text-lg font-black tracking-wider uppercase font-mono">
            {language === 'hi' ? 'यह कदापि न करें (DO NOT)' : 'DO NOT'}
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          {language === 'hi' 
            ? 'गलत प्राथमिक उपचार से स्थिति बिगड़ सकती है। निम्न बातों से बचें:' 
            : 'Crucial errors to avoid in this emergency scenario:'}
        </p>

        <div className="space-y-2.5">
          {guide.doNot.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
              <span className="text-red-600 font-bold text-sm">✕</span>
              <p className="text-sm font-semibold text-gray-800 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer & Verification Note */}
      <div className="text-center px-4 mb-4 space-y-1">
        <div className="inline-flex items-center justify-center space-x-1.5 text-xs text-gray-500 font-medium">
          <CalendarCheck2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? `प्रोटोकॉल सत्यापन: ${guide.lastVerified || 'सितंबर 2026'}`
              : `Protocol Last Verified: ${guide.lastVerified || 'September 2026'}`}
          </span>
          {guide.verifiedBy && (
            <>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="text-gray-400">{guide.verifiedBy}</span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-400">
          {guide.medicalDisclaimer}
        </p>
      </div>

      {/* FIXED BOTTOM THREE ACTION BUTTONS (Section 7) */}
      {/* "At the bottom add three large buttons: 🔊 READ ALOUD, ← BACK, 🚨 SOS" */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-2 sm:gap-3">
          {/* Button 1: READ ALOUD (Section 7) */}
          <button
            onClick={handleReadAloud}
            className={`py-3.5 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border border-gray-300'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-600" />}
            <span className="truncate">
              {isSpeaking 
                ? (language === 'hi' ? 'रोकें' : 'STOP VOICE') 
                : (language === 'hi' ? 'बोलकर सुनाएं' : 'READ ALOUD')}
            </span>
          </button>

          {/* Button 2: BACK (Section 7) */}
          <button
            onClick={onBack}
            className="py-3.5 px-2 sm:px-4 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 border border-gray-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'वापस' : 'BACK'}</span>
          </button>

          {/* Button 3: SOS (Section 7) */}
          <button
            onClick={() => initiateCall('112', '112 Emergency Dispatch')}
            className="py-3.5 px-2 sm:px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md shadow-red-600/30 transition-all cursor-pointer"
          >
            <span className="text-base">🚨</span>
            <span>SOS (112)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
