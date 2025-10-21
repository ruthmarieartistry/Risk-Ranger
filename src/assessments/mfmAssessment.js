/**
 * Maternal-Fetal Medicine (MFM) Assessment for SURROGACY
 *
 * CRITICAL DISTINCTION: MFM evaluation for surrogacy differs from evaluation
 * of women carrying their own pregnancies.
 *
 * FOR SURROGACY, MFMs have a HIGHER standard because:
 * 1. DUTY TO PROTECT SURROGATE: Elective pregnancy for someone else - must not
 *    exploit vulnerable women or expose them to unreasonable risks
 * 2. DUTY TO INTENDED PARENTS: Must minimize pregnancy complications that could
 *    result in loss or harm to the intended child
 * 3. HIGHER ETHICAL BAR: Woman's reproductive autonomy in her own pregnancy allows
 *    accepting risks she chooses. In surrogacy, MFM must protect BOTH the surrogate
 *    AND ensure fair treatment - cannot take advantage of economic circumstances.
 *
 * RESULT: Conditions that MFM might approve for a woman wanting her own baby
 * ("as long as she understands the risks") are often DECLINED for surrogacy.
 * MFMs are MORE CONSERVATIVE when evaluating surrogate candidates.
 */

export const MFM_REVIEW_LEVELS = {
  NOT_REQUIRED: 'NOT_REQUIRED',
  RECOMMENDED: 'RECOMMENDED',
  STRONGLY_RECOMMENDED: 'STRONGLY_RECOMMENDED',
  REQUIRED: 'REQUIRED'
};

export const MFM_LIKELIHOOD = {
  LIKELY_APPROVE: 'LIKELY_APPROVE',
  POSSIBLY_APPROVE: 'POSSIBLY_APPROVE',
  UNLIKELY_APPROVE: 'UNLIKELY_APPROVE',
  LIKELY_DENY: 'LIKELY_DENY'
};

/**
 * Assess whether MFM review is needed and likely outcome
 */
export function assessMFMReview(candidateData) {
  const findings = [];
  let mfmReviewLevel = MFM_REVIEW_LEVELS.NOT_REQUIRED;
  let requiresReview = false;

  // Age-related MFM considerations
  if (candidateData.age) {
    if (candidateData.age > 42) {
      findings.push({
        category: 'Age',
        concern: `Age ${candidateData.age} significantly above ASRM guideline maximum (45)`,
        mfmView: 'MFM will evaluate advanced maternal age risks: increased rates of gestational diabetes, preeclampsia, placental complications, and cesarean delivery. Will require detailed discussion of age-related pregnancy risks.',
        severity: 'high',
        approvability: 'Age >42 is challenging - MFM likely to recommend against unless exceptionally healthy with excellent obstetric history'
      });
      requiresReview = true;
      mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
    } else if (candidateData.age > 40) {
      findings.push({
        category: 'Age',
        concern: `Age ${candidateData.age} above ideal range but within ASRM guidelines`,
        mfmView: 'MFM will assess for age-related risk factors including blood pressure, glucose tolerance, and prior pregnancy complications. Age 40-45 acceptable with close monitoring.',
        severity: 'moderate',
        approvability: 'Age 40-42 generally approvable with clean medical history and normal vital signs'
      });
      if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
        mfmReviewLevel = MFM_REVIEW_LEVELS.RECOMMENDED;
      }
    } else if (candidateData.age > 38) {
      findings.push({
        category: 'Age',
        concern: `Age ${candidateData.age} approaching upper range`,
        mfmView: 'MFM will note slightly increased risk but generally acceptable. Will monitor closely for gestational diabetes and hypertension.',
        severity: 'low',
        approvability: 'Age 38-40 typically approved without issue'
      });
    }
  }

  // Multiple C-sections - major MFM concern
  if (candidateData.pregnancyHistory?.numberOfCesareans) {
    const csections = candidateData.pregnancyHistory.numberOfCesareans;

    if (csections >= 3) {
      findings.push({
        category: 'Cesarean History',
        concern: `${csections} previous cesarean deliveries`,
        mfmView: 'MFM VERY concerned about: placenta accreta/percreta risk (up to 40% with 3+ C-sections), uterine rupture risk, intraoperative complications, massive hemorrhage risk requiring hysterectomy. Will require detailed operative reports and ultrasound evaluation of uterine scar.',
        severity: 'high',
        approvability: csections === 3
          ? 'Three C-sections: MFM may approve with extensive counseling, detailed surgical history review, and agreement to deliver at tertiary care center with blood bank. Some MFMs will not approve.'
          : 'Four or more C-sections: Most MFMs will recommend against surrogacy due to unacceptably high maternal morbidity/mortality risk'
      });
      requiresReview = true;
      mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
    } else if (csections === 2) {
      findings.push({
        category: 'Cesarean History',
        concern: '2 previous cesarean deliveries',
        mfmView: 'MFM will note increased risk of placenta previa, accreta (3-11% risk), and need for repeat cesarean. Will review operative reports for complications or difficult surgery. Will counsel on risks but generally acceptable.',
        severity: 'moderate',
        approvability: 'Two C-sections usually approved with proper counseling and surgical history review'
      });
      if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
        mfmReviewLevel = MFM_REVIEW_LEVELS.RECOMMENDED;
      }
    }
  }

  // High number of pregnancies
  if (candidateData.pregnancyHistory?.totalDeliveries > 5) {
    findings.push({
      category: 'Grand Multiparity',
      concern: `${candidateData.pregnancyHistory.totalDeliveries} previous deliveries (grand multiparity)`,
      mfmView: 'MFM will evaluate risks of grand multiparity: increased risk of postpartum hemorrhage, placental abnormalities, malpresentation, and uterine atony. Will review obstetric history for complications and assess current uterine tone.',
      severity: 'moderate',
      approvability: 'Grand multiparity can be approved if previous deliveries were uncomplicated and patient has no anemia or uterine issues'
    });
    requiresReview = true;
    if (mfmReviewLevel !== MFM_REVIEW_LEVELS.REQUIRED) {
      mfmReviewLevel = MFM_REVIEW_LEVELS.STRONGLY_RECOMMENDED;
    }
  }

  // BMI considerations
  if (candidateData.lifestyle?.bmi) {
    const bmi = candidateData.lifestyle.bmi;

    if (bmi >= 35) {
      findings.push({
        category: 'Obesity Class II/III',
        concern: `BMI ${bmi} - Obesity Class ${bmi >= 40 ? 'III (Extreme)' : 'II'}`,
        mfmView: `MFM will identify multiple concerns: dramatically increased risk of gestational diabetes (up to 40%), preeclampsia (3-4x risk), cesarean delivery (2-3x risk), wound complications, anesthesia risks, difficult fetal monitoring, increased miscarriage risk. ${bmi >= 40 ? 'BMI ≥40 is considered very high risk.' : ''}`,
        severity: 'high',
        approvability: bmi >= 40
          ? 'BMI ≥40: Most MFMs will not approve due to excessive maternal and fetal risks'
          : 'BMI 35-39.9: Some MFMs may approve with metabolic workup (glucose tolerance test, hemoglobin A1c), blood pressure monitoring, and weight management plan. Many will decline.'
      });
      requiresReview = true;
      mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
    } else if (bmi >= 32 && bmi < 35) {
      findings.push({
        category: 'Obesity Class I',
        concern: `BMI ${bmi} - Obesity Class I`,
        mfmView: 'MFM will note increased risk of gestational diabetes, hypertension, and cesarean delivery. Will order metabolic screening and may approve with close monitoring.',
        severity: 'moderate',
        approvability: 'BMI 32-34.9: Usually approved with glucose tolerance test and blood pressure monitoring'
      });
      if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
        mfmReviewLevel = MFM_REVIEW_LEVELS.RECOMMENDED;
      }
    } else if (bmi < 18.5) {
      findings.push({
        category: 'Underweight',
        concern: `BMI ${bmi} - Underweight`,
        mfmView: 'MFM will assess for nutritional deficiencies, eating disorders, and risk of intrauterine growth restriction. Will require nutritional evaluation.',
        severity: 'moderate',
        approvability: 'Low BMI can be approved if nutritionally healthy and eating disorder history ruled out'
      });
      if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
        mfmReviewLevel = MFM_REVIEW_LEVELS.RECOMMENDED;
      }
    }
  }

  // Medical conditions
  if (candidateData.medicalConditions && candidateData.medicalConditions.length > 0) {
    candidateData.medicalConditions.forEach(condition => {
      const lowerCondition = condition.toLowerCase();

      if (lowerCondition.includes('hypertension') || lowerCondition.includes('high blood pressure')) {
        const isPregnancyInduced = condition === 'pregnancy_hypertension';
        findings.push({
          category: isPregnancyInduced ? 'Pregnancy-Induced Hypertension (PIH)' : 'Chronic Hypertension',
          concern: isPregnancyInduced ? 'History of pregnancy-induced hypertension' : 'History of chronic hypertension',
          mfmView: isPregnancyInduced
            ? 'MFM will evaluate if PIH was diet-controlled or required medication. PIH has 15-25% recurrence risk. Usually approvable if it was mild and resolved postpartum without complications.'
            : 'MFM will evaluate current blood pressure control, medication regimen (must switch to pregnancy-safe medications), target organ damage, and risk of superimposed preeclampsia (25-50% risk). Will require cardiology clearance if long-standing or poorly controlled.',
          severity: isPregnancyInduced ? 'moderate' : 'high',
          approvability: isPregnancyInduced
            ? 'Pregnancy-induced hypertension usually approvable if: resolved postpartum, was diet-controlled (not medication-requiring), no progression to preeclampsia'
            : 'Chronic hypertension approvable only if: well-controlled on pregnancy-compatible medication (labetalol, nifedipine, methyldopa), no target organ damage, normal kidney function, baseline BP <140/90'
        });
        requiresReview = true;
        mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
      }

      if (lowerCondition.includes('diabetes')) {
        const isGestational = lowerCondition.includes('gestational');
        findings.push({
          category: isGestational ? 'Gestational Diabetes History' : 'Diabetes Mellitus',
          concern: isGestational ? 'Previous gestational diabetes' : 'Pre-existing diabetes',
          mfmView: isGestational
            ? 'MFM will note 30-84% recurrence risk of gestational diabetes. Will order early glucose screening and may approve if previous GDM was diet-controlled only (not insulin-requiring). A1c recurrence requiring insulin is higher risk for rejection.'
            : 'MFM will assess diabetes control (hemoglobin A1c must be <6.5%), retinopathy, nephropathy, neuropathy. Pre-existing diabetes significantly increases risk of congenital anomalies, macrosomia, stillbirth. Will require endocrinology co-management.',
          severity: isGestational ? 'moderate' : 'high',
          approvability: isGestational
            ? 'Prior GDM: Usually approved if diet-controlled only. Insulin-requiring GDM may be declined by some MFMs.'
            : 'Pre-existing diabetes: Type 1 or Type 2 diabetes generally declined for surrogacy due to high-risk nature. Very rare approval with exceptional control.'
        });
        requiresReview = true;
        mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
      }

      if (lowerCondition.includes('thyroid')) {
        findings.push({
          category: 'Thyroid Disorder',
          concern: 'Thyroid condition',
          mfmView: 'MFM will review thyroid function tests (TSH, Free T4) and ensure stable on appropriate medication. Hypothyroidism is common and manageable; hyperthyroidism more concerning. Well-controlled thyroid disease generally acceptable.',
          severity: 'low',
          approvability: 'Thyroid disorders: Approved if well-controlled on stable medication dose with normal TSH'
        });
        if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
          mfmReviewLevel = MFM_REVIEW_LEVELS.RECOMMENDED;
        }
      }

      if (lowerCondition.includes('autoimmune')) {
        findings.push({
          category: 'Autoimmune Disease',
          concern: 'Autoimmune condition',
          mfmView: 'MFM will assess disease activity, immunosuppressive medications (many are teratogenic), and risk of disease flare during pregnancy. Lupus particularly concerning due to risk of flare, preeclampsia, fetal heart block if anti-Ro/anti-La positive.',
          severity: 'high',
          approvability: 'Autoimmune disease: Case-by-case. Mild, stable disease on pregnancy-compatible medications may be approved. Active disease or concerning antibodies (APS, anti-Ro/La) likely declined.'
        });
        requiresReview = true;
        mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
      }

      if (lowerCondition.includes('asthma')) {
        findings.push({
          category: 'Asthma',
          concern: 'Asthma diagnosis',
          mfmView: 'MFM will assess asthma severity and control. Well-controlled asthma (no recent ED visits, hospitalizations, or oral steroids) is acceptable. Severe asthma requiring frequent steroids is higher risk.',
          severity: 'low',
          approvability: 'Asthma: Approved if well-controlled on inhaled medications without recent exacerbations'
        });
      }

      if (lowerCondition.includes('kidney') || lowerCondition.includes('renal')) {
        findings.push({
          category: 'Kidney Disease',
          concern: 'Renal condition',
          mfmView: 'MFM will evaluate kidney function (creatinine, GFR), proteinuria, and etiology. Chronic kidney disease significantly increases pregnancy risks including preeclampsia, preterm delivery, and worsening renal function.',
          severity: 'high',
          approvability: 'Kidney disease: Generally declined unless very mild (CKD stage 1-2) with normal kidney function and no proteinuria. Nephrology clearance required.'
        });
        requiresReview = true;
        mfmReviewLevel = MFM_REVIEW_LEVELS.REQUIRED;
      }
    });
  }

  // Previous pregnancy complications
  if (candidateData.pregnancyHistory?.numberOfComplications > 0) {
    // Build condition-specific recurrence risk text
    const conditions = candidateData.medicalConditions || [];
    let recurrenceText = 'MFM will require detailed obstetric history: type of complications, severity, gestational age, maternal/fetal outcomes. Recurrence risk assessment crucial.';

    const recurrenceRisks = [];
    if (conditions.includes('preeclampsia')) {
      recurrenceRisks.push('prior preeclampsia has 15-25% recurrence');
    }
    if (conditions.includes('hyperemesis')) {
      recurrenceRisks.push('hyperemesis gravidarum has 15-80% recurrence rate');
    }
    if (conditions.includes('gastroparesis')) {
      recurrenceRisks.push('gastroparesis often recurs/worsens in pregnancy');
    }
    if (conditions.includes('gestational_diabetes')) {
      recurrenceRisks.push('gestational diabetes has 30-70% recurrence');
    }
    if (conditions.includes('gerd')) {
      recurrenceRisks.push('GERD typically recurs in pregnancy');
    }

    if (recurrenceRisks.length > 0) {
      recurrenceText += ' ' + recurrenceRisks.join('; ') + '.';
    }

    // Build condition-specific approvability text
    let approvabilityText = 'Approvability depends on type and severity of complications. ';

    const severeConditions = [];
    if (conditions.includes('preeclampsia')) {
      severeConditions.push('preeclampsia');
    }
    if (conditions.includes('hyperemesis')) {
      severeConditions.push('severe hyperemesis requiring hospitalization/TPN');
    }
    if (conditions.includes('gastroparesis')) {
      severeConditions.push('gastroparesis');
    }

    if (severeConditions.length > 0) {
      approvabilityText += severeConditions.join(', ') + ' - require extensive evaluation and often declined for surrogacy due to high recurrence risk and maternal health concerns.';
    } else {
      approvabilityText += 'Mild complications may be approved with proper evaluation. Severe complications (eclampsia, HELLP, placental abruption, stillbirth) typically declined.';
    }

    findings.push({
      category: 'Previous Pregnancy Complications',
      concern: 'History of pregnancy complications',
      mfmView: recurrenceText,
      severity: 'moderate',
      approvability: approvabilityText
    });
    requiresReview = true;
    if (mfmReviewLevel === MFM_REVIEW_LEVELS.NOT_REQUIRED) {
      mfmReviewLevel = MFM_REVIEW_LEVELS.STRONGLY_RECOMMENDED;
    }
  }

  // Combinations of risk factors
  const riskFactorCount = findings.filter(f => f.severity === 'moderate' || f.severity === 'high').length;
  if (riskFactorCount >= 2) {
    findings.push({
      category: 'Multiple Risk Factors',
      concern: `${riskFactorCount} moderate or high-risk factors identified`,
      mfmView: 'MFM will note that combination of multiple risk factors compounds pregnancy risk. Each additional risk factor increases likelihood of adverse outcome. Will assess cumulative risk.',
      severity: 'high',
      approvability: 'Multiple risk factors: MFM less likely to approve when 2+ significant risk factors present. Each clinic has different threshold for acceptable cumulative risk.'
    });
  }

  // Determine overall MFM likelihood
  const mfmLikelihood = determineMFMLikelihood(findings);

  // Generate MFM consultation recommendation
  const consultationNeeded = requiresReview || mfmReviewLevel !== MFM_REVIEW_LEVELS.NOT_REQUIRED;

  return {
    reviewLevel: mfmReviewLevel,
    consultationNeeded,
    likelihood: mfmLikelihood,
    findings,
    summary: generateMFMSummary(mfmReviewLevel, mfmLikelihood, findings),
    questionsToAsk: generateMFMQuestions(findings),
    documentationNeeded: generateDocumentationNeeds(findings)
  };
}

/**
 * Determine likely MFM decision
 */
function determineMFMLikelihood(findings) {
  if (findings.length === 0) {
    return {
      level: MFM_LIKELIHOOD.LIKELY_APPROVE,
      description: 'No significant risk factors - MFM likely to approve',
      percentage: '90-100%'
    };
  }

  const highSeverity = findings.filter(f => f.severity === 'high').length;
  const moderateSeverity = findings.filter(f => f.severity === 'moderate').length;

  // Check for specific disqualifying factors
  const hasDisqualifying = findings.some(f =>
    f.approvability.toLowerCase().includes('most mfms will not approve') ||
    f.approvability.toLowerCase().includes('generally declined')
  );

  if (hasDisqualifying || highSeverity >= 2) {
    return {
      level: MFM_LIKELIHOOD.LIKELY_DENY,
      description: 'Significant risk factors present - MFM unlikely to approve without major mitigation',
      percentage: '10-30%'
    };
  }

  if (highSeverity === 1) {
    return {
      level: MFM_LIKELIHOOD.UNLIKELY_APPROVE,
      description: 'Concerning risk factor(s) - MFM approval challenging but possible with optimal management',
      percentage: '30-50%'
    };
  }

  if (moderateSeverity >= 2) {
    return {
      level: MFM_LIKELIHOOD.POSSIBLY_APPROVE,
      description: 'Moderate risk factors - MFM may approve with close monitoring plan',
      percentage: '50-70%'
    };
  }

  if (moderateSeverity === 1 || highSeverity === 0) {
    return {
      level: MFM_LIKELIHOOD.LIKELY_APPROVE,
      description: 'Manageable risk factors - MFM likely to approve with appropriate counseling',
      percentage: '70-90%'
    };
  }

  return {
    level: MFM_LIKELIHOOD.LIKELY_APPROVE,
    description: 'Low-risk candidate - MFM approval expected',
    percentage: '85-95%'
  };
}

/**
 * Generate MFM summary
 */
function generateMFMSummary(reviewLevel, likelihood, findings) {
  let summary = '';

  switch (reviewLevel) {
    case MFM_REVIEW_LEVELS.REQUIRED:
      summary = 'MFM consultation suggested before proceeding. ';
      break;
    case MFM_REVIEW_LEVELS.STRONGLY_RECOMMENDED:
      summary = 'MFM consultation suggested due to identified risk factors. ';
      break;
    case MFM_REVIEW_LEVELS.RECOMMENDED:
      summary = 'MFM consultation suggested for case-by-case evaluation. ';
      break;
    case MFM_REVIEW_LEVELS.NOT_REQUIRED:
      summary = 'MFM consultation not necessary for standard cases, but available if needed. ';
      break;
  }

  summary += likelihood.description;

  if (findings.length > 0) {
    const categories = [...new Set(findings.map(f => f.category))];
    summary += ` Key areas of MFM focus: ${categories.join(', ')}.`;
  }

  return summary;
}

/**
 * Generate questions MFM will ask
 */
function generateMFMQuestions(findings) {
  const questions = [
    'Complete obstetric history including complications, gestational ages at delivery, birth weights',
    'Current medications and dosages',
    'Recent vital signs (blood pressure, weight)',
    'Family history of pregnancy complications, diabetes, hypertension',
    'Any hospitalizations or surgeries'
  ];

  findings.forEach(finding => {
    if (finding.category.includes('Cesarean')) {
      questions.push('Operative reports from all cesarean deliveries');
      questions.push('Indications for each cesarean (emergency vs scheduled)');
      questions.push('Any intraoperative complications or difficult surgery');
    }

    if (finding.category.includes('Hypertension')) {
      questions.push('When was hypertension diagnosed and what was the cause?');
      questions.push('Current blood pressure readings (home monitoring log if available)');
      questions.push('Any end-organ effects (kidney, heart, eyes)?');
    }

    if (finding.category.includes('Diabetes')) {
      questions.push('Recent hemoglobin A1c value');
      questions.push('Diet-controlled vs insulin-requiring?');
      questions.push('Any diabetic complications (retinopathy, neuropathy, nephropathy)?');
    }

    if (finding.category.includes('BMI') || finding.category.includes('Obesity')) {
      questions.push('Recent glucose tolerance test or fasting glucose');
      questions.push('Sleep apnea screening/sleep study results');
      questions.push('History of metabolic syndrome components');
    }
  });

  return [...new Set(questions)]; // Remove duplicates
}

/**
 * Generate documentation MFM will need
 */
function generateDocumentationNeeds(findings) {
  const docs = [
    'Complete medical records from previous pregnancies and deliveries',
    'Recent physical examination with vital signs',
    'Current medication list',
    'Recent laboratory work (CBC, metabolic panel, thyroid function)'
  ];

  findings.forEach(finding => {
    if (finding.category.includes('Cesarean')) {
      docs.push('Operative reports from all cesarean deliveries');
      docs.push('Pathology reports if placental abnormalities');
    }

    if (finding.category.includes('Hypertension')) {
      docs.push('Cardiology evaluation and clearance letter');
      docs.push('Recent EKG and echocardiogram if indicated');
      docs.push('Renal function tests (creatinine, urinalysis)');
    }

    if (finding.category.includes('Diabetes')) {
      docs.push('Endocrinology consultation note');
      docs.push('Recent A1c and glucose logs');
      docs.push('Ophthalmology exam (retinal screening)');
      docs.push('Urine microalbumin/creatinine ratio');
    }

    if (finding.category.includes('Thyroid')) {
      docs.push('Recent TSH and Free T4 levels');
      docs.push('Endocrinology note if on treatment');
    }

    if (finding.category.includes('Autoimmune')) {
      docs.push('Rheumatology consultation note');
      docs.push('Antibody panel results (ANA, anti-dsDNA, anti-Ro, anti-La, anticardiolipin)');
      docs.push('Disease activity markers');
    }
  });

  return [...new Set(docs)]; // Remove duplicates
}

/**
 * Get user-friendly description of MFM review level
 */
export function getMFMReviewDescription(level) {
  const descriptions = {
    [MFM_REVIEW_LEVELS.NOT_REQUIRED]: 'Not Necessary (Standard Case)',
    [MFM_REVIEW_LEVELS.RECOMMENDED]: 'Suggested',
    [MFM_REVIEW_LEVELS.STRONGLY_RECOMMENDED]: 'Suggested',
    [MFM_REVIEW_LEVELS.REQUIRED]: 'Suggested'
  };
  return descriptions[level] || 'Unknown';
}

/**
 * Get user-friendly description of MFM likelihood
 */
export function getMFMLikelihoodDescription(likelihood) {
  const descriptions = {
    [MFM_LIKELIHOOD.LIKELY_APPROVE]: 'Likely to Approve',
    [MFM_LIKELIHOOD.POSSIBLY_APPROVE]: 'May Approve with Conditions',
    [MFM_LIKELIHOOD.UNLIKELY_APPROVE]: 'Unlikely to Approve',
    [MFM_LIKELIHOOD.LIKELY_DENY]: 'Likely to Deny'
  };
  return descriptions[likelihood] || 'Unknown';
}
