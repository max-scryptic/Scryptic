import airtableLogo from "@/assets/blog/logos/airtable.svg"
import type { BlogPost } from "@/lib/blog/types"

export const airtable: BlogPost = {
  slug: "migrate-from-airtable",
  title: "How Airtable fields map to Postgres when you outgrow your base",
  series: "migration",
  topic: "Airtable",
  logo: airtableLogo,
  category: "Internal tool builders",
  description:
    "A field by field guide to moving Airtable into Postgres: linked records, lookups, rollups, formulas, attachments and selects, plus what replaces automations.",
  summary:
    "Every Airtable field type has a Postgres equivalent, but only some become columns: linked records become foreign keys or join tables, lookups and rollups become queries, and attachments become files in your own storage. Automations turn into backend jobs and Interfaces into app screens, while Airtable can stay on as a back office.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "None, Interfaces stay in Airtable" },
    { label: "Data export", value: "CSV per view, or the Web API" },
    { label: "Hardest part", value: "Linked records and formulas" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "read-the-schema",
      heading: "Start from the schema, not the CSV",
      blocks: [
        {
          type: "paragraph",
          text: "Say your base has four tables: Clients, Projects, Invoices and Files. Exported as CSV, it looks like four spreadsheets. Read through the Airtable metadata API, it's a list of field types and options, and that list tells you exactly how much work the move to Postgres will be.",
        },
        {
          type: "paragraph",
          text: "Plain text, numbers and dates move across in an afternoon. Linked records, lookups, rollups, formulas and attachments are where the time goes, because none of them is really a value: they're relationships, calculations or pointers to files. Count each type and you have a rough estimate before anyone writes code.",
        },
        {
          type: "paragraph",
          text: "CSV exports also lie a little: they follow the view's filters and hidden fields, and write links as names. The Web API returns every record ID and every link as a list of IDs, which is what a reliable import needs.",
        },
      ],
    },
    {
      id: "field-mapping",
      heading: "Airtable field types and their Postgres columns",
      blocks: [
        {
          type: "paragraph",
          text: "Most field types map to one typed column with a constraint. The ones marked as a query or a view don't get a column at all; they're recalculated from other data when you need them.",
        },
        {
          type: "table",
          caption: "How each Airtable field type is represented in Postgres",
          columns: ["Airtable field", "Postgres", "Watch out for"],
          rows: [
            ["Single line text", "text, with not null where required", "Trailing spaces and empty strings that should be null"],
            ["Long text", "text", "Rich text arrives as Markdown, so decide how the app renders it"],
            ["Number, currency, percent", "numeric with fixed precision, or integer pence", "Percent is stored as a fraction, so 0.2 means 20 percent"],
            ["Checkbox", "boolean not null default false", "The API omits unticked boxes, so a missing value means false"],
            ["Date, date with time", "date, or timestamptz", "Check the field's time zone setting before converting"],
            ["Single select", "text with a check constraint, or a lookup table", "Options people typed by hand, with spelling variants"],
            ["Multiple select", "text array, or a join table", "Use a join table if you will filter or report on it"],
            ["Linked record", "Foreign key, or a join table", "Every link is many to many until you decide otherwise"],
            ["Lookup", "No column, a join in a query or view", "Storing it creates a copy that goes stale"],
            ["Rollup, count", "No column, an aggregate in a view", "Heavy rollups may need a materialised view"],
            ["Formula", "Generated column, view or app code", "Only formulas using the same row can be generated columns"],
            ["Attachment", "A files table pointing at object storage", "Download URLs expire within hours"],
            ["Collaborator, created by", "Foreign key to a users table", "Airtable users are not your app's users"],
            ["Created time, last modified", "timestamptz with a default and a trigger", "Keep the original values from Airtable on import"],
            ["Autonumber", "Identity column", "Carry the old numbers if anyone quotes them"],
            ["Email, URL, phone", "text with a check constraint", "Years of unvalidated input"],
            ["Button", "No column, an action in the app", "It usually triggers a script or automation you must rebuild"],
          ],
        },
      ],
    },
    {
      id: "linked-records",
      heading: "Linked records need a decision, not a conversion",
      blocks: [
        {
          type: "paragraph",
          text: "Decide the real cardinality of every link before you design a table. Airtable stores every link as a list on both sides, so a Project linked to a Client looks identical to a Project linked to five Clients. Postgres needs to know which one you meant.",
        },
        {
          type: "list",
          items: [
            {
              term: "One to many",
              text: "If each project belongs to exactly one client, the projects table gets a client_id foreign key. Query the data first: if any project has two clients, someone used the link differently and you need to resolve it.",
            },
            {
              term: "Many to many",
              text: "If a project can have several clients and a client several projects, create a join table with both IDs and a unique constraint on the pair.",
            },
            {
              term: "Links to the same table",
              text: "Parent tasks, related records and referrals become a self-referencing foreign key or a join table pointing back at the same table.",
            },
          ],
        },
        {
          type: "callout",
          title: "Keep the Airtable record ID",
          text: "Add an airtable_id column to every table during the migration. Import the rows first, then resolve links in a second pass by matching record IDs. The primary field is a display name, not a key, and duplicates in it will link rows to the wrong parent.",
        },
      ],
    },
    {
      id: "formulas-rollups",
      heading: "Formulas, lookups and rollups become queries",
      blocks: [
        {
          type: "paragraph",
          text: "Sort formulas into two piles: ones that only use fields on the same record, and ones that reach across links. The first pile can become Postgres generated columns, which recalculate whenever the row changes. The second pile becomes views or queries, because a generated column can't read another table.",
        },
        {
          type: "paragraph",
          text: "There's a third, smaller pile that catches people out. Formulas using TODAY() or NOW(), such as days overdue, can't be generated columns, because Postgres only allows calculations that give the same answer every time. Calculate those when the query runs.",
        },
        {
          type: "paragraph",
          text: "Lookups and rollups follow the same logic. An invoice total rolled up from line items becomes a sum in a view, or a materialised view if the table is large. Read each formula's text from the metadata API and translate it by hand.",
        },
      ],
    },
    {
      id: "attachments",
      heading: "Copy every attachment before you switch anything off",
      blocks: [
        {
          type: "paragraph",
          text: "Attachments are where data actually gets lost. An attachment field holds download URLs that expire after a few hours, so a migration that saves the links instead of the files ends up with a table of dead addresses.",
        },
        {
          type: "paragraph",
          text: "Download every file during the import, upload it to storage you own, such as Supabase Storage or S3, and record it in a files table with the owning record, file name, size and path. Compare counts before and after.",
        },
      ],
    },
    {
      id: "automations-interfaces",
      heading: "What replaces automations, scripts and Interfaces",
      blocks: [
        {
          type: "paragraph",
          text: "Automations become backend jobs and Interfaces become screens in your app. Neither exports, so list each one, write down what it actually does, and rebuild it with the retries and alerts Airtable never gave you.",
        },
        {
          type: "table",
          caption: "Airtable features and what replaces them in a Postgres backed app",
          columns: ["In Airtable", "In the new app"],
          rows: [
            ["When a record is created or updated", "A database trigger or an event that queues a backend job"],
            ["When a record matches conditions", "A check in the code that changes the record, or a scheduled query"],
            ["At a scheduled time", "A cron job or scheduled function"],
            ["When a webhook is received", "An API endpoint that validates and stores the payload"],
            ["Send an email action", "A job calling an email provider, with retries and a log"],
            ["Run a script action", "A server function in the repository, under review and tests"],
            ["Zapier or Make scenario", "Direct API integrations in the backend"],
            ["Forms", "App forms with server-side validation"],
            ["Interfaces for staff", "An admin area, or Airtable kept as a synced back office"],
            ["Interfaces or portals for customers", "Signed-in app screens scoped to the user's own data"],
          ],
        },
        {
          type: "paragraph",
          text: "Not everything has to leave: a base synced one way from Postgres makes a fine back office, as long as only one system accepts edits.",
        },
      ],
    },
    {
      id: "running-the-import",
      heading: "Running the import",
      blocks: [
        {
          type: "paragraph",
          text: "Script the import so you can run it many times, then run it for real in one planned window while Airtable is frozen.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Fetch every table through the Web API, 100 records a page, and save the raw JSON so you can rerun the transform without fetching again.",
            "Respect the limit of five requests per second per base, and back off when the API returns a 429.",
            "Clean and load rows with their airtable_id, then resolve links in a second pass.",
            "Download attachments into your own storage and record them in the files table.",
            "Check record counts, file counts and a sample of calculated values against Airtable.",
            "On cutover day, make the base read-only, rerun the import, switch integrations and keep the base as an archive.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How do I export all my data from Airtable?",
      answer:
        "Use the Airtable Web API to fetch every record with its record ID and linked record IDs, or export each table as CSV from an unfiltered view with every field showing. Download attachments separately, because their URLs expire after a few hours.",
    },
    {
      question: "What replaces Airtable automations when you move to Postgres?",
      answer:
        "Backend code: jobs triggered by database events, scheduled tasks and webhook endpoints. Each one gets retries, logging and alerts, so a failure is noticed straight away instead of discovered by a customer.",
    },
    {
      question: "Can I keep using Airtable alongside a Postgres database?",
      answer:
        "Yes. Many teams keep Airtable as a back office and sync selected data into it one way from Postgres. Only one system should accept edits for any given table, otherwise you end up reconciling two versions of the truth.",
    },
    {
      question: "Does the Airtable API have rate limits for exporting data?",
      answer:
        "Yes. The Airtable Web API allows five requests per second per base and returns up to 100 records per page. A script that waits and retries after a 429 response can export even large bases reliably.",
    },
    {
      question: "How long does it take to move from Airtable to a production app?",
      answer:
        "Typically four to eight weeks, depending on the number of tables, linked records and automations, how clean the data is, and how much of the operation moves rather than staying in Airtable as a back office.",
    },
  ],
}
