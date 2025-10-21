/**
 * Surrogacy Risk Assessment Engine
 * Based on ASRM 2022 Guidelines for Gestational Carriers
 */

import { assessByClinicType } from './clinicTypeAssessment.js';
import { assessMFMReview } from './mfmAssessment.js';

export const RISK_LEVELS = {
  ELIGIBLE: 'ELIGIBLE',
  REQUIRES_COUNSELING: 'REQUIRES_COUNSELING',
  HIGH_RISK: 'HIGH_RISK',
  DISQUALIFIED: 'DISQUALIFIED'
};

export const CRITERIA_CATEGORIES = {
  AGE: 'Age Requirements',
  PREGNANCY_HISTORY: 'Pregnancy History',
  MEDICAL: 'Medical Evaluation',
  INFECTIOUS_DISEASE: 'Infectious Disease Screening',
  PSYCHOLOGICAL: 'Psychological Evaluation',
  LIFESTYLE: 'Lifestyle Factors',
  ENVIRONMENTAL: 'Environmental Stability'
};

/**
 * Age-based risk assessment
 */
export function assessAge(age) {
  if (!age || age < 18) {
    return {
      category: CRITERIA_CATEGORIES.AGE,
      status: RISK_LEVELS.DISQUALIFIED,
      message: 'Candidate must be of legal age (18+)',
      guideline: 'ASRM 2022: Carriers must be of legal age'
    };
  }

  if (age < 21) {
    return {
      category: CRITERIA_CATEGORIES.AGE,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Candidate is below preferred minimum age of 21',
      guideline: 'ASRM 2022: Preferably between ages 21-45'
    };
  }

  if (age >= 21 && age <= 35) {
    return {
      category: CRITERIA_CATEGORIES.AGE,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'Age is within ideal range',
      guideline: 'ASRM 2022: Ideally younger than 35'
    };
  }

  if (age > 35 && age <= 45) {
    return {
      category: CRITERIA_CATEGORIES.AGE,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'Age is acceptable but above ideal range. Counseling recommended regarding pregnancy risks with advancing maternal age.',
      guideline: 'ASRM 2022: Preferably between 21-45, ideally <35'
    };
  }

  if (age > 45) {
    return {
      category: CRITERIA_CATEGORIES.AGE,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Age exceeds standard maximum. All parties must be informed about potential risks of pregnancy with advancing maternal age.',
      guideline: 'ASRM 2022: Certain situations may dictate use of carrier >45, but all parties must be informed of risks'
    };
  }
}

/**
 * Pregnancy history assessment
 */
export function assessPregnancyHistory(data) {
  const results = [];
  const {
    hasCompletedPregnancy,
    numberOfTermPregnancies,
    numberOfComplications,
    totalDeliveries,
    numberOfCesareans
  } = data;

  // Must have at least one previous term pregnancy
  if (!hasCompletedPregnancy || numberOfTermPregnancies < 1) {
    results.push({
      category: CRITERIA_CATEGORIES.PREGNANCY_HISTORY,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'No previous term pregnancy - ASRM strongly recommends at least one. Very rarely accepted by any clinic.',
      guideline: 'ASRM 2022: Carrier should have had at least one term pregnancy'
    });
  } else {
    results.push({
      category: CRITERIA_CATEGORIES.PREGNANCY_HISTORY,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'Has completed at least one term pregnancy',
      guideline: 'ASRM 2022: Minimum one term pregnancy required'
    });
  }

  // Check for complications
  if (numberOfComplications && numberOfComplications > 0) {
    results.push({
      category: CRITERIA_CATEGORIES.PREGNANCY_HISTORY,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Previous pregnancy complications detected. Requires thorough medical evaluation.',
      guideline: 'ASRM 2022: Pregnancy should be uncomplicated'
    });
  }

  // Check total number of deliveries
  if (totalDeliveries > 5) {
    results.push({
      category: CRITERIA_CATEGORIES.PREGNANCY_HISTORY,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Candidate has had more than 5 previous deliveries',
      guideline: 'ASRM 2022: Ideally no more than 5 previous deliveries'
    });
  }

  // Check number of cesarean sections
  if (numberOfCesareans > 3) {
    results.push({
      category: CRITERIA_CATEGORIES.PREGNANCY_HISTORY,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Candidate has had more than 3 cesarean sections',
      guideline: 'ASRM 2022: Ideally no more than 3 cesarean deliveries'
    });
  }

  return results;
}

/**
 * Medical conditions assessment
 */
export function assessMedicalConditions(conditions) {
  const results = [];

  const disqualifyingConditions = [
    'absence_of_uterus',
    'pulmonary_hypertension',
    'severe_cardiac_disease',
    'uncontrolled_diabetes',
    'active_cancer'
  ];

  const concerningConditions = [
    'hypertension',
    'controlled_diabetes',
    'thyroid_disorder',
    'autoimmune_disease',
    'kidney_disease'
  ];

  if (!conditions || conditions.length === 0) {
    results.push({
      category: CRITERIA_CATEGORIES.MEDICAL,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'No reported medical conditions',
      guideline: 'ASRM 2022: Complete medical evaluation required'
    });
    return results;
  }

  conditions.forEach(condition => {
    if (disqualifyingConditions.includes(condition)) {
      results.push({
        category: CRITERIA_CATEGORIES.MEDICAL,
        status: RISK_LEVELS.HIGH_RISK,
        message: `Serious medical condition: ${condition.replace(/_/g, ' ')} - virtually all clinics will decline`,
        guideline: 'ASRM 2022: Serious medical condition that poses significant risk'
      });
    } else if (concerningConditions.includes(condition)) {
      results.push({
        category: CRITERIA_CATEGORIES.MEDICAL,
        status: RISK_LEVELS.REQUIRES_COUNSELING,
        message: `Medical condition requiring evaluation: ${condition.replace(/_/g, ' ')}`,
        guideline: 'ASRM 2022: Requires thorough medical evaluation and clearance'
      });
    }
  });

  return results;
}

/**
 * Infectious disease screening assessment
 */
export function assessInfectiousDiseases(testResults) {
  const results = [];

  const requiredTests = [
    'HIV-1', 'HIV-2', 'HIV-group-O',
    'Hepatitis-B-surface-antigen', 'Hepatitis-B-core-antibody',
    'Hepatitis-C-antibody',
    'syphilis', 'gonorrhea', 'chlamydia'
  ];

  const disqualifyingPositives = [
    'HIV-1', 'HIV-2', 'HIV-group-O',
    'Hepatitis-B-surface-antigen', 'Hepatitis-C-antibody'
  ];

  const treatablePositives = [
    'syphilis', 'gonorrhea', 'chlamydia'
  ];

  // Check if all required tests are present
  const missingTests = requiredTests.filter(test => !testResults[test]);
  if (missingTests.length > 0) {
    results.push({
      category: CRITERIA_CATEGORIES.INFECTIOUS_DISEASE,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: `Missing required infectious disease tests: ${missingTests.join(', ')}`,
      guideline: 'ASRM 2022: All carriers must be tested for infectious diseases'
    });
  }

  // Check for positive results
  Object.keys(testResults).forEach(test => {
    if (testResults[test] === 'positive') {
      if (disqualifyingPositives.includes(test)) {
        results.push({
          category: CRITERIA_CATEGORIES.INFECTIOUS_DISEASE,
          status: RISK_LEVELS.HIGH_RISK,
          message: `Positive test for ${test}. Virtually all clinics decline due to transmission risk to fetus.`,
          guideline: 'ASRM 2022: Positive HIV or Hepatitis generally disqualifies candidate'
        });
      } else if (treatablePositives.includes(test)) {
        results.push({
          category: CRITERIA_CATEGORIES.INFECTIOUS_DISEASE,
          status: RISK_LEVELS.REQUIRES_COUNSELING,
          message: `Positive test for ${test}. Must be treated, retested, and deferred for 3 months after successful treatment.`,
          guideline: 'ASRM 2022: Treatable STIs require treatment and 3-month deferral'
        });
      }
    }
  });

  if (results.length === 0 && missingTests.length === 0) {
    results.push({
      category: CRITERIA_CATEGORIES.INFECTIOUS_DISEASE,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'All infectious disease screening tests negative',
      guideline: 'ASRM 2022: Comprehensive infectious disease screening completed'
    });
  }

  return results;
}

/**
 * Psychological evaluation assessment
 */
export function assessPsychologicalFactors(psychData) {
  const results = [];

  const {
    hasCompletedEvaluation,
    currentPsychotropicMedication,
    historyOfMajorDepression,
    historyOfBipolarDisorder,
    historyOfPsychosis,
    historyOfAnxietyDisorder,
    historyOfEatingDisorder,
    historyOfSubstanceAbuse,
    historyOfAbuse,
    evidenceOfCoercion,
    adequateSupportSystem,
    stableEnvironment
  } = psychData;

  // Note: If psychological data not provided, assume evaluation will be completed
  // Don't flag as missing unless explicitly stated

  // Absolute ethical disqualifications
  if (evidenceOfCoercion) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Evidence of financial or emotional coercion - virtually all clinics will decline for ethical reasons',
      guideline: 'ASRM 2022: Evidence of coercion disqualifies candidate'
    });
  }

  // Current medication issues
  if (currentPsychotropicMedication) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Current psychoactive medication - most clinics require stable period off medication or cleared by psychiatrist',
      guideline: 'ASRM 2022: Current psychotropic medication is typically disqualifying'
    });
  }

  // Serious mental health history
  if (historyOfBipolarDisorder || historyOfPsychosis) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'History of bipolar disorder or psychosis - most clinics decline due to pregnancy stress risks',
      guideline: 'ASRM 2022: History of bipolar disorder or psychosis with impaired functioning'
    });
  }

  if (historyOfMajorDepression) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'History of major depression requires thorough evaluation and clearance',
      guideline: 'ASRM 2022: Unresolved or untreated depression is disqualifying'
    });
  }

  if (historyOfAnxietyDisorder) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'History of anxiety disorder requires evaluation of current functioning',
      guideline: 'ASRM 2022: Clinically significant anxiety with impaired functioning is disqualifying'
    });
  }

  // Substance abuse and trauma history
  if (historyOfSubstanceAbuse) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'History of substance abuse must be resolved and treated',
      guideline: 'ASRM 2022: Unresolved drug/alcohol abuse is disqualifying'
    });
  }

  if (historyOfAbuse) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'History of abuse requires psychological evaluation and treatment',
      guideline: 'ASRM 2022: Unresolved abuse history is disqualifying'
    });
  }

  if (historyOfEatingDisorder) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'History of eating disorder must be resolved',
      guideline: 'ASRM 2022: Unresolved eating disorders are disqualifying'
    });
  }

  // Environmental factors
  if (!adequateSupportSystem) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Insufficient emotional support system',
      guideline: 'ASRM 2022: Insufficient emotional support disqualifies candidate'
    });
  }

  if (!stableEnvironment) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Interpersonal or environmental instability detected',
      guideline: 'ASRM 2022: Environmental instability or major life stressors are disqualifying'
    });
  }

  if (results.length === 0) {
    results.push({
      category: CRITERIA_CATEGORIES.PSYCHOLOGICAL,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'Psychological evaluation completed with no concerning findings',
      guideline: 'ASRM 2022: Comprehensive psychological evaluation completed'
    });
  }

  return results;
}

/**
 * Lifestyle factors assessment
 */
export function assessLifestyleFactors(lifestyle) {
  const results = [];

  const {
    bmi,
    currentSmoker,
    currentAlcoholUse,
    currentDrugUse,
    recentTattoos
  } = lifestyle;

  // BMI assessment
  if (bmi) {
    if (bmi < 19) {
      results.push({
        category: CRITERIA_CATEGORIES.LIFESTYLE,
        status: RISK_LEVELS.HIGH_RISK,
        message: `BMI of ${bmi} is below recommended range`,
        guideline: 'Standard practice: BMI typically 19-32 (varies by clinic)'
      });
    } else if (bmi >= 19 && bmi < 27) {
      results.push({
        category: CRITERIA_CATEGORIES.LIFESTYLE,
        status: RISK_LEVELS.ELIGIBLE,
        message: `BMI of ${bmi} is within ideal range`,
        guideline: 'Standard practice: Preferably BMI <27'
      });
    } else if (bmi >= 27 && bmi <= 32) {
      results.push({
        category: CRITERIA_CATEGORIES.LIFESTYLE,
        status: RISK_LEVELS.REQUIRES_COUNSELING,
        message: `BMI of ${bmi} is acceptable but above ideal range`,
        guideline: 'Standard practice: Many programs accept BMI 19-32'
      });
    } else if (bmi > 32) {
      results.push({
        category: CRITERIA_CATEGORIES.LIFESTYLE,
        status: RISK_LEVELS.HIGH_RISK,
        message: `BMI of ${bmi} exceeds typical maximum for most programs`,
        guideline: 'Standard practice: BMI >32 may be disqualifying'
      });
    }
  }

  // Substance use
  if (currentSmoker) {
    results.push({
      category: CRITERIA_CATEGORIES.LIFESTYLE,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Current tobacco use detected',
      guideline: 'ASRM 2022: Tobacco use should be evaluated and typically requires cessation'
    });
  }

  if (currentAlcoholUse === 'excessive') {
    results.push({
      category: CRITERIA_CATEGORIES.LIFESTYLE,
      status: RISK_LEVELS.DISQUALIFIED,
      message: 'Excessive alcohol use detected',
      guideline: 'ASRM 2022: Substance abuse disqualifies candidate'
    });
  }

  if (currentDrugUse) {
    results.push({
      category: CRITERIA_CATEGORIES.LIFESTYLE,
      status: RISK_LEVELS.DISQUALIFIED,
      message: 'Current recreational drug use detected',
      guideline: 'ASRM 2022: Current drug use disqualifies candidate'
    });
  }

  // Recent tattoos (infectious disease risk)
  if (recentTattoos) {
    results.push({
      category: CRITERIA_CATEGORIES.LIFESTYLE,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'Recent tattoos/piercings without sterile technique may require deferral',
      guideline: 'ASRM 2022: Recent non-sterile body modifications are concerning'
    });
  }

  return results;
}

/**
 * Environmental stability assessment
 */
export function assessEnvironmentalFactors(environmental) {
  const results = [];

  const {
    stableHousing,
    stableEmployment,
    adequateFinancialSituation,
    stableRelationship,
    supportivePartner,
    legalIssues
  } = environmental;

  if (!stableHousing) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Unstable housing situation',
      guideline: 'ASRM 2022: Stable home environment required'
    });
  }

  if (!stableEmployment) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'Employment situation may not support demands of surrogacy',
      guideline: 'ASRM 2022: Employment must be flexible enough to support GC demands'
    });
  }

  if (!adequateFinancialSituation) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.REQUIRES_COUNSELING,
      message: 'Financial situation requires evaluation for possible coercion',
      guideline: 'ASRM 2022: Must assess for financial coercion'
    });
  }

  if (stableRelationship === false) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Current marital or relationship instability',
      guideline: 'ASRM 2022: Relationship instability is disqualifying'
    });
  }

  if (!supportivePartner) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Lack of partner/support system support',
      guideline: 'ASRM 2022: Adequate support required'
    });
  }

  if (legalIssues) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.HIGH_RISK,
      message: 'Legal issues detected (bankruptcy, custody disputes, etc.)',
      guideline: 'ASRM 2022: Ongoing legal disputes may be disqualifying'
    });
  }

  if (results.length === 0) {
    results.push({
      category: CRITERIA_CATEGORIES.ENVIRONMENTAL,
      status: RISK_LEVELS.ELIGIBLE,
      message: 'Stable family environment with adequate support',
      guideline: 'ASRM 2022: Stable environment required'
    });
  }

  return results;
}

/**
 * Comprehensive risk assessment
 * Evaluates all aspects of a gestational carrier candidate
 */
export function performComprehensiveAssessment(candidateData) {
  const allResults = [];

  // Age assessment
  if (candidateData.age !== undefined) {
    allResults.push(assessAge(candidateData.age));
  }

  // Pregnancy history
  if (candidateData.pregnancyHistory) {
    allResults.push(...assessPregnancyHistory(candidateData.pregnancyHistory));
  }

  // Medical conditions
  if (candidateData.medicalConditions) {
    allResults.push(...assessMedicalConditions(candidateData.medicalConditions));
  }

  // Infectious disease screening
  if (candidateData.infectiousDiseaseTests) {
    allResults.push(...assessInfectiousDiseases(candidateData.infectiousDiseaseTests));
  }

  // Psychological factors
  if (candidateData.psychological) {
    allResults.push(...assessPsychologicalFactors(candidateData.psychological));
  }

  // Lifestyle factors
  if (candidateData.lifestyle) {
    allResults.push(...assessLifestyleFactors(candidateData.lifestyle));
  }

  // Environmental factors
  if (candidateData.environmental) {
    allResults.push(...assessEnvironmentalFactors(candidateData.environmental));
  }

  // Determine overall risk level
  const overallRisk = determineOverallRisk(allResults);

  // Add clinic type assessment
  const clinicTypeAnalysis = assessByClinicType(candidateData);

  // Add MFM review assessment
  const mfmAssessment = assessMFMReview(candidateData);

  return {
    assessments: allResults,
    overallRisk,
    summary: generateSummary(allResults, overallRisk),
    recommendations: generateRecommendations(allResults, overallRisk),
    clinicTypeAnalysis,
    mfmAssessment
  };
}

/**
 * Determine overall risk level based on individual assessments
 * NOTE: This reflects ASRM guidelines, but many clinics use case-by-case review
 */
function determineOverallRisk(results) {
  const hasDisqualifying = results.some(r => r.status === RISK_LEVELS.DISQUALIFIED);
  const hasHighRisk = results.some(r => r.status === RISK_LEVELS.HIGH_RISK);
  const requiresCounseling = results.some(r => r.status === RISK_LEVELS.REQUIRES_COUNSELING);

  // Count severity of issues
  const disqualifyingCount = results.filter(r => r.status === RISK_LEVELS.DISQUALIFIED).length;
  const highRiskCount = results.filter(r => r.status === RISK_LEVELS.HIGH_RISK).length;

  if (hasDisqualifying && disqualifyingCount >= 2) {
    return {
      level: RISK_LEVELS.HIGH_RISK,
      description: 'Multiple factors outside ASRM guidelines - case-by-case review needed at flexible clinics'
    };
  }

  if (hasDisqualifying || highRiskCount >= 2) {
    return {
      level: RISK_LEVELS.HIGH_RISK,
      description: 'Outside ASRM standard guidelines - requires case-by-case review and likely MFM clearance'
    };
  }

  if (hasHighRisk) {
    return {
      level: RISK_LEVELS.REQUIRES_COUNSELING,
      description: 'Some factors outside ideal range - most clinics will evaluate case-by-case'
    };
  }

  if (requiresCounseling) {
    return {
      level: RISK_LEVELS.REQUIRES_COUNSELING,
      description: 'Generally meets guidelines - some additional evaluation may be needed'
    };
  }

  return {
    level: RISK_LEVELS.ELIGIBLE,
    description: 'Meets ASRM basic eligibility criteria - strong candidate'
  };
}

/**
 * Generate summary text
 */
function generateSummary(results, overallRisk) {
  const byCategory = {};
  results.forEach(result => {
    if (!byCategory[result.category]) {
      byCategory[result.category] = [];
    }
    byCategory[result.category].push(result);
  });

  const summary = {
    overallAssessment: overallRisk.description,
    categorySummaries: byCategory
  };

  return summary;
}

/**
 * Generate recommendations
 */
function generateRecommendations(results, overallRisk) {
  const recommendations = [];

  // Standard recommendations
  recommendations.push('Complete medical evaluation by qualified reproductive endocrinologist required');
  recommendations.push('Psychological evaluation by mental health professional specializing in reproductive medicine required');
  recommendations.push('Independent legal counsel required before any contracts');

  // Specific recommendations based on findings
  const disqualified = results.filter(r => r.status === RISK_LEVELS.DISQUALIFIED);
  const highRisk = results.filter(r => r.status === RISK_LEVELS.HIGH_RISK);
  const counseling = results.filter(r => r.status === RISK_LEVELS.REQUIRES_COUNSELING);

  if (disqualified.length > 0) {
    recommendations.push(`CRITICAL: ${disqualified.length} disqualifying factor(s) identified - candidacy not recommended without resolution`);
  }

  if (highRisk.length > 0) {
    recommendations.push(`${highRisk.length} high-risk factor(s) require thorough evaluation and clearance`);
  }

  if (counseling.length > 0) {
    recommendations.push(`${counseling.length} factor(s) require additional counseling or testing`);
  }

  // Check for missing assessments
  const missingCategories = [];
  const allCategories = Object.values(CRITERIA_CATEGORIES);
  const evaluatedCategories = [...new Set(results.map(r => r.category))];

  allCategories.forEach(cat => {
    if (!evaluatedCategories.includes(cat)) {
      missingCategories.push(cat);
    }
  });

  if (missingCategories.length > 0) {
    recommendations.push(`INCOMPLETE ASSESSMENT: Missing evaluations for: ${missingCategories.join(', ')}`);
  }

  return recommendations;
}
