import Link from "next/link"
import { cn } from "cn"

import { FitCheck } from "@/components/landing/fit-check"
import { Icon, type IconName } from "@/components/landing/icons"
import { LaunchKitHub, type HubItem } from "@/components/landing/launch-kit-hub"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"

/*
 * Sections only the service pages use. Each has its own shape, so a page is
 * not a run of identical boxes: a hub, a numbered grid of signs, a from-to
 * map and a split fit panel. Keep the copy in them short: a label and a few words.
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
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: HubItem[]
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
      <LaunchKitHub items={items} />
    </LandingSection>
  )
}

/**
 * Warning signs as a numbered grid: each cell an icon, a short sign and a line
 * on what it looks like in practice. Closed by a bar that points to the next
 * step. Built for six signs (three columns of two rows on wide screens).
 */
export function SignsSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  footer,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: { icon: IconName; title: string; text: string }[]
  footer?: { title: string; text: string; link: { label: string; href: string } }
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="corners guides border border-border bg-card">
        {/* Cells sit on a border-coloured ground with a 1px gap, so every inner edge is a single rule. */}
        <ol data-reveal="children" className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="group flex gap-4 bg-card p-6 transition-colors hover:bg-primary/[0.04] sm:flex-col sm:gap-6 sm:p-8"
            >
              {/* On phones the icon sits beside the text and the number is dropped, to keep the stack short. */}
              <div className="flex shrink-0 items-start justify-between sm:items-center">
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:border-primary/50 dark:bg-primary/25 dark:text-foreground"
                >
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span
                  aria-hidden="true"
                  className="hidden font-mono text-xs tracking-widest text-muted-foreground transition-colors group-hover:text-primary sm:inline"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <h3 className="text-lg tracking-tight text-balance sm:text-xl">{item.title}</h3>
                <p className="text-pretty text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {footer && (
          <div className="flex flex-col items-start gap-5 border-t border-border bg-primary/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex flex-col gap-1">
              <p className="text-xl tracking-tight">{footer.title}</p>
              <p className="text-pretty text-muted-foreground">{footer.text}</p>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={footer.link.href} />}
              className="h-11 shrink-0 px-6 text-base"
            >
              {footer.link.label}
            </Button>
          </div>
        )}
      </div>
    </LandingSection>
  )
}

/** Where each part of a thing goes: one row per part, from the left column to the right. */
export function MappingSection({
  id,
  eyebrow,
  title,
  intro,
  from,
  to,
  rows,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  /** Column headings, e.g. "In your builder" and "In your code". */
  from: string
  to: string
  rows: { icon: IconName; from: string; to: string }[]
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="corners guides border border-border bg-card">
        <div className="grid grid-cols-[1fr_2.5rem_1fr] gap-3 border-b border-border px-4 py-4 font-mono text-xs tracking-widest text-muted-foreground uppercase sm:grid-cols-[1fr_8rem_1fr] sm:gap-6 sm:px-8">
          <span>{from}</span>
          <span aria-hidden="true" />
          <span>{to}</span>
        </div>
        <ul data-reveal="children" className="divide-y divide-border">
          {rows.map((row) => (
            <li
              key={row.from}
              className="grid grid-cols-[1fr_2.5rem_1fr] items-center gap-3 px-4 py-4 sm:grid-cols-[1fr_8rem_1fr] sm:gap-6 sm:px-8 sm:py-5"
            >
              <span className="flex items-center gap-3">
                <span className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground sm:flex">
                  <Icon name={row.icon} className="size-4" />
                </span>
                <span className="text-sm sm:text-base">{row.from}</span>
              </span>
              <span aria-hidden="true" className="flex items-center text-primary dark:text-[#c3caff]">
                <span className="reveal-wipe h-px flex-1 border-t border-dashed border-current" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="-ml-1 size-4">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </span>
              <span className="sr-only">moves to</span>
              <span className="justify-self-start rounded-[0.875rem] bg-primary/10 px-3 py-1 text-sm sm:rounded-full text-primary sm:text-base dark:bg-primary/25 dark:text-foreground">
                {row.to}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </LandingSection>
  )
}

/**
 * A self-check: statements a visitor ticks beside a panel that scores them,
 * with a button to the contact section once most are ticked (see FitCheck).
 * For a fit that is mostly yes. When the "no" side matters as much, as in
 * whether to migrate at all, use FitSection instead.
 */
export function FitCheckSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  initial = [],
  cta = { label: "Book a discovery call", href: "#contact" },
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  items: string[]
  /** Which statements start ticked, by index. */
  initial?: number[]
  cta?: { label: string; href: string }
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <FitCheck items={items} initial={initial} cta={cta} />
    </LandingSection>
  )
}

/** One panel split in two: who a service suits and who it does not, as short lines. */
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
      <div className="corners guides grid divide-y divide-border border border-border bg-card md:grid-cols-2 md:divide-x md:divide-y-0">
        {[
          { ...good, positive: true },
          { ...bad, positive: false },
        ].map((column) => (
          <div key={column.title} className={cn("flex flex-col gap-6 p-6 sm:p-10", column.positive && "bg-primary/[0.03]")}>
            <h3
              className={cn(
                "w-fit rounded-full px-4 py-1.5 text-sm font-medium",
                column.positive ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground",
              )}
            >
              {column.title}
            </h3>
            <ul data-reveal="children" className="flex flex-col gap-4">
              {column.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-pretty">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full",
                      column.positive
                        ? "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground"
                        : "bg-foreground/5 text-muted-foreground",
                    )}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                      {column.positive ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
                    </svg>
                  </span>
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
