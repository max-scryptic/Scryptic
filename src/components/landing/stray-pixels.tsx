import { cn } from "cn"

/** One pixel's colour: a Glint or Lapis fill, the periwinkle, or an outline like the rail joints. */
type PixelTone = "glint" | "primary" | "portrait" | "outline"

const tones: Record<PixelTone, string> = {
  glint: "bg-glint",
  primary: "bg-primary",
  portrait: "bg-portrait",
  outline: "border border-primary bg-background",
}

/** Cell size in px: a little over the 8px grid the drips build in, so a lone pixel reads as placed rather than as a speck. */
const CELL = 10

export type PixelCluster = {
  /** Which guide the cluster sits on. */
  side: "left" | "right"
  /** Distance from this element's line, the boundary between two sections. Negative is above it. */
  top: string
  /** Cells as [x, y] steps of one cell from the guide. Positive x runs in towards the content. */
  cells: { at: [number, number]; tone: PixelTone }[]
}

/**
 * Small pockets of colour on the page guides, a few loose pixels where two
 * sections meet, as if they fell off the drips. A zero-height element between
 * sections (like .rail-joint), so it never moves the layout, and fixed in
 * place rather than random so the page looks the same every visit. From sm up
 * only: on a phone the gutter is too narrow to hold them clear of the copy.
 *
 * Keep it to one cluster per break and to a few breaks per page, mostly Glint:
 * they are accents, and everywhere would make them noise.
 */
export function StrayPixels({ clusters, className }: { clusters: PixelCluster[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("stray-pixels pointer-events-none relative z-[1] hidden h-0 sm:block", className)}>
      {clusters.map((cluster, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: cluster.top,
            [cluster.side]: `calc(var(--rail-x) - ${CELL / 2}px)`,
            // Mirrored on the right guide, so positive x still points inwards.
            transform: cluster.side === "right" ? "scaleX(-1)" : undefined,
          }}
        >
          {cluster.cells.map(({ at: [x, y], tone }) => (
            <span
              key={`${x},${y}`}
              className={cn("absolute", tones[tone])}
              style={{ left: x * CELL, top: y * CELL, width: CELL, height: CELL }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
