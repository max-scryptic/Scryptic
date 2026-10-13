import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata(pages.blog)

const topics = ["Scoping an MVP", "Choosing a stack", "Build cost", "Launch"]

export default function BlogPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.blog} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Notes on building and <span className="text-primary">launching apps</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Practical writing for founders from the {siteConfig.name} studio: how to scope a
            first release, pick a stack, estimate what a build costs and get a product in front
            of users.
          </p>
          <ul className="flex flex-wrap gap-2 font-mono text-xs">
            {topics.map((topic) => (
              <li key={topic} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <section
          aria-labelledby="posts-heading"
          className="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="posts-heading" className="text-xl tracking-tight">
            The first posts are on the way
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Nothing is published yet. If you have a question about your own app in the meantime,
            a free discovery call is the quickest way to get a straight answer.
          </p>
          <Button size="lg" nativeButton={false} render={<Link href={pages.bookCall.path} />}>
            Book a call
          </Button>
        </section>
      </div>
    </main>
  )
}
