import voucherSpentOnce from "@/assets/blog/images/voucher-spent-once.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const mvpSoftwareDevelopmentExample: BlogPost = {
  slug: "mvp-software-development-example",
  title: "An MVP software development example worth studying",
  series: "launch",
  topic: "MVP examples",
  icon: "flask",
  description:
    "An MVP software development example, worked through: a gift voucher app's first release, what it leaves out and what it can prove, plus three more.",
  summary:
    "A useful MVP software development example follows one task from the first click to the finished result, and it's as clear about what it leaves out as about what it includes. Our worked example is a gift voucher app for independent shops, followed by three shorter examples with different first tasks. All four are illustrations, not client projects.",
  datePublished: "2026-10-28",
  facts: [
    { label: "First release", value: "Buy a voucher online, spend it in the shop" },
    { label: "Left for later", value: "Printed cards, till connections, shop sign-up" },
    { label: "What it tests", value: "Whether people buy a local shop's vouchers online" },
    { label: "Also covered", value: "A marketplace, an AI tool and a reporting tool" },
  ],
  sections: [
    {
      id: "judge-by-the-task",
      heading: "Judge an MVP example by the task it finishes",
      blocks: [
        {
          type: "paragraph",
          text: "Most published MVP examples are feature lists: sign-up, a dashboard, payments, notifications. That list fits almost any product and can't show you whether a single task works. The examples worth studying follow one task from the first click to the last saved record, and they're as specific about the situations the release refuses as the ones it handles.",
        },
        {
          type: "paragraph",
          text: "That's what separates an MVP from an early version of everything. An MVP is the smallest release real people can rely on for one job: it supports fewer situations than the finished product will, and handles each of those properly. The process around it, from finding your first users to the month after launch, has a guide of its own.",
          link: { text: "How to build an MVP, week by week.", href: "/blog/how-to-build-an-mvp" },
        },
      ],
    },
    {
      id: "voucher-app",
      heading: "An MVP software development example for independent shops",
      blocks: [
        {
          type: "paragraph",
          text: "Picture a founder building digital gift vouchers for independent shops, starting with the bookshops and bike shops in one town. Today those shops sell paper vouchers at the counter, so only people who already walk in can buy one. The founder's bet is that friends and relatives who live further away would buy one online if they could.",
        },
        {
          type: "paragraph",
          text: "That gives the first release a single task. Someone buys a voucher for a named shop, the person they're giving it to receives it by email, and later spends it at that shop's counter. A shop that can't take the voucher without ringing the founder hasn't got a working product, so the shop's side is part of the task too.",
        },
        { type: "subheading", text: "What's in the first release and what waits" },
        {
          type: "table",
          caption:
            "The voucher app's first release, part by part, with what each part includes at launch and what waits until later",
          columns: ["Part", "In the first release", "Waits"],
          rows: [
            [
              "Buying",
              "Choose a shop and an amount, add a message and the recipient's email, pay by card",
              "Printed cards, a choice of designs, delivery on a set date",
            ],
            [
              "Receiving",
              "An email with the shop's name, the amount and a voucher code",
              "Wallet passes, and reminders before a voucher expires",
            ],
            [
              "Spending",
              "Staff type the code into a web page, see the balance and record what was spent",
              "Scanning, and connecting to the shop's till",
            ],
            [
              "Running it",
              "The founder sets up each shop by hand, and each shop sees a list of its vouchers",
              "Sign-up for new shops, staff accounts, sales reports",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Payment stays in, because paying is the behaviour being tested. A voucher nobody paid for tells the founder nothing. Typing a code into a web page is slower than a till integration, but it works alongside whatever till each shop already has, and the founder can add a shop without waiting on a till supplier.",
        },
        { type: "subheading", text: "Where the build effort goes" },
        {
          type: "paragraph",
          text: "Most of the work sits in the cases that go wrong, because a voucher is money a shop has promised to honour.",
        },
        {
          type: "image",
          image: voucherSpentOnce,
          alt: "One gift voucher, two attempts to spend it: the first is accepted and the second is refused as already spent.",
        },
        {
          type: "list",
          items: [
            "Two members of staff enter the same code at once. The balance is checked and reduced in one database step, so the voucher can't be spent twice.",
            "The buyer pays and closes the tab before the confirmation page loads. The payment provider also notifies the app directly, so the voucher is still issued, and only once.",
            "Someone types codes at random on the spending page. Codes are long enough that guessing doesn't work, and repeated wrong attempts are blocked.",
            "A customer spends part of a voucher. The remainder stays on it, and the next person at the counter sees the right balance.",
            "A code is tried at another shop. Each voucher only works at the shop it was bought for.",
          ],
        },
        {
          type: "paragraph",
          text: "None of this shows in a demo, and all of it decides whether a shop will trust the product with real money. Until Then, a scheduled message app we built, deals with the same payment problem: the payment provider's notification and the customer's return from checkout run the same function, so whichever arrives first seals the message and the second changes nothing.",
          link: { text: "See how Until Then handles payments and delivery.", href: "/work/until-then" },
        },
        { type: "subheading", text: "What the release can prove" },
        {
          type: "paragraph",
          text: "It can show whether people who don't already shop there will buy a voucher online, and whether shops can take those vouchers without help. Count vouchers bought and vouchers spent, and ask each shop how many buyers it didn't recognise.",
        },
        {
          type: "paragraph",
          text: "A voucher sold but never spent is only half a result: the buyer liked the idea, but the shop never met a new customer. Every call a shop makes to the founder about a code is just as telling. Each one marks a part of the task the software doesn't finish yet.",
        },
        {
          type: "paragraph",
          text: "The cuts have a price as well. With no printed cards, the release can't tell you whether vouchers would sell better at the counter. That's acceptable here, because the counter is the part that already works.",
        },
      ],
    },
    {
      id: "more-examples",
      heading: "MVP examples for a marketplace, an AI tool and a report",
      blocks: [
        {
          type: "paragraph",
          text: "Change the product and the first task changes, but the method holds: one task working end to end, and a written note of what the cuts stop you learning. These three are illustrations too.",
        },
        {
          type: "table",
          caption:
            "Three illustrative MVPs, with the first task each completes, what each leaves out and what each can't tell you yet",
          columns: ["Product idea", "First complete task", "Left out at first", "What it can't tell you yet"],
          rows: [
            [
              "Marketplace for wedding musicians",
              "A couple browses profiles, sends an enquiry with their date, and the musician replies",
              "Deposits and checkout, availability calendars, reviews",
              "Whether couples will pay a deposit through the site",
            ],
            [
              "AI replies to customer reviews",
              "A hotel or restaurant owner pastes in a review, gets a draft reply in their own voice, edits it and copies it",
              "Connecting to review sites and posting automatically",
              "Whether owners would let it post without reading the draft",
            ],
            [
              "Client reports for marketing freelancers",
              "Upload an ad platform's CSV export, check the totals and download a branded report",
              "Live connections to ad platforms, a custom report builder",
              "Whether freelancers would pay more to skip the upload",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "A cut can remove the point of the test, and the marketplace is where that happens most. An enquiry form shows whether couples and musicians make useful contact. If the business only works when the site takes a deposit, keep the deposit and cut something else.",
        },
        {
          type: "paragraph",
          text: "For the AI tool, the step that can't go is the owner's edit. A model will sometimes write a reply that's wrong or strikes the wrong tone, and a reply posted under a hotel's name is hard to take back. Every draft also costs money to generate, so the first release needs a limit on how many each account can make.",
        },
        {
          type: "paragraph",
          text: "Uploading a CSV is a sensible boundary for the reports tool, provided a bad file gets a clear error. A report with quietly wrong totals does more harm than no report at all.",
        },
      ],
    },
    {
      id: "your-own-table",
      heading: "Write your own version of the table",
      blocks: [
        {
          type: "paragraph",
          text: "Borrow the reasoning rather than any example's features. Write down your product's first task, then what's in the first release, what waits and what the release can't tell you yet. That last column is the one most briefs leave out, and the one that stops you reading too much into a quiet first month.",
        },
        {
          type: "paragraph",
          text: "Then check the first release fits. Our free MVP Scope Planner lets you list the features, size each one and see what fits a first release, what to save for later and which of our packages it matches.",
          link: { text: "Try your feature list in the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
        {
          type: "paragraph",
          text: "A developer needs a little more to price the work: the rules behind each step, and a few plain-English checks that say when a step is done.",
          link: {
            text: "Write the rest of the brief with our guide to building a web app.",
            href: "/blog/how-to-build-a-web-app",
          },
        },
        {
          type: "paragraph",
          text: `Our MVP package is a fixed-price, two week sprint at ${mvp.price} + VAT; the Extended MVP adds a week of development for ${extendedMvp.price} + VAT. Each sprint finishes with a week of iteration on your feedback, and a handover week follows once the app is live. Bring the table you wrote to a free 30 minute discovery call and we'll go through it column by column before quoting.`,
          link: { text: "Book a discovery call.", href: "/book-a-call" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is a landing page or a waitlist an MVP?",
      answer:
        "No, though it's a sensible step before one. A landing page shows whether people are interested enough to leave an email address, but with no software behind it, it can't show whether the product does the job. The people who sign up are useful later, as the first users you build for and test with.",
    },
    {
      question: "Is a proof of concept the same as an MVP?",
      answer:
        "No. A proof of concept checks whether something can be built at all, such as whether an AI model gives usable answers on your data. It's usually rough and never put in front of customers. An MVP assumes the technology works and tests whether people use the product. If one part of your idea is technically uncertain, prove that part before building the rest.",
    },
  ],
}
