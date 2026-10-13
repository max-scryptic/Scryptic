import type { BlogPost } from "@/lib/blog/types"

export const lovable: BlogPost = {
  slug: "migrate-from-lovable",
  title: "Migrating from Lovable to a production app",
  tool: "Lovable",
  category: "AI app builders",
  description:
    "How to take a Lovable prototype to production: what the exported code gives you, what it is missing, and a step by step plan to harden, test and launch it.",
  summary:
    "A Lovable app is real React and TypeScript code, so you rarely need to start again. Moving it to production means owning the repository and the Supabase project, locking down data access, adding tests and environments, and fixing the parts that only worked in the preview.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Yes, full source through GitHub sync" },
    { label: "Data export", value: "Already yours, in Supabase Postgres" },
    { label: "Usual approach", value: "Harden and extend, not rebuild" },
    { label: "Typical timeline", value: "3 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a Lovable app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when real people depend on the app, or are about to. Lovable is excellent for getting from an idea to a clickable, working product in days. It is not designed to be where a business with paying customers keeps its only copy of the code, its database and its release process.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Each new prompt fixes one thing and quietly breaks another, and you are spending more credits undoing changes than making them.",
            "You are about to take payments, store personal data or sign a customer who will ask how their data is protected.",
            "Pages are slow, or Google is not indexing pages you need to rank, because everything renders in the browser.",
            "A developer, investor or acquirer wants to review the code, and you are not sure what they will find.",
            "You need a feature the AI keeps getting wrong: complex permissions, background jobs, webhooks or an integration with a fussy API.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Lovable?",
      blocks: [
        {
          type: "paragraph",
          text: "Everything that matters. Lovable writes a standard React and TypeScript project built with Vite, styled with Tailwind CSS and shadcn/ui components, and it syncs that code to a GitHub repository you connect. The backend is Supabase: a Postgres database, authentication, file storage and edge functions.",
        },
        {
          type: "list",
          items: [
            {
              term: "Frontend code",
              text: "The whole React app, through two-way GitHub sync. Once it is in your own repository it runs anywhere a static site can.",
            },
            {
              term: "Database and auth",
              text: "If you connected your own Supabase project, it is already yours. If you used Lovable Cloud, plan to move the schema, data, storage buckets and secrets into a Supabase project you control.",
            },
            {
              term: "Server logic",
              text: "Supabase edge functions live in the repository alongside the frontend and can be deployed with the Supabase CLI.",
            },
            {
              term: "What stays behind",
              text: "Your prompt history, the visual editor and Lovable's hosting. None of these are needed to run the app.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "Lovable is one of the easiest tools to graduate from. There is no proprietary runtime to escape, so the work is quality and ownership, not translation.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Lovable app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "Most Lovable apps need security, structure and operations work before they can carry real users. The code runs, but it was written to make the preview work, not to survive production traffic, attackers or a second developer.",
        },
        {
          type: "list",
          items: [
            {
              term: "Row level security",
              text: "The browser talks to Supabase directly, so the database policies are the only thing stopping one user reading another's data. In 2025 researchers found many apps built this way with tables anyone could read. Every table needs a reviewed policy.",
            },
            {
              term: "Secrets in the right place",
              text: "Payment, email and AI provider keys belong in edge functions or a server, never in frontend code. Search the repository for anything that looks like a secret key.",
            },
            {
              term: "Server-side validation",
              text: "Forms validated only in the browser can be bypassed. Anything that costs money, sends email or changes another user's data should be checked on the server.",
            },
            {
              term: "Structure",
              text: "Generated components are often long, repeated and tightly coupled. Splitting them up and sharing data fetching makes every later change cheaper.",
            },
            {
              term: "Tests, environments and monitoring",
              text: "A staging environment, tests on the flows that make money, error tracking and database backups are rarely set up by default.",
            },
            {
              term: "Search visibility",
              text: "A Vite single page app renders in the browser. If marketing pages need to rank, move them to server rendering, often by porting the app to Next.js or putting the marketing site on its own.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Lovable app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Work in this order: take ownership, make it safe, make it maintainable, then launch. Each step leaves the app working, so you can keep showing it to users throughout.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Freeze and take ownership",
              text: "Sync to a GitHub repository in your own organisation, stop prompting changes into it, and make sure you own the Supabase project, domain and every third-party account.",
            },
            {
              term: "Audit",
              text: "List every table, policy, edge function, environment variable and integration. Note what the app actually does today, including the bits users rely on that nobody planned.",
            },
            {
              term: "Lock down data",
              text: "Turn on row level security everywhere, write and test a policy per table, and move any secret key out of the browser.",
            },
            {
              term: "Set up environments",
              text: "Create separate development, staging and production Supabase projects, manage the schema through migrations in the repository, and deploy previews for every change.",
            },
            {
              term: "Refactor where it hurts",
              text: "Untangle the components and data fetching you will touch most often. Leave stable, rarely changed screens alone.",
            },
            {
              term: "Add tests and monitoring",
              text: "Cover sign-up, sign-in, payment and the core workflow with automated tests, then add error tracking, uptime checks and backups.",
            },
            {
              term: "Decide on rendering",
              text: "If search traffic matters, move public pages to server rendering. If the app sits behind a login, the Vite build is fine.",
            },
            {
              term: "Cut over",
              text: "Point the domain at the new hosting, keep the Lovable project read-only for a few weeks as a fallback, then retire it.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Lovable migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are carrying on prompting after the handover, and assuming the database is safe because the app looks right.",
        },
        {
          type: "list",
          items: [
            "Editing in Lovable and in the repository at the same time, then fighting merge conflicts from the two-way sync.",
            "Changing the database in the Supabase dashboard instead of through migrations, so staging and production drift apart.",
            "Testing permissions only as an administrator. Sign in as an ordinary user, and as nobody, and try to read other people's records.",
            "Rewriting everything in a new framework on day one, when hardening the existing code would have shipped weeks sooner.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Lovable instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay while you are still testing the idea. If you are changing the product daily, have no paying users and no sensitive data, Lovable is the faster place to learn. Move once the product has settled enough that breaking it costs you customers or trust, and keep using Lovable for throwaway prototypes of new features if your team likes it.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Lovable?",
      answer:
        "Yes. Lovable syncs the full source of your app to a GitHub repository you connect. It is a standard React, TypeScript and Vite project that you can run, host and change without Lovable.",
    },
    {
      question: "Do I need to rebuild my Lovable app from scratch?",
      answer:
        "Usually not. Most Lovable apps are worth keeping and hardening: securing the database, moving secrets to the server, adding tests and environments, and refactoring the parts you change most. A rebuild only makes sense if the app has outgrown its original design.",
    },
    {
      question: "Is a Lovable app secure enough for production?",
      answer:
        "Not by default. Because the browser talks to Supabase directly, every table needs row level security policies that are reviewed and tested. Secret keys must live in edge functions or a server, never in the frontend.",
    },
    {
      question: "How long does it take to move a Lovable app to production?",
      answer:
        "Typically three to eight weeks, depending on how much the app does, how many user roles it has, and whether public pages need moving to server rendering for search.",
    },
  ],
}
