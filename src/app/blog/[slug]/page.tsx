import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
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
      <aside className="flex flex-col gap-2 rounded-2xl border border-primary/50 bg-card p-6">
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
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <Image
            src={block.image}
            alt={block.alt}
            sizes="(min-width: 768px) 768px, 100vw"
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
      <figure className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
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

  if (block.type === "checklist") {
    return (
      <ul className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
        {block.items.map((item) => (
          <li key={item} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 rounded-xs border border-primary/60"
            />
            <p className="text-pretty text-muted-foreground">{item}</p>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-2xl border border-border">
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
  const series = getSeries(post.series)
  const published = formatPostDate(post.datePublished)
  const faqHeadingId = "faq-heading"
  const faqHeading = post.faqHeading ?? "Frequently asked questions"
  const hasFaqs = post.faqs.length > 0
  // A short post reads better without a contents list beside it.
  const showContents = post.sections.length + (hasFaqs ? 1 : 0) >= 4

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
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
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

          <div
            className={
              post.facts
                ? "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14"
                : "grid gap-10"
            }
          >
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <ToolLogo post={post} />
                <p className="font-mono text-xs tracking-widest text-primary uppercase">
                  {series.label}
                  {post.category ? <> &middot; {post.category}</> : null}
                </p>
              </div>
              <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">{post.title}</h1>
              <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{post.summary}</p>
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

            {post.facts ? (
              <dl className="grid gap-5 rounded-2xl border border-border bg-card p-6 text-sm sm:grid-cols-2">
                {post.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </header>

        <div
          className={
            showContents
              ? "grid gap-12 border-t border-border pt-12 lg:grid-cols-[14rem_1fr] lg:gap-16"
              : "grid gap-12 border-t border-border pt-12"
          }
        >
          {showContents ? (
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
                {hasFaqs ? (
                  <li>
                    <Link
                      href="#faq"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {faqHeading}
                    </Link>
                  </li>
                ) : null}
              </ol>
            </nav>
          ) : null}

          {/* min-w-0 lets a wide table scroll in its own box instead of widening the page. */}
          <div className="flex min-w-0 max-w-3xl flex-col gap-14">
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
        </div>

        <footer className="flex flex-col gap-12 pt-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid lg:col-span-2">
              <AuthorBio />
            </div>

            {/* Same Lapis band as the home hero, in both themes. */}
            <div className="flex flex-col items-start gap-4 rounded-2xl bg-[#2b3fd6] p-6 text-white sm:p-10 lg:p-8">
              <p className="text-2xl tracking-tight text-balance">
                {series.cta.heading(post)}
              </p>
              <p className="text-pretty text-white/80">{series.cta.text}</p>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={pages.bookCall.path} />}
                className="h-11 rounded-full bg-white px-6 text-base text-[#2b3fd6] hover:bg-white/90 lg:mt-auto"
              >
                Book a discovery call
              </Button>
            </div>
          </div>

          <section aria-labelledby="related-heading" className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="related-heading" className="text-2xl tracking-tight">
                Keep reading
              </h2>
              <Link href={pages.blog.path} className="text-sm text-primary hover:underline">
                All {posts.length} posts
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
