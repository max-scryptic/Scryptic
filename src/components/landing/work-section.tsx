import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { LandingSection } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { featuredCaseStudies, type CaseStudy } from "@/lib/work"

/**
 * Launched products, screenshots first. From lg up the cards open the section
 * and the heading, intro and link sit under them as a caption; the heading
 * stays first in the source, so the outline and reading order are unchanged.
 * Phones keep the heading on top, where a caption below a long stack of
 * cards would be missed.
 */
export function WorkSection({
  title = "Products we have built and launched",
  intro = "Every app below went through the same process as a client build, from first sketch to live domain.",
  studies = featuredCaseStudies,
}: {
  title?: string
  intro?: React.ReactNode
  studies?: CaseStudy[]
}) {
  return (
    <LandingSection id="work" labelledBy="work-heading" className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-x-12">
      <div data-reveal="children" className={cn("flex max-w-2xl flex-col gap-3 lg:row-start-2", inset)}>
        <h2 id="work-heading" className="text-2xl tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        <p className="text-pretty text-muted-foreground">{intro}</p>
      </div>
      {/* A single study spans the row, screenshot beside the text, rather than leaving half of it empty. */}
      <div
        data-reveal="children"
        className={cn("grid gap-6 lg:col-span-2 lg:row-start-1", studies.length > 1 && "md:grid-cols-2")}
      >
        {studies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            headingLevel="h3"
            wide={studies.length === 1}
            className="guides"
          />
        ))}
      </div>
      <div className={cn("lg:row-start-2 lg:self-end", inset)}>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={pages.work.path} />}
          className="h-11 px-5 text-base"
        >
          See all case studies
        </Button>
      </div>
    </LandingSection>
  )
}
