
import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { FiBookOpen, FiClock, FiTrendingUp, FiBell, FiSearch, FiPlus, FiCheckSquare, FiAward } from 'react-icons/fi';

function Dashboard() {
  const kpis = useMemo(() => ([
    { title: 'Completed Exams', value: 12, delta: '+3 this week', icon: <FiBookOpen className="text-blue-600" /> },
    { title: 'Study Hours', value: '42h', delta: '+6h this week', icon: <FiClock className="text-emerald-600" /> },
    { title: 'Avg. Score', value: '88%', delta: '+2.3%', icon: <FiTrendingUp className="text-purple-600" /> },
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center text-white">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold">Welcome back to PrepVerse</h1>
            <p className="mt-2 text-indigo-100">Track your prep, attempt mocks, and stay updated — all in one place.</p>
            <div className="mt-5 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white text-indigo-700 hover:bg-indigo-100">Start Mock</button>
              <button className="px-4 py-2 rounded-lg bg-white/10 ring-1 ring-white/40 hover:bg-white/20">View Reports</button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src="/images/HeroSlider.png" alt="PrepVerse dashboard preview" className="w-full h-40 object-cover rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome back 👋</h1>
          <p className="text-slate-600 mt-1">Here’s your learning snapshot and what’s next.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{kpi.icon}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{kpi.delta}</span>
              </div>
              <div className="mt-4">
                <div className="text-sm text-slate-500">{kpi.title}</div>
                <div className="text-3xl font-semibold text-slate-900 mt-1">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Side Column */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Weekly Performance</h3>
                <p className="text-slate-500 text-sm">Your scores over the last 7 days</p>
              </div>
              <span className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium"><FiTrendingUp /> Up 4.1%</span>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Upcoming Exam</h3>
                  <p className="text-slate-500 text-sm">Chemistry — Mon, 10:00 AM</p>
                </div>
                <FiAward className="text-amber-500 text-2xl" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold text-slate-900">02</div>
                  <div className="text-xs text-slate-500">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900">14</div>
                  <div className="text-xs text-slate-500">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900">22</div>
                  <div className="text-xs text-slate-500">Minutes</div>
                </div>
              </div>
              <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Set Reminder</button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick Start</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">Start Mock Test</button>
                <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">Open AI Chat</button>
                <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">Create Flashcards</button>
                <button className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left">View Reports</button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity + Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    <p className="text-slate-700">{a.text}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Tasks</h3>
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiCheckSquare className={t.done ? 'text-emerald-500' : 'text-slate-400'} />
                    <span className={t.done ? 'line-through text-slate-400' : 'text-slate-700'}>{t.label}</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">{t.done ? 'Review' : 'Mark done'}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
