import Link from "next/link"
import { cn } from "cn"
import type { CSSProperties } from "react"

import { Button } from "@/components/ui/button"
import { pages } from "@/lib/seo"

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
 * The cluster in one inner corner of the card. Drawn for the top left and
 * flipped into place, so x and y always step in from the corner.
 */
function CornerPixels({ corner }: { corner: "top-right" | "bottom-left" }) {
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
 * The closing call to action: one card with the booking button, on the page
 * background. Pixel clusters sit in two of its
 * corners and grow on hover. No pixel label over it: those belong to content
 * sections.
 */
export function ContactSection({
  title = "Start with a discovery call",
  text = "Tell us what you are building and where it is stuck. You will leave knowing the next step.",
}: {
  title?: string
  text?: string
}) {
  return (
    <section aria-labelledby="contact-heading" id="contact" className="scroll-mt-28 px-4 pb-24 sm:px-6">
      <div
        data-reveal="zoom"
        className="group corners corners-grow guides mx-auto flex max-w-6xl flex-col items-center gap-6 border border-border px-6 py-16 text-center transition-colors duration-300 ease-out hover:border-primary/40 motion-reduce:transition-none sm:py-20"
      >
        <CornerPixels corner="top-right" />
        <CornerPixels corner="bottom-left" />
        <h2 id="contact-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-pretty text-muted-foreground">{text}</p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={pages.bookCall.path} />}
          className="h-11 px-6 text-base"
        >
          Book a discovery call
        </Button>
      </div>
    </section>
  )
}
