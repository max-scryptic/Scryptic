import Link from "next/link"

import { ToolIcon } from "@/components/free-tools/tool-icon"
import { toolGroups, type FreeTool } from "@/lib/free-tools"

/**
 * Free tools as rows in one panel: icon tile, name, what it does and its
 * call to action. Each row is one link, named after the tool. Grouped (on
 * /tools) each group gets an h2 and the tools h3s; ungrouped (under another
 * tool) the rows sit under the page's own h2.
 */
export function ToolList({ tools, grouped = false }: { tools: FreeTool[]; grouped?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {grouped ? (
        toolGroups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`tool-group-${group.id}`}
            className="border-t border-border first:border-t-0"
          >
            <h2
              id={`tool-group-${group.id}`}
              className="px-4 pt-6 pb-3 font-mono text-xs font-normal tracking-widest text-primary uppercase sm:px-6"
            >
              {group.name}
            </h2>
            <ToolRows tools={tools.filter((tool) => tool.group === group.id)} />
          </section>
        ))
      ) : (
        <ToolRows tools={tools} />
      )}
    </div>
  )
}

function ToolRows({ tools }: { tools: FreeTool[] }) {
  return (
    <ul className="[&:first-child>li:first-child]:border-t-0">
      {tools.map((tool) => (
        <li
          key={tool.slug}
          className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-border px-4 py-5 transition-colors hover:bg-primary/5 sm:gap-5 sm:px-6"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-secondary">
            <ToolIcon icon={tool.icon} className="size-5" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="text-xl tracking-tight">
              <Link
                href={`/tools/${tool.slug}`}
                className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:ring-3 after:focus-visible:ring-ring/50 after:focus-visible:ring-inset"
              >
                {tool.name}
              </Link>
            </h3>
            <p className="text-pretty text-muted-foreground">{tool.summary}</p>
          </div>
          <p aria-hidden="true" className="flex items-center gap-2 font-medium">
            <span className="hidden whitespace-nowrap lg:inline">{tool.cta}</span>
            <span className="text-lg text-primary transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              &rarr;
            </span>
          </p>
        </li>
      ))}
    </ul>
  )
}
