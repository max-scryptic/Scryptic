import Link from "next/link"
import { cn } from "cn"

import { AppLayers, type AppLayer } from "@/components/landing/app-layers"
import { FitCheck } from "@/components/landing/fit-check"
import { Icon, type IconName } from "@/components/landing/icons"
import { LaunchKitHub, type HubItem } from "@/components/landing/launch-kit-hub"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * Sections only the service pages use. Each has its own shape, so a page is
 * not a run of identical boxes: a hub, pill tags, an exploded drawing and a
 * split fit panel. Keep the copy in them short: a label and a few words.
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

/**
 * What an app is made of, as an exploded drawing: each layer labelled with
 * where it goes, lit in turn (see AppLayers). For a move where the screens
 * are only the visible part of what comes across.
 */
export function LayersSection({
  id,
  eyebrow,
  title,
  intro,
  layers,
  note,
}: {
  id: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  layers: AppLayer[]
  /** A short line under the drawing. */
  note?: React.ReactNode
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className={cn(inset, "flex flex-col gap-6 border-t border-border pt-10")}>
        <AppLayers layers={layers} />
        {note && <p className="text-sm text-pretty text-muted-foreground">{note}</p>}
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
