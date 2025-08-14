import { getDb } from '@/lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const admin = db.admin();
    const ping = await admin.ping();
    return res.status(200).json({ ok: true, ping });
  } catch (e) {
    console.error('DB health failed:', e);
    return res.status(500).json({ ok: false, error: e?.message || 'DB connect failed' });
  }
}


