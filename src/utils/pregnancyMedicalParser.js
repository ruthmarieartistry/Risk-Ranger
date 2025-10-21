/**
 * Enhanced Pregnancy-Specific Medical Parser
 * Layer 1 of cascading parser system - focuses on obstetric terminology
 *
 * Extracts:
 * - Obstetric abbreviations (G3P2, SVD, NSVD, C/S, VBAC, etc.)
 * - Lab values (TSH, HbA1c, BP, glucose, etc.)
 * - Pregnancy complications with medical precision
 * - Gestational age calculations
 * - Medical procedure codes
 */

/**
 * Enhanced pregnancy-specific patterns
 */
export const PREGNANCY_PATTERNS = {
  // Obstetric notation (G#P# or GTPAL format)
  obstetricHistory: [
    /G(\d+)\s*P(\d+)(?:\s*\((\d+)-(\d+)-(\d+)-(\d+)\))?/i,  // G3P2(2-0-0-2) GTPAL format
    /G(\d+)\s*P(\d+)/i,  // Simple G3P2
    /gravida[:\s]+(\d+)[,\s]*para[:\s]+(\d+)/i,
    /(\d+)\s*gravida[,\s]*(\d+)\s*para/i
  ],

  // Delivery types with medical precision
  deliveryTypes: {
    vaginal: [
      /\bSVD\b/i,  // Spontaneous Vaginal Delivery
      /\bNSVD\b/i,  // Normal Spontaneous Vaginal Delivery
      /\bNSD\b/i,  // Normal Spontaneous Delivery
      /\bVBAC\b/i,  // Vaginal Birth After Cesarean
      /spontaneous\s+vaginal\s+delivery/i,
      /normal\s+vaginal\s+delivery/i,
      /vaginal\s+birth/i,
      /\bVD\b/i  // Vaginal Delivery
    ],
    cesarean: [
      /\bC\/S\b/i,  // C/S notation
      /\bCS\b/i,  // CS notation
      /\bLSCS\b/i,  // Lower Segment Cesarean Section
      /\bRCS\b/i,  // Repeat Cesarean Section
      // C-section variations (with/without hyphens, singular/plural, with/without capitalization)
      /\bc[\s-]?sections?\b/i,  // c-section, c section, c-sections, c sections, csection, csections
      /\bC[\s-]?sections?\b/i,  // C-section, C section, C-sections, C sections, Csection, Csections
      // Full word variations
      /\bcesareans?\b/i,  // cesarean, cesareans
      /\bcaesareans?\b/i,  // caesarean, caesareans (British spelling)
      /\bces[ae]rean\s+sections?\b/i,  // cesarean section, caesarean section, cesarean sections, caesarean sections
      /\bces[ae]rians?\b/i,  // cesarian, caesarian (common typo)
      // Context phrases
      /primary\s+c[\s-]?section/i,
      /repeat\s+c[\s-]?section/i,
      /emergency\s+c[\s-]?section/i,
      /planned\s+c[\s-]?section/i,
      /elective\s+c[\s-]?section/i
    ],
    operative: [
      /forceps\s+delivery/i,
      /vacuum\s+(?:extraction|delivery)/i,
      /assisted\s+delivery/i,
      /\bOVD\b/i  // Operative Vaginal Delivery
    ]
  },

  // Gestational age patterns
  gestationalAge: [
    /(\d+)\s*(?:weeks?|wks?|w)(?:\s*(?:and|,)?\s*(\d+)\s*days?)?/i,  // "39 weeks 2 days"
    /(\d+)\+(\d+)/,  // "39+2" notation
    /GA[:\s]+(\d+)(?:[+\/](\d+))?/i,  // GA: 39+2
    /delivered\s+at\s+(\d+)\s*(?:weeks?|wks?)/i,
    /born\s+at\s+(\d+)\s*(?:weeks?|wks?)/i
  ],

  // Pregnancy complications with medical specificity
  complications: {
    hypertensive: [
      /\bPIH\b/i,  // Pregnancy-Induced Hypertension
      /pregnancy[- ]induced\s+hypertension/i,
      /gestational\s+hypertension/i,
      /\bGHTN\b/i,
      /\bpreeclampsia\b/i,
      /\bPRE-E\b/i,
      /\beclampsia\b/i,
      /\bHELLP\s+syndrome\b/i,
      /chronic\s+hypertension/i,
      /\bCHTN\b/i,
      /superimposed\s+preeclampsia/i
    ],
    diabetes: [
      /\bGDM\b/i,  // Gestational Diabetes Mellitus
      /\bGD\b/i,   // GD (short for Gestational Diabetes)
      /gestational\s+diabetes/i,
      /pregnancy[- ]induced\s+diabetes/i,
      /\bA1\b.*\bgdm?\b/i,  // A1 GDM/GD (diet-controlled)
      /\bA2\b.*\bgdm?\b/i,  // A2 GDM/GD (medication-controlled)
      /diet[- ]controlled.*diabetes/i,
      /insulin[- ]requiring.*diabetes/i,
      /type\s+[12]\s+diabetes/i,
      /\bT1DM\b|\bT2DM\b/i
    ],
    preterm: [
      /\bpreterm\s+labor\b/i,
      /\bPTL\b/i,
      /\bpreterm\s+birth\b/i,
      /\bPTB\b/i,
      /\bthreatened\s+preterm\s+labor\b/i,
      /premature\s+labor/i,
      /delivered?\s+(?:before|prior\s+to)\s+37\s*weeks/i
    ],
    membrane: [
      /\bPPROM\b/i,  // Preterm Premature Rupture of Membranes
      /\bPROM\b/i,  // Premature Rupture of Membranes
      /premature\s+rupture\s+of\s+membranes/i,
      /ruptured\s+membranes.*before.*labor/i,
      /\bSROM\b/i,  // Spontaneous Rupture of Membranes
      /water\s+broke\s+early/i
    ],
    placental: [
      /placenta\s+previa/i,
      /\bprevious\s+previa\b/i,
      /placental\s+abruption/i,
      /\babruptio\s+placentae\b/i,
      /placenta\s+accreta/i,
      /placenta\s+percreta/i,
      /placenta\s+increta/i,
      /retained\s+placenta/i,
      /\bPAS\b/i  // Placenta Accreta Spectrum
    ],
    growth: [
      /\bIUGR\b/i,  // Intrauterine Growth Restriction
      /\bFGR\b/i,  // Fetal Growth Restriction
      /\bSGA\b/i,  // Small for Gestational Age
      /intrauterine\s+growth\s+(?:restriction|retardation)/i,
      /fetal\s+growth\s+restriction/i,
      /small\s+for\s+gestational\s+age/i
    ],
    hyperemesis: [
      /\bHG\b/i,  // Hyperemesis Gravidarum
      /hyperemesis\s+gravidarum/i,
      /severe\s+(?:morning\s+)?sickness/i,
      /hyperemesis/i,
      /(?:severe|persistent)\s+(?:nausea|vomiting)/i
    ],
    hemorrhage: [
      /\bPPH\b/i,  // Postpartum Hemorrhage
      /postpartum\s+hemorrhage/i,
      /excessive\s+bleeding/i,
      /\bhemorrhage\b/i,
      /blood\s+loss.*exceeding/i
    ],
    cervical: [
      /\bIC\b.*cervix/i,  // Incompetent Cervix
      /cervical\s+insufficiency/i,
      /incompetent\s+cervix/i,
      /short\s+cervix/i,
      /cerclage/i
    ]
  },

  // Lab values and vital signs
  labValues: {
    bloodPressure: /(?:BP|blood\s+pressure)[:\s]*(\d{2,3})\/(\d{2,3})/i,
    glucose: /(?:glucose|blood\s+sugar)[:\s]*(\d+)\s*(?:mg\/dL)?/i,
    hba1c: /(?:HbA1c|A1C|hemoglobin\s+A1C)[:\s]*(\d+\.?\d*)\s*%?/i,
    tsh: /(?:TSH|thyroid[- ]stimulating\s+hormone)[:\s]*(\d+\.?\d*)/i,
    hemoglobin: /(?:Hgb|hemoglobin|HGB)[:\s]*(\d+\.?\d*)/i,
    hematocrit: /(?:Hct|hematocrit|HCT)[:\s]*(\d+\.?\d*)/i,
    bmi: /BMI[:\s]*(\d+\.?\d*)/i,
    weight: /(?:weight|wt)[:\s]*(\d+\.?\d*)\s*(?:lbs?|pounds?|kg)?/i
  },

  // Medical procedures
  procedures: [
    /\bD&C\b/i,  // Dilation and Curettage
    /\bD&E\b/i,  // Dilation and Evacuation
    /cerclage/i,
    /amniocentesis/i,
    /\bCVS\b/i,  // Chorionic Villus Sampling
    /\bNST\b/i,  // Non-Stress Test
    /\bBPP\b/i,  // Biophysical Profile
    /induction\s+of\s+labor/i,
    /\bIOL\b/i,
    /epidural/i,
    /\bECV\b/i  // External Cephalic Version
  ]
};

/**
 * Extract obstetric history (G#P# notation)
 */
export function extractObstetricHistory(text) {
  for (const pattern of PREGNANCY_PATTERNS.obstetricHistory) {
    const match = text.match(pattern);
    if (match) {
      const result = {
        gravida: parseInt(match[1], 10),
        para: parseInt(match[2], 10)
      };

      // If GTPAL format is present
      if (match.length > 3 && match[3]) {
        result.term = parseInt(match[3], 10);
        result.preterm = parseInt(match[4], 10);
        result.abortions = parseInt(match[5], 10);
        result.living = parseInt(match[6], 10);
      }

      return result;
    }
  }
  return null;
}

/**
 * Extract gestational age from text
 * Returns age in weeks.days format
 */
export function extractGestationalAge(text) {
  const ages = [];

  for (const pattern of PREGNANCY_PATTERNS.gestationalAge) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags + 'g');

    while ((match = regex.exec(text)) !== null) {
      const weeks = parseInt(match[1], 10);
      const days = match[2] ? parseInt(match[2], 10) : 0;

      if (weeks >= 20 && weeks <= 45) {  // Reasonable pregnancy range
        ages.push({ weeks, days, text: match[0] });
      }
    }
  }

  return ages;
}

/**
 * Extract delivery types and count them
 */
export function extractDeliveryTypes(text) {
  const deliveries = {
    vaginal: 0,
    cesarean: 0,
    operative: 0,
    mentions: []
  };

  // Check for vaginal deliveries
  for (const pattern of PREGNANCY_PATTERNS.deliveryTypes.vaginal) {
    const matches = text.match(new RegExp(pattern, 'gi'));
    if (matches) {
      deliveries.vaginal += matches.length;
      deliveries.mentions.push(...matches);
    }
  }

  // Check for cesarean sections
  for (const pattern of PREGNANCY_PATTERNS.deliveryTypes.cesarean) {
    const matches = text.match(new RegExp(pattern, 'gi'));
    if (matches) {
      deliveries.cesarean += matches.length;
      deliveries.mentions.push(...matches);
    }
  }

  // Check for operative deliveries
  for (const pattern of PREGNANCY_PATTERNS.deliveryTypes.operative) {
    const matches = text.match(new RegExp(pattern, 'gi'));
    if (matches) {
      deliveries.operative += matches.length;
      deliveries.mentions.push(...matches);
    }
  }

  return deliveries;
}

/**
 * Extract pregnancy complications by category
 */
export function extractPregnancyComplications(text) {
  const complications = {};

  for (const [category, patterns] of Object.entries(PREGNANCY_PATTERNS.complications)) {
    complications[category] = {
      found: false,
      mentions: [],
      count: 0
    };

    for (const pattern of patterns) {
      const matches = text.match(new RegExp(pattern, 'gi'));
      if (matches) {
        complications[category].found = true;
        complications[category].mentions.push(...matches);
        complications[category].count = matches.length;
      }
    }
  }

  return complications;
}

/**
 * Extract lab values from medical text
 */
export function extractLabValues(text) {
  const labs = {};

  for (const [labName, pattern] of Object.entries(PREGNANCY_PATTERNS.labValues)) {
    const match = text.match(pattern);
    if (match) {
      labs[labName] = {
        value: match[1],
        value2: match[2] || null,  // For BP systolic/diastolic
        text: match[0]
      };
    }
  }

  return labs;
}

/**
 * Determine if pregnancy was term or preterm based on gestational age
 */
export function classifyPregnancyTerm(gestationalAges) {
  const classifications = gestationalAges.map(ga => {
    const totalWeeks = ga.weeks + (ga.days / 7);

    if (totalWeeks < 37) {
      return { term: 'preterm', weeks: totalWeeks, original: ga };
    } else if (totalWeeks >= 37 && totalWeeks < 42) {
      return { term: 'term', weeks: totalWeeks, original: ga };
    } else {
      return { term: 'post-term', weeks: totalWeeks, original: ga };
    }
  });

  return classifications;
}

/**
 * Enhanced pregnancy-specific parser (Layer 1)
 * Works alongside existing textParser.js
 */
export function parsePregnancyMedicalText(text) {
  const obsHistory = extractObstetricHistory(text);
  const gestationalAges = extractGestationalAge(text);
  const deliveryTypes = extractDeliveryTypes(text);
  const complications = extractPregnancyComplications(text);
  const labValues = extractLabValues(text);
  const termClassifications = classifyPregnancyTerm(gestationalAges);

  return {
    obstetricHistory: obsHistory,
    gestationalAges: gestationalAges,
    termClassifications: termClassifications,
    deliveryTypes: deliveryTypes,
    complications: complications,
    labValues: labValues,
    confidence: calculateParserConfidence(obsHistory, gestationalAges, deliveryTypes, complications)
  };
}

/**
 * Calculate confidence score for parsed data
 */
function calculateParserConfidence(obsHistory, gestationalAges, deliveryTypes, complications) {
  let confidence = 0;
  let maxScore = 0;

  // Obstetric history found (high value)
  maxScore += 30;
  if (obsHistory) confidence += 30;

  // Gestational ages found
  maxScore += 20;
  if (gestationalAges.length > 0) confidence += 20;

  // Delivery types found
  maxScore += 25;
  const totalDeliveries = deliveryTypes.vaginal + deliveryTypes.cesarean + deliveryTypes.operative;
  if (totalDeliveries > 0) confidence += 25;

  // Complications data found
  maxScore += 25;
  const complicationsFound = Object.values(complications).filter(c => c.found).length;
  if (complicationsFound > 0) confidence += Math.min(25, complicationsFound * 5);

  return Math.round((confidence / maxScore) * 100);
}

/**
 * Merge pregnancy-specific parsed data with general parsed data
 */
export function mergeParserResults(generalData, pregnancySpecificData) {
  // Enhance general data with pregnancy-specific findings
  const merged = { ...generalData };

  // Override pregnancy history with more accurate OB notation data
  if (pregnancySpecificData.obstetricHistory) {
    const obs = pregnancySpecificData.obstetricHistory;
    merged.pregnancyHistory = merged.pregnancyHistory || {};
    merged.pregnancyHistory.numberOfTermPregnancies = obs.para;
    merged.pregnancyHistory.hasCompletedPregnancy = obs.para > 0;
    merged.pregnancyHistory.totalDeliveries = obs.para;
  }

  // Add delivery type details
  if (pregnancySpecificData.deliveryTypes) {
    merged.pregnancyHistory = merged.pregnancyHistory || {};
    merged.pregnancyHistory.numberOfCesareans = pregnancySpecificData.deliveryTypes.cesarean;
  }

  // Add pregnancy-specific complication details
  merged.pregnancySpecificComplications = pregnancySpecificData.complications;

  // Add lab values
  merged.labValues = pregnancySpecificData.labValues;

  // Add parser confidence
  merged.parserConfidence = pregnancySpecificData.confidence;

  return merged;
}
