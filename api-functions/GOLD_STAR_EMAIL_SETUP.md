# Gold Star Email Notification Setup

**Last Updated:** October 21, 2025

This guide explains how to set up automated email notifications when a "gold star" applicant is received.

---

## What is a Gold Star Applicant?

A gold star applicant meets ALL of the following criteria:

✓ Age 25-38
✓ BMI 19-28
✓ At least 1 previous successful pregnancy
✓ No C-sections OR maximum 1 C-section
✓ No preterm deliveries
✓ No significant medical conditions
✓ No smoking/vaping
✓ Clean background
✓ First-time or experienced surrogate with good history

When an application meets all these criteria, Claude AI automatically:
1. Marks `is_gold_star: true` in the response
2. Sets the `Is_Gold_Star_Applicant` checkbox in Zoho
3. **Sends an email notification to the intake team** (if configured)

---

## Email Service Setup

### Step 1: Create Resend Account

1. Go to https://resend.com/signup
2. Create a free account (100 emails/day free tier)
3. Verify your email address

### Step 2: Add and Verify Your Domain

**Option A: Use Your Own Domain (Recommended)**

1. Go to https://resend.com/domains
2. Click **Add Domain**
3. Enter your domain: `alceasurrogacy.com`
4. Add the DNS records shown to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually 5-15 minutes)

**Option B: Use Resend's Test Domain (For Testing Only)**

- You can send emails from `onboarding@resend.dev` for testing
- Limited to 1 email per day
- Not recommended for production

### Step 3: Create API Key

1. Go to https://resend.com/api-keys
2. Click **Create API Key**
3. Name: `Alcea Surrogate Application Processor`
4. Permission: **Sending access**
5. Click **Create**
6. **Copy the API key** (you'll only see it once!)

---

## Vercel Configuration

### Step 1: Add Environment Variables

Go to your Vercel project → Settings → Environment Variables

Add these three variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_123abc456def789...` |
| `INTAKE_TEAM_EMAIL` | Email address to receive notifications | `intake@alceasurrogacy.com` |
| `SEND_GOLD_STAR_EMAILS` | `true` | `true` |

**Important:**
- Select all environments: Production, Preview, Development
- Click **Save** after each variable

### Step 2: Redeploy

After adding environment variables, redeploy your project:

```bash
vercel --prod
```

Or in Vercel Dashboard:
- Go to Deployments tab
- Click the three dots (...) on latest deployment
- Click **Redeploy**

---

## Email Template

When a gold star applicant is detected, this email is automatically sent:

### Subject Line
```
⭐ Gold Star Applicant: [Candidate Name]
```

### Email Body
- **Header:** Ruby red background with "⭐ Gold Star Applicant Received"
- **Highlight Box:** Candidate name, age, BMI, state
- **Criteria Checklist:** Shows all 8 gold star criteria with checkmarks
- **Full Summary:** Complete AI-generated summary
- **Footer:** Timestamp and auto-generation notice

### From Address
```
Alcea Surrogacy <notifications@alceasurrogacy.com>
```
(Update in code if using different domain)

---

## Testing Gold Star Detection

### Create a Test Application

Submit an application with these details to trigger gold star status:

**Personal:**
- Name: Jane Smith
- Age: 30
- BMI: 24.5
- State: California

**Pregnancy History:**
- 2 pregnancies, 2 live births
- Both full-term vaginal deliveries
- No complications

**Medical:**
- No medical conditions
- No medications
- Non-smoker, non-vaper

**Background:**
- Clean background
- No criminal history

**Expected Result:**
- Summary should have "⭐ GOLD STAR" in header
- `is_gold_star: true` in response
- Email sent to intake team
- Zoho checkbox `Is_Gold_Star_Applicant` checked

---

## Troubleshooting

### Email Not Sending

**Check 1: Environment Variables**
```bash
# Verify variables are set in Vercel
vercel env ls
```

Should show:
- ✓ ANTHROPIC_API_KEY
- ✓ RESEND_API_KEY
- ✓ INTAKE_TEAM_EMAIL
- ✓ SEND_GOLD_STAR_EMAILS

**Check 2: Vercel Function Logs**
1. Go to Vercel Dashboard
2. Click your project
3. Go to Deployments → Latest → Functions
4. Click `/api/process-application`
5. Look for:
   - ✓ "Gold star email sent successfully to: [email]"
   - ✗ "RESEND_API_KEY not set - skipping"
   - ✗ "Failed to send gold star email: [error]"

**Check 3: Resend Dashboard**
1. Go to https://resend.com/emails
2. Check recent emails
3. Look for delivery status:
   - ✓ Delivered
   - ✗ Bounced
   - ✗ Failed

### Email Going to Spam

**Fix: Update SPF/DKIM Records**
- Verify DNS records are correct in Resend dashboard
- Add DMARC policy
- Wait 24-48 hours for DNS propagation

**Fix: Whitelist Sender**
- Add `notifications@alceasurrogacy.com` to safe senders

### Wrong "From" Address

Update line 312 in `process-surrogate-application.js`:

```javascript
from: 'Alcea Surrogacy <notifications@alceasurrogacy.com>',
```

Change to your verified domain email.

### Multiple Emails Sent

Emails are sent once per application processing. If you're getting duplicates:
- Check if Zoho workflow is triggering multiple times
- Check Vercel function logs for multiple invocations

---

## Customizing the Email

### Change Email Subject

Edit line 314 in `process-surrogate-application.js`:

```javascript
subject: `⭐ Gold Star Applicant: ${candidateName}`,
```

### Change Email Colors

Edit the `<style>` section (lines 260-266):

```javascript
.header { background-color: #7d2431; color: white; padding: 20px; }
.highlight { background-color: #fff4e6; border-left: 4px solid #e1b321; }
```

Colors:
- `#7d2431` - Ruby red (header background)
- `#e1b321` - Mustard yellow (highlight border)

### Change Recipient Email

Update environment variable `INTAKE_TEAM_EMAIL` in Vercel.

To send to multiple recipients, edit line 313:

```javascript
to: ['intake@alceasurrogacy.com', 'backup@alceasurrogacy.com'],
```

---

## Disabling Email Notifications

### Temporary Disable

Set environment variable in Vercel:
```
SEND_GOLD_STAR_EMAILS = false
```

Or remove the variable entirely.

### Permanent Disable

Remove lines 37-40 in `process-surrogate-application.js`:

```javascript
// If gold star applicant, send email notification
if (summary.is_gold_star && process.env.SEND_GOLD_STAR_EMAILS === 'true') {
  await sendGoldStarEmail(applicationData, summary);
}
```

---

## Cost Estimate

**Resend Free Tier:**
- 100 emails/day
- 1 domain
- API access

**If you exceed free tier:**
- $20/month for 50,000 emails/month
- ~$0.0004 per email

**Typical Usage:**
- 5-10 gold star applicants per month
- Well within free tier limits

---

## Security Notes

### API Key Security
- **Never** commit API keys to git
- Store only in Vercel environment variables
- Rotate keys every 90 days

### Email Content
- Be mindful that full summaries are in emails
- Use encrypted email if required by compliance
- Consider HIPAA requirements for medical data

### Email Delivery
- Emails are sent via HTTPS to Resend
- Resend uses TLS for email delivery
- Logs may contain email addresses (review Resend privacy policy)

---

## Support

### Resend Support
- Docs: https://resend.com/docs
- Status: https://status.resend.com/
- Email: support@resend.com

### Email Deliverability Issues
- Check DNS propagation: https://dnschecker.org/
- Verify SPF: https://mxtoolbox.com/spf.aspx
- Test email headers: https://mxtoolbox.com/EmailHeaders.aspx

---

## Quick Reference

### Important Files
- Email function: `api-functions/process-surrogate-application.js` (lines 228-331)
- Deluge script: `api-functions/zoho-deluge-webhook.txt` (line 185)

### Gold Star Criteria Location
- Prompt: `process-surrogate-application.js` (lines 149-158)

### Environment Variables
```bash
# View all environment variables
vercel env ls

# Add new variable
vercel env add VARIABLE_NAME

# Remove variable
vercel env rm VARIABLE_NAME
```

### Testing Command
```bash
# Test locally with environment variables
vercel dev
```

Then send POST request to `http://localhost:3000/api/process-application` with test data.
