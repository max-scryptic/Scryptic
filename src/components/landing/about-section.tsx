import Image from "next/image"

import { LandingSection } from "@/components/landing/section-heading"
import { SocialLinks } from "@/components/social-links"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/**
 * The studio and its founder in one card. No eyebrow or heading block above
 * it: the portrait opens the section, and the studio heading and intro lead
 * the card's text, followed by the founder's name, bio and profiles.
 */
export function AboutSection() {
  return (
    <LandingSection id="about" labelledBy="about-heading">
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
          <h2 id="about-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
            A small studio, on purpose
          </h2>
          <p className="max-w-xl text-lg text-pretty">
            {siteConfig.name} takes on a few projects at a time, so you work directly with the
            developer building your product.
          </p>
          <div className="flex flex-col gap-1 border-t border-border pt-5">
            <h3 id="founder-name" className="text-2xl tracking-tight">
              {founder.name}
            </h3>
            <p className="text-sm text-muted-foreground">{founder.role}</p>
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
