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
  intro = "Two fixed-price sprints, agreed before the build starts.",
  children,
}: {
  title?: string
  intro?: React.ReactNode
  /** Shown under the cards, e.g. a note on what else the packages cover. */
  children?: React.ReactNode
}) {
  return (
    <LandingSection id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        className={inset}
        eyebrow="Pricing"
        title={title}
        id="pricing-heading"
      >
        {intro}
      </SectionHeading>

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
              "corners guides flex scroll-mt-28 flex-col gap-8 bg-card p-6 sm:p-8 lg:p-10",
              service.preferred
                ? "border-2 border-primary shadow-xl shadow-primary/15 [--corner-inset:2px] [--corner:var(--foreground)] [--edge:2px]"
                : "border border-border shadow-xl shadow-black/5",
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
          className="pip flex flex-col gap-5 border border-primary/30 bg-primary/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {foundingOffer.slots} slots {foundingOffer.period}
            </p>
            <h3 id="founding-offer-heading" className="text-xl tracking-tight text-balance">
              Founding clients get more for the same price
            </h3>
            <ul className="flex flex-col gap-2 text-pretty">
              {foundingOffer.extras.map((extra) => (
                <li key={extra} className="flex gap-3">
                  <CheckIcon />
                  <span>
                    <span className="font-medium">Free:</span> {extra}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-pretty text-muted-foreground">
              On either package, in return for {foundingOffer.inReturn}.
            </p>
          </div>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-12 shrink-0 text-base"
          >
            Claim a founding slot
          </Button>
        </aside>
      )}
    </>
  )
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

  return (
    <section
      id="after-launch"
      aria-labelledby="after-launch-heading"
      className="scroll-mt-28 corners guides flex flex-col gap-8 border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10"
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">After launch</p>
        <h3 id="after-launch-heading" className="text-2xl tracking-tight text-balance">
          What happens after the handover week
        </h3>
      </div>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
        <article
          id={supportPlan.id}
          aria-labelledby={`${supportPlan.id}-name`}
          className="relative flex scroll-mt-28 flex-col gap-5 border-2 border-primary p-6"
        >
          <p className="absolute -top-3.5 right-6 bg-primary px-4 py-1 font-mono text-xs tracking-widest text-primary-foreground uppercase">
            Recommended
          </p>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h4 id={`${supportPlan.id}-name`} className="text-xl tracking-tight">
              {supportPlan.name}
            </h4>
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

        <div className="flex flex-col gap-6">
          {others.map((option) => (
            <div key={option.name} className="flex flex-col gap-1.5 border-l-2 border-border pl-5">
              <h4 className="flex flex-wrap items-baseline justify-between gap-x-4 font-medium">
                {option.name}
                <span className="font-mono text-sm font-normal text-muted-foreground">{option.price}</span>
              </h4>
              <p className="text-pretty text-muted-foreground">{option.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
