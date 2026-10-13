import type { StaticImageData } from "next/image"

import untilThenDetail1 from "@/assets/work/until-then/detail-1.webp"
import untilThenDetail2 from "@/assets/work/until-then/detail-2.webp"
import untilThenHero from "@/assets/work/until-then/hero.webp"
import untilThenMobile from "@/assets/work/until-then/mobile.webp"
import viewlioDetail1 from "@/assets/work/viewlio/detail-1.webp"
import viewlioDetail2 from "@/assets/work/viewlio/detail-2.webp"
import viewlioHero from "@/assets/work/viewlio/hero.webp"
import viewlioMobile from "@/assets/work/viewlio/mobile.webp"

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

const untilThen: CaseStudy = {
  slug: "until-then",
  name: "Until Then",
  url: "https://until-then.cc",
  category: "Scheduled messages",
  summary:
    "Until Then lets you write a letter or record a voice or video message today and have it emailed to the people you choose on a date you set, even years from now.",
  description:
    "How Scryptic built Until Then, an app that schedules letters, voice notes and videos for future delivery by email, with in-browser video compression.",
  audience:
    "People leaving something personal for a future moment: a child's 18th birthday, a wedding, a first day, or a time they will not be there for.",
  scope: "Product, brand, design, full-stack build and launch",
  problem: [
    "Email and messaging only send now. There was no simple, trustworthy way to seal a heartfelt message, especially a recording, and know it will reach the right inbox on the right day, possibly decades later.",
    "The person receiving it should not need an account, an app or a password. And a message that waits years has to survive changing email addresses, large video files and a delivery system that cannot afford to send twice or not at all.",
  ],
  solution: [
    "Until Then is a calm, three-step app: write or record, choose who and when, and it arrives on the day. Written letters are free forever; voice and video messages are a one-time payment, with a lifetime option for people who plan to send many.",
    "Each recipient gets an email on the day and a private page that is only theirs. The sender hears when it has been delivered and sees when each person opened it. After an open window the sender chooses, the recording is deleted for good.",
  ],
  features: [
    {
      name: "A letter, a voice or a face",
      text: "Written, voice or video messages of up to ten minutes, recorded in the browser or uploaded, with written words alongside any recording.",
    },
    {
      name: "Scheduled to the minute, years ahead",
      text: "Pick a date, time and time zone up to 100 years out, with presets for one, five, ten and eighteen years.",
    },
    {
      name: "Nothing for recipients to install",
      text: "No account, app or password. Each recipient gets their own unguessable link to a page made for them.",
    },
    {
      name: "Delivery and read receipts",
      text: "The sender gets a delivery confirmation and can see when each person opened their message.",
    },
    {
      name: "An open window, then gone",
      text: "The sender picks how long a recording stays open, from one day to a week. After that it is deleted from storage, not just hidden.",
    },
    {
      name: "Free to write, pay once to record",
      text: "Letters are free and unlimited. Recordings are a one-time Stripe payment per message, with no subscription.",
    },
  ],
  engineering: [
    {
      name: "Delivery that cannot send twice",
      text: "A cron job checks for due messages every five minutes, with Vercel Cron as an hourly backup. Each message is claimed with a single conditional database update, so overlapping runs can never double-send, and a partly failed send retries only the recipients still waiting.",
    },
    {
      name: "Video compressed in the browser",
      text: "Before upload, video is re-encoded on the device with WebCodecs to 720p at about 1 Mbps, preferring H.264 and falling back to VP9. A ten-minute message lands at around 80 MB instead of a multi-gigabyte phone file, and the encoder only loads when it is needed.",
    },
    {
      name: "Uploads straight to storage",
      text: "Recordings go from the browser directly to Cloudflare R2 through short-lived signed links, so large files never pass through the app server. The server then verifies what actually arrived, its size and its length, and deletes anything over the limit.",
    },
    {
      name: "Payments that cannot be lost",
      text: "The Stripe webhook and the return from Checkout run the same idempotent function, so whichever arrives first seals the message. As a last check, the dispatcher refuses to send a recording that has not been paid for.",
    },
    {
      name: "Protecting a domain that sends years later",
      text: "A bad address may not surface for years, and every bounce hurts deliverability. Addresses are checked for likely typos, throwaway inboxes and domains that cannot receive mail, and a signed webhook feeds bounces and complaints into a suppression list.",
    },
  ],
  stack: [
    "Next.js",
    "Neon Postgres",
    "Stripe",
    "Cloudflare R2",
    "React",
    "TypeScript",
    "Drizzle ORM",
    "Better Auth",
    "Resend",
    "WebCodecs",
    "Tailwind CSS",
    "Vercel",
  ],
  cover: {
    src: untilThenHero,
    alt: "The Until Then home page: the until then wordmark and the line Messages that arrive when you cannot, over soft pink clouds",
  },
  gallery: [
    {
      src: untilThenDetail1,
      alt: "Until Then's How it works section: write or record, choose who and when, and it arrives on the day, above the three message types",
    },
    {
      src: untilThenDetail2,
      alt: "Until Then's pricing: written letters free, voice or video paid once per message, or lifetime access in one payment",
    },
  ],
  mobile: {
    src: untilThenMobile,
    alt: "The Until Then home page on a phone",
  },
}

const viewlio: CaseStudy = {
  slug: "viewlio",
  name: "Viewlio",
  url: "https://viewlio.cc",
  category: "AI analytics for YouTube creators",
  summary:
    "Viewlio reads a YouTube video's audience retention curve against the video itself, frame by frame, and explains why viewers left and what to change in the next upload.",
  description:
    "How Scryptic built Viewlio, an AI tool that matches YouTube retention data to the video's frames, audio and script to explain drop-offs and suggest fixes.",
  audience: "YouTube creators and small creator teams reviewing how each upload performed.",
  scope: "Product, design, full-stack build, AI pipeline and launch",
  problem: [
    "YouTube Studio tells a creator when viewers left: 14% gone at 2:41. It never says why. Creators end up rewatching their own footage to guess the cause, and every video's diagnosis starts from scratch.",
    "Answering why means looking at the video, not just the graph: the cut, the music, the on-screen text and the script at the moment the curve falls. That is slow, fiddly work, and exactly the kind of thing software should do.",
  ],
  solution: [
    "Viewlio connects to a creator's channel with one Google sign-in and turns any video into a report. It walks through the hook, every drop-off steeper than the video's normal decline, the gains and the flat holds, and writes a specific fix for the moments worth changing.",
    "On paid plans, creators upload the source file for a deep dive that reads frames, audio, on-screen text and transcript around each moment and shows that evidence next to every claim. Fixes collect in a checklist the creator keeps open while editing the next video.",
  ],
  features: [
    {
      name: "Video reports",
      text: "Every moment that moved retention, found, labelled and explained, with a written fix where one is worth making.",
    },
    {
      name: "Frame-level deep dives",
      text: "Scene cuts, visuals, audio, on-screen text and transcript shown as evidence beside each finding.",
    },
    {
      name: "Channel trends",
      text: "Patterns across the creator's library: how hooks, titles, thumbnails and scripts line up with retention.",
    },
    {
      name: "Video comparator",
      text: "A head-to-head report on two videos' retention, script and packaging.",
    },
    {
      name: "A checklist for the next edit",
      text: "Tips saved from any report land in one list that can be reordered and kept open while editing.",
    },
    {
      name: "Free to start, metered to scale",
      text: "Ten free analyses a month, then Starter and Pro plans with deep-dive credits charged per minute of footage.",
    },
  ],
  engineering: [
    {
      name: "Filtering noise before the AI runs",
      text: "A drop only counts if it falls about 1.8 times steeper than the video's own typical decline, or underperforms similar videos, and small neighbouring dips merge into one moment. The model never gets asked to invent a reason for ordinary decay.",
    },
    {
      name: "Measured facts, not guesses",
      text: "ffmpeg detects hard cuts, freeze frames, cuts to black, loudness and silence, and Tesseract reads on-screen text offline. Those measurements go to the vision model as facts, so its explanations are grounded in what is actually on screen.",
    },
    {
      name: "Long jobs on short-lived servers",
      text: "A deep dive can run longer than a serverless function is allowed to. Each pass hands off to a fresh one when time runs short, leases stop two passes working on the same video, and a pg_cron watchdog restarts stalled analyses, so a report finishes even after the creator closes the tab.",
    },
    {
      name: "Multi-gigabyte uploads",
      text: "Browsers upload source files straight to Cloudflare R2 in multipart chunks. Each upload is transcoded to a lightweight proxy, the original is deleted once the proxy exists, and ffmpeg seeks straight to each moment over a signed URL instead of downloading the whole file.",
    },
    {
      name: "Billing and cost control",
      text: "Stripe webhooks keep subscriptions in sync and credits are metered per minute of footage. Every model call's cost is logged, and an admin panel edits prompts with version history.",
    },
  ],
  stack: [
    "Next.js",
    "Supabase",
    "OpenAI",
    "ffmpeg",
    "React",
    "TypeScript",
    "Postgres",
    "YouTube APIs",
    "Stripe",
    "Cloudflare R2",
    "Tesseract",
    "Recharts",
    "Vercel",
  ],
  cover: {
    src: viewlioHero,
    alt: "The Viewlio home page: the headline Know exactly where your viewers leave. And what to change, beside a sample retention report with a drop-off at 2:41 and a suggested fix",
  },
  gallery: [
    {
      src: viewlioDetail1,
      alt: "Viewlio's features section: a video report listing the hook, a drop-off, a hold and a gain, above a frame-by-frame deep dive",
    },
    {
      src: viewlioDetail2,
      alt: "Viewlio's pricing: Free, Starter and Pro plans with monthly analyses and deep-dive credits",
    },
  ],
  mobile: {
    src: viewlioMobile,
    alt: "The Viewlio home page on a phone",
  },
}

export const caseStudies: CaseStudy[] = [untilThen, viewlio]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

/** The live URL without its protocol, for address bars and link text. */
export function displayDomain(study: CaseStudy) {
  return new URL(study.url).host
}
