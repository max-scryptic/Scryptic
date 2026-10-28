import base44Logo from "@/assets/blog/logos/base44.svg"
import type { BlogPost } from "@/lib/blog/types"

export const base44: BlogPost = {
  slug: "migrate-from-base44",
  title: "Can you move a Base44 app to your own backend?",
  series: "migration",
  topic: "Base44",
  logo: base44Logo,
  category: "AI app builders",
  description:
    "Yes, but only the React frontend exports. The quick answer on leaving Base44: what comes with you, what you rebuild, and how users and data move across.",
  summary:
    "Yes. Base44 exports your React frontend, but the database, login and backend functions stay on Base44 and the exported code still calls them. Moving means keeping the interface, building a backend you own behind it, and moving data and users in one planned cutover.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "Frontend yes, backend stays on Base44" },
    { label: "Data export", value: "CSV per table from the dashboard" },
    { label: "Usual approach", value: "Keep the interface, replace the backend" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "short-answer",
      heading: "Yes, but the backend has to be rebuilt",
      blocks: [
        {
          type: "paragraph",
          text: "You can leave Base44, and you don't have to start again. The screens your users see come out as a normal React project built with Vite and Tailwind CSS, and that code is usually worth keeping. What doesn't come out is everything behind it.",
        },
        {
          type: "paragraph",
          text: "Base44 wires the interface to its own managed database, authentication, file storage and backend functions through the Base44 SDK. Export the code, cancel the plan, and most screens stop working, because every read, write and sign-in still goes to Base44's servers. So the job is a backend rebuild with the frontend kept, not a full rewrite.",
        },
        {
          type: "callout",
          title: "Exported does not mean independent",
          text: "Treat the GitHub export as a finished interface waiting for a new backend. Until each SDK call points at an API you own, the app still depends on Base44.",
        },
        {
          type: "paragraph",
          text: "Whether you should move is a separate question. For internal tools and early validation, Base44 can be a sensible long-term home. Move when a customer asks where their data lives, when you need features the platform makes awkward, or when a developer needs to own the code.",
        },
      ],
    },
    {
      id: "what-moving-involves",
      heading: "What moving involves",
      blocks: [
        {
          type: "paragraph",
          text: "Seven jobs, done in this order, with the Base44 version serving customers until the last one.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Sync and freeze",
              text: "Push the frontend to a GitHub repository your organisation owns, and stop building new features in Base44.",
            },
            {
              term: "Map the app",
              text: "List every entity, SDK call, backend function, integration and user role. That list is the spec for the backend.",
            },
            {
              term: "Build the backend",
              text: "A Postgres database designed from your entities, API endpoints with a permission check on each one, and the backend functions rewritten for your own server.",
            },
            {
              term: "Swap the SDK out",
              text: "Route all data access through one module, then point it at your API one entity at a time, testing each screen.",
            },
            {
              term: "Replace the integrations",
              text: "Your own accounts for email, file storage and AI, with keys held on the server.",
            },
            {
              term: "Rehearse the data move",
              text: "Import every CSV into staging with original IDs intact, and copy uploaded files to your own storage.",
            },
            {
              term: "Cut over",
              text: "Pause writes, run the final import, switch the domain, email users a sign-in link, and keep Base44 read-only for a few weeks.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export a Base44 app and run it on my own?",
      answer:
        "Partly. On paid plans from Builder upwards you can sync the React frontend to GitHub or download it as a ZIP, so check what your plan includes. The exported code still uses the Base44 SDK to reach Base44's database, login and backend functions, so it does not run on its own.",
    },
    {
      question: "How do I get my data out of Base44?",
      answer:
        "Export each table as a CSV file from the Data section of the app dashboard, then import the files into your new database. Keep the original record IDs so links between tables survive, and download uploaded files separately, because they are stored on Base44.",
    },
    {
      question: "Will my Base44 users need to reset their passwords?",
      answer:
        "Usually yes. The Base44 data export gives you user records but not password hashes, so existing users cannot sign in to a new system with their old password. The common fix is to email everyone a password reset or a one-time sign-in link at launch.",
    },
    {
      question: "Can I run Base44 backend functions on my own server?",
      answer:
        "Not as they are. Base44 backend functions are written for Deno and call the Base44 SDK, so they will not run elsewhere unchanged. Their logic is still a useful specification, and a developer can rewrite each one as an endpoint or job on your own backend.",
    },
    {
      question: "Why does leaving Base44 take weeks if the frontend exports?",
      answer:
        "Most take four to eight weeks. The React interface stays, so the time goes on rebuilding the backend, and the number of entities, user roles, backend functions and integrations sets the pace.",
    },
  ],
}
