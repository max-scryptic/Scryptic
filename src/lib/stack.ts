import type { StaticImageData } from "next/image"

import claudeCodeLogo from "@/assets/stack/claude-code.svg"
import cloudflareLogo from "@/assets/stack/cloudflare.svg"
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
// The last one spans the full row, so keep it the one to highlight.
export const stack: StackTool[] = [
  { name: "Neon", role: "Database", logo: neonLogo, wordmark: true },
  { name: "Supabase", role: "Database", logo: supabaseLogo, wordmark: true },
  { name: "Vercel", role: "Hosting", logo: vercelLogo, wordmark: true },
  { name: "Cloudflare", role: "Storage", logo: cloudflareLogo, wordmark: true },
  { name: "Tailwind CSS", role: "Styling", logo: tailwindLogo, wordmark: true },
  { name: "Node.js", role: "Runtime", logo: nodejsLogo, wordmark: true },
  { name: "Claude Code", role: "Building", logo: claudeCodeLogo, wordmark: false },
]
