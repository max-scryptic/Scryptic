import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"

import { type CaseStudy } from "@/lib/work"

/**
 * A case study in a grid: cover screenshot, name, category and summary. The
 * whole card is one link, named after the study so the link text says where
 * it goes.
 */
export function CaseStudyCard({
  study,
  headingLevel: Heading = "h2",
  className,
}: {
  study: CaseStudy
  /** h2 on /work, h3 inside a home page section. */
  headingLevel?: "h2" | "h3"
  className?: string
}) {
  return (
    <article
      className={cn(
        "group corners corners-grow flex flex-col border border-border bg-card transition-colors hover:border-primary/50",
        className,
      )}
    >
      <div className="overflow-hidden border-b border-border bg-muted">
        <Image
          src={study.cover.src}
          alt={study.cover.alt}
          sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="block aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{study.category}</p>
        <Heading className="text-2xl tracking-tight">
          <Link
            href={`/work/${study.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:ring-3 after:focus-visible:ring-ring/50"
          >
            {study.name}
            <span className="sr-only"> case study</span>
          </Link>
        </Heading>
        <p className="text-pretty text-muted-foreground">{study.summary}</p>
        <ul aria-label="Built with" className="mt-auto flex flex-wrap gap-2 pt-3 font-mono text-xs">
          {study.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="bg-primary/10 px-3 py-1 text-primary">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
