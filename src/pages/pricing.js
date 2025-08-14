import { useState } from 'react';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: ['Daily quiz (limited)', 'Basic analytics', 'Community access'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    features: ['Unlimited mock tests', 'AI chat explanations', 'Detailed analytics'],
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 599,
    features: ['Everything in Pro', 'Priority support', 'Job prep pack'],
  },
];

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState(null);
  const [processing, setProcessing] = useState(false);

  async function handlePay(plan) {
    setProcessing(true);
    // Mock payment
    await new Promise((r) => setTimeout(r, 1200));
    setActivePlan(plan.id);
    setProcessing(false);
  }

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden"
      style={{ background: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Decorative image */}
      {/* <img
        src="/images/HeroSlider.png"
        alt="Pricing banner"
        className="pointer-events-none absolute -top-10 right-0 w-80 h-48 object-cover rounded-2xl opacity-20"
      /> */}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-dark)' }}>
          Plans & Payment
        </h1>
        <p className="mt-2 mb-10" style={{ color: 'var(--color-surface)' }}>
          Choose the plan that fits your preparation style. Payments here are simulated — integrate
          Stripe / Razorpay later.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((p) => {
            const active = activePlan === p.id;
            return (
              <div
                key={p.id}
                className="flex flex-col rounded-2xl border shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                style={{ background: 'white', borderColor: 'var(--color-secondary)' }}
              >
                <div className="p-8 flex flex-col flex-1">
                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between">
                    <h2
                      className="text-2xl font-semibold"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {p.name}
                    </h2>
                    <div className="text-right">
                      <div
                        className="text-3xl font-bold leading-tight"
                        style={{ color: 'var(--color-dark)' }}
                      >
                        ₹{p.price}
                      </div>
                      <div
                        className="text-sm font-normal"
                        style={{ color: 'var(--color-surface)' }}
                      >
                        /month
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-3 flex-1" style={{ color: 'var(--color-dark)' }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: 'var(--color-primary)' }}
                        ></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Action button */}
                  <button
                    onClick={() => handlePay(p)}
                    disabled={processing}
                    className="mt-8 w-full px-5 py-3 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{
                      background: active ? 'var(--color-dark)' : 'var(--color-primary)',
                    }}
                  >
                    {active ? 'Active Plan' : processing ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
