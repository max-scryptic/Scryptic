import Link from "next/link"
import { cn } from "cn"

import { ToolList } from "@/components/free-tools/tool-list"
import { PageJsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { freeTools } from "@/lib/free-tools"
import { createMetadata, pages, toolPages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"

export const metadata = createMetadata(pages.tools)

export default function ToolsPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.tools} nodes={[itemListJsonLd(pages.tools, toolPages)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className={cn("flex flex-col items-start gap-6", inset)}>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Free tools for founders <span className="text-primary">building an app</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Price your MVP, cut it down to a first release, decide between no-code and real code,
            plan the launch and check your site is ready for search and AI agents. Free, with no
            sign up, from the team at {siteConfig.name}.
          </p>
        </div>

        <ToolList tools={freeTools} grouped />

        <section
          aria-labelledby="tools-cta-heading"
          className="corners guides flex flex-col items-start gap-4 border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="tools-cta-heading" className="text-2xl tracking-tight text-balance">
            Want a second opinion on your plan?
          </h2>
          <p className="text-pretty text-muted-foreground">
            The tools give you a starting point. Book a free discovery call and we will go through
            your scope, stack, cost and timeline with you, then send a written estimate before any
            work starts.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>
      </div>
    </main>
  )
}
