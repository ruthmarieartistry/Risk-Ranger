# Zoho Creator Workflow Automations

**Last Updated:** October 21, 2025

Complete guide for setting up automated workflows to manage your surrogate application pipeline.

---

## Workflow 1: Auto-Set Status on Submit

**Purpose:** Automatically set the application status based on AI analysis

### Trigger

```
Event: On Successful Form Submission
Form: Surrogate Application
When: After AI summary is generated (add to existing webhook script)
```

### Deluge Script

Add this to the **END** of your existing `zoho-deluge-webhook.txt` script (after the AI summary updates):

```javascript
// ============================================
// STEP 5: Auto-set Application Status
// ============================================

if(isGoldStar == true) {
    // Gold star applicants go to fast track
    input.Application_Status = "⭐ Gold Star - Fast Track";

} else if(extractedFields.get("has_medical_flags") == true
          || extractedFields.get("has_background_flags") == true
          || extractedFields.get("has_preterm_history") == true) {
    // Flagged applicants go to review
    input.Application_Status = "🔍 Under Review";

} else {
    // Clean applicants but not gold star
    input.Application_Status = "🆕 New Application";
}

info "Application status set to: " + input.Application_Status;
```

---

## Workflow 2: Gold Star Email Notification (Zoho)

**Purpose:** Send Zoho email notification when gold star applicant submits (in addition to Resend email)

### Trigger

```
Event: On Update
Form: Surrogate Application
Condition: Is_Gold_Star_Applicant = Yes
```

### Deluge Script

```javascript
// Get applicant details
applicantName = input.First_Name + " " + input.Last_Name;
applicantAge = input.Extracted_Age;
applicantBMI = input.Extracted_BMI;
applicantState = input.Extracted_State;

// Email configuration
toEmail = "intake@alceasurrogacy.com";
ccEmail = "manager@alceasurrogacy.com";
subject = "⭐ Gold Star Applicant Received: " + applicantName;

// Email body
message = "A new gold star surrogate applicant has been received!<br><br>";
message = message + "<strong>Applicant Details:</strong><br>";
message = message + "Name: " + applicantName + "<br>";
message = message + "Age: " + applicantAge + "<br>";
message = message + "BMI: " + applicantBMI + "<br>";
message = message + "State: " + applicantState + "<br>";
message = message + "Experience: " + input.Experienced_Surrogate_Status + "<br><br>";
message = message + "<strong>Why Gold Star:</strong><br>";
message = message + "✓ Age 25-38<br>";
message = message + "✓ BMI 19-28<br>";
message = message + "✓ At least 1 successful pregnancy<br>";
message = message + "✓ Max 1 C-section<br>";
message = message + "✓ No preterm deliveries<br>";
message = message + "✓ No medical conditions<br>";
message = message + "✓ Non-smoker<br>";
message = message + "✓ Clean background<br><br>";
message = message + "<strong>AI Summary:</strong><br>";
message = message + "<pre>" + input.Candidate_Summary + "</pre><br>";
message = message + "<a href='" + input.ID.getSuffix("app-link") + "'>View Full Application</a>";

// Send email
sendmail
[
    from: zoho.adminuserid
    to: toEmail
    cc: ccEmail
    subject: subject
    message: message
]

info "Gold star notification email sent to " + toEmail;
```

---

## Workflow 3: Flag Review Assignment

**Purpose:** Automatically assign flagged applications to appropriate reviewer

### Trigger

```
Event: On Update
Form: Surrogate Application
Condition: (Has_Medical_Flags = Yes OR Has_Background_Flags = Yes OR Has_Preterm_History = Yes)
           AND Application_Status = "🔍 Under Review"
```

### Deluge Script

```javascript
// Determine which reviewer to assign based on flags
reviewerEmail = "";
flagTypes = "";

if(input.Has_Medical_Flags == true) {
    reviewerEmail = "medical.reviewer@alceasurrogacy.com";
    flagTypes = flagTypes + "Medical concerns, ";
}

if(input.Has_Background_Flags == true) {
    // If already assigned to medical, CC background reviewer
    // Otherwise assign to background reviewer
    if(reviewerEmail == "") {
        reviewerEmail = "background.reviewer@alceasurrogacy.com";
    }
    flagTypes = flagTypes + "Background concerns, ";
}

if(input.Has_Preterm_History == true) {
    // Preterm goes to medical reviewer
    if(reviewerEmail == "") {
        reviewerEmail = "medical.reviewer@alceasurrogacy.com";
    }
    flagTypes = flagTypes + "Preterm history, ";
}

// Remove trailing comma
flagTypes = flagTypes.removeLastOccurence(", ");

// Send assignment email
applicantName = input.First_Name + " " + input.Last_Name;
subject = "🚩 Application Review Needed: " + applicantName;

message = "A surrogate application requires your review.<br><br>";
message = message + "<strong>Applicant:</strong> " + applicantName + "<br>";
message = message + "<strong>Flags:</strong> " + flagTypes + "<br><br>";
message = message + "<strong>Quick Details:</strong><br>";
message = message + "Age: " + input.Extracted_Age + "<br>";
message = message + "BMI: " + input.Extracted_BMI + "<br>";
message = message + "State: " + input.Extracted_State + "<br><br>";
message = message + "<strong>AI Summary:</strong><br>";
message = message + "<pre>" + input.Candidate_Summary + "</pre><br>";
message = message + "<a href='" + input.ID.getSuffix("app-link") + "'>Review Application</a>";

sendmail
[
    from: zoho.adminuserid
    to: reviewerEmail
    subject: subject
    message: message
]

info "Review assignment sent to " + reviewerEmail + " for flags: " + flagTypes;
```

---

## Workflow 4: Status Change Notifications

**Purpose:** Notify team when application moves through pipeline

### Trigger

```
Event: On Update
Form: Surrogate Application
Condition: Application_Status is changed
```

### Deluge Script

```javascript
applicantName = input.First_Name + " " + input.Last_Name;
newStatus = input.Application_Status;
oldStatus = ""; // You'll need to track this with a hidden field

// Only send notifications for certain status changes
sendNotification = false;
notifyEmail = "";
subject = "";
message = "";

// Gold Star Fast Track
if(newStatus == "⭐ Gold Star - Fast Track") {
    sendNotification = true;
    notifyEmail = "intake@alceasurrogacy.com";
    subject = "⭐ " + applicantName + " moved to Gold Star Fast Track";
    message = applicantName + " has been identified as a gold star applicant and moved to fast track.<br><br>";
    message = message + "<a href='" + input.ID.getSuffix("app-link") + "'>View Application</a>";
}

// Approved for Matching
if(newStatus == "✅ Approved for Matching") {
    sendNotification = true;
    notifyEmail = "matching@alceasurrogacy.com";
    subject = "✅ " + applicantName + " approved for matching";
    message = applicantName + " has been approved and is ready for matching with intended parents.<br><br>";
    message = message + "Age: " + input.Extracted_Age + "<br>";
    message = message + "State: " + input.Extracted_State + "<br>";
    message = message + "Experience: " + input.Experienced_Surrogate_Status + "<br><br>";
    message = message + "<a href='" + input.ID.getSuffix("app-link") + "'>View Full Profile</a>";
}

// Declined
if(newStatus == "❌ Declined") {
    sendNotification = true;
    notifyEmail = "admin@alceasurrogacy.com";
    subject = "❌ " + applicantName + " application declined";
    message = applicantName + " application has been declined.<br><br>";
    message = message + "<a href='" + input.ID.getSuffix("app-link") + "'>View Details</a>";
}

// Send notification if applicable
if(sendNotification == true) {
    sendmail
    [
        from: zoho.adminuserid
        to: notifyEmail
        subject: subject
        message: message
    ]
    info "Status change notification sent to " + notifyEmail;
}
```

---

## Workflow 5: Auto-Archive Old Applications

**Purpose:** Automatically archive applications that have been inactive for 30 days

### Trigger

```
Event: Scheduled (Daily at 2:00 AM)
```

### Deluge Script

```javascript
// Get date 30 days ago
cutoffDate = zoho.currentdate.subDay(30);

// Find applications to archive
applicationsToArchive = Surrogate_Application[
    Summary_Date < cutoffDate
    && Application_Status != "✅ Approved for Matching"
    && Application_Status != "🤝 In Process"
    && Application_Status != "❌ Declined"
    && Application_Status != "📁 Archived"
];

archivedCount = 0;

for each application in applicationsToArchive {
    application.Application_Status = "📁 Archived";
    archivedCount = archivedCount + 1;
}

if(archivedCount > 0) {
    // Send summary email to admin
    sendmail
    [
        from: zoho.adminuserid
        to: "admin@alceasurrogacy.com"
        subject: "Daily Auto-Archive: " + archivedCount + " applications archived"
        message: archivedCount + " applications that were inactive for 30+ days have been automatically archived."
    ]

    info "Auto-archived " + archivedCount + " applications";
} else {
    info "No applications to archive today";
}
```

---

## Workflow 6: Missing Summary Alert

**Purpose:** Alert admin if AI summary fails to generate

### Trigger

```
Event: Scheduled (Every hour)
```

### Deluge Script

```javascript
// Find applications submitted in last hour without summary
oneHourAgo = zoho.currenttime.subHour(1);

failedApplications = Surrogate_Application[
    Added_Time > oneHourAgo
    && Summary_Generated == false
];

if(failedApplications.count() > 0) {

    message = "The following applications were submitted but AI summary failed to generate:<br><br>";

    for each app in failedApplications {
        appName = app.First_Name + " " + app.Last_Name;
        appID = app.ID;
        submittedTime = app.Added_Time;

        message = message + "• " + appName + " (ID: " + appID + ") - Submitted: " + submittedTime + "<br>";
        message = message + "  <a href='" + app.ID.getSuffix("app-link") + "'>View Application</a><br><br>";
    }

    message = message + "<br>Please check:<br>";
    message = message + "1. Vercel function is running<br>";
    message = message + "2. Webhook URL is correct<br>";
    message = message + "3. API key is valid<br>";

    sendmail
    [
        from: zoho.adminuserid
        to: "admin@alceasurrogacy.com"
        subject: "⚠️ AI Summary Generation Failed for " + failedApplications.count() + " applications"
        message: message
    ]

    info "Alert sent: " + failedApplications.count() + " applications missing summary";
}
```

---

## Workflow 7: Weekly Summary Report

**Purpose:** Send weekly summary of applications to management

### Trigger

```
Event: Scheduled (Every Monday at 9:00 AM)
```

### Deluge Script

```javascript
// Get date range for last week
lastWeekStart = zoho.currentdate.subDay(7);
lastWeekEnd = zoho.currentdate;

// Count applications
totalApps = Surrogate_Application[Summary_Date >= lastWeekStart && Summary_Date <= lastWeekEnd].count();
goldStarApps = Surrogate_Application[Summary_Date >= lastWeekStart && Summary_Date <= lastWeekEnd && Is_Gold_Star_Applicant == true].count();
flaggedApps = Surrogate_Application[Summary_Date >= lastWeekStart && Summary_Date <= lastWeekEnd && (Has_Medical_Flags == true || Has_Background_Flags == true)].count();

// Get top states
stateBreakdown = Surrogate_Application[Summary_Date >= lastWeekStart && Summary_Date <= lastWeekEnd].groupBy("Extracted_State").count();

// Build email
message = "<h2>Weekly Application Summary</h2>";
message = message + "<strong>Week of:</strong> " + lastWeekStart.toString("MMM dd") + " - " + lastWeekEnd.toString("MMM dd, yyyy") + "<br><br>";

message = message + "<h3>📊 Overview</h3>";
message = message + "Total Applications: " + totalApps + "<br>";
message = message + "⭐ Gold Star: " + goldStarApps + " (" + ((goldStarApps / totalApps) * 100).round(1) + "%)<br>";
message = message + "🚩 Flagged for Review: " + flaggedApps + "<br><br>";

message = message + "<h3>📍 Top States</h3>";
// Show top 5 states
counter = 0;
for each state in stateBreakdown {
    if(counter < 5) {
        message = message + state.Extracted_State + ": " + state.count + "<br>";
        counter = counter + 1;
    }
}

message = message + "<br><h3>📈 Status Breakdown</h3>";
statusCounts = Surrogate_Application[Summary_Date >= lastWeekStart && Summary_Date <= lastWeekEnd].groupBy("Application_Status").count();
for each status in statusCounts {
    message = message + status.Application_Status + ": " + status.count + "<br>";
}

message = message + "<br><a href='[link-to-full-report]'>View Detailed Report</a>";

// Send to management team
sendmail
[
    from: zoho.adminuserid
    to: "management@alceasurrogacy.com"
    subject: "📊 Weekly Application Summary - " + totalApps + " applications received"
    message: message
]

info "Weekly summary report sent to management";
```

---

## Workflow 8: Reminder for Stale Applications

**Purpose:** Remind team about applications stuck in review for 7+ days

### Trigger

```
Event: Scheduled (Every Monday at 10:00 AM)
```

### Deluge Script

```javascript
// Find applications in review for 7+ days
sevenDaysAgo = zoho.currentdate.subDay(7);

staleApps = Surrogate_Application[
    Application_Status == "🔍 Under Review"
    && Summary_Date < sevenDaysAgo
];

if(staleApps.count() > 0) {

    message = "<h3>⏰ Applications Pending Review (7+ days)</h3>";
    message = message + "The following " + staleApps.count() + " applications have been in review for over a week:<br><br>";

    for each app in staleApps {
        appName = app.First_Name + " " + app.Last_Name;
        daysInReview = (zoho.currentdate - app.Summary_Date).days();

        message = message + "• <strong>" + appName + "</strong> - " + daysInReview + " days<br>";
        message = message + "  Age: " + app.Extracted_Age + " | BMI: " + app.Extracted_BMI + " | " + app.Extracted_State + "<br>";
        message = message + "  Flags: ";
        if(app.Has_Medical_Flags) { message = message + "⚠️ Medical "; }
        if(app.Has_Background_Flags) { message = message + "⚠️ Background "; }
        if(app.Has_Preterm_History) { message = message + "⚠️ Preterm "; }
        message = message + "<br>";
        message = message + "  <a href='" + app.ID.getSuffix("app-link") + "'>Review Now</a><br><br>";
    }

    message = message + "Please review these applications and update their status.";

    sendmail
    [
        from: zoho.adminuserid
        to: "review.team@alceasurrogacy.com"
        subject: "⏰ " + staleApps.count() + " applications need attention (7+ days in review)"
        message: message
    ]

    info "Stale application reminder sent for " + staleApps.count() + " applications";
}
```

---

## Quick Setup Checklist

After creating all workflows:

- [ ] Test each workflow with sample data
- [ ] Update email addresses to your actual team emails
- [ ] Set correct schedule times for your timezone
- [ ] Enable all workflows
- [ ] Monitor logs for first week
- [ ] Adjust notification thresholds as needed

---

## Email Addresses to Configure

Update these in the scripts above:

| Variable | Replace with |
|----------|-------------|
| `intake@alceasurrogacy.com` | Your intake team email |
| `manager@alceasurrogacy.com` | Your manager email |
| `medical.reviewer@alceasurrogacy.com` | Medical review team |
| `background.reviewer@alceasurrogacy.com` | Background review team |
| `matching@alceasurrogacy.com` | Matching team email |
| `admin@alceasurrogacy.com` | System admin email |
| `management@alceasurrogacy.com` | Management team distribution list |
| `review.team@alceasurrogacy.com` | Review team distribution list |

---

## Next Steps

1. Copy workflows to Zoho Creator
2. Update email addresses
3. Test each workflow
4. Enable workflows one by one
5. Monitor for first few days
6. Adjust as needed

---

**Pro Tip:** Start with just workflows 1, 2, and 6 (auto-status, gold star email, and missing summary alert). Add others once you're comfortable with the system.
