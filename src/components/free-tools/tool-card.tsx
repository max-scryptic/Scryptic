import Link from "next/link"

import { ToolPreview } from "@/components/free-tools/tool-preview"
import type { FreeTool, FreeToolSlug } from "@/lib/free-tools"

/**
 * A free tool in a grid: an example of its result, then its name, what it
 * does and its call to action, laid out like the case study cards. The whole
 * card is one link, named after the tool.
 */
export function ToolCard({
  tool,
  headingLevel: Heading = "h2",
}: {
  tool: FreeTool & { slug: FreeToolSlug }
  /** h2 on /tools, h3 under another tool. */
  headingLevel?: "h2" | "h3"
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50">
      <ToolPreview slug={tool.slug} />
      <div className="flex flex-1 flex-col items-start gap-3 p-6 sm:p-8">
        <Heading className="text-2xl tracking-tight">
          <Link
            href={`/tools/${tool.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none after:focus-visible:ring-3 after:focus-visible:ring-ring/50"
          >
            {tool.name}
          </Link>
        </Heading>
        <p className="text-pretty text-muted-foreground">{tool.summary}</p>
        <p aria-hidden="true" className="mt-auto flex items-center gap-2 pt-2 font-medium">
          {tool.cta}
          <span className="text-primary transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
            &rarr;
          </span>
        </p>
      </div>
    </article>
  )
}
