import boltLogo from "@/assets/blog/logos/bolt.svg"
import type { BlogPost } from "@/lib/blog/types"

export const bolt: BlogPost = {
  slug: "migrate-from-bolt",
  title: "Seven things to fix before your Bolt.new app goes live",
  series: "migration",
  topic: "Bolt.new",
  logo: boltLogo,
  category: "AI app builders",
  description:
    "Seven problems that break Bolt.new apps once real users arrive, from the WebContainer gap and leaked keys to Supabase auth and Netlify deploys, and the fixes.",
  summary:
    "A Bolt.new app that works in the preview usually has seven gaps before it is safe for real users: sandbox-only behaviour, exposed secrets, open database tables, a backend you don't fully own, half-configured auth, fragile deploys and no monitoring. All seven are fixable in the code Bolt wrote, so most apps need hardening rather than a rebuild.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "webcontainer-gap",
      heading: "1. It only works inside the WebContainer",
      blocks: [
        {
          type: "paragraph",
          text: "Don't trust the preview. Bolt runs your project in a StackBlitz WebContainer, a Node.js environment that lives inside your browser tab, and plenty of code that runs happily there fails a clean production build somewhere else. The preview has been patched up by prompt after prompt; nobody has ever installed it from scratch.",
        },
        {
          type: "paragraph",
          text: "WebContainers can't run native binaries, so Bolt quietly reaches for pure JavaScript alternatives. Dependency versions drift as the AI adds packages. Type errors that the dev server shrugs off stop a strict build dead.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Push the project to GitHub, clone it onto a laptop, delete node_modules, then run a fresh install and a production build. Anything that fails here would have failed on your host.",
            },
            {
              term: "The fix",
              text: "Pin the Node version in the project, commit the lockfile, fix every build error rather than switching checks off, and make that clean build the thing your host runs on every deploy.",
            },
          ],
        },
      ],
    },
    {
      id: "secrets",
      heading: "2. Your secrets are in the bundle, or in Git",
      blocks: [
        {
          type: "paragraph",
          text: "Assume at least one key has leaked until you've checked. Most Bolt apps are React with Vite, and Vite copies any environment variable starting with VITE_ straight into the JavaScript every visitor downloads. When a prompt says to add a Stripe or OpenAI key, it often ends up there.",
        },
        {
          type: "paragraph",
          text: "The second leak is the .env file itself. Bolt keeps it in the project so the preview works, and depending on how the repository was set up, it can be pushed to GitHub along with everything else.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Search the built files for anything that looks like a secret key, and search the repository history, not just the latest commit, for a .env file.",
            },
            {
              term: "The fix",
              text: "Rotate every key that was exposed, because deleting the file doesn't remove it from history. Move secret calls into Supabase edge functions or a small server, keep only the public Supabase URL and anon key in the frontend, and add .env to .gitignore.",
            },
          ],
        },
      ],
    },
    {
      id: "open-tables",
      heading: "3. Anyone can read the database",
      blocks: [
        {
          type: "paragraph",
          text: "If row level security is off or loosely written, any visitor can query your tables directly. The browser talks to Supabase with the anon key, which is public by design, so the only thing standing between one user and another user's records is the policy on each table.",
        },
        {
          type: "paragraph",
          text: "AI-written policies tend to fail in a specific way: they exist, but they say any signed-in user can read every row. The app looks right because the interface filters to your own data. The database doesn't.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Open the security advisor in the Supabase dashboard, which flags tables with security switched off. Then sign in as a test user and query another user's rows from the browser console.",
            },
            {
              term: "The fix",
              text: "Turn on row level security for every table, write policies that match each real role, and move anything that charges money or changes another user's data into an edge function that checks permissions on the server.",
            },
          ],
        },
      ],
    },
    {
      id: "backend-ownership",
      heading: "4. The backend isn't in your account yet",
      blocks: [
        {
          type: "paragraph",
          text: "Check who owns the database before you change anything else. Newer Bolt projects use Bolt Database, which is built on Supabase, and until you claim it into a Supabase organisation you control, you don't hold the keys to your own users and data.",
        },
        {
          type: "paragraph",
          text: "The trap here is connecting a fresh Supabase project to an app that already has a Bolt Database. Bolt warns that this replaces the connection and can lose data. Claiming moves the existing database across; reconnecting starts again.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Look for the project in your own Supabase dashboard. If it isn't there, or it sits under a personal account rather than the company, it isn't fully yours.",
            },
            {
              term: "The fix",
              text: "Claim the database, then compare tables, users, storage buckets and edge function secrets against what the live app uses. Confirm with Bolt what the claim covers for your project before cancelling anything.",
            },
          ],
        },
      ],
    },
    {
      id: "auth-edge-cases",
      heading: "5. Sign-up works for you and nobody else",
      blocks: [
        {
          type: "paragraph",
          text: "Auth is usually tested once, by the founder, on the happy path. Real users click confirmation links on their phones, reset passwords and sign in with Google, and each of those depends on settings the preview never exercised.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Sign up with a new email address on the deployed site, on a phone. Then reset the password, and sign in with every social provider you offer. Watch which address each email link points at.",
            },
            {
              term: "The fix",
              text: "Set the Site URL and redirect URLs in Supabase to your real domain. Add a page that actually handles password resets. Connect your own email provider through custom SMTP, because Supabase's built-in email is rate limited and meant for testing. Register each OAuth provider's callback for the production domain.",
            },
          ],
        },
      ],
    },
    {
      id: "deploy-defaults",
      heading: "6. The deploy depends on Netlify defaults you never chose",
      blocks: [
        {
          type: "paragraph",
          text: "A one-click deploy from Bolt gets a site online, not a release process. Bolt's Netlify integration and its own hosting both make sensible guesses, and the gaps show up as soon as someone refreshes a page or you change a setting.",
        },
        {
          type: "list",
          items: [
            "Refreshing any page other than the home page returns a 404, because a single page app needs a rewrite rule sending every path to index.html.",
            "Changing an environment variable in the host does nothing until the next build, because Vite bakes values in at build time.",
            "The Netlify site sits in an account Bolt created for you, unclaimed, so nobody on your team can see the build logs.",
            "There are no preview builds, so every change goes straight to the address your customers use.",
          ],
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Deep link to an inner page and refresh it. Then try to find the build log for the last deploy.",
            },
            {
              term: "The fix",
              text: "Claim or recreate the site in your own Netlify or Vercel account, deploy from GitHub, add the single page app rewrite, keep variables per environment and turn on preview builds for every pull request. Put the app on a custom domain you control.",
            },
          ],
        },
      ],
    },
    {
      id: "no-safety-net",
      heading: "7. Nothing tells you when it breaks",
      blocks: [
        {
          type: "paragraph",
          text: "A Bolt app usually ships with no error tracking, no tested backups and no staging copy, and schema changes have been made by prompt directly against the only database there is. You find out about problems from customers.",
        },
        {
          type: "list",
          items: [
            {
              term: "How to spot it",
              text: "Ask three questions. Where would I see an error a user hit an hour ago? When did I last restore a backup? Where can I try a schema change without touching live data?",
            },
            {
              term: "The fix",
              text: "Add error tracking such as Sentry and an uptime check. Create a separate staging Supabase project, keep every schema change in a migration file in the repository, and check what backups your Supabase plan includes. Write automated tests for sign-up, payment and the one job the app exists to do.",
            },
          ],
        },
        {
          type: "callout",
          title: "Stop prompting once developers start",
          text: "Pick a date after which changes happen in the repository, not in Bolt. Two copies edited in parallel drift apart within days. Bolt is still useful afterwards for sketching a feature before it's built properly.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from Bolt.new?",
      answer:
        "Yes. Connect GitHub so Bolt pushes the project to a repository you own, or download it as a ZIP file. The result is a standard project for the framework you chose, often React with Vite, and it runs without Bolt.",
    },
    {
      question: "Do I need to rebuild my Bolt.new app from scratch?",
      answer:
        "Usually not. Most Bolt.new apps can be kept and hardened: claiming the database, securing it with row level security, moving secrets to the server, fixing the deploy and adding tests. A rebuild only makes sense when the app's basic design no longer fits the business.",
    },
    {
      question: "How long does it take to get a Bolt.new app ready for production?",
      answer:
        "Typically three to eight weeks, depending on how many features and user roles the app has, how much of the code needs tidying, and whether public pages need server rendering to rank in search.",
    },
    {
      question: "Should I keep using Bolt.new after moving my app to GitHub?",
      answer:
        "Use Bolt.new for sketching new ideas, not for editing the live app. Once developers work in the GitHub repository, prompting changes in Bolt at the same time creates two versions that drift apart. Prototype in Bolt, then build the feature properly in the repository.",
    },
  ],
}
