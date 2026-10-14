import lovableLogo from "@/assets/blog/logos/lovable.svg"
import type { BlogPost } from "@/lib/blog/types"

export const lovable: BlogPost = {
  slug: "migrate-from-lovable",
  title: "How to take a Lovable app to production without rebuilding it",
  series: "migration",
  topic: "Lovable",
  logo: lovableLogo,
  category: "AI app builders",
  description:
    "A phased runbook for hardening a Lovable app: own the repo and Supabase project, audit row level security, add environments and tests, then launch.",
  summary:
    "You harden a Lovable app rather than rebuild it, because the export is ordinary React, TypeScript and Supabase. The work runs in phases: take ownership of the code and backend, lock down the database, add environments and tests, decide how pages render, then cut over with a fallback.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "Yes, full source through GitHub sync" },
    { label: "Backend", value: "Supabase, or Lovable Cloud built on it" },
    { label: "Biggest risk", value: "Tables without tested access policies" },
    { label: "Usual approach", value: "Harden and extend, not rebuild" },
    { label: "Typical timeline", value: "3 to 8 weeks" },
  ],
  sections: [
    {
      id: "before-you-start",
      heading: "Stop prompting before you start",
      blocks: [
        {
          type: "paragraph",
          text: "The first step is to stop changing the app in Lovable. Every prompt after this point lands in code you are about to review, and two-way GitHub sync means edits made in Lovable and edits made in the repository will collide. Agree a date, make one last round of prompted changes if you need to, then freeze it.",
        },
        {
          type: "paragraph",
          text: "Lovable is one of the easiest builders to graduate from. It writes a standard React and TypeScript project built with Vite, styled with Tailwind CSS and shadcn/ui components, and its backend is Supabase: Postgres, authentication, file storage and edge functions. There is no proprietary runtime to escape. The work is ownership and quality, not translation.",
        },
        {
          type: "paragraph",
          text: "This runbook has six phases. Each one leaves the app working, so you can keep showing it to users while you go.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            { term: "Ownership", text: "Code, backend, domain and accounts in your name." },
            { term: "Security", text: "Row level security, secrets and server-side checks." },
            { term: "Environments", text: "Development, staging and production, with migrations." },
            { term: "Maintainability", text: "Refactoring where it hurts, plus tests and monitoring." },
            { term: "Rendering", text: "Deciding whether public pages need server rendering." },
            { term: "Cutover", text: "Moving hosting and keeping a fallback for a few weeks." },
          ],
        },
      ],
    },
    {
      id: "phase-1-ownership",
      heading: "Phase 1. Take ownership of everything",
      blocks: [
        {
          type: "paragraph",
          text: "Ownership comes first because nothing else is safe until the code, database and accounts belong to the business rather than to one person's Lovable login. This phase is mostly admin, and it is usually finished in a day or two.",
        },
        { type: "subheading", text: "Move the repository into your organisation" },
        {
          type: "paragraph",
          text: "Connect the project to a GitHub repository inside your company's GitHub organisation, not a founder's personal account. Protect the main branch, require pull requests, and give the developers who will take over write access. From here on the repository is the source of truth, and Lovable is at most a place to sketch ideas.",
        },
        { type: "subheading", text: "Decide where the backend lives" },
        {
          type: "paragraph",
          text: "If you connected your own Supabase project when you started, the database is already yours and this step is short. If you used Lovable Cloud, the backend runs on Supabase but is managed through Lovable, and you should plan a move into a Supabase project you control before launch.",
        },
        {
          type: "table",
          caption: "Lovable Cloud compared with your own Supabase project for a production app",
          columns: ["Question", "Lovable Cloud", "Your own Supabase project"],
          rows: [
            ["Who holds the account", "Managed through your Lovable workspace", "Your organisation, under your billing"],
            ["Day to day access", "Through Lovable's Cloud views", "Full dashboard, SQL editor and CLI"],
            ["Staging and production", "Not a natural fit", "Separate projects or branches per environment"],
            ["Schema changes", "Usually made by prompting", "Migration files reviewed in the repository"],
            ["Backups and restores", "Check what your Lovable plan offers", "Set by your Supabase plan, under your control"],
            ["Leaving later", "Export and import, with auth reconfigured", "Nothing to move, it is already yours"],
          ],
        },
        {
          type: "paragraph",
          text: "Moving out of Lovable Cloud means recreating the schema in a new Supabase project, copying table data, copying storage files, recreating secrets and reconfiguring sign-in providers. Lovable documents a manual route based on exporting each table as CSV, and some third-party tools automate more of it. Rehearse the move on a fresh project first, and check whether user passwords will carry across. If they will not, plan a password reset or magic link email at launch.",
        },
        { type: "subheading", text: "Collect the accounts" },
        {
          type: "checklist",
          items: [
            "GitHub repository in the company organisation, main branch protected",
            "Supabase project owned by the company, with at least two admins",
            "Domain registrar and DNS in the company's name",
            "Stripe, email provider, AI provider and analytics accounts owned by the company",
            "Every API key listed in a password manager, with who issued it",
            "OAuth apps for Google or GitHub sign-in registered under the company",
          ],
        },
        { type: "subheading", text: "Write down what the app actually does" },
        {
          type: "paragraph",
          text: "Before anyone changes code, make an inventory: every table, policy, edge function, storage bucket, environment variable, scheduled job and third-party integration, plus each user role and what it can see. Then click through the app as each role and note the behaviour users rely on, including the parts nobody planned, such as an email that only sends because a component happens to call a function on load. This list becomes the test plan for every later phase.",
        },
      ],
    },
    {
      id: "phase-2-security",
      heading: "Phase 2. Lock down the data",
      blocks: [
        {
          type: "paragraph",
          text: "Security is the phase that matters most, because a Lovable app's browser talks to Supabase directly. The public key that ships in the frontend can query any table, so the database's row level security policies are the only thing stopping one user reading another user's data. In 2025 researchers found many apps built this way with tables anyone could read.",
        },
        { type: "subheading", text: "Audit every table, not just the obvious ones" },
        {
          type: "paragraph",
          text: "Open the Supabase dashboard, list every table in the public schema and every storage bucket, and check two things for each: is row level security switched on, and does each policy match who should really see the data. Generated policies tend to fall into a few patterns, and so do the fixes.",
        },
        {
          type: "table",
          caption: "Common row level security problems in generated apps, and the policy each table should have",
          columns: ["Kind of table", "What we often find", "What it should be"],
          rows: [
            ["User profiles", "Any signed in user can read every profile", "Users read and edit their own row; public fields exposed through a view"],
            ["User-owned records", "Security switched off, or a policy that allows everything", "Select, insert, update and delete limited to rows where user_id matches auth.uid()"],
            ["Team or organisation data", "Checks the user is signed in, not that they belong to the team", "A membership check against a members table, ideally in one security definer function"],
            ["Admin tables", "Role read from a column the user can update themselves", "Roles kept in a table users cannot write to, or in a custom claim"],
            ["Public content", "Anyone can read, and anyone can also write", "Public select only; writes limited to admins or an edge function"],
            ["Storage buckets", "Private uploads in a public bucket", "A private bucket, per-user folder policies and signed URLs"],
          ],
        },
        {
          type: "paragraph",
          text: "Write the fixes as migration files rather than clicking them into the dashboard, so they are reviewed and land in every environment the same way. Supabase's security advisor flags tables with row level security switched off, which is a quick first pass, but it cannot tell you whether a policy that exists is the right one.",
        },
        { type: "subheading", text: "Move secrets out of the browser" },
        {
          type: "paragraph",
          text: "Payment, email and AI provider keys belong in edge functions or a server, never in frontend code. Search the repository and the built JavaScript for anything that looks like a secret key, including the Supabase service role key, which bypasses every policy. Rotate any key that has ever been in the frontend, even briefly, because it may already sit in someone's browser cache or a public commit.",
        },
        { type: "subheading", text: "Validate on the server" },
        {
          type: "paragraph",
          text: "Forms validated only in the browser can be bypassed with a few lines in the developer console. Anything that costs money, sends email, calls a paid AI model or changes another user's data should run through an edge function that checks the input and the caller's permissions. Rate limit those functions too: an open endpoint that calls a language model is an invitation to run up your bill.",
        },
        { type: "subheading", text: "Tighten the sign-in settings" },
        {
          type: "paragraph",
          text: "Prototype settings are tuned for speed, not safety. In the Supabase auth settings, require email confirmation, set a sensible minimum password length, restrict redirect URLs to your real domains rather than wildcards, and switch off any sign-in providers the app does not use. If anyone can sign up, decide what a brand new account is allowed to see before your policies are tested, because that is the account an attacker will create.",
        },
        { type: "subheading", text: "Prove it as an attacker would" },
        {
          type: "checklist",
          items: [
            "Signed out, try to read every table with the public key",
            "Signed in as user A, try to read and edit user B's records",
            "Signed in as a team member, try to reach another team's data",
            "As an ordinary user, try to set your own role to admin",
            "Try to download a private file using its path alone",
            "Call each edge function without a session and with someone else's",
          ],
        },
      ],
    },
    {
      id: "phase-3-environments",
      heading: "Phase 3. Separate development, staging and production",
      blocks: [
        {
          type: "paragraph",
          text: "Once the data is safe, give the app somewhere to change without risking real users. That means separate Supabase environments, schema changes that live in the repository, and a preview of every change before it ships.",
        },
        { type: "subheading", text: "One backend per environment" },
        {
          type: "paragraph",
          text: "Create a staging Supabase project alongside production, and run a local stack with the Supabase CLI for development. Staging should have the same schema and policies as production, with fake or anonymised data, never a copy of real customer records.",
        },
        { type: "subheading", text: "Schema changes only through migrations" },
        {
          type: "paragraph",
          text: "Pull the current production schema into migration files with the Supabase CLI, commit them, and treat the dashboard as read-only from then on. Every new column, index or policy becomes a migration that is reviewed, applied to staging, tested and then applied to production. Generate TypeScript types from the schema at the same time, so the frontend fails to compile when a column it relies on changes.",
        },
        { type: "subheading", text: "Previews and secrets per environment" },
        {
          type: "paragraph",
          text: "Host the frontend somewhere that builds a preview for every pull request, such as Vercel, Netlify or Cloudflare Pages, and point previews at staging. Keep each environment's keys in that host's environment settings and in Supabase's edge function secrets, never in a committed file.",
        },
      ],
    },
    {
      id: "phase-4-maintainability",
      heading: "Phase 4. Make the code something a team can change",
      blocks: [
        {
          type: "paragraph",
          text: "Refactor only where it hurts, then add tests and monitoring around the flows that make money. Generated components are often long, repeated and tightly coupled, but rewriting screens that nobody touches is a poor use of a budget.",
        },
        {
          type: "list",
          items: [
            {
              term: "Split the busiest components",
              text: "Find the files you change most often and break them into smaller pieces with clear props. Leave stable, rarely edited screens alone.",
            },
            {
              term: "Centralise data fetching",
              text: "Generated apps often call Supabase from dozens of components with slightly different queries. Move those calls into a small data layer, with one function per query, so a schema change touches one file.",
            },
            {
              term: "Remove dead code",
              text: "Prompted iteration leaves behind unused components, pages and packages. Deleting them makes the codebase smaller to review and the bundle smaller to download.",
            },
            {
              term: "Test the money paths",
              text: "Write end-to-end tests for sign-up, sign-in, payment and the core workflow, and run them on every pull request against staging.",
            },
            {
              term: "Watch production",
              text: "Add error tracking in the frontend and edge functions, uptime checks, and confirm that database backups exist and that you have restored from one at least once.",
            },
          ],
        },
      ],
    },
    {
      id: "phase-5-rendering",
      heading: "Phase 5. Decide how public pages render",
      blocks: [
        {
          type: "paragraph",
          text: "If the app sits behind a login, keep the Vite build. If public pages need to rank in search, move those pages to server rendering. A Vite single page app renders in the browser, which is fine for a dashboard and a handicap for landing pages, listings and articles that need to be indexed and shared.",
        },
        {
          type: "paragraph",
          text: "There are two common routes. The lighter one is to put the marketing site on its own, built with a site builder or a small Next.js project, and keep the Lovable app on a subdomain such as app.yourdomain.com. The heavier one is to port the whole app to Next.js, which suits products where public pages are generated from the database, such as a directory or marketplace. Most React components carry across, so the port is mostly routing and data loading rather than a rewrite.",
        },
      ],
    },
    {
      id: "phase-6-cutover",
      heading: "Phase 6. Cut over and keep a way back",
      blocks: [
        {
          type: "paragraph",
          text: "Launch by pointing the domain at the new hosting, then keep the Lovable project frozen and read-only for a few weeks as a fallback. If you moved out of Lovable Cloud, run the final data copy in a short, announced window and compare row counts before you switch.",
        },
        {
          type: "checklist",
          items: [
            "Production environment variables set and checked against staging",
            "Final data copy run and row counts compared, if leaving Lovable Cloud",
            "Auth redirect URLs and OAuth callbacks updated for the new domain",
            "Stripe and other webhooks pointed at the production endpoints",
            "DNS changed, with a short time to live set a day beforehand",
            "Password reset or magic link email ready, if passwords did not carry over",
            "Error tracking watched closely for the first 48 hours",
            "Lovable project left untouched until the new setup has run cleanly for a few weeks",
          ],
        },
      ],
    },
    {
      id: "when-to-rebuild",
      heading: "When a rebuild is the honest answer",
      blocks: [
        {
          type: "paragraph",
          text: "Rebuild only when the data model is wrong, not when the code is untidy. Untidy code can be refactored a piece at a time. A schema that cannot represent the business, such as a single owner per record when customers now need teams, or prices stored as text, affects every screen and every policy, and fixing it inside the generated code can cost more than starting from a clean design.",
        },
        {
          type: "paragraph",
          text: "Even then the Lovable app is valuable. It is a working specification that users have already tested, and many of its components can be lifted straight into the new project. If you are still changing the product daily, with no paying users and no sensitive data, hold off on all of this and keep learning in Lovable. Start the runbook once breaking the app would cost you customers or trust, and keep Lovable around for throwaway prototypes of new features if your team likes it.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Lovable?",
      answer:
        "Yes. Lovable syncs the full source of your app to a GitHub repository you connect. It is a standard React, TypeScript and Vite project that you can run, host and change without Lovable, with Supabase as the backend.",
    },
    {
      question: "Is a Lovable app secure enough for production?",
      answer:
        "Not by default. Because the browser talks to Supabase directly, every table needs row level security switched on, with policies that are reviewed and tested as ordinary users and as someone signed out. Secret keys must live in edge functions or a server, never in the frontend.",
    },
    {
      question: "How long does it take to move a Lovable app to production?",
      answer:
        "Typically three to eight weeks. The range depends on how many tables and user roles the app has, whether the backend needs moving out of Lovable Cloud, and whether public pages need moving to server rendering for search.",
    },
  ],
}
