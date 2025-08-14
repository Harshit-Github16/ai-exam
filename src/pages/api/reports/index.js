import { getDb } from '@/lib/mongodb';

// GET /api/reports?userId=...
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { userId } = req.query;
  const db = await getDb();
  const attempts = db.collection('attempts');
  const convos = db.collection('conversations');

  const [attemptList, chatCount] = await Promise.all([
    attempts.find(userId ? { userId } : {}).sort({ createdAt: -1 }).limit(50).toArray(),
    convos.countDocuments(userId ? { userId } : {}),
  ]);

  const total = attemptList.length;
  const avg = total ? Math.round((attemptList.reduce((s, a) => s + (a.score || 0), 0) / total) * 100) / 100 : 0;

  const perSubject = {};
  for (const a of attemptList) {
    if (a.subject) {
      perSubject[a.subject] = perSubject[a.subject] || { count: 0, total: 0 };
      perSubject[a.subject].count += 1;
      perSubject[a.subject].total += a.score || 0;
    }
  }
  const subjectAverages = Object.entries(perSubject).map(([subject, v]) => ({ subject, avg: Math.round((v.total / v.count) * 100) / 100 }));

  return res.status(200).json({
    attempts: total,
    averageScore: avg,
    chatInteractions: chatCount,
    recent: attemptList.slice(0, 5).map((a) => ({ id: a._id, examId: a.examId, score: a.score, at: a.createdAt })),
    subjectAverages,
  });
}


