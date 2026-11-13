import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import type { AppLayer } from "@/components/landing/app-layers"
import { ComparisonSection, type ComparisonRow } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import { MigrationVisual } from "@/components/landing/hero-visuals"
import { PricingSection } from "@/components/landing/pricing-section"
import { calendarPackage, ProcessSection, type ProcessCalendar } from "@/components/landing/process-section"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { FitCheckSection, LayersSection } from "@/components/landing/service-sections"
import { StackSection } from "@/components/landing/stack-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { postCategories, postsBySlug, postsInSeries } from "@/lib/blog"
import { inset } from "@/lib/frame"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, pages } from "@/lib/seo"
import { launchOffer, offerPrice, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"

const page = pages.noCodeMigration

export const metadata = createMetadata(page)

// The app as layers, top to bottom, and where each ends up. Payments only stay put when they already run through Stripe.
const layers: AppLayer[] = [
  { icon: "link", from: "Page URLs", to: "Permanent redirects", check: "Every URL mapped" },
  { icon: "screen", from: "Screens", to: "Rebuilt to match", check: "Familiar to your users", ghost: true },
  { icon: "flow", from: "Workflows", to: "Tested code", check: "Tests pass" },
  { icon: "users", from: "Users and roles", to: "The same accounts", check: "Every role tested" },
  { icon: "card", from: "Stripe customers", to: "The same Stripe account", check: "Every customer linked" },
  { icon: "file", from: "Files and uploads", to: "Storage in your name", check: "Every file accounted for" },
  { icon: "database", from: "Data tables", to: "A Postgres database", check: "Row counts match" },
]

// The same sprint as an MVP build, with an audit before it and the cutover at the end.
const migrationCalendar: ProcessCalendar = [
  {
    week: "Before",
    note: "Booked around you",
    events: [
      { label: "Initial call", day: 1, span: 1, tone: "call" },
      { label: "App and data audit", day: 3, span: 1, tone: "call" },
      { label: "Scope and price agreed", day: 4, span: 2, tone: "call" },
    ],
  },
  {
    week: "Week 1",
    note: "Rebuild",
    events: [
      { label: "Rebuild begins", day: 1, span: 4, tone: "build" },
      { label: "Demo", day: 5, span: 1, tone: "demo" },
    ],
  },
  {
    week: "Week 2",
    note: "Rehearse",
    events: [
      { label: "Data rehearsals and iteration", day: 1, span: 4, tone: "iterate" },
      { label: "Demo + cutover", day: 5, span: 1, tone: "demo" },
    ],
  },
  {
    week: "Week 3",
    note: "Live",
    events: [
      { label: "Full handover", day: 1, span: 1, tone: "handover" },
      { label: "1 week of support", day: 2, span: 4, tone: "support" },
    ],
  },
]

// The self-check in the fit section. The ones in fitInitial start ticked. A low
// score is its own answer, so the verdicts say when to stay put.
const fitChecks = [
  "Fees rise faster than revenue",
  "The builder blocks your roadmap",
  "Investors need you to own the code",
  "Users notice it slowing down",
  "You are about to hire developers",
]
const fitInitial = [0, 1, 3]
const fitVerdicts = {
  none: "Tick the ones that are true.",
  all: "Time to move. Book the audit.",
  strong: "Worth moving. Book the audit.",
  half: "Close. The audit will settle it.",
  few: "Probably stay put for now.",
}

const comparison: ComparisonRow[] = [
  {
    name: "Speed",
    text: "Moved after a 2 or 3 week sprint, not a long rebuild",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Data and users",
    text: "Moved across with a rehearsed, checked plan",
    values: { "In-house hire": true, Agency: true, Freelancer: false, "AI-only tools": false },
  },
  {
    name: "Production ready",
    text: "Security and backups set up from the start",
    values: { "In-house hire": true, Agency: true, Freelancer: false, "AI-only tools": false },
  },
  {
    name: "Yours to own",
    text: "Code and accounts handed over to you",
    values: { "In-house hire": true, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Cost vs value",
    text: "A fixed price for the whole move",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
]

const migrationGuides = postsInSeries("migration")

const guides = postsBySlug([
  "vibe-coding-to-production",
  "google-sheets-as-a-database",
  "turn-automations-into-a-saas-product",
  "n8n-alternatives",
  "supabase-vs-firebase",
  "how-much-does-it-cost-to-build-an-app-uk",
])

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs: Faq[] = [
  {
    question: "How much does it cost to migrate a no-code app?",
    answer: `Migrations are priced like our MVPs: a fixed price, plus VAT. ${services.map((s) => `The ${s.name} is ${s.price} for a ${s.sprint}`).join(", and ")}.${launchOffer ? ` For a limited time there is ${launchOffer.percentOff}% off ${launchOffer.appliesTo}, bringing them to ${services.map(offerPrice).join(" and ")}.` : ""} Which one fits depends on the screens, workflows and integrations your app has, which the audit works out before a price is agreed.`,
  },
  {
    question: "How long does a migration take?",
    answer:
      "Two or three weeks of build once the scope is agreed, then a week of handover and support. Your current app keeps running throughout and is only switched off once the new one is live and checked.",
  },
  {
    question: "Will my users have to sign up again?",
    answer:
      "No. Accounts and their data move across. Most builders do not export password hashes, so at launch users get an email with a password reset or a one-time sign-in link, with a heads-up a few days before.",
  },
  {
    question: "Could we lose data in the move?",
    answer:
      "Not with a rehearsed migration. The data is exported, mapped to the new database and imported several times before the real move, with counts and spot checks each time. The final export runs at cutover, so nothing written in the meantime is missed.",
  },
  {
    question: "Can I just export the code from my no-code tool?",
    answer:
      "It depends on the tool. AI app builders such as Lovable, Bolt.new, v0 and Replit write real code, so the work is hardening and owning it. Bubble, Adalo and Glide keep the app on their platform, so it is rebuilt and the data moved. Tools with a code export, such as FlutterFlow and WeWeb, give a starting point that usually needs work before production.",
    link: {
      text: "Lovable, Bolt, Replit, Base44 and v0 compared on code export and production.",
      href: "/blog/lovable-vs-bolt-vs-replit-vs-base44-vs-v0",
    },
  },
  {
    question: "What will my app be rebuilt with?",
    answer:
      "TypeScript, Next.js and Postgres, hosted on infrastructure in your name, with Stripe for payments. It is a mainstream stack, so any web developer you hire later can work on it.",
    link: {
      text: "How our web app development works.",
      href: pages.webAppDevelopment.path,
    },
  },
  {
    question: "Will my search rankings survive the move?",
    answer:
      "Yes, as long as every old URL keeps its address or permanently redirects to its closest new page. We map the URLs before the move and set the redirects at launch. Often a marketing site on Webflow or Framer can stay where it is, with the app built next to it.",
  },
  {
    question: "Should I migrate at all?",
    answer:
      "Not always. If the app does its job, the costs are fine and nothing on the roadmap is blocked, staying put is cheaper. Moving makes sense when fees climb with usage, the platform blocks features, or investors and customers ask who owns the code. The audit gives a straight answer either way.",
    link: {
      text: "Take the free build or no-code quiz.",
      href: "/tools/build-or-no-code",
    },
  },
  {
    question: "Can you improve the app while migrating it?",
    answer:
      "Yes, within the sprint's scope. A rebuild is a good moment to drop features nobody uses and fix the workflows users complain about, but keeping the first release close to the old app means users recognise it. The agreed scope says which changes are in.",
  },
  {
    question: "Who owns the app after the migration?",
    answer:
      "You do. The code lives in your repository, and the hosting, database, storage and payment accounts are in your name and handed over at launch. Nothing is locked to us or to a platform.",
  },
]

/**
 * Every tool with a migration guide, grouped by kind of tool. Each tile links
 * to that tool's guide, so the page doubles as the index of the series.
 */
function ToolsSection() {
  return (
    <LandingSection id="tools" labelledBy="tools-heading">
      <SectionHeading className={inset} eyebrow="Where from" title="Apps we migrate" id="tools-heading">
        {migrationGuides.length} builders and platforms, each with a free step by step migration guide.
      </SectionHeading>
      <div className="corners guides border border-border bg-card">
        {postCategories.map((category) => {
          const categoryPosts = migrationGuides.filter((post) => post.category === category.name)
          if (categoryPosts.length === 0) return null

          return (
            <div
              key={category.name}
              className="grid gap-6 border-t border-border p-6 first:border-t-0 sm:p-8 lg:grid-cols-[1fr_2fr] lg:gap-10"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl tracking-tight">{category.name}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{category.text}</p>
              </div>
              <ul data-reveal="children" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categoryPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full items-center gap-2.5 border border-border bg-background p-2.5 transition-colors hover:border-primary/50 sm:gap-3 sm:p-3"
                    >
                      {post.logo && (
                        <span
                          aria-hidden="true"
                          className="flex size-8 shrink-0 items-center justify-center border border-primary/20 bg-primary/10 p-1.5 sm:size-10 sm:p-2"
                        >
                          <span
                            className="size-full bg-primary mask-contain mask-center mask-no-repeat"
                            style={{ maskImage: `url(${post.logo.src})` }}
                          />
                        </span>
                      )}
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm font-medium break-words sm:text-base">{post.topic}</span>
                        <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                          <span className="sm:hidden">Guide</span>
                          <span className="hidden sm:inline">Migration guide</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </LandingSection>
  )
}

export default function NoCodeMigrationPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={page}
        nodes={[
          // The same packages as an MVP build, sold here as a migration.
          ...services.map((service) =>
            serviceJsonLd(page, { ...service, serviceType: "No-code app migration" }),
          ),
          faqJsonLd(page, faqs),
        ]}
      />
      <ScrollReveal />

      <LandingHero
        eyebrow={{ label: "Services", href: pages.services.path, current: "No-code migration" }}
        tone="light"
        title={
          <>
            <span className="text-primary">No-code app migration</span>, without losing a user.
          </>
        }
        intro={`${siteConfig.name} moves Bubble, Lovable, Glide and Airtable apps to code you own, with your users and data brought across.`}
        secondary={{ label: "See pricing", href: "#pricing" }}
        visual={<MigrationVisual />}
        shape="migrate"
      />
      <div aria-hidden="true" className="rail-joint" />

      <ToolsSection />

      <LayersSection
        id="moves"
        eyebrow="What moves"
        title="Everything comes with you"
        intro="The whole app moves, not just its screens, and is checked before the old one is switched off."
        layers={layers}
      />

      <PricingSection
        title="Migrations are priced like an MVP"
        intro="The same two fixed-price sprints. The audit settles which one fits."
      />

      <ProcessSection
        title="From audit to cutover"
        intro={`An audit, a ${calendarPackage.sprint} with Friday demos, then cutover and a week of support.`}
        calendar={migrationCalendar}
        note={`An example schedule for a migration on the ${calendarPackage.name} package. Larger apps take the Extended MVP, which adds a second week of development.`}
      />

      <FitCheckSection
        id="fit"
        eyebrow="Migrate or stay"
        title="Should you migrate at all?"
        intro="Not every app should move. If it works, the costs are fine and nothing is blocked, stay where you are."
        items={fitChecks}
        initial={fitInitial}
        cta={{ label: "Book a free app audit call", href: "#contact" }}
        verdicts={fitVerdicts}
      />

      <StackSection
        title="Where your app moves to"
        lead="A mainstream production stack in your name, with no builder fees and code any developer can pick up."
      />

      <ComparisonSection
        title="Who should move your app?"
        intro="A fixed price, with a tested plan for your data and users."
        rows={comparison}
      />

      <GuidesSection
        title="More on moving to code"
        intro="For apps that started in a spreadsheet or an automation tool, where the data lands and what a build costs, plus a quiz on whether to move."
        posts={guides}
        tools={[freeTool("build-or-no-code")]}
        more={{ label: "All migration guides", href: `${pages.blog.path}#migration` }}
      />

      <FaqSection
        faqs={faqs}
        intro="What founders ask before moving off a no-code or AI builder."
      />

      <ContactSection
        title="Talk through your migration"
        text="Walk us through your app. We will look at its data and accounts and say whether moving is worth it."
      />
    </main>
  )
}
