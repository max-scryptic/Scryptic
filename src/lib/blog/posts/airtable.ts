import airtableLogo from "@/assets/blog/logos/airtable.svg"
import type { BlogPost } from "@/lib/blog/types"

export const airtable: BlogPost = {
  slug: "migrate-from-airtable",
  title: "Migrating from Airtable to a production app",
  series: "migration",
  topic: "Airtable",
  logo: airtableLogo,
  category: "Internal tool builders",
  description:
    "How to move a product or operation off Airtable: exporting data and files, turning linked records and automations into a real backend, and a step by step plan.",
  summary:
    "Airtable has no code to export, but all of your data can come out through CSV exports and the Web API. Moving to production means turning your bases into a relational Postgres database, your automations and Zapier or Make steps into backend jobs, and your Interfaces into a proper app, while Airtable can stay on as a back office.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "None, Interfaces stay in Airtable" },
    { label: "Data export", value: "CSV per view, or the Web API" },
    { label: "Usual approach", value: "Move the product data to Postgres" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move off Airtable?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when Airtable has become the system of record for something customers depend on. Airtable is an excellent, flexible database for a team. It strains when it is also the backend for a customer-facing product, held together by automations, forms and Zapier or Make scenarios.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Bases are approaching your plan's record limits, or you are archiving data just to stay under them.",
            "Integrations hit the API rate limits, and Zapier or Make runs fail or queue at busy times.",
            "Customers need to log in and see only their own data, and Interface or portal permissions do not match how your business works.",
            "A chain of automations and zaps breaks silently, and you find out from a customer.",
            "Anyone with edit access can rename a field or change a formula and break a downstream process.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Airtable?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take all of your data, but not the app around it. Records come out as CSV, one view at a time, or in full through the Airtable Web API, and attachments have to be downloaded separately. Interfaces, automations and views do not export as anything you can run elsewhere.",
        },
        {
          type: "list",
          items: [
            {
              term: "Records",
              text: "A CSV export reflects the view you export from, including its filters and hidden fields, so use an unfiltered view with every field showing. The Web API returns every record with its ID, which makes a scripted, repeatable export far more reliable.",
            },
            {
              term: "Linked records",
              text: "In a CSV, links appear as the linked records' names, which loses the real relationship. Through the API they come back as record IDs, which you can map to foreign keys.",
            },
            {
              term: "Attachments",
              text: "Attachment fields hold download URLs that expire after a few hours. Download every file during the migration and store it in your own storage, rather than saving the links.",
            },
            {
              term: "Schema",
              text: "Table and field definitions, including field types and formula text, can be read through the metadata API and used as the starting point for the new database design.",
            },
            {
              term: "What stays behind",
              text: "Interfaces, views, automations, scripts and any Zapier or Make scenarios. Document what each one does, because each needs an equivalent in the new app.",
            },
          ],
        },
        {
          type: "callout",
          title: "Download the files first",
          text: "Expiring attachment links are the most common way data gets lost in an Airtable migration. Copy every file into storage you own before you switch anything off, and check the counts match.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does an Airtable base need to become a real backend?",
      blocks: [
        {
          type: "paragraph",
          text: "It needs a proper data model, server-side logic and access control. Airtable lets you get away with loose structure because people fix things by hand. A product needs rules that hold without anyone watching.",
        },
        {
          type: "list",
          items: [
            {
              term: "A relational schema",
              text: "Each table becomes a Postgres table with typed columns and constraints. Linked records become foreign keys, and many-to-many links become join tables.",
            },
            {
              term: "Queries instead of lookups",
              text: "Lookups, rollups and formulas become joins, views or computed columns. Some are better calculated when they are needed than stored.",
            },
            {
              term: "Clean data",
              text: "Free-text fields used as categories, duplicate records and inconsistent dates all need cleaning before constraints will accept them.",
            },
            {
              term: "Backend jobs",
              text: "Airtable automations and Zapier or Make steps become backend code and scheduled jobs, with retries, logging and alerts when something fails.",
            },
            {
              term: "Permissions",
              text: "Customer access is enforced by the server for every request, scoped to the signed-in user or organisation, instead of by which Interface someone can open.",
            },
            {
              term: "Backups and history",
              text: "Automated database backups, an audit trail for important changes and a staging copy of the data for testing.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from Airtable, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Design the database, build the app against a copy of the data, then move for real in one planned window. Airtable keeps running the business until the switch.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory",
              text: "List every base, table, field, Interface, form, automation, script and external zap or scenario. Note who uses each one and what breaks if it stops.",
            },
            {
              term: "Decide what moves",
              text: "Move the data and processes customers depend on. Leave internal tracking, content calendars and ad hoc team bases in Airtable if they work.",
            },
            {
              term: "Design the schema",
              text: "Turn tables into Postgres tables, links into foreign keys, and lookups and rollups into queries. Agree field types and required values.",
            },
            {
              term: "Write a repeatable import",
              text: "Script the export through the Web API, download every attachment, clean the data and load it into the new database. Run it many times until it is reliable.",
            },
            {
              term: "Rebuild the logic",
              text: "Replace automations and Zapier or Make steps with backend jobs and webhooks, and test each one against the old behaviour.",
            },
            {
              term: "Build the app",
              text: "Build the customer-facing screens and any staff screens that must move, with authentication and server-side permissions from the start.",
            },
            {
              term: "Keep a back office if it helps",
              text: "If the team loves working in Airtable, sync a read-only copy of selected data back to it, rather than letting both systems accept edits.",
            },
            {
              term: "Cut over",
              text: "Freeze edits in Airtable, run the final import, check record and file counts, switch the integrations, and keep the base read-only as an archive.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Airtable migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are losing files and relationships during export, and missing the automations nobody remembered building.",
        },
        {
          type: "list",
          items: [
            "Saving attachment URLs instead of the files, then finding every link has expired.",
            "Exporting from a filtered view and silently leaving records or fields behind.",
            "Importing linked records by name instead of record ID, so duplicates link to the wrong rows.",
            "Forgetting an automation, script or zap that sent emails or updated another system, until it stops.",
            "Letting both Airtable and the new app accept edits for weeks, then trying to reconcile two versions of the truth.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Airtable instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if Airtable runs internal operations well and customers never touch it directly. It is a superb back office: flexible, quick to change and easy for non-technical staff. Move the customer-facing product and its system of record to Postgres once you hit record, rate or permission limits, or once a broken automation would cost you customers.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How do I export all my data from Airtable?",
      answer:
        "Export each table as CSV from an unfiltered view, or use the Airtable Web API to fetch every record with its ID and linked record IDs. Download attachments separately, because their URLs expire after a few hours.",
    },
    {
      question: "What replaces Airtable linked records, lookups and rollups?",
      answer:
        "In a relational database such as Postgres, linked records become foreign keys and join tables, and lookups and rollups become queries, views or computed columns. The result is faster and enforces the relationships for you.",
    },
    {
      question: "What happens to my Airtable automations and Zapier zaps?",
      answer:
        "They become backend code: jobs triggered by events, scheduled tasks and webhooks. Each one gets retries and alerts, so a failure is noticed straight away instead of discovered later.",
    },
    {
      question: "How long does it take to move from Airtable to a production app?",
      answer:
        "Typically four to eight weeks, depending on the number of tables and automations, how clean the data is, and how much of the operation moves rather than staying in Airtable.",
    },
  ],
}
