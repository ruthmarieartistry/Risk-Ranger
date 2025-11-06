// Vercel serverless function to proxy Claude API calls
// Keeps API key secure on server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variable (NOT VITE_ prefixed)
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    console.error('CLAUDE_API_KEY environment variable not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { medicalText, candidateName, userProvidedData } = req.body;

    if (!medicalText) {
      return res.status(400).json({ error: 'Medical text is required' });
    }

    // De-identify the text before sending to Claude
    const deidentifiedText = medicalText.replace(new RegExp(candidateName, 'gi'), '[PATIENT]');

    // Build the prompt for Claude
    const prompt = `You are a medical record parser for surrogacy candidate assessment. Extract information from the following pregnancy/medical history text.

IMPORTANT RULES:
1. **ONLY extract CONFIRMED ACTIVE diagnoses** - Do NOT include:
   - Family history (e.g., "mother has diabetes" - NOT the candidate's condition)
   - Differential diagnoses or "rule out" conditions (e.g., "r/o cardiac disease" - NOT confirmed)
   - Past resolved conditions (e.g., "history of asthma as child, resolved" - NOT active)
   - Conditions mentioned in background/review of systems without confirmation
   - Screening tests that were negative (e.g., "screened for GDM - negative")

2. **Age validation**: Only extract ages 21-43 (surrogacy candidate range). If a number like "10" appears in dates or family history, DO NOT extract as age.

3. **Obstetric history accuracy**:
   - Count ACTUAL deliveries, not dates or years
   - Distinguish between vaginal deliveries (SVD, NSVD) and cesarean sections (C/S, C-section)
   - Term = 37+ weeks, Preterm = <37 weeks

4. **Context awareness**:
   - "Denies history of X" = NO condition X
   - "Family history of X" = NOT the patient's condition
   - "R/O X" or "Rule out X" = NOT confirmed diagnosis

Medical text:
${deidentifiedText}

${userProvidedData ? `User-provided data (ALWAYS TRUST THIS):
Age: ${userProvidedData.age || 'not provided'}
BMI: ${userProvidedData.bmi || 'not provided'}
Additional info: ${userProvidedData.additionalInfo || 'none'}` : ''}

Return ONLY valid JSON matching this exact structure (no markdown formatting):
{
  "age": number or null,
  "obstetricHistory": {
    "gravida": number,
    "para": number,
    "term": number,
    "preterm": number,
    "abortions": number,
    "living": number
  },
  "pregnancyHistory": {
    "hasCompletedPregnancy": boolean,
    "numberOfTermPregnancies": number,
    "numberOfCesareans": number,
    "complicationsInPreviousPregnancies": boolean,
    "numberOfComplicatedPregnancies": number
  },
  "medicalHistory": {
    "conditions": [array of confirmed active conditions only],
    "hypertension": boolean,
    "diabetes": boolean,
    "thyroidDisorder": boolean,
    "autoimmune": boolean,
    "cardiacDisease": boolean,
    "kidneyDisease": boolean,
    "liverDisease": boolean,
    "bloodClottingDisorder": boolean,
    "asthma": boolean,
    "cancer": boolean,
    "depression": boolean,
    "anxiety": boolean
  },
  "pregnancyComplications": {
    "gestationalHypertension": boolean,
    "preeclampsia": boolean,
    "gestationalDiabetes": boolean,
    "pretermLabor": boolean,
    "pretermBirth": boolean,
    "iugr": boolean,
    "placentalComplications": boolean,
    "postpartumHemorrhage": boolean,
    "hyperemesisGravidarum": boolean,
    "cervicalInsufficiency": boolean
  },
  "lifestyle": {
    "bmi": number or null,
    "currentSmoker": boolean,
    "historyOfSubstanceAbuse": boolean,
    "excessiveAlcoholUse": boolean
  },
  "psychological": {
    "historyOfPsychosis": boolean,
    "historyOfPostpartumDepression": boolean
  },
  "confidence": number (0-100)
}`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'Claude API request failed',
        details: errorText
      });
    }

    const data = await response.json();

    // Extract the text content from Claude's response
    const claudeText = data.content[0].text;

    // Parse the JSON from Claude's response
    // Remove markdown code blocks if present
    const jsonMatch = claudeText.match(/```json\n([\s\S]*?)\n```/) || claudeText.match(/```\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : claudeText;

    const parsedData = JSON.parse(jsonText);

    return res.status(200).json({
      success: true,
      data: parsedData,
      claudeUsed: true
    });

  } catch (error) {
    console.error('Error processing Claude request:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
