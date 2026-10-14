import retoolLogo from "@/assets/blog/logos/retool.svg"
import type { BlogPost } from "@/lib/blog/types"

export const retool: BlogPost = {
  slug: "migrate-from-retool",
  title: "Migrating from Retool to a production app",
  series: "migration",
  topic: "Retool",
  logo: retoolLogo,
  category: "Internal tool builders",
  description:
    "When a Retool tool becomes your product: what you can take with you, why the interface needs rebuilding, and a step by step plan to launch a customer app.",
  summary:
    "Retool apps are definitions that only run inside Retool, so the interface cannot be exported as code and has to be rebuilt. The good news is that your data usually already lives in your own database. The usual answer is to keep Retool for internal admin and build the customer-facing product as a proper web app on the same data.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No, apps export as Retool files" },
    { label: "Data export", value: "Usually already in your own database" },
    { label: "Usual approach", value: "Keep Retool for admin, build the product" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move off Retool?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the internal tool has quietly become the product. Retool is built for teams to work on their own data quickly. It is a less natural fit once customers need to log in, the interface needs your brand, or the cost and limits of per-user pricing start to shape product decisions.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Customers, partners or suppliers need their own login, and you are weighing the cost of external users against building something yourself.",
            "The product needs a branded, polished interface, a public website, or pages that rank in search.",
            "Business rules live in JavaScript transformers and queries spread across apps, and nobody is sure which version is right.",
            "You need things Retool apps are not designed for: offline use, fine-grained customer permissions, public sign-up or heavy custom interactions.",
            "A customer or investor asks about your product architecture, and the answer is a set of Retool apps.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Retool?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data and your logic, but not a working interface. Retool exports apps as JSON or Toolscript files that only Retool can run, while your data normally sits in databases and APIs you already own.",
        },
        {
          type: "list",
          items: [
            {
              term: "Your data",
              text: "Most Retool apps read and write your own Postgres, MySQL or other database, or call your own APIs. That data is already yours and does not move.",
            },
            {
              term: "Retool Database",
              text: "If you stored data in Retool Database, it is a managed Postgres database. An admin can get a connection string and copy the data out with standard Postgres tools, or export tables as CSV.",
            },
            {
              term: "Queries and logic",
              text: "SQL queries, JavaScript transformers and Retool Workflows can be read from the app editor or an export file. They make a useful specification, but each one has to be rewritten as backend code.",
            },
            {
              term: "App definitions",
              text: "Exports and source control capture an app's components and queries, so you can back them up or move them between Retool instances. They cannot be turned into a React app or run anywhere else.",
            },
            {
              term: "What stays behind",
              text: "The interface, Retool's permissions and user groups, its audit logs and the resource connections. All of these need an equivalent in the new app if customers use them.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "A Retool migration is a rebuild of the interface on top of data you already own. Your Retool apps are the best specification you will ever have for it: every screen, query and edge case is written down.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a customer-facing app need that Retool provided?",
      blocks: [
        {
          type: "paragraph",
          text: "A customer-facing app needs everything Retool was handling for you, rebuilt for users you do not trust by default. Internal tools assume staff are well-meaning. Products must assume some users are not.",
        },
        {
          type: "list",
          items: [
            {
              term: "Authentication",
              text: "Public sign-up, password resets, email verification and, for business customers, single sign-on. Retool handled staff logins for you.",
            },
            {
              term: "Per-customer data access",
              text: "Every query must be scoped to the signed-in customer on the server. In Retool, staff often had broad access to the database, which is not acceptable for customers.",
            },
            {
              term: "An API layer",
              text: "Retool queries often run SQL straight against the database. A product needs a backend with validated endpoints between the interface and the data.",
            },
            {
              term: "Background jobs",
              text: "Scheduled tasks and Retool Workflows become backend jobs with retries, logging and alerts when they fail.",
            },
            {
              term: "Interface and brand",
              text: "A responsive interface designed for customers, with your branding, onboarding and empty states, rather than tables and forms built for operators.",
            },
            {
              term: "Tests, environments and monitoring",
              text: "Automated tests on the core flows, a staging environment with its own data, error tracking and backups.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from Retool, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Split the work by audience first: what staff need stays in Retool, what customers need becomes the product. Then rebuild the customer side on the same database, one workflow at a time.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Map users and screens",
              text: "List every Retool app, who uses it and what it does. Mark each screen as staff-only or customer-facing.",
            },
            {
              term: "Export and document",
              text: "Export each app as a backup, then write down the queries, transformers, workflows and permissions behind the customer-facing screens.",
            },
            {
              term: "Secure the database",
              text: "Create separate database credentials for the new app with only the access it needs, and decide whether data in Retool Database should move to a Postgres instance you run.",
            },
            {
              term: "Build the backend",
              text: "Turn the documented queries and logic into a backend with tested endpoints, scoped to each customer, plus jobs for anything Retool Workflows did.",
            },
            {
              term: "Build the customer app",
              text: "Build the interface in a web framework such as Next.js, with sign-up, onboarding and the core workflows first.",
            },
            {
              term: "Add tests and monitoring",
              text: "Cover sign-in, permissions and the flows that make money with automated tests, then add error tracking, uptime checks and backups.",
            },
            {
              term: "Run in parallel",
              text: "Invite a few customers to the new app while Retool keeps working, and compare results on real data.",
            },
            {
              term: "Cut over and slim down",
              text: "Move all customers across, remove their Retool access, and keep Retool for the internal admin screens that still earn their place.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Retool migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are rebuilding the internal tools nobody asked to replace, and missing logic hidden inside Retool queries.",
        },
        {
          type: "list",
          items: [
            "Rebuilding every admin screen in code when Retool was doing that job well, and delaying the product by months.",
            "Missing a JavaScript transformer or a query condition that quietly filtered or corrected data.",
            "Giving the new app the same broad database credentials Retool used, so a single bug can expose every customer's data.",
            "Changing the database schema for the new app and breaking the Retool apps that still depend on it.",
            "Forgetting scheduled workflows until the reports or reminders they produced stop arriving.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Retool instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, for internal tools. Retool is very good at admin panels, support consoles and operations dashboards, and rebuilding those in code is rarely a good use of money. Move the parts customers touch once they need their own logins, your brand and a product you fully control, and let both run on the same database.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export a Retool app as code?",
      answer:
        "No. Retool exports apps as JSON or Toolscript files that only run inside Retool. They are useful as backups and as a specification, but the interface has to be rebuilt to run anywhere else.",
    },
    {
      question: "Can customers use a Retool app?",
      answer:
        "Yes, Retool supports external users on some plans, billed separately from internal users. It suits portals for a modest number of users. Products that need public sign-up, a custom branded experience or large user numbers are usually better built as their own app.",
    },
    {
      question: "Do I have to stop using Retool if I build my own app?",
      answer:
        "No. Many companies keep Retool for internal admin and build only the customer-facing product. Both can read and write the same database, as long as schema changes are planned with the Retool apps in mind.",
    },
    {
      question: "How long does it take to move from Retool to a production app?",
      answer:
        "Typically four to eight weeks for the customer-facing product, depending on how many workflows and user roles it needs. Internal tools can stay in Retool, which keeps the scope focused.",
    },
  ],
}
