# Risk Ranger
## User & Technical Manual

---

**Product:** Risk Ranger - Surrogacy Risk Assessment Tool
**Version:** 2.0
**Last Updated:** October 21, 2025
**Live Application:** https://risk-ranger.pages.dev/
**GitHub Repository:** https://github.com/ruthmarieartistry/Risk-Ranger

**Developed for:** Alcea Surrogacy
**Developer:** Ruth Ellis
**Copyright:** © 2025 Ruth Marie Ellis

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Getting Started](#getting-started)
5. [Making Updates](#making-updates)
6. [Deployment Guide](#deployment-guide)
7. [Medical Parsing System](#medical-parsing-system)
8. [Configuration](#configuration)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance Tasks](#maintenance-tasks)
11. [Reference](#reference)

---

## Overview

### What Is Risk Ranger?

Risk Ranger is a sophisticated medical risk assessment tool designed to evaluate surrogacy candidate eligibility. The application analyzes pregnancy history, medical conditions, BMI, age, and other health factors to estimate acceptance likelihood at different types of fertility clinics (strict, moderate, lenient).

### Key Features

- **Medical Record Parsing** - Upload or paste medical records for automatic extraction
- **400+ Medical Terms** - Comprehensive medical glossary with pregnancy-specific terminology
- **Multi-Layered Text Analysis** - Three-tier parsing system (regex → glossary → AI)
- **Risk Scoring Algorithm** - Deterministic scoring based on ASRM 2022 guidelines
- **PDF Report Generation** - Downloadable assessment reports
- **Clinic Type Differentiation** - Separate scores for strict, moderate, and lenient clinics

### Use Cases

- Pre-screening surrogacy candidates
- Evaluating edge cases with complex medical histories
- Providing transparency to candidates about acceptance likelihood
- Identifying potential disqualifying factors early in the process

---

## Technology Stack

### Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI component library |
| **Vite** | 5.4.20 | Development server & build tool |
| **JavaScript** | ES6+ | Primary programming language |

### Hosting & Deployment

| Service | Purpose | Cost |
|---------|---------|------|
| **Cloudflare Pages** | Static hosting | Free (unlimited bandwidth) |
| **GitHub** | Version control & automatic deployment | Free |
| **Anthropic Claude** | Optional AI medical text parsing | Pay-per-use (optional) |

### Why These Technologies?

- **React** - Industry-standard, component-based architecture
- **Vite** - Fast development experience, optimized production builds
- **Cloudflare Pages** - Unlimited bandwidth, global CDN, automatic HTTPS
- **No database needed** - All logic is client-side, no backend required
- **Static files only** - Fast, secure, easy to maintain

---

## Project Architecture

### Directory Structure

```
surrogacy-risk-assessment/
│
├── public/                          # Static assets (images, fonts)
│   ├── riskrangerlogo.png          # Main application logo (93KB)
│   └── carry-calc-logo.png         # Legacy logo (backup)
│
├── src/                             # Application source code
│   │
│   ├── components/                  # React components
│   │   └── App.jsx                 # Main application (1,324 lines)
│   │                               # Contains all UI, modals, forms
│   │
│   ├── utils/                       # Business logic & utilities
│   │   ├── textParser.js           # Primary text parser (regex-based)
│   │   ├── pregnancyMedicalParser.js # Pregnancy-specific parsing
│   │   ├── medicalGlossary.js      # Medical terminology database
│   │   ├── riskCalculator.js       # Scoring algorithm
│   │   ├── pdfGenerator.js         # PDF report generation
│   │   └── aiParser.js             # Optional AI-based parser
│   │
│   ├── styles/
│   │   └── App.css                 # Application styles
│   │
│   └── main.jsx                    # React application entry point
│
├── package.json                     # Dependencies & npm scripts
├── vite.config.js                  # Vite configuration
├── .gitignore                      # Files excluded from git
└── README.md                       # Project overview
```

### Key Files Explained

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/App.jsx` | 1,324 | Main application UI, all components, modals |
| `src/utils/textParser.js` | 300+ | Primary medical text parser using regex |
| `src/utils/pregnancyMedicalParser.js` | 200+ | Pregnancy notation parser (G3P2, etc.) |
| `src/utils/medicalGlossary.js` | 500+ | Medical terms and synonyms dictionary |
| `src/utils/riskCalculator.js` | 400+ | Scoring algorithm, ASRM guidelines |
| `src/utils/pdfGenerator.js` | 300+ | PDF report generation logic |
| `src/utils/aiParser.js` | 150+ | Optional AI parsing integration |

---

## Getting Started

### Prerequisites

Before working on Risk Ranger, ensure you have:

- **Node.js** version 18 or higher
- **npm** (included with Node.js)
- **Git** for version control
- **Code editor** (VS Code recommended)
- **Terminal/Command Line** access

### Initial Setup

#### 1. Navigate to Project Directory

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
```

#### 2. Install Dependencies

```bash
npm install
```

This downloads all required packages listed in `package.json`. Only needed once or when dependencies change.

#### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or next available port).

#### 4. View in Browser

Open your browser and navigate to the local URL shown in the terminal. Changes to code will automatically reload.

#### 5. Stop Development Server

Press `Ctrl+C` in the terminal.

### Project Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production (Cloudflare does this automatically) |
| `npm run preview` | Preview production build locally |

---

## Making Updates

### Updating Visual Content

#### Change Application Logo

**File:** `public/riskrangerlogo.png`

**Steps:**
1. Replace the file with your new logo (keep same filename)
2. **OR** use a different filename and update reference:
   - Open `src/components/App.jsx`
   - Find line 79: `<img src="/riskrangerlogo.png" ...`
   - Change filename to match your new logo

**Recommended specs:**
- Format: PNG with transparency
- Size: ~100KB or less
- Dimensions: 200-400px wide

#### Update Color Scheme

**File:** `src/components/App.jsx`

**Current colors (lines 39-43):**
```javascript
const rubyRed = '#7d2431';        // Headers, primary buttons
const darkGreen = '#217045';      // Secondary elements
const mustardYellow = '#e1b321';  // Accent color, badges
const goldBrown = '#a5630b';      // "How To Use" button
const darkTeal = '#005567';       // Form labels, headings
```

**To change:**
1. Search for these variable names in `App.jsx`
2. Update the hex color values
3. Save and test locally
4. Commit and push to deploy

#### Update Methodology Text

**File:** `src/components/App.jsx`
**Section:** Method & Reliability modal (lines 1250-1320)

Contains:
- Assessment Methodology explanation
- Text Parsing system description
- MFM Assessment for Surrogacy details
- Data Sources list
- Limitations

Edit the text directly in the React code, within the modal sections.

### Updating Medical Logic

#### Add New Medical Condition

**Step 1:** Add to Medical Glossary

**File:** `src/utils/medicalGlossary.js`

```javascript
export const CONDITION_SYNONYMS = {
  // ... existing conditions ...

  "new_condition_name": [
    "primary term",
    "synonym 1",
    "synonym 2",
    "abbreviation"
  ]
};
```

**Step 2:** Add Parsing Pattern

**File:** `src/utils/textParser.js`

```javascript
// Add detection logic
const hasNewCondition = text.toLowerCase().includes('keyword');
if (hasNewCondition) {
  conditions.push('new_condition_name');
}
```

**Step 3:** Add Scoring Rule

**File:** `src/utils/riskCalculator.js`

```javascript
// Add to scoring logic
if (conditions.includes('new_condition_name')) {
  score += penaltyPoints;  // Adjust penalty as needed
  reasons.push('New Condition detected');
}
```

**Step 4:** Test and Deploy

1. Test locally with `npm run dev`
2. Enter test data with the new condition
3. Verify detection and scoring
4. Commit and push changes

#### Modify Risk Thresholds

**File:** `src/utils/riskCalculator.js`

**Find threshold logic:**
```javascript
// Strict clinic example
if (score < 10) {
  return { status: 'accept', ... };
} else if (score < 30) {
  return { status: 'review', ... };
} else {
  return { status: 'decline', ... };
}
```

**Adjust numbers** to change acceptance criteria.

### Updating Content Text

#### Update Copyright Year

**Search for:** `© 2025`
**Files:** `src/components/App.jsx`
**Replace with:** Current year

#### Update Footer Text

**File:** `src/components/App.jsx`
**Search for:** "Made for Alcea Surrogacy"
**Line:** Near bottom of file

---

## Deployment Guide

### How Deployment Works

Risk Ranger uses **automatic deployment** via GitHub and Cloudflare Pages:

```
1. Make code changes locally
2. Test with npm run dev
3. Commit to git
4. Push to GitHub
5. Cloudflare detects push
6. Cloudflare builds project (npm run build)
7. Cloudflare deploys to https://risk-ranger.pages.dev/
```

**Deployment time:** 1-3 minutes after push

### Step-by-Step Deployment

#### 1. Make Changes

Edit files locally using your code editor.

#### 2. Test Locally

```bash
npm run dev
```

Open browser, verify changes work correctly.

#### 3. Commit Changes

```bash
git add .
git commit -m "Brief description of what you changed"
```

**Good commit messages:**
- "Update logo to new Risk Ranger branding"
- "Add gestational diabetes to medical glossary"
- "Adjust strict clinic acceptance threshold"

**Bad commit messages:**
- "changes"
- "updates"
- "fix"

#### 4. Push to GitHub

```bash
git push
```

#### 5. Verify Deployment

**Check GitHub:**
- Go to https://github.com/ruthmarieartistry/Risk-Ranger/commits/main
- Verify your commit appears

**Check Cloudflare:**
- Go to https://dash.cloudflare.com/
- Navigate to Workers & Pages → risk-ranger → Deployments
- Watch for new deployment (takes 1-3 minutes)
- Green checkmark = successful deployment
- Red X = failed deployment (click for error logs)

**Check Live Site:**
- Visit https://risk-ranger.pages.dev/
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Verify your changes appear

### Manual Deployment

If automatic deployment fails or you need to redeploy:

1. Go to https://dash.cloudflare.com/
2. Click **Workers & Pages**
3. Click **risk-ranger** project
4. Click **Deployments** tab
5. Click **Create deployment** button
6. Select branch: **main**
7. Click **Deploy**

---

## Medical Parsing System

### Three-Tier Architecture

Risk Ranger uses a sophisticated cascading system to extract medical information:

```
┌─────────────────────────────────────┐
│  User Input (text or uploaded file) │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  TIER 1: Regex Pattern Recognition  │
│  • Fast, deterministic               │
│  • Handles ~90% of cases             │
│  • Structured patterns (G3P2, C/S)   │
└──────────────┬──────────────────────┘
               │ If unsuccessful
               ▼
┌─────────────────────────────────────┐
│  TIER 2: Medical Glossary Mapping   │
│  • 400+ medical terms                │
│  • Natural language matching         │
│  • Synonym recognition               │
└──────────────┬──────────────────────┘
               │ If unsuccessful
               ▼
┌─────────────────────────────────────┐
│  TIER 3: AI Parser (Optional)       │
│  • Claude API integration            │
│  • Complex narrative records         │
│  • Contextual understanding          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Deterministic Scoring Algorithm    │
│  • 100% rule-based                   │
│  • No AI in decision-making          │
│  • ASRM 2022 guidelines              │
└─────────────────────────────────────┘
```

### Tier 1: Regex Pattern Recognition

**File:** `src/utils/textParser.js` and `src/utils/pregnancyMedicalParser.js`

**Purpose:** Fast, reliable extraction of structured medical notation

**Examples:**
- `G3P2` → 3 pregnancies, 2 deliveries
- `C/S` → Cesarean section
- `VBAC` → Vaginal birth after cesarean
- `GDM` → Gestational diabetes mellitus
- `HELLP` → HELLP syndrome

**How it works:**
- Custom-built regular expressions
- Pattern matching for medical abbreviations
- Pregnancy history notation parsing
- Fast, no external dependencies

### Tier 2: Medical Glossary

**File:** `src/utils/medicalGlossary.js`

**Purpose:** Map natural language to standardized medical terms

**Structure:**
```javascript
{
  "condition_name": [
    "primary term",
    "synonym 1",
    "synonym 2",
    "common abbreviation"
  ]
}
```

**Example:**
```javascript
"hypertension": [
  "high blood pressure",
  "elevated blood pressure",
  "HTN",
  "hypertensive"
]
```

**Contains:**
- 400+ medical terms
- Pregnancy complications
- Chronic conditions
- Autoimmune diseases
- Mental health conditions

### Tier 3: AI Parser (Optional)

**File:** `src/utils/aiParser.js`

**Purpose:** Extract conditions from complex narrative medical records

**When to use:**
- Discharge summaries
- Clinical notes
- Unstructured medical records
- Complex multi-condition descriptions

**How it works:**
1. User enables "AI Parser" toggle
2. Text sent to Anthropic Claude API
3. AI extracts medical conditions using medical domain knowledge
4. AI groups related symptoms (e.g., "hyperemesis + hospitalization + TPN" = severe hyperemesis)
5. Returns structured data to scoring engine

**Important:**
- **AI only extracts data** - does not make decisions
- **Scoring is 100% deterministic** - rule-based, no AI bias
- **Optional** - works without AI for most records
- **Requires API key** - see Configuration section

### Scoring Engine

**File:** `src/utils/riskCalculator.js`

**Purpose:** Calculate acceptance likelihood based on extracted conditions

**Based on:**
- ASRM 2022 Guidelines for Gestational Carriers
- Real clinic standards (SDFC and industry norms)
- MFM (Maternal-Fetal Medicine) evaluation criteria

**Clinic Types:**
- **Strict:** Rigid ASRM adherence, minimal flexibility
- **Moderate:** Some case-by-case review, reasonable exceptions
- **Lenient:** Common-sense approach, willing to work with candidates

**Factors evaluated:**
- Age (21-42 ideal range)
- BMI (18-32 ideal range)
- Pregnancy history (minimum 1 successful pregnancy)
- Medical conditions (weighted by severity)
- Combination of risk factors (exponential penalties)

---

## Configuration

### Environment Variables

**Stored in:** Cloudflare Pages Dashboard (NOT in code)

| Variable | Purpose | Required |
|----------|---------|----------|
| `ANTHROPIC_API_KEY` | Claude API for AI text parsing | Optional |

### Setting Environment Variables

**For Local Development:**

Create file: `.env.local` (in project root)

```
ANTHROPIC_API_KEY=your_api_key_here
```

**For Production (Cloudflare Pages):**

1. Go to https://dash.cloudflare.com/
2. Navigate to Workers & Pages → risk-ranger
3. Click **Settings** → **Environment Variables**
4. Click **Add variable**
5. Enter variable name and value
6. Select **Production** environment
7. Click **Save**
8. **Redeploy** for changes to take effect

### Build Settings

**Cloudflare Pages Configuration:**

| Setting | Value |
|---------|-------|
| Framework preset | None (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (empty) |
| Node.js version | 18 or higher |

---

## Troubleshooting

### Common Issues

#### Changes Not Appearing on Live Site

**Possible causes:**
1. Build failed on Cloudflare
2. Browser caching old version
3. Changes not pushed to GitHub

**Solutions:**

**Check GitHub:**
```bash
git log --oneline -5
```
Verify your commit appears. If not, push again:
```bash
git push
```

**Check Cloudflare:**
- Go to Cloudflare Dashboard → Deployments
- Look for red X (failed build)
- Click deployment to see error logs

**Clear browser cache:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or open in incognito/private window

#### Build Fails on Cloudflare

**Common errors:**

**Syntax Error:**
```
Error: Unexpected token
```
**Solution:** Check error log for line number, fix syntax in code

**Missing Dependency:**
```
Error: Cannot find module 'package-name'
```
**Solution:**
```bash
npm install package-name
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

**Build Timeout:**
```
Error: Build exceeded maximum time
```
**Solution:** Contact Cloudflare support or simplify build process

#### AI Parser Not Working

**Error:** "AI parsing failed"

**Possible causes:**
1. Missing API key
2. Invalid API key
3. API rate limit exceeded
4. Network error

**Solutions:**

1. **Check API key is set:**
   - Cloudflare Dashboard → Settings → Environment Variables
   - Verify `ANTHROPIC_API_KEY` exists

2. **Verify API key validity:**
   - Go to https://console.anthropic.com/
   - Check API keys section
   - Generate new key if needed

3. **Check usage limits:**
   - Anthropic Console → Usage
   - Verify you haven't exceeded quota

4. **Check browser console:**
   - Press F12 → Console tab
   - Look for error messages

#### Local Development Server Won't Start

**Error:** `EADDRINUSE: Port already in use`

**Solution:** Kill process on port 5173:
```bash
# Mac/Linux
lsof -ti:5173 | xargs kill

# Or use different port
npm run dev -- --port 5174
```

**Error:** `Cannot find module`

**Solution:** Reinstall dependencies:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Maintenance Tasks

### Regular Updates

#### Update Dependencies (Monthly)

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Test thoroughly
npm run dev

# If everything works, commit
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

#### Review Medical Glossary (Quarterly)

1. Review `src/utils/medicalGlossary.js`
2. Add new medical terms discovered in practice
3. Remove outdated or irrelevant terms
4. Update synonyms for better matching
5. Test with sample medical records
6. Deploy changes

#### Update ASRM Guidelines (Annually)

When new ASRM guidelines are released:

1. Review changes in guidelines
2. Update `src/utils/riskCalculator.js` scoring rules
3. Update methodology text in App.jsx
4. Update "Data Sources" section
5. Test extensively with sample candidates
6. Deploy and announce changes to users

### Backup & Version Control

**Git provides automatic backups:**

**View change history:**
```bash
git log --oneline -20
```

**Restore previous version of file:**
```bash
git checkout COMMIT_HASH -- path/to/file
```

**Undo last commit (keeps changes):**
```bash
git reset --soft HEAD~1
```

**Undo last commit (discards changes):**
```bash
git reset --hard HEAD~1
```

**Cloudflare deployment history:**
- Cloudflare Dashboard → Deployments
- Each deployment is preserved
- Can roll back to previous deployment

---

## Reference

### Git Commands Quick Reference

```bash
# Check current status
git status

# View recent commits
git log --oneline -10

# Stage all changes
git add .

# Stage specific file
git add path/to/file

# Commit with message
git commit -m "Message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# View all branches
git branch -a
```

### File Locations Quick Reference

| What | File Path |
|------|-----------|
| Main application | `src/components/App.jsx` |
| Styles | `src/styles/App.css` |
| Text parser | `src/utils/textParser.js` |
| Medical glossary | `src/utils/medicalGlossary.js` |
| Risk calculator | `src/utils/riskCalculator.js` |
| PDF generator | `src/utils/pdfGenerator.js` |
| AI parser | `src/utils/aiParser.js` |
| Logo | `public/riskrangerlogo.png` |
| Dependencies | `package.json` |
| Build config | `vite.config.js` |

### Color Reference

| Color Name | Hex Code | Used For |
|------------|----------|----------|
| Ruby Red | `#7d2431` | Headers, primary buttons |
| Dark Green | `#217045` | Secondary elements |
| Mustard Yellow | `#e1b321` | Accents, badges |
| Gold Brown | `#a5630b` | "How To Use" button |
| Dark Teal | `#005567` | Form labels, headings |

### Support & Resources

| Resource | URL |
|----------|-----|
| Live Application | https://risk-ranger.pages.dev/ |
| GitHub Repository | https://github.com/ruthmarieartistry/Risk-Ranger |
| Cloudflare Dashboard | https://dash.cloudflare.com/ |
| React Documentation | https://react.dev/ |
| Vite Documentation | https://vitejs.dev/ |
| Anthropic Console | https://console.anthropic.com/ |

---

**End of User Manual**

*For questions or support, contact Ruth Ellis*

---

**Document Version:** 1.0
**Last Updated:** October 21, 2025
**Next Review:** January 2026
