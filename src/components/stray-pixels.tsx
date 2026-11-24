"use client"

import { usePathname } from "next/navigation"
import { cn } from "cn"

/** One pixel's colour: an accent fill, Lapis, the periwinkle, or an outline like the rail joints. */
type PixelTone = "glint" | "mint" | "primary" | "portrait" | "outline"

const tones: Record<PixelTone, string> = {
  glint: "bg-glint",
  mint: "bg-mint",
  primary: "bg-primary",
  portrait: "bg-portrait",
  outline: "border border-primary bg-background",
}

/**
 * Which colours a page's pixels draw from, by path. The home page has Glint,
 * the service pages mint, and every other page keeps to the theme's own blues.
 * The first is the page's accent and leads every cluster; repeats weight the draw.
 */
function paletteFor(pathname: string): PixelTone[] {
  if (pathname === "/") return ["glint", "glint", "glint", "primary", "portrait"]
  if (pathname.startsWith("/services")) return ["mint", "mint", "mint", "primary", "portrait"]
  return ["primary", "primary", "portrait", "portrait"]
}

/** Cell size in px: a little over the 8px grid the drips build in, so a lone pixel reads as placed rather than as a speck. */
const CELL = 10

/** Cluster shapes as [x, y] cells; x counts out from the guide, away from the content. */
const shapes: [number, number][][] = [
  [[0, 0]],
  [[0, 0], [1, 1]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1], [1, 1]],
  [[0, 0], [2, 1]],
  [[0, 0], [1, 0], [1, 1]],
  [[0, 0], [0, 2]],
]

/** FNV-1a: a stable number from the path, so a page scatters the same way on the server and in the browser. */
function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

/** Mulberry32: a small seeded generator, so each page gets its own scatter that never changes. */
function seeded(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A few loose pixels scattered down every page, as if they fell off the
 * drips, in the margins outside the content column. Sparse on purpose, four to six clusters a page however long it is,
 * each in its own stretch of the page so they never bunch.
 *
 * The placement looks random but comes from the path, so it is the same on
 * every visit and on the server and the browser (no hydration mismatch).
 *
 * It sits behind the content (inside the root's isolated stacking context),
 * so a full-bleed band hides any cluster that lands on it, whole. From xl
 * up only: below that the margins are too narrow to hold them.
 */
export function StrayPixels({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"
  const random = seeded(hash(pathname))
  const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length)]
  const palette = paletteFor(pathname)

  const count = 4 + Math.floor(random() * 3)
  // From just under the hero to just above the footer, in equal stretches.
  const from = 9
  const span = (94 - from) / count
  const clusters = Array.from({ length: count }, (_, index) => {
    const side = random() < 0.5 ? "left" : "right"
    // Somewhere in the margin outside the guide, never on or across it, so no
    // card edge or corner mark ever clips or crowds a pixel.
    const across = 0.3 + random() * 0.55
    return {
      side,
      top: from + span * index + random() * span * 0.8,
      across,
      // The first cell is always the page's accent, so every cluster carries it.
      cells: pick(shapes).map((at, cell) => ({
        at,
        tone: cell === 0 ? palette[0] : random() < 0.12 ? ("outline" as const) : pick(palette),
      })),
    }
  })

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 hidden xl:block", className)}>
      {clusters.map((cluster, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${cluster.top.toFixed(2)}%`,
            // The cluster's inner edge, kept far enough in to hold the widest shape on screen.
            [cluster.side]: `max(${CELL * 3}px, calc(var(--rail-x) * ${cluster.across.toFixed(3)}))`,
            // Mirrored on the right, so x still counts outwards.
            transform: cluster.side === "right" ? "scaleX(-1)" : undefined,
          }}
        >
          {cluster.cells.map(({ at: [x, y], tone }) => (
            <span
              key={`${x},${y}`}
              className={cn("absolute", tones[tone])}
              style={{ left: -(x + 1) * CELL, top: y * CELL, width: CELL, height: CELL }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
