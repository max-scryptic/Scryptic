import wixLogo from "@/assets/blog/logos/wix.svg"
import type { BlogPost } from "@/lib/blog/types"

export const wix: BlogPost = {
  slug: "migrate-from-wix",
  title: "Where Wix and Velo hit their limits, and what to build instead",
  series: "migration",
  topic: "Wix",
  logo: wixLogo,
  category: "Website builders",
  description:
    "The walls founders hit building a product on Wix and Velo, from data collections to member areas and URLs, and what to build instead while keeping the site.",
  summary:
    "Wix and Velo run out when a website starts doing the job of software: relational data, real permissions, long running backend work and an API for other apps. The usual answer is to keep the marketing site on Wix and build the product as a separate app on a subdomain, moving fully only when you need one codebase.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "None for pages, Velo code can be copied" },
    { label: "Data export", value: "CMS collections and contacts as CSV" },
    { label: "Usual approach", value: "Keep the site, build the app" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "what-velo-is",
      heading: "Velo turns a Wix site into an app platform, up to a point",
      blocks: [
        {
          type: "paragraph",
          text: "Velo is Wix's developer layer: JavaScript on the page and on the server, a built-in data store called CMS collections, and hooks into Wix's own apps such as Members, Bookings and Stores. It is genuinely capable. Plenty of businesses run members areas, directories and booking flows on it.",
        },
        {
          type: "paragraph",
          text: "The limit is that all of it only runs on Wix, against Wix's data store, inside Wix's deployment model. Wix has no code export for pages, so whatever you build in the editor stays there. That is fine for a website. It becomes a problem when the site is really a product, and the walls below are where founders usually notice.",
        },
      ],
    },
    {
      id: "the-walls",
      heading: "The five walls founders hit",
      blocks: [
        {
          type: "paragraph",
          text: "Each of these has a workaround inside Wix. The trouble starts when you are maintaining several workarounds at once.",
        },
        { type: "subheading", text: "1. Data collections are not a relational database" },
        {
          type: "paragraph",
          text: "CMS collections are document-style tables with reference fields, not a database with joins, transactions and constraints. A query returns at most 1,000 items at a time, so reports page through results in code. Item limits depend on your plan. Once collections hold users, orders or applications that relate to each other, keeping them consistent becomes your job rather than the database's.",
        },
        { type: "subheading", text: "2. Member areas are built for profiles, not dashboards" },
        {
          type: "paragraph",
          text: "The Members Area gives you sign-up, profiles and member-only pages. Stretching it into a customer dashboard with teams, organisations and roles means custom pages and Velo code checking permissions by hand, while collection permissions stay coarse: roughly anyone, members, the item's author or admins. Member passwords cannot be exported if you ever leave.",
        },
        { type: "subheading", text: "3. Backend code runs on Wix's terms" },
        {
          type: "paragraph",
          text: "Velo backend code is real JavaScript, but it is tied to Wix modules for data, members and permissions. Calls from the page to the backend have short time limits, scheduled jobs are capped in number and frequency, and there are no separate staging and production environments in the way a normal app has them. Long running work, queues and retries are hard to do well.",
        },
        { type: "subheading", text: "4. App Market apps hold your business logic" },
        {
          type: "paragraph",
          text: "Bookings, Stores, form tools and third-party apps from the Wix App Market each keep their own data, settings, automations and often their own subscription. Booking reminders, automated emails and member badges live inside them, not in code you can read. The more apps you install, the harder it is to see what the product actually does.",
        },
        { type: "subheading", text: "5. SEO and URLs follow Wix's patterns" },
        {
          type: "paragraph",
          text: "Some page types use fixed URL prefixes, such as /post/ for blog posts and /product-page/ for products, and dynamic pages take their structure from the collection. You get decent SEO controls, but not full control over markup, rendering or performance. That matters little for a brochure site and more for a product with thousands of pages.",
        },
      ],
    },
    {
      id: "what-to-build",
      heading: "What to build instead, and what to leave on Wix",
      blocks: [
        {
          type: "paragraph",
          text: "Build the product as a separate web app and leave the marketing site where it is. Rebuilding pages that already rank and convert is rarely the best use of a launch budget.",
        },
        {
          type: "table",
          caption: "Each Wix wall and what replaces it in a separate app",
          columns: ["Wix wall", "What to build instead", "Can stay on Wix?"],
          rows: [
            ["Data collections", "A Postgres database with real relationships and backups", "Yes, for blog and marketing content"],
            ["Members Area", "Proper auth with organisations and roles, checked on the server", "Yes, for a simple community or newsletter"],
            ["Velo backend code", "Server code and a job queue you can test and host anywhere", "Small form handlers, yes"],
            ["App Market apps", "The features your product depends on, written as code", "Apps that serve the marketing site"],
            ["SEO and URLs", "Server-rendered pages where the product needs to rank", "The marketing pages, as they are"],
          ],
        },
        {
          type: "paragraph",
          text: "In practice, the app runs at app.yourdomain.com with the same logo, colours and fonts, and the Wix site links to it. If your domain is managed in Wix, you add a DNS record for the subdomain and point it at the new hosting. Velo code you wrote can be copied out, or pulled into a repository through the Wix Studio GitHub integration, and its logic ported to the new server. Collections and contacts export as CSV for the first import.",
          link: { text: "Whether the app should sit on a subdomain or a subpath.", href: "/blog/migrate-from-webflow#subdomain-or-subpath" },
        },
      ],
    },
    {
      id: "leaving-fully",
      heading: "If you do leave Wix completely",
      blocks: [
        {
          type: "paragraph",
          text: "Leave fully when you want one codebase, full control of performance and SEO, or lower running costs than several paid Wix apps. Plan the move around search traffic, because every page has to be rebuilt.",
        },
        {
          type: "list",
          items: [
            "Crawl the live site and list every indexed URL before anything changes.",
            "Map each one to its new address and set up a permanent 301 redirect on the new host. Wix's redirect manager stops applying once the domain points elsewhere.",
            "Carry over titles, meta descriptions and social images page by page.",
            "Take a final export of collections at cutover, since users keep writing to Wix during the build.",
            "Send members a password reset or magic link, with a heads-up email the week before.",
            "Submit the new sitemap in Google Search Console and check indexing weekly for a month.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I download my Wix site's code?",
      answer:
        "No. Wix does not offer an HTML or code export of your pages. You can export CMS collections and contacts as CSV, download your media and copy any Velo code you wrote, but the pages themselves must be rebuilt elsewhere.",
    },
    {
      question: "How do I keep my Google rankings if I leave Wix?",
      answer:
        "The safest route is not to move the marketing site at all: keep it on Wix and move only the app. If the site has to go, crawl it first, map every URL to its new address, set up 301 redirects on the new host, keep each page's title and meta description, and submit the new sitemap in Google Search Console.",
    },
    {
      question: "Can I reuse my Wix Velo code in a new app?",
      answer:
        "Partly. Velo is JavaScript you wrote, so the logic can be reused. It calls Wix-specific modules for data, members and permissions, though, so each function needs rewriting against your new database and authentication.",
    },
  ],
}
