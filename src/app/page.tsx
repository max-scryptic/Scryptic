import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { createMetadata, pages } from "@/lib/seo"
import { service } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"
import { caseStudies } from "@/lib/work"

export const metadata = createMetadata(pages.home)

const steps = [
  {
    name: "Discover",
    text: "A call to understand the business, the users and what success looks like. If something already exists, we review it.",
  },
  {
    name: "Plan",
    text: "A scoped first release, a recommended stack, a written estimate and a timeline, so the build starts from a plan rather than a guess.",
  },
  {
    name: "Build",
    text: "Design and engineering run together. Every Friday we catch up on what shipped that week, agree priorities and look at what is next in the pipeline.",
  },
  {
    name: "Launch",
    text: "Usually one to two months after kickoff. We deploy, set up analytics and search, launch with you and hand over everything you need to run it.",
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
    answer:
      "A full app to market build starts from £10,000. The final price depends on complexity: the number of screens and user roles, the integrations involved and how much already exists. After the discovery call you get a written estimate and timeline, before any build starts.",
  },
  {
    question: "How long does it take to build an app?",
    answer:
      "Most full app to market builds take one to two months from kickoff to launch. A focused first release sits at the shorter end; more user roles, integrations or an existing codebase to work around push it towards two months. Your timeline comes with the written estimate, so you know the launch window before the build starts.",
  },
  {
    question: "How do you keep me updated during the build?",
    answer:
      "With a catch-up every Friday. Each week we go through what shipped, agree priorities for the week ahead and look at what is coming up in the pipeline, so you can change direction early rather than at the end.",
  },
  {
    question: "What is included in a full app to market build?",
    answer:
      "Everything from the first call to launch day: scoping and a written estimate, product design and a prototype, the full-stack build, authentication, payments and integrations, hosting, analytics and search, launch support and a clean handover.",
  },
  {
    question: "Can you work on an existing app or codebase?",
    answer:
      "Yes. We review existing code, infrastructure and prototypes during discovery. Often the best plan is to build on what you have rather than start again.",
  },
  {
    question: "What kind of apps do you build?",
    answer:
      "Web apps and SaaS products: customer-facing apps, dashboards, marketplaces, internal tools and AI-powered features, built on a modern TypeScript stack.",
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
  wide = false,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  id: string
  /** Let the intro run the full width of the section instead of capping it. */
  wide?: boolean
}) {
  return (
    <div className={`flex flex-col gap-4 ${wide ? "" : "max-w-2xl"}`}>
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
      className="mt-0.5 size-4 shrink-0 text-primary"
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
          className="mx-auto flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
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
          serviceJsonLd(pages.home, service),
          faqJsonLd(pages.home, faqs),
        ]}
      />

      {/* Hero */}
      <section className="px-4 pt-36 pb-24 sm:px-6 sm:pt-44 sm:pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col items-start gap-7">
            <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">
              From idea to{" "}
              <span className="text-primary">launched app</span>
              , without hiring a dev team.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              {siteConfig.name} plans, designs and builds production web apps for founders and
              small teams, usually from first call to launch in one to two months. Start with a
              discovery call, then let us take the whole thing to market.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={pages.bookCall.path} />}
                className="h-11 rounded-full px-5 text-base"
              >
                Book a discovery call
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/#services" />}
                className="h-11 rounded-full px-5 text-base"
              >
                See pricing
              </Button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <div className="flex flex-col gap-2 p-5 font-mono text-sm leading-relaxed">
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
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <SectionHeading eyebrow="Service" title="One service: your app, all the way to market" id="services-heading">
            We plan, design, build, deploy and launch your app as one engagement. Full builds go
            live in one to two months and start {service.price.toLowerCase()}, depending on
            complexity.
          </SectionHeading>

          <article
            id={service.id}
            aria-labelledby={`${service.id}-name`}
            className="grid scroll-mt-28 gap-10 rounded-2xl border border-primary/50 bg-card p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:p-10"
          >
            <div className="flex flex-col gap-6">
              <h3 id={`${service.id}-name`} className="text-2xl tracking-tight">
                {service.name}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-semibold tracking-tight">{service.price}</p>
                <p className="text-sm text-muted-foreground">{service.priceNote}</p>
              </div>
              <p className="text-pretty text-muted-foreground">{service.summary}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Timeline: </span>
                {service.timeline}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Best for: </span>
                {service.bestFor}
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={pages.bookCall.path} />}
                className="mt-auto h-11 w-full rounded-full text-base sm:w-fit sm:px-6"
              >
                {service.cta}
              </Button>
            </div>
            <ul className="flex flex-col gap-4 text-sm lg:border-l lg:border-border lg:pl-14">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </article>
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
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} headingLevel="h3" />
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
            Most projects go from first call to launch in one to two months, following the same
            four steps with one team throughout and a catch-up every Friday along the way. No
            handoffs between agencies, and no guessing what happens next.
          </SectionHeading>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.name} className="flex flex-col gap-3 bg-background p-6 sm:p-8">
                <span className="font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg">{step.name}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
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
              <tbody className="divide-y divide-border">
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
            <SectionHeading eyebrow="About us" title="About Scryptic" id="about-heading" wide>
              {siteConfig.name} is a Brighton-based development studio for founders who need a
              working product, not a team to manage.
            </SectionHeading>
            <p className="text-pretty text-muted-foreground">
              The studio is built on more than five years of shipping software at pace, from
              early-stage startups to enterprise applications. That experience now goes into your
              product: we act as your technical partner from the first conversation to launch day,
              working out what is worth building, making the technical calls and shipping the app.
              Scope, price and timeline are agreed before the build starts, and a catch-up every
              Friday keeps you across progress, so you always know what you are paying for, what you
              will get and when.
            </p>
          </div>

          <article
            aria-labelledby="founder-name"
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
          <div className="flex flex-col divide-y divide-border border-y border-border">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center sm:py-20">
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
