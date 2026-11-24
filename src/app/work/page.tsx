import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { PageJsonLd } from "@/components/json-ld"
import { PixelIn } from "@/components/pixel-in"
import { Button } from "@/components/ui/button"
import { inset, pageTop } from "@/lib/frame"
import { caseStudyPages, createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"
import { mobileCaseStudies, webCaseStudies, type CaseStudy } from "@/lib/work"

export const metadata = createMetadata(pages.work)

export default function WorkPage() {
  return (
    <main className={cn("flex flex-col px-4 pb-24 sm:px-6", pageTop)}>
      <PageJsonLd page={pages.work} nodes={[itemListJsonLd(pages.work, caseStudyPages)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className={cn("flex flex-col items-start gap-6", inset)}>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Products we designed, built and <PixelIn className="text-primary">launched</PixelIn>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Web apps and a native Android app that {siteConfig.name} has taken from idea to launch, each on its own domain with payments built in.
          </p>
        </div>

        <CaseStudyGroup
          id="web-apps"
          title="Web Apps"
          studies={webCaseStudies}
        />

        <CaseStudyGroup
          id="mobile-apps"
          title="Mobile Apps"
          studies={mobileCaseStudies}
        />

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

/**
 * One kind of product: a heading and its cards, two to a row. A
 * group with one study shows it wide, screenshot beside the text, rather than
 * as half a row.
 */
function CaseStudyGroup({
  id,
  title,
  studies,
}: {
  id: string
  title: string
  studies: CaseStudy[]
}) {
  if (studies.length === 0) return null
  const single = studies.length === 1
  return (
    <section aria-labelledby={`${id}-heading`} id={id} className="flex scroll-mt-28 flex-col gap-8">
      <h2 id={`${id}-heading`} className={cn("text-3xl tracking-tight text-balance", inset)}>
        {title}
      </h2>
      <div className={cn("grid gap-6", !single && "md:grid-cols-2")}>
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} headingLevel="h3" wide={single} className="guides" />
        ))}
      </div>
    </section>
  )
}
