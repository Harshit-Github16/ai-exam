import { getDb } from '@/lib/mongodb';

// GET: list topics {q: search}
// POST: create topic and questions
export default async function handler(req, res) {
  const db = await getDb();
  const topics = db.collection('topics');

  if (req.method === 'GET') {
    const { q } = req.query;
    const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
    const list = await topics.find(filter, { projection: { title: 1, difficulty: 1 } }).sort({ createdAt: -1 }).toArray();
    return res.status(200).json({ topics: list });
  }

  if (req.method === 'POST') {
    const { title, difficulty, questions } = req.body || {};
    if (!title || !Array.isArray(questions) || !questions.length) return res.status(400).json({ error: 'title and questions required' });
    const doc = { title, difficulty: difficulty || 'Medium', questions, createdAt: new Date() };
    const { insertedId } = await topics.insertOne(doc);
    return res.status(201).json({ id: insertedId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


