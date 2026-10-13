import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BrowserFrame, PhoneFrame } from "@/components/browser-frame"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { caseStudyPage, createMetadata, pages } from "@/lib/seo"
import { caseStudyJsonLd } from "@/lib/structured-data"
import { caseStudies, displayDomain, getCaseStudy } from "@/lib/work"

// Only the studies in src/lib/work.ts exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return createMetadata(caseStudyPage(study))
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-8 border-t border-border pt-12 lg:grid-cols-[1fr_2fr] lg:gap-14"
    >
      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
        <h2 id={id} className="text-2xl tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  )
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const page = caseStudyPage(study)
  const domain = displayDomain(study)
  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={page} nodes={[caseStudyJsonLd(page, study)]} />

      <article className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <header className="flex flex-col gap-10">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={pages.work.path} className="hover:text-foreground">
                  {pages.work.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {study.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14">
            <div className="flex flex-col items-start gap-6">
              <p className="font-mono text-xs tracking-widest text-primary uppercase">
                {study.category}
              </p>
              <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">{study.name}</h1>
              <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
                {study.summary}
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={study.url} target="_blank" rel="noopener" />}
                className="h-11 rounded-full px-5 text-base"
              >
                Visit {domain}
                <ExternalIcon />
              </Button>
            </div>

            <dl className="grid gap-5 rounded-2xl border border-border bg-card p-6 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs text-muted-foreground">Built for</dt>
                <dd>{study.audience}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-xs text-muted-foreground">Our role</dt>
                <dd>{study.scope}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
                <dt className="font-mono text-xs text-muted-foreground">Stack</dt>
                <dd>{study.stack.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <BrowserFrame
            src={study.cover.src}
            alt={study.cover.alt}
            domain={domain}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </header>

        <Section id="problem-heading" eyebrow="The problem" title={`Why ${study.name} exists`}>
          {study.problem.map((paragraph) => (
            <p key={paragraph} className="text-lg text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Section>

        <Section id="solution-heading" eyebrow="The product" title="What we built">
          {study.solution.map((paragraph) => (
            <p key={paragraph} className="text-lg text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {study.features.map((feature) => (
              <li key={feature.name} className="flex flex-col gap-2 bg-card p-6">
                <h3>{feature.name}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{feature.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        {study.gallery.length > 0 || study.mobile ? (
          <section aria-labelledby="screens-heading" className="flex flex-col gap-8 border-t border-border pt-12">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs tracking-widest text-primary uppercase">Screens</p>
              <h2 id="screens-heading" className="text-2xl tracking-tight sm:text-3xl">
                A closer look
              </h2>
            </div>
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_16rem]">
              <div className="flex flex-col gap-6">
                {study.gallery.map((shot) => (
                  <BrowserFrame
                    key={shot.alt}
                    src={shot.src}
                    alt={shot.alt}
                    domain={domain}
                    sizes="(min-width: 1152px) 864px, 100vw"
                  />
                ))}
              </div>
              {study.mobile ? (
                <PhoneFrame
                  src={study.mobile.src}
                  alt={study.mobile.alt}
                  sizes="(min-width: 1024px) 256px, 70vw"
                  className="mx-auto w-full max-w-64 lg:sticky lg:top-32"
                />
              ) : null}
            </div>
          </section>
        ) : null}

        <Section id="engineering-heading" eyebrow="Under the hood" title="The engineering">
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {study.engineering.map((item) => (
              <li key={item.name} className="flex flex-col gap-2 py-6">
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-pretty text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
          <ul aria-label="Built with" className="flex flex-wrap gap-2 font-mono text-xs">
            {study.stack.map((tech) => (
              <li key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        <footer className="grid gap-6 border-t border-border pt-12 md:grid-cols-2">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8"
          >
            <span className="font-mono text-xs text-muted-foreground">Next case study</span>
            <span className="text-2xl tracking-tight">
              {next.name} <span aria-hidden="true" className="text-primary transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="text-sm text-pretty text-muted-foreground">{next.category}</span>
          </Link>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/50 bg-card p-6 sm:p-8">
            <p className="text-2xl tracking-tight text-balance">Building something like {study.name}?</p>
            <p className="text-sm text-pretty text-muted-foreground">
              Start with a free discovery call. You leave with a scoped first release and a written
              estimate.
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="mt-auto h-11 rounded-full px-5 text-base"
            >
              Book a discovery call
            </Button>
          </div>
        </footer>
      </article>
    </main>
  )
}
