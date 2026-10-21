import type { BlogPost } from "@/lib/blog/types"

export const webApplicationDevelopmentServices: BlogPost = {
  slug: "web-application-development-services",
  title: "How to choose web application and development services",
  series: "launch",
  topic: "Web apps",
  description:
    "Compare web application development options, decide what your MVP needs, and see Scryptic's fixed-price packages for UK founders, from £10,000 plus VAT.",
  summary:
    "To get a web application built, you can hire developers, commission an agency or studio, or use a builder tool, and the work runs through scope, build, testing and launch whichever you pick. For a first release, start with one useful workflow rather than the whole roadmap, and choose a supplier who can tell you what will ship, what it costs and who owns everything afterwards.",
  datePublished: "2026-10-21",
  sections: [
    {
      id: "what-it-involves",
      heading: "What does web application development involve?",
      blocks: [
        {
          type: "paragraph",
          text: "Web application development turns a workflow into software people use in their browser: the screens, the business rules behind them, the database and the hosting it all runs on. A website mainly presents information; a web app lets someone get something done, such as managing bookings or approving expenses.",
        },
        {
          type: "paragraph",
          text: "Website and app development often overlap, because many products need both a public marketing site and a signed-in service. They are still separate pieces of work, and worth scoping separately.",
        },
        {
          type: "paragraph",
          text: "For many first releases, software that runs in the browser is enough. If you are not sure whether you need an app people install from a store, our guide on whether to build a web app or a mobile app first walks through that decision.",
        },
      ],
    },
    {
      id: "first-release",
      heading: "What should your first web app include?",
      blocks: [
        {
          type: "paragraph",
          text: "Your first web app should let one specific kind of user complete one valuable task, reliably enough to use outside a demo.",
        },
        {
          type: "paragraph",
          text: "Take a booking product. A useful first release might let a provider publish their availability and a customer request a slot, with both sides able to see where each request stands. Payroll, resource libraries and a referral scheme can all wait until people are using that core flow.",
        },
        { type: "subheading", text: "Define the complete workflow" },
        {
          type: "paragraph",
          text: "Write down the journey before you list any screens. A booking form is not a booking system if nobody can see the request or respond to it.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            { term: "Name the user and the task", text: "Who is using this, and what do they need to finish?" },
            { term: "Map the path", text: "What do they enter, what does the app save, and what happens next?" },
            {
              term: "Set acceptance checks",
              text: "How will you know the workflow works, including when something goes wrong?",
            },
          ],
        },
        { type: "subheading", text: "Separate the essentials from the extras" },
        {
          type: "paragraph",
          text: "Custom web application development makes sense when your workflow is distinctive enough that existing software can't handle it sensibly. That doesn't mean every supporting feature needs custom code.",
        },
        {
          type: "paragraph",
          text: "In the booking example, a clear status on each request matters more than a sophisticated dashboard. Start with whatever stops a user finishing the task, and question anything that only makes the roadmap look more impressive.",
        },
        { type: "subheading", text: "Keep the production basics in scope" },
        {
          type: "paragraph",
          text: "A small release still needs sensible access controls, input validation, error handling and a workable way to recover data. Ask how each of these will be handled rather than assuming an MVP includes them.",
        },
        {
          type: "paragraph",
          text: "Check what personal data you actually need to collect. If you take payments, decide how successful, failed and cancelled payments affect what a user can access. These are product decisions as much as technical ones. Cutting features is sensible; leaving the core workflow unsafe or incomplete is not.",
        },
      ],
    },
    {
      id: "choosing-a-supplier",
      heading: "How do you choose a web app development agency?",
      blocks: [
        {
          type: "paragraph",
          text: "Judge a web app development agency by the scope it proposes, how it delivers and what it hands over at the end, not just by its portfolio.",
        },
        {
          type: "paragraph",
          text: "Ask who will actually build the product and who makes the technical decisions. If you are comparing several web app development companies, give each one the same short description of your workflow. What each quote leaves out often tells you more than the difference in the headline price.",
        },
        {
          type: "list",
          items: [
            {
              term: "Ask for a demonstration plan",
              text: "When will you see working software, rather than progress reports?",
            },
            {
              term: "Clarify how changes work",
              text: "How are new requests weighed against the agreed scope?",
            },
            {
              term: "Check ownership",
              text: "Whose repository and accounts will the product live in?",
            },
            {
              term: "Discuss launch",
              text: "What gets checked, what gets handed over and what support follows?",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Our buyer's checklist for choosing an app development company goes further, with the questions to ask, what good answers sound like and the red flags to walk away from.",
        },
        {
          type: "paragraph",
          text: "At Scryptic, you work directly with the founder, a full-stack developer with five years of experience building software for enterprise clients and startups. A video catch-up every Friday covers what shipped and what comes next. That gives you a regular chance to adjust priorities, but it is not a way to add unlimited scope.",
        },
      ],
    },
    {
      id: "pricing",
      heading: "What do Scryptic's web app development services cost?",
      blocks: [
        {
          type: "paragraph",
          text: "Scryptic's MVP package costs £10,000 plus VAT for a two week sprint, and the Extended MVP costs £20,000 plus VAT for a three week sprint.",
        },
        {
          type: "paragraph",
          text: "Both are fixed prices for a fully working MVP, ready to take to market. They differ in how much development time you get, and both include a week of changes based on your feedback.",
        },
        {
          type: "table",
          caption: "Scryptic's two fixed-price MVP packages, with the price, sprint length and what each sprint covers",
          columns: ["Package", "Price", "Sprint length", "What the sprint covers"],
          rows: [
            ["MVP", "£10,000 plus VAT", "2 weeks", "1 week of development, 1 week of changes from your feedback"],
            ["Extended MVP", "£20,000 plus VAT", "3 weeks", "2 weeks of development, 1 week of changes from your feedback"],
          ],
        },
        {
          type: "paragraph",
          text: "Each package is followed by a separate handover week after launch for bug fixes and support. The code lives in your repository, and the hosting, database, payment and other accounts are in your name, handed over at launch.",
        },
        {
          type: "paragraph",
          text: "If you already have a prototype or a codebase, we review it during discovery and build on the parts worth keeping. Apps made with tools such as Lovable, Replit or Bubble can be assessed for a move to production code. That might mean fixing the existing code, or rebuilding it and bringing your data and users across. There is no button that does the migration for you.",
        },
      ],
    },
    {
      id: "is-it-a-fit",
      heading: "Is Scryptic the right fit for your web app?",
      blocks: [
        {
          type: "paragraph",
          text: "Scryptic suits a UK founder who needs a clearly scoped first release without hiring an in-house development team. It is not a promise to fit an entire platform into a short sprint.",
        },
        {
          type: "paragraph",
          text: "Bring your core workflow and anything you have already built to a free 30 minute discovery call. We talk through the idea, the scope, the tech stack and which package suits you, and the scope and price are agreed before the build starts.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between a website and a web app?",
      answer:
        "A website mainly presents information, while a web app lets people get something done in their browser, such as managing bookings or approving expenses. Many products need both, a public marketing site and a signed-in service, and they are best scoped as separate pieces of work.",
    },
    {
      question: "How much does Scryptic charge to build a web app?",
      answer:
        "The MVP package is £10,000 plus VAT for a two week sprint, and the Extended MVP is £20,000 plus VAT for a three week sprint. Both are fixed prices, with the scope and price agreed on a free discovery call before the build starts.",
    },
    {
      question: "Can you take over a web app built with Lovable, Replit or Bubble?",
      answer:
        "Yes. We review what you have during discovery and assess it for a move to production code. Depending on the app, that means fixing the existing code, or rebuilding it and bringing your data and users across.",
    },
  ],
}
