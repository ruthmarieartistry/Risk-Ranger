# Zoho Creator Field Setup Guide

**Last Updated:** October 21, 2025

Complete guide for setting up your Surrogate Application form with AI summary fields.

---

## Step 1: Add AI Summary Fields to Form

Go to your **Surrogate Application** form → **Edit Form** → Add these fields:

### Section Header: "AI-Generated Summary"
Add a section divider with this title

---

### Field 1: Candidate Summary (Primary Summary Field)

| Property | Value |
|----------|-------|
| **Field Label** | Candidate Summary |
| **Field Link Name** | `Candidate_Summary` |
| **Field Type** | Multi-line Text |
| **Width** | Large (or Full Width) |
| **Height** | 500px (to show full summary) |
| **Properties** | ☑ Read Only |
| **Properties** | ☑ Rich Text enabled |
| **Default Value** | (empty) |
| **Help Text** | AI-generated summary of application |

---

### Field 2: Gold Star Applicant

| Property | Value |
|----------|-------|
| **Field Label** | ⭐ Gold Star Applicant |
| **Field Link Name** | `Is_Gold_Star_Applicant` |
| **Field Type** | Checkbox |
| **Default Value** | Unchecked |
| **Properties** | ☑ Read Only |
| **Help Text** | Exceptional candidate meeting all ideal criteria |

---

### Field 3: Summary Generated

| Property | Value |
|----------|-------|
| **Field Label** | Summary Generated |
| **Field Link Name** | `Summary_Generated` |
| **Field Type** | Checkbox |
| **Default Value** | Unchecked |
| **Properties** | ☑ Read Only |
| **Help Text** | Indicates if AI summary has been generated |

---

### Field 4: Summary Date

| Property | Value |
|----------|-------|
| **Field Label** | Summary Generated On |
| **Field Link Name** | `Summary_Date` |
| **Field Type** | Date-Time |
| **Properties** | ☑ Read Only |
| **Help Text** | When the summary was generated |

---

### Section Header: "Quick Filter Fields"
Add another section divider

---

### Field 5: Extracted Age

| Property | Value |
|----------|-------|
| **Field Label** | Age |
| **Field Link Name** | `Extracted_Age` |
| **Field Type** | Number |
| **Properties** | ☑ Read Only |
| **Help Text** | Age extracted from application |

---

### Field 6: Extracted BMI

| Property | Value |
|----------|-------|
| **Field Label** | BMI |
| **Field Link Name** | `Extracted_BMI` |
| **Field Type** | Decimal |
| **Decimal Places** | 1 |
| **Properties** | ☑ Read Only |
| **Help Text** | BMI extracted from application |

---

### Field 7: Extracted State

| Property | Value |
|----------|-------|
| **Field Label** | State |
| **Field Link Name** | `Extracted_State` |
| **Field Type** | Single Line |
| **Properties** | ☑ Read Only |
| **Help Text** | State extracted from application |

---

### Field 8: Experienced Surrogate Status

| Property | Value |
|----------|-------|
| **Field Label** | Surrogate Experience |
| **Field Link Name** | `Experienced_Surrogate_Status` |
| **Field Type** | Single Line |
| **Properties** | ☑ Read Only |
| **Help Text** | First-time or Experienced |

---

### Section Header: "Application Flags"
Add another section divider

---

### Field 9: Has Medical Flags

| Property | Value |
|----------|-------|
| **Field Label** | ⚠️ Medical Flags |
| **Field Link Name** | `Has_Medical_Flags` |
| **Field Type** | Checkbox |
| **Default Value** | Unchecked |
| **Properties** | ☑ Read Only |
| **Help Text** | Medical conditions or concerns identified |

---

### Field 10: Has Background Flags

| Property | Value |
|----------|-------|
| **Field Label** | ⚠️ Background Flags |
| **Field Link Name** | `Has_Background_Flags` |
| **Field Type** | Checkbox |
| **Default Value** | Unchecked |
| **Properties** | ☑ Read Only |
| **Help Text** | Background check concerns identified |

---

### Field 11: Has Preterm History

| Property | Value |
|----------|-------|
| **Field Label** | ⚠️ Preterm History |
| **Field Link Name** | `Has_Preterm_History` |
| **Field Type** | Checkbox |
| **Default Value** | Unchecked |
| **Properties** | ☑ Read Only |
| **Help Text** | History of preterm deliveries |

---

## Step 2: Add Application Status Field

**Add this BEFORE the AI Summary section** (top of form or near applicant info)

### Field: Application Status

| Property | Value |
|----------|-------|
| **Field Label** | Application Status |
| **Field Link Name** | `Application_Status` |
| **Field Type** | Dropdown |
| **Choices** | See below |
| **Default Value** | New Application |
| **Properties** | ☐ Read Only (you want to be able to change this manually) |
| **Help Text** | Current status of this application |

**Dropdown Choices:**
```
🆕 New Application
⭐ Gold Star - Fast Track
🔍 Under Review
✅ Approved for Matching
📞 Contacted
🤝 In Process
⏸️ On Hold
❌ Declined
📁 Archived
```

---

## Step 3: Field Display Logic (Optional)

To keep the form clean, you can hide AI fields until they're populated:

**Show "Candidate Summary" field only when:**
- `Summary_Generated` = Yes

**Show all flag fields only when:**
- `Summary_Generated` = Yes

This keeps the form cleaner for applicants filling it out.

---

## Step 4: Form Layout Recommendations

**Suggested order:**

1. **Top Section:** Applicant basic info
2. **Middle Sections:** All your existing application questions
3. **Bottom Section 1:** Application Status dropdown
4. **Bottom Section 2:** AI-Generated Summary (with all AI fields)
5. **Bottom Section 3:** Quick Filter Fields
6. **Bottom Section 4:** Application Flags

**Or use tabs:**
- Tab 1: Application Form
- Tab 2: AI Summary & Review

---

## Visual Preview

When populated, your form will look like this at the bottom:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 AI-GENERATED SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Candidate Summary - Large text box with formatted summary]

⭐ Gold Star Applicant:  ☑ Yes
Summary Generated:       ☑ Yes
Summary Generated On:    Oct 21, 2025 3:41 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 QUICK FILTER FIELDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Age: 30
BMI: 23.4
State: California
Surrogate Experience: First-time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚩 APPLICATION FLAGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Medical Flags:      ☐ No
⚠️ Background Flags:   ☐ No
⚠️ Preterm History:    ☐ No
```

---

## Step 5: Save and Test

1. Click **Save** on the form
2. Submit a test application
3. Verify all fields populate correctly
4. Check that read-only fields can't be edited

---

## Next Steps

After adding these fields:

1. ✅ Add the Deluge webhook script (see `zoho-deluge-webhook.txt`)
2. ✅ Create reports and views (see `ZOHO_REPORTS_SETUP.md`)
3. ✅ Set up status workflows (see `ZOHO_WORKFLOWS_SETUP.md`)

---

## Field Summary Table

Quick reference of all AI fields:

| Field Link Name | Type | Purpose |
|----------------|------|---------|
| `Candidate_Summary` | Multi-line Text | Full formatted AI summary |
| `Is_Gold_Star_Applicant` | Checkbox | Gold star indicator |
| `Summary_Generated` | Checkbox | Processing status |
| `Summary_Date` | Date-Time | When processed |
| `Extracted_Age` | Number | Age for filtering |
| `Extracted_BMI` | Decimal | BMI for filtering |
| `Extracted_State` | Single Line | State for filtering |
| `Experienced_Surrogate_Status` | Single Line | First-time or Experienced |
| `Has_Medical_Flags` | Checkbox | Medical concerns flag |
| `Has_Background_Flags` | Checkbox | Background concerns flag |
| `Has_Preterm_History` | Checkbox | Preterm delivery flag |
| `Application_Status` | Dropdown | Current status in pipeline |

---

## Troubleshooting

### Fields not populating?
- Check Deluge script is enabled
- Check webhook URL is correct
- Check Vercel function logs
- Check field link names match exactly

### Summary text looks wrong?
- Make sure "Rich Text" is enabled on Candidate_Summary field
- Check field height is tall enough (500px recommended)

### Can edit read-only fields?
- Re-check the "Read Only" checkbox is checked
- Save the form again
- Clear browser cache

---

**Need help?** Check the Deluge script in `zoho-deluge-webhook.txt` or the main setup guide in `SETUP_GUIDE.md`.
