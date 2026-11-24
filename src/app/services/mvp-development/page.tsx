import { PageJsonLd } from "@/components/json-ld"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import type { IconName } from "@/components/landing/icons"
import { SprintVisual } from "@/components/landing/hero-visuals"
import { PricingSection } from "@/components/landing/pricing-section"
import { FitCheckSection, HubSection, OptionsSection, type OptionRow } from "@/components/landing/service-sections"
import { ProcessSection } from "@/components/landing/process-section"
import { StackSection } from "@/components/landing/stack-section"
import { WorkSection } from "@/components/landing/work-section"
import { PixelIn } from "@/components/pixel-in"
import { ScrollReveal } from "@/components/scroll-reveal"
import { postsBySlug } from "@/lib/blog"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, pages } from "@/lib/seo"
import { extendedMvp, afterLaunchAnswer, supportPriceSentence, foundingOfferSentence, mvp, services } from "@/lib/services"
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

// The usual routes to a first release, in words. Figures for agencies are the
// ones UK studios publish, as compared in the best-saas-development-company post.
const optionColumns = ["What you get", "Price", "Time to launch", "Who owns the code"]
const options: OptionRow[] = [
  {
    name: `${siteConfig.name} MVP sprint`,
    cells: [
      "One core journey as production code, with sign-in, payments and analytics live",
      `${mvp.price} or ${extendedMvp.price} + VAT, fixed before the build`,
      "2 or 3 weeks, then a week of support",
      "You, from launch day",
    ],
  },
  {
    name: "MVP development agency",
    cells: [
      "A larger first release from a team, often with a project manager and a retainer after launch",
      "Published prices run from about £8,000 to over $50,000 (one firm prices in dollars); some bill for time",
      "Usually 5 to 12 weeks in the offers we compared",
      "Check the contract; on a Bubble build the app stays on the platform",
    ],
  },
  {
    name: "Freelance developer",
    cells: [
      "Whatever you can specify, test and manage yourself",
      "A day rate, billed for the time it takes",
      "Depends on their availability and your spec",
      "You, if the contract assigns it",
    ],
  },
  {
    name: "No-code or AI builder",
    cells: [
      "A working version you build and maintain yourself",
      "Monthly subscriptions, plus your own time",
      "Days to weeks",
      "No-code platforms keep the app; AI builders give you code to harden",
    ],
  },
  {
    name: "In-house hire",
    cells: [
      "A developer who stays on the product after launch",
      "A salary, plus recruitment time and cost",
      "Months, once hiring is counted",
      "You",
    ],
  },
]

const guides = postsBySlug([
  "how-to-build-an-mvp",
  "what-is-mvp-software",
  "mvp-software-development-example",
  "how-much-does-it-cost-to-build-an-app-uk",
  "saas-cost-before-and-after-launch",
  "best-saas-development-company",
  "mvp-agile",
  "vibe-coding-to-production",
  "turn-automations-into-a-saas-product",
])

const tools = [freeTool("mvp-cost-calculator"), freeTool("mvp-scope-planner")]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
// Worded for this page rather than copied from the home page's FAQ.
const faqs: Faq[] = [
  {
    question: "What is MVP development?",
    answer:
      "MVP development means designing, building and launching the first version of a product with only the features needed to test it with paying customers. At Scryptic that first version is production code, so the next release extends it rather than replacing it.",
    link: {
      text: "How to build an MVP, step by step.",
      href: "/blog/how-to-build-an-mvp",
    },
  },
  {
    question: "How much does MVP development cost in the UK?",
    answer: `With ${siteConfig.name} it is a fixed price, plus VAT. ${services.map((s) => `The ${s.name} is ${s.price} for a ${s.sprint}`).join(", and ")}.${foundingOfferSentence()}${supportPriceSentence()} The price is agreed after the discovery call, before any build starts, and does not change mid-sprint.`,
    link: {
      text: "What it costs to build an app in the UK, by route and type of app.",
      href: "/blog/how-much-does-it-cost-to-build-an-app-uk",
    },
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
    link: {
      text: "Plan your first release with the free MVP Scope Planner.",
      href: "/tools/mvp-scope-planner",
    },
  },
  {
    question: "Is an MVP the same as a prototype?",
    answer:
      "No. A prototype shows how a product might work and is usually thrown away. An MVP is a working product that real users sign up to and pay for. It is smaller than the full vision, but built properly enough to grow into it.",
    link: {
      text: "What MVP software is, and how it differs from a prototype.",
      href: "/blog/what-is-mvp-software",
    },
  },
  {
    question: "How do MVP development companies differ?",
    answer:
      "The biggest differences are whether they write code or build on a platform such as Bubble, whether they fix the price or bill for time, and what support they sell after launch. Published UK MVP timelines run from two weeks to about twelve, mostly because of how much the first release includes and how many people build it. Our guide to choosing a SaaS development company compares six UK studios side by side.",
    link: {
      text: "Six UK SaaS and MVP development companies compared.",
      href: "/blog/best-saas-development-company",
    },
  },
  {
    question: "Do you build web apps or mobile apps?",
    answer:
      "Web apps. One web app runs on every phone, tablet and laptop, can be found in search and shared as a link, and a fix is live the moment it ships rather than after app store review. The MVP is built so a native app can be added once the product has proved itself.",
    link: {
      text: "How our mobile app development works.",
      href: pages.mobileAppDevelopment.path,
    },
  },
  {
    question: "What do I need before the sprint starts?",
    answer:
      "A clear idea of who the product is for and the problem it solves. You do not need designs, a written spec or a technical co-founder. Bring any sketches, competitor examples or existing code, and the discovery call turns them into an agreed scope.",
    link: {
      text: "Already built it in Lovable, Bubble or another builder? How our no-code app migration works.",
      href: pages.noCodeMigration.path,
    },
  },
  {
    question: "Can you build an MVP with AI features?",
    answer:
      "Yes. Several of our launches have AI at their core: ReelEstate turns listing photos into property videos and Viewlio gives YouTube creators AI analytics on their channels. The same sprint covers the AI pipeline, its costs and checks on its output.",
    link: {
      text: "What building your own AI involves, from the model to the app around it.",
      href: "/blog/build-your-own-ai",
    },
  },
  {
    question: "What happens after launch, and what does support cost?",
    answer: afterLaunchAnswer(),
    link: { text: "See the support plan and the other options after launch.", href: pages.pricing.path },
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
        nodes={[
          ...services.map((service) => serviceJsonLd(page, service)),
          faqJsonLd(page, faqs),
        ]}
      />
      <ScrollReveal />

      <LandingHero
        tone="light"
        title={
          <>
            <PixelIn className="text-primary">MVP development</PixelIn> for UK startups, in a 2 week sprint.
          </>
        }
        intro="Fixed-price MVP development services from a UK studio, with sign-in and payments live at launch."
        secondary={{ label: "See pricing", href: "#pricing" }}
        visual={<SprintVisual />}
        shape="growth"
      />

      <HubSection
        id="included"
        eyebrow="What you get"
        title="What every MVP launches with"
        items={launchKit}
      />

      <PricingSection
        title="Fixed-price MVP development"
      />

      <ProcessSection
        title="From idea to launched MVP"
      />

      <FitCheckSection
        id="fit"
        eyebrow="Who it is for"
        title="Is an MVP sprint right for you?"
        items={fitChecks}
        initial={fitInitial}
      />

      <StackSection
        title="Built on the stack you would hire for later"
      />

      <WorkSection
        title="MVPs we have built and launched"
      />

      <OptionsSection
        id="options"
        eyebrow="Your options"
        title="MVP development companies, freelancers and builders compared"
        caption="Five ways to get an MVP built, compared on what you get, price, time to launch and who owns the code"
        columns={optionColumns}
        rows={options}
      />

      <ComparisonSection
        title="How a studio sprint compares, at a glance"
      />

      <GuidesSection
        title="Plan your MVP before the call"
        posts={guides}
        tools={tools}
      />

      <FaqSection
        faqs={faqs}
      />

      <ContactSection
        title="Talk through your MVP"
        text="Tell us what you want to build. You will leave knowing what to build first and what it costs."
      />
    </main>
  )
}
