import Image from "next/image"
import { cn } from "cn"

import { LandingSection, SectionHeading, type SectionBand } from "@/components/landing/section-heading"
import { SocialLinks } from "@/components/social-links"
import { inset } from "@/lib/frame"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/**
 * The studio and its founder, as a single pull quote: the portrait on the
 * left, the quote large on the right, and only the founder's name and
 * profile links along the bottom. No card: the frame is the guides, run out
 * across the page above and below, with a rule between the two halves.
 */
export function AboutSection({ band }: { band?: SectionBand } = {}) {
  return (
    <LandingSection id="about" labelledBy="about-heading" space="loose" band={band} className="gap-16">
      <div className={cn("flex flex-col gap-6", inset)}>
        <SectionHeading eyebrow="About" title="A small studio, on purpose" id="about-heading" />
      </div>

      <figure className="pip guides grid border-y border-border sm:grid-cols-2">
        <div className="relative aspect-square">
          {/* The cut-out portrait stays put; only the backdrop behind it builds in
              from pixels as it scrolls into view (data-reveal="pixels" in globals.css). */}
          <div aria-hidden="true" data-reveal="pixels" className="pixel-in absolute inset-0 bg-portrait" />
          <Image
            src={founder.image}
            alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
            fill
            sizes="(min-width: 1152px) 576px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-bottom"
          />
        </div>

        <div className="flex flex-col justify-between border-border sm:border-l">
          <blockquote
            data-reveal
            className="px-6 pt-10 pb-12 text-3xl leading-[1.1] tracking-[-0.025em] text-balance sm:px-10 sm:pt-12 lg:text-5xl"
          >
            <p>
              “{founder.quote.lead} <span className="text-primary">{founder.quote.highlight}</span>”
            </p>
          </blockquote>

          <figcaption className="flex items-center justify-between gap-4 border-t border-border py-3 pr-4 pl-6 sm:pl-10">
            <p className="flex items-baseline gap-3">
              <span className="text-lg tracking-tight">{founder.name}</span>
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{founder.role}</span>
            </p>
            <SocialLinks name={founder.fullName} profiles={founder.socials} />
          </figcaption>
        </div>
      </figure>
    </LandingSection>
  )
}
