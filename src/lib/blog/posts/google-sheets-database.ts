import type { BlogPost } from "@/lib/blog/types"

export const googleSheetsDatabase: BlogPost = {
  slug: "google-sheets-as-a-database",
  title: "Using Google Sheets as a database, and when to move off it",
  series: "automation",
  topic: "Google Sheets",
  description:
    "When using Google Sheets as a database works, the limits you will hit, the signs it is time to move, and how to switch to Postgres and keep Sheets for reports.",
  summary:
    "Using Google Sheets as a database is fine for a small team with low volume, simple data and a few trusted people editing it. It stops being fine when you need linked records, per-user permissions or automations that can't afford to break. The usual next step is Postgres, with Sheets kept as a read-only reporting view on top.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Works best for", value: "Small teams, low volume" },
    { label: "Cell limit", value: "10 million per file, all tabs" },
    { label: "API quota", value: "Counted per minute, not per day" },
    { label: "Usual next step", value: "Postgres, Sheets for reports" },
  ],
  sections: [
    {
      id: "when-it-works",
      heading: "Can you use Google Sheets as a database?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, and for a lot of small businesses it's the right call. If you already pay for Google Workspace it costs nothing extra, everyone on the team knows how to use it, and you can change the structure in ten seconds without asking a developer. That last part is worth more than people admit.",
        },
        {
          type: "paragraph",
          text: "It works when the data is modest and the stakes are low. A typical good fit:",
        },
        {
          type: "list",
          items: [
            "A Google Form or a single automation feeds one main sheet: enquiries, bookings, orders, job applications.",
            "Hundreds or a few thousand rows, growing slowly.",
            "Two or three trusted people edit it, and it's fine for all of them to see everything.",
            "If the sheet broke for a day you'd be irritated, not out of business.",
          ],
        },
        {
          type: "paragraph",
          text: "The trouble starts when the sheet quietly turns into the backend for something customers rely on, usually without anyone deciding that it should.",
        },
      ],
    },
    {
      id: "how-people-set-it-up",
      heading: "How do people use Google Sheets as a backend?",
      blocks: [
        {
          type: "paragraph",
          text: "Usually with Google Forms or an automation tool putting rows in, and Apps Script or the Sheets API doing something with them. Most setups we see use some mix of these:",
        },
        {
          type: "list",
          items: [
            {
              term: "Google Forms",
              text: "Each response lands as a new row in a linked sheet. Using Google Forms as a database is really using the sheet behind it; the form can add rows but can't look up or edit existing ones.",
            },
            {
              term: "Apps Script",
              text: "JavaScript that runs inside Workspace. It can fire on a form submission or an edit, send emails, call other APIs and run on a timer. At the time of writing a single run is capped at six minutes, so anything heavy has to be chunked.",
            },
            {
              term: "The Sheets API",
              text: "Lets your own code read and write the sheet over HTTP. This is how a website or small app ends up with a Google Sheet as its backend.",
            },
            {
              term: "No-code layers",
              text: "Glide, Softr and AppSheet put an app interface over a sheet. Zapier, Make and n8n shuttle rows between it and everything else.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Each piece is easy on its own. The glue is what breaks. Someone inserts a column between Email and Phone, and the script that reads column D starts sending texts to email addresses. Nobody remembers who wrote the script, and the error only shows up in an execution log nobody checks.",
        },
      ],
    },
    {
      id: "limits",
      heading: "What are the limits of Google Sheets as a database?",
      blocks: [
        {
          type: "paragraph",
          text: "The published limits are cell count and API quotas, but most teams hit the unwritten ones first: no data rules, no row-level permissions and a file that gets slow long before any official ceiling.",
        },
        {
          type: "list",
          items: [
            {
              term: "Cells per spreadsheet",
              text: "A spreadsheet holds up to 10 million cells, and Google raises that figure every few years, so check the current one. It's shared across every tab, and empty cells inside the grid count.",
            },
            {
              term: "API quotas",
              text: "The Sheets API limits requests per minute, per project and per user. The published figures at the time of writing are 300 reads and 300 writes a minute per project, and 60 of each per user. Go over and you get 429 errors until the minute resets.",
            },
            {
              term: "No relationships or constraints",
              text: "A mistyped customer ID, a duplicate email, a date typed as text, a blank required field: the sheet accepts all of them without complaint.",
            },
            {
              term: "Concurrent writes",
              text: "People editing together in the browser is fine. Scripts are another matter. Two automations reading a row, changing it and writing it back at the same moment will overwrite each other, and there are no transactions to undo a half-finished update.",
            },
            {
              term: "All or nothing sharing",
              text: "Access is per file. Anyone who can open the spreadsheet can see every tab and every row. Protected ranges stop edits, not reading, so keeping one client's data away from another means separate files.",
            },
            {
              term: "History and backups",
              text: "Version history exists, but restoring rolls back the whole file, including the good changes made since. There's no independent backup, and one accidental sort on a single column can scramble months of data.",
            },
            {
              term: "Speed",
              text: "XLOOKUP, IMPORTRANGE and array formulas recalculate across the file. In practice a formula-heavy sheet gets painful at a few tens of thousands of rows, nowhere near the cell limit.",
            },
          ],
        },
        {
          type: "callout",
          title: "If you're on the Sheets API, batch everything",
          text: "A batch request counts as one request towards the quota. Read a whole range in one call instead of looping cell by cell, and you'll rarely see a 429.",
        },
      ],
    },
    {
      id: "relational",
      heading: "Can Google Sheets work as a relational database?",
      blocks: [
        {
          type: "paragraph",
          text: "Not really. You can fake it: give each customer an ID, store that ID on the Orders tab and pull details across with XLOOKUP or QUERY. For a few hundred rows that's fine. But nothing enforces the link. Delete a customer and their orders point at nothing. Change an ID and every lookup that used it quietly returns blank.",
        },
        {
          type: "paragraph",
          text: "Postgres enforces those links with foreign keys, rejects bad values with constraints and joins tables in one query instead of ten thousand formulas. If you're writing more lookups than data, that's the clearest sign you want a relational database.",
        },
      ],
    },
    {
      id: "signs-to-move",
      heading: "When should you move off Google Sheets?",
      blocks: [
        {
          type: "paragraph",
          text: "Move when you're spending more time protecting the sheet than using it. The person who maintains it usually knows before anyone else. Watch for these:",
        },
        {
          type: "list",
          items: [
            "An app or website reads and writes the sheet, and it has already broken because someone renamed a column.",
            "There's a tab, or a row of red cells, telling people which columns not to touch.",
            "Clients or contractors need to see their own records and nobody else's.",
            "Automations hit quota errors or time out, and you've started adding delays and retries.",
            "Clearing up duplicates and blanks is a regular weekly job.",
            "You hold personal data and couldn't quickly say who has access to it.",
          ],
        },
        {
          type: "paragraph",
          text: "One of these on its own can be patched inside Sheets. Three or more and we'd stop patching. If the sheet has become something customers pay for, our piece on when to turn your automations into a SaaS product covers what comes next.",
        },
      ],
    },
    {
      id: "how-to-move",
      heading: "How do you move from Google Sheets to Postgres?",
      blocks: [
        {
          type: "paragraph",
          text: "Design the tables, script the import so you can run it again and again, rebuild the inputs against the database, then cut over once the numbers match. Keep the sheet as the working system until the new one has earned its place.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Map what exists",
              text: "List every tab, column, formula, form, Apps Script and automation, and who relies on each. Hidden columns and helper tabs are where the undocumented business rules live.",
            },
            {
              term: "Design the tables",
              text: "One table per kind of thing: customers, orders, products. Real types, primary keys, foreign keys, and not null, unique and check constraints for every rule the sheet only hoped people would follow.",
            },
            {
              term: "Clean the data",
              text: "Remove duplicates, normalise dates, keep phone numbers as text so the leading zero survives, and split cells like 'red, blue, green' into their own rows.",
            },
            {
              term: "Script the import",
              text: "Pull the data through the Sheets API or a CSV export, transform it and load it. Keep the original row number in a legacy column, and rerun against fresh copies until the counts match.",
            },
            {
              term: "Rebuild the inputs",
              text: "Replace the Google Form with a form in your app, and move Apps Script logic into server code and scheduled jobs you can actually monitor and retry.",
            },
            {
              term: "Cut over",
              text: "Make the sheet read-only, run the final import, point every automation at the database and leave the old file alone for a few weeks as a reference.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "In practice the cleaning step is where most of the time goes. A sheet edited by hand for three years will have dates in four formats and the same customer spelled three ways, and someone who knows the business has to decide each one.",
        },
        {
          type: "callout",
          title: "Turn on backups and test a restore",
          text: "Managed Postgres providers typically include automated backups and point in time recovery. Check they're on, and restore to a test database once before you need it for real.",
        },
      ],
    },
    {
      id: "sheets-as-reporting",
      heading: "Can you keep Google Sheets connected to the database?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, and you should. The database becomes the source of truth, and Sheets becomes a read-only reporting view for the people who like to filter and chart in a spreadsheet. Data flows one way: database to sheet, never back.",
        },
        {
          type: "paragraph",
          text: "For most teams we'd use a small scheduled job in the app that runs a query every hour or overnight and overwrites a tab through the Sheets API. It lives in your codebase and you control exactly which columns leave the database. The alternative is to connect Google Sheets to PostgreSQL or MySQL directly through Apps Script's JDBC service. It works, but your database then has to accept connections from Google's address ranges, which isn't something we'd do for a database holding customer data. Connector add-ons sit in between: convenient, but they need database credentials, so treat them like any other supplier with access.",
        },
        {
          type: "paragraph",
          text: "Whichever route you take, connect with a read-only database user and send only the columns the report needs. At Scryptic the apps we build usually run on TypeScript, Next.js and Postgres, and a spreadsheet that has outgrown itself makes a surprisingly good spec, because it shows exactly how the business already works.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Google Sheets a good client database?",
      answer:
        "For a few hundred clients and a couple of people managing them, it's fine. It struggles once each client needs to see only their own records, or you need to link clients to jobs and invoices reliably. At that point a CRM or a proper database is the safer place for the data.",
    },
    {
      question: "Can I use Google Forms as a database?",
      answer:
        "Not on its own. Google Forms collects responses and writes each one as a row in a linked Google Sheet, so the sheet is the database. That's good for intake, but the form can't look up, edit or check against existing records.",
    },
    {
      question: "How many rows can Google Sheets handle?",
      answer:
        "The limit is on cells, not rows: a spreadsheet holds up to 10 million cells, shared across all tabs, though Google raises that figure every few years. A sheet full of lookup formulas usually slows down well before that, often at a few tens of thousands of rows.",
    },
    {
      question: "How do I connect Google Sheets to PostgreSQL or MySQL?",
      answer:
        "The option we'd pick is a scheduled job that runs a query and writes the results into the sheet through the Sheets API. Apps Script's JDBC service and connector add-ons also work. Use a read-only database user and treat the sheet as a report, not a place to edit data.",
    },
    {
      question: "Is Airtable a better database than Google Sheets?",
      answer:
        "For linked data, yes. Airtable has real linked records, field types and per-view interfaces, which Sheets doesn't. It still has record limits and per-seat pricing, and the same ownership questions come up as you grow, which our guide to migrating from Airtable to a production app covers.",
    },
  ],
}
