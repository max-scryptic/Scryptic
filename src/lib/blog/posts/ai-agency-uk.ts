import whatEachAgencyLeaves from "@/assets/blog/images/what-each-ai-agency-leaves-you.webp"
import whatProductionAdds from "@/assets/blog/images/what-production-adds-to-an-ai-pilot.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const aiAgencyUk: BlogPost = {
  slug: "ai-agency-uk",
  title: "Hiring an AI agency in the UK, from pilot to production",
  series: "launch",
  service: "mvp-development",
  topic: "AI agencies",
  icon: "sparkles",
  description:
    "UK AI agencies compared on their published prices, from a £499 report to a £40,000 pilot, and what an AI pilot needs before it can run in production.",
  summary:
    "An AI agency in the UK can be a consultancy that writes the plan, a partner that sets up agents inside HubSpot or Microsoft 365, or a team that codes the agent into your own systems. We compared seven from what each one publishes: first steps cost £499 to £20,000 and pilots anything from nothing to £40,000. The pilot is the easy part to buy. What matters is who owns the prompts and tests afterwards, and who runs the agent once it's live.",
  datePublished: "2026-11-22",
  facts: [
    { label: "Firms compared", value: "7" },
    { label: "Published first steps", value: "£499 to £20,000" },
    { label: "Published pilots", value: "Free to £40,000" },
    { label: "Figures checked", value: "November 2026" },
  ],
  sections: [
    {
      id: "what-they-sell",
      heading: "What does an AI agency actually sell?",
      blocks: [
        {
          type: "paragraph",
          text: "One of three quite different things, and the name doesn't tell you which. Some firms sell advice: which jobs in your business AI should take on, what could go wrong and how your people should use it. Some set up agents inside a product you already pay for, such as HubSpot or Microsoft 365. Others write software around a model, in your own cloud account, that keeps running without them.",
        },
        {
          type: "image",
          image: whatEachAgencyLeaves,
          alt: "Three kinds of AI agency and what each leaves you: a plan, settings in a vendor's tool, or code you run.",
        },
        {
          type: "list",
          items: [
            {
              term: "AI consultancy",
              text: "Strategy, readiness reviews, governance and training. You come away with a plan and a team that understands it, and you still need someone to build.",
            },
            {
              term: "Platform partner",
              text: "Agents configured inside one vendor's product rather than written from scratch. Quick to start when the work already lives in that product, but the agent stays there if you ever leave it.",
            },
            {
              term: "Custom build",
              text: "The agent written as software in your own systems, with its prompts, the tools it may use, its tests and its monitoring. Slower and dearer to start, and the only kind you can hand to another supplier or bring in-house.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Plenty of firms that call themselves an AI agency are marketing agencies using AI to run campaigns and write content. That's a different purchase. This guide is about firms that advise on AI systems or build them.",
        },
      ],
    },
    {
      id: "consultancy-or-build",
      heading: "Should you start with an AI consultancy or a build?",
      blocks: [
        {
          type: "paragraph",
          text: "Start with a build if you can name the job. When you can say which task the AI takes off someone, what a good result looks like and which systems it has to read and write, an assessment mostly tells you what you already know. Pay for consultancy when the open question is which job to start with, when several departments want different things, or when a board or regulator needs a written case before any money goes on building.",
        },
        {
          type: "paragraph",
          text: "Consultancy is sold by the day or as a fixed assessment. Helium42, a London AI consultancy that indexes published UK prices, puts specialist day rates at £900 to £1,500 and readiness work at £1,000 to £10,000, with a median of £3,000. Among the firms we compare below, the first step costs between £499 and £20,000:",
        },
        {
          type: "table",
          caption: "The paid first step five UK AI agencies publish, what it costs and what it produces, as of November 2026",
          columns: ["Agency", "First step", "Published price", "What you get"],
          rows: [
            ["Digiovations", "AI Opportunity Report", "£499", "One call, then a written answer on where AI pays"],
            ["Magora", "Discovery", "From £3,000, after a free prototype", "A costed scope and a fixed-price quote, over two weeks"],
            ["SpotDev", "AI and Data Readiness Assessment", "£5,000", "A review of your data and systems, with a costed plan"],
            ["Pixelfield", "Discovery", "From £5,000", "Workflow mapping, tests against your real APIs and a fixed-scope quote, in one to two weeks"],
            ["Winder.AI", "Scoping and agent-fit assessment", "£10,000 to £20,000", "Two to four weeks deciding whether the workflow needs an agent at all, and a fixed price for the build"],
          ],
        },
        {
          type: "paragraph",
          text: "Whichever you buy, it should end with one job named, a measure of success, a check that your data can support it and a price for the build. Apply the same test as for any discovery: another supplier should be able to price the build from what you're handed.",
          link: { text: "What a discovery phase should hand over.", href: "/blog/digital-product-agency#discovery-output" },
        },
        {
          type: "paragraph",
          text: "You can do a rough version yourself in an afternoon by writing the job down in five lines: who asks, what they bring, what a good answer contains, what goes to a person and how you'll know it works.",
          link: { text: "Write down the one job your AI does.", href: "/blog/build-your-own-ai#one-job" },
        },
      ],
    },
    {
      id: "compared",
      heading: "Seven UK AI agencies, compared on what they publish",
      blocks: [
        {
          type: "paragraph",
          text: "The seven cover the main ways AI work is sold in the UK: a large London AI company, two engineering-led specialists, a London software house with an AI line, a HubSpot partner in Bath, a Microsoft partner in Nottinghamshire and our own studio in Brighton. All but Faculty publish prices.",
        },
        {
          type: "table",
          caption:
            "Seven UK AI agencies compared by base, the kind of firm, how each charges and the prices and timelines it publishes, as of November 2026",
          columns: ["Company", "Base", "Kind of firm", "How it charges", "Published prices and timelines"],
          rows: [
            [
              "Scryptic (us)",
              "Brighton, founder-led, one developer",
              "A product studio building apps with AI at the core, in Next.js, TypeScript and Postgres",
              "A fixed price per sprint",
              `${mvp.price} for a two week sprint, or ${extendedMvp.price} for three weeks`,
            ],
            [
              "Faculty",
              "London (Old Street), set up in 2014",
              "An AI company covering strategy, design, development, operations and AI safety, with its own Frontier platform",
              "Not published",
              "Not published",
            ],
            [
              "Winder.AI",
              "Senior engineers in Yorkshire, London and Italy, building autonomous systems since 2013",
              "An engineering-led specialist in agents for regulated and technical work",
              "Fixed-price phases, or £200 an hour for development and £300 for consulting",
              "Scoping £10,000 to £20,000 over 2 to 4 weeks; proof of concept £20,000 to £40,000; production from £25,000 over 2 to 6 months; all excluding VAT",
            ],
            [
              "Pixelfield",
              "London (City Road), shipping AI work since 2013",
              "A custom AI developer: agents, proofs of concept, RAG and private LLMs, plus mobile apps",
              "Fixed-fee discovery, a fixed-scope quote, then a monthly retainer",
              "Discovery from £5,000; proof of concept from £8,000, typically £15,000 to £30,000 over 4 to 6 weeks; production agents typically £30,000 or more over 6 to 10 weeks",
            ],
            [
              "Magora",
              "London (Shoreditch), building software since 2010",
              "A software house with an AI line: LLM apps, RAG, agents and machine learning models",
              "A discovery that ends in a fixed quote, or developers from £49 an hour",
              "Free prototype in 5 to 10 working days; discovery from £3,000; AI MVP from £10,000 over 6 to 8 weeks; agents from £20,000; production LLM app from £40,000",
            ],
            [
              "SpotDev",
              "Bath",
              "A HubSpot partner, OpenAI Select Partner and certified in the Claude Partner Network",
              "Fixed-price packages, no day rates",
              "Assessment £5,000; first agent in production £8,000; custom agents £20,000; transformation programme £45,000; first rollout typically live in 2 to 3 weeks",
            ],
            [
              "Digiovations",
              "Nottinghamshire",
              "An AI agency and Microsoft Power Platform partner",
              "A fixed price against a stated effort estimate",
              "Proof of concept from £6,000 in 1 to 2 weeks; production agent from £12,000 in 2 to 4 weeks; several agents from £24,000 over 4 to 12 weeks; all excluding VAT",
            ],
          ],
        },
        {
          type: "callout",
          title: "Where these figures come from",
          text: "Every figure for another company comes from its own website in November 2026, mostly its AI agent, proof of concept or pricing page. Prices change, and several firms call theirs indicative, so confirm the current offer with each one. We haven't worked with any of them, and the order of the table is not a ranking.",
        },
        { type: "subheading", text: "Pilots cost anything from nothing to £40,000" },
        {
          type: "paragraph",
          text: "The spread comes from what the pilot runs on. At the cheap end it shows a workflow can be done. At the top it shows the workflow can be done on your data, inside your systems, at a cost you can live with.",
        },
        {
          type: "paragraph",
          text: "Magora builds a free working prototype in five to ten working days. Digiovations' proof of concept starts at £6,000 and takes one to two weeks. Pixelfield sells two sizes: a light pilot from £8,000 on one data source, and a standard one at £15,000 to £30,000 that adds integration with your systems and a cost model at production volume. Winder.AI's £20,000 to £40,000 includes an evaluation harness, a set of test cases with known right answers, which it calls the part UK buyers skip most often.",
        },
        {
          type: "paragraph",
          text: "So ask each agency whether the pilot will run on your real cases and connect to your real systems, and whether its code carries into the build. Pixelfield says its pilot code goes straight into production, and Magora keeps the same engineers from prototype to handover. A pilot that has to be rebuilt afterwards is a demo you've paid for.",
        },
        { type: "subheading", text: "Who owns the prompts and the tests" },
        {
          type: "paragraph",
          text: "Ask for the prompts, the tool definitions and the test set as well as the code, because they're what make an agent behave the way it does. Three of the seven put this in writing. Magora transfers source code, prompts, evaluation sets and IP on payment. Pixelfield's standard contract gives the client source code, infrastructure as code, prompts and evaluation datasets. Winder.AI assigns the bespoke code, prompts, tool definitions, evaluation harness and configuration on payment, and keeps its own internal frameworks.",
        },
        {
          type: "paragraph",
          text: "We didn't find a statement on the pages we read from Faculty, SpotDev or Digiovations, so ask them. For an agent built inside HubSpot, Copilot Studio or another vendor's product the question changes: ask which parts you can export, and what happens to the agent if you stop paying for the platform.",
        },
        { type: "subheading", text: "Where your data goes" },
        {
          type: "paragraph",
          text: "Each firm that addresses it offers to keep data in the UK or inside your own cloud account, by different routes. Digiovations builds on Azure AI Foundry inside your own Microsoft tenancy, with UK data residency. Magora can host application data, search indexes and logs in UK or EU regions, on provider tiers whose terms exclude training on your inputs. Pixelfield will run a pilot inside your own cloud network or on your premises, and Winder.AI deploys open-weight models such as Llama, Mistral and Qwen on your own cloud or servers, cut off from the internet if necessary.",
          link: { text: "Whether UK GDPR requires UK hosting, and what to check.", href: "/blog/uk-data-residency-ai-built-apps" },
        },
        { type: "subheading", text: "Which to shortlist" },
        {
          type: "list",
          items: [
            { term: "Faculty", text: "If you're a large organisation or public body wanting strategy, build and AI safety work from one established firm." },
            { term: "Winder.AI", text: "If the agent has to be measurably right in a regulated or technical field, with a risk team or regulator to satisfy." },
            { term: "Pixelfield", text: "If you want a pilot on your real systems whose code carries into the build, and a team that watches the agent after launch." },
            { term: "Magora", text: "If you want a published price for each kind of AI work, and a free prototype before you pay for anything." },
            { term: "SpotDev", text: "If your sales and service teams live in HubSpot and you'd rather buy a fixed package with a first agent live within weeks." },
            { term: "Digiovations", text: "If you run on Microsoft 365 and want agents inside your own tenancy, starting with a small fixed-price step." },
            { term: "Scryptic", text: "If you're building a product with AI at its core, for customers who sign in and pay, and want it coded at a fixed price." },
          ],
        },
      ],
    },
    {
      id: "pilot-to-production",
      heading: "What gets an AI pilot into production?",
      blocks: [
        {
          type: "paragraph",
          text: "Four things a demo can do without: a test set built from your own awkward cases, checks that stop a bad answer before it acts, limits on what each request costs, and someone who is alerted when it fails. A pilot shown on clean examples has none of them, which is why so many go well in the meeting and then stall.",
        },
        {
          type: "image",
          image: whatProductionAdds,
          alt: "A pilot is a demo; production adds your own cases, checks on output, cost limits and someone on call.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Your own cases. Thirty or more real examples with answers you'd accept, the messy ones included, re-run after every prompt change and every model upgrade. Winder.AI, Pixelfield and Magora all describe scoring each release against a fixed set like this.",
            "Checks before actions. A malformed or confidently wrong answer gets caught in code before it updates a record, sends an email or spends money, and anything that can't be undone waits for a person to approve it.",
            "Cost at real volume. Pixelfield warns that a £50,000 pilot can turn into a £200,000 a year running cost by year three if the cost model is wrong. Price a month of real use before you sign off the build.",
            "Someone on call. A log of what the agent did and why, an alert when it fails, and a named person who looks. Ask what that costs: Magora's support starts from £1,000 a month, and Winder.AI puts maintenance at about £2,000 a month.",
          ],
        },
        {
          type: "paragraph",
          text: "Most of this is ordinary software engineering rather than AI work, which is why the build costs more than the pilot. It's also the part that decides whether an agency can hand the agent over cleanly, because tests and logs are how the next team finds out what the agent is supposed to do.",
        },
      ],
    },
    {
      id: "questions",
      heading: "Questions to ask an AI agency before you sign",
      blocks: [
        {
          type: "paragraph",
          text: "These are specific to AI work, and a good agency answers each one without needing to check.",
        },
        {
          type: "checklist",
          items: [
            "Have you ever told a client not to build an AI feature, and what did you suggest instead?",
            "Can we see a test set from a past project, with the client's details removed, and the score it reached?",
            "Which actions can the agent take without a person approving them?",
            "Will the pilot's code carry into the build, or does the build start again?",
            "If we part ways, what would another supplier need to take the agent over?",
            "Who is alerted when it fails at night, and what does that cost each month?",
          ],
        },
        {
          type: "paragraph",
          text: "Winder.AI and Pixelfield both say they have advised a rules-based pipeline, or a fix to the data underneath, instead of an agent. That's the kind of answer you want to the first question. For questions about the models themselves, such as whose name the API keys are in and how a bad prompt change gets rolled back, use the checklist in our AI software development guide.",
          link: { text: "Six questions to ask any AI development company.", href: "/blog/ai-software-development#choosing-a-company" },
        },
        {
          type: "paragraph",
          text: "And for the checks every software supplier should pass, from live work you can try to a contract that assigns the code to you, use our buyer's checklist.",
          link: {
            text: "A buyer's checklist for choosing an app development company in the UK.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
        },
      ],
    },
    {
      id: "where-we-fit",
      heading: "Where we fit, and where we don't",
      blocks: [
        {
          type: "paragraph",
          text: `We're a product studio rather than an AI agency. We don't sell strategy, workshops or AI training. We build products with a model at the core, for founders whose customers will sign in and pay, coded in Next.js, TypeScript and Postgres in a fixed-price sprint from ${mvp.price} plus VAT.`,
          link: { text: "See what each fixed-price sprint includes.", href: "/#pricing" },
        },
        {
          type: "paragraph",
          text: "ReelEstate, which turns estate agents' listing photos into property videos, went through that sprint, including the checks that catch a bad video before a customer sees it.",
          link: { text: "How we built ReelEstate.", href: "/work/reelestate" },
        },
        {
          type: "paragraph",
          text: "We're the wrong choice for an agent inside HubSpot or Microsoft 365, a programme across several departments, or work a regulator will inspect, and we'll point you to the kind of firm above that fits. For a rough price on your own product first, the free MVP Cost Calculator asks eight questions, including whether AI is one feature or the whole product, and gives a ballpark in development weeks and pounds.",
          link: { text: "Estimate an AI product with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is a London AI agency more expensive than one elsewhere in the UK?",
      answer:
        "Not reliably. Helium42's review of published UK prices found regional differences narrower than most buyers expect, because most AI work is delivered remotely, and Winder.AI says it prices in pounds with no London premium. What moves the price is the work: how many systems the agent connects to, how much testing it needs and whether a regulator will look at it.",
    },
    {
      question: "Which certifications should an AI agency hold?",
      answer:
        "It depends on the data the agent will touch. Cyber Essentials Plus is a common baseline, ISO 27001 shows a managed security programme, and an agency handling NHS patient data should meet the NHS Data Security and Protection Toolkit. Of the firms above, Magora lists ISO 27001, and Digiovations lists Cyber Essentials Plus and the NHS toolkit for 2025-26. Ask for the certificates rather than relying on logos.",
    },
    {
      question: "Can another firm take over an AI agent an agency built?",
      answer:
        "Yes, if you own the prompts, the test set and the configuration as well as the code, and the system is documented. Pixelfield and Winder.AI both say their agents can be handed to your own team or another supplier. Expect the new firm to re-run the test set before changing anything, because that's how it finds out whether the agent still behaves after the move.",
    },
  ],
}
