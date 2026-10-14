import base44Logo from "@/assets/blog/logos/base44.svg"
import type { BlogPost } from "@/lib/blog/types"

export const base44: BlogPost = {
  slug: "migrate-from-base44",
  title: "Migrating from Base44 to a production app",
  series: "migration",
  topic: "Base44",
  logo: base44Logo,
  category: "AI app builders",
  description:
    "Moving a Base44 app to production: why the exported code still relies on Base44, how to get your data out, and a step by step plan to rebuild the backend.",
  summary:
    "Base44 lets you export the React frontend of your app, but the database, login and backend functions stay on Base44's platform and the exported code still calls them. Moving to production means keeping the interface, building your own backend behind it, and moving your data and users across in a planned cutover.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Frontend yes, backend stays on Base44" },
    { label: "Data export", value: "CSV per table from the dashboard" },
    { label: "Usual approach", value: "Keep the interface, replace the backend" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a Base44 app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when you need control over your data, your login system or your costs that a hosted platform cannot give you. Base44 is very good at producing a complete app with a database, users and hosting from a description. Everything behind the screens runs on Base44's own platform, which is convenient until the business needs to own it.",
        },
        { type: "paragraph", text: "Common reasons founders start planning a move:" },
        {
          type: "list",
          items: [
            "A customer or investor asks where the data is stored, who can access it and how it is backed up, and the honest answer is that it lives inside Base44.",
            "You need a feature the platform makes awkward, such as complex reporting across tables, a specific payment flow or an integration with strict requirements.",
            "Prompted changes to one part of the app keep breaking another, and there is no test suite to catch it.",
            "You want a developer to own the code, and they ask for a normal database and backend they can run themselves.",
            "You want to be sure the product keeps working whatever happens to your plan or to the platform.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Base44?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take out the frontend code and your data, but not a backend that runs on its own. Base44 builds the interface as a React app using Vite and Tailwind CSS, and connects it to Base44's managed database, authentication, file storage and backend functions through the Base44 SDK.",
        },
        {
          type: "list",
          items: [
            {
              term: "Frontend code",
              text: "On paid plans from Builder upwards you can sync the app to GitHub or download it as a ZIP. Check what your current plan includes. The code is a standard React project.",
            },
            {
              term: "Backend functions",
              text: "Custom backend functions are written for Deno and Base44's SDK. Their logic is useful as a specification, but they will not run on another server without being rewritten.",
            },
            {
              term: "Data",
              text: "Each table can be exported as a CSV file from the Data section of the app dashboard. That gives you the records, but not password hashes, so users will need a new way to sign in.",
            },
            {
              term: "What stays behind",
              text: "The database itself, user accounts, the built-in integrations for things like email, AI calls and file uploads, and Base44's hosting.",
            },
          ],
        },
        {
          type: "callout",
          title: "Exported does not mean independent",
          text: "The exported frontend still reads and writes data, signs users in and calls functions through Base44's servers. Cancel the subscription without replacing those calls and most screens stop working. Treat the export as a finished interface waiting for a new backend.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Base44 app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "It needs a backend you own, and then the same hardening any generated app needs. The interface can usually stay, but the data layer, login and server logic have to be built and connected to it.",
        },
        {
          type: "list",
          items: [
            {
              term: "A database you control",
              text: "Usually PostgreSQL, with a schema designed from Base44's entities, proper relationships between tables, indexes and migrations kept in the repository.",
            },
            {
              term: "An API layer",
              text: "Server endpoints that replace each SDK call the frontend makes, with permission checks on every one so users can only see and change their own records.",
            },
            {
              term: "Authentication",
              text: "A login provider or library you control, with email verification, password reset and, if your customers need it, single sign-on.",
            },
            {
              term: "Replacement integrations",
              text: "Your own accounts with email, file storage and AI providers, with keys held on the server rather than in the frontend.",
            },
            {
              term: "Tests, environments and monitoring",
              text: "Automated tests on the main flows, a staging environment, error tracking and scheduled backups.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Base44 app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Export the frontend, build the new backend beside it, switch the frontend over one data source at a time, then move the data and users in a single planned cutover. The Base44 version keeps serving customers until the last step.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Export and freeze",
              text: "Sync the frontend to a GitHub repository your organisation owns, and stop adding features in Base44 so the target stops moving.",
            },
            {
              term: "Map the app",
              text: "List every entity and its fields, every SDK call in the frontend, every backend function, integration and user role. This is the specification for the new backend.",
            },
            {
              term: "Build the backend",
              text: "Create the database schema, API endpoints and permission rules, and rewrite backend functions for your own server.",
            },
            {
              term: "Swap the SDK out",
              text: "Put one data access module between the screens and the backend, then point it at your own API entity by entity, testing each screen as you go.",
            },
            {
              term: "Set up authentication",
              text: "Configure your new login system and decide how existing users will get in, usually through a password reset email or a sign-in link.",
            },
            {
              term: "Rehearse the data move",
              text: "Export every table as CSV, import it into staging, keep record IDs and links between tables intact, and copy uploaded files to your own storage.",
            },
            {
              term: "Test end to end",
              text: "Run the main flows as each user role against staging data, and add automated tests for the ones that make money.",
            },
            {
              term: "Cut over",
              text: "Pause writes in Base44, run the final export and import, switch the domain, email users about signing in, and keep the Base44 app read-only for a few weeks.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Base44 migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "Most trouble comes from underestimating how much lives on the platform rather than in the exported code.",
        },
        {
          type: "list",
          items: [
            "Assuming the GitHub export is the whole app, then finding the backend, database and login still sit on Base44.",
            "Importing CSV files without keeping the original IDs, which breaks the links between records.",
            "Leaving uploaded files on Base44 storage links that stop working once the app is retired.",
            "Forgetting to tell users they need to reset their password or use a sign-in link after the switch.",
            "Rebuilding the interface as well as the backend, when the exported React code was fine to keep.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Base44 instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app does its job and the trade-offs are acceptable. Base44 has been part of Wix since 2025 and continues as its own product, and for internal tools, early validation or apps without sensitive data it can be a sensible long-term home. Plan the move when owning the backend, the data and the login matters more to the business than the speed of building on the platform.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Base44?",
      answer:
        "Partly. On paid plans from Builder upwards you can sync the React frontend to GitHub or download it, but the exported code still uses the Base44 SDK to reach Base44's database, login and backend functions, so it does not run independently.",
    },
    {
      question: "Do I need to rebuild my Base44 app from scratch?",
      answer:
        "Not all of it. The React interface can usually be kept. What has to be built is the backend: a database, API, authentication and the server logic that currently runs on Base44, plus a move of your data and users.",
    },
    {
      question: "How do I get my data out of Base44?",
      answer:
        "Export each table as a CSV file from the Data section of the app dashboard, then import the files into your new database. Password hashes are not included, so plan for users to set a new password or sign in with a link.",
    },
    {
      question: "How long does it take to move a Base44 app to production?",
      answer:
        "Typically four to eight weeks, because the backend has to be rebuilt. The number of entities, user roles, backend functions and integrations has the biggest effect on the timeline.",
    },
  ],
}
