import type { StaticImageData } from "next/image"

import type { IconName } from "@/components/landing/icons"

import jetpackComposeMark from "@/assets/stack/jetpack-compose.svg"
import revenuecatMark from "@/assets/stack/revenuecat.svg"
import androidMark from "@/assets/stack/marks/android.svg"
import cloudflareMark from "@/assets/stack/marks/cloudflare.svg"
import drizzleMark from "@/assets/stack/marks/drizzle.svg"
import ffmpegMark from "@/assets/stack/marks/ffmpeg.svg"
import googleMapsMark from "@/assets/stack/marks/google-maps.svg"
import googlePlayMark from "@/assets/stack/marks/google-play.svg"
import junitMark from "@/assets/stack/marks/junit.svg"
import kotlinMark from "@/assets/stack/marks/kotlin.svg"
import lemonSqueezyMark from "@/assets/stack/marks/lemon-squeezy.svg"
import materialDesignMark from "@/assets/stack/marks/material-design.svg"
import mediapipeMark from "@/assets/stack/marks/mediapipe.svg"
import neonMark from "@/assets/stack/marks/neon.svg"
import nextjsMark from "@/assets/stack/marks/nextjs.svg"
import nodejsMark from "@/assets/stack/marks/nodejs.svg"
import openaiMark from "@/assets/stack/marks/openai.svg"
import paddleMark from "@/assets/stack/marks/paddle.svg"
import posthogMark from "@/assets/stack/marks/posthog.svg"
import reactMark from "@/assets/stack/marks/react.svg"
import resendMark from "@/assets/stack/marks/resend.svg"
import sharpMark from "@/assets/stack/marks/sharp.svg"
import squareMark from "@/assets/stack/marks/square.svg"
import stripeMark from "@/assets/stack/marks/stripe.svg"
import supabaseMark from "@/assets/stack/marks/supabase.svg"
import tailwindMark from "@/assets/stack/marks/tailwindcss.svg"
import typescriptMark from "@/assets/stack/marks/typescript.svg"
import vercelMark from "@/assets/stack/marks/vercel.svg"
import vitestMark from "@/assets/stack/marks/vitest.svg"
import youtubeMark from "@/assets/stack/marks/youtube.svg"

/*
 * The technologies named in case study stacks, each defined once so a tool
 * has the same name and mark on every page. Marks are the brand's own square
 * symbol in full colour, an SVG in src/assets/stack/marks/, drawn on a white
 * tile in both themes. A tool with no symbol of its own (a browser API, or a
 * brand without a usable mark) gets a line icon in its place.
 */
export type Tech = {
  name: string
  logo?: StaticImageData
  /** The line icon shown when there is no logo. */
  icon?: IconName
}

export const tech = {
  // Frontend and runtime
  nextjs: { name: "Next.js", logo: nextjsMark },
  react: { name: "React", logo: reactMark },
  typescript: { name: "TypeScript", logo: typescriptMark },
  tailwind: { name: "Tailwind CSS", logo: tailwindMark },
  nodejs: { name: "Node.js", logo: nodejsMark },
  canvas: { name: "Canvas", icon: "brush" },
  webcodecs: { name: "WebCodecs", icon: "film" },

  // Data and accounts
  neon: { name: "Neon Postgres", logo: neonMark },
  neonAuth: { name: "Neon Auth", logo: neonMark },
  drizzle: { name: "Drizzle ORM", logo: drizzleMark },
  supabase: { name: "Supabase Postgres", logo: supabaseMark },
  supabaseAuth: { name: "Supabase Auth", logo: supabaseMark },
  r2: { name: "Cloudflare R2", logo: cloudflareMark },

  // Services
  stripe: { name: "Stripe", logo: stripeMark },
  resend: { name: "Resend", logo: resendMark },
  posthog: { name: "PostHog", logo: posthogMark },
  googlePlaces: { name: "Google Places", logo: googleMapsMark },
  youtube: { name: "YouTube APIs", logo: youtubeMark },
  vercel: { name: "Vercel", logo: vercelMark },

  // AI and media
  fal: { name: "fal.ai", icon: "spark" },
  openai: { name: "OpenAI", logo: openaiMark },
  ffmpeg: { name: "ffmpeg", logo: ffmpegMark },
  sharp: { name: "sharp", logo: sharpMark },
  tesseract: { name: "Tesseract", icon: "scan" },
  qencode: { name: "Qencode", icon: "film" },

  // Payment providers Pretty Metrics reads from
  paddle: { name: "Paddle", logo: paddleMark },
  lemonSqueezy: { name: "Lemon Squeezy", logo: lemonSqueezyMark },
  polar: { name: "Polar", icon: "card" },
  revenuecat: { name: "RevenueCat", logo: revenuecatMark },
  square: { name: "Square", logo: squareMark },
  creem: { name: "Creem", icon: "card" },

  // Android
  kotlin: { name: "Kotlin", logo: kotlinMark },
  compose: { name: "Jetpack Compose", logo: jetpackComposeMark },
  material3: { name: "Material 3", logo: materialDesignMark },
  androidAlarms: { name: "Android AlarmManager", logo: androidMark },
  camerax: { name: "CameraX", icon: "camera" },
  mediapipe: { name: "MediaPipe", logo: mediapipeMark },
  playBilling: { name: "Google Play Billing", logo: googlePlayMark },
  onDevice: { name: "None, on purpose", icon: "lock" },

  // Testing
  vitest: { name: "Vitest", logo: vitestMark },
  junit: { name: "JUnit", logo: junitMark },
} satisfies Record<string, Tech>

/** One layer of a product's stack: what it does, the tools behind it and how this product uses them. */
export type StackLayer = {
  /** The job this layer does, e.g. "Payments". Shown as the layer's label. */
  role: string
  tools: Tech[]
  /** One sentence on what these tools do in this product. */
  note: string
}
