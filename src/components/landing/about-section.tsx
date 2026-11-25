import Image from "next/image"
import { cn } from "cn"

import { LandingSection, SectionHeading, type SectionBand } from "@/components/landing/section-heading"
import { SocialLinks } from "@/components/social-links"
import { inset } from "@/lib/frame"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/**
 * The studio and its founder, without a card: the portrait on the left, and
 * on the right a large pull quote from the bio, then who said it, the bio and
 * facts, with the profile links along the bottom.
 */
export function AboutSection({ band }: { band?: SectionBand } = {}) {
  return (
    <LandingSection id="about" labelledBy="about-heading" space="loose" band={band} className="gap-16">
      <div className={cn("flex flex-col gap-6", inset)}>
        <SectionHeading eyebrow="About" title="A small studio, on purpose" id="about-heading" />
      </div>

      <article
        aria-labelledby="founder-name"
        className="grid gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-12 lg:gap-16"
      >
        <div className="pip relative aspect-square">
          {/* The cut-out portrait stays put; only the backdrop behind it builds in
              from pixels as it scrolls into view (data-reveal="pixels" in globals.css). */}
          <div aria-hidden="true" data-reveal="pixels" className="pixel-in absolute inset-0 bg-portrait" />
          <Image
            src={founder.image}
            alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
            fill
            sizes="(min-width: 1152px) 460px, (min-width: 640px) 40vw, 100vw"
            className="object-cover object-bottom"
          />
        </div>

        <figure data-reveal="children" className={cn("flex flex-col justify-between gap-10 sm:pl-0", inset)}>
          <blockquote className="text-4xl leading-[1.04] tracking-[-0.03em] text-balance lg:text-6xl">
            <p>
              <span className="text-primary">“</span>
              {founder.quote.lead} <span className="text-primary">{founder.quote.highlight}”</span>
            </p>
          </blockquote>

          <figcaption className="flex flex-col gap-5">
            <p className="flex items-baseline gap-3">
              <span id="founder-name" className="text-2xl tracking-tight">
                {founder.name}
              </span>
              <span className="font-mono text-xs tracking-widest text-primary uppercase">{founder.role}</span>
            </p>
            <p className="max-w-xl text-pretty text-muted-foreground">{founder.bio}</p>
            {/* The links along the bottom, with the facts beside them from lg up. */}
            <div className="flex flex-col gap-4 border-t border-border pt-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Dots only from lg up: in a narrower column the row wraps and a dot would lead the next line. */}
              <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground uppercase lg:gap-x-3">
                {founder.facts.map((fact, index) => (
                  <li key={fact} className="flex items-center gap-3">
                    {index > 0 && (
                      <span aria-hidden="true" className="hidden text-primary lg:inline">
                        ·
                      </span>
                    )}
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="-ml-2 lg:-mr-2 lg:ml-0">
                <SocialLinks name={founder.fullName} profiles={founder.socials} />
              </div>
            </div>
          </figcaption>
        </figure>
      </article>
    </LandingSection>
  )
}
