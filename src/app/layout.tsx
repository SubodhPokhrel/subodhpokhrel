import type { Metadata, Viewport } from "next";
import { fontMono, fontSans } from "@/lib/fonts";
import { env } from "@/lib/env";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

/** Set the theme before first paint to avoid a flash (defaults to dark). */
const themeBootstrap = `(()=>{try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Subodh Pokhrel — Designer & Developer",
    template: "%s — Subodh Pokhrel",
  },
  description:
    "Portfolio of Subodh Pokhrel — UI/UX & graphics designer and developer crafting fast, refined digital products.",
  applicationName: "Subodh Pokhrel",
  authors: [{ name: "Subodh Pokhrel", url: SITE_URL }],
  creator: "Subodh Pokhrel",
  keywords: [
    "Subodh Pokhrel",
    "portfolio",
    "UI UX designer",
    "graphic designer",
    "frontend developer",
    "Next.js",
    "product design",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Subodh Pokhrel",
    title: "Subodh Pokhrel — Designer & Developer",
    description: "UI/UX & graphics designer and developer crafting fast, refined digital products.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Subodh Pokhrel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subodh Pokhrel — Designer & Developer",
    description: "UI/UX & graphics designer and developer crafting fast, refined digital products.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-surface px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
