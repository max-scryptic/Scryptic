import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import { ContactSection } from "@/components/landing/contact-section"
import { LandingHero } from "@/components/landing/hero"
import { ServicesVisual } from "@/components/landing/hero-visuals"
import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { inset } from "@/lib/frame"
import { createMetadata, pages } from "@/lib/seo"
import { servicePages } from "@/lib/service-pages"
import { offerPrice, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"

const page = pages.services

export const metadata = createMetadata(page)

// The cheaper package, quoted as the "from" price on each card.
const entryPackage = [...services].sort((a, b) => a.amount - b.amount)[0]

export default function ServicesPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd page={page} nodes={[itemListJsonLd(page, servicePages.map((s) => s.page))]} />
      <ScrollReveal />

      <LandingHero
        title={
          <>
            App development <span className="text-[#c3caff]">services</span> for UK founders.
          </>
        }
        eyebrow={{ label: siteConfig.name }}
        intro="MVP development, web app development and no-code migration, each built in a fixed-price 2 or 3 week sprint with a demo every Friday."
        secondary={{ label: "Compare services", href: "#services" }}
        visual={<ServicesVisual />}
        shape="services"
      />
      <div aria-hidden="true" className="rail-joint" />

      <LandingSection id="services" labelledBy="services-heading">
        <SectionHeading className={inset} eyebrow="What we do" title="Three services, one way of working" id="services-heading">
          From an idea, a workflow or a no-code app, you get a fixed price, weekly demos and code you own.
        </SectionHeading>
        <div data-reveal="children" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((service, index) => (
            <article
              key={service.page.path}
              aria-labelledby={`${service.id}-name`}
              className="corners guides flex flex-col gap-6 border border-border bg-card p-6 sm:p-8 lg:p-10"
            >
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3">
                <h3 id={`${service.id}-name`} className="text-3xl tracking-tight">
                  {service.name}
                </h3>
                <p className="text-lg text-pretty text-muted-foreground">{service.summary}</p>
              </div>
              <ul className="flex flex-col gap-3 text-pretty">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="flex items-baseline gap-2">
                <span className="text-muted-foreground">From</span>
                <span className="text-3xl font-semibold tracking-tight">{offerPrice(entryPackage)}</span>
                <span className="text-muted-foreground">+ VAT</span>
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={service.page.path} />}
                className="mt-auto h-12 w-full text-base"
              >
                {service.linkText}
              </Button>
            </article>
          ))}
        </div>
      </LandingSection>

      <ContactSection
        title="Not sure which you need?"
        text="Tell us where your product is. We will say whether it needs building, moving or leaving alone."
      />
    </main>
  )
}
