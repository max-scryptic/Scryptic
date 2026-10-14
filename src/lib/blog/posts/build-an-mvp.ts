import type { BlogPost } from "@/lib/blog/types"

export const buildAnMvp: BlogPost = {
  slug: "how-to-build-an-mvp",
  title: "How to build an MVP, week by week",
  series: "launch",
  topic: "MVP",
  description:
    "How to build an MVP in one to two months, week by week: scoping, design, build sprints, launch week and the first month with real users, with checklists.",
  summary:
    "To build an MVP, spend the first week cutting scope to one job for one kind of user, the second designing that flow, the next four building it and the last two hardening and launching. A focused MVP like this usually takes one to two months, and the month after launch matters as much as the build.",
  datePublished: "2026-10-14",
  sections: [
    {
      id: "the-timeline",
      heading: "What an eight week MVP looks like",
      blocks: [
        {
          type: "paragraph",
          text: "Eight weeks is enough to put a real product in front of real users, provided the product does one thing. That's the shape of this playbook: one week of scoping, one of design, four of building, one of hardening and one of launching, followed by a month of learning from the people using it. Smaller products compress into four or five weeks; we cover what to drop at the end.",
        },
        {
          type: "paragraph",
          text: "An MVP, or minimum viable product, is the smallest version of your product that real users can use for real work. The word people skip is viable: if someone can't finish the job without you sitting beside them, it isn't one yet. It's also not a prototype. A prototype is a clickable design with nothing behind it, for testing an idea with a handful of people. An MVP has accounts, a database and data that's still there tomorrow.",
        },
        {
          type: "paragraph",
          text: "And it isn't a fifth of every feature on your roadmap. A product that does ten things badly teaches you nothing, because nobody can tell which part failed. An MVP does one thing properly and leaves the rest out.",
        },
      ],
    },
    {
      id: "before-kickoff",
      heading: "Before week one, find the people with the problem",
      blocks: [
        {
          type: "paragraph",
          text: "Don't start the clock until you can name ten real people who have the problem and already spend time or money on it. The build can't fix a missing audience, and these ten are who you'll design for, test with and launch to.",
        },
        {
          type: "paragraph",
          text: "Talk to them about how they handle the problem today, not about your idea. What they currently use, what it costs them and what they've tried and dropped tells you far more than whether they like your pitch. Saying they love an idea costs people nothing.",
        },
        {
          type: "checklist",
          items: [
            "Ten named people with the problem, and a way to reach each of them",
            "Notes on how each one handles it today",
            "At least a few who've agreed to try the first version",
            "A rough budget and a launch date you're willing to hold",
          ],
        },
      ],
    },
    {
      id: "week-1-scope",
      heading: "Week 1. Cut the scope to one job",
      blocks: [
        {
          type: "paragraph",
          text: "The first week produces a single sentence and a short list, and both matter more than any code. The sentence is the core job, for example: this lets a dog groomer take bookings without a phone call. Every feature either serves that sentence or waits.",
        },
        {
          type: "subheading",
          text: "Cut, then cut again",
        },
        {
          type: "paragraph",
          text: "Write down everything you want, then strike anything a user doesn't need to complete the core job once, start to finish. Then go through the list a second time. The second pass is the one that matters, because that's when the features you're attached to get questioned.",
        },
        {
          type: "paragraph",
          text: "What can almost always wait: an admin panel (work in the database directly for a while), team accounts and user roles, notification settings, dark mode, a native mobile app, most integrations, and anything that's only there because a competitor has it.",
        },
        {
          type: "callout",
          title: "A test for every feature",
          text: "Ask what you'd learn with it in the MVP that you wouldn't learn without it. If the honest answer is nothing, it goes on the later list.",
        },
        {
          type: "subheading",
          text: "Decide what you'll do by hand",
        },
        {
          type: "paragraph",
          text: "A lot of an MVP can run on you instead of code. Onboarding can be a video call. Reports can be a spreadsheet you email on Monday. Approvals, matching and anything that needs judgement can be you, behind a plain form. Automate it when it's eating your week, not before.",
        },
        {
          type: "subheading",
          text: "Pick the build route",
        },
        {
          type: "list",
          items: [
            {
              term: "No-code (Bubble, Glide, Softr)",
              text: "Fine for simple workflows and internal tools, and a non-developer can run it. There's no code to export, so outgrowing the platform means a rebuild.",
            },
            {
              term: "AI app builders (Lovable, Bolt, v0, Replit)",
              text: "Real code from prompts and a working version within days. Good for validating almost any web idea, but expect to sort out data access, secrets and tests before paying users arrive.",
            },
            {
              term: "Custom code",
              text: "Costs more up front, and gives you code you own, tested payments and permissions, and a base the next version builds on. Right when demand is proven, the data is sensitive or the product depends on something fiddly.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Cost is driven by scope far more than technology. Each extra type of user, each integration with a poorly documented API, payments beyond a simple checkout, and AI features all add time. At Scryptic, full builds start from £10,000 depending on complexity and usually go live in one to two months, with the estimate agreed in this first week before any build starts. If one quote is far below the others for the same scope, ask what's been left out; testing, payment edge cases and handover are the usual gaps.",
        },
        {
          type: "checklist",
          items: [
            "The core job written as one sentence",
            "A feature list cut twice, with a separate later list",
            "Manual workarounds agreed for everything that isn't automated",
            "Build route chosen",
            "A written estimate and a launch date",
          ],
        },
      ],
    },
    {
      id: "week-2-design",
      heading: "Week 2. Design the core flow and test it on paper",
      blocks: [
        {
          type: "paragraph",
          text: "Design only the screens the core job passes through, and put them in front of five of your ten people before any of it is built. A clickable prototype in Figma is the cheapest place to find out that a step makes no sense.",
        },
        {
          type: "paragraph",
          text: "For most products that means sign-up, the two or three screens of the core job, and the moment a user sees the result. Ask each tester to complete the job while you watch and say nothing. Where they hesitate is your list of fixes.",
        },
        {
          type: "paragraph",
          text: "In parallel, sketch the data model: the handful of things the product stores and how they relate. This is where you decide what a user owns and who else can see it, which shapes the security rules later.",
        },
        {
          type: "checklist",
          items: [
            "Clickable designs for every screen in the core flow",
            "Five people have tried the prototype",
            "Changes from those sessions made",
            "A simple data model, including who can see what",
          ],
        },
      ],
    },
    {
      id: "weeks-3-to-6-build",
      heading: "Weeks 3 to 6. Build in two sprints, core flow first",
      blocks: [
        {
          type: "paragraph",
          text: "Build the core job end to end before anything else, then add what's needed to run it as a business. Two two-week sprints, with a demo at the end of each week, keep everyone looking at working software rather than status updates.",
        },
        {
          type: "subheading",
          text: "Sprint one, the core job working",
        },
        {
          type: "paragraph",
          text: "Sign-up and sign-in, the screens of the core job, and the data saved properly. By the end of week four a test user should be able to complete the job once, even if it's ugly. Resist settings pages, dashboards and polish. If you catch yourself building a custom admin dashboard here, stop.",
        },
        {
          type: "subheading",
          text: "Sprint two, the things around it",
        },
        {
          type: "list",
          items: [
            "Stripe, if you're testing whether people will pay. A simple checkout or subscription, not every plan change and refund case.",
            "The emails the job depends on: confirmations, password resets and the one notification users actually need.",
            "Product analytics, such as PostHog, wired to the events that tell you whether the job got done.",
            "Error tracking, so you hear about failures before users tell you.",
            "Whatever the manual workarounds need: a form you can see submissions from, a spreadsheet export.",
          ],
        },
        {
          type: "paragraph",
          text: "Expect at least one feature to turn out harder than estimated. When it does, the fix is usually to cut something from the later list rather than move the launch date.",
        },
        {
          type: "checklist",
          items: [
            "A test user can sign up and complete the core job",
            "Payments work end to end, if you're charging",
            "Analytics events fire for each step of the core job",
            "Errors are reported somewhere you'll see them",
          ],
        },
      ],
    },
    {
      id: "week-7-harden",
      heading: "Week 7. Harden it before anyone sees it",
      blocks: [
        {
          type: "paragraph",
          text: "Spend a full week making the MVP safe, because minimum applies to features, not to security. Users will put up with a plain interface. They won't put up with seeing someone else's invoices.",
        },
        {
          type: "paragraph",
          text: "Sign in as two different test users and try to reach each other's data, through the interface and directly through the API. Test the core flow on a phone and on a slow connection. Restore a backup to a separate database to prove it works. Set up a staging copy so fixes during launch week don't go straight to live.",
        },
        {
          type: "checklist",
          items: [
            "One user cannot read or change another user's data",
            "Secret keys live on the server, not in the browser",
            "Automated tests cover sign-up, payment and the core job",
            "A backup has been restored successfully",
            "Staging and production are separate",
            "The core flow works on a phone",
          ],
        },
      ],
    },
    {
      id: "week-8-launch",
      heading: "Week 8. Launch to the ten, not to everyone",
      blocks: [
        {
          type: "paragraph",
          text: "Launch to the people from before week one, not to the internet. A quiet launch to users who've agreed to try it gives you honest feedback and a chance to fix things while the stakes are low.",
        },
        {
          type: "paragraph",
          text: "Onboard the first few yourself, on a call, and watch where they get stuck. Write down before launch what counts as working: people finishing the core job, coming back the following week, paying. Then look at the analytics daily rather than asking for opinions.",
        },
        {
          type: "checklist",
          items: [
            "A definition of success written down before launch",
            "Every early user onboarded personally",
            "A daily look at the core job events",
            "A simple way for users to report problems",
          ],
        },
      ],
    },
    {
      id: "first-month",
      heading: "The first month after launch",
      blocks: [
        {
          type: "paragraph",
          text: "The month after launch decides whether you keep going, change direction or stop, and your users make that call through what they do. Any of those outcomes beats spending a year building the wrong thing.",
        },
        {
          type: "paragraph",
          text: "Talk to users every week, read the numbers and change the product. Expect to delete features as often as you add them. Replace the manual work you faked once it's eating your time, build what users keep asking for, and shore up the foundations: the queries that got slow and the monitoring you skipped.",
        },
        {
          type: "paragraph",
          text: "The mistakes to watch for in this month are mostly one mistake in disguise, building too much before anyone uses it:",
        },
        {
          type: "list",
          items: [
            "Polishing instead of talking to users, so the honest feedback arrives after the budget has gone.",
            "Widening the audience to everyone, which trades a strong fit for one group for a weak fit for all of them.",
            "Counting compliments as validation. Using it every week, or paying for it, is the signal.",
            "Arguing about opinions when the analytics already show what people did.",
          ],
        },
        {
          type: "paragraph",
          text: "If the MVP was built on no-code or an AI builder and it's working, this is usually when it moves to a codebase you own. If it was production code from the start, the next version builds on it instead of replacing it, which is the main reason to build properly once demand is clear rather than build twice.",
        },
      ],
    },
    {
      id: "one-month-version",
      heading: "If you only have four weeks",
      blocks: [
        {
          type: "paragraph",
          text: "Squeeze design and scoping into the first week, build for two, and harden and launch in the fourth. What makes that possible is cutting harder, not working faster.",
        },
        {
          type: "paragraph",
          text: "Drop payments if you can take the first few by invoice. Use a hosted sign-in rather than building screens for it. Keep the hardening week, though. A four week MVP that leaks data has cost you more than the four weeks it saved.",
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
        "It depends mostly on scope. A no-code MVP you build yourself can cost little more than subscriptions, while a custom MVP from a studio typically runs into the tens of thousands of pounds. The number of user types, integrations, payments and AI features move the price most.",
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
