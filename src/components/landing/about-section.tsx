import Image from "next/image"
import { cn } from "cn"

import { SectionHeading } from "@/components/landing/section-heading"
import { SocialLinks } from "@/components/social-links"
import { inset } from "@/lib/frame"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/**
 * The studio and its founder, as an editorial band rather than a card: the
 * whole section is the flat periwinkle that sits behind cut-out portraits
 * (.surface-portrait, the same in both themes), and the portrait stands on
 * its bottom edge. The heading and the bio, set large, sit beside it. The
 * guides are redrawn over the band (.ruled) with a rail joint at each end.
 */
export function AboutSection() {
  return (
    <>
      <div aria-hidden="true" className="rail-joint" />
      <section
        aria-labelledby="about-heading"
        id="about"
        className="surface-portrait ruled scroll-mt-0 overflow-hidden px-4 pt-20 sm:px-6 sm:pt-28"
      >
        <article
          aria-labelledby="founder-name"
          className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16"
        >
          <div className={cn("flex flex-col gap-8 lg:order-2 lg:self-center lg:py-16", inset)}>
            <SectionHeading eyebrow="About" title="A small studio, on purpose" id="about-heading" />
            <p data-reveal className="max-w-xl text-xl leading-snug text-pretty sm:text-2xl">
              {founder.bio}
            </p>
            <div data-reveal className="flex flex-col gap-4 border-t border-border pt-6">
              <p className="flex items-baseline gap-3">
                <span id="founder-name" className="text-2xl tracking-tight">
                  {founder.name}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {founder.role}
                </span>
              </p>
              {/* Dots only from sm up: on a phone the row wraps and a dot would lead the next line. */}
              <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground uppercase sm:gap-x-3">
                {founder.facts.map((fact, index) => (
                  <li key={fact} className="flex items-center gap-3">
                    {index > 0 && (
                      <span aria-hidden="true" className="hidden sm:inline">
                        ·
                      </span>
                    )}
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="-ml-2">
                <SocialLinks name={founder.fullName} profiles={founder.socials} />
              </div>
            </div>
          </div>

          {/* The cut-out builds in from pixels as it scrolls into view
              (data-reveal="pixels" in globals.css), standing on the band's edge. */}
          <div
            data-reveal="pixels"
            className="pixel-in relative mx-auto aspect-square w-full max-w-md lg:order-1 lg:max-w-none"
          >
            <Image
              src={founder.image}
              alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
              fill
              sizes="(min-width: 1152px) 520px, (min-width: 1024px) 45vw, 448px"
              className="object-contain object-bottom"
            />
          </div>
        </article>
      </section>
      <div aria-hidden="true" className="rail-joint" />
    </>
  )
}
