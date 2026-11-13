import { PageJsonLd } from "@/components/json-ld"
import type { AppLayer } from "@/components/landing/app-layers"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import { WebAppVisual } from "@/components/landing/hero-visuals"
import type { IconName } from "@/components/landing/icons"
import { PricingSection } from "@/components/landing/pricing-section"
import { calendarPackage, ProcessSection } from "@/components/landing/process-section"
import { FitCheckSection, HubSection, LayersSection } from "@/components/landing/service-sections"
import { WorkSection } from "@/components/landing/work-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { postsBySlug } from "@/lib/blog"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, pages } from "@/lib/seo"
import { launchOffer, offerPrice, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"

const page = pages.webAppDevelopment

export const metadata = createMetadata(page)

// The kinds of web app we build, each one workflow at its core. The first
// three sit left of the product in the hub, the last three right.
const kinds = [
  { icon: "users", name: "Customer portals", text: "Clients see their own orders, files and invoices", tag: "Portal" },
  { icon: "flow", name: "Booking systems", text: "Slots, confirmations and reminders, no back and forth", tag: "Bookings" },
  { icon: "database", name: "Internal tools", text: "The spreadsheet your team runs on, as an app", tag: "Ops" },
  { icon: "card", name: "SaaS products", text: "Accounts, subscriptions and the core feature", tag: "Stripe" },
  { icon: "chart", name: "Dashboards", text: "Your data as reports your team reads", tag: "Reports" },
  { icon: "spark", name: "AI features", text: "A model doing the job, its output checked", tag: "AI" },
] satisfies { icon: IconName; name: string; text: string; tag: string }[]

// A web app as layers, top to bottom, and what each one is built with. Only
// claims every build delivers.
const layers: AppLayer[] = [
  { icon: "screen", from: "Screens", to: "Next.js and React", check: "Works on a phone", ghost: true },
  { icon: "flow", from: "Business rules", to: "Tested TypeScript", check: "Tests pass" },
  { icon: "users", from: "Users and roles", to: "Sign-in and permissions", check: "Every role tested" },
  { icon: "card", from: "Payments", to: "Stripe, in your account", check: "Failed payments handled" },
  { icon: "file", from: "Files", to: "Storage in your name", check: "Private by default" },
  { icon: "database", from: "Data", to: "Postgres, backed up", check: "A backup restored" },
  { icon: "globe", from: "Hosting", to: "Your domain and account", check: "Live on launch day" },
]

// The self-check in the fit section. The ones in fitInitial start ticked.
const fitChecks = [
  "One workflow matters most",
  "It runs in a browser",
  "You want to own the code",
  "You can join a call every Friday",
  "A spreadsheet or tool is creaking",
]
const fitInitial = [0, 1, 3]

const guides = postsBySlug([
  "web-application-development-services",
  "how-to-build-a-web-app",
  "how-to-choose-an-app-development-company-uk",
  "web-app-or-mobile-app-first",
  "mobile-web-development",
  "progressive-web-app-development-company",
  "dashboard-app-design",
  "build-a-web-app-with-python",
  "reactjs-web-development-company-hiring-mistakes",
])

const tools = [freeTool("build-or-no-code"), freeTool("mvp-cost-calculator")]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
// Worded for this page rather than copied from the MVP page's FAQ.
const faqs: Faq[] = [
  {
    question: "What is web app development?",
    answer:
      "Web app development is designing, building and running software people use in a browser: the screens, the business rules behind them, the database and the hosting. A website mostly presents information, while a web app lets someone get a job done, such as booking a slot or approving an invoice.",
    link: {
      text: "What web application development involves, from architecture to launch.",
      href: "/blog/web-application-development-services",
    },
  },
  {
    question: "How much does web app development cost in the UK?",
    answer: `With ${siteConfig.name} it is a fixed price, plus VAT. ${services.map((s) => `The ${s.name} package is ${s.price} for a ${s.sprint}`).join(", and ")}.${launchOffer ? ` For a limited time there is ${launchOffer.percentOff}% off ${launchOffer.appliesTo}, bringing them to ${services.map(offerPrice).join(" and ")}.` : ""} The packages are named for a first release, and a web app is priced the same way: the scope and price are agreed after the discovery call, before any build starts.`,
    link: {
      text: "What it costs to build an app in the UK, by route and type of app.",
      href: "/blog/how-much-does-it-cost-to-build-an-app-uk",
    },
  },
  {
    question: "How long does it take to build a web app?",
    answer:
      "Two or three weeks for a first release scoped to one workflow, then a week of handover and support. Larger apps are built in stages: the first sprint ships the workflow that matters most, and later sprints add the next ones once people are using it.",
  },
  {
    question: "What kinds of web app do you build?",
    answer:
      "Apps that do one job well for your customers or your team: customer portals, booking and scheduling systems, internal tools that replace a shared spreadsheet, SaaS products with subscriptions, dashboards and reporting, and products with AI at their core. If it runs in a browser and has users who sign in, it is likely a fit.",
    link: {
      text: "How our MVP development works for a new SaaS product.",
      href: pages.mvpDevelopment.path,
    },
  },
  {
    question: "Do you build websites as well as web apps?",
    answer:
      "We build the app rather than the marketing site. Most products need both, and they are separate pieces of work: a marketing site is usually best kept on a builder such as Webflow or Framer, with the app on its own subdomain, such as app.yourcompany.com, and links between the two.",
    link: {
      text: "How to build an app next to a Framer site.",
      href: "/blog/migrate-from-framer",
    },
  },
  {
    question: "Will the web app work on phones?",
    answer:
      "Yes. Every screen is built to work on a phone, a tablet and a laptop, and tested on a phone before launch. One web app reaches every device from a single link, so for most first releases a separate app store app can wait until the product has proved itself.",
    link: {
      text: "Web app or mobile app first? Find your situation.",
      href: "/blog/web-app-or-mobile-app-first",
    },
  },
  {
    question: "Can you take over an existing web app?",
    answer:
      "Yes. We review the code or the prototype during discovery and build on the parts worth keeping. Apps made with no-code and AI builders such as Bubble, Lovable or Replit can be moved to production code, with your data and users brought across.",
    link: {
      text: "How our no-code app migration works.",
      href: pages.noCodeMigration.path,
    },
  },
  {
    question: "Who builds the web app?",
    answer: `${founder.name}, the founder, a full-stack developer with five years of experience building software for enterprise clients and startups. You work with the same person from the discovery call to launch day, with a video demo every Friday.`,
  },
  {
    question: "Who owns the web app once it is built?",
    answer:
      "You do. The code lives in your repository, and the hosting, database, storage and payment accounts are in your name and handed over at launch. Any developer you hire later can run and deploy it without us.",
  },
]

export default function WebAppDevelopmentPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={page}
        nodes={[
          // The same packages as an MVP build, sold here as a web app.
          ...services.map((service) =>
            serviceJsonLd(page, { ...service, serviceType: "Web application development" }),
          ),
          faqJsonLd(page, faqs),
        ]}
      />
      <ScrollReveal />

      <LandingHero
        eyebrow={{ label: "Services", href: pages.services.path, current: "Web app development" }}
        tone="light"
        title={
          <>
            <span className="text-primary">Custom web app development</span>, live in weeks.
          </>
        }
        intro="A web app development agency for UK teams, building one workflow as production code at a fixed price."
        secondary={{ label: "See pricing", href: "#pricing" }}
        visual={<WebAppVisual />}
        shape="panels"
      />
      <div aria-hidden="true" className="rail-joint" />

      <HubSection
        id="what-we-build"
        eyebrow="What we build"
        title="Web apps built around one job"
        intro="Each does a real job for your customers or your team, from sign-in to the finished task."
        items={kinds}
        core={{ name: "Your web app", tag: "One workflow" }}
      />

      <LayersSection
        id="layers"
        eyebrow="How it is built"
        title="What goes into a web app"
        intro="A web app is more than its screens. Every layer is built, tested and handed over in your name."
        layers={layers}
      />

      <PricingSection
        title="Fixed-price web app development"
        intro="Two sprints for the first release of your web app, priced before the build starts."
      />

      <ProcessSection
        title="From brief to live web app"
        intro={`A discovery call, a ${calendarPackage.sprint} with a demo every Friday, then a week of support.`}
      />

      <FitCheckSection
        id="fit"
        eyebrow="Who it is for"
        title="Is a sprint right for your web app?"
        intro="It suits a clearly scoped first release. If you need a team for years, we will say so on the call."
        items={fitChecks}
        initial={fitInitial}
      />

      <WorkSection
        title="Web apps we have built and launched"
        intro="Dashboards, AI tools and team workspaces, each taken from first sketch to a live domain."
      />

      <ComparisonSection
        title="Who should build your web app?"
        intro="Agency-grade code at a freelancer's pace, with the price fixed before the build."
      />

      <GuidesSection
        title="Plan your web app before the call"
        intro="Guides on scoping, designing and building a web app and choosing who builds it, plus two free tools."
        posts={guides}
        tools={tools}
      />

      <FaqSection
        faqs={faqs}
        intro="Cost, timeline, phones, websites and who owns the result."
      />

      <ContactSection
        title="Talk through your web app"
        text="Walk us through the workflow. You will leave knowing what the first release covers and what it costs."
      />
    </main>
  )
}
