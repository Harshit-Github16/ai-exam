import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, email, password, username, mobile, dob, city, state, preparationFor } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });

    const db = await getDb();
    const users = db.collection('users');
    const existing = await users.findOne({ $or: [{ email }, { username }, { mobile }] });
    if (existing) return res.status(409).json({ error: 'Account already exists with given email/username/mobile' });

    const passwordHash = await bcrypt.hash(password, 10);
    const doc = { name, email, username, mobile, dob, city, state, preparationFor, passwordHash, createdAt: new Date() };
    const { insertedId } = await users.insertOne(doc);
    return res.status(201).json({ id: insertedId });
  } catch (e) {
    console.error('Register API error:', e);
    return res.status(500).json({ error: 'Internal error', detail: e?.message || 'unknown' });
  }
}


