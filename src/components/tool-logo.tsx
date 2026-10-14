import type { BlogPost } from "@/lib/blog"

type LogoProps = { post: Pick<BlogPost, "topic" | "logo"> }

/*
 * The tool's logo, large and faint in the corner of a post card. The logo is
 * a mask over the primary colour, so every brand becomes the same purple
 * silhouette in light and dark mode and never competes with the card's text.
 * Place it inside a positioned, isolated parent: it sits at -z-10, behind the
 * content but above the card's background. Decorative, since the card prints
 * the tool's name. Renders nothing for a post without a logo.
 */
export function ToolLogoWatermark({ post }: LogoProps) {
  if (!post.logo) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
    >
      <div
        className="absolute -right-10 -bottom-10 size-52 bg-primary opacity-10 mask-contain mask-center mask-no-repeat transition duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-20 dark:opacity-20 dark:group-hover:opacity-30"
        style={{ maskImage: `url(${post.logo.src})` }}
      />
    </div>
  )
}

/*
 * The logo of the tool a migration guide moves away from, in the post header,
 * on a faint primary tile. Like the watermark, the logo is a mask over the
 * primary colour, so every brand shows as the same purple silhouette in light
 * and dark mode. Renders nothing for a post without a logo.
 */
export function ToolLogo({ post }: LogoProps) {
  if (!post.logo) return null

  return (
    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 p-3 sm:size-20 sm:p-4">
      <span
        role="img"
        aria-label={`${post.topic} logo`}
        className="size-full bg-primary mask-contain mask-center mask-no-repeat"
        style={{ maskImage: `url(${post.logo.src})` }}
      />
    </span>
  )
}
