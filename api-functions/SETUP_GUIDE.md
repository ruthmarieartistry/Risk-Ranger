# Surrogate Application AI Processor
## Complete Setup Guide

**Purpose:** Automatically process surrogate applications from Zoho Creator using Claude AI to generate formatted summaries.

**Last Updated:** October 21, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Deploy Serverless Function](#step-1-deploy-serverless-function)
4. [Step 2: Configure Zoho Creator Fields](#step-2-configure-zoho-creator-fields)
5. [Step 3: Add Deluge Script](#step-3-add-deluge-script)
6. [Step 4: Testing](#step-4-testing)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## Overview

### How It Works

```
Surrogate submits application in Zoho Creator
    ↓
Form triggers Deluge script on submit
    ↓
Deluge script sends all data to Vercel function
    ↓
Vercel function calls Claude API
    ↓
Claude processes and formats summary
    ↓
Vercel returns JSON with summary + extracted fields
    ↓
Deluge updates Zoho record with summary
    ↓
Staff can view formatted summary in Zoho
```

### What Gets Generated

- **Formatted Summary** - Professional table-formatted text with all application details
- **Searchable Fields** - Age, BMI, State, flags for filtering
- **Medical Flags** - Automatic highlighting of medical concerns
- **Background Flags** - Notation of any background issues

---

## Prerequisites

### Required Accounts

1. **Anthropic Account** - For Claude API
   - Sign up: https://console.anthropic.com/
   - Get API key from dashboard

2. **Vercel Account** - For hosting serverless function
   - Sign up: https://vercel.com/signup
   - Free tier is sufficient

3. **Zoho Creator** - Your existing account
   - Must have Creator admin access
   - Must have API access enabled

### Required Tools

- Git (for deploying to Vercel)
- Text editor
- Web browser

---

## Step 1: Deploy Serverless Function

### Option A: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Navigate to project folder

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
```

#### 3. Create api folder structure

```bash
mkdir -p api
cp api-functions/process-surrogate-application.js api/process-application.js
```

#### 4. Create vercel.json

```bash
cat > vercel.json << 'EOF'
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
EOF
```

#### 5. Deploy to Vercel

```bash
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **surrogate-application-processor**
- Directory? **./** (current directory)
- Override settings? **N**

#### 6. Set environment variables

**Required:**
```bash
vercel env add ANTHROPIC_API_KEY
```
Paste your Anthropic API key when prompted.
Select: **Production, Preview, Development**

**Optional - For Gold Star Email Notifications:**
```bash
vercel env add RESEND_API_KEY
vercel env add INTAKE_TEAM_EMAIL
vercel env add SEND_GOLD_STAR_EMAILS
```

For each:
- `RESEND_API_KEY`: Get from https://resend.com/api-keys (free tier: 100 emails/day)
- `INTAKE_TEAM_EMAIL`: Email address for intake team (e.g., intake@alceasurrogacy.com)
- `SEND_GOLD_STAR_EMAILS`: Set to `true` to enable email notifications

Select: **Production, Preview, Development**

#### 7. Deploy to production

```bash
vercel --prod
```

Copy the production URL - you'll need it for Zoho!
Example: `https://surrogate-application-processor.vercel.app`

### Option B: Deploy via Vercel Dashboard

#### 1. Create GitHub repository

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
git init
git add api-functions/
git commit -m "Add AI application processor"
gh repo create surrogate-application-processor --public
git push -u origin main
```

#### 2. Import to Vercel

- Go to https://vercel.com/new
- Click "Import Git Repository"
- Select your repository
- Click "Deploy"

#### 3. Add environment variables

Go to Project Settings → Environment Variables

**Required:**
- Add `ANTHROPIC_API_KEY` with your API key

**Optional - For Gold Star Email Notifications:**
- Add `RESEND_API_KEY` - Get from https://resend.com/api-keys
- Add `INTAKE_TEAM_EMAIL` - Email address for intake team
- Add `SEND_GOLD_STAR_EMAILS` - Set to `true` to enable

For all variables:
- Select all environments (Production, Preview, Development)
- Click "Save"
- Redeploy project

---

## Step 2: Configure Zoho Creator Fields

### Add New Fields to Application Form

In Zoho Creator, add these fields to your Surrogate Application form:

#### Primary Summary Field

| Field Name | Type | Properties |
|------------|------|------------|
| `Candidate_Summary` | Multi-line Text | Read-only, Rich text enabled |

#### Meta Fields

| Field Name | Type | Properties |
|------------|------|------------|
| `Summary_Generated` | Checkbox | Read-only, Default: No |
| `Summary_Date` | Date-Time | Read-only |

#### Extracted Searchable Fields

| Field Name | Type | Properties |
|------------|------|------------|
| `Extracted_Age` | Number | Read-only |
| `Extracted_BMI` | Decimal | Read-only, 1 decimal place |
| `Extracted_State` | Single Line | Read-only |
| `Experienced_Surrogate_Status` | Single Line | Read-only |

#### Flag Fields

| Field Name | Type | Properties |
|------------|------|------------|
| `Has_Medical_Flags` | Checkbox | Read-only, Default: No |
| `Has_Background_Flags` | Checkbox | Read-only, Default: No |
| `Has_Preterm_History` | Checkbox | Read-only, Default: No |
| `Is_Gold_Star_Applicant` | Checkbox | Read-only, Default: No |

### Field Placement Recommendation

Create a new section called **"AI Generated Summary"** at the bottom of your form.
Place all these fields in that section.

---

## Step 3: Add Deluge Script

### 1. Open Deluge Script Editor

- Go to your Surrogate Application form
- Click **Edit Form**
- Click **Workflows** tab
- Click **Form Rules**
- Click **Add Rule**

### 2. Configure Rule

- **Rule Name:** "Generate AI Summary"
- **Execute:** On successful form submission
- **Condition:** Always (no condition needed)

### 3. Add Script

Copy the entire script from `zoho-deluge-webhook.txt` file.

**IMPORTANT:** Update these values:

Line 9:
```
webhookUrl = "https://YOUR-PROJECT.vercel.app/api/process-application";
```
Replace with your actual Vercel URL.

Lines 20-onwards: Update field names to match YOUR form fields:
```
input.First_Name → your actual field name
input.Medical_Conditions → your actual field name
```

### 4. Field Name Mapping

To find your actual field names in Zoho:
1. Go to Form Builder
2. Click on each field
3. Look for "Field Link Name" (this is what you use in Deluge)
4. Update the script accordingly

Example:
```
Zoho shows: "Field Link Name: First_Name"
Use in script: input.First_Name
```

### 5. Save and Test

- Click **Save**
- Script will now run on every form submission

---

## Step 4: Testing

### Test #1: Submit Test Application

1. Go to your Surrogate Application form
2. Fill out a test application with realistic data
3. Submit the form
4. Wait 10-30 seconds for processing

### Test #2: Check Summary Generated

1. Go to your application records
2. Find the test application
3. Check these fields:
   - `Candidate_Summary` should have formatted text
   - `Summary_Generated` should be checked
   - `Summary_Date` should show current date/time
   - Extracted fields should be populated

### Test #3: View Formatted Summary

The `Candidate_Summary` field should show:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANDIDATE APPLICATION SUMMARY
Generated: October 21, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:                      ...
Age:                       ...
...
```

---

## Troubleshooting

### Summary Not Generated

**Check #1: Deluge Script Logs**
- Go to Setup → Developer Space → Script Logs
- Look for errors related to your webhook call
- Check if `info` statements are logging

**Check #2: Vercel Function Logs**
- Go to Vercel Dashboard → Your Project → Functions
- Click on `/api/process-application`
- Check recent invocations for errors

**Check #3: API Key**
- Verify `ANTHROPIC_API_KEY` is set in Vercel
- Settings → Environment Variables
- Redeploy after adding/changing

### Summary Generated But Empty

**Possible causes:**
- Claude API returned unexpected format
- Application text was empty or malformed
- Field names don't match in Deluge script

**Solution:**
- Check Vercel function logs
- Verify field name mapping in Deluge script
- Test with different application data

### Summary Has Wrong Format

**Possible causes:**
- Claude prompt needs adjustment
- Special characters breaking formatting

**Solution:**
- Edit `process-surrogate-application.js`
- Adjust the prompt template
- Redeploy to Vercel

### Webhook Timeout

**Error:** "Request timed out"

**Solution:**
- Increase timeout in Deluge (max 60 seconds)
- Check if Claude API is responding slowly
- Reduce application text length if too large

---

## Maintenance

### Monthly: Check API Usage

**Claude API:**
- Go to https://console.anthropic.com/
- Check usage dashboard
- Monitor costs (typically $0.01-0.05 per application)

**Vercel:**
- Go to Vercel Dashboard
- Check function invocations
- Should stay well within free tier limits

### Update Claude Prompt

If you need to adjust the summary format:

1. Edit `api/process-application.js`
2. Find the `buildClaudePrompt()` function
3. Modify the template
4. Commit and push changes
5. Vercel will auto-deploy

### Update Deluge Script

If you add new form fields:

1. Edit the Deluge script in Zoho
2. Add new fields to the `applicationText` concatenation
3. Save the script
4. New submissions will include the new fields

---

## Cost Estimates

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| Claude API | ~100 applications/month | $1-5 |
| Vercel Functions | ~100 invocations/month | $0 (free tier) |
| **Total** | | **$1-5/month** |

---

## Support

### Check Logs

**Zoho Deluge Logs:**
```
Setup → Developer Space → Script Logs
```

**Vercel Function Logs:**
```
Dashboard → Project → Functions → Logs
```

**Claude API Status:**
```
https://status.anthropic.com/
```

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Method not allowed" | Wrong HTTP method | Check webhook URL is correct |
| "Missing application data" | Empty payload | Verify Deluge script is sending data |
| "Claude API error" | API key invalid | Check environment variable |
| "Invalid response format" | Claude returned bad JSON | Check prompt formatting |

---

## Files Reference

| File | Purpose |
|------|---------|
| `process-surrogate-application.js` | Main serverless function |
| `zoho-deluge-webhook.txt` | Zoho Creator script template |
| `SETUP_GUIDE.md` | This document |

---

**End of Setup Guide**

*For questions or issues, check troubleshooting section or review Vercel/Zoho logs*

---

**Version:** 1.0
**Last Updated:** October 21, 2025
