# Quick Testing Guide

**Last Updated:** October 21, 2025

This guide walks you through testing the AI application processor locally and in production.

---

## Option 1: Test Locally (Recommended First)

### Step 1: Install Dependencies

```bash
cd /Users/ruthellis/surrogacy-risk-assessment
npm install @anthropic-ai/sdk
```

### Step 2: Set Up Environment Variables

Create a `.env` file:

```bash
cat > .env << 'EOF'
ANTHROPIC_API_KEY=your_anthropic_api_key_here
RESEND_API_KEY=your_resend_api_key_here
INTAKE_TEAM_EMAIL=your_email@example.com
SEND_GOLD_STAR_EMAILS=true
EOF
```

Replace with your actual keys:
- Get Anthropic API key: https://console.anthropic.com/
- Get Resend API key: https://resend.com/api-keys (optional for testing)

### Step 3: Create Test File

```bash
cat > test-application.js << 'EOF'
// Load the function
const handler = require('./api-functions/process-surrogate-application.js').default;

// Sample gold star application
const testRequest = {
  method: 'POST',
  body: {
    application_text: `SURROGATE APPLICATION

PERSONAL INFORMATION:
Name: Jane Test Smith
Goes By: Jane
Preferred Pronouns: She/Her
Date of Birth: 01/15/1993
Age: 30
Height: 5'6"
Weight: 145
BMI: 23.4
Relationship Status: Married
Employment Status: Employed
Job Title: Teacher
Street Address: 123 Main St
City: San Diego
State: California
ZIP: 92101
Previous Surrogate: No

PREGNANCY HISTORY:
Number of Pregnancies: 2
Number of Live Births: 2
Number of Miscarriages: 0
Number of Abortions: 0
Pregnancy Details/Complications: Both pregnancies were full-term, vaginal deliveries with no complications. First baby: 39 weeks, 7 lbs 2 oz. Second baby: 40 weeks, 7 lbs 8 oz.

MEDICAL HISTORY:
Current Medical Conditions: None
Current Medications: Prenatal vitamins
Allergies: None
Previous Surgeries: None
Mental Health History: None
Smoking Status: Non-smoker
Vaping Status: Non-vaper
Alcohol Use: Social drinker (1-2 drinks per month)
Drug Use: None
Dietary Restrictions: None

HOUSEHOLD INFORMATION:
Type of Home: Single-family home
Home Ownership: Own
Number of Adults in Home: 2
Number of Children in Home: 2
Children Ages: 5 and 8
Smoke-Free Home: Yes
Pets: Yes
Pet Details: One golden retriever, well-behaved
Firearms in Home: No

OB/GYN INFORMATION:
Current Birth Control: IUD
Birth Control Details: Mirena IUD, can be removed when ready
Currently Breastfeeding: No

BACKGROUND INFORMATION:
Criminal History (Self): No
Criminal History (Partner): No
`,
    application_id: 'TEST-001',
    submitted_date: new Date().toISOString()
  }
};

// Mock response object
const testResponse = {
  status: (code) => {
    console.log(`\nResponse Status: ${code}\n`);
    return testResponse;
  },
  json: (data) => {
    console.log('='.repeat(80));
    console.log('RESPONSE DATA:');
    console.log('='.repeat(80));
    console.log(JSON.stringify(data, null, 2));
    console.log('='.repeat(80));

    if (data.success) {
      console.log('\n✅ SUCCESS!\n');
      console.log('FORMATTED SUMMARY:');
      console.log('-'.repeat(80));
      console.log(data.summary);
      console.log('-'.repeat(80));
      console.log('\nEXTRACTED FIELDS:');
      console.log(JSON.stringify(data.fields, null, 2));
      console.log('\nGOLD STAR:', data.is_gold_star ? '⭐ YES' : 'No');

      if (data.is_gold_star) {
        console.log('\n📧 Email notification sent to intake team!');
      }
    } else {
      console.log('\n❌ ERROR:', data.error);
      console.log('Message:', data.message);
    }
  }
};

// Run the test
console.log('Testing AI Application Processor...\n');
console.log('Processing application for: Jane Test Smith');
console.log('Expected: Gold Star Applicant\n');

handler(testRequest, testResponse).catch(err => {
  console.error('❌ Test failed:', err.message);
  console.error(err.stack);
});
EOF
```

### Step 4: Run the Test

```bash
node test-application.js
```

**Expected Output:**
- Status: 200
- Success: true
- Summary with "⭐ GOLD STAR" in header
- is_gold_star: true
- Email sent (if RESEND_API_KEY is configured)

### Step 5: Test Non-Gold Star Application

Edit `test-application.js` and change:
- Age to 42 (outside range)
- BMI to 32 (outside range)

Run again:
```bash
node test-application.js
```

**Expected:** is_gold_star: false, no email sent

---

## Option 2: Test on Vercel (Production)

### Step 1: Deploy to Vercel

```bash
cd /Users/ruthellis/surrogacy-risk-assessment

# Create API directory
mkdir -p api
cp api-functions/process-surrogate-application.js api/process-application.js

# Create vercel.json
cat > vercel.json << 'EOF'
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 30
    }
  }
}
EOF

# Deploy
vercel
```

### Step 2: Add Environment Variables

```bash
# Required
vercel env add ANTHROPIC_API_KEY
# Paste your key, select all environments

# Optional (for email testing)
vercel env add RESEND_API_KEY
vercel env add INTAKE_TEAM_EMAIL
vercel env add SEND_GOLD_STAR_EMAILS
```

### Step 3: Deploy to Production

```bash
vercel --prod
```

Copy your production URL, e.g., `https://surrogate-application-processor.vercel.app`

### Step 4: Test with curl

```bash
curl -X POST https://YOUR-PROJECT.vercel.app/api/process-application \
  -H "Content-Type: application/json" \
  -d '{
    "application_text": "SURROGATE APPLICATION\n\nPERSONAL INFORMATION:\nName: Jane Smith\nAge: 30\nBMI: 23.4\nState: California\n\nPREGNANCY HISTORY:\nNumber of Pregnancies: 2\nNumber of Live Births: 2\nPregnancy Details: Both full-term vaginal deliveries, no complications\n\nMEDICAL HISTORY:\nCurrent Medical Conditions: None\nSmoking Status: Non-smoker\nVaping Status: Non-vaper\n\nHOUSEHOLD INFORMATION:\nType of Home: Single-family home\nNumber of Adults in Home: 2\nNumber of Children in Home: 2\nSmoke-Free Home: Yes\n\nOB/GYN INFORMATION:\nCurrent Birth Control: IUD\nCurrently Breastfeeding: No\n\nBACKGROUND INFORMATION:\nCriminal History (Self): No\nCriminal History (Partner): No",
    "application_id": "TEST-001"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "summary": "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nCANDIDATE APPLICATION SUMMARY ⭐ GOLD STAR\n...",
  "fields": {
    "age": 30,
    "bmi": 23.4,
    "state": "California",
    ...
  },
  "is_gold_star": true,
  "generated_at": "2025-10-21T..."
}
```

---

## Option 3: Test End-to-End with Zoho

### Step 1: Add Fields to Zoho Form

In Zoho Creator, add these fields to your Surrogate Application form:

**Long Text:**
- `Candidate_Summary` (Multi-line, read-only)

**Checkboxes:**
- `Summary_Generated`
- `Has_Medical_Flags`
- `Has_Background_Flags`
- `Has_Preterm_History`
- `Is_Gold_Star_Applicant`

**Date/Time:**
- `Summary_Date`

**Numbers:**
- `Extracted_Age`
- `Extracted_BMI`

**Text:**
- `Extracted_State`
- `Experienced_Surrogate_Status`

### Step 2: Add Deluge Script

1. Go to Form → Edit → Workflows
2. Create new workflow: "On Successful Form Submit"
3. Copy script from `zoho-deluge-webhook.txt`
4. Update line 16 with your Vercel URL:
   ```
   webhookUrl = "https://YOUR-PROJECT.vercel.app/api/process-application";
   ```
5. Update field names to match YOUR form (lines 30-130)
6. Save and enable workflow

### Step 3: Submit Test Application

1. Fill out your Surrogate Application form with gold star data:
   - Age: 30
   - BMI: 23.4
   - 2 pregnancies, 2 vaginal deliveries
   - No medical issues
   - Non-smoker
   - Clean background

2. Submit the form

3. Check the record:
   - `Candidate_Summary` should be populated
   - `Is_Gold_Star_Applicant` should be checked
   - All extracted fields should have values

4. Check your email (if configured):
   - Subject: "⭐ Gold Star Applicant: [Name]"
   - Should arrive within seconds

### Step 4: Check Logs

**Zoho Logs:**
1. Setup → Developer Space → Script Logs
2. Look for: "AI Summary generated successfully for application TEST-001"

**Vercel Logs:**
1. Vercel Dashboard → Your Project → Deployments
2. Click latest deployment → Functions
3. Click `/api/process-application`
4. Look for: "Gold star email sent successfully to: your@email.com"

---

## Troubleshooting

### Test Fails: "ANTHROPIC_API_KEY environment variable not set"

**Fix:**
```bash
# Check if .env file exists
cat .env

# Or set directly
export ANTHROPIC_API_KEY=your_key_here
node test-application.js
```

### Test Fails: "Claude API error: 401"

**Fix:** Your API key is invalid
- Get new key: https://console.anthropic.com/
- Update `.env` or Vercel environment variables

### Email Not Sending

**Check 1:** Is SEND_GOLD_STAR_EMAILS set to "true"?
```bash
vercel env ls
```

**Check 2:** Is RESEND_API_KEY valid?
- Test at https://resend.com/api-keys

**Check 3:** Check Vercel logs for errors

### Not Detecting as Gold Star

**Debug:** Add console logging to see why

Check if applicant meets ALL criteria:
- Age 25-38 ✓
- BMI 19-28 ✓
- 1+ successful pregnancy ✓
- 0-1 C-sections ✓
- No preterm deliveries ✓
- No medical conditions ✓
- Non-smoker ✓
- Clean background ✓

Even ONE criterion failing = not gold star

---

## Quick Test Checklist

- [ ] Local test with gold star applicant → Success + is_gold_star: true
- [ ] Local test with non-gold star applicant → Success + is_gold_star: false
- [ ] Deployed to Vercel successfully
- [ ] Environment variables set in Vercel
- [ ] curl test to Vercel endpoint → Success
- [ ] Zoho fields added
- [ ] Deluge script added and enabled
- [ ] End-to-end test in Zoho → Summary generated
- [ ] Gold star applicant → Email received
- [ ] Non-gold star applicant → No email

---

## Sample Test Cases

### Test Case 1: Perfect Gold Star
- Age: 30, BMI: 24.5
- 2 pregnancies, 2 vaginal deliveries, full-term
- No medical conditions, non-smoker
- Clean background
- **Expected:** ⭐ Gold Star

### Test Case 2: Age Too High
- Age: 42, BMI: 24.5 (everything else same)
- **Expected:** NOT gold star (age > 38)

### Test Case 3: BMI Too High
- Age: 30, BMI: 29 (everything else same)
- **Expected:** NOT gold star (BMI > 28)

### Test Case 4: Has Medical Condition
- Age: 30, BMI: 24.5
- Medical Conditions: "Type 2 Diabetes"
- **Expected:** NOT gold star (medical condition)

### Test Case 5: Previous C-Sections
- Age: 30, BMI: 24.5
- 3 pregnancies, 2 C-sections
- **Expected:** NOT gold star (>1 C-section)

### Test Case 6: Smoker
- Age: 30, BMI: 24.5
- Smoking Status: "Yes, 5 cigarettes per day"
- **Expected:** NOT gold star (smoker)

---

## Next Steps After Testing

Once all tests pass:

1. ✅ Deploy to production
2. ✅ Enable in Zoho for real submissions
3. ✅ Monitor first few real applications
4. ✅ Check email notifications are working
5. ✅ Train team on new summary format

---

**Need Help?**
- Check Vercel logs: Dashboard → Functions → Logs
- Check Zoho logs: Setup → Developer Space → Script Logs
- Review SETUP_GUIDE.md for detailed troubleshooting
