import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [preparationFor, setPreparationFor] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          username,
          mobile,
          dob,
          city,
          state,
          preparationFor,
          password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push('/login');
    } catch (e) {
      setLoading(false);
      alert('Registration failed');
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center" style={{background:'var(--color-muted)'}}>
      <form onSubmit={onSubmit} className="w-full max-w-2xl card-base p-6">
        <h1 className="text-2xl font-semibold mb-1" style={{color:'var(--color-dark)'}}>Create account</h1>
        <p className="text-sm mb-4 text-slate-500">Join PrepVerse to start your journey.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First name" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last name" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile no" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={dob} onChange={(e)=>setDob(e.target.value)} placeholder="DOB (YYYY-MM-DD)" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={state} onChange={(e)=>setState(e.target.value)} placeholder="State" className="w-full rounded-lg border px-3 py-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={preparationFor} onChange={(e)=>setPreparationFor(e.target.value)} placeholder="Preparation for (e.g., SSC, UPSC)" className="w-full rounded-lg border px-3 py-2 sm:col-span-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-lg border px-3 py-2 sm:col-span-2" style={{borderColor:'var(--color-secondary)', color:'var(--color-dark)'}} />
        </div>
        <button type="submit" disabled={loading} className="mt-4 w-full rounded-lg px-4 py-2 text-white" style={{background:'var(--color-primary)'}}>
          {loading ? 'Creating...' : 'Register'}
        </button>
        <p className="text-sm mt-3 text-slate-500">Already have an account? <Link href="/login" className="underline" style={{color:'var(--color-dark)'}}>Login</Link></p>
      </form>
    </div>
  );
}


