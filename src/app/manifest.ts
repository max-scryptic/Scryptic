import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    lang: siteConfig.language,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: siteConfig.colors.background,
    theme_color: siteConfig.colors.background,
    icons: [
      // From the brand kit (brand/favicon); the maskable one keeps the mark
      // inside the safe zone Android crops to.
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
