import type { BlogPost } from "@/lib/blog/types"

export const supabaseVsFirebase: BlogPost = {
  slug: "supabase-vs-firebase",
  title: "Supabase vs Firebase for a startup",
  series: "stack",
  topic: "Supabase",
  description:
    "Supabase vs Firebase for a startup: how the databases, auth, security rules, pricing, realtime and offline support differ, and when each is the better choice.",
  summary:
    "For most startups building a web app or SaaS product, pick Supabase: your data lives in Postgres, a relational SQL database you can query, report on and take anywhere. Pick Firebase when the product is a mobile app that has to work offline and you want push notifications, crash reporting and analytics from one place.",
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
      id: "which-to-choose",
      heading: "Supabase or Firebase: which should a startup choose?",
      blocks: [
        {
          type: "paragraph",
          text: "If you're building a web app or a SaaS product, choose Supabase. If you're building a mobile app that people will use on the Tube with no signal, choose Firebase. Both give you a hosted database, sign-in, file storage and server functions, so either will get an MVP live.",
        },
        {
          type: "paragraph",
          text: "What actually decides it is the database underneath. Supabase is Postgres. Firebase is, for most people, Firestore. Once you know whether your data is rows in related tables or documents in collections, the Supabase or Firebase question mostly answers itself.",
        },
      ],
    },
    {
      id: "core-difference",
      heading: "What is the core difference between Supabase and Firebase?",
      blocks: [
        {
          type: "paragraph",
          text: "Supabase is built on Postgres, a relational database you query with SQL. Firebase's main databases are NoSQL: Cloud Firestore stores JSON-like documents in collections, and the older Realtime Database stores one big JSON tree.",
        },
        {
          type: "paragraph",
          text: "That matters more than it sounds, because most startup software is relational. Users belong to teams, teams have subscriptions, subscriptions have invoices. Sooner or later someone asks for every customer whose trial ends this week and who hasn't added a card. In Postgres that's one query with a join. In Firestore there are no joins, so you copy data into several documents so each screen can read it in one go, then write code to keep the copies in step. That's where Firestore projects get messy: a team gets renamed and the old name still shows on half the screens.",
        },
        {
          type: "paragraph",
          text: "Postgres also gives you foreign keys, transactions, views for reporting and extensions such as pgvector for AI search, and any tool that speaks Postgres can connect to it.",
        },
        {
          type: "callout",
          title: "Firebase does have Postgres now",
          text: "Firebase SQL Connect, launched as Data Connect and renamed in 2026, puts a Cloud SQL for PostgreSQL database behind a GraphQL layer with generated client SDKs. It's a real option, but it's young, and nearly every Firebase tutorial and library still assumes Firestore. If you want Postgres, Supabase is the more established route today.",
        },
      ],
    },
    {
      id: "auth-and-security",
      heading: "How do authentication and security compare?",
      blocks: [
        {
          type: "paragraph",
          text: "Authentication is close to a draw. Security works differently: Firebase uses its own security rules language, and Supabase uses Postgres row level security written in SQL. On both, the app talks to the database straight from the browser or phone, so those rules are the only thing between one user and another user's data.",
        },
        {
          type: "paragraph",
          text: "Both support email and password, magic links, Google and Apple sign-in, SMS codes and multi-factor authentication. Firebase's anonymous accounts, which upgrade when the user signs up, suit apps that let people try before registering. Supabase keeps users in your own database, so a user is a row you can join to everything else.",
        },
        {
          type: "list",
          items: [
            {
              term: "Firebase security rules",
              text: "A rules file saying who can read or write each collection or path, which you can unit test locally with the Emulator Suite. Rules aren't filters: a query has to ask only for documents the user may see, or the whole query fails.",
            },
            {
              term: "Supabase row level security",
              text: "Policies on each table that Postgres checks on every query, usually against auth.uid(). More powerful, because a policy can look up other tables to check team membership. The catch is that a table with row level security switched off is readable by anyone holding your public key.",
            },
          ],
        },
        {
          type: "callout",
          title: "Check this before launch",
          text: "On Firebase, look for rules still in test mode, which allow every read and write until a set date. On Supabase, open the Security Advisor in the dashboard and fix every table it flags. Then sign in as an ordinary user and try to read someone else's records.",
        },
      ],
    },
    {
      id: "pricing",
      heading: "How do Firebase and Supabase pricing grow as you scale?",
      blocks: [
        {
          type: "paragraph",
          text: "Firebase charges Firestore per operation: on the pay as you go Blaze plan, every document read, write and delete above the free allowance costs money, along with storage and network transfer. Supabase charges a monthly plan per organisation, a compute size per project, and usage above each plan's quotas. So Firebase bills track how your app reads data, and Supabase bills track how big a database server you need.",
        },
        {
          type: "paragraph",
          text: "The per-read model is cheap when you're small. At the time of writing Firestore includes 50,000 free document reads a day. But do the sums on your busiest screen. A feed that loads 50 documents, opened 10 times a day by 1,000 users, is 500,000 reads a day before anyone scrolls. Live listeners count reads too, so a dashboard listening to a whole collection is billed for every change to it. And Google Cloud budgets send alerts; they don't stop the spending.",
        },
        {
          type: "paragraph",
          text: "Supabase grows in steps. The free plan pauses projects after a week of inactivity, so don't run anything real on it. Pro starts at about $25 a month at the time of writing, with some compute credit and a spend cap on by default. After that you pay for a bigger compute size when you need it, plus egress, storage or monthly active users above the quota. For a busy SaaS product the Supabase bill is easier to forecast. Check both pricing pages before you commit, because the numbers change.",
        },
      ],
    },
    {
      id: "realtime-offline-mobile",
      heading: "Which is better for realtime, offline and mobile apps?",
      blocks: [
        {
          type: "paragraph",
          text: "Firebase wins on offline and mobile. Realtime is close. Firestore's Android, iOS and Flutter SDKs cache data on the device, let users keep reading and writing with no connection, and sync when the signal comes back, with almost no code from you. Supabase has nothing built in. An offline-first app on Supabase needs a sync layer such as PowerSync, or a local cache you write yourself, and conflict handling is where that time goes.",
        },
        {
          type: "paragraph",
          text: "For realtime, Firestore listeners push changes to every connected client. Supabase Realtime streams Postgres changes and adds broadcast and presence, which is plenty for chat, live dashboards and showing who's online.",
        },
        {
          type: "paragraph",
          text: "Firebase also bundles mobile extras into the same project, which on Supabase means separate services and more glue:",
        },
        {
          type: "list",
          items: [
            "Cloud Messaging for push notifications on Android, iOS and the web.",
            "Crashlytics for crash reports with stack traces from real devices.",
            "Remote Config for switching features on and off without an app store release.",
            "App Check to make it harder for anything other than your real app to call your backend.",
          ],
        },
      ],
    },
    {
      id: "lock-in",
      heading: "Can you self-host Supabase or Firebase, and how hard is it to leave?",
      blocks: [
        {
          type: "paragraph",
          text: "Supabase is open source and you can self-host it. Firebase is proprietary and only runs on Google. This is the biggest long-term difference between them, and the main reason people go looking for a Firebase alternative.",
        },
        {
          type: "paragraph",
          text: "Leaving Supabase is mostly a pg_dump and a restore. Your schema, data and policies are standard Postgres, so they move to any managed Postgres host, or to the Supabase stack in Docker on your own servers. You'd still replace Auth, Storage and Edge Functions, but the data, which is the part that hurts to move, comes with you untouched.",
        },
        { type: "paragraph", text: "Leaving Firebase is a proper migration:" },
        {
          type: "list",
          ordered: true,
          items: [
            "Export Firestore collections and redesign the documents as tables, undoing the duplicated data as you go.",
            "Export users from Firebase Auth. The export includes password hashes, so accounts can move without a forced reset if the new system supports Firebase's hashing.",
            "Rewrite the security rules as row level security policies or server-side checks, and test each one.",
            "Replace every Firestore and Firebase SDK call in the app, which is usually the longest step because they're spread across every screen.",
          ],
        },
        {
          type: "paragraph",
          text: "It's doable, but it's weeks of work, not a setting. Make the choice on purpose at the start.",
        },
      ],
    },
    {
      id: "when-each-wins",
      heading: "When is each the better choice?",
      blocks: [
        {
          type: "paragraph",
          text: "Firebase vs Supabase is rarely a close call once you know two things: what shape your data is, and where your users are.",
        },
        {
          type: "list",
          items: [
            {
              term: "Supabase",
              text: "Web apps and SaaS products, anything with teams, roles, billing and reporting, AI features that search your own data, and any founder who wants to be able to leave without a rewrite.",
            },
            {
              term: "Firebase",
              text: "Mobile-first apps that must work offline, products that need push and crash reporting from day one, data that really is document shaped, and teams who already know Firestore well.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "For a quick prototype to test demand, use whichever your developer knows best. At Scryptic we usually build with TypeScript, Next.js and Postgres, through Supabase or another managed host, because most products are relational and any developer can pick up a Postgres database after us. For an offline-first field app, we'd say Firebase was the better fit.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Supabase a good Firebase alternative?",
      answer:
        "Yes, for most web apps and SaaS products. It covers the same ground but uses Postgres instead of a NoSQL store. It's weaker than Firebase on offline sync and mobile extras such as push notifications.",
    },
    {
      question: "Is Supabase cheaper than Firebase?",
      answer:
        "It depends on how your app reads data. Firebase charges for every document read, write and delete beyond a free daily allowance, so read-heavy apps get expensive quickly. Supabase charges a plan fee plus compute and usage, which is easier to forecast once you have real traffic.",
    },
    {
      question: "Can Firebase use SQL?",
      answer:
        "Yes, through Firebase SQL Connect, which launched as Data Connect. It runs a Cloud SQL for PostgreSQL database behind a GraphQL layer with generated SDKs. Firestore and Realtime Database, the databases most Firebase apps use, are NoSQL and don't support SQL.",
    },
    {
      question: "Can I migrate from Firebase to Supabase?",
      answer:
        "Yes. You reshape exported Firestore data into Postgres tables, export Firebase Auth users with their password hashes, and rewrite security rules as row level security policies. Every Firebase call in the app also changes, so plan a few weeks.",
    },
    {
      question: "Which is better for a mobile app, Supabase or Firebase?",
      answer:
        "Firebase, if the app needs to work offline or relies on push notifications and crash reporting. Supabase is fine for mobile apps that are usually online and have relational data, especially when they share a backend with a web app.",
    },
  ],
}
