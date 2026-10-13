import v0Logo from "@/assets/blog/logos/v0.svg"
import type { BlogPost } from "@/lib/blog/types"

export const v0: BlogPost = {
  slug: "migrate-from-v0",
  title: "Migrating from v0 to a production app",
  tool: "v0",
  logo: v0Logo,
  category: "AI app builders",
  description:
    "How to turn a v0 project into a production app: what the Next.js code gives you, the backend and security work it usually lacks, and a plan to launch.",
  summary:
    "v0 produces clean Next.js, React and Tailwind code that you own, so the interface you designed is rarely thrown away. Moving to production is mostly about what sits behind the screens: real data, authentication, server side checks, tests and a Vercel and GitHub setup owned by your business.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Yes, GitHub branches or a ZIP download" },
    { label: "Data export", value: "Yours, in the provider you connected" },
    { label: "Usual approach", value: "Keep the interface, finish the backend" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a v0 app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the app has to do real work for real people, not just look right. v0 is one of the best tools for producing polished interfaces quickly. The gap usually appears behind the interface, where data, permissions and integrations have to hold up under real use.",
        },
        { type: "paragraph", text: "You will probably recognise some of these:" },
        {
          type: "list",
          items: [
            "Screens look finished, but some still show placeholder or hard-coded data.",
            "Each chat produced its own version of a component, and they no longer match.",
            "You need sign-in, user roles or payments, and getting them right by prompting is taking several attempts.",
            "A developer is joining and needs a normal workflow: local development, branches, code review and tests.",
            "The app runs on a personal Vercel account, and customers or investors are about to depend on it.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of v0?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take out all of the code. v0 generates a Next.js project using React, TypeScript, Tailwind CSS and shadcn/ui components, and it can work directly in a GitHub repository, creating a branch for its changes and opening pull requests rather than writing to your main branch.",
        },
        {
          type: "list",
          items: [
            {
              term: "Source code",
              text: "Connect GitHub to keep the project in a repository, or download it as a ZIP file. Once it is in your repository it is an ordinary Next.js app that any developer can run.",
            },
            {
              term: "Data",
              text: "v0 does not keep your data itself. Databases and storage connected through Vercel's integrations, such as Neon, Supabase, Upstash or Vercel Blob, live with that provider and are linked to your Vercel account.",
            },
            {
              term: "Hosting and settings",
              text: "Deployments, domains and environment variables live in a Vercel project. Make sure that project sits in a Vercel team your business owns.",
            },
            {
              term: "What stays behind",
              text: "Your chats, design iterations and the v0 preview sandbox. None of them are needed to run or deploy the app.",
            },
          ],
        },
        {
          type: "callout",
          title: "Moving on does not mean leaving v0",
          text: "Because v0 works through branches and pull requests, many teams keep using it for new screens after launch. The difference is that its changes go through review, tests and a preview deployment before they reach customers.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a v0 app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "A v0 app usually needs its backend finishing and its security checked. The interface is often close to done, while data access, authentication and error handling were built just far enough to make the preview work.",
        },
        {
          type: "list",
          items: [
            {
              term: "Real data and a schema",
              text: "Replace mock data with a designed database schema, managed through migrations, with indexes for the queries the app actually runs.",
            },
            {
              term: "Authentication and authorisation",
              text: "Sign-in needs to be a proven library or provider, and every server action and API route must check who the user is and what they are allowed to do. Hiding a button is not a permission check.",
            },
            {
              term: "Secrets kept on the server",
              text: "In Next.js, any environment variable starting with NEXT_PUBLIC_ is sent to the browser. Keep payment, email and AI keys without that prefix and use them only in server code.",
            },
            {
              term: "Validation and error states",
              text: "Validate every form on the server, and design what users see when a request fails, takes a long time or returns nothing.",
            },
            {
              term: "One set of components",
              text: "Merge duplicated components from different chats into a single shared set, so a change to a button or form field happens once.",
            },
            {
              term: "Tests, environments and monitoring",
              text: "Automated tests on the important flows, a staging environment with its own database, error tracking and backups.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a v0 app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Secure ownership, then design the data, then wire the interface to it, then harden and launch. The interface can stay visible to testers throughout because preview deployments show every change.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Move everything into business accounts",
              text: "Put the repository in your GitHub organisation and the Vercel project, domain and database stores in a Vercel team your business owns.",
            },
            {
              term: "Map what is real and what is mock",
              text: "Go screen by screen and record which data is live, which is placeholder and which actions do nothing yet. This list becomes the backlog.",
            },
            {
              term: "Design the data model",
              text: "Choose the database, write the schema and migrations, and decide who can read and change each kind of record.",
            },
            {
              term: "Add authentication",
              text: "Pick an auth provider or library, protect routes and server actions, and test as an ordinary user and as a signed-out visitor.",
            },
            {
              term: "Wire the interface to real data",
              text: "Replace mock data with server side queries, add loading and error states, and validate all input on the server.",
            },
            {
              term: "Consolidate components",
              text: "Merge near-duplicate components, remove unused ones and keep shadcn/ui components in one shared folder.",
            },
            {
              term: "Set up environments and checks",
              text: "Separate development, preview and production environment variables and databases, and run tests on every pull request.",
            },
            {
              term: "Launch",
              text: "Add monitoring and backups, point the production domain at the new deployment and keep v0 changes flowing through pull requests only.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in v0 migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistake is treating a finished looking interface as a finished app, and launching before the backend has caught up.",
        },
        {
          type: "list",
          items: [
            "Shipping with buttons and pages that still run on placeholder data, then finding out from customers.",
            "Checking permissions only in the interface, so anyone who calls the server action or API route directly can bypass them.",
            "Leaving the project, domain and database in a personal Vercel account, which is hard to untangle when the company grows or the founder changes.",
            "Merging v0 pull requests without review, so generated changes undo fixes that developers made by hand.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on v0 instead?",
      blocks: [
        {
          type: "paragraph",
          text: "For design and early prototyping, yes. If you are still testing the idea with a clickable product, v0 is a quick and inexpensive way to learn what users want. Move to a proper production setup once people rely on the app for real work, and keep v0 as a design tool that feeds pull requests into the codebase rather than the place the product is built.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from v0?",
      answer:
        "Yes. You can connect a GitHub repository, where v0 works on branches and opens pull requests, or download the project as a ZIP file. The code is a standard Next.js app with React, Tailwind CSS and shadcn/ui.",
    },
    {
      question: "Do I need to rebuild my v0 app from scratch?",
      answer:
        "Rarely. The interface v0 generates is usually worth keeping. Most of the work is building out the backend: the database, authentication, permission checks and server side validation, plus tests and monitoring.",
    },
    {
      question: "Do I have to host a v0 app on Vercel?",
      answer:
        "No. v0 deploys to Vercel by default and it is a good fit for Next.js, but the exported code is a standard Next.js app that can run on other hosts that support it. Many teams stay on Vercel and move the project into a business owned team.",
    },
    {
      question: "How long does it take to move a v0 app to production?",
      answer:
        "Typically four to eight weeks. The interface is often close to done, so the time depends mostly on how much backend, authentication and integration work the app needs.",
    },
  ],
}
