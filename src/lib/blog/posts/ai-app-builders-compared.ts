import aiBuildersWhatYouTake from "@/assets/blog/images/ai-builders-what-you-take.webp"
import aiBuildersWhereAccessIsChecked from "@/assets/blog/images/ai-builders-where-access-is-checked.webp"
import type { BlogPost } from "@/lib/blog/types"

export const aiAppBuildersCompared: BlogPost = {
  slug: "lovable-vs-bolt-vs-replit-vs-base44-vs-v0",
  title: "Lovable vs Bolt vs Replit vs Base44 vs v0",
  series: "migration",
  topic: "AI builder",
  icon: "scale",
  category: "AI app builders",
  description:
    "Lovable, Bolt and Replit hand over an app and database you can own. v0 and Base44 hand over screens. What each exports and the work left before launch.",
  summary:
    "Lovable vs Bolt is the closest contest of the five: both hand over a full app whose data sits in Supabase, and Replit Agent hands over a full app on its own Postgres. v0 and Base44 give you screens. v0 leaves most of the backend unbuilt, and Base44 keeps its backend on its own servers when you leave. For a production app, that split decides the budget more than any demo does.",
  datePublished: "2026-11-08",
  facts: [
    { label: "Whole app to keep", value: "Lovable, Bolt and Replit Agent" },
    { label: "Screens to keep", value: "v0 and Base44" },
    { label: "Gap in all five", value: "Access rules nobody has tested" },
    { label: "Typical work to launch", value: "3 to 8 weeks" },
  ],
  sections: [
    {
      id: "closest-to-production",
      heading: "Which AI app builder leaves you closest to production?",
      blocks: [
        {
          type: "paragraph",
          text: "Lovable, Bolt or Replit Agent. Each one hands over screens and backend together, with a database you can move into accounts your business owns. A demo only shows you the prompt box and the first screens. Once the app holds customer data, what matters is what happens to the backend when you stop prompting, and how long it takes to make that backend safe.",
        },
        {
          type: "table",
          caption: "Lovable, Bolt, Replit Agent, v0 and Base44 compared on export, data, sign-in and the work left before launch",
          columns: ["Builder", "What you can export", "Where the data lives", "Sign-in", "Work before launch"],
          rows: [
            [
              "Lovable",
              "The full React and TypeScript source, synced to GitHub",
              "Your own Supabase project, or Lovable Cloud, which runs on Supabase",
              "Supabase Auth",
              "Hardening, 3 to 8 weeks",
            ],
            [
              "Bolt",
              "The full project, in whichever framework you picked, most often React with Vite",
              "Bolt Database, built on Supabase, until you claim it",
              "Supabase Auth",
              "Hardening, 3 to 8 weeks",
            ],
            [
              "Replit Agent",
              "Usually a React frontend and a Node.js server",
              "Replit's built-in Postgres",
              "Replit Auth, which needs a Replit account",
              "Hardening, 3 to 8 weeks",
            ],
            [
              "v0",
              "Next.js screens built with React and shadcn/ui",
              "Often nowhere yet, as many screens run on sample data",
              "Usually not built yet",
              "Building the backend, 4 to 8 weeks",
            ],
            [
              "Base44",
              "The React frontend, on paid plans from Builder upwards",
              "Base44's managed database, reached through its SDK",
              "Base44's own, and passwords don't come with the export",
              "Rebuilding the backend, 4 to 8 weeks",
            ],
          ],
        },
      ],
    },
    {
      id: "app-or-screens",
      heading: "Three hand over an app, two hand over screens",
      blocks: [
        {
          type: "paragraph",
          text: "That split sets your budget. When the builder hands over a backend you can claim, a developer spends the first weeks checking and tightening it. When it hands over screens, those weeks go on designing a database and the API the screens will call.",
        },
        {
          type: "image",
          image: aiBuildersWhatYouTake,
          alt: "Lovable, Bolt and Replit Agent let you take code and a database with you; v0 and Base44 leave you with screens.",
        },
        {
          type: "paragraph",
          text: "On screen, the five are closer than they look. Most of what they write is React, and Lovable, v0 and Base44 style it with Tailwind CSS, so a developer who knows one export can find their way around another. Choosing on looks puts the weight on the part a developer can restyle after launch, while a backend that can't leave the builder has to be built again.",
        },
        {
          type: "paragraph",
          text: "If you're weighing a rebuild, the free MVP Cost Calculator turns eight answers about your app into a rough estimate in development weeks and pounds, priced on the fixed-price sprints we run.",
          link: { text: "Estimate a rebuild with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
      ],
    },
    {
      id: "lovable-vs-bolt",
      heading: "Lovable vs Bolt when both run on Supabase",
      blocks: [
        {
          type: "paragraph",
          text: "These two are the closest pair. Both hand over a standard frontend that runs without the builder, and in both the browser talks straight to a Supabase database. So both start with the same job: switch on row level security for every table, then test it by signing in as one user and asking for another user's rows.",
          link: { text: "Seven things to fix before a Bolt.new app goes live.", href: "/blog/migrate-from-bolt" },
        },
        {
          type: "list",
          items: [
            "Lovable writes the same stack for every app: React and TypeScript, built with Vite and styled with Tailwind CSS and shadcn/ui. Bolt lets you pick the framework, which helps if your developer prefers something else, and means two Bolt apps can differ a lot underneath.",
            "Bolt runs your project in a WebContainer inside the browser tab, so the first test of a Bolt app is a clean install and production build on another machine. Lovable syncs code with your GitHub repository in both directions, which is handy until a developer and a prompt edit the same file.",
            "The database moves in different ways. A Lovable app connected to your own Supabase project from the start is already yours, while one on Lovable Cloud needs moving out before launch. A Bolt app's database is claimed into your Supabase organisation, and connecting a fresh project instead can lose data.",
            "Bolt's one-click deploy puts the site on Netlify or Bolt's own hosting, sometimes in an account nobody on your team can open. A Lovable app usually moves to a host of your choosing, such as Vercel or Netlify, once the code is in your repository.",
          ],
        },
        {
          type: "paragraph",
          text: "For a new product, start in Lovable with your own Supabase project connected on day one, unless you already know you want something other than React with Vite. If you do, start in Bolt and claim the database before the first real user signs up.",
          link: { text: "The phased runbook for taking a Lovable app live.", href: "/blog/migrate-from-lovable" },
        },
      ],
    },
    {
      id: "replit-access-checks",
      heading: "Where Replit Agent puts the access check",
      blocks: [
        {
          type: "paragraph",
          text: "On the server, between the browser and the database, which moves the security work to a different place. In a Lovable app, the policy on each table decides who sees what. In a Replit app it's the code in each server route, and a route that only checks someone is signed in will return any record to any user who changes the ID in the request.",
        },
        {
          type: "image",
          image: aiBuildersWhereAccessIsChecked,
          alt: "In Lovable and Bolt a policy on each table guards the data; in Replit Agent a check in each server route does.",
        },
        {
          type: "paragraph",
          text: "Table policies all sit in the Supabase dashboard, and its security advisor flags any table with row level security switched off. Server routes have no equivalent list, so someone has to read every route that takes an ID.",
        },
        {
          type: "paragraph",
          text: "Sign-in differs too. Replit Auth signs people in with a Replit account, which suits a product for developers who may already have one. For a customer-facing app, plan to swap it for a hosted sign-in provider, along with a way to move existing users across.",
        },
        {
          type: "paragraph",
          text: "Hosting is where Replit asks less of you than Lovable does. Replit Deployments can run a production app, scheduled jobs included, so leaving Replit is optional.",
          link: { text: "The week by week plan for a Replit Agent app.", href: "/blog/migrate-from-replit" },
        },
      ],
    },
    {
      id: "v0",
      heading: "v0 when the interface is the hard part",
      blocks: [
        {
          type: "paragraph",
          text: "v0, from Vercel, is built around the screens and does far less behind them. Its output is a Next.js project any web developer can pick up, but many v0 screens show sample data, and some buttons look as if they save without storing anything. v0 can hook up Neon or Supabase through Vercel, but the schema and the server checks are still yours to design.",
        },
        {
          type: "paragraph",
          text: "Public pages are where v0 starts ahead. Next.js can render a page on the server, so search engines and AI assistants receive finished HTML. Lovable and most Bolt projects are Vite apps that build each page in the browser, which is fine behind a login and a handicap for a landing page that needs to rank. The free Agent Readiness Check scans any website to see whether AI agents such as ChatGPT and Claude can crawl, read, understand and cite it.",
          link: { text: "Scan your public pages with the Agent Readiness Check.", href: "/tools/agent-readiness-check" },
        },
        {
          type: "paragraph",
          text: "Next to Bolt, v0 wins when the interface is what's hard about the product and a developer will build the backend anyway. If you want a working app with a database behind it straight from your prompts, Bolt gets you further.",
          link: { text: "Find out which v0 screens still run on sample data.", href: "/blog/migrate-from-v0" },
        },
      ],
    },
    {
      id: "base44",
      heading: "Base44 makes starting easy and leaving slow",
      blocks: [
        {
          type: "paragraph",
          text: "Base44 needs the least set-up on day one. Its database, sign-in, file storage and backend functions are built in, with nothing to connect, which suits internal tools and early tests of an idea.",
        },
        {
          type: "paragraph",
          text: "Leaving is where the cost sits. Only the React frontend exports, and it still calls Base44 through the Base44 SDK, so most screens stop working once the plan is cancelled. Backend functions are written for Deno against that SDK and have to be rewritten for your own server.",
        },
        {
          type: "callout",
          title: "Plan launch day around your users",
          text: "Base44's data export has user records but no password hashes, so every user needs a password reset or a sign-in link on launch day. Uploaded files are stored on Base44 too, and are copied to your own storage as a separate job.",
        },
        {
          type: "paragraph",
          text: "Against Lovable, the whole difference sits in the backend. Lovable's is a Supabase project you can own outright, while Base44's has to be built again behind the screens you keep.",
          link: { text: "What moving a Base44 app to your own backend involves.", href: "/blog/migrate-from-base44" },
        },
      ],
    },
    {
      id: "before-launch",
      heading: "What every AI-built app still needs before launch",
      blocks: [
        {
          type: "paragraph",
          text: "Fixing access checks is where hardening starts. Secret keys also tend to end up in code the browser downloads, and the accounts often sit in one founder's personal login. AI-built apps usually ship with no staging copy of the database and no tests on the paths that take money, too. The guides linked above set out the order of work for each builder.",
        },
        {
          type: "paragraph",
          text: "We fix these in fixed-price sprints, hardening the apps worth keeping and rebuilding the backend where it has to move.",
          link: { text: "Compare our two fixed-price packages.", href: "/#pricing" },
        },
        {
          type: "paragraph",
          text: "Whoever does the work, set the day prompting stops. From then on, changes go through the repository, and the builder becomes a sketchpad for trying a new screen before a developer builds it properly.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is it worth moving an app from one AI builder to another?",
      answer:
        "Rarely. What stops an app reaching production, such as untested access rules or exposed keys, lives in the app's code and settings, so it moves with the app. Moving the code into your own repository and having a developer harden it does more than switching builders.",
    },
    {
      question: "Can you launch an AI-built app without a developer?",
      answer:
        "For a prototype or an internal tool used by colleagues, often yes. Once the app stores customers' personal data or takes payments, have a developer review it first, because the gaps that matter most, such as who can read which rows, don't show up in the builder's preview.",
    },
  ],
}
