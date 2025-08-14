export default function AIChatWindow() {
  return (
    <div className="bg-white p-4 rounded shadow h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold mb-3">AI Chat</h3>
      <div className="flex-1 border border-gray-300 p-3 rounded overflow-y-auto">
        <p className="text-gray-500">Chat coming soon...</p>
      </div>
      <input
        type="text"
        placeholder="Type your question..."
        className="mt-3 border rounded px-3 py-2 outline-none"
      />
    </div>
  );
}
