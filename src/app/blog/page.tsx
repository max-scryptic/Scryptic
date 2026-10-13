import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { migrationSeries, postCategories, posts, postsInCategory } from "@/lib/blog"
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
            From low-code prototype to <span className="text-primary">production app</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Built something that works in Lovable, Bubble, Webflow or another low-code tool, and
            now need it to hold up with real customers? These {posts.length} guides from the{" "}
            {siteConfig.name} studio cover each tool in turn: what you can take with you, what a
            production version needs, and how to move without losing data, users or search
            rankings.
          </p>
          <nav aria-label="Guide categories">
            <ul className="flex flex-wrap gap-2 font-mono text-xs">
              {postCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={`#${categoryId(category.name)}`}
                    className="block rounded-full bg-primary/10 px-3 py-1 text-primary transition-colors hover:bg-primary/20"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section aria-labelledby="series-heading" className="flex flex-col gap-14">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Series</p>
            <h2 id="series-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
              {migrationSeries.name}
            </h2>
            <p className="text-lg text-pretty text-muted-foreground">{migrationSeries.intro}</p>
          </div>

          {postCategories.map((category) => {
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
                  <p className="max-w-2xl text-pretty text-muted-foreground">{category.text}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.slug} post={post} headingLevel="h4" />
                  ))}
                </div>
              </section>
            )
          })}
        </section>

        <section
          aria-labelledby="blog-cta-heading"
          className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <h2 id="blog-cta-heading" className="text-2xl tracking-tight text-balance">
            Not sure whether to harden or rebuild?
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            Book a free discovery call and show us what you have. We review the app, its data and
            its accounts, then you get a plan, a written estimate and a timeline before any work
            starts.
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
