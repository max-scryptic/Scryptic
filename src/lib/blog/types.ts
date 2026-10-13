/*
 * The shape of a blog post. Posts are plain data, one file each in
 * src/lib/blog/posts/, rendered by src/app/blog/[slug]/page.tsx. Each one
 * drives its card on /blog, its page, its registry entry (and so its metadata,
 * sitemap row and llms.txt line) and its Article and FAQPage JSON-LD.
 *
 * Copy is plain text: no Markdown, no HTML and no em dashes. Write answer
 * first: every section opens with the direct answer, then the detail.
 */

import type { StaticImageData } from "next/image"

/** A paragraph, a list or a highlighted note inside a section. */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | {
      type: "list"
      /** Numbered steps rather than bullets. */
      ordered?: boolean
      /** A plain item, or a short bold lead-in followed by its explanation. */
      items: (string | { term: string; text: string })[]
    }
  | { type: "callout"; title: string; text: string }

export type PostSection = {
  /** Anchor id for the table of contents, e.g. "when-to-move". */
  id: string
  /** Question-style where it fits: answer engines match headings to questions. */
  heading: string
  blocks: PostBlock[]
}

/** Groups posts on /blog. */
export type PostCategory =
  | "AI app builders"
  | "No-code app builders"
  | "Website builders"
  | "Internal tool builders"

export type BlogPost = {
  /** URL segment: /blog/<slug>. */
  slug: string
  /** The <h1> and the page title. No colons or dashes as separators. */
  title: string
  /** The tool the post is about, shown on the card. */
  tool: string
  /**
   * The tool's logo, an SVG from src/assets/blog/logos/ shown on the card and
   * in the post header. Without one, both show the tool's initial instead.
   */
  logo?: StaticImageData
  category: PostCategory
  /** 120 to 160 characters, for the meta description and llms.txt. */
  description: string
  /** Two or three sentences under the <h1> that answer the title outright. */
  summary: string
  /** ISO dates (YYYY-MM-DD). Only real ones. */
  datePublished: string
  dateModified?: string
  /** Three to five quick facts shown beside the summary, e.g. "Code export". */
  facts: { label: string; value: string }[]
  sections: PostSection[]
  /** Shown as a visible FAQ and emitted as FAQPage JSON-LD; keep them identical. */
  faqs: { question: string; answer: string }[]
}
