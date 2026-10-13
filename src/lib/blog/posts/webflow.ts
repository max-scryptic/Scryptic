import webflowLogo from "@/assets/blog/logos/webflow.svg"
import type { BlogPost } from "@/lib/blog/types"

export const webflow: BlogPost = {
  slug: "migrate-from-webflow",
  title: "Migrating from Webflow to a production app",
  tool: "Webflow",
  logo: webflowLogo,
  category: "Website builders",
  description:
    "How to move from Webflow to a production app: what you can export, why the split of site and app often works best, and how to keep your SEO intact.",
  summary:
    "Webflow is a strong marketing site builder, but it was never meant to run a product with accounts, permissions and business logic. The usual move is to keep the marketing site in Webflow and build the app properly on a subdomain, or to leave Webflow entirely with careful redirects if you need one codebase.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Static HTML, CSS and JS on paid plans" },
    { label: "Data export", value: "CMS collections as CSV" },
    { label: "Usual approach", value: "Keep the site, build the app beside it" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move from Webflow to a production app?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when your Webflow site has quietly become a product. If customers log in, pay or see data that belongs only to them, you are running an app on a tool built for publishing pages. Every new feature then means another embed or automation.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Members, payments and gated pages run through a third-party tool such as Memberstack or Outseta, and the logic is spread across scripts pasted into page settings.",
            "CMS collections are being used as a database for user records, orders or applications, and you are bumping into plan limits on items and fields.",
            "Forms feed Zapier or Make, which update a spreadsheet, which updates the CMS, and nobody is quite sure which step failed when something goes missing.",
            "You relied on Webflow Logic or native User Accounts. Webflow retired Logic in 2025 and User Accounts in early 2026, so those flows now live elsewhere or have stopped.",
            "You need features Webflow cannot express: roles and permissions, dashboards, background jobs, file processing or an API for a mobile app.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Webflow?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take out your design as static code and your CMS content as CSV files, but not the dynamic parts. Webflow's code export gives you clean HTML, CSS, JavaScript and assets for each static page. It is available on paid Workspace plans, not on site plans alone.",
        },
        {
          type: "list",
          items: [
            {
              term: "Static pages",
              text: "The exported markup and styles are readable and make a good reference for rebuilding the design in a component framework.",
            },
            {
              term: "CMS content",
              text: "Collection items are not included in the code export. Export each collection to CSV from the Collections panel. Images and files arrive as links to Webflow's hosting, so download them before you cancel anything. The export covers the locale you are viewing, so repeat it for each language.",
            },
            {
              term: "Ecommerce",
              text: "Products and orders can be exported as CSV, but checkout, carts and payment logic do not come with the code.",
            },
            {
              term: "What stays behind",
              text: "Form handling, site search, password protection, code components and localised content are not part of the export. Your Memberstack, Outseta or Zapier setup lives in those tools, not in Webflow.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "Webflow hands you the look of your site, not the behaviour. Expect to rebuild anything that involves a login, a form submission or a database, and treat the export as a design reference.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Webflow-based product need that Webflow does not provide?",
      blocks: [
        {
          type: "paragraph",
          text: "It needs a real backend: a database, authentication you control and server code that enforces the rules. In a Webflow build those jobs are usually shared between the CMS, a membership tool and a chain of automations, and none of them were designed to do it alone.",
        },
        {
          type: "list",
          items: [
            {
              term: "A proper database",
              text: "CMS collections are built for published content, not private per-user records. A relational database such as Postgres gives you relationships, transactions, backups and queries that do not depend on plan limits.",
            },
            {
              term: "Authentication and permissions",
              text: "Hiding an element with a membership script is not access control if the data is still in the page. Users, roles and sessions should be checked on the server for every request.",
            },
            {
              term: "Server-side logic",
              text: "Business rules that live in Zapier steps or custom code embeds are hard to test and easy to break. Moving them into versioned server code makes them reviewable and reliable.",
            },
            {
              term: "Payments and webhooks",
              text: "Billing tied to a membership plugin works for simple tiers. Trials, seats, usage pricing or invoices need your own integration with a provider such as Stripe.",
            },
            {
              term: "Environments and testing",
              text: "A staging copy, automated tests on sign-up and payment, error tracking and monitoring are normal for an app and missing from most Webflow builds.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from Webflow, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Decide first whether you are splitting or leaving, then move data, then protect your search traffic. In most cases the marketing site stays in Webflow and the app is built at app.yourdomain.com with the same fonts, colours and logo.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Map what the site really does",
              text: "List every page, collection, form, embed, script and automation. Mark each one as marketing content or product behaviour. The product column is what you are rebuilding.",
            },
            {
              term: "Choose split or full move",
              text: "Split if the marketing team edits the site often and it performs well. Move fully if you need one codebase, tighter control of performance and markup, or the CMS is straining at its limits.",
            },
            {
              term: "Export and back up",
              text: "Export the code, every CMS and ecommerce collection as CSV, and all images and files. Export members, plans and payment records from your membership tool too.",
            },
            {
              term: "Build the app",
              text: "Model the data properly in a real database, add authentication, move automation logic into server code, and reuse the Webflow design tokens so the app looks like the site.",
            },
            {
              term: "Move users",
              text: "Import member profiles into the new auth system. Password hashes usually cannot be exported from membership tools, so plan a password reset or magic link email at launch. Check with your provider before assuming either way.",
            },
            {
              term: "Map URLs and redirects",
              text: "If pages move, list every old URL with its new one and set up permanent 301 redirects. Carry over page titles, meta descriptions, Open Graph images and canonical tags.",
            },
            {
              term: "Launch and watch search",
              text: "Point the subdomain or domain at the new hosting, submit the new sitemap in Google Search Console, and check the coverage and redirect reports weekly for the first month.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Webflow migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are losing search rankings through missing redirects, and losing data that lived outside Webflow in plugins and automations.",
        },
        {
          type: "list",
          items: [
            "Moving the blog or CMS pages without 301 redirects, so years of backlinks point at pages that no longer exist.",
            "Cancelling the Webflow plan before downloading CMS images, which are exported as links to Webflow's hosting.",
            "Forgetting a Zap or a script that quietly did something important, such as tagging new members or sending a welcome email.",
            "Rebuilding the marketing site as well when the team was happy editing it, which adds weeks and takes publishing away from marketing.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Webflow instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay on Webflow for your marketing site in most cases. It is fast to edit, well hosted and good for SEO. What should usually leave is the product: anything with logins, private data or business rules. If your site has no app behaviour, there is no reason to migrate. If you want one codebase or more control, a full move is reasonable, and careful redirects make it safe.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Webflow site?",
      answer:
        "Partly. On a paid Workspace plan you can export static HTML, CSS, JavaScript and assets. CMS items, forms, site search, ecommerce checkout and membership features are not included, so CMS content must be exported separately as CSV and dynamic features rebuilt.",
    },
    {
      question: "Will I lose my SEO if I move off Webflow?",
      answer:
        "Not if you plan it. Keep the same URLs where you can, add a permanent 301 redirect for every URL that changes, carry over titles and meta descriptions, submit the new sitemap in Google Search Console and monitor it for a few weeks.",
    },
    {
      question: "Can I keep my marketing site in Webflow and build the app separately?",
      answer:
        "Yes, and it is often the best option. The marketing site stays in Webflow where your team can edit it, and the app runs on a subdomain such as app.yourdomain.com with shared branding. Visitors move between them through normal links.",
    },
    {
      question: "What happened to Webflow memberships and Logic?",
      answer:
        "Webflow retired Logic in June 2025 and User Accounts in January 2026, recommending partner tools such as Memberstack and Outseta instead. If your product depended on either, it is a natural point to move that logic into an app you own.",
    },
  ],
}
