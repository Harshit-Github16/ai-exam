import { getDb } from '@/lib/mongodb';

export default async function handler(req, res) {
  const { topic } = req.query;
  const db = await getDb();
  const topics = db.collection('topics');
  if (req.method === 'GET') {
    const doc = await topics.findOne({ title: topic });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(doc);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}


