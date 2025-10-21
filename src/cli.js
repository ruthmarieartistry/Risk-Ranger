#!/usr/bin/env node

/**
 * CLI version of Surrogacy Risk Assessment Tool
 * For command-line usage
 */

import { parseTextInput } from './textParser.js';
import { performComprehensiveAssessment, RISK_LEVELS } from './riskAssessment.js';
import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printBanner() {
  console.log('\n' + '='.repeat(70));
  console.log('    SURROGACY RISK ASSESSMENT TOOL');
  console.log('    Based on ASRM 2022 Guidelines');
  console.log('='.repeat(70));
  console.log('\n⚠️  MEDICAL DISCLAIMER:');
  console.log('This tool is for informational purposes only and does NOT');
  console.log('constitute medical advice. Consult qualified medical professionals.');
  console.log('='.repeat(70) + '\n');
}

function printRiskColor(riskLevel) {
  const colors = {
    [RISK_LEVELS.ELIGIBLE]: '\x1b[32m', // green
    [RISK_LEVELS.REQUIRES_COUNSELING]: '\x1b[33m', // yellow
    [RISK_LEVELS.HIGH_RISK]: '\x1b[31m', // red
    [RISK_LEVELS.DISQUALIFIED]: '\x1b[41m\x1b[37m', // white on red background
  };
  return colors[riskLevel] || '\x1b[37m';
}

function resetColor() {
  return '\x1b[0m';
}

function printResults(results) {
  console.log('\n' + '='.repeat(70));
  console.log('OVERALL ASSESSMENT');
  console.log('='.repeat(70));

  const riskColor = printRiskColor(results.overallRisk.level);
  console.log(`\nRisk Level: ${riskColor}${results.overallRisk.level}${resetColor()}`);
  console.log(`Description: ${results.overallRisk.description}\n`);

  console.log('='.repeat(70));
  console.log('RECOMMENDATIONS');
  console.log('='.repeat(70));
  results.recommendations.forEach((rec, idx) => {
    console.log(`${idx + 1}. ${rec}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log('DETAILED ASSESSMENT BY CATEGORY');
  console.log('='.repeat(70));

  Object.entries(results.summary.categorySummaries).forEach(([category, assessments]) => {
    console.log(`\n${category}:`);
    console.log('-'.repeat(70));

    assessments.forEach((assessment) => {
      const statusColor = printRiskColor(assessment.status);
      console.log(`\n  Status: ${statusColor}${assessment.status}${resetColor()}`);
      console.log(`  Message: ${assessment.message}`);
      console.log(`  Guideline: ${assessment.guideline}`);
    });
  });

  console.log('\n' + '='.repeat(70));
  console.log('NEXT STEPS');
  console.log('='.repeat(70));
  console.log('1. Share results with qualified reproductive endocrinologist');
  console.log('2. Schedule comprehensive medical evaluation');
  console.log('3. Arrange psychological evaluation');
  console.log('4. Consult with independent legal counsel');
  console.log('5. Complete all required screenings\n');
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function runTextMode() {
  console.log('\nTEXT INPUT MODE');
  console.log('Describe the surrogate candidate (or type "example" for sample):');
  console.log('(Type END on a new line when finished)\n');

  const lines = [];

  const readLine = () => {
    return new Promise(resolve => {
      rl.question('', (line) => {
        if (line.trim().toUpperCase() === 'END') {
          resolve(null);
        } else if (line.trim().toLowerCase() === 'example') {
          resolve('EXAMPLE');
        } else {
          lines.push(line);
          resolve(readLine());
        }
      });
    });
  };

  const result = await readLine();

  let textInput;
  if (result === 'EXAMPLE') {
    textInput = `Sarah is a 28-year-old woman interested in becoming a gestational carrier. She has had 2 previous uncomplicated pregnancies, both vaginal deliveries. She's 5'6" and weighs 145 lbs. She's a non-smoker and doesn't use drugs. She's married with a supportive husband and has a stable job as a teacher. She completed her STI screening and all tests came back negative. She has no significant medical history and is generally healthy.`;
    console.log('\nUsing example candidate...\n');
  } else {
    textInput = lines.join(' ');
  }

  if (!textInput || textInput.trim() === '') {
    console.log('No input provided. Exiting.');
    rl.close();
    return;
  }

  console.log('\nAnalyzing candidate...\n');

  try {
    const candidateData = parseTextInput(textInput);
    const assessment = performComprehensiveAssessment(candidateData);
    printResults(assessment);
  } catch (error) {
    console.error('\nError during analysis:', error.message);
  }

  rl.close();
}

async function runJSONMode() {
  console.log('\nJSON INPUT MODE');
  const filePath = await question('Enter path to JSON file (or press Enter to paste JSON): ');

  let jsonInput;

  if (filePath.trim()) {
    try {
      jsonInput = fs.readFileSync(filePath.trim(), 'utf8');
    } catch (error) {
      console.error('Error reading file:', error.message);
      rl.close();
      return;
    }
  } else {
    console.log('Paste JSON data (type END on a new line when finished):\n');
    const lines = [];

    const readLine = () => {
      return new Promise(resolve => {
        rl.question('', (line) => {
          if (line.trim().toUpperCase() === 'END') {
            resolve(null);
          } else {
            lines.push(line);
            resolve(readLine());
          }
        });
      });
    };

    await readLine();
    jsonInput = lines.join('\n');
  }

  console.log('\nAnalyzing candidate...\n');

  try {
    const candidateData = JSON.parse(jsonInput);
    const assessment = performComprehensiveAssessment(candidateData);
    printResults(assessment);
  } catch (error) {
    console.error('\nError during analysis:', error.message);
  }

  rl.close();
}

async function main() {
  printBanner();

  const mode = await question('Select input mode:\n1. Text description\n2. JSON data\n\nEnter 1 or 2: ');

  if (mode.trim() === '1') {
    await runTextMode();
  } else if (mode.trim() === '2') {
    await runJSONMode();
  } else {
    console.log('Invalid selection. Exiting.');
    rl.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  rl.close();
  process.exit(1);
});
