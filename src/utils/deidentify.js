/**
 * HIPAA De-identification Utilities
 *
 * This module handles de-identification of PHI before sending to Claude API
 * and re-identification for display purposes.
 *
 * HIPAA Safe Harbor Method: Removes 18 types of identifiers.
 * For medical records, we primarily need to remove names.
 */

/**
 * De-identify medical record text before sending to Claude
 * Replaces patient name with generic placeholder and removes specific dates
 *
 * @param {string} text - Medical record text
 * @param {string} patientName - Patient's real name to remove
 * @returns {string} - De-identified text
 */
export function deidentifyText(text, patientName) {
  let deidentified = text;

  // Remove specific dates, keep only years (HIPAA Safe Harbor requirement)
  // Pattern 1: MM/DD/YYYY or MM-DD-YYYY -> keep just YYYY
  deidentified = deidentified.replace(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g, '$3');

  // Pattern 2: Month DD, YYYY -> keep just YYYY
  deidentified = deidentified.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},?\s+(\d{4})\b/gi, '$2');

  // Pattern 3: DD Month YYYY -> keep just YYYY
  deidentified = deidentified.replace(/\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{4})\b/gi, '$2');

  if (!patientName || patientName.trim() === '') {
    return deidentified;
  }

  // Replace patient name variations (case-insensitive)
  const namePattern = new RegExp(patientName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  deidentified = deidentified.replace(namePattern, 'PATIENT_A');

  // Also replace first name only and last name only
  const nameParts = patientName.split(/\s+/);
  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    // Replace first name (with word boundaries to avoid partial matches)
    const firstNamePattern = new RegExp('\\b' + firstName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    deidentified = deidentified.replace(firstNamePattern, 'PATIENT_A');

    // Replace last name (with word boundaries)
    const lastNamePattern = new RegExp('\\b' + lastName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    deidentified = deidentified.replace(lastNamePattern, 'PATIENT_A');
  }

  return deidentified;
}

/**
 * Re-identify text for display purposes
 * Replaces generic placeholder with patient's actual name
 *
 * @param {string} text - De-identified text from Claude
 * @param {string} patientName - Patient's real name to restore
 * @returns {string} - Re-identified text
 */
export function reidentifyText(text, patientName) {
  if (!patientName || patientName.trim() === '') {
    return text.replace(/PATIENT_A/g, 'The candidate');
  }

  // Replace placeholder with actual name
  return text.replace(/PATIENT_A/g, patientName);
}

/**
 * De-identify candidate data object before sending to Claude
 *
 * @param {Object} candidateData - Candidate data object
 * @param {string} patientName - Patient's real name
 * @returns {Object} - De-identified data
 */
export function deidentifyCandidateData(candidateData, patientName) {
  // Clone the object to avoid mutating the original
  const deidentified = JSON.parse(JSON.stringify(candidateData));

  // Replace name with placeholder
  if (deidentified.name) {
    deidentified.name = 'PATIENT_A';
  }

  return deidentified;
}

/**
 * Re-identify narrative text (for display)
 *
 * @param {Object} narratives - Narratives object from Claude
 * @param {string} patientName - Patient's real name
 * @returns {Object} - Re-identified narratives
 */
export function reidentifyNarratives(narratives, patientName) {
  const displayName = patientName || 'The candidate';

  return {
    situationSummary: reidentifyText(narratives.situationSummary, displayName),
    summaryOfFindings: reidentifyText(narratives.summaryOfFindings, displayName),
    conditionInteractions: reidentifyText(narratives.conditionInteractions, displayName),
    clinicRationales: {
      strict: reidentifyText(narratives.clinicRationales.strict, displayName),
      moderate: reidentifyText(narratives.clinicRationales.moderate, displayName),
      lenient: reidentifyText(narratives.clinicRationales.lenient, displayName)
    }
  };
}
