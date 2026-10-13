import Link from "next/link"

import { readingMinutes, type BlogPost } from "@/lib/blog"

/**
 * A blog post in a grid: the tool, title, summary and reading time. The whole
 * card is one link, named after the post so the link text says where it goes.
 */
export function PostCard({
  post,
  headingLevel: Heading = "h3",
}: {
  post: BlogPost
  /** h4 under a category heading on /blog, h3 in a post's related list. */
  headingLevel?: "h3" | "h4"
}) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{post.tool}</p>
      <Heading className="text-xl tracking-tight text-balance">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none after:focus-visible:ring-3 after:focus-visible:ring-ring/50"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="text-sm text-pretty text-muted-foreground">{post.description}</p>
      <p className="mt-auto pt-2 font-mono text-xs text-muted-foreground">
        {readingMinutes(post)} min read
      </p>
    </article>
  )
}
