import type { StaticImageData } from "next/image"

/*
 * Case studies for /work and the home page's work section. Each entry drives
 * its card, its /work/<slug> page, the page's registry entry (and so its
 * metadata, sitemap row and llms.txt line) and its JSON-LD.
 *
 * Screenshots live in src/assets/work/<slug>/ and are imported statically, so
 * next/image knows their size and can show a blurred placeholder. They are
 * captured at 1440x900 (desktop) and 390x844 (mobile), at 2x and 3x.
 */

export type Screenshot = {
  src: StaticImageData
  alt: string
}

export type CaseStudy = {
  /** URL segment: /work/<slug>. */
  slug: string
  name: string
  /** The live product. */
  url: string
  /** Short label for the card and the page eyebrow, e.g. "AI video for estate agents". */
  category: string
  /** One or two sentences: what it is and who it is for. Leads the card and the page. */
  summary: string
  /** 120 to 160 characters, for the meta description and llms.txt. */
  description: string
  audience: string
  /** What Scryptic did on it. */
  scope: string
  /** Paragraphs for "The problem". */
  problem: string[]
  /** Paragraphs for "What we built". */
  solution: string[]
  features: { name: string; text: string }[]
  /** "Under the hood": the engineering worth pointing at. */
  engineering: { name: string; text: string }[]
  stack: string[]
  cover: Screenshot
  gallery: Screenshot[]
  mobile?: Screenshot
}

export const caseStudies: CaseStudy[] = []

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

/** The live URL without its protocol, for address bars and link text. */
export function displayDomain(study: CaseStudy) {
  return new URL(study.url).host
}
