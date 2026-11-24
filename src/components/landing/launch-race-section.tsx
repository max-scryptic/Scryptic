"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * The usual route to a first launch against a Scryptic sprint, raced week by
 * week once the section scrolls into view. The usual route's stages are the
 * problems founders hit; our bar launches early and carries on as "live with
 * customers" to the same finish, so both tracks end full width. The weeks are
 * illustrative, not data: keep the stages short enough to label inside the bar.
 */

const usualRoute = [
  { label: "Find a developer", weeks: 8 },
  { label: "Quotes", weeks: 3 },
  { label: "Spec", weeks: 3 },
  { label: "Build", weeks: 10 },
  { label: "Delays", weeks: 5 },
  { label: "Handover", weeks: 3 },
]
const totalWeeks = usualRoute.reduce((n, stage) => n + stage.weeks, 0)
/** Discovery call, the 2 week sprint and the handover week. */
const launchWeek = 4
const tickEvery = 4
const msPerWeek = 230

const pct = (weeks: number) => `${(weeks / totalWeeks) * 100}%`

/** The week counter: starts once the race is in view, or jumps to the end for reduced motion. */
function useRaceWeek() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [week, setWeek] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: 0.45 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || week >= totalWeeks) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const id = setTimeout(() => setWeek(reduced ? totalWeeks : week + 1), reduced ? 0 : msPerWeek)
    return () => clearTimeout(id)
  }, [started, week])

  return [ref, week] as const
}

function TrackHeader({ name, end, show, highlight }: { name: React.ReactNode; end: string; show: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      {name}
      <p
        className={cn(
          "bg-card font-mono text-xs tracking-widest uppercase transition-opacity duration-500",
          show ? "opacity-100" : "opacity-0",
          highlight ? "text-primary dark:text-[#c3caff]" : "text-muted-foreground",
        )}
      >
        {end}
      </p>
    </div>
  )
}

export function LaunchRaceSection() {
  const [ref, week] = useRaceWeek()
  const launched = week >= launchWeek
  const finished = week >= totalWeeks
  const fill = { transition: `width ${msPerWeek}ms linear` }

  return (
    <LandingSection id="problems" labelledBy="problems-heading" className="gap-14">
      <div className={cn("flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", inset)}>
        <SectionHeading
          eyebrow="Speed"
          title="The usual route takes months. Ours takes weeks."
          id="problems-heading" />
        <div aria-hidden="true" className="flex shrink-0 flex-col gap-1 lg:items-end">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Time to launch</p>
          <p className="text-6xl leading-none tracking-tighter tabular-nums sm:text-7xl">
            <span className="text-3xl tracking-tight text-muted-foreground/60 sm:text-4xl">Week </span>
            {String(week).padStart(2, "0")}
          </p>
        </div>
      </div>

      <p className="sr-only">
        The usual route of finding a developer, quotes, a spec, the build, delays and a handover
        launches around week {totalWeeks}. A Scryptic sprint launches in week {launchWeek}, leaving{" "}
        {totalWeeks - launchWeek} weeks live with customers.
      </p>

      <div className="ticks guides border border-border bg-card py-8 sm:py-10">
        <div ref={ref} aria-hidden="true" className={cn("relative flex flex-col gap-10 pt-10", inset)}>
          {/* Week ruler and guides, behind the tracks. Every other one is dropped on phones. */}
          <div className="pointer-events-none absolute inset-y-0 right-6 left-6 sm:right-8 sm:left-8">
            {Array.from({ length: totalWeeks / tickEvery + 1 }, (_, i) => i * tickEvery).map((w) => (
              <div
                key={w}
                className={cn("absolute inset-y-0 border-l border-dashed border-border", w % 8 !== 0 && "max-md:hidden")}
                style={{ left: pct(w) }}
              >
                <span
                  className={cn(
                    "absolute top-0 -translate-x-1/2 bg-card px-1 font-mono text-[10px] tracking-widest whitespace-nowrap text-muted-foreground transition-colors",
                    w === 0 && "translate-x-0 pl-0",
                    w === totalWeeks && "-translate-x-full pr-0",
                    week >= w && w > 0 && "text-foreground",
                  )}
                >
                  {w}
                </span>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-3">
            <TrackHeader
              name={<p className="bg-card font-medium">The usual route</p>}
              end={`Launch? Week ${totalWeeks}`}
              show={finished}
            />
            <div className="relative flex h-12 bg-background ring-1 ring-border">
              <div
                className="absolute inset-y-0 left-0 bg-foreground/15 motion-reduce:transition-none"
                style={{ ...fill, width: pct(Math.min(week, totalWeeks)) }}
              />
              {usualRoute.map((stage) => (
                <div
                  key={stage.label}
                  className="relative flex min-w-0 items-center border-r border-dashed border-foreground/20 px-3 last:border-r-0"
                  style={{ width: pct(stage.weeks) }}
                >
                  <span className="hidden truncate text-sm md:inline">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col gap-3">
            <TrackHeader
              name={<p className="bg-card font-logo text-xl font-extrabold lowercase">Scryptic</p>}
              end={`${totalWeeks - launchWeek} weeks live`}
              show={finished}
              highlight
            />
            <div className="relative flex h-12 bg-background ring-1 ring-border">
              <div
                className="absolute inset-y-0 left-0 bg-primary motion-reduce:transition-none"
                style={{ ...fill, width: pct(Math.min(week, launchWeek)) }}
              />
              <div
                className="absolute inset-y-0 bg-[repeating-linear-gradient(135deg,color-mix(in_oklab,var(--primary)_22%,transparent)_0_6px,color-mix(in_oklab,var(--primary)_10%,transparent)_6px_12px)] motion-reduce:transition-none"
                style={{ ...fill, left: pct(launchWeek), width: pct(Math.max(0, Math.min(week, totalWeeks) - launchWeek)) }}
              />
              <div className="relative flex items-center px-3" style={{ width: pct(launchWeek) }}>
                <span className="hidden truncate text-sm text-primary-foreground sm:inline">Sprint</span>
              </div>
              <div className="relative flex flex-1 items-center px-3 sm:px-4">
                <span
                  className={cn(
                    "flex items-center gap-2 text-xs text-primary transition-opacity duration-500 sm:text-sm dark:text-[#c3caff]",
                    launched ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
                  Live with customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  )
}
