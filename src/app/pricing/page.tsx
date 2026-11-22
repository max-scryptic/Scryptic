import { PageJsonLd } from "@/components/json-ld"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { LandingHero, TerminalCard } from "@/components/landing/hero"
import { PricingSection } from "@/components/landing/pricing-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { createMetadata, pages } from "@/lib/seo"
import {
  afterLaunchAnswer,
  foundingOffer,
  foundingOfferSentence,
  mvp,
  services,
  supportPlan,
} from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { faqJsonLd, serviceJsonLd, supportJsonLd } from "@/lib/structured-data"

const page = pages.pricing

export const metadata = createMetadata(page)

const supportPrice = `${supportPlan.price} + VAT a ${supportPlan.per}`

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs: Faq[] = [
  {
    question: `How much does ${siteConfig.name} charge to build an app?`,
    answer: `There are two fixed prices, both plus VAT. ${services.map((s) => `The ${s.name} is ${s.price}, a ${s.sprint}`).join(". ")}. Both end with a week of handover after launch for bug fixes and a smooth rollout. The discovery call settles which one fits, so the price is agreed before any build starts.`,
  },
  {
    question: "Do your prices include VAT?",
    answer:
      "No. Every price on this page is plus VAT: the two packages, the support plan and any further sprint.",
  },
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
    question: "What happens after the handover week?",
    answer: afterLaunchAnswer(),
  },
  {
    question: "Do I need the support plan?",
    answer: `No. It is optional at ${supportPrice}, and you can cancel any time. We recommend it because apps need updates to stay secure and working, and the first months after launch are when users find the most to fix.`,
  },
  {
    question: "How much do new features cost after launch?",
    answer: `Small changes, up to half a day each month, are part of the support plan. Bigger features are another sprint, from ${mvp.price} + VAT, priced like the packages and agreed before the work starts.`,
  },
  ...(foundingOffer
    ? [
        {
          question: "Is there an offer for early clients?",
          answer: foundingOfferSentence().trim(),
        },
      ]
    : []),
]

const terminalLines = [
  { prompt: true, text: "scryptic quote" },
  ...services.map((s) => ({ prompt: false, text: `${s.name}: ${s.price} + VAT, fixed` })),
  { prompt: true, text: "scryptic support --after-handover" },
  { prompt: false, text: `${supportPrice}, optional` },
  { prompt: false, text: "hosting billed to you, at cost" },
]

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
      <ScrollReveal />

      <LandingHero
        eyebrow={{ label: siteConfig.name }}
        title={
          <>
            Fixed prices for <span className="text-[#c3caff]">MVP</span> and app development.
          </>
        }
        intro="Every build is a fixed price agreed before it starts. After launch, support is optional, and hosting is billed to you at cost."
        secondary={{ label: "Pricing FAQs", href: "#faq" }}
        visual={<TerminalCard lines={terminalLines} />}
      />
      <div aria-hidden="true" className="rail-joint" />

      <PricingSection title="Two packages, priced before the build" afterLaunch />

      <FaqSection
        faqs={faqs}
        intro="Who pays for what, whose name the accounts are in and what happens after launch."
      />

      <ContactSection
        title="Get a fixed price for your app"
        text="Tell us what you want to build. You will leave the call knowing which package fits and what it costs."
      />
    </main>
  )
}
