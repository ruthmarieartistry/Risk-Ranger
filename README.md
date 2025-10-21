# Surrogacy Risk Assessment Application

A comprehensive medical risk assessment tool for evaluating gestational carrier (surrogate) candidates based on ASRM (American Society for Reproductive Medicine) 2022 guidelines.

## Overview

This application analyzes risk factors for surrogacy candidacy, which differ from standard pregnancy considerations. It provides realistic acceptance odds across different clinic types and detailed MFM (Maternal-Fetal Medicine) specialist perspectives.

## Key Features

### 1. **Dual Input Modes**
- **Natural Language**: Describe candidates in plain English
- **Structured JSON**: Paste medical record data

### 2. **Clinic Type Acceptance Odds** 🎯
Evaluates acceptance probability (0-100%) for three clinic types:

- **Strict/Premium Clinics**: Rigid standards, minimal exceptions
  - BMI < 30 (some < 27)
  - Max 1-2 C-sections
  - Age ideally < 35

- **Moderate/Average Clinics**: ASRM guidelines with SOME case-by-case review
  - BMI 30-32
  - Up to 3 C-sections
  - Age 21-43 (some to 45)
  - Controlled conditions acceptable

- **Lenient Clinics**: ALL operate on case-by-case basis
  - BMI up to 32-35
  - Age up to 45 (some to 48)
  - Common sense review approach
  - Evaluates overall health picture even outside ASRM guidelines

### 3. **MFM (Maternal-Fetal Medicine) Review** 🏥
- Determines if MFM consultation is needed
- Predicts likely MFM decision with percentage odds
- Explains exactly what the MFM will say about each risk factor
- Lists questions MFM will ask
- Specifies documentation needed for review

**MFM Review Levels:**
- Not Required
- Recommended
- Strongly Recommended
- Required Before Proceeding

**MFM Decision Likelihood:**
- Likely to Approve (70-100%)
- May Approve with Conditions (50-70%)
- Unlikely to Approve (30-50%)
- Likely to Deny (0-30%)

### 4. **Comprehensive ASRM Assessment**
- Age requirements (21-45 ASRM guidelines)
- Pregnancy history evaluation
- Medical conditions screening
- Infectious disease testing (HIV, Hepatitis, STIs)
- Psychological evaluation criteria
- Lifestyle factors (BMI, smoking, substance use)
- Environmental stability

### 5. **Smart Natural Language Parser**
Automatically extracts:
- Age, height, weight, BMI
- Pregnancy history and complications
- Medical conditions
- Medications and substance use
- Relationship status and support system
- Shows confidence levels and missing information

## Installation

```bash
cd surrogacy-risk-assessment
npm install
```

## Usage

### Web Interface
```bash
npm run dev
# Opens at http://localhost:5174/
```

### Command Line
```bash
npm run cli
```

## Example Scenarios

### Ideal Candidate
**Input:** "Sarah, 28 years old, 2 previous healthy pregnancies, vaginal deliveries, BMI 24, non-smoker, married with supportive partner, all STI tests negative"

**Results:**
- Strict Clinics: 95% (Highly Likely)
- Moderate Clinics: 100% (Highly Likely)
- Lenient Clinics: 100% (Highly Likely)
- MFM Review: Not Required

### Borderline Candidate (Age)
**Input:** "Maria, 42 years old, 3 previous pregnancies (2 vaginal, 1 C-section), BMI 28, no complications, healthy, supportive family"

**Results:**
- Strict Clinics: 45% (Possible)
- Moderate Clinics: 75% (Likely) - "Most moderate clinics will consider case-by-case with MFM evaluation"
- Lenient Clinics: 85% (Highly Likely)
- MFM Review: Recommended - "MFM will assess for age-related risk factors. Age 40-42 generally approvable with clean medical history."

### High-Risk Candidate (Multiple C-sections)
**Input:** "Jennifer, 35 years old, 4 children including 3 C-sections, BMI 26, otherwise healthy"

**Results:**
- Strict Clinics: 0% (Very Unlikely) - Disqualifying
- Moderate Clinics: 20% (Unlikely) - Exceeds ASRM maximum
- Lenient Clinics: 35% (Unlikely) - "May consider case-by-case but challenging"
- MFM Review: REQUIRED - "MFM VERY concerned about placenta accreta/percreta risk (up to 40% with 3+ C-sections), uterine rupture risk, massive hemorrhage. Most MFMs will recommend against."

### Complex Case (Gestational Diabetes History)
**Input:** "Lisa, 33, 2 pregnancies, one with diet-controlled gestational diabetes, BMI 31, no other issues"

**Results:**
- Strict Clinics: 25% (Unlikely) - "History of GDM typically disqualifying at strict clinics"
- Moderate Clinics: 70% (Likely) - "GDM requires evaluation and proof of diet control"
- Lenient Clinics: 85% (Highly Likely) - "GDM history acceptable if controlled by diet"
- MFM Review: REQUIRED - "30-84% recurrence risk. May approve if diet-controlled only, not insulin-requiring."

## Important Notes

### Case-by-Case Review
**Moderate and lenient clinics DO NOT automatically reject** candidates outside ASRM guidelines. Scores below 100% mean:
- The clinic will review the complete health picture
- MFM clearance may be required
- Overall health matters more than single factors
- Common sense approach, not rigid rules

### MFM Perspective is Critical
The app provides detailed MFM specialist perspectives because:
- Many borderline candidates need MFM clearance
- MFM opinions heavily influence clinic decisions
- Understanding MFM concerns helps candidates prepare
- Shows what documentation will be needed

## Medical Disclaimer

**IMPORTANT:** This tool is for informational and educational purposes only. It does NOT constitute medical advice, diagnosis, or treatment recommendations. All surrogacy decisions must be made in consultation with:
- Qualified reproductive endocrinologists
- Maternal-Fetal Medicine (MFM) specialists
- Mental health professionals specializing in reproductive medicine
- Independent legal counsel

## Technology Stack

- React 18
- Vite
- Vanilla CSS
- ASRM 2022 Guidelines
- Pattern-based natural language processing

## File Structure

```
surrogacy-risk-assessment/
├── src/
│   ├── App.jsx                      # Main UI component
│   ├── App.css                      # Styling
│   ├── riskAssessment.js            # Core ASRM assessment engine
│   ├── clinicTypeAssessment.js      # Clinic odds calculator
│   ├── mfmAssessment.js             # MFM review predictor
│   ├── textParser.js                # Natural language parser
│   ├── cli.js                       # Command-line version
│   └── main.jsx                     # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## References

- [ASRM Committee Opinion: Recommendations for practices using gestational carriers (2022)](https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/)
- Based on FDA, CDC, and AATB requirements for tissue donation
- Incorporates clinical MFM practice standards

## License

MIT

---

**Note:** This tool is not affiliated with or endorsed by ASRM. For official guidelines, visit [www.asrm.org](https://www.asrm.org)
