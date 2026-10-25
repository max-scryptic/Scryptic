import bubbleLogo from "@/assets/blog/logos/bubble.svg"
import type { BlogPost } from "@/lib/blog/types"

export const bubble: BlogPost = {
  slug: "migrate-from-bubble",
  title: "The complete guide to rebuilding a Bubble app in code",
  series: "migration",
  topic: "Bubble",
  logo: bubbleLogo,
  category: "No-code app builders",
  description:
    "A reference for moving off Bubble: how each Bubble concept maps to code, exporting data and users, running both apps in parallel and planning the cutover.",
  summary:
    "You cannot export code from Bubble, so leaving means rebuilding the app on a stack such as TypeScript and Postgres while your data moves across by CSV or the Data API. Users come with you without their passwords, the Bubble app stays live until the new one has proved itself, and a typical rebuild takes four to eight weeks.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "No, the app file only opens in Bubble" },
    { label: "Data export", value: "CSV per data type, or the Data API" },
    { label: "Passwords", value: "Not exportable, plan a reset" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "read-this-first",
      heading: "Read this first",
      blocks: [
        {
          type: "paragraph",
          text: "There is no button that turns a Bubble app into source code, and there never has been. Bubble runs your app inside its own engine, so leaving it means rebuilding every page, workflow and rule in code, then moving the data underneath. Anyone who promises an automatic conversion is selling you something you will end up rewriting.",
        },
        {
          type: "paragraph",
          text: "That sounds worse than it is. A working Bubble app is the best specification a rebuild can have: every screen, every rule and every edge case already exists and can be clicked through. Your data is fully exportable. And because Bubble keeps running while you build, nobody has to stop work while the new version is made.",
        },
        {
          type: "paragraph",
          text: "This guide is a reference for the whole move. It covers how Bubble's building blocks translate into a coded app, how to audit the app before writing any code, how to get data and users out, how to run both apps side by side, and how to plan the day you switch. Use the contents to jump to the part you need.",
        },
        {
          type: "callout",
          title: "When a rebuild is not worth it",
          text: "If your Bubble bill is predictable, pages are fast enough, your team ships changes comfortably and nobody is asking who owns the code, a rebuild spends money without changing much for customers. The good reasons to move are recurring ones: workload unit costs rising faster than revenue, performance problems you cannot fix inside the editor, developers who will not work in a visual tool, or due diligence questions about code ownership.",
        },
      ],
    },
    {
      id: "concept-map",
      heading: "How Bubble concepts map to a coded app",
      blocks: [
        {
          type: "paragraph",
          text: "Nearly everything in Bubble has a direct equivalent in a modern web stack. The table below uses the stack we build on, TypeScript, Next.js and Postgres, but the mapping holds for most alternatives.",
        },
        {
          type: "table",
          caption: "Each Bubble concept and what it becomes in a production codebase",
          columns: ["Bubble concept", "Production equivalent", "Watch out for"],
          rows: [
            ["Data types", "Postgres tables", "Built-in fields like Created Date and Creator"],
            ["Fields", "Typed columns with constraints", "Text fields that really hold numbers or dates"],
            ["List fields", "Join tables", "Lists with thousands of entries"],
            ["Option sets", "Enums or lookup tables", "Extra attributes stored on each option"],
            ["Page workflows", "Event handlers and server actions", "Logic in element conditionals"],
            ["Backend workflows", "API routes and queued jobs", "Workflows exposed to outside callers"],
            ["Scheduled and recurring workflows", "Cron jobs or a job queue", "Schedules created per record"],
            ["Database triggers", "Database triggers or app events", "Triggers that call other workflows"],
            ["Privacy rules", "Server authorisation checks, row level security", "Rules that also hide fields, not just rows"],
            ["Plugins", "npm packages or direct API calls", "Plugins whose behaviour nobody documented"],
            ["API Connector", "Server-side API clients", "Keys marked as client-safe in Bubble"],
            ["Reusable elements", "React components", "Copies that drifted apart over time"],
            ["Custom states", "Component or URL state", "States used to pass data between pages"],
            ["User type", "Auth provider plus a users table", "Passwords, which do not export"],
            ["Dev and live versions", "Staging and production environments", "Two separate databases to migrate"],
            ["Workload units", "Hosting and database bills", "Costs moving to someone's time"],
          ],
        },
        {
          type: "subheading",
          text: "Lists of things become join tables",
        },
        {
          type: "paragraph",
          text: "Bubble lets a record hold a list of other records, such as a Project with a list of Members. In Postgres that becomes a separate table with one row per pairing, which is faster to query and lets you store extra details, like when a member joined. Expect most of the data modelling effort to go here.",
        },
        {
          type: "subheading",
          text: "Privacy rules become code you test",
        },
        {
          type: "paragraph",
          text: "Privacy rules are the most important thing to translate carefully. In Bubble they quietly filter every search and can hide individual fields. In the new app each rule becomes an explicit check on the server, and where it helps, a row level security policy in the database. Write each rule out in plain language first, then write a test that signs in as an ordinary user and confirms they cannot see what they should not.",
        },
        {
          type: "subheading",
          text: "Backend workflows become jobs you can monitor",
        },
        {
          type: "paragraph",
          text: "Backend workflows, scheduled workflows and recurring events are where silent failures hide. A reminder email or a monthly renewal that stops after cutover will not show an error anywhere; customers just stop receiving it. Each one becomes a queued job or scheduled task with logging and retries, so a failure is visible the same day.",
        },
        {
          type: "subheading",
          text: "Plugins and the API Connector become ordinary integrations",
        },
        {
          type: "paragraph",
          text: "Most plugins wrap a third-party service or a JavaScript library, and the coded version calls that service or library directly. The API Connector maps to a small server-side client for each external API, with keys held in environment variables. Check every API Connector call that was set to run from the browser: if a private key was exposed there, rotate it as part of the move.",
        },
      ],
    },
    {
      id: "audit",
      heading: "Audit the app before writing any code",
      blocks: [
        {
          type: "paragraph",
          text: "Spend the first few days writing down what the Bubble app actually does, not what people remember it doing. Most migration problems trace back to logic nobody knew existed, and the audit is where you find it.",
        },
        {
          type: "checklist",
          items: [
            "Every page, with the user roles that can reach it",
            "Every data type, its fields and which fields are actually filled in",
            "Every option set and the attributes stored on its options",
            "Every page workflow, including custom events and page load workflows",
            "Every backend workflow, and whether anything outside Bubble calls it",
            "Every scheduled workflow and recurring event, with how often it runs",
            "Every database trigger",
            "Every privacy rule, written out in plain language",
            "Every plugin, and what the app would lose without it",
            "Every API Connector call, its keys and whether it runs in the browser",
            "Every email the app sends, and what triggers it",
            "Every outside system that sends data in, such as Stripe webhooks or Zapier",
          ],
        },
        {
          type: "subheading",
          text: "Where hidden logic lives",
        },
        {
          type: "paragraph",
          text: "Workflows are easy to find. The harder places are conditionals on elements that change what a button does, Only when clauses on individual workflow steps, constraints inside searches that act as permissions, and plugin actions that write data. Click through each important page as each kind of user and note anything that changes based on who is looking.",
        },
        {
          type: "paragraph",
          text: "Mark each item as keep, change or drop. A rebuild is a good moment to remove features nobody uses, but resist adding new ones until the new app matches the old. Launching on time matters more than launching with extras.",
        },
      ],
    },
    {
      id: "exporting-data-and-users",
      heading: "Exporting data and users",
      blocks: [
        {
          type: "paragraph",
          text: "All of your data can leave Bubble, either as CSV files or through the Data API. Passwords are the one exception. Pick the method based on how much data you have and how many times you will need to run the export, which for a rehearsed migration is several.",
        },
        {
          type: "subheading",
          text: "CSV export from the Data tab",
        },
        {
          type: "paragraph",
          text: "In the editor, the Data tab lets you export each data type to a CSV file. It is the quickest route for a small app with a few thousand records. Linked records appear as Bubble unique IDs, which you will use to reconnect them later. The weakness is repetition: a manual export per type, every rehearsal, is slow and easy to get wrong.",
        },
        {
          type: "subheading",
          text: "The Data API for larger apps",
        },
        {
          type: "paragraph",
          text: "For anything larger, or anything you will migrate more than once, enable the Data API in Settings under API and expose the data types you need. A script can then page through each type, up to 100 records per request, using the cursor and the remaining count the API returns. The script becomes part of the migration codebase, so every rehearsal is one command.",
        },
        {
          type: "callout",
          title: "Mind your workload units",
          text: "Reading data through the API uses workload units, and bulk reads are relatively expensive. Run large exports in batches outside busy hours, check your plan's allowance before you start, and keep an eye on the usage chart during the first full run.",
        },
        {
          type: "subheading",
          text: "Development and live are separate databases",
        },
        {
          type: "paragraph",
          text: "Bubble keeps a development database behind version-test and a live database behind the main app. Make sure scripts read from live for the real migration, and from development when you want harmless test data. Mixing the two is a common way to import test users into production.",
        },
        {
          type: "subheading",
          text: "Files and images",
        },
        {
          type: "paragraph",
          text: "Uploaded files sit on Bubble's storage and appear in your data as URLs. A script needs to download each one, upload it to your own storage, such as S3 or Cloudflare R2, and rewrite the URL in the database. Do this before the Bubble plan is cancelled, or every image in the new app breaks on the same day.",
        },
        {
          type: "subheading",
          text: "Users and passwords",
        },
        {
          type: "paragraph",
          text: "The User type exports like any other data: emails, names, roles and any fields you added. Passwords do not. Bubble stores them hashed and does not hand them over, so no migration can carry them across. Import every account without a password, then let people in with a magic link or a set-password email on their first visit.",
        },
        {
          type: "list",
          items: [
            "Email users a week before the switch, so the sign-in email is expected rather than suspicious.",
            "Send the magic link from your own domain with proper email authentication, so it lands in the inbox.",
            "Keep Bubble's unique ID on each user row, so their records reconnect to them.",
            "Treat social sign-in users separately: they can sign in with the same provider, as long as you match on email.",
          ],
        },
        {
          type: "subheading",
          text: "The .bubble app file",
        },
        {
          type: "paragraph",
          text: "Bubble can export the app as a .bubble file, but it only imports into another Bubble app. Download one anyway. It is a useful backup and a frozen record of the app's logic for the developers doing the rebuild.",
        },
      ],
    },
    {
      id: "importing",
      heading: "Importing into Postgres without losing relationships",
      blocks: [
        {
          type: "paragraph",
          text: "Import in dependency order, keep every Bubble unique ID, and rehearse until the numbers match. Those three habits prevent most data problems.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Add a legacy ID column to every table",
              text: "Store the Bubble unique ID beside the new primary key. Every relationship is rebuilt by looking up that column.",
            },
            {
              term: "Import parents before children",
              text: "Users and organisations first, then the records that point to them, then join tables. Importing in the wrong order leaves orphans.",
            },
            {
              term: "Keep the original timestamps",
              text: "Carry Bubble's Created Date and Modified Date into your own columns, so history and sorting survive.",
            },
            {
              term: "Clean while you transform",
              text: "Fix text fields holding numbers, trim stray whitespace and turn option set values into your new enums in the transform step, not by hand afterwards.",
            },
            {
              term: "Check counts and spot check records",
              text: "Compare record counts per type, then open a handful of real accounts in both apps and confirm they look the same.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Run the script against a copy of live data and expect it to take several rehearsals before nothing is orphaned. Each rehearsal is far cheaper than finding missing records after launch.",
        },
      ],
    },
    {
      id: "parallel-running",
      heading: "Running Bubble and the new app side by side",
      blocks: [
        {
          type: "paragraph",
          text: "Keep Bubble as the main system until the new app has been used by real people. There are three common ways to run the two together, and the right one depends on how much your data changes each day.",
        },
        {
          type: "table",
          caption: "Ways to run Bubble and the new app in parallel",
          columns: ["Approach", "How it works", "Best for"],
          rows: [
            ["Staging with copied data", "New app runs on a recent copy of live data, testers only", "Most apps, as a first step"],
            ["Beta group", "A small group of real users moves early, everyone else stays on Bubble", "Apps where users mostly see their own data"],
            ["One-way sync", "Bubble sends changes to the new app through backend workflows", "Busy apps with shared data and a long overlap"],
          ],
        },
        {
          type: "paragraph",
          text: "Staging with copied data is the minimum. Testers work through every flow from the audit on recent, realistic data, and the rehearsed migration refreshes it whenever you like.",
        },
        {
          type: "paragraph",
          text: "A beta group is the next step when users mostly see their own records, such as a booking or productivity tool. Move a handful of friendly customers, fix what they find, then move the rest. Avoid it when users interact with each other, because half a marketplace on one system and half on the other does not work.",
        },
        {
          type: "paragraph",
          text: "One-way sync is worth the extra work only if the overlap will be long and the data changes constantly. A database trigger or backend workflow in Bubble posts each change to an endpoint in the new app. It costs workload units and adds a system to maintain, so most teams skip it and rely on a short freeze window instead.",
        },
      ],
    },
    {
      id: "cutover",
      heading: "Cutover day, in order",
      blocks: [
        {
          type: "paragraph",
          text: "Switch in one planned window, ideally a quiet evening or weekend, with everything scripted in advance. A typical cutover takes a few hours once the migration has been rehearsed.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "A few days before",
              text: "Lower the DNS time to live on your domain, email users about the change, and run a final full rehearsal.",
            },
            {
              term: "Freeze Bubble",
              text: "Show a maintenance message or switch key pages to read-only, so no new data arrives during the move.",
            },
            {
              term: "Run the final migration",
              text: "Export from live, import into production, then compare counts against the last rehearsal.",
            },
            {
              term: "Repoint integrations",
              text: "Update Stripe webhooks, email senders, Zapier or Make scenarios and any outside system that called Bubble's backend workflows.",
            },
            {
              term: "Switch the domain",
              text: "Point the domain at the new hosting and add redirects from old Bubble page paths to their new equivalents.",
            },
            {
              term: "Smoke test as real users",
              text: "Sign in as each role, run the main workflow and a payment, and confirm emails arrive.",
            },
            {
              term: "Open the doors",
              text: "Send the sign-in email and watch error tracking closely for the first day.",
            },
          ],
        },
      ],
    },
    {
      id: "after-cutover",
      heading: "The weeks after the switch",
      blocks: [
        {
          type: "paragraph",
          text: "Keep Bubble on a paid plan, read-only, for a few weeks after cutover. It is your reference if a user reports something missing, and your fallback if something goes badly wrong.",
        },
        {
          type: "checklist",
          items: [
            "Confirm every scheduled job has run at least once in the new app",
            "Check that no file URLs still point at Bubble's storage",
            "Watch for sign-in problems and resend links where needed",
            "Compare a week of revenue and key activity against the Bubble baseline",
            "Download a final .bubble file and a full data export for your records",
            "Cancel the Bubble plan only when nothing has needed it for a fortnight",
          ],
        },
        {
          type: "paragraph",
          text: "Then, and only then, start on the improvements that motivated the move. With the code in your own repository, tests on the core flows and costs that follow your infrastructure, those changes are now ordinary development work.",
        },
      ],
    },
  ],
  faqHeading: "Questions about leaving Bubble",
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
      question: "How long does it take to rebuild a Bubble app in code?",
      answer:
        "Plan on four to eight weeks to a production first release. Every workflow, user role and integration is rebuilt by hand, and the data has to be moved and checked as well, so those numbers decide where you land.",
    },
    {
      question: "Will moving off Bubble reduce my costs?",
      answer:
        "Often, but not always. For many apps, hosting and a managed Postgres database cost less than heavy workload unit usage, and they are easier to predict. You do take on the cost of maintaining the code, so compare both before deciding.",
    },
    {
      question: "Can I keep using Bubble while the new app is built?",
      answer:
        "Yes, and you should. The Bubble app stays live as the main system throughout the rebuild, while the new app is tested on a copy of your data. You switch in one planned window and keep Bubble read-only for a few weeks afterwards as a fallback.",
    },
    {
      question: "What happens to files uploaded to a Bubble app?",
      answer:
        "They stay on Bubble's storage until you move them. A migration script downloads each file, uploads it to your own storage and rewrites its URL in the new database. Do this before cancelling the Bubble plan, or images and documents will stop loading.",
    },
  ],
}
