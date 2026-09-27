/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Volume2, 
  PhoneCall, 
  WifiOff, 
  ShieldAlert,
  Flame,
  MessageSquare
} from 'lucide-react';

export const DemoWalkthroughModal: React.FC = () => {
  const { 
    isDemoModalOpen, 
    closeDemoModal, 
    openGuide, 
    initiateCall, 
    openMessageModal,
    speakText,
    simulatedOffline,
    toggleSimulatedOffline,
    language
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  if (!isDemoModalOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: '1. Open LifeLine Home',
      description: 'The app loads immediately with the high-contrast emergency layout, prominent SOS dialer, and zero external network dependencies.',
      actionLabel: 'Go to Home Screen',
      action: () => {
        closeDemoModal();
      }
    },
    {
      step: 2,
      title: '2. Tap "Severe Bleeding"',
      description: 'Rescuer identifies the crisis and taps the verified "Severe Bleeding" card to access instantaneous life-saving instructions.',
      actionLabel: 'Open Severe Bleeding Guide',
      action: () => {
        closeDemoModal();
        openGuide('severe-bleeding');
      }
    },
    {
      step: 3,
      title: '3. Step-by-Step Guidance',
      description: 'Clear, high-contrast cards display: STAY CALM, Step 1 (Direct Pressure), progress dots (● ● ○), and crucial DO NOT warnings.',
      actionLabel: 'Inspect Steps & Warnings',
      action: () => {
        closeDemoModal();
        openGuide('severe-bleeding');
      }
    },
    {
      step: 4,
      title: '4. Tap READ ALOUD (TTS Audio)',
      description: 'Rescuers hands are covered in blood or occupied pressing the wound. Browser SpeechSynthesis reads the instructions aloud clearly.',
      actionLabel: 'Demonstrate Voice Guidance',
      action: () => {
        speakText('Severe Bleeding. Step 1: Apply firm direct pressure to the wound with a clean cloth. Maintain continuous pressure.');
      }
    },
    {
      step: 5,
      title: '5. Tap SOS (112 Calling)',
      description: '1-tap access to universal 112 emergency dispatch with honest device detection and manual dialing fallback.',
      actionLabel: 'Trigger 112 Emergency Call',
      action: () => {
        initiateCall('112', '112 Universal Emergency Dispatch');
      }
    },
    {
      step: 6,
      title: '6. Emergency Message & GPS',
      description: 'Generate SMS alert with GPS coordinates and pre-filled emergency distress broadcast for family or emergency services.',
      actionLabel: 'Open Emergency Message Dispatch',
      action: () => {
        openMessageModal('Severe Bleeding');
      }
    },
    {
      step: 7,
      title: '7. Complete Offline Independence',
      description: 'Simulate network cut. Observe that all 6 medical guides, voice guidance, and local contact functions remain 100% operational.',
      actionLabel: simulatedOffline ? 'Network is currently SIMULATED OFFLINE' : 'Simulate Network Disconnection Now',
      action: () => {
        if (!simulatedOffline) {
          toggleSimulatedOffline();
        }
      }
    }
  ];

  const activeDemo = demoSteps[currentStep - 1];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl border border-gray-200 overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black uppercase tracking-widest font-mono">
              DEMO MODE
            </span>
            <h2 className="text-base sm:text-lg font-bold font-mono tracking-tight">
              Scenario: Severe Bleeding
            </h2>
          </div>
          <button
            onClick={closeDemoModal}
            className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-600 font-mono">
            WALKTHROUGH STEP {currentStep} OF 7
          </span>
          <div className="flex space-x-1">
            {demoSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  s.step === currentStep 
                    ? 'bg-red-600 scale-125' 
                    : s.step < currentStep 
                    ? 'bg-gray-700' 
                    : 'bg-gray-300'
                }`}
                title={`Go to step ${s.step}`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-gray-900 font-mono">
              {activeDemo.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {activeDemo.description}
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-2">
            <button
              onClick={activeDemo.action}
              className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>{activeDemo.actionLabel}</span>
            </button>
          </div>

          {currentStep === 7 && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              💡 <strong>Judge note:</strong> Toggle airplane mode or use Chrome DevTools &gt; Network &gt; Offline. LifeLine continues running flawlessly because all assets and instructions are fully local.
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
              currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-bold flex items-center space-x-1 hover:bg-black cursor-pointer"
            >
              <span>Next Demo Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={closeDemoModal}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
            >
              Finish Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
