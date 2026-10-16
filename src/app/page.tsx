import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { PageJsonLd } from "@/components/json-ld"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/button"
import { VoxelField } from "@/components/voxel-field"
import { createMetadata, pages } from "@/lib/seo"
import { services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { stack } from "@/lib/stack"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"
import { featuredCaseStudies } from "@/lib/work"

// The search title leads with the brand, then says what we do. pageTitle()
// drops the repeated app name it would append, so this renders as written. The
// registry title stays "Scryptic" for breadcrumbs, JSON-LD and llms.txt.
export const metadata = createMetadata({
  ...pages.home,
  title: `${siteConfig.name} | MVP and app development studio`,
})

// The process timetable: the preferred package's 2 week sprint and the week of
// handover after it. `start` and `weeks` place each step's bar on the week grid.
const timetablePackage = services.find((s) => s.preferred) ?? services[0]
const timetableWeeks = 3

const steps = [
  {
    name: "Develop",
    text: "Our team builds your MVP to the agreed scope.",
    bar: "Build",
    tone: "build",
    start: 1,
    weeks: 1,
  },
  {
    name: "Iterate",
    text: "We refine it on your feedback, then launch.",
    bar: "Iteration",
    tone: "iterate",
    start: 2,
    weeks: 1,
  },
  {
    name: "Handover",
    text: "Live, with bug fixes and a smooth rollout.",
    bar: "Handover",
    tone: "live",
    start: 3,
    weeks: 1,
  },
] as const

// Bar and Friday-diamond colours for each kind of timetable step.
const stepTones = {
  build: { bar: "bg-primary text-primary-foreground", mark: "bg-primary-foreground/80" },
  iterate: {
    bar: "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground",
    mark: "bg-primary dark:bg-foreground/80",
  },
  live: { bar: "bg-chart-2 text-[#14131b]", mark: "bg-[#14131b]/70" },
}

// The comparison table. `scryptic` is always true, so it is drawn from the
// column rather than stored per row.
const alternatives = ["In-house hire", "Agency", "Freelancer", "AI-only tools"] as const

const comparison: {
  name: string
  text: string
  values: Record<(typeof alternatives)[number], boolean>
}[] = [
  {
    name: "Speed",
    text: "Launched after a 2 or 3 week sprint, not a hiring round",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Quality",
    text: "Production code that holds up with real users",
    values: { "In-house hire": true, Agency: true, Freelancer: false, "AI-only tools": false },
  },
  {
    name: "Flexibility",
    text: "Priorities revisited every week as you learn",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": false },
  },
  {
    name: "Yours to own",
    text: "Code and accounts handed over to you",
    values: { "In-house hire": true, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Cost vs value",
    text: "A fixed price for a launched product",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs = [
  {
    question: "How much does it cost to build an app with Scryptic?",
    answer: `There are two fixed prices, both plus VAT. ${services.map((s) => `The ${s.name} is ${s.price}, a ${s.sprint}`).join(". ")}. Both end with a week of handover after launch for bug fixes and a smooth rollout. The discovery call settles which one fits, so the price is agreed before any build starts.`,
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
      "Yes. Apps from AI app builders such as Lovable, Bolt.new, v0 and Replit are real code, so the move is usually about owning and hardening what is there. No-code tools such as Bubble, Adalo and Glide keep the app on their platform, so the move is a planned rebuild that brings your data and users across. Enterprise platforms such as OutSystems are rebuilt app by app. Our free migration guides cover seventeen tools step by step.",
  },
  {
    question: "Can you work on an existing app or codebase?",
    answer:
      "Yes. We review existing code, infrastructure and prototypes during discovery. Often the best plan is to build on what you have rather than start again, and the agreed scope says which parts we would keep, fix or replace.",
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

const terminalLines = [
  { prompt: true, text: "scryptic discover" },
  { prompt: false, text: "goals, users and constraints mapped" },
  { prompt: false, text: "stack and architecture chosen" },
  { prompt: false, text: "first release scoped and priced" },
  { prompt: true, text: "scryptic ship --to market" },
  { prompt: false, text: "progress reviewed every Friday" },
  { prompt: false, text: "launched in a 2 week sprint" },
]

function SectionHeading({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  id: string
}) {
  return (
    <div data-reveal="children" className="flex max-w-2xl flex-col gap-4">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
      <h2 id={id} className="text-3xl tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-lg text-pretty text-muted-foreground">{children}</p>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 size-4 shrink-0 text-primary"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ComparisonMark({ value, highlight = false }: { value: boolean; highlight?: boolean }) {
  return (
    <>
      <span className="sr-only">{value ? "Yes" : "No"}</span>
      {highlight ? (
        <span
          aria-hidden="true"
          className="reveal-pop mx-auto flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={value ? 2.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("mx-auto size-5", value ? "text-foreground" : "text-muted-foreground/60")}
        >
          {value ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
        </svg>
      )}
    </>
  )
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={pages.home}
        nodes={[
          ...services.map((service) => serviceJsonLd(pages.home, service)),
          faqJsonLd(pages.home, faqs),
        ]}
      />
      <ScrollReveal />

      {/* Hero: a full-width Lapis band, rounded at the bottom, the same Lapis in both themes. */}
      <section className="relative isolate overflow-hidden rounded-b-3xl bg-[#2b3fd6] px-4 pt-36 pb-24 text-white sm:rounded-b-[2.5rem] sm:px-6 sm:pt-44 sm:pb-32">
        <VoxelField
          faces={["fill-white/25", "fill-white/12", "fill-white/5"]}
          className="hero-parallax absolute top-0 right-0 -z-10 h-[540px] w-[960px] mask-b-from-[110px] mask-b-to-[200px] sm:right-auto sm:left-1/2 sm:h-[900px] sm:w-[1600px] sm:-translate-x-1/2 sm:mask-none"
        />
        <div className="hero-recede mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="hero-rise flex flex-col items-start gap-7">
            <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">
              From idea to{" "}
              <span className="text-[#c3caff]">MVP</span>
              , without hiring a dev team.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-white/80">
              {siteConfig.name} is an MVP and app development studio in Brighton, building web apps
              and SaaS products for UK founders, with an MVP launched in a 2 week sprint.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={pages.bookCall.path} />}
                className="h-11 rounded-full bg-white px-5 text-base text-[#2b3fd6] hover:bg-white/90"
              >
                Book a discovery call
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/#services" />}
                className="h-11 rounded-full border-white/40 bg-transparent px-5 text-base text-white hover:bg-white/10 hover:text-white dark:border-white/40 dark:bg-transparent dark:hover:bg-white/10"
              >
                See pricing
              </Button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hero-card w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/25"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="hero-terminal flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed">
              {terminalLines.map((line) => (
                <p
                  key={line.text}
                  className={cn(
                    "flex gap-3",
                    line.prompt ? "text-foreground [&:not(:first-child)]:mt-3" : "text-muted-foreground",
                  )}
                >
                  <span className="text-primary">{line.prompt ? "$" : "✓"}</span>
                  {line.text}
                </p>
              ))}
              <span className="mt-1 h-4 w-2 animate-pulse bg-primary motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        aria-labelledby="services-heading"
        id="services"
        className="scroll-mt-28 px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <SectionHeading eyebrow="Pricing" title="A fully built MVP, ready to take to market" id="services-heading">
            Two fixed-price sprints, agreed before the build starts. Pick the one that fits your
            scope; both end with a week of handover after launch.
          </SectionHeading>

          {/* One card per package: name and sprint, the price, what is included, then the call.
              The preferred package gets a Lapis border and a tag sitting on its top edge. */}
          <div data-reveal="children" className="grid gap-6 pt-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-name`}
                className={cn(
                  "relative flex scroll-mt-28 flex-col gap-8 rounded-2xl bg-card p-6 sm:p-8 lg:p-10",
                  service.preferred
                    ? "border-2 border-primary shadow-xl shadow-primary/15"
                    : "border border-border shadow-xl shadow-black/5",
                )}
              >
                {service.preferred && (
                  <p className="absolute -top-3.5 right-6 rounded-full bg-primary px-4 py-1 font-mono text-xs tracking-widest text-primary-foreground uppercase sm:right-10">
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
                  className="mt-auto h-12 w-full rounded-full text-base"
                >
                  Book a discovery call
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        aria-labelledby="process-heading"
        id="process"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <SectionHeading eyebrow="Process" title={`How the ${timetablePackage.name} sprint runs`} id="process-heading">
            The timeline below shows the {timetablePackage.name} package: a{" "}
            {timetablePackage.sprint}, then a week of handover once your app is live. One team
            throughout, with a catch-up every Friday.
          </SectionHeading>
          {/* Phones stack each step's text above its bar; wider screens put it in a first column. */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-3 sm:grid-cols-[minmax(11rem,2.2fr)_repeat(3,minmax(0,1fr))]">
              {/* Two header rows: the phases the weeks fall into, then the weeks themselves. */}
              <div
                aria-hidden="true"
                className="col-span-full grid grid-cols-subgrid border-b border-border font-mono text-xs uppercase"
              >
                <span className="hidden px-6 py-4 text-muted-foreground sm:block">Phase</span>
                <span className="col-span-2 flex items-center justify-center gap-3 bg-primary/10 px-3 py-4 text-center text-primary sm:border-l sm:border-border dark:text-foreground">
                  {timetablePackage.sprint}
                </span>
                <span className="flex items-center justify-center bg-chart-2/15 px-3 py-4 text-center text-foreground sm:border-l sm:border-border">
                  Live + handover
                </span>
              </div>
              <div
                aria-hidden="true"
                className="col-span-full grid grid-cols-subgrid border-b border-border font-mono text-xs text-muted-foreground uppercase"
              >
                <span className="hidden px-6 py-4 sm:block">Step</span>
                {Array.from({ length: timetableWeeks }, (_, week) => (
                  <span key={week} className="py-4 text-center sm:border-l sm:border-border">
                    Week {week + 1}
                  </span>
                ))}
              </div>
              <ol data-reveal="children" className="col-span-full grid grid-cols-subgrid">
                {steps.map((step, index) => (
                  <li
                    key={step.name}
                    className="col-span-full grid grid-cols-subgrid border-b border-border last:border-b-0"
                  >
                    <div className="col-span-full flex flex-col gap-1 px-4 pt-5 sm:col-span-1 sm:px-6 sm:py-5">
                      <h3 className="flex items-baseline gap-3 text-lg">
                        <span className="font-mono text-sm text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step.name}
                      </h3>
                      <p className="text-sm text-pretty text-muted-foreground">{step.text}</p>
                    </div>
                    <div className="relative col-span-3 grid grid-cols-subgrid py-4 sm:py-5">
                      {Array.from({ length: timetableWeeks }, (_, week) => (
                        <span
                          key={week}
                          aria-hidden="true"
                          className="absolute inset-y-0 hidden border-l border-border sm:block"
                          style={{ left: `${(week / timetableWeeks) * 100}%` }}
                        />
                      ))}
                      <p
                        className={cn(
                          "reveal-wipe relative mx-1 flex h-9 items-center gap-2 overflow-hidden rounded-lg px-3 font-mono text-xs whitespace-nowrap sm:mx-2",
                          stepTones[step.tone].bar,
                        )}
                        style={{ gridColumn: `${step.start} / span ${step.weeks}` }}
                      >
                        <span className="sr-only">
                          {step.weeks > 1
                            ? `Weeks ${step.start} to ${step.start + step.weeks - 1}: `
                            : `Week ${step.start}: `}
                        </span>
                        <span className="truncate">{step.bar}</span>
                        {/* Each week closes with the Friday catch-up. */}
                        <span aria-hidden="true" className="ml-auto flex shrink-0 gap-[clamp(0.5rem,2vw,1.4rem)]">
                          {Array.from({ length: step.weeks }, (_, week) => (
                            <span key={week} className={cn("size-1.5 rotate-45", stepTones[step.tone].mark)} />
                          ))}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-4 py-4 font-mono text-xs text-muted-foreground sm:px-6">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-primary" />
                Friday catch-up
              </span>
              <span>
                Showing the {timetablePackage.name} package. The Extended MVP adds a second week of
                development before iteration.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Stack: the same Lapis as the hero, in both themes, with each logo on a white tile. */}
      <section aria-labelledby="stack-heading" id="stack" className="scroll-mt-28 px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 rounded-3xl bg-[#2b3fd6] px-6 py-12 text-white sm:px-10 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-14">
          <div data-reveal="children" className="flex flex-col gap-5">
            <p className="font-mono text-xs tracking-widest text-[#c3caff] uppercase">Our stack</p>
            <h2 id="stack-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
              A stack built for a fast, scalable launch
            </h2>
            <p className="text-lg text-pretty text-white/80">
              Every app we ship runs on a modern, production-grade stack.
            </p>
            <p className="text-pretty text-white/80">
              These are the tools today&apos;s leading web products are built on, so your app is
              fast for users from day one and scales as you grow without a rebuild. Every account
              sits in your name, so any developer can pick the app up later.
            </p>
          </div>
          <ul data-reveal="children" className="grid grid-cols-2 gap-3 sm:gap-4">
            {stack.map((tool) => (
              <li
                key={tool.name}
                className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-4 py-6 text-[#14131b] sm:py-8"
              >
                {/* Wordmarks get the same area rather than the same height, so a long
                    one does not shrink to a sliver and a tall one does not dwarf the rest. */}
                <span className="flex h-14 items-center gap-3">
                  <Image
                    src={tool.logo}
                    alt={tool.wordmark ? tool.name : ""}
                    className="w-auto max-w-full object-contain"
                    style={{
                      height: tool.wordmark
                        ? `${Math.sqrt(20 / (tool.logo.width / tool.logo.height))}rem`
                        : "2.5rem",
                    }}
                  />
                  {!tool.wordmark && (
                    <span className="text-2xl font-semibold tracking-tight">{tool.name}</span>
                  )}
                </span>
                <span className="font-mono text-xs tracking-widest text-[#14131b]/60 uppercase">
                  {tool.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work */}
      <section
        aria-labelledby="work-heading"
        id="work"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Our work" title="Products we have built and launched" id="work-heading">
              Every app below went through the same process a client build does, from first sketch
              to live domain. Each case study covers the problem, the product and the engineering.
            </SectionHeading>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={pages.work.path} />}
              className="h-11 shrink-0 rounded-full px-5 text-base"
            >
              See all case studies
            </Button>
          </div>
          <div data-reveal="children" className="grid gap-6 md:grid-cols-2">
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} headingLevel="h3" />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section
        aria-labelledby="compare-heading"
        id="compare"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Why Scryptic"
              title="Hire in-house. Brief an agency. Chance a freelancer. Or skip the trade-offs."
              id="compare-heading"
            >
              {siteConfig.name} gives you agency-quality software at freelancer speed, with code you
              own outright. Here is how it compares with the usual ways to get an app built.
            </SectionHeading>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="h-11 w-fit shrink-0 rounded-full px-6 text-base"
            >
              Book a discovery call
            </Button>
          </div>

          {/* Relative so the visually hidden labels stay inside the scroll area on phones. */}
          <div className="relative overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[600px] border-collapse text-left sm:min-w-[720px]">
              <caption className="sr-only">
                How {siteConfig.name} compares with an in-house hire, an agency, a freelancer and
                AI-only tools
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <td className="sticky left-0 z-10 w-[24%] bg-card" />
                  <th
                    scope="col"
                    className="w-[16%] bg-primary/10 px-4 py-6 text-center font-logo text-xl font-extrabold tracking-tight lowercase"
                  >
                    {siteConfig.name}
                  </th>
                  {alternatives.map((alternative) => (
                    <th
                      key={alternative}
                      scope="col"
                      className="w-[15%] px-4 py-6 text-center text-sm font-medium"
                    >
                      {alternative}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody data-reveal="children" className="divide-y divide-border">
                {comparison.map((row) => (
                  <tr key={row.name}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-card px-4 py-5 font-normal sm:px-8"
                    >
                      <span className="block font-medium">{row.name}</span>
                      <span className="hidden text-sm text-pretty text-muted-foreground sm:block">
                        {row.text}
                      </span>
                    </th>
                    <td className="bg-primary/10 px-4 py-5">
                      <ComparisonMark value highlight />
                    </td>
                    {alternatives.map((alternative) => (
                      <td key={alternative} className="px-4 py-5">
                        <ComparisonMark value={row.values[alternative]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        aria-labelledby="about-heading"
        id="about"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="About us" title="About Scryptic" id="about-heading">
              {siteConfig.name} is a Brighton-based development studio for founders who need a
              working product, not a team to manage.
            </SectionHeading>
            <p data-reveal className="max-w-2xl text-pretty text-muted-foreground">
              Keeping the studio small is deliberate: a few projects at a time, each with full
              attention and a catch-up every Friday. Scope, price and timeline are agreed before the
              build starts, so you always know what you are paying for, what you will get and when.
            </p>
          </div>

          <article
            aria-labelledby="founder-name"
            data-reveal
            className="grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <div className="relative aspect-square bg-portrait">
              <Image
                src={founder.image}
                alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
                fill
                sizes="(min-width: 1152px) 460px, (min-width: 640px) 40vw, 100vw"
                className="object-cover object-bottom"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-xs tracking-widest text-primary uppercase">
                  {founder.role}
                </p>
                <h3 id="founder-name" className="text-2xl tracking-tight sm:text-3xl">
                  {founder.name}
                </h3>
              </div>
              {founder.bio.map((paragraph) => (
                <p key={paragraph} className="max-w-xl text-pretty text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              <SocialLinks name={founder.fullName} profiles={founder.socials} />
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        id="faq"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" id="faq-heading">
            Straight answers on pricing, timelines, process and what to expect. Anything else, ask on the
            discovery call.
          </SectionHeading>
          <div data-reveal="children" className="flex flex-col divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium [&::-webkit-details-marker]:hidden">
                  <h3>{faq.question}</h3>
                  <span
                    aria-hidden="true"
                    className="font-mono text-lg text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-pretty text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section aria-labelledby="contact-heading" id="contact" className="scroll-mt-28 px-4 pb-24 sm:px-6">
        <div
          data-reveal="zoom"
          className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center sm:py-20"
        >
          <h2 id="contact-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
            Start with a discovery call
          </h2>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Tell us what you are building and where it is stuck. You will leave the call knowing
            the next step, whether or not it involves us.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 rounded-full px-6 text-base"
          >
            Book a discovery call
          </Button>
          <p className="font-mono text-xs text-muted-foreground">
            or email{" "}
            <a href={`mailto:${siteConfig.organization.email}`} className="text-primary hover:underline">
              {siteConfig.organization.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
