import Link from "next/link"
import { cn } from "cn"

import { FitCheck, type FitVerdicts } from "@/components/landing/fit-check"
import { Icon, type IconName } from "@/components/landing/icons"
import { LaunchKitHub, type HubItem } from "@/components/landing/launch-kit-hub"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * Sections only the service pages use. Each has its own shape, so a page is
 * not a run of identical boxes: a hub, pill tags, a from-to map and a
 * scored self-check. Keep the copy in them short: a label and a few words.
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
