import replitLogo from "@/assets/blog/logos/replit.svg"
import type { BlogPost } from "@/lib/blog/types"

export const replit: BlogPost = {
  slug: "migrate-from-replit",
  title: "Getting a Replit Agent app ready for production, week by week",
  series: "migration",
  topic: "Replit",
  logo: replitLogo,
  category: "AI app builders",
  description:
    "A week by week plan for taking your Replit Agent app to production: owning the code, fixing access checks, deciding on Replit Auth and cutting over safely.",
  summary:
    "A Replit Agent app is ordinary code on a Postgres database, so you can usually keep it and harden it rather than rebuild it. This plan sets out what to do in each of roughly six weeks, from the first git push to launch day, and where the Replit specific decisions come up along the way.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "starting-point",
      heading: "What Replit Agent has handed you",
      blocks: [
        {
          type: "paragraph",
          text: "Replit Agent usually leaves you with a standard web app, which is good news: the work ahead is hardening, not rewriting. The typical shape is a React frontend, a Node.js server, Replit's built-in Postgres database and, if you asked for accounts, Replit Auth for sign-in. Uploaded files tend to live in Replit's object storage, and recurring jobs such as reminder emails or nightly reports run as scheduled deployments.",
        },
        {
          type: "paragraph",
          text: "What's missing is everything around the code. Changes go live when someone presses publish, nobody reviews the history, and nobody has checked whether one user can read another user's data. The weeks below close that gap in the order that tends to work: ownership, portability, security, the sign-in and hosting decisions, then cutover. Treat them as stages rather than deadlines; the order matters more than the calendar.",
        },
      ],
    },
    {
      id: "week-1",
      heading: "Week 1. Get the code out of the workspace",
      blocks: [
        {
          type: "paragraph",
          text: "The first job is ownership: your code goes into a GitHub repository that belongs to your business, and from then on every change is reviewed before it's published. Nothing about the app itself changes yet.",
        },
        {
          type: "paragraph",
          text: "Connect GitHub from the Git pane and push the project to a new repository in your company's GitHub organisation, not a personal account. A ZIP download gives you a snapshot, not a history. Secrets aren't pushed, so copy every value out of the Secrets pane into a password manager: payment keys, email API keys, database connection strings and anything else Agent asked you to paste in.",
        },
        {
          type: "paragraph",
          text: "Then write down everything your app leans on that only exists inside Replit. Most Agent projects have some or all of these:",
        },
        {
          type: "list",
          items: [
            "Replit Auth, which signs every user in with a Replit account.",
            "Replit's Postgres, often as separate development and production databases.",
            "Object storage holding uploaded images or documents.",
            "Scheduled deployments that run recurring jobs.",
            "Environment variables Replit sets automatically, such as the app's domain, which the auth code often reads.",
            "The .replit and replit.nix files, which configure the workspace and won't be needed anywhere else.",
          ],
        },
        {
          type: "paragraph",
          text: "Last, set a house rule. Agent can still help, but only on a branch, and its changes reach production through a pull request like anyone else's. Letting Agent edit the live copy while a developer works in the repository is how two versions of the same app quietly drift apart.",
        },
      ],
    },
    {
      id: "week-2",
      heading: "Week 2. Make it run somewhere other than Replit",
      blocks: [
        {
          type: "paragraph",
          text: "If your app only runs inside the workspace, you don't really own it yet. Week two gets it running on a laptop against a copy of the real data.",
        },
        {
          type: "paragraph",
          text: "Most of the friction is small. The server listens on whatever port Replit expected. The auth code reads Replit's own environment variables and falls over without them. A package was installed in the workspace but never written into package.json. Each fix takes a few minutes; finding them is the work.",
        },
        {
          type: "paragraph",
          text: "For data, take a pg_dump of the production database, not the development one. They're easy to mix up, and test records tell you nothing about real use. Restore it into a local database and a hosted staging database, and from now on check every change on staging first.",
        },
      ],
    },
    {
      id: "week-3",
      heading: "Week 3. Find out who can see whose data",
      blocks: [
        {
          type: "paragraph",
          text: "This is the most important week, because the bugs it finds are the ones that end up in an apology email. Generated servers usually check that someone is signed in. They often don't check that the record being asked for belongs to that person.",
        },
        {
          type: "paragraph",
          text: "Start with every route that fetches, updates or deletes a record by its ID. If the route only checks for a session, any signed-in user who changes the number in the URL can read or change someone else's record. The fix is usually a line or two per route, checking that the record belongs to the current user, but it has to be done everywhere, and the only way to be sure is to read every route.",
        },
        {
          type: "checklist",
          items: [
            "Every route that takes an ID checks ownership, not just sign-in.",
            "Admin and staff routes check the user's role on the server, not just in the interface.",
            "Request bodies are validated on the server with a schema library such as Zod.",
            "Queries use parameters or the ORM, never strings stitched together from user input.",
            "API responses return only the fields the screen needs, not whole database rows.",
            "File uploads are checked for type and size, and stored files can't be fetched by guessing a URL.",
          ],
        },
        {
          type: "paragraph",
          text: "The interface isn't a security boundary: anyone can send a hand-written request, so the server has to refuse anything the screens would never allow. Agent often sets projects up with Drizzle, which makes parameterised queries the default.",
        },
        {
          type: "paragraph",
          text: "Database changes get the same treatment as code. Instead of pushing schema changes straight to the database when the app is published, turn them into migration files in the repository that someone reads before they run. If your project uses Drizzle, that means generating migrations with Drizzle Kit rather than relying on a push command.",
        },
      ],
    },
    {
      id: "week-4",
      heading: "Week 4. Decide what to do about Replit Auth",
      blocks: [
        {
          type: "paragraph",
          text: "Keep Replit Auth if your users are developers who already have Replit accounts; replace it if they aren't. Asking ordinary customers to create a Replit account adds friction and ties your user list to another platform.",
        },
        {
          type: "paragraph",
          text: "If you're replacing it, a hosted auth provider with email magic links or social sign-in saves you building password handling yourself. Clerk is a common choice for Replit apps and Replit has published guidance on moving to it; Supabase Auth or Auth.js would also work. What matters more than the provider is how your existing users arrive on the other side without losing their data.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Export your user table, keyed on email address, which both systems share.",
            "Create matching accounts in the new provider and store the new ID next to the old one.",
            "Update every foreign key that pointed at the Replit user ID, so each user's records follow them.",
            "Write the email that tells users the sign-in screen is changing and why, and schedule it for the day before cutover.",
          ],
        },
        {
          type: "paragraph",
          text: "Users who meet a sign-in screen they don't recognise assume something is wrong. A short heads-up email costs nothing and saves a week of support replies. If you keep Replit Auth, spend this week on whatever week three turned up.",
        },
      ],
    },
    {
      id: "week-5",
      heading: "Week 5. Tests, monitoring and the hosting question",
      blocks: [
        {
          type: "paragraph",
          text: "Week five adds the safety net: tests on the flows that cost money or trust if they break, and a decision about where the app lives.",
        },
        {
          type: "paragraph",
          text: "The tests don't need to be exhaustive. Cover signing in, the main thing your users come to do, taking payment, cancellations and refunds, and any scheduled job that decides who gets an email or a charge. Run them on every pull request, and deploy to staging on every merge so you can click through before anything reaches real users. Add error tracking and uptime alerts at the same time, along with a backup that someone actually restores to prove it works.",
        },
        {
          type: "paragraph",
          text: "Then hosting. Leaving Replit is optional. Replit Deployments can run a production app on Autoscale or a Reserved VM, and scheduled deployments handle recurring jobs. Plenty of teams keep all of that and only change how code reaches it.",
        },
        {
          type: "table",
          caption: "Staying on Replit hosting compared with moving to another platform",
          columns: ["Option", "What you get", "What it costs you"],
          rows: [
            [
              "Stay on Replit Deployments",
              "Least change; your databases, storage and scheduled jobs stay where they are.",
              "Deployment stays tied to the workspace rather than the repository.",
            ],
            [
              "Move to Render, Railway or Fly.io",
              "Deploys straight from GitHub, managed Postgres, workers for jobs, more choice of region.",
              "More setup now, and storage and jobs have to be moved too.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "The usual reasons to move are hosting region, for UK or EU data residency, cost at higher traffic, or wanting every deploy to come from the repository. If you move, files in Replit's object storage go to an S3 compatible bucket, copied with a short script that also rewrites any URLs stored in the database.",
        },
      ],
    },
    {
      id: "week-6",
      heading: "Week 6. Rehearse, then cut over",
      blocks: [
        {
          type: "paragraph",
          text: "Cutover should be a rehearsed routine, not a leap. Run the whole move on staging at least twice before doing it for real.",
        },
        {
          type: "paragraph",
          text: "Each rehearsal takes a fresh dump of the Replit production database, restores it to the new one, runs the user mapping from week four and compares row counts for every important table. Time the second rehearsal: that sets your maintenance window, which you announce to users a week ahead and schedule for your quietest hour.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Put the Replit app into read-only mode or show a maintenance page.",
            "Take the final dump, restore it and check the row counts against the last rehearsal.",
            "Point your domain at the new deployment.",
            "Update webhook endpoints with Stripe and any other provider, so no confirmation lands on the old server.",
            "Sign in as a real user, run the main flow end to end and watch error tracking for the first hour.",
          ],
        },
        {
          type: "paragraph",
          text: "Afterwards, pause the Replit deployment rather than deleting it, and leave it paused for a month. If anything needs comparing, or the switch needs reversing, it's still there.",
        },
      ],
    },
    {
      id: "your-timeline",
      heading: "How your own timeline may differ",
      blocks: [
        {
          type: "paragraph",
          text: "Most Replit Agent apps take three to eight weeks to reach this point, and the decisions in weeks four and five move the number most.",
        },
        {
          type: "paragraph",
          text: "Keep Replit Auth and Replit hosting and weeks four and five largely disappear, so three weeks is realistic. If your app has several user roles, money moving between parties, or code that Agent rewrote in several different directions, the security review and tidying in week three can easily double. And if the original design no longer fits what your product has become, a rebuild on the same database can beat hardening, though that's rarer than people expect with Agent's fairly standard output.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Replit?",
      answer:
        "Yes. You can push the project to a GitHub repository from the Git pane or download it as a ZIP file. Secrets are not included in either, so copy them from Replit's Secrets pane into your new environment separately.",
    },
    {
      question: "Do I have to leave Replit hosting to go to production?",
      answer:
        "No. Replit Deployments can host production apps, including Autoscale and Reserved VM options and scheduled jobs. What matters is owning the code in your own repository, reviewing and testing every change, and having monitoring and backups. Moving hosting is a separate decision driven by cost, control or region.",
    },
    {
      question: "Do I need to rebuild a Replit Agent app from scratch?",
      answer:
        "Usually not. Replit Agent writes standard code on common frameworks with a Postgres database, so most apps can be secured, tidied and tested in three to eight weeks rather than rewritten. A rebuild only makes sense when the original design no longer fits the product.",
    },
  ],
}
