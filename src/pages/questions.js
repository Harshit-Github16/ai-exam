import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function QuestionsArchivePage() {
  const [query, setQuery] = useState('');
  const data = useMemo(() => ([
    {
      section: 'Previous Years (Maths)',
      items: [
        { title: '2019 Algebra (Set 1)', difficulty: 'Medium' },
        { title: '2020 Calculus (Set 2)', difficulty: 'Hard' },
        { title: '2021 Coordinate Geometry (Set 1)', difficulty: 'Medium' },
      ],
    },
    {
      section: 'Important Questions (Physics)',
      items: [
        { title: 'Laws of Motion Essentials', difficulty: 'Easy' },
        { title: 'Electromagnetism Formula Pack', difficulty: 'Medium' },
        { title: 'Modern Physics High-Yield', difficulty: 'Hard' },
      ],
    },
    {
      section: 'Previous Years (English)',
      items: [
        { title: '2018 Reading Comprehension', difficulty: 'Easy' },
        { title: '2022 Grammar & Usage', difficulty: 'Medium' },
      ],
    },
  ]), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.map((sec) => ({
      ...sec,
      items: sec.items.filter((i) => i.title.toLowerCase().includes(q)),
    }));
  }, [query, data]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden" style={{background:'var(--color-muted)'}}>
      <img src="/images/HeroSlider.png" alt="Questions banner" className="pointer-events-none absolute -top-10 -left-10 w-72 h-44 object-cover rounded-2xl opacity-25" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Previous Years & Important Questions</h1>
        <p className="text-slate-600 mt-1 mb-6">Browse curated sets to practice efficiently.</p>

        <div className="mb-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, years, or subjects..."
            className="w-full rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 px-3 py-3 shadow-sm focus:outline-none"
            style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}}
          />
        </div>

        <div className="space-y-5">
          {filtered.map((sec) => (
            <div key={sec.section} className="card-base p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{sec.section}</h2>
                <span className="text-sm text-slate-500">{sec.items.length} items</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sec.items.map((item) => (
                  <div key={item.title} className="rounded-xl border p-4 hover:shadow-md transition" style={{borderColor:'var(--color-secondary)'}}>
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">Difficulty: {item.difficulty}</div>
                    <Link
                      href={{ pathname: '/questions/[topic]', query: { topic: item.title } }}
                      className="inline-block mt-3 px-3 py-2 rounded-lg text-white"
                      style={{background:'var(--color-primary)'}}
                    >
                      View MCQs
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


