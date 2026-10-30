import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const webApplicationDevelopmentServices: BlogPost = {
  slug: "web-application-development-services",
  title: "How to choose web application and development services",
  series: "launch",
  topic: "Web apps",
  icon: "code",
  description:
    `Compare web application development options, decide what your MVP needs, and see Scryptic's fixed-price packages for UK founders, from ${mvp.price} plus VAT.`,
  summary:
    "To get a web application built, you can hire developers, commission an agency or studio, or use a builder tool, and the work runs through scope, build, testing and launch whichever you pick. For a first release, start with one useful workflow rather than the whole roadmap, and choose a supplier who can tell you what will ship, what it costs and who owns everything afterwards.",
  datePublished: "2026-10-21",
  dateModified: "2026-10-28",
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
          text: "For many first releases, software that runs in the browser is enough. If you are not sure whether you need an app people install from a store, settle that before you ask anyone for a quote.",
          link: { text: "Web app or mobile app first? Find your situation.", href: "/blog/web-app-or-mobile-app-first" },
        },
      ],
    },
    {
      id: "first-release",
      heading: "What should a quote for your first web app cover?",
      blocks: [
        {
          type: "paragraph",
          text: "One complete workflow for one kind of user, working well enough to use outside a demo, plus the basics that keep it safe. Map that workflow before you ask for prices, because a quote for a list of screens can't tell you whether the task works from start to finish.",
          link: { text: "How to define the one task your first web app does.", href: "/blog/how-to-build-a-web-app" },
        },
        {
          type: "paragraph",
          text: "Custom web application development makes sense when your workflow is distinctive enough that existing software can't handle it sensibly. That doesn't mean every supporting feature needs custom code: sign-in, payments and email are better bought than built.",
        },
        { type: "subheading", text: "Check the production basics are priced in" },
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
          text: "Give every agency on your list the same short description of your workflow. What each quote leaves out often tells you more than the difference in the headline price, and so does how soon you'll see working software rather than progress reports.",
          link: {
            text: "Use our buyer's checklist for the questions to ask and the red flags.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
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
          text: `Scryptic's MVP package costs ${mvp.price} plus VAT for a two week sprint, and the Extended MVP costs ${extendedMvp.price} plus VAT for a three week sprint.`,
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
            ["MVP", `${mvp.price} plus VAT`, "2 weeks", "1 week of development, 1 week of changes from your feedback"],
            ["Extended MVP", `${extendedMvp.price} plus VAT`, "3 weeks", "2 weeks of development, 1 week of changes from your feedback"],
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
        `The MVP package is ${mvp.price} plus VAT for a two week sprint, and the Extended MVP is ${extendedMvp.price} plus VAT for a three week sprint. Both are fixed prices, with the scope and price agreed on a free discovery call before the build starts.`,
    },
    {
      question: "Can you take over a web app built with Lovable, Replit or Bubble?",
      answer:
        "Yes. We review what you have during discovery and assess it for a move to production code. Depending on the app, that means fixing the existing code, or rebuilding it and bringing your data and users across.",
    },
  ],
}
