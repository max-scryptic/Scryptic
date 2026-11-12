import appsheetLogo from "@/assets/blog/logos/appsheet.svg"
import appsheetDataStaysPut from "@/assets/blog/images/appsheet-data-stays-put.webp"
import appsheetSecurityFilterVsServerCheck from "@/assets/blog/images/appsheet-security-filter-vs-server-check.webp"
import type { BlogPost } from "@/lib/blog/types"

export const appsheet: BlogPost = {
  slug: "migrate-from-appsheet",
  title: "AppSheet migration once your app outgrows the sheet",
  series: "migration",
  topic: "AppSheet",
  logo: appsheetLogo,
  category: "Internal tool builders",
  description:
    "An AppSheet migration rebuilds the app but keeps your data. When to move, how slices, security filters and bots become code, and how to handle offline users.",
  summary:
    "An AppSheet migration makes sense once the app reaches people outside your Workspace, holds more data than a sheet can carry, or runs a process the business can't stop. There is no code export, so the app is rebuilt. The data is the easy part: it already sits in your own Google Sheets, Excel files or database, and the new app can use it from day one.",
  datePublished: "2026-11-07",
  facts: [
    { label: "Code export", value: "None, the app definition stays put" },
    { label: "Your data", value: "Already in your Sheets, Excel or database" },
    { label: "Hardest part", value: "Expressions and offline use" },
    { label: "Typical timeline", value: "3 to 6 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When should an AppSheet app become a coded app?",
      blocks: [
        {
          type: "paragraph",
          text: "When it stops being a tool for colleagues who already live in Google Workspace. AppSheet is very good at inspections, stock counts, job sheets and approvals for an internal team. The trouble starts when the audience, the volume of data or the cost of a mistake changes.",
        },
        {
          type: "list",
          items: [
            "Customers or contractors need their own logins. Each signed-in user counts against a per-user plan, and a public app without sign-in needs a separate Publisher Pro plan unless you are on Enterprise. Public apps can't use security filters, and Google's advice is to assume anyone can see all of their data.",
            "Syncs keep getting slower. AppSheet copies the rows each user can see onto their device, which is what makes offline work possible. As tables grow and virtual columns pile up, every sync takes longer.",
            "The data source is straining. A Google Sheet edited by the app and by staff typing into the same tabs is fragile, and AppSheet databases on Core plans hold 2,500 rows each.",
            "Edits go straight to everyone. Changes are made in a browser editor with version history but no automated tests, so one wrong expression reaches every user at their next sync.",
          ],
        },
        {
          type: "paragraph",
          text: "If you're still deciding whether a new idea needs code at all, our free Build or No-Code Quiz asks seven questions and gives a straight answer.",
          link: { text: "Take the Build or No-Code Quiz", href: "/tools/build-or-no-code" },
        },
        {
          type: "callout",
          title: "Try these before rebuilding",
          text: "If speed is the only complaint, remove virtual columns from the biggest tables and use security filters so each person syncs only their own rows. For an internal app, that often buys another year.",
        },
        {
          type: "paragraph",
          text: "When the sheet behind the app is what's creaking, the warning signs tend to appear in a predictable order.",
          link: { text: "Signs you have outgrown Google Sheets as a database", href: "/blog/google-sheets-as-a-database" },
        },
      ],
    },
    {
      id: "data-never-lived-there",
      heading: "Your data never lived in AppSheet",
      blocks: [
        {
          type: "paragraph",
          text: "AppSheet reads and writes data that sits in your own accounts, so the data comes with you by default. What you rebuild is the app definition: column settings, slices, views, actions, bots and every expression.",
        },
        {
          type: "list",
          items: [
            "Google Sheets and Excel files stay in your Drive or OneDrive. The new app can read them during the build, and the data moves into Postgres at cutover.",
            "Cloud SQL, MySQL, Postgres or SQL Server databases can stay exactly as they are, often with no schema changes for the first release.",
            "AppSheet databases are the exception, because they live with the AppSheet account. Copy them out first: a CSV export action in the app handles modest tables, and the AppSheet API, on plans that include it, reads rows in bulk.",
            "Image and file columns hold a path, while the files sit in the app owner's Google Drive, by default under an appsheet folder. Copy them to your own object storage and rewrite each path on import.",
          ],
        },
        {
          type: "paragraph",
          text: "AppSheet has no export of the app definition, so ask whoever built the app to sit with the editor open and write down every table, column type, slice, view, action and bot. That inventory is the specification, and it is quicker to make with the builder in the room than from screenshots afterwards.",
        },
      ],
    },
    {
      id: "concept-map",
      heading: "From slices and security filters to code",
      blocks: [
        {
          type: "paragraph",
          text: "Most AppSheet features have a direct equivalent in a coded app. The difference is where the rule runs: AppSheet decides a lot on the device, and a web app decides it on the server.",
        },
        {
          type: "table",
          caption: "AppSheet features and their equivalents in a coded web app",
          columns: ["AppSheet", "What it does", "In a coded app"],
          rows: [
            ["Column types", "Enum, Ref, Image, LatLong and other typed columns over a sheet or table", "Postgres columns with constraints, foreign keys and a files table"],
            ["Key column", "Identifies each row, often a UNIQUEID() value", "A primary key, with the AppSheet value kept in its own column"],
            ["Ref columns and REF_ROWS", "Links between tables and lists of related rows", "Foreign keys, and a query for the related rows"],
            ["Virtual columns", "Values recalculated on every sync", "Views, generated columns or server code"],
            ["Slices", "Filtered subsets of a table that views are built on", "Query functions or database views"],
            ["Security filters", "Decide which rows reach each user's device", "Authorisation on every request, plus Postgres row level security"],
            ["Views", "Deck, table, form, detail, map and dashboard screens", "Pages and components designed for each task"],
            ["Actions", "Buttons that change data, open links or move between views", "Server endpoints behind buttons, each with validation"],
            ["Bots and automations", "Emails, PDFs and updates triggered by changes or schedules", "Background jobs, scheduled tasks and email templates"],
            ["USERSETTINGS and roles", "Per-user preferences and access", "A users table with roles and saved preferences"],
          ],
        },
        {
          type: "callout",
          title: "Expressions are where the logic hides",
          text: "Valid_If, Show_If, Editable_If, initial values and app formulas each carry a rule, scattered across hundreds of column settings. List them table by table and turn each one into a server check or a test. A forgotten Valid_If is how bad data gets into the new app in its first week.",
        },
      ],
    },
    {
      id: "sign-in-and-offline",
      heading: "Sign-in, security filters and offline use",
      blocks: [
        {
          type: "paragraph",
          text: "Most people sign in to AppSheet with a Google account, so add Google sign-in to the new app and import the user list with roles before launch. Nobody needs a new password.",
        },
        {
          type: "image",
          image: appsheetSecurityFilterVsServerCheck,
          alt: "AppSheet filters a sheet's rows onto the phone; a web app's server checks each request and returns only that user's rows.",
        },
        {
          type: "paragraph",
          text: "Security filters change shape in the move. In AppSheet they decide which rows are copied to each device. In a web app, the server checks every request against the signed-in user, and Postgres row level security can enforce the same rule again inside the database. Test each role by signing in as it, because an admin account sees everything and hides mistakes.",
        },
        {
          type: "paragraph",
          text: "Offline use is the decision that shapes the build most. AppSheet makes it effortless, so teams often rely on it without anyone writing it down. Ask who uses the app with no signal: in a basement plant room, on a farm, in a delivery van. If nobody does, a normal web app is simpler and cheaper. If they do, plan an installable app that saves changes on the device and sends them when the signal returns, and budget the extra time.",
          link: { text: "How an installable web app works offline", href: "/blog/pwa-development" },
        },
      ],
    },
    {
      id: "four-steps",
      heading: "An AppSheet migration in four steps",
      blocks: [
        {
          type: "paragraph",
          text: "Build against the data you already have, let a small group try the new app, and move the data into Postgres only when the switch happens.",
        },
        {
          type: "image",
          image: appsheetDataStaysPut,
          alt: "A timeline: the AppSheet app and the new web app share Google Sheets until cutover, when the new app moves to Postgres.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Build the new app on the same sheets or database, reading them through your own server code, so you can compare screens against AppSheet with real data.",
            "Give a handful of users the new app while everyone else stays on AppSheet. Decide which app writes to each table during this stage, and let only that one.",
            "Pause edits in AppSheet, copy the data and files into Postgres and object storage, and check row counts table by table.",
            "Switch everyone over, set the AppSheet tables to read-only, and keep the app for a few weeks as a reference.",
          ],
        },
        {
          type: "paragraph",
          text: "Then lock the spreadsheet itself with view-only sharing or protected ranges. Someone always has a bookmark to it, and updates typed there after cutover never reach the new app.",
        },
      ],
    },
    {
      id: "time-and-cost",
      heading: "Time and cost",
      blocks: [
        {
          type: "paragraph",
          text: "Most AppSheet apps take three to six weeks to rebuild and switch over. The number of tables, security filters and bots sets the pace, and offline support adds time on top. A stable internal app whose users are all on your Workspace plan is usually cheaper to keep, so the move pays when customers, contractors or volume are involved. A focused rebuild often fits one of our fixed-price sprints.",
          link: { text: "See what a fixed-price sprint includes", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is AppSheet included with Google Workspace?",
      answer:
        "AppSheet Core is included in many Workspace editions, including Business Starter, Standard and Plus, for domain-verified accounts. That makes internal apps cheap to run, which is a good reason to leave internal-only apps where they are.",
    },
    {
      question: "Will the new app open in the AppSheet mobile app?",
      answer:
        "No. AppSheet apps run inside its own app or in a browser on AppSheet's address. The rebuilt app lives at your own web address, where people can add it to their home screen, and it can be wrapped for the app stores if you need a listing.",
    },
    {
      question: "What happens to the PDFs and emails our bots create?",
      answer:
        "They become server jobs. PDFs are generated from HTML templates, using your current Google Docs templates as the design reference, and emails go out through a transactional email provider from your own domain.",
    },
  ],
}
