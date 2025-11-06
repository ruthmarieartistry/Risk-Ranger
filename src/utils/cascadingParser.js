/**
 * Cascading Medical Parser System
 * Three-layer approach for pregnancy-specific medical record parsing
 *
 * LAYER 1: Enhanced Deterministic Parser (pregnancyMedicalParser.js)
 *   - Fast, free, always runs
 *   - Pregnancy-specific patterns (G3P2, SVD, GDM, PIH, etc.)
 *   - Lab values and vital signs
 *   - High precision for structured medical text
 *
 * LAYER 2: General Text Parser (textParser.js)
 *   - Natural language understanding
 *   - Handles plain English descriptions
 *   - Fills in gaps from Layer 1
 *
 * LAYER 3: Claude AI Parser (claudeParser.js - Optional)
 *   - Context-aware interpretation
 *   - Complex medical record parsing
 *   - Only runs if API key provided
 *   - Most accurate but requires API
 *
 * STRATEGY:
 * 1. Run Layer 1 (pregnancy-specific) to extract medical terminology
 * 2. Run Layer 2 (general) to extract natural language data
 * 3. Merge results with confidence weighting
 * 4. If Claude enabled, use it to fill gaps and validate
 * 5. Return best combined result
 */

import { parsePregnancyMedicalText, mergeParserResults } from './pregnancyMedicalParser.js';
import { parseTextInput } from './textParser.js';
import { parseWithClaude, shouldUseClaude } from './claudeParser.js';

/**
 * Parse medical text using cascading parser system
 * @param {string} text - Medical record text to parse
 * @param {Object} options - Parser options
 * @param {string} options.candidateName - Candidate name for de-identification (optional)
 * @param {Object} options.userProvidedData - User-entered data (age, BMI, etc.)
 * @param {boolean} options.useClaudeParser - Whether to use Claude (default: true)
 * @returns {Promise<Object>} Parsed candidate data with confidence scores
 */
export async function parseMedicalText(text, options = {}) {
  const {
    candidateName = '',
    userProvidedData = {},
    useClaudeParser = true
  } = options;

  console.log('🔬 Starting cascading parser...');

  // LAYER 1: Pregnancy-specific medical parser
  console.log('📋 Layer 1: Running pregnancy-specific medical parser...');
  const startLayer1 = Date.now();
  const pregnancySpecificData = parsePregnancyMedicalText(text);
  const layer1Time = Date.now() - startLayer1;

  console.log(`✓ Layer 1 complete (${layer1Time}ms)`, {
    obsHistory: pregnancySpecificData.obstetricHistory,
    deliveryTypes: pregnancySpecificData.deliveryTypes,
    confidence: pregnancySpecificData.confidence
  });

  // LAYER 2: General text parser
  console.log('📝 Layer 2: Running general text parser...');
  const startLayer2 = Date.now();
  const generalData = parseTextInput(text);
  const layer2Time = Date.now() - startLayer2;

  console.log(`✓ Layer 2 complete (${layer2Time}ms)`);

  // Merge Layer 1 and Layer 2 results
  let mergedData = mergeParserResults(generalData, pregnancySpecificData);

  // Add user-provided data (always trusted)
  if (userProvidedData.age) {
    mergedData.age = parseInt(userProvidedData.age, 10);
  }
  if (userProvidedData.bmi) {
    mergedData.lifestyle = mergedData.lifestyle || {};
    mergedData.lifestyle.bmi = parseFloat(userProvidedData.bmi);
  }

  // LAYER 3: Claude AI parser (optional)
  let claudeData = null;
  let claudeSuccess = false;

  if (useClaudeParser) {
    console.log('🤖 Layer 3: Running Claude AI parser...');
    const startLayer3 = Date.now();

    try {
      claudeData = await parseWithClaude(text, candidateName, userProvidedData);
      claudeSuccess = true;
      const layer3Time = Date.now() - startLayer3;

      console.log(`✓ Layer 3 complete (${layer3Time}ms)`);

      // Merge Claude data with existing data
      // Claude has highest confidence, so it overrides deterministic parsers where present
      mergedData = mergeWithClaudeData(mergedData, claudeData, pregnancySpecificData);

    } catch (error) {
      console.error('⚠️ Layer 3 failed, using Layers 1+2 only:', error.message);
    }
  } else {
    console.log('⏭️ Layer 3 skipped (Claude disabled)');
  }

  // Calculate final confidence score
  const finalConfidence = calculateFinalConfidence(
    pregnancySpecificData,
    generalData,
    claudeSuccess
  );

  console.log('✅ Cascading parser complete', {
    layer1Time: `${layer1Time}ms`,
    layer2Time: `${layer2Time}ms`,
    claudeUsed: claudeSuccess,
    finalConfidence: `${finalConfidence}%`
  });

  return {
    ...mergedData,
    parsingMetadata: {
      layer1Confidence: pregnancySpecificData.confidence,
      claudeUsed: claudeSuccess,
      finalConfidence: finalConfidence,
      processingTime: {
        layer1: layer1Time,
        layer2: layer2Time
      }
    }
  };
}

/**
 * Merge Claude AI data with deterministic parser data
 * Claude data takes priority but deterministic data fills gaps
 */
function mergeWithClaudeData(deterministicData, claudeData, pregnancySpecificData) {
  const merged = { ...deterministicData };

  // Pregnancy history - trust Claude if available, but keep pregnancy-specific details
  if (claudeData.pregnancyHistory) {
    merged.pregnancyHistory = {
      ...merged.pregnancyHistory,
      ...claudeData.pregnancyHistory
    };

    // If pregnancy-specific parser found C-sections, keep that count if Claude missed it
    if (pregnancySpecificData.deliveryTypes.cesarean > 0 &&
        (!merged.pregnancyHistory.numberOfCesareans || merged.pregnancyHistory.numberOfCesareans === 0)) {
      merged.pregnancyHistory.numberOfCesareans = pregnancySpecificData.deliveryTypes.cesarean;
    }
  }

  // Medical conditions - merge both sources
  if (claudeData.medicalConditions) {
    const existingConditions = new Set(merged.medicalConditions || []);
    claudeData.medicalConditions.forEach(condition => existingConditions.add(condition));
    merged.medicalConditions = Array.from(existingConditions);
  }

  // Age - Claude has priority if found
  if (claudeData.age && claudeData.age > 0) {
    merged.age = claudeData.age;
  }

  // BMI and lifestyle - Claude has priority
  if (claudeData.lifestyle) {
    merged.lifestyle = {
      ...merged.lifestyle,
      ...claudeData.lifestyle
    };
  }

  // Psychological - Claude has priority
  if (claudeData.psychological) {
    merged.psychological = {
      ...merged.psychological,
      ...claudeData.psychological
    };
  }

  // Infectious disease tests - merge
  if (claudeData.infectiousDiseaseTests) {
    merged.infectiousDiseaseTests = {
      ...merged.infectiousDiseaseTests,
      ...claudeData.infectiousDiseaseTests
    };
  }

  // Environmental - Claude has priority
  if (claudeData.environmental) {
    merged.environmental = {
      ...merged.environmental,
      ...claudeData.environmental
    };
  }

  return merged;
}

/**
 * Calculate final confidence score based on all parser layers
 */
function calculateFinalConfidence(pregnancySpecificData, generalData, claudeUsed) {
  let confidence = 0;
  let weights = 0;

  // Pregnancy-specific parser confidence (weight: 40%)
  const layer1Weight = 40;
  confidence += (pregnancySpecificData.confidence / 100) * layer1Weight;
  weights += layer1Weight;

  // General parser - estimate confidence (weight: 20%)
  const layer2Weight = 20;
  const generalConfidence = estimateGeneralParserConfidence(generalData);
  confidence += (generalConfidence / 100) * layer2Weight;
  weights += layer2Weight;

  // Claude parser adds confidence (weight: 40% if used)
  if (claudeUsed) {
    const claudeWeight = 40;
    confidence += claudeWeight;  // Claude gets full weight when used
    weights += claudeWeight;
  }

  return Math.round((confidence / weights) * 100);
}

/**
 * Estimate confidence for general parser results
 */
function estimateGeneralParserConfidence(data) {
  let confidence = 0;
  let maxScore = 100;

  // Age found (20 points)
  if (data.age) confidence += 20;

  // Pregnancy history found (30 points)
  if (data.pregnancyHistory?.hasCompletedPregnancy) confidence += 30;

  // Medical conditions found (20 points)
  if (data.medicalConditions && data.medicalConditions.length > 0) {
    confidence += Math.min(20, data.medicalConditions.length * 5);
  }

  // Lifestyle data found (15 points)
  if (data.lifestyle?.bmi) confidence += 15;

  // Environmental data found (15 points)
  if (data.environmental) confidence += 15;

  return Math.min(100, confidence);
}

/**
 * Quick test function to compare all parser layers
 */
export function testParsers(text) {
  console.log('=== Testing All Parser Layers ===\n');

  // Layer 1
  console.log('LAYER 1: Pregnancy-Specific Parser');
  const layer1 = parsePregnancyMedicalText(text);
  console.log(JSON.stringify(layer1, null, 2));

  // Layer 2
  console.log('\nLAYER 2: General Text Parser');
  const layer2 = parseTextInput(text);
  console.log(JSON.stringify(layer2, null, 2));

  // Merged
  console.log('\nMERGED RESULT:');
  const merged = mergeParserResults(layer2, layer1);
  console.log(JSON.stringify(merged, null, 2));

  return { layer1, layer2, merged };
}
