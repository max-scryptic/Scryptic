import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const appCostUk: BlogPost = {
  slug: "how-much-does-it-cost-to-build-an-app-uk",
  title: "How much does it cost to build an app in the UK?",
  series: "launch",
  topic: "App cost",
  description:
    "UK app development costs broken down: prices by route and by type of app, what moves a quote, monthly running costs and the hidden costs founders miss.",
  summary:
    "Building an app in the UK typically costs a few hundred pounds if you do it yourself with no-code or AI tools, roughly £5,000 to £25,000 with a freelancer, £10,000 to £60,000 with a small studio and £40,000 to £150,000 or more with an agency. Scope moves the price far more than who builds it. Once it's live, budget around 15 to 20% of the build cost a year to keep it running and up to date.",
  datePublished: "2026-10-14",
  dateModified: "2026-10-28",
  facts: [
    { label: "DIY with builders", value: "Hundreds of pounds plus your time" },
    { label: "Freelancer MVP", value: "Roughly £5,000 to £25,000" },
    { label: "Studio or agency", value: "Roughly £10,000 to £150,000+" },
    { label: "Typical MVP timeline", value: "6 to 12 weeks" },
    { label: "Yearly upkeep", value: "Often 15 to 20% of the build" },
  ],
  sections: [
    {
      id: "cost-by-route",
      heading: "The price depends on who builds it",
      blocks: [
        {
          type: "paragraph",
          text: "£10,000 to £60,000 is the range most UK founders are quoted for a focused first version built by a small studio. Do it yourself and the cash cost drops to a few hundred pounds; hire a full-service agency and it can pass £150,000. These are the ranges we see quoted, not survey figures, and they overlap a lot: a simple app from an agency can cost less than a complicated one from a freelancer.",
        },
        {
          type: "table",
          caption: "Typical UK cost of a first app version by who builds it",
          columns: ["Route", "Typical cost", "What you get", "What you still do yourself"],
          rows: [
            ["Do it yourself", "A few hundred pounds", "A no-code or AI builder on a monthly subscription", "Everything, plus hitting the walls when payments and personal data arrive"],
            ["Freelancer", "£5,000 to £25,000", "One developer at roughly £300 to £700 a day", "Usually design, testing and project management"],
            ["Small studio", "£10,000 to £60,000", "Design, build and launch from a small team, with a written estimate first", "Decisions, content and feedback"],
            ["Agency", "£40,000 to £150,000+", "Account managers, designers, QA and a formal discovery phase", "Very little, but you pay for the machinery"],
          ],
        },
        {
          type: "callout",
          title: "Why two quotes can be five times apart",
          text: "Each supplier has pictured a different app. One assumed a basic admin page, the other a full back office with reporting. Until everyone is pricing the same written list of screens, roles and features, comparing totals tells you very little.",
        },
      ],
    },
    {
      id: "cost-by-app-type",
      heading: "Cost by type of app",
      blocks: [
        {
          type: "paragraph",
          text: "What the app does matters more than who builds it. The table below gives rough ranges for a focused first version from a small studio. They're planning ranges for typical scopes, not quotes, and your app can land outside them in either direction.",
        },
        {
          type: "table",
          caption: "Rough studio cost and timeline for a first version, by type of app",
          columns: ["Type of app", "A typical first version", "Rough cost", "Rough timeline"],
          rows: [
            ["Internal tool or dashboard", "Sign-in, a few data screens, an export, two roles", "£10,000 to £20,000", "4 to 8 weeks"],
            ["Booking or appointments app", "Availability, booking, payment, reminders, staff view", "£12,000 to £30,000", "6 to 10 weeks"],
            ["SaaS web app", "Accounts, teams, one core workflow, subscriptions, admin", "£15,000 to £40,000", "6 to 12 weeks"],
            ["AI-powered product", "One core AI feature, usage limits, billing, logging", "£15,000 to £45,000", "6 to 12 weeks"],
            ["Two-sided marketplace", "Two user types, listings, search, payouts, moderation", "£25,000 to £60,000", "8 to 16 weeks"],
            ["Native iOS and Android app", "Shared codebase, backend, store submission", "£25,000 to £60,000+", "10 to 16 weeks"],
          ],
        },
        {
          type: "paragraph",
          text: "The same label can hide very different projects. An app built for one business and a platform that many businesses sign up to, each with their own users and settings, can share a name and almost nothing else on the invoice.",
        },
      ],
    },
    {
      id: "what-drives-cost",
      heading: "What moves a quote up or down",
      blocks: [
        {
          type: "paragraph",
          text: "Scope moves it most: how many screens, how many kinds of user and how many other systems the app talks to. Day rates matter less than people expect, because a cheaper developer on a bigger scope still sends a bigger invoice.",
        },
        {
          type: "table",
          caption: "The features that move an app quote most, from the cheaper end to the expensive end",
          columns: ["Cost driver", "Cheaper end", "Expensive end"],
          rows: [
            ["Admin tools", "Editing data in the database dashboard", "A full back office with refunds, moderation and reports"],
            ["User roles", "One kind of user", "Customer, staff and admin, each tested separately"],
            ["Payments", "A one-off Stripe Checkout", "Subscriptions with trials, proration, retries and VAT invoices"],
            ["Integrations", "A well documented API such as Stripe or Xero", "An old system with a SOAP API and an unreliable test environment"],
            ["Platforms", "One responsive web app", "Web, iOS and Android, each with its own testing and review"],
            ["Design", "A clean interface on a component library", "A bespoke brand system with custom illustration and animation"],
          ],
        },
        {
          type: "paragraph",
          text: "Admin tools are the one founders forget most often. Somebody has to refund a customer, ban a spammer and fix a typo in a listing, and a proper back office can be a surprisingly large slice of the build. Payments come second: a Stripe webhook that fires twice and books the same class twice is the kind of bug you only avoid by designing for it from the start.",
        },
      ],
    },
    {
      id: "how-long",
      heading: "How long it takes, and why waiting costs more than coding",
      blocks: [
        {
          type: "paragraph",
          text: "A focused MVP usually takes 6 to 12 weeks, a fuller product 3 to 6 months, and a platform with several apps and lots of integrations 6 months or more. Time and money move together, since nearly all of the cost is people's time. Builds of two or three weeks happen when the first release is cut to a single journey, which is how our own sprints work. If a short quote claims to cover a whole marketplace with payouts, ask what it leaves out.",
        },
        {
          type: "paragraph",
          text: "The code is rarely what holds a launch up. Waiting is: on copy and decisions from the founder, on a payment provider's account checks, on API keys from a partner, and on App Store review, which is often quick but can stretch to a couple of weeks if the first submission is rejected. Build those waits into the plan and you'll hit your date far more often.",
        },
      ],
    },
    {
      id: "running-costs",
      heading: "Running costs per month",
      blocks: [
        {
          type: "paragraph",
          text: "An early-stage web app typically costs tens of pounds a month to host, plus maintenance of roughly 15 to 20% of the build cost a year. Maintenance is the bigger number by far, and the one most budgets leave out. The percentage is a rule of thumb: a quiet internal tool can cost much less, and a product you're actively growing will cost more.",
        },
        {
          type: "table",
          caption: "Typical running costs for an early-stage app",
          columns: ["Item", "Typical cost", "Notes"],
          rows: [
            ["Hosting and database", "Tens of pounds a month at first", "Vercel, Render or a managed Postgres provider; climbs with traffic, storage and jobs"],
            ["Email, error tracking and analytics", "Free tiers, then tens of pounds a month", "Billed by usage once you outgrow the free allowance"],
            ["AI, SMS and maps APIs", "Pennies per call, by usage", "The lines to watch as you grow; set limits per user"],
            ["Apple Developer Program", "US$99 a year", "Needed to publish on the App Store; charged in local currency"],
            ["Google Play", "US$25 once", "One-off registration fee at the time of writing"],
            ["Store commission", "15% to 30% of in-app digital sales", "Depends on the programme and your revenue; Stripe on the web costs far less"],
            ["Maintenance", "15 to 20% of the build a year", "Updates, security patches, bug fixes and new iOS and Android releases"],
          ],
        },
        {
          type: "paragraph",
          text: "To work out your own figure, take 15 to 20% of the build cost, divide it by twelve, and add your hosting and service bills. A native mobile app sits higher than a web app, because the operating system changes under it every year.",
        },
      ],
    },
    {
      id: "hidden-costs",
      heading: "The costs that sit outside the quote",
      blocks: [
        {
          type: "paragraph",
          text: "The ones that catch founders out are work the supplier assumed you'd do, and things nobody thought about until launch week. Ask each supplier directly which of these they've included.",
        },
        {
          type: "list",
          items: [
            "Content. Onboarding copy, empty states, emails, help pages and app store screenshots don't write themselves.",
            "Legal. A privacy policy and terms of service, and a proper look at UK GDPR if you're storing personal data.",
            "Changing your mind mid-build. It's the most common reason projects run over. Park new ideas for version two unless they block launch.",
            "The first month after launch. Real users find things testing didn't, so keep some budget back for it.",
            "Paying twice. A cheap prototype that can't carry real users gets rebuilt, and the second build is the expensive one.",
          ],
        },
      ],
    },
    {
      id: "cut-the-cost",
      heading: "How to spend less without regretting it",
      blocks: [
        {
          type: "paragraph",
          text: "Build less, not worse. Launch the smallest version people will actually use and pay for, then let them tell you what's missing. Most first versions we'd scope have one core workflow, sign-up, payments and a basic admin page, and nothing else.",
        },
        {
          type: "paragraph",
          text: "Start on the web unless the product genuinely needs a native app. A responsive web app works on every phone and laptop, ships without app store review and avoids store commission; offline use in the field or background location tracking are the usual reasons to go native first. Buy the boring parts too. Authentication, payments, email and search are solved problems. And if you already have a prototype from Lovable, Bolt or a no-code tool, bring it: it's a working specification, and sometimes a codebase worth keeping.",
        },
        {
          type: "callout",
          title: "Where not to save",
          text: "Security, backups, automated tests on sign-up and payments, and having the code and accounts in your name. They're cheap to include from day one and painful to add after something has gone wrong.",
        },
      ],
    },
    {
      id: "accurate-quote",
      heading: "Getting a quote you can rely on",
      blocks: [
        {
          type: "paragraph",
          text: "Send every supplier the same short written brief and ask for an itemised estimate back. A page or two is enough. The clearer the brief, the closer the quotes land to each other and to the final bill.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Say who the app is for and how they solve the problem today.",
            "List the must-have features, and keep nice-to-haves on a separate list so they can be priced as options.",
            "Name every user role, platform and integration. These move the price most, so don't leave them implied.",
            "Share whatever exists: sketches, a prototype, an old codebase, or a competitor's app you'd like to resemble.",
            "Ask what's excluded. Design, content, testing, hosting setup, store submission and post-launch support are the usual gaps.",
            "Ask how changes are priced, because there will be changes.",
          ],
        },
        {
          type: "paragraph",
          text: `We price our own builds per sprint rather than per day: two weeks costs ${mvp.price} + VAT and three weeks ${extendedMvp.price} + VAT, and the scope is written down and agreed before any work starts. Whoever you go with, check the contract and who owns the accounts before you sign.`,
          link: {
            text: "Use our buyer's checklist for choosing an app development company.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the average cost of app development in the UK?",
      answer:
        "There isn't a useful single average, because a booking app and a two-sided marketplace are different projects. As a rough guide, a focused first version typically costs £10,000 to £60,000 with a small studio and more with a larger agency. A written scope is the only way to get a number you can rely on for your app.",
    },
    {
      question: "Can I build an app for under £5,000?",
      answer:
        "Yes, if you build it yourself with no-code or AI tools, or the scope is very small. At that budget a professional build is usually a prototype rather than a production app. That's a perfectly good first step if you want to test demand before spending more.",
    },
    {
      question: "How much do app developers charge per day in the UK?",
      answer:
        "UK freelance app developers typically charge around £300 to £700 a day, depending on experience and the technology. Studios and agencies often quote a fixed price for a defined scope instead, which builds in design, testing and project management.",
    },
    {
      question: "How much does app maintenance cost per year?",
      answer:
        "A common rule of thumb is 15 to 20% of the original build cost a year, plus hosting and third-party fees. Apps with lots of integrations, or ones you keep adding features to, sit at the top of that range. Mobile apps also need updating for each new iOS and Android release.",
    },
    {
      question: "Why are app development quotes so different?",
      answer:
        "Mostly because each supplier is pricing a slightly different app in their head. Differences in what's included, like design, testing and launch support, widen the gap. Send everyone the same written brief and ask for itemised estimates so you're comparing like with like.",
    },
  ],
}
