/**
 * Clinical Narrative Generator
 * Uses Claude API to generate clinical narratives and rationales
 * Following the old Risk Ranger's approach: AI-Assisted, Rule-Guided
 *
 * HIPAA Note: This uses Claude API which requires a BAA for healthcare use.
 * Data sent to Claude should be de-identified or covered under a BAA.
 */

import { getRiskFactorInfo } from '../data/riskFactorDatabase.js';

/**
 * Generate comprehensive clinical narratives for the assessment
 * Returns: {
 *   situationSummary: string,
 *   conditionInteractions: string,
 *   clinicRationales: { strict: string, moderate: string, lenient: string },
 *   summaryOfFindings: string
 * }
 */
export async function generateClinicalNarratives(candidateData, assessmentResults, apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Claude API key is required for narrative generation');
  }

  // Prepare data for Claude
  const candidateName = candidateData.name || 'The candidate';
  const age = candidateData.age || 'Unknown age';
  const bmi = candidateData.bmi || 'Unknown BMI';

  const pregnancyHistory = candidateData.pregnancyHistory || {};
  const numPregnancies = pregnancyHistory.numberOfTermPregnancies || 0;
  const numCesareans = pregnancyHistory.numberOfCesareans || 0;
  const complications = pregnancyHistory.complications || [];

  const medicalConditions = candidateData.medicalConditions || [];
  const surgicalHistory = candidateData.surgicalHistory || [];

  // Get clinic results
  const strictClinic = assessmentResults.clinicTypeAnalysis?.strict;
  const moderateClinic = assessmentResults.clinicTypeAnalysis?.moderate;
  const lenientClinic = assessmentResults.clinicTypeAnalysis?.lenient;

  // Build comprehensive prompt
  const prompt = `You are an experienced Maternal-Fetal Medicine (MFM) specialist reviewing a gestational carrier candidate. Generate clinical narratives following this structure:

**CANDIDATE DATA:**
- Name: ${candidateName}
- Age: ${age}
- BMI: ${bmi}
- Pregnancy History: ${numPregnancies} term pregnancy(ies), ${numCesareans} cesarean(s)
- Pregnancy Complications: ${complications.length > 0 ? complications.join(', ') : 'None reported'}
- Medical Conditions: ${medicalConditions.length > 0 ? medicalConditions.join(', ') : 'None reported'}
- Surgical History: ${surgicalHistory.length > 0 ? surgicalHistory.join(', ') : 'None reported'}

**ASSESSMENT RESULTS:**
- Overall Risk Level: ${assessmentResults.overallRisk || 'Unknown'}
- Strict Clinic (Conservative): ${strictClinic?.acceptanceLevel || 'Unknown'} (Score: ${strictClinic?.totalScore || 0})
  Concerns: ${strictClinic?.concerns?.join('; ') || 'None'}
- Moderate Clinic (Standard): ${moderateClinic?.acceptanceLevel || 'Unknown'} (Score: ${moderateClinic?.totalScore || 0})
  Concerns: ${moderateClinic?.concerns?.join('; ') || 'None'}
- Lenient Clinic (Flexible): ${lenientClinic?.acceptanceLevel || 'Unknown'} (Score: ${lenientClinic?.totalScore || 0})
  Concerns: ${lenientClinic?.concerns?.join('; ') || 'None'}

**INSTRUCTIONS:**
Generate four distinct narrative sections. Write in a professional, clinical tone suitable for medical professionals. Focus on FACTS and CLINICAL REASONING, not recommendations.

1. **Situation Summary** (2-3 sentences):
   Provide a brief overview of the candidate's obstetric and medical history, highlighting key factors.

2. **Summary of Findings** (2-4 sentences):
   Contextualize the findings - what is the overall clinical picture? What patterns emerge from the history?

3. **Condition Interaction & Significance** (2-4 sentences):
   Explain how the candidate's conditions interact with each other and what that means clinically.
   Are there synergistic risks? Do multiple factors compound each other?

4. **Clinic-by-Clinic Rationale**:
   Explain WHY each clinic type would view this candidate differently. What specific factors drive their decision?

   - **Strict/Conservative Clinics** (2-3 sentences): Why would strict programs be concerned or hesitant?
   - **Moderate/Standard Clinics** (2-3 sentences): How would moderate programs balance risks and benefits?
   - **Lenient/Flexible Clinics** (2-3 sentences): What approach would flexible programs take?

**FORMAT YOUR RESPONSE AS JSON:**
{
  "situationSummary": "...",
  "summaryOfFindings": "...",
  "conditionInteractions": "...",
  "clinicRationales": {
    "strict": "...",
    "moderate": "...",
    "lenient": "..."
  }
}

Return ONLY the JSON object, no other text. Use the candidate's actual name (${candidateName}) in the narratives.`;

  try {
    // Call via Netlify Function (solves CORS)
    const response = await fetch('/.netlify/functions/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: apiKey,
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Claude API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Extract JSON from response (in case Claude added any preamble)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Claude response');
    }

    const narratives = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!narratives.situationSummary || !narratives.conditionInteractions || !narratives.clinicRationales) {
      throw new Error('Invalid narrative structure returned from Claude');
    }

    return narratives;
  } catch (error) {
    console.error('Narrative generation error:', error);
    throw new Error(`Failed to generate clinical narratives: ${error.message}`);
  }
}

/**
 * Generate fallback narratives if Claude is not available
 * These are basic, template-based narratives
 */
export function generateFallbackNarratives(candidateData, assessmentResults) {
  const candidateName = candidateData.name || 'The candidate';
  const age = candidateData.age || 'unknown age';
  const pregnancyHistory = candidateData.pregnancyHistory || {};
  const numPregnancies = pregnancyHistory.numberOfTermPregnancies || 0;
  const numCesareans = pregnancyHistory.numberOfCesareans || 0;
  const complications = pregnancyHistory.complications || [];
  const medicalConditions = candidateData.medicalConditions || [];

  const hasComplications = complications.length > 0;
  const hasMedicalConditions = medicalConditions.length > 0;

  // Situation Summary
  let situationSummary = `${candidateName} is ${age} years old with a history of ${numPregnancies} term pregnanc${numPregnancies === 1 ? 'y' : 'ies'}`;
  if (numCesareans > 0) {
    situationSummary += `, including ${numCesareans} cesarean deliver${numCesareans === 1 ? 'y' : 'ies'}`;
  }
  if (hasComplications) {
    situationSummary += `. Previous pregnancy complications include ${complications.slice(0, 3).join(', ')}${complications.length > 3 ? ', and others' : ''}`;
  }
  if (hasMedicalConditions) {
    situationSummary += `. Medical history includes ${medicalConditions.slice(0, 2).join(' and ')}${medicalConditions.length > 2 ? ' among other conditions' : ''}`;
  }
  situationSummary += '.';

  // Summary of Findings
  const riskLevel = assessmentResults.overallRisk || 'MODERATE';
  const riskLevelStr = typeof riskLevel === 'string' ? riskLevel : (riskLevel?.level || 'MODERATE');
  let summaryOfFindings = `Overall, this candidate presents a ${riskLevelStr.toLowerCase()} risk profile for gestational carrier screening. `;
  if (hasComplications && hasMedicalConditions) {
    summaryOfFindings += 'The combination of pregnancy complications and medical conditions requires careful evaluation by the intended parents\' medical team.';
  } else if (hasComplications) {
    summaryOfFindings += 'The history of pregnancy complications warrants thorough review and risk-benefit assessment.';
  } else if (hasMedicalConditions) {
    summaryOfFindings += 'Medical conditions present require evaluation for control and stability during pregnancy.';
  } else {
    summaryOfFindings += 'The candidate has a relatively uncomplicated medical and obstetric history.';
  }

  // Condition Interactions
  let conditionInteractions = '';
  if (hasComplications && hasMedicalConditions) {
    conditionInteractions = `The presence of both pregnancy complications and underlying medical conditions may create synergistic risks. Each factor should be evaluated not in isolation but as part of a comprehensive risk assessment considering their potential interactions.`;
  } else if (hasComplications) {
    conditionInteractions = `The pregnancy complications in this candidate's history indicate specific obstetric risks that may recur in subsequent pregnancies. The severity and management of these complications are key factors in determining eligibility.`;
  } else if (hasMedicalConditions) {
    conditionInteractions = `The medical conditions present require assessment of current control and stability. Well-managed chronic conditions may pose acceptable risk, while poorly controlled conditions increase pregnancy complications.`;
  } else {
    conditionInteractions = `This candidate presents with minimal documented risk factors, though thorough screening and evaluation remain essential to ensure suitability for gestational carrier matching.`;
  }

  // Clinic Rationales
  const strictClinic = assessmentResults.clinicTypeAnalysis?.strict;
  const moderateClinic = assessmentResults.clinicTypeAnalysis?.moderate;
  const lenientClinic = assessmentResults.clinicTypeAnalysis?.lenient;

  const strictRationale = `Strict/conservative programs apply cautious risk thresholds and may be concerned about ${strictClinic?.concerns?.[0] || 'the documented risk factors'}. They typically require nearly perfect medical and obstetric histories to proceed.`;

  const moderateRationale = `Moderate/standard programs balance risk and benefit, likely requiring additional medical records and specialist consultation to evaluate ${moderateClinic?.concerns?.[0] || 'the identified concerns'}. They may proceed with appropriate monitoring protocols.`;

  const lenientRationale = `Lenient/flexible programs take a more individualized approach, considering the overall context and specific circumstances. They may be willing to proceed with enhanced monitoring and clear risk acknowledgment.`;

  return {
    situationSummary,
    summaryOfFindings,
    conditionInteractions,
    clinicRationales: {
      strict: strictRationale,
      moderate: moderateRationale,
      lenient: lenientRationale
    }
  };
}
