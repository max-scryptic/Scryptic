import Image from "next/image"

import { BookCallForm } from "@/components/book-call-form"
import { PageJsonLd } from "@/components/json-ld"
import { createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { founder } from "@/lib/team"

export const metadata = createMetadata(pages.bookCall)

const agenda = [
  {
    name: "Your idea or product",
    text: "What you are building, who it is for and where it is stuck. If something already exists, we look at it together.",
  },
  {
    name: "Straight advice",
    text: "An honest view on scope, stack, rough cost and how long it will take, including what is not worth building yet. Useful even if we are not the right fit.",
  },
  {
    name: "A clear next step",
    text: "If it makes sense to work together, you get a written estimate and timeline for the build before anything starts. Most builds launch within one to two months.",
  },
]

export default function BookCallPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.bookCall} />

      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-10 lg:sticky lg:top-32">
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Book a free <span className="text-primary">30 minute</span> discovery call
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
                {founder.role}, {siteConfig.name}
              </p>
            </div>
          </div>
        </div>

        <BookCallForm />
      </div>
    </main>
  )
}
