// Vercel serverless function for generating clinical narratives
// Keeps API key secure on server side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variable
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    console.error('CLAUDE_API_KEY environment variable not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { candidateData, assessmentResults } = req.body;

    if (!candidateData || !assessmentResults) {
      return res.status(400).json({ error: 'Candidate data and assessment results are required' });
    }

    // Build the prompt for Claude
    const prompt = `You are a medical narrative writer creating professional clinical summaries for gestational carrier (surrogate) candidate assessments.

Generate THREE clinical narratives based on the data below. Each narrative should be professional, concise, and appropriate for medical review.

CANDIDATE DATA:
${JSON.stringify(candidateData, null, 2)}

ASSESSMENT RESULTS:
${JSON.stringify(assessmentResults, null, 2)}

Generate the following narratives:

1. **MEDICAL SUMMARY** (2-3 paragraphs):
   - Obstetric history summary
   - Medical history overview
   - Key risk factors identified
   - Professional tone, suitable for medical chart

2. **CLINIC ACCEPTANCE ASSESSMENT** (1-2 paragraphs):
   - Overall candidacy assessment
   - Factors supporting acceptance
   - Any concerns or areas requiring additional review
   - Recommendation for clinic review

3. **MFM REVIEW RECOMMENDATION** (1 paragraph):
   - Whether MFM review is recommended and why
   - Specific areas requiring specialist evaluation
   - Timeline recommendations if applicable

Return ONLY valid JSON in this exact structure (no markdown formatting):
{
  "medicalSummary": "string",
  "clinicAcceptanceAssessment": "string",
  "mfmReviewRecommendation": "string"
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
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1500,
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

    const narratives = JSON.parse(jsonText);

    return res.status(200).json({
      success: true,
      narratives: narratives
    });

  } catch (error) {
    console.error('Error processing narratives request:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
