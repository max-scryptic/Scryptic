import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Pixel, Hanken_Grotesk, IBM_Plex_Mono, Syne } from "next/font/google";

import { EmDashGuard } from "@/components/em-dash-guard";
import { themeScript } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  baseOpenGraph,
  baseTwitter,
  robotsFor,
  TITLE_SEPARATOR,
} from "@/lib/seo";
import { siteConfig, siteUrl } from "@/lib/site";
import {
  graph,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";

import "./globals.css";

// Brand type: Syne for the wordmark only, Bricolage Grotesque for page and
// section headings, Hanken Grotesk for text and smaller headings, IBM Plex
// Mono for numbers and code, and Geist Pixel for the small uppercase labels
// over sections, the nav links and button text.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

// Variable, with an optical size axis: it tightens and gains character at
// display sizes and stays plain at small ones.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin"],
});

// Search console ownership tags, read at build time. Unset ones are skipped.
const verification: Metadata["verification"] = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  yandex: process.env.YANDEX_SITE_VERIFICATION,
  other: process.env.BING_SITE_VERIFICATION
    ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
    : undefined,
};

// Defaults for every route. Pages override them through createMetadata() in
// src/lib/seo.ts; the favicon, app icons, Open Graph image and manifest come
// from the icon, apple-icon, opengraph-image and manifest files next to this.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.name,
    // Fallback for a page that sets a bare `title` string. Prefer createMetadata().
    template: `%s${TITLE_SEPARATOR}${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    ...baseTwitter,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: robotsFor(),
  verification,
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: { title: siteConfig.shortName },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.colors.background },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.colors.backgroundDark },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${syne.variable} ${bricolage.variable} ${hankenGrotesk.variable} ${ibmPlexMono.variable} ${geistPixel.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      // The theme script adds .dark before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so a dark-theme visitor never sees a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-full">
        {/* Site-wide entities; each page's graph links back to these by @id. */}
        <JsonLd data={graph(organizationJsonLd(), websiteJsonLd())} />
        <EmDashGuard />
        <SiteHeader />
        {/* The guide lines down both sides of every page, ending in a small square on
            the footer's top rule. Clipped sideways, as cards run their edges out to
            the viewport edges. */}
        <div className="ruled ruled-bottom isolate flex min-h-dvh flex-col overflow-x-clip">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
