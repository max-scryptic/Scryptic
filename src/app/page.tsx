import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { createMetadata, pages } from "@/lib/seo"
import { services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"

export const metadata = createMetadata(pages.home)

const steps = [
  {
    name: "Discover",
    text: "A call to understand the business, the users and what success looks like. If something already exists, we audit it.",
  },
  {
    name: "Plan",
    text: "A scoped first release, a recommended stack and a written estimate, so the build starts from a plan rather than a guess.",
  },
  {
    name: "Build",
    text: "Design and engineering run together. You see working software early and often, not only at the end.",
  },
  {
    name: "Launch",
    text: "We deploy, set up analytics and search, launch with you and hand over everything you need to run it.",
  },
]

const principles = [
  {
    name: "Plan before code",
    text: "Every build starts from an audit, so scope, risks and cost are clear before development begins.",
  },
  {
    name: "One team, end to end",
    text: "Design, engineering, deployment and launch stay with the same people, so nothing gets lost in a handoff.",
  },
  {
    name: "Built to hand over",
    text: "Clean, documented code on a mainstream stack, so you can grow the product with us or without us.",
  },
  {
    name: "Straight answers",
    text: "If a feature is not worth building yet, or an idea needs rethinking, you hear it on the first call.",
  },
]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
const faqs = [
  {
    question: "How much does it cost to build an app with Scryptic?",
    answer:
      "A full app to market build starts at £10k. The final price depends on complexity: the number of screens and user roles, the integrations involved and how much already exists. The discovery call and audit turns that into a written estimate before any build starts.",
  },
  {
    question: "Why start with a discovery call and audit?",
    answer:
      "Because the most expensive mistake in software is building the wrong thing. The audit pins down scope, risks and the right stack first, so the build estimate is one you can plan around.",
  },
  {
    question: "Do I have to book the full build after the audit?",
    answer:
      "No. The discovery call and audit is a standalone service. You keep the plan and the estimate, whether you build with Scryptic, another team or in house.",
  },
  {
    question: "Can you work on an existing app or codebase?",
    answer:
      "Yes. The audit covers existing code, infrastructure and prototypes. Often the best plan is to build on what you have rather than start again.",
  },
  {
    question: "What kind of apps do you build?",
    answer:
      "Web apps and SaaS products: customer-facing apps, dashboards, marketplaces, internal tools and AI-powered features, built on a modern TypeScript stack.",
  },
]

const terminalLines = [
  { prompt: true, text: "scryptic discover --audit" },
  { prompt: false, text: "goals, users and constraints mapped" },
  { prompt: false, text: "stack and architecture chosen" },
  { prompt: false, text: "first release scoped and estimated" },
  { prompt: true, text: "scryptic ship --to market" },
  { prompt: false, text: "designed, built, deployed, launched" },
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
    <div className="flex max-w-2xl flex-col gap-4">
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

      {/* Hero */}
      <section className="px-4 pt-36 pb-24 sm:px-6 sm:pt-44 sm:pb-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col items-start gap-7">
            <p className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">
              From idea to{" "}
              <span className="text-primary">launched app</span>
              , without hiring a dev team.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              {siteConfig.name} plans, designs and builds production web apps for founders and
              small teams. Start with a discovery call and audit, then let us take the whole
              thing to market.
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
                See services and pricing
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
          <SectionHeading eyebrow="Services" title="Two ways to work with Scryptic" id="services-heading">
            Every engagement starts with a discovery call and audit. When you are ready to build,
            we take the app all the way to market, with full builds from £10k depending on
            complexity.
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
              const featured = index === services.length - 1

              return (
                <article
                  key={service.id}
                  id={service.id}
                  aria-labelledby={`${service.id}-name`}
                  className={cn(
                    "relative flex scroll-mt-28 flex-col gap-6 rounded-2xl border bg-card p-6 sm:p-8",
                    featured ? "border-primary/50" : "border-border",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-xs text-muted-foreground">Step {service.step}</p>
                      <h3 id={`${service.id}-name`} className="text-2xl tracking-tight">
                        {service.name}
                      </h3>
                    </div>
                    {featured && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                        Full build
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-4xl font-semibold tracking-tight">{service.price}</p>
                    <p className="text-sm text-muted-foreground">{service.priceNote}</p>
                  </div>
                  <p className="text-pretty text-muted-foreground">{service.summary}</p>
                  <ul className="flex flex-col gap-3 text-sm">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-border pt-6 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Best for: </span>
                    {service.bestFor}
                  </p>
                  <Button
                    size="lg"
                    variant={featured ? "default" : "outline"}
                    nativeButton={false}
                    render={<Link href={pages.bookCall.path} />}
                    className="h-11 rounded-full text-base"
                  >
                    {service.cta}
                  </Button>
                </article>
              )
            })}
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
            Every project follows the same four steps, run by one team from the first call to
            launch day. No handoffs between agencies, and no guessing what happens next.
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

      {/* About */}
      <section
        aria-labelledby="about-heading"
        id="about"
        className="scroll-mt-28 border-t border-border px-4 py-24 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-6">
              <SectionHeading eyebrow="About us" title="About Scryptic" id="about-heading">
                {siteConfig.name} is a development studio for founders who need a working product,
                not a team to manage.
              </SectionHeading>
              <p className="max-w-2xl text-pretty text-muted-foreground">
                We act as your technical partner from the first conversation to launch day: working
                out what is worth building, making the technical calls and shipping the app. Scope
                and price are agreed before the build starts, so you always know what you are paying
                for and what you will get.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {principles.map((principle) => (
                <li
                  key={principle.name}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6"
                >
                  <h3>{principle.name}</h3>
                  <p className="text-sm text-pretty text-muted-foreground">{principle.text}</p>
                </li>
              ))}
            </ul>
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
            Straight answers on pricing, process and what to expect. Anything else, ask on the
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
