import Link from "next/link"
import { cn } from "cn"

import { CaseStudyCard } from "@/components/case-study-card"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { featuredCaseStudies, type CaseStudy } from "@/lib/work"

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
    <LandingSection id="work" labelledBy="work-heading">
      <div className={cn("flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", inset)}>
        <SectionHeading eyebrow="Our work" title={title} id="work-heading">
          {intro}
        </SectionHeading>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href={pages.work.path} />}
          className="h-11 shrink-0 px-5 text-base"
        >
          See all case studies
        </Button>
      </div>
      <div data-reveal="children" className={cn("grid gap-6", studies.length > 1 && "md:grid-cols-2")}>
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
    </LandingSection>
  )
}
