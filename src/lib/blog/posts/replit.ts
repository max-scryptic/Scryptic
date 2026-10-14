import replitLogo from "@/assets/blog/logos/replit.svg"
import type { BlogPost } from "@/lib/blog/types"

export const replit: BlogPost = {
  slug: "migrate-from-replit",
  title: "Migrating from Replit to a production app",
  series: "migration",
  topic: "Replit",
  logo: replitLogo,
  category: "AI app builders",
  description:
    "Taking a Replit Agent app to production: what you can export, the Replit specific parts to replace, and a step by step plan to secure, test and launch it.",
  summary:
    "An app built with Replit Agent is real code running on a standard stack, usually with a PostgreSQL database, so it can be kept and improved rather than rebuilt. Going to production means getting the code into your own repository, deciding whether to stay on Replit hosting, replacing Replit specific pieces such as Replit Auth where they no longer fit, and adding tests, environments and monitoring.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Yes, GitHub through the Git pane or ZIP" },
    { label: "Data export", value: "Standard Postgres, dump and restore" },
    { label: "Usual approach", value: "Harden in place, then decide on hosting" },
    { label: "Typical timeline", value: "3 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a Replit app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when the app has paying users, sensitive data or a team of people working on it. Replit Agent is good at building and publishing a working full stack app quickly. Production asks for more than a working app: control over changes, tested releases and an answer when someone asks how the data is protected.",
        },
        { type: "paragraph", text: "Look out for these signs:" },
        {
          type: "list",
          items: [
            "Agent changes often touch more files than you expected, and you are not confident what each checkpoint changed.",
            "Your usage bill is becoming hard to predict as the app and the number of Agent sessions grow.",
            "Users outside the Replit community find the Replit branded sign-in confusing, or you need your own login with your own branding.",
            "A developer wants to work locally with their own tools, code review and automated tests.",
            "You need background workers, queues or infrastructure in a particular region that do not fit how the app is hosted today.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of Replit?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take out the code and the database. Replit Agent writes ordinary source files, commonly a React frontend with a Node.js or Python server, and stores data in Replit's built-in PostgreSQL database, which is standard Postgres.",
        },
        {
          type: "list",
          items: [
            {
              term: "Source code",
              text: "Connect GitHub from the Git pane to push the project to a repository, or download the files as a ZIP. Secrets set in Replit are not included, so record them separately.",
            },
            {
              term: "Database",
              text: "Replit gives a published app separate development and production databases. Both are Postgres, so standard tools such as pg_dump can copy the schema and data once you have a connection string. Export from production, not development, or you will leave your real records behind.",
            },
            {
              term: "Users and files",
              text: "Accounts created through Replit Auth are tied to Replit's login system, and uploaded files may sit in Replit's object storage. Both need a plan of their own.",
            },
            {
              term: "What stays behind",
              text: "Agent's chat history, checkpoints, the workspace and Replit Deployments. Files such as .replit and replit.nix only configure the Replit workspace and are not needed elsewhere.",
            },
          ],
        },
        {
          type: "callout",
          title: "Leaving Replit is optional",
          text: "Replit Deployments can host production apps, with Autoscale and Reserved VM options. Plenty of teams harden the code and keep the hosting. Moving the code into your own repository and testing process is the important part; moving the servers is a separate decision.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a Replit app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "Most Replit apps need their security reviewed, their structure tidied and a release process added. The app works, but it was shaped one prompt at a time, with the AI optimising for the next request rather than the next year.",
        },
        {
          type: "list",
          items: [
            {
              term: "Authorisation on every route",
              text: "Check that every API route confirms who the user is and that they own the record they are asking for. Generated servers often check that a user is signed in but not what they may access.",
            },
            {
              term: "Input validation",
              text: "Validate request bodies on the server with a schema, and make sure database queries use parameters rather than strings built from user input.",
            },
            {
              term: "Login that fits your users",
              text: "Replit Auth signs people in with a Replit account. For a consumer or business product you may want your own provider, and Replit documents a route for moving from Replit Auth to Clerk.",
            },
            {
              term: "Schema migrations",
              text: "Keep database changes as migration files in the repository, reviewed like code, rather than applied automatically at publish time without anyone reading them.",
            },
            {
              term: "Tests and staging",
              text: "Automated tests for sign-up, payments and the core workflow, plus a staging copy of the app with its own database for checking releases.",
            },
            {
              term: "Monitoring and backups",
              text: "Error tracking, uptime alerts, structured logs and a backup you have actually restored at least once.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a Replit app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Get the code under version control you own, make the app safe, then choose where it runs. Keep the existing deployment live until the new setup has been proven.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Push to your own repository",
              text: "Connect GitHub from the Git pane and push to a repository owned by your organisation. From this point, review every change before it reaches production.",
            },
            {
              term: "Inventory the Replit dependencies",
              text: "List the secrets, Replit Auth usage, object storage buckets, scheduled jobs and any Replit specific environment variables the code reads.",
            },
            {
              term: "Run it outside Replit",
              text: "Clone the repository, set the environment variables and run the app locally against a copy of the database. Fix anything that only worked inside the workspace.",
            },
            {
              term: "Secure and tidy",
              text: "Add authorisation checks and server validation, remove dead code from abandoned attempts and split the largest files.",
            },
            {
              term: "Decide on login",
              text: "Keep Replit Auth if your users are comfortable with it, or move to a provider such as Clerk or Supabase Auth, with a plan for how existing users sign in afterwards.",
            },
            {
              term: "Choose hosting",
              text: "Either stay on Replit Deployments with the new review process, or move to a platform such as Render, Fly.io or a major cloud with a managed Postgres database.",
            },
            {
              term: "Test, then copy the data",
              text: "Rehearse the database move on staging, check row counts and key records, then repeat it for production during a short, announced maintenance window.",
            },
            {
              term: "Cut over",
              text: "Point the domain at the new deployment, watch errors closely for the first days, and keep the Replit app paused rather than deleted until you are sure.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in Replit migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The usual problems are exporting the wrong database, missing secrets, and users who cannot sign in after the move.",
        },
        {
          type: "list",
          items: [
            "Dumping the development database instead of production, and launching the new app with test data.",
            "Forgetting that secrets are not in the repository, then spending launch day hunting for API keys.",
            "Switching away from Replit Auth without telling users, so they arrive at a login screen they do not recognise.",
            "Letting Agent keep editing the Replit copy after developers start in the repository, so the two versions drift apart.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on Replit instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if the app is still changing shape every week, or if Replit's hosting already meets your needs. Replit is a capable place to build and run an early product, and its separate development and production databases help. Move the code into a reviewed, tested workflow once mistakes would hurt customers, and only move the hosting if cost, control or specific infrastructure needs make it worthwhile.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Replit?",
      answer:
        "Yes. You can push the project to GitHub from the Git pane or download it as a ZIP file. Secrets are not included, so copy them from Replit's Secrets settings into your new environment separately.",
    },
    {
      question: "Do I need to rebuild my Replit Agent app from scratch?",
      answer:
        "Usually not. Replit Agent writes standard code on common frameworks with a Postgres database, so most apps can be secured, tidied and tested rather than rewritten. A rebuild only makes sense if the original design no longer fits the product.",
    },
    {
      question: "Can I keep hosting my app on Replit after it goes to production?",
      answer:
        "Yes, if it suits you. Replit Deployments can host production apps. The important changes are owning the code in your own repository, reviewing and testing every release, and having monitoring and backups in place.",
    },
    {
      question: "How long does it take to move a Replit app to production?",
      answer:
        "Typically three to eight weeks, depending on the size of the app, whether you change login provider, and whether you move the hosting and database or keep them on Replit.",
    },
  ],
}
