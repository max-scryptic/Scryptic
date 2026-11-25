import { cn } from "cn"
import type { CSSProperties } from "react"

/** Cell size in px, the same as the stray pixels on the guides (components/landing/stray-pixels.tsx). */
const CELL = 10

const tones = {
  glint: "bg-glint",
  primary: "bg-primary",
  portrait: "bg-portrait",
  outline: "border border-primary bg-background",
} as const

/**
 * One corner's pixels, as [x, y] cells stepping in from the corner. The first
 * few show at rest; the rest build in one by one on hover, in `order`, as if
 * the cluster were growing out of the corner.
 */
const cluster: { at: [number, number]; tone: keyof typeof tones; order?: number }[] = [
  { at: [0, 0], tone: "primary" },
  { at: [1, 0], tone: "primary" },
  { at: [0, 1], tone: "primary" },
  { at: [2, 0], tone: "portrait" },
  { at: [0, 2], tone: "glint" },
  { at: [1, 1], tone: "outline", order: 1 },
  { at: [3, 0], tone: "primary", order: 2 },
  { at: [0, 3], tone: "primary", order: 3 },
  { at: [2, 1], tone: "glint", order: 4 },
  { at: [1, 2], tone: "portrait", order: 5 },
  { at: [4, 0], tone: "outline", order: 6 },
  { at: [3, 2], tone: "primary", order: 7 },
  { at: [0, 5], tone: "primary", order: 8 },
  { at: [5, 1], tone: "glint", order: 9 },
]

/**
 * A pixel cluster in one inner corner of a call-to-action card. The card needs
 * `group` (the cluster grows on its hover and focus) and a positioning context
 * (`.corners` gives one). Drawn for the top left and flipped into place, so x
 * and y always step in from the corner.
 */
export function CornerPixels({ corner }: { corner: "top-right" | "bottom-left" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-0",
        corner === "top-right" ? "top-0 right-0 -scale-x-100" : "bottom-0 left-0 -scale-y-100",
      )}
    >
      {cluster.map(({ at: [x, y], tone, order }) => (
        <span
          key={`${x},${y}`}
          className={cn(
            "absolute transition-opacity duration-100 motion-reduce:transition-none",
            tones[tone],
            // Building in waits its turn; going back out is all at once.
            order
              ? "opacity-0 group-focus-within:opacity-100 group-focus-within:[transition-delay:var(--d)] group-hover:opacity-100 group-hover:[transition-delay:var(--d)]"
              : "opacity-60 group-focus-within:opacity-100 group-hover:opacity-100",
          )}
          style={
            {
              left: x * CELL,
              top: y * CELL,
              width: CELL,
              height: CELL,
              "--d": `${(order ?? 0) * 45}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

/**
 * The frame every call-to-action card shares with the closing CTA: on the page
 * background, with corner brackets that lengthen and a border that turns Lapis
 * on hover. Render <CornerPixels> for both corners inside it.
 */
export const ctaFrame =
  "group corners corners-grow guides border border-border transition-colors duration-300 ease-out hover:border-primary/40 motion-reduce:transition-none"
