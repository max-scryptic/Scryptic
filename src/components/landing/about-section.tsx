import Image from "next/image"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { SocialLinks } from "@/components/social-links"
import { inset } from "@/lib/frame"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/** The studio and its founder, with the founder's portrait, bio and profiles. */
export function AboutSection() {
  return (
    <LandingSection id="about" labelledBy="about-heading" className="gap-16">
      <div className={cn("flex flex-col gap-6", inset)}>
        <SectionHeading eyebrow="About us" title="A small studio, on purpose" id="about-heading">
          {siteConfig.name} takes on a few projects at a time, so you work directly with the
          developer building your product.
        </SectionHeading>
      </div>

      <article
        aria-labelledby="founder-name"
        data-reveal
        className="corners guides grid border border-border bg-card sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        <div className="relative aspect-square bg-portrait">
          <Image
            src={founder.image}
            alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
            fill
            sizes="(min-width: 1152px) 460px, (min-width: 640px) 40vw, 100vw"
            className="object-cover object-bottom"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">{founder.role}</p>
            <h3 id="founder-name" className="text-2xl tracking-tight sm:text-3xl">
              {founder.name}
            </h3>
          </div>
          <p className="max-w-xl text-pretty text-muted-foreground">{founder.bio}</p>
          {/* Dots only from sm up: on a phone the row wraps and a dot would lead the next line. */}
          <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground uppercase sm:gap-x-3">
            {founder.facts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="hidden text-primary sm:inline">
                    ·
                  </span>
                )}
                {fact}
              </li>
            ))}
          </ul>
          <SocialLinks name={founder.fullName} profiles={founder.socials} />
        </div>
      </article>
    </LandingSection>
  )
}
