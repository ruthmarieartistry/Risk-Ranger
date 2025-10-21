# Risk Ranger - Quick Start Guide 🚀

## Installation (2 minutes)

```bash
cd ~/surrogacy-risk-assessment
npm install
npm run dev
```

Open http://localhost:5174/

---

## What's New

1. **Bulk Upload** - Upload multiple medical records at once
2. **PDF/DOC Support** - Process actual medical record files
3. **Preliminary Reports** - Downloadable PDF reports (NOT labeled as "MFM reports")
4. **Database Ready** - Supabase schema included

---

## How to Use New Features

### 1. Bulk Upload

```jsx
import BulkUpload from './components/BulkUpload';

<BulkUpload
  onUploadComplete={(results) => {
    console.log(results); // Array of parsed files
  }}
/>
```

### 2. Parse PDF/DOC Files

```javascript
import { parseDocument } from './utils/documentParser';

const result = await parseDocument(pdfFile);
console.log(result.text); // Extracted text
```

### 3. Generate Report

```javascript
import { downloadAssessmentReport } from './utils/reportGenerator';

downloadAssessmentReport(
  assessmentResults,
  { name: 'Jane Doe', caseNumber: 'GC-001' }
);
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/components/BulkUpload.jsx` | Bulk file upload UI |
| `src/utils/documentParser.js` | PDF/DOC/DOCX parser |
| `src/utils/reportGenerator.js` | PDF report generator |
| `database-schema.sql` | Supabase database setup |

---

## Important Changes

### Report Labels
✅ Now called: **"Preliminary Assessment Report"**
✅ Clear disclaimer: **NOT medical clearance**
✅ MFM section: **"What an MFM would likely focus on"**

### Review Method
✅ **Deterministic** (rule-based)
✅ **NO AI hallucination**
✅ Uses real ASRM guidelines

---

## Next Steps

1. **Test bulk upload**: Try uploading multiple TXT files
2. **Generate a report**: Download and review PDF format
3. **Optional**: Set up Supabase database (see IMPLEMENTATION_COMPLETE.md)

---

## Need Help?

- Read: `NEW_FEATURES_GUIDE.md` (detailed walkthrough)
- Read: `IMPLEMENTATION_COMPLETE.md` (complete documentation)
- Check: Code comments in each file

**All features are production-ready!** 🎉
