# Risk Ranger - Complete Guide

**Last Updated:** October 21, 2025
**Live URL:** https://risk-ranger.pages.dev/
**Repository:** https://github.com/ruthmarieartistry/Risk-Ranger

---

## What Is Risk Ranger?

Risk Ranger is a medical risk assessment tool for evaluating surrogacy candidates. It analyzes pregnancy history, medical conditions, and other health factors to estimate acceptance likelihood at different types of fertility clinics.

**Key Features:**
- Parses medical records (text input or file upload)
- Recognizes 400+ medical terms and abbreviations
- Multi-layered text parsing (regex → glossary → AI)
- Generates risk assessment scores for strict/moderate/lenient clinics
- Creates downloadable PDF reports

---

## Technology Stack

### Frontend Framework
- **React 18.2** - JavaScript library for building the user interface
- **Vite 5.4** - Fast development server and build tool

### Language
- **JavaScript (ES6+)** - No TypeScript, pure JavaScript

### Hosting Platform
- **Cloudflare Pages** - Free hosting with unlimited bandwidth
- **Deployment:** Automatic on every push to `main` branch
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`

### AI Integration
- **Anthropic Claude API** - Optional medical text parsing for complex records
- **API Key:** Stored in Cloudflare Pages environment variable `ANTHROPIC_API_KEY`

---

## Project Structure

```
surrogacy-risk-assessment/
├── public/                          # Static assets (served as-is)
│   ├── riskrangerlogo.png          # Main logo (93KB)
│   └── carry-calc-logo.png         # Old logo (backup)
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   └── App.jsx                 # Main application component (1,324 lines)
│   │
│   ├── utils/                       # Utility functions
│   │   ├── textParser.js           # Primary medical text parser (regex)
│   │   ├── pregnancyMedicalParser.js # Pregnancy-specific parsing
│   │   ├── medicalGlossary.js      # 400+ medical terms dictionary
│   │   ├── riskCalculator.js       # Scoring algorithm
│   │   ├── pdfGenerator.js         # PDF report generation
│   │   └── aiParser.js             # Optional AI-based parser (Anthropic)
│   │
│   ├── styles/
│   │   └── App.css                 # Main stylesheet
│   │
│   └── main.jsx                    # React entry point
│
├── package.json                     # Dependencies and scripts
├── vite.config.js                  # Vite build configuration
├── .gitignore                      # Files to exclude from git
└── README.md                       # Project overview
```

---

## Local Development Setup

### Prerequisites
- **Node.js 18+** installed
- **npm** (comes with Node.js)
- Code editor (VS Code recommended)

### Steps to Run Locally

1. **Navigate to project folder:**
   ```bash
   cd /Users/ruthellis/surrogacy-risk-assessment
   ```

2. **Install dependencies** (only needed once or when package.json changes):
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Server runs at `http://localhost:5173` (or next available port)
   - Changes to code auto-reload in browser

5. **Stop development server:**
   - Press `Ctrl+C` in terminal

---

## Making Updates

### Editing Content

#### Update Logo
1. Replace `/Users/ruthellis/surrogacy-risk-assessment/public/riskrangerlogo.png`
2. Keep same filename OR update reference in `src/components/App.jsx` line 79:
   ```javascript
   <img src="/riskrangerlogo.png" alt="Risk Ranger" className="header-logo" />
   ```

#### Update Methodology Text
Edit `src/components/App.jsx` starting at line 1257 (Method & Reliability modal)

#### Update Medical Terms
- **Add new conditions:** Edit `src/utils/medicalGlossary.js`
- **Add parsing patterns:** Edit `src/utils/textParser.js` or `src/utils/pregnancyMedicalParser.js`

#### Update Risk Scoring Rules
Edit `src/utils/riskCalculator.js`

### Editing Styles

**Main stylesheet:** `src/styles/App.css`

**Colors (defined in App.jsx):**
```javascript
const rubyRed = '#7d2431';        // Headers, buttons
const darkGreen = '#217045';      // Secondary elements
const mustardYellow = '#e1b321';  // Accents
const goldBrown = '#a5630b';      // "How To Use" button
const darkTeal = '#005567';       // Form labels
```

To change colors: Search for these variables in `src/components/App.jsx` and update hex values.

---

## Deploying Changes

### Automatic Deployment (Recommended)

1. **Make your changes** to files
2. **Test locally** with `npm run dev`
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push
   ```
5. **Cloudflare Pages automatically builds and deploys** (takes 1-2 minutes)
6. **Check live site:** https://risk-ranger.pages.dev/

### Manual Deployment (If Needed)

1. Go to https://dash.cloudflare.com/
2. Click **Workers & Pages** → **risk-ranger**
3. Click **Deployments** tab
4. Click **Create deployment** button
5. Select branch: `main`
6. Click **Deploy**

---

## Key Configuration Files

### `package.json`
Defines dependencies and scripts:
```json
{
  "scripts": {
    "dev": "vite",              // Start local dev server
    "build": "vite build",      // Build for production
    "preview": "vite preview"   // Preview production build locally
  }
}
```

### `vite.config.js`
Build configuration for Vite:
```javascript
export default {
  base: '/',                    // URL base path
  build: {
    outDir: 'dist',            // Output folder for built files
    assetsDir: 'assets'
  }
}
```

### `.gitignore`
Files NOT tracked in git:
- `node_modules/` - Dependencies (downloaded via npm install)
- `dist/` - Build output (generated by npm run build)
- `.env` - Environment variables (secrets)

---

## Environment Variables

Stored in **Cloudflare Pages Dashboard** (not in code):

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `ANTHROPIC_API_KEY` | Claude API for AI text parsing | Optional |

**To update:**
1. Go to Cloudflare Dashboard → risk-ranger project
2. Click **Settings** → **Environment Variables**
3. Edit or add variables
4. Redeploy for changes to take effect

---

## How the Medical Parsing Works

### Three-Tier System

**1. Primary Layer - Regex Pattern Matching**
- File: `src/utils/textParser.js` and `src/utils/pregnancyMedicalParser.js`
- Recognizes structured patterns: `G3P2`, `C/S`, `VBAC`, `GDM`, `HELLP`
- Fastest method, handles ~90% of records

**2. Secondary Layer - Medical Glossary**
- File: `src/utils/medicalGlossary.js`
- Maps natural language to medical conditions
- Example: "high blood pressure" → "hypertension"

**3. Tertiary Layer - AI Parser (Optional)**
- File: `src/utils/aiParser.js`
- Only used when user enables "AI Parser" toggle
- Sends text to Anthropic Claude API
- Extracts conditions from complex narrative records

### Scoring Engine
- File: `src/utils/riskCalculator.js`
- **100% deterministic** - no AI involved in scoring
- Evaluates against ASRM 2022 guidelines
- Different thresholds for strict/moderate/lenient clinics

---

## Troubleshooting

### Site not updating after push
1. Check GitHub: https://github.com/ruthmarieartistry/Risk-Ranger/commits/main
   - Verify your commit appears
2. Check Cloudflare Pages: https://dash.cloudflare.com/
   - Go to Workers & Pages → risk-ranger → Deployments
   - Check if build succeeded or failed
   - If failed, click on deployment to see error logs

### Build fails on Cloudflare
Common causes:
- **Syntax error in code:** Check error log for line number
- **Missing dependency:** Run `npm install` locally first
- **Environment variable missing:** Add in Cloudflare settings

### AI Parser not working
1. Check `ANTHROPIC_API_KEY` is set in Cloudflare environment variables
2. Verify API key is valid at https://console.anthropic.com/
3. Check browser console (F12) for error messages

### Local dev server won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Try again
npm run dev
```

---

## Important Files to Never Delete

- `src/components/App.jsx` - Main application code
- `src/utils/riskCalculator.js` - Scoring logic
- `src/utils/medicalGlossary.js` - Medical terms database
- `package.json` - Project configuration
- `vite.config.js` - Build settings

---

## Common Tasks

### Add a new medical condition

1. **Add to glossary** (`src/utils/medicalGlossary.js`):
   ```javascript
   "condition_name": ["synonym1", "synonym2", "abbreviation"]
   ```

2. **Add parsing pattern** (`src/utils/textParser.js`):
   ```javascript
   const hasCondition = text.toLowerCase().includes('keyword');
   if (hasCondition) conditions.push('condition_name');
   ```

3. **Add to scoring** (`src/utils/riskCalculator.js`):
   ```javascript
   if (conditions.includes('condition_name')) {
     score += penaltyPoints;
   }
   ```

4. **Test, commit, push**

### Change clinic acceptance thresholds

Edit `src/utils/riskCalculator.js` - look for threshold values like:
```javascript
if (score < 10) return { status: 'accept', ... };
if (score < 30) return { status: 'review', ... };
return { status: 'decline', ... };
```

Adjust numbers as needed.

### Update copyright year

Search for "© 2025" in `src/components/App.jsx` and update.

---

## Getting Help

- **View errors:** Press F12 in browser → Console tab
- **Check build logs:** Cloudflare Dashboard → Deployments → Click deployment
- **GitHub issues:** https://github.com/ruthmarieartistry/Risk-Ranger/issues
- **Local testing:** Always run `npm run dev` before pushing

---

## Backup & Safety

- **All code is in GitHub:** Changes are tracked, can be reverted
- **View history:** `git log --oneline`
- **Undo last commit:** `git revert HEAD`
- **Cloudflare keeps deployment history:** Can roll back to previous deployments in dashboard

---

## Quick Reference Commands

```bash
# Navigate to project
cd /Users/ruthellis/surrogacy-risk-assessment

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production (test only - Cloudflare does this automatically)
npm run build

# Commit changes
git add .
git commit -m "Your message"
git push

# View recent commits
git log --oneline -10

# Check current status
git status
```
