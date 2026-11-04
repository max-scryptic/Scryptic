import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const webApplicationDevelopmentServices: BlogPost = {
  slug: "web-application-development-services",
  title: "Web application development, from architecture to launch",
  series: "launch",
  topic: "Web apps",
  icon: "code",
  description:
    "What web application development involves: the parts of a web app, a worked architecture example, the delivery stages and how to choose who builds it.",
  summary:
    "Web application development is building software people use in a browser: the screens, the business rules behind them, the database and the hosting it runs on. A first release goes through scope, design, build, testing and launch, whoever builds it. Keep it to one useful workflow rather than the whole roadmap, and choose a builder who can say what will ship, what it costs and who owns it afterwards.",
  datePublished: "2026-10-21",
  dateModified: "2026-11-04",
  facts: [
    { label: "Parts of a web app", value: "Screens, rules, data, services, hosting" },
    { label: "Delivery stages", value: "6" },
  ],
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
      id: "architecture",
      heading: "What does a simple web app look like under the hood?",
      blocks: [
        {
          type: "paragraph",
          text: "Most web apps have the same five parts: screens in the browser, a server that applies the business rules, a database, a few outside services and the hosting that runs it all. Take a booking app for a small clinic, where patients book an appointment and pay a deposit, and staff manage the diary.",
        },
        {
          type: "table",
          caption: "The five parts of a simple web app, what each does in a clinic booking app, and tools commonly used for each",
          columns: ["Part", "What it does in the booking app", "Commonly built with"],
          rows: [
            ["Screens", "The calendar patients pick a slot from, and the diary staff work from", "React, often through Next.js"],
            ["Business rules", "A slot can only be booked once; only staff can cancel; deposits are refunded up to 24 hours before", "Server code, such as TypeScript on Node.js"],
            ["Database", "Patients, appointment slots and bookings, and which bookings belong to whom", "Postgres or another relational database"],
            ["Outside services", "Taking the deposit, and sending the confirmation and reminder emails", "Stripe for payments, an email sending service"],
            ["Hosting", "Runs the app on your domain, with backups and error alerts", "A platform such as Vercel, with a managed database"],
          ],
        },
        { type: "subheading", text: "Follow one booking through it" },
        {
          type: "list",
          ordered: true,
          items: [
            "A patient opens the calendar, and the screens ask the server which slots are free.",
            "They pick a slot. The server checks it is still free and marks it taken in the same database step, so two people booking at once cannot both get it.",
            "Stripe takes the deposit. Only when Stripe confirms the payment does the booking count as confirmed.",
            "The server saves the booking and sends the confirmation email, then a reminder the day before.",
            "Staff see the booking in their diary straight away. A patient who signs in sees only their own bookings.",
          ],
        },
        {
          type: "paragraph",
          text: "Most of the effort sits in steps two and three, not in the screens. Two people clicking at once, a payment that fails halfway, a patient who tries to view someone else's booking: handling those properly is what separates a web app you can launch from a demo.",
        },
      ],
    },
    {
      id: "delivery-stages",
      heading: "What are the stages of web application development?",
      blocks: [
        {
          type: "paragraph",
          text: "Six stages, in this order: scope, design, build, test, launch, then run and improve. On a small first release the first five can fit in a few weeks; the sixth lasts as long as the app does.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Scope",
              text: "Agree the one workflow the first release covers, who uses it and what is deliberately left for later. You end with a short written scope and a price.",
            },
            {
              term: "Design",
              text: "Sketch the screens that workflow passes through and the data it stores, including who can see what. You end with screens you have clicked through and a simple data model.",
            },
            {
              term: "Build",
              text: "Build the workflow end to end first, then the sign-in, payments and emails around it. You should see working software every week, not progress reports.",
            },
            {
              term: "Test",
              text: "Try each role, including what a user should not be able to reach, the awkward cases such as a declined card, and the whole flow on a phone.",
            },
            {
              term: "Launch",
              text: "Point your domain at it, confirm backups restore and error alerts arrive, and hand over every account. You end with a live app and the keys to it.",
            },
            {
              term: "Run and improve",
              text: "Hosting, security updates and changes driven by what users actually do. Decide before launch who does this work.",
            },
          ],
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
          text: "Ask each one to walk you through how they would handle the awkward cases in your workflow, like the double booking and the failed deposit above. An agency that has built this kind of app before will answer without reaching for a specification.",
        },
      ],
    },
    {
      id: "getting-it-built",
      heading: "What does it cost to have a web app built?",
      blocks: [
        {
          type: "paragraph",
          text: `It depends mostly on how much the first release covers. At Scryptic it is a fixed price agreed before the build: ${mvp.price} plus VAT for a two week sprint, or ${extendedMvp.price} plus VAT for three weeks, each followed by a week of handover and support.`,
        },
        {
          type: "paragraph",
          text: "You work directly with the founder, a full-stack developer, with a demo every Friday. The code lives in your repository, and the hosting, database and payment accounts are in your name from launch. If you already have a prototype or an app made with a builder such as Lovable or Bubble, we review it during discovery and build on what is worth keeping.",
          link: { text: "How our web app development works.", href: "/services/web-app-development" },
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
      question: "What are the stages of web application development?",
      answer:
        "Scope, design, build, test, launch, then run and improve. The first five can fit in a few weeks for a first release covering one workflow. The last one lasts as long as the app does, so agree who does it before launch.",
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
