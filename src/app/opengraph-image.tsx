import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { shareImage } from "@/lib/seo"

/*
 * Default share image for every route: the card from the brand kit
 * (brand/social/og-image-1200x630.png), which is set in the brand fonts.
 * Regenerate it with brand/source when the headline changes. A route that
 * deserves its own (a blog post, a product) gets an opengraph-image.tsx in its
 * folder, which wins over this one.
 */
export const alt = shareImage.alt
export const size = { width: shareImage.width, height: shareImage.height }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const card = await readFile(join(process.cwd(), "brand/social/og-image-1200x630.png"), "base64")

  return new ImageResponse(
    (
      <img src={`data:image/png;base64,${card}`} alt="" width={size.width} height={size.height} />
    ),
    size,
  )
}
