import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
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
        <div className={cn("flex flex-col items-start gap-6", inset)}>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Products we designed, built and <span className="text-primary">launched</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Web and mobile products {siteConfig.name} has taken from idea to launch, each live on its own domain.
          </p>
        </div>

        <section aria-label="Case studies" className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} className="guides" />
          ))}
        </section>

        <section
          aria-labelledby="work-cta-heading"
          className="corners guides flex flex-col items-start gap-4 border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="work-cta-heading" className="text-2xl tracking-tight text-balance">
            Want yours on this page?
          </h2>
          <p className="text-pretty text-muted-foreground">
            Book a free discovery call and get a scoped first release with a written estimate.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>
      </div>
    </main>
  )
}
