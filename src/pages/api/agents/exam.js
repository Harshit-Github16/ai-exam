import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// POST /api/agents/exam { syllabus, numQuestions }
// Generates mock MCQs based on a syllabus/topic
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!genAI) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

  const { syllabus, numQuestions = 10 } = req.body || {};
  if (!syllabus) return res.status(400).json({ error: 'syllabus required' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Create ${numQuestions} multiple-choice questions (MCQs) for the topic: ${syllabus}. Return JSON array with fields: id, text, options (array of 4), answerIndex (0-3).`;
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || '[]';
    // Naive parse with safety
    let questions = [];
    try { questions = JSON.parse(text); } catch { questions = []; }
    return res.status(200).json({ questions });
  } catch (e) {
    return res.status(500).json({ error: 'generation failed' });
  }
}


