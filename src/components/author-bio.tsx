import Image from "next/image"

import { SocialLinks } from "@/components/social-links"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/** "About the author" at the end of a blog post: who wrote it and where to find them. */
export function AuthorBio() {
  return (
    <section
      aria-labelledby="author-heading"
      className="corners grid gap-6 border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10"
    >
      <div className="relative size-24 shrink-0 overflow-hidden bg-portrait sm:size-28">
        <Image
          src={founder.image}
          alt={`Portrait of ${founder.fullName}`}
          fill
          sizes="112px"
          className="object-cover object-bottom"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            About the author
          </p>
          <h2 id="author-heading" className="text-2xl tracking-tight">
            {founder.fullName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {founder.role}, {siteConfig.name}
          </p>
        </div>
        <p className="max-w-2xl text-pretty text-muted-foreground">{founder.authorBio}</p>
        <SocialLinks name={founder.fullName} profiles={founder.socials} />
      </div>
    </section>
  )
}
