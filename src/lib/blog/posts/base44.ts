import base44Logo from "@/assets/blog/logos/base44.svg"
import type { BlogPost } from "@/lib/blog/types"

export const base44: BlogPost = {
  slug: "migrate-from-base44",
  title: "Base44 migration and moving the app to your own backend",
  series: "migration",
  topic: "Base44",
  logo: base44Logo,
  category: "AI app builders",
  description:
    "A Base44 migration keeps the React frontend and rebuilds the backend. What the GitHub export includes, how to transfer the app to another account and the steps.",
  summary:
    "Yes, you can move a Base44 app to your own backend. Base44 syncs your React frontend and function code to GitHub, but the database, login and entity definitions stay on Base44 and the code still calls them through the Base44 SDK. Moving means keeping the interface, building a backend you own behind it, and moving data and users in one planned cutover.",
  datePublished: "2026-10-13",
  dateModified: "2026-11-14",
  facts: [
    { label: "Code export", value: "GitHub sync, still tied to Base44" },
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
      id: "github-export",
      heading: "What does the Base44 GitHub export include?",
      blocks: [
        {
          type: "paragraph",
          text: "The GitHub export includes your frontend source and your backend function files, but not your data or, with two-way sync, your entity definitions. GitHub sync needs the Builder plan or higher, and the code it writes still reaches Base44's servers through the Base44 SDK.",
        },
        {
          type: "table",
          caption: "What a Base44 GitHub sync puts in your repository, and what stays on Base44",
          columns: ["Part of the app", "In the repository?", "What that means for a move"],
          rows: [
            ["Pages, components and hooks", "Yes, as a React and Vite project", "Usually worth keeping as they are"],
            ["Backend functions", "Yes, one TypeScript file per function", "A clear spec, but each still calls the Base44 SDK"],
            ["Entities (your data model)", "No, with two-way sync they are managed in Base44", "Write the schema down from the dashboard before you design Postgres"],
            ["Records and uploaded files", "No", "Export each table and download files separately"],
            ["Users and sign-in", "No", "Rebuilt on your own auth, with users invited across"],
            ["Secrets and integrations", "No", "New keys in accounts you own, held on your server"],
          ],
        },
        {
          type: "paragraph",
          text: "Sync now runs both ways. Changes made in Base44 land in the repository and the repository becomes the app's source of truth, so edits you push to the main branch flow back into the editor. Apps connected with the older one-way export have to disconnect and reconnect to get this.",
        },
        {
          type: "list",
          items: [
            {
              term: "Use an organisation repository",
              text: "Connect a repository owned by your company's GitHub organisation, not a freelancer's personal account. The Base44 GitHub App needs write access to it.",
            },
            {
              term: "Keep the default branch as main",
              text: "Sync works against main, and the repository carries a base44/config.jsonc file whose project name has to match the app.",
            },
            {
              term: "Stop editing in two places",
              text: "Once developers work in the repository, keep prompts in the Base44 editor to a minimum so the two don't overwrite each other's changes.",
            },
          ],
        },
      ],
    },
    {
      id: "transfer-ownership",
      heading: "How do you transfer a Base44 app to another account?",
      blocks: [
        {
          type: "paragraph",
          text: "Inside one workspace, on any plan, the owner can make a collaborator the app's new owner from the collaborators list. Sending an app to an account outside the workspace generally needs an Enterprise plan or an approved Base44 Partner, and the recipient has to accept an emailed invitation.",
        },
        {
          type: "list",
          items: [
            {
              term: "Within your workspace",
              text: "The new owner must already be a collaborator on the app with the editor role or higher. Guests and viewers can't own apps. The app stays in the same workspace.",
            },
            {
              term: "To another account",
              text: "The recipient gets a link by email and nothing changes until they accept. The invitation expires after seven days, and an app can only have one pending transfer at a time.",
            },
            {
              term: "Integrations and secrets",
              text: "You choose what happens to each one during the transfer. Plan to issue new keys in the new owner's accounts anyway, so the old owner's keys can be revoked.",
            },
            {
              term: "Custom domain",
              text: "A connected domain stays with the app as long as the new owner's plan includes custom domains.",
            },
            {
              term: "The previous owner",
              text: "A setting on the transfer keeps them on as an editor collaborator, or removes their access once the new owner accepts.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Moving an app to a different workspace disconnects GitHub sync, custom connectors and bank account connections, so reconnect each one in the new workspace straight after the move. Cloning or remixing the app is not a transfer: it makes a separate app, and the original keeps its URL and its users.",
        },
        {
          type: "callout",
          title: "Owning the Base44 app is not owning the code",
          text: "When an agency or freelancer built the app, ask for two things at handover: ownership of the app in Base44, and the GitHub repository moved into your organisation. Then the app keeps running while you decide whether to migrate.",
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
        "Partly. On paid plans from Builder upwards you can sync the React frontend and function code to GitHub or download it as a ZIP, so check what your plan includes. The exported code still uses the Base44 SDK to reach Base44's database, login and backend, so it does not run on its own.",
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
