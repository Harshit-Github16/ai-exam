import { generateChatReply } from '@/lib/gemini';

// POST /api/agents/chat { prompt }
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'prompt required' });
  try {
    const reply = await generateChatReply(prompt);
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: 'generation failed' });
  }
}


