import type { BlogPost } from "@/lib/blog/types"
import { mvp } from "@/lib/services"

export const n8nVsZapierVsMake: BlogPost = {
  slug: "n8n-vs-zapier-vs-make",
  title: "n8n vs Zapier vs Make, scored for a growing business",
  series: "automation",
  topic: "n8n",
  description:
    "n8n vs Zapier vs Make scored side by side on pricing, ease of use, integrations, AI agents, self-hosting and GDPR, with a clear pick for each kind of team.",
  summary:
    "If you have anyone technical on the team, n8n is usually the best long-term pick: it charges per workflow run, handles real code and is the only one of the three you can host yourself. Zapier is the easiest to start with and connects to the most apps, and Make sits in between, cheaper than Zapier and friendlier than n8n.",
  datePublished: "2026-10-14",
  dateModified: "2026-10-28",
  facts: [
    { label: "Easiest to start", value: "Zapier" },
    { label: "Most integrations", value: "Zapier, in the thousands" },
    { label: "Cheapest at volume", value: "n8n, then Make" },
    { label: "Self-hosting", value: "n8n only" },
  ],
  sections: [
    {
      id: "scorecard",
      heading: "How do n8n, Zapier and Make compare at a glance?",
      blocks: [
        {
          type: "paragraph",
          text: "Who builds and maintains the automations decides it. Zapier suits non-technical teams, Make suits an ops person who wants more control without code, and n8n suits anyone with a developer, even a part-time one. Here's how they score on the things that matter once automations are running real parts of the business.",
        },
        {
          type: "table",
          caption: "n8n, Zapier and Make compared on the criteria that matter for a growing business",
          columns: ["Criterion", "Zapier", "Make", "n8n"],
          rows: [
            ["Best for", "Non-technical teams, modest volume", "Ops people who want branching without code", "Teams with a developer, even part time"],
            ["Pricing unit", "Tasks, roughly one per action step", "Credits, one per module run for most apps", "Executions, one per workflow run"],
            ["Cost at volume", "Highest", "Middle", "Lowest, especially self-hosted"],
            ["Learning curve", "Gentle, minutes to a first Zap", "Moderate, data bundles take a while", "Steep, expect JSON and expressions"],
            ["Ready-made integrations", "The most, in the thousands", "Fewer, often deeper per app", "The fewest, plus an HTTP node for anything"],
            ["Custom code", "Code steps with tight limits", "Mostly built-in functions", "JavaScript or Python nodes and sub-workflows"],
            ["AI agents", "Zapier Agents and AI steps", "AI Agents and AI modules", "AI Agent node with memory and tools"],
            ["Self-hosting", "No", "No", "Yes, Community Edition"],
            ["Data location", "Mainly the US", "Choose a region, including the EU", "EU on n8n Cloud, or wherever you host it"],
          ],
        },
        {
          type: "callout",
          title: "How each one counts usage",
          text: "Zapier counts a task for each action that runs, Make counts credits for each module that runs, trigger included, and n8n counts one execution per workflow run however many steps it has. Loop over a list and the Zapier and Make counts multiply while n8n's stays put. Plans and allowances change often, so compare the units, then check current prices with each vendor.",
        },
      ],
    },
    {
      id: "choose-zapier",
      heading: "Choose Zapier if the people building automations aren't technical",
      blocks: [
        {
          type: "paragraph",
          text: "Zapier is the right pick when sales, ops or admin staff will build their own automations and volumes are modest. A Zap is a simple list of steps, each one asks plain questions, and most people have something working in ten minutes. Its copilot will even draft a Zap from a description.",
        },
        {
          type: "paragraph",
          text: "It also has the biggest catalogue by a wide margin, in the thousands, and many integrations are maintained by the app vendors themselves. If you depend on a niche industry tool, check Zapier first. Don't choose on the count alone, though. Most businesses lean on a dozen core apps that all three support, and what catches people out is a missing action, an integration that can create a record but not update one. Check the exact triggers and actions you need.",
        },
        {
          type: "paragraph",
          text: "The cost is the catch. Zapier charges roughly one task for each action step that completes. The trigger is free and some built-in utility steps don't count, but a Zap with five actions costs about five tasks every time it fires, and that's the usual reason people go looking for a Zapier alternative. Code by Zapier runs JavaScript or Python, with tight time and memory limits, and anything with real branching gets clumsy quickly.",
        },
        {
          type: "paragraph",
          text: "On data, Zapier is cloud only and processes data mainly in the US, so a UK business relies on the international transfer safeguards in its terms.",
        },
      ],
    },
    {
      id: "choose-make",
      heading: "Choose Make if you've outgrown Zapier's prices but not its comfort",
      blocks: [
        {
          type: "paragraph",
          text: "Make is the gentlest step up from Zapier: usually cheaper for the same workload, and much better at loops, branches and reshaping data, without asking anyone to write code. It suits an ops person who's comfortable with logic but isn't a developer.",
        },
        {
          type: "paragraph",
          text: "A scenario is drawn as a map of connected modules, which makes routers, filters and error routes easy to see. Its catalogue is smaller than Zapier's but often goes deeper into each app's API, and the HTTP module, iterators, aggregators and built-in functions cover most data shaping. The learning curve is understanding how bundles of data move between modules. Until that clicks, things run five times when you expected once.",
        },
        {
          type: "paragraph",
          text: "Make switched from operations to credits in 2025. For ordinary apps it's one credit per module run, the trigger module counts too, and its own AI features can cost more per run. An iterator over 20 order lines runs every module after it 20 times, and you pay for each.",
        },
        {
          type: "callout",
          title: "The polling trap",
          text: "A polling trigger set to check every few minutes uses credits on each check, even when there's nothing new. Switch to an instant webhook trigger wherever the app supports one.",
        },
        {
          type: "paragraph",
          text: "Make is cloud only too, but you pick a hosting region, including the EU, when you create your organisation. It also has AI Agents and AI modules for summarising, classifying and drafting.",
        },
      ],
    },
    {
      id: "choose-n8n",
      heading: "Choose n8n if anyone on the team can read JSON",
      blocks: [
        {
          type: "paragraph",
          text: "n8n is the one we'd pick for most growing businesses with any technical help: it's cheapest at volume, it handles real code, and it's the only one of the three you can run on your own servers. You pay for that in ease of use. Expect to read JSON, write expressions and configure HTTP requests within the first hour.",
        },
        {
          type: "list",
          items: [
            {
              term: "Pricing that ignores workflow length",
              text: "One execution is one run of the whole workflow, whether it has three nodes or thirty. n8n Cloud plans include a monthly allowance, and the self-hosted Community Edition has no execution limit; you pay for the server instead.",
            },
            {
              term: "Ways around missing integrations",
              text: "It has the fewest native integrations, but an HTTP Request node talks to almost any API, a Code node runs JavaScript or Python, sub-workflows can be called like functions, and community nodes fill gaps.",
            },
            {
              term: "Private systems",
              text: "Self-hosted, it can reach a database or internal service that never touches the public internet, which neither of the others can.",
            },
            {
              term: "Agents",
              text: "Its AI Agent node handles memory, vector stores and tool calling, and any other node or workflow can become a tool. Self-hosted, it can call an open model on your own hardware.",
            },
            {
              term: "Data residency",
              text: "When a contract or regulator wants data kept in the UK or on your own infrastructure, self-hosting is the straightforward answer. n8n Cloud is hosted in the EU at the time of writing.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Agents are where the pricing gap matters most. An agent calls the model and its tools several times per run, so on per-step billing one agent run can burn through many tasks or credits before you've paid the model provider anything. All three let you plug in your own OpenAI or Anthropic key, but only n8n counts the whole run once.",
        },
        {
          type: "paragraph",
          text: "Self-hosting isn't free, just differently priced: someone has to patch it, back it up and notice when it stops. Plenty of teams end up running two tools, keeping Zapier for quick team automations and moving the high-volume, business-critical ones to n8n, where they're cheaper and easier to version.",
          link: { text: "What running n8n on your own server involves.", href: "/blog/self-hosting-n8n" },
        },
      ],
    },
    {
      id: "none-of-the-three",
      heading: "When none of the three is the answer",
      blocks: [
        {
          type: "paragraph",
          text: "When the automation has turned into the product, or into a system the business can't run a day without. These tools are excellent glue, but they weren't built to be the core of something customers log into and pay for. The signs:",
        },
        {
          type: "list",
          items: [
            "Customers trigger workflows themselves through forms, portals or a dashboard bolted onto webhooks.",
            "A workflow has grown to a hundred nodes, only one person understands it, and changes go live without tests or review.",
            "A Stripe webhook arrives twice and the workflow books the same appointment twice, because there's nowhere sensible to make it idempotent.",
            "You need proper user accounts, roles, billing or an audit trail.",
          ],
        },
        {
          type: "paragraph",
          text: "Whichever tool you're on, GDPR doesn't change the answer here: every automation that touches personal data belongs in your record of processing, and the vendor belongs on your processor list. Read the current DPA and sub-processor list yourself rather than trusting a comparison post, this one included.",
        },
        {
          type: "paragraph",
          text: `If you make the jump, our fixed-price builds that turn proven automations into a production app start at ${mvp.price} + VAT.`,
          link: {
            text: "Check whether your automations are ready to become a SaaS product.",
            href: "/blog/turn-automations-into-a-saas-product",
          },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is n8n a good Zapier alternative?",
      answer:
        "Yes, if someone on the team is comfortable with technical tools. n8n charges per workflow run rather than per step, runs real code and can be self-hosted, so it's usually much cheaper at volume. You give up some of Zapier's ease and its huge integration catalogue.",
    },
    {
      question: "Is Make cheaper than Zapier?",
      answer:
        "Usually, for the same workload. Make's credits per module run tend to work out cheaper than Zapier's tasks per action step. Loops and frequent polling triggers can still eat credits quickly, so price your real scenarios before switching.",
    },
    {
      question: "Is n8n free?",
      answer:
        "The self-hosted Community Edition is free under n8n's Sustainable Use License, with no execution limit, but you pay for the server and the time to look after it. n8n Cloud and the paid self-hosted plans cost money and add team features such as single sign-on and multiple environments.",
    },
    {
      question: "Can I move my Zaps to Make or n8n automatically?",
      answer:
        "Not reliably. There's no official one-click import from Zapier into Make or n8n, so each workflow gets rebuilt by hand. Use the move to merge duplicate Zaps and delete the ones nobody remembers creating.",
    },
    {
      question: "Which is best for a UK business worried about GDPR?",
      answer:
        "Self-hosted n8n gives you the most control, because the data stays on servers you pick, including in the UK. Make offers an EU hosting region and n8n Cloud is hosted in the EU at the time of writing, while Zapier processes data mainly in the US. Any of the three can be used lawfully with the right agreements and records in place.",
    },
  ],
}
