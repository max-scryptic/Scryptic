import type { StaticImageData } from "next/image"

import type { IconName } from "@/components/landing/icons"

import androidStudioLogo from "@/assets/stack/android-studio.svg"
import cloudflareLogo from "@/assets/stack/cloudflare.svg"
import jetpackComposeLogo from "@/assets/stack/jetpack-compose.svg"
import kotlinLogo from "@/assets/stack/kotlin.svg"
import revenuecatLogo from "@/assets/stack/revenuecat.svg"
import swiftLogo from "@/assets/stack/swift.svg"
import swiftuiLogo from "@/assets/stack/swiftui.png"
import xcodeLogo from "@/assets/stack/xcode.png"
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
 * A tool on the mobile app development page, with its owner's logo from
 * src/assets/stack/. A tool whose owner doesn't allow its mark to be shown
 * this way gets no logo and shows a line icon beside its name instead.
 */
export type MobileTool = {
  name: string
  /** What we use it for, shown under the name. */
  role: string
  logo?: StaticImageData
  /** The line icon shown in place of a logo. */
  icon?: IconName
}

// RevenueCat sits over both stores' billing, so one record says who has paid.
const revenuecat: MobileTool = { name: "RevenueCat", role: "In-app purchases", logo: revenuecatLogo }

// The tools behind each native app, from the language to the store billing.
// Tiles sit two to a row, so keep the count even.
export const mobileTools = {
  ios: [
    { name: "Swift", role: "Language", logo: swiftLogo },
    { name: "SwiftUI", role: "Screens", logo: swiftuiLogo },
    { name: "Xcode", role: "Build and release", logo: xcodeLogo },
    revenuecat,
  ],
  android: [
    { name: "Kotlin", role: "Language", logo: kotlinLogo },
    { name: "Jetpack Compose", role: "Screens", logo: jetpackComposeLogo },
    { name: "Android Studio", role: "Build and release", logo: androidStudioLogo },
    revenuecat,
  ],
} satisfies Record<string, MobileTool[]>
