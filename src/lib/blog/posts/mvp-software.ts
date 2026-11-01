import manualStepBehindScreen from "@/assets/blog/images/manual-step-behind-screen.webp"
import onlyMvpReachesRealUse from "@/assets/blog/images/only-mvp-reaches-real-use.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const mvpSoftware: BlogPost = {
  slug: "what-is-mvp-software",
  title: "What MVP software is, and how to tell you have one",
  series: "launch",
  topic: "MVP meaning",
  icon: "book-open",
  description:
    "MVP software is the first release people can use to finish one job without you. How it differs from a prototype, the main types, and five checks to run.",
  summary:
    "MVP software is the first version of a product that real people can use to finish one job on their own, while you measure whether they do. It's minimum in what it covers and viable in how well it covers it, and that's what separates it from a prototype, a proof of concept or a landing page. Five checks tell you whether what you've built is one.",
  datePublished: "2026-11-01",
  facts: [
    { label: "MVP stands for", value: "Minimum viable product" },
    { label: "Made popular by", value: "Eric Ries, The Lean Startup (2011)" },
    { label: "Worked example", value: "Short-notice cover for dental practices" },
    { label: "Quickest test", value: "Can a stranger finish the job without you?" },
  ],
  sections: [
    {
      id: "meaning",
      heading: "What does MVP mean in software?",
      blocks: [
        {
          type: "paragraph",
          text: "MVP stands for minimum viable product. In software, it's the first release that real users rely on for real work, put out to find out whether they'll keep relying on it. Eric Ries made the term common in The Lean Startup, where the idea was to learn as much as possible for the least effort. Since then it has been stretched to cover anything from a clickable mock-up to a polished version one, so it's worth pinning down.",
        },
        {
          type: "paragraph",
          text: "Each word sets a limit, and minimum viable product software has to meet all three. Minimum is about scope: one kind of user and one job, start to finish. Viable is about standard: it works when you're not in the room, keeps its data and copes with the most common way the job goes wrong. Product is about the test: someone could choose it over what they do today, and you can see whether they do.",
        },
        {
          type: "paragraph",
          text: "So MVP development means building that release and the means to measure it, and nothing more. The scope is small. The standard is the same as for any software people depend on.",
        },
        {
          type: "paragraph",
          text: "The example in this guide is a service that finds cover for dental practices when a hygienist calls in sick. The practice manager needs a qualified hygienist by tomorrow morning, and locum hygienists want shifts close to home. The one job is getting a shift filled.",
        },
      ],
    },
    {
      id: "prototype",
      heading: "What separates MVP software from a prototype?",
      blocks: [
        {
          type: "paragraph",
          text: "Who uses it, and what it can prove. People click through a prototype while you watch; they use MVP software on a working day, when a mistake has consequences. A proof of concept and a landing page differ from an MVP in the same way: each answers an earlier, narrower question.",
        },
        {
          type: "image",
          image: onlyMvpReachesRealUse,
          alt: "A prototype, a proof of concept and a landing page all stop short of real use; only the MVP reaches it.",
        },
        {
          type: "table",
          caption:
            "A prototype, a proof of concept, a landing page and an MVP compared by the question each answers, who uses it and what carries into the product",
          columns: ["What you build", "The question it answers", "Who uses it", "What carries into the product"],
          rows: [
            [
              "Clickable prototype",
              "Do people understand the steps?",
              "A few testers, while you watch",
              "The screen designs and where testers got stuck",
            ],
            ["Proof of concept", "Can the hard part be built at all?", "You and a developer", "The answer, and rarely the code"],
            [
              "Landing page or waitlist",
              "Do people want it enough to leave an email?",
              "Visitors from a post or an ad",
              "A list of people to launch to",
            ],
            ["MVP", "Will people use it for the job, without you?", "Real users, on their own", "The code, the data and the users"],
          ],
        },
        {
          type: "paragraph",
          text: "For the dental cover service, a prototype would show whether a practice manager can post a shift without help. A proof of concept isn't needed, because nothing in the job is technically uncertain. A landing page would collect practices that like the idea. Only the MVP shows whether a practice that needs cover tomorrow trusts the service to find it.",
        },
        {
          type: "paragraph",
          text: "The first three are optional steps, in any order. Take the one that answers the riskiest question you still have, and skip the rest. Our gift voucher example follows the MVP stage itself through one first release, including what it leaves out on purpose.",
          link: { text: "Read the gift voucher MVP example.", href: "/blog/mvp-software-development-example" },
        },
      ],
    },
    {
      id: "types",
      heading: "Does an MVP have to be fully built?",
      blocks: [
        {
          type: "paragraph",
          text: "No. Some of the most useful MVPs have a person doing the hardest step behind the screen. The common types differ in how much of the job runs on code, and choosing between them is a decision about cost and speed.",
        },
        {
          type: "image",
          image: manualStepBehindScreen,
          alt: "On screen a posted shift turns to Filled, while behind the screen the step in between is done by hand.",
        },
        {
          type: "list",
          items: [
            {
              term: "Concierge",
              text: "You do the job yourself for a handful of customers, with no software. The founder rings locum hygienists and confirms by text. It shows whether practices want the service, and it comes before MVP software rather than being one.",
            },
            {
              term: "Wizard of Oz",
              text: "The practice posts a shift in a real web app and is told when it's filled. Behind the screen, the founder picks which hygienists get the offer. To the practice it's software; the matching is still a person.",
            },
            {
              term: "Single feature",
              text: "Posting, matching and accepting a shift all run on code. Invoicing, ratings and repeat bookings stay manual or wait.",
            },
            {
              term: "Piecemeal",
              text: "Stitched together from existing tools: a form, a spreadsheet, a payment link and text messages. Quick to set up, and fragile once more than a few practices rely on it.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The Wizard of Oz and single feature versions are MVP software. The concierge and piecemeal versions usually come first and get replaced. Which steps stay manual is a scoping decision made before the build, and our week by week guide covers making it.",
          link: { text: "How to build an MVP, week by week.", href: "/blog/how-to-build-an-mvp" },
        },
      ],
    },
    {
      id: "mlp-mmp",
      heading: "How is an MVP different from an MLP or an MMP?",
      blocks: [
        {
          type: "paragraph",
          text: "In how high each one sets the bar. A minimum lovable product (MLP) asks for a first release people enjoy using, not one that merely works. A minimum marketable product (MMP) is the first version you'd sell to the whole market, and it usually follows an MVP that showed what that market wants.",
        },
        {
          type: "paragraph",
          text: "Both labels grew out of MVPs released too rough to learn from. If people abandon a clumsy product, you can't tell whether they turned down the idea or the clumsiness. The cure is already in the name: take viable seriously for the one job, and save marketable for when you know which job to sell.",
        },
        { type: "subheading", text: "In a startup and in an established business" },
        {
          type: "paragraph",
          text: "In a startup, the MVP tests whether there's a business at all. Early users know they're trying something young and will put up with missing extras. An established business testing a new product has customers who expect its usual standard, so its MVP is smaller in scope but not rougher: fewer features, each finished to the same level as everything else it sells.",
        },
      ],
    },
    {
      id: "checks",
      heading: "How can you tell whether you've built an MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "Put what you've built through these five checks. Fail one and you still have something worth having, such as a prototype or a manual service, but not an MVP yet.",
        },
        {
          type: "checklist",
          items: [
            "A new user can finish the job without talking to you first.",
            "What they did is still there tomorrow, and no other user can see it.",
            "The most common way the job goes wrong has an answer in the product.",
            "You wrote down beforehand which result means it's working, and the product records it.",
            "The next version can be built on top of it rather than started again.",
          ],
        },
        {
          type: "paragraph",
          text: "Run them on the Wizard of Oz version of the dental service. The founder matching shifts by hand passes the first check, because the practice manager never has to speak to them; it would fail if the manager had to ring to confirm. A hygienist dropping out the evening before is the common failure, so the shift goes back out to other hygienists and the practice is told. And working is defined before launch as the share of shifts filled before they start, which the app counts from day one.",
        },
        {
          type: "paragraph",
          text: "The second check is the one apps built quickly with AI tools most often fail: screens that work in a demo, on data any signed-in user can read. Our production audit walks through it and the other gaps those apps tend to have.",
          link: { text: "Audit an AI-built app before real users arrive.", href: "/blog/vibe-coding-to-production" },
        },
      ],
    },
    {
      id: "next-step",
      heading: "Is an MVP the right next step for your idea?",
      blocks: [
        {
          type: "paragraph",
          text: "Only when the riskiest thing left to learn is whether people will use it. If you can't yet name people who have the problem, find them first. If one part might not be buildable, prove that part. If a no-code tool would do the job, it may be the cheaper place to start, and our free Build or No-Code Quiz asks seven questions about your idea, users and budget to tell you whether no-code is enough or you need real code.",
          link: { text: "Take the Build or No-Code Quiz.", href: "/tools/build-or-no-code" },
        },
        {
          type: "paragraph",
          text: "Once it is time for MVP software, the hard part is cutting down to one job. Our free MVP Scope Planner lets you list the features you want, size each one and see what fits a first release and what to save for later.",
          link: { text: "Cut your feature list with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
        {
          type: "paragraph",
          text: `We build MVP software as production code at a fixed price: ${mvp.price} + VAT for a two week sprint or ${extendedMvp.price} + VAT for three, with a handover week after launch and the code and accounts in your name.`,
          link: { text: "See what each MVP package includes.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is a beta the same as an MVP?",
      answer:
        "No, though an MVP is often released as one. Beta describes a stage: the product is open to a limited group while problems are found and fixed. MVP describes a scope: one job, done properly. A full product can go through a beta without ever having been an MVP.",
    },
    {
      question: "Can an MVP be a mobile app?",
      answer:
        "Yes, but most don't need to be. A web app reaches people from a link, with no app store review, so it's quicker to change while you're still learning. Build an installed app first when the job depends on the phone itself, such as background location or the camera.",
    },
  ],
}
