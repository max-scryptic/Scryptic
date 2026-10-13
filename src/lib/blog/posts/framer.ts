import framerLogo from "@/assets/blog/logos/framer.svg"
import type { BlogPost } from "@/lib/blog/types"

export const framer: BlogPost = {
  slug: "migrate-from-framer",
  title: "Migrating from Framer to a production app",
  tool: "Framer",
  logo: framerLogo,
  category: "Website builders",
  description:
    "How to go from a Framer site to a production app: what you can take with you, why keeping the site in Framer often makes sense, and an SEO-safe plan.",
  summary:
    "Framer makes excellent marketing sites, but it has no backend of its own, so any product built on it depends on plugins and embeds. Most founders keep the site in Framer and build the app separately on a subdomain, and only move everything when they need one codebase or more control.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No official export of the site" },
    { label: "Data export", value: "CMS collections as CSV via plugin" },
    { label: "Usual approach", value: "Keep the site, build the app beside it" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move from Framer to a production app?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when your Framer site has to do more than present and persuade. Framer is built for design-led websites that publish quickly. Once customers sign in, pay, upload things or see their own data, you are building an app, and Framer has no database, server code or user system to hold it.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Logins and gated pages come from a plugin such as Outseta or FramerAuth, and access rules are set in several places.",
            "Form submissions go to email, a spreadsheet or a webhook, and someone copies them into another system by hand.",
            "The CMS holds things that are really app data, such as listings users submit or records that change daily, kept in sync through automations.",
            "Code components and overrides have grown into a small app inside the design tool, with no tests and no version history outside Framer.",
            "You need roles, dashboards, search across private data, scheduled jobs or an API, none of which a site builder is meant to run.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Framer?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your content and your custom code, but not the site itself as code. Framer states that it does not offer HTML export for self-hosting, because published sites run on its own infrastructure. Third-party tools can capture a published site, but the output is not meant to be edited and maintained by hand.",
        },
        {
          type: "list",
          items: [
            {
              term: "CMS content",
              text: "Collections can be exported to CSV with a CMS export plugin from the Framer marketplace. Check rich text, references and image fields in the file, and download images separately rather than relying on links to Framer's hosting.",
            },
            {
              term: "Code components and overrides",
              text: "These are React and TypeScript files you or a developer wrote. Copy them out. Some will port to a React app with small changes, though anything that relies on Framer's property controls needs rework.",
            },
            {
              term: "Design",
              text: "Colours, type styles, spacing and assets can be recreated as design tokens in the new app. The published pages also serve as an exact visual reference.",
            },
            {
              term: "What stays behind",
              text: "Layouts, animations and effects built on the canvas, Framer's hosting and form handling. Members and payments live in whichever plugin or provider you connected.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "Leaving Framer completely means rebuilding the pages. That is why many teams keep the marketing site in Framer and build only the product somewhere else.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Framer-based product need that Framer does not provide?",
      blocks: [
        {
          type: "paragraph",
          text: "It needs everything behind the page: a database, authentication, server logic and a release process. Framer handles design, hosting and content publishing very well. The rest has been borrowed from plugins and automations.",
        },
        {
          type: "list",
          items: [
            {
              term: "A database you own",
              text: "The CMS is for published content. Private, per-user or frequently changing data belongs in a real database with relationships, backups and access rules.",
            },
            {
              term: "Authentication on the server",
              text: "Gating a page in the browser does not protect data that is already sent to it. Each request for private data should be checked on the server against the user's role.",
            },
            {
              term: "Business logic in code",
              text: "Rules spread across code overrides, webhooks and Zapier steps should become tested server code that lives in a repository.",
            },
            {
              term: "Payments",
              text: "Plugin-based checkout covers simple subscriptions. Teams, trials, usage billing or refunds tied to app behaviour need a direct integration with a provider such as Stripe.",
            },
            {
              term: "Environments and monitoring",
              text: "A staging environment, automated tests on the money-making flows, error tracking and backups are standard for an app and have no equivalent in a Framer project.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from Framer, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Separate the website from the product, build the product properly, then connect the two. Most of the time the Framer site stays where it is and the app goes live at app.yourdomain.com with matching branding.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the project",
              text: "List pages, CMS collections, forms, plugins, code components, overrides and every automation. Mark which parts are marketing and which are product.",
            },
            {
              term: "Choose split or full move",
              text: "Split if your team publishes often in Framer and the site performs well. Move fully if you need one codebase, finer control over markup and performance, or you are outgrowing the CMS.",
            },
            {
              term: "Export and back up",
              text: "Export every CMS collection to CSV, download images and files, copy all code components and overrides into a repository, and export members and billing data from your membership and payment tools.",
            },
            {
              term: "Build the app",
              text: "Design the database, add authentication, rebuild form and automation logic as server code, and set up shared design tokens so the app matches the site.",
            },
            {
              term: "Move users",
              text: "Import member profiles into the new auth system. Membership plugins rarely export password hashes, so expect to send a password reset or magic link at launch, and confirm with your provider first.",
            },
            {
              term: "Protect search traffic",
              text: "If any public pages move, map each old URL to its new one, add permanent 301 redirects, and carry over titles, meta descriptions, social images and canonical tags.",
            },
            {
              term: "Launch and monitor",
              text: "Connect the domain or subdomain, submit the sitemap in Google Search Console, and check indexing and redirect errors weekly for the first month.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Framer migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are rebuilding the marketing site when it did not need to move, and missing the small behaviours that plugins and overrides were quietly handling.",
        },
        {
          type: "list",
          items: [
            "Treating a scraped copy of the site as a codebase, then struggling to maintain generated markup nobody designed for editing.",
            "Moving CMS pages without 301 redirects, so search rankings and backlinks are lost.",
            "Missing a code override or plugin setting that hid content, tracked events or redirected logged-in users.",
            "Leaving image fields pointing at Framer's hosting and breaking them when the project is cancelled.",
            "Letting the app and site styles drift because the colours and fonts were copied once by eye.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Framer instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Keep your marketing site on Framer if your team likes it and it performs well. It is one of the fastest ways to design and publish a polished site, and that is hard to beat with custom code. Move the product, not the brochure. A full move off Framer makes sense when you need one codebase, server-rendered pages under your own control, or CMS capacity beyond what your plan allows.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Framer site as code?",
      answer:
        "Not officially. Framer does not offer HTML export for self-hosting. You can export CMS collections to CSV and copy your code components and overrides, but the pages themselves need rebuilding if you leave Framer.",
    },
    {
      question: "Will I lose my SEO if I move off Framer?",
      answer:
        "Not if you plan the move. Keep URLs the same where possible, add a 301 redirect for every one that changes, carry over titles and meta descriptions, and submit the new sitemap in Google Search Console.",
    },
    {
      question: "Can I keep my marketing site in Framer and build the app separately?",
      answer:
        "Yes, and it is usually the sensible choice. The site stays in Framer where your team edits it, and the app runs on a subdomain such as app.yourdomain.com with the same branding and links between the two.",
    },
    {
      question: "Can I move my Framer members to a new app?",
      answer:
        "Usually you can move their profiles and subscription records from the membership tool you used. Password hashes are rarely exportable, so most migrations ask users to set a new password or sign in with a magic link.",
    },
  ],
}
