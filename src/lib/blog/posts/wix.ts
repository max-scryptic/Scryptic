import type { BlogPost } from "@/lib/blog/types"

export const wix: BlogPost = {
  slug: "migrate-from-wix",
  title: "Migrating from Wix to a production app",
  tool: "Wix",
  category: "Website builders",
  description:
    "How to move from Wix, Wix Studio or Velo to a production app: what you can export, what has to be rebuilt, and how to protect your search rankings.",
  summary:
    "Wix has no code export, so leaving it means rebuilding pages, but your collections, contacts and any Velo code you wrote can come with you. Many founders keep the marketing site on Wix and build the product as a separate app on a subdomain, and move fully only when they need one codebase or more control.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "None for pages, Velo code can be copied" },
    { label: "Data export", value: "CMS collections and contacts as CSV" },
    { label: "Usual approach", value: "Keep the site, rebuild the app" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move from Wix to a production app?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when your Wix site is doing the job of software. Wix, Wix Studio and Velo can take a site a long way, including members areas, dynamic pages and backend code. But once your product depends on custom data models, permissions and integrations, you are building an app inside a platform you cannot take with you.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Velo code has grown into the core of the business, with web modules, data hooks and scheduled jobs that only one person understands.",
            "CMS collections hold users, orders or applications, and you are working around collection permissions and plan limits to keep the data safe.",
            "The members area is stretched with custom pages, roles and scripts to behave like a customer dashboard.",
            "Forms trigger automations that update collections, send emails and call other services, and failures are hard to trace.",
            "You need things Wix makes awkward: complex roles, multi-step workflows, an API for a mobile app, or full control over performance and markup.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Wix?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data and your own code, but not the site. Wix does not offer a way to export pages as HTML or host them elsewhere, so the design has to be rebuilt. What you wrote and what you stored can come with you.",
        },
        {
          type: "list",
          items: [
            {
              term: "CMS collections",
              text: "Each collection can be exported to CSV from the CMS, including system fields such as item IDs and created dates. Check that references, rich text and media fields came through, and download images and files separately.",
            },
            {
              term: "Contacts and members",
              text: "Contacts can be exported to CSV from the dashboard. Member profiles can be moved, but passwords cannot, so plan for users to set a new password.",
            },
            {
              term: "Velo code",
              text: "Page code, backend web modules, data hooks and jobs are your own code. Copy them out, or connect a Wix Studio site to GitHub and pull them into a repository. They call Wix APIs, so the logic is reusable but the code needs porting.",
            },
            {
              term: "What stays behind",
              text: "Page layouts, the editor, Wix apps such as Bookings or Stores and their settings, and Wix hosting. Order and booking history can usually be exported from each app's dashboard.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "Wix is the hardest of the website builders to leave completely, because nothing visual comes out as code. Splitting the site from the app avoids rebuilding pages that already work.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Wix-based product need that Wix does not give you?",
      blocks: [
        {
          type: "paragraph",
          text: "It needs a backend you own, data you can query freely and a proper release process. Velo gives you real JavaScript on the server, but it runs only on Wix, against Wix's data store, with Wix's limits and deployment model.",
        },
        {
          type: "list",
          items: [
            {
              term: "A relational database",
              text: "Wix collections are document-style tables with limited relationships. A database such as Postgres gives you joins, transactions, constraints and backups you control.",
            },
            {
              term: "Portable server code",
              text: "Velo logic is tied to wix-data, wix-members and other platform modules. Rewriting it against standard libraries means it can be tested, reviewed and hosted anywhere.",
            },
            {
              term: "Permissions you can audit",
              text: "Collection permissions are coarse. An app should check each request on the server against the user's role and the record they are asking for.",
            },
            {
              term: "Environments and version control",
              text: "Separate development, staging and production, every change in Git, and automated tests on sign-up, payment and the core workflow.",
            },
            {
              term: "Monitoring",
              text: "Error tracking, uptime checks and logs you can search. Silent failures in Velo jobs or automations are a common reason founders decide to move.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from Wix, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Separate the marketing site from the product, rebuild the product on a proper stack, then move data and users. When the Wix site is working well for marketing, it can stay, with the app on app.yourdomain.com using the same branding.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the site",
              text: "List pages, dynamic pages, collections, Velo files, installed Wix apps, forms and automations. Mark each one as marketing or product.",
            },
            {
              term: "Choose split or full move",
              text: "Split if the team edits the site easily and it ranks well. Move fully if you want one codebase, control over performance and markup, or lower running costs than several Wix apps and plugins.",
            },
            {
              term: "Export everything",
              text: "Export each collection and your contacts to CSV, download media, export orders or bookings from each app, and copy or sync all Velo code into a repository.",
            },
            {
              term: "Rebuild the product",
              text: "Model the data in a real database, add authentication, port the Velo logic to server code, and recreate the brand as shared design tokens.",
            },
            {
              term: "Move users",
              text: "Import member profiles and send a password reset or magic link at launch. Tell users in advance so the email is expected.",
            },
            {
              term: "Map URLs and redirects",
              text: "Crawl the live site and list every indexed URL. Wix uses fixed URL patterns for some page types, so new URLs will often differ. Set up a permanent 301 redirect for each, and carry over titles, descriptions and social images.",
            },
            {
              term: "Launch and monitor",
              text: "Point the domain or subdomain at the new hosting, submit the sitemap in Google Search Console, and check indexing and redirect errors weekly for a month.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Wix migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are underestimating how much behaviour lives in Wix apps and Velo, and losing search traffic when every URL changes at once.",
        },
        {
          type: "list",
          items: [
            "Leaving the domain without redirects. When the domain moves away from Wix, its redirect manager stops applying, so redirects must be recreated on the new host.",
            "Copying Velo code across without noticing it depends on Wix modules, data hooks or collection permissions that do not exist elsewhere.",
            "Missing behaviour from installed Wix apps, such as booking reminders, automated emails or member badges.",
            "Exporting collections once, then letting users keep writing to Wix during the build. Plan a final export at cutover.",
            "Rebuilding the whole marketing site when only the product needed to move.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Wix instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay on Wix for the marketing site if it works and your team can update it without help. Wix is a capable, well supported platform for websites, and rebuilding pages that already convert is rarely the best use of a launch budget. Move the product when it needs data, permissions and logic that you own. Leave Wix completely when you want one codebase, tighter control of performance and SEO, or when Velo has become the business and you need it tested and portable.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Wix site?",
      answer:
        "No. Wix does not offer an HTML or code export of your pages. You can export CMS collections and contacts as CSV, download your media, and copy any Velo code you wrote, but the pages must be rebuilt elsewhere.",
    },
    {
      question: "Will I lose my SEO if I move off Wix?",
      answer:
        "Not if you plan it. Crawl the old site, map every URL to its new address, set up 301 redirects on the new host, carry over titles and meta descriptions, and submit the new sitemap in Google Search Console.",
    },
    {
      question: "Can I keep my marketing site on Wix and build the app separately?",
      answer:
        "Yes. Many founders keep the Wix site for marketing and run the app on a subdomain such as app.yourdomain.com, with the same logo, colours and fonts. Visitors move between them through normal links.",
    },
    {
      question: "Can I reuse my Wix Velo code in a new app?",
      answer:
        "Partly. Velo is JavaScript you wrote, so the logic can be reused. It calls Wix-specific modules for data, members and permissions, though, so each function needs rewriting against your new database and authentication.",
    },
  ],
}
