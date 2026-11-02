import { cn } from "cn"

import { AppLayers, type AppLayer } from "@/components/landing/app-layers"
import { FitCheck, type FitVerdicts } from "@/components/landing/fit-check"
import { LaunchKitHub, type HubItem } from "@/components/landing/launch-kit-hub"
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
