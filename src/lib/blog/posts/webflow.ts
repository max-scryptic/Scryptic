import webflowLogo from "@/assets/blog/logos/webflow.svg"
import type { BlogPost } from "@/lib/blog/types"

export const webflow: BlogPost = {
  slug: "migrate-from-webflow",
  title: "Adding a real product to a Webflow site without losing rankings",
  series: "migration",
  topic: "Webflow",
  logo: webflowLogo,
  category: "Website builders",
  description:
    "How to add logins, dashboards and payments next to a Webflow site and keep your search rankings: subdomain or subpath, CMS collections and redirects.",
  summary:
    "Keep the pages that rank on Webflow and build the product on a subdomain such as app.yourdomain.com. Your rankings belong to public URLs, and logged-in screens never ranked anyway. If you do leave Webflow entirely, a complete URL map with permanent redirects is what keeps the traffic.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "Static HTML, CSS and JS on paid Workspace plans" },
    { label: "CMS export", value: "CSV per collection, per locale" },
    { label: "Safest setup", value: "Site on Webflow, app on a subdomain" },
    { label: "Typical timeline", value: "4 to 8 weeks for the app" },
  ],
  sections: [
    {
      id: "three-options",
      heading: "Three ways to add a product to a Webflow site",
      blocks: [
        {
          type: "paragraph",
          text: "The quickest way to lose search traffic is to move pages that didn't need moving. Your rankings are attached to public URLs: the home page, feature pages, the blog, any programmatic CMS pages. A product with logins, dashboards and payments adds new URLs, mostly behind a sign-in, and none of them need to replace the ones Google already trusts.",
        },
        {
          type: "paragraph",
          text: "That leaves three realistic setups.",
        },
        {
          type: "table",
          caption: "Options for adding a product to a Webflow site, with their trade-offs",
          columns: ["Option", "Pros", "Cons", "Fits when"],
          rows: [
            [
              "Keep everything on Webflow",
              "No URL changes, no SEO risk, marketing keeps editing",
              "Logins and payments depend on third-party scripts; no real backend or permissions",
              "The product is simple gated content or a paid newsletter",
            ],
            [
              "Product on a subdomain",
              "Ranking pages untouched; app built properly with its own database and auth",
              "Two systems to style consistently; shared login state needs planning",
              "Most startups adding a SaaS product, portal or dashboard",
            ],
            [
              "Full move off Webflow",
              "One codebase, full control of markup and performance",
              "Every URL must be redirected; marketing loses the visual editor unless you add a CMS",
              "The site and product are deeply mixed, or the CMS is straining at its limits",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "For most founders the middle row is the answer. It's the only option that adds a real product while leaving every ranking URL exactly where it is.",
        },
      ],
    },
    {
      id: "subdomain-or-subpath",
      heading: "Subdomain or subpath for the app?",
      blocks: [
        {
          type: "paragraph",
          text: "Use a subdomain for the app. The argument for a subpath such as yourdomain.com/app is that it shares the main domain's authority, but logged-in screens aren't meant to rank, so there's no authority to share. You'd be taking on complexity for nothing.",
        },
        {
          type: "paragraph",
          text: "A subpath needs a reverse proxy in front of Webflow, for example Cloudflare, that sends /app to your application and everything else to Webflow. It works, but it's one more system that can break, cache the wrong thing or interfere with Webflow's SSL and hosting. Webflow's support for proxied setups also depends on your plan, so check before committing. A subdomain is a single DNS record.",
        },
        {
          type: "subheading",
          text: "When a subpath is worth it",
        },
        {
          type: "paragraph",
          text: "If the product itself produces public pages that should rank, such as a directory, public profiles or template galleries, those pages benefit from living on the main domain. Even then, the logged-in app can still sit on a subdomain while the public pages are served through the proxy or generated into Webflow's CMS.",
        },
        {
          type: "subheading",
          text: "Details that keep a subdomain tidy",
        },
        {
          type: "list",
          items: [
            "Add a noindex tag to app screens and keep them out of the main sitemap, so thin dashboard pages never show in search.",
            "Leave sign-up and pricing pages on Webflow, where they can rank, and link the buttons through to the app.",
            "Scope the session cookie to the app subdomain. If the marketing site needs to know someone is signed in, to swap Log in for Dashboard, set a separate small flag on the parent domain rather than sharing the session.",
            "Reuse Webflow's colours, fonts and spacing as design tokens in the app, so the move between site and product feels like one brand.",
          ],
        },
      ],
    },
    {
      id: "cms-collections",
      heading: "Keep content in the CMS and user data out of it",
      blocks: [
        {
          type: "paragraph",
          text: "Leave collections that publish content in Webflow, and move anything that belongs to a user into a real database. Webflow's CMS is built for published content: blog posts, case studies, team pages, help articles. It is not built for private records, and using it that way is how founders run into item limits, slow publishing and data that anyone can find in the page source.",
        },
        {
          type: "list",
          items: [
            {
              term: "Stays in Webflow",
              text: "Blog posts, landing pages, help content and any collection that drives public, ranking URLs.",
            },
            {
              term: "Moves to the app's database",
              text: "Members, orders, applications, bookings, saved items and anything one user should not see of another.",
            },
            {
              term: "Shared between both",
              text: "If the app needs CMS content, such as a list of courses, read it through Webflow's CMS API instead of copying it. One source of truth means marketing can still edit it.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Collection item limits depend on your site plan, so check yours before deciding a growing collection can stay where it is.",
        },
      ],
    },
    {
      id: "memberships-and-logic",
      heading: "Where memberships and logic run out",
      blocks: [
        {
          type: "paragraph",
          text: "Webflow no longer runs product logic itself. It retired Logic in 2025 and native User Accounts in early 2026, pointing people at partner tools such as Memberstack and Outseta. Those tools are fine for gated content and simple paid tiers, and they are where most Webflow products hit a wall.",
        },
        {
          type: "paragraph",
          text: "The limit is that the access control happens in the browser. A membership script hides an element or redirects a visitor, but if the data was published in the page, it is still in the page. That's acceptable for a members-only article. It isn't acceptable for a client's invoices, another company's dashboard or anything covered by UK GDPR.",
        },
        {
          type: "paragraph",
          text: "Business rules end up the same way: a form posts to Zapier or Make, which updates a sheet, which updates the CMS, and nobody can test the chain. When you need roles, per-user data, trials, seats, usage pricing, background jobs or an API for a mobile app, build them in the app with server-side checks on every request and Stripe integrated directly.",
        },
        {
          type: "callout",
          title: "Moving members across",
          text: "Export members, plans and payment records from your membership tool before you build the replacement. Password hashes often cannot be exported, so plan for a password reset or sign-in link email at launch, and confirm with your provider rather than assuming.",
        },
      ],
    },
    {
      id: "redirects",
      heading: "If you leave Webflow, redirect every URL",
      blocks: [
        {
          type: "paragraph",
          text: "A full move keeps its rankings only if every old URL either stays the same or permanently redirects to its closest new page. Missing redirects are the single biggest cause of lost traffic after a site move, because backlinks and indexed pages suddenly point at nothing.",
        },
        {
          type: "paragraph",
          text: "Webflow's code export gives you static HTML, CSS, JavaScript and assets on paid Workspace plans, but not CMS items, forms, search or checkout. Treat it as a design reference, export every collection to CSV separately, and download CMS images, which arrive as links to Webflow's hosting.",
        },
        {
          type: "checklist",
          items: [
            "Crawl the live site and export every URL, including CMS collection pages and paginated lists",
            "Copy the existing 301 redirects from Webflow's site settings so old redirects aren't lost or chained",
            "Keep collection paths such as /blog/post-name identical wherever possible",
            "Map every changed URL to one specific new page, never to the home page",
            "Carry over page titles, meta descriptions, Open Graph images, canonical tags and image alt text",
            "Repeat CMS exports for each locale if the site is localised",
            "Test every redirect on staging before DNS changes",
            "Submit the new sitemap in Google Search Console on launch day",
            "Keep the Webflow plan until assets and redirects are confirmed working",
          ],
        },
        {
          type: "paragraph",
          text: "For the first month, check Search Console's page indexing report and your server's 404 log weekly. A few 404s are normal. A cluster of them usually means a whole collection path was missed.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Will I lose my SEO if I move off Webflow?",
      answer:
        "Not if you plan it. Keep the same URLs where you can, add a permanent 301 redirect from every changed URL to its closest new page, carry over titles and meta descriptions, submit the new sitemap in Google Search Console, and check for 404s weekly for the first month.",
    },
    {
      question: "Can I keep my marketing site in Webflow and build the app separately?",
      answer:
        "Yes, and for most startups it is the best option. The marketing site stays in Webflow where your team can edit it and its rankings stay put, while the app runs on a subdomain such as app.yourdomain.com with its own database, login and payments, styled with the same colours and fonts.",
    },
    {
      question: "Can I export my Webflow site?",
      answer:
        "Partly. On a paid Workspace plan you can export static HTML, CSS, JavaScript and assets. CMS items, forms, site search, ecommerce checkout and membership features are not included, so CMS content must be exported separately as CSV and dynamic features rebuilt.",
    },
    {
      question: "What happened to Webflow memberships and Logic?",
      answer:
        "Webflow retired Logic in 2025 and its native User Accounts in early 2026, recommending partner tools such as Memberstack and Outseta instead. Products that relied on either now need those flows rebuilt, either in a partner tool or in an app with its own backend.",
    },
  ],
}
