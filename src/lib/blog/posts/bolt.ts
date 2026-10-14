import boltLogo from "@/assets/blog/logos/bolt.svg"
import type { BlogPost } from "@/lib/blog/types"

export const bolt: BlogPost = {
  slug: "migrate-from-bolt",
  title: "Migrating from Bolt.new to a production app",
  series: "migration",
  topic: "Bolt.new",
  logo: boltLogo,
  category: "AI app builders",
  description:
    "Moving a Bolt.new app to production: how to get the code and Bolt Database out, what the app needs before real users arrive, and a step by step migration plan.",
  summary:
    "Bolt.new writes ordinary JavaScript and TypeScript projects, so the code you built is yours to keep and improve. Moving to production means putting that code in your own GitHub repository, claiming the database into a Supabase account you control, and adding the security, testing and hosting setup that a browser preview never needed.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Yes, GitHub sync or a ZIP download" },
    { label: "Data export", value: "Claim Bolt Database into Supabase" },
    { label: "Usual approach", value: "Harden and extend, not rebuild" },
    { label: "Typical timeline", value: "3 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a Bolt.new app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "Move when the app stops being an experiment and starts carrying real customers, real money or real data. Bolt.new is very quick at turning a prompt into a running full stack app in your browser, but that environment is built for trying things, not for running a business.",
        },
        { type: "paragraph", text: "These are the usual signs:" },
        {
          type: "list",
          items: [
            "Prompts that used to take seconds now loop on the same error, and a growing share of your tokens goes on repairs.",
            "You need a second developer, and they want to work in their own editor with branches, reviews and tests.",
            "A customer, investor or partner is asking about security, backups or where their data is stored.",
            "You need things that are awkward to build by prompting: scheduled jobs, webhooks from payment providers, role based permissions or a mobile release.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Bolt.new?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take out all of the code and, with a little care, all of the data. Bolt runs projects in StackBlitz WebContainers, a Node.js environment inside the browser, and the files it writes are a normal project for whichever framework you chose, often React with Vite, sometimes Next.js, Astro or an Expo app.",
        },
        {
          type: "list",
          items: [
            {
              term: "Source code",
              text: "Connect GitHub and Bolt creates a repository and pushes changes to it, or download the project as a ZIP file from the project menu. A connected repository is better, because it keeps a full history outside Bolt.",
            },
            {
              term: "Database and auth",
              text: "Newer projects use Bolt Database, which is built on Supabase. You can claim it into a Supabase organisation you own, which keeps the data in place. If you connected your own Supabase project from the start, it is already yours.",
            },
            {
              term: "Server logic",
              text: "Supabase edge functions and SQL migration files usually sit in the project, so they travel with the code and can be deployed with the Supabase CLI.",
            },
            {
              term: "What stays behind",
              text: "Your chat history, Bolt's version history and Bolt's built-in hosting. The published address on Bolt hosting does not move, so plan for a custom domain you control.",
            },
          ],
        },
        {
          type: "callout",
          title: "Check the database claim first",
          text: "Before you cancel anything, confirm with Bolt what a claim moves for your project: tables, user accounts, stored files and secrets. Bolt also warns that connecting a different Supabase project to an app that already has a Bolt Database replaces the connection and can lose data, so claim rather than reconnect.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Bolt.new app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "It usually needs security work, a proper hosting and environment setup, and tests. The app ran in a browser sandbox where the only user was you, so nothing forced it to handle hostile input, many users at once or a bad deploy.",
        },
        {
          type: "list",
          items: [
            {
              term: "Database access rules",
              text: "The frontend talks to Supabase directly, so row level security policies decide who can read and change each row. Check that every table has policies and that they match your real roles.",
            },
            {
              term: "Secrets out of the frontend",
              text: "Keys for payments, email and AI providers must live in edge functions or a server. Also check that no .env file with real keys has been committed to the repository.",
            },
            {
              term: "Behaviour outside the browser sandbox",
              text: "WebContainers cannot run native binaries, so a few packages behave differently once deployed to a real server. Run a clean install and a production build on your own machine and fix whatever breaks.",
            },
            {
              term: "Code structure",
              text: "Long prompt sessions leave large files, copied logic and half removed features. Tidy the parts you will keep changing so the next developer can work quickly.",
            },
            {
              term: "Environments and operations",
              text: "Separate development, staging and production, schema changes through migrations, error tracking, uptime checks and tested backups.",
            },
            {
              term: "Search and performance",
              text: "If you built with Vite, public pages render in the browser. Pages that need to rank should be server rendered or served from a separate marketing site.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Bolt.new app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Take ownership first, then make it safe, then make it pleasant to change, and only then switch the domain. Done in this order, the live app keeps working at every stage.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Connect GitHub and stop prompting",
              text: "Push the project to a repository owned by your organisation, not a personal account, and agree a date after which changes happen in code rather than in Bolt.",
            },
            {
              term: "Claim the backend",
              text: "Claim Bolt Database into your own Supabase organisation, then check the tables, users, storage buckets and edge function secrets against what the live app uses.",
            },
            {
              term: "Run it locally",
              text: "Install dependencies from scratch, build for production and run the app on your own machine. This is where sandbox only behaviour shows up.",
            },
            {
              term: "Secure the data",
              text: "Review row level security on every table, move secret keys server side and add server checks for anything that charges money or sends messages.",
            },
            {
              term: "Set up environments and hosting",
              text: "Create staging and production Supabase projects, keep schema changes in migration files, and deploy from GitHub to a host such as Netlify or Vercel with preview builds for each change.",
            },
            {
              term: "Refactor and test the core flows",
              text: "Clean up the screens you change most and add automated tests for sign-up, sign-in, payments and the main job your app does.",
            },
            {
              term: "Add monitoring",
              text: "Turn on error tracking, uptime alerts and scheduled backups before real users arrive, not after the first incident.",
            },
            {
              term: "Move the domain",
              text: "Point your domain at the new hosting, redirect any old Bolt address you shared, and keep the Bolt project untouched for a few weeks as a reference.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Bolt.new migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "Most problems come from losing track of which copy is the real one, or from moving data in a way that drops part of it.",
        },
        {
          type: "list",
          items: [
            "Connecting a fresh Supabase project instead of claiming the existing database, and finding the live data is no longer attached.",
            "Carrying on prompting in Bolt after developers have started work in the repository, so two versions drift apart.",
            "Assuming the preview proves the app works. Code that ran inside WebContainers can still fail a clean production build.",
            "Committing real API keys to GitHub along with the code, then having to rotate them all.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Bolt.new instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay while you are still finding out what to build. If the app is a demo, an internal tool for a handful of people or an idea you are testing with early users, Bolt and Bolt Cloud are a fast and reasonable home for it. Move when a failure would cost you customers, money or trust, and keep using Bolt to sketch new features before they are built properly.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Bolt.new?",
      answer:
        "Yes. You can connect GitHub so Bolt pushes the project to a repository you own, or download it as a ZIP file. The result is a standard project for the framework you chose, such as React with Vite, and it runs without Bolt.",
    },
    {
      question: "Do I need to rebuild my Bolt.new app from scratch?",
      answer:
        "Usually not. Most Bolt apps can be kept and hardened: securing the database, moving secrets to the server, cleaning up the busiest code and adding tests. A rebuild only makes sense when the app's basic design no longer fits what the business needs.",
    },
    {
      question: "How do I get my data out of Bolt Database?",
      answer:
        "Claim the database into a Supabase organisation you own. Bolt Database is built on Supabase, so claiming keeps your tables in place. Confirm with Bolt what the claim covers for your project, including user accounts and stored files, before cancelling anything.",
    },
    {
      question: "How long does it take to move a Bolt.new app to production?",
      answer:
        "Typically three to eight weeks, depending on how many features and user roles the app has, how much of the code needs tidying, and whether public pages need server rendering for search.",
    },
  ],
}
