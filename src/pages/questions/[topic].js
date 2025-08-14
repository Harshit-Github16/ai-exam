import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TopicQuestionsPage() {
  const router = useRouter();
  const { topic } = router.query;
  const [loading, setLoading] = useState(true);
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    if (!topic) return;
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const res = await fetch('/api/agents/exam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ syllabus: topic, numQuestions: 10 }),
        });
        const data = await res.json();
        if (!cancelled) setMcqs(Array.isArray(data.questions) ? data.questions : []);
      } catch {
        if (!cancelled) setMcqs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [topic]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)]" style={{background:'var(--color-muted)'}}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold" style={{color:'var(--color-dark)'}}>{topic || 'Loading...'}</h1>
          <button onClick={() => router.back()} className="px-3 py-1.5 rounded-lg" style={{border:'1px solid var(--color-secondary)', color:'var(--color-dark)'}}>Back</button>
        </div>
        {loading ? (
          <div className="mt-6 text-slate-500">Generating MCQs...</div>
        ) : mcqs.length ? (
          <div className="mt-6 space-y-4">
            {mcqs.map((q, i) => (
              <div key={q.id || i} className="card-base p-4">
                <div className="font-medium text-slate-900">Q{i + 1}. {q.text}</div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(q.options || []).map((opt, idx) => (
                    <button key={idx} className="text-left px-4 py-2 rounded-lg border" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-slate-500">No questions generated. Try another topic.</div>
        )}
      </div>
    </div>
  );
}


