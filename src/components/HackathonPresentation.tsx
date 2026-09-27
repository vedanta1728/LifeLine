/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, AlertTriangle, Lightbulb, Compass, Rocket, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const HackathonPresentation: React.FC = () => {
  const { isAboutModalOpen, closeAboutModal, language } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-red-200 font-mono">
                HACKATHON SHOWCASE
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight leading-tight">
                About Project LifeLine
              </h2>
            </div>
          </div>
          <button
            onClick={closeAboutModal}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Section 22: Problem, Solution, Differentiator, Future possibilities) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Mission Quote */}
          <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-center">
            <p className="text-base sm:text-lg font-bold text-red-950 font-serif italic">
              «“When the internet fails, LifeLine still helps.”»
            </p>
          </div>

          {/* 1. Problem */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 font-mono uppercase tracking-wide">
                1. The Problem
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              During medical emergencies and disasters, individuals panic, make critical first-aid errors, or find themselves in basements, rural transit zones, or congested networks with zero internet connectivity. Standard apps and search engines fail completely when connection drops.
            </p>
          </div>

          {/* 2. Solution */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Lightbulb className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 font-mono uppercase tracking-wide">
                2. The Solution
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              LifeLine provides instant, verified, offline-first first-aid guidance and one-touch emergency actions. All medical protocols are stored locally as static structured assets — requiring no active AI hallucinations or network connectivity once loaded.
            </p>
          </div>

          {/* 3. Differentiator */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-blue-600">
              <Compass className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 font-mono uppercase tracking-wide">
                3. Key Differentiator
              </h3>
            </div>
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-2 text-blue-950">
              <div className="font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Offline-First Architecture by Design</span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                Zero external cloud dependencies for critical guidance, high-contrast stress-resistant typography, integrated browser text-to-speech for hands-free listening while treating victims, and built-in 110 BPM CPR pacing metronome.
              </p>
            </div>
          </div>

          {/* 4. Future Possibilities (Roadmap) */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-purple-600">
              <Rocket className="w-5 h-5 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-900 font-mono uppercase tracking-wide">
                4. Future Possibilities (Roadmap)
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              (Planned future extensions — clearly delineated from current MVP capabilities):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Regional Indian Languages:</strong> Marathi, Tamil, Telugu, Bengali, Kannada.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Medical Partnerships:</strong> Verified content certification with Red Cross & St. John Ambulance.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Wearable Integration:</strong> Fall detection & quick SOS trigger on smartwatches.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Disaster Mode:</strong> Earthquake, flood, cyclone, and chemical leak survival kits.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Accessibility Upgrades:</strong> Full screen-reader haptics & high-glare outdoor mode.</span>
              </div>
              <div className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-start space-x-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Dispatch Integration:</strong> Automated PSAP (112) location telemetry injection.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={closeAboutModal}
            className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
