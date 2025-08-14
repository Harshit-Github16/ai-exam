import { getDb } from '@/lib/mongodb';
import { generateChatReply } from '@/lib/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { message, userId, context } = req.body || {};
    const cleaned = typeof message === 'string' ? message.trim() : '';
    if (!cleaned) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const db = await getDb();
    const conversations = db.collection('conversations');
    const replyText = await generateChatReply(cleaned, Array.isArray(context) ? context : []);
    const doc = {
      userId: userId || null,
      prompt: cleaned,
      reply: replyText,
      provider: 'gemini',
      createdAt: new Date(),
    };
    const { insertedId } = await conversations.insertOne(doc);
    return res.status(200).json({ reply: replyText, id: insertedId });
  } catch (e) {
    console.error('chat api error', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}


