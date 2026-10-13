import type { BlogPost } from "@/lib/blog/types"

export const adalo: BlogPost = {
  slug: "migrate-from-adalo",
  title: "Migrating from Adalo to a production app",
  tool: "Adalo",
  category: "No-code app builders",
  description:
    "How to move an Adalo app to production code: exporting collections, moving users, keeping your App Store listing, and a step by step plan for a safe cutover.",
  summary:
    "Adalo does not export code, so moving to production means rebuilding the app on a modern stack, usually a TypeScript backend with Postgres and a React Native or web frontend. Your data leaves as CSV or through the Adalo API, users move with a password reset or magic link, and a native app ships as an update to your existing store listing.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "No, screens and logic are rebuilt" },
    { label: "Data export", value: "CSV per collection, or the Adalo API" },
    { label: "Usual approach", value: "Planned rebuild, run in parallel" },
    { label: "Typical timeline", value: "5 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move off Adalo?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the app has real users and the limits of the builder start to show in their experience. Adalo is a quick way to get a native iOS and Android app, or a web app, in front of people without writing code. It is less suited to an app with growing data, complex rules and a team of developers.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Screens with long lists or nested data take noticeably longer to load as your collections grow.",
            "You need logic the builder makes awkward: multi-step transactions, background jobs, detailed roles or calculations across many records.",
            "Store reviews mention speed, crashes or missing features, and you cannot fix the cause from inside the editor.",
            "You rely on a chain of Zapier or Make automations and custom actions that nobody fully understands any more.",
            "A partner, investor or enterprise customer wants to know where the data lives, who owns the code and how it is tested.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Adalo?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data, but not your app. Adalo has no code export, so screens, actions and logic are rebuilt. The records in your collections can be downloaded and moved to a database you own.",
        },
        {
          type: "list",
          items: [
            {
              term: "Collections",
              text: "Each collection downloads as a CSV file from the database panel, one collection at a time. There is no single export of the whole database.",
            },
            {
              term: "Relationships",
              text: "Fields on the many side of a relationship do not appear in the CSV. Rebuild links from the one side, or pull records through the Adalo API, which is available on some paid plans, so check what yours includes.",
            },
            {
              term: "External collections",
              text: "If some data already lives in Airtable, Xano or another API connected as an external collection, it is already outside Adalo and can stay where it is during the rebuild.",
            },
            {
              term: "User accounts",
              text: "The Users collection exports with emails and your custom fields, but not passwords. Plan a reset or magic link flow for every existing user.",
            },
            {
              term: "What stays behind",
              text: "Screens, components, actions, custom actions and the builder's hosting. Screenshot and document them, because they are the specification for the rebuild.",
            },
          ],
        },
        {
          type: "callout",
          title: "Keep your store listings",
          text: "If your app is in the App Store or Google Play, check that both developer accounts are in your company's name. The new app should ship as an update under the same listing, so users keep their reviews and get it automatically.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a production version need that Adalo cannot give you?",
      blocks: [
        {
          type: "paragraph",
          text: "Mostly control over performance, data and release quality. A coded app lets you decide how data is loaded, where rules are enforced and how changes are tested before they reach the stores.",
        },
        {
          type: "list",
          items: [
            {
              term: "A proper database and API",
              text: "Postgres with indexes and relationships that hold, behind an API that returns only what each screen needs. This is usually where the biggest speed gains come from.",
            },
            {
              term: "Server-side rules",
              text: "Visibility settings on a screen are not security. Who can read and change each record should be checked on the server, for every request.",
            },
            {
              term: "A maintainable mobile codebase",
              text: "React Native with Expo lets one TypeScript codebase produce iOS, Android and, if you need it, a web version, with over-the-air fixes for small changes.",
            },
            {
              term: "Background work",
              text: "Notifications, reminders and integrations run as jobs on the server instead of external automations, so they can be retried and monitored.",
            },
            {
              term: "Tests and release process",
              text: "Automated tests on sign-up and the core flow, a staging build for testers, and crash reporting, so a bad release is caught before most users see it.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate an Adalo app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Keep the Adalo app live, build the new one beside it, then switch in a single planned release. For a native app, the switch is a store update rather than a domain change, so plan the timing around review.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the app",
              text: "List every screen, collection, property, relationship, action, custom action, external collection and automation. Mark which ones users actually use.",
            },
            {
              term: "Secure the accounts",
              text: "Make sure your company owns the Apple and Google developer accounts, the domain, and every connected service, such as Stripe, Zapier or Make.",
            },
            {
              term: "Design the data model",
              text: "Map each collection to a Postgres table, turn many to many relationships into join tables, and keep the Adalo record ID in a legacy column so links can be rebuilt.",
            },
            {
              term: "Rebuild the core",
              text: "Build the API, sign-in, the main flow and payments first, then the remaining screens. Replace automations with server jobs where it makes sense.",
            },
            {
              term: "Script and rehearse the data move",
              text: "Export each collection, transform it, import it and check the counts and relationships. Repeat on fresh exports until it runs cleanly.",
            },
            {
              term: "Plan the user move",
              text: "Import users without passwords. On first launch of the new version, they confirm their email with a magic link or one-time code, or set a new password.",
            },
            {
              term: "Test with real users",
              text: "Use TestFlight and Google Play's testing tracks to give a small group the new app while Adalo still serves everyone else.",
            },
            {
              term: "Cut over",
              text: "Freeze changes in Adalo, run the final data migration, release the store update and point any web domain at the new hosting. Keep Adalo read-only until you are sure nothing is missing.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Adalo migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The usual problems are lost relationships, people still running the old app version, and logic hidden in external automations.",
        },
        {
          type: "list",
          items: [
            "Relying on CSV exports alone and losing the many side of relationships, so records arrive disconnected.",
            "Publishing the new app as a separate store listing, so existing users never get it and reviews start from zero.",
            "Forgetting that some users will not update straight away. Decide what the old version shows once Adalo is switched off, and consider a forced update screen.",
            "Missing a Zapier or Make scenario that sent emails or updated records, because it lived outside Adalo.",
            "Leaving data changing in Adalo while store review takes longer than expected, then losing the records created in between.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Adalo instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app does what users need and is fast enough. Adalo is a sensible home for a simple app, an internal tool or a product that is still finding its audience. Move when performance, missing features or ownership questions are costing you users, reviews or deals, not just because the builder feels limiting on a bad day.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Adalo?",
      answer:
        "No. Adalo does not export source code. You can download each collection as a CSV file or read records through the Adalo API on plans that include it, but the screens and logic have to be rebuilt in code.",
    },
    {
      question: "How do I move my Adalo users to a new app?",
      answer:
        "Export the Users collection with emails and profile fields, then import the accounts into the new app without passwords, because Adalo does not export them. Users then sign in with a magic link or one-time code, or set a new password.",
    },
    {
      question: "How long does it take to migrate from Adalo?",
      answer:
        "Typically five to eight weeks to a production first release, depending on the number of screens and roles, how much data needs moving, and how long app store review takes for the update.",
    },
    {
      question: "Will I lose my App Store listing if I leave Adalo?",
      answer:
        "Not if the listing is in your own developer account. Build the new app with the same bundle identifier on iOS and package name on Android, and publish it as an update, so existing users receive it and keep their reviews and ratings.",
    },
  ],
}
