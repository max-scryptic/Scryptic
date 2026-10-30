import type { BlogPost } from "@/lib/blog/types"

export const supabaseVsFirebase: BlogPost = {
  slug: "supabase-vs-firebase",
  title: "Supabase vs Firebase for a startup",
  series: "stack",
  topic: "Supabase",
  icon: "database",
  description:
    "Supabase vs Firebase side by side: database, pricing as you grow, lock-in, auth, realtime and offline, then a simple rule for which one a startup should pick.",
  summary:
    "For most startups building a web app or SaaS product, pick Supabase: your data lives in Postgres, which you can query, report on and take anywhere. Pick Firebase when the product is a mobile app that has to work offline and you want push notifications, crash reporting and analytics in one place.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Supabase database", value: "Postgres, relational with SQL" },
    { label: "Firebase database", value: "Firestore, NoSQL documents" },
    { label: "Firebase billing", value: "Per read, write and delete" },
    { label: "Supabase billing", value: "Plan plus compute and usage" },
    { label: "Open source", value: "Supabase yes, Firebase no" },
  ],
  sections: [
    {
      id: "at-a-glance",
      heading: "Supabase vs Firebase at a glance",
      blocks: [
        {
          type: "paragraph",
          text: "Twelve rows of differences, and two of them decide almost every project: the shape of your data and whether the app must work offline. Both platforms give you a hosted database, sign-in, file storage and server functions, so either will get an MVP live.",
        },
        {
          type: "table",
          caption: "Supabase and Firebase compared feature by feature",
          columns: ["Area", "Supabase", "Firebase"],
          rows: [
            ["Main database", "Postgres, relational tables", "Cloud Firestore, NoSQL documents"],
            ["Querying", "SQL with joins, views and transactions", "Document queries, no joins"],
            ["SQL option", "Native", "SQL Connect, Postgres behind GraphQL, still young"],
            ["Access rules", "Row level security policies in SQL", "Security rules in Firebase's own language"],
            ["Auth", "Email, magic links, social, phone, MFA", "Email, links, social, phone, MFA, anonymous accounts"],
            ["Where users live", "A table in your own database", "Firebase Auth, separate from your data"],
            ["Realtime", "Postgres changes, broadcast and presence", "Live listeners on documents and queries"],
            ["Offline", "Not built in, needs a sync layer", "Built into the mobile and web SDKs"],
            ["Mobile extras", "Separate services", "Push, crash reporting, remote config, App Check"],
            ["Server code", "Edge Functions on Deno", "Cloud Functions on Node.js or Python"],
            ["Pricing model", "Monthly plan plus compute and usage", "Pay per operation on the Blaze plan"],
            ["Open source", "Yes, can be self-hosted", "No, runs only on Google Cloud"],
          ],
        },
      ],
    },
    {
      id: "data-model",
      heading: "The data model decides most projects",
      blocks: [
        {
          type: "paragraph",
          text: "If your data is related records, choose Supabase. Most startup software is: users belong to teams, teams have subscriptions, subscriptions have invoices. Sooner or later someone asks for every customer whose trial ends this week and who hasn't added a card. In Postgres that's one query with a join.",
        },
        {
          type: "paragraph",
          text: "Firestore has no joins, so you copy data into several documents so each screen can load in one read, then write code to keep the copies in step. That's where Firestore projects get messy: a team gets renamed and the old name still shows on half the screens. Postgres also brings foreign keys, transactions, views for reporting, and extensions such as pgvector for AI search over your own data.",
        },
        {
          type: "paragraph",
          text: "Firestore fits data that really is document shaped: chat messages, user-generated posts, settings, content read far more often than it's cross-referenced. Firebase's newer SQL Connect, which launched as Data Connect, puts a Cloud SQL for PostgreSQL database behind a GraphQL layer. It's a genuine option, but nearly every Firebase tutorial and library still assumes Firestore, so if you want Postgres, Supabase is the well-trodden route.",
        },
      ],
    },
    {
      id: "pricing-growth",
      heading: "How the bill behaves as you grow",
      blocks: [
        {
          type: "paragraph",
          text: "Firebase bills track how your app reads data. Supabase bills track how big a database server you need. That difference matters more than either price list.",
        },
        {
          type: "paragraph",
          text: "On Firebase's pay as you go Blaze plan, every Firestore document read, write and delete above the free allowance costs money, plus storage and network transfer. At the time of writing the free allowance includes 50,000 reads a day, which sounds generous until you do the sums on your busiest screen. A feed that loads 50 documents, opened 10 times a day by 1,000 users, is 500,000 reads a day before anyone scrolls. Live listeners are billed for every document change they receive, and Google Cloud budgets send alerts rather than stopping the spending.",
        },
        {
          type: "paragraph",
          text: "Supabase grows in steps. Free projects pause after a week of inactivity, so nothing real belongs there. Pro starts at about $25 a month at the time of writing, with some compute credit and a spend cap on by default. After that you pay for a larger compute size when you need one, plus egress, storage or monthly active users above the quota. For a busy SaaS product it's easier to forecast. Check both pricing pages before committing, because the numbers change.",
        },
      ],
    },
    {
      id: "lock-in",
      heading: "Lock-in and portability",
      blocks: [
        {
          type: "paragraph",
          text: "Supabase is open source and can be self-hosted. Firebase is proprietary and only runs on Google. This is the biggest long-term difference between them, and the one you can't change your mind about cheaply.",
        },
        {
          type: "paragraph",
          text: "Leaving Supabase is mostly a pg_dump and a restore. Your schema, data and policies are standard Postgres, so they move to any managed Postgres host or to the Supabase stack in Docker on your own servers. Auth, Storage and Edge Functions still need replacing, but the data, the part that hurts to move, comes with you untouched.",
        },
        {
          type: "paragraph",
          text: "Leaving Firebase means redesigning Firestore documents as tables and undoing the duplicated data, exporting Firebase Auth users, rewriting every security rule, and replacing every Firebase SDK call in the app. One helpful detail: the Auth export includes password hashes, so users can move without a forced reset if the new system supports Firebase's hashing. It's weeks of work, not a setting.",
        },
      ],
    },
    {
      id: "auth",
      heading: "Auth and access rules",
      blocks: [
        {
          type: "paragraph",
          text: "Sign-in is close to a draw. Access rules are where they differ, and on both platforms they matter more than usual, because the app talks to the database straight from the browser or phone.",
        },
        {
          type: "list",
          items: [
            {
              term: "Firebase security rules",
              text: "A rules file saying who can read or write each collection or path, which you can unit test locally with the Emulator Suite. Rules aren't filters: a query must ask only for documents the user may see, or the whole query fails.",
            },
            {
              term: "Supabase row level security",
              text: "Policies on each table that Postgres checks on every query, usually against auth.uid(). More powerful, because a policy can look up other tables to check team membership. A table with it switched off is readable by anyone holding your public key.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Firebase's anonymous accounts, which upgrade when the user signs up, suit apps that let people try before registering. Supabase keeps users in your own database, so a user is a row you can join to everything else. Before launch on either, sign in as an ordinary user and try to read someone else's records: on Firebase look for rules still in test mode, on Supabase fix everything the Security Advisor flags.",
        },
      ],
    },
    {
      id: "realtime-offline",
      heading: "Realtime and offline",
      blocks: [
        {
          type: "paragraph",
          text: "Realtime is close. Offline is Firebase's clearest win. Firestore's Android, iOS, Flutter and web SDKs cache data on the device, let users keep reading and writing with no connection, and sync when the signal comes back, with almost no code from you.",
        },
        {
          type: "paragraph",
          text: "Supabase has nothing equivalent built in. An offline-first app on Supabase needs a sync layer such as PowerSync or a local cache you write yourself, and conflict handling is where the time goes. For live features, Supabase Realtime streams Postgres changes and adds broadcast and presence, which covers chat, live dashboards and showing who's online. Firebase also bundles Cloud Messaging for push, Crashlytics for crash reports and Remote Config for feature switches into the same project, which on Supabase means separate services and more glue.",
        },
      ],
    },
    {
      id: "the-rule",
      heading: "The rule",
      blocks: [
        {
          type: "paragraph",
          text: "Choose Supabase unless the app must work offline on a phone. If it must, choose Firebase. If you're only testing demand with a throwaway prototype, use whichever your developer knows best.",
        },
        {
          type: "callout",
          title: "What we build with",
          text: "At Scryptic we usually build with TypeScript, Next.js and Postgres, through Supabase or another managed host, because most products are relational and any developer can pick up a Postgres database after us. For an offline-first field app, we'd tell you Firebase was the better fit.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Supabase a good Firebase alternative?",
      answer:
        "Yes, for most web apps and SaaS products. It covers the same ground, with a hosted database, auth, storage and functions, but uses Postgres instead of a NoSQL store. It is weaker than Firebase on offline sync and on mobile extras such as push notifications and crash reporting.",
    },
    {
      question: "Is Supabase cheaper than Firebase?",
      answer:
        "It depends on how your app reads data. Firebase charges for every Firestore document read, write and delete beyond a free daily allowance, so read-heavy apps get expensive quickly. Supabase charges a plan fee plus compute and usage, which is easier to forecast once you have real traffic.",
    },
    {
      question: "Can Firebase use SQL?",
      answer:
        "Yes, through Firebase SQL Connect, which launched as Data Connect. It runs a Cloud SQL for PostgreSQL database behind a GraphQL layer with generated SDKs. Firestore and the Realtime Database, which most Firebase apps use, are NoSQL and do not support SQL.",
    },
    {
      question: "Can I migrate from Firebase to Supabase?",
      answer:
        "Yes. You reshape exported Firestore data into Postgres tables, export Firebase Auth users with their password hashes, and rewrite security rules as row level security policies. Every Firebase call in the app also changes, so plan for a few weeks of work.",
    },
    {
      question: "Which is better for a mobile app, Supabase or Firebase?",
      answer:
        "Firebase, if the app needs to work offline or relies on push notifications and crash reporting. Supabase is fine for mobile apps that are usually online and have relational data, especially when they share a backend with a web app.",
    },
  ],
}
