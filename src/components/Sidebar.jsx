// components/Sidebar.jsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        📊 My Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-800">🏠 Dashboard</Link>
        <Link href="/chat" className="block px-3 py-2 rounded hover:bg-gray-800">💬 AI Chat</Link>
        <Link href="/mock-exams" className="block px-3 py-2 rounded hover:bg-gray-800">📝 Mock Exams</Link>
        <Link href="/reports" className="block px-3 py-2 rounded hover:bg-gray-800">📑 Reports</Link>
        <Link href="/profile" className="block px-3 py-2 rounded hover:bg-gray-800">⚙️ Settings</Link>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm">
        © {new Date().getFullYear()} MyApp
      </div>
    </aside>
  );
}
