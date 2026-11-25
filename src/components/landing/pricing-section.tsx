import { Fragment } from "react"
import Link from "next/link"
import { cn } from "cn"

import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { foundingOffer, mvp, services, supportPlan } from "@/lib/services"

/**
 * The pricing block on the home and service pages: a heading, then the
 * package cards and founding-client banner from <PricingCards />, and a
 * button through to /pricing for support, hosting and the FAQs. Pair with
 * serviceJsonLd() for each package.
 */
export function PricingSection({
  title = "A fully built MVP, ready to take to market",
  children,
}: {
  title?: string
  /** Shown under the cards, e.g. a note on what else the packages cover. */
  children?: React.ReactNode
}) {
  return (
    <LandingSection id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        className={inset}
        eyebrow="Pricing"
        title={title}
        id="pricing-heading" />

      <PricingCards />

      <div className="flex justify-center">
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={pages.pricing.path} />}
          className="h-11 px-5 text-base"
        >
          More pricing info
        </Button>
      </div>

      {children && <div className={cn("text-pretty text-muted-foreground", inset)}>{children}</div>}
    </LandingSection>
  )
}

/**
 * The fixed-price packages from @/lib/services, one card each: name and
 * sprint, the price, what is included, then the call. The preferred package
 * gets a Lapis border and a tag sitting on its top edge. Every card is
 * square-edged, with accent brackets on its corners and its top and bottom
 * edges run out across the page. Under the cards, the founding-client
 * banner while `foundingOffer` is set. No section or heading of its own, so
 * /pricing can place it under its <h1>.
 */
export function PricingCards() {
  return (
    <>
      <div data-reveal="children" className="grid gap-6 pt-4 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-name`}
            className={cn(
              // On hover the brackets lengthen, the wash deepens and the glow warms. No lift: the
              // guides are drawn by the card, so moving it would move the page's lines too.
              "corners corners-grow guides flex scroll-mt-28 flex-col gap-8 bg-linear-to-br to-transparent to-60% p-6 transition duration-300 ease-out motion-reduce:transition-none sm:p-8 lg:p-10",
              service.preferred
                ? "border-2 border-primary from-primary/15 shadow-xl shadow-primary/15 hover:from-primary/25 hover:shadow-2xl hover:shadow-primary/25 [--corner-inset:2px] [--corner:var(--foreground)] [--edge:2px]"
                : "border border-border from-foreground/5 shadow-xl shadow-black/5 hover:border-primary/50 hover:from-primary/10 hover:shadow-primary/10",
            )}
          >
            {service.preferred && (
              <p className="absolute -top-3.5 right-6 z-10 bg-primary px-4 py-1 font-mono text-xs tracking-widest text-primary-foreground uppercase sm:right-10">
                Preferred
              </p>
            )}
            <div className="flex flex-col gap-1">
              <h3 id={`${service.id}-name`} className="text-2xl tracking-tight">
                {service.name}
              </h3>
              <p className="text-muted-foreground">{service.sprint}</p>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight">{service.price}</span>
              <span className="text-lg text-muted-foreground">+ VAT</span>
            </p>
            <div className="flex flex-col gap-4">
              <h4 className="font-medium">What is included</h4>
              <ul className="flex flex-col gap-3 text-pretty">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="mt-auto h-12 w-full text-base"
            >
              Book a discovery call
            </Button>
          </article>
        ))}
      </div>

      {foundingOffer && (
        <aside
          aria-labelledby="founding-offer-heading"
          // Built like the package cards above it (page background, corner brackets that lengthen
          // on hover, edges run out across the page) but cut like a coupon, so it reads as a
          // one-off: a dashed edge to match the tear line, and a wash that glows out from the
          // stub, behind the slots left, rather than in from the top left.
          className="corners corners-grow guides grid border border-dashed border-primary/50 bg-linear-to-l from-primary/15 to-transparent to-50% transition duration-300 ease-out hover:from-primary/25 hover:shadow-xl hover:shadow-primary/10 motion-reduce:transition-none md:grid-cols-[1fr_16rem]"
        >
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Founding client offer</p>
            <h3 id="founding-offer-heading" className="text-2xl tracking-tight text-balance">
              Same price, {countWord(foundingOffer.extras.length)} things added free
            </h3>
            <ul className="flex flex-col gap-2 text-pretty">
              {foundingOffer.extras.map((extra) => (
                <li key={extra} className="flex gap-3">
                  <CheckIcon />
                  {sentenceCase(extra)}
                </li>
              ))}
            </ul>
            <p className="text-pretty text-muted-foreground">
              <span className="text-foreground">The trade:</span> {foundingOffer.inReturn}.
            </p>
          </div>

          {/* The stub: a dashed tear line with a notch punched out at each end.
              Each notch is a circle on the card's edge, clipped to its inner half
              (plus the 1px border it covers). */}
          <div className="relative flex flex-col items-start justify-center gap-4 border-t border-dashed border-primary/50 p-6 sm:p-8 md:border-t-0 md:border-l">
            <span
              aria-hidden="true"
              className="absolute -top-2.5 -left-2.5 hidden size-5 rounded-full border border-primary/50 bg-background [clip-path:inset(calc(50%-1px)_0_0_0)] md:block"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2.5 -left-2.5 hidden size-5 rounded-full border border-primary/50 bg-background [clip-path:inset(0_0_calc(50%-1px)_0)] md:block"
            />
            <p className="flex items-baseline gap-3">
              <span className="font-mono text-6xl leading-none text-primary">{foundingOffer.slots}</span>
              <span className="text-muted-foreground">slots left</span>
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="h-12 w-full text-base"
            >
              Claim slot
            </Button>
          </div>
        </aside>
      )}
    </>
  )
}

/** Spells out small counts for headings, e.g. "two things added free". */
function countWord(n: number) {
  return ["no", "one", "two", "three", "four", "five"][n] ?? String(n)
}

/** The founding-offer strings complete a sentence, so lead with a capital when they stand alone. */
function sentenceCase(text: string) {
  return text[0].toUpperCase() + text.slice(1)
}

/**
 * What happens once the handover week ends: the recommended support plan,
 * another sprint, or taking it in-house. Only /pricing shows it; pair with
 * supportJsonLd().
 */
export function AfterLaunch() {
  const others = [
    {
      name: "Another sprint",
      price: `From ${mvp.price} + VAT`,
      text: "For bigger features, once real users show what to build next. Priced like the packages, before the work starts.",
    },
    {
      name: "Take it in-house",
      price: "Free",
      text: "The code, hosting and accounts are yours from day one, so your own developer can pick it up with nothing to transfer.",
    },
  ]

  // The recommended plan is a card, like the packages above it, with a Lapis
  // tint. The alternatives sit on the page beside it, hanging off a thin rail
  // with a square node each.
  return (
    <section id="after-launch" aria-labelledby="after-launch-heading" className="flex scroll-mt-28 flex-col gap-8">
      <div className={cn("flex flex-col gap-2", inset)}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">After launch</p>
        <h2 id="after-launch-heading" className="text-2xl tracking-tight text-balance">
          What happens after the handover week
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <article
          id={supportPlan.id}
          aria-labelledby={`${supportPlan.id}-name`}
          className="corners flex scroll-mt-28 flex-col gap-5 border border-border bg-card bg-linear-to-br from-primary/10 to-transparent p-6 shadow-xl shadow-black/5 sm:p-8"
        >
          <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
            <span className="size-2 bg-primary" aria-hidden="true" />
            Recommended
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 id={`${supportPlan.id}-name`} className="text-xl tracking-tight">
              {supportPlan.name}
            </h3>
            <p className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{supportPlan.price}</span>
              <span className="text-muted-foreground">+ VAT a {supportPlan.per}</span>
            </p>
          </div>
          <ul className="grid gap-3 text-pretty sm:grid-cols-2">
            {supportPlan.includes.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm font-medium">{supportPlan.terms}.</p>
        </article>

        <div className="relative flex flex-col gap-4 pl-8 lg:justify-center">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[3px] w-px bg-linear-to-b from-primary/60 via-border to-transparent"
          />
          {others.map((option, i) => (
            <Fragment key={option.name}>
              {i > 0 && (
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Or</p>
              )}
              <div className="relative flex flex-col gap-1.5">
                <span aria-hidden="true" className="absolute top-2 -left-8 size-[7px] bg-primary" />
                <h3 className="flex flex-wrap items-baseline gap-x-3 font-medium">
                  {option.name}
                  <span className="font-mono text-sm font-normal text-primary">{option.price}</span>
                </h3>
                <p className="text-pretty text-muted-foreground">{option.text}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
