import adaloLogo from "@/assets/blog/logos/adalo.svg"
import type { BlogPost } from "@/lib/blog/types"

export const adalo: BlogPost = {
  slug: "migrate-from-adalo",
  title: "What it really costs to rebuild an Adalo app in code",
  series: "migration",
  topic: "Adalo",
  logo: adaloLogo,
  category: "No-code app builders",
  description:
    "The time, money and risk in rebuilding an Adalo app as code you own: a work breakdown with durations, running costs, data traps and keeping your store listing.",
  summary:
    "Rebuilding an Adalo app in code usually takes five to eight weeks and, with us, starts from £10,000, because Adalo exports your data but not your screens or logic. Most of the risk sits in a few predictable places: relationships missing from the CSV exports, users who never update, and automations that live outside Adalo. Ship the rebuild as an update to your existing store listing and users get it automatically, with your reviews intact.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "None, screens and logic are rebuilt" },
    { label: "Data export", value: "CSV per collection, or the Adalo API" },
    { label: "Typical timeline", value: "5 to 8 weeks" },
    { label: "Store listing", value: "Kept, shipped as an update" },
  ],
  sections: [
    {
      id: "short-answer",
      heading: "Five to eight weeks, from £10,000, with four risks to plan for",
      blocks: [
        {
          type: "paragraph",
          text: "A typical Adalo app, with a few user roles and a few dozen screens, takes five to eight weeks to rebuild and release, and our builds start from £10,000. Screen count, roles, payments and the state of the data move the number. The risks are predictable, which means they can be planned out.",
        },
        {
          type: "paragraph",
          text: "It is a rebuild because Adalo has no code export. Your data comes out as a CSV file per collection, or through the Adalo API on plans that include it. Screens, actions and custom actions stay behind, so screenshot and document them: they are the specification.",
        },
      ],
    },
    {
      id: "where-the-time-goes",
      heading: "Where the time goes",
      blocks: [
        {
          type: "paragraph",
          text: "Most of the calendar goes on the data model and the core screens. Moving the data is a few days of work spread across rehearsals. Several items run in parallel, which is how they add up to five to eight weeks rather than the sum of the column.",
        },
        {
          type: "table",
          caption: "Typical work items in an Adalo rebuild and their rough durations",
          columns: ["Work item", "What it involves", "Rough duration"],
          rows: [
            [
              "Inventory and spec",
              "Every screen, collection, action and outside automation",
              "3 to 5 days",
            ],
            [
              "Data model and API",
              "Collections mapped to Postgres tables, relationships rebuilt",
              "1 to 2 weeks",
            ],
            [
              "Sign-in and user move",
              "Accounts imported without passwords, magic link on first launch",
              "2 to 4 days",
            ],
            [
              "Core screens",
              "React Native with Expo for iOS, Android and, if needed, web",
              "2 to 3 weeks",
            ],
            [
              "Payments, notifications, jobs",
              "Stripe, push, and server jobs replacing Zapier or Make chains",
              "3 days to 1 week",
            ],
            [
              "Data migration rehearsals",
              "Export, transform, import, check counts, repeat",
              "3 to 5 days",
            ],
            [
              "Beta testing",
              "TestFlight and a Google Play testing track",
              "1 to 2 weeks",
            ],
            [
              "Store review and release",
              "Submitting the update, answering reviewer questions",
              "A few days, sometimes longer",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Two things stretch the timeline most: a payment flow with unwritten edge cases, and real logic living in external automations. Both show up in the inventory, which is why the first week is not optional.",
        },
      ],
    },
    {
      id: "the-money",
      heading: "The money, beyond the build",
      blocks: [
        {
          type: "paragraph",
          text: "The build is the big number, but not the only one. Expect to pay for both systems for a while, plus running costs that used to be bundled into your Adalo plan.",
        },
        {
          type: "list",
          items: [
            {
              term: "The build",
              text: "From £10,000 with us. Screens, roles and integrations move the price far more than user numbers do.",
            },
            {
              term: "Overlap with Adalo",
              text: "Keep Adalo until the cutover is done and the old app has sat read-only for a few weeks. Budget for one to three extra months.",
            },
            {
              term: "Hosting and database",
              text: "A managed Postgres database, an API host and file storage: a modest monthly line that grows with usage rather than plan tier.",
            },
            {
              term: "Build and monitoring services",
              text: "A mobile build service such as Expo's, plus crash reporting. Free tiers often cover a small app; check the limits.",
            },
            {
              term: "Developer accounts",
              text: "The Apple and Google fees you already pay. Nothing changes, as long as the accounts are in your company's name.",
            },
            {
              term: "Changes after launch",
              text: "New features become developer time rather than an afternoon in the editor. That is the real trade.",
            },
          ],
        },
      ],
    },
    {
      id: "the-risks",
      heading: "The risks, ranked by how often they bite",
      blocks: [
        {
          type: "paragraph",
          text: "Broken relationships come first, then users stuck on the old app, then logic hidden outside Adalo. Each is cheap to fix if planned for and expensive if found after launch.",
        },
        { type: "subheading", text: "1. Relationships missing from the CSV" },
        {
          type: "paragraph",
          text: "Fields on the many side of a relationship do not appear in Adalo's CSV exports, so records arrive disconnected. Rebuild links from the one side, or read records through the API where your plan includes it, and keep each Adalo record ID in a legacy column so links can be checked after import.",
        },
        { type: "subheading", text: "2. Users who never update" },
        {
          type: "paragraph",
          text: "Some people keep the old version for weeks. Decide what the Adalo build shows once its backend is off, and ship a forced update screen in the new app's first release.",
        },
        { type: "subheading", text: "3. Logic that lives somewhere else" },
        {
          type: "paragraph",
          text: "Zapier or Make scenarios, external collections in Airtable or Xano, custom actions calling outside APIs: none of it is visible in the editor. List every connected service before estimating, because each is either rebuilt as a server job or deliberately dropped.",
        },
        { type: "subheading", text: "4. Data changing during review" },
        {
          type: "paragraph",
          text: "If users keep writing to Adalo while review drags on, records created in between can be lost. Freeze changes, run the final migration, then release, and keep Adalo read-only until you are sure nothing is missing.",
        },
      ],
    },
    {
      id: "store-update",
      heading: "Ship the rebuild as an update, not a new app",
      blocks: [
        {
          type: "paragraph",
          text: "Publish the new app under your existing App Store and Google Play listings, so current users receive it automatically and your ratings stay. A new listing starts from zero and strands every existing user. Before the build starts, confirm:",
        },
        {
          type: "checklist",
          items: [
            "Both developer accounts are registered to your company, not to a freelancer or whoever first set up Adalo",
            "The iOS build uses the same bundle identifier as the Adalo app",
            "The Android build uses the same package name",
            "You can sign Android updates, or, if the app uses Play App Signing, you know how to request an upload key reset",
            "Version and build numbers will be higher than the last Adalo release",
            "Release notes explain the new sign-in step to existing users",
          ],
        },
        {
          type: "paragraph",
          text: "Plan the release around review, not the other way round. Updates are usually reviewed within days, but the first build from a new codebase can draw questions, so leave slack before any announced launch.",
        },
      ],
    },
    {
      id: "when-the-sums-say-wait",
      heading: "When the sums say wait",
      blocks: [
        {
          type: "paragraph",
          text: "If the app is fast enough, reviews are fine and nobody asks who owns the code, a rebuild is money spent on a problem you do not have yet. Adalo is a sensible home for a simple app or a product still finding its audience. The sums change when slow screens, missing features or ownership questions start costing users, reviews or deals.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Adalo?",
      answer:
        "No. Adalo does not export source code. You can download each collection as a CSV file, or read records through the Adalo API on plans that include it, but the screens and logic have to be rebuilt in code.",
    },
    {
      question: "How do I move my Adalo users to a new app?",
      answer:
        "Export the Users collection with emails and profile fields, then import the accounts into the new app without passwords, because Adalo does not export them. On first launch of the new version, users sign in with a magic link or one-time code, or set a new password.",
    },
    {
      question: "Will I lose my App Store listing if I leave Adalo?",
      answer:
        "Not if the listing is in your own developer account. Build the new app with the same bundle identifier on iOS and the same package name on Android, and publish it as an update, so existing users receive it and keep their reviews and ratings.",
    },
    {
      question: "How much does it cost to rebuild an Adalo app?",
      answer:
        "At Scryptic, rebuilding an Adalo app in code starts from £10,000 and usually takes five to eight weeks, depending on the number of screens, roles, payments and how much data needs moving. Budget separately for hosting, a few months of overlap on your Adalo plan, and ongoing development after launch.",
    },
  ],
}
