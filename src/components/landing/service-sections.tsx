import Link from "next/link"
import { cn } from "cn"

import { FitCheck } from "@/components/landing/fit-check"
import { Icon, type IconName } from "@/components/landing/icons"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * Sections only the service pages use. Each has its own shape, so a page is
 * not a run of identical boxes: icon rows, pill tags, a from-to map and a
 * split fit panel. Keep the copy in them short: a label and a few words.
 */

/*
 * The stack in IconRowsSection: each bar's width, as a share of the column,
 * and where it sits in the space left over (0 hard left, 0.5 centred, 1 hard
 * right). The first and last bars are centred and narrower, and the ones in
 * between step out to alternate sides, so the stack reads as a loose pile
 * with a steady top and bottom. Built for six rows; more repeat the middle.
 */
const edgeRow = { width: "74%", shift: 0.5 }
const middleRows = [
  { width: "88%", shift: 0 },
  { width: "92%", shift: 1 },
  { width: "80%", shift: 0.12 },
  { width: "86%", shift: 0.6 },
]

function rowLayout(index: number, count: number) {
  if (index === 0 || index === count - 1) return edgeRow
  return middleRows[(index - 1) % middleRows.length]
}

/**
 * Heading beside a stack of separate bars, uneven in width and offset (see
 * rowLayout), each an icon, a name, a few words and a mono tag. Put short
 * text first and last, where the bars are narrowest. Below sm the bars are
 * 90 to 98% wide, so the text still fits. The corner brackets stay hidden
 * until a bar is hovered, so six bars do not crowd.
 */
export function IconRowsSection({
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
  items: { icon: IconName; name: string; text: string; tag: string }[]
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`} className="lg:grid lg:grid-cols-[1fr_1.25fr] lg:items-center">
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <ul data-reveal="children" className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <li
            key={item.name}
            style={
              {
                "--bar": rowLayout(index, items.length).width,
                "--shift": rowLayout(index, items.length).shift,
              } as React.CSSProperties
            }
            className="corners corners-grow ml-[calc((100%-var(--w))*var(--shift))] grid w-(--w) grid-cols-[auto_1fr_auto] [--w:calc(70%+var(--bar)*0.3)] sm:[--w:var(--bar)] items-center gap-4 border border-border bg-card px-4 py-3.5 shadow-lg shadow-black/5 transition-colors [--corner-len:0px] focus-within:[--corner-len:24px] hover:border-primary/50 hover:[--corner-len:24px] sm:px-5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground">
              <Icon name={item.icon} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-pretty text-muted-foreground">{item.text}</span>
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
              {item.tag}
            </span>
          </li>
        ))}
      </ul>
    </LandingSection>
  )
}

/** Short statements as rounded tags with icons, closed by a line that points to the next step. */
export function PillsSection({
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
  items: { icon: IconName; text: string }[]
  footer?: { text: string; link: { label: string; href: string } }
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="corners guides flex flex-col gap-8 border border-border bg-card p-6 sm:p-10">
        <ul data-reveal="children" className="flex flex-wrap gap-3">
          {items.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-2.5 rounded-full border border-border bg-background py-2 pr-4 pl-2 sm:text-lg"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground">
                <Icon name={item.icon} className="size-4" />
              </span>
              {item.text}
            </li>
          ))}
        </ul>
        {footer && (
          <p className="border-t border-border pt-6 text-pretty text-muted-foreground">
            {footer.text}{" "}
            <Link href={footer.link.href} className="text-primary hover:underline">
              {footer.link.label}
            </Link>
          </p>
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
