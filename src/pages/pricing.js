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
    // Mock payment flow
    await new Promise((r) => setTimeout(r, 1200));
    setActivePlan(plan.id);
    setProcessing(false);
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden" style={{background:'var(--color-muted)'}}>
      <img src="/images/HeroSlider.png" alt="Pricing banner" className="pointer-events-none absolute -top-10 right-0 w-80 h-48 object-cover rounded-2xl opacity-25" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Plans & Payment</h1>
        <p className="text-slate-600 mt-1 mb-8">Choose the plan that fits your prep. Payments are simulated here; integrate Stripe/Razorpay later.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div key={p.id} className="card-base p-6 hover:shadow-md transition">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{p.name}</h2>
                <div className="text-2xl font-bold text-slate-900">₹{p.price}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
              </div>
              <ul className="mt-4 space-y-2" style={{color:'var(--color-dark)'}}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{background:'var(--color-primary)'}}></span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePay(p)}
                disabled={processing}
                className={'mt-6 w-full px-4 py-2 rounded-lg text-white'}
                style={activePlan === p.id ? {background:'var(--color-dark)'} : {background:'var(--color-primary)'}}
              >
                {activePlan === p.id ? 'Active' : processing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


