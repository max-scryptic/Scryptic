import { adalo } from "@/lib/blog/posts/adalo"
import { aiSoftwareDevelopment } from "@/lib/blog/posts/ai-software-development"
import { airtable } from "@/lib/blog/posts/airtable"
import { appsheet } from "@/lib/blog/posts/appsheet"
import { appCostUk } from "@/lib/blog/posts/app-cost-uk"
import { automationsToSaas } from "@/lib/blog/posts/automations-to-saas"
import { base44 } from "@/lib/blog/posts/base44"
import { bestSaasDevelopmentCompany } from "@/lib/blog/posts/best-saas-development-company"
import { bolt } from "@/lib/blog/posts/bolt"
import { bubble } from "@/lib/blog/posts/bubble"
import { buildAWebApp } from "@/lib/blog/posts/build-a-web-app"
import { buildAnMvp } from "@/lib/blog/posts/build-an-mvp"
import { chooseAppDevelopmentCompany } from "@/lib/blog/posts/choose-app-development-company"
import { dashboardAppDesign } from "@/lib/blog/posts/dashboard-app-design"
import { filemaker } from "@/lib/blog/posts/filemaker"
import { flutterflow } from "@/lib/blog/posts/flutterflow"
import { framer } from "@/lib/blog/posts/framer"
import { glide } from "@/lib/blog/posts/glide"
import { hybridApps } from "@/lib/blog/posts/hybrid-apps"
import { googleSheetsDatabase } from "@/lib/blog/posts/google-sheets-database"
import { lovable } from "@/lib/blog/posts/lovable"
import { mobileAppDevelopment } from "@/lib/blog/posts/mobile-app-development"
import { mobileWebDevelopment } from "@/lib/blog/posts/mobile-web-development"
import { mvpAgile } from "@/lib/blog/posts/mvp-agile"
import { mvpSoftware } from "@/lib/blog/posts/mvp-software"
import { mvpSoftwareDevelopmentExample } from "@/lib/blog/posts/mvp-software-development-example"
import { n8nAlternatives } from "@/lib/blog/posts/n8n-alternatives"
import { n8nVsZapierVsMake } from "@/lib/blog/posts/n8n-vs-zapier-vs-make"
import { outsystems } from "@/lib/blog/posts/outsystems"
import { powerApps } from "@/lib/blog/posts/power-apps"
import { progressiveWebAppDevelopmentCompany } from "@/lib/blog/posts/progressive-web-app-development-company"
import { pwaDevelopment } from "@/lib/blog/posts/pwa-development"
import { reactjsWebDevelopmentCompany } from "@/lib/blog/posts/reactjs-web-development-company"
import { reactNativeVsFlutter } from "@/lib/blog/posts/react-native-vs-flutter"
import { replit } from "@/lib/blog/posts/replit"
import { retool } from "@/lib/blog/posts/retool"
import { saasCost } from "@/lib/blog/posts/saas-cost"
import { selfHostingN8n } from "@/lib/blog/posts/self-hosting-n8n"
import { softr } from "@/lib/blog/posts/softr"
import { supabaseVsFirebase } from "@/lib/blog/posts/supabase-vs-firebase"
import { v0 } from "@/lib/blog/posts/v0"
import { vibeCoding } from "@/lib/blog/posts/vibe-coding"
import { webAppVsMobileApp } from "@/lib/blog/posts/web-app-vs-mobile-app"
import { webApplicationDevelopmentServices } from "@/lib/blog/posts/web-application-development-services"
import { webflow } from "@/lib/blog/posts/webflow"
import { weweb } from "@/lib/blog/posts/weweb"
import { wix } from "@/lib/blog/posts/wix"
import type { BlogPost, PostBlock, PostCategory, PostSeriesId } from "@/lib/blog/types"

export type {
  BlogPost,
  PostBlock,
  PostCategory,
  PostIcon,
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
  saasCost,
  mvpSoftware,
  buildAnMvp,
  mvpAgile,
  mvpSoftwareDevelopmentExample,
  aiSoftwareDevelopment,
  dashboardAppDesign,
  mobileWebDevelopment,
  mobileAppDevelopment,
  chooseAppDevelopmentCompany,
  reactjsWebDevelopmentCompany,
  webApplicationDevelopmentServices,
  bestSaasDevelopmentCompany,
  pwaDevelopment,
  progressiveWebAppDevelopmentCompany,
  buildAWebApp,
  vibeCoding,
  automationsToSaas,
  n8nVsZapierVsMake,
  selfHostingN8n,
  n8nAlternatives,
  googleSheetsDatabase,
  webAppVsMobileApp,
  supabaseVsFirebase,
  reactNativeVsFlutter,
  hybridApps,
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
  appsheet,
  filemaker,
  outsystems,
  powerApps,
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
      "What it costs, how long it takes and how to get an app built well.",
    cta: {
      heading: () => "Planning an app?",
      text: "Tell us what you want to build on a free call, then get a written estimate.",
    },
  },
  {
    id: "automation",
    name: "Automation to product",
    label: "Automation guide",
    intro:
      "When Zapier, Make, n8n or a spreadsheet is ready to become software of its own.",
    cta: {
      heading: () => "Outgrowing your automations?",
      text: "Walk us through your workflows on a free call, then get a plan for an app you own.",
    },
  },
  {
    id: "stack",
    name: "Choosing your stack",
    label: "Comparison",
    intro:
      "Head to head comparisons of the platforms and frameworks founders weigh up most.",
    cta: {
      heading: () => "Not sure which stack fits?",
      text: "Tell us what you are building on a free call. We will recommend the stack that fits.",
    },
  },
  {
    id: "migration",
    name: "Low-code migration guides",
    label: "Migration guide",
    intro:
      "Moving an app off a low-code, no-code or AI builder to a stack you own, one guide per tool.",
    cta: {
      heading: (post) => `Ready to move your ${post.topic} app to production?`,
      text: "Walk us through your app on a free call, then get a migration plan and estimate.",
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
    text: "Platforms running core business systems, where licence cost and lock-in drive the move.",
  },
]

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

/** Posts by slug, in the order given. A slug with no post throws, so a typo fails the build. */
export function postsBySlug(slugs: string[]) {
  return slugs.map((slug) => {
    const post = getPost(slug)
    if (!post) throw new Error(`No blog post with the slug "${slug}"`)
    return post
  })
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

/** The newest posts by publication date; posts published the same day keep their order in `posts`. */
export function latestPosts(count: number) {
  return posts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => b.post.datePublished.localeCompare(a.post.datePublished) || a.index - b.index)
    .slice(0, count)
    .map(({ post }) => post)
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
  if (block.type === "paragraph") return block.link ? `${block.text} ${block.link.text}` : block.text
  if (block.type === "callout") return `${block.title} ${block.text}`
  if (block.type === "subheading") return block.text
  if (block.type === "image") return block.caption ?? ""
  if (block.type === "caseStudy") return `${block.company} ${block.text}`
  if (block.type === "checklist") return block.items.join(" ")
  if (block.type === "table") return [...block.columns, ...block.rows.flat()].join(" ")
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
