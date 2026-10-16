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

// The process timetable: a typical eight week build. `start` and `weeks` place
// each step's bar on the week grid.
const timetableWeeks = 8

const steps = [
  {
    name: "Discover",
    text: "A call on your goals, users and what exists.",
    bar: "Call",
    start: 1,
    weeks: 1,
  },
  {
    name: "Plan",
    text: "Scope, stack, a written estimate and a timeline.",
    bar: "Estimate",
    start: 2,
    weeks: 1,
  },
  {
    name: "Build",
    text: "Design and code together, reviewed every Friday.",
    bar: "Build",
    start: 3,
    weeks: 5,
  },
  {
    name: "Launch",
    text: "Deploy, set up analytics, launch and hand over.",
    bar: "Live",
    start: 8,
    weeks: 1,
  },
]

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
    text: "Live in 1 to 2 months, not after a hiring round",
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
    text: "A fixed estimate for a launched product",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs = [
  {
    question: "How much does it cost to build an app with Scryptic?",
    answer: `There are two fixed prices. ${services.map((s) => `The ${s.name} is ${s.price}, a ${s.sprint}`).join(". ")}. Both end with a week of handover after launch for bug fixes and a smooth rollout. The discovery call settles which one fits, so the price is agreed before any build starts.`,
  },
  {
    question: "How long does it take to build an app?",
    answer:
      "Most full app to market builds take one to two months from kickoff to launch, and a typical build runs about eight weeks. A focused first release sits at the shorter end; more user roles, integrations or an existing codebase to work around push it towards two months. Your timeline comes with the written estimate, so you know the launch window before the build starts.",
  },
  {
    question: "What is included in an MVP package?",
    answer:
      "A fully built MVP, ready to take to market. The Initial MVP has one week of development by our team and one week of iteration on your feedback; the Extended MVP has two weeks of development and one of iteration. Both finish with a week of handover after launch for bug fixes and a smooth rollout.",
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
      "Yes. We review existing code, infrastructure and prototypes during discovery. Often the best plan is to build on what you have rather than start again, and the estimate says which parts we would keep, fix or replace.",
  },
  {
    question: "Who owns the code once the app is built?",
    answer:
      "You do. The code lives in your repository and the hosting, database, payments and other accounts are in your name, then handed over at launch. Nothing is locked to us, so any developer can pick it up later.",
  },
  {
    question: "How is Scryptic different from an agency, a freelancer or an in-house hire?",
    answer:
      "You get agency-quality software at freelancer speed, with code you own outright. Hiring in-house means a recruitment round before any work starts, agencies tend to be slower and fix the plan up front, freelancers vary in quality, and AI-only tools rarely hold up with real users. With Scryptic you get a launched product in one to two months, a fixed estimate and priorities revisited every week.",
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
      "It is a free 30 minute call about your idea or product, who it is for and where it is stuck. You get straight advice on scope, stack, rough cost and timeline, including what is not worth building yet. If it makes sense to work together, a written estimate and timeline follow before anything starts.",
  },
]

const terminalLines = [
  { prompt: true, text: "scryptic discover" },
  { prompt: false, text: "goals, users and constraints mapped" },
  { prompt: false, text: "stack and architecture chosen" },
  { prompt: false, text: "first release scoped and estimated" },
  { prompt: true, text: "scryptic ship --to market" },
  { prompt: false, text: "progress reviewed every Friday" },
  { prompt: false, text: "launched in 1 to 2 months" },
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
              <span className="text-[#c3caff]">launched MVP</span>
              , without hiring a dev team.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-white/80">
              {siteConfig.name} is an MVP and app development studio in Brighton, building web apps
              and SaaS products for UK founders in one to two months.
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

          {/* One card per package: name and sprint, the price, what is included, then the call. */}
          <div data-reveal="children" className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-name`}
                className="relative flex scroll-mt-28 flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8 lg:p-10"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-primary" />
                <div className="flex flex-col gap-1">
                  <h3 id={`${service.id}-name`} className="text-2xl tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground">{service.sprint}</p>
                </div>
                <p className="text-5xl font-semibold tracking-tight">{service.price}</p>
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
          <SectionHeading eyebrow="Process" title="How a project runs" id="process-heading">
            Most projects go from first call to launch in one to two months, in four steps with one
            team throughout and a catch-up every Friday.
          </SectionHeading>
          {/* Phones stack each step's text above its bar; wider screens put it in a first column. */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-8 sm:grid-cols-[minmax(11rem,2.2fr)_repeat(8,minmax(0,1fr))]">
              <div
                aria-hidden="true"
                className="col-span-full grid grid-cols-subgrid border-b border-border font-mono text-xs text-muted-foreground uppercase"
              >
                <span className="hidden px-6 py-4 sm:block">Step</span>
                {Array.from({ length: timetableWeeks }, (_, week) => (
                  <span key={week} className="py-4 text-center sm:border-l sm:border-border">
                    W{week + 1}
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
                    <div className="relative col-span-8 grid grid-cols-subgrid py-4 sm:py-5">
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
                          step.bar === "Live"
                            ? "bg-chart-2 text-[#14131b]"
                            : step.bar === "Build"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground",
                        )}
                        style={{ gridColumn: `${step.start} / span ${step.weeks}` }}
                      >
                        <span className="sr-only">
                          {step.weeks > 1
                            ? `Weeks ${step.start} to ${step.start + step.weeks - 1}: `
                            : `Week ${step.start}: `}
                        </span>
                        {/* A one week bar is too narrow for its label below lg; the step name sits beside it. */}
                        <span className={cn("truncate", step.weeks === 1 && "max-lg:sr-only")}>
                          {step.bar}
                        </span>
                        {step.bar === "Build" && (
                          <span aria-hidden="true" className="ml-auto flex gap-[clamp(0.5rem,2vw,1.4rem)]">
                            {Array.from({ length: step.weeks }, (_, week) => (
                              <span key={week} className="size-1.5 rotate-45 bg-primary-foreground/80" />
                            ))}
                          </span>
                        )}
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
              <span>A typical eight week build. Smaller first releases land sooner.</span>
            </p>
          </div>
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
