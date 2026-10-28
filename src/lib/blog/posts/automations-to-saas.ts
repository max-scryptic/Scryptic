import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const automationsToSaas: BlogPost = {
  slug: "turn-automations-into-a-saas-product",
  title: "Ten signs your automations should become a SaaS product",
  series: "automation",
  topic: "Automation",
  description:
    "A ten point self-assessment for Zapier, Make and n8n workflows: tick the signals, read your score, and see what the first version of the SaaS should include.",
  summary:
    "Your automations should become a SaaS product when you keep rebuilding the same workflow for each client and they pay you mostly to keep it running. Tick the ten signals below: six or more means it's time to build, three to five means start preparing, and fewer means the no-code tool is still the right home.",
  datePublished: "2026-10-14",
  dateModified: "2026-10-28",
  sections: [
    {
      id: "the-signals",
      heading: "Tick the signals that are true for you",
      blocks: [
        {
          type: "paragraph",
          text: "Ten signals, one point each. The first five say the workflow is a product. The second five say the tool it lives in can't carry it much further. Be honest; the score only helps if it's accurate.",
        },
        {
          type: "checklist",
          items: [
            "You run the same Zapier, Make or n8n workflow for three or more clients, duplicated and edited per client.",
            "Prospects in the same industry keep asking for exactly the same thing.",
            "Clients pay you mainly to keep the workflow running, not for new work.",
            "Onboarding a client means a call where you connect their accounts and test everything by hand.",
            "Clients email you to change a setting because there's nowhere for them to change it themselves.",
            "Your automation bill rises with every client, because every client adds tasks or executions.",
            "A step has failed quietly and a client told you before your monitoring did.",
            "A spreadsheet is acting as your database, and someone fixes rows by hand most weeks.",
            "Only one person can safely edit the workflows.",
            "You're reselling a tool to clients without checking its licence allows it.",
          ],
        },
      ],
    },
    {
      id: "your-score",
      heading: "What your score means",
      blocks: [
        {
          type: "paragraph",
          text: "Count your ticks. The score tells you whether to build now, prepare, or leave things alone, and it weights product signals and tool signals equally on purpose: you need both a product and a reason to leave the tool.",
        },
        {
          type: "table",
          caption: "What to do based on how many signals you ticked",
          columns: ["Score", "Verdict", "What to do next"],
          rows: [
            ["0 to 2", "Stay in the tool", "Tidy the workflows, add error alerts, and revisit in six months. If cost is the only problem, compare Make or self-hosted n8n before anything else."],
            ["3 to 5", "Start preparing", "Standardise the workflow so every client runs the same version, move the spreadsheet into a real database, and write down exactly what the workflow does."],
            ["6 or more", "Build the product", "The workflow is the product and the tool is the bottleneck. Scope a first version around one workflow and one type of customer."],
          ],
        },
        {
          type: "paragraph",
          text: "Two ticks count for more than one point. If a step has failed silently and a client noticed first, treat reliability as urgent whatever your score. And if you ticked the last box, check the licence this week: n8n's licence restricts offering it to clients as a service without a commercial agreement, and other tools have their own terms. Rebuilding the workflow in your own code removes that question, along with the forty copies of the same workflow.",
        },
        {
          type: "paragraph",
          text: "A low score isn't a failure. Most automations should stay exactly where they are, and a Zap that posts new leads into Slack doesn't need a backend.",
        },
      ],
    },
    {
      id: "first-version",
      heading: "What the first version of the product should be",
      blocks: [
        {
          type: "paragraph",
          text: "The first version is the one workflow you already run, rebuilt so a client can sign up, connect their accounts, pay and use it without talking to you. Nothing more. It's tempting to build a general workflow builder. Don't; your clients are buying the result, not the canvas.",
        },
        {
          type: "list",
          items: [
            {
              term: "Accounts and organisations",
              text: "Each client is an organisation with its own users, and every row in the database belongs to one. Decide this on day one, because adding it later is painful.",
            },
            {
              term: "Self-serve onboarding",
              text: "The client connects their own accounts through OAuth and your code stores and refreshes the tokens. This replaces the onboarding call, and in practice it's where much of the build time goes, because every API has its quirks.",
            },
            {
              term: "A settings page",
              text: "The five fields you used to edit per client become a form the client fills in.",
            },
            {
              term: "Jobs with retries and a run history",
              text: "Each workflow becomes a background job with retries, timeouts and an alert when it fails for real. Clients see a list of recent runs, so they stop emailing to ask whether it worked.",
            },
            {
              term: "Stripe billing",
              text: "Subscriptions, a trial and the customer portal, with webhooks switching access on and off. Store each event ID, because Stripe can deliver the same webhook twice.",
            },
            {
              term: "An admin view for you",
              text: "Every client, their status and their failed runs on one screen.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Leave out a workflow builder, a mobile app, integrations nobody has asked for yet and a public API. Each can come later, once paying customers ask for it.",
        },
        {
          type: "paragraph",
          text: "Underneath, the mapping is straightforward. Workflows become jobs on a queue such as Trigger.dev, Inngest or a Postgres-backed queue. The spreadsheet becomes Postgres tables with real types and foreign keys. Incoming webhooks become your own endpoints that check signatures and hand work to a job. The logic barely changes; it just moves somewhere you can test it and see when it fails.",
        },
        {
          type: "paragraph",
          text: `Keep the old automations running for existing clients until the product can serve them, then move them across one at a time. When we build this kind of first version, it's a fixed price per sprint: two weeks at ${mvp.price} + VAT, or three at ${extendedMvp.price} + VAT. If your workflows need more than that, we'll say so before quoting.`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I replace Zapier with custom code?",
      answer:
        "Yes. Each Zap becomes a background job, triggers become webhooks or scheduled jobs, and connected apps become direct API calls. Move the important workflows first and leave cheap, low risk ones, such as internal notifications, in Zapier.",
    },
    {
      question: "What does it mean to productise a service?",
      answer:
        "It means turning work you deliver by hand for each client into a standard offer at a fixed price, often as software customers use themselves. For an automation agency, it usually means turning a workflow you keep rebuilding per client into a self-serve SaaS product.",
    },
    {
      question: "Do I have to move all my automations at once?",
      answer:
        "No, and it's safer not to. Move one workflow at a time, run the new version alongside the old one until the results match on real data, then switch over. Simple internal automations can stay in a no-code tool for good.",
    },
  ],
}
