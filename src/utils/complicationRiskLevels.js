/**
 * Complication Risk Levels for Surrogacy Screening
 * Maps pregnancy complications to their risk severity for future pregnancies
 */

export const COMPLICATION_RISK_LEVELS = {
  // SEVERE / DISQUALIFYING - Very unlikely to be accepted even at lenient clinics
  SEVERE: {
    'gastroparesis': {
      severity: 'severe',
      description: 'Severe gastroparesis, especially requiring TPN/PICC line',
      strictPenalty: 60,
      moderatePenalty: 45,
      lenientPenalty: 35,
      notes: 'High recurrence risk, nutritional compromise'
    },
    'severe_hyperemesis': {
      severity: 'severe',
      description: 'Hyperemesis gravidarum requiring hospitalization, PICC line, or TPN',
      strictPenalty: 50,
      moderatePenalty: 35,
      lenientPenalty: 25,
      notes: 'High recurrence risk (up to 80%), severe maternal/fetal risks'
    },
    'hellp_syndrome': {
      severity: 'severe',
      description: 'HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets)',
      strictPenalty: 55,
      moderatePenalty: 40,
      lenientPenalty: 30,
      notes: '19-27% recurrence risk, life-threatening'
    },
    'placental_accreta': {
      severity: 'severe',
      description: 'Placenta accreta/increta/percreta',
      strictPenalty: 60,
      moderatePenalty: 50,
      lenientPenalty: 40,
      notes: 'Very high recurrence risk with prior C-section, hemorrhage risk'
    },
    'stroke': {
      severity: 'severe',
      description: 'Stroke during pregnancy',
      strictPenalty: 65,
      moderatePenalty: 55,
      lenientPenalty: 45,
      notes: 'Extremely high maternal risk'
    }
  },

  // HIGH RISK - Strict clinics unlikely, moderate/lenient case-by-case
  HIGH_RISK: {
    'severe_preeclampsia': {
      severity: 'high',
      description: 'Severe preeclampsia or eclampsia',
      strictPenalty: 45,
      moderatePenalty: 30,
      lenientPenalty: 20,
      notes: '16-25% recurrence if severe, requires MFM monitoring'
    },
    'placental_abruption': {
      severity: 'high',
      description: 'Placental abruption',
      strictPenalty: 45,
      moderatePenalty: 30,
      lenientPenalty: 20,
      notes: '10-25% recurrence risk depending on severity'
    },
    'pprom_under_28wks': {
      severity: 'high',
      description: 'PPROM (Preterm Premature Rupture of Membranes) before 28 weeks',
      strictPenalty: 40,
      moderatePenalty: 25,
      lenientPenalty: 15,
      notes: '16-32% recurrence risk, fetal risks'
    },
    'icp': {
      severity: 'high',
      description: 'Intrahepatic Cholestasis of Pregnancy (ICP)',
      strictPenalty: 40,
      moderatePenalty: 25,
      lenientPenalty: 18,
      notes: '45-70% recurrence risk, fetal risks'
    },
    'pph_transfusion': {
      severity: 'high',
      description: 'Postpartum hemorrhage requiring transfusion',
      strictPenalty: 40,
      moderatePenalty: 28,
      lenientPenalty: 18,
      notes: 'Increased recurrence with risk factors present'
    }
  },

  // MODERATE RISK - Strict clinics may decline, moderate/lenient often accept
  MODERATE_RISK: {
    'mild_preeclampsia': {
      severity: 'moderate',
      description: 'Mild preeclampsia without severe features',
      strictPenalty: 30,
      moderatePenalty: 18,
      lenientPenalty: 10,
      notes: '5-7% recurrence if mild, MFM monitoring recommended'
    },
    'gestational_diabetes_insulin': {
      severity: 'moderate',
      description: 'Gestational diabetes requiring insulin',
      strictPenalty: 35,
      moderatePenalty: 22,
      lenientPenalty: 12,
      notes: 'Higher recurrence than diet-controlled GDM'
    },
    'iugr_severe': {
      severity: 'moderate',
      description: 'Severe IUGR (Intrauterine Growth Restriction)',
      strictPenalty: 35,
      moderatePenalty: 20,
      lenientPenalty: 12,
      notes: 'Depends on cause - placental vs maternal factors'
    },
    'preterm_birth_under_32wks': {
      severity: 'moderate',
      description: 'Spontaneous preterm birth before 32 weeks',
      strictPenalty: 35,
      moderatePenalty: 20,
      lenientPenalty: 12,
      notes: '30% recurrence risk, cause-dependent'
    },
    'cerclage_placement': {
      severity: 'moderate',
      description: 'Cervical cerclage for incompetent cervix',
      strictPenalty: 30,
      moderatePenalty: 18,
      lenientPenalty: 10,
      notes: 'Likely will need cerclage again, MFM management'
    },
    'placenta_previa': {
      severity: 'moderate',
      description: 'Placenta previa',
      strictPenalty: 30,
      moderatePenalty: 20,
      lenientPenalty: 12,
      notes: '4-8% recurrence, higher with C-section scar'
    }
  },

  // MINOR RISK - Most clinics accept with monitoring
  MINOR_RISK: {
    'gestational_diabetes_diet': {
      severity: 'minor',
      description: 'Gestational diabetes controlled by diet alone',
      strictPenalty: 20,
      moderatePenalty: 12,
      lenientPenalty: 5,
      notes: '30-50% recurrence, usually acceptable with monitoring'
    },
    'pih_mild': {
      severity: 'minor',
      description: 'Mild pregnancy-induced hypertension without preeclampsia',
      strictPenalty: 18,
      moderatePenalty: 10,
      lenientPenalty: 5,
      notes: 'Lower recurrence than preeclampsia, monitoring required'
    },
    'preterm_birth_32_36wks': {
      severity: 'minor',
      description: 'Spontaneous preterm birth 32-36 weeks',
      strictPenalty: 20,
      moderatePenalty: 10,
      lenientPenalty: 5,
      notes: '15% recurrence risk, depends on cause'
    },
    'mild_iugr': {
      severity: 'minor',
      description: 'Mild IUGR (baby 5-10th percentile)',
      strictPenalty: 15,
      moderatePenalty: 8,
      lenientPenalty: 5,
      notes: 'Often acceptable, requires growth monitoring'
    },
    'mild_hyperemesis': {
      severity: 'minor',
      description: 'Hyperemesis without hospitalization or significant weight loss',
      strictPenalty: 12,
      moderatePenalty: 8,
      lenientPenalty: 5,
      notes: 'Manageable with medications'
    },
    'gerd': {
      severity: 'minor',
      description: 'GERD (not severe) controlled with medication',
      strictPenalty: 10,
      moderatePenalty: 5,
      lenientPenalty: 3,
      notes: 'Very common, usually acceptable'
    }
  },

  // MINIMAL RISK - Generally acceptable at all clinics
  MINIMAL_RISK: {
    'gestational_hypertension_late': {
      severity: 'minimal',
      description: 'Gestational hypertension after 37 weeks only',
      strictPenalty: 8,
      moderatePenalty: 5,
      lenientPenalty: 3,
      notes: 'Low risk if late onset'
    },
    'oligohydramnios_resolved': {
      severity: 'minimal',
      description: 'Oligohydramnios (low fluid) that resolved',
      strictPenalty: 8,
      moderatePenalty: 5,
      lenientPenalty: 2,
      notes: 'Depends on cause and severity'
    },
    'polyhydramnios_mild': {
      severity: 'minimal',
      description: 'Mild polyhydramnios (high fluid)',
      strictPenalty: 5,
      moderatePenalty: 3,
      lenientPenalty: 2,
      notes: 'Usually not concerning if mild'
    }
  }
};

// Get risk level for a complication
export function getComplicationRisk(complication) {
  for (const category of Object.values(COMPLICATION_RISK_LEVELS)) {
    if (category[complication]) {
      return category[complication];
    }
  }
  return null;
}

// Get all complications by severity
export function getComplicationsBySeverity(severity) {
  const category = COMPLICATION_RISK_LEVELS[severity.toUpperCase() + '_RISK'];
  return category ? Object.keys(category) : [];
}
