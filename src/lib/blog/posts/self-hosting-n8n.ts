import type { BlogPost } from "@/lib/blog/types"

export const selfHostingN8n: BlogPost = {
  slug: "self-hosting-n8n",
  title: "Self-hosting n8n in production",
  series: "automation",
  topic: "n8n",
  description:
    "How to run self-hosted n8n in production: what the free Community Edition allows, Docker, Postgres, queue mode, backups, security, costs and AI agents.",
  summary:
    "Self-hosted n8n is free for automating your own business under the Community Edition licence, but production means more than one Docker command: Postgres, HTTPS, a safely stored encryption key, backups, updates and alerts. The server is cheap. The real cost is the time someone spends looking after it.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Licence", value: "Sustainable Use License" },
    { label: "Software cost", value: "Free for internal use" },
    { label: "Database", value: "Postgres, not SQLite" },
    { label: "Scaling", value: "Queue mode with Redis" },
  ],
  sections: [
    {
      id: "is-n8n-free",
      heading: "Is self-hosted n8n free?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, if you're automating your own business. The n8n Community Edition is free to self-host under the Sustainable Use License, with no cap on workflows or executions. What the licence stops you doing is selling n8n itself, or a service whose value comes mostly from n8n.",
        },
        {
          type: "paragraph",
          text: "n8n calls this fair code, not open source, and the difference matters. You can use, modify and redistribute the software, but only for internal business purposes or non-commercial use, any redistribution has to be free, and the licence notices have to stay. Syncing your CRM to your database is fine. So is charging clients to build and maintain workflows on your instance, as long as they can't create or edit workflows themselves. Hosting n8n and charging people to use it, white-labelling it, or letting paying customers build their own workflows on it all need a commercial agreement with n8n.",
        },
        {
          type: "callout",
          title: "Read the current licence yourself",
          text: "Licence terms change, and the edge cases are where people get caught. If anything you build on n8n faces customers, read the current licence text and n8n's licence FAQ, and ask n8n directly if you're unsure. This isn't legal advice.",
        },
        {
          type: "paragraph",
          text: "Some features sit behind a paid self-hosted plan, such as single sign-on, Git-based version control and separate environments. A small technical team rarely misses them. A larger company with an IT department usually does.",
        },
      ],
    },
    {
      id: "cloud-or-self-hosted",
      heading: "Should you use n8n Cloud or self-host?",
      blocks: [
        {
          type: "paragraph",
          text: "Use n8n Cloud unless you have a specific reason not to. If nobody on the team wants to be paged when a server falls over, Cloud is the sensible default: n8n handles hosting, updates and backups, it's hosted in the EU at the time of writing, and you pay by plan with a monthly execution allowance.",
        },
        {
          type: "paragraph",
          text: "Self-host when one of three things is true: your volumes make the Cloud plans expensive, your data has to stay in the UK or on your own network, or n8n needs to reach internal systems that aren't on the internet. You can export workflows and move in either direction later, so this isn't a one-way door. Credentials don't travel with the export, though, so budget time to reconnect every account.",
        },
      ],
    },
    {
      id: "production-setup",
      heading: "What does a production n8n setup need?",
      blocks: [
        {
          type: "paragraph",
          text: "More than the one-line n8n Docker command from the quick start. That gets you a demo running on SQLite with no HTTPS and no backups. Here's what we'd put in place before anything important depends on it.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "A dedicated server",
              text: "A small Linux VPS is enough to start. Keep it for n8n alone, and give it more memory than you think: workflows that handle large files or long AI responses hold the data in memory, and running out of memory is the most common way a small instance falls over.",
            },
            {
              term: "Docker Compose with a pinned version",
              text: "Run the official n8n image through Compose, pin an exact version tag instead of latest, and put the n8n data folder on a persistent volume. Pinning means an unplanned restart can't quietly upgrade you.",
            },
            {
              term: "Postgres instead of SQLite",
              text: "n8n uses SQLite by default, which is fine for trying it out. In production use Postgres, in its own container or as a managed database, so concurrent executions don't fight over one file and backups are routine.",
            },
            {
              term: "HTTPS behind a reverse proxy",
              text: "Put Caddy, Nginx or Traefik in front to handle certificates. Caddy is the least fiddly. Set n8n's WEBHOOK_URL to the public address, or the webhook URLs n8n shows you will point at localhost.",
            },
            {
              term: "Queue mode once volume grows",
              text: "In queue mode the main instance pushes executions onto Redis and separate worker containers pick them up, so one heavy workflow can't stall the editor. Every worker needs the same encryption key and database connection as the main instance. Skip it until a single instance is struggling.",
            },
            {
              term: "Backups you've restored at least once",
              text: "Automated, off-server dumps of the Postgres database, plus workflows exported to a Git repository. Test a restore onto a fresh server. A backup you've never restored is a guess.",
            },
            {
              term: "A plan for updates",
              text: "n8n ships often. Read the release notes, try upgrades on a staging copy first, and give major versions extra care. The move to 2.0, for example, changed how Code nodes run.",
            },
            {
              term: "Monitoring and alerts",
              text: "An uptime check on the n8n URL, an error workflow that messages you when any workflow fails, and alerts on disk space. Turn on execution data pruning too, or the database grows until the disk fills.",
            },
          ],
        },
        {
          type: "callout",
          title: "Look after the encryption key",
          text: "n8n encrypts every stored credential with N8N_ENCRYPTION_KEY. Set it yourself, keep a copy in a password manager or secrets store, and never commit it. Lose it and a perfectly good database restore leaves every credential unreadable, so each connection has to be set up again by hand.",
        },
      ],
    },
    {
      id: "running-costs",
      heading: "How much does it cost to run n8n yourself?",
      blocks: [
        {
          type: "paragraph",
          text: "The hosting is cheap and the time isn't. At the time of writing a suitable VPS typically costs somewhere around £5 to £25 a month, and a managed database or backup storage adds a bit more. The bigger cost is the few hours a month someone spends on upgrades, failed runs and the odd incident, and that's in a quiet month.",
        },
        {
          type: "paragraph",
          text: "Queue mode adds Redis and worker servers, and AI-heavy workflows bring model provider bills that usually dwarf the hosting. Put a price on your own time, or a contractor's, before deciding self-hosting is the cheap option. At low volumes n8n Cloud often comes out ahead.",
        },
      ],
    },
    {
      id: "security",
      heading: "How do you keep a self-hosted n8n secure?",
      blocks: [
        {
          type: "paragraph",
          text: "Treat it as one of the most sensitive systems you run, because it holds credentials for everything it connects to. Anyone who can edit a workflow can, in practice, use those accounts and run code on the server.",
        },
        {
          type: "list",
          items: [
            "Keep the editor off the open internet if you can, behind a VPN, an IP allowlist or a single sign-on proxy, while leaving webhook paths reachable.",
            "Turn on two-factor authentication for every n8n account, and only give editing rights to people who need them.",
            "Never publish the Postgres, Redis or Docker ports. Only the reverse proxy should listen publicly.",
            "Protect public webhooks with header auth or a shared secret, and check the payload before acting on it.",
            "Leave Code nodes running in n8n's task runners. Turning off that isolation to make an old snippet work is a bad trade.",
            "Vet community nodes before installing them, since they run with n8n's access, and apply security releases promptly.",
          ],
        },
      ],
    },
    {
      id: "ai-agents",
      heading: "Can self-hosted n8n run AI agent workflows?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, and it's one of the better reasons to self-host. The n8n AI Agent node works the same as on Cloud, with chat memory, vector store lookups and tool calling, where a tool can be any other node or a whole sub-workflow. Self-hosting adds two things Cloud can't: agents can query internal databases directly, and you can point them at an open model on your own hardware, so prompts and documents never leave your network.",
        },
        {
          type: "callout",
          title: "Put limits on agents before they run unattended",
          text: "Give each agent only the tools it needs, cap the number of iterations per run, log every tool call, and add a human approval step before anything that refunds money, emails customers or deletes records. An agent stuck in a loop at 3am is expensive and hard to explain.",
        },
      ],
    },
    {
      id: "outgrown-n8n",
      heading: "What are the signs n8n has stopped being the right tool?",
      blocks: [
        {
          type: "paragraph",
          text: "You've outgrown it when you spend more time working around n8n than working in it, or when the workflows have quietly become a product. Self-hosting fixes cost and data control. It doesn't fix that.",
        },
        {
          type: "list",
          items: [
            "Customers use your workflows directly, through forms, portals or dashboards hung off webhooks.",
            "Core business logic lives in long Code nodes nobody can test or review properly.",
            "You need user accounts, roles, billing or an audit trail, and you're building them out of workflows and spreadsheets.",
            "Your plans are drifting towards what the licence restricts, such as clients building their own workflows.",
          ],
        },
        {
          type: "paragraph",
          text: "The usual move is to keep n8n for internal glue and rebuild the core as an application. When to turn your automations into a SaaS product covers how to make that call, and n8n vs Zapier vs Make for a growing business compares the hosted options. At Scryptic, full builds start from £10,000 depending on complexity, usually in TypeScript, Next.js and Postgres, with the code and every account in your name.",
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
      question: "Can I run n8n with Docker on a cheap VPS?",
      answer:
        "Yes. Docker is the usual way to self-host n8n, and a small VPS handles a lot of ordinary workflows. For production, run it with Docker Compose alongside Postgres and a reverse proxy for HTTPS, pin the image version, and back the database up somewhere other than that server.",
    },
    {
      question: "Do I need Postgres, or is SQLite fine?",
      answer:
        "Use Postgres for anything you depend on. SQLite is n8n's default and fine for testing, but Postgres copes better with concurrent executions, backs up cleanly, and n8n advises against SQLite once you move to queue mode.",
    },
    {
      question: "What is the difference between the n8n Community Edition and the paid plans?",
      answer:
        "The Community Edition gives you the editor, the integrations and the AI nodes with no execution limit. Paid plans, on n8n Cloud or as a self-hosted licence, add features for larger teams such as single sign-on, Git-based version control and separate environments, plus support from n8n.",
    },
    {
      question: "What happens if I lose the n8n encryption key?",
      answer:
        "Your workflows survive, but every stored credential becomes unreadable and has to be entered again. Keep the key in a password manager or secrets store, separate from your database backups, from the day you install n8n.",
    },
  ],
}
