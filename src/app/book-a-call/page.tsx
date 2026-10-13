import Image from "next/image"

import { BookCallForm } from "@/components/book-call-form"
import { PageJsonLd } from "@/components/json-ld"
import { createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

export const metadata = createMetadata(pages.bookCall)

export default function BookCallPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.bookCall} />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-10 lg:sticky lg:top-32">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
              Book a free <span className="text-primary">30 minute</span> discovery call
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              Answer four quick questions, then pick a time that suits you. You speak directly
              with {founder.name}, who plans and builds every {siteConfig.name} project, so no
              pitch deck or preparation is needed.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t border-border pt-8">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-portrait">
              <Image
                src={founder.image}
                alt={`Portrait of ${founder.name}, ${founder.role.toLowerCase()} of ${siteConfig.name}`}
                fill
                sizes="56px"
                className="object-cover object-bottom"
              />
            </div>
            <div className="flex flex-col gap-0.5 text-sm">
              <p className="font-medium">You will speak with {founder.name}</p>
              <p className="text-muted-foreground">
                {founder.role}, {siteConfig.name}. Prefer email? Write to{" "}
                <a
                  href={`mailto:${siteConfig.organization.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.organization.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <BookCallForm />
      </div>
    </main>
  )
}
