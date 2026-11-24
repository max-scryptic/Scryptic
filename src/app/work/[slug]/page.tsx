import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { notFound } from "next/navigation"

import { BrowserFrame } from "@/components/browser-frame"
import { PageJsonLd } from "@/components/json-ld"
import { TechMark } from "@/components/tech-mark"
import { Button } from "@/components/ui/button"
import { inset, pageTop } from "@/lib/frame"
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

/** A note's first sentence and the rest, so the first can lead in the foreground colour. */
function splitLede(text: string): [string, string] {
  const match = text.match(/^(.+?[.!?])\s+(?=[A-Z])/)
  if (!match) return [text, ""]
  return [match[1], text.slice(match[0].length)]
}

function SectionHeading({
  id,
  eyebrow,
  title,
  className,
}: {
  id: string
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
      <h2 id={id} className="text-2xl tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
    </div>
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
      className={cn("grid gap-8 pt-12 lg:grid-cols-[1fr_2fr] lg:gap-14", inset)}
    >
      <SectionHeading id={id} eyebrow={eyebrow} title={title} />
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
  const appScreens = study.appScreens ?? []
  const [lead, ...moreSolution] = study.solution

  return (
    <main className={cn("flex flex-col px-4 pb-24 sm:px-6", pageTop)}>
      <PageJsonLd page={page} nodes={[caseStudyJsonLd(page, study)]} />

      {/* gap plus each section's pt-12 matches the landing page's ~12rem between sections. */}
      <article className="mx-auto flex w-full max-w-6xl flex-col gap-24 sm:gap-36">
        <header className="relative flex flex-col gap-10">
          {/* The breadcrumb and, from sm up, the category share one row that
              hangs in the page's top padding, out of the flow, as in the service
              heroes, so the title starts at the same height. On phones the
              category is too long to share the row without running up under the
              site header, so it sits just below the title. */}
          <div
            className={cn(
              "absolute bottom-full left-0 mb-5 flex items-center gap-6 font-mono text-xs whitespace-nowrap",
              inset,
            )}
          >
            <nav aria-label="Breadcrumb" className="text-muted-foreground">
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
            <p className="hidden tracking-widest text-primary uppercase sm:block">{study.category}</p>
          </div>

          {/* Top-aligned, so the title starts at the shared height however tall the card beside it is. */}
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14">
            <div className={cn("flex flex-col items-start gap-6", inset)}>
              <h1 className="text-4xl tracking-tight text-balance sm:text-6xl">{study.name}</h1>
              <p className="font-mono text-xs tracking-widest text-primary uppercase sm:hidden">
                {study.category}
              </p>
              <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
                {study.summary}
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={study.url} target="_blank" rel="noopener" />}
                className="h-11 px-5 text-base"
              >
                Visit {domain}
                <ExternalIcon />
              </Button>
            </div>

            {/* Brackets but no guides: beside the intro, its edge lines would cut through the copy. */}
            <dl className="pip grid gap-5 border border-border bg-card p-6 text-sm sm:grid-cols-2 lg:grid-cols-1">
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
                <dd>
                  {study.highlights.map((tool) => tool.name).join(", ")}.{" "}
                  <a href="#stack" className="text-primary underline-offset-4 hover:underline">
                    See the full stack
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <BrowserFrame
            src={study.cover.src}
            alt={study.cover.alt}
            domain={domain}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            className="guides"
          />
        </header>

        <Section id="problem-heading" eyebrow="The problem" title={`Why ${study.name} exists`}>
          {study.problem.map((paragraph) => (
            <p key={paragraph} className="text-lg text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Section>

        <section aria-labelledby="solution-heading" className="flex flex-col gap-12 pt-12">
          <div className={cn("grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14", inset)}>
            <SectionHeading id="solution-heading" eyebrow="The product" title="What we built" />
            <div className="flex flex-col gap-5">
              <p className="text-2xl/snug tracking-tight text-pretty sm:text-3xl/snug">{lead}</p>
              {moreSolution.map((paragraph) => (
                <p key={paragraph} className="text-lg text-pretty text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className={cn("flex items-center gap-4", inset)}>
              <h3 className="font-mono text-xs tracking-widest text-primary uppercase">Features</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.features.map((feature, i) => (
                <li key={feature.name} className="pip flex flex-col gap-3 border border-border bg-card p-6">
                  <span aria-hidden="true" className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-lg">{feature.name}</h4>
                  <p className="text-sm text-pretty text-muted-foreground">{feature.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {study.gallery.length > 0 || appScreens.length > 0 ? (
          <section aria-labelledby="screens-heading" className="flex flex-col gap-8 pt-12">
            <div className={cn("flex flex-col gap-3", inset)}>
              <p className="font-mono text-xs tracking-widest text-primary uppercase">Screens</p>
              <h2 id="screens-heading" className="text-2xl tracking-tight sm:text-3xl">
                A closer look
              </h2>
            </div>
            {appScreens.length > 0 ? (
              <>
                <h3 className={cn("text-lg", inset)}>In the app</h3>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {appScreens.map((shot) => (
                    <li key={shot.alt} className="ticks border border-border bg-card">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        sizes="(min-width: 1024px) 224px, (min-width: 640px) 33vw, 50vw"
                        placeholder="blur"
                        className="block h-auto w-full"
                      />
                    </li>
                  ))}
                </ul>
                {study.gallery.length > 0 ? (
                  <h3 className={cn("pt-4 text-lg", inset)}>On {domain}</h3>
                ) : null}
              </>
            ) : null}
            <div className="flex flex-col gap-6">
              {study.gallery.map((shot) => (
                <BrowserFrame
                  key={shot.alt}
                  src={shot.src}
                  alt={shot.alt}
                  domain={domain}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="guides"
                />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="engineering-heading" className="flex flex-col gap-10 pt-12">
          <SectionHeading
            id="engineering-heading"
            eyebrow="Under the hood"
            title="The engineering"
            className={cn("max-w-3xl", inset)}
          />
          <ol className="grid gap-4 md:grid-cols-6">
            {study.engineering.map((item, i) => {
              const [lede, rest] = splitLede(item.text)
              return (
                <li
                  key={item.name}
                  className={cn(
                    "ticks flex flex-col gap-5 border border-border bg-card p-6 sm:p-8",
                    // Three across, then the rest in pairs.
                    i < 3 ? "md:col-span-2" : "md:col-span-3",
                  )}
                >
                  <p className="flex flex-col gap-1 border-b border-border pb-5">
                    <span className="text-5xl tracking-tight text-primary">{item.figure.value}</span>
                    <span className="font-mono text-xs text-muted-foreground">{item.figure.label}</span>
                  </p>
                  <h3 className="text-lg">{item.name}</h3>
                  <p className="text-sm text-pretty text-muted-foreground">
                    <span className="text-foreground">{lede}</span> {rest}
                  </p>
                </li>
              )
            })}
          </ol>
        </section>

        <section
          id="stack"
          aria-labelledby="stack-heading"
          className="flex scroll-mt-28 flex-col gap-8 pt-12"
        >
          <div className={cn("flex max-w-3xl flex-col gap-3", inset)}>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Built with</p>
            <h2 id="stack-heading" className="text-2xl tracking-tight sm:text-3xl">
              The stack
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.stack.map((layer) => (
              <li
                key={layer.role}
                className={cn(
                  "ticks flex flex-col gap-3 border border-border bg-card p-6",
                  layer.tools.length > 3 && "sm:col-span-2",
                )}
              >
                <h3 className="font-mono text-xs tracking-widest text-primary uppercase">
                  {layer.role}
                </h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-3">
                  {layer.tools.map((tool) => (
                    <li key={tool.name} className="flex items-center gap-3">
                      <TechMark tool={tool} />
                      <span className="font-medium">{tool.name}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-pretty text-muted-foreground">{layer.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="grid gap-6 pt-12 md:grid-cols-2">
          <Link
            href={`/work/${next.slug}`}
            className="group corners corners-grow guides flex flex-col gap-2 border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8"
          >
            <span className="font-mono text-xs text-muted-foreground">Next case study</span>
            <span className="text-2xl tracking-tight">
              {next.name} <span aria-hidden="true" className="text-primary transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="text-sm text-pretty text-muted-foreground">{next.category}</span>
          </Link>
          <div className="corners guides flex flex-col items-start gap-4 border border-primary/50 bg-card p-6 sm:p-8">
            <p className="text-2xl tracking-tight text-balance">Building something like {study.name}?</p>
            <p className="text-sm text-pretty text-muted-foreground">
              Start with a free discovery call. You leave with a scoped first release and a written
              estimate.
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="mt-auto h-11 px-5 text-base"
            >
              Book a discovery call
            </Button>
          </div>
        </footer>
      </article>
    </main>
  )
}
