import { cn } from "cn"

import { services } from "@/lib/services"

/*
 * Draft designs for the home page process section, shown side by side on
 * /process-examples. Every option reads the same stages below, so the copy
 * can be settled once whichever layout wins.
 */

const sprintPackage = services.find((s) => s.preferred) ?? services[0]

type Phase = "before" | "sprint" | "after"

const phases: { id: Phase; label: string }[] = [
  { id: "before", label: "Before the build" },
  { id: "sprint", label: sprintPackage.sprint },
  { id: "after", label: "Live + support" },
]

const stages: {
  name: string
  when: string
  text: string
  phase: Phase
  /** The week ends with a Friday demo. */
  demo?: boolean
  command: string
  result: string
}[] = [
  {
    name: "Initial call",
    when: "Free, 30 minutes",
    text: "A quick chat about your idea, who it is for and whether we are the right fit.",
    phase: "before",
    command: "scryptic call --intro",
    result: "idea, users and fit talked through",
  },
  {
    name: "Discovery call",
    when: "Before the sprint",
    text: "We map the users, features and stack, then agree the scope and a fixed price.",
    phase: "before",
    command: "scryptic discover",
    result: "scope, stack and fixed price agreed",
  },
  {
    name: "Development begins",
    when: "Week 1",
    text: "Our team builds your MVP to the agreed scope, in a repository you own.",
    phase: "sprint",
    demo: true,
    command: "scryptic build --week 1",
    result: "core features built in your repository",
  },
  {
    name: "Iteration and refinement",
    when: "Week 2",
    text: "We refine it on your feedback, polish the details and launch.",
    phase: "sprint",
    demo: true,
    command: "scryptic refine --week 2",
    result: "polished on your feedback, then launched",
  },
  {
    name: "Full handover",
    when: "Launch day",
    text: "Code, hosting, database and payment accounts move into your name.",
    phase: "after",
    command: "scryptic handover",
    result: "code, hosting and accounts in your name",
  },
  {
    name: "1 week of support",
    when: "Week 3",
    text: "Bug fixes and hands-on help for a smooth rollout to real users.",
    phase: "after",
    command: "scryptic support --days 7",
    result: "bug fixes shipped, rollout smooth",
  },
]

const footnote = `Shown for the ${sprintPackage.name}. The Extended MVP adds a second week of development before iteration.`

// Lapis carries the sprint and Glint the launch, the one highlight per layout.
const nodeTone: Record<Phase, string> = {
  before: "border border-border bg-card text-muted-foreground",
  sprint: "bg-primary text-primary-foreground",
  after: "bg-chart-2 text-[#14131b]",
}

const lineTone: Record<Phase, string> = {
  before: "bg-border",
  sprint: "bg-primary",
  after: "bg-chart-2",
}

const bandTone: Record<Phase, string> = {
  before: "bg-foreground/5 text-muted-foreground",
  sprint: "bg-primary/10 text-primary dark:text-foreground",
  after: "bg-chart-2/15 text-foreground",
}

function pad(index: number) {
  return String(index + 1).padStart(2, "0")
}

function ExampleHeading({ id }: { id: string }) {
  return (
    <div data-reveal="children" className="flex max-w-2xl flex-col gap-4">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">Process</p>
      <h2 id={id} className="text-3xl tracking-tight text-balance sm:text-4xl">
        How a Scryptic project runs
      </h2>
      <p className="text-lg text-pretty text-muted-foreground">
        Two calls to agree the scope, a {sprintPackage.sprint} with a demo every Friday, then a
        full handover and a week of support once you are live. One team from the first call to the
        last fix.
      </p>
    </div>
  )
}

function DemoTag() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary dark:text-foreground">
      <span aria-hidden="true" className="size-1.5 rotate-45 bg-primary" />
      Friday demo
    </span>
  )
}

function Footnote({ className }: { className?: string }) {
  return <p className={cn("font-mono text-xs text-muted-foreground", className)}>{footnote}</p>
}

/* Option A: a vertical timeline beside a sticky heading. The connecting line
   takes the colour of the phase it runs through. */
export function ProcessTimeline({ id }: { id: string }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
        <ExampleHeading id={id} />
        <Footnote />
      </div>
      <ol data-reveal="children" className="flex flex-col">
        {stages.map((stage, index) => {
          const next = stages[index + 1]
          return (
            <li key={stage.name} className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 pb-10 last:pb-0">
              {next && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-11 bottom-0 left-[1.375rem] w-0.5 -translate-x-1/2",
                    next.phase === stage.phase ? lineTone[stage.phase] : "bg-border",
                  )}
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "reveal-pop relative flex size-11 items-center justify-center rounded-full font-mono text-sm",
                  nodeTone[stage.phase],
                )}
              >
                {pad(index)}
              </span>
              <div className="flex flex-col gap-2 pt-1">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {stage.when}
                </p>
                <h3 className="text-xl">{stage.name}</h3>
                <p className="text-pretty text-muted-foreground">{stage.text}</p>
                {stage.demo && <DemoTag />}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* Option B: a horizontal track on wide screens, with the phases as bands above
   it and a diamond where each sprint week ends in its Friday demo. Phones get
   a plain list. */
export function ProcessTrack({ id }: { id: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <ExampleHeading id={id} />
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div aria-hidden="true" className="mb-10 hidden grid-cols-6 gap-2 font-mono text-xs uppercase lg:grid">
          {phases.map((phase) => (
            <span
              key={phase.id}
              className={cn("rounded-full px-3 py-2 text-center tracking-widest", bandTone[phase.id])}
              style={{ gridColumn: `span ${stages.filter((s) => s.phase === phase.id).length}` }}
            >
              {phase.label}
            </span>
          ))}
        </div>
        <ol data-reveal="children" className="grid gap-8 lg:grid-cols-6 lg:gap-0">
          {stages.map((stage) => (
            <li
              key={stage.name}
              className="grid grid-cols-[1.5rem_1fr] gap-x-4 lg:flex lg:flex-col lg:gap-5"
            >
              <div className="relative flex h-6 items-start lg:items-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-1/2 hidden h-0.5 -translate-y-1/2 lg:block",
                    lineTone[stage.phase],
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "reveal-pop relative size-6 rounded-full ring-4 ring-card",
                    nodeTone[stage.phase],
                  )}
                />
                {stage.demo && (
                  <span aria-hidden="true" className="absolute right-6 hidden flex-col items-center gap-1.5 lg:flex">
                    <span className="absolute bottom-full mb-1.5 font-mono text-[0.65rem] tracking-widest whitespace-nowrap text-primary uppercase dark:text-foreground">
                      Fri demo
                    </span>
                    <span className="size-3 rotate-45 bg-card ring-2 ring-primary" />
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 lg:pr-6">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {stage.when}
                </p>
                <h3 className="text-lg leading-snug">{stage.name}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{stage.text}</p>
                {stage.demo && (
                  <span className="mt-1 lg:hidden">
                    <DemoTag />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
        <Footnote className="mt-10 border-t border-border pt-5" />
      </div>
    </div>
  )
}

/* Option C: an example calendar, one row per week and Friday shaded as demo
   day. Phones drop the day columns and list each week's events. */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

type CalendarTone = "before" | "build" | "iterate" | "demo" | "handover" | "support"

const calendarTone: Record<CalendarTone, string> = {
  before: "border border-border bg-background text-foreground",
  build: "bg-primary text-primary-foreground",
  iterate: "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground",
  demo: "border border-primary bg-card text-primary dark:text-foreground",
  handover: "bg-chart-2 text-[#14131b]",
  support: "bg-chart-2/15 text-foreground",
}

const calendar: {
  week: string
  note: string
  events: { label: string; day: number; span: number; tone: CalendarTone }[]
}[] = [
  {
    week: "Before",
    note: "Booked around you",
    events: [
      { label: "Initial call", day: 1, span: 1, tone: "before" },
      { label: "Discovery call", day: 3, span: 1, tone: "before" },
      { label: "Scope and price agreed", day: 4, span: 2, tone: "before" },
    ],
  },
  {
    week: "Week 1",
    note: "Development",
    events: [
      { label: "Development begins", day: 1, span: 4, tone: "build" },
      { label: "Demo", day: 5, span: 1, tone: "demo" },
    ],
  },
  {
    week: "Week 2",
    note: "Iteration",
    events: [
      { label: "Iteration and refinement", day: 1, span: 4, tone: "iterate" },
      { label: "Demo + launch", day: 5, span: 1, tone: "demo" },
    ],
  },
  {
    week: "Week 3",
    note: "Live",
    events: [
      { label: "Full handover", day: 1, span: 1, tone: "handover" },
      { label: "1 week of support", day: 2, span: 4, tone: "support" },
    ],
  },
]

function dayRange(day: number, span: number) {
  return span > 1 ? `${days[day - 1]} to ${days[day + span - 2]}` : days[day - 1]
}

export function ProcessCalendar({ id }: { id: string }) {
  const grid = "sm:grid-cols-[7.5rem_repeat(5,minmax(0,1fr))]"
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <ExampleHeading id={id} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div
          aria-hidden="true"
          className={cn("hidden border-b border-border font-mono text-xs text-muted-foreground uppercase sm:grid", grid)}
        >
          <span className="px-5 py-4">Week</span>
          {days.map((day) => (
            <span
              key={day}
              className={cn(
                "flex items-center justify-center gap-2 border-l border-border py-4",
                day === "Fri" && "bg-primary/5 text-primary dark:text-foreground",
              )}
            >
              {day === "Fri" && <span className="size-1.5 rotate-45 bg-primary" />}
              {day}
            </span>
          ))}
        </div>
        <ol data-reveal="children">
          {calendar.map((week) => (
            <li
              key={week.week}
              className={cn("grid gap-2 border-b border-border p-4 last:border-b-0 sm:gap-0 sm:p-0", grid)}
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-0.5 sm:px-5 sm:py-5 sm:[grid-area:1/1]">
                <h3 className="text-base">{week.week}</h3>
                <p className="font-mono text-xs text-muted-foreground">{week.note}</p>
              </div>
              {days.map((day, index) => (
                <span
                  key={day}
                  aria-hidden="true"
                  className={cn("hidden border-l border-border sm:block", day === "Fri" && "bg-primary/5")}
                  style={{ gridArea: `1 / ${index + 2}` }}
                />
              ))}
              {week.events.map((event) => (
                <p
                  key={event.label}
                  className={cn(
                    "reveal-wipe flex items-center gap-2 self-center rounded-lg px-3 py-2 text-sm sm:mx-1.5 sm:[grid-area:var(--area)]",
                    calendarTone[event.tone],
                  )}
                  style={{ "--area": `1 / ${event.day + 1} / 2 / span ${event.span}` } as React.CSSProperties}
                >
                  <span className="font-mono text-xs opacity-70 sm:sr-only">{dayRange(event.day, event.span)}</span>
                  <span className="truncate">{event.label}</span>
                </p>
              ))}
            </li>
          ))}
        </ol>
        <p className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-5 py-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-primary" />
            Friday demo
          </span>
          <span>An example schedule. {footnote}</span>
        </p>
      </div>
    </div>
  )
}

/* Option D: three columns, one per phase, two cards in each, chevrons
   between the columns on wide screens. */
export function ProcessPhases({ id }: { id: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <ExampleHeading id={id} />
      <div data-reveal="children" className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.id} className="relative flex flex-col gap-4">
            <p
              className={cn(
                "w-fit rounded-full px-3 py-1.5 font-mono text-xs tracking-widest uppercase",
                bandTone[phase.id],
              )}
            >
              {phase.label}
            </p>
            {stages.map((stage, index) =>
              stage.phase === phase.id ? (
                <article
                  key={stage.name}
                  className={cn(
                    "flex flex-1 flex-col gap-3 rounded-2xl bg-card p-6",
                    phase.id === "sprint"
                      ? "border-2 border-primary shadow-xl shadow-primary/10"
                      : "border border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm text-primary">{pad(index)}</span>
                    <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      {stage.when}
                    </span>
                  </div>
                  <h3 className="text-xl">{stage.name}</h3>
                  <p className="text-pretty text-muted-foreground">{stage.text}</p>
                  {stage.demo && (
                    <span className="mt-auto pt-1">
                      <DemoTag />
                    </span>
                  )}
                </article>
              ) : null,
            )}
            {phaseIndex < phases.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-7 z-10 hidden size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground lg:flex"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5">
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
      <Footnote />
    </div>
  )
}

/* Option E: the project as a terminal session, in the style of the hero card. */
export function ProcessTerminal({ id }: { id: string }) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
      <div className="flex flex-col gap-6">
        <ExampleHeading id={id} />
        <Footnote />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">~/your-mvp</span>
        </div>
        <ol data-reveal="children" className="flex flex-col gap-5 p-5 font-mono text-sm leading-relaxed sm:p-6">
          {stages.map((stage, index) => (
            <li key={stage.name} className="flex flex-col gap-1">
              <h3 className="flex flex-wrap items-baseline justify-between gap-x-4 text-muted-foreground">
                <span>
                  # {pad(index)} {stage.name}
                </span>
                <span className="text-xs tracking-widest uppercase">{stage.when}</span>
              </h3>
              <p className="flex gap-3 text-foreground">
                <span aria-hidden="true" className="text-primary">
                  $
                </span>
                {stage.command}
              </p>
              <p className="flex gap-3 text-muted-foreground">
                <span aria-hidden="true" className="text-primary">
                  ✓
                </span>
                {stage.result}
              </p>
              {stage.demo && (
                <p className="flex gap-3 text-chart-2">
                  <span aria-hidden="true">◆</span>
                  Friday demo: the week&apos;s work, live on a call
                </p>
              )}
            </li>
          ))}
          <li aria-hidden="true">
            <span className="block h-4 w-2 animate-pulse bg-primary motion-reduce:animate-none" />
          </li>
        </ol>
      </div>
    </div>
  )
}
