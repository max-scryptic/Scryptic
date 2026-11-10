import Image from "next/image"
import { cn } from "cn"

import { Icon } from "@/components/landing/icons"
import { CheckIcon, LandingSection } from "@/components/landing/section-heading"
import { StoreListing, type Store } from "@/components/landing/store-listing"
import { inset } from "@/lib/frame"
import type { MobileTool } from "@/lib/stack"

/*
 * The sections particular to the mobile app development page: one wide
 * section per platform, with that platform's store listing beside the copy,
 * and the tools behind it as tiles. Logos sit on a white square in both
 * themes, like the stack band; a tool without a logo we may show gets a line
 * icon on a tinted square instead.
 */

export function ToolTiles({ tools, className }: { tools: MobileTool[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:gap-3", className)}>
      {tools.map((tool) => (
        // Logo above the name on phones, beside it once a tile has the width.
        <li
          key={tool.name}
          className="flex flex-col items-start gap-3 border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
        >
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center",
              tool.logo ? "bg-white p-2" : "bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground",
            )}
          >
            {tool.logo ? (
              <Image src={tool.logo} alt="" className="size-full object-contain" />
            ) : (
              <Icon name={tool.icon ?? "code"} className="size-5" />
            )}
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="font-medium text-pretty">{tool.name}</span>
            <span className="font-mono text-xs text-pretty text-muted-foreground">{tool.role}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** One platform: its store listing on one side, what we build and with what on the other. */
export function PlatformSection({
  id,
  eyebrow,
  title,
  summary,
  points,
  store,
  tools,
  reverse = false,
}: {
  id: string
  eyebrow: string
  title: string
  summary: string
  points: string[]
  store: Store
  tools: MobileTool[]
  /** Put the listing on the right on wide screens, to alternate with the section before. */
  reverse?: boolean
}) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      {/* On wide screens both columns stretch to the taller one, and the listing grows to match the copy. */}
      <div className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", inset)}>
        <div data-reveal className={cn("mx-auto flex w-full max-w-lg", reverse && "lg:order-last")}>
          <StoreListing store={store} className="w-full" />
        </div>
        <div data-reveal="children" className="flex flex-col gap-5">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="text-3xl tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="text-lg text-pretty text-muted-foreground">{summary}</p>
          <ul className="flex flex-col gap-3 text-pretty">
            {points.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Built with</p>
            <ToolTiles tools={tools} />
          </div>
        </div>
      </div>
    </LandingSection>
  )
}
