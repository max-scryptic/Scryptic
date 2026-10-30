import type { BlogPost } from "@/lib/blog/types"

export const selfHostingN8n: BlogPost = {
  slug: "self-hosting-n8n",
  title: "The self-hosted n8n production runbook",
  series: "automation",
  topic: "n8n",
  icon: "server",
  description:
    "A runbook for self-hosted n8n: set up Docker Compose with Postgres and HTTPS, harden the editor and webhooks, run backups and alerts, and upgrade safely.",
  summary:
    "Self-hosted n8n is free for automating your own business, and a production setup is Docker Compose, Postgres, a reverse proxy for HTTPS and a safely stored encryption key. Keeping it healthy then means hardening access, backing up and restoring, pruning old executions and upgrading on a staging copy first. The server is cheap; the hours spent looking after it are the real cost.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Licence", value: "Sustainable Use License" },
    { label: "Software cost", value: "Free for internal use" },
    { label: "Database", value: "Postgres, not SQLite" },
    { label: "Scaling", value: "Queue mode with Redis" },
  ],
  sections: [
    {
      id: "before-you-start",
      heading: "Before you start",
      blocks: [
        {
          type: "paragraph",
          text: "The n8n quick start is a single Docker command, and it gives you a demo: SQLite, no HTTPS, no backups. A production instance takes roughly a dozen more decisions, and this runbook works through them in the order you will meet them: set up, harden, run, upgrade.",
        },
        {
          type: "paragraph",
          text: "Two questions come first. Is self-hosting allowed for what you want to do, and is it worth doing at all? The n8n Community Edition is free to self-host under the Sustainable Use License, with no cap on workflows or executions, for internal business use. Automating your own operations is fine, and so is an agency charging clients to build and maintain workflows on its instance. Hosting n8n and charging people to use it, white-labelling it, or letting paying customers build their own workflows needs a commercial agreement with n8n. Licence terms change, so read the current text and ask n8n if you are unsure; this is not legal advice.",
        },
        {
          type: "paragraph",
          text: "If nobody on the team wants to be paged when a server falls over, use n8n Cloud. Self-host when your volumes make Cloud plans expensive, when data has to stay in the UK or on your own network, or when n8n must reach internal systems that are not on the internet. Workflows export in either direction later, but credentials do not, so budget time to reconnect accounts if you ever switch.",
        },
        {
          type: "table",
          caption: "Common ways to host n8n and what each suits",
          columns: ["Option", "Suits", "Effort to run"],
          rows: [
            ["n8n Cloud", "Teams with no one to look after a server", "Lowest, n8n handles hosting and updates"],
            ["One VPS with Docker Compose", "Most small and medium teams", "Low to moderate, you own updates and backups"],
            ["Managed container platform", "Teams already running containers there", "Moderate, with managed Postgres alongside"],
            ["Kubernetes with queue mode", "High volumes or strict internal hosting rules", "High, worth it only with an ops team"],
          ],
        },
        {
          type: "paragraph",
          text: "At the time of writing a suitable VPS typically costs somewhere around £5 to £25 a month, with a managed database or backup storage adding a little more. Size memory generously rather than CPU: workflows that handle large files or long AI responses hold that data in memory, and running out of memory is the most common way a small instance falls over.",
        },
      ],
    },
    {
      id: "set-up",
      heading: "1. Set up",
      blocks: [
        {
          type: "paragraph",
          text: "Run the official n8n image with Docker Compose, on Postgres, behind a reverse proxy that handles HTTPS. Give the server to n8n alone.",
        },
        {
          type: "subheading",
          text: "The stack",
        },
        {
          type: "list",
          items: [
            {
              term: "n8n",
              text: "The official image, pinned to an exact version tag rather than latest, with its data folder on a persistent volume. Pinning means an unplanned restart cannot quietly upgrade you.",
            },
            {
              term: "Postgres",
              text: "In its own container or as a managed database. SQLite is the default and fine for trying n8n out, but Postgres copes with concurrent executions and backs up cleanly.",
            },
            {
              term: "A reverse proxy",
              text: "Caddy, Nginx or Traefik in front, handling certificates. Caddy is the least fiddly. It should be the only thing listening on public ports.",
            },
          ],
        },
        {
          type: "subheading",
          text: "Settings to get right on day one",
        },
        {
          type: "checklist",
          items: [
            "N8N_ENCRYPTION_KEY set by you, not generated and forgotten",
            "The encryption key copied into a password manager or secrets store",
            "DB_TYPE set to postgresdb, with the Postgres connection details",
            "WEBHOOK_URL set to the public address, or webhook URLs will point at localhost",
            "N8N_PROXY_HOPS set to 1 when running behind a single reverse proxy",
            "GENERIC_TIMEZONE set, so scheduled workflows fire when you expect",
            "Execution data pruning on, with a maximum age that suits you",
            "Secrets in an env file that is never committed to Git",
          ],
        },
        {
          type: "callout",
          title: "The one setting you cannot lose",
          text: "n8n encrypts every stored credential with N8N_ENCRYPTION_KEY. Lose it and a perfectly good database restore leaves every credential unreadable, so each connection has to be set up again by hand. Store it separately from your backups, from the day you install.",
        },
        {
          type: "subheading",
          text: "Queue mode, later",
        },
        {
          type: "paragraph",
          text: "Start with a single instance. When one heavy workflow starts stalling the editor, switch EXECUTIONS_MODE to queue: the main instance pushes executions onto Redis and separate worker containers pick them up. Every worker needs the same encryption key and database connection as the main instance. n8n advises Postgres rather than SQLite in queue mode, which is one more reason to start on Postgres.",
        },
      ],
    },
    {
      id: "harden",
      heading: "2. Harden",
      blocks: [
        {
          type: "paragraph",
          text: "Treat n8n as one of the most sensitive systems you run, because it holds credentials for everything it connects to. Anyone who can edit a workflow can, in practice, use those accounts and run code on the server.",
        },
        {
          type: "subheading",
          text: "Access",
        },
        {
          type: "checklist",
          items: [
            "Editor behind a VPN, an IP allowlist or a single sign-on proxy, with webhook paths still reachable",
            "Two-factor authentication on every n8n account",
            "Editing rights only for people who need them",
            "Owner account details stored in the company password manager",
          ],
        },
        {
          type: "subheading",
          text: "Network",
        },
        {
          type: "checklist",
          items: [
            "Postgres, Redis and Docker ports never published to the internet",
            "Firewall allowing only SSH and the reverse proxy",
            "SSH by key only, with password login turned off",
            "Automatic security updates on for the host operating system",
          ],
        },
        {
          type: "subheading",
          text: "Workflows",
        },
        {
          type: "checklist",
          items: [
            "Public webhooks protected with header auth or a shared secret",
            "Webhook payloads checked before anything acts on them",
            "Code nodes left running in n8n's task runners, not with isolation turned off",
            "Community nodes vetted before install, since they run with n8n's access",
            "AI agents given only the tools they need, with an iteration cap per run",
            "Human approval before an agent refunds money, emails customers or deletes records",
          ],
        },
      ],
    },
    {
      id: "run",
      heading: "3. Run",
      blocks: [
        {
          type: "paragraph",
          text: "Day to day, a healthy instance needs three things: backups you have restored, alerts that reach a person, and a database that does not grow forever. Set them up once and check them monthly.",
        },
        {
          type: "subheading",
          text: "Backups",
        },
        {
          type: "list",
          items: [
            "Automated Postgres dumps, stored somewhere other than the n8n server.",
            "Workflows exported to a Git repository on a schedule with the n8n CLI's export:workflow command, so changes have history and can be reviewed.",
            "A restore test onto a fresh server at least once, and after any big change. A backup you have never restored is a guess.",
          ],
        },
        {
          type: "subheading",
          text: "Monitoring",
        },
        {
          type: "list",
          items: [
            "An uptime check on the n8n URL from outside the server.",
            "An error workflow, set on every production workflow, that messages a team channel when a run fails.",
            "Alerts on disk space and memory, the two resources that take small instances down.",
          ],
        },
        {
          type: "subheading",
          text: "Monthly checks",
        },
        {
          type: "checklist",
          items: [
            "Read the failed execution list and fix the causes, not just the runs",
            "Confirm the latest backup exists and has a sensible size",
            "Check disk usage and that execution pruning is working",
            "Review who has accounts and remove anyone who has left",
            "Look at the release notes for security fixes since your version",
          ],
        },
        {
          type: "paragraph",
          text: "Budget a few hours a month for this, more in a month with an incident. Put a price on that time before deciding self-hosting is the cheap option; at low volumes n8n Cloud often comes out ahead.",
        },
      ],
    },
    {
      id: "upgrade",
      heading: "4. Upgrade",
      blocks: [
        {
          type: "paragraph",
          text: "Upgrade on purpose, on a schedule, and on a staging copy first. n8n ships often, and a newer version can change the database schema when it starts, so the dependable way back from a bad upgrade is the backup you took just before it.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Read the release notes",
              text: "Every version between yours and the target, looking for breaking changes and node behaviour changes. Major versions need extra care: the move to 2.0, for example, changed how Code nodes run.",
            },
            {
              term: "Back up",
              text: "Take a fresh Postgres dump and confirm it completed.",
            },
            {
              term: "Upgrade staging",
              text: "Restore the backup onto a staging server, change the pinned version tag and start it.",
            },
            {
              term: "Test the workflows that matter",
              text: "Run the critical ones by hand, especially those with Code nodes, community nodes or AI agents.",
            },
            {
              term: "Upgrade production",
              text: "Change the tag, pull and restart in a quiet hour. In queue mode, move the main instance and every worker to the same version together.",
            },
            {
              term: "Watch the first day",
              text: "Keep an eye on failed executions and the error workflow. If something is badly wrong, restore the backup and pin the old tag.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Apply security releases promptly, outside the normal schedule if needed. Falling many versions behind makes each upgrade bigger and riskier, so small regular steps are safer than rare large ones.",
        },
        {
          type: "paragraph",
          text: "If the runbook starts to feel like a product, because customers use your workflows through portals, core logic lives in long Code nodes, or you are building accounts and billing out of workflows, n8n has probably become the wrong tool for that part. The usual move is to keep n8n for internal glue and rebuild the core as an application.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is n8n free for commercial use?",
      answer:
        "Yes, for internal business use. A company can self-host the Community Edition free to automate its own operations, and an agency can charge clients for building and maintaining workflows. Selling access to n8n itself, or letting paying customers build their own workflows on your instance, needs a commercial licence.",
    },
    {
      question: "What happens if I lose the n8n encryption key?",
      answer:
        "Your workflows survive, but every stored credential becomes unreadable and has to be entered again. Keep the key in a password manager or secrets store, separate from your database backups, from the day you install n8n.",
    },
  ],
}
