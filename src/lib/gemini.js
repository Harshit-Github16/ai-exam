import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const SYSTEM_PROMPT = `You are PrepVerse AI Tutor, an expert exam mentor for UPSC/SSC/Bank/State PSC and other government exams.
Goals:
- Answer clearly with step-by-step reasoning when needed
- Keep tone friendly and concise; avoid unnecessary fluff
- When a question is ambiguous, ask a brief clarifying question first
- For MCQs: show working and highlight the correct option
- If user asks for practice set: propose 5-10 MCQs in JSON (id, text, options[4], answerIndex)
Constraints:
- Never fabricate data that can mislead. If unsure, say so briefly and suggest next steps.
`;

export async function generateChatReply(userMessage, conversationContext = []) {
  if (!genAI) return 'AI is not configured yet. Please set GEMINI_API_KEY.';
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const history = conversationContext.map((m) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join('\n');
  const composed = `${SYSTEM_PROMPT}\n\n${history ? history + '\n' : ''}Student: ${userMessage}\nTutor:`;
  const result = await model.generateContent(composed);
  const text = result?.response?.text?.() || '';
  return text.trim();
}


