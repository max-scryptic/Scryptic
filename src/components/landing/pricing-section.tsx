import Link from "next/link"
import { cn } from "cn"

import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { launchOffer, offerPrice, services } from "@/lib/services"

/**
 * The fixed-price packages from @/lib/services, one card each: name and
 * sprint, the price, what is included, then the call. The preferred package
 * gets a Lapis border and a tag sitting on its top edge. Every card is
 * square-edged, with accent brackets on its corners and its top and bottom
 * edges run out across the page. Pair with serviceJsonLd() for each package.
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
        aside={
          launchOffer && (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border border-primary/30 bg-primary/5 px-4 py-2">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">
                Limited offer
              </span>
              <span>
                {launchOffer.percentOff}% off {launchOffer.appliesTo}
              </span>
            </p>
          )
        }
      >
        {intro}
      </SectionHeading>

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
            <div className="flex flex-col gap-2">
              {launchOffer && (
                <p className="flex items-center gap-3 text-lg text-muted-foreground">
                  <span className="sr-only">Usually</span>
                  <s>{service.price}</s>
                  <span className="bg-primary/10 px-2.5 py-0.5 font-mono text-xs tracking-widest text-primary uppercase dark:bg-primary/30 dark:text-foreground">
                    {launchOffer.percentOff}% off
                  </span>
                </p>
              )}
              <p className="flex items-baseline gap-2">
                {launchOffer && <span className="sr-only">Now</span>}
                <span className="text-5xl font-semibold tracking-tight">{offerPrice(service)}</span>
                <span className="text-lg text-muted-foreground">+ VAT</span>
              </p>
            </div>
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

      {children && <div className={cn("text-pretty text-muted-foreground", inset)}>{children}</div>}
    </LandingSection>
  )
}
