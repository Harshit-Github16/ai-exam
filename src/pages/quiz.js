import { useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    text: 'What is the derivative of x^2?',
    options: ['2x', 'x', 'x^3', '2'],
    answerIndex: 0,
  },
  {
    id: 2,
    text: 'Who proposed the theory of relativity?',
    options: ['Newton', 'Einstein', 'Bohr', 'Tesla'],
    answerIndex: 1,
  },
  {
    id: 3,
    text: 'Which is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
    answerIndex: 2,
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [endTime, setEndTime] = useState(Date.now() + 15 * 60 * 1000); // 15 min

  useEffect(() => {
    // Reset on mount
    setEndTime(Date.now() + 15 * 60 * 1000);
  }, []);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return SAMPLE_QUESTIONS.reduce((acc, q) => {
      const chosen = answers[q.id];
      return acc + (chosen === q.answerIndex ? 1 : 0);
    }, 0);
  }, [submitted, answers]);

  function selectOption(qId, idx) {
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function onTimeUp() {
    setSubmitted(true);
  }

  const currentQ = SAMPLE_QUESTIONS[current];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden" style={{background:'var(--color-muted)'}}>
      <img src="/images/HeroSlider.png" alt="Quiz banner" className="pointer-events-none absolute -bottom-10 -left-10 w-72 h-40 object-cover rounded-2xl opacity-20" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Mock Exam</h1>
          <div className="rounded-xl bg-white border px-3 py-1.5 shadow-sm" style={{borderColor:'var(--color-secondary)'}}>
            <span className="text-slate-500 mr-2">Time left:</span>
            <Countdown date={endTime} onComplete={onTimeUp} />
          </div>
        </div>

        {!submitted ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 card-base p-5">
              <div className="text-slate-500 text-sm mb-2">Question {current + 1} of {SAMPLE_QUESTIONS.length}</div>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">{currentQ.text}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(currentQ.id, idx)}
                      className={'text-left px-4 py-2.5 rounded-lg border shadow-sm transition ' + (isSelected ? 'text-white' : '')}
                      style={isSelected ? {background:'var(--color-dark)', borderColor:'var(--color-dark)'} : {background:'white', color:'var(--color-dark)', borderColor:'var(--color-secondary)'}}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  className="px-4 py-2 rounded-lg disabled:opacity-50"
                  style={{border:'1px solid var(--color-secondary)', background:'white', color:'var(--color-dark)'}}
                >
                  Previous
                </button>
                {current < SAMPLE_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrent((c) => Math.min(SAMPLE_QUESTIONS.length - 1, c + 1))}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{background:'var(--color-primary)'}}
                  >
                    Next
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="px-4 py-2 rounded-lg text-white" style={{background:'var(--color-dark)'}}>
                    Submit
                  </button>
                )}
              </div>
            </div>

            <div className="card-base p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {SAMPLE_QUESTIONS.map((q, idx) => {
                  const answered = answers[q.id] !== undefined;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(idx)}
                      className={'h-9 rounded-md text-sm font-medium border'}
                      style={idx === current ? {background:'var(--color-dark)', color:'white', borderColor:'var(--color-dark)'} : answered ? {background:'var(--color-secondary)', color:'var(--color-dark)', borderColor:'var(--color-secondary)'} : {background:'white', color:'var(--color-dark)', borderColor:'var(--color-secondary)'}}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 card-base p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Results</h2>
            <p className="text-slate-600">Score: {score} / {SAMPLE_QUESTIONS.length}</p>
            <div className="mt-4">
              {SAMPLE_QUESTIONS.map((q, idx) => {
                const chosen = answers[q.id];
                const correct = q.answerIndex;
                const isCorrect = chosen === correct;
                return (
                  <div key={q.id} className="mb-3 rounded-xl border p-4" style={{borderColor:'var(--color-secondary)'}}>
                    <div className="font-medium text-slate-900">Q{idx + 1}. {q.text}</div>
                    <div className="mt-2 text-sm">
                      <span className="mr-3">Your answer: <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{q.options[chosen] ?? 'Not answered'}</span></span>
                      <span>Correct: <span className="text-emerald-700">{q.options[correct]}</span></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


