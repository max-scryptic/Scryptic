import type { BlogPost } from "@/lib/blog/types"

export const excelSpreadsheetToWebApp: BlogPost = {
  slug: "excel-spreadsheet-to-web-app",
  title: "Excel spreadsheet to web app, without losing what the formulas do",
  series: "migration",
  topic: "Excel",
  icon: "sheet",
  category: "Internal tool builders",
  description:
    "Turning an Excel spreadsheet into a web app: split the records, calculations and reports, move the data to Postgres and rebuild the formulas as tested code.",
  summary:
    "Turning an Excel spreadsheet into a web app means separating three things the workbook mixes together: the records people type in, the calculations the formulas run and the reports built on top. The records move into Postgres tables, the formulas become code that is tested against the workbook's own answers, and Excel can stay on as a reporting tool. A workbook with a few sheets of records and one core calculation usually takes three to six weeks.",
  datePublished: "2026-11-14",
  facts: [
    { label: "Code export", value: "None, formulas and macros are rebuilt" },
    { label: "Data", value: "Each sheet of records becomes a Postgres table" },
    { label: "Hardest part", value: "Rules hidden in formulas and VBA" },
    { label: "Typical timeline", value: "3 to 6 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When should an Excel spreadsheet become a web app?",
      blocks: [
        {
          type: "paragraph",
          text: "When the workbook has become a system several people depend on, not a calculation one person runs. The clearest sign is that the business would stop if the file were lost, broken or opened by the wrong person, while nothing about Excel protects it from any of those.",
        },
        {
          type: "list",
          items: [
            "Copies travel by email. Quotes v7 FINAL.xlsx sits next to Quotes v7 FINAL (2).xlsx, and nobody is sure which one the invoices came from.",
            "Several people type into it. Co-authoring on OneDrive or SharePoint helps, but one person sorting a single column or pasting over a formula still breaks it for everyone.",
            "People outside the office need it. Field staff on a phone, a client checking their own orders or a partner adding records can't safely be handed the workbook.",
            "Different people should see different rows. A hidden column or a protected sheet stops casual edits, not reading: anyone with the file has every row in it.",
            "A macro only works on one PC. VBA doesn't run in Excel for the web or in the Excel phone apps, so the button that builds the monthly report depends on one laptop.",
          ],
        },
        {
          type: "paragraph",
          text: "Keep the spreadsheet when it's a model one person uses to think with: a forecast, a pricing calculator or a one-off analysis. Excel is the right tool for that, and a web app would only slow it down.",
        },
        {
          type: "paragraph",
          text: "The same pattern shows up in shared Google Sheets, in roughly the same order.",
          link: { text: "The signs a Google Sheet has outgrown itself", href: "/blog/google-sheets-as-a-database" },
        },
      ],
    },
    {
      id: "records-calculations-reports",
      heading: "Is your workbook a database, a calculator or a report?",
      blocks: [
        {
          type: "paragraph",
          text: "Usually all three at once, and each part goes somewhere different. Sheets where every row is a customer, a job or an order are a database and become tables. Sheets full of formulas are a calculator and become code. Pivot tables and summary tabs are reports and become pages, downloads or a live connection back into Excel.",
        },
        {
          type: "table",
          caption: "Where each part of an Excel workbook goes in a web app",
          columns: ["In the workbook", "In the web app", "Watch for"],
          rows: [
            ["A sheet with one record per row", "A Postgres table with a primary key", "Totals rows and notes typed among the data"],
            ["Drop-down lists from Data Validation", "A lookup table or a fixed list of allowed values", "Old values still sitting in rows the list no longer offers"],
            ["VLOOKUP, XLOOKUP and INDEX MATCH between sheets", "Foreign keys and joins", "Lookups that match on a name rather than an ID"],
            ["SUMIFS, COUNTIFS and pivot tables", "Queries, shown as report pages or exports", "Filters someone applied once and never removed"],
            ["Calculation sheets", "Server code with tests", "Hard-coded numbers typed over a formula"],
            ["Conditional formatting and coloured cells", "A status field people choose on purpose", "Colours that mean something only one person knows"],
            ["Protected sheets and hidden columns", "Roles and permissions checked on the server", "Hidden columns that hold the real data"],
            ["VBA macros and buttons", "Server functions and scheduled jobs", "Macros that email through Outlook or open other workbooks"],
            ["Power Query steps", "An import job that runs the same steps", "Sources on someone's own drive"],
          ],
        },
        {
          type: "paragraph",
          text: "Ask the people who use the workbook which tabs they open in a normal week. Old tabs that nobody reads, and columns kept just in case, can stay in the archived copy rather than being rebuilt.",
        },
      ],
    },
    {
      id: "formulas",
      heading: "How do you move Excel formulas into a web app?",
      blocks: [
        {
          type: "paragraph",
          text: "You rewrite them as code and prove the code gives the same answers as the workbook. Formulas don't export to anything that runs outside Excel, but the workbook can still check its own replacement: take real rows, record what Excel calculates for them, and make those figures the app's tests.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Find every formula",
              text: "Show Formulas on the Formulas tab turns each sheet into its formulas. Trace Precedents and Trace Dependents show what feeds a cell and what it feeds, and Name Manager lists the named ranges the formulas refer to.",
            },
            {
              term: "Write each rule down in a sentence",
              text: "\"Orders over £500 get 5% off, except trade customers, who always get 10%\" is something a developer can build and a manager can check. A formula nested six IF functions deep is neither.",
            },
            {
              term: "Collect test cases from real rows",
              text: "Pick twenty or so rows that cover the ordinary cases and the odd ones, such as a refund, a zero quantity or a customer with no postcode. Record the inputs and the answers Excel gives.",
            },
            {
              term: "Build until every case matches",
              text: "Run the cases against the app's code on every change. A difference is either a bug in the new code or a mistake the spreadsheet has been making for years, and both are worth knowing about.",
            },
          ],
        },
        {
          type: "callout",
          title: "Rounding is where totals drift",
          text: "Excel's ROUND sends halves away from zero, while JavaScript and Python round some halves differently by default. Store money as whole pence or as Postgres numeric, round in one agreed place, and include a few amounts ending in exactly half a penny among the test cases.",
        },
      ],
    },
    {
      id: "getting-the-data-out",
      heading: "Getting the data out of Excel cleanly",
      blocks: [
        {
          type: "paragraph",
          text: "Read the .xlsx file with a script rather than saving CSVs by hand. Save As CSV writes only the sheet that's open, and the plain CSV option isn't UTF-8, so £ signs and accented names often arrive garbled, while a script reads every sheet in one go and leaves the original file untouched.",
        },
        {
          type: "code",
          label: "Terminal",
          code: "pip install pandas openpyxl\npython export_sheets.py Quotes.xlsx",
        },
        {
          type: "code",
          label: "export_sheets.py",
          code: `import sys
from pathlib import Path

import pandas as pd

workbook = Path(sys.argv[1])
out = Path("export")
out.mkdir(exist_ok=True)

# Every sheet, every cell read as text, so nothing is reformatted on the way out.
sheets = pd.read_excel(workbook, sheet_name=None, dtype=str)

for name, frame in sheets.items():
    # The Excel row each record came from, for tracing problems back to the file.
    frame.insert(0, "excel_row", range(2, len(frame) + 2))
    path = out / f"{name}.csv"
    frame.to_csv(path, index=False, encoding="utf-8")
    print(f"{name}: {len(frame)} rows written to {path}")`,
        },
        {
          type: "paragraph",
          text: "It writes one UTF-8 CSV per sheet into an export folder, with an excel_row column so any record can be traced back to the cell it came from. It reads the values Excel last calculated rather than the formulas, so open the workbook in Excel and save it once before running it.",
        },
        { type: "subheading", text: "What to clean before the import" },
        {
          type: "list",
          items: [
            "Dates are stored as numbers counting days from 1900, and some will be text that only looks like a date. Check for US month-first dates among the UK ones, which read as valid dates in the wrong month.",
            "Leading zeros vanish from phone numbers and account codes typed into cells Excel treats as numbers. Store these as text in Postgres, and restore the zeros where the length tells you they're missing.",
            "Excel keeps 15 significant digits, so long reference numbers and barcodes entered as numbers have already lost their last digits. Find the originals if they matter.",
            "Merged cells, a second header row and subtotal rows don't belong in a table. Unmerge, keep one header row, and drop the totals, which the app recalculates.",
            "One cell holding several values, such as \"Red, Blue\", becomes a child table with one row per value.",
            "The same customer typed three ways becomes three customers. Match them up and agree one ID each before the import, not after.",
          ],
        },
        {
          type: "paragraph",
          text: "Run the import into a staging database, compare row counts and a few totals with the workbook, fix what's off and run it again. Repeat on a fresh copy of the file until the numbers match, then keep the script for the final move.",
        },
      ],
    },
    {
      id: "side-by-side",
      heading: "From Excel spreadsheet to web app, one sheet at a time",
      blocks: [
        {
          type: "paragraph",
          text: "Move the typing first and keep Excel for the reports. Once new records are entered in the web app, the database is the only master copy, and anyone who still likes a pivot table can have one fed from it.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Launch the screens that replace data entry",
              text: "Start with the sheet people type into most. From the first day, new records go into the app and its database, not the workbook.",
            },
            {
              term: "Make that sheet read-only",
              text: "Remove edit access on SharePoint or OneDrive, or replace the sheet with a note pointing at the app, so nobody keeps adding rows to the old copy.",
            },
            {
              term: "Feed the reports from the database",
              text: "Give the app an export to .xlsx or CSV, or connect Excel to a read-only database login through Get Data or an ODBC driver. Pivot tables and charts keep working, and nobody can type over the source.",
            },
            {
              term: "Run the calculations in parallel for one cycle",
              text: "For a month of quotes or invoices, work out the figures in both and compare. Switch the workbook's calculation sheets off only once the totals agree.",
            },
            {
              term: "Archive the workbook",
              text: "Keep a dated, read-only copy of the final version. It's the record of how the business worked before, and the first place to look when someone asks why a number changed.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Staff can sign in with the Microsoft work accounts they already use, so there are no new passwords for anyone to remember.",
          link: { text: "How Microsoft sign-in carries over, from our Power Apps guide", href: "/blog/migrate-from-power-apps" },
        },
        {
          type: "paragraph",
          text: "If the workbook started life as an export from an Access database, or feeds one, move the two together.",
          link: { text: "How an Access database moves to a web app", href: "/blog/migrate-from-access" },
        },
      ],
    },
    {
      id: "how-long",
      heading: "How long does an Excel to web app migration take?",
      blocks: [
        {
          type: "paragraph",
          text: "Three to six weeks for a workbook with a few sheets of records, a handful of roles and one core calculation. The size of the file says little about the effort. The number of rules hidden in formulas and VBA says most, so count the calculation sheets and the lines of VBA before asking anyone for an estimate.",
          link: { text: "How we build web apps", href: "/services/web-app-development" },
        },
        {
          type: "paragraph",
          text: "A workbook that ties together several others through links and macros is better split into stages, each with its own switch-over, starting with the one people type into most.",
        },
        {
          type: "paragraph",
          text: "For a first figure, the free MVP Cost Calculator turns eight answers about your app into a rough estimate in development weeks and pounds.",
          link: { text: "Estimate the rebuild with the MVP Cost Calculator", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "paragraph",
          text: "A focused first release, such as the data entry screens and the main calculation, often fits one of our fixed-price sprints.",
          link: { text: "See what a fixed-price sprint includes", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I turn an Excel spreadsheet into a web app without coding?",
      answer:
        "For a simple internal tool, often yes. Microsoft Lists and Power Apps suit teams already on Microsoft 365, and no-code builders such as AppSheet can use an Excel file in OneDrive as their data. They reach their limits when customers sign in, when different people need different rows, or when the calculations are the heart of the business.",
    },
    {
      question: "Can a web app keep using my Excel formulas?",
      answer:
        "Not as formulas. They're rewritten as code, and the workbook becomes the test: real rows go in, and the app has to give the same answers Excel does. That usually turns up a few long-standing spreadsheet mistakes along the way.",
    },
    {
      question: "Can we still use Excel for reports after the move?",
      answer:
        "Yes. The web app can export to .xlsx or CSV, or Excel can read the database directly through a read-only login, so pivot tables and charts keep working. The difference is that people analyse the data in Excel instead of typing it there.",
    },
  ],
}
