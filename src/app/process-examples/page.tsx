import { PageJsonLd } from "@/components/json-ld"
import {
  ProcessCalendar,
  ProcessPhases,
  ProcessTerminal,
  ProcessTimeline,
  ProcessTrack,
} from "@/components/process-examples"
import { ScrollReveal } from "@/components/scroll-reveal"
import { createMetadata, pages } from "@/lib/seo"

export const metadata = createMetadata(pages.processExamples)

const options = [
  {
    id: "timeline",
    name: "Vertical timeline",
    note: "Calm and easy to scan. Reads well on phones with no layout change.",
    Example: ProcessTimeline,
  },
  {
    id: "track",
    name: "Horizontal track",
    note: "The whole journey in one line, with the phases banded above and each Friday demo marked on the track.",
    Example: ProcessTrack,
  },
  {
    id: "calendar",
    name: "Week calendar",
    note: "The most concrete: an example schedule by day, with Friday shaded as demo day.",
    Example: ProcessCalendar,
  },
  {
    id: "phases",
    name: "Phase columns",
    note: "Three stages of the project, two steps in each. The sprint column carries the Lapis border.",
    Example: ProcessPhases,
  },
  {
    id: "terminal",
    name: "Terminal log",
    note: "Echoes the hero card: the project told as a terminal session.",
    Example: ProcessTerminal,
  },
]

export default function ProcessExamplesPage() {
  return (
    <main className="flex flex-col pt-32 sm:pt-40">
      <PageJsonLd page={pages.processExamples} />
      <ScrollReveal />

      <div className="px-4 pb-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">Process section examples</h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Five ways to show how a project runs, from the initial call to the week of support after
            handover. Each uses the same steps and copy, so only the layout differs.
          </p>
          <nav aria-label="Examples">
            <ul className="flex flex-wrap gap-2">
              {options.map((option, index) => (
                <li key={option.id}>
                  <a
                    href={`#${option.id}`}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary"
                  >
                    <span className="font-mono text-xs text-primary">{String.fromCharCode(65 + index)}</span>
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {options.map(({ id, name, note, Example }, index) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className="scroll-mt-28 border-t border-border px-4 py-20 sm:px-6"
        >
          <div className="mx-auto mb-12 flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2">
            <p className="rounded-full bg-foreground px-3 py-1 font-mono text-xs tracking-widest text-background uppercase">
              Option {String.fromCharCode(65 + index)}, {name}
            </p>
            <p className="text-sm text-muted-foreground">{note}</p>
          </div>
          <Example id={`${id}-heading`} />
        </section>
      ))}
    </main>
  )
}
