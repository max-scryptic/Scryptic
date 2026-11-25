import Link from "next/link"
import { cn } from "cn"

import { CornerPixels, ctaFrame } from "@/components/corner-pixels"
import { PageJsonLd } from "@/components/json-ld"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { AfterLaunch, PricingCards } from "@/components/landing/pricing-section"
import { PixelIn } from "@/components/pixel-in"
import { Button } from "@/components/ui/button"
import { inset, pageTop } from "@/lib/frame"
import { createMetadata, pages } from "@/lib/seo"
import { services } from "@/lib/services"
import { faqJsonLd, serviceJsonLd, supportJsonLd } from "@/lib/structured-data"

const page = pages.pricing

export const metadata = createMetadata(page)

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs: Faq[] = [
  {
    question: "Who pays for hosting and third-party services?",
    answer:
      "You do, directly and at cost. Hosting, the database, email sending, payments and any other service the app runs on bill you from your own account with each provider, so nothing is resold or marked up through us. Those costs are separate from the package price and the support plan.",
  },
  {
    question: "Whose name are the accounts in?",
    answer:
      "Yours, from day one. The code lives in your own repository, and the hosting, database, domain, payment and email accounts are set up in your name. Nothing is locked to us, so there is nothing to transfer if your own developer takes over.",
  },
  {
    question: "Why do you recommend the support plan?",
    answer:
      "Because apps need updates to stay secure and working, and the first months after launch are when users find the most to fix. The plan covers both, and you can cancel any time.",
  },
]

// Laid out like /tools and /work: a plain heading, the content, then the call
// to action. The FAQ section brings its own page padding, so each block here
// sets its own rather than <main>, with the landing page's py-24 rhythm
// between blocks.
export default function PricingPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={page}
        nodes={[
          ...services.map((service) => serviceJsonLd(page, service)),
          supportJsonLd(page),
          faqJsonLd(page, faqs),
        ]}
      />

      <div className={cn("px-4 pb-24 sm:px-6", pageTop)}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <div className={cn("flex flex-col items-start gap-6", inset)}>
            <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
              Fixed prices for <PixelIn className="text-primary">MVP and app development</PixelIn>
            </h1>
            <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
              Every build is a fixed price agreed before it starts. After launch, support is optional, and hosting is
              billed to you at cost.
            </p>
          </div>

          <section id="pricing" aria-labelledby="packages-heading" className="flex flex-col gap-12">
            {/* The cards bring h3s; this keeps the outline h1, h2, h3 without a visible heading. */}
            <h2 id="packages-heading" className="sr-only">
              MVP packages
            </h2>
            <PricingCards />
          </section>
        </div>
      </div>

      {/* Its own band, spaced like a landing section (py-24 each side). */}
      <div className="px-4 py-24 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <AfterLaunch />
        </div>
      </div>

      <FaqSection
        faqs={faqs}
      />

      {/* No top padding: the FAQ section's own bottom padding is the gap, as on the landing and service pages. */}
      <div className="px-4 pb-24 sm:px-6">
        <section
          aria-labelledby="pricing-cta-heading"
          className={cn(ctaFrame, "mx-auto w-full max-w-6xl flex flex-col items-start gap-4 p-6 sm:p-10")}
        >
          <CornerPixels corner="top-right" weight="heavy" />
          <CornerPixels corner="bottom-left" weight="light" />
          <h2 id="pricing-cta-heading" className="text-2xl tracking-tight text-balance">
            Get a fixed price for your app
          </h2>
          <p className="text-pretty text-muted-foreground">
            Book a free discovery call. You will leave knowing which package fits and what it costs.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>
      </div>
    </main>
  )
}
