import { useMemo, useState } from 'react';

export default function NewsPage() {
  const [tab, setTab] = useState('jobs');
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

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
    hotTopics: [
      { title: 'AI breakthroughs reshape education industry', date: '2025-08-13', link: '#' },
      { title: 'Climate action summit gains global momentum', date: '2025-08-14', link: '#' },
      { title: 'Rise in remote jobs sparks tech evolution', date: '2025-08-12', link: '#' },
    ],
  }), []);

  // Combine selected tab data and hot topics for richer dashboard feel
  const dataForTab = useMemo(() => {
    const baseData = allData[tab] || [];
    if (tab === 'latest' || tab === 'current') {
      // Add hot topics to bottom for more engagement
      return [...baseData, ...allData.hotTopics];
    }
    return baseData;
  }, [tab, allData]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return dataForTab;
    return dataForTab.filter(item => item.title.toLowerCase().includes(q));
  }, [search, dataForTab]);

  // Select first news of filtered for initial detail or selected
  const detailIndex = selectedIndex !== null && filtered[selectedIndex] ? selectedIndex : 0;
  const detailItem = filtered[detailIndex] || null;

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden flex flex-col"
      style={{ background: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Decorative Image */}
      {/* <img
        src="/images/HeroSlider.png"
        alt="News banner"
        className="pointer-events-none absolute -bottom-10 right-0 w-72 h-40 object-cover rounded-2xl opacity-20"
      /> */}

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-dark)' }}>
            Jobs & News
          </h1>
          <p className="text-slate-600 mt-1 mb-6" style={{ color: 'var(--color-surface)' }}>
            Latest job updates and current affairs including hot topics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {['jobs', 'current', 'latest'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setSearch('');
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-lg ${
                tab === t
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {t === 'jobs' ? 'Jobs' : t === 'current' ? 'Current Affairs' : 'Latest News'}
            </button>
          ))}

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(null);
            }}
            placeholder="Search headlines..."
            className="ml-auto w-full sm:w-64 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
          <div className="lg:flex-1 flex flex-col overflow-y-auto space-y-3 max-h-[70vh]">
            {filtered.length ? (
              filtered.map((item, idx) => (
                <button
                  key={item.title}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left rounded-xl border p-4 transition flex justify-between items-center ${
                    idx === detailIndex
                      ? 'shadow-md border-blue-600 bg-blue-50'
                      : 'border-white hover:shadow-md hover:border-blue-300 bg-white'
                  }`}
                  style={{ borderColor: idx === detailIndex ? 'var(--color-primary)' : undefined }}
                >
                  <div
                    className="font-medium"
                    style={{ color: idx === detailIndex ? 'var(--color-dark)' : 'var(--color-dark)' }}
                  >
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500 ml-2 whitespace-nowrap">{item.date}</div>
                </button>
              ))
            ) : (
              <div className="text-center text-slate-500 mt-4">No results found.</div>
            )}
          </div>

          {/* Detail View */}
          <aside
            className="card-base p-6 rounded-xl bg-white shadow-md max-w-lg flex-shrink-0"
            style={{ borderColor: 'var(--color-secondary)' }}
          >
            <h4 className="font-semibold mb-3" style={{ color: 'var(--color-dark)' }}>
              Details
            </h4>
            {detailItem ? (
              <>
                <div className="text-lg font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
                  {detailItem.title}
                </div>
                <div className="text-xs text-slate-500 mb-4">{detailItem.date}</div>
                <p className="text-sm text-slate-700 mb-4">
                  This is a placeholder summary describing the news article or job update.
                  When connected to a real API, fetch and display rich descriptions and related
                  details here for users to easily consume the content.
                </p>
                <a
                  href={detailItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-lg text-white"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Read more
                </a>
              </>
            ) : (
              <div className="text-center text-slate-500">Select a headline to see details.</div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
