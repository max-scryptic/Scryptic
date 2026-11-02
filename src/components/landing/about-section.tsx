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
        <SectionHeading eyebrow="About us" title="About Scryptic" id="about-heading">
          {siteConfig.name} is a Brighton-based development studio for founders who need a working
          product, not a team to manage.
        </SectionHeading>
        <p data-reveal className="max-w-2xl text-pretty text-muted-foreground">
          Keeping the studio small is deliberate: a few projects at a time, each with full attention
          and a catch-up every Friday. Scope, price and timeline are agreed before the build starts,
          so you always know what you are paying for, what you will get and when.
        </p>
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
          {founder.bio.map((paragraph) => (
            <p key={paragraph} className="max-w-xl text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <SocialLinks name={founder.fullName} profiles={founder.socials} />
        </div>
      </article>
    </LandingSection>
  )
}
