import { useState } from 'react';
import { useRouter } from 'next/router';

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
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Registration failed');
        return;
      }
      router.push('/login');
    } catch (e) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4"
      style={{ background: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border"
        style={{ borderColor: 'var(--color-secondary)' }}
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-dark)' }}>
          Create account
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-surface)' }}>
          Join PrepVerse to start your journey.
        </p>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
            required
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
            required
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
            required
          />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile no"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
          />
          <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="DOB (YYYY-MM-DD)"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
          />
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
          />
          <input
            value={preparationFor}
            onChange={(e) => setPreparationFor(e.target.value)}
            placeholder="Preparation for (e.g., SSC, UPSC)"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 sm:col-span-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 sm:col-span-2"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg px-4 py-2 text-white font-medium shadow-md hover:shadow-lg transition disabled:opacity-50"
          style={{ background: 'var(--color-primary)' }}
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        {/* Link */}
        <p className="text-sm mt-4" style={{ color: 'var(--color-surface)' }}>
          Already have an account?{' '}
          <Link
            href="/login"
            className="underline"
            style={{ color: 'var(--color-dark)' }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
