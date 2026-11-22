import Link from "next/link"
import { cn } from "cn"

import { Icon, type IconName } from "@/components/landing/icons"
import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"

/** One problem a founder runs into, and how the studio answers it. */
export type PainPoint = {
  icon: IconName
  /** The problem, as the founder would put it. Short: it is the card's h3. */
  pain: string
  /** A sentence on why it hurts. */
  detail: string
  /** How we answer it, in a line. */
  answer: string
}

/**
 * The problems that stop founders getting a product built, each answered in
 * a line, so a visitor sees their situation before they see the offer. Sits
 * straight under the hero. Cards share one box with hairline dividers, three
 * across on wide screens, the problem on top and our answer under a rule.
 * Each card is a three-row subgrid, so the rules line up across a row.
 */
export function PainPointsSection({
  eyebrow = "Sound familiar?",
  title,
  intro,
  points,
}: {
  eyebrow?: string
  title: string
  intro: React.ReactNode
  points: PainPoint[]
}) {
  return (
    <LandingSection id="problems" labelledBy="problems-heading">
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id="problems-heading">
        {intro}
      </SectionHeading>

      <ul
        data-reveal="children"
        className="corners guides grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {points.map((point, index) => (
          <li key={point.pain} className="row-span-3 grid grid-rows-subgrid gap-6 bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-xs tracking-widest" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon name={point.icon} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl tracking-tight text-balance">{point.pain}</h3>
              <p className="text-pretty text-muted-foreground">{point.detail}</p>
            </div>
            <p className="flex gap-3 border-t border-border pt-5 text-pretty">
              <CheckIcon />
              <span>
                <span className="sr-only">How we fix it: </span>
                {point.answer}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
          inset,
        )}
      >
        <p className="max-w-xl text-lg text-pretty text-muted-foreground">
          Recognise a few of these? A free 30 minute call is the quickest way to work out what to
          build first.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={pages.bookCall.path} />}
          className="h-11 w-fit shrink-0 px-6 text-base"
        >
          Book a discovery call
        </Button>
      </div>
    </LandingSection>
  )
}
