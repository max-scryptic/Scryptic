import anythingExportZip from "@/assets/blog/images/anything-export-zip-two-dumps.webp"
import anythingIceberg from "@/assets/blog/images/anything-iceberg-platform-services.webp"
import type { BlogPost } from "@/lib/blog/types"

export const anything: BlogPost = {
  slug: "migrate-from-anything",
  title: "Migrating an Anything app to hosting you own",
  series: "migration",
  topic: "Anything",
  icon: "sparkles",
  category: "AI app builders",
  description:
    "Migrating off Anything, formerly Create.xyz: download the code, import the production SQL dump and replace the AI, uploads and functions Anything ran for you.",
  summary:
    "Migrating off Anything keeps the code: the Code tab downloads a React and Next.js web app, or an Expo mobile app, and the database exports as SQL. The work is in what the download doesn't include. Built-in AI runs on Anything's credits, uploaded files sit on Anything's storage, backend functions are public unless someone made them private, and the domain points at Anything's hosting.",
  datePublished: "2026-11-17",
  facts: [
    { label: "Code export", value: "Zip download from the Code tab" },
    { label: "Stack", value: "Next.js web, Expo mobile, Postgres" },
    { label: "Data export", value: "SQL dumps, sent by email" },
    { label: "Usual approach", value: "Keep the code, replace the services" },
  ],
  sections: [
    {
      id: "can-you-leave",
      heading: "Can you migrate an app off Anything?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, and without a rebuild. Anything, the AI app builder that used to be called Create.xyz, says you own the code it generates, and its docs describe the web stack as React and Next.js and the mobile stack as Expo and React Native. A developer who has never used Anything can read either one.",
        },
        {
          type: "paragraph",
          text: "Two things make Anything different from builders such as Lovable or Bolt. At the time of writing its export docs list GitHub sync as still in development, so the code leaves as a zip file rather than a repository that stays up to date. And Anything runs more of the app for you, from AI calls to file storage, so the zip is the smaller part of what you're moving.",
        },
      ],
    },
    {
      id: "what-stays",
      heading: "What the download carries, and what stays on Anything",
      blocks: [
        {
          type: "paragraph",
          text: "The zip holds the screens, the pages and the backend functions. Everything those functions lean on at runtime is a service in Anything's account, and each one needs a replacement before the app can run anywhere else.",
        },
        {
          type: "image",
          image: anythingIceberg,
          alt: "An iceberg: the code zip above the waterline, with AI credits, uploads, two databases, secrets and the domain below it.",
        },
        {
          type: "table",
          caption: "Each part of an Anything app, where it runs today and what replaces it",
          columns: ["Part", "On Anything", "After the move"],
          rows: [
            ["Web and mobile code", "Downloaded as a zip from the Code tab", "A repository in your company's GitHub"],
            ["Database", "Two Postgres databases, development and production", "One Postgres database per environment, in your account"],
            ["User accounts", "Four auth tables in that database", "The same tables, read by a sign-in library you control"],
            ["Built-in AI", "Calls with no key, paid in Anything credits", "Provider accounts and keys in your company's name"],
            ["Uploaded files", "Anything's cloud storage, linked by URL", "A storage bucket you own, with the URLs rewritten"],
            ["Secrets", "Saved Secrets in project settings", "Your host's environment settings"],
            ["Domain and hosting", "Published by Anything, DNS pointed at it", "Your hosting, DNS changed at the switch"],
          ],
        },
      ],
    },
    {
      id: "download",
      heading: "Freeze the app, then download it",
      blocks: [
        {
          type: "paragraph",
          text: "Pick a date to stop building in Anything, and download after it. A zip is a snapshot, so anything changed in Anything after you download it has to be copied across by hand. Building an app in Anything already needs a paid plan, which covers the download.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Open the project, go to the Code tab and click Download Project.",
            "Unzip it and push it to a new repository in your company's GitHub organisation, not a personal account.",
            "Get it running on a laptop. Each call that only works inside Anything will fail here, which makes this the quickest way to list them.",
            "Search the code for created.app addresses and for any call to a built-in integration, then note which secret or service each one needs.",
          ],
        },
        {
          type: "paragraph",
          text: "If you do keep building in Anything during the move, keep a list of every change and repeat it in the repository. Merging a second zip over code that developers have already edited is slow and easy to get wrong.",
        },
      ],
    },
    {
      id: "database",
      heading: "Two SQL dumps arrive, and only one holds customers",
      blocks: [
        {
          type: "paragraph",
          text: "Anything gives every project two Postgres databases, hosted on Neon: one for development and one for production. In the database viewer, Export database emails you a zip with a SQL dump of each, named development.sql and production.sql.",
        },
        {
          type: "image",
          image: anythingExportZip,
          alt: "The export zip opened as a file tree: development.sql set aside as test data, production.sql imported into your own Postgres.",
        },
        {
          type: "paragraph",
          text: "Your customers' records are only in production.sql. Publishing in Anything copies the structure of the development database to production but never the data, so development.sql holds whatever was typed in while the app was being built. Load production.sql into a Postgres database in your own account, then compare row counts table by table. Use the development dump, if at all, as a source of test data for a staging copy.",
        },
        {
          type: "paragraph",
          text: "Choose where the new database runs, because you can now. UK customers increasingly ask where their data is kept, and a fresh database is the cheapest moment to answer that.",
          link: { text: "What UK GDPR asks about where an app stores data", href: "/blog/uk-data-residency-ai-built-apps" },
        },
        {
          type: "paragraph",
          text: "The export arrives by email rather than straight away, so do a rehearsal first and time it. For the real switch, put the app into maintenance mode, request the export, import it and point the new app at it. Anything written in the gap would otherwise be lost.",
        },
      ],
    },
    {
      id: "users",
      heading: "Users keep their passwords",
      blocks: [
        {
          type: "paragraph",
          text: "Accounts come across in the database dump, and passwords can carry on working. Anything's user accounts live in four tables, auth_users, auth_accounts, auth_sessions and auth_verification_token, with email and password sign-in switched on by default and passwords hashed with bcrypt. Bcrypt is a standard, so any sign-in library that checks bcrypt hashes can sign existing users in with the passwords they already have.",
        },
        {
          type: "paragraph",
          text: "Sessions don't move, so everyone signs in once more after the switch. Tell users in advance, so the sign-in screen doesn't look like a fault.",
        },
        {
          type: "paragraph",
          text: "Google sign-in needs a custom domain on Anything and an OAuth client you created in your own Google Cloud account, so that client is already yours. Add the new hosting address to its authorised origins and redirect URLs before the switch, or Google will block every sign-in on the first morning.",
        },
      ],
    },
    {
      id: "functions",
      heading: "Backend functions are public until someone says otherwise",
      blocks: [
        {
          type: "paragraph",
          text: "Check who can call each backend function before anything else ships. Anything's docs say functions are public by default: anyone with the URL can call one, and limiting it to signed-in users is something you ask the agent to add. In a prototype that's convenient. In a live app it can mean a function that changes an order or reads another customer's data answers anyone who finds its address.",
        },
        {
          type: "checklist",
          items: [
            "List every function under /api and what it reads or changes",
            "Call each one signed out and note which ones answer",
            "Call each one signed in as a different user and try another user's records",
            "Add a sign-in check and an ownership check to every function that touches personal data, money or another user's records",
            "Protect functions run by an outside scheduler with a secret token, as Anything's docs suggest",
          ],
        },
        {
          type: "paragraph",
          text: "The data access checks in our vibe-coded app audit go through the same tests for the rest of the app.",
          link: { text: "Test who can read what in an AI-built app", href: "/blog/vibe-coding-to-production#data-access" },
        },
      ],
    },
    {
      id: "ai-and-uploads",
      heading: "Swap built-in AI for your own keys, and copy the uploaded files",
      blocks: [
        {
          type: "paragraph",
          text: "Anything's built-in AI needs no API key because Anything pays the provider and charges you credits. Its docs say published apps spend credits each time they run an AI integration. Outside Anything those calls have nobody to bill, so open accounts with the providers the app uses, create keys in the company's name and point each call at the provider directly. Set a monthly spending limit with each one before the switch, because credits stop being the ceiling.",
          link: { text: "Choosing a model for each AI feature", href: "/blog/ai-software-development#choosing-a-model" },
        },
        {
          type: "paragraph",
          text: "Uploaded files take more care than they first seem to. Anything stores each upload on its own cloud storage and hands back a URL, which the app usually saves in a database column. Those URLs keep pointing at Anything's storage after the move, so the job has three parts:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Find every column that holds an upload URL, such as avatars, attachments or product images.",
            "Copy each file into a storage bucket in your own account.",
            "Rewrite the URLs in the database to the new addresses, and change the upload code so new files go straight to your bucket.",
          ],
        },
        {
          type: "paragraph",
          text: "Run the copy again just before the switch to pick up files uploaded since the rehearsal. Anything caps uploads at 10 MB, and your own storage doesn't have to, so check whether users have been asking for bigger files.",
        },
      ],
    },
    {
      id: "mobile",
      heading: "An Anything mobile app is already in your Apple account",
      blocks: [
        {
          type: "paragraph",
          text: "Anything submits mobile apps from your own Apple developer account: you sign in with your Apple ID, and Anything builds the app and uploads it to App Store Connect. The listing, its reviews and its bundle identifier are already yours, so the moved app ships as an ordinary update.",
        },
        {
          type: "list",
          items: [
            {
              term: "Builds",
              text: "The app is an Expo project, so a developer builds it with Expo's EAS service from an Expo account in the company's name, signed with certificates from your Apple account.",
            },
            {
              term: "Payments",
              text: "Anything uses RevenueCat for in-app purchases on iOS and Stripe on the web. Check both accounts are the company's, and that subscriptions keep their entitlements once the app points at the new backend.",
            },
            {
              term: "Backend address",
              text: "Older versions on users' phones keep calling the old address. Keep the Anything backend running until most users have updated, or put the new backend behind the same domain.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Our free App Launch Checklist builds the store, legal and analytics steps for your app from five questions.",
          link: { text: "Build your list with the App Launch Checklist", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "switch",
      heading: "Switching the domain and ending the subscription",
      blocks: [
        {
          type: "paragraph",
          text: "Change DNS last, once the new hosting has run on a staging address with your own keys, data and storage. A domain you connected to Anything points at records Anything gave you, which point at Vercel. A domain you bought through Anything's Publish screen needs transferring to a registrar account in the company's name first, so do that in the first week rather than the last.",
        },
        {
          type: "checklist",
          items: [
            "Final database export imported and row counts matched",
            "Uploads copied again and every URL in the database rewritten",
            "Every Saved Secret recreated in the new host, with keys that sat in prompts replaced",
            "Google OAuth origins, Stripe webhooks and RevenueCat settings pointed at the new address",
            "DNS changed, with a short time to live set the day before",
            "The Anything project left published but unused for a couple of weeks, then the plan cancelled",
          ],
        },
        {
          type: "paragraph",
          text: "Most Anything web apps move in two to four weeks, and uploads and functions take longer than the code. We do these moves inside a fixed-price sprint for founders who'd rather not.",
          link: { text: "See what a fixed-price sprint includes", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need GitHub sync before leaving Anything?",
      answer:
        "No. The zip from the Code tab is the whole project, and you push it to GitHub yourself. GitHub sync would only matter if you planned to keep building in Anything and in the repository at the same time, which is worth avoiding during a move anyway.",
    },
    {
      question: "Will the downloaded code run without Anything?",
      answer:
        "The screens and most of the logic will. Calls to built-in AI integrations, uploads to Anything's storage and anything reading Saved Secrets need replacing first, and running the project on a laptop is the quickest way to find them, because those are the parts that fail.",
    },
    {
      question: "We moved to Anything from Mocha. Does anything change?",
      answer:
        "Not much. Mocha shut down on 1 August 2026 and offered a transfer into Anything, so your app now has Anything's database, auth tables and functions like any other. Anything's docs say Mocha users came across with their Google identifiers, so Google sign-in needs your own OAuth client, which you'll carry over as above.",
    },
  ],
}
