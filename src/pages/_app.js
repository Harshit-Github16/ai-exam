import "@/styles/globals.css";
import SiteNavbar from "@/components/SiteNavbar";
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

function AppShell({ Component, pageProps }) {
  const router = useRouter();
  const showNavbar = !PUBLIC_ROUTES.includes(router.pathname);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNavbar && <SiteNavbar />}
      <Component {...pageProps} />
    </div>
  );
}

export default function App(props) {
  return (
    <SessionProvider session={props.pageProps?.session}>
      <AppShell {...props} />
    </SessionProvider>
  );
}
