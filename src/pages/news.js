'use client'
import { useMemo, useState } from 'react';

export default function NewsPage() {
  const [tab, setTab] = useState('jobs');
  const [search, setSearch] = useState('');

  const allData = useMemo(() => ({
    jobs: [
      { title: 'SSC CGL 2025 Notification Released', date: '2025-08-10', link: '#' },
      { title: 'IBPS PO Prelims Schedule Announced', date: '2025-08-08', link: '#' },
      { title: 'Railway NTPC Vacancy Update', date: '2025-08-05', link: '#' },
    ],
    current: [
      { title: 'Monthly Current Affairs — August 2025', date: '2025-08-12', link: '#' },
      { title: 'Weekly CA: 1–7 Aug Highlights', date: '2025-08-08', link: '#' },
      { title: 'Budget 2025 Key Pointers', date: '2025-08-03', link: '#' },
    ],
    latest: [
      { title: 'ISRO launches new Earth observation satellite', date: '2025-08-11', link: '#' },
      { title: 'Global markets rally as inflation cools', date: '2025-08-09', link: '#' },
      { title: 'NHAI announces new expressway corridors', date: '2025-08-04', link: '#' },
    ],
  }), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allData[tab];
    return allData[tab].filter((i) => i.title.toLowerCase().includes(q));
  }, [search, tab, allData]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden" style={{background:'var(--color-muted)'}}>
      <img src="/images/HeroSlider.png" alt="News banner" className="pointer-events-none absolute -bottom-10 right-0 w-72 h-40 object-cover rounded-2xl opacity-20" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Jobs & News</h1>
        <p className="text-slate-600 mt-1">Latest job updates and current affairs.</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button onClick={() => setTab('jobs')} className={tab === 'jobs' ? 'px-4 py-2 rounded-lg bg-blue-600 text-white' : 'px-4 py-2 rounded-lg border border-slate-200 bg-white'}>Jobs</button>
          <button onClick={() => setTab('current')} className={tab === 'current' ? 'px-4 py-2 rounded-lg bg-blue-600 text-white' : 'px-4 py-2 rounded-lg border border-slate-200 bg-white'}>Current Affairs</button>
          <button onClick={() => setTab('latest')} className={tab === 'latest' ? 'px-4 py-2 rounded-lg bg-blue-600 text-white' : 'px-4 py-2 rounded-lg border border-slate-200 bg-white'}>Latest News</button>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search headlines..."
            className="ml-auto w-full sm:w-64 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((item) => (
              <button key={item.title} onClick={() => setSearch(item.title)} className="w-full text-left rounded-xl border bg-white p-4 hover:shadow-md transition" style={{borderColor:'var(--color-secondary)'}}>
                <div className="flex items-center justify-between">
                  <div className="font-medium" style={{color:'var(--color-dark)'}}>{item.title}</div>
                  <div className="text-xs text-slate-500">{item.date}</div>
                </div>
              </button>
            ))}
          </div>
          <aside className="card-base p-4 h-fit">
            <h4 className="font-semibold mb-2" style={{color:'var(--color-dark)'}}>Details</h4>
            {filtered[0] ? (
              <div>
                <div className="text-sm" style={{color:'var(--color-dark)'}}>{filtered[0].title}</div>
                <div className="text-xs text-slate-500 mb-2">{filtered[0].date}</div>
                <p className="text-sm text-slate-600">Short summary placeholder about this update. We can replace with real content when API is connected.</p>
                <a href={filtered[0].link} className="inline-block mt-3 px-3 py-2 rounded-lg text-white" style={{background:'var(--color-primary)'}}>Read more</a>
              </div>
            ) : (
              <div className="text-sm text-slate-500">Select a headline to see details.</div>
            )}
          </aside>
        </div>
          {!filtered.length && (
            <div className="text-slate-500 text-sm">No results found.</div>
          )}
        </div>
      </div>
    
  );
}


