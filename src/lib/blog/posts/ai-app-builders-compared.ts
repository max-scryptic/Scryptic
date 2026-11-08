import aiBuildersWhatYouTake from "@/assets/blog/images/ai-builders-what-you-take.webp"
import aiBuildersWhereAccessIsChecked from "@/assets/blog/images/ai-builders-where-access-is-checked.webp"
import type { BlogPost } from "@/lib/blog/types"

export const aiAppBuildersCompared: BlogPost = {
  slug: "lovable-vs-bolt-vs-replit-vs-base44-vs-v0",
  title: "Lovable vs Bolt vs Replit vs Base44 vs v0 for production",
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
          text: "Lovable, Bolt or Replit Agent. Each one hands over screens and backend together, with a database you can move into accounts your business owns. A demo only shows you the prompt box and the first screens. Once the app holds customer data, what matters is what happens to the backend when you stop prompting.",
        },
        {
          type: "paragraph",
          text: "The table shows what each builder lets you take away and how much work stands between that export and a launch.",
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
            "Lovable writes one stack every time: React and TypeScript, built with Vite and styled with Tailwind CSS and shadcn/ui. Bolt lets you pick the framework, which helps if your developer prefers something else, and means two Bolt apps can differ a lot underneath.",
            "Bolt runs your project in a WebContainer inside the browser tab, so the first test of a Bolt app is a clean install and production build on another machine. Lovable syncs code with your GitHub repository in both directions, which is handy until a developer and a prompt edit the same file.",
            "The database moves in different ways. A Lovable app connected to your own Supabase project from the start is already yours, while one on Lovable Cloud needs moving out before launch. A Bolt app's database is claimed into your Supabase organisation, and connecting a fresh project instead can lose data.",
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
      id: "lovable-vs-replit",
      heading: "Lovable vs Replit, and where the access check lives",
      blocks: [
        {
          type: "paragraph",
          text: "Replit Agent puts a server between the browser and the database, so the security work moves to a different place. In a Lovable app, the policy on each table decides who sees what. In a Replit app it's the code in each server route, and a route that only checks someone is signed in will return any record to any user who changes the ID in the request.",
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
          text: "Hosting is where Replit asks less of you. Replit Deployments can run a production app, scheduled jobs included, so leaving Replit is optional. A Lovable app usually moves to a host such as Vercel or Netlify once its code lives in your repository.",
          link: { text: "The week by week plan for a Replit Agent app.", href: "/blog/migrate-from-replit" },
        },
      ],
    },
    {
      id: "bolt-vs-v0",
      heading: "Bolt vs v0 when the interface is the hard part",
      blocks: [
        {
          type: "paragraph",
          text: "v0, from Vercel, is built around the screens and does far less behind them. Its output is a Next.js project any web developer can pick up, but many v0 screens show sample data, and some buttons look as if they save without storing anything. v0 can hook up Neon or Supabase through Vercel, but the schema and the server checks are still yours to design.",
        },
        {
          type: "paragraph",
          text: "Next to Bolt, v0 wins in one situation: the interface is what's hard about the product, and a developer will build the backend anyway. If you want a working app with a database behind it straight from your prompts, Bolt gets you further.",
          link: { text: "Find out which v0 screens still run on sample data.", href: "/blog/migrate-from-v0" },
        },
      ],
    },
    {
      id: "base44-vs-lovable",
      heading: "Base44 vs Lovable, and the price of an easy start",
      blocks: [
        {
          type: "paragraph",
          text: "Base44 needs the least set-up on day one. Its database, sign-in, file storage and backend functions are built in, with nothing to connect, which suits internal tools and early tests of an idea. Leaving costs more:",
        },
        {
          type: "list",
          items: [
            "Only the React frontend exports, and it still calls Base44 through the Base44 SDK, so most screens stop working if you cancel the plan.",
            "Backend functions are written for Deno against that SDK, so each one is rewritten for your own server.",
            "The data export includes user records but not password hashes, so every user sets a new password or gets a sign-in link at launch.",
            "Uploaded files are stored on Base44 and have to be downloaded and copied to your own storage separately.",
          ],
        },
        {
          type: "paragraph",
          text: "Against Lovable, the whole difference sits in the backend. Lovable's is a Supabase project you can own outright, while Base44's has to be built again behind the screens you keep.",
          link: { text: "What moving a Base44 app to your own backend involves.", href: "/blog/migrate-from-base44" },
        },
      ],
    },
    {
      id: "starting-a-new-product",
      heading: "Which one should a new product start in?",
      blocks: [
        {
          type: "paragraph",
          text: "Choose by where the app has to end up, because that decides how much of the prototype survives.",
        },
        {
          type: "list",
          items: [
            "If customers will store personal data in it, use Lovable with your own Supabase project connected before the first prompt, not Lovable Cloud.",
            "If you or your developer want a framework other than React with Vite, use Bolt and claim the database early.",
            "If your users are developers, or you want the app and its scheduled jobs hosted where they were built, Replit Agent fits.",
            "If the design is what sells the product and someone will build the backend, v0 is the one made for that.",
            "If it's an internal tool, or a test you may well throw away, Base44 has the least to set up.",
          ],
        },
        {
          type: "paragraph",
          text: "Scope matters as much as the builder. A first release that does one job completely has less to harden than one that does six jobs halfway. In the free MVP Scope Planner you list the features you want and size each one, and it sorts them into a first release and a later list.",
          link: { text: "Size your feature list in the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
      ],
    },
    {
      id: "before-launch",
      heading: "What every AI-built app still needs before launch",
      blocks: [
        {
          type: "paragraph",
          text: "The same gaps turn up whichever of the five built the app, because they come from building by prompt. Nobody has tried the access rules as a second user, and secret keys sit in the browser. The accounts are often in one founder's personal login. There's usually no staging copy of the database, and nothing tests the paths that take money. You can find all of them yourself in an afternoon.",
          link: { text: "Run the seven-point production audit for vibe-coded apps.", href: "/blog/vibe-coding-to-production" },
        },
        {
          type: "paragraph",
          text: "Then set the day prompting stops. From that day changes go through the repository, and the builder becomes a sketchpad for trying a new screen before a developer builds it properly.",
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
      question: "Which AI app builder is best for SEO?",
      answer:
        "v0, as it comes, because it writes Next.js, which can render public pages on the server. Lovable writes a Vite single page app that renders in the browser, which is fine behind a login and a handicap for pages that need to rank, and most Bolt projects take the same shape. With any of them, a common fix is a separate marketing site with the app on a subdomain.",
    },
  ],
}
