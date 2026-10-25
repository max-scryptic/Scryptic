import type { BlogPost } from "@/lib/blog/types"
import { mvp } from "@/lib/services"

export const n8nAlternatives: BlogPost = {
  slug: "n8n-alternatives",
  title: "n8n alternatives, and when to build your own instead",
  series: "automation",
  topic: "n8n",
  description:
    "The best n8n alternatives grouped by what you need: hosted tools, open source, developer platforms, Microsoft 365 and AI agents, and when custom code wins.",
  summary:
    "The right n8n alternative depends on why you're leaving: Make or Zapier if you don't want to run servers, Activepieces if you want open source that feels like n8n, and Trigger.dev or Inngest if developers own the work. If the workflow has become the product, skip the next tool and write it as code in your own backend.",
  datePublished: "2026-10-14",
  sections: [
    {
      id: "what-you-give-up",
      heading: "Every alternative gives up one of three things",
      blocks: [
        {
          type: "paragraph",
          text: "n8n is visual, self-hostable and source available, and no alternative keeps all three. Hosted tools drop self-hosting, code-first platforms drop the canvas, and the properly open source options are smaller. So the useful question isn't which tool is best, it's which of those three you're happy to lose.",
        },
        {
          type: "paragraph",
          text: "Your reason for leaving usually answers it. The licence is one: n8n's Sustainable Use License is fair-code, not OSI open source, so selling n8n as a service or building it into a product your customers log into needs a commercial deal. Running it is another: the Community Edition is free, but the server, Postgres, queue mode, upgrades and backups are yours. And sometimes the workflow has simply turned into a program, forty nodes and a Code node full of JavaScript, with no tests and no diff you can read. Find yours in the groups below.",
        },
      ],
    },
    {
      id: "hosted-simplicity",
      heading: "If you want hosted simplicity",
      blocks: [
        {
          type: "paragraph",
          text: "Pick Make. Coming from n8n, it's the hosted tool that feels most familiar, and nobody on your team will ever need to SSH into anything again.",
        },
        { type: "subheading", text: "Make" },
        {
          type: "paragraph",
          text: "Routers, iterators and proper data mapping, so branching flows translate across with little rethinking. Credit-based pricing usually works out cheaper than Zapier for anything with branches.",
        },
        { type: "subheading", text: "Zapier" },
        {
          type: "paragraph",
          text: "The biggest integration catalogue and the gentlest learning curve, and the right call for a non-technical team with simple, linear Zaps. It bills per task, so a ten step Zap that runs a few thousand times a month gets expensive fast.",
        },
        { type: "subheading", text: "Pabbly Connect" },
        {
          type: "paragraph",
          text: "The budget option. Internal steps like filters and routers aren't charged, and it has sold lifetime plans. The integrations are thinner and the editor less pleasant, and teams whose flows grow more involved tend to end up on Make or back on n8n.",
        },
      ],
    },
    {
      id: "open-source",
      heading: "If you want open source you can run yourself",
      blocks: [
        {
          type: "paragraph",
          text: "Activepieces is the closest swap. Windmill and Node-RED are good tools too, but they solve different problems.",
        },
        { type: "subheading", text: "Activepieces" },
        {
          type: "paragraph",
          text: "A visual flow builder that looks and works much like n8n, with an MIT licensed core, so the licence questions mostly go away. Integrations are written in TypeScript, which makes one for an internal API a reasonable afternoon's work. SSO and audit logs sit under a commercial licence.",
        },
        { type: "subheading", text: "Windmill" },
        {
          type: "paragraph",
          text: "You write scripts in Python, TypeScript, Go, Bash or SQL, and Windmill turns them into scheduled jobs, workflows and quick internal UIs. The core is AGPLv3. If your team would rather write a function than drag a node, this fits better than n8n ever did.",
        },
        { type: "subheading", text: "Node-RED" },
        {
          type: "paragraph",
          text: "Mature, Apache 2.0 licensed and run under the OpenJS Foundation. It's at home with MQTT, sensors and a Raspberry Pi, and the wrong tool for connecting HubSpot to Slack, because the SaaS integrations are patchy.",
        },
        {
          type: "callout",
          title: "Open source still means running it",
          text: "Swapping n8n for another self-hosted tool changes the licence, not the ops work. You still need monitoring, someone who upgrades it, and backups you've actually restored from.",
        },
      ],
    },
    {
      id: "developer-durability",
      heading: "If you need developer-grade durability",
      blocks: [
        {
          type: "paragraph",
          text: "Use a code-first job platform. You write normal functions in your own repository, reviewed and tested like the rest of the code, and the platform handles retries, schedules, long waits and a dashboard of what ran and what failed.",
        },
        { type: "subheading", text: "Trigger.dev" },
        {
          type: "paragraph",
          text: "Background tasks in TypeScript with no short timeouts, built-in retries and a clear run log. Apache 2.0, hosted or self-hosted. For a Next.js or Node team it's our default pick.",
        },
        { type: "subheading", text: "Inngest" },
        {
          type: "paragraph",
          text: "Durable functions split into steps, each retried and remembered on its own, so a failed email send doesn't re-charge the card from the step before. It pairs well with serverless hosting. The SDKs are Apache 2.0 and the server is source available.",
        },
        { type: "subheading", text: "Temporal" },
        {
          type: "paragraph",
          text: "The heavyweight: an MIT licensed server, a managed cloud and SDKs in several languages, excellent for payments, provisioning and processes that run for weeks. For a five person startup it's usually more machinery than the problem needs.",
        },
        { type: "subheading", text: "Pipedream" },
        {
          type: "paragraph",
          text: "Halfway between no-code and code, with Node.js or Python steps, a big catalogue of integrations and managed OAuth. Workday announced a deal to acquire it in late 2025, so check the roadmap before building anything big on it.",
        },
      ],
    },
    {
      id: "microsoft-365",
      heading: "If your company runs on Microsoft 365",
      blocks: [
        { type: "subheading", text: "Power Automate" },
        {
          type: "paragraph",
          text: "It's the obvious choice inside Microsoft 365 and a clumsy one outside it. It's wired into Outlook, Teams, SharePoint, Excel and Dynamics, many business plans already include cloud flows with standard connectors, and desktop flows can click through old Windows apps with no API. The catch is premium connectors: HTTP requests, SQL databases and custom connectors need a premium licence, so a flow that looked free stops being free the moment it calls an outside API. Flows also belong to whoever built them, and break when that person leaves.",
        },
      ],
    },
    {
      id: "ai-agents",
      heading: "If AI agents are the core",
      blocks: [
        {
          type: "paragraph",
          text: "Keep internal agents in n8n and write customer-facing ones in code. The AI Agent node connects a chat model to memory and tools, including sub-workflows and MCP servers, and it's fine for triaging an inbox or drafting replies for a human to approve. Prototyping a product idea there is sensible too.",
        },
        {
          type: "paragraph",
          text: "Once customers talk to the agent, rewrite it with the model provider's SDK or the Vercel AI SDK. In code you can rerun a set of saved conversations against every prompt change, keep prompts and tool definitions in Git, stream into your own interface with per-user tool permissions, and log tokens per user so one runaway loop can't cost more than that customer's subscription.",
        },
      ],
    },
    {
      id: "build-your-own",
      heading: "If the workflow has become the product",
      blocks: [
        {
          type: "paragraph",
          text: "Build your own. When the workflow is the thing you sell, or the thing you can't operate without, moving to another automation tool just relocates the problems. The signs are concrete: customers see the output and want logins and invoices, you want to sell the workflow to other businesses, edge cases need tests (a Stripe webhook that arrives twice must not book the same class twice), or the hosted bill tracks your customer count.",
        },
        {
          type: "paragraph",
          text: `That doesn't mean writing a workflow engine. It means a TypeScript backend with Postgres, Trigger.dev or Inngest for background work, and direct API calls to the services your nodes used to reach. Leave the low stakes automations in whatever tool your team likes. That's the stack we usually build on at Scryptic; a build like this starts from ${mvp.price}, and the quote grows with the number of workflows it replaces.`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is n8n open source?",
      answer:
        "Not strictly. The source is public and the Community Edition is free to self-host, but the Sustainable Use License limits offering n8n as a service to others, so it isn't an OSI approved licence. Activepieces, Node-RED, Trigger.dev and Temporal all use OSI approved licences.",
    },
    {
      question: "What is the best open source Zapier alternative?",
      answer:
        "Activepieces, which has a similar visual builder and an MIT licensed core. Windmill is the better choice if your team prefers writing scripts to dragging nodes, and Node-RED suits hardware and IoT work.",
    },
    {
      question: "Can I use n8n to build a SaaS product?",
      answer:
        "You can run n8n behind your own product to process your own data. Offering n8n itself to customers, or connecting it to their accounts as part of your product, generally needs a commercial licence, so read the current terms for your case. Most teams building a real SaaS move the core workflows into their own code.",
    },
  ],
}
