import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"
import { services } from "@/lib/services"

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"]

// The calendar is printed on paper (.surface-paper) in both themes, so these
// use the light theme's tokens and need no dark: variants.
const calendarTones = {
  call: "border border-dashed border-foreground/30 bg-background text-foreground",
  build: "bg-primary text-primary-foreground",
  iterate: "bg-primary/15 text-primary",
  demo: "border-2 border-primary bg-background font-medium text-primary",
  handover: "bg-chart-2 text-[#14131b]",
  support: "bg-chart-2/15 text-foreground",
}

/**
 * An example schedule, one row per week. `day` (1 is Monday) and `span`
 * place each event on the Monday to Friday grid.
 */
export type ProcessCalendar = {
  week: string
  note: string
  events: { label: string; day: number; span: number; tone: keyof typeof calendarTones }[]
}[]

/** The package the example schedules are drawn for. */
export const calendarPackage = services.find((s) => s.preferred) ?? services[0]

/** The schedule for an MVP build: the two calls, the sprint, then a week of support. */
export const mvpCalendar: ProcessCalendar = [
  {
    week: "Before",
    note: "Booked around you",
    events: [
      { label: "Initial call", day: 1, span: 1, tone: "call" },
      { label: "Discovery call", day: 3, span: 1, tone: "call" },
      { label: "Scope and price agreed", day: 4, span: 2, tone: "call" },
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

// "Mon" or "Mon to Thu", shown on phones where the day columns are dropped.
function dayRange(day: number, span: number) {
  return span > 1 ? `${weekdays[day - 1]} to ${weekdays[day + span - 2]}` : weekdays[day - 1]
}

/**
 * The process calendar, drawn as a printed planner rather than another card:
 * a warm paper sheet (.surface-paper, the same in both themes) taped to the
 * page at a slight tilt. One row per week on a Monday to Friday grid, Friday
 * run over with a Glint highlighter as demo day. Phones drop the day columns,
 * and the tilt, and list each week's events with their days.
 */
export function ProcessSection({
  eyebrow = "Process",
  title = "From first call to launch",
  calendar = mvpCalendar,
  note = `An example schedule for the ${calendarPackage.name}. The Extended MVP adds a second week of development.`,
}: {
  eyebrow?: string
  title?: string
  calendar?: ProcessCalendar
  /** The caption under the calendar. */
  note?: string
}) {
  return (
    <LandingSection id="process" labelledBy="process-heading" space="tight">
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id="process-heading" />
      <div className="surface-paper relative shadow-2xl shadow-black/25 lg:-rotate-[0.4deg]">
        {/* Two strips of tape holding the sheet to the page. */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-8 z-10 h-6 w-24 -rotate-3 bg-glint/50 shadow-sm sm:left-16"
        />
        <span
          aria-hidden="true"
          className="absolute -top-3 right-8 z-10 h-6 w-24 rotate-2 bg-glint/50 shadow-sm sm:right-16"
        />
        <div
          aria-hidden="true"
          className="hidden grid-cols-[7.5rem_repeat(5,minmax(0,1fr))] border-b border-border font-mono text-xs text-muted-foreground uppercase sm:grid"
        >
          <span className="px-5 py-4">Week</span>
          {weekdays.map((day) => (
            <span
              key={day}
              className={cn(
                "flex items-center justify-center gap-2 border-l border-border py-4",
                day === "Fri" && "bg-glint/25 font-medium text-foreground",
              )}
            >
              {day === "Fri" && <span className="size-1.5 rotate-45 bg-chart-2" />}
              {day}
            </span>
          ))}
        </div>
        <ol data-reveal="children">
          {calendar.map((week) => (
            <li
              key={week.week}
              className="grid gap-2 border-b border-border p-4 last:border-b-0 sm:grid-cols-[7.5rem_repeat(5,minmax(0,1fr))] sm:gap-0 sm:p-0"
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-0.5 sm:px-5 sm:py-5 sm:[grid-area:1/1]">
                <h3 className="text-base">{week.week}</h3>
                <p className="font-mono text-xs text-muted-foreground">{week.note}</p>
              </div>
              {weekdays.map((day, index) => (
                <span
                  key={day}
                  aria-hidden="true"
                  className={cn("hidden border-l border-border sm:block", day === "Fri" && "bg-glint/25")}
                  style={{ gridArea: `1 / ${index + 2}` }}
                />
              ))}
              {week.events.map((event) => (
                <p
                  key={event.label}
                  className={cn(
                    "reveal-wipe flex items-center gap-2 self-center px-3 py-2 text-sm sm:mx-1.5 sm:[grid-area:var(--area)]",
                    calendarTones[event.tone],
                  )}
                  style={{ "--area": `1 / ${event.day + 1} / 2 / span ${event.span}` } as React.CSSProperties}
                >
                  <span className="font-mono text-xs opacity-70 sm:sr-only">
                    {dayRange(event.day, event.span)}
                  </span>
                  <span className="truncate">{event.label}</span>
                </p>
              ))}
            </li>
          ))}
        </ol>
        <p className="border-t border-border px-5 py-4 font-mono text-xs text-muted-foreground">{note}</p>
      </div>
    </LandingSection>
  )
}
