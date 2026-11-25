import { cn } from "cn"

/*
 * The parts every landing-style page shares: the home page and each service
 * page are built from the sections in this folder, so they look and behave the
 * same. A section's copy is passed in; its layout lives here.
 */

/**
 * The type of the small uppercase labels over sections, the nav links and
 * button text: Geist Pixel, spaced out. Colour is left to the caller.
 */
export const pixelLabel = "font-pixel text-sm tracking-[0.12em] uppercase"

/** The small label above a section's heading, e.g. "Pricing". */
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn(pixelLabel, "text-primary", className)}>{children}</p>
}

/**
 * The label and h2 at the top of a landing section. No intro under the
 * title: let the section's content follow the heading directly.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  aside,
  className,
}: {
  /** The small label above the title, e.g. "Pricing". Every section has one. */
  eyebrow: string
  title: string
  id: string
  /** Shown beside the title on wide screens, and under it on narrower ones. */
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-reveal="children"
      className={cn(
        "grid content-start gap-4",
        aside ? "xl:grid-cols-[auto_auto] xl:justify-start xl:gap-x-6" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="xl:col-start-1">{eyebrow}</Eyebrow>}
      <h2 id={id} className="max-w-2xl text-3xl leading-[1.05] text-balance sm:text-[2.75rem] xl:col-start-1 xl:self-center">
        {title}
      </h2>
      {aside && (
        <div
          className={cn(
            "mt-2 justify-self-start xl:col-start-2 xl:mt-0 xl:self-center",
            // Level with the title, which a label pushes down a row.
            eyebrow ? "xl:row-start-2" : "xl:row-start-1",
          )}
        >
          {aside}
        </div>
      )}
    </div>
  )
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-1 size-4 shrink-0 text-primary", className)}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-1 size-4 shrink-0 text-muted-foreground", className)}
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/**
 * Vertical rhythm for a landing section. Vary it down the page: dense,
 * reference sections (FAQ, process) sit tight, the sections that make the
 * case get room, and an even py-24 everywhere reads as a template. Each
 * scroll margin tops the padding up to 7rem, so a linked heading lands just
 * under the fixed header.
 */
export const sectionSpace = {
  tight: "scroll-mt-12 py-16 sm:py-20",
  default: "scroll-mt-4 py-24",
  loose: "scroll-mt-0 py-28 sm:py-40",
} as const

/**
 * Full-bleed section backgrounds besides the page and Lapis. Each redraws the
 * guides over itself (.ruled) in its own colour, with a rail joint where it
 * starts and ends.
 * - warm: a quiet paper tone, a shade off the page in either theme.
 * - ink: a pale Lapis wash in the light theme and a near-black with a hint of
 *   Lapis in the dark theme. Its contents use the page's own theme tokens.
 */
export type SectionBand = "warm" | "ink"

const bands: Record<SectionBand, string> = {
  warm: "bg-band-warm [--guide:color-mix(in_oklab,var(--foreground)_12%,var(--band-warm))]",
  ink: "bg-band-ink [--guide:color-mix(in_oklab,var(--foreground)_12%,var(--band-ink))]",
}

/**
 * A landing section's outer frame: full width with the page gutters, its
 * content in the max-w-6xl column.
 */
export function LandingSection({
  id,
  labelledBy,
  space = "default",
  band,
  tightAfterBand,
  className,
  children,
}: {
  id: string
  labelledBy: string
  space?: keyof typeof sectionSpace
  band?: SectionBand
  /** Straight after a band, keep only the band's gap above it (6rem), not double. */
  tightAfterBand?: boolean
  className?: string
  children: React.ReactNode
}) {
  const section = (
    <section
      aria-labelledby={labelledBy}
      id={id}
      className={cn(
        "px-4 sm:px-6",
        // A band keeps a single section's padding inside, whatever its rhythm.
        band ? sectionSpace.default : sectionSpace[space],
        band && "ruled",
        band && bands[band],
        tightAfterBand && "after-band-tight",
      )}
    >
      <div className={cn("mx-auto flex max-w-6xl flex-col gap-12", className)}>{children}</div>
    </section>
  )
  if (!band) return section
  // Double the section padding outside the band (.band-gap), single inside.
  return (
    <>
      <div aria-hidden="true" className="band-gap" />
      <div aria-hidden="true" className="rail-joint" />
      {section}
      <div aria-hidden="true" className="rail-joint" />
      <div aria-hidden="true" className="band-gap" />
    </>
  )
}
