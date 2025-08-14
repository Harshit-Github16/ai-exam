import { getDb } from '@/lib/mongodb';

// GET /api/exams -> list exams
// POST /api/exams -> create exam
export default async function handler(req, res) {
  const db = await getDb();
  const exams = db.collection('exams');

  if (req.method === 'GET') {
    const list = await exams
      .find({}, { projection: { title: 1, subject: 1, durationMin: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();
    return res.status(200).json({ exams: list });
  }

  if (req.method === 'POST') {
    const { title, subject, durationMin, questions } = req.body || {};
    if (!title || !Array.isArray(questions) || !questions.length) {
      return res.status(400).json({ error: 'title and questions required' });
    }
    const doc = {
      title,
      subject: subject || null,
      durationMin: durationMin || 30,
      questions,
      createdAt: new Date(),
    };
    const { insertedId } = await exams.insertOne(doc);
    return res.status(201).json({ id: insertedId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


