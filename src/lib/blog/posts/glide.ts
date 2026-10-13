import type { BlogPost } from "@/lib/blog/types"

export const glide: BlogPost = {
  slug: "migrate-from-glide",
  title: "Migrating from Glide to a production app",
  tool: "Glide",
  category: "No-code app builders",
  description:
    "How to move a Glide app to production code: getting data out of Sheets, Airtable or Glide Tables, moving users, rebuilding logic and a staged plan to launch.",
  summary:
    "Glide does not export code, so moving to production means rebuilding the app on a modern stack such as TypeScript and Postgres. If your data already lives in Google Sheets or Airtable it is already yours, and you can build the new app against it first, then move it into Postgres once the app has proved itself.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No, the app is rebuilt" },
    { label: "Data export", value: "CSV, the Glide API, or your own sheets" },
    { label: "Usual approach", value: "Staged rebuild, then move the data" },
    { label: "Typical timeline", value: "3 to 6 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move off Glide?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the app has become a product, or a critical part of the business, rather than a convenient front end on a spreadsheet. Glide is very good at turning data into a clean, usable app in hours, especially for teams and internal processes. It is less suited to customer-facing products with complex rules, large data and their own brand.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Your update usage keeps rising with activity, and the bill is harder to predict than the value each user brings.",
            "You are close to the row limits for your plan or data source, or the app slows as tables grow.",
            "You need logic that is awkward in computed columns and workflows: multi-step transactions, detailed permissions or complex calculations.",
            "You are selling to customers who expect their own branded experience, an app store listing or answers about where their data is held.",
            "The spreadsheet behind the app is edited by hand by several people, and a wrong edit has already broken something.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Glide?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data, and if it lives in Google Sheets or Airtable you already have it. Glide does not export the app itself, so screens, computed columns, actions and workflows are rebuilt.",
        },
        {
          type: "list",
          items: [
            {
              term: "Google Sheets, Airtable and Excel",
              text: "Data in these sources stays in your own account. Nothing needs exporting, and a new app can read the same data through their APIs.",
            },
            {
              term: "Glide Tables",
              text: "Each table can be exported to CSV from the Data Editor. Computed columns are not included, because they are calculated by Glide rather than stored.",
            },
            {
              term: "Big Tables",
              text: "These export to CSV from the Data Editor, with the file sent by email, and can also be read through Glide's API. Check your plan, as API reads count towards your update usage.",
            },
            {
              term: "Users",
              text: "Your users table, with emails and any profile columns, exports like other data. Glide's default sign-in uses emailed codes rather than passwords, so there are no passwords to lose.",
            },
            {
              term: "What stays behind",
              text: "Screens, components, computed columns, row owner settings, actions and workflows. Write them down, because they are the specification for the rebuild.",
            },
          ],
        },
        {
          type: "callout",
          title: "Computed columns are logic, not data",
          text: "Relations, lookups, rollups, if-then-else and template columns are calculations. They will not appear in an export. List every one, with what it does, and rebuild each as a database query, view or piece of code.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a production version need that Glide cannot give you?",
      blocks: [
        {
          type: "paragraph",
          text: "Mostly a real database, server-side rules and a product that is entirely yours. A spreadsheet is a good place to start a business process, but a poor place to run a customer product with many users editing at once.",
        },
        {
          type: "list",
          items: [
            {
              term: "A database built for an app",
              text: "Postgres with typed columns, constraints and indexes. It stops bad data at the door, handles many users writing at once and keeps queries fast as tables grow.",
            },
            {
              term: "Server-side permissions",
              text: "Glide's row owners control which rows reach each device. In a coded app, every request is checked on the server, and roles can be as detailed as your business needs.",
            },
            {
              term: "Your own product",
              text: "Your design, your domain, your onboarding and, if you need it, a native app in the stores, without the builder's layout limits.",
            },
            {
              term: "Background jobs and integrations",
              text: "Workflows become server jobs and webhooks that can be retried, logged and tested.",
            },
            {
              term: "Tests, environments and backups",
              text: "A staging copy of the app and database, automated tests on the core flows, error tracking and scheduled backups.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Glide app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "When the data is in Google Sheets or Airtable, stage the move: build the new app against the existing data first, then move the data to Postgres. Changing one thing at a time makes problems easier to find. If the data is in Glide Tables or Big Tables, export it and move straight to Postgres instead.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the app",
              text: "List every table, column, computed column, row owner rule, action, workflow and integration. Note which screens each user role sees.",
            },
            {
              term: "Clean the data",
              text: "Fix inconsistent formats, duplicate rows and free text where there should be a fixed list. Spreadsheets tolerate mess that a database will reject.",
            },
            {
              term: "Design the data model",
              text: "Map each table to a Postgres table, turn relations into foreign keys and decide which computed columns become stored fields and which become queries.",
            },
            {
              term: "Build the new app",
              text: "Build sign-in, the main flows and permissions first. For Sheets or Airtable data, read and write through their APIs behind your own server code, so swapping the data source later only touches that layer.",
            },
            {
              term: "Run in parallel",
              text: "Give a small group the new app while everyone else stays on Glide. Both apps read the same source, so nothing needs syncing.",
            },
            {
              term: "Move the data to Postgres",
              text: "Script the import, rehearse it until the counts match, then run it in a short planned window and switch the new app's data layer over.",
            },
            {
              term: "Move users",
              text: "Import user emails and roles. Use magic links or one-time codes in the new app, which feels familiar to people used to Glide's emailed codes.",
            },
            {
              term: "Cut over",
              text: "Point your domain at the new app, redirect old Glide links, tell users what has changed and keep the Glide app read-only for a few weeks.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Glide migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "Most problems come from computed columns that were forgotten, and from people still editing the spreadsheet directly after it has stopped being the source of truth.",
        },
        {
          type: "list",
          items: [
            "Exporting tables without listing the computed columns, then discovering totals and statuses missing after launch.",
            "Staying on the spreadsheet too long. Sheets and Airtable have API rate limits that a busy app will reach, so treat that stage as temporary.",
            "Leaving staff with edit access to the old sheet after cutover, so changes land in the wrong place.",
            "Assuming row owners carried over. Permissions have to be rebuilt and tested as each kind of user.",
            "Linking tables by Glide row IDs but leaving those ID columns out of the export, then being unable to reconnect records.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Glide instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app is an internal tool that works and your costs are steady. Glide is an efficient way to give a team a good interface on its data, and a rebuild would add maintenance for little gain. Move when the app has become a customer-facing product, or when cost, scale or permissions are getting in the way.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Glide app as code?",
      answer:
        "No. Glide does not export source code. Your data can be exported as CSV, read through the Glide API for Big Tables, or used directly if it lives in Google Sheets or Airtable, but the screens and logic have to be rebuilt.",
    },
    {
      question: "Can I keep my Google Sheet or Airtable base when I leave Glide?",
      answer:
        "Yes, for a while. A new app can read and write the same data through their APIs, which lets you launch without moving data first. Plan to move it into Postgres soon after, because spreadsheets struggle with many users and strict data rules.",
    },
    {
      question: "How do I move my Glide users to a new app?",
      answer:
        "Export the users table with emails and roles and import it into the new app. Glide's default sign-in uses emailed codes rather than passwords, so users can sign in to the new app with a magic link or code straight away.",
    },
    {
      question: "How long does it take to migrate from Glide?",
      answer:
        "Typically three to six weeks to a production first release, depending on the number of screens, roles and computed columns, and how much the data needs cleaning before it goes into a database.",
    },
  ],
}
