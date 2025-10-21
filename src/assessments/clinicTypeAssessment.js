/**
 * Clinic Type Assessment
 * Evaluates candidate eligibility across different clinic strictness levels
 *
 * IMPORTANT: Moderate and lenient clinics use case-by-case review for candidates
 * outside strict ASRM guidelines. This is NOT automatic rejection - it means the
 * clinic will review the complete health picture using common sense approach.
 *
 * - STRICT clinics: Follow rigid rules, minimal exceptions
 * - MODERATE clinics: SOME case-by-case review, more lenient than strict
 * - LENIENT clinics: ALL operate on case-by-case basis for borderline cases
 */

export const CLINIC_TYPES = {
  STRICT: 'STRICT',
  MODERATE: 'MODERATE',
  LENIENT: 'LENIENT'
};

export const ACCEPTANCE_LEVELS = {
  LIKELY_TO_APPROVE: 'LIKELY_TO_APPROVE',               // >60%
  MAY_APPROVE_WITH_RECORDS: 'MAY_APPROVE_WITH_RECORDS', // 20-60%
  UNLIKELY_TO_APPROVE: 'UNLIKELY_TO_APPROVE'            // 0-20%
};

/**
 * Assess candidate for each clinic type
 */
export function assessByClinicType(candidateData) {
  const strictAssessment = assessForStrictClinic(candidateData);
  const moderateAssessment = assessForModerateClinic(candidateData);
  const lenientAssessment = assessForLenientClinic(candidateData);

  return {
    strict: strictAssessment,
    moderate: moderateAssessment,
    lenient: lenientAssessment,
    recommendation: generateClinicRecommendation(strictAssessment, moderateAssessment, lenientAssessment)
  };
}

/**
 * Strict Clinic Assessment
 * - BMI < 30 (some even < 27)
 * - Max 1-2 C-sections
 * - Age ideally < 35
 * - No gestational diabetes history
 * - No combinations of risk factors
 * - Stricter than ASRM minimums but still use judgment
 */
function assessForStrictClinic(data) {
  const issues = [];
  let score = 100; // Start at 100% - ideal candidate, subtract for concerns

  // Age assessment - stricter
  if (data.age) {
    if (data.age < 21 || data.age > 42) {
      issues.push({
        severity: 'major',
        message: 'Age outside strict clinic range (21-42) - very rarely accepted'
      });
      score -= 12;
    } else if (data.age > 38) {
      issues.push({
        severity: 'major',
        message: 'Age above ideal range for strict clinics (prefer <35)'
      });
      score -= 10;
    } else if (data.age > 35) {
      issues.push({
        severity: 'moderate',
        message: 'Age above ideal but many strict clinics accept 35-38'
      });
      score -= 6;
    } else if (data.age < 23) {
      issues.push({
        severity: 'minor',
        message: 'Age on lower end of range'
      });
      score -= 5;
    }
    // Age 23-35 = ideal, no penalty or bonus
  }

  // BMI - strict requirements
  if (data.lifestyle?.bmi) {
    const bmi = data.lifestyle.bmi;
    if (bmi >= 32) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} significantly exceeds strict clinic preference - rarely accepted`
      });
      score -= 10;
    } else if (bmi >= 30) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} exceeds strict clinic maximum (typically <30, some <27)`
      });
      score -= 8;
    } else if (bmi >= 27 && bmi < 30) {
      issues.push({
        severity: 'moderate',
        message: `BMI ${bmi} may be too high for some strict clinics (many prefer <27)`
      });
      score -= 12;
    } else if (bmi < 18.5) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} below recommended minimum`
      });
      score -= 6;
    }
    // BMI 18.5-27 = ideal, no penalty
  }

  // Pregnancy history - no bonus for clean history since starting at 100%
  // Penalties applied for complications below

  // C-sections - very strict
  if (data.pregnancyHistory?.numberOfCesareans) {
    const csections = data.pregnancyHistory.numberOfCesareans;
    if (csections >= 4) {
      issues.push({
        severity: 'major',
        message: `${csections} C-sections - strict clinics extremely unlikely to accept`
      });
      score -= 12;
    } else if (csections === 3) {
      issues.push({
        severity: 'major',
        message: '3 C-sections exceeds strict clinic maximum (typically max 1-2)'
      });
      score -= 10;
    } else if (csections === 2) {
      issues.push({
        severity: 'moderate',
        message: '2 C-sections - some strict clinics accept, others prefer max 1'
      });
      score -= 6;
    }
  }

  // Total pregnancies
  if (data.pregnancyHistory?.totalDeliveries) {
    if (data.pregnancyHistory.totalDeliveries > 5) {
      issues.push({
        severity: 'major',
        message: 'More than 5 previous pregnancies concerning for strict clinics'
      });
      score -= 8;
    } else if (data.pregnancyHistory.totalDeliveries > 4) {
      issues.push({
        severity: 'moderate',
        message: 'More than 4 previous pregnancies may be concerning for strict clinics'
      });
      score -= 12;
    }
  }

  // Medical conditions - strict clinics less tolerant
  if (data.medicalConditions && data.medicalConditions.length > 0) {
    data.medicalConditions.forEach(condition => {
      if (condition === 'diabetes' || condition.includes('gestational_diabetes')) {
        issues.push({
          severity: 'major',
          message: 'History of gestational diabetes - strict clinics rarely accept'
        });
        score -= 10;
      } else if (condition === 'preeclampsia') {
        issues.push({
          severity: 'major',
          message: 'History of preeclampsia - strict clinics will NOT accept due to high recurrence risk (15-25%)'
        });
        score -= 95; // Near disqualifying // Near-automatic disqualifier for strict clinics
      } else if (condition === 'pregnancy_hypertension') {
        issues.push({
          severity: 'moderate',
          message: 'History of pregnancy-induced hypertension (PIH) - strict clinics typically require it was diet-controlled'
        });
        score -= 10;
      } else if (condition === 'hypertension') {
        issues.push({
          severity: 'major',
          message: 'History of chronic hypertension - concerning for strict clinics'
        });
        score -= 10;
      } else if (condition === 'hyperemesis') {
        issues.push({
          severity: 'major',
          message: 'History of severe hyperemesis (especially requiring hospitalization/PICC/TPN) - strict clinics very unlikely to accept'
        });
        score -= 12;
      } else if (condition === 'gastroparesis') {
        issues.push({
          severity: 'major',
          message: 'History of gastroparesis - extremely concerning, strict clinics will not accept'
        });
        score -= 12;
      } else if (condition === 'gerd') {
        issues.push({
          severity: 'moderate',
          message: 'History of severe GERD - concerning for strict clinics'
        });
        score -= 6;
      } else if (condition === 'gallstones' || condition === 'gastritis') {
        issues.push({
          severity: 'moderate',
          message: `History of ${condition} - may be concerning`
        });
        score -= 6;
      } else if (['thyroid_disorder', 'autoimmune_disease'].includes(condition)) {
        issues.push({
          severity: 'moderate',
          message: `${condition.replace(/_/g, ' ')} may be concerning for strict clinics`
        });
        score -= 6;
      }
    });
  }

  // Pregnancy complications - 50 points off for EACH complication (strict)
  if (data.pregnancyHistory?.numberOfComplications > 0) {
    const numComplications = data.pregnancyHistory.numberOfComplications;
    const complicationPenalty = numComplications * 50;

    // Build complications list from the complications array if available
    let complicationsList = '';
    if (data.pregnancyHistory.complications && data.pregnancyHistory.complications.length > 0) {
      const compDescriptions = data.pregnancyHistory.complications.map(comp => {
        // Convert category to readable format
        const category = comp.category.replace(/_/g, ' ');
        return category.charAt(0).toUpperCase() + category.slice(1);
      });
      complicationsList = ` (${compDescriptions.join(', ')})`;
    }

    issues.push({
      severity: 'major',
      message: `${numComplications} previous pregnancy complication${numComplications > 1 ? 's' : ''}${complicationsList} - highly concerning at strict clinics`
    });
    score -= complicationPenalty;
  }

  // Smoking - universally problematic
  if (data.lifestyle?.currentSmoker) {
    issues.push({
      severity: 'major',
      message: 'Current smoking - must cease, virtually all clinics require 3-6 month smoke-free period'
    });
    score -= 60;
  }

  // Drug use
  if (data.lifestyle?.currentDrugUse) {
    issues.push({
      severity: 'major',
      message: 'Current drug use - must cease and demonstrate sustained sobriety'
    });
    score -= 65;
  }

  // Combination penalties - strict clinics EXTREMELY sensitive to multiple factors
  const minorCount = issues.filter(i => i.severity === 'minor').length;
  const moderateCount = issues.filter(i => i.severity === 'moderate').length;
  const majorCount = issues.filter(i => i.severity === 'major').length;
  const totalIssues = minorCount + moderateCount + majorCount;

  // ANY major issue = massive penalty
  if (majorCount >= 1) {
    score -= 35; // Strict clinics rarely accept even ONE major issue
  }

  // Multiple moderate issues = nearly disqualifying
  if (moderateCount >= 2) {
    issues.push({
      severity: 'major',
      message: 'Multiple moderate issues - strict clinics almost never accept combinations'
    });
    score -= 40;
  }

  // Even 2-3 minor issues combined = significant penalty
  if (minorCount >= 2) {
    score -= 20;
  }

  // Any combination of different severity levels = compounding penalty
  if (totalIssues >= 3) {
    issues.push({
      severity: 'major',
      message: '3+ risk factors combined - strict clinics will not accept this combination'
    });
    score -= 50; // Nearly eliminates chance
  } else if (totalIssues >= 2 && majorCount >= 1) {
    score -= 30; // Major + anything else = very bad
  }

  // Cap score at realistic maximum for strict clinics (95%)
  score = Math.max(0, Math.min(95, score));

  return {
    clinicType: CLINIC_TYPES.STRICT,
    acceptanceLevel: scoreToAcceptanceLevel(score, CLINIC_TYPES.STRICT),
    score: score,
    issues: issues,
    summary: generateClinicSummary(CLINIC_TYPES.STRICT, score, issues)
  };
}

/**
 * Moderate/Average Clinic Assessment
 * - BMI 30-31, sometimes 32
 * - Up to 3 C-sections (ASRM guideline)
 * - Controlled gestational diabetes acceptable
 * - Can tolerate combinations unless severe
 */
function assessForModerateClinic(data) {
  const issues = [];
  let score = 100; // Start at 100% - ideal candidate, subtract for concerns

  // Age assessment - follows ASRM but considers case-by-case exceptions up to 43
  if (data.age) {
    if (data.age < 21) {
      issues.push({
        severity: 'major',
        message: 'Age below ASRM minimum - rare exceptions made'
      });
      score -= 5;
    } else if (data.age > 45) {
      issues.push({
        severity: 'major',
        message: 'Age over 45 exceeds ASRM maximum - most moderate clinics will not proceed'
      });
      score -= 6;
    } else if (data.age >= 44) {
      issues.push({
        severity: 'major',
        message: 'Age 44-45: Some moderate clinics review case-by-case with MFM clearance if exceptional health'
      });
      score -= 5;
    } else if (data.age >= 41) {
      issues.push({
        severity: 'moderate',
        message: 'Age 41-43: Most moderate clinics will consider case-by-case with MFM evaluation'
      });
      score -= 4;
    } else if (data.age > 37) {
      issues.push({
        severity: 'minor',
        message: 'Age 38-40: Within acceptable range with standard monitoring'
      });
      score -= 3;
    } else if (data.age >= 25 && data.age <= 37) {
      // Ideal age - no penalty
    } else if (data.age >= 21 && data.age < 25) {
      // Acceptable age
      // Acceptable age - no penalty
    }
  }

  // BMI - moderate clinic requirements (based on real SDFC clinic data)
  if (data.lifestyle?.bmi) {
    const bmi = data.lifestyle.bmi;
    if (bmi > 35) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} significantly exceeds moderate clinic threshold (32) - physician will require weight loss before proceeding`
      });
      score -= 6;
    } else if (bmi >= 32 && bmi <= 35) {
      issues.push({
        severity: 'moderate',
        message: `BMI ${bmi} at/above moderate clinic threshold - requires physician approval, typically asked to lower to 32 or below`
      });
      score -= 4;
    } else if (bmi >= 30 && bmi < 32) {
      issues.push({
        severity: 'minor',
        message: `BMI ${bmi} acceptable for moderate clinics, approaching upper limit of 32`
      });
      score -= 3;
    } else if (bmi < 18.5) {
      issues.push({
        severity: 'moderate',
        message: `BMI ${bmi} very low - requires physician approval and nutritional evaluation`
      });
      score -= 4;
    } else if (bmi >= 19 && bmi < 30) {
      // Ideal BMI - no penalty
    }
  }

  // Pregnancy history - no bonus for clean history since starting at 100%
  // Penalties applied for complications below

  // C-sections - Real moderate clinic standard: 4+ is decline
  if (data.pregnancyHistory?.numberOfCesareans) {
    const csections = data.pregnancyHistory.numberOfCesareans;
    if (csections >= 4) {
      issues.push({
        severity: 'major',
        message: `${csections} C-sections - moderate clinics typically decline (4+ is common cutoff)`
      });
      score -= 6; // 50% of strict's -12
    } else if (csections === 3) {
      issues.push({
        severity: 'moderate',
        message: '3 C-sections at ASRM maximum - acceptable with MFM clearance'
      });
      score -= 3; // 50% of strict's -6
    }
  }

  // Total pregnancies - Real moderate clinic standard
  if (data.pregnancyHistory?.totalDeliveries) {
    if (data.pregnancyHistory.totalDeliveries >= 6) {
      issues.push({
        severity: 'major',
        message: '6+ vaginal deliveries - moderate clinics typically decline unless OB/MFM counseling obtained'
      });
      score -= 4; // 50% of strict's -8
    } else if (data.pregnancyHistory.totalDeliveries > 5) {
      issues.push({
        severity: 'moderate',
        message: 'More than 5 previous deliveries exceeds ASRM guideline - case-by-case review'
      });
      score -= 6; // 50% of strict's -12
    }
  }

  // Medical conditions - moderate clinic tolerance (based on real SDFC data)
  if (data.medicalConditions && data.medicalConditions.length > 0) {
    data.medicalConditions.forEach(condition => {
      // Insulin-dependent diabetes is decline per SDFC
      if (condition.includes('insulin_dependent') || condition.includes('type_1_diabetes') || condition.includes('type_2_diabetes')) {
        issues.push({
          severity: 'major',
          message: 'Insulin-dependent diabetes (Type I or II) - moderate clinics typically decline'
        });
        score -= 6; // 50% of strict's -12
      }
      // Gestational diabetes requires physician approval (NOT decline!)
      else if (condition.includes('gestational_diabetes')) {
        issues.push({
          severity: 'moderate',
          message: 'History of gestational diabetes - requires physician approval and evaluation (case-by-case)'
        });
        score -= 5; // 50% of strict's -10
      }
      // Preeclampsia is typically a decline even at moderate clinics
      else if (condition === 'preeclampsia') {
        issues.push({
          severity: 'major',
          message: 'History of preeclampsia - moderate clinics typically decline due to high recurrence risk'
        });
        score -= 48; // 50% of strict's -95 (near disqualifying)
      }
      // Pregnancy-induced hypertension requires physician approval
      else if (condition === 'pregnancy_hypertension') {
        issues.push({
          severity: 'moderate',
          message: 'History of pregnancy-induced hypertension (PIH) typically acceptable if it was fully diet-controlled'
        });
        score -= 5; // 50% of strict's -10
      }
      // Chronic hypertension
      else if (condition === 'hypertension') {
        issues.push({
          severity: 'moderate',
          message: 'History of chronic hypertension - moderate clinics review if well-controlled'
        });
        score -= 5; // 50% of strict's -10
      }
      // Well-controlled conditions acceptable
      else if (['thyroid_disorder', 'asthma', 'autoimmune_disease'].includes(condition)) {
        issues.push({
          severity: 'minor',
          message: `${condition.replace(/_/g, ' ')} - acceptable if well-controlled`
        });
        score -= 3; // 50% of strict's -6
      }
      // Gastro conditions
      else if (condition === 'hyperemesis') {
        issues.push({
          severity: 'moderate',
          message: 'History of severe hyperemesis - moderate clinics review case-by-case'
        });
        score -= 6; // 50% of strict's -12
      } else if (condition === 'gastroparesis') {
        issues.push({
          severity: 'moderate',
          message: 'History of gastroparesis - concerning for moderate clinics'
        });
        score -= 6; // 50% of strict's -12
      } else if (condition === 'gerd' || condition === 'gallstones' || condition === 'gastritis') {
        issues.push({
          severity: 'minor',
          message: `History of ${condition} - acceptable if well-managed`
        });
        score -= 3; // 50% of strict's -6
      }
    });
  }

  // Pregnancy complications - 35 points off for EACH complication (moderate between strict's 50 and lenient's progressive)
  if (data.pregnancyHistory?.numberOfComplications > 0) {
    const numComplications = data.pregnancyHistory.numberOfComplications;
    const complicationPenalty = numComplications * 35;

    // Build complications list from the complications array if available
    let complicationsList = '';
    if (data.pregnancyHistory.complications && data.pregnancyHistory.complications.length > 0) {
      const compDescriptions = data.pregnancyHistory.complications.map(comp => {
        // Convert category to readable format
        const category = comp.category.replace(/_/g, ' ');
        return category.charAt(0).toUpperCase() + category.slice(1);
      });
      complicationsList = ` (${compDescriptions.join(', ')})`;
    }

    issues.push({
      severity: 'moderate',
      message: `${numComplications} previous pregnancy complication${numComplications > 1 ? 's' : ''}${complicationsList} - requires detailed evaluation`
    });
    score -= complicationPenalty;
  }

  // Smoking
  if (data.lifestyle?.currentSmoker) {
    issues.push({
      severity: 'major',
      message: 'Current smoking - must cease before approval, most clinics require 3-6 month smoke-free period'
    });
    score -= 30; // 50% of strict's -60
  }

  // Drug use
  if (data.lifestyle?.currentDrugUse) {
    issues.push({
      severity: 'major',
      message: 'Current drug use - must cease and demonstrate sustained sobriety'
    });
    score -= 33; // 50% of strict's -65
  }

  // Combination assessment - moderate clinics more flexible but still penalize combinations
  const minorCountMod = issues.filter(i => i.severity === 'minor').length;
  const moderateCountMod = issues.filter(i => i.severity === 'moderate').length;
  const majorCountMod = issues.filter(i => i.severity === 'major').length;
  const totalIssuesMod = minorCountMod + moderateCountMod + majorCountMod;

  // Major issues are serious even at moderate clinics
  if (majorCountMod >= 2) {
    issues.push({
      severity: 'major',
      message: 'Multiple major issues - even moderate clinics unlikely to accept'
    });
    score -= 18; // 50% of strict's -35
  } else if (majorCountMod >= 1) {
    score -= 10; // 50% of strict's -20
  }

  // Multiple moderate/minor combinations
  if (moderateCountMod >= 3) {
    issues.push({
      severity: 'moderate',
      message: '3+ moderate factors - case-by-case review required, physician approval needed'
    });
    score -= 13; // 50% of strict's -25
  }

  // Lots of minor issues add up
  if (minorCountMod >= 3) {
    score -= 8; // 50% of strict's -15
  }

  // Total issues penalty
  if (totalIssuesMod >= 4) {
    issues.push({
      severity: 'moderate',
      message: '4+ risk factors combined - extensive physician review required'
    });
    score -= 10; // 50% of strict's -20
  }

  // Cap score at realistic maximum for moderate clinics (92%)
  score = Math.max(0, Math.min(92, score));

  return {
    clinicType: CLINIC_TYPES.MODERATE,
    acceptanceLevel: scoreToAcceptanceLevel(score, CLINIC_TYPES.MODERATE),
    score: score,
    issues: issues,
    summary: generateClinicSummary(CLINIC_TYPES.MODERATE, score, issues)
  };
}

/**
 * Lenient Clinic Assessment
 * - BMI up to 32-33, some very lenient to 35
 * - More flexible on combinations
 * - Controlled conditions acceptable
 * - ALL lenient clinics consider case-by-case exceptions to ASRM guidelines
 * - Common sense review approach - will evaluate overall health picture
 */
function assessForLenientClinic(data) {
  const issues = [];
  let score = 100; // Start at 100% - ideal candidate, subtract for concerns

  // Age assessment - flexible with case-by-case review up to 45
  if (data.age) {
    if (data.age < 21) {
      issues.push({
        severity: 'moderate',
        message: 'Age below ASRM minimum - lenient clinics may consider with maturity assessment'
      });
      score -= 2; // 30% of strict's -5
    } else if (data.age > 48) {
      issues.push({
        severity: 'major',
        message: 'Age over 48: Even lenient clinics rarely proceed due to excessive obstetric risks'
      });
      score -= 4; // 30% of strict's -12
    } else if (data.age >= 46) {
      issues.push({
        severity: 'moderate',
        message: 'Age 46-48: Lenient clinics will review case-by-case with extensive MFM evaluation'
      });
      score -= 3; // 30% of strict's -10
    } else if (data.age > 43) {
      issues.push({
        severity: 'minor',
        message: 'Age 44-45: Most lenient clinics will consider with MFM clearance and good health profile'
      });
      score -= 2; // 30% of strict's -6
    } else if (data.age >= 24 && data.age <= 43) {
      // Ideal age - no penalty
    } else if (data.age >= 21 && data.age < 24) {
      // Acceptable age
      // Acceptable - no penalty
    }
  }

  // BMI - lenient requirements
  if (data.lifestyle?.bmi) {
    const bmi = data.lifestyle.bmi;
    if (bmi > 38) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} exceeds even lenient clinic typical maximum - very challenging but some may review`
      });
      score -= 3; // 30% of strict's -10
    } else if (bmi > 35 && bmi <= 38) {
      issues.push({
        severity: 'major',
        message: `BMI ${bmi} above standard lenient maximum (35) - case-by-case review, MFM clearance critical`
      });
      score -= 2; // 30% of strict's -8
    } else if (bmi >= 33 && bmi <= 35) {
      issues.push({
        severity: 'moderate',
        message: `BMI ${bmi} only accepted at very lenient clinics`
      });
      score -= 4; // 30% of strict's -12
    } else if (bmi >= 32 && bmi < 33) {
      issues.push({
        severity: 'minor',
        message: `BMI ${bmi} acceptable at lenient clinics`
      });
      score -= 2; // 30% of strict's -6
    } else if (bmi < 19) {
      issues.push({
        severity: 'minor',
        message: `BMI ${bmi} below recommended but may be acceptable with evaluation`
      });
      score -= 2; // 30% of strict's -6
    } else if (bmi >= 19 && bmi < 32) {
      // Ideal BMI - no penalty
    }
  }

  // Pregnancy history - no bonus for clean history since starting at 100%
  // Penalties applied for complications below

  // C-sections - somewhat flexible
  if (data.pregnancyHistory?.numberOfCesareans) {
    const csections = data.pregnancyHistory.numberOfCesareans;
    if (csections > 3) {
      issues.push({
        severity: 'major',
        message: `${csections} C-sections exceeds most clinic limits, even lenient ones`
      });
      score -= 4; // 30% of strict's -12
    } else if (csections === 3) {
      issues.push({
        severity: 'minor',
        message: '3 C-sections acceptable at lenient clinics with evaluation'
      });
      score -= 2; // 30% of strict's -6
    }
  }

  // Total pregnancies
  if (data.pregnancyHistory?.totalDeliveries) {
    if (data.pregnancyHistory.totalDeliveries > 5) {
      issues.push({
        severity: 'moderate',
        message: 'More than 5 previous pregnancies requires evaluation but may be acceptable'
      });
      score -= 2; // 30% of strict's -8
    }
  }

  // Medical conditions - lenient approach
  if (data.medicalConditions && data.medicalConditions.length > 0) {
    data.medicalConditions.forEach(condition => {
      if (condition === 'preeclampsia') {
        issues.push({
          severity: 'major',
          message: 'History of preeclampsia - even lenient clinics are cautious due to 15-25% recurrence risk. Case-by-case evaluation required.'
        });
        score -= 29; // 30% of strict's -95 (near disqualifying)
      } else if (condition.includes('gestational_diabetes')) {
        issues.push({
          severity: 'minor',
          message: 'Gestational diabetes history acceptable if controlled by diet'
        });
        score -= 3; // 30% of strict's -10
      } else if (condition === 'pregnancy_hypertension') {
        issues.push({
          severity: 'minor',
          message: 'Pregnancy-induced hypertension (PIH) acceptable if it was diet-controlled'
        });
        score -= 3; // 30% of strict's -10
      } else if (condition === 'hypertension') {
        issues.push({
          severity: 'minor',
          message: 'Chronic hypertension acceptable if currently well-controlled'
        });
        score -= 3; // 30% of strict's -10
      } else if (['thyroid_disorder', 'controlled_diabetes', 'asthma', 'autoimmune_disease'].includes(condition)) {
        issues.push({
          severity: 'minor',
          message: `${condition.replace(/_/g, ' ')} acceptable if well-controlled`
        });
        score -= 2; // 30% of strict's -6
      }
      // Gastro conditions - lenient view
      else if (condition === 'hyperemesis' || condition === 'gastroparesis') {
        issues.push({
          severity: 'minor',
          message: `History of ${condition} - acceptable if resolved`
        });
        score -= 4; // 30% of strict's -12
      } else if (condition === 'gerd' || condition === 'gallstones' || condition === 'gastritis') {
        issues.push({
          severity: 'minor',
          message: `History of ${condition} - acceptable if well-managed`
        });
        score -= 2; // 30% of strict's -6
      }
    });
  }

  // Pregnancy complications - lenient view with progressive penalties
  if (data.pregnancyHistory?.numberOfComplications > 0) {
    const numComplications = data.pregnancyHistory.numberOfComplications;
    let complicationPenalty = 0;

    // Progressive penalty system:
    // 1 complication: -5
    // 2 complications: -12
    // 3 complications: -20
    // 4+ complications: -5 for each additional
    if (numComplications === 1) {
      complicationPenalty = 5;
    } else if (numComplications === 2) {
      complicationPenalty = 12;
    } else if (numComplications === 3) {
      complicationPenalty = 20;
    } else {
      // 4+ complications: 20 (for first 3) + 5 per additional
      complicationPenalty = 20 + ((numComplications - 3) * 5);
    }

    // Build complications list from the complications array if available
    let complicationsList = '';
    if (data.pregnancyHistory.complications && data.pregnancyHistory.complications.length > 0) {
      const compDescriptions = data.pregnancyHistory.complications.map(comp => {
        // Convert category to readable format
        const category = comp.category.replace(/_/g, ' ');
        return category.charAt(0).toUpperCase() + category.slice(1);
      });
      complicationsList = ` (${compDescriptions.join(', ')})`;
    }

    issues.push({
      severity: numComplications > 2 ? 'moderate' : 'minor',
      message: `${numComplications} previous pregnancy complication${numComplications > 1 ? 's' : ''}${complicationsList} - lenient clinics will review case-by-case`
    });
    score -= complicationPenalty;
  }

  // Smoking - must address but not absolute DQ
  if (data.lifestyle?.currentSmoker) {
    issues.push({
      severity: 'major',
      message: 'Current smoking - must cease, lenient clinics typically require 3-6 month smoke-free period before proceeding'
    });
    score -= 18; // 30% of strict's -60
  }

  // Drug use
  if (data.lifestyle?.currentDrugUse) {
    issues.push({
      severity: 'major',
      message: 'Current drug use - must cease and demonstrate sobriety period'
    });
    score -= 20; // 30% of strict's -65
  }

  // Combination assessment - lenient clinics more tolerant
  const minorCountLen = issues.filter(i => i.severity === 'minor').length;
  const moderateCountLen = issues.filter(i => i.severity === 'moderate').length;
  const majorCountLen = issues.filter(i => i.severity === 'major').length;
  const totalIssuesLen = minorCountLen + moderateCountLen + majorCountLen;

  // Even lenient clinics have limits on major issues
  if (majorCountLen >= 2) {
    issues.push({
      severity: 'major',
      message: 'Multiple major issues - lenient clinics will need extensive evaluation'
    });
    score -= 11; // 30% of strict's -35
  } else if (majorCountLen >= 1) {
    score -= 6; // 30% of strict's -20
  }

  // Multiple moderate issues
  if (moderateCountLen >= 3) {
    issues.push({
      severity: 'moderate',
      message: '3+ moderate factors - case-by-case review with physician approval'
    });
    score -= 8; // 30% of strict's -25
  }

  // Many minor issues
  if (minorCountLen >= 3) {
    score -= 5; // 30% of strict's -15
  }

  // Total combination penalty
  if (totalIssuesLen >= 4) {
    issues.push({
      severity: 'minor',
      message: '4+ risk factors - lenient clinics will review overall health picture'
    });
    score -= 6; // 30% of strict's -20
  }

  // Cap score at realistic maximum for lenient clinics (95%)
  score = Math.max(0, Math.min(95, score));

  return {
    clinicType: CLINIC_TYPES.LENIENT,
    acceptanceLevel: scoreToAcceptanceLevel(score, CLINIC_TYPES.LENIENT),
    score: score,
    issues: issues,
    summary: generateClinicSummary(CLINIC_TYPES.LENIENT, score, issues)
  };
}

/**
 * Convert numerical score to acceptance level
 * Categories: Likely to Approve (>60%), May Approve with Additional Records (20-60%), Unlikely to Approve (0-20%)
 */
function scoreToAcceptanceLevel(score, clinicType = CLINIC_TYPES.STRICT) {
  // All clinic types use same thresholds (penalties create separation between clinic types)
  if (score > 60) return ACCEPTANCE_LEVELS.LIKELY_TO_APPROVE;
  if (score >= 20) return ACCEPTANCE_LEVELS.MAY_APPROVE_WITH_RECORDS;
  return ACCEPTANCE_LEVELS.UNLIKELY_TO_APPROVE;
}

/**
 * Generate summary for clinic type
 */
function generateClinicSummary(clinicType, score, issues) {
  const acceptanceLevel = scoreToAcceptanceLevel(score, clinicType);
  const disqualifying = issues.filter(i => i.severity === 'disqualifying').length;
  const major = issues.filter(i => i.severity === 'major').length;
  const moderate = issues.filter(i => i.severity === 'moderate').length;
  const minor = issues.filter(i => i.severity === 'minor').length;

  let summary = '';

  if (disqualifying > 0) {
    summary = `Unlikely to be accepted at ${clinicType.toLowerCase()} clinics due to ${disqualifying} disqualifying factor(s).`;
  } else if (major > 0) {
    summary = `May face significant challenges at ${clinicType.toLowerCase()} clinics due to ${major} major issue(s).`;
  } else if (moderate > 0) {
    summary = `May be accepted at ${clinicType.toLowerCase()} clinics with ${moderate} moderate concern(s) requiring evaluation.`;
  } else if (minor > 0) {
    summary = `Good candidate for ${clinicType.toLowerCase()} clinics with ${minor} minor consideration(s).`;
  } else {
    summary = `Excellent candidate for ${clinicType.toLowerCase()} clinics.`;
  }

  return summary;
}

/**
 * Generate overall recommendation
 */
function generateClinicRecommendation(strict, moderate, lenient) {
  const recommendations = [];

  // Determine best clinic type matches
  if (strict.score >= 80) {
    recommendations.push('Candidate is an excellent match for strict/premium clinics');
  } else if (strict.score >= 60) {
    recommendations.push('Candidate may be accepted at some strict clinics with evaluation');
  }

  if (moderate.score >= 80) {
    recommendations.push('Candidate is an excellent match for moderate/average clinics');
  } else if (moderate.score >= 60) {
    recommendations.push('Candidate likely to be accepted at moderate clinics');
  }

  if (lenient.score >= 80) {
    recommendations.push('Candidate is an excellent match for lenient clinics');
  } else if (lenient.score >= 60) {
    recommendations.push('Candidate likely to be accepted at lenient clinics');
  }

  // If low scores across the board
  if (strict.score < 40 && moderate.score < 40 && lenient.score < 40) {
    recommendations.push('Candidate faces significant challenges at all clinic types. Consider addressing identified issues before applying.');
  }

  // Suggest best match
  const scores = [
    { type: 'strict', score: strict.score, level: strict.acceptanceLevel },
    { type: 'moderate', score: moderate.score, level: moderate.acceptanceLevel },
    { type: 'lenient', score: lenient.score, level: lenient.acceptanceLevel }
  ];

  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score >= 60) {
    const levelText = getAcceptanceProbabilityDescription(scores[0].level);
    recommendations.push(`Best match: ${scores[0].type.toUpperCase()} clinics - ${levelText}`);
  }

  return recommendations;
}

/**
 * Get acceptance probability description
 */
export function getAcceptanceProbabilityDescription(level) {
  const descriptions = {
    [ACCEPTANCE_LEVELS.LIKELY_TO_APPROVE]: 'Likely to Approve',
    [ACCEPTANCE_LEVELS.MAY_APPROVE_WITH_RECORDS]: 'May Approve with Additional Records',
    [ACCEPTANCE_LEVELS.UNLIKELY_TO_APPROVE]: 'Unlikely to Approve'
  };

  return descriptions[level] || 'Unknown';
}

/**
 * Get qualitative clearance badge text
 */
export function getClearanceBadgeText(level) {
  const badges = {
    [ACCEPTANCE_LEVELS.LIKELY_TO_APPROVE]: 'Likely to Approve',
    [ACCEPTANCE_LEVELS.MAY_APPROVE_WITH_RECORDS]: 'May Approve',
    [ACCEPTANCE_LEVELS.UNLIKELY_TO_APPROVE]: 'Unlikely'
  };

  return badges[level] || 'Unknown';
}

/**
 * Get clearance badge color
 */
export function getClearanceBadgeColor(level) {
  const colors = {
    [ACCEPTANCE_LEVELS.LIKELY_TO_APPROVE]: { bg: '#d1fae5', text: '#065f46', border: '#10b981' }, // green
    [ACCEPTANCE_LEVELS.MAY_APPROVE_WITH_RECORDS]: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' }, // amber
    [ACCEPTANCE_LEVELS.UNLIKELY_TO_APPROVE]: { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' } // red
  };

  return colors[level] || { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
}
