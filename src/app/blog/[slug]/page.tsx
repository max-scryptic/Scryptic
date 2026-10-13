import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageJsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/post-card"
import { ToolLogo } from "@/components/tool-logo"
import { Button } from "@/components/ui/button"
import {
  formatPostDate,
  getPost,
  posts,
  readingMinutes,
  relatedPosts,
  type PostBlock,
} from "@/lib/blog"
import { blogPostPage, createMetadata, pages } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site"
import { articleJsonLd, faqJsonLd } from "@/lib/structured-data"
import { founder } from "@/lib/team"

// Only the posts in src/lib/blog exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return createMetadata(blogPostPage(post))
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === "paragraph") {
    return <p className="text-lg text-pretty text-muted-foreground">{block.text}</p>
  }

  if (block.type === "callout") {
    return (
      <aside className="flex flex-col gap-2 rounded-2xl border border-primary/50 bg-card p-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{block.title}</p>
        <p className="text-pretty">{block.text}</p>
      </aside>
    )
  }

  const List = block.ordered ? "ol" : "ul"

  return (
    <List className="flex flex-col gap-4">
      {block.items.map((item, index) => {
        const key = typeof item === "string" ? item : item.term

        return (
          <li key={key} className="flex gap-4">
            <span
              aria-hidden="true"
              className={
                block.ordered
                  ? "w-6 shrink-0 pt-1 font-mono text-sm text-primary"
                  : "mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
              }
            >
              {block.ordered ? String(index + 1).padStart(2, "0") : null}
            </span>
            <p className="text-lg text-pretty text-muted-foreground">
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  <strong className="font-medium text-foreground">{item.term}.</strong>{" "}
                  {item.text}
                </>
              )}
            </p>
          </li>
        )
      })}
    </List>
  )
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const page = blogPostPage(post)
  const published = formatPostDate(post.datePublished)
  const faqHeadingId = "faq-heading"

  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd
        page={page}
        nodes={[
          articleJsonLd(page, {
            headline: post.title,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            authorName: founder.name,
            authorUrl: absoluteUrl("/#about"),
          }),
          faqJsonLd(page, post.faqs),
        ]}
      />

      <article className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <header className="flex flex-col gap-10">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={pages.blog.path} className="hover:text-foreground">
                  {pages.blog.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {post.tool}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <ToolLogo post={post} />
                <p className="font-mono text-xs tracking-widest text-primary uppercase">
                  Migration guide &middot; {post.category}
                </p>
              </div>
              <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">{post.title}</h1>
              <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{post.summary}</p>
              <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>By {founder.name}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={post.datePublished}>{published}</time>
                {post.dateModified ? (
                  <>
                    <span aria-hidden="true">/</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time>
                    </span>
                  </>
                ) : null}
                <span aria-hidden="true">/</span>
                <span>{readingMinutes(post)} min read</span>
              </p>
            </div>

            <dl className="grid gap-5 rounded-2xl border border-border bg-card p-6 text-sm sm:grid-cols-2">
              {post.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              On this page
            </p>
            <ol className="flex flex-col gap-3 text-sm">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className="text-pretty text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {section.heading}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Frequently asked questions
                </Link>
              </li>
            </ol>
          </nav>

          <div className="flex max-w-3xl flex-col gap-14">
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="flex scroll-mt-28 flex-col gap-6"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="text-2xl tracking-tight text-balance sm:text-3xl"
                >
                  {section.heading}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}

            <section
              id="faq"
              aria-labelledby={faqHeadingId}
              className="flex scroll-mt-28 flex-col gap-6 border-t border-border pt-12"
            >
              <h2 id={faqHeadingId} className="text-2xl tracking-tight text-balance sm:text-3xl">
                Frequently asked questions
              </h2>
              <dl className="flex flex-col divide-y divide-border border-y border-border">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="flex flex-col gap-2 py-6">
                    <dt className="text-lg">{faq.question}</dt>
                    <dd className="text-pretty text-muted-foreground">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <footer className="flex flex-col gap-12 border-t border-border pt-12">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/50 bg-card p-6 sm:p-10">
            <p className="text-2xl tracking-tight text-balance">
              Ready to move your {post.tool} app to production?
            </p>
            <p className="max-w-xl text-pretty text-muted-foreground">
              Book a free discovery call and walk us through what you have built. We review the
              app, its data and its accounts, then send a plan, a written estimate and a timeline.
              Most builds go live in one to two months.
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={pages.bookCall.path} />}
              className="h-11 rounded-full px-6 text-base"
            >
              Book a discovery call
            </Button>
          </div>

          <section aria-labelledby="related-heading" className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="related-heading" className="text-2xl tracking-tight">
                More migration guides
              </h2>
              <Link href={pages.blog.path} className="text-sm text-primary hover:underline">
                All {posts.length} guides
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts(post).map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        </footer>
      </article>
    </main>
  )
}
