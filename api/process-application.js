/**
 * Surrogate Application Processor
 *
 * Receives application data from Zoho Creator webhook
 * Processes with Claude API
 * Returns formatted summary and extracted fields
 *
 * Deploy to: Vercel, Netlify, or Cloudflare Workers
 */

// For Vercel deployment
export const config = {
  runtime: 'nodejs18.x',
  maxDuration: 30 // 30 second timeout for API calls
};

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const applicationData = req.body;

    // Validate required data
    if (!applicationData || !applicationData.application_text) {
      return res.status(400).json({
        error: 'Missing application data',
        required: 'application_text field is required'
      });
    }

    // Call Claude API to process application
    const summary = await processWithClaude(applicationData.application_text);

    // If gold star applicant, send email notification
    if (summary.is_gold_star && process.env.SEND_GOLD_STAR_EMAILS === 'true') {
      await sendGoldStarEmail(applicationData, summary);
    }

    // Return formatted summary and extracted fields
    return res.status(200).json({
      success: true,
      summary: summary.formatted_summary,
      fields: summary.extracted_fields,
      is_gold_star: summary.is_gold_star,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return res.status(500).json({
      error: 'Failed to process application',
      message: error.message
    });
  }
}

/**
 * Process application text with Claude API
 */
async function processWithClaude(applicationText) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set');
  }

  const prompt = buildClaudePrompt(applicationText);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514', // Claude Sonnet 4
      max_tokens: 4000,
      temperature: 0.3, // Low temperature for consistent extraction
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${error}`);
  }

  const data = await response.json();
  let responseText = data.content[0].text;

  // Remove markdown code blocks if present
  responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  // Parse the JSON response from Claude
  try {
    const parsed = JSON.parse(responseText);
    return {
      formatted_summary: parsed.formatted_summary,
      extracted_fields: parsed.extracted_fields,
      is_gold_star: parsed.is_gold_star || false
    };
  } catch (parseError) {
    console.error('Failed to parse Claude response:', responseText);
    throw new Error('Invalid response format from Claude API');
  }
}

/**
 * Build the Claude API prompt
 */
function buildClaudePrompt(applicationText) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return `You are processing a surrogacy application for Alcea Surrogacy. Extract and format a CONCISE summary - only include details that are notable or concerning. Assume healthy defaults.

CRITICAL RULES:
1. BE CONCISE - Only mention what's notable or concerning
2. Spell out ALL medical abbreviations completely (GD → Gestational Diabetes, C/S → Cesarean section, etc.)
3. Use ⚠️ emoji for concerns/flags, ⭐ for exceptional/gold star items
4. If section is clean/unremarkable, just say "Clean" or "Nothing of note"
5. Return valid JSON with formatted_summary, extracted_fields, AND is_gold_star boolean

APPLICATION DATA:
${applicationText}

You must return ONLY valid JSON in this EXACT format:

{
  "formatted_summary": "THE FULL FORMATTED TEXT BELOW",
  "extracted_fields": {
    "age": <number or null>,
    "bmi": <number or null>,
    "state": "<state name or null>",
    "experienced_surrogate": "<First-time or Experienced>",
    "has_medical_flags": <true or false>,
    "has_background_flags": <true or false>,
    "has_preterm_history": <true or false>
  },
  "is_gold_star": <true or false>
}

GOLD STAR CRITERIA (all must be true):
- Age 25-38
- BMI 19-28
- At least 1 previous successful pregnancy
- No C-sections OR maximum 1 C-section
- No preterm deliveries
- No significant medical conditions
- No smoking/vaping
- Clean background
- First-time or experienced surrogate with good history

THE FORMATTED SUMMARY MUST USE THIS CONCISE TEMPLATE:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CANDIDATE APPLICATION SUMMARY [ADD ⭐ GOLD STAR if is_gold_star=true]
Generated: ${today}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 PERSONAL
Name: [First Last] ([Preferred name if different])
Age: [##] | BMI: [##.#] | [State] | [Relationship Status] | [Employment if notable]
Experienced Surrogate: [Yes (# journeys with brief notes) / No (First-time)]

🤰 PREGNANCY HISTORY
[#] Pregnancies | [#] Deliveries | [#] Cesarean sections
Anything of note: [Only mention if there are: miscarriages, abortions, preterm deliveries, significant complications. If clean history of full-term vaginal births, just say "Clean pregnancy history"]

🏥 MEDICAL HISTORY
[If completely clean: "Clean - no medical conditions of note, non-smoker, non-vaper"]
[Otherwise list ONLY notable items with ⚠️ for concerns:
⚠️ [Condition - medication/status]
⚠️ [Smoking/vaping if applicable]
⚠️ [Dietary restrictions if notable]]

🏠 HOUSEHOLD
[Write 1-2 sentences: "[Home type] with [#] adults and [#] children (ages). [Smoke-free status]. [Pet summary if any]. [Firearm status if present and concerning]"]

👩‍⚕️ OB/GYN
Birth Control: [Type or None]
Anything of note: [ONLY mention breastfeeding if currently breastfeeding, or other concerns. Otherwise omit this line]

📋 BACKGROUND
[Either "Clean" OR briefly note concerns for self/partner]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEDICAL ABBREVIATIONS TO SPELL OUT COMPLETELY:
- GD/GDM → Gestational Diabetes Mellitus
- C/S or CS → Cesarean section
- VBAC → Vaginal Birth After Cesarean
- SVD → Spontaneous Vaginal Delivery
- PE → Preeclampsia
- HELLP → Hemolysis, Elevated Liver enzymes, Low Platelet count syndrome
- PIH → Pregnancy-Induced Hypertension
- IUGR → Intrauterine Growth Restriction
- PROM → Premature Rupture of Membranes
- PPH → Postpartum Hemorrhage
- PTL → Preterm Labor
- PTD → Preterm Delivery
- D&C → Dilation and Curettage
- D&E → Dilation and Evacuation
- FT → Full-term (specify weeks)
- PT → Preterm (specify weeks)
- IUD → Intrauterine Device
- OCP → Oral Contraceptive Pills

EXTRACTED FIELDS RULES:
- age: numeric value only
- bmi: numeric value with one decimal
- state: full state name (not abbreviation)
- experienced_surrogate: "First-time" or "Experienced"
- has_medical_flags: true if ANY ⚠️ in medical section
- has_background_flags: true if any concerns in background section
- has_preterm_history: true if any preterm deliveries mentioned

Return ONLY the JSON object with no additional text.`;
}

/**
 * Send email notification for gold star applicant
 * Uses Resend API for email delivery
 */
async function sendGoldStarEmail(applicationData, summary) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const INTAKE_EMAIL = process.env.INTAKE_TEAM_EMAIL || 'intake@alceasurrogacy.com';

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set - skipping gold star email notification');
    return;
  }

  try {
    // Extract candidate name from summary
    const nameMatch = summary.formatted_summary.match(/Name:\s*([^\n(]+)/);
    const candidateName = nameMatch ? nameMatch[1].trim() : 'Unknown Candidate';

    // Extract key details for email preview
    const ageMatch = summary.formatted_summary.match(/Age:\s*(\d+)/);
    const bmiMatch = summary.formatted_summary.match(/BMI:\s*([\d.]+)/);
    const stateMatch = summary.formatted_summary.match(/\|\s*([A-Z][a-z]+)\s*\|/);

    const age = ageMatch ? ageMatch[1] : 'N/A';
    const bmi = bmiMatch ? bmiMatch[1] : 'N/A';
    const state = stateMatch ? stateMatch[1] : 'N/A';

    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #7d2431; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .highlight { background-color: #fff4e6; border-left: 4px solid #e1b321; padding: 15px; margin: 20px 0; }
    .summary { background-color: #f5f5f5; padding: 15px; font-family: monospace; white-space: pre-wrap; font-size: 12px; }
    .footer { color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="header">
    <h1>⭐ Gold Star Applicant Received</h1>
  </div>

  <div class="content">
    <p>A new gold star surrogate applicant has been received and automatically processed:</p>

    <div class="highlight">
      <strong>${candidateName}</strong><br>
      Age: ${age} | BMI: ${bmi} | State: ${state}
    </div>

    <p><strong>Why this applicant is gold star:</strong></p>
    <ul>
      <li>Age 25-38 ✓</li>
      <li>BMI 19-28 ✓</li>
      <li>At least 1 successful pregnancy ✓</li>
      <li>Max 1 C-section ✓</li>
      <li>No preterm deliveries ✓</li>
      <li>No significant medical conditions ✓</li>
      <li>Non-smoker ✓</li>
      <li>Clean background ✓</li>
    </ul>

    <p><strong>Full AI-Generated Summary:</strong></p>
    <div class="summary">${summary.formatted_summary}</div>

    <div class="footer">
      <p>This email was automatically generated by the Alcea Surrogacy Application Processor.</p>
      <p>Generated: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
    </div>
  </div>
</body>
</html>
`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Alcea Surrogacy <notifications@alceasurrogacy.com>',
        to: [INTAKE_EMAIL],
        subject: `⭐ Gold Star Applicant: ${candidateName}`,
        html: emailBody
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send gold star email:', error);
      // Don't throw - we don't want email failures to break the main flow
    } else {
      console.log('Gold star email sent successfully to:', INTAKE_EMAIL);
    }

  } catch (error) {
    console.error('Error sending gold star email:', error);
    // Don't throw - we don't want email failures to break the main flow
  }
}
