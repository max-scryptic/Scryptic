import { postSeries, postsInSeries } from "@/lib/blog"
import { blogPostPage, blogPostPages, publicPages, toolPages, type PageEntry } from "@/lib/seo"
import { servicePages } from "@/lib/service-pages"
import { absoluteUrl, siteConfig } from "@/lib/site"

/*
 * /llms.txt (https://llmstxt.org): a plain Markdown map of the site for
 * language models and AI agents, built from the same page registry as the
 * sitemap. Group pages under more "## Section" headings as the site grows;
 * an "## Optional" section marks links an agent can skip when short on room.
 */

export const dynamic = "force-static"

const link = (page: PageEntry) =>
  `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`

export function GET() {
  const guides = blogPostPages.filter((page) => !page.noIndex)
  const tools = toolPages.filter((page) => !page.noIndex)
  const services = servicePages.map((service) => service.page).filter((page) => !page.noIndex)
  const otherPages = publicPages.filter(
    (page) => !guides.includes(page) && !tools.includes(page) && !services.includes(page),
  )

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    ...(siteConfig.summary ? [siteConfig.summary, ""] : []),
    "## Pages",
    "",
    ...otherPages.map(link),
    "",
    "## Services",
    "",
    "Both services are sold as the same fixed-price 2 or 3 week sprints.",
    "",
    ...services.map(link),
    "",
    "## Free tools",
    "",
    "Free tools for founders, used in the browser with no sign up.",
    "",
    ...tools.map(link),
    "",
    ...postSeries.flatMap((series) => {
      const seriesPages = postsInSeries(series.id)
        .map(blogPostPage)
        .filter((page) => !page.noIndex)
      if (seriesPages.length === 0) return []

      return [`## ${series.name}`, "", series.intro, "", ...seriesPages.map(link), ""]
    }),
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
