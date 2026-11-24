import Image from "next/image"
import { cn } from "cn"

import { BookCallForm } from "@/components/book-call-form"
import { PageJsonLd } from "@/components/json-ld"
import { PixelIn } from "@/components/pixel-in"
import { inset, pageTop } from "@/lib/frame"
import { createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

export const metadata = createMetadata(pages.bookCall)

const agenda = [
  {
    name: "Your idea or product",
    text: "What you are building, who it is for and where it is stuck.",
  },
  {
    name: "Our recommendation",
    text: "The right scope, stack and package for you.",
  },
  {
    name: "A clear next step",
    text: "A fixed scope and price, then a 2 week sprint to launch.",
  },
]

export default function BookCallPage() {
  return (
    <main className={cn("flex flex-col px-4 pb-24 sm:px-6", pageTop)}>
      <PageJsonLd page={pages.bookCall} />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className={cn("flex flex-col gap-10 lg:sticky lg:top-32", inset)}>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Book a free <PixelIn className="text-primary">30 minute</PixelIn> discovery call
          </h1>

          <section aria-labelledby="agenda-heading" className="flex flex-col gap-5">
            <h2 id="agenda-heading" className="text-xl tracking-tight">
              What we cover on the call
            </h2>
            <ol className="flex flex-col gap-5">
              {agenda.map((item, index) => (
                <li key={item.name} className="flex gap-4">
                  <span className="font-mono text-sm text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3>{item.name}</h3>
                    <p className="text-sm text-pretty text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex items-center gap-4 border-t border-border pt-8">
            <div className="relative size-14 shrink-0 overflow-hidden bg-portrait">
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
