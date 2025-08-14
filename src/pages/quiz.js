import { useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';

// Dummy questions (10)
const SAMPLE_QUESTIONS = [
  { id: 1, text: 'What is the derivative of x^2?', options: ['2x', 'x', 'x^3', '2'], answerIndex: 0 },
  { id: 2, text: 'Who proposed the theory of relativity?', options: ['Newton', 'Einstein', 'Bohr', 'Tesla'], answerIndex: 1 },
  { id: 3, text: 'Which is the largest planet in our solar system?', options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'], answerIndex: 2 },
  { id: 4, text: 'What is the capital of France?', options: ['Madrid','London','Paris','Berlin'], answerIndex: 2 },
  { id: 5, text: 'H2O is the chemical formula for?', options: ['Oxygen','Water','Hydrogen','Salt'], answerIndex: 1 },
  { id: 6, text: '5 × 8 = ?', options: ['45','35','40','48'], answerIndex: 2 },
  { id: 7, text: 'Speed = ?', options: ['Distance × Time','Distance / Time','Time / Distance','None'], answerIndex: 1 },
  { id: 8, text: 'Light year measures?', options: ['Time','Speed','Distance','Energy'], answerIndex: 2 },
  { id: 9, text: 'Smallest prime number?', options: ['0','1','2','3'], answerIndex: 2 },
  { id: 10, text: 'HTML stands for?', options: ['Hyper Text Markup Language','HighText Machine Language','Hyper Tabular Markup Language','None'], answerIndex: 0 },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [endTime, setEndTime] = useState(Date.now() + 30000); // 30 sec per question

  // Reset timer whenever question changes
  useEffect(() => {
    setEndTime(Date.now() + 30000);
  }, [current]);

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
    if (current < SAMPLE_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setSubmitted(true);
    }
  }

  const currentQ = SAMPLE_QUESTIONS[current];

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden"
      style={{ background: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Background decorative image */}
      <img
        src="/images/HeroSlider.png"
        alt="Quiz banner"
        className="pointer-events-none absolute -bottom-10 -left-10 w-72 h-40 object-cover rounded-2xl opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with timer */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-dark)' }}>Mock Exam</h1>
          <div
            className="rounded-xl bg-white border px-3 py-1.5 shadow-sm flex items-center gap-2"
            style={{ borderColor: 'var(--color-secondary)' }}
          >
            <span style={{ color: 'var(--color-surface)' }}>Time left:</span>
            <Countdown date={endTime} onComplete={onTimeUp} />
          </div>
        </div>

        {!submitted ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question */}
            <div
              className="lg:col-span-3 rounded-2xl p-5 shadow"
              style={{ background: 'white', border: '1px solid var(--color-secondary)' }}
            >
              <div style={{ color: 'var(--color-surface)' }} className="text-sm mb-2">
                Question {current + 1} of {SAMPLE_QUESTIONS.length}
              </div>
              <h2
                className="text-lg sm:text-xl font-semibold mb-4"
                style={{ color: 'var(--color-dark)' }}
              >
                {currentQ.text}
              </h2>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(currentQ.id, idx)}
                      className="text-left px-4 py-2.5 rounded-lg border shadow-sm transition"
                      style={
                        isSelected
                          ? { background: 'var(--color-dark)', borderColor: 'var(--color-dark)', color: 'white' }
                          : { background: 'white', color: 'var(--color-dark)', borderColor: 'var(--color-secondary)' }
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {/* Nav buttons */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  className="px-4 py-2 rounded-lg disabled:opacity-50"
                  style={{
                    border: '1px solid var(--color-secondary)',
                    background: 'white',
                    color: 'var(--color-dark)',
                  }}
                >
                  Previous
                </button>
                {current < SAMPLE_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrent((c) => Math.min(SAMPLE_QUESTIONS.length - 1, c + 1))}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ background: 'var(--color-dark)' }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>

            {/* Question palette */}
            <div
              className="rounded-2xl p-4 shadow"
              style={{ background: 'white', border: '1px solid var(--color-secondary)' }}
            >
              <h3 className="font-semibold mb-3" style={{ color: 'var(--color-dark)' }}>
                Questions
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {SAMPLE_QUESTIONS.map((q, idx) => {
                  const answered = answers[q.id] !== undefined;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(idx)}
                      className="h-9 rounded-md text-sm font-medium border"
                      style={
                        idx === current
                          ? { background: 'var(--color-dark)', color: 'white', borderColor: 'var(--color-dark)' }
                          : answered
                          ? {
                              background: 'var(--color-secondary)',
                              color: 'var(--color-dark)',
                              borderColor: 'var(--color-secondary)',
                            }
                          : {
                              background: 'white',
                              color: 'var(--color-dark)',
                              borderColor: 'var(--color-secondary)',
                            }
                      }
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Results
          <div
            className="mt-6 rounded-2xl p-6 shadow"
            style={{ background: 'white', border: '1px solid var(--color-secondary)' }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>
              Results
            </h2>
            <p style={{ color: 'var(--color-surface)' }}>
              Score: {score} / {SAMPLE_QUESTIONS.length}
            </p>
            <div className="mt-4">
              {SAMPLE_QUESTIONS.map((q, idx) => {
                const chosen = answers[q.id];
                const correct = q.answerIndex;
                const isCorrect = chosen === correct;
                return (
                  <div
                    key={q.id}
                    className="mb-3 rounded-xl border p-4"
                    style={{ borderColor: 'var(--color-secondary)' }}
                  >
                    <div style={{ color: 'var(--color-dark)' }} className="font-medium">
                      Q{idx + 1}. {q.text}
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="mr-3">
                        Your answer:{' '}
                        <span style={{ color: isCorrect ? 'green' : 'red' }}>
                          {q.options[chosen] ?? 'Not answered'}
                        </span>
                      </span>
                      <span>
                        Correct:{' '}
                        <span style={{ color: 'green' }}>{q.options[correct]}</span>
                      </span>
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
