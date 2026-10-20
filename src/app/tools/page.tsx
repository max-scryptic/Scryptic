import { ToolCard } from "@/components/free-tools/tool-card"
import { PageJsonLd } from "@/components/json-ld"
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
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            Free tools for founders <span className="text-primary">building an app</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Price your MVP, cut it down to a first release, decide between no-code and real code,
            plan the launch and check your site is ready for search and AI agents. Free, with no
            sign up, from the team at {siteConfig.name}.
          </p>
        </div>

        <section aria-label="Free tools" className="grid gap-6 md:grid-cols-2">
          {freeTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </section>
      </div>
    </main>
  )
}
