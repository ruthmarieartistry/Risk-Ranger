import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for the React app (allow both common Vite ports)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Claude API proxy endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { apiKey, messages, max_tokens = 4000, model = 'claude-3-5-sonnet-20241022' } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log(`[${new Date().toISOString()}] Claude API request - Model: ${model}, Messages: ${messages.length}`);

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens,
        messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] Claude API error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({
        error: 'Claude API error',
        details: errorText
      });
    }

    const data = await response.json();
    console.log(`[${new Date().toISOString()}] Claude API success`);

    res.json(data);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Server error:`, error);
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`   Claude API proxy: http://localhost:${PORT}/api/claude`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});
