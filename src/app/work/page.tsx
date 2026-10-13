import Link from "next/link"

import { CaseStudyCard } from "@/components/case-study-card"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { caseStudyPages, createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"
import { caseStudies } from "@/lib/work"

export const metadata = createMetadata(pages.work)

export default function WorkPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.work} nodes={[itemListJsonLd(pages.work, caseStudyPages)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Our work
          </p>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Products we designed, built and <span className="text-primary">launched</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            These are {caseStudies.length} web apps {siteConfig.name} took from idea to launch as
            its own products, each live on its own domain with accounts and payments built in.
            Every one ran through the same process a client build does: scope, design, build,
            deploy and launch.
          </p>
        </div>

        <section aria-label="Case studies" className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </section>

        <section
          aria-labelledby="work-cta-heading"
          className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="work-cta-heading" className="text-2xl tracking-tight text-balance">
            Want yours on this page?
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Book a free discovery call and talk through your idea. You get a scoped first release
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
      </div>
    </main>
  )
}
