"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  const [billing, setBilling] = useState("monthly");

  const features = [
    { title: "AI Doubt Solver", desc: "Ask anything, get step‑by‑step explanations.", icon: "🤖" },
    { title: "Timed Mock Exams", desc: "Real exam-like interface with auto‑grading.", icon: "⏱️" },
    { title: "PYQs & Important", desc: "Previous years + high‑yield curated questions.", icon: "📚" },
    { title: "Detailed Analytics", desc: "Weak topics, speed, accuracy and trends.", icon: "📈" },
    { title: "Job & News Feed", desc: "Latest jobs and current affairs, updated daily.", icon: "📰" },
    { title: "Flashcards & Notes", desc: "Quick revision sets for last‑minute prep.", icon: "🗂️" },
  ];

  const exams = ["UPSC", "SSC", "Bank PO", "Railways", "Defence", "State PSC"];
  const testimonials = [
    { name: "Ravi Kumar", text: "PrepVerse helped me cross 85% consistently in mocks!" },
    { name: "Ananya Sharma", text: "PYQs + reports = focused prep. Loved the UI." },
    { name: "Vikram Singh", text: "AI tutor cleared my doubts in minutes." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-muted)" }}>
      {/* ===== HERO (unchanged) ===== */}
      <section className="brand-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-white"
            >
              Crack your exam with confidence
            </motion.h1>
            <p className="mt-3 text-white/90 text-lg max-w-xl">
              PrepVerse brings AI chat, PYQs, timed mocks and laser-focused analytics into one
              beautiful dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/register")}
                className="px-6 py-3 rounded-lg text-white font-semibold"
                style={{ background: "var(--color-dark)" }}
              >
                Get Started
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 rounded-lg font-semibold bg-white/20 text-white ring-1 ring-white/50"
              >
                Login
              </button>
            </div>
            <div className="mt-6 flex gap-4 text-white/90">
              <div className="text-sm">
                <span className="font-semibold">10k+</span> questions
              </div>
              <div className="text-sm">
                <span className="font-semibold">1000+</span> mocks
              </div>
              <div className="text-sm">
                <span className="font-semibold">Live</span> job updates
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/HeroSlider.png"
              alt="App preview"
              className="w-full h-80 md:h-[26rem] object-cover rounded-2xl shadow-2xl"
            />
            <div className="hidden md:block absolute -bottom-4 -left-4 bg-white/80 backdrop-blur rounded-xl px-4 py-2 shadow">
              <div className="text-sm" style={{ color: "var(--color-dark)" }}>
                AI tutor • Mock exams • Reports
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--color-dark)" }}
        >
          Everything you need to excel
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="text-4xl">{f.icon}</div>
              <div
                className="mt-4 font-semibold text-lg"
                style={{ color: "var(--color-dark)" }}
              >
                {f.title}
              </div>
              <p className="text-slate-600 text-sm mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXAMS ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "white" }}>
        <div className="mx-auto max-w-7xl">
          <h3
            className="text-3xl font-bold text-center"
            style={{ color: "var(--color-dark)" }}
          >
            Exams we cover
          </h3>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {exams.map((e) => (
              <div
                key={e}
                className="text-center rounded-lg px-4 py-3 border shadow-sm hover:shadow-md transition"
                style={{
                  borderColor: "var(--color-secondary)",
                  color: "var(--color-dark)",
                }}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h3
          className="text-3xl font-bold text-center"
          style={{ color: "var(--color-dark)" }}
        >
          How it works
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Create your account", "Attempt mocks & ask AI", "Track progress & improve"].map(
            (s, i) => (
              <div
                key={s}
                className="p-6 text-center rounded-xl bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <div
                  className="mx-auto h-12 w-12 rounded-full grid place-items-center text-white font-semibold text-lg"
                  style={{ background: "var(--color-primary)" }}
                >
                  {i + 1}
                </div>
                <div
                  className="mt-4 font-semibold text-lg"
                  style={{ color: "var(--color-dark)" }}
                >
                  {s}
                </div>
                <p className="text-slate-600 text-sm mt-2">
                  We guide you step-by-step from signup to success.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "white" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3
              className="text-3xl font-bold"
              style={{ color: "var(--color-dark)" }}
            >
              Flexible plans
            </h3>
            <div
              className="rounded-lg overflow-hidden flex border"
              style={{ borderColor: "var(--color-secondary)" }}
            >
              {["monthly", "yearly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={`px-4 py-2 text-sm ${
                    billing === type ? "text-white" : ""
                  }`}
                  style={
                    billing === type
                      ? { background: "var(--color-dark)" }
                      : { color: "var(--color-dark)" }
                  }
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: 0, items: ["Daily quiz (limited)", "Basic analytics", "Community"] },
              { name: "Pro", price: 299, items: ["Unlimited mocks", "AI chat explanations", "Detailed analytics"] },
              { name: "Ultimate", price: 599, items: ["Everything in Pro", "Priority support", "Job prep pack"] },
            ].map((p) => (
              <div
                key={p.name}
                className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold" style={{ color: "var(--color-dark)" }}>
                    {p.name}
                  </div>
                  <div className="text-2xl font-bold" style={{ color: "var(--color-dark)" }}>
                    ₹{p.price}
                    <span className="text-sm text-slate-500">/mo</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-slate-700">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: "var(--color-primary)" }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push("/register")}
                  className="mt-6 w-full rounded-lg px-4 py-2 text-white font-medium"
                  style={{ background: "var(--color-primary)" }}
                >
                  Choose {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h3
          className="text-3xl font-bold text-center"
          style={{ color: "var(--color-dark)" }}
        >
          Loved by students
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <p className="text-slate-700 italic">“{t.text}”</p>
              <div className="mt-3 font-semibold" style={{ color: "var(--color-dark)" }}>
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="brand-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 text-center text-white">
          <h3 className="text-3xl font-bold">Ready to start your journey?</h3>
          <p className="mt-2 text-white/90">
            Create your free account and try a mock test in less than 60 seconds.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ background: "var(--color-dark)" }}
            >
              Create account
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-lg font-semibold bg-white/20 ring-1 ring-white/50 text-white"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8" style={{ background: "white" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} PrepVerse. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
