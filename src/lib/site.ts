/*
 * Single source of truth for who the site is and where it lives. Metadata,
 * the sitemap, robots.txt, llms.txt, the web manifest, generated icons and
 * JSON-LD all read from here, so rebranding is an edit to this file (plus the
 * mark in brand-logo.tsx) rather than a hunt through the app.
 */

export const siteConfig = {
  name: "Scryptic",
  shortName: "Scryptic",
  // Used as the default meta description, og:description and the llms.txt
  // summary. Aim for one plain sentence of 120 to 160 characters that says what
  // the product is and who it is for: answer engines quote it verbatim.
  description:
    "Scryptic is a development studio that takes founders from idea to launched app. Start with a discovery call and audit, then ship a full build from $10k.",
  // Short line used in the hero eyebrow and the footer.
  tagline: "Development as a service",
  // Optional longer context for llms.txt. Leave empty to omit.
  summary:
    "Scryptic offers two services: a discovery call and audit that turns an idea or an existing product into a scoped plan and written estimate, and a full app to market build, from $10k depending on complexity.",
  keywords: [
    "development as a service",
    "app development studio",
    "MVP development",
    "SaaS development",
    "technical audit",
    "web app development",
  ] as string[],
  locale: "en_US",
  language: "en",
  // Keep these in step with --background and --primary in globals.css.
  // Generated images cannot read CSS variables and do not understand oklch.
  colors: {
    background: "#ffffff",
    foreground: "#0a0a0f",
    primary: "#047857",
    primaryForeground: "#ffffff",
    muted: "#f4f4f6",
    mutedForeground: "#5c5c6b",
  },
  organization: {
    legalName: "Scryptic",
    email: "maxwinterleinweber@gmail.com",
    foundingDate: "",
  },
  // Where "Book a discovery call" goes. A scheduling link (Cal.com, Calendly)
  // when there is one; otherwise the buttons open an email to the address above.
  bookingUrl: "" as string,
  // Handle including the @, for twitter:site and twitter:creator.
  twitterHandle: "",
  // Every official profile (X, LinkedIn, GitHub, YouTube, Crunchbase,
  // Wikipedia, ...). Emitted as schema.org sameAs, which is how search and
  // answer engines tie the brand to one entity.
  sameAs: [] as string[],
} as const

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit

  // Vercel system environment variables. Production points at the real domain
  // so canonicals and og:url are right even before NEXT_PUBLIC_SITE_URL is set;
  // previews point at themselves so shared links render their own OG image.
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL
  if (vercelHost) return `https://${vercelHost}`

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const siteUrl = new URL(resolveSiteUrl())

/**
 * Whether search engines may index this deployment. Only production is
 * indexable: preview and local builds send noindex everywhere (meta tag,
 * X-Robots-Tag header and robots.txt) so they never compete with the real
 * site. Set SITE_NOINDEX=1 to block a production deployment as well, for
 * example a staging host outside Vercel.
 */
export const isIndexable =
  process.env.SITE_NOINDEX !== "1" &&
  (process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production")

/** Target of every "Book a discovery call" button. */
export const bookingHref =
  siteConfig.bookingUrl ||
  `mailto:${siteConfig.organization.email}?subject=${encodeURIComponent("Discovery call")}`

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString()
}
