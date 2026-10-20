/*
 * The free tools on /tools. Each entry drives its row in the list on the hub
 * (and under the other tools), its /tools/<slug> page's registry entry in
 * src/lib/seo.ts (and so its metadata, sitemap row and llms.txt line) and its
 * JSON-LD.
 *
 * A tool's working part lives in src/components/free-tools/ and its logic,
 * questions and FAQ next to this file, one module per tool.
 */

export type FreeToolIcon = "calculator" | "scissors" | "signpost" | "checklist" | "bot" | "search"

/** The hub lists the tools in these groups, in this order. */
export const toolGroups = [
  { id: "plan", name: "Plan your build" },
  { id: "check", name: "Check your site" },
] as const

export type ToolGroup = (typeof toolGroups)[number]["id"]

export type FreeTool = {
  /** URL segment: /tools/<slug>. */
  slug: string
  name: string
  icon: FreeToolIcon
  group: ToolGroup
  /** One sentence in the list: what you put in and what you get back. */
  summary: string
  /** The row's call to action, e.g. "Estimate your build". */
  cta: string
  /** 120 to 160 characters, for search results and llms.txt. */
  description: string
  /** What the tool runs as, for structured data. */
  category: "BusinessApplication" | "DeveloperApplication"
}

export const freeTools = [
  {
    slug: "mvp-cost-calculator",
    name: "MVP Cost Calculator",
    icon: "calculator",
    group: "plan",
    summary: "Eight quick questions and a ballpark price and timeline for your MVP, in about a minute.",
    cta: "Estimate your build",
    description:
      "Free MVP cost calculator for UK founders. Answer eight questions about your app and get an estimate in development weeks and pounds, plus what drives the price.",
    category: "BusinessApplication",
  },
  {
    slug: "mvp-scope-planner",
    name: "MVP Scope Planner",
    icon: "scissors",
    group: "plan",
    summary: "List your features, size them and see what fits a one week build and what can wait.",
    cta: "Plan your scope",
    description:
      "Free MVP scope planner. List the features you want, size each one and see what fits a first release, what to save for later and which package it matches.",
    category: "BusinessApplication",
  },
  {
    slug: "build-or-no-code",
    name: "Build or No-Code Quiz",
    icon: "signpost",
    group: "plan",
    summary: "Seven questions to find out whether no-code will do for your idea or it needs real code.",
    cta: "Take the quiz",
    description:
      "Should you use Bubble or build custom? Answer seven questions about your idea, users and budget to find out whether no-code is enough or you need real code.",
    category: "BusinessApplication",
  },
  {
    slug: "app-launch-checklist",
    name: "App Launch Checklist",
    icon: "checklist",
    group: "plan",
    summary: "A launch checklist built for your app, covering legal, payments, SEO, analytics and app stores.",
    cta: "Build your checklist",
    description:
      "Free app launch checklist for UK founders. Answer five questions and get the legal, payments, SEO, analytics and app store steps your launch needs.",
    category: "BusinessApplication",
  },
  {
    slug: "agent-readiness-check",
    name: "Agent Readiness Check",
    icon: "bot",
    group: "check",
    summary: "Scan your site to see whether ChatGPT, Claude and other AI agents can find, read and use it.",
    cta: "Check your site",
    description:
      "Free AI agent readiness check. Scan any website to see whether ChatGPT, Claude, Perplexity and other AI agents can crawl, read, understand and cite it.",
    category: "DeveloperApplication",
  },
  {
    slug: "seo-check",
    name: "SEO Check",
    icon: "search",
    group: "check",
    summary: "Audit any page for titles, descriptions, headings, indexing, structured data and share previews.",
    cta: "Run the audit",
    description:
      "Free SEO checker. Audit any page for its title, meta description, headings, canonical, indexing, sitemap, structured data, alt text and social share previews.",
    category: "DeveloperApplication",
  },
] as const satisfies FreeTool[]

export type FreeToolSlug = (typeof freeTools)[number]["slug"]

export function freeTool(slug: FreeToolSlug): FreeTool {
  return freeTools.find((tool) => tool.slug === slug)!
}

/** A tool's question-and-answer pairs: shown under it and emitted as FAQPage JSON-LD. */
export type ToolFaq = { question: string; answer: string }
