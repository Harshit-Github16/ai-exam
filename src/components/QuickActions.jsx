export default function QuickActions() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        <button className="bg-blue-500 text-white py-2 rounded">Start Mock Exam</button>
        <button className="bg-green-500 text-white py-2 rounded">Open AI Chat</button>
        <button className="bg-purple-500 text-white py-2 rounded">View Reports</button>
      </div>
    </div>
  );
}
