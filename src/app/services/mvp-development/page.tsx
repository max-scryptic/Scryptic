import { PageJsonLd } from "@/components/json-ld"
import { AboutSection } from "@/components/landing/about-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { FeatureGridSection, FitSection } from "@/components/landing/feature-grid-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import { PricingSection } from "@/components/landing/pricing-section"
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

const terminalLines = [
  { prompt: true, text: "scryptic scope --mvp" },
  { prompt: false, text: "one core user journey chosen" },
  { prompt: false, text: "nice-to-haves parked for v2" },
  { prompt: false, text: "fixed price agreed" },
  { prompt: true, text: "scryptic build --sprint 2w" },
  { prompt: false, text: "sign-in, payments and analytics wired" },
  { prompt: false, text: "launched on your domain" },
]

// What ships in every build, whichever package. Only claims the build delivers.
const launchKit = [
  {
    name: "Sign-in and accounts",
    text: "Secure sign-in, account settings and password resets, so the first customers can create an account on day one.",
  },
  {
    name: "Payments",
    text: "Stripe checkout and subscriptions when you charge, so the MVP can test whether people will pay, not just whether they will sign up.",
  },
  {
    name: "Product analytics",
    text: "Sign-ups, activation and the steps users drop out of, tracked from launch, so the next sprint is planned on evidence.",
  },
  {
    name: "A production database",
    text: "Postgres, with backups, designed so the features you add later extend the data rather than force a migration.",
  },
  {
    name: "Hosting on your accounts",
    text: "Deployed to your domain on infrastructure in your name, with a preview of every change before it goes live.",
  },
  {
    name: "Code you own",
    text: "TypeScript and Next.js in your own repository, readable by any developer you hire after us.",
  },
]

const fit = {
  good: {
    title: "A good fit if",
    items: [
      "You know who the product is for and the problem it solves",
      "You want real users and paying customers, not a clickable demo",
      "You would rather not hire a team or a technical co-founder yet",
      "You can make decisions quickly and join a call every Friday",
      "The product is a web app or SaaS that works in a browser",
    ],
  },
  bad: {
    title: "Not the right fit if",
    items: [
      "The idea is still a hunch with nobody to test it on",
      "You need a native iOS and Android app in the stores on day one",
      "The scope is a full platform that cannot be cut to one journey",
      "You want a long retainer before anything launches",
    ],
  },
}

const guides = postsBySlug([
  "how-to-build-an-mvp",
  "what-is-mvp-software",
  "mvp-software-development-example",
  "how-much-does-it-cost-to-build-an-app-uk",
  "saas-cost-before-and-after-launch",
  "web-app-or-mobile-app-first",
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
        eyebrow={{ label: "Services", href: pages.services.path }}
        title={
          <>
            <span className="text-[#c3caff]">MVP development</span>, launched in a 2 week sprint.
          </>
        }
        intro={`${siteConfig.name} builds MVPs for UK founders as production code: a fixed price agreed up front, a demo every Friday, and sign-in, payments and analytics live on launch day.`}
        secondary={{ label: "See pricing", href: "#pricing" }}
        terminal={terminalLines}
      />
      <div aria-hidden="true" className="rail-joint" />

      <FeatureGridSection
        id="included"
        eyebrow="What you get"
        title="What every MVP launches with"
        intro="A launched product that real customers can sign up to and pay for, not a prototype to rebuild later. Every build includes the essentials below."
        items={launchKit}
      />

      <PricingSection
        title="Fixed-price MVP development"
        intro="Two sprints, priced before the build starts. The discovery call settles which one fits your scope."
      />

      <ProcessSection
        title="From idea to launched MVP"
        intro={`Two calls to agree the scope, a ${calendarPackage.sprint} with a demo every Friday, then handover and a week of support.`}
      />

      <FitSection
        id="fit"
        eyebrow="Who it is for"
        title="Is an MVP sprint right for you?"
        intro="A sprint works best for founders who know their customer and want to test the idea with a real product. It is the wrong tool for a few situations, and we will say so on the call."
        good={fit.good}
        bad={fit.bad}
      />

      <StackSection
        title="Built on the stack you would hire for later"
        lead="Your MVP runs on the same production stack as established web products."
        text="TypeScript, Next.js and Postgres, hosted on infrastructure in your name. When the MVP works and you hire developers, they inherit a codebase they already know rather than a rebuild."
      />

      <WorkSection
        title="MVPs we have built and launched"
        intro="Each of these went from first sketch to live domain through the same sprint a client MVP does. The case studies cover the problem, the product and the engineering."
      />

      <ComparisonSection
        title="How an MVP studio compares with other MVP development options"
        intro={`Most founders weigh up an in-house hire, an agency, a freelancer or AI tools. ${siteConfig.name} combines agency-quality code with freelancer speed, at a fixed price.`}
      />

      <AboutSection />

      <GuidesSection
        title="Plan your MVP before the call"
        intro="Free guides and tools from the studio on scoping, costing and building a first release."
        posts={guides}
        tools={tools}
      />

      <FaqSection
        faqs={faqs}
        intro="What founders ask most about MVP development: cost, timeline, scope and what happens after launch."
      />

      <ContactSection
        title="Talk through your MVP"
        text="Tell us what you want to build and who it is for. You will leave the call knowing what to build first and what it would cost, whether or not you build it with us."
      />
    </main>
  )
}
