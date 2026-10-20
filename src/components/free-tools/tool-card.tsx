import Link from "next/link"

import { ToolIcon } from "@/components/free-tools/tool-icon"
import type { FreeTool } from "@/lib/free-tools"

/**
 * A free tool in a grid: icon tile, name, what it does and its call to
 * action. The whole card is one link, named after the tool.
 */
export function ToolCard({
  tool,
  headingLevel: Heading = "h2",
}: {
  tool: FreeTool
  /** h2 on /tools, h3 under another tool. */
  headingLevel?: "h2" | "h3"
}) {
  return (
    <article className="group relative flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8">
      <span className="flex size-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:size-14">
        <ToolIcon icon={tool.icon} className="size-6" />
      </span>
      <Heading className="mt-2 text-2xl tracking-tight">
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
    </article>
  )
}
