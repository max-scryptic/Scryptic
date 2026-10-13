import wewebLogo from "@/assets/blog/logos/weweb.svg"
import type { BlogPost } from "@/lib/blog/types"

export const weweb: BlogPost = {
  slug: "migrate-from-weweb",
  title: "Migrating from WeWeb to a production app",
  tool: "WeWeb",
  logo: wewebLogo,
  category: "No-code app builders",
  description:
    "How to move a WeWeb app to production: what code export really gives you, how to keep your Supabase or Xano backend, and a step by step plan to launch.",
  summary:
    "WeWeb can export your app as a built Vue.js site you can host yourself, but that output is meant for deploying, not for a team to maintain by hand. Moving to production usually means keeping the data, rebuilding the frontend as a codebase you own, and bringing the backend logic under version control.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Built Vue app, not working source" },
    { label: "Data export", value: "Depends on backend, often Postgres" },
    { label: "Usual approach", value: "Keep the data, rebuild the frontend" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a WeWeb app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the app has become a product that needs a team, a review process and features the editor makes awkward. WeWeb is a capable visual builder for web apps, and many teams launch on it. The friction starts when change gets slow, risky or expensive.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Simple changes take hours because logic is spread across page workflows, global workflows and formulas that are hard to trace.",
            "You are writing custom Vue components or JavaScript to get around the editor, and nobody can test or review them properly.",
            "Several people need to work on the app at once, and you want branches, code review and a clear history of what changed.",
            "Public pages need to rank in search or load faster than a single page app comfortably allows.",
            "A customer, investor or acquirer asks where the code lives and how releases are tested.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of WeWeb?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take a working copy of the frontend and, usually, all of your data. WeWeb exports a built Vue.js single page app that you can host on your own servers, and the data lives in whichever backend you connected, most often Supabase or Xano. Check what your plan includes, as code export is tied to a paid plan.",
        },
        {
          type: "list",
          items: [
            {
              term: "Frontend",
              text: "A compiled, minified Vue.js app made of HTML, CSS and JavaScript. It runs on any static host, but it is the output of WeWeb's build, not the readable source a developer would work in.",
            },
            {
              term: "Supabase data",
              text: "If you used Supabase, your data, users and storage are in a Postgres project you can connect to directly. Confirm the project sits in your own account.",
            },
            {
              term: "Xano data",
              text: "Xano can export a workspace, including data and schema, and tables can be exported as CSV. Its endpoints can be read as XanoScript, but that logic runs on Xano, so moving off it means rewriting each endpoint.",
            },
            {
              term: "WeWeb's own backend",
              text: "If you used WeWeb Tables and backend workflows, check the current export options carefully before you plan around them. They are newer than the frontend export.",
            },
            {
              term: "What stays behind",
              text: "The editor, its workflows as you designed them, and features that rely on WeWeb's own services. Some plugins route through WeWeb's servers and may not work in a self-hosted copy, and files uploaded to WeWeb's CDN need moving to your own storage.",
            },
          ],
        },
        {
          type: "callout",
          title: "The short version",
          text: "Self-hosting the export removes the hosting dependency, not the editor dependency. You still make changes in WeWeb and export again. To own the code, you rebuild the frontend, using the exported app as a working reference.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a WeWeb app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "Most WeWeb apps need their security, logic and release process moved somewhere you can review and test. The interface works, but the rules that protect data and the logic that runs the business are often scattered across the editor and the backend.",
        },
        {
          type: "list",
          items: [
            {
              term: "Data access rules",
              text: "With Supabase, the browser often queries the database directly, so row level security on every table is what keeps users apart. With Xano, each endpoint needs to check who is calling it. Hiding a button in the interface protects nothing.",
            },
            {
              term: "Logic in one place",
              text: "Business rules split between frontend workflows and backend functions drift apart. Anything that charges money, sends email or changes another user's data should run on the server.",
            },
            {
              term: "Version control",
              text: "A repository with the frontend, the database schema as migrations and the server logic, so every change has a history and a reviewer.",
            },
            {
              term: "Environments",
              text: "Separate development, staging and production backends, with a safe way to promote changes between them.",
            },
            {
              term: "Tests and monitoring",
              text: "Automated tests on sign-up, payment and the core workflow, plus error tracking, uptime checks and database backups.",
            },
            {
              term: "Rendering for search",
              text: "If public pages need to rank, serve them with server rendering, for example in Next.js or Nuxt, rather than as part of a single page app.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a WeWeb app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Keep the data where it is, secure it, then rebuild the frontend against it. The WeWeb app keeps running throughout, so users see no gap until you switch the domain.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Take ownership",
              text: "Confirm you own the Supabase or Xano account, the domain and every third-party service. Export the WeWeb app as a fallback and keep a copy.",
            },
            {
              term: "Audit",
              text: "List every page, workflow, formula, plugin, API call and backend function. Write down what each one actually does, including the edge cases users rely on.",
            },
            {
              term: "Decide on the backend",
              text: "Supabase usually stays as it is. For Xano, decide whether to keep it for now or move the data to Postgres and rewrite the endpoints, which adds time.",
            },
            {
              term: "Lock down data",
              text: "Write and test row level security policies or endpoint checks for every table, and move secret keys onto the server.",
            },
            {
              term: "Rebuild the frontend",
              text: "Build the app in a framework your team can maintain, such as Next.js or Nuxt, screen by screen against the same backend. Move workflow logic to the server as you go.",
            },
            {
              term: "Add tests and environments",
              text: "Cover the flows that make money with automated tests, set up staging, and manage the schema through migrations.",
            },
            {
              term: "Move files",
              text: "Copy anything stored on WeWeb's CDN into your own storage and update the references.",
            },
            {
              term: "Cut over",
              text: "Point the domain at the new app, keep the WeWeb project unchanged for a few weeks as a fallback, then retire it.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in WeWeb migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are treating the exported bundle as source code, and missing logic that only existed in frontend workflows.",
        },
        {
          type: "list",
          items: [
            "Hand editing the minified export, then losing every change the next time someone exports from WeWeb.",
            "Rebuilding the screens but forgetting a workflow that quietly updated a record or sent an email.",
            "Assuming the backend is secure because the interface only shows each user their own data.",
            "Self-hosting the export and finding that a plugin relying on WeWeb's services has stopped working.",
            "Migrating off Xano and rewriting every endpoint at the same time as the frontend, when keeping Xano for a while would ship weeks sooner.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on WeWeb instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app does its job, your team is productive in the editor, and you do not need search traffic or a code review process. WeWeb with a solid Supabase or Xano backend can run a real business. Move when the editor becomes the bottleneck, when security and logic need proper review, or when you need to own every line of the product.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from WeWeb?",
      answer:
        "Yes, on a paid plan. WeWeb exports a built Vue.js app that you can host on your own servers. It is compiled output for deploying, not a source codebase intended for developers to maintain by hand.",
    },
    {
      question: "Do I need to rebuild my WeWeb app from scratch?",
      answer:
        "The frontend, usually yes, if you want a codebase you own and can change. The data and often the backend can stay. A Supabase backend carries over as it is, and a Xano backend can be kept while the frontend is rebuilt.",
    },
    {
      question: "Can I keep my Supabase or Xano backend when leaving WeWeb?",
      answer:
        "Yes. WeWeb is a frontend on top of your backend, so a new app can talk to the same Supabase project or Xano endpoints. Moving off Xano as well is a separate, larger step.",
    },
    {
      question: "How long does it take to move a WeWeb app to production?",
      answer:
        "Typically four to eight weeks, depending on the number of screens and workflows, how many user roles the app has, and whether the backend is changing too.",
    },
  ],
}
