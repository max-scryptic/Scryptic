import { PageJsonLd } from "@/components/json-ld"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import type { IconName } from "@/components/landing/icons"
import { SprintVisual } from "@/components/landing/hero-visuals"
import { PricingSection } from "@/components/landing/pricing-section"
import { FitCheckSection, HubSection } from "@/components/landing/service-sections"
import { calendarPackage, ProcessSection } from "@/components/landing/process-section"
import { StackSection } from "@/components/landing/stack-section"
import { WorkSection } from "@/components/landing/work-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { postsBySlug } from "@/lib/blog"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, pages } from "@/lib/seo"
import { launchOffer, offerPrice, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"

const page = pages.mvpDevelopment

export const metadata = createMetadata(page)

// What ships in every build, whichever package. Only claims the build delivers.
// The first three sit left of the product in the hub, the last three right.
const launchKit = [
  { icon: "lock", name: "Sign-in", text: "Accounts and password resets", tag: "Auth" },
  { icon: "card", name: "Payments", text: "Checkout and subscriptions", tag: "Stripe" },
  { icon: "chart", name: "Analytics", text: "Sign-ups to drop-offs, from day one", tag: "Events" },
  { icon: "database", name: "Database", text: "Backed up, built to grow", tag: "Postgres" },
  { icon: "code", name: "Code", text: "In your repository, readable by any dev", tag: "TypeScript" },
  { icon: "globe", name: "Hosting", text: "Your domain, your account", tag: "Vercel" },
] satisfies { icon: IconName; name: string; text: string; tag: string }[]

// The self-check in the fit section. The ones in fitInitial start ticked.
const fitChecks = [
  "You know your customer",
  "You want paying users, not a demo",
  "You would rather not hire a team yet",
  "You can join a call every Friday",
  "It is a web app or SaaS",
]
const fitInitial = [0, 1, 3]

const guides = postsBySlug([
  "how-to-build-an-mvp",
  "what-is-mvp-software",
  "mvp-software-development-example",
  "how-much-does-it-cost-to-build-an-app-uk",
  "saas-cost-before-and-after-launch",
  "best-saas-development-company",
])

const tools = [freeTool("mvp-cost-calculator"), freeTool("mvp-scope-planner")]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
// Worded for this page rather than copied from the home page's FAQ.
const faqs: Faq[] = [
  {
    question: "What is MVP development?",
    answer:
      "MVP development means designing, building and launching the first version of a product with only the features needed to test it with paying customers. At Scryptic that first version is production code, so the next release extends it rather than replacing it.",
  },
  {
    question: "How much does MVP development cost in the UK?",
    answer: `With ${siteConfig.name} it is a fixed price, plus VAT. ${services.map((s) => `The ${s.name} is ${s.price} for a ${s.sprint}`).join(", and ")}.${launchOffer ? ` For a limited time there is ${launchOffer.percentOff}% off ${launchOffer.appliesTo}, bringing them to ${services.map(offerPrice).join(" and ")}.` : ""} The price is agreed after the discovery call, before any build starts, and does not change mid-sprint.`,
  },
  {
    question: "How long does it take to build an MVP?",
    answer:
      "Two or three weeks once the scope is agreed. The MVP package is one week of development and one week of iteration on your feedback, then launch. The Extended MVP adds a second week of development. A week of handover and support follows either one.",
  },
  {
    question: "Which features should go into an MVP?",
    answer:
      "Only what your first customers need to do the core job and pay for it: one main user journey, sign-in, payments if you charge, and the admin you need to run it. Everything else waits for evidence from real users. The free MVP Scope Planner walks through the same cut.",
  },
  {
    question: "Is an MVP the same as a prototype?",
    answer:
      "No. A prototype shows how a product might work and is usually thrown away. An MVP is a working product that real users sign up to and pay for. It is smaller than the full vision, but built properly enough to grow into it.",
  },
  {
    question: "How do MVP development companies differ?",
    answer:
      "The biggest differences are whether they write code or build on a platform such as Bubble, whether they fix the price or bill for time, and what support they sell after launch. Published UK MVP timelines run from two weeks to about twelve, mostly because of how much the first release includes and how many people build it. Our guide to choosing a SaaS development company compares six UK studios side by side.",
  },
  {
    question: "Do you build web apps or mobile apps?",
    answer:
      "Web apps. One web app runs on every phone, tablet and laptop, can be found in search and shared as a link, and a fix is live the moment it ships rather than after app store review. The MVP is built so a native app can be added once the product has proved itself.",
  },
  {
    question: "What do I need before the sprint starts?",
    answer:
      "A clear idea of who the product is for and the problem it solves. You do not need designs, a written spec or a technical co-founder. Bring any sketches, competitor examples or existing code, and the discovery call turns them into an agreed scope.",
  },
  {
    question: "Can you build an MVP with AI features?",
    answer:
      "Yes. Several of our launches have AI at their core: ReelEstate turns listing photos into property videos and Viewlio gives YouTube creators AI analytics on their channels. The same sprint covers the AI pipeline, its costs and checks on its output.",
    link: {
      text: "How AI software development works, from coding agents to checking a model's output.",
      href: "/blog/ai-software-development",
    },
  },
  {
    question: "What happens after the MVP launches?",
    answer:
      "A week of handover and support for bug fixes and a smooth rollout, then the code, hosting and accounts are yours. You can book another sprint once real users show what to build next, or hand the codebase to your own developer.",
  },
  {
    question: "Who owns the MVP once it is built?",
    answer:
      "You do. The code lives in your repository, and the hosting, database and payment accounts are in your name and handed over at launch. Nothing is locked to us.",
  },
]

export default function MvpDevelopmentPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={page}
        nodes={[...services.map((service) => serviceJsonLd(page, service)), faqJsonLd(page, faqs)]}
      />
      <ScrollReveal />

      <LandingHero
        eyebrow={{ label: "Services", href: pages.services.path, current: "MVP development" }}
        tone="light"
        title={
          <>
            <span className="text-primary">MVP development</span>, launched in a 2 week sprint.
          </>
        }
        intro="Fixed-price MVP development services for UK startups, with payments live at launch."
        secondary={{ label: "See pricing", href: "#pricing" }}
        visual={<SprintVisual />}
        shape="growth"
      />
      <div aria-hidden="true" className="rail-joint" />

      <HubSection
        id="included"
        eyebrow="What you get"
        title="What every MVP launches with"
        intro="A product customers can sign up to and pay for, not a prototype to rebuild."
        items={launchKit}
      />

      <PricingSection
        title="Fixed-price MVP development"
        intro="Two sprints, priced before the build starts."
      />

      <ProcessSection
        title="From idea to launched MVP"
        intro={`Two calls, a ${calendarPackage.sprint} with Friday demos, then a week of support.`}
      />

      <FitCheckSection
        id="fit"
        eyebrow="Who it is for"
        title="Is an MVP sprint right for you?"
        intro="If it is the wrong tool for you, we will say so on the call."
        items={fitChecks}
        initial={fitInitial}
      />

      <StackSection
        title="Built on the stack you would hire for later"
        lead="Your MVP runs on the same production stack as established web products."
        text="TypeScript, Next.js and Postgres, hosted on infrastructure in your name. When the MVP works and you hire developers, they inherit a codebase they already know rather than a rebuild."
      />

      <WorkSection
        title="MVPs we have built and launched"
        intro="Each went from first sketch to live domain through the same sprint a client MVP does."
      />

      <ComparisonSection
        title="How an MVP studio compares with other MVP development options"
        intro="Agency-quality code at freelancer speed, for a fixed price."
      />

      <GuidesSection
        title="Plan your MVP before the call"
        intro="Free guides and tools for scoping and costing a first release."
        posts={guides}
        tools={tools}
      />

      <FaqSection
        faqs={faqs}
        intro="Cost, timeline, scope and what happens after launch."
      />

      <ContactSection
        title="Talk through your MVP"
        text="Tell us what you want to build. You will leave knowing what to build first and what it costs."
      />
    </main>
  )
}
