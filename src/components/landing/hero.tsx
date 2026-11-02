import Link from "next/link"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { VoxelField, type VoxelShape } from "@/components/voxel-field"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"

export type TerminalLine = { prompt: boolean; text: string }

/**
 * The full-width, square-edged band that opens a landing page. The home page
 * and the services hub use the Lapis band, the same Lapis in both themes; the
 * individual service pages use the pale `light` band, so they read as a level
 * below. Either background covers the page's guide lines, so none run through
 * it. The visual keeps the same inset as the copy, so the two sit
 * symmetrically in the column. Render a `rail-joint` straight after it.
 *
 * Keep every hero the same size: a headline of about 45 characters (three
 * lines at full width) and an intro of about 115 (one sentence), as on the
 * home page. The page's title and description carry the rest of the keywords.
 */
export function LandingHero({
  title,
  intro,
  secondary,
  visual,
  shape = "studio",
  eyebrow,
  tone = "lapis",
}: {
  /** The page's only <h1>. Lead with the page's main search phrase. */
  title: React.ReactNode
  intro: React.ReactNode
  /** The outline button next to "Book a discovery call". */
  secondary: { label: string; href: string }
  /** The decorative card on the right: a TerminalCard or one of hero-visuals.tsx, inside a HeroWindow. */
  visual: React.ReactNode
  /** The cubes behind the band; each page has its own. */
  shape?: VoxelShape
  /**
   * A small label above the heading, e.g. "Services", linked when it names a
   * parent page. With `current` it becomes a breadcrumb: "Services / MVP development".
   */
  eyebrow?: { label: string; href?: string; current?: string }
  /**
   * "lapis": white type on the Lapis band (home, services hub). "light": dark
   * type on a pale Lapis tint with Lapis cubes (service pages). Highlight the
   * headline's lead phrase with text-[#c3caff] on Lapis and text-primary on light.
   */
  tone?: "lapis" | "light"
}) {
  const light = tone === "light"
  const eyebrowText = "font-mono text-xs tracking-widest uppercase"
  const parentColour = light ? "text-primary hover:text-foreground" : "text-[#c3caff] hover:text-white"

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden px-4 pt-36 pb-24 sm:px-6 sm:pt-44 sm:pb-32",
        light ? "bg-[#e3e7fb] text-foreground dark:bg-[#161a3a]" : "bg-[#2b3fd6] text-white",
      )}
    >
      <VoxelField
        shape={shape}
        faces={
          light
            ? ["fill-primary/30", "fill-primary/18", "fill-primary/8"]
            : ["fill-white/25", "fill-white/12", "fill-white/5"]
        }
        className="hero-parallax absolute top-0 right-0 -z-10 h-[540px] w-[960px] mask-b-from-[110px] mask-b-to-[200px] sm:right-auto sm:left-1/2 sm:h-[900px] sm:w-[1600px] sm:-translate-x-1/2 sm:mask-none"
      />
      <div className="hero-recede mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className={cn("hero-rise flex flex-col items-start gap-7", inset)}>
          {/* The eyebrow hangs in the band's top padding, out of the flow, so a
              hero with one is exactly as tall as the home page's without. */}
          <div className="relative">
            {eyebrow?.current ? (
              <nav aria-label="Breadcrumb" className="absolute bottom-full left-0 mb-5">
                <ol className={cn("flex flex-wrap gap-2", eyebrowText)}>
                  <li>
                    {eyebrow.href ? (
                      <Link href={eyebrow.href} className={parentColour}>
                        {eyebrow.label}
                      </Link>
                    ) : (
                      <span className={light ? "text-primary" : "text-[#c3caff]"}>{eyebrow.label}</span>
                    )}
                  </li>
                  <li aria-hidden="true" className={light ? "text-muted-foreground" : "text-white/40"}>
                    /
                  </li>
                  <li aria-current="page">{eyebrow.current}</li>
                </ol>
              </nav>
            ) : eyebrow?.href ? (
              <Link href={eyebrow.href} className={cn("absolute bottom-full left-0 mb-5", eyebrowText, parentColour)}>
                {eyebrow.label}
              </Link>
            ) : eyebrow ? (
              <p className={cn("absolute bottom-full left-0 mb-5", eyebrowText, light ? "text-primary" : "text-[#c3caff]")}>
                {eyebrow.label}
              </p>
            ) : null}
            <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">{title}</h1>
          </div>
          <p className={cn("max-w-xl text-lg text-pretty", light ? "text-muted-foreground" : "text-white/80")}>
            {intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className={cn("h-11 px-5 text-base", !light && "bg-white text-[#2b3fd6] hover:bg-white/90")}
            >
              Book a discovery call
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={secondary.href} />}
              className={cn(
                "h-11 px-5 text-base",
                !light &&
                  "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/40 dark:bg-transparent dark:hover:bg-white/10",
              )}
            >
              {secondary.label}
            </Button>
          </div>
        </div>

        {visual}
      </div>
    </section>
  )
}

/**
 * The window the hero's visual sits in: square edges, accent brackets, a title
 * bar with three squares, a file-like label and an optional status. Decorative,
 * so hidden from assistive tech; the copy beside it says the same thing.
 */
export function HeroWindow({
  label,
  status,
  children,
}: {
  label?: string
  /** A short live-looking status at the right of the title bar, e.g. "Week 2". */
  status?: string
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className="hero-card corners mx-6 flex min-h-[21.5rem] flex-col border sm:mx-8 lg:ml-0 border-border bg-card text-card-foreground shadow-2xl shadow-black/25 [--corner:var(--foreground)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        {label && <span className="ml-3 font-mono text-xs text-muted-foreground">{label}</span>}
        {status && (
          <span className="ml-auto flex items-center gap-2 font-mono text-xs text-primary dark:text-[#c3caff]">
            <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
            {status}
          </span>
        )}
      </div>
      {/* Every hero card is at least the same height, its content centred in the space. */}
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}

/** Command lines printing one after another: `$` lines are commands, the rest ticks. */
export function TerminalCard({ lines }: { lines: TerminalLine[] }) {
  return (
    <HeroWindow>
      <div className="hero-terminal flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed">
        {lines.map((line) => (
          <p
            key={line.text}
            className={cn(
              "flex gap-3",
              line.prompt ? "text-foreground [&:not(:first-child)]:mt-3" : "text-muted-foreground",
            )}
          >
            <span className="text-primary">{line.prompt ? "$" : "✓"}</span>
            {line.text}
          </p>
        ))}
        <span className="mt-1 h-4 w-2 animate-pulse bg-primary motion-reduce:animate-none" />
      </div>
    </HeroWindow>
  )
}
