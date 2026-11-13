import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { notFound } from "next/navigation"

import { AuthorBio } from "@/components/author-bio"
import { PageJsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/post-card"
import { ToolLogo } from "@/components/tool-logo"
import { Button } from "@/components/ui/button"
import {
  formatPostDate,
  getPost,
  getSeries,
  posts,
  readingMinutes,
  relatedPosts,
  type PostBlock,
} from "@/lib/blog"
import { inset } from "@/lib/frame"
import { blogPostPage, createMetadata, pages } from "@/lib/seo"
import { serviceForPost } from "@/lib/service-pages"
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

// Every fact on one row at desktop width; written out in full so Tailwind sees each class.
const factColumns: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-3",
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-lg text-pretty text-muted-foreground">
        {block.text}
        {block.link ? (
          <>
            {" "}
            <Link href={block.link.href} className="text-primary hover:underline">
              {block.link.text}
            </Link>
          </>
        ) : null}
      </p>
    )
  }

  if (block.type === "callout") {
    return (
      <aside className="corners flex flex-col gap-2 border border-primary/50 bg-card p-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{block.title}</p>
        <p className="text-pretty">{block.text}</p>
      </aside>
    )
  }

  if (block.type === "subheading") {
    return <h3 className="pt-2 text-xl tracking-tight text-balance">{block.text}</h3>
  }

  if (block.type === "image") {
    return (
      // White in both themes: the diagrams are drawn on white.
      <figure className="flex flex-col gap-3">
        <div className="corners border border-border bg-white">
          <Image
            src={block.image}
            alt={block.alt}
            sizes="(min-width: 1152px) 1088px, 100vw"
            placeholder="blur"
            className="block h-auto w-full"
          />
        </div>
        {block.caption ? (
          <figcaption className="text-sm text-pretty text-muted-foreground">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  if (block.type === "caseStudy") {
    return (
      <figure className="corners flex flex-col gap-3 border border-border bg-card p-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Case study &middot; {block.company}
        </p>
        <p className="text-pretty">{block.text}</p>
        <figcaption className="text-sm text-muted-foreground">
          Source:{" "}
          <a
            href={block.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {block.source.title}
          </a>
          , {block.source.publisher}
        </figcaption>
      </figure>
    )
  }

  if (block.type === "code") {
    return (
      // The brackets sit on an outer box, as the scroll area would clip them.
      <figure className="corners border border-border bg-card">
        <figcaption className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
          {block.label}
        </figcaption>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono">{block.code}</code>
        </pre>
      </figure>
    )
  }

  if (block.type === "checklist") {
    return (
      <ul className="corners flex flex-col gap-3 border border-border bg-card p-6">
        {block.items.map((item) => (
          <li key={item} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 border border-primary/60"
            />
            <p className="text-pretty text-muted-foreground">{item}</p>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === "table") {
    return (
      // The brackets sit on an outer box, as the scroll area would clip them.
      <div className="corners border border-border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-xl text-left text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-card">
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="p-4 font-mono text-xs font-normal text-muted-foreground"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border border-t border-border">
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row" className="p-4 align-top font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={index} className="p-4 align-top text-pretty text-muted-foreground">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
                  : "mt-2.5 size-1.5 shrink-0 bg-primary"
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
  const series = getSeries(post.series)
  const service = serviceForPost(post)
  const published = formatPostDate(post.datePublished)
  const faqHeadingId = "faq-heading"
  const faqHeading = post.faqHeading ?? "Frequently asked questions"
  const hasFaqs = post.faqs.length > 0
  const contents = [
    ...post.sections.map((section) => ({ id: section.id, heading: section.heading })),
    ...(hasFaqs ? [{ id: "faq", heading: faqHeading }] : []),
  ]
  // A short post reads better without a contents list above it.
  const showContents = contents.length >= 4

  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd
        page={page}
        nodes={[
          articleJsonLd(page, {
            headline: post.title,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            authorName: founder.fullName,
            authorUrl: absoluteUrl("/#about"),
            authorSameAs: founder.socials.map((profile) => profile.href),
            image: page.image,
          }),
          ...(hasFaqs ? [faqJsonLd(page, post.faqs)] : []),
        ]}
      />

      <article className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <header className="flex flex-col gap-10">
          <nav aria-label="Breadcrumb" className={cn("font-mono text-xs text-muted-foreground", inset)}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={pages.blog.path} className="hover:text-foreground">
                  {pages.blog.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {post.topic}
              </li>
            </ol>
          </nav>

          <div className={cn("flex flex-col items-start gap-6", inset)}>
            <div className="flex items-center gap-4">
              <ToolLogo post={post} />
              <p className="font-mono text-xs tracking-widest text-primary uppercase">
                {series.label}
                {post.category ? <> &middot; {post.category}</> : null}
              </p>
            </div>
            <h1 className="max-w-4xl text-4xl tracking-tight text-balance sm:text-5xl">
              {post.title}
            </h1>
            <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
              <span>By {founder.fullName}</span>
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
        </header>

        <div className="flex flex-col gap-6">
          {/* The post's answer up front, with its quick facts underneath, across the full column. */}
          <section
            aria-labelledby="in-short-heading"
            className="corners guides flex flex-col border border-border bg-card"
          >
            <div className="relative flex flex-col gap-5 px-6 py-8 sm:px-8 lg:py-10">
              {/* Drawn over the border, so the summary keeps the facts' left edge. */}
              <span aria-hidden="true" className="absolute -inset-y-px -left-px w-1 bg-primary" />
              <h2
                id="in-short-heading"
                className="flex items-center gap-3 font-mono text-xs tracking-widest text-primary uppercase"
              >
                <span aria-hidden="true" className="size-2 bg-primary" />
                In short
              </h2>
              <p className="text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">
                {post.summary}
              </p>
            </div>

            {post.facts ? (
              <dl
                className={cn(
                  "grid gap-px border-t border-border bg-border sm:grid-cols-2",
                  factColumns[post.facts.length],
                )}
              >
                {post.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 bg-card px-6 py-5 sm:px-8 sm:odd:last:col-span-2 lg:odd:last:col-span-1"
                  >
                    <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
                    <dd className="text-pretty">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>

          {showContents ? (
            <nav aria-label="On this page" className={cn("flex flex-col gap-3 pt-4", inset)}>
              <p className="font-medium">On this page</p>
              <ol className="flex list-outside list-decimal flex-col gap-1.5 pl-5 text-muted-foreground marker:text-muted-foreground">
                {contents.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      href={`#${entry.id}`}
                      className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {entry.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>

        {/* min-w-0 lets a wide table scroll in its own box instead of widening the page. */}
        <div className={cn("flex min-w-0 flex-col gap-14", inset)}>
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

          {hasFaqs ? (
            <section
              id="faq"
              aria-labelledby={faqHeadingId}
              className="flex scroll-mt-28 flex-col gap-6"
            >
              <h2 id={faqHeadingId} className="text-2xl tracking-tight text-balance sm:text-3xl">
                {faqHeading}
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
          ) : null}
        </div>

        <footer className="flex flex-col gap-12 pt-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="guides grid lg:col-span-2">
              <AuthorBio />
            </div>

            {/* Same Lapis band as the home hero, in both themes. */}
            <div className="corners guides flex flex-col items-start gap-4 bg-[#2b3fd6] p-6 text-white [--corner:var(--foreground)] sm:p-10 lg:p-8">
              <p className="text-2xl tracking-tight text-balance">
                {series.cta.heading(post)}
              </p>
              <p className="text-pretty text-white/80">{series.cta.text}</p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={pages.bookCall.path} />}
                className="h-11 bg-white px-6 text-base text-[#2b3fd6] hover:bg-white/90 lg:mt-auto"
              >
                Book a discovery call
              </Button>
              {service && (
                <Link href={service.page.path} className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline">
                  {service.learnMore}
                </Link>
              )}
            </div>
          </div>

          <section aria-labelledby="related-heading" className="flex flex-col gap-6">
            <div className={cn("flex flex-wrap items-baseline justify-between gap-4", inset)}>
              <h2 id="related-heading" className="text-2xl tracking-tight">
                Keep reading
              </h2>
              <Link href={pages.blog.path} className="text-sm text-primary hover:underline">
                All {posts.length} posts
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {/* The guides go on a wrapper, outside the card's own stacking context, so they run behind the cards. */}
              {relatedPosts(post).map((related) => (
                <div key={related.slug} className="guides grid">
                  <PostCard post={related} />
                </div>
              ))}
            </div>
          </section>
        </footer>
      </article>
    </main>
  )
}
