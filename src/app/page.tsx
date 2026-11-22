import { PageJsonLd } from "@/components/json-ld"
import { AboutSection } from "@/components/landing/about-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection } from "@/components/landing/faq-section"
import { LandingHero, TerminalCard } from "@/components/landing/hero"
import { PainPointsSection, type PainPoint } from "@/components/landing/pain-points-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { calendarPackage, ProcessSection } from "@/components/landing/process-section"
import { StackSection } from "@/components/landing/stack-section"
import { WorkSection } from "@/components/landing/work-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { createMetadata, pages } from "@/lib/seo"
import { afterLaunchAnswer, supportPriceSentence, foundingOfferSentence, mvp, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd, supportJsonLd } from "@/lib/structured-data"

// The search title leads with the brand, then says what we do. pageTitle()
// drops the repeated app name it would append, so this renders as written. The
// registry title stays "Scryptic" for breadcrumbs, JSON-LD and llms.txt.
export const metadata = createMetadata({
  ...pages.home,
  title: `${siteConfig.name} | MVP and app development studio`,
})

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs = [
  {
    question: "How much does it cost to build an app with Scryptic?",
    answer: `There are two fixed prices, both plus VAT. ${services.map((s) => `The ${s.name} is ${s.price}, a ${s.sprint}`).join(". ")}. Both end with a week of handover after launch for bug fixes and a smooth rollout.${supportPriceSentence()}${foundingOfferSentence()} The discovery call settles which one fits, so the price is agreed before any build starts.`,
  },
  {
    question: "How long does it take to build an app?",
    answer:
      "The MVP is a 2 week development sprint: one week of development and one of iteration on your feedback, then launch. The Extended MVP adds a second week of development, so it runs for three weeks. Both are followed by a week of handover after launch for bug fixes and a smooth rollout. The sprint starts once the scope is agreed after the discovery call.",
  },
  {
    question: "What is included in an MVP package?",
    answer:
      "A fully built MVP, ready to take to market. The MVP has one week of development by our team and one week of iteration on your feedback; the Extended MVP has two weeks of development and one of iteration. Both finish with a week of handover after launch for bug fixes and a smooth rollout.",
  },
  {
    question: "What kind of apps do you build?",
    answer:
      "MVPs, SaaS products and production web apps, often with AI at their core. Recent launches include ReelEstate, which turns listing photos into property videos, Viewlio, AI analytics for YouTube creators, Until Then, which delivers messages years into the future, and Pretty Metrics, shareable revenue charts. Most are built with TypeScript, Next.js and Postgres, with Stripe for payments.",
  },
  {
    question: "What is MVP development?",
    answer:
      "MVP development is building the smallest version of a product that real customers can use and pay for, so you learn what works before spending more. A Scryptic MVP is production code, not a throwaway prototype: it launches with authentication, payments and analytics in place, and the next version builds on it rather than starting again.",
  },
  {
    question: "Do you only work with founders in Brighton?",
    answer: `No. ${siteConfig.name} is based in Brighton and works with founders across the UK. The Friday catch-ups run over video, so where you are makes no difference to the build.`,
  },
  {
    question: "Can you take over an app built with Lovable, Bubble or another builder?",
    answer:
      "Yes. Apps from AI app builders such as Lovable, Bolt.new, v0 and Replit are real code, so the move is usually about owning and hardening what is there. No-code tools such as Bubble, Adalo and Glide keep the app on their platform, so the move is a planned rebuild that brings your data and users across. Enterprise platforms such as OutSystems and Power Apps are rebuilt app by app. Our free migration guides cover twenty tools step by step.",
  },
  {
    question: "Can you work on an existing app or codebase?",
    answer:
      "Yes. We review existing code, infrastructure and prototypes during discovery. Often the best plan is to build on what you have rather than start again, and the agreed scope says which parts we would keep, fix or replace.",
  },
  {
    question: "What happens after launch, and what does support cost?",
    answer: afterLaunchAnswer(),
  },
  {
    question: "Who owns the code once the app is built?",
    answer:
      "You do. The code lives in your repository and the hosting, database, payments and other accounts are in your name, then handed over at launch. Nothing is locked to us, so any developer can pick it up later.",
  },
  {
    question: "How is Scryptic different from an agency, a freelancer or an in-house hire?",
    answer:
      "You get agency-quality software at freelancer speed, with code you own outright. Hiring in-house means a recruitment round before any work starts, agencies tend to be slower and fix the plan up front, freelancers vary in quality, and AI-only tools rarely hold up with real users. With Scryptic you get a launched product after a 2 or 3 week sprint, a fixed price and priorities revisited every week.",
  },
  {
    question: "How do you keep me updated during the build?",
    answer:
      "With a catch-up every Friday. Each week we go through what shipped, agree priorities for the week ahead and look at what is coming up in the pipeline, so you can change direction early rather than at the end.",
  },
  {
    question: "Who will I be working with?",
    answer: `With ${founder.name}, the founder, from the discovery call to launch day. ${siteConfig.name} is a small Brighton-based studio that takes on a few projects at a time, with one team throughout and no handoffs. ${founder.name} is a full-stack developer with five years of experience building software for enterprise clients and startups.`,
  },
  {
    question: "What happens on the discovery call?",
    answer:
      "It is a free 30 minute call about your idea or product, who it is for and where it is stuck. You get straight advice on scope, stack and which package fits, including what is not worth building yet. If it makes sense to work together, the scope and price are agreed before the sprint starts.",
  },
]

// The problems founders bring to the discovery call, each answered in a line.
// Keep the answers true to the packages: prices and sprints come from @/lib/services.
const painPoints: PainPoint[] = [
  {
    icon: "card",
    pain: "The quotes don't fit the budget",
    detail: "Agencies price a first version like a finished product, with weeks of discovery before any code is written.",
    answer: `Two fixed prices, from ${mvp.price} + VAT, agreed before the build starts.`,
  },
  {
    icon: "users",
    pain: "You can't find a technical co-founder",
    detail: "Hiring a developer means a recruitment round, equity talks and months before anything ships.",
    answer: "Work directly with the developer building it, from the first call to launch day.",
  },
  {
    icon: "code",
    pain: "The prototype won't hold up",
    detail: "A no-code or AI-built app makes a good demo, then struggles with logins, payments and real users.",
    answer: "Production code, with authentication, payments and analytics in place at launch.",
  },
  {
    icon: "clock",
    pain: "The launch date keeps slipping",
    detail: "Freelancers go quiet, the scope drifts and the release moves back another month.",
    answer: `Launched after a ${mvp.sprint}, with a catch-up every Friday.`,
  },
  {
    icon: "spark",
    pain: "You're not sure what to build first",
    detail: "Months go into features nobody asked for before a single customer has tried the product.",
    answer: "Ship the smallest version customers will pay for, then build on what you learn.",
  },
  {
    icon: "lock",
    pain: "Someone else holds the keys",
    detail: "The code, hosting and accounts sit with the agency or the platform, so leaving means starting again.",
    answer: "Your repository and accounts, in your name, handed over at launch.",
  },
]

const terminalLines = [
  { prompt: true, text: "scryptic discover" },
  { prompt: false, text: "goals, users and constraints mapped" },
  { prompt: false, text: "stack and architecture chosen" },
  { prompt: false, text: "first release scoped and priced" },
  { prompt: true, text: "scryptic ship --to market" },
  { prompt: false, text: "progress reviewed every Friday" },
  { prompt: false, text: "launched in a 2 week sprint" },
]

export default function Home() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={pages.home}
        nodes={[
          ...services.map((service) => serviceJsonLd(pages.home, service)),
          supportJsonLd(pages.home),
          faqJsonLd(pages.home, faqs),
        ]}
      />
      <ScrollReveal />

      <LandingHero
        title={
          <>
            From idea to <span className="text-[#c3caff]">MVP</span>, without hiring a dev team.
          </>
        }
        intro={`${siteConfig.name} is an MVP and app development studio in Brighton, building web apps and SaaS products for UK founders.`}
        secondary={{ label: "See pricing", href: "/#pricing" }}
        visual={<TerminalCard lines={terminalLines} />}
      />
      <div aria-hidden="true" className="rail-joint" />

      <PainPointsSection
        title="Your idea is ready. Getting it built is the hard part."
        intro="Most founders stall in the same places: the cost, the hiring, code that breaks and launch dates that slip. Each package is built to get past them."
        points={painPoints}
      />

      <PricingSection />

      <AboutSection />

      <ProcessSection
        intro={`Two calls, a ${calendarPackage.sprint}, then handover and a week of support, with a demo every Friday.`}
      />

      <StackSection />

      <WorkSection />

      <ComparisonSection
        title="Hire in-house. Brief an agency. Chance a freelancer. Or skip the trade-offs."
        intro={`${siteConfig.name} gives you agency-quality software at freelancer speed, with code you own outright.`}
      />

      <FaqSection
        faqs={faqs}
        intro="Straight answers on pricing, timelines and process. Anything else, ask on the call."
      />

      <ContactSection />
    </main>
  )
}
