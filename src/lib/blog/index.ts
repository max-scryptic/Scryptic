import { lovable } from "@/lib/blog/posts/lovable"
import type { BlogPost, PostBlock, PostCategory } from "@/lib/blog/types"

export type { BlogPost, PostBlock, PostCategory, PostSection } from "@/lib/blog/types"

/*
 * Every published post, in the order /blog lists them within a category. A
 * new post is a file in ./posts plus a line here; its page, card, metadata,
 * sitemap row, llms.txt line and JSON-LD all follow from that.
 */
export const posts: BlogPost[] = [lovable]

/** The migration guides series on /blog, one group per kind of tool. */
export const migrationSeries = {
  name: "Low-code migration guides",
  intro:
    "One guide per tool on moving an app built with a low-code, no-code or AI app builder to a production stack you own: what you can export, what is missing, and a step by step plan.",
}

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
]

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function postsInCategory(category: PostCategory) {
  return posts.filter((post) => post.category === category)
}

/** Other posts to read next: the same category first, then the rest of the series. */
export function relatedPosts(post: BlogPost, count = 3) {
  const others = posts.filter((other) => other.slug !== post.slug)
  return [
    ...others.filter((other) => other.category === post.category),
    ...others.filter((other) => other.category !== post.category),
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
