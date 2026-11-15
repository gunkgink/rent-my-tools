import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/noto-sans-thai/400.css";
import Link from "@/components/Link";
import { identity } from "@/lib/auth";
import AccountActions from "@/components/AccountActions";
import "./globals.css";
export const metadata = {
  title: "Rent My Tools — Equipment for your next project",
  description: "Browse equipment and manage short rental requests.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await identity();
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header>
          <nav className="container">
            <Link prefetch={false} className="brand" href="/">
              <span className="mark">⌑</span> Rent My Tools
            </Link>
            <div className="navlinks">
              <Link prefetch={false} href="/equipment">
                Browse equipment
              </Link>
              {current?.user.role === "member" && (
                <Link prefetch={false} href="/requests">
                  My requests
                </Link>
              )}
              {current?.user.role === "admin" && (
                <>
                  <Link prefetch={false} href="/admin/equipment">
                    Manage equipment
                  </Link>
                  <Link prefetch={false} href="/admin/requests">
                    All requests
                  </Link>
                </>
              )}
              {current ? (
                <>
                  <Link prefetch={false} href="/account">
                    {current.user.name}
                  </Link>
                  <AccountActions />
                </>
              ) : (
                <>
                  <Link prefetch={false} href="/login">
                    Log in
                  </Link>
                  <Link
                    prefetch={false}
                    className="button small"
                    href="/register"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main id="main" className="container">
          {children}
        </main>
        <footer className="container">
          <strong>Rent My Tools</strong>
          <p>Equipment for short projects. Requests do not reserve stock.</p>
          <Link prefetch={false} href="/equipment">
            Explore the equipment library
          </Link>
          <span>Course Project 2 · Equipment Rental System</span>
        </footer>
      </body>
    </html>
  );
}
