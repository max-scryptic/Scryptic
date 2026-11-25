"use client"

import { useMemo } from "react"
import { cn } from "cn"

import { BRAND_MARK_PATHS } from "@/components/brand-logo"
import { HeroWindow } from "@/components/landing/hero-window"
import { useHeroLoop } from "@/components/landing/use-hero-loop"

/*
 * The decorative card on the right of the home and MVP heroes, so the two
 * share a layout but not a picture. (The web app, mobile app and migration
 * pages show their drawing from the home page's "What we build" row instead,
 * in a HeroDrawing.) Each sits in a HeroWindow, which hides it from assistive
 * tech: the copy beside it says the same thing.
 *
 * Every card keeps moving. It comes in whole on load (.hero-card in
 * globals.css), already showing the first frame of a short story of the work,
 * then loops through that story as it lands: the Scryptic mark loading and
 * commands typing out, a sprint filling in. Each story is a list of frames stepped by useHeroLoop.
 *
 * With reduced motion `step` is null, which a card renders as its finished
 * picture, the same as its last frame.
 */

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/** A check that pops in and out with `on`, keeping its space either way. */
function Tick({ on, className }: { on: boolean; className?: string }) {
  return (
    <Check
      className={cn(
        "transition-[opacity,scale] duration-300 ease-out",
        on ? "scale-100 opacity-100" : "scale-50 opacity-0",
        className,
      )}
    />
  )
}

const done = "border border-transparent bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground"
const pending = "border border-dashed border-border text-muted-foreground"

const durationsOf = (frames: readonly { ms: number }[]) => frames.map((frame) => frame.ms)

// --- Home: the loader, then the terminal ------------------------------------

export type TerminalLine = { prompt: boolean; text: string }

/**
 * One frame of the home card. While `loading` is set, the Scryptic mark is
 * loading: 0 is a whole disc, 1 the halves slid apart into the S, and the
 * pixel bar under it fills to match; `leaving` fades it out. Otherwise it is
 * the terminal: lines before `shown` are printed, and `typed` is how far into
 * line `shown` the command has got.
 */
type TerminalFrame = { shown: number; typed?: number; fading?: boolean; loading?: number; leaving?: boolean; ms: number }

/** The loader's progress, frame by frame: uneven steps with a stall or two, as a real one goes. */
const loadingSteps = [
  { loading: 0, ms: 550 },
  { loading: 0.18, ms: 240 },
  { loading: 0.32, ms: 200 },
  { loading: 0.4, ms: 420 },
  { loading: 0.66, ms: 220 },
  { loading: 0.82, ms: 340 },
  { loading: 1, ms: 700 },
  { loading: 1, leaving: true, ms: 380 },
]

function terminalFrames(lines: TerminalLine[]): TerminalFrame[] {
  // Fade the finished screen out, load, then type each command and print its ticks.
  const frames: TerminalFrame[] = [
    { shown: lines.length, fading: true, ms: 450 },
    ...loadingSteps.map((step) => ({ shown: 0, ...step })),
  ]
  lines.forEach((line, index) => {
    if (!line.prompt) {
      frames.push({ shown: index + 1, ms: 380 })
      return
    }
    frames.push({ shown: index, typed: 0, ms: 450 })
    for (let typed = 1; typed <= line.text.length; typed++) {
      // An uneven rhythm reads as typing; a beat after the last key before it runs.
      const last = typed === line.text.length
      frames.push({ shown: index, typed, ms: last ? 420 : 38 + ((typed * 7) % 5) * 14 })
    }
  })
  // Hold the finished screen.
  frames[frames.length - 1].ms = 4500
  return frames
}

/** How many squares the loader's pixel bar has. */
const LOADER_CELLS = 12

/**
 * The Scryptic mark as a loader (the paths of BrandLogo, components/brand-logo.tsx):
 * its two half discs start together as one disc and slide apart into the S
 * as `progress` runs from 0 to 1, over a bar of pixels filling in. Only ever
 * slid, never rotated, as the brand asks.
 */
function MarkLoader({ progress }: { progress: number }) {
  // Closed, each half sits 2 units across and 1 up or down from its place in the mark.
  const apart = 1 - progress
  const slide = (direction: 1 | -1) => ({
    transform: `translate(${direction * 2 * apart}px, ${direction * apart}px)`,
  })
  const filled = Math.round(progress * LOADER_CELLS)
  return (
    <div className="flex flex-col items-center gap-6">
      <svg viewBox="0 0 24 24" className="size-20 overflow-visible fill-primary dark:fill-[#c3caff]">
        <path d={BRAND_MARK_PATHS[0]} className="transition-transform duration-300 ease-out" style={slide(1)} />
        <path d={BRAND_MARK_PATHS[1]} className="transition-transform duration-300 ease-out" style={slide(-1)} />
      </svg>
      <div className="flex flex-col items-center gap-2.5">
        <span className="flex gap-1">
          {Array.from({ length: LOADER_CELLS }, (_, cell) => (
            <span
              key={cell}
              className={cn(
                "size-2 transition-colors duration-150",
                cell < filled ? "bg-primary dark:bg-[#c3caff]" : "bg-foreground/10",
              )}
            />
          ))}
        </span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {progress === 1 ? "ready" : `loading ${Math.round(progress * 100)}%`}
        </span>
      </div>
    </div>
  )
}

/**
 * Home: the Scryptic mark loading, then command lines typed out and printed
 * one after another, on a loop. `$` lines are commands, the rest ticks.
 */
export function TerminalCard({ lines }: { lines: TerminalLine[] }) {
  const frames = useMemo(() => terminalFrames(lines), [lines])
  const durations = useMemo(() => durationsOf(frames), [frames])
  const [ref, step] = useHeroLoop(durations, 1)
  // Starts on frame 1, the loader; frame 0 fades out the finished screen between laps.
  const frame = step === null ? null : frames[step]
  const shown = frame?.shown ?? lines.length
  const typed = frame?.typed
  const loading = frame?.loading

  return (
    <HeroWindow ref={ref}>
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-400",
            (loading === undefined || frame?.leaving) && "opacity-0",
          )}
        >
          {loading !== undefined && <MarkLoader progress={loading} />}
        </div>
        <div
          className={cn(
            "flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed transition-opacity duration-400",
            (frame?.fading || loading !== undefined) && "opacity-0",
          )}
        >
          {lines.map((line, index) => {
            const typing = typed !== undefined && index === shown
            const visible = index < shown || typing
            return (
              <p
                key={line.text}
                className={cn(
                  "flex gap-3",
                  line.prompt ? "text-foreground [&:not(:first-child)]:mt-3" : "text-muted-foreground",
                  !visible && "invisible",
                  frame && !frame.fading && !line.prompt && visible && "hero-print",
                )}
              >
                <span className="text-primary">{line.prompt ? "$" : "✓"}</span>
                {typing ? (
                  <span>
                    {line.text.slice(0, typed)}
                    {/* Takes no width, so the line never reflows as it types. */}
                    <span className="-mr-2 inline-block h-4 w-2 translate-y-0.5 bg-primary" />
                    <span className="invisible">{line.text.slice(typed)}</span>
                  </span>
                ) : (
                  line.text
                )}
              </p>
            )
          })}
          <span
            className={cn(
              "mt-1 h-4 w-2 animate-pulse bg-primary motion-reduce:animate-none",
              shown < lines.length && "invisible",
            )}
          />
        </div>
      </div>
    </HeroWindow>
  )
}

// --- MVP development: the sprint board ---------------------------------------

/** `built`: how many v1 features are ticked; `week1`, `week2`: how full each bar is. */
const sprintFrames = [
  { built: 0, week1: 0, week2: 0, ms: 900 },
  { built: 1, week1: 0.25, week2: 0, ms: 650 },
  { built: 2, week1: 0.5, week2: 0, ms: 650 },
  { built: 3, week1: 0.75, week2: 0, ms: 650 },
  { built: 4, week1: 1, week2: 0, ms: 800 },
  { built: 4, week1: 1, week2: 0.4, ms: 900 },
  { built: 4, week1: 1, week2: 0.8, ms: 4500 },
] as const
const sprintDurations = durationsOf(sprintFrames)

/** MVP development: the sprint board, filling in on a loop: v1 ticked off in week 1, iteration in week 2, then live. */
export function SprintVisual() {
  const inScope = ["Core journey", "Sign-in", "Payments", "Analytics"]
  const parked = ["Team seats", "Integrations", "Native app"]
  const [ref, step] = useHeroLoop(sprintDurations)
  const last = sprintFrames.length - 1
  const frame = sprintFrames[step ?? last]
  // The rewind at the start of the loop is quick; the fills run for their frame.
  const fill = (value: number) => ({
    transform: `scaleX(${value})`,
    transitionDuration: `${step === 0 ? 500 : frame.ms}ms`,
  })

  return (
    <HeroWindow ref={ref} label="sprint.mvp" status={frame.week2 > 0 ? "Week 2 of 2" : "Week 1 of 2"}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="truncate text-muted-foreground">
            <span className="hidden sm:inline">https://</span>
            <span className="text-foreground">yourproduct.com</span>
          </span>
          <span className={cn("shrink-0 bg-primary px-2 py-0.5 text-primary-foreground", step === last && "hero-ping")}>
            Live Friday
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">In v1</p>
          <ul className="flex flex-wrap gap-1.5 text-xs sm:gap-2 sm:text-sm">
            {inScope.map((item, index) => {
              const ticked = index < frame.built
              return (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 transition-colors duration-300 sm:px-2.5",
                    ticked ? done : "border border-dashed border-primary/40 text-muted-foreground",
                  )}
                >
                  <Tick on={ticked} />
                  {item}
                </li>
              )
            })}
          </ul>
          <p className="mt-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Parked for v2
          </p>
          <ul className="flex flex-wrap gap-1.5 text-xs sm:gap-2 sm:text-sm">
            {parked.map((item) => (
              <li key={item} className={cn("px-2 py-1 sm:px-2.5", pending)}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <span>Week 1</span>
          <span className="h-2 bg-primary/15 dark:bg-primary/25">
            <span
              className="block h-full w-full origin-left bg-primary transition-transform ease-linear"
              style={fill(frame.week1)}
            />
          </span>
          <span>Build</span>
          <span>Week 2</span>
          <span className="h-2 bg-primary/15 dark:bg-primary/25">
            <span
              className="block h-full w-full origin-left bg-primary transition-transform ease-linear"
              style={fill(frame.week2)}
            />
          </span>
          <span>Iterate</span>
        </div>
      </div>
    </HeroWindow>
  )
}
