import Link from "next/link"

import { ToolLogoWatermark } from "@/components/tool-logo"
import { readingMinutes, type BlogPost } from "@/lib/blog"

/**
 * A blog post in a grid: the topic, title, summary and reading time, with the
 * tool's logo, when it has one, as a watermark behind them. The whole card is one link, named
 * after the post so the link text says where it goes.
 */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative isolate flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
      <ToolLogoWatermark post={post} />
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{post.topic}</p>
      <h3 className="text-xl tracking-tight text-balance">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none after:focus-visible:ring-3 after:focus-visible:ring-ring/50"
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-pretty text-muted-foreground">{post.description}</p>
      <p className="mt-auto pt-2 font-mono text-xs text-muted-foreground">
        {readingMinutes(post)} min read
      </p>
    </article>
  )
}
