import Image from "next/image"
import { cn } from "cn"

import { Icon } from "@/components/landing/icons"
import type { Tech } from "@/lib/tech"

/*
 * A tool's mark on a white tile, in its own colours in both themes, like the
 * home page's stack tiles. A tool without a logo shows its line icon in ink.
 * Decorative: always render the tool's name beside it.
 */
export function TechMark({ tool, className }: { tool: Tech; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center border border-border bg-white p-2 text-[#14131b] dark:border-transparent",
        className,
      )}
    >
      {tool.logo ? (
        <Image src={tool.logo} alt="" className="size-full object-contain" />
      ) : tool.icon ? (
        <Icon name={tool.icon} className="size-full" />
      ) : null}
    </span>
  )
}
