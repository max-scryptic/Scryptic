import { cn } from "cn"
import Image from "next/image"

import type { BlogPost } from "@/lib/blog"

const sizes = {
  // On a post card, beside the tool's name.
  sm: "size-10 rounded-xl p-2 text-lg",
  // In a post's header.
  lg: "size-16 rounded-2xl p-3 text-3xl sm:size-20 sm:p-4 sm:text-4xl",
}

/*
 * The logo of the tool a migration guide moves away from, on a white tile so
 * the brand's own colours read the same in light and dark mode. A post
 * without a logo file gets the tool's initial on the same tile, so the cards
 * line up either way.
 */
export function ToolLogo({
  post,
  size = "sm",
  decorative = false,
}: {
  post: Pick<BlogPost, "tool" | "logo">
  size?: keyof typeof sizes
  /** True when the tool's name is printed right beside it, as on a card. */
  decorative?: boolean
}) {
  const alt = decorative ? "" : `${post.tool} logo`

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center border border-black/10 bg-white",
        sizes[size],
      )}
    >
      {post.logo ? (
        <Image src={post.logo} alt={alt} className="size-full object-contain" />
      ) : (
        <span
          role={decorative ? undefined : "img"}
          aria-label={alt || undefined}
          aria-hidden={decorative || undefined}
          className="font-mono leading-none font-medium text-neutral-900"
        >
          {post.tool.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  )
}
