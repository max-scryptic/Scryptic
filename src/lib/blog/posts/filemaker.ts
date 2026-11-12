import filemakerLogo from "@/assets/blog/logos/filemaker.svg"
import filemakerContainerFilesToStorage from "@/assets/blog/images/filemaker-container-files-to-storage.webp"
import filemakerOccurrencesToBaseTables from "@/assets/blog/images/filemaker-occurrences-to-base-tables.webp"
import type { BlogPost } from "@/lib/blog/types"

export const filemaker: BlogPost = {
  slug: "migrate-from-filemaker",
  title: "FileMaker to web app migration, table by table",
  series: "migration",
  topic: "FileMaker",
  logo: filemakerLogo,
  category: "Internal tool builders",
  description:
    "Moving from FileMaker to a web app: reading the Database Design Report, mapping fields, scripts and privilege sets, and getting container files out safely.",
  summary:
    "A FileMaker to web app migration is a rebuild: layouts and scripts stay behind, while tables, records and files come across through ODBC, the Data API or exports. Start from the Database Design Report, which documents every table, field, script and privilege set in the file. A focused solution of a few dozen tables typically takes six to twelve weeks, and FileMaker can keep running until the last department switches over.",
  datePublished: "2026-11-07",
  facts: [
    { label: "Code export", value: "None, layouts and scripts are rebuilt" },
    { label: "Data export", value: "ODBC, OData, the Data API or CSV" },
    { label: "Your specification", value: "Database Design Report or XML copy" },
    { label: "Typical timeline", value: "6 to 12 weeks" },
  ],
  sections: [
    {
      id: "why-move",
      heading: "Why move a FileMaker solution to the web?",
      blocks: [
        {
          type: "paragraph",
          text: "Usually because the system has to reach people FileMaker serves poorly: customers in a browser, staff on Android phones, or more users than the licence was bought for. The other common trigger is quieter. The one developer who understands the file is about to retire.",
        },
        {
          type: "list",
          items: [
            "WebDirect puts FileMaker layouts in a browser without a rewrite, but Claris generally supports up to about 100 connections per server machine, each browser tab uses its own connection, and layouts drawn for a desktop rarely work on a phone.",
            "FileMaker Go runs on iPhone and iPad only, so Android users and customers who won't install an app are left out.",
            "FileMaker is mostly licensed per user, which suits a fixed team of staff and gets expensive once suppliers or customers need a login.",
            "Modern services expect REST APIs and webhooks. FileMaker can talk to them, often through plug-ins and scripted workarounds that only their author can maintain.",
          ],
        },
        {
          type: "callout",
          title: "Good reasons to stay",
          text: "A stable team on Macs and iPads, a solution that does its job and a developer who maintains it add up to a sound system. Rebuild for reach, scale or continuity. The age of the platform alone is a weak reason to spend the money.",
        },
      ],
    },
    {
      id: "design-report",
      heading: "Start with the Database Design Report",
      blocks: [
        {
          type: "paragraph",
          text: "Before anyone designs a schema, produce a Database Design Report from FileMaker Pro. It documents every table, field and calculation, the relationship graph, layouts, scripts, value lists and privilege sets, which makes it the closest thing a FileMaker solution has to source code. Save a Copy as XML gives the same detail in a form a script or a coding agent can read.",
        },
        {
          type: "image",
          image: filemakerOccurrencesToBaseTables,
          alt: "Five FileMaker table occurrences stacked as cards over just two base tables, Contacts and Invoices.",
        },
        {
          type: "callout",
          title: "Table occurrences are not tables",
          text: "The relationship graph shows table occurrences, and one base table can appear a dozen times under different names to drive different layouts and portals. Count base tables, not boxes on the graph, then sort the relationships into real links between records and ones that only filter a portal.",
        },
        {
          type: "paragraph",
          text: "Then find out what people actually use. A solution that has grown for fifteen years carries layouts, scripts and fields nobody has opened in a long time. Go through them with the people who use the system and mark each one keep, merge or drop. The cheapest feature to migrate is the one you leave behind.",
        },
      ],
    },
    {
      id: "field-mapping",
      heading: "FileMaker fields, scripts and layouts in a web stack",
      blocks: [
        {
          type: "paragraph",
          text: "Plain fields become typed Postgres columns with little thought. The effort sits in calculations, scripts and printed layouts, because each one holds business rules that were never written down anywhere else.",
        },
        {
          type: "table",
          caption: "FileMaker features and their equivalents in a web app",
          columns: ["FileMaker", "What it does", "In a web app"],
          rows: [
            ["Base tables and fields", "Text, number, date, time, timestamp and container fields", "Postgres tables with typed columns and constraints"],
            ["Key fields", "Serial numbers or Get(UUID) values that link records", "A primary key, keeping the FileMaker value for links and reruns"],
            ["Auto-enter options", "Default values, serials and creation or modification stamps", "Column defaults, identity columns and triggers"],
            ["Field validation", "Rules checked when a record is committed", "Database constraints plus checks on the server"],
            ["Calculation fields", "Stored or unstored values derived from other fields", "Generated columns, views or server code"],
            ["Summary fields", "Totals and counts across a found set", "Aggregate queries and report views"],
            ["Repeating fields", "Several values held in one field", "A child table with one row per value"],
            ["Container fields", "Files and images stored in the file or as external files", "A files table pointing at object storage"],
            ["Relationships and portals", "Related records shown inside a layout", "Foreign keys and related lists on a page"],
            ["Value lists", "Fixed or field-based choices", "Lookup tables or check constraints"],
            ["Scripts and script triggers", "Automation run by buttons, events and schedules", "Server functions, event handlers and scheduled jobs"],
            ["Layouts", "Screens, forms, lists and printable reports", "Pages and components, plus PDF templates for printing"],
            ["Privilege sets and accounts", "Who can view, edit and delete which records and fields", "Roles with server-side authorisation and row level security"],
            ["Plug-ins", "Extra functions from third parties", "npm packages or direct API calls"],
          ],
        },
        {
          type: "paragraph",
          text: "Unstored calculations deserve the closest look. FileMaker works them out whenever a layout shows them, and many hold pricing, status or due-date rules. Turn each into a query, view or function, then compare its result with FileMaker's for a sample of real records before trusting it.",
        },
        {
          type: "paragraph",
          text: "Printing matters more in FileMaker businesses than almost anywhere else. Invoices, delivery notes and labels laid out to the millimetre on a layout need rebuilding as PDF templates, so collect a printed copy of every report people rely on.",
        },
      ],
    },
    {
      id: "data-export",
      heading: "Getting records and container files out",
      blocks: [
        {
          type: "paragraph",
          text: "Read records through ODBC, OData or the Data API, and treat container fields as a separate job. All three work against the hosted file, so the export can be scripted and rerun as often as you need.",
        },
        {
          type: "list",
          items: [
            {
              term: "ODBC and JDBC",
              text: "Turn on extended access for a privilege set and read tables with SQL. This is the most direct route for a bulk copy of plain fields.",
            },
            {
              term: "OData and the Data API",
              text: "REST interfaces on FileMaker Server and FileMaker Cloud. Claris licences include an allowance for outbound data through them, so check yours before pulling every record and file.",
            },
            {
              term: "Exports from FileMaker Pro",
              text: "CSV and Excel exports suit small tables and spot checks, but they handle repeating fields awkwardly and leave container contents behind.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Container fields are the part teams forget until cutover week. Files stored inside the database come out through a script using Export Field Contents, or by downloading the URL the Data API returns for each container. Files in secure external storage are encrypted on disk, so copy them through FileMaker rather than from the server's folders. Name each file after its record's key and field, and keep a manifest to check the counts against.",
        },
        {
          type: "image",
          image: filemakerContainerFilesToStorage,
          alt: "Photos, signed forms and drawings leave a FileMaker record as named files in object storage, checked against a manifest.",
        },
        {
          type: "paragraph",
          text: "Expect old records to need cleaning: text in number fields, dates typed two ways and child records whose parents were deleted years ago. A database with constraints rejects all of them, so find them on the first rehearsal while there is still time to decide what to keep.",
          link: { text: "How loose field types map to Postgres columns", href: "/blog/migrate-from-airtable" },
        },
      ],
    },
    {
      id: "department-by-department",
      heading: "Moving one department at a time",
      blocks: [
        {
          type: "paragraph",
          text: "FileMaker can keep running while the web app takes over in stages. Move one area of the business at a time, such as quoting before jobs and jobs before invoicing, and agree which system owns each table at every stage.",
        },
        {
          type: "paragraph",
          text: "While both are live, the side that does not own a table reads it from the other. The web app reads FileMaker through the Data API, and FileMaker scripts call the web app's API with Insert from URL. Only the owner writes.",
        },
        { type: "subheading", text: "Ready to switch a department over" },
        {
          type: "checklist",
          items: [
            "Every printed report has a PDF version that the people who print it have signed off",
            "Calculated totals match FileMaker for a sample of real records",
            "Each privilege set has a matching role, tested by signing in as that role",
            "Every record's container files are in object storage and accounted for in the manifest",
            "Server schedules have replacement jobs with alerting",
            "The FileMaker file is read-only and backed up after the final copy",
          ],
        },
        {
          type: "paragraph",
          text: "If staff use FileMaker Go on iPads in a warehouse or on site, decide early what replaces it. A web app wrapped for the App Store often covers barcode scanning and photos without a separate native build.",
          link: { text: "When wrapping a web app for the app stores is enough", href: "/blog/hybrid-apps" },
        },
        {
          type: "paragraph",
          text: "When the new system opens up to customers for the first time, our free App Launch Checklist builds a launch list for your app, covering legal, payments, SEO and analytics.",
          link: { text: "Build your launch list with the App Launch Checklist", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "how-long",
      heading: "What a FileMaker to web app migration takes",
      blocks: [
        {
          type: "paragraph",
          text: "A focused solution of a few dozen tables, with a handful of privilege sets and printed reports, typically takes six to twelve weeks to rebuild and move. A system that has grown across several departments for twenty years is better planned as a series of phases, each with its own cutover.",
        },
        {
          type: "paragraph",
          text: "The rebuild is quicker than it used to be. Coding agents turn the XML copy into draft schemas and tests quickly, though a developer still has to decide which of twenty years of rules still apply.",
          link: { text: "How we build web apps", href: "/services/web-app-development" },
        },
        {
          type: "paragraph",
          text: "For a single department or a smaller solution, the first phase often fits one of our fixed-price sprints.",
          link: { text: "See what a fixed-price sprint includes", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is FileMaker being discontinued?",
      answer:
        "No. Claris released FileMaker 2026 in June 2026 and continues to develop the platform. Most businesses that move do so for browser and phone access, licensing or hiring, rather than because the product is ending.",
    },
    {
      question: "Can FileMaker passwords be moved to the new app?",
      answer:
        "No. FileMaker doesn't export account passwords, so import account names, emails and roles, then send each person a link to set a password on first sign-in. If your staff already use Microsoft or Google accounts at work, signing in with those avoids passwords altogether.",
    },
    {
      question: "Do we keep paying for FileMaker during the move?",
      answer:
        "Yes, until the last department has switched over. Since FileMaker is mostly licensed per user, reduce the user count at each renewal as departments move, and keep one licence for read-only access to the archive if you need it.",
    },
  ],
}
