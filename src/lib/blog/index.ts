import { adalo } from "@/lib/blog/posts/adalo"
import { airtable } from "@/lib/blog/posts/airtable"
import { appCostUk } from "@/lib/blog/posts/app-cost-uk"
import { automationsToSaas } from "@/lib/blog/posts/automations-to-saas"
import { base44 } from "@/lib/blog/posts/base44"
import { bolt } from "@/lib/blog/posts/bolt"
import { bubble } from "@/lib/blog/posts/bubble"
import { buildAnMvp } from "@/lib/blog/posts/build-an-mvp"
import { chooseAppDevelopmentCompany } from "@/lib/blog/posts/choose-app-development-company"
import { flutterflow } from "@/lib/blog/posts/flutterflow"
import { framer } from "@/lib/blog/posts/framer"
import { glide } from "@/lib/blog/posts/glide"
import { googleSheetsDatabase } from "@/lib/blog/posts/google-sheets-database"
import { lovable } from "@/lib/blog/posts/lovable"
import { n8nAlternatives } from "@/lib/blog/posts/n8n-alternatives"
import { n8nVsZapierVsMake } from "@/lib/blog/posts/n8n-vs-zapier-vs-make"
import { reactNativeVsFlutter } from "@/lib/blog/posts/react-native-vs-flutter"
import { replit } from "@/lib/blog/posts/replit"
import { retool } from "@/lib/blog/posts/retool"
import { selfHostingN8n } from "@/lib/blog/posts/self-hosting-n8n"
import { softr } from "@/lib/blog/posts/softr"
import { supabaseVsFirebase } from "@/lib/blog/posts/supabase-vs-firebase"
import { v0 } from "@/lib/blog/posts/v0"
import { vibeCoding } from "@/lib/blog/posts/vibe-coding"
import { webAppVsMobileApp } from "@/lib/blog/posts/web-app-vs-mobile-app"
import { webflow } from "@/lib/blog/posts/webflow"
import { weweb } from "@/lib/blog/posts/weweb"
import { wix } from "@/lib/blog/posts/wix"
import type { BlogPost, PostBlock, PostCategory, PostSeriesId } from "@/lib/blog/types"

export type {
  BlogPost,
  PostBlock,
  PostCategory,
  PostSection,
  PostSeriesId,
} from "@/lib/blog/types"

/*
 * Every published post, in the order /blog lists them within a category. A
 * new post is a file in ./posts plus a line here; its page, card, metadata,
 * sitemap row, llms.txt line and JSON-LD all follow from that.
 */
export const posts: BlogPost[] = [
  appCostUk,
  buildAnMvp,
  chooseAppDevelopmentCompany,
  vibeCoding,
  automationsToSaas,
  n8nVsZapierVsMake,
  selfHostingN8n,
  n8nAlternatives,
  googleSheetsDatabase,
  webAppVsMobileApp,
  supabaseVsFirebase,
  reactNativeVsFlutter,
  lovable,
  bolt,
  v0,
  replit,
  base44,
  bubble,
  flutterflow,
  weweb,
  adalo,
  glide,
  softr,
  webflow,
  framer,
  wix,
  retool,
  airtable,
]

export type PostSeries = {
  id: PostSeriesId
  name: string
  /** Shown above a post's <h1>, e.g. "Migration guide". */
  label: string
  intro: string
  /** The closing call to action on each post in the series. */
  cta: { heading: (post: BlogPost) => string; text: string }
}

/** The series on /blog, in the order the page lists them. */
export const postSeries: PostSeries[] = [
  {
    id: "launch",
    name: "From idea to launch",
    label: "Guide",
    intro:
      "What it costs, how long it takes and how to get an app built well: plain answers for founders planning their first product or their next one.",
    cta: {
      heading: () => "Planning an app?",
      text: "Book a free discovery call and tell us what you want to build. You get straight advice on scope, stack, cost and timeline, then a written estimate before any work starts. Most builds go live in one to two months.",
    },
  },
  {
    id: "automation",
    name: "Automation to product",
    label: "Automation guide",
    intro:
      "Zapier, Make, n8n and spreadsheets run a lot of businesses. These guides compare the tools, and explain when a set of automations is ready to become software of its own.",
    cta: {
      heading: () => "Outgrowing your automations?",
      text: "Book a free discovery call and walk us through your workflows. We look at what runs where and what it costs, then send a plan, a written estimate and a timeline for turning it into an app you own.",
    },
  },
  {
    id: "stack",
    name: "Choosing your stack",
    label: "Comparison",
    intro:
      "Head to head comparisons of the platforms and frameworks founders weigh up most, written by developers who ship production apps on them.",
    cta: {
      heading: () => "Not sure which stack fits?",
      text: "Book a free discovery call and tell us what you are building. We recommend a stack for your product, not ours, then send a written estimate and a timeline.",
    },
  },
  {
    id: "migration",
    name: "Low-code migration guides",
    label: "Migration guide",
    intro:
      "One guide per tool on moving an app built with a low-code, no-code or AI app builder to a production stack you own: what you can export, what is missing, and a step by step plan.",
    cta: {
      heading: (post) => `Ready to move your ${post.topic} app to production?`,
      text: "Book a free discovery call and walk us through what you have built. We review the app, its data and its accounts, then send a plan, a written estimate and a timeline. Most builds go live in one to two months.",
    },
  },
]

/** The groups within the migration guides series, one per kind of tool. */
export const postCategories: { name: PostCategory; text: string }[] = [
  {
    name: "AI app builders",
    text: "These tools write real code, so the move is usually about hardening and owning it.",
  },
  {
    name: "No-code app builders",
    text: "Most of these keep the app on their platform, so the move is a planned rebuild with your data and users.",
  },
  {
    name: "Website builders",
    text: "Often the answer is to keep the marketing site where it is and build the product next to it.",
  },
  {
    name: "Internal tool builders",
    text: "When an internal tool or a spreadsheet base turns into the product customers use.",
  },
  {
    name: "Enterprise low-code",
    text: "Platforms that run core business systems, where the move is about licence cost, lock-in and keeping the business running while you rebuild.",
  },
]

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getSeries(id: PostSeriesId) {
  return postSeries.find((series) => series.id === id)!
}

export function postsInSeries(id: PostSeriesId) {
  return posts.filter((post) => post.series === id)
}

export function postsInCategory(category: PostCategory) {
  return posts.filter((post) => post.category === category)
}

/**
 * Other posts to read next: the same category first, then the rest of the
 * series, then the other series.
 */
export function relatedPosts(post: BlogPost, count = 3) {
  const others = posts.filter((other) => other.slug !== post.slug)
  const sameSeries = others.filter((other) => other.series === post.series)
  return [
    ...sameSeries.filter((other) => other.category === post.category),
    ...sameSeries.filter((other) => other.category !== post.category),
    ...others.filter((other) => other.series !== post.series),
  ].slice(0, count)
}

function blockText(block: PostBlock) {
  if (block.type === "paragraph") return block.text
  if (block.type === "callout") return `${block.title} ${block.text}`
  return block.items
    .map((item) => (typeof item === "string" ? item : `${item.term} ${item.text}`))
    .join(" ")
}

/** Minutes to read at about 220 words a minute, rounded up. */
export function readingMinutes(post: BlogPost) {
  const text = [
    post.summary,
    ...post.sections.flatMap((section) => [section.heading, ...section.blocks.map(blockText)]),
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ")
  const words = text.split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 220))
}

/** "13 October 2026". Formatted in UTC so the date never shifts with the server's zone. */
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}
