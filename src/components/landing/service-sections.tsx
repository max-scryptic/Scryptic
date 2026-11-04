import { cn } from "cn"

import { AppLayers, type AppLayer } from "@/components/landing/app-layers"
import { FitCheck, type FitVerdicts } from "@/components/landing/fit-check"
import { LaunchKitHub, type HubCore, type HubItem } from "@/components/landing/launch-kit-hub"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * Sections only the service pages use. Each has its own shape, so a page is
 * not a run of identical boxes: a hub, an exploded drawing and a scored
 * self-check. Keep the copy in them short: a label and a few words.
 */

/**
 * Centred heading over a hub: the parts of a product wired into it, three a
 * side (see LaunchKitHub). Built for six parts, each an icon, a name, a few
 * words and a mono tag.
 */
export function HubSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  core,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: HubItem[]
  /** The product card's label before the hub starts going round; defaults to "Your MVP". */
  core?: HubCore
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading
        className={cn(inset, "mx-auto text-center *:mx-auto")}
        eyebrow={eyebrow}
        title={title}
        id={`${id}-heading`}
      >
        {intro}
      </SectionHeading>
      <LaunchKitHub items={items} core={core} />
    </LandingSection>
  )
}

/**
 * What an app is made of, as an exploded drawing: each layer labelled with
 * where it goes, lit in turn (see AppLayers). For a move where the screens
 * are only the visible part of what comes across. A rule runs edge to edge
 * under it, with joints where it crosses the guides, like the footer's.
 */
export function LayersSection({
  id,
  eyebrow,
  title,
  intro,
  layers,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  layers: AppLayer[]
}) {
  return (
    <>
      <LandingSection id={id} labelledBy={`${id}-heading`}>
        <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
          {intro}
        </SectionHeading>
        <div className={cn(inset, "border-t border-border pt-10")}>
          <AppLayers layers={layers} />
        </div>
      </LandingSection>
      <div aria-hidden="true" className="rail-joint border-t border-border" />
    </>
  )
}

/**
 * A self-check: statements a visitor ticks beside a panel that scores them,
 * with a button to the contact section once most are ticked (see FitCheck).
 * When a low score has its own answer, as in "stay where you are" for a
 * migration, say so in `verdicts.few` and the intro.
 */
export function FitCheckSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  initial = [],
  cta = { label: "Book a discovery call", href: "#contact" },
  verdicts,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: string[]
  /** Which statements start ticked, by index. */
  initial?: number[]
  cta?: { label: string; href: string }
  /** The line under the score at each band; defaults to the MVP wording. */
  verdicts?: FitVerdicts
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <FitCheck items={items} initial={initial} cta={cta} verdicts={verdicts} />
    </LandingSection>
  )
}

/** One route in an OptionsSection table: a label and one cell per column after it. */
export type OptionRow = { name: string; cells: string[] }

/**
 * A plain comparison of the usual routes to the same result, in words rather
 * than ticks: what you get, what it costs, how long it takes and who owns it.
 * The first row is ours and is tinted. Scrolls sideways on phones, with the
 * first column pinned, like the tick table in ComparisonSection.
 */
export function OptionsSection({
  id,
  eyebrow,
  title,
  intro,
  caption,
  columns,
  rows,
  footnote,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  /** Says what the table compares; read out by screen readers. */
  caption: string
  /** The headings after the first column. */
  columns: string[]
  rows: OptionRow[]
  /** A line under the table, such as where the figures come from. */
  footnote?: React.ReactNode
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="corners guides border border-border bg-card">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-border font-mono text-xs tracking-widest text-muted-foreground uppercase">
                <td className="sticky left-0 z-10 w-[18%] bg-card" />
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-5 font-normal">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-reveal="children" className="divide-y divide-border">
              {rows.map((row, index) => (
                <tr key={row.name} className={cn(index === 0 && "bg-primary/10")}>
                  <th
                    scope="row"
                    className={cn(
                      "sticky left-0 z-10 px-4 py-5 align-top text-base font-medium sm:px-6",
                      index === 0 ? "bg-[color-mix(in_oklab,var(--primary)_10%,var(--card))]" : "bg-card",
                    )}
                  >
                    {row.name}
                  </th>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-4 py-5 align-top text-pretty",
                        cellIndex === 0 ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {footnote && <p className={cn(inset, "text-sm text-pretty text-muted-foreground")}>{footnote}</p>}
    </LandingSection>
  )
}
