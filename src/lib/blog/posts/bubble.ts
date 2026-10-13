import bubbleLogo from "@/assets/blog/logos/bubble.svg"
import type { BlogPost } from "@/lib/blog/types"

export const bubble: BlogPost = {
  slug: "migrate-from-bubble",
  title: "Migrating from Bubble to a production app",
  tool: "Bubble",
  logo: bubbleLogo,
  category: "No-code app builders",
  description:
    "How to move a Bubble app to production code: what you can export, what you have to rebuild, and a step by step plan for data, users, workflows and cutover.",
  summary:
    "Bubble does not export code, so moving off it means a planned rebuild on a modern stack such as TypeScript and Postgres. Your data comes with you through CSV exports or the Data API, your users move with a password reset or magic link, and the old app keeps running until the new one is ready.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No, the app file only opens in Bubble" },
    { label: "Data export", value: "CSV per data type, or the Data API" },
    { label: "Usual approach", value: "Planned rebuild, run in parallel" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a Bubble app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the platform starts to shape your business decisions more than your customers do. Bubble is one of the most capable no-code tools there is, and many companies have found product market fit on it. The pressure to move usually comes from cost, speed, control or due diligence, not from Bubble failing outright.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Your workload unit usage climbs faster than your revenue, and you cannot easily predict next month's bill.",
            "Pages with long lists or heavy searches feel slow, and every fix is a workaround inside the editor.",
            "You want to hire developers, but most of them do not want to work in a visual editor, and the ones who do are hard to find.",
            "An investor, acquirer or enterprise customer asks who owns the code and how it is tested, and the honest answer is uncomfortable.",
            "You need something Bubble makes awkward: complex background processing, fine-grained permissions, direct database access for reporting, or a specific data residency setup.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Bubble?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data and your design decisions, but not your code. Bubble runs your app inside its own engine, so there is no source code to download. Everything you built in the editor has to be rebuilt, while everything stored in the database can be moved.",
        },
        {
          type: "list",
          items: [
            {
              term: "Database records",
              text: "Each data type can be exported to CSV from the Data tab. For larger apps, the Data API returns records in pages of up to 100, which a script can loop through. Relationships appear as Bubble's unique IDs, which you will use to reconnect records later.",
            },
            {
              term: "Files and images",
              text: "Uploaded files sit on Bubble's storage and appear in your data as URLs. They need downloading and uploading to your own storage before the old app is switched off.",
            },
            {
              term: "User accounts",
              text: "Emails and any fields you added to the User type export like other data. Passwords do not: Bubble stores them hashed and does not hand them over, so plan a reset or magic link flow.",
            },
            {
              term: "The app file",
              text: "Bubble can export your app as a .bubble file on paid plans, but it is designed to be imported into another Bubble app. It is useful as a backup and as a reference, not as code.",
            },
            {
              term: "What stays behind",
              text: "Workflows, privacy rules, plugins, option sets and page layouts. They are your specification for the rebuild, so document them before you start.",
            },
          ],
        },
        {
          type: "callout",
          title: "Watch your workload units",
          text: "Exporting and reading data through the API uses workload units, and bulk work is relatively expensive on Bubble. Run large exports in batches, outside busy hours, and check your plan's allowance before you start.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a production version need that Bubble cannot give you?",
      blocks: [
        {
          type: "paragraph",
          text: "Mainly ownership and control: code in your own repository, a database you can query directly, and costs that follow your infrastructure rather than a platform's pricing model. A rebuild is also the moment to add the engineering basics a visual editor hides from you.",
        },
        {
          type: "list",
          items: [
            {
              term: "Code you own",
              text: "A TypeScript codebase in your own GitHub organisation, which any competent developer can read, review and extend.",
            },
            {
              term: "A real database",
              text: "Postgres with proper tables, foreign keys and indexes. Reports, analytics and integrations can query it directly instead of going through an API with page limits.",
            },
            {
              term: "Server-side permissions",
              text: "Bubble's privacy rules become authorisation checks in your server code and, where it helps, row level security in the database. Each rule needs to be rewritten and tested deliberately.",
            },
            {
              term: "Background jobs",
              text: "Backend and scheduled workflows become queued jobs and scheduled tasks that you can monitor, retry and test.",
            },
            {
              term: "Tests and environments",
              text: "Automated tests on sign-up, payments and the core workflow, plus separate development, staging and production environments with their own databases.",
            },
            {
              term: "Predictable costs",
              text: "Hosting and database bills that scale with traffic and storage, which most teams find easier to forecast.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Bubble app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Treat the Bubble app as a working specification and keep it live until the new app has proved itself. Build first, rehearse the data move several times, then switch over in one planned window.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the app",
              text: "List every page, data type, field, option set, workflow, backend workflow, privacy rule, plugin and API connection. Note which ones users actually rely on, and which can be dropped.",
            },
            {
              term: "Design the new data model",
              text: "Map each Bubble data type to a Postgres table. Turn lists of things into join tables, option sets into enums or lookup tables, and keep each record's Bubble unique ID in a legacy column.",
            },
            {
              term: "Rebuild the core flows",
              text: "Build sign-up, sign-in, the main workflow and payments first. Rebuild privacy rules as server-side checks and test them as an ordinary user, not only as an admin.",
            },
            {
              term: "Write and rehearse the data migration",
              text: "Script the export from the Data API or CSV files, the transformation and the import. Run it against a copy of production data until the counts match and nothing is orphaned.",
            },
            {
              term: "Move files",
              text: "Copy every uploaded file to your own storage and rewrite the URLs in the database to point at the new location.",
            },
            {
              term: "Plan the user move",
              text: "Import accounts without passwords. On first visit, users confirm their email through a magic link or set a new password. Tell them before the switch so the email is expected.",
            },
            {
              term: "Run in parallel",
              text: "Give a small group of real users the new app while Bubble stays the main system. Fix what they find before anyone else moves.",
            },
            {
              term: "Cut over",
              text: "Freeze changes in Bubble, run the final data migration, point the domain at the new hosting, add redirects for old page URLs, and keep Bubble read-only for a few weeks before closing it.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Bubble migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "Most problems come from hidden behaviour: logic that lives in a workflow or privacy rule nobody wrote down, which users only notice when it stops happening.",
        },
        {
          type: "list",
          items: [
            "Missing a backend or scheduled workflow, so reminders, renewals or clean-up jobs silently stop after cutover.",
            "Losing relationships because records were imported before the records they point to, or because the Bubble unique IDs were not kept.",
            "Leaving file URLs pointing at Bubble's storage, then breaking every image when the Bubble plan is cancelled.",
            "Treating the rebuild as a chance to add every wished-for feature, so launch slips by months. Match what exists first, then improve it.",
            "Letting data keep changing in Bubble during a long migration window, then losing the records created in between.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Bubble instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if Bubble is not holding you back. If your costs are predictable, the app is fast enough, your team can ship changes comfortably and nobody is asking about code ownership, a rebuild spends money without changing much for your customers. Move when the cost, performance or control problems are real and recurring, not because coded apps feel more serious.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Bubble?",
      answer:
        "No. Bubble does not generate source code you can run elsewhere. You can export your data as CSV or through the Data API, and download a .bubble app file, but that file only imports back into Bubble. Moving off Bubble means rebuilding the app.",
    },
    {
      question: "How do I move my users off Bubble without losing their accounts?",
      answer:
        "Export the User data type with emails and profile fields, then import those accounts into the new app without passwords, because Bubble does not export them. Users then sign in with a magic link or set a new password the first time they visit.",
    },
    {
      question: "How long does it take to migrate from Bubble?",
      answer:
        "Typically four to eight weeks to a production first release, depending on how many workflows, user roles and integrations the app has, and how much data needs moving and checking.",
    },
    {
      question: "Will moving off Bubble reduce my costs?",
      answer:
        "Often, but not always. For many apps, hosting and a managed Postgres database cost less than heavy workload unit usage, and they are easier to predict. You do take on the cost of maintaining the code, so compare both before deciding.",
    },
  ],
}
