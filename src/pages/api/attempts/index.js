import { getDb } from '@/lib/mongodb';

// POST /api/attempts -> submit attempt { examId, userId, answers: [{qId, choiceIndex}] }
// GET /api/attempts?userId=... -> list user attempts
export default async function handler(req, res) {
  const db = await getDb();
  const attempts = db.collection('attempts');

  if (req.method === 'POST') {
    const { examId, userId, answers, score } = req.body || {};
    if (!examId || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'examId and answers required' });
    }
    const doc = {
      examId,
      userId: userId || null,
      answers,
      score: typeof score === 'number' ? score : null,
      createdAt: new Date(),
    };
    const { insertedId } = await attempts.insertOne(doc);
    return res.status(201).json({ id: insertedId });
  }

  if (req.method === 'GET') {
    const { userId } = req.query;
    const cursor = userId ? { userId } : {};
    const list = await attempts.find(cursor).sort({ createdAt: -1 }).toArray();
    return res.status(200).json({ attempts: list });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


