import budgetSteps from "@/assets/blog/images/mvp-budget-steps.webp"
import threeMvpsInWeeks from "@/assets/blog/images/mvp-cost-three-examples-in-weeks.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, formatPrice, mvp, supportPlan, weeklyRate } from "@/lib/services"

/** An example's development weeks at our package rate, e.g. "£45,000". */
const atOurRate = (weeks: number) => formatPrice(weeks * weeklyRate)

export const mvpCostUk: BlogPost = {
  slug: "how-much-does-an-mvp-cost-uk",
  title: "How much does an MVP cost in the UK?",
  series: "launch",
  topic: "MVP cost",
  icon: "coins",
  description:
    "MVP cost in the UK runs from £5,000 to £40,000 or more, set by weeks of development. See what each feature adds and three example MVPs priced week by week.",
  summary:
    "MVP cost in the UK typically runs from £5,000 to £25,000 with a freelancer, £10,000 to £40,000 with a small studio and £40,000 or more with an agency. Under every one of those quotes is a number of development weeks: one core journey with sign-in takes about a week, and each extra kind of user, payment, integration or AI feature adds days to it. Below, three example MVPs are priced week by week, along with what the largest costs once its most expensive feature waits for version two.",
  datePublished: "2026-11-26",
  facts: [
    { label: "Freelancer", value: "£5,000 to £25,000" },
    { label: "Small studio", value: "£10,000 to £40,000" },
    { label: "Agency", value: "£40,000 and up" },
    { label: "What sets the price", value: "Weeks of development" },
  ],
  sections: [
    {
      id: "what-sets-mvp-cost",
      heading: "What sets MVP cost in the UK",
      blocks: [
        {
          type: "paragraph",
          text: "The number of development weeks. Every MVP quote, whether it comes as a freelancer's day rate or a studio's fixed price, is someone's estimate of how long the build will take multiplied by what their time costs. Who builds it sets the rate. What you ask for sets the weeks, and the weeks usually move the total further.",
        },
        {
          type: "paragraph",
          text: "A UK freelancer at £300 to £700 a day costs roughly £1,500 to £3,500 for a five day week. A studio prices a small team's week instead, so its weekly figure is higher, and design, building and testing run alongside each other rather than one after another.",
        },
        {
          type: "paragraph",
          text: "The weeks start from a base. In our estimates, one week of development covers sign-up and log in, a handful of screens, the emails the app sends, analytics and deployment. That's the smallest thing we'd put in front of paying users, and every figure below is time added to it.",
          link: {
            text: "See what a full app costs to build and run in the UK.",
            href: "/blog/how-much-does-it-cost-to-build-an-app-uk",
          },
        },
      ],
    },
    {
      id: "what-each-feature-adds",
      heading: "How much each feature adds to an MVP",
      blocks: [
        {
          type: "paragraph",
          text: "Between half a week and a week and a half for each feature beyond the base. These are the allowances our MVP Cost Calculator uses, taken from the builds we scope. Another team's numbers will differ, but the order is the useful part: payouts to other users and a second platform sit at the top, a single integration near the bottom.",
        },
        {
          type: "table",
          caption:
            "Development time each feature adds to a one week MVP base, as allowed in the Scryptic MVP Cost Calculator",
          columns: ["Feature", "Added to the base", "Where the time goes"],
          rows: [
            ["A marketplace that pays other users", "1.5 weeks", "Verifying sellers, paying them out, and refunds with two sides to them"],
            ["Native iOS and Android apps alongside the web app", "1.5 weeks", "Two more builds to test on real phones and submit for store review"],
            ["Native iOS and Android apps instead of a web app", "1 week", "Store submission, testing on devices and waiting on app review"],
            ["Companies with teams, invites and permissions", "1 week", "Every screen checking which company the data belongs to"],
            ["AI as the product, working over your data or as an agent", "1 week", "Usage limits per user, logging, and testing answers that vary between runs"],
            ["Admin with reporting dashboards", "1 week", "Figures someone will make decisions from, so they have to be right"],
            ["4 to 8 main features rather than 1 to 3", "1 week", "9 or more adds 2 weeks"],
            ["Three or more integrations, or one with no good API", "1 week", "Each outside system fails in its own way"],
            ["Different kinds of user, such as buyers and sellers", "0.5 weeks", "A second set of screens and rules about who sees what"],
            ["One-off payments or subscriptions", "0.5 weeks", "Checkout, payment webhooks, receipts and failed cards"],
            ["One or two integrations", "0.5 weeks", "A calendar, a CRM or an accounting tool with a decent API"],
            ["AI that writes, summarises or chats", "0.5 weeks", "One model call in a flow, with limits so a user can't run up the bill"],
            ["An admin panel for users and content", "0.5 weeks", "Editing, banning and refunding without opening the database"],
            ["Design from scratch", "0.5 weeks", "A quarter of a week with sketches to work from, none with finished designs"],
          ],
        },
        {
          type: "paragraph",
          text: `Add up what your MVP needs, round to whole weeks and multiply by the rate of whoever builds it. That's all fixed MVP pricing is. Our MVP Cost Calculator does the sum from eight questions, prices it at ${formatPrice(weeklyRate)} a development week, the rate our packages work out to, and lists the answers that drive the total.`,
          link: { text: "Price your own MVP with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
      ],
    },
    {
      id: "three-mvps",
      heading: "Three MVPs priced week by week",
      blocks: [
        {
          type: "paragraph",
          text: "Here's the same sum for three first releases of different sizes. None of them is a client project. They're the kinds of brief founders bring to a first call, sized with the allowances in the table.",
        },
        {
          type: "image",
          image: threeMvpsInWeeks,
          alt: "A column chart of three MVPs in development weeks, with marketplace payouts the largest block in the tallest column.",
        },
        { type: "subheading", text: "A sign-off app for a building firm" },
        {
          type: "paragraph",
          text: `Site managers log in, open a job, work through the checks and sign it off, and the office sees which jobs are finished. That's one kind of user and three features, with no payments and no integrations, and the founder has sketched the screens. The base week plus a quarter for design rounds to one week of development: ${atOurRate(1)} at our rate, or £1,500 to £3,500 of a freelancer's time if one person can do it in the same week.`,
        },
        { type: "subheading", text: "A client portal for an accountancy practice" },
        {
          type: "paragraph",
          text: `Clients upload their documents and see what's still outstanding, while the accountants see every client and chase the gaps. Two kinds of user add half a week, a connection to Xero another half and the sketches a quarter. That's 2.25 weeks, which rounds to two: ${atOurRate(2)} at our rate, the price of our three week ${extendedMvp.name} sprint.`,
        },
        { type: "subheading", text: "A marketplace for private tutors" },
        {
          type: "paragraph",
          text: `Parents search for a tutor, book a lesson and pay. Tutors set their hours and get paid, and the founder wants reports on bookings. Two kinds of user, four to eight features, payouts to tutors, a calendar and video link, admin with reporting and design from scratch add five weeks to the base. Six weeks of development is ${atOurRate(6)} at our rate, and the calculator shows ${atOurRate(6)} to ${atOurRate(7)}, because a build past our packages carries more unknowns and gets an extra week at the top of its range.`,
        },
        {
          type: "paragraph",
          text: "The first two would cost much the same from any careful builder. The third is where quotes spread out, because 2.5 of its 6 weeks sit in payouts and reporting, the features that vary most from one team's estimate to the next.",
        },
      ],
    },
    {
      id: "less-in-version-one",
      heading: "What the marketplace costs with less in version one",
      blocks: [
        {
          type: "paragraph",
          text: "Four weeks instead of six, by putting three things off rather than dropping any of them. The calculator names the biggest driver of every estimate and what the build comes to without it. For the tutor marketplace that's paying tutors out, and two smaller cuts follow from the same question: does the first group of parents need this?",
        },
        {
          type: "list",
          items: [
            {
              term: "Payments",
              text: "Charge tutors a monthly subscription instead of taking a cut of each lesson, and parents pay their tutor directly. The app stops handling other people's money, which saves a week.",
            },
            {
              term: "Reporting",
              text: "Read the monthly numbers from the admin panel until there are enough bookings to chart. Saves half a week.",
            },
            {
              term: "Design",
              text: "Pick a booking app the founder likes and take the feel from it rather than designing from a blank page. Saves a quarter of a week.",
            },
          ],
        },
        {
          type: "paragraph",
          text: `That brings it to 4.25 weeks, which rounds to four: ${atOurRate(4)} at our rate instead of ${atOurRate(6)}. Each of the three features matters once there are enough tutors and bookings to justify it, and by then the founder knows whether tutors would rather pay monthly or per lesson, which is worth finding out before building payouts around the wrong answer.`,
        },
        {
          type: "paragraph",
          text: "Your own feature list rarely sorts itself this neatly. The free MVP Scope Planner lets you size each feature you want and see what fits a first release and what can wait.",
          link: { text: "Split your feature list with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
      ],
    },
    {
      id: "what-a-budget-buys",
      heading: "What an MVP budget buys",
      blocks: [
        {
          type: "paragraph",
          text: "Mostly the number of journeys that make it into the first release. The bands below are a rough guide to what UK founders get for each, and they overlap, because a tight scope from an expensive team can cost less than a loose one from a cheap team.",
        },
        {
          type: "image",
          image: budgetSteps,
          alt: "Four rising steps labelled with MVP budgets from under £5,000 to £40,000 and up, each naming what that budget buys.",
        },
        {
          type: "list",
          items: [
            {
              term: "Under £5,000",
              text: "You build it yourself on an AI or no-code builder, or pay for a clickable prototype. It's the cheapest way to show people want it, and it usually stalls at sign-in, payments or personal data.",
            },
            {
              term: "£5,000 to £15,000",
              text: "One core journey built in code, with sign-in and often payments, from a freelancer over a few weeks or a fixed-price sprint.",
            },
            {
              term: "£15,000 to £40,000",
              text: "Several journeys, more than one kind of user, an integration or two and an admin side, typically from a small studio.",
            },
            {
              term: "£40,000 and up",
              text: "An agency, which usually starts with a paid discovery phase of research and workshops, or native mobile apps built next to the web app.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "If your budget sits in the first band, a prototype is the right thing to buy, as long as you know what it can't do. The line between a prototype and an MVP is worth being clear on before you pay for either.",
          link: { text: "What separates a prototype from MVP software.", href: "/blog/what-is-mvp-software" },
        },
        {
          type: "paragraph",
          text: "Not sure whether a builder will carry your idea that far? The Build or No-Code Quiz asks seven questions about your idea, your users and your budget, and says whether no-code is enough or it needs real code.",
          link: { text: "Take the Build or No-Code Quiz.", href: "/tools/build-or-no-code" },
        },
      ],
    },
    {
      id: "what-the-price-covers",
      heading: "What a fixed MVP price should cover",
      blocks: [
        {
          type: "paragraph",
          text: "The development weeks and the time either side of them. A price that ends on launch day leaves out the two stretches a first release needs most: changes once you've used it yourself, and fixes once strangers have.",
        },
        {
          type: "checklist",
          items: [
            "A round of changes after you've used the build, before launch",
            "A set period after launch for bug fixes, with its length written down",
            "The code repository, hosting and accounts set up in your name",
            "Design, or a line saying plainly that it isn't included",
            "A written scope, so a new idea becomes a priced change rather than a dispute",
          ],
        },
        {
          type: "paragraph",
          text: `Ours are ${mvp.price} + VAT for one development week followed by a week of iteration and a week of handover, or ${extendedMvp.price} + VAT with two development weeks. Support after handover is optional, at ${supportPlan.price} + VAT a ${supportPlan.per}.`,
          link: { text: "See what each MVP package includes.", href: "/pricing" },
        },
        {
          type: "paragraph",
          text: "Hosting and outside services are a separate bill. It starts small at launch, arrives every month and grows with your users, so set it against your budget next to the build.",
          link: { text: "How the running bill grows after launch.", href: "/blog/saas-cost-before-and-after-launch" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do UK MVP prices include VAT?",
      answer:
        "Usually not. VAT-registered UK suppliers tend to quote businesses excluding VAT and add it at the standard 20% on the invoice, so a £15,000 quote means £18,000 to pay. A VAT-registered company can normally reclaim it; if yours isn't registered yet, budget for the full amount.",
    },
    {
      question: "Can I pay for an MVP with equity instead of cash?",
      answer:
        "Some developers will take shares or a share of revenue in place of part of their fee. It keeps cash in the bank now, and it gives part of the company to someone who may not build the next version. Weigh it the way you would an investor's offer for the same share, not as a discount on the build.",
    },
    {
      question: "How long does an MVP take once the price is agreed?",
      answer:
        "The development weeks plus time for changes. On our packages that's a two or three week sprint ending in launch, then a week of handover. A larger studio build usually takes 6 to 12 weeks, and waiting on decisions, content and approvals from payment providers or app stores often adds more time than the code does.",
    },
  ],
}
