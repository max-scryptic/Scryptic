import softrLogo from "@/assets/blog/logos/softr.svg"
import type { BlogPost } from "@/lib/blog/types"

export const softr: BlogPost = {
  slug: "migrate-from-softr",
  title: "Migrating from Softr to a production app",
  series: "migration",
  topic: "Softr",
  logo: softrLogo,
  category: "No-code app builders",
  description:
    "How to move a Softr app to production code: where your data lives, exporting users, rebuilding permissions and workflows, and a staged plan to launch safely.",
  summary:
    "Softr does not export code, so moving to production means rebuilding the app on a modern stack such as TypeScript and Postgres. Because Softr usually sits on Airtable, Google Sheets or a database you already control, you can stage the move: build the new app against the existing data, then move that data into Postgres.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No, the app is rebuilt" },
    { label: "Data export", value: "Often already yours, or via CSV and API" },
    { label: "Usual approach", value: "Staged rebuild, then move the data" },
    { label: "Typical timeline", value: "3 to 6 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move off Softr?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the portal or app has become the product your customers pay for, rather than a layer on top of a spreadsheet. Softr is excellent for client portals, member areas and internal tools built from blocks in a few days. It becomes harder to work with when the product needs its own logic, design and scale.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "You are approaching your plan's limits on users, records or workflow actions, and the next tier costs more than the growth justifies.",
            "Customers want features the blocks cannot express without workarounds: custom dashboards, multi-step forms with real validation, or detailed roles.",
            "Pages slow down as the Airtable base or sheet behind them grows, and API rate limits start to show.",
            "You need the app to feel like your own product, not a configured template, with your own onboarding and design.",
            "A client or partner asks about security, data residency or who can see which records, and the answer depends on a set of visibility filters.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Softr?",
      blocks: [
        {
          type: "paragraph",
          text: "Your data, and often you already have it. Softr is a front end over a data source, so the records usually live in Airtable, Google Sheets, a SQL database or Softr Databases. The app itself, its pages, blocks and settings, does not export and has to be rebuilt.",
        },
        {
          type: "list",
          items: [
            {
              term: "Airtable and Google Sheets",
              text: "The data is in your own account. Nothing needs exporting, and a new app can use the same base or sheet through their APIs.",
            },
            {
              term: "SQL sources",
              text: "If Softr reads from PostgreSQL, MySQL, SQL Server, MariaDB, Supabase or Xano, the database is already yours and can stay in place.",
            },
            {
              term: "Softr Databases",
              text: "Records can be read through the Softr Database API, which returns JSON that a script can write into Postgres. Check whether a direct CSV export is available in your workspace, as this has been changing.",
            },
            {
              term: "Users",
              text: "The Users area lets you download your user list as a CSV with emails and details. Passwords are not part of it, so plan a magic link or reset flow.",
            },
            {
              term: "What stays behind",
              text: "Pages, blocks, user groups, visibility rules, conditional filters and Softr workflows. Document them before you start, because they are the specification for the rebuild.",
            },
          ],
        },
        {
          type: "callout",
          title: "Permissions are the hard part",
          text: "In Softr, who sees what is often spread across user groups, page visibility and filters on each block. Write every rule down, in plain language, for each kind of user. That list becomes the most important set of tests in the new app.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a production version need that Softr cannot give you?",
      blocks: [
        {
          type: "paragraph",
          text: "Mostly security enforced on the server, a database built for an application, and a product you can shape freely. Softr gives you a fast, tidy interface; a coded app gives you control over every rule and screen.",
        },
        {
          type: "list",
          items: [
            {
              term: "Server-side authorisation",
              text: "Every request is checked against the signed-in user and their role on the server, so access does not depend on how a page or block was configured.",
            },
            {
              term: "A database for an app",
              text: "Postgres with constraints, indexes and transactions, so data stays consistent and queries stay fast as you grow, without spreadsheet API limits.",
            },
            {
              term: "Your own product",
              text: "Custom screens, onboarding, dashboards and integrations, built to fit the job rather than assembled from a fixed set of blocks.",
            },
            {
              term: "Workflows you can test",
              text: "Automations become server jobs and webhooks with logging and retries, instead of a chain of Softr workflows and third-party tools.",
            },
            {
              term: "Costs that follow usage",
              text: "Hosting and database bills scale with traffic and storage, not with the number of user seats, which matters for portals with many occasional users.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Softr app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Stage it. Build the new app against the data source Softr already uses, run both side by side, then move the data to Postgres once the new app has proved itself. If you start on Softr Databases, export to Postgres first and build on that.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the app",
              text: "List every page, block, user group, visibility rule, filter, form, workflow and integration. Note which pages each group of users actually relies on.",
            },
            {
              term: "Write the permission rules",
              text: "For each user group, describe in plain words which records they can see, create, edit and delete. Get the business owner to confirm it.",
            },
            {
              term: "Design the data model",
              text: "Map each table to Postgres, replace linked records with foreign keys, and keep the Airtable or Softr record IDs in a legacy column.",
            },
            {
              term: "Build the new app",
              text: "Build sign-in, the main pages and permissions first. If you are reading Airtable or Sheets for now, keep that access behind one layer of server code so it is easy to swap later.",
            },
            {
              term: "Run in parallel",
              text: "Invite a small group of users to the new app while Softr serves everyone else. Both read the same data, so nothing needs syncing.",
            },
            {
              term: "Move the data to Postgres",
              text: "Script and rehearse the import until counts and links match, then switch over in a short planned window.",
            },
            {
              term: "Move users",
              text: "Import the user list from Softr's CSV, then let people sign in with a magic link or set a new password. Email them before the switch so the message is expected.",
            },
            {
              term: "Cut over",
              text: "Point your custom domain at the new app, add redirects from old Softr page paths, rebuild any email or workflow senders, and keep Softr read-only for a few weeks.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Softr migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are rebuilding the pages but not the permissions, and letting the old data source keep changing after the switch.",
        },
        {
          type: "list",
          items: [
            "Missing a visibility rule or block filter, so a user sees records that belong to another client.",
            "Staying on Airtable or Sheets as the live database for too long, then hitting rate limits as traffic grows.",
            "Forgetting automations in Airtable, Zapier or Make that write to the same base, which keep running after the data has moved.",
            "Losing linked records because the Airtable or Softr record IDs were not kept during the import.",
            "Leaving old Softr links in client emails and documents without redirects, so people land on a dead page.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Softr instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app is a portal or internal tool that does its job and your plan's limits fit comfortably. Softr is quick to change and easy for non-developers to maintain, which is worth a lot. Move when the app is your core product, when permissions have become risky to manage by configuration, or when seat and record limits shape your pricing more than your customers do.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Softr app as code?",
      answer:
        "No. Softr does not export source code. Your data usually already lives in Airtable, Google Sheets or a SQL database you control, and Softr Databases can be read through its API, but the pages and logic have to be rebuilt.",
    },
    {
      question: "Can I keep using Airtable when I move off Softr?",
      answer:
        "Yes, for a while. A new app can read and write the same Airtable base, which lets you launch without moving data first. Plan to move to Postgres soon after, because Airtable's API rate limits and record limits are not built for a busy app.",
    },
    {
      question: "How do I move my Softr users to a new app?",
      answer:
        "Download the user list as a CSV from Softr's Users area and import it into the new app. Passwords do not come with it, so users sign in with a magic link or set a new password the first time.",
    },
    {
      question: "How long does it take to migrate from Softr?",
      answer:
        "Typically three to six weeks to a production first release, depending on the number of pages and user groups, how complex the permission rules are, and how much data needs cleaning.",
    },
  ],
}
