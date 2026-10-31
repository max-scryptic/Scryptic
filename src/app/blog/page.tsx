import Link from "next/link"
import { cn } from "cn"

import { PageJsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/post-card"
import { PostCarousel } from "@/components/post-carousel"
import { Button } from "@/components/ui/button"
import { latestPosts, postCategories, postSeries, postsInCategory, postsInSeries } from "@/lib/blog"
import { inset } from "@/lib/frame"
import { blogPostPages, createMetadata, pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { itemListJsonLd } from "@/lib/structured-data"

export const metadata = createMetadata(pages.blog)

/** How many of the newest posts the gallery at the top shows. */
const LATEST_COUNT = 6

export default function BlogPage() {
  return (
    <main className="flex flex-col px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <PageJsonLd page={pages.blog} nodes={[itemListJsonLd(pages.blog, blogPostPages)]} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <div className={cn("flex flex-col items-start gap-6", inset)}>
          <h1 className="text-4xl tracking-tight text-balance sm:text-5xl">
            The {siteConfig.name} <span className="text-primary">blog</span>
          </h1>
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">
            Practical guides on building, launching and growing apps, from the team that builds
            them.
          </p>
          <nav aria-label="Blog series">
            <ul className="flex flex-wrap gap-2 font-mono text-xs">
              {[{ id: "latest", name: "Latest" }, ...postSeries].map((series) => (
                <li key={series.id}>
                  <Link
                    href={`#${series.id}`}
                    className="block bg-primary/10 px-3 py-1 text-primary transition-colors hover:bg-primary/20"
                  >
                    {series.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section aria-labelledby="latest-heading" id="latest" className="flex scroll-mt-28 flex-col gap-10">
          <h2 id="latest-heading" className={cn("text-3xl tracking-tight text-balance sm:text-4xl", inset)}>
            Latest posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts(LATEST_COUNT).map((post, index) => (
              // Phones show the first three, so the gallery doesn't become a long column. The
              // guides go on this wrapper, outside the card's own stacking context, so they
              // run behind the cards.
              <div key={post.slug} className={cn("guides", index < 3 ? "grid" : "hidden md:grid")}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>

        {/* Each series is one sideways-scrolling row, so the page stays the same length as posts are added. */}
        {postSeries.map((series) => {
          // The migration guides are many, so their row can be narrowed to one kind of tool.
          const seriesPosts =
            series.id === "migration"
              ? postCategories.flatMap((category) => postsInCategory(category.name))
              : postsInSeries(series.id)
          if (seriesPosts.length === 0) return null

          return (
            <section
              key={series.id}
              id={series.id}
              aria-labelledby={`${series.id}-heading`}
              className="flex scroll-mt-28 flex-col gap-8 pt-12"
            >
              <div className={cn("flex max-w-2xl flex-col gap-3", inset)}>
                <p className="font-mono text-xs tracking-widest text-primary uppercase">Series</p>
                <h2
                  id={`${series.id}-heading`}
                  className="text-3xl tracking-tight text-balance sm:text-4xl"
                >
                  {series.name}
                </h2>
                <p className="text-lg text-pretty text-muted-foreground">{series.intro}</p>
              </div>

              <PostCarousel
                label={`${series.name} posts`}
                items={seriesPosts.map((post) => ({
                  id: post.slug,
                  group: post.category,
                  card: <PostCard post={post} />,
                }))}
                groups={
                  series.id === "migration"
                    ? postCategories.filter((category) => postsInCategory(category.name).length > 0)
                    : undefined
                }
              />
            </section>
          )
        })}

        <section
          aria-labelledby="blog-cta-heading"
          className="corners guides flex flex-col items-start gap-4 border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="blog-cta-heading" className="text-2xl tracking-tight text-balance">
            Planning an app, or stuck with one?
          </h2>
          <p className="text-pretty text-muted-foreground">
            Book a free discovery call and tell us what you are building or show us what you have.
            You get straight advice on scope, stack, cost and timeline, then a written estimate
            before any work starts.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={pages.bookCall.path} />}
            className="h-11 px-6 text-base"
          >
            Book a discovery call
          </Button>
        </section>
      </div>
    </main>
  )
}
