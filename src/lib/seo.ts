import type { Metadata, MetadataRoute } from "next"

import { posts, type BlogPost } from "@/lib/blog"
import { freeTools, type FreeTool } from "@/lib/free-tools"
import { mvp, supportPlan } from "@/lib/services"
import { isIndexable, siteConfig } from "@/lib/site"
import { caseStudies, type CaseStudy } from "@/lib/work"

/*
 * Every public route is registered here once. The entry drives the page's
 * <title>, description, canonical URL, Open Graph and Twitter tags (through
 * createMetadata), its sitemap.xml row, its llms.txt line and its JSON-LD, so
 * those can never disagree with each other.
 *
 * Adding a page: add an entry, then in the page file
 *   export const metadata = createMetadata(pages.pricing)
 * and render <PageJsonLd page={pages.pricing} /> in its body.
 */

type SitemapEntry = MetadataRoute.Sitemap[number]

export type PageEntry = {
  /** Path from the site root, starting with "/". */
  path: string
  /** Page name without the app name, which pageTitle() appends. No colons or dashes as separators. */
  title: string
  /**
   * A shorter name for the <title> only, when `title` would push the full page
   * title past MAX_TITLE_LENGTH. Breadcrumbs, JSON-LD and llms.txt keep `title`.
   */
  searchTitle?: string
  /** 120 to 160 characters, written as a direct answer to "what is this page?". */
  description: string
  /** Breadcrumb trail above this page, nearest last. Home is implied. */
  parents?: readonly PageEntry[]
  /** Only set when you know the real date; a fake "now" teaches crawlers to ignore it. */
  lastModified?: SitemapEntry["lastModified"]
  changeFrequency?: SitemapEntry["changeFrequency"]
  priority?: number
  /** Keep out of search results, the sitemap and llms.txt. */
  noIndex?: boolean
  /** Open Graph object type. Articles should also render articleJsonLd. */
  type?: "website" | "article"
  /** Share image path, when this route has its own opengraph-image. */
  image?: string
}

const home = {
  path: "/",
  title: siteConfig.name,
  description: siteConfig.description,
  // The last real change to the home page copy. Bump it when the copy changes.
  lastModified: "2026-11-02",
  changeFrequency: "weekly",
  priority: 1,
} satisfies PageEntry

/** The newest post's date, so /blog's sitemap row moves when a post is added or updated. */
const latestPostDate = posts
  .map((post) => post.dateModified ?? post.datePublished)
  .sort()
  .at(-1)

// Each service has a landing page under /services. There is no /services hub
// (next.config.ts redirects it home); the footer lists them from
// src/lib/service-pages.ts.
const servicePageEntries = {
  mvpDevelopment: {
    path: "/services/mvp-development",
    title: "MVP development services for UK startups",
    description:
      "MVP development services for UK startups: built in a fixed-price 2 or 3 week sprint and launched with sign-in, payments and analytics live. You own the code.",
    lastModified: "2026-11-18",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  webAppDevelopment: {
    path: "/services/web-app-development",
    title: "Web app development services from UK developers",
    description:
      "Custom web app development for UK businesses and founders: one workflow built as production code in a fixed-price 2 or 3 week sprint, the code in your name.",
    lastModified: "2026-11-18",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  mobileAppDevelopment: {
    path: "/services/mobile-app-development",
    title: "Mobile app development services",
    description:
      "Native iOS and Android app development for UK founders: built in Swift and Kotlin in a fixed-price sprint, then published from your own store accounts.",
    lastModified: "2026-11-10",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  noCodeMigration: {
    path: "/services/no-code-migration",
    title: "No-code app migration",
    description:
      "Move your Bubble, Lovable, Adalo, Glide or Airtable app to code you own. Scryptic migrates your data and users to a production stack in a fixed-price sprint.",
    lastModified: "2026-11-02",
    changeFrequency: "monthly",
    priority: 0.9,
  },
} satisfies Record<string, PageEntry>

export const pages = {
  home,
  bookCall: {
    path: "/book-a-call",
    title: "Book a call",
    searchTitle: "Book a free discovery call about your app",
    description:
      "Book a free 30 minute discovery call with Scryptic. Answer four quick questions about your app, then pick a time to talk scope, cost and timeline.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  work: {
    path: "/work",
    title: "Case studies",
    searchTitle: "Case studies of the apps we built and launched",
    description:
      "Case studies of the web and mobile apps Scryptic designed, built and launched: the problem each solves, the product we shipped and the engineering behind it.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  tools: {
    path: "/tools",
    title: "Free tools",
    searchTitle: "Free MVP and app planning tools for founders",
    description: `Free tools for founders from ${siteConfig.name}: an MVP cost calculator, scope planner, no-code quiz, launch checklist, and SEO and AI agent readiness checks.`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  ...servicePageEntries,
  pricing: {
    path: "/pricing",
    title: "Pricing",
    searchTitle: "Fixed-price MVP and app development pricing",
    description: `${siteConfig.name} pricing: fixed-price MVP sprints from ${mvp.price} + VAT, optional support at ${supportPlan.price} a ${supportPlan.per}, and hosting billed to you at cost in accounts in your name.`,
    lastModified: "2026-11-22",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  blog: {
    path: "/blog",
    title: "Blog",
    searchTitle: "Guides to building and launching apps | Blog",
    description: `Practical guides from the ${siteConfig.name} studio on planning, building, launching and growing apps, written by the developers who build them for founders.`,
    lastModified: latestPostDate,
    changeFrequency: "weekly",
    priority: 0.7,
  },
} satisfies Record<string, PageEntry>

/** The registry entry for a case study's /work/<slug> page, built from src/lib/work.ts. */
export function caseStudyPage(study: CaseStudy): PageEntry {
  return {
    path: `/work/${study.slug}`,
    title: study.name,
    description: study.description,
    parents: [pages.work],
    changeFrequency: "yearly",
    priority: 0.6,
  }
}

export const caseStudyPages: PageEntry[] = caseStudies.map(caseStudyPage)

/** The registry entry for a free tool's /tools/<slug> page, built from src/lib/free-tools. */
export function toolPage(tool: FreeTool): PageEntry {
  return {
    path: `/tools/${tool.slug}`,
    title: tool.name,
    description: tool.description,
    parents: [pages.tools],
    changeFrequency: "monthly",
    priority: 0.7,
  }
}

export const toolPages: PageEntry[] = freeTools.map(toolPage)

/** The registry entry for a post's /blog/<slug> page, built from src/lib/blog. */
export function blogPostPage(post: BlogPost): PageEntry {
  return {
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    searchTitle: post.searchTitle,
    parents: [pages.blog],
    lastModified: post.dateModified ?? post.datePublished,
    changeFrequency: "yearly",
    priority: 0.6,
    type: "article",
    // Generated by src/app/blog/[slug]/opengraph-image.tsx.
    image: `/blog/${post.slug}/opengraph-image`,
  }
}

export const blogPostPages: PageEntry[] = posts.map(blogPostPage)

export const publicPages: PageEntry[] = [
  ...Object.values(pages),
  ...caseStudyPages,
  ...toolPages,
  ...blogPostPages,
].filter((page: PageEntry) => !page.noIndex)

/**
 * Robots directives for a page. The googlebot line lifts Google's default
 * snippet and preview limits so AI Overviews and rich results can quote and
 * show as much of the page as they need.
 */
export function robotsFor(noIndex = false): Metadata["robots"] {
  if (!isIndexable) return { index: false, follow: false }
  if (noIndex) return { index: false, follow: true }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  }
}

/*
 * Page titles (the browser tab, search result headline and og:title) are
 * segments joined by a pipe, most specific first and the app name last:
 *   "Acme Inc."                      the home page
 *   "Login | Acme Inc."              a top-level page
 *   "Invoice 42 | Billing | Acme Inc."
 * Never a colon or a dash as the separator. ESLint rejects authored titles
 * that use one; pageTitle() also rewrites them, for titles that come from
 * data (a CMS post called "Launch: what's new" becomes "Launch | what's new").
 *
 * A full title is at most MAX_TITLE_LENGTH characters: Bing Webmaster Tools
 * flags longer ones, and Google cuts them off in results. When it would run
 * over, the parent segments are dropped, the one next to the app name first
 * ("A long post title | Blog | Acme Inc." becomes "A long post title | Acme
 * Inc."). If the page's own name is still too long, pageTitle() throws, which
 * fails the build; give the page a shorter `searchTitle` in the registry.
 */
export const TITLE_SEPARATOR = " | "
export const MAX_TITLE_LENGTH = 70

function normalizeTitleSegment(segment: string) {
  return segment
    .replace(/\s*:(?=\s|$)/g, TITLE_SEPARATOR)
    .replace(/\s+[-\u2013\u2014\u2015]\s+/g, TITLE_SEPARATOR)
    .replace(/\s*\|\s*/g, TITLE_SEPARATOR)
    .replace(/\s+/g, " ")
    .trim()
}

/** Joins title segments with the pipe separator, app name last. */
export function pageTitle(...segments: string[]) {
  const parts = [...segments, siteConfig.name]
    .map(normalizeTitleSegment)
    .flatMap((segment) => segment.split(TITLE_SEPARATOR))
    .map((segment) => segment.trim())
    .filter((segment, index, all) => segment && all.indexOf(segment) === index)

  // Drop parents, nearest the app name first, until the title fits. The first
  // segment (the page's own name) and the app name always stay.
  while (parts.join(TITLE_SEPARATOR).length > MAX_TITLE_LENGTH && parts.length > 2) {
    parts.splice(parts.length - 2, 1)
  }

  const title = parts.join(TITLE_SEPARATOR)
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `Page title "${title}" is ${title.length} characters, over the ${MAX_TITLE_LENGTH} character limit. ` +
        `Give the page a shorter searchTitle (for a blog post, in its file under src/lib/blog/posts).`,
    )
  }
  return title
}

const twitterAccounts = siteConfig.twitterHandle
  ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
  : {}

/**
 * The default share card, generated by src/app/opengraph-image.tsx. Listed
 * explicitly because a page that sets its own `openGraph` would otherwise drop
 * the inherited image. A route with its own opengraph-image file still wins
 * for og:image; pass its URL as `image` in the registry to match twitter:image.
 */
export const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.description}`,
}

/** Fields every page shares. The root layout spreads this in. */
export const baseOpenGraph = {
  type: "website",
  siteName: siteConfig.name,
  locale: siteConfig.locale,
  images: [shareImage],
} satisfies Metadata["openGraph"]

export const baseTwitter = {
  card: "summary_large_image",
  images: [shareImage],
  ...twitterAccounts,
} satisfies Metadata["twitter"]

/**
 * Builds a page's metadata from its registry entry.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces
 * the root layout's object wholesale. This repeats the shared fields to keep
 * og:site_name, og:locale and twitter:card on every page.
 */
export function createMetadata(page: PageEntry): Metadata {
  // Parents follow the page, nearest first: "Invoice 42 | Billing | Acme Inc.".
  const parentTitles = (page.parents ?? []).map((parent) => parent.title).reverse()
  const fullTitle = pageTitle(page.searchTitle ?? page.title, ...parentTitles)
  const images = page.image
    ? [{ ...shareImage, url: page.image, alt: fullTitle }]
    : [shareImage]

  return {
    // Absolute so the layout's template cannot add a second app name.
    title: { absolute: fullTitle },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      ...baseOpenGraph,
      type: page.type ?? "website",
      title: fullTitle,
      description: page.description,
      url: page.path,
      images,
    },
    twitter: {
      ...baseTwitter,
      title: fullTitle,
      description: page.description,
      images,
    },
    robots: robotsFor(page.noIndex),
  }
}
