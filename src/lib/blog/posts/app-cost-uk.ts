import type { BlogPost } from "@/lib/blog/types"

export const appCostUk: BlogPost = {
  slug: "how-much-does-it-cost-to-build-an-app-uk",
  title: "How much does it cost to build an app in the UK?",
  series: "launch",
  topic: "App cost",
  description:
    "What it costs to build an app in the UK: typical prices for DIY tools, freelancers, studios and agencies, how long it takes, running costs and ways to save.",
  summary:
    "Building an app in the UK typically costs a few hundred pounds if you do it yourself with no-code or AI tools, roughly £5,000 to £25,000 with a freelancer, £10,000 to £60,000 with a small studio and £40,000 to £150,000 or more with an agency. Scope moves the price far more than who builds it. Once it's live, budget around 15 to 20% of the build cost a year to keep it running and up to date.",
  datePublished: "2026-10-14",
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
      heading: "How much does it cost to build an app in the UK?",
      blocks: [
        {
          type: "paragraph",
          text: "For a focused first version, expect to pay somewhere between £5,000 and £60,000 if you hire someone, and well past £150,000 for a large, polished product from an agency. These are the ranges UK founders are typically quoted, not survey figures, and they overlap a lot. A simple app from an agency can easily cost less than a complicated one from a freelancer.",
        },
        {
          type: "list",
          items: [
            {
              term: "Do it yourself: a few hundred pounds",
              text: "No-code and AI app builders charge a monthly subscription, so the cash outlay for a first version is often under £1,000. You pay in time instead, and in the walls you hit once real users, payments and personal data turn up.",
            },
            {
              term: "Freelancer: roughly £5,000 to £25,000",
              text: "UK freelance developers typically charge around £300 to £700 a day. A good one can ship a small MVP on their own, but you'll usually be the designer, tester and project manager.",
            },
            {
              term: "Small studio: roughly £10,000 to £60,000",
              text: "A small team handles design, build and launch, and you normally get a written estimate before anything starts. Less process than an agency, and someone other than you is accountable when things slip.",
            },
            {
              term: "Agency: roughly £40,000 to £150,000 and up",
              text: "You're paying for account managers, dedicated designers, QA testers and a formal discovery phase. That's money well spent on a complex or regulated product. For a first MVP it's usually more machinery than you need.",
            },
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
      id: "what-drives-cost",
      heading: "What drives app development cost?",
      blocks: [
        {
          type: "paragraph",
          text: "Scope. How many screens there are, how many different kinds of user, and how many other systems the app has to talk to. Day rates matter less than people expect, because a cheaper developer on a bigger scope still sends a bigger invoice.",
        },
        {
          type: "paragraph",
          text: "These are the things that move a quote most, in rough order of how often they surprise people:",
        },
        {
          type: "list",
          items: [
            "Admin tools. Somebody has to refund a customer, ban a spammer and fix a typo in a listing. A proper back office is easy to forget at the idea stage and can be a surprisingly large slice of the build.",
            "User roles. Customer, staff and admin isn't three times the work, but every role adds screens and permission rules, and each rule needs testing signed in as that user, because testing as an admin hides permission bugs.",
            "Payments. A one-off Stripe Checkout is quick. Subscriptions with trials, proration, failed card retries and VAT invoices take much longer, and a webhook that fires twice and books the same class twice is the kind of bug you only avoid by designing for it.",
            "Integrations. A well documented API like Stripe or Xero is predictable. An old booking system with a SOAP API and a test environment that's down half the time is not, so price the fussy ones generously.",
            "Platforms. Web, iOS and Android are three targets. React Native or Flutter share most of the code between the two phone platforms, but each still needs its own testing, store listing and review.",
            "Design. A clean interface built on a component library costs a fraction of a fully bespoke brand system with custom illustration and animation.",
          ],
        },
      ],
    },
    {
      id: "how-long",
      heading: "How long does it take to build an app?",
      blocks: [
        {
          type: "paragraph",
          text: "A focused MVP usually takes 6 to 12 weeks, a fuller product 3 to 6 months, and a platform with several apps and lots of integrations 6 months or more. Time and money move together, since nearly all of the cost is people's time. If someone quotes three weeks for a marketplace with payments, ask what they've left out.",
        },
        {
          type: "paragraph",
          text: "In practice the code is rarely what holds a launch up. Waiting is. Waiting on copy and decisions from the founder, on a payment provider's account checks, on API keys from a partner, and on App Store review, which is often quick but can stretch to a couple of weeks if the first submission gets rejected. Build those waits into your plan and you'll hit your date far more often.",
        },
      ],
    },
    {
      id: "running-costs",
      heading: "How much does it cost to keep an app running?",
      blocks: [
        {
          type: "paragraph",
          text: "Plan on roughly 15 to 20% of the build cost each year for maintenance, plus hosting and service fees. That percentage is a rule of thumb, not a law. A quiet internal tool can cost far less, and a product you're actively growing will cost more because you'll keep adding to it.",
        },
        {
          type: "list",
          items: [
            {
              term: "Hosting and database",
              text: "Often tens of pounds a month for an early product on platforms like Vercel, Render or a managed Postgres provider. It climbs with traffic, storage and background jobs.",
            },
            {
              term: "Apple Developer Program",
              text: "You need it to publish on the App Store. At the time of writing it's US$99 a year, charged in local currency.",
            },
            {
              term: "Google Play",
              text: "A one-off registration fee, US$25 at the time of writing.",
            },
            {
              term: "Store commission",
              text: "Apple and Google take a cut of digital goods and subscriptions sold inside a mobile app, typically 15% to 30% depending on the programme and your revenue. On the web, Stripe's card processing fee is a small fraction of that.",
            },
            {
              term: "Third-party services",
              text: "Transactional email, error tracking, analytics, maps, SMS and AI APIs. Most start cheap and bill by usage, so watch the AI and SMS lines in particular as you grow.",
            },
            {
              term: "Maintenance",
              text: "Dependency and security updates, bug fixes, and keeping up with each new iOS and Android release. Mobile apps need noticeably more of this than web apps, because the operating system changes under them every year.",
            },
          ],
        },
      ],
    },
    {
      id: "hidden-costs",
      heading: "What hidden costs should you budget for?",
      blocks: [
        {
          type: "paragraph",
          text: "The ones that catch founders out sit outside the quote: work the supplier assumed you'd do, and things nobody thought about until launch week. Ask each supplier directly which of these they've included.",
        },
        {
          type: "list",
          items: [
            "Content. Onboarding copy, empty states, emails, help pages and app store screenshots don't write themselves.",
            "Legal. A privacy policy and terms of service, and a proper look at UK GDPR if you're storing personal data.",
            "Changing your mind mid-build. It's the single most common reason projects run over. Park new ideas for version two unless they're blocking launch.",
            "The first month after launch. Real users find things testing didn't, so keep some budget back for it.",
            "Paying twice. A cheap prototype that can't carry real users gets rebuilt, and the second build is the expensive one.",
          ],
        },
      ],
    },
    {
      id: "cut-the-cost",
      heading: "How can you cut the cost without cutting corners?",
      blocks: [
        {
          type: "paragraph",
          text: "Build less, not worse. Launch the smallest version people will actually use and pay for, then let them tell you what's missing. Most first versions we'd scope have one core workflow, sign-up, payments and a basic admin page, and nothing else.",
        },
        {
          type: "paragraph",
          text: "For most first versions we'd also start on the web. A responsive web app works on every phone and laptop, ships without app store review and avoids store commission. Go native first only if the product genuinely needs it, for example offline use in the field or background location tracking. Our guides How to build an MVP and Web app or mobile app first? go into both decisions in more detail.",
        },
        {
          type: "paragraph",
          text: "Buy the boring parts. Authentication, payments, email and search are solved problems, and building your own is rarely worth it at this stage. If you already have a prototype from Lovable, Bolt or a no-code tool, bring it: it's a working specification, and sometimes a codebase worth keeping, as our guide From vibe coding to a production app explains.",
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
      heading: "How do you get an accurate quote for your app?",
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
          text: "At Scryptic, full app to market builds start from £10,000 depending on complexity, usually take 1 to 2 months from kickoff to launch, and the written estimate comes before any work starts. Whoever you go with, our guide How to choose an app development company in the UK covers what else to check before you sign.",
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
      question: "Is a web app cheaper to build than a mobile app?",
      answer:
        "Usually, yes. One responsive web app runs on every device, skips app store review and avoids store commission on digital sales. Native apps earn their extra cost when you need offline use, background location or deep access to the phone's hardware.",
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
