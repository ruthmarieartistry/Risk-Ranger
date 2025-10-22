# Testing the AI Application Processor
## Sample Data and Expected Output

---

## Sample Application Input

Use this test data to verify the system is working correctly:

```
SURROGATE APPLICATION

PERSONAL INFORMATION:
Name: Jane Marie Smith
Goes By: Jane
Preferred Pronouns: She/Her
Date of Birth: 05/15/1992
Age: 32
Height: 5'6"
Weight: 145 lbs
BMI: 23.4
Relationship Status: Married
Employment Status: Employed
Job Title: Elementary School Teacher
Street Address: 123 Oak Street
City: Austin
State: Texas
ZIP: 78701
Previous Surrogate: No
Number of Previous Journeys: 0

PREGNANCY HISTORY:
Number of Pregnancies: 4
Number of Live Births: 3
Number of Miscarriages: 1
Miscarriage Details: One miscarriage at 8 weeks in 2019, first trimester, D&C performed
Number of Abortions: 0
Pregnancy Details/Complications:
Pregnancy 1 (2015): Full-term vaginal delivery at 40 weeks, 7 lbs 4 oz, no complications
Pregnancy 2 (2017): Gestational diabetes (diet-controlled), induced at 39 weeks, vaginal delivery, 8 lbs 2 oz
Pregnancy 3 (2019): Miscarriage at 8 weeks, D&C performed
Pregnancy 4 (2021): Full-term vaginal delivery at 39 weeks, 7 lbs 11 oz, no complications

MEDICAL HISTORY:
Current Medical Conditions: Hypothyroidism (well-controlled)
Current Medications: Levothyroxine 50mcg daily
Allergies: Penicillin (causes rash)
Previous Surgeries: Tonsillectomy at age 12, D&C in 2019
Mental Health History: No history of mental health conditions
Smoking Status: Non-smoker
Vaping Status: Non-vaper
Alcohol Use: Occasional social drinking (1-2 drinks per month)
Drug Use: None
Dietary Restrictions: None

HOUSEHOLD INFORMATION:
Type of Home: Single-family home
Home Ownership: Own
Number of Adults in Home: 2
Number of Children in Home: 3
Children Ages: 8, 6, 3
Smoke-Free Home: Yes
Pets: Yes
Pet Details: One dog (Labrador, 5 years old, well-behaved), two cats (indoor only, 3 and 2 years old)
Firearms in Home: Yes
Firearm Storage/Licensing: Locked in gun safe, husband has concealed carry license

OB/GYN INFORMATION:
Current Birth Control: IUD (Mirena)
Birth Control Details: Placed in 2021 after last pregnancy
Currently Breastfeeding: No

BACKGROUND INFORMATION:
Criminal History (Self): No
Criminal History (Partner): No
```

---

## Expected Output

### Formatted Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANDIDATE APPLICATION SUMMARY
Generated: October 21, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:                      Jane Marie Smith
Goes By:                   Jane
Preferred Pronouns:        She/Her
Age:                       32 years old
BMI:                       23.4
Relationship Status:       Married
Employment:                Employed (Elementary School Teacher)
State:                     Texas
Experienced Surrogate:     No (First-time)

🤰 PREGNANCY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Pregnancies:         4
Total Deliveries:          3
Miscarriages:              1 (at 8 weeks, first trimester)
Abortions:                 None
Surrogacy Pregnancies:     None
Preterm Deliveries:        No preterm deliveries

Additional Notes:
• Pregnancy 1 (2015): Full-term vaginal delivery at 40 weeks,
  birth weight 7 lbs 4 oz, no complications
• Pregnancy 2 (2017): Gestational Diabetes Mellitus (diet-controlled),
  induced labor at 39 weeks, vaginal delivery, birth weight 8 lbs 2 oz
• Pregnancy 3 (2019): Miscarriage at 8 weeks (first trimester),
  Dilation and Curettage performed
• Pregnancy 4 (2021): Full-term vaginal delivery at 39 weeks,
  birth weight 7 lbs 11 oz, no complications

🏥 MEDICAL HISTORY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Hypothyroidism - Levothyroxine 50mcg daily (well-controlled)
⚠️ History of Gestational Diabetes Mellitus in 2nd pregnancy
   (diet-controlled, resolved after delivery)
⚠️ Penicillin allergy (causes rash)
✓ Non-smoker
✓ Non-vaper
✓ No dietary restrictions
✓ Occasional social alcohol use (1-2 drinks per month)
✓ No recreational drug use

Previous Surgeries:
• Tonsillectomy at age 12
• Dilation and Curettage in 2019

🏠 HOUSEHOLD SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Home Type:                 Single-family home (owned)
Total Adults:              2
Total Children:            3 (ages 8, 6, 3)
Smoke-Free Home:           Yes

Pets:
• 1 dog (Labrador, 5 years old, well-behaved)
• 2 cats (indoor only, ages 3 and 2)

Firearms:                  Yes - securely locked in gun safe,
                          partner has concealed carry license

👩‍⚕️ OB/GYN SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Birth Control:             Intrauterine Device (Mirena),
                          placed 2021 after last pregnancy
Breastfeeding:             Not currently breastfeeding

📋 BACKGROUND SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Self:                      Clean self-reported background history
Partner:                   Clean self-reported background history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Extracted Fields

```json
{
  "age": 32,
  "bmi": 23.4,
  "state": "Texas",
  "experienced_surrogate": "First-time",
  "has_medical_flags": true,
  "has_background_flags": false,
  "has_preterm_history": false
}
```

---

## Verification Checklist

After submitting the test application, verify:

### ✅ Summary Field Populated
- [ ] `Candidate_Summary` field contains formatted text
- [ ] Text includes all section headers with emojis
- [ ] Table format is maintained with proper alignment
- [ ] Medical abbreviations are spelled out (Gestational Diabetes, not GD)

### ✅ Meta Fields Updated
- [ ] `Summary_Generated` is checked (Yes)
- [ ] `Summary_Date` shows current date/time

### ✅ Extracted Fields Correct
- [ ] `Extracted_Age` = 32
- [ ] `Extracted_BMI` = 23.4
- [ ] `Extracted_State` = "Texas"
- [ ] `Experienced_Surrogate_Status` = "First-time"

### ✅ Flag Fields Accurate
- [ ] `Has_Medical_Flags` is checked (Yes) - because of hypothyroidism, GD history, allergy
- [ ] `Has_Background_Flags` is NOT checked (No) - clean background
- [ ] `Has_Preterm_History` is NOT checked (No) - no preterm deliveries

### ✅ Formatting Quality
- [ ] Unicode characters display correctly (━, ⚠️, ✓, 👤, etc.)
- [ ] Alignment is consistent
- [ ] No truncated text
- [ ] Professional appearance

---

## Testing Different Scenarios

### Scenario 1: Clean Candidate (Minimal Flags)

**Input:**
- First-time surrogate
- 2 uncomplicated pregnancies
- No medical conditions
- No smoking/vaping
- Clean background

**Expected:**
- `has_medical_flags` = false
- Medical section shows: "Generally healthy with nothing of note"
- All checkmarks (✓) in medical section

### Scenario 2: Experienced Surrogate

**Input:**
- Previous surrogate with 1 completed journey
- 4 pregnancies (2 own, 2 surrogacy)
- Good health

**Expected:**
- `experienced_surrogate` = "Experienced"
- Surrogacy Pregnancies section shows: "2 (details...)"

### Scenario 3: Medical Concerns

**Input:**
- Preeclampsia in 1st pregnancy
- Currently on blood pressure medication
- Smoker

**Expected:**
- `has_medical_flags` = true
- Multiple ⚠️ symbols in medical section
- Preeclampsia spelled out fully

### Scenario 4: Preterm History

**Input:**
- 1 preterm delivery at 34 weeks

**Expected:**
- `has_preterm_history` = true
- Preterm Deliveries section shows: "1 delivery at 34 weeks (reason if noted)"

### Scenario 5: Background Issues

**Input:**
- DUI conviction from 2018 (partner)

**Expected:**
- `has_background_flags` = true
- Background Summary shows details instead of "Clean"

---

## Manual Testing Procedure

### Step 1: Submit Test Application

1. Go to Zoho Creator application form
2. Fill in test data (use sample above or create your own)
3. Click Submit
4. Wait 10-30 seconds for processing

### Step 2: Verify in Zoho

1. Go to Applications report/list view
2. Find your test application
3. Open the detail view
4. Scroll to "AI Generated Summary" section

### Step 3: Check All Fields

Use the verification checklist above to confirm:
- Summary text is formatted correctly
- All extracted fields are populated
- Flags are accurate

### Step 4: Test List View Filtering

1. Create a report with columns:
   - Name
   - Age (Extracted_Age)
   - State (Extracted_State)
   - Medical Flags (Has_Medical_Flags)
   - Experience (Experienced_Surrogate_Status)

2. Test filters:
   - Filter by State = "Texas"
   - Filter by Has_Medical_Flags = Yes
   - Filter by Experienced_Surrogate_Status = "First-time"

3. Verify filtering works correctly

---

## Troubleshooting Test Failures

### Summary Field is Empty

**Check:**
1. Deluge script logs for errors
2. Vercel function logs for invocations
3. Environment variable `ANTHROPIC_API_KEY` is set
4. Webhook URL in Deluge script is correct

### Summary Has Wrong Format

**Check:**
1. Claude API response in Vercel logs
2. Prompt template in `process-application.js`
3. Application text being sent (check Deluge info logs)

### Extracted Fields Not Populated

**Check:**
1. Field names in Deluge script match Zoho field link names
2. Claude JSON response structure
3. Response parsing in serverless function

### Unicode Characters Don't Display

**Issue:** Emojis and special characters show as boxes/question marks

**Solution:**
- Ensure Zoho field is set to "Rich Text" format
- Check database encoding is UTF-8
- May need to use HTML entities instead of Unicode

---

## Performance Benchmarks

**Expected Processing Times:**

| Metric | Target | Acceptable |
|--------|--------|------------|
| Function execution | < 5 seconds | < 15 seconds |
| Total time to update record | < 10 seconds | < 30 seconds |
| Summary length | 1,500-3,000 chars | < 5,000 chars |

**Monitor:**
- If processing takes > 30 seconds consistently, check Claude API response times
- If summaries are too short (< 500 chars), check prompt or input data
- If summaries are too long (> 5,000 chars), may need to truncate sections

---

## Success Criteria

The system is working correctly when:

✅ 100% of submissions generate a summary
✅ Summaries are formatted consistently
✅ Medical abbreviations are fully spelled out
✅ Extracted fields match application data
✅ Flags accurately reflect content
✅ Processing completes within 30 seconds
✅ No errors in Deluge or Vercel logs

---

**End of Testing Guide**

*Use this document to verify system functionality after initial setup and after any updates*

---

**Version:** 1.0
**Last Updated:** October 21, 2025
