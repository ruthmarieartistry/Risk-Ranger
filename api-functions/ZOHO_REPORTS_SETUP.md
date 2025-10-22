# Zoho Creator Reports & Views Setup

**Last Updated:** October 21, 2025

Complete guide for creating powerful reports and views for your AI-enhanced surrogate application tracking.

---

## Report 1: ⭐ Gold Star Dashboard

**Purpose:** Quick view of all exceptional candidates for fast-track processing

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | Gold Star Dashboard |
| **Report Type** | List Report |
| **Based on** | Surrogate Application form |

### Criteria (Filters)

```
Is_Gold_Star_Applicant = Yes
AND
Summary_Generated = Yes
```

### Columns to Display

| Column | Width | Position |
|--------|-------|----------|
| Name (First + Last combined) | 200px | 1 |
| Age (from Extracted_Age) | 60px | 2 |
| BMI (from Extracted_BMI) | 60px | 3 |
| State (from Extracted_State) | 100px | 4 |
| Experienced_Surrogate_Status | 120px | 5 |
| Application_Status | 150px | 6 |
| Summary_Date | 120px | 7 |
| Candidate_Summary (first 100 chars) | 300px | 8 |

### Sorting

```
Primary: Summary_Date (Descending - newest first)
Secondary: Extracted_Age (Ascending)
```

### Grouping

```
Group by: Application_Status
```

### Styling

- Add ⭐ icon in column header
- Highlight rows in light gold (#FFF9E6)
- Bold applicant names

---

## Report 2: 🚩 Review Queue

**Purpose:** Applications with flags that need closer review

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | Review Queue - Flagged Applications |
| **Report Type** | List Report |
| **Based on** | Surrogate Application form |

### Criteria (Filters)

```
(Has_Medical_Flags = Yes
OR Has_Background_Flags = Yes
OR Has_Preterm_History = Yes)
AND
Is_Gold_Star_Applicant = No
AND
Application_Status NOT IN ("Declined", "Archived")
```

### Columns to Display

| Column | Width | Position |
|--------|-------|----------|
| Name | 200px | 1 |
| Age | 60px | 2 |
| BMI | 60px | 3 |
| State | 100px | 4 |
| ⚠️ Medical | 80px | 5 |
| ⚠️ Background | 80px | 6 |
| ⚠️ Preterm | 80px | 7 |
| Application_Status | 150px | 8 |
| Candidate_Summary | 300px | 9 |

### Conditional Formatting

**Medical Flags column:**
- If checked: Red background (#FFE6E6)

**Background Flags column:**
- If checked: Orange background (#FFF0E6)

**Preterm History column:**
- If checked: Yellow background (#FFFBE6)

### Sorting

```
Primary: Number of flags (most flagged first)
Secondary: Summary_Date (Descending)
```

### Summary Row

```
Total Count: COUNT of applications
Avg Age: AVERAGE of Extracted_Age
Avg BMI: AVERAGE of Extracted_BMI
```

---

## Report 3: 📋 All Applications Master List

**Purpose:** Complete list with powerful filtering options

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | All Applications - Master List |
| **Report Type** | List Report |
| **Based on** | Surrogate Application form |

### Criteria (Filters)

```
Summary_Generated = Yes
(show all processed applications)
```

### Columns to Display

| Column | Width | Position |
|--------|-------|----------|
| ID | 60px | 1 |
| Name | 180px | 2 |
| Age | 60px | 3 |
| BMI | 60px | 4 |
| State | 100px | 5 |
| ⭐ Gold Star | 80px | 6 |
| Experienced | 100px | 7 |
| 🚩 Flags (count) | 80px | 8 |
| Application_Status | 140px | 9 |
| Summary_Date | 120px | 10 |

### Filter Options (Add these as quick filters)

```
☐ Gold Star Only
☐ First-time Only
☐ Experienced Only
☐ Has Medical Flags
☐ Has Background Flags
☐ Has Preterm History

State: [Dropdown with all states]
Age Range: [Slider 18-45]
BMI Range: [Slider 18-35]
Status: [Multi-select dropdown]
```

### Sorting

```
Default: Is_Gold_Star_Applicant DESC, Summary_Date DESC
(Gold stars first, then by newest)
```

### Grouping Options

Allow user to group by:
- State
- Application_Status
- Experienced_Surrogate_Status
- Is_Gold_Star_Applicant

---

## Report 4: 📊 Analytics Dashboard

**Purpose:** High-level metrics and trends

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | Application Analytics |
| **Report Type** | Summary Report |
| **Based on** | Surrogate Application form |

### Metrics to Display

**Card 1: Total Applications**
```
COUNT of all applications where Summary_Generated = Yes
```

**Card 2: Gold Star Rate**
```
(COUNT of Is_Gold_Star_Applicant = Yes) / (COUNT of all) * 100
Display as: "15.2% Gold Star"
```

**Card 3: Average Age**
```
AVERAGE of Extracted_Age
Display as: "32.4 years"
```

**Card 4: Average BMI**
```
AVERAGE of Extracted_BMI
Display as: "24.8"
```

**Card 5: Medical Flag Rate**
```
(COUNT of Has_Medical_Flags = Yes) / (COUNT of all) * 100
Display as: "22.5% with medical flags"
```

**Card 6: Experienced Rate**
```
(COUNT of Experienced_Surrogate_Status = "Experienced") / (COUNT of all) * 100
Display as: "35% experienced surrogates"
```

### Charts

**Chart 1: Applications by State (Pie Chart)**
```
Group by: Extracted_State
Value: COUNT
Top 10 states only
```

**Chart 2: Applications Over Time (Line Chart)**
```
X-axis: Summary_Date (grouped by week)
Y-axis: COUNT
Color: Is_Gold_Star_Applicant (two lines)
```

**Chart 3: Age Distribution (Bar Chart)**
```
X-axis: Extracted_Age (grouped in 5-year ranges)
Y-axis: COUNT
Color by: Is_Gold_Star_Applicant
```

**Chart 4: Status Breakdown (Horizontal Bar)**
```
Categories: Application_Status
Value: COUNT
Color by status type
```

---

## Report 5: 🎯 By State Report

**Purpose:** Track applications by geographic location

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | Applications by State |
| **Report Type** | Summary Report |
| **Based on** | Surrogate Application form |

### Grouping

```
Group by: Extracted_State
```

### Columns

| Column | Calculation |
|--------|-------------|
| State | Extracted_State |
| Total Apps | COUNT |
| Gold Star | COUNT(Is_Gold_Star_Applicant = Yes) |
| Avg Age | AVERAGE(Extracted_Age) |
| Avg BMI | AVERAGE(Extracted_BMI) |
| % Experienced | % where Experienced_Surrogate_Status = "Experienced" |
| % Flagged | % where any flag = Yes |

### Sorting

```
Order by: Total Apps (Descending)
```

---

## Report 6: 🔍 First-Time vs Experienced

**Purpose:** Compare first-time and experienced applicants

### Settings

| Property | Value |
|----------|-------|
| **Report Name** | First-Time vs Experienced Comparison |
| **Report Type** | Summary Report |
| **Based on** | Surrogate Application form |

### Grouping

```
Group by: Experienced_Surrogate_Status
```

### Metrics per Group

| Metric | Calculation |
|--------|-------------|
| Total Count | COUNT |
| Gold Star Count | COUNT(Is_Gold_Star_Applicant = Yes) |
| Gold Star % | % where Is_Gold_Star_Applicant = Yes |
| Avg Age | AVERAGE(Extracted_Age) |
| Avg BMI | AVERAGE(Extracted_BMI) |
| Medical Flags % | % where Has_Medical_Flags = Yes |
| Background Flags % | % where Has_Background_Flags = Yes |

### Chart

Side-by-side comparison bar chart showing all metrics

---

## Kanban View: Application Pipeline

**Purpose:** Visual drag-and-drop pipeline management

### Settings

| Property | Value |
|----------|-------|
| **View Name** | Application Pipeline Board |
| **View Type** | Kanban |
| **Based on** | Surrogate Application form |
| **Kanban Field** | Application_Status |

### Columns (Statuses)

```
1. 🆕 New Application
2. ⭐ Gold Star - Fast Track
3. 🔍 Under Review
4. ✅ Approved for Matching
5. 📞 Contacted
6. 🤝 In Process
7. ⏸️ On Hold
```

(Don't show "Declined" or "Archived" - those go to separate views)

### Card Display

**Card Title:** Name
**Card Subtitle:** Age, BMI, State
**Card Footer:** Summary_Date

**Card Icons:**
- ⭐ if Is_Gold_Star_Applicant = Yes
- ⚠️ if any flag = Yes (show count)

**Card Color:**
- Gold: Gold Star applicants
- Light red: Has flags
- White: Clean, not gold star

### Filters

```
☐ Show only Gold Star
☐ Show only Flagged
☐ Show only First-time
☐ Show only Experienced
```

---

## Calendar View: Submission Timeline

**Purpose:** See when applications come in

### Settings

| Property | Value |
|----------|-------|
| **View Name** | Application Submission Calendar |
| **View Type** | Calendar |
| **Date Field** | Summary_Date |

### Event Display

**Event Title:** Name
**Event Description:**
```
Age: [Age] | BMI: [BMI]
[⭐ if gold star]
[State]
```

**Event Color:**
- Gold: Gold Star
- Red: Flagged
- Blue: Clean

---

## Quick Access Buttons

Add these buttons to your form for quick navigation:

```
[View All Gold Star] → Opens Gold Star Dashboard
[View Review Queue] → Opens Review Queue
[View My Applications] → Filtered to logged-in user
[View Analytics] → Opens Analytics Dashboard
```

---

## Email/Export Templates

### Gold Star Application Email Template

**Subject:** ⭐ New Gold Star Applicant: ${Name}

**Body:**
```
A new gold star applicant has been received:

Name: ${Name}
Age: ${Extracted_Age}
BMI: ${Extracted_BMI}
State: ${Extracted_State}
Experience: ${Experienced_Surrogate_Status}

Summary:
${Candidate_Summary}

View full application: [Link to record]
```

### Weekly Summary Report

Send every Monday morning:

**Subject:** Weekly Application Summary - Week of ${Date}

**Body:**
```
Applications This Week: ${COUNT}
Gold Star Applicants: ${Gold Star COUNT}
Applications Under Review: ${Review COUNT}

Top States:
1. ${State 1}: ${Count}
2. ${State 2}: ${Count}
3. ${State 3}: ${Count}

[View Full Report]
```

---

## Mobile App Views

If using Zoho Creator mobile app:

### Mobile View 1: Quick List
```
Show: Name, Age, State, Gold Star icon, Status
Tap action: Open full record
```

### Mobile View 2: Review Mode
```
Show: Candidate_Summary (full text)
Bottom buttons: [Approve] [Review] [Decline]
```

---

## Report Permissions

Set access controls:

| Report | Who Can View |
|--------|-------------|
| Gold Star Dashboard | All team members |
| Review Queue | Medical reviewers, Admins |
| All Applications | Admins only |
| Analytics | Managers, Admins |

---

## Next Steps

1. Create these reports in Zoho Creator
2. Add to your app's home page
3. Set up automated email subscriptions
4. Train team on how to use each view

---

**Pro Tip:** Create a custom home page with:
- Analytics cards at top
- Gold Star Dashboard below
- Quick action buttons
- Recent applications widget
