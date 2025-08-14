import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await getDb();
  const exams = db.collection('exams');

  if (req.method === 'GET') {
    try {
      const doc = await exams.findOne({ _id: new ObjectId(id) });
      if (!doc) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(doc);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid id' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await exams.deleteOne({ _id: new ObjectId(id) });
      return res.status(204).end();
    } catch (e) {
      return res.status(400).json({ error: 'Invalid id' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


