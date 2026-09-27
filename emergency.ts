/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi';

export type EmergencyGuideId = 
  | 'severe-bleeding'
  | 'burns'
  | 'cpr'
  | 'choking'
  | 'snake-bite'
  | 'fracture';

export interface FirstAidStep {
  stepNumber: number;
  title: string;
  instruction: string;
  details: string[];
  visualHint?: string;
}

export interface EmergencyGuide {
  id: EmergencyGuideId;
  title: string;
  subtitle: string;
  iconType: 'bandage' | 'flame' | 'heart' | 'airway' | 'snake' | 'bone';
  severity: 'critical' | 'high' | 'urgent';
  stayCalmMessage: string;
  warning: string;
  steps: FirstAidStep[];
  doNot: string[];
  medicalDisclaimer: string;
  language: Language;
  lastVerified?: string;
  verifiedBy?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship?: string;
}

export interface OfficialEmergencyNumber {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: 'primary' | 'police' | 'medical' | 'fire' | 'specialized';
}
