import { cn } from "cn"

import { CheckIcon, CrossIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/**
 * A heading over one ruled panel split into cells, each a numbered name and a
 * sentence or two. For "what you get" and "signs you need this" lists.
 */
export function FeatureGridSection({
  id,
  eyebrow,
  title,
  intro,
  items,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: { name: string; text: string }[]
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      {/* The panel's background shows through the 1px gaps as hairlines between the cells. */}
      <ul
        data-reveal="children"
        className="corners guides grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, index) => (
          <li key={item.name} className="flex flex-col gap-3 bg-card p-6 sm:p-8">
            <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-xl tracking-tight text-balance">{item.name}</h3>
            <p className="text-pretty text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ul>
    </LandingSection>
  )
}

/** Two cards side by side: who a service suits, and who it does not. */
export function FitSection({
  id,
  eyebrow,
  title,
  intro,
  good,
  bad,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  good: { title: string; items: string[] }
  bad: { title: string; items: string[] }
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div data-reveal="children" className="grid gap-6 md:grid-cols-2">
        {[
          { ...good, positive: true },
          { ...bad, positive: false },
        ].map((column) => (
          <div
            key={column.title}
            className={cn(
              "corners guides flex flex-col gap-6 border bg-card p-6 sm:p-8 lg:p-10",
              column.positive ? "border-primary/40" : "border-border",
            )}
          >
            <h3 className="text-2xl tracking-tight">{column.title}</h3>
            <ul className="flex flex-col gap-3 text-pretty">
              {column.items.map((item) => (
                <li key={item} className="flex gap-3">
                  {column.positive ? <CheckIcon /> : <CrossIcon />}
                  <span className={cn(!column.positive && "text-muted-foreground")}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </LandingSection>
  )
}
