import type { BlogPost, PostSeriesId, ServicePageId } from "@/lib/blog"
import { pages, type PageEntry } from "@/lib/seo"

/*
 * The services, each with its own landing page under /services. The nav's
 * Services menu, the footer and the /services hub list them from here; each
 * page's own copy lives in its page file. Every service is sold as one of the
 * fixed-price packages in @/lib/services.
 */

export type ServicePage = {
  /** Anchor and element ids, and how a blog post names its service. */
  id: ServicePageId
  page: PageEntry
  /** Shown in the menu, the footer and on the hub's card. */
  name: string
  /** One line under the name in the nav menu. */
  tagline: string
  /** A sentence or two on the hub's card, answer first. */
  summary: string
  /** What the service covers, as short points on the hub's card. */
  points: string[]
  /** The hub card's button, which should make sense out of context. */
  linkText: string
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
    summary:
      "Your idea built as a production-ready MVP in a 2 or 3 week sprint, with sign-in, payments and analytics in place on launch day.",
    points: [
      "Scope cut to one core user journey",
      "A demo every Friday",
      "Code and accounts in your name",
    ],
    linkText: "Explore MVP development",
    learnMore: "How our MVP development works",
    series: ["launch", "automation"],
  },
  {
    id: "web-app-development",
    page: pages.webAppDevelopment,
    name: "Web app development",
    tagline: "A custom web app for one workflow",
    summary:
      "A custom web application for your customers or your team, such as a portal, a booking system or an internal tool, built as production code you own.",
    points: [
      "One complete workflow, start to finish",
      "Accounts, roles and backups in place",
      "Code and hosting in your name",
    ],
    linkText: "Explore web app development",
    learnMore: "How our web app development works",
    series: ["stack"],
  },
  {
    id: "mobile-app-development",
    page: pages.mobileAppDevelopment,
    name: "Mobile app development",
    tagline: "Native apps for iPhone and Android",
    summary:
      "A native iOS and Android app, written in Swift and Kotlin, built as production code you own and submitted to the App Store and Google Play from your accounts.",
    points: [
      "Native code for each platform",
      "Store submission and review handled",
      "Code and store accounts in your name",
    ],
    linkText: "Explore mobile app development",
    learnMore: "How our mobile app development works",
    series: [],
  },
  {
    id: "no-code-migration",
    page: pages.noCodeMigration,
    name: "No-code app migration",
    tagline: "Outgrown your builder? Own the code",
    summary:
      "Your Bubble, Lovable, Adalo, Glide or Airtable app moved to a production stack you own, with your data and users brought across.",
    points: [
      "An audit of your app and data first",
      "Rehearsed data moves before cutover",
      "Users and search rankings kept",
    ],
    linkText: "Explore no-code migration",
    learnMore: "How our no-code app migration works",
    series: ["migration"],
  },
]
