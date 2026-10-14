import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { postCategories, postSeries, postsInCategory, postsInSeries } from "@/lib/blog"
import { blogPostPages, createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"

export const metadata = createMetadata(pages.blog)

const categoryId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

export default function BlogPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.blog} nodes={[itemListJsonLd(pages.blog, blogPostPages)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            The {siteConfig.name} <span className="text-primary">blog</span>
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Practical guides on building, launching and growing apps, from the team that builds
            them.
          </p>
          <nav aria-label="Blog series">
            <ul className="flex flex-wrap gap-2 font-mono text-xs">
              {postSeries.map((series) => (
                <li key={series.id}>
                  <Link
                    href={`#${series.id}`}
                    className="block rounded-full bg-primary/10 px-3 py-1 text-primary transition-colors hover:bg-primary/20"
                  >
                    {series.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {postSeries.map((series) => {
          const seriesPosts = postsInSeries(series.id)
          if (seriesPosts.length === 0) return null

          return (
            <section
              key={series.id}
              id={series.id}
              aria-labelledby={`${series.id}-heading`}
              className="flex scroll-mt-28 flex-col gap-10"
            >
              <div className="flex max-w-2xl flex-col gap-3">
                <p className="font-mono text-xs tracking-widest text-primary uppercase">Series</p>
                <h2
                  id={`${series.id}-heading`}
                  className="text-3xl tracking-tight text-balance sm:text-4xl"
                >
                  {series.name}
                </h2>
                <p className="text-lg text-pretty text-muted-foreground">{series.intro}</p>
              </div>

              {series.id === "migration" ? (
                // The migration guides are many, so they sit in one group per kind of tool.
                postCategories.map((category) => {
                  const id = categoryId(category.name)
                  const categoryPosts = postsInCategory(category.name)
                  if (categoryPosts.length === 0) return null

                  return (
                    <section
                      key={category.name}
                      id={id}
                      aria-labelledby={`${id}-heading`}
                      className="flex scroll-mt-28 flex-col gap-6 border-t border-border pt-10"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 id={`${id}-heading`} className="text-2xl tracking-tight">
                          {category.name}
                        </h3>
                        <p className="max-w-2xl text-pretty text-muted-foreground">
                          {category.text}
                        </p>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categoryPosts.map((post) => (
                          <PostCard key={post.slug} post={post} headingLevel="h4" />
                        ))}
                      </div>
                    </section>
                  )
                })
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {seriesPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </section>
          )
        })}

        <section
          aria-labelledby="blog-cta-heading"
          className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="blog-cta-heading" className="text-2xl tracking-tight text-balance">
            Planning an app, or stuck with one?
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Book a free discovery call and tell us what you are building or show us what you have.
            You get straight advice on scope, stack, cost and timeline, then a written estimate
            before any work starts.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 rounded-full px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>
      </div>
    </main>
  )
}
