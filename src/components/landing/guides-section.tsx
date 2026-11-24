import Link from "next/link"

import { ToolList } from "@/components/free-tools/tool-list"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { PostCard } from "@/components/post-card"
import { PostCarousel } from "@/components/post-carousel"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"
import { inset } from "@/lib/frame"
import type { FreeTool } from "@/lib/free-tools"
import { pages } from "@/lib/seo"

/** The most guides shown side by side before the row becomes a carousel. */
const MAX_IN_ROW = 3

/** Blog posts and free tools that go deeper on a service page's subject. */
export function GuidesSection({
  title,
  posts,
  tools = [],
  more = { label: "All guides", href: pages.blog.path },
}: {
  title: string
  posts: BlogPost[]
  tools?: FreeTool[]
  more?: { label: string; href: string }
}) {
  const heading = (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeading eyebrow="Guides" title={title} id="guides-heading" />
      <Button
        size="lg"
        variant="outline"
        nativeButton={false}
        render={<Link href={more.href} />}
        className="h-11 shrink-0 px-5 text-base"
      >
        {more.label}
      </Button>
    </div>
  )

  return (
    <LandingSection id="guides" labelledBy="guides-heading">
      {/* One row of guides at most: past three they scroll sideways, as the blog's
          series do, with the arrows beside the heading. */}
      {posts.length > MAX_IN_ROW ? (
        <PostCarousel
          label={`${title} guides`}
          heading={heading}
          className="gap-12"
          items={posts.map((post) => ({ id: post.slug, card: <PostCard post={post} /> }))}
        />
      ) : (
        <>
          <div className={inset}>{heading}</div>
          {posts.length > 0 && (
            <div data-reveal="children" className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
      {tools.length > 0 && <ToolList tools={tools} />}
    </LandingSection>
  )
}
