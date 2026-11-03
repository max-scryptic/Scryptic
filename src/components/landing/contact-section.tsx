import Link from "next/link"

import { Button } from "@/components/ui/button"
import { pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/** The closing call to action: one card with the booking button and the studio's email. */
export function ContactSection({
  title = "Start with a discovery call",
  text = "Tell us what you are building and where it is stuck. You will leave knowing the next step.",
}: {
  title?: string
  text?: string
}) {
  return (
    <section aria-labelledby="contact-heading" id="contact" className="scroll-mt-28 px-4 pb-24 sm:px-6">
      <div
        data-reveal="zoom"
        className="corners guides mx-auto flex max-w-6xl flex-col items-center gap-6 border border-border bg-card px-6 py-16 text-center sm:py-20"
      >
        <h2 id="contact-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-pretty text-muted-foreground">{text}</p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={pages.bookCall.path} />}
          className="h-11 px-6 text-base"
        >
          Book a discovery call
        </Button>
        <p className="font-mono text-xs text-muted-foreground">
          or email{" "}
          <a href={`mailto:${siteConfig.organization.email}`} className="text-primary hover:underline">
            {siteConfig.organization.email}
          </a>
        </p>
      </div>
    </section>
  )
}
