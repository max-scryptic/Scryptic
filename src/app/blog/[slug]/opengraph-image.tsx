import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { getPost, getSeries, posts, readingMinutes } from "@/lib/blog"
import { shareImage } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/*
 * Each post's share card, in the brand kit's link preview style: the post's
 * title on Night, the series and topic above it in Plex Mono, the author and
 * reading time below, and the mark faint behind. Generated at build time for
 * every post.
 */
export const alt = `A ${siteConfig.name} blog post`
export const size = { width: shareImage.width, height: shareImage.height }
export const contentType = "image/png"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

const brand = (...path: string[]) => join(process.cwd(), "brand", ...path)

/** Long titles step down a size so they stay within three lines. */
function titleSize(title: string) {
  if (title.length <= 40) return 76
  if (title.length <= 60) return 64
  return 56
}

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)!
  const series = getSeries(post.series)

  const [heading, mono, lockup, mark] = await Promise.all([
    readFile(brand("fonts", "hanken-grotesk-latin-500-normal.woff")),
    readFile(brand("fonts", "ibm-plex-mono-latin-400-normal.woff")),
    readFile(brand("logo", "png", "scryptic-lockup-horizontal-mist-1200w.png"), "base64"),
    readFile(brand("logo", "png", "scryptic-mark-white-512w.png"), "base64"),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0E0D14",
          color: "#EEF1F5",
          fontFamily: "Hanken Grotesk",
          position: "relative",
        }}
      >
        <img
          src={`data:image/png;base64,${mark}`}
          alt=""
          width={560}
          height={506}
          style={{ position: "absolute", right: -140, bottom: -110, opacity: 0.06 }}
        />

        <img src={`data:image/png;base64,${lockup}`} alt="" height={44} width={328} />

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7D8BFF",
            }}
          >
            {`${series.label} · ${post.topic}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize(post.title),
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {post.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#A3A8B8",
          }}
        >
          <span>{`By ${founder.fullName}`}</span>
          <span>{`${readingMinutes(post)} min read`}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Hanken Grotesk", data: heading, weight: 500, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  )
}
