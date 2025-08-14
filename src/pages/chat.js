import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about your exams.' },
  ]);

  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex flex-col"
      style={{ background: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Decorative Image */}
      <img
        src="/images/HeroSlider.png"
        alt="Chat banner"
        className="pointer-events-none absolute top-4 right-4 w-60 h-36 object-cover rounded-2xl opacity-20"
      />

      {/* Chat Container */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={
              m.role === 'user'
                ? 'ml-auto max-w-[75%]'
                : 'mr-auto max-w-[75%]'
            }
          >
            <div
              className="px-4 py-3 rounded-2xl shadow-sm whitespace-pre-line break-words"
              style={
                m.role === 'user'
                  ? {
                      background: 'var(--color-dark)',
                      color: 'white',
                    }
                  : {
                      background: 'white',
                      color: 'var(--color-dark)',
                      border: '1px solid var(--color-secondary)',
                    }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky at Bottom */}
      <form
        onSubmit={handleSend}
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-2 sticky bottom-0 bg-[var(--color-muted)]"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border px-3 py-3 shadow-sm focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-secondary)',
            background: 'white',
            color: 'var(--color-dark)',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-3 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow hover:opacity-90 transition"
          style={{ background: 'var(--color-primary)' }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
