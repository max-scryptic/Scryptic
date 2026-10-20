import Link from "next/link"

import { ToolCard } from "@/components/free-tools/tool-card"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { freeTools, type FreeTool, type ToolFaq } from "@/lib/free-tools"
import { pages, toolPage } from "@/lib/seo"
import { faqJsonLd, toolJsonLd } from "@/lib/structured-data"

/*
 * The frame every free tool page shares: the heading and answer-first intro,
 * the tool itself, its FAQ (also emitted as FAQPage JSON-LD), a call to
 * action and the other tools. Pages only supply the copy and the widget.
 */
export function ToolPage({
  tool,
  heading,
  intro,
  faqs,
  related,
  children,
}: {
  tool: FreeTool
  /** The page's h1. */
  heading: React.ReactNode
  /** One or two sentences under the h1 that answer what the tool does. */
  intro: React.ReactNode
  faqs: ToolFaq[]
  /** A blog post that goes deeper, shown under the FAQ. */
  related?: { href: string; title: string }
  children: React.ReactNode
}) {
  const page = toolPage(tool)
  const others = freeTools.filter((other) => other.slug !== tool.slug)
  // The next three tools in hub order, wrapping round, so every tool links to a different set.
  const start = freeTools.findIndex((other) => other.slug === tool.slug)
  const more = [0, 1, 2].map((offset) => others[(start + offset) % others.length])

  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={page} nodes={[toolJsonLd(page, tool), faqJsonLd(page, faqs)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-6">
            <Link
              href={pages.tools.path}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase hover:underline"
            >
              <span aria-hidden="true">&larr;</span>
              {pages.tools.title}
            </Link>
            <h1 className="max-w-3xl text-4xl tracking-tight text-balance sm:text-5xl">{heading}</h1>
            <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{intro}</p>
          </div>

          {children}
        </div>

        <section
          aria-labelledby="tool-faq-heading"
          className="grid gap-12 border-t border-border pt-20 lg:grid-cols-[1fr_1.4fr]"
        >
          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">FAQ</p>
            <h2 id="tool-faq-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
              Frequently asked questions
            </h2>
            {related && (
              <p className="text-pretty text-muted-foreground">
                Want the detail? Read{" "}
                <Link href={related.href} className="text-primary hover:underline">
                  {related.title}
                </Link>
                .
              </p>
            )}
          </div>
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
        </section>

        <section
          aria-labelledby="tool-cta-heading"
          className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="tool-cta-heading" className="text-2xl tracking-tight text-balance">
            Rather talk it through with a developer?
          </h2>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            Book a free 30 minute discovery call. You get straight advice on scope, stack and cost,
            and a written estimate before any build starts.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 rounded-full px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>

        <section aria-labelledby="more-tools-heading" className="flex flex-col gap-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="more-tools-heading" className="text-3xl tracking-tight">
              More free tools
            </h2>
            <Link href={pages.tools.path} className="text-primary hover:underline">
              All free tools
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {more.map((other) => (
              <ToolCard key={other.slug} tool={other} headingLevel="h3" />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
