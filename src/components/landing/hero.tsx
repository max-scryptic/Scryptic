import Link from "next/link"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { VoxelField } from "@/components/voxel-field"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"

export type TerminalLine = { prompt: boolean; text: string }

/**
 * The full-width, square-edged Lapis band that opens a landing page, the same
 * Lapis in both themes. Its background covers the page's guide lines, so none
 * run through it. The terminal card keeps the same inset as the copy, so the
 * two sit symmetrically in the column. Render a `rail-joint` straight after it.
 */
export function LandingHero({
  title,
  intro,
  secondary,
  terminal,
  eyebrow,
}: {
  /** The page's only <h1>. */
  title: React.ReactNode
  intro: React.ReactNode
  /** The outline button next to "Book a discovery call". */
  secondary: { label: string; href: string }
  /** The decorative command card: `$` lines are commands, the rest ticks. */
  terminal: TerminalLine[]
  /** A small label above the heading, e.g. "Services". */
  eyebrow?: { label: string; href: string }
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#2b3fd6] px-4 pt-36 pb-24 text-white sm:px-6 sm:pt-44 sm:pb-32">
      <VoxelField
        faces={["fill-white/25", "fill-white/12", "fill-white/5"]}
        className="hero-parallax absolute top-0 right-0 -z-10 h-[540px] w-[960px] mask-b-from-[110px] mask-b-to-[200px] sm:right-auto sm:left-1/2 sm:h-[900px] sm:w-[1600px] sm:-translate-x-1/2 sm:mask-none"
      />
      <div className="hero-recede mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className={cn("hero-rise flex flex-col items-start gap-7", inset)}>
          {eyebrow && (
            <Link
              href={eyebrow.href}
              className="-mb-2 font-mono text-xs tracking-widest text-[#c3caff] uppercase hover:text-white"
            >
              {eyebrow.label}
            </Link>
          )}
          <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">{title}</h1>
          <p className="max-w-xl text-lg text-pretty text-white/80">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="h-11 bg-white px-5 text-base text-[#2b3fd6] hover:bg-white/90"
            >
              Book a discovery call
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={secondary.href} />}
              className="h-11 border-white/40 bg-transparent px-5 text-base text-white hover:bg-white/10 hover:text-white dark:border-white/40 dark:bg-transparent dark:hover:bg-white/10"
            >
              {secondary.label}
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-card corners mx-6 border sm:mx-8 lg:ml-0 border-border bg-card text-card-foreground shadow-2xl shadow-black/25 [--corner:var(--foreground)]"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2 bg-foreground/15" />
            <span className="size-2 bg-foreground/15" />
            <span className="size-2 bg-foreground/15" />
          </div>
          <div className="hero-terminal flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed">
            {terminal.map((line) => (
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
        </div>
      </div>
    </section>
  )
}
