import replitLogo from "@/assets/blog/logos/replit.svg"
import type { BlogPost } from "@/lib/blog/types"

export const replit: BlogPost = {
  slug: "migrate-from-replit",
  title: "Taking a Replit Agent app to production, week by week",
  series: "migration",
  topic: "Replit",
  logo: replitLogo,
  category: "AI app builders",
  description:
    "A week by week walkthrough of taking a Replit Agent app to production: owning the code, fixing access checks, replacing Replit Auth and cutting over safely.",
  summary:
    "A Replit Agent app is ordinary code on a Postgres database, so you can usually keep it and harden it rather than rebuild it. This walkthrough follows a hypothetical booking tool from the first git push to launch day over about six weeks, and shows where the Replit specific decisions come up.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "the-example",
      heading: "The app we'll follow",
      blocks: [
        {
          type: "paragraph",
          text: "Say you built a booking tool on Replit with Replit Agent. Independent fitness instructors use it to publish classes, their clients book and pay, and everyone gets a reminder email the evening before. Agent gave you a React frontend, a Node.js server, Replit's built-in Postgres database and Replit Auth for sign-in. Class photos are uploaded to Replit's object storage. You've got around 40 instructors and a few hundred of their clients, and people are starting to pay.",
        },
        {
          type: "paragraph",
          text: "It works. The question is whether it's ready for the instructor who emails to ask how their clients' details are protected, or for the developer you're about to bring in who wants to see what changed last Tuesday. That's the gap between a working app and a production app, and closing it took our imaginary founder about six weeks.",
        },
        {
          type: "callout",
          title: "This is an illustrative example",
          text: "The booking tool, its numbers and its timeline are made up to show the order things usually happen in. It isn't a client story. Your own app will have different parts, but the Replit specific decisions in each week are real ones.",
        },
      ],
    },
    {
      id: "week-1",
      heading: "Week 1. Get the code out of the workspace",
      blocks: [
        {
          type: "paragraph",
          text: "The first job is ownership: the code goes into a GitHub repository that belongs to your business, and from then on every change is reviewed before it's published. Nothing about the app changes yet.",
        },
        {
          type: "paragraph",
          text: "Our founder connects GitHub from the Git pane and pushes the project to a new repository in the company's GitHub organisation, not a personal account. A ZIP download would also work, but it gives you a snapshot rather than a history you can keep adding to. The push doesn't include secrets, so the next hour goes on copying every value out of the Secrets pane into a password manager: the Stripe keys, the email provider's API key, the database connection strings.",
        },
        {
          type: "paragraph",
          text: "Then comes an inventory of everything the app leans on that only exists inside Replit. For the booking tool it looks like this:",
        },
        {
          type: "list",
          items: [
            "Replit Auth, which signs every user in with a Replit account.",
            "Two Postgres databases, one for development and one for the published app.",
            "Object storage holding the class photos.",
            "A scheduled deployment that sends the reminder emails each evening.",
            "Environment variables Replit sets automatically, such as the app's domain, which the auth code reads.",
            "The .replit and replit.nix files, which configure the workspace and won't be needed anywhere else.",
          ],
        },
        {
          type: "paragraph",
          text: "Last, a house rule. Agent is still allowed to help, but only on a branch, and its changes reach production through a pull request like anyone else's. Letting Agent edit the live copy while a developer works in the repository is how two versions of the same app quietly drift apart.",
        },
      ],
    },
    {
      id: "week-2",
      heading: "Week 2. Make it run somewhere other than Replit",
      blocks: [
        {
          type: "paragraph",
          text: "If the app only runs inside the workspace, you don't really own it yet. Week two is about cloning the repository onto a laptop and getting it running against a copy of the real data.",
        },
        {
          type: "paragraph",
          text: "Most of the friction is small. The server listens on whatever port Replit expected. The auth code reads Replit's own environment variables and falls over without them. A package was installed in the workspace but never written into package.json. Each fix is a few minutes; finding them is the work.",
        },
        {
          type: "paragraph",
          text: "For data, the founder takes a pg_dump of the production database, not the development one. They're both standard Postgres and easy to mix up, and a staging copy full of test bookings tells you nothing. The dump is restored into a local database and a hosted staging database, and from now on staging is where every change gets checked first.",
        },
      ],
    },
    {
      id: "week-3",
      heading: "Week 3. Find out who can see whose bookings",
      blocks: [
        {
          type: "paragraph",
          text: "This is the most important week, because the bugs it finds are the ones that end up in an apology email. Generated servers usually check that someone is signed in. They often don't check that the record being asked for belongs to them.",
        },
        {
          type: "paragraph",
          text: "In our example, the route that returns a booking by its ID only checks for a session. Any signed-in client who changes the number in the URL can read another client's booking, including their name and phone number. The fix is one line per route, a check that the booking belongs to the user or to the instructor running the class, but it has to be done on every route, and the only way to be sure is to go through them one by one.",
        },
        {
          type: "paragraph",
          text: "The same pass covers the other basics. Request bodies get validated on the server with a schema library, so a booking can't be created for a class that's already full by sending a hand-written request. Queries are checked to make sure they use parameters or the ORM rather than strings stitched together from user input. Agent often sets projects up with Drizzle, which helps here.",
        },
        {
          type: "paragraph",
          text: "Database changes get the same treatment as code. Instead of pushing schema changes straight to the database when the app is published, they become migration files in the repository that someone reads before they run.",
        },
      ],
    },
    {
      id: "week-4",
      heading: "Week 4. Decide what to do about Replit Auth",
      blocks: [
        {
          type: "paragraph",
          text: "Replit Auth is fine if your users are developers who already have Replit accounts. Fitness clients aren't, so in our example it goes. If your users don't mind the Replit sign-in, keeping it is a perfectly reasonable choice and saves a week.",
        },
        {
          type: "paragraph",
          text: "The founder picks a hosted auth provider with email magic links, so nobody has to invent a password. Clerk is a common choice for Replit apps and Replit has published guidance on moving to it; Supabase Auth or Auth.js would also work. What matters more than the provider is how existing users arrive on the other side.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Export the user table, keyed on email address, which both systems share.",
            "Create matching accounts in the new provider and store the new ID next to the old one.",
            "Change every foreign key that pointed at the Replit user ID, so bookings and classes follow their owners.",
            "Write the email that tells users the sign-in screen is changing and why, and schedule it for the day before cutover.",
          ],
        },
        {
          type: "paragraph",
          text: "Users who sign in with a screen they don't recognise assume something is wrong. A short heads-up email costs nothing and saves a week of support replies.",
        },
      ],
    },
    {
      id: "week-5",
      heading: "Week 5. Tests, staging and the hosting question",
      blocks: [
        {
          type: "paragraph",
          text: "By now the code is owned, runs anywhere and is safe to share. Week five adds the safety net: tests on the flows that cost money if they break, and a decision about where the app lives.",
        },
        {
          type: "paragraph",
          text: "The tests aren't exhaustive. They cover signing in, booking a class, paying, cancelling inside and outside the refund window, and the reminder job picking the right people. Those run on every pull request, and staging gets a deploy on every merge so the founder can click through before anything reaches instructors. Error tracking and uptime alerts go in at the same time, along with a backup that someone actually restores to prove it works.",
        },
        {
          type: "paragraph",
          text: "Then hosting. Leaving Replit is optional. Replit Deployments can run a production app on Autoscale or a Reserved VM, and scheduled deployments handle jobs like the reminder emails. Plenty of teams keep all of that and only change how code reaches it. Our founder weighs it up:",
        },
        {
          type: "list",
          items: [
            {
              term: "Stay on Replit",
              text: "Least change, and the separate development and production databases already exist. The cost is keeping deployment tied to the workspace rather than to the repository.",
            },
            {
              term: "Move to a platform such as Render, Railway or Fly.io",
              text: "Deploys straight from GitHub, with a managed Postgres and a worker for the reminders. More setup, more control over regions and scaling.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "In the example, the founder moves, mainly because a UK hosting region matters to two of the larger instructors. Photos go from Replit's object storage to an S3 compatible bucket, copied with a short script that also rewrites the stored URLs.",
        },
      ],
    },
    {
      id: "week-6",
      heading: "Week 6. Rehearse, then cut over",
      blocks: [
        {
          type: "paragraph",
          text: "Cutover is a rehearsed routine, not a leap. The founder runs the whole move on staging twice before doing it for real.",
        },
        {
          type: "paragraph",
          text: "Each rehearsal takes a fresh dump of the Replit production database, restores it to the new database, runs the user mapping from week four and compares row counts for users, classes, bookings and payments. The second rehearsal is timed, which turns into the length of the maintenance window: about forty minutes on a Sunday evening, announced to instructors a week ahead.",
        },
        {
          type: "paragraph",
          text: "On the night, the Replit app goes into read-only mode, the final dump is taken and restored, the counts are checked, and the domain is pointed at the new deployment. Stripe's webhook endpoint is updated in the same window, so no payment confirmation lands on the old server. The Replit deployment is then paused, not deleted. It stays that way for a month, in case anything needs comparing or the switch needs reversing.",
        },
      ],
    },
    {
      id: "your-timeline",
      heading: "How your own timeline might differ",
      blocks: [
        {
          type: "paragraph",
          text: "Six weeks is the middle of the range. Most Replit apps we'd expect to take three to eight weeks to get to this point, and the decisions in weeks four and five move the number most.",
        },
        {
          type: "paragraph",
          text: "If you keep Replit Auth and Replit hosting, weeks four and five largely disappear and three weeks is realistic. If the app has several user roles, money moving between parties, or code that Agent rewrote in several different directions, the security review and tidying in week three can easily double. And if the original design no longer fits what the product has become, a rebuild on the same database can beat hardening, though that's rarer than people expect with Agent's fairly standard output.",
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
