import lovableBackupRestoreDrill from "@/assets/blog/images/lovable-backup-restore-drill.webp"
import lovableBackupWhatEachCopyCovers from "@/assets/blog/images/lovable-backup-what-each-copy-covers.webp"
import lovableLogo from "@/assets/blog/logos/lovable.svg"
import type { BlogPost } from "@/lib/blog/types"

export const lovableAppBackup: BlogPost = {
  slug: "lovable-app-backup",
  title: "How to make a Lovable app backup you can restore",
  series: "migration",
  topic: "Lovable",
  logo: lovableLogo,
  category: "AI app builders",
  description:
    "A Lovable app backup needs four copies: code, a database export, storage files and secrets. How to take each one, and how to prove it restores.",
  summary:
    "A Lovable app backup is four separate copies: the code, the database, the uploaded files and the secrets and settings. Lovable's version history only covers the code, and its daily database backups stay inside Lovable, so keep your own copy of each part outside it. Then restore that copy into a fresh project once, so you know it works before you need it.",
  datePublished: "2026-11-09",
  facts: [
    { label: "Version history covers", value: "Code only" },
    { label: "Cloud database backups", value: "Daily, about 14 days kept" },
    { label: "Not in the database export", value: "Uploaded files" },
    { label: "The real test", value: "A restore into a new project" },
  ],
  sections: [
    {
      id: "what-lovable-keeps",
      heading: "Does Lovable back up your app already?",
      blocks: [
        {
          type: "paragraph",
          text: "Partly. Lovable keeps two kinds of copies for you, and each covers half the app. Version history records every change to the code, and you can restore any earlier version. If the app runs on Lovable Cloud, Lovable also takes a daily backup of the database and keeps about two weeks of them.",
        },
        {
          type: "image",
          image: lovableBackupWhatEachCopyCovers,
          alt: "Diagram: version history covers code, daily backups cover the database, and only your own backup covers everything.",
        },
        {
          type: "paragraph",
          text: "Three gaps remain. Restoring a code version does not roll the database back, and restoring a database backup does not touch the code, so getting both to the same moment is up to you. Both restores are all or nothing: a database restore also throws away every order, sign-up and edit made since that backup. And both copies live inside Lovable, so neither helps if you lose the account, the workspace or the project.",
        },
        {
          type: "paragraph",
          text: "Lovable's copies are good for undoing a bad prompt from this morning. They are not a backup in the sense your customers would mean: a copy of everything, held by you, that you have restored at least once.",
        },
      ],
    },
    {
      id: "what-a-backup-includes",
      heading: "What a complete Lovable app backup includes",
      blocks: [
        {
          type: "paragraph",
          text: "Four parts, each copied a different way. Most lost data in Lovable apps comes from the parts people forget: the files users uploaded and the keys that connect the app to everything else.",
        },
        {
          type: "table",
          caption: "The four parts of a Lovable app backup, where each lives and how to copy it",
          columns: ["Part", "Where it lives", "How to copy it", "How often"],
          rows: [
            ["Code", "Lovable, synced to a GitHub repository", "A second clone of the repository outside GitHub", "Daily while you build, plus a tag at each release"],
            ["Database", "Lovable Cloud or your own Supabase project", "Lovable's database export, or a Supabase CLI dump", "Weekly, and before any big change"],
            ["Uploaded files", "Storage buckets in the same backend", "A separate download of every bucket", "Weekly, or daily if users upload a lot"],
            ["Secrets and settings", "Cloud secrets, Supabase settings, other dashboards", "A written list in a password manager", "Whenever one changes"],
          ],
        },
      ],
    },
    {
      id: "back-up-the-code",
      heading: "Back up the code without breaking GitHub sync",
      blocks: [
        {
          type: "paragraph",
          text: "Connect the project to GitHub, leave that repository exactly where it is, and copy it somewhere else. Lovable syncs both ways with one branch, normally main. Its documentation warns that renaming, moving or deleting a connected repository, or the account or organisation that holds it, breaks the sync, and its FAQ says the break is permanent. So the repository Lovable pushes to is not the thing to tidy up.",
        },
        {
          type: "paragraph",
          text: "A mirror clone is the simplest second copy. Running git clone --mirror against the repository gives you every branch, tag and commit, and running git remote update inside it later fetches whatever has changed. Keep it on a machine or storage account that isn't signed in with the same GitHub login, so one compromised account can't delete both.",
        },
        {
          type: "paragraph",
          text: "Git history keeps every commit Lovable makes, which is useful and also hard to read: an afternoon of prompting can leave fifty commits. Tag the commit each time the app is in a state you would be happy to go back to, such as v1.3 or before-payments, so a restore starts from a known good point rather than a guess.",
        },
      ],
    },
    {
      id: "back-up-the-database",
      heading: "Export the database, whichever backend you use",
      blocks: [
        {
          type: "paragraph",
          text: "How you export depends on where the database runs. Check the Cloud tab: if it shows Lovable's own database settings, you are on Lovable Cloud; if the project connects to a Supabase project in your own Supabase account, you have direct access and more options.",
        },
        { type: "subheading", text: "On Lovable Cloud" },
        {
          type: "paragraph",
          text: "In the Cloud tab, open Advanced settings, find the Database card and start an export. Lovable emails you when it is ready and saves the file to the project's storage. Download it straight away and keep it outside Lovable, because an export left in the project's storage disappears with the project, and Lovable says exports can't be downloaded once Cloud is removed.",
        },
        {
          type: "paragraph",
          text: "The export covers the database's structure and data. It does not include files in storage buckets, which need their own copy. Treat the file as you would the live database: it holds every customer record, so store it encrypted and limit who can open it.",
        },
        { type: "subheading", text: "On your own Supabase project" },
        {
          type: "paragraph",
          text: "Supabase includes daily backups on its paid plans, and how many days it keeps depends on the plan. On the free plan, don't count on one. Either way, take your own dump with the Supabase CLI: supabase db dump with --role-only for database roles, with no flag for the schema, and with --data-only for the rows. Three files, restored in that order, rebuild the database in a new project.",
        },
        {
          type: "paragraph",
          text: "Check that your users can still sign in after a restore. Sign-in accounts live in Supabase's auth tables, not in your own tables, and a backup that brings back every order but not the accounts that placed them leaves every user resetting their password. The restore test below catches this.",
        },
      ],
    },
    {
      id: "files-and-secrets",
      heading: "Copy uploaded files and secrets separately",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing in a database export brings back an uploaded file. Profile photos, invoices and documents sit in storage buckets, and the database only holds their paths. Restore the rows without the files and every image in the app shows as broken.",
        },
        {
          type: "paragraph",
          text: "List the buckets in the backend's storage view, then download each one in full: on your own Supabase project, the CLI's storage commands or a short script against the storage API will copy a whole bucket, folder by folder. Note which buckets are public and which are private, because a restored bucket with the wrong setting either breaks the app or exposes files it shouldn't.",
        },
        {
          type: "paragraph",
          text: "Secrets are the part you can't download later. Many dashboards show a key once and then hide it. Keep a list in a password manager as you add each one:",
        },
        {
          type: "checklist",
          items: [
            "Every secret the app's edge functions read, with which service issued it",
            "Sign-in providers switched on, and the OAuth client IDs for Google or GitHub sign-in",
            "Allowed redirect URLs and the site URL in the auth settings",
            "Each edge function's name, and any scheduled jobs that call them",
            "Webhook endpoints registered with Stripe or other services",
            "The domain's DNS records, and who holds the registrar login",
          ],
        },
      ],
    },
    {
      id: "export-wont-run",
      heading: "Why exported Lovable code won't run, and how to fix it",
      blocks: [
        {
          type: "paragraph",
          text: "Usually because something the Lovable editor supplied quietly is missing outside it. The code itself is a standard React and TypeScript project built with Vite, so the fixes are short once you know which piece is absent.",
        },
        {
          type: "list",
          items: [
            {
              term: "Blank screen or a Supabase error on load",
              text: "The environment variables are missing. Vite only passes variables starting with VITE_ to the browser, and they must be set before the build. Open the Supabase client file in the repository, note the variable names it reads, and put the project URL and public key in a .env file under those names.",
            },
            {
              term: "npm install fails",
              text: "Often a Node.js version mismatch. Use a current long-term support release of Node. If the repository has more than one lockfile, such as one for npm and one for Bun, pick one package manager and delete the other lockfile.",
            },
            {
              term: "Pages work until you refresh",
              text: "The app routes in the browser, so a static host returns a 404 for any address but the home page. Add a rewrite that sends every path to index.html; Vercel, Netlify and Cloudflare Pages all support one.",
            },
            {
              term: "Sign-in redirects back to the Lovable preview",
              text: "The auth settings only allow the old addresses. Add localhost and the new domain to the allowed redirect URLs and update the site URL.",
            },
            {
              term: "Features that call a function do nothing",
              text: "Edge functions and database migrations sit in the supabase folder of the repository but aren't running in a new project until you deploy them with the Supabase CLI and set their secrets.",
            },
          ],
        },
      ],
    },
    {
      id: "restore-drill",
      heading: "Prove the backup with a restore",
      blocks: [
        {
          type: "paragraph",
          text: "Restore everything into a fresh Supabase project and a local copy of the code, then use the app as a customer would. It takes an afternoon the first time, and it is the only way to find the gap before an outage does.",
        },
        {
          type: "image",
          image: lovableBackupRestoreDrill,
          alt: "Four restore steps: new Supabase project, schema and data, files and secrets, then sign in and compare.",
        },
        {
          type: "checklist",
          items: [
            "New Supabase project created, separate from production",
            "Roles, schema and data restored, in that order, without errors",
            "Every bucket uploaded again with its public or private setting",
            "Secrets set and edge functions deployed",
            "App running locally against the restored project, from a tagged commit",
            "Signed in as an existing test user, with no password reset",
            "Row counts for the main tables match production",
            "A few uploaded files open from inside the app",
          ],
        },
        {
          type: "paragraph",
          text: "Write down each step as you go, because whoever restores it for real may be in a hurry and may not be you. Repeat the drill after any big change to the schema, and once more before launch, when it can go on the same list as the legal pages, payments and analytics.",
          link: { text: "Build that list with the free App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
        {
          type: "paragraph",
          text: "A restore you have tested is also the safety net for the rest of the launch work, since deploys and rollbacks are one of the seven areas worth auditing in any AI-built app, alongside data access and secrets. We test the restore on every app we take to production.",
          link: { text: "Run the seven-area audit on your app.", href: "/blog/vibe-coding-to-production" },
        },
        {
          type: "paragraph",
          text: "If the restore shows the app should leave Lovable Cloud altogether, the same exports are where that move starts.",
          link: { text: "The phased runbook for taking a Lovable app to production.", href: "/blog/migrate-from-lovable" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I recover a deleted Lovable project?",
      answer:
        "For a while. Lovable says it keeps a deleted project's code, version history, chat, settings and knowledge for 60 days. Don't rely on that for the database or uploaded files: export those before you delete anything.",
    },
    {
      question: "Does remixing a Lovable project count as a backup?",
      answer:
        "Not really. A remix makes an independent copy of the project inside Lovable, which is handy for trying a risky change. It still lives in Lovable, so it won't help if you lose the account or workspace, and you should check what it copied before treating it as a copy of your data.",
    },
    {
      question: "How do I transfer ownership of a Lovable project?",
      answer:
        "From Project settings. An owner can transfer a project to another member of the workspace, and on Business and Enterprise plans can send a transfer request to a Lovable account outside it. Projects can also move to another workspace. Take a full backup first, and check what happens to the GitHub connection and the backend before you transfer.",
    },
  ],
}
