import type { BlogPost } from "@/lib/blog/types"

export const automationsToSaas: BlogPost = {
  slug: "turn-automations-into-a-saas-product",
  title: "When to turn your automations into a SaaS product",
  series: "automation",
  topic: "Automation",
  description:
    "When Zapier or n8n automations should become custom code or a SaaS product: the signs, what moves where, how to compare costs, and a step by step plan.",
  summary:
    "Move your automations into custom code when they've become expensive, fragile or something the business can't run without, and turn them into a SaaS product when clients are paying you to run the same workflow for each of them. Either way, workflows become background jobs, spreadsheets become a Postgres database and webhooks become your own API endpoints, and the old automations keep running until the new system has proved itself.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Worth moving", value: "Costly or business critical flows" },
    { label: "Typical stack", value: "TypeScript, Postgres, Stripe" },
    { label: "Usual approach", value: "One workflow at a time" },
    { label: "Cost people forget", value: "Maintenance" },
  ],
  sections: [
    {
      id: "two-situations",
      heading: "When should automations become custom code or a SaaS product?",
      blocks: [
        {
          type: "paragraph",
          text: "There are two cases, and they end in different places. In the first, your internal automations have become the backbone of the business and need to be a proper backend. In the second, an automation you run for clients is really a product, and it can become a SaaS people sign up and pay for without you in the loop.",
        },
        {
          type: "paragraph",
          text: "Most automations should stay exactly where they are. A Zap that posts new leads into Slack doesn't need a backend, and rebuilding it would be a waste of money. The question is whether a particular workflow now carries enough money, risk or opportunity to be worth building properly.",
        },
      ],
    },
    {
      id: "internal-signs",
      heading: "What are the signs your internal automations need a proper backend?",
      blocks: [
        {
          type: "paragraph",
          text: "A bill that grows with your customer count, failures you hear about from customers, and one person who understands how it all hangs together. If Zapier feels too expensive or n8n feels too fragile to touch, the automations have outgrown the tool.",
        },
        {
          type: "list",
          items: [
            "Your Zapier, Make or n8n Cloud bill goes up every month because every new customer adds tasks or executions.",
            "A step fails quietly, and the first you hear of it is a customer asking where their invoice or onboarding email went.",
            "A Google Sheet is acting as your database, and someone fixes rows by hand most weeks.",
            "Workflows trigger other workflows, and nobody wants to change one because they're not sure what else it touches.",
            "Only one person can safely edit any of it, and their holiday makes you nervous.",
          ],
        },
        {
          type: "paragraph",
          text: "The one we'd take most seriously is silent failure. Expensive is annoying. Losing orders without knowing is how you lose customers.",
        },
      ],
    },
    {
      id: "product-signs",
      heading: "How do you know a client automation is really a product?",
      blocks: [
        {
          type: "paragraph",
          text: "When you set up the same workflow for every new client, change a few settings, and they pay you mostly to keep it running. That's a service you can productise. The value is in the workflow, and your time is the bottleneck.",
        },
        {
          type: "paragraph",
          text: "You'll recognise the pattern. You duplicate the same n8n workflow or Make scenario per client and edit five fields. Onboarding means a call where you connect their Google account and test everything by hand. Clients email you to change a setting because there's nowhere for them to do it. And prospects in the same industry keep asking for exactly the same thing.",
        },
        {
          type: "callout",
          title: "Check the licence before you scale",
          text: "Running a tool on behalf of lots of clients can hit licence terms. n8n in particular restricts offering it as a service without a commercial agreement. Rebuilding the workflow in your own code removes that question, and the forty copies of the same workflow with it.",
        },
      ],
    },
    {
      id: "what-moves-where",
      heading: "What does each part become in custom code?",
      blocks: [
        {
          type: "paragraph",
          text: "Every piece of a no-code automation has a direct equivalent in a normal backend, which is why replacing Zapier with custom code is less dramatic than it sounds. The logic barely changes. It just moves somewhere you can test it, version it and see when it fails.",
        },
        {
          type: "list",
          items: [
            {
              term: "Workflows become background jobs",
              text: "Each workflow becomes a function on a queue with retries, timeouts and an alert when it fails for real. Scheduled Zaps become scheduled jobs. Trigger.dev, Inngest or a Postgres backed queue does the plumbing.",
            },
            {
              term: "Spreadsheets become Postgres",
              text: "Tabs become tables, columns get real types, and the lookup columns become foreign keys. Our guide to using Google Sheets as a database, and when to move off it, covers this part.",
            },
            {
              term: "Webhooks become API endpoints",
              text: "Stripe, Typeform or a partner system posts to your own endpoint, which checks the signature, saves the event and hands it to a job. Saving the event ID matters: Stripe can deliver the same webhook twice, and you don't want to send two welcome packs.",
            },
            {
              term: "Shared logins become accounts and permissions",
              text: "Everyone gets their own login and a role. In a SaaS, every row belongs to a customer organisation, and every query checks it.",
            },
            {
              term: "Invoices become Stripe billing",
              text: "Subscriptions, trials and the customer portal replace sending invoices by hand, and Stripe webhooks switch access on and off as payments succeed or fail.",
            },
            {
              term: "Connected apps become integrations",
              text: "Each customer connects their own accounts through OAuth, and your code stores and refreshes the tokens. In practice this is where a lot of the build time goes, because every API has its own quirks.",
            },
          ],
        },
      ],
    },
    {
      id: "compare-costs",
      heading: "Is Zapier too expensive, or is custom code more expensive?",
      blocks: [
        {
          type: "paragraph",
          text: "Compare the full cost over a year or two, not the subscription against a hosting bill. Custom code costs a lot up front and little to run. No-code costs little up front, and the running cost grows with usage.",
        },
        {
          type: "paragraph",
          text: "On the automation side, price the plan you'll need in twelve months rather than the one you're on, then add the hours spent rerunning failed tasks and the cost of the mistakes that reached customers. On the code side, add the build, hosting, a managed database, a job platform, error tracking and maintenance. Maintenance is the line everyone leaves out. Packages need updating, a provider changes its API, and someone has to answer when a job starts failing at 2am.",
        },
        {
          type: "paragraph",
          text: "If cost is the only problem, don't rebuild. A cheaper Zapier alternative like Make or self-hosted n8n often fixes the bill in a week, and our guide n8n vs Zapier vs Make for a growing business compares them. Move to code when reliability or ownership are part of the problem too, or when there's a product to sell. A SaaS changes the maths completely, because the same work now earns a monthly subscription instead of your hours.",
        },
      ],
    },
    {
      id: "hybrid-approach",
      heading: "Should every automation move to code?",
      blocks: [
        {
          type: "paragraph",
          text: "No. Move the workflows that touch payments, customer data or the thing customers pay for, plus anything running thousands of times a day. Leave internal notifications, one-off reports and anything the ops team tweaks weekly in whichever tool they like.",
        },
        {
          type: "paragraph",
          text: "The two can live together happily. Have your backend send webhooks for events like a new signup or a failed payment, and let Zapier, Make or n8n pick those up. The ops team keeps building small automations themselves, on top of a core that doesn't fall over.",
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you move automations to custom code, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "One workflow at a time, with the old automation still running until its replacement has proved itself. The existing workflow is your specification, so don't switch it off early.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Write down everything",
              text: "Every workflow, trigger, schedule, sheet, connected account and webhook URL, with what breaks if it stops. You'll find at least one nobody remembered building.",
            },
            {
              term: "Pick the first workflow",
              text: "Start with the most expensive or the most fragile, not the most interesting.",
            },
            {
              term: "Design the data model",
              text: "Turn the sheets and tables into a Postgres schema. For a SaaS, decide now how customers and their data are kept apart. Retrofitting that later is painful.",
            },
            {
              term: "Build the core",
              text: "Backend, database, logins and a job queue. For a product, add Stripe billing and an onboarding flow a customer can finish without talking to you.",
            },
            {
              term: "Run it in shadow",
              text: "Run the new job alongside the old automation, write its results somewhere harmless, and compare the two until they match on real data.",
            },
            {
              term: "Move the data",
              text: "Script the import into Postgres, rehearse it on a copy, and check the row counts.",
            },
            {
              term: "Cut over",
              text: "Point webhooks at the new endpoints and pause the old workflow. Pause it, don't delete it, and keep it for a few weeks in case you need to switch back.",
            },
            {
              term: "Repeat, then cancel",
              text: "Do the next workflow the same way. Once the important ones have moved, downgrade the plans you're no longer using.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Expect a first release covering the core workflows to take weeks to a couple of months, not days. At Scryptic, full builds start from £10,000 depending on complexity, usually on TypeScript, Next.js and Postgres with Stripe, and you own the code and every account.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "When is Zapier too expensive?",
      answer:
        "When the bill grows with your customer count faster than the value of the work it does. If cost is the only issue, try Make or self-hosted n8n first. If reliability or ownership matter too, custom code is the better long term answer.",
    },
    {
      question: "Can I replace Zapier with custom code?",
      answer:
        "Yes. Each Zap becomes a background job, triggers become webhooks or scheduled jobs, and connected apps become direct API calls. Move the important workflows first and leave the cheap, low risk ones in Zapier.",
    },
    {
      question: "How do I turn an automation into a SaaS product?",
      answer:
        "Rebuild the workflow as a backend with its own database, logins and permissions, Stripe billing, and onboarding where customers connect their own accounts. Keep running the old automation for existing clients until the product can serve them, then move them across.",
    },
    {
      question: "What does it mean to productise a service?",
      answer:
        "It means turning work you deliver by hand for each client into a standard offer at a fixed price, often as software customers use themselves. For an automation agency, it usually means turning a workflow you keep rebuilding per client into a self-serve SaaS.",
    },
    {
      question: "Do I have to move all my automations at once?",
      answer:
        "No, and it's safer not to. Move one workflow at a time, run the new version alongside the old one until the results match, then switch. Simple internal automations can stay in a no-code tool for good.",
    },
  ],
}
