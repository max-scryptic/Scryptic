import type { StaticImageData } from "next/image"

import prettyMetricsDetail1 from "@/assets/work/prettymetrics/detail-1.webp"
import prettyMetricsDetail2 from "@/assets/work/prettymetrics/detail-2.webp"
import prettyMetricsHero from "@/assets/work/prettymetrics/hero.webp"
import prettyMetricsMobile from "@/assets/work/prettymetrics/mobile.webp"
import reelEstateDetail1 from "@/assets/work/reelestate/detail-1.webp"
import reelEstateDetail2 from "@/assets/work/reelestate/detail-2.webp"
import reelEstateHero from "@/assets/work/reelestate/hero.webp"
import reelEstateMobile from "@/assets/work/reelestate/mobile.webp"
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

const reelEstate: CaseStudy = {
  slug: "reelestate",
  name: "ReelEstate",
  url: "https://reelestate.cc",
  category: "AI video for estate agents",
  summary:
    "ReelEstate turns the listing photos estate agents already have into branded property videos, reels and carousels for every social platform. No filming, no editing.",
  description:
    "How Scryptic built ReelEstate, an AI app that turns estate agents' listing photos into branded property videos, reels and social carousels in minutes.",
  audience: "Estate agents, property photographers and property marketing agencies, starting in the UK.",
  scope: "Product, design, full-stack build, AI video pipeline and launch",
  problem: [
    "Video now does more for a listing on social media than photos do, but filming and editing every property is slow and expensive. Most agents post stills, or nothing.",
    "They already have professional listing photos. The gap was a tool that turns those stills into video, edits them into something worth posting, and packages it at the right size for each platform with the agency's branding on it.",
  ],
  solution: [
    "ReelEstate is a four-step workflow: add a property's photos, bring each one to life as a short clip with an AI camera move, arrange clips and photos into reels or carousels, then export them branded and sized for the platform.",
    "Alongside video, AI photo edits fix the weather, switch to twilight, stage empty rooms or declutter busy ones, and anything that adds or removes objects is labelled as virtually staged, as listing rules require. Teams share a workspace and a credit balance, on monthly or yearly plans.",
  ],
  features: [
    {
      name: "Photo to video",
      text: "Each photo becomes a short clip with a push in, pull out, orbit or drone move, aimed at a point the agent picks on the image.",
    },
    {
      name: "AI photo edits",
      text: "Twilight, golden hour and daylight skies, virtual staging in a chosen style, decluttering and empty rooms, from the photos already on file.",
    },
    {
      name: "Reels in every shape",
      text: "Arrange clips, photos and brand cards into 9:16, 16:9, 1:1 or 4:5 videos with cuts, crossfades, fades and slides.",
    },
    {
      name: "Carousels for seven platforms",
      text: "Instagram, TikTok, Facebook, LinkedIn, Threads, X and Pinterest, with each platform's slide limits and shapes checked before export.",
    },
    {
      name: "Branded by default",
      text: "Start cards, end cards and a logo watermark on everything exported, so every post is unmistakably the agency's.",
    },
    {
      name: "Team workspaces",
      text: "Roles, emailed invitations and one shared credit balance, with credits that roll over and refunds for failed clips.",
    },
  ],
  engineering: [
    {
      name: "An AI video pipeline without a queue service",
      text: "Each clip is a database row and a job on fal.ai. It completes through a webhook or through the page polling, whichever comes first, and a database lease makes sure only one path stores the result. The webhook body is never trusted: the app fetches the result again with its own key.",
    },
    {
      name: "Catching bad AI output automatically",
      text: "Video models sometimes cut to a room that does not exist. Every finished clip is decoded with ffmpeg and its frames compared against the clip's own typical change, so a sudden spike flags an invented cut. The clip is regenerated automatically, and only comes back with a Retry button if it happens twice.",
    },
    {
      name: "A steady camera, measured",
      text: "Moves are sent as twelve evenly timed keyframes with geometric spacing, so a zoom feels constant. Where a clip still rushes, the app measures the pace from its frames and trims to the steady part without cutting the file, so the agent can widen the trim again.",
    },
    {
      name: "Video rendering on serverless",
      text: "Reels render in background work split into segments, claimed by workers through database leases and stitched with ffmpeg. Transitions are layered with alpha masks using the same easing as the in-browser preview, and clips at different frame rates are retimed so no frame is dropped or doubled.",
    },
    {
      name: "Credits that cannot be double-spent",
      text: "A credit is taken in the same SQL statement that creates the clip, spending the soonest-to-expire credits first, and a failed clip refunds the balance it came from. Stripe webhooks re-read the subscription each time, so repeated or out-of-order events do no harm.",
    },
  ],
  stack: [
    "Next.js",
    "fal.ai",
    "ffmpeg",
    "Neon Postgres",
    "React",
    "TypeScript",
    "Neon Auth",
    "Cloudflare R2",
    "Stripe",
    "Resend",
    "Google Places",
    "sharp",
    "Vercel",
  ],
  cover: {
    src: reelEstateHero,
    alt: "The ReelEstate home page: the headline Turn listing photos into videos that sell homes faster, above a property video of a loft office",
  },
  gallery: [
    {
      src: reelEstateDetail1,
      alt: "ReelEstate's How it works steps, from adding photos to publishing, above branded start cards, a logo watermark and end cards for a sample agency",
    },
    {
      src: reelEstateDetail2,
      alt: "ReelEstate's pricing page with Starter, Pro and Agent plans billed in credits",
    },
  ],
  mobile: {
    src: reelEstateMobile,
    alt: "The ReelEstate home page on a phone, playing a property video",
  },
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

const prettyMetrics: CaseStudy = {
  slug: "prettymetrics",
  name: "Pretty Metrics",
  url: "https://prettymetrics.cc",
  category: "Shareable revenue charts",
  summary:
    "Pretty Metrics reads a founder's revenue from Stripe and six other payment providers and turns it into polished share cards and looping videos for X, LinkedIn and investor updates.",
  description:
    "How Scryptic built Pretty Metrics, which turns revenue from Stripe, Paddle and more into MRR charts and looping videos founders can share in a few clicks.",
  audience: "Indie founders and subscription businesses who share their revenue and milestones in public.",
  scope: "Product, brand, design, full-stack build and launch",
  problem: [
    "Founders love to share milestones like MRR, new customers and churn, but the usual options are a cropped dashboard screenshot or an evening spent designing a chart by hand.",
    "The numbers already live in the payment provider. What was missing was a way to pull them out safely, chart them well and export something that looks good in a social feed, without spreadsheets or design work.",
  ],
  solution: [
    "Pretty Metrics connects to a product's payment accounts with a read-only key and opens a studio with fifteen metrics, a choice of charts and card styles, and a library of still and animated backdrops. One click exports a PNG sized for the feed, or an MP4 on an animated backdrop.",
    "Paste a product's website and it reads the name, logo and brand colours from the site, then generates backdrops in those colours. It is free to use, with a one-time Pro payment for logos, no footer and video export.",
  ],
  features: [
    {
      name: "Seven payment providers",
      text: "Stripe, Paddle, Lemon Squeezy, Polar, RevenueCat, Square and Creem, with several providers combined into one total.",
    },
    {
      name: "Fifteen metrics",
      text: "MRR, ARR, revenue, subscribers, new customers, churn, lifetime value and breakdowns by plan, interval, country and cancellation reason.",
    },
    {
      name: "Sized for every feed",
      text: "Square, portrait, story and landscape exports at full social resolution, downloaded, copied or shared straight from the browser.",
    },
    {
      name: "Still and live backdrops",
      text: "Over a hundred backdrops, more than half of them animated, plus backdrops generated from each product's own brand colours and logo.",
    },
    {
      name: "Looping video export",
      text: "Animated cards export as seamless MP4 loops, encoded entirely in the user's browser.",
    },
    {
      name: "Private by design",
      text: "Keys are read-only and encrypted, revenue figures are never stored, and every image is drawn on the user's device.",
    },
  ],
  engineering: [
    {
      name: "Video encoded in the browser",
      text: "The card is captured once as a transparent image, then each frame paints the animated scene underneath it. Frames go to the browser's own video encoder, H.264 first with VP9 and AV1 as fallbacks, and every clip is exactly one loop long so it repeats without a seam.",
    },
    {
      name: "Animated scenes in plain canvas",
      text: "Around 9,000 lines of hand-written canvas scenes, each a function that paints one moment and loops exactly. Pixel-art scenes draw on a small fixed grid and scale up, so the preview and the exported file match at any size.",
    },
    {
      name: "Brand colours read from a website",
      text: "The server collects the colours a site declares, from its theme colour, manifest, CSS variables and SVG logo, groups near-identical shades and picks a primary and a clearly different secondary in a perceptual colour space. Every fetch is checked against private network addresses, so the URL box cannot probe the server.",
    },
    {
      name: "One model for seven provider APIs",
      text: "Each provider's data is mapped onto the same monthly grid. Stripe has no MRR history, so it is rebuilt from subscriptions. Mixed currencies are never summed, a product with one unreadable provider fails rather than showing a total that is too low, and derived metrics are calculated in the browser.",
    },
    {
      name: "Keys that only work for their owner",
      text: "Provider keys are encrypted with AES-256-GCM and bound to the owning account, so a copied ciphertext will not decrypt anywhere else. Stripe webhook signatures are verified directly, and production refuses test keys.",
    },
  ],
  stack: [
    "Next.js",
    "Canvas",
    "WebCodecs",
    "Stripe",
    "React",
    "TypeScript",
    "Neon Postgres",
    "Neon Auth",
    "Recharts",
    "Resend",
    "Tailwind CSS",
    "Vercel",
  ],
  cover: {
    src: prettyMetricsHero,
    alt: "The Pretty Metrics home page: rows of revenue chart cards for MRR, new customers and total revenue on colourful still and animated backdrops",
  },
  gallery: [
    {
      src: prettyMetricsDetail1,
      alt: "Pretty Metrics' about page: the headline Turn your MRR into charts worth sharing, above example share cards",
    },
    {
      src: prettyMetricsDetail2,
      alt: "The Pretty Metrics backdrop browser previewing an MRR card on the animated Coin Shower backdrop, beside a grid of live backdrops",
    },
  ],
  mobile: {
    src: prettyMetricsMobile,
    alt: "The Pretty Metrics home page on a phone",
  },
}

export const caseStudies: CaseStudy[] = [reelEstate, untilThen, viewlio, prettyMetrics]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

/** The live URL without its protocol, for address bars and link text. */
export function displayDomain(study: CaseStudy) {
  return new URL(study.url).host
}
