import Image from "next/image"

import { SocialLinks } from "@/components/social-links"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

/** "About the author" at the end of a blog post: who wrote it and where to find them. */
export function AuthorBio() {
  return (
    <section
      aria-labelledby="author-heading"
      className="grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-4 lg:py-8"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-portrait">
        <Image
          src={founder.image}
          alt={`Portrait of ${founder.fullName}`}
          fill
          sizes="64px"
          className="object-cover object-bottom"
        />
      </div>
      <div className="flex flex-col justify-center gap-0.5">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Written by
        </p>
        <h2 id="author-heading" className="text-lg tracking-tight">
          {founder.fullName}
        </h2>
        <p className="text-sm text-muted-foreground">
          {founder.role}, {siteConfig.name}
        </p>
      </div>
      <div className="col-span-2 flex flex-col gap-3 sm:col-start-2 sm:col-end-3">
        <p className="max-w-xl text-sm text-pretty text-muted-foreground">{founder.authorBio}</p>
        {/* Pull the icon row left so the glyphs line up with the text, not their hover circles. */}
        <div className="-ml-2">
          <SocialLinks name={founder.fullName} profiles={founder.socials} />
        </div>
      </div>
    </section>
  )
}
