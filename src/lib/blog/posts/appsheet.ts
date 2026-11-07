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
    "An AppSheet migration makes sense once the app reaches people outside your Workspace, holds more data than a sheet can carry, or runs a process the business can't stop. There's no code export, so the app is rebuilt. The data is the easy part: it already sits in your own Google Sheets, Excel files or database, and the new app can use it from day one.",
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
          text: "When it stops being a tool for colleagues who already live in Google Workspace. AppSheet is very good at inspections, stock counts and job sheets for an internal team. The trouble starts when outsiders need in, or when a mistake in the app starts costing customers.",
        },
        {
          type: "paragraph",
          text: "Take a pest control firm. Its technicians log every visit in an AppSheet app over a Google Sheet: the site, the bait stations checked, photos and a signature. A bot emails a PDF report to the office. Then the restaurant chains it serves ask to see their own visit history and download reports for their food safety audits.",
        },
        {
          type: "list",
          items: [
            "Each client contact would need a login. Every signed-in user counts against a per-user plan, and a public app without sign-in needs a separate Publisher Pro plan unless you're on Enterprise. Public apps can't use security filters, and Google's advice is to assume anyone can see all of their data.",
            "Syncs keep getting slower. AppSheet copies the rows each technician can see onto their phone, which is what makes offline work possible. Three years of visits and a growing pile of virtual columns make every sync longer.",
            "The sheet is straining. A Google Sheet edited by the app while office staff type into the same tabs is fragile, and AppSheet databases on Core plans hold 2,500 rows each.",
            "Edits go straight to everyone. Changes are made in a browser editor with version history but no automated tests, so one wrong expression reaches every technician at their next sync.",
          ],
        },
        {
          type: "callout",
          title: "Try these before rebuilding",
          text: "If speed is the only complaint, remove virtual columns from the biggest tables and use security filters so each person syncs only their own rows. For an app that stays internal, that often buys another year.",
        },
        {
          type: "paragraph",
          text: "When the sheet behind the app is what's creaking, the warning signs tend to arrive in a predictable order.",
          link: { text: "The signs you've outgrown Google Sheets as a database.", href: "/blog/google-sheets-as-a-database" },
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
            "Image and signature columns hold a path, while the files sit in the app owner's Google Drive, by default under an appsheet folder. Copy them to your own object storage and rewrite each path on import, or the firm's visit photos end up as broken links.",
          ],
        },
        {
          type: "paragraph",
          text: "AppSheet has no export of the app definition, so ask whoever built the app to sit with the editor open and write down every table, column type, slice, view, action and bot. That inventory is the specification, and it's far quicker to make with the builder in the room than from screenshots afterwards.",
        },
      ],
    },
    {
      id: "concept-map",
      heading: "From slices and security filters to code",
      blocks: [
        {
          type: "paragraph",
          text: "Most AppSheet features have a direct equivalent in a coded app. What moves is where each rule runs: AppSheet decides a lot on the phone, and a web app decides it on the server.",
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
            ["Bots and automations", "Emails, PDFs and updates triggered by changes or schedules", "Background jobs, PDF templates and transactional email"],
            ["USERSETTINGS and roles", "Per-user preferences and access", "A users table with roles and saved preferences"],
          ],
        },
        {
          type: "callout",
          title: "Expressions are where the logic hides",
          text: "Valid_If, Show_If, Editable_If, initial values and app formulas each carry a rule, scattered across hundreds of column settings. List them table by table and turn each one into a server check or a test. A forgotten Valid_If is how a visit without a signature gets into the new app in its first week.",
        },
      ],
    },
    {
      id: "sign-in-and-offline",
      heading: "Sign-in, security filters and offline use",
      blocks: [
        {
          type: "paragraph",
          text: "Technicians who sign in to AppSheet with a Google account can do the same in the new app, so import the user list with roles before launch and nobody needs a password. Client contacts get their own sign-in by email.",
        },
        {
          type: "image",
          image: appsheetSecurityFilterVsServerCheck,
          alt: "AppSheet filters rows before syncing them to the phone, while a web app checks every request on the server.",
        },
        {
          type: "paragraph",
          text: "Security filters change shape in the move. In AppSheet they decide which rows are copied to each phone. In a web app, the server checks every request against the signed-in user, so a restaurant chain only ever receives its own sites, and Postgres row level security can enforce the same rule again inside the database. Test each role by signing in as it, because an admin account sees everything and hides mistakes.",
        },
        {
          type: "paragraph",
          text: "Offline use is the decision that shapes the build most. AppSheet makes it effortless, so teams rely on it without anyone writing it down. Pest control technicians spend half their day in cellars and kitchen stores with no signal, so the firm's new app has to save each visit on the phone and send it when the signal returns. If none of your users work like that, a normal web app is simpler and cheaper.",
          link: { text: "How an installable web app keeps working offline.", href: "/blog/pwa-development" },
        },
        {
          type: "paragraph",
          text: "Technicians used to tapping the AppSheet icon may want an app on their home screen too. The same web app can be wrapped for the App Store and Google Play, with offline storage and the camera handled by the shell.",
          link: { text: "When wrapping a web app for the app stores is enough.", href: "/blog/hybrid-apps" },
        },
      ],
    },
    {
      id: "four-steps",
      heading: "An AppSheet migration in four steps",
      blocks: [
        {
          type: "paragraph",
          text: "Build against the data you already have, let a small group try the new app, and only move the data into Postgres when the switch happens.",
        },
        {
          type: "image",
          image: appsheetDataStaysPut,
          alt: "The AppSheet app and the new web app both use Google Sheets until cutover, when the new app moves to Postgres.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Build the new app on the same sheets or database, reading them through your own server code, so you can compare screens against AppSheet with real data.",
            "Give two or three technicians the new app while everyone else stays on AppSheet. Decide which app writes to each table during this stage, and let only that one.",
            "Pause edits in AppSheet, copy the data and files into Postgres and object storage, and check row counts table by table.",
            "Switch everyone over, set the AppSheet tables to read-only, and keep the app for a few weeks as a reference.",
          ],
        },
        {
          type: "paragraph",
          text: "Then lock the spreadsheet itself with view-only sharing or protected ranges. Someone in the office always has a bookmark to it, and updates typed there after cutover never reach the new app.",
        },
        {
          type: "paragraph",
          text: "Letting clients in for the first time also means a privacy policy, a cookie banner and someone watching for errors. Our free App Launch Checklist asks five questions about your app and builds a launch checklist covering legal, payments, SEO, analytics and the app stores.",
          link: { text: "Build your launch list with the App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "time-and-cost",
      heading: "Time and cost",
      blocks: [
        {
          type: "paragraph",
          text: "Most AppSheet apps take three to six weeks to rebuild and switch over. The number of tables, security filters and bots sets the pace, and offline support adds time on top. A stable internal app whose users are all on your Workspace plan is usually cheaper to keep, so the move pays when customers or volume are involved. A focused rebuild often fits one of our fixed-price sprints.",
          link: { text: "See what each package includes.", href: "/#pricing" },
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
        "No. AppSheet apps run inside its own app or in a browser on AppSheet's address. The rebuilt app lives at your own web address, so send everyone the new link before cutover and remove the old app from their phones afterwards.",
    },
    {
      question: "Can a web app scan barcodes the way AppSheet does?",
      answer:
        "Yes. A web app can read barcodes and QR codes through the phone's camera in the browser, and an app wrapped for the stores can use a native scanner plugin. Try it on the phones your team actually carries, because cheaper cameras can be slow to focus on small labels.",
    },
  ],
}
