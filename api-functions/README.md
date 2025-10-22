# Surrogate Application AI Processor

**Automated application processing for Alcea Surrogacy using Claude AI**

---

## What This Does

Automatically processes surrogate applications submitted through Zoho Creator:
- ✅ Extracts key information from lengthy applications
- ✅ Generates concise, professional formatted summaries
- ✅ Spells out all medical abbreviations
- ✅ Highlights medical concerns and red flags
- ✅ Creates searchable metadata fields
- ⭐ Automatically detects "gold star" applicants
- 📧 Sends email notifications for exceptional candidates
- ✅ Runs instantly on form submission

---

## Files Included

| File | Purpose |
|------|---------|
| `process-surrogate-application.js` | Serverless function (deploy to Vercel) |
| `zoho-deluge-webhook.txt` | Zoho Creator script template |
| `SETUP_GUIDE.md` | Complete deployment instructions |
| `TESTING_EXAMPLE.md` | Sample data and testing procedures |
| `GOLD_STAR_EMAIL_SETUP.md` | Email notification setup guide |
| `README.md` | This file |

---

## Quick Start

### 1. Deploy Function to Vercel

```bash
# Navigate to project
cd /Users/ruthellis/surrogacy-risk-assessment

# Create API directory
mkdir -p api
cp api-functions/process-surrogate-application.js api/process-application.js

# Deploy
vercel

# Add environment variable
vercel env add ANTHROPIC_API_KEY

# Deploy to production
vercel --prod
```

### 2. Configure Zoho Creator

1. Add new fields to your application form (see SETUP_GUIDE.md)
2. Copy Deluge script from `zoho-deluge-webhook.txt`
3. Update field names to match your form
4. Set webhook URL to your Vercel deployment

### 3. Test

1. Submit a test application
2. Verify summary is generated
3. Check all extracted fields are populated

---

## Architecture

```
┌──────────────────────┐
│  Zoho Creator Form   │
│  (Surrogate submits) │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Deluge Script       │
│  (on form submit)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Vercel Function     │
│  /api/process-app    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Claude API          │
│  (Anthropic)         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Formatted Summary   │
│  + Extracted Fields  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Update Zoho Record  │
│  (Summary field)     │
└──────────────────────┘
```

---

## Example Output

**Input:** Full surrogate application (all form fields)

**Output:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANDIDATE APPLICATION SUMMARY ⭐ GOLD STAR
Generated: October 21, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL
Name: Jane Smith
Age: 30 | BMI: 24.5 | California | Married | Teacher
Experienced Surrogate: No (First-time)

🤰 PREGNANCY HISTORY
2 Pregnancies | 2 Deliveries | 0 Cesarean sections
Anything of note: Clean pregnancy history

🏥 MEDICAL HISTORY
Clean - no medical conditions of note, non-smoker, non-vaper

🏠 HOUSEHOLD
Single-family home with 2 adults and 2 children (ages 5, 8). Smoke-free.
One dog. No firearms.

👩‍⚕️ OB/GYN
Birth Control: IUD

📋 BACKGROUND
Clean

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Plus extracted searchable fields:**
- Age: 30
- BMI: 24.5
- State: California
- Experienced Surrogate: First-time
- Has Medical Flags: No
- Has Background Flags: No
- Has Preterm History: No
- ⭐ **Is Gold Star Applicant: Yes**

**Email notification automatically sent to intake team!**

---

## Cost

**Very Affordable:**
- Claude API: ~$0.01-0.05 per application
- Vercel: Free tier (sufficient for normal use)
- Resend (email): Free tier (100 emails/day)
- **Total:** ~$1-5/month for 100 applications

---

## Documentation

📖 **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete deployment instructions
🧪 **[TESTING_EXAMPLE.md](TESTING_EXAMPLE.md)** - Sample data and testing
⭐ **[GOLD_STAR_EMAIL_SETUP.md](GOLD_STAR_EMAIL_SETUP.md)** - Email notification setup
📝 **[zoho-deluge-webhook.txt](zoho-deluge-webhook.txt)** - Zoho script template

---

## Support

### Check Logs

**Zoho:**
```
Setup → Developer Space → Script Logs
```

**Vercel:**
```
Dashboard → Project → Functions → Logs
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Summary not generated | Check Deluge logs, verify webhook URL |
| Wrong format | Check Vercel function logs |
| API errors | Verify ANTHROPIC_API_KEY is set |
| Timeout | Check Claude API status |

See [SETUP_GUIDE.md](SETUP_GUIDE.md) Troubleshooting section for details.

---

## Requirements

- **Zoho Creator** - Admin access
- **Anthropic API Key** - Get at https://console.anthropic.com/
- **Vercel Account** - Free tier at https://vercel.com/
- **Git** (optional) - For version control

---

## Benefits

✅ **Saves Time** - No manual summary writing
✅ **Consistency** - Every summary follows same format
✅ **Accuracy** - AI extracts details you might miss
✅ **Searchable** - Extracted fields enable filtering
✅ **Professional** - Clean, formatted output
✅ **Scalable** - Handles unlimited applications

---

## Next Steps

1. **Read [SETUP_GUIDE.md](SETUP_GUIDE.md)** for deployment instructions
2. **Deploy function** to Vercel
3. **Configure Zoho** with new fields and script
4. **Test** with sample application
5. **Go live** and let it run automatically!

---

**Questions?** Check the setup guide or review the testing examples.

**Developed for:** Alcea Surrogacy
**Created:** October 2025
**Version:** 1.0
