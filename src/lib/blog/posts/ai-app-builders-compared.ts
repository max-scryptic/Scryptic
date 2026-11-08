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
    "Lovable vs Bolt vs Replit vs Base44 vs v0 for a production app: what each one exports, where your data lives and the work left before real users sign in.",
  summary:
    "Lovable, Bolt and Replit Agent hand over a whole app with a database you can move into your own accounts, so the work after the prototype is hardening it. v0 gives you polished Next.js screens with little behind them, and Base44 exports only the interface while its database, sign-in and functions stay on Base44. For a production app, Lovable vs Bolt and every other pairing here comes down to what you can own at launch.",
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
          text: "Lovable, Bolt or Replit Agent, because each one hands over the whole app: the interface, the logic behind it and a database you can move into accounts your business owns. Most comparisons score the prompt box and how good the first screens look, which is fair for a weekend prototype. Once the app holds customer data, what matters is what happens to the backend when you stop prompting.",
        },
        {
          type: "paragraph",
          text: "The table shows what each builder lets you take away and what still stands between that export and a launch. The durations are for a typical first release.",
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
              "The full project in the framework you chose, often React with Vite",
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
          text: "That split sets your budget more than anything else in the table. When the builder hands over a backend you can claim, a developer spends the first weeks checking and tightening it. When it hands over screens, those weeks go on designing a database and an API for the screens to call.",
        },
        {
          type: "image",
          image: aiBuildersWhatYouTake,
          alt: "Lovable, Bolt and Replit Agent let you take code and a database with you; v0 and Base44 leave you with screens.",
        },
        {
          type: "paragraph",
          text: "The screens are where the five are most alike. Most of what they write is React, and Lovable, v0 and Base44 all style it with Tailwind CSS, so a developer who has worked on one export can find their way around another. That makes the look of the first screens a weak reason to choose, since it's the part that's cheapest to change later.",
        },
      ],
    },
    {
      id: "lovable-vs-bolt",
      heading: "Lovable vs Bolt when both run on Supabase",
      blocks: [
        {
          type: "paragraph",
          text: "These two are the closest pair. Both give you a standard frontend that runs without the builder, and both keep data in Supabase, where the browser talks to the database directly. That puts the same job at the top of both lists: a row level security policy on every table, tested by signing in as one user and asking for another user's rows.",
          link: { text: "Seven things to fix before a Bolt.new app goes live.", href: "/blog/migrate-from-bolt" },
        },
        {
          type: "list",
          items: [
            "Lovable writes the same stack every time: React and TypeScript with Vite, Tailwind CSS and shadcn/ui. Bolt lets you pick the framework, which helps if your developer prefers something else and means two Bolt apps can be built quite differently underneath.",
            "Bolt runs your project in a WebContainer inside the browser tab, so the first test of a Bolt app is a clean install and production build on another machine. Lovable syncs its code to your GitHub repository both ways, which is handy until a developer and a prompt change the same file.",
            "The database moves differently. If you connected your own Supabase project to Lovable at the start, it's already yours; if you used Lovable Cloud, plan a move out before launch. With Bolt you claim Bolt Database into your own Supabase organisation, and connecting a fresh project instead can lose data.",
          ],
        },
        {
          type: "paragraph",
          text: "For a new product, start in Lovable with your own Supabase project connected from day one, unless you already know you want a framework other than React with Vite. If you do, use Bolt and claim the database before the first real user signs up.",
          link: { text: "How to take a Lovable app to production without rebuilding it.", href: "/blog/migrate-from-lovable" },
        },
      ],
    },
    {
      id: "lovable-vs-replit",
      heading: "Lovable vs Replit, and where the access check lives",
      blocks: [
        {
          type: "paragraph",
          text: "Replit Agent puts a server between the browser and the database, which moves the security work rather than removing it. In a Lovable app, the policy on each table decides who sees what. In a Replit app it's the code in each server route, and a route that only checks someone is signed in will return any record to any user who changes the ID in the request.",
        },
        {
          type: "image",
          image: aiBuildersWhereAccessIsChecked,
          alt: "In Lovable and Bolt a policy on each table guards the data; in Replit Agent a check in each server route does.",
        },
        {
          type: "paragraph",
          text: "Table policies all sit in the Supabase dashboard, and its security advisor flags any table with row level security switched off. Route checks have no such list, so someone has to read every route that takes an ID. The bigger differences for a founder are in sign-in and hosting.",
        },
        {
          type: "paragraph",
          text: "Replit Auth signs people in with a Replit account. That suits a product for developers, who may already have one, and adds a hurdle for everyone else, so a customer-facing Replit app usually needs a hosted sign-in provider and a plan for moving existing users across. Hosting goes the other way: Replit Deployments can run a production app, scheduled jobs included, so leaving Replit is optional. A Lovable app usually moves to a host such as Vercel or Netlify once its code lives in your repository.",
          link: { text: "Getting a Replit Agent app ready for production, week by week.", href: "/blog/migrate-from-replit" },
        },
      ],
    },
    {
      id: "bolt-vs-v0",
      heading: "Bolt vs v0 when the interface is the hard part",
      blocks: [
        {
          type: "paragraph",
          text: "v0, from Vercel, puts nearly all of its effort into what users see. Its output is a Next.js project that any web developer can pick up, but many v0 screens show sample data, and some buttons look as if they save without saving anywhere. v0 can attach a database through Vercel's integrations, such as Neon or Supabase, and attaching one still leaves the tables, permissions and server checks to design.",
        },
        {
          type: "paragraph",
          text: "Next to Bolt, that makes v0 the better pick in one situation: the interface is what's hard about the product, and a developer will build the backend anyway, ideally on Vercel. If you want a whole working app from your prompts, with a database behind it, Bolt gets you further.",
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
          text: "Base44 asks the least of you on day one. The database, sign-in, file storage and backend functions are built in, with nothing to connect, which is why it works well for internal tools and early tests of an idea. You pay for that convenience when you leave:",
        },
        {
          type: "list",
          items: [
            "Only the React frontend exports, and it still calls Base44 through the Base44 SDK, so most screens stop working if you cancel the plan.",
            "Backend functions are written for Deno against that SDK, so each one is rewritten for your own server.",
            "The data export includes user records but not password hashes, so every user sets a new password or gets a sign-in link at launch.",
          ],
        },
        {
          type: "paragraph",
          text: "Put Base44 vs Lovable side by side and the backend is the whole difference. Lovable's is a Supabase project you can own outright, while Base44's has to be built again behind the screens you keep.",
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
          text: "Pick the builder that matches where the app has to end up, because that decides how much of the prototype survives the move to production.",
        },
        {
          type: "list",
          items: [
            "If customers will store personal data in it, use Lovable with your own Supabase project connected before the first prompt, rather than Lovable Cloud.",
            "If you or your developer want a framework other than React with Vite, use Bolt and claim the database early.",
            "If your users are developers, or you want hosting, the database and scheduled jobs in one place, Replit Agent fits.",
            "If the design is what sells the product and someone will build the backend, v0 is the one made for that.",
            "If it's an internal tool, or a test you may well throw away, Base44 is the quickest way to something that works.",
          ],
        },
        {
          type: "paragraph",
          text: "Scope matters more than the builder, though. A first release that does one job completely is far cheaper to harden than one that does six jobs halfway. The free MVP Scope Planner lets you list your features, size each one and see what fits a first release and what can wait.",
          link: { text: "Plan your first release with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
      ],
    },
    {
      id: "before-launch",
      heading: "What every AI-built app still needs before launch",
      blocks: [
        {
          type: "paragraph",
          text: "The same gaps turn up in apps from all five, because they come from building by prompt rather than from any one tool. Access rules haven't been tested as a second user, secret keys sit in the browser, the accounts are in one founder's personal login, there's no staging copy of the database and nothing tests the paths that take money. You can check all of these yourself in an afternoon.",
          link: { text: "Run the seven-point production audit for vibe-coded apps.", href: "/blog/vibe-coding-to-production" },
        },
        {
          type: "callout",
          title: "Pick a date to stop prompting",
          text: "Once a developer works in the repository, changes made in the builder at the same time create two versions of the app that drift apart within days. Keep the builder for sketching new features, and build them properly in the repository.",
        },
        {
          type: "paragraph",
          text: "We harden apps from all five builders and rebuild the backend where it has to move, in fixed-price sprints with the code in your name.",
          link: { text: "See what each package includes.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is it worth moving an app from one AI builder to another?",
      answer:
        "Rarely. What stops an app reaching production, such as untested access rules, exposed keys and no staging or tests, lives in the app's code and settings, so it moves with the app. Moving the code into your own repository and having a developer harden it does more than switching builders.",
    },
    {
      question: "Which AI app builder is best for SEO?",
      answer:
        "v0, as it comes, because it writes Next.js, which can render public pages on the server. Lovable writes a Vite single page app that renders in the browser, which is fine behind a login and a handicap for pages that need to rank, and most Bolt projects take the same shape. With any of them, a common fix is a separate marketing site with the app on a subdomain.",
    },
  ],
}
