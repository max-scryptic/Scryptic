import type { BlogPost, PostSeriesId, ServicePageId } from "@/lib/blog"
import { pages, type PageEntry } from "@/lib/seo"

/*
 * The services, each with its own landing page under /services. The nav's
 * Services menu and the footer list them from here; each
 * page's own copy lives in its page file. Every service is sold as one of the
 * fixed-price packages in @/lib/services.
 */

export type ServicePage = {
  /** Anchor and element ids, and how a blog post names its service. */
  id: ServicePageId
  page: PageEntry
  /** Shown in the menu and the footer. */
  name: string
  /** One line under the name in the nav menu. */
  tagline: string
  /** A text link to the page from elsewhere, such as a blog post's call to action. */
  learnMore: string
  /**
   * Blog series whose posts point to this service in their closing call to
   * action, unless a post names its own `service`.
   */
  series: PostSeriesId[]
}

/** The service a post's closing call to action links to: its own, else its series'. */
export function serviceForPost(post: BlogPost) {
  if (post.service) return servicePages.find((service) => service.id === post.service)
  return servicePages.find((service) => service.series.includes(post.series))
}

export const servicePages: ServicePage[] = [
  {
    id: "mvp-development",
    page: pages.mvpDevelopment,
    name: "MVP development",
    tagline: "Your first product, launched in weeks",
    learnMore: "How our MVP development works",
    series: ["launch", "automation"],
  },
  {
    id: "web-app-development",
    page: pages.webAppDevelopment,
    name: "Web app development",
    tagline: "A custom web app for one workflow",
    learnMore: "How our web app development works",
    series: ["stack"],
  },
  {
    id: "mobile-app-development",
    page: pages.mobileAppDevelopment,
    name: "Mobile app development",
    tagline: "Native apps for iPhone and Android",
    learnMore: "How our mobile app development works",
    series: [],
  },
  {
    id: "no-code-migration",
    page: pages.noCodeMigration,
    name: "No-code app migration",
    tagline: "Outgrown your builder? Own the code",
    learnMore: "How our no-code app migration works",
    series: ["migration"],
  },
]
