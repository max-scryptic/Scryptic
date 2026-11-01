/*
 * The shape of a blog post. Posts are plain data, one file each in
 * src/lib/blog/posts/, rendered by src/app/blog/[slug]/page.tsx. Each one
 * drives its card on /blog, its page, its registry entry (and so its metadata,
 * sitemap row and llms.txt line) and its Article and FAQPage JSON-LD.
 *
 * Copy is plain text: no Markdown, no HTML and no em dashes. Write answer
 * first: every section opens with the direct answer, then the detail.
 *
 * Quote our prices from @/lib/services (`${mvp.price}`), never typed in. Outside
 * posts about choosing a supplier, mention us in a sentence with a link to
 * "/#pricing" rather than a pricing table or a sales section: the footer
 * already offers the call. Don't copy wording from another post.
 */

import type { StaticImageData } from "next/image"

/**
 * A paragraph, a list, a highlighted note, a table, a checklist, a
 * subheading or an image inside a section.
 */
export type PostBlock =
  | {
      type: "paragraph"
      text: string
      /** A link that follows the text, such as "/#pricing". Its text should make sense out of context. */
      link?: { text: string; href: string }
    }
  | {
      type: "list"
      /** Numbered steps rather than bullets. */
      ordered?: boolean
      /** A plain item, or a short bold lead-in followed by its explanation. */
      items: (string | { term: string; text: string })[]
    }
  | { type: "callout"; title: string; text: string }
  | {
      type: "table"
      /** Says what the table compares; read out by screen readers. */
      caption: string
      columns: string[]
      /** One array per row, the same length as `columns`. The first cell is the row's label. */
      rows: string[][]
    }
  /** Things to tick off, shown with boxes rather than bullets. */
  | { type: "checklist"; items: string[] }
  /** An <h3> that splits a long section. */
  | { type: "subheading"; text: string }
  /**
   * A diagram or screenshot, a WebP from src/assets/blog/images/ cropped to
   * its content. It shows at the text column's width (768px), so export it
   * about 1536px wide for sharp high-density screens.
   */
  | {
      type: "image"
      image: StaticImageData
      /** What the image shows, for screen readers and search. */
      alt: string
      caption?: string
    }
  /**
   * A real, publicly documented case, summarised only as far as the source
   * says, with a link to that source. Never an invented or anonymised example.
   */
  | {
      type: "caseStudy"
      /** The company or product, as the source names it. */
      company: string
      text: string
      source: { title: string; publisher: string; url: string }
    }

export type PostSection = {
  /** Anchor id for the table of contents, e.g. "when-to-move". */
  id: string
  /** Question-style where it fits: answer engines match headings to questions. */
  heading: string
  blocks: PostBlock[]
}

/** The series a post belongs to, each listed as its own section on /blog. */
export type PostSeriesId = "launch" | "automation" | "stack" | "migration"

/** The line icons a post without a logo can carry on its card. */
export type PostIcon =
  | "app-window"
  | "atom"
  | "book-open"
  | "building"
  | "code"
  | "coins"
  | "dashboard"
  | "database"
  | "download"
  | "flask"
  | "globe"
  | "monitor-smartphone"
  | "receipt"
  | "rocket"
  | "scale"
  | "server"
  | "sheet"
  | "smartphone"
  | "sparkles"
  | "tablet-smartphone"
  | "users"
  | "workflow"
  | "zap"

/** Groups the migration guides within their series on /blog. */
export type PostCategory =
  | "AI app builders"
  | "No-code app builders"
  | "Website builders"
  | "Internal tool builders"
  | "Enterprise low-code"

export type BlogPost = {
  /** URL segment: /blog/<slug>. */
  slug: string
  /** The <h1> and the page title. No colons or dashes as separators. */
  title: string
  series: PostSeriesId
  /**
   * A word or two on what the post is about, shown above the title on its
   * card and in the breadcrumb: the tool for a migration guide ("Bubble"),
   * otherwise the subject ("App cost", "n8n").
   */
  topic: string
  /**
   * The tool's logo, an SVG from src/assets/blog/logos/: a watermark on the
   * card and a tile in the post header. Leave it out to show neither.
   */
  logo?: StaticImageData
  /**
   * For a post without a logo: a line icon for its subject, shown as the
   * card's watermark in the logo's place. One of the icons in
   * src/components/post-icon.tsx.
   */
  icon?: PostIcon
  /** Migration guides only: the group the guide sits in on /blog. */
  category?: PostCategory
  /** 120 to 160 characters, for the meta description and llms.txt. */
  description: string
  /** Two or three sentences under the <h1> that answer the title outright. */
  summary: string
  /** ISO dates (YYYY-MM-DD). Only real ones. */
  datePublished: string
  dateModified?: string
  /**
   * Quick facts shown beside the summary, e.g. "Code export". Leave it out
   * when a post has no useful at-a-glance facts; the summary then runs full width.
   */
  facts?: { label: string; value: string }[]
  sections: PostSection[]
  /**
   * Shown as a visible FAQ and emitted as FAQPage JSON-LD; keep them identical.
   * Leave it empty to show no FAQ.
   */
  faqs: { question: string; answer: string }[]
  /** The FAQ's heading, when "Frequently asked questions" does not suit the post. */
  faqHeading?: string
}
