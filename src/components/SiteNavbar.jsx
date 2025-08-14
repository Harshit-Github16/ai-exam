import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/chat', label: 'Chat' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/questions', label: 'Questions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/news', label: 'News' },
];

export default function SiteNavbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('pvUser');
      setLoggedIn(Boolean(u) || status === 'authenticated');
    }
  }, [router.pathname, status]);

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b" style={{borderColor:'var(--color-secondary)'}}>
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg grid place-items-center font-bold text-white" style={{background:'var(--color-dark)'}}>PV</div>
          <span className="font-semibold" style={{color:'var(--color-dark)'}}>PrepVerse</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = router.pathname === l.href || (l.href === '/dashboard' && router.pathname === '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${active ? 'text-white' : ''}`}
                style={active ? {background:'var(--color-dark)'} : {color:'var(--color-dark)', background:'transparent'}}
              >
                {l.label}
              </Link>
            );
          })}
          {loggedIn ? (
            <button
              onClick={() => {
                try {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('pvUser');
                    sessionStorage.clear();
                    document.cookie = 'next-auth.session-token=; Max-Age=0; path=/';
                    document.cookie = 'next-auth.session-token.0=; Max-Age=0; path=/';
                  }
                  signOut({ redirect: false });
                } catch {}
                router.push('/login');
              }}
              className="ml-2 px-3 py-1.5 rounded-lg text-white"
              style={{background:'var(--color-primary)'}}
            >
              Logout
            </button>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link href="/login" className="px-3 py-1.5 rounded-lg" style={{border:'1px solid var(--color-secondary)', color:'var(--color-dark)'}}>Login</Link>
              <Link href="/register" className="px-3 py-1.5 rounded-lg text-white" style={{background:'var(--color-primary)'}}>Register</Link>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <select
            value={links.find((l) => router.pathname === l.href)?.href || ''}
            onChange={(e) => router.push(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-slate-900"
          >
            <option value="" disabled>
              Navigate
            </option>
            {links.map((l) => (
              <option key={l.href} value={l.href}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  );
}


