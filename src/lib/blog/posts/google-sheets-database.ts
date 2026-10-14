import type { BlogPost } from "@/lib/blog/types"

export const googleSheetsDatabase: BlogPost = {
  slug: "google-sheets-as-a-database",
  title: "Google Sheets as a database and the signs you've outgrown it",
  series: "automation",
  topic: "Google Sheets",
  description:
    "Using Google Sheets as a database works until it doesn't. The warning signs in the order they appear, what to move to, and how to switch over gradually.",
  summary:
    "Google Sheets is a perfectly good database for a small team with simple data, and most businesses outgrow it in a predictable order: editing rules first, then lookups between tabs, broken automations, slow formulas and finally permissions. Once three or more of those signs show up, move the data to Postgres and keep the sheet as a read-only view while you switch over one piece at a time.",
  datePublished: "2026-10-14",
  sections: [
    {
      id: "a-business-on-a-sheet",
      heading: "Picture a business that runs on one spreadsheet",
      blocks: [
        {
          type: "paragraph",
          text: "A spreadsheet is a fine database for a small business, right up until the day it quietly isn't. Picture an imaginary cleaning company with a handful of staff. Bookings arrive through a Google Form and land as rows in a sheet. The owner and one coordinator assign cleaners by typing a name into a column, and a short Apps Script emails the cleaner the address.",
        },
        {
          type: "paragraph",
          text: "At that size, the sheet is the right call. It costs nothing extra on Google Workspace, everyone knows how to use it, and the structure changes in ten seconds without a developer.",
        },
        {
          type: "paragraph",
          text: "Now let it grow for two years: more staff, regular clients, invoices, a promised client portal. The sheet doesn't fail all at once. It fails in a fairly predictable sequence, and knowing where you are in it tells you how long you've got.",
        },
      ],
    },
    {
      id: "warning-signs",
      heading: "The warning signs, in the order they usually appear",
      blocks: [
        {
          type: "paragraph",
          text: "The early signs are about people, the middle ones about automations, the late ones about access and safety.",
        },
        { type: "subheading", text: "1. A row of red cells saying do not touch" },
        {
          type: "paragraph",
          text: "More people start editing. Someone sorts one column on its own and scrambles a week of bookings, so a coloured row appears listing columns nobody may change. Meanwhile the sheet accepts a mistyped date, a duplicate email or a blank required field without complaint.",
        },
        { type: "subheading", text: "2. More lookups than data" },
        {
          type: "paragraph",
          text: "Regular clients get their own tab with an ID, and bookings pull details across with XLOOKUP. Nothing enforces the link: delete a client and their bookings point at nothing, change an ID and every lookup quietly returns blank. This is the sheet trying to be a relational database.",
        },
        { type: "subheading", text: "3. An automation breaks because a column moved" },
        {
          type: "paragraph",
          text: "Someone inserts a Phone column between Email and Address, and the script that reads column D starts sending texts to email addresses. The error only shows in an execution log nobody checks. Once Zapier or a website also read the sheet, every column rename is a small outage.",
        },
        { type: "subheading", text: "4. Clean-up becomes a weekly job" },
        {
          type: "paragraph",
          text: "The same client spelled three ways, dates in four formats, phone numbers that lost their leading zero. Someone spends Friday afternoon fixing it, every Friday.",
        },
        { type: "subheading", text: "5. The file gets slow" },
        {
          type: "paragraph",
          text: "Lookups, IMPORTRANGE and array formulas recalculate across the file. A formula-heavy sheet often gets painful at a few tens of thousands of rows, nowhere near the official limit of 10 million cells per spreadsheet, which is shared across every tab and counts empty cells inside the grid.",
        },
        { type: "subheading", text: "6. Quota errors and timeouts" },
        {
          type: "paragraph",
          text: "The Sheets API limits requests per minute: at the time of writing, 300 reads and 300 writes per project, and 60 of each per user. Go over and you get 429 errors until the minute resets. An Apps Script run is capped at six minutes, so the nightly invoicing script needs chunking. Adding delays and retries means you're working around the tool.",
        },
        { type: "subheading", text: "7. A client wants to see only their own records" },
        {
          type: "paragraph",
          text: "This is usually the hard stop. Sharing is per file, so anyone who can open the spreadsheet sees every tab and row; protected ranges stop edits, not reading. Separating clients means a file per client, synced by hand.",
        },
        { type: "subheading", text: "8. Nobody can say who has access" },
        {
          type: "paragraph",
          text: "The sheet holds names, addresses and door codes, it's shared with former staff and a contractor's personal Gmail, and version history only rolls back the whole file. There's no independent backup. With personal data, that's more than an inconvenience.",
        },
        {
          type: "callout",
          title: "Count the signs",
          text: "One of these on its own can be patched inside Sheets. Three or more and we'd stop patching and start planning the move.",
        },
      ],
    },
    {
      id: "what-to-move-to",
      heading: "What to move to",
      blocks: [
        {
          type: "paragraph",
          text: "For most businesses here, the answer is Postgres behind a small app. It enforces links with foreign keys, rejects bad values with constraints, joins tables in one query instead of ten thousand formulas, and shows each person only their rows.",
        },
        {
          type: "list",
          items: [
            {
              term: "Postgres and an app",
              text: "The right home when customers or staff log in, when automations can't afford to break, or when the data holds anything personal. Managed providers include automated backups and point in time recovery.",
            },
            {
              term: "A CRM",
              text: "If the sheet is really a client list with notes and follow-ups, an off-the-shelf CRM may solve it without a build.",
            },
            {
              term: "Airtable",
              text: "A reasonable halfway house for linked records and field types, with its own record limits and per-seat pricing, and the same ownership questions later on.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "An outgrown spreadsheet also makes a surprisingly good spec: it shows exactly how the business already works.",
        },
      ],
    },
    {
      id: "move-gradually",
      heading: "Move gradually, and keep the sheet as a view",
      blocks: [
        {
          type: "paragraph",
          text: "Don't switch everything in one weekend. Put the database underneath, keep the team looking at a sheet they recognise, and move the inputs across one at a time, so each tab only ever has one place where it's edited.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Map what exists",
              text: "Every tab, column, formula, form, script and automation, and who relies on each. Hidden columns and helper tabs are where the undocumented rules live.",
            },
            {
              term: "Design and clean",
              text: "One table per kind of thing, with real types and constraints for every rule the sheet only hoped people would follow. Then clean: duplicates, dates, phone numbers kept as text, and cells like 'red, blue, green' split into rows. This step takes longest, because someone who knows the business has to decide each case.",
            },
            {
              term: "Import on repeat",
              text: "Script the import from the Sheets API or a CSV export, keep the original row number in a legacy column, and rerun against fresh copies until the counts match. At this stage the sheet is still the master.",
            },
            {
              term: "Flip one input at a time",
              text: "Replace the Google Form with a form in the app, so new bookings land in the database. From then on, a scheduled job writes that data back to its tab, so the team still sees it in the sheet. Repeat for each input, and move Apps Script logic into server jobs you can monitor and retry.",
            },
            {
              term: "Lock the sheet",
              text: "Once nothing writes to the sheet directly, make it view-only. It stays as a reporting view for the people who like to filter and chart in a spreadsheet, fed one way from the database.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "For the sync, we'd use a scheduled job in the app that runs a query hourly or overnight and overwrites a tab through the Sheets API, batching requests so it barely touches the quota. Apps Script's JDBC service can connect Sheets to Postgres directly, but your database then has to accept connections from Google's address ranges, which we wouldn't do for customer data. Either way, use a read-only database user and send only the columns the report needs.",
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
        "The limit is on cells, not rows: a spreadsheet holds up to 10 million cells, shared across all tabs, and Google has raised that figure before, so check the current one. A sheet full of lookup formulas usually slows down well before the limit, often at a few tens of thousands of rows.",
    },
    {
      question: "How do I connect Google Sheets to PostgreSQL or MySQL?",
      answer:
        "The safest option is a scheduled job that runs a query and writes the results into the sheet through the Sheets API. Apps Script's JDBC service and connector add-ons also work, though add-ons need database credentials. Use a read-only database user and treat the sheet as a report, not a place to edit data.",
    },
  ],
}
