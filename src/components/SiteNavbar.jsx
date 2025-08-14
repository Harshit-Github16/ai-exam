import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { FiMenu, FiX } from 'react-icons/fi';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('pvUser');
      setLoggedIn(Boolean(u) || status === 'authenticated');
    }
  }, [router.pathname, status]);

  const handleLogout = () => {
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
  };

  return (
    <div
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b"
      style={{ borderColor: 'var(--color-secondary)' }}
    >
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-lg grid place-items-center font-bold text-white"
            style={{ background: 'var(--color-dark)' }}
          >
            PV
          </div>
          <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>
            PrepVerse
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active =
              router.pathname === l.href ||
              (l.href === '/dashboard' && router.pathname === '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  active ? 'text-white' : ''
                }`}
                style={
                  active
                    ? { background: 'var(--color-dark)' }
                    : {
                        color: 'var(--color-dark)',
                        background: 'transparent',
                      }
                }
              >
                {l.label}
              </Link>
            );
          })}

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 rounded-lg text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              Logout
            </button>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg"
                style={{
                  border: '1px solid var(--color-secondary)',
                  color: 'var(--color-dark)',
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 rounded-lg text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl"
            style={{ color: 'var(--color-dark)' }}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
  <div
    className="fixed inset-0 z-[9999] bg-black/40 md:hidden h-screen"
    onClick={() => setMenuOpen(false)}
  >
    {/* Slide-in Drawer */}
    <div
      className="absolute top-0 left-0 h-full w-64 shadow-xl flex flex-col transition-transform duration-300"
      style={{
        background: 'var(--color-muted)',      // Solid theme bg
        borderRight: '1px solid var(--color-secondary)',
        transform: 'translateX(0)',           // for animation, set -100% for closed state if you want transition-in/out
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Header - sticky so always visible */}
      <div
        className="flex justify-between items-center px-2 py-2 mb-2 border-b"
        style={{
          borderColor: 'var(--color-secondary)',
          background: 'var(--color-muted)',
          position: 'sticky', top: 0, zIndex: 10,
        }}
      >
        <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>Menu</span>
        <button
          onClick={() => setMenuOpen(false)}
          className="text-2xl p-1"
          style={{ color: 'var(--color-dark)' }}
          aria-label="Close menu"
        >
          <FiX />
        </button>
      </div>
      {/* Links */}
      <nav className="flex flex-col gap-1 px-2 pt-2 pb-4 flex-1 overflow-y-auto">
        {links.map(l => {
          const active =
            router.pathname === l.href ||
            (l.href === '/dashboard' && router.pathname === '/');
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`w-full px-3 py-2 rounded-lg text-base font-medium transition ${
                active ? 'text-white' : ''
              }`}
              style={
                active
                  ? { background: 'var(--color-dark)' }
                  : {
                      color: 'var(--color-dark)',
                      background: 'transparent',
                    }
              }
            >{l.label}</Link>
          );
        })}
      </nav>
      {/* Auth area */}
      <div className="px-2 pb-2 border-t" style={{ borderColor: 'var(--color-secondary)' }}>
        {loggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full mt-3 px-3 py-2 rounded-lg font-medium text-white"
            style={{ background: 'var(--color-primary)' }}
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2 mt-3">
            <Link
              href="/login"
              className="flex-1 px-3 py-2 rounded-lg text-center font-medium"
              style={{
                border: '1px solid var(--color-secondary)',
                color: 'var(--color-dark)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 px-3 py-2 rounded-lg text-white text-center font-medium"
              style={{ background: 'var(--color-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
