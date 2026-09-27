/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfficialEmergencyNumber } from '../types/emergency';

export const OFFICIAL_EMERGENCY_NUMBERS: OfficialEmergencyNumber[] = [
  {
    id: 'universal-112',
    number: '112',
    title: '112 — Emergency Response',
    subtitle: 'All-in-one emergency dispatch (Police, Fire, Medical)',
    badge: 'Universal SOS',
    category: 'primary'
  },
  {
    id: 'ambulance-108',
    number: '108',
    title: 'Ambulance & Emergency Medical',
    subtitle: 'Emergency Medical Services (EMS) & Trauma Response',
    badge: 'Medical',
    category: 'medical'
  },
  {
    id: 'police-100',
    number: '100',
    title: 'Police Assistance',
    subtitle: 'Law enforcement, safety & traffic emergencies',
    badge: 'Police',
    category: 'police'
  },
  {
    id: 'fire-101',
    number: '101',
    title: 'Fire & Rescue Services',
    subtitle: 'Fire extinguishing, gas leak, building entrapment',
    badge: 'Fire',
    category: 'fire'
  },
  {
    id: 'disaster-1078',
    number: '1078',
    title: 'National Disaster Helpline',
    subtitle: 'NDMA natural disaster rescue & flood/earthquake relief',
    badge: 'Disaster',
    category: 'specialized'
  },
  {
    id: 'women-1091',
    number: '1091',
    title: 'Women Safety Helpline',
    subtitle: 'Immediate distress response and protection',
    badge: 'Helpline',
    category: 'specialized'
  }
];
