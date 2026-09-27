/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmergencyGuide, Language } from '../types/emergency';

export const EMERGENCY_GUIDES: Record<Language, EmergencyGuide[]> = {
  en: [
    {
      id: 'severe-bleeding',
      title: 'Severe Bleeding',
      subtitle: 'Control bleeding quickly',
      iconType: 'bandage',
      severity: 'critical',
      stayCalmMessage: 'STAY CALM — Continuous firm pressure is the most effective way to stop bleeding.',
      warning: 'Call 112 immediately if bleeding is rapid, spurting, or does not stop after 5–10 minutes of direct pressure.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply Direct Pressure',
          instruction: 'Apply firm direct pressure to the wound.',
          details: [
            'Use a sterile gauze, clean cloth, or your bare gloved hand if nothing else is available.',
            'Press down hard and directly over the source of bleeding.',
            'Maintain continuous, uninterrupted pressure.'
          ],
          visualHint: 'Press both hands directly onto the cloth over the wound'
        },
        {
          stepNumber: 2,
          title: 'Maintain Pressure',
          instruction: 'Keep pressure on the wound and avoid repeatedly checking it.',
          details: [
            'Lifting the dressing breaks blood clots that are forming.',
            'If blood seeps through, do not remove the cloth. Place another cloth directly on top and press harder.',
            'Secure firmly with a bandage if available, keeping pressure steady.'
          ],
          visualHint: 'Add another layer on top, keep pressing without lifting'
        },
        {
          stepNumber: 3,
          title: 'Call & Seek Professional Care',
          instruction: 'Call emergency services when appropriate and seek professional medical care.',
          details: [
            'Dial 112 or local emergency dispatch.',
            'Have the person lie down to reduce fainting and shock.',
            'Keep the person warm with a jacket or blanket.'
          ],
          visualHint: 'Have the injured person lie down and stay covered'
        }
      ],
      doNot: [
        'Do NOT remove objects embedded deeply inside a wound. Stabilize around them.',
        'Do NOT repeatedly lift bandages to inspect if bleeding has stopped.',
        'Do NOT apply an improvised tourniquet unless you are trained for severe limb amputation/arterial trauma.',
        'Do NOT wash large deep bleeding wounds with hot water.'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'Red Cross & AHA Clinical Protocols'
    },
    {
      id: 'burns',
      title: 'Burns',
      subtitle: 'Immediate burn first aid',
      iconType: 'flame',
      severity: 'high',
      stayCalmMessage: 'STAY CALM — Cool the burn immediately with cool running water.',
      warning: 'Call 112 immediately for burns covering large areas, burns on face/hands/joints, charred white skin, or chemical burns.',
      steps: [
        {
          stepNumber: 1,
          title: 'Cool with Water',
          instruction: 'Cool the burn under gentle, cool running tap water for at least 10–20 minutes.',
          details: [
            'Do not use ice, ice water, or freezing cold water as it worsens tissue damage.',
            'Cooling relieves pain and stops burn progression into deeper tissue layers.',
            'Keep the rest of the patient warm to prevent hypothermia.'
          ],
          visualHint: 'Hold burn under cool gentle tap water stream'
        },
        {
          stepNumber: 2,
          title: 'Remove Constricting Items',
          instruction: 'Gently remove rings, watches, and tight clothing near the burned area before swelling occurs.',
          details: [
            'Swelling happens rapidly in burned limbs.',
            'Do not remove any fabric or clothing that is stuck directly to the burned skin.',
            'Cut clothing around stuck portions if necessary.'
          ],
          visualHint: 'Carefully slip off rings and bracelets'
        },
        {
          stepNumber: 3,
          title: 'Cover Cleanly',
          instruction: 'Cover the burn loosely with clean non-stick film, plastic wrap, or a sterile cloth.',
          details: [
            'Clean plastic kitchen wrap makes an ideal sterile, non-adherent burn dressing.',
            'Layer it gently over the burn; do not wrap tightly around a limb.',
            'Avoid fluffy cotton wool or adhesive bandages that stick to skin.'
          ],
          visualHint: 'Lay clean plastic wrap loosely over the cooled area'
        },
        {
          stepNumber: 4,
          title: 'Seek Emergency Care',
          instruction: 'Seek professional medical care for significant burns.',
          details: [
            'All burns larger than the patient’s palm require medical assessment.',
            'Keep the patient sitting upright if facial burns or smoke inhalation is suspected.',
            'Do not offer pain medication if emergency surgery might be needed.'
          ],
          visualHint: 'Contact 112 or visit the nearest burn unit'
        }
      ],
      doNot: [
        'Do NOT apply ice, ice water, or freezing compresses.',
        'Do NOT apply butter, toothpaste, oils, turmeric, or ointments.',
        'Do NOT burst, pop, or prick burn blisters.',
        'Do NOT peel away clothing that is melted or stuck to the burn.'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'Red Cross & AHA Burn Care Protocols'
    },
    {
      id: 'cpr',
      title: 'CPR',
      subtitle: 'Emergency CPR guidance',
      iconType: 'heart',
      severity: 'critical',
      stayCalmMessage: 'STAY CALM — Push hard and fast in the center of the chest.',
      warning: 'Call 112 immediately. Every second counts. If the person is unresponsive and not breathing normally, begin CPR now.',
      steps: [
        {
          stepNumber: 1,
          title: 'Check Response & Breathing',
          instruction: 'Tap collarbones firmly, shout "Are you okay?", and look at chest for normal breathing.',
          details: [
            'Look at the chest for 5–10 seconds to see if it is rising and falling.',
            'Gasping, snoring sounds, or agonal breathing is NOT normal breathing.',
            'If unresponsive and not breathing normally, proceed immediately.'
          ],
          visualHint: 'Tap shoulders and look closely at chest movement'
        },
        {
          stepNumber: 2,
          title: 'Call 112 & Get Help',
          instruction: 'Call 112 immediately. Put phone on speaker. Send someone for an AED if available.',
          details: [
            'Point at a specific bystander: "You, call 112 and bring an AED!"',
            'If you are alone, call 112 on speakerphone while positioning the person on a firm, flat surface.',
            'Stay on the line with the emergency operator.'
          ],
          visualHint: 'Speakerphone on 112 while positioning patient flat'
        },
        {
          stepNumber: 3,
          title: 'Hand Position',
          instruction: 'Place heel of one hand in the center of the chest, interlock fingers of other hand.',
          details: [
            'Position yourself kneeling beside the person’s chest.',
            'Keep your shoulders directly over your hands and lock your elbows straight.',
            'Only the heel of your lower hand should touch the breastbone.'
          ],
          visualHint: 'Center of chest, arms straight, shoulders directly above'
        },
        {
          stepNumber: 4,
          title: 'Push Hard and Fast',
          instruction: 'Push down 2 inches (5 cm) at a rate of 100 to 120 beats per minute.',
          details: [
            'Pace yourself to the beat of the song "Stayin’ Alive".',
            'Allow the chest to come all the way back up between compressions (recoil).',
            'Do not stop hands-only CPR until medical personnel take over, an AED is ready, or the person clearly wakes up.'
          ],
          visualHint: '100–120 compressions per minute, allow full chest recoil'
        }
      ],
      doNot: [
        'Do NOT pause compressions for more than 10 seconds.',
        'Do NOT lean on the person’s chest between compressions; allow full chest recoil.',
        'Do NOT perform CPR on a soft bed or sofa; move person to a firm flat floor if safe.',
        'Do NOT hesitate to give Hands-Only CPR if you are untrained in mouth-to-mouth rescue breaths.'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'American Heart Association (AHA) Guidelines'
    },
    {
      id: 'choking',
      title: 'Choking',
      subtitle: 'What to do if someone is choking',
      iconType: 'airway',
      severity: 'critical',
      stayCalmMessage: 'STAY CALM — Act quickly if the person cannot breathe, speak, or cough.',
      warning: 'If the person turns blue or loses consciousness, support them to the ground, call 112, and start CPR compressions.',
      steps: [
        {
          stepNumber: 1,
          title: 'Assess Ability to Cough',
          instruction: 'Ask "Are you choking?" If they can speak or cough loudly, encourage them to keep coughing.',
          details: [
            'A strong cough is the most effective way to clear an airway.',
            'Do not interfere or slap their back while they are coughing effectively.',
            'If they cannot speak, make no sound, or clutch their throat (universal choking sign), take action immediately.'
          ],
          visualHint: 'Watch for the universal choking sign: hands clutching throat'
        },
        {
          stepNumber: 2,
          title: '5 Firm Back Blows',
          instruction: 'Stand to the side and slightly behind, support their chest, lean them forward, and deliver 5 firm back blows.',
          details: [
            'Lean them forward so the dislodged object exits the mouth rather than sliding down.',
            'Use the heel of your hand between the shoulder blades.',
            'Check after each blow to see if the blockage has cleared.'
          ],
          visualHint: 'Lean forward and strike firmly between shoulder blades'
        },
        {
          stepNumber: 3,
          title: '5 Abdominal Thrusts',
          instruction: 'Perform up to 5 abdominal thrusts (Heimlich maneuver) if back blows do not clear it.',
          details: [
            'Stand behind the person, wrap your arms around their waist.',
            'Make a fist with one hand and place the thumb side just above their navel and below the rib cage.',
            'Grasp your fist with your other hand and pull sharply inward and upward.'
          ],
          visualHint: 'Fist just above navel, pull inward and upward firmly'
        },
        {
          stepNumber: 4,
          title: 'Repeat & Emergency Call',
          instruction: 'Alternate 5 back blows and 5 abdominal thrusts until object clears or help arrives.',
          details: [
            'If the person becomes unresponsive, lower them to the floor gently.',
            'Call 112 immediately.',
            'Begin CPR chest compressions. Look in the mouth before giving breaths if visible.'
          ],
          visualHint: 'Alternate 5 back blows and 5 thrusts continuously'
        }
      ],
      doNot: [
        'Do NOT perform blind finger sweeps in the mouth if you cannot clearly see the object.',
        'Do NOT perform abdominal thrusts on infants under 1 year (use back slaps and gentle chest thrusts).',
        'Do NOT give the person water or food while they are choking.',
        'Do NOT slap the back of someone who is standing upright (lean them forward first).'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'Heimlich Institute & Red Cross Standards'
    },
    {
      id: 'snake-bite',
      title: 'Snake Bite',
      subtitle: 'Immediate actions and what to avoid',
      iconType: 'snake',
      severity: 'high',
      stayCalmMessage: 'STAY CALM — Keeping the victim calm and still is critical to slow venom spread.',
      warning: 'Call 112 or transport to the nearest hospital immediately. Anti-venom is the only definitive treatment for venomous bites.',
      steps: [
        {
          stepNumber: 1,
          title: 'Move to Safety & Keep Still',
          instruction: 'Move away from the snake to prevent further bites. Keep the victim completely still and calm.',
          details: [
            'Physical movement accelerates venom circulation through the lymphatic system.',
            'Reassure the victim. Panic increases heart rate and venom dispersion.',
            'Have the victim sit or lie down comfortably.'
          ],
          visualHint: 'Keep the victim seated or lying down, completely relaxed'
        },
        {
          stepNumber: 2,
          title: 'Remove Constricting Items',
          instruction: 'Immediately remove rings, watches, bracelets, and tight clothing from the bitten limb.',
          details: [
            'Severe swelling can begin within minutes.',
            'Leaving rings or tight bands on can cut off blood flow and cause severe tissue death.',
            'Do not delay this step.'
          ],
          visualHint: 'Quickly remove any rings or watches near the bite'
        },
        {
          stepNumber: 3,
          title: 'Immobilize the Limb',
          instruction: 'Immobilize the bitten limb at or slightly below heart level with a splint or sling.',
          details: [
            'Keep the bitten limb still as if it were fractured.',
            'Do not elevate the limb above the heart.',
            'If safe, note the snake’s color, pattern, and shape from a safe distance (do NOT catch it).'
          ],
          visualHint: 'Splint limb gently, keep at or below heart level'
        },
        {
          stepNumber: 4,
          title: 'Transport to Hospital with Anti-Venom',
          instruction: 'Call 112 and arrange urgent transport to a hospital that stocks anti-venom.',
          details: [
            'Carry the patient on a stretcher or vehicle if possible so they do not walk.',
            'Monitor breathing and consciousness closely during transport.',
            'Inform the receiving hospital early so anti-venom can be prepared.'
          ],
          visualHint: 'Transport calmly to the nearest hospital facility'
        }
      ],
      doNot: [
        'Do NOT cut, slash, or make incisions on the bite wound.',
        'Do NOT attempt to suck out venom with your mouth or suction devices.',
        'Do NOT apply a tight arterial tourniquet (can cause gangrene and limb loss).',
        'Do NOT apply ice, herbs, chemicals, or electrical shocks.',
        'Do NOT attempt to catch, corner, or kill the snake.'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'WHO & National Snakebite Protocols'
    },
    {
      id: 'fracture',
      title: 'Fracture',
      subtitle: 'Basic injury precautions',
      iconType: 'bone',
      severity: 'high',
      stayCalmMessage: 'STAY CALM — Support the injured limb and do not attempt to straighten it.',
      warning: 'Call 112 immediately if the bone pierces the skin (open fracture), limb looks pale/blue or loses pulse, or if neck/back injury is suspected.',
      steps: [
        {
          stepNumber: 1,
          title: 'Keep Completely Still',
          instruction: 'Keep the injured person and limb completely still. Do not attempt to realign or push bones.',
          details: [
            'Forcing a deformed limb straight causes severe nerve, muscle, and blood vessel damage.',
            'Support the limb in the exact position you found it.',
            'If spinal or neck injury is suspected, hold the head still and do NOT move the person.'
          ],
          visualHint: 'Do not move or straighten the injured bone'
        },
        {
          stepNumber: 2,
          title: 'Support and Splint',
          instruction: 'Support the injured limb with soft padding, rolled blankets, or a rigid splint.',
          details: [
            'Immobilize the joint above and the joint below the fracture site.',
            'Fasten splints securely with cloth strips or bandages, but do not bind so tightly that blood flow is cut off.',
            'Check fingers or toes frequently for warmth, sensation, and normal pink color.'
          ],
          visualHint: 'Secure gentle splint above and below the injury'
        },
        {
          stepNumber: 3,
          title: 'Protect Open Wounds',
          instruction: 'If bone has pierced the skin, cover the wound gently with a clean or sterile cloth.',
          details: [
            'Control bleeding around the wound with light pressure on the edges.',
            'Do NOT push bone fragments back into the body.',
            'Cover with a clean dressing to protect from dirt and infection.'
          ],
          visualHint: 'Gently drape clean cloth over open wound'
        },
        {
          stepNumber: 4,
          title: 'Call 112 & Treat for Shock',
          instruction: 'Call 112 or arrange safe medical transport. Keep the person warm and comfortable.',
          details: [
            'Cover with a blanket to prevent shock and shivering.',
            'Do not give food, water, or oral pain relievers in case surgery is required soon.',
            'Reassure the patient continuously.'
          ],
          visualHint: 'Keep patient warm and arrange emergency transport'
        }
      ],
      doNot: [
        'Do NOT attempt to push back protruding bone ends into the wound.',
        'Do NOT attempt to straighten or force an unnatural bend in a bone.',
        'Do NOT move a person suspected of head, neck, or spinal injury unless life is in imminent danger.',
        'Do NOT give food, tea, or water before medical examination in case emergency surgery is needed.',
        'Do NOT let the injured person walk on a suspected leg, hip, or ankle fracture.'
      ],
      medicalDisclaimer: 'LifeLine provides conservative emergency guidance and does not replace professional medical personnel or emergency dispatch.',
      language: 'en',
      lastVerified: 'September 2026',
      verifiedBy: 'Orthopedic Trauma First-Aid Standards'
    }
  ],
  hi: [
    {
      id: 'severe-bleeding',
      title: 'अत्यधिक रक्तस्राव',
      subtitle: 'तुरंत रक्तस्राव रोकें',
      iconType: 'bandage',
      severity: 'critical',
      stayCalmMessage: 'शांत रहें — घाव पर लगातार सीधा दबाव देना ही खून रोकने का सबसे प्रभावी तरीका है।',
      warning: 'यदि खून तेजी से बह रहा हो या 5–10 मिनट के दबाव के बाद भी न रुके, तो तुरंत 112 पर कॉल करें।',
      steps: [
        {
          stepNumber: 1,
          title: 'सीधा दबाव बनाएं',
          instruction: 'घाव पर साफ कपड़े या पट्टी से सीधा और तेज दबाव बनाएं।',
          details: [
            'साफ कपड़ा, रुमाल या दस्ताने पहने हाथ का उपयोग करें।',
            'खून निकलने वाले मुख्य स्थान पर दोनों हाथों से मजबूती से दबाएं।',
            'दबाव को बिना छोड़े लगातार बनाए रखें।'
          ],
          visualHint: 'घाव पर कपड़े के ऊपर दोनों हाथों से मजबूत दबाव दें'
        },
        {
          stepNumber: 2,
          title: 'दबाव बनाए रखें',
          instruction: 'घाव को बार-बार उठाकर देखने से बचें और लगातार दबाव जारी रखें।',
          details: [
            'पट्टी बार-बार हटाने से बन रहे खून के थक्के (clots) टूट जाते हैं।',
            'यदि खून कपड़े से बाहर आने लगे, तो पुराना कपड़ा न हटाएं, उसके ऊपर और कपड़ा रखकर दबाएं।',
            'उपलब्ध होने पर पट्टी से मजबूती से बांधें।'
          ],
          visualHint: 'कपड़ा हटाए बिना ऊपर एक और तह रखें और दबाते रहें'
        },
        {
          stepNumber: 3,
          title: 'आपातकालीन सहायता लें',
          instruction: 'तुरंत 112 पर संपर्क करें और घायल व्यक्ति को शांत रखें।',
          details: [
            '112 पर फोन करके स्थिति बताएं।',
            'घायल व्यक्ति को लिटा दें ताकि चक्कर या शॉक की संभावना कम हो।',
            'उन्हें चादर या जैकेट से ढककर गर्म रखें।'
          ],
          visualHint: 'मरीज को लिटाएं और शांत वातावरण बनाए रखें'
        }
      ],
      doNot: [
        'घाव में गहरे फंसे किसी नुकीले पदार्थ को कभी न निकालें।',
        'खून रुका या नहीं, यह देखने के लिए बार-बार पट्टी न हटाएं।',
        'बिना प्रशिक्षण के कभी भी अंगों पर खतरनाक टूर्निकेट न बांधें।',
        'गहरे खुले घावों को गर्म पानी से न धोएं।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'रेड क्रॉस एवं एएचए क्लीनिकल प्रोटोकॉल'
    },
    {
      id: 'burns',
      title: 'जलना / बर्न',
      subtitle: 'जलने पर त्वरित प्राथमिक उपचार',
      iconType: 'flame',
      severity: 'high',
      stayCalmMessage: 'शांत रहें — जले हुए हिस्से को तुरंत सामान्य ठंडे बहते पानी से ठंडा करें।',
      warning: 'बड़े हिस्से, चेहरे, जोड़ों पर जलने या त्वचा सफेद/काली पड़ने पर तुरंत 112 पर कॉल करें।',
      steps: [
        {
          stepNumber: 1,
          title: 'पानी से ठंडा करें',
          instruction: 'जले हुए हिस्से पर कम से कम 10 से 20 मिनट तक नल का ठंडा बहता पानी डालें।',
          details: [
            'बर्फ या बहुत ठंडे पानी का इस्तेमाल न करें, इससे त्वचा को अधिक नुकसान होता है।',
            'पानी दर्द कम करता है और त्वचा के अंदर जलन फैलने से रोकता है।',
            'मरीज के शरीर के बाकी हिस्से को गर्म रखें।'
          ],
          visualHint: 'नल के धीमे बहते पानी के नीचे जले हिस्से को रखें'
        },
        {
          stepNumber: 2,
          title: 'तंग सामान हटाएं',
          instruction: 'सूजन आने से पहले जले अंग से अंगूठी, घड़ी और तंग कपड़े तुरंत हटा दें।',
          details: [
            'जलने के बाद बहुत तेजी से सूजन आती है।',
            'यदि कपड़ा त्वचा से चिपक गया हो, तो उसे जबरन न खींचें।',
            'चिपके हिस्से के आसपास का कपड़ा काट लें।'
          ],
          visualHint: 'अंगूठी और चूड़ियां तुरंत सावधानी से उतारें'
        },
        {
          stepNumber: 3,
          title: 'साफ ढकें',
          instruction: 'जले हिस्से को साफ प्लास्टिक रैप या गैर-चिपकने वाले साफ कपड़े से ढीला ढकें।',
          details: [
            'किचन में इस्तेमाल होने वाला साफ क्लिंग रैप जलने के लिए सबसे सुरक्षित आवरण है।',
            'इसे केवल ऊपर रखें, कसकर न लपेटें।',
            'रुई या चिपकने वाली पट्टियों का इस्तेमाल बिल्कुल न करें।'
          ],
          visualHint: 'साफ प्लास्टिक फिल्म से ढीला ढकें'
        },
        {
          stepNumber: 4,
          title: 'चिकित्सकीय मदद लें',
          instruction: 'गंभीर जलने की स्थिति में तुरंत नजदीकी अस्पताल या बर्न यूनिट जाएं।',
          details: [
            'हथेली से बड़ा कोई भी छाला या जला हुआ हिस्सा डॉक्टर को दिखाना आवश्यक है।',
            'यदि धुएं में सांस ली हो तो मरीज को सीधा बैठाकर रखें।',
            'आपातकालीन सर्जरी की संभावना के चलते बिना सलाह कोई दवा न खिलाएं।'
          ],
          visualHint: 'तुरंत नजदीकी अस्पताल ले जाएं'
        }
      ],
      doNot: [
        'बर्फ या बर्फ वाला पानी कभी न लगाएं।',
        'टूथपेस्ट, मक्खन, तेल, हल्दी या नीली दवा न लगाएं।',
        'जले हुए छालों (blisters) को कभी न फोड़ें।',
        'त्वचा से चिपके कपड़ों को जबरदस्ती न खींचें।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'बर्न केयर प्राथमिक चिकित्सा मानक'
    },
    {
      id: 'cpr',
      title: 'सीपीआर (CPR)',
      subtitle: 'आपातकालीन सीपीआर निर्देश',
      iconType: 'heart',
      severity: 'critical',
      stayCalmMessage: 'शांत रहें — छाती के केंद्र में तेजी से और मजबूती से दबाएं।',
      warning: 'तुरंत 112 पर कॉल करें। अगर व्यक्ति कोई प्रतिक्रिया नहीं दे रहा और सामान्य सांस नहीं ले रहा, तो बिना देर किए सीपीआर शुरू करें।',
      steps: [
        {
          stepNumber: 1,
          title: 'होश और सांस जांचें',
          instruction: 'कंधे थपथपाएं, जोर से पूछें "क्या आप ठीक हैं?" और छाती के हिलने को देखें।',
          details: [
            '5-10 सेकंड तक देखें कि छाती ऊपर-नीचे हो रही है या नहीं।',
            'खर्राटे जैसी आवाज या हांफना सामान्य सांस नहीं है।',
            'यदि कोई सांस नहीं है, तो तुरंत आगे बढ़ें।'
          ],
          visualHint: 'कंधे थपथपाकर सांस की जांच करें'
        },
        {
          stepNumber: 2,
          title: '112 पर कॉल करें',
          instruction: 'तुरंत 112 डायल करें, फोन को स्पीकर पर रखें और आसपास से मदद मांगें।',
          details: [
            'किसी एक व्यक्ति की तरफ इशारा करके कहें: "आप 112 पर कॉल करें और एईडी ढूंढें!"',
            'यदि आप अकेले हैं, तो फोन स्पीकर पर रखकर मरीज को सख्त और समतल जमीन पर लिटाएं।',
            'ऑपरेटर के निर्देशों को सुनते रहें।'
          ],
          visualHint: 'फोन स्पीकर पर रखकर मरीज को समतल फर्श पर लिटाएं'
        },
        {
          stepNumber: 3,
          title: 'हाथों की सही स्थिति',
          instruction: 'छाती के बीचों-बीच एक हाथ की हथेली का निचला हिस्सा रखें और दूसरे हाथ की उंगलियां फंसा लें।',
          details: [
            'मरीज के पास घुटनों के बल बैठें।',
            'अपनी कोहनियों को बिल्कुल सीधा रखें और कंधे हाथों के ठीक ऊपर होने चाहिए।',
            'केवल नीचे वाली हथेली का निचला भाग छाती की हड्डी पर हो।'
          ],
          visualHint: 'छाती के बीच में हाथ, कोहनी बिल्कुल सीधी'
        },
        {
          stepNumber: 4,
          title: 'तेजी से और जोर से दबाएं',
          instruction: 'छाती को 2 इंच (5 सेमी) गहरा, प्रति मिनट 100 से 120 बार की गति से दबाएं।',
          details: [
            'हर दबाव के बाद छाती को पूरी तरह वापस ऊपर आने दें।',
            'जब तक मेडिकल टीम न आए या व्यक्ति होश में न आए, छाती दबाना बंद न करें।',
            'यदि मुंह से सांस देने का प्रशिक्षण नहीं है, तो केवल हाथों से लगातार दबाते रहें (Hands-only CPR)।'
          ],
          visualHint: 'प्रति मिनट 100–120 बार दबाएं, छाती पूरी ऊपर आने दें'
        }
      ],
      doNot: [
        'छाती दबाने में 10 सेकंड से ज्यादा का विराम कभी न लें।',
        'दबावों के बीच छाती पर झुके न रहें, उसे पूरा ऊपर आने दें।',
        'मरीज को नरम गद्दे या सोफे पर रखकर सीपीआर न दें; सख्त फर्श पर रखें।',
        'हिचकिचाएं नहीं; कुछ न करने से केवल छाती दबाना लाखों गुना बेहतर है।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'अमेरिकन हार्ट एसोसिएशन (AHA) मानक'
    },
    {
      id: 'choking',
      title: 'दम घुटना / चोकिंग',
      subtitle: 'सांस की नली में कुछ अटकने पर',
      iconType: 'airway',
      severity: 'critical',
      stayCalmMessage: 'शांत रहें — अगर व्यक्ति सांस न ले पाए या बोल न पाए तो तुरंत मदद करें।',
      warning: 'यदि व्यक्ति बेहोश हो जाए, तो उन्हें धीरे से जमीन पर लिटाएं, 112 पर कॉल करें और सीपीआर शुरू करें।',
      steps: [
        {
          stepNumber: 1,
          title: 'खांसने के लिए कहें',
          instruction: 'पूछें "क्या आपका दम घुट रहा है?" यदि वे बोल पा रहे हैं या जोर से खांस रहे हैं, तो खांसने दें।',
          details: [
            'तेज खांसी गले से फंसी चीज निकालने का सबसे प्राकृतिक और असरदार तरीका है।',
            'जब तक व्यक्ति प्रभावी रूप से खांस रहा हो, उनकी पीठ पर न मारें।',
            'यदि आवाज बिल्कुल बंद हो गई हो या वे दोनों हाथों से गला पकड़ रहे हों, तो तुरंत आगे बढ़ें।'
          ],
          visualHint: 'गले पर हाथ रखने का चोकिंग संकेत पहचानें'
        },
        {
          stepNumber: 2,
          title: 'पीठ पर 5 थपकियां दें',
          instruction: 'व्यक्ति के थोड़ा पीछे खड़े हों, उन्हें आगे की तरफ झुकाएं और दोनों कंधों के बीच 5 बार थपथपाएं।',
          details: [
            'आगे झुकाने से फंसी वस्तु गले के अंदर फिसलने के बजाय बाहर गिरेगी।',
            'हथेली के निचले सख्त हिस्से से रीढ़ की हड्डी के बीच में जोर से थपकी दें।',
            'हर थपकी के बाद देखें कि क्या रुकावट बाहर निकली।'
          ],
          visualHint: 'आगे झुकाकर दोनों कंधों की हड्डियों के बीच 5 बार थपथपाएं'
        },
        {
          stepNumber: 3,
          title: 'पेट पर 5 दबाव दें',
          instruction: 'यदि पीठ थपथपाने से वस्तु न निकले, तो पीछे से पेट पर 5 बार दबाव दें (Heimlich Maneuver)।',
          details: [
            'पीछे खड़े होकर दोनों हाथों से उनकी कमर को घेरें।',
            'एक हाथ की मुट्ठी नाभि के ठीक ऊपर और पसलियों के नीचे रखें।',
            'दूसरे हाथ से मुट्ठी को पकड़ें और अंदर तथा ऊपर की ओर तेजी से झटका दें।'
          ],
          visualHint: 'नाभि के ऊपर मुट्ठी रखकर अंदर और ऊपर की तरफ खींचें'
        },
        {
          stepNumber: 4,
          title: 'क्रम दोहराएं',
          instruction: '5 बार पीठ पर थपकी और 5 बार पेट पर दबाव का क्रम लगातार दोहराते रहें।',
          details: [
            'यदि व्यक्ति बेहोश हो जाता है, तो तुरंत 112 पर कॉल करें।',
            'मरीज को जमीन पर लिटाएं और सीपीआर (छाती दबाना) शुरू करें।',
            'मुंह में अगर वस्तु साफ दिखाई दे तभी उंगली से निकालें, अन्यथा नहीं।'
          ],
          visualHint: '5 पीठ थपकी और 5 पेट दबाव का चक्र जारी रखें'
        }
      ],
      doNot: [
        'मुंह में बिना देखे कभी भी उंगली डालकर टटोलने की कोशिश न करें।',
        '1 वर्ष से छोटे शिशु पर पेट का दबाव (Heimlich) न दें।',
        'दम घुटते समय व्यक्ति को पानी पीने को न दें।',
        'सीधे खड़े व्यक्ति की पीठ पर न मारें (पहले आगे की ओर झुकाएं)।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'हाइमलिक एवं रेड क्रॉस एयरवे सुरक्षा'
    },
    {
      id: 'snake-bite',
      title: 'सांप का काटना',
      subtitle: 'तुरंत करने योग्य कार्य और क्या न करें',
      iconType: 'snake',
      severity: 'high',
      stayCalmMessage: 'शांत रहें — मरीज को शांत और स्थिर रखना जहर को शरीर में फैलने से रोकने की सबसे बड़ी कुंजी है।',
      warning: 'तुरंत 112 पर कॉल करें या अस्पताल ले जाएं। एंटी-वेनम ही विषैले सांप के काटने का एकमात्र सही इलाज है।',
      steps: [
        {
          stepNumber: 1,
          title: 'सुरक्षित दूरी व स्थिरता',
          instruction: 'सांप से सुरक्षित दूर जाएं और मरीज को पूरी तरह शांत तथा स्थिर रखें।',
          details: [
            'चलने-फिरने या घबराने से दिल की धड़कन तेज होती है और जहर पूरे शरीर में तेजी से फैलता है।',
            'मरीज को ढांढस बंधाएं और आराम से बैठाएं या लिटाएं।',
            'मरीज को पैदल बिल्कुल न चलने दें।'
          ],
          visualHint: 'मरीज को आराम से बैठाएं, हिलने-डुलने न दें'
        },
        {
          stepNumber: 2,
          title: 'तंग चीजें तुरंत उतारें',
          instruction: 'काटे गए अंग से अंगूठी, चूड़ी, ताबीज, घड़ी और तंग कपड़े तुरंत उतार दें।',
          details: [
            'सांप के काटने पर कुछ ही मिनटों में भयंकर सूजन आ सकती है।',
            'अंगूठी या चूड़ी फंसे रहने से खून का प्रवाह बंद हो सकता है और अंग काटना पड़ सकता है।',
            'इस काम में बिल्कुल देरी न करें।'
          ],
          visualHint: 'अंगूठी, घड़ी और गहने तुरंत निकालें'
        },
        {
          stepNumber: 3,
          title: 'अंग को स्थिर करें',
          instruction: 'काटे गए हाथ या पैर को दिल के स्तर पर या उससे थोड़ा नीचे रखकर स्थिर करें।',
          details: [
            'अंग को ऐसे सहारा दें जैसे कि हड्डी टूटी हो (स्प्लिंट या कपड़े से)।',
            'अंग को दिल से ऊपर कभी न उठाएं।',
            'यदि सुरक्षित दूरी से संभव हो, तो सांप का रंग या रूप याद रखें (पकड़ने की कोशिश न करें)।'
          ],
          visualHint: 'अंग को दिल के स्तर पर या थोड़ा नीचे स्थिर रखें'
        },
        {
          stepNumber: 4,
          title: 'एंटी-वेनम अस्पताल ले जाएं',
          instruction: '112 पर कॉल करें और तुरंत ऐसे अस्पताल ले जाएं जहां एंटी-वेनम उपलब्ध हो।',
          details: [
            'मरीज को वाहन या स्ट्रेचर में लिटाकर ले जाएं, उन्हें खुद न चलने दें।',
            'रास्ते में सांस और होश की स्थिति पर नजर रखें।',
            'अस्पताल को पहले से सूचित कर दें ताकि वे तैयार रहें।'
          ],
          visualHint: 'मरीज को गाड़ी में लिटाकर नजदीकी अस्पताल ले जाएं'
        }
      ],
      doNot: [
        'काटे हुए स्थान पर ब्लेड या चीरा कभी न लगाएं।',
        'मुंह से जहर चूसने की कोशिश कभी न करें।',
        'अंग पर कसकर रस्सी या तार का टूर्निकेट न बांधें (इससे अंग सड़ सकता है)।',
        'काटे स्थान पर बर्फ, जड़ी-बूटी, चूना या बिजली का झटका न लगाएं।',
        'सांप को पकड़ने या मारने की कोशिश में समय बर्बाद न करें।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'डब्ल्यूएचओ एवं राष्ट्रीय सर्पदंश दिशा-निर्देश'
    },
    {
      id: 'fracture',
      title: 'हड्डी टूटना / फ्रैक्चर',
      subtitle: 'बुनियादी चोट सावधानियां',
      iconType: 'bone',
      severity: 'high',
      stayCalmMessage: 'शांत रहें — घायल अंग को सहारा दें और उसे सीधा करने की कोशिश न करें।',
      warning: 'यदि हड्डी त्वचा से बाहर निकल आई हो, अंग सुन्न या नीला पड़ रहा हो, या रीढ़ की हड्डी में चोट हो, तो तुरंत 112 बुलाएं।',
      steps: [
        {
          stepNumber: 1,
          title: 'बिल्कुल स्थिर रखें',
          instruction: 'घायल व्यक्ति और चोटिल अंग को बिल्कुल न हिलाएं। हड्डी को सीधा करने की कोशिश न करें।',
          details: [
            'टेढ़े अंग को जबरदस्ती सीधा करने से नसों और खून की नलियों को भारी नुकसान पहुंच सकता है।',
            'अंग को उसी स्थिति में सहारा दें जिस स्थिति में वह है।',
            'यदि गर्दन या पीठ में चोट की आशंका हो, तो मरीज को बिल्कुल न हिलाएं।'
          ],
          visualHint: 'चोटिल अंग को जबरन सीधा न करें'
        },
        {
          stepNumber: 2,
          title: 'सहारा दें (स्प्लिंट लगाएं)',
          instruction: 'मुलायम तकिए, कंबल या लकड़ी के तख्ते से चोटिल अंग के दोनों तरफ सहारा दें।',
          details: [
            'टूटी हड्डी के ऊपर वाले और नीचे वाले जोड़ दोनों को स्थिर करें।',
            'कपड़े की पट्टियों से बांधें, लेकिन इतना कसकर न बांधें कि खून का बहाव रुक जाए।',
            'उंगलियों की गर्माहट और रंग की जांच करते रहें।'
          ],
          visualHint: 'अंग के ऊपर और नीचे जोड़ तक सहारा बांधें'
        },
        {
          stepNumber: 3,
          title: 'खुले घाव को ढकें',
          instruction: 'यदि हड्डी बाहर निकल आई हो, तो घाव को साफ या जीवाणुरहित कपड़े से ढीला ढकें।',
          details: [
            'घाव के किनारों पर हल्का दबाव देकर खून रोकें।',
            'बाहर निकली हड्डी को कभी भी शरीर के अंदर धकेलने की कोशिश न करें।',
            'धूल और संक्रमण से बचाने के लिए केवल साफ पट्टी से ढकें।'
          ],
          visualHint: 'घाव पर साफ कपड़ा हल्के से रखें'
        },
        {
          stepNumber: 4,
          title: '112 पर कॉल करें',
          instruction: '112 पर कॉल करें या सुरक्षित परिवहन की व्यवस्था करें। मरीज को गर्म रखें।',
          details: [
            'शॉक से बचाने के लिए मरीज को चादर या कंबल से ढकें।',
            'आपातकालीन सर्जरी और एनेस्थीसिया की आवश्यकता हो सकती है, इसलिए खाने-पीने को कुछ न दें।',
            'मरीज का हौसला बनाए रखें।'
          ],
          visualHint: 'मरीज को गर्म रखें और आपातकालीन वाहन में ले जाएं'
        }
      ],
      doNot: [
        'बाहर निकली हड्डी को कभी भी अंदर धकेलने की कोशिश न करें।',
        'मुड़े हुए हाथ-पैर को जबरदस्ती सीधा न करें।',
        'गर्दन या रीढ़ की चोट के संदेह में मरीज को तब तक न हिलाएं जब तक जान का खतरा न हो।',
        'संभावित सर्जरी के कारण मरीज को पानी, चाय या खाना न दें।',
        'पैर, कूल्हे या टखने के फ्रैक्चर में मरीज को पैर पर वजन देकर चलने न दें।'
      ],
      medicalDisclaimer: 'लाइफलाइन एक आपातकालीन प्राथमिक सहायता टूल है और यह पेशेवर डॉक्टर की जगह नहीं लेता है।',
      language: 'hi',
      lastVerified: 'सितंबर 2026',
      verifiedBy: 'ऑर्थोपेडिक ट्रॉमा प्राथमिक चिकित्सा मानक'
    }
  ]
};
