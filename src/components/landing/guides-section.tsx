import Link from "next/link"
import { cn } from "cn"

import { ToolList } from "@/components/free-tools/tool-list"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog"
import { inset } from "@/lib/frame"
import type { FreeTool } from "@/lib/free-tools"
import { pages } from "@/lib/seo"

/** Blog posts and free tools that go deeper on a service page's subject. */
export function GuidesSection({
  title,
  intro,
  posts,
  tools = [],
  more = { label: "All guides", href: pages.blog.path },
}: {
  title: string
  intro: React.ReactNode
  posts: BlogPost[]
  tools?: FreeTool[]
  more?: { label: string; href: string }
}) {
  return (
    <LandingSection id="guides" labelledBy="guides-heading">
      <div className={cn("flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", inset)}>
        <SectionHeading eyebrow="Guides" title={title} id="guides-heading">
          {intro}
        </SectionHeading>
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
      {posts.length > 0 && (
        <div data-reveal="children" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      {tools.length > 0 && <ToolList tools={tools} />}
    </LandingSection>
  )
}
