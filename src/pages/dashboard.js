import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { FiBookOpen, FiClock, FiTrendingUp, FiAward, FiCheckSquare } from 'react-icons/fi';

function Dashboard() {
  const kpis = useMemo(() => ([
    { title: 'Completed Exams', value: 12, delta: '+3 this week', icon: <FiBookOpen style={{ color: 'var(--color-primary)' }} /> },
    { title: 'Study Hours', value: '42h', delta: '+6h this week', icon: <FiClock style={{ color: 'var(--color-surface)' }} /> },
    { title: 'Avg. Score', value: '88%', delta: '+2.3%', icon: <FiTrendingUp style={{ color: 'var(--color-dark)' }} /> },
  ]), []);

  const chartData = useMemo(() => ([
    { name: 'Mon', score: 72 },
    { name: 'Tue', score: 78 },
    { name: 'Wed', score: 81 },
    { name: 'Thu', score: 86 },
    { name: 'Fri', score: 90 },
    { name: 'Sat', score: 88 },
    { name: 'Sun', score: 92 },
  ]), []);

  const activities = useMemo(() => ([
    { id: 1, text: 'Completed Mock Test: Algebra Basics', time: '2h ago' },
    { id: 2, text: 'Reviewed 20 Flashcards - Biology', time: '5h ago' },
    { id: 3, text: 'Achieved a new high score in Physics', time: 'Yesterday' },
    { id: 4, text: 'Scheduled Chemistry exam reminder', time: '2d ago' },
  ]), []);

  const tasks = useMemo(() => ([
    { id: 1, label: 'Revise Algebra formulas', done: false },
    { id: 2, label: 'Practice 2 Reading Comprehensions', done: true },
    { id: 3, label: 'Take Mock Test: Mechanics', done: false },
  ]), []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-muted)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-foreground)',
      }}
    >
      {/* Hero Section */}
      <section
        className="rounded-b-3xl shadow-inner pb-12 px-4 sm:px-8"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="max-w-5xl mx-auto pt-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1
              className="text-4xl font-extrabold mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Crack your exam with confidence
            </h1>
            <p className="text-xl mb-6" style={{ color: 'var(--color-dark)' }}>
              PrepVerse brings AI chat, PYQs, mocks, and analytics into one beautiful dashboard.
            </p>
            <div className="flex gap-4">
              <button
                className="px-5 py-2 rounded-lg shadow text-white font-medium transition"
                style={{
                  background: 'var(--color-dark)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Get Started
              </button>
              <button
                className="px-5 py-2 rounded-lg shadow border font-medium transition"
                style={{
                  background: 'var(--color-secondary)',
                  color: 'var(--color-dark)',
                  borderColor: 'var(--color-primary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Login
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div
              className="p-8 rounded-2xl shadow-xl w-full"
              style={{ background: 'var(--color-secondary)' }}
            >
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>
                EduMitra AI
              </h2>
              <p className="mb-4" style={{ color: 'var(--color-dark)' }}>
                Ace Your Govt Exam Preparation
              </p>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium transition"
                style={{
                  background: 'var(--color-dark)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-dark)' }}>
          Welcome back 👋
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-surface)' }}>
          Here’s your learning snapshot and what’s next.
        </p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="rounded-2xl p-6 shadow hover:shadow-lg transition"
              style={{
                background: 'white',
                border: `1px solid var(--color-secondary)`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl">{kpi.icon}</div>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'var(--color-muted)',
                    color: 'var(--color-dark)'
                  }}
                >
                  {kpi.delta}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-sm" style={{ color: 'var(--color-dark)' }}>
                  {kpi.title}
                </div>
                <div
                  className="text-3xl font-bold mt-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {kpi.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart & Side Column */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Chart Card */}
          <div
            className="xl:col-span-2 rounded-2xl p-8 shadow"
            style={{
              background: 'white',
              border: '1px solid var(--color-secondary)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                  Weekly Performance
                </h3>
                <p style={{ color: 'var(--color-surface)' }}>
                  Your scores over the last 7 days
                </p>
              </div>
              <span
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'var(--color-dark)' }}
              >
                <FiTrendingUp /> Up 4.1%
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: 'var(--color-surface)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--color-surface)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{
                    borderRadius: 12,
                    border: '1px solid var(--color-secondary)',
                    background: '#fff',
                  }}/>
                  <Area type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Side Column */}
          <div className="space-y-6">
            {/* Upcoming Exam */}
            <div
              className="rounded-2xl p-6 shadow"
              style={{
                background: 'white',
                border: '1px solid var(--color-secondary)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                    Upcoming Exam
                  </h3>
                  <p style={{ color: 'var(--color-surface)' }}>Chemistry — Mon, 10:00 AM</p>
                </div>
                <FiAward style={{ color: 'var(--color-primary)', fontSize: 24 }} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>02</div>
                  <div className="text-xs" style={{ color: 'var(--color-surface)' }}>Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>14</div>
                  <div className="text-xs" style={{ color: 'var(--color-surface)' }}>Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>22</div>
                  <div className="text-xs" style={{ color: 'var(--color-surface)' }}>Minutes</div>
                </div>
              </div>
              <button
                className="mt-4 w-full py-2 rounded-lg text-white font-medium transition"
                style={{
                  background: 'var(--color-dark)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Set Reminder
              </button>
            </div>
            {/* Quick Actions */}
            <div
              className="rounded-2xl p-6 shadow"
              style={{
                background: 'white',
                border: '1px solid var(--color-secondary)',
              }}
            >
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-dark)' }}>Quick Start</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Start Mock Test', 'Open AI Chat', 'Create Flashcards', 'View Reports'].map(label => (
                  <button
                    key={label}
                    className="px-3 py-2 rounded-lg font-medium transition"
                    style={{
                      border: '1px solid var(--color-secondary)',
                      color: 'var(--color-dark)',
                      background: 'var(--color-muted)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activities + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-6 shadow"
            style={{
              background: 'white',
              border: '1px solid var(--color-secondary)',
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>Recent Activity</h3>
            <ul className="space-y-4">
              {activities.map(a => (
                <li key={a.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-primary)', marginTop: 4 }}></span>
                    <p style={{ color: 'var(--color-dark)' }}>{a.text}</p>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-surface)' }}>{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl p-6 shadow"
            style={{
              background: 'white',
              border: '1px solid var(--color-secondary)',
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>Your Tasks</h3>
            <ul className="space-y-3">
              {tasks.map(t => (
                <li key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiCheckSquare style={{ color: t.done ? 'var(--color-surface)' : 'var(--color-secondary)' }} />
                    <span style={{
                      color: t.done ? 'var(--color-surface)' : 'var(--color-dark)',
                      textDecoration: t.done ? 'line-through' : 'none',
                    }}>{t.label}</span>
                  </div>
                  <button
                    className="text-sm"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {t.done ? 'Review' : 'Mark done'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
