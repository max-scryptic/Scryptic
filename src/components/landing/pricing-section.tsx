import Link from "next/link"
import { cn } from "cn"

import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { foundingOffer, services } from "@/lib/services"

/**
 * The fixed-price packages from @/lib/services, one card each: name and
 * sprint, the price, what is included, then the call. The preferred package
 * gets a Lapis border and a tag sitting on its top edge. Every card is
 * square-edged, with accent brackets on its corners and its top and bottom
 * edges run out across the page. Under the cards, the founding-client
 * banner while `foundingOffer` is set. Pair with serviceJsonLd() for each
 * package.
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
          className="corners flex flex-col gap-5 border border-primary/30 bg-primary/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
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

      {children && <div className={cn("text-pretty text-muted-foreground", inset)}>{children}</div>}
    </LandingSection>
  )
}
