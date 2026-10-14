import v0Logo from "@/assets/blog/logos/v0.svg"
import type { BlogPost } from "@/lib/blog/types"

export const v0: BlogPost = {
  slug: "migrate-from-v0",
  title: "What v0 actually builds, explained for founders",
  series: "migration",
  topic: "v0",
  logo: v0Logo,
  category: "AI app builders",
  description:
    "A plain-English guide to what v0 produces, what the Next.js and shadcn/ui code means for you, and the backend work still needed before real customers use it.",
  summary:
    "v0 builds the part of an app you can see: polished screens in Next.js, React and shadcn/ui, as real code you own. What it often doesn't build is the part you can't see, such as a proper database, secure sign-in and the checks that keep one customer's data away from another's. That's the work between a v0 project and a launch.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "Yes, GitHub branches or a ZIP download" },
    { label: "What it builds", value: "Mostly the frontend" },
    { label: "Usual approach", value: "Keep the interface, finish the backend" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "what-v0-gives-you",
      heading: "What does v0 actually give you?",
      blocks: [
        {
          type: "paragraph",
          text: "v0 is a tool from Vercel that turns a written description into working screens, and the result is genuine code rather than a mock-up. You describe a dashboard or a sign-up page, and v0 writes the code that draws it, which you can preview, tweak by chatting and publish to a live web address.",
        },
        {
          type: "paragraph",
          text: "That code is a Next.js project. It's the same kind of project a professional team would start with, which is good news: nothing about it ties you to v0, and any web developer can open it, run it and carry on. You can connect it to GitHub, where v0 works on its own branch and proposes changes for review, or download it as a ZIP file.",
        },
        {
          type: "paragraph",
          text: "The catch is about depth. v0 is excellent at what users see and much lighter on what happens behind the screen. Many v0 projects look finished while still showing sample data, and buttons that appear to save things sometimes don't save anything anywhere. v0 can connect a database through Vercel's integrations, such as Neon or Supabase, but connecting one isn't the same as designing one.",
        },
      ],
    },
    {
      id: "glossary",
      heading: "The words you'll hear, in plain English",
      blocks: [
        {
          type: "paragraph",
          text: "When a developer looks at your v0 project, these are the terms that will come up. You don't need to learn them deeply, just enough to follow the conversation.",
        },
        {
          type: "list",
          items: [
            {
              term: "Frontend",
              text: "Everything that runs in the user's browser: the screens, buttons and forms. This is v0's strength.",
            },
            {
              term: "Backend",
              text: "The part that runs on a server: saving data, checking who's allowed to do what, taking payments, sending emails. Often thin or missing in a v0 project.",
            },
            {
              term: "Next.js",
              text: "A popular framework for building web apps. It can do frontend and backend work in one project, which is why a v0 app has room to grow.",
            },
            {
              term: "React",
              text: "The library Next.js uses to build screens out of reusable pieces called components.",
            },
            {
              term: "shadcn/ui",
              text: "A set of ready-made, good-looking components, such as buttons, menus and tables, that v0 uses to give apps their clean look. The code sits inside your project, so it can be changed freely.",
            },
            {
              term: "Tailwind CSS",
              text: "The styling system that controls colours, spacing and layout in v0's code.",
            },
            {
              term: "Mock data",
              text: "Made-up sample content typed into the code so a screen looks real. It never changes and isn't stored anywhere.",
            },
            {
              term: "Database",
              text: "Where real information lives, such as customers, orders and messages, so it's still there tomorrow.",
            },
            {
              term: "Authentication",
              text: "Signing users in and proving they are who they say they are.",
            },
            {
              term: "Repository",
              text: "The folder of code, usually on GitHub, with a full history of every change. Whoever owns it owns the app.",
            },
          ],
        },
      ],
    },
    {
      id: "whats-missing",
      heading: "What's usually missing before launch",
      blocks: [
        {
          type: "paragraph",
          text: "In short, the backend and the safety checks. The screens are often close to done; what's missing is the machinery that makes them trustworthy with real customers and real money.",
        },
        {
          type: "list",
          items: [
            "A designed database, so information is stored properly and stays fast as you grow.",
            "Secure sign-in, built on a proven service rather than written from scratch in a chat.",
            "Permission checks on the server, so a customer can't see another customer's data by guessing a web address. Hiding a button isn't a permission check.",
            "Secret keys kept off the user's browser. In Next.js, any setting whose name starts with NEXT_PUBLIC_ is visible to anyone, so payment and AI keys must never be named that way.",
            "Sensible behaviour when things go wrong: a slow connection, a failed payment, an empty list.",
            "One tidy set of components, because each chat tends to produce its own slightly different version of the same button.",
            "Tests on the important journeys, plus backups and error alerts.",
          ],
        },
        {
          type: "callout",
          title: "A five-minute test you can do yourself",
          text: "Open your v0 app, add or change something, then refresh the page in a different browser. If your change has vanished, that screen is running on mock data. Do this on every screen and you'll have a fair picture of how much backend work is left.",
        },
      ],
    },
    {
      id: "what-to-do-next",
      heading: "What to do next",
      blocks: [
        {
          type: "paragraph",
          text: "Get ownership sorted first, then let a developer finish the backend behind the interface you already have. You rarely need to start again.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Move the GitHub repository, the Vercel project, the domain and any connected database into accounts your business owns, not a personal login.",
            "Ask a developer to list which screens use real data, which use mock data and which buttons do nothing yet. That list is the real scope of work.",
            "Budget for the backend, sign-in and security work. A typical project takes four to eight weeks to reach a production first release.",
            "Keep using v0 for new screens if you like it, with its changes going through review before customers see them.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from v0?",
      answer:
        "Yes. You can connect a GitHub repository, where v0 works on branches and proposes changes for review, or download the project as a ZIP file. The code is a standard Next.js app using React, Tailwind CSS and shadcn/ui, which any web developer can work on.",
    },
    {
      question: "Do I need to rebuild my v0 app from scratch?",
      answer:
        "Rarely. The interface v0 generates is usually worth keeping. Most of the work is building what sits behind it: a designed database, secure sign-in, permission checks on the server, validation, tests and monitoring.",
    },
  ],
}
