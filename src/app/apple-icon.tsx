import { ImageResponse } from "next/og"

import { BrandMarkImage } from "@/lib/brand-image"
import { siteConfig } from "@/lib/site"

// iOS rounds the corners itself and turns transparency black, so this one
// is drawn square on the Night background.
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(<BrandMarkImage size={size.width} background={siteConfig.colors.background} />, size)
}
