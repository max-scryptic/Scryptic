import type { BlogPost } from "@/lib/blog/types"

export const buildAnMvp: BlogPost = {
  slug: "how-to-build-an-mvp",
  title: "How to build an MVP",
  series: "launch",
  topic: "MVP",
  description:
    "How to build an MVP step by step: what a minimum viable product is, what to cut, no-code or custom code, typical cost and timeline, and what comes next.",
  summary:
    "To build an MVP, pick one kind of user with one painful problem, build the smallest thing that solves it end to end, and do everything else by hand until you know it matters. An MVP isn't a prototype or a thin slice of your whole roadmap. It's a real product people can use, and a focused one typically takes one to three months to build.",
  datePublished: "2026-10-14",
  facts: [
    { label: "What it is", value: "The smallest product real users can use" },
    { label: "Typical timeline", value: "1 to 3 months" },
    { label: "Biggest cost driver", value: "Scope, not technology" },
    { label: "Build routes", value: "No-code, AI builder or custom code" },
  ],
  sections: [
    {
      id: "what-is-an-mvp",
      heading: "What is an MVP, and what isn't it?",
      blocks: [
        {
          type: "paragraph",
          text: "An MVP, or minimum viable product, is the smallest version of your product that real users can use for real work, built so you find out whether it's worth building more. Eric Ries popularised the idea in The Lean Startup, and the word people skip over is viable. If someone can't get the job done without you sitting next to them, it isn't one yet.",
        },
        {
          type: "paragraph",
          text: "It's easiest to pin down by what it isn't. A prototype shows what a product could look like, often a clickable Figma file with nothing behind it, and it's for testing a design with a handful of people. An MVP has accounts, a database and data that's still there tomorrow. MVP vs prototype isn't a quality ladder. They answer different questions, and plenty of good teams build a prototype first.",
        },
        {
          type: "paragraph",
          text: "The other common mix-up is treating the MVP as a cut-down version of everything: take the full roadmap, build a fifth of every feature, ship it. You end up with a product that does ten things badly and teaches you nothing, because nobody can tell which part failed. An MVP does one thing properly and leaves the rest out.",
        },
      ],
    },
    {
      id: "step-by-step",
      heading: "How do you build an MVP, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Start from one person's problem, not a feature list, and cut scope at every step. This is the order we'd follow for building an MVP of almost any web product, SaaS or otherwise.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Pick the problem and the user",
              text: "One type of customer, one problem they already spend time or money on. If you can't name ten actual people who have it, you're not ready to build. Go and talk to more of them.",
            },
            {
              term: "Write down the one core job",
              text: "One sentence, such as: this lets a dog groomer take bookings without a phone call. Every feature has to serve that sentence or wait.",
            },
            {
              term: "Cut scope hard",
              text: "List everything you want, then strike anything a user doesn't need to complete the core job once, start to finish. Then go through it again. The second pass is the one that matters.",
            },
            {
              term: "Decide what to fake or do by hand",
              text: "A lot of an MVP can run on you instead of code. Onboarding can be a video call. Reports can be a spreadsheet you email on Monday. Approvals, matching and anything that needs judgement can be you, behind a plain form. Automate it when it's eating your week, not before.",
            },
            {
              term: "Choose the build route",
              text: "No-code, an AI app builder or custom code. It depends on what you need to learn and who'll maintain it afterwards, which we cover further down.",
            },
            {
              term: "Build the core flow first",
              text: "Sign-up, the core job and payment if you're charging. Get those solid before anyone touches a settings page or a dashboard.",
            },
            {
              term: "Launch to real users",
              text: "Not friends being polite. The people from step one, ideally ones who've agreed to pay or at least to give you an hour a week.",
            },
            {
              term: "Measure what people do",
              text: "Decide before launch what counts as working: people finishing the core job, coming back the next week, paying. Put PostHog or a similar product analytics tool in from day one so you're looking at behaviour rather than guessing.",
            },
            {
              term: "Iterate",
              text: "Talk to users, read the numbers, change the product. Expect to delete features as often as you add them.",
            },
          ],
        },
      ],
    },
    {
      id: "what-to-include",
      heading: "What should an MVP include, and what can wait?",
      blocks: [
        {
          type: "paragraph",
          text: "An MVP needs whatever lets a user finish the core job safely, and almost nothing else. For a typical SaaS MVP that's sign-up and sign-in, the core workflow, Stripe if you're testing whether people will pay, product analytics, error tracking and data security you've actually tested. Users will put up with a plain interface. They won't put up with seeing someone else's invoices.",
        },
        {
          type: "paragraph",
          text: "What can almost always wait: an admin panel (you can work in the database directly for a while), team accounts and user roles, notification settings, dark mode, a native mobile app, most integrations, and anything that's only there because a competitor has it. If you catch yourself building a custom admin dashboard in week two, stop.",
        },
        {
          type: "callout",
          title: "A test for every feature",
          text: "Ask what you'd learn with it in the MVP that you wouldn't learn without it. If the honest answer is nothing, it goes on the later list.",
        },
      ],
    },
    {
      id: "build-route",
      heading: "Should you build an MVP with no-code, an AI builder or custom code?",
      blocks: [
        {
          type: "paragraph",
          text: "If you're still finding out whether anyone wants the thing, use a no-code tool or an AI builder. If you already know they do, or you're taking payments and storing personal data from day one, go straight to custom code.",
        },
        {
          type: "list",
          items: [
            {
              term: "No-code (Bubble, Glide, Softr)",
              text: "Fine for simple workflows and internal tools, and a non-developer can run it. The catch is that the app lives on the platform. There's no code to export, so outgrowing it means a rebuild.",
            },
            {
              term: "AI app builders (Lovable, Bolt, v0, Replit)",
              text: "These write real code from prompts and will get a working version in front of users within days. We'd happily use one to validate almost any web idea. Just don't assume the result is production ready: it usually needs data access, secrets and tests sorting first, which our post From vibe coding to a production app goes through.",
            },
            {
              term: "Custom code",
              text: "MVP software development with a developer or studio costs more up front. In return you get code you own, payments and permissions that have been tested, and a foundation the next version builds on. It's the right call when demand is proven, the data is sensitive, or the product hinges on something fiddly like complex permissions, a messy integration or an AI pipeline.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "For a founder without a technical co-founder, the route that usually makes most sense is to validate with an AI builder, then commission a production MVP once real users have shown you which parts matter. The blog's migration guides cover moving off most of the popular builders if you go that way.",
        },
      ],
    },
    {
      id: "cost-and-timeline",
      heading: "How much does MVP development cost, and how long does it take?",
      blocks: [
        {
          type: "paragraph",
          text: "MVP development cost is driven by scope far more than technology. Built yourself on no-code, it can be little more than subscriptions. A custom build from an MVP development company typically runs into the tens of thousands of pounds, and a focused one takes one to three months.",
        },
        { type: "paragraph", text: "The things that actually move the number:" },
        {
          type: "list",
          items: [
            "Each extra type of user. A marketplace with buyers, sellers and admins needs separate screens and permission rules for each of them.",
            "Integrations, especially with older systems or APIs with thin documentation.",
            "Payments beyond a simple checkout: subscriptions, trials, plan changes, refunds and retrying failed cards.",
            "AI features. The API call is the easy bit. The time goes on prompts, testing outputs and handling the answers that come back wrong.",
            "Existing work to build on or migrate from, which saves time or adds it depending on the state it's in.",
          ],
        },
        {
          type: "paragraph",
          text: "If one quote is far below the others for the same scope, ask what's been left out. Testing, payment edge cases and handover are the usual suspects. And don't start without a written estimate. At Scryptic, full app to market builds start from £10,000 depending on complexity and usually take one to two months from kickoff to launch, with the estimate agreed before any build starts. Our posts How much does it cost to build an app in the UK? and How to choose an app development company in the UK go further into pricing and comparing MVP development services.",
        },
      ],
    },
    {
      id: "mistakes",
      heading: "What are the most common MVP mistakes?",
      blocks: [
        {
          type: "paragraph",
          text: "Building too much before anyone uses it. Most of the other mistakes are that one in disguise:",
        },
        {
          type: "list",
          items: [
            "Polishing for months, so the first honest feedback arrives once most of the budget has gone.",
            "Building for everyone, which gets you a weak fit for every group instead of a strong fit for one.",
            "Reading minimum as permission to skip security. Minimum applies to features, not to whether one customer can read another's data.",
            "Launching with no analytics, then arguing about opinions instead of looking at what people did.",
            "Picking a tool that can't do the one thing the product depends on, and finding out in week six.",
            "Counting compliments as validation. Saying they love the idea costs people nothing. Using it every week, or paying for it, does.",
          ],
        },
      ],
    },
    {
      id: "after-the-mvp",
      heading: "What happens after the MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "You keep going, change direction or stop, and your first users decide which. Any of those beats spending a year building the wrong thing.",
        },
        {
          type: "paragraph",
          text: "If people are using it and coming back, the next few months usually go on replacing the manual work you faked, building what users keep asking for, and shoring up the foundations: tests, monitoring, backups and the queries that have got slow. If the MVP was built on no-code or an AI builder, this is normally when it moves to a codebase you own. If it was production code from the start, the next version builds on it instead of replacing it. That's the main reason we'd build an MVP properly once demand is clear, rather than build it twice.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between an MVP and a prototype?",
      answer:
        "A prototype shows what a product could look like and is for testing a design or idea, often with nothing working behind it. An MVP is a working product that real users rely on, with accounts, saved data and often payments. It's common to build a prototype first to check the design.",
    },
    {
      question: "How much does it cost to build an MVP in the UK?",
      answer:
        "It depends mostly on scope. A no-code MVP you build yourself can cost little more than subscriptions, while a custom MVP from a studio or agency typically runs into the tens of thousands of pounds. The number of user types, integrations, payments and AI features move the price most.",
    },
    {
      question: "How long does it take to build an MVP?",
      answer:
        "A focused custom MVP typically takes one to three months from kickoff to launch. An AI builder or no-code version can be up in days or weeks, but usually needs more work before it can carry paying users. Scope matters far more than the technology.",
    },
    {
      question: "Can I build an MVP without a developer?",
      answer:
        "Yes, for a lot of products. No-code tools and AI app builders let non-developers build working software, and that's often the fastest way to test demand. Bring in a developer when you're taking payments, storing personal data or the tool starts getting in the way.",
    },
    {
      question: "What should a SaaS MVP include?",
      answer:
        "Sign-up and sign-in, the one core workflow, subscription payments if you're testing pricing, analytics and data security you've tested. Team accounts, user roles, integrations and admin panels can almost always wait until users ask for them.",
    },
  ],
}
