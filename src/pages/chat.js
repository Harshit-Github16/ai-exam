import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about your exams.' },
  ]);

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: 'user', content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden" style={{background:'var(--color-muted)'}}>
      {/* Decorative image */}
      <img src="/images/HeroSlider.png" alt="Chat banner" className="pointer-events-none absolute -top-8 -right-8 w-72 h-44 object-cover rounded-2xl opacity-30" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">AI Chat</h1>
        <p className="text-slate-600 mt-1 mb-6">Type your question below. The response will appear underneath.</p>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 rounded-xl border px-3 py-3 shadow-sm focus:outline-none"
            style={{borderColor:'var(--color-secondary)', background:'white', color:'var(--color-dark)'}}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-3 rounded-xl text-white disabled:opacity-50"
            style={{background:'var(--color-primary)'}}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>

        <div className="mt-5 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === 'user' ? 'ml-auto max-w-[80%] px-4 py-3 rounded-2xl' : 'mr-auto max-w-[80%] px-4 py-3 rounded-2xl border shadow-sm'}
              style={m.role === 'user' ? {background:'var(--color-dark)', color:'white'} : {background:'white', borderColor:'var(--color-secondary)', color:'var(--color-dark)'}}
            >
              {m.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


