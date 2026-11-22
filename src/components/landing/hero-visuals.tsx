"use client"

import { useMemo } from "react"
import { cn } from "cn"

import { HeroWindow } from "@/components/landing/hero-window"
import { useHeroLoop } from "@/components/landing/use-hero-loop"

/*
 * The decorative card on the right of each landing hero, one per page, so the
 * heroes share a layout but not a picture. Each sits in a HeroWindow, which
 * hides it from assistive tech: the copy beside it says the same thing.
 *
 * Every card keeps moving. It comes in whole on load (.hero-card in
 * globals.css), already showing the first frame of a short story of the work,
 * then loops through that story as it lands: commands typing out, a sprint filling in, records
 * moving through a workflow, builds going to review, data being copied. Each
 * story is a list of frames stepped by useHeroLoop; the services card's
 * packets and the migration card's builder tile loop in CSS alone.
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

// --- Home: the terminal -----------------------------------------------------

export type TerminalLine = { prompt: boolean; text: string }

/** One frame of the terminal: lines before `shown` are printed; `typed` is how far into line `shown` the command has got. */
type TerminalFrame = { shown: number; typed?: number; fading?: boolean; ms: number }

function terminalFrames(lines: TerminalLine[]): TerminalFrame[] {
  // Fade the finished screen out, then type each command and print its ticks.
  const frames: TerminalFrame[] = [{ shown: lines.length, fading: true, ms: 450 }]
  lines.forEach((line, index) => {
    if (!line.prompt) {
      frames.push({ shown: index + 1, ms: 380 })
      return
    }
    frames.push({ shown: index, typed: 0, ms: index === 0 ? 700 : 450 })
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

/** Home: command lines typed out and printed one after another, on a loop. `$` lines are commands, the rest ticks. */
export function TerminalCard({ lines }: { lines: TerminalLine[] }) {
  const frames = useMemo(() => terminalFrames(lines), [lines])
  const durations = useMemo(() => durationsOf(frames), [frames])
  const [ref, step] = useHeroLoop(durations, 1)
  // Starts on frame 1, an empty prompt; frame 0 fades out the finished screen between laps.
  const frame = step === null ? null : frames[step]
  const shown = frame?.shown ?? lines.length
  const typed = frame?.typed

  return (
    <HeroWindow ref={ref}>
      <div
        className={cn(
          "flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed transition-opacity duration-400",
          frame?.fading && "opacity-0",
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

// --- Web app development: a workflow ------------------------------------------

const jobs = [
  { item: "Quote for Unit 4", from: "Draft", to: "Approved" },
  { item: "Site survey, Thursday", from: "Requested", to: "Booked" },
  { item: "Invoice 1042", from: "Sent", to: "Paid" },
]

/** `moved`: how many jobs have reached their stage; `active`: the row being worked on, the last being a new request. */
const workflowFrames = [
  { moved: 0, active: null, ms: 900 },
  { moved: 0, active: 0, ms: 650 },
  { moved: 1, active: 0, ms: 550 },
  { moved: 1, active: 1, ms: 650 },
  { moved: 2, active: 1, ms: 550 },
  { moved: 2, active: 2, ms: 650 },
  { moved: 3, active: 2, ms: 550 },
  { moved: 3, active: 3, ms: 4500 },
] as const
const workflowDurations = durationsOf(workflowFrames)

/** Web app development: a signed-in app mid-workflow, each record moving to its next stage in turn as a new request comes in. */
export function WebAppVisual() {
  const [ref, step] = useHeroLoop(workflowDurations)
  const frame = step === null ? { moved: jobs.length, active: null } : workflowFrames[step]
  const rows = [
    ...jobs.map((job, index) => ({
      item: job.item,
      stage: index < frame.moved ? job.to : job.from,
      done: index < frame.moved,
    })),
    { item: "Repair request", stage: "New", done: false },
  ]

  return (
    <HeroWindow ref={ref} label="app.yourcompany.co.uk" status="Live">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="text-foreground">Jobs</span>
          <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Staff view</span>
        </div>

        <ul className="flex flex-col divide-y divide-border border-y border-border text-sm">
          {rows.map((row, index) => {
            const active = frame.active === index
            return (
              <li
                key={row.item}
                className={cn(
                  "flex items-center justify-between gap-4 py-2.5 transition-[background-color,box-shadow,padding] duration-300",
                  active && "bg-primary/8 pl-2 shadow-[inset_2px_0_0_var(--primary)] dark:bg-primary/15",
                )}
              >
                <span className="truncate">{row.item}</span>
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 px-2 py-0.5 font-mono text-xs transition-colors duration-300",
                    row.done ? done : pending,
                    active && index === jobs.length && "hero-ping",
                  )}
                >
                  {row.done && <Check className={step === null ? undefined : "hero-pop"} />}
                  <span key={row.stage} className={step === null ? undefined : "hero-swap"}>
                    {row.stage}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>

        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <li>Roles</li>
          <li>Backups</li>
          <li>Your code</li>
        </ul>
      </div>
    </HeroWindow>
  )
}

// --- Mobile app development: a release --------------------------------------

/** `built`: how many platforms have a build ready; `review`: how many are in store review. */
const releaseFrames = [
  { built: 0, review: 0, ms: 1100 },
  { built: 1, review: 0, ms: 800 },
  { built: 2, review: 0, ms: 800 },
  { built: 2, review: 1, ms: 800 },
  { built: 2, review: 2, ms: 4500 },
] as const
const releaseDurations = durationsOf(releaseFrames)

/** Mobile app development: one release, a native build per platform, each built then sent to store review in turn. */
export function MobileAppVisual() {
  const builds = [
    { platform: "iPhone", code: "Swift", store: "App Store" },
    { platform: "Android", code: "Kotlin", store: "Google Play" },
  ]
  const [ref, step] = useHeroLoop(releaseDurations)
  const frame = releaseFrames[step ?? releaseFrames.length - 1]

  return (
    <HeroWindow ref={ref} label="release.v1" status="Week 2 of 2">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="text-foreground">Your app 1.0</span>
          <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Native</span>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {builds.map((build, index) => {
            const built = index < frame.built
            const inReview = index < frame.review
            return (
              <li key={build.platform} className="flex flex-col gap-3 border border-border bg-background p-3">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium">{build.platform}</span>
                  <span className="font-mono text-xs text-muted-foreground">{build.code}</span>
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 self-start px-2 py-0.5 font-mono text-xs transition-colors duration-300",
                    built ? done : pending,
                  )}
                >
                  {built ? (
                    <Check className={step === null ? undefined : "hero-pop"} />
                  ) : (
                    <span className="size-2 shrink-0 animate-spin border border-current border-t-transparent" />
                  )}
                  <span key={String(built)} className={step === null ? undefined : "hero-swap"}>
                    {built ? "Build ready" : "Building"}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 self-start px-2 py-0.5 font-mono text-xs transition-opacity duration-300",
                    pending,
                    !inReview && "opacity-40",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 shrink-0 bg-primary transition-opacity dark:bg-[#c3caff]",
                      inReview ? "animate-pulse opacity-100" : "opacity-0",
                    )}
                  />
                  {build.store} review
                </span>
              </li>
            )
          })}
        </ul>

        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <li>Your store accounts</li>
          <li>Your code</li>
        </ul>
      </div>
    </HeroWindow>
  )
}

// --- No-code migration: a rehearsal -----------------------------------------

/** A builder the migration card's source tile cycles through, with its logo from the guides. */
export type MigrationTool = { slug: string; topic: string; logo?: string }

const migrationRows = [
  { name: "Users", count: 2418 },
  { name: "Records", count: 184302 },
  { name: "Files", count: 9771 },
  { name: "Redirects", count: 312 },
]

// Each row counts up in a few ticks, then the next starts. `row` is the row being copied, `share` how far it has got.
const copyTicks = [0.15, 0.4, 0.65, 0.85, 1]
const migrationFrames = [
  { row: 0, share: 0, ms: 900 },
  ...migrationRows.flatMap((_, row) =>
    copyTicks.map((share, tick) => ({ row, share, ms: tick === copyTicks.length - 1 ? 320 : 110 })),
  ),
  { row: migrationRows.length, share: 0, ms: 4500 },
]
const migrationDurations = durationsOf(migrationFrames)

/**
 * No-code migration: a rehearsal report, from a builder (cycling through a few)
 * to your own codebase, each table counting across in turn. Pass the builders
 * from the page, so the blog's posts stay out of the client bundle.
 */
export function MigrationVisual({ tools }: { tools: MigrationTool[] }) {
  const [ref, step] = useHeroLoop(migrationDurations)
  const frame = migrationFrames[step ?? migrationFrames.length - 1]
  const copied = (row: number) =>
    row < frame.row ? migrationRows[row].count : row === frame.row ? Math.round(migrationRows[row].count * frame.share) : 0
  const finished = frame.row === migrationRows.length

  return (
    <HeroWindow ref={ref} label="migrate.log" status="Rehearsal 3 of 3">
      <div className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
          {/* The source tile cycles through builders; reduced motion shows the first only. */}
          <div className="relative h-16 border border-border bg-background">
            {tools.map((tool, index) => (
              <div
                key={tool.slug}
                className={cn("hero-cycle absolute inset-0 flex items-center gap-3 px-3", index > 0 && "opacity-0")}
                style={{ animationDelay: `${index === 0 ? 0 : (index - tools.length) * 2}s` }}
              >
                {tool.logo && (
                  <span
                    className="size-7 shrink-0 bg-primary mask-contain mask-center mask-no-repeat dark:bg-[#c3caff]"
                    style={{ maskImage: `url(${tool.logo})` }}
                  />
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">{tool.topic}</span>
                  <span className="font-mono text-xs text-muted-foreground">from</span>
                </span>
              </div>
            ))}
          </div>
          <span className="flex items-center font-mono text-lg text-primary dark:text-[#c3caff]">→</span>
          <div className="flex h-16 flex-col justify-center bg-primary px-3 text-primary-foreground">
            <span className="text-sm font-medium">Your code</span>
            <span className="font-mono text-xs opacity-80">Next.js + Postgres</span>
          </div>
        </div>

        <ul className="flex flex-col divide-y divide-border border-y border-border font-mono text-xs">
          {migrationRows.map((row, index) => {
            const complete = copied(index) === row.count
            return (
              <li key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-2">
                <span className="text-muted-foreground">{row.name}</span>
                <span className="tabular-nums">
                  {row.count.toLocaleString("en-GB")} <span className="text-muted-foreground">→</span>{" "}
                  {/* The full count, hidden, holds the width while the copy counts up. */}
                  <span className="inline-grid text-right">
                    <span className="invisible col-start-1 row-start-1">{row.count.toLocaleString("en-GB")}</span>
                    <span className={cn("col-start-1 row-start-1", !complete && "text-muted-foreground")}>
                      {copied(index).toLocaleString("en-GB")}
                    </span>
                  </span>
                </span>
                <Tick on={complete} className="text-primary dark:text-[#c3caff]" />
              </li>
            )
          })}
        </ul>

        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-foreground">0 lost</span> ·{" "}
          {finished ? "ready for cutover" : `copying ${migrationRows[frame.row].name.toLowerCase()}`}
        </p>
      </div>
    </HeroWindow>
  )
}

// --- The services hub: four tracks ------------------------------------------

/** The services hub: each service as a short track from where you start to where you end up, with work flowing along each. */
export function ServicesVisual() {
  const tracks = [
    { name: "MVP development", steps: ["Idea", "Sprint", "Launched"] },
    { name: "Web app development", steps: ["Workflow", "Sprint", "Live app"] },
    { name: "Mobile app development", steps: ["Idea", "Native build", "In the stores"] },
    { name: "No-code migration", steps: ["Bubble app", "Rebuild", "Code you own"] },
  ]
  // The packets' loop (hero-packet in globals.css) is 4s: each track starts a
  // second after the one above, and each leg takes a quarter of the loop. The
  // first sets off as the card lands (.hero-card in globals.css).
  const delay = (track: number, leg: number) => ({ animationDelay: `${1.1 + track + leg}s` })

  return (
    <HeroWindow label="services" status="4 ways in">
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-6">
          {tracks.map((track, index) => (
            <div key={track.name} className="flex flex-col gap-3">
              <p className="font-mono text-xs text-primary dark:text-[#c3caff]">
                {String(index + 1).padStart(2, "0")} <span className="text-muted-foreground">/</span>{" "}
                <span className="text-foreground">{track.name}</span>
              </p>
              <ol className="flex items-center gap-2 text-sm">
                {track.steps.map((step, stepIndex) => {
                  const last = stepIndex === track.steps.length - 1
                  return (
                    <li key={step} className={cn("flex items-center gap-2", !last && "flex-1")}>
                      <span
                        className={cn(
                          "shrink-0 px-2.5 py-1 whitespace-nowrap",
                          last
                            ? "hero-arrive bg-primary text-primary-foreground"
                            : "border border-border bg-background text-foreground",
                        )}
                        style={last ? delay(index, 0) : undefined}
                      >
                        {step}
                      </span>
                      {!last && (
                        <span className="relative h-px flex-1 bg-primary/60">
                          <span
                            className="hero-packet absolute top-1/2 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-primary opacity-0 dark:bg-[#c3caff]"
                            style={delay(index, stepIndex)}
                          />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <li>Fixed price</li>
          <li>Friday demos</li>
          <li>Yours to own</li>
        </ul>
      </div>
    </HeroWindow>
  )
}
