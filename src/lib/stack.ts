import type { StaticImageData } from "next/image"

import type { IconName } from "@/components/landing/icons"

import androidStudioLogo from "@/assets/stack/android-studio.svg"
import cloudflareLogo from "@/assets/stack/cloudflare.svg"
import jetpackComposeLogo from "@/assets/stack/jetpack-compose.svg"
import kotlinLogo from "@/assets/stack/kotlin.svg"
import revenuecatLogo from "@/assets/stack/revenuecat.svg"
import stripeLogo from "@/assets/stack/stripe.svg"
import swiftLogo from "@/assets/stack/swift.svg"
import neonLogo from "@/assets/stack/neon.svg"
import nodejsLogo from "@/assets/stack/nodejs.svg"
import supabaseLogo from "@/assets/stack/supabase.svg"
import tailwindLogo from "@/assets/stack/tailwindcss.svg"
import vercelLogo from "@/assets/stack/vercel.svg"

export type StackTool = {
  name: string
  /** What we use it for, shown under the logo. */
  role: string
  /** The brand's own full-colour logo, an SVG from src/assets/stack/. */
  logo: StaticImageData
  /** True when the logo is a wordmark that already spells the name. */
  wordmark: boolean
}

// The tools behind every build, in the order the home page tiles show them.
// Tiles sit two to a row, so keep the count even.
export const stack: StackTool[] = [
  { name: "Neon", role: "Database", logo: neonLogo, wordmark: true },
  { name: "Supabase", role: "Database", logo: supabaseLogo, wordmark: true },
  { name: "Vercel", role: "Hosting", logo: vercelLogo, wordmark: true },
  { name: "Cloudflare", role: "Storage", logo: cloudflareLogo, wordmark: true },
  { name: "Tailwind CSS", role: "Styling", logo: tailwindLogo, wordmark: true },
  { name: "Node.js", role: "Runtime", logo: nodejsLogo, wordmark: true },
]

/**
 * A tool on the mobile app development page. Tools whose owners don't allow
 * their mark to be shown this way, such as Apple's In-App Purchase, have no
 * logo and show a line icon beside their name instead.
 */
export type MobileTool = {
  name: string
  /** What we use it for, shown under the name. */
  role: string
  logo?: StaticImageData
  /** The line icon shown in place of a logo. */
  icon?: IconName
}

// The tools behind each native app, and the two ways a mobile app takes money.
export const mobileTools = {
  ios: [
    { name: "Swift", role: "Language", logo: swiftLogo },
    { name: "SwiftUI", role: "Screens", icon: "screen" },
    { name: "Xcode", role: "Build and release", icon: "code" },
  ],
  android: [
    { name: "Kotlin", role: "Language", logo: kotlinLogo },
    { name: "Jetpack Compose", role: "Screens", logo: jetpackComposeLogo },
    { name: "Android Studio", role: "Build and release", logo: androidStudioLogo },
  ],
  storePayments: [
    { name: "RevenueCat", role: "Billing on both stores", logo: revenuecatLogo },
    { name: "In-App Purchase", role: "Apple's billing", icon: "card" },
    { name: "Google Play Billing", role: "Google's billing", icon: "card" },
  ],
  directPayments: [{ name: "Stripe", role: "Card payments", logo: stripeLogo }],
} satisfies Record<string, MobileTool[]>
