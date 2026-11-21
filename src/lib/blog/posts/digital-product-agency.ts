import discoveryOutputs from "@/assets/blog/images/discovery-outputs-in-a-folder.webp"
import whoDecides from "@/assets/blog/images/product-agency-vs-build-studio-who-decides.webp"
import type { BlogPost } from "@/lib/blog/types"
import { mvp } from "@/lib/services"

export const digitalProductAgency: BlogPost = {
  slug: "digital-product-agency",
  title: "What a digital product agency does, and when you need one",
  series: "launch",
  topic: "Product agencies",
  icon: "users",
  description:
    "What a digital product agency sells, from discovery and research to design and iteration, what discovery costs, and when a build studio is the better buy.",
  summary:
    "A digital product agency decides what a piece of software should be as well as building it: it researches the problem with your users, designs and tests the product, builds it and keeps improving it after launch. That judgement is what you pay extra for. If you already know who the app serves and the one job it does, a build studio that starts from your scope is usually quicker and cheaper.",
  datePublished: "2026-11-21",
  facts: [
    { label: "What they sell", value: "Discovery, research, design, build and iteration" },
    { label: "Usually starts with", value: "A paid discovery phase" },
    { label: "Skip it when", value: "You already know the one job the app does" },
  ],
  sections: [
    {
      id: "what-they-do",
      heading: "What does a digital product agency do?",
      blocks: [
        {
          type: "paragraph",
          text: "It turns a problem into a working product and stays answerable for whether it's the right product. A development company builds what you specify. A digital product agency starts a step earlier, by asking whether that specification is worth building, and carries on a step later, by watching how people use the release and deciding what changes next.",
        },
        {
          type: "paragraph",
          text: "Most sell the same five things, usually as one engagement:",
        },
        {
          type: "list",
          items: [
            {
              term: "Discovery",
              text: "A short, paid phase that turns a goal into a scope: who the first users are, what they need to get done and what the first release leaves out.",
            },
            {
              term: "Research",
              text: "Interviews with the people who have the problem, and sessions where they try early screens. This is the part a team that only takes a brief doesn't do.",
            },
            {
              term: "Product design",
              text: "The flows and screens, tested as a clickable prototype before any code is written, often with a small design system so later screens match the first ones.",
            },
            {
              term: "Build",
              text: "Developers turning the tested design into the product in short sprints, with a product manager deciding what each sprint includes.",
            },
            {
              term: "Iteration",
              text: "Analytics on how the product is used after launch, and a steady run of releases based on what they show. For many agencies this retained phase is the longest part of the relationship.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The name causes some confusion. A digital agency on its own usually means marketing: campaigns, social media and websites. A web design agency builds sites people read. A digital product agency builds software people sign in to and use, which puts it much closer to a web app development company.",
          link: {
            text: "How a web app development company differs from a web design agency.",
            href: "/blog/web-app-development-companies-uk",
          },
        },
      ],
    },
    {
      id: "agency-or-studio",
      heading: "How is a product agency different from a build studio?",
      blocks: [
        {
          type: "paragraph",
          text: "The difference is who decides what gets built. A product agency owns that decision and researches its way to it. A build studio takes a scope you've settled and argues with it, but the decision stays with you, so you're expected to arrive knowing who the app is for.",
        },
        {
          type: "image",
          image: whoDecides,
          alt: "Five stages from problem to iteration: a product agency spans all five, a build studio picks up from design.",
        },
        {
          type: "table",
          caption: "How a digital product agency and a build studio differ, from the first meeting to after launch",
          columns: ["Compared on", "Digital product agency", "Build studio"],
          rows: [
            [
              "The first meeting starts from",
              "A goal, such as cutting the time a claim takes to process",
              "A first release, such as one kind of user completing one journey",
            ],
            ["Who settles the scope", "The agency, after research with your users", "You, with the studio pushing back on what can wait"],
            ["Who you work with", "A product manager, researchers, designers and developers", "Developers who also design, sometimes one person throughout"],
            ["What the fee buys", "Judgement about the product, plus the build", "The build"],
            ["How it usually ends", "It often doesn't: a retained team keeps shipping releases", "At launch, after a short handover"],
            ["The risk you carry", "Paying for research that confirms what you already knew", "Building the wrong thing well"],
          ],
        },
        {
          type: "paragraph",
          text: "Neither is a smaller version of the other. A three person studio can run excellent research, and a large agency can be a build shop with a product strategy page on its website. Judge them by what they propose to do in the first fortnight, not by headcount.",
        },
      ],
    },
    {
      id: "discovery",
      heading: "What happens in a discovery phase?",
      blocks: [
        {
          type: "paragraph",
          text: "The agency works out what the first release should be and checks it with your users before anyone writes production code. A good discovery runs roughly in this order:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Talk to you and anyone else with a say, and write down the goal and how you'll know the product worked.",
            "Interview the people who have the problem. Not to ask whether they'd use an app, but to hear how they cope with it today, which workarounds they've tried and what the problem costs them.",
            "Map the job as it's done now, including the spreadsheet, the email chain and the step someone does from memory.",
            "Design the core flow as a clickable prototype and watch some of those same people try it.",
            "Cut the scope to what the first release needs, list what waits and why, and price the build.",
          ],
        },
        {
          type: "paragraph",
          text: "Steps two and four cost the most, and they're the ones a founder can partly do alone. If you've already spoken to the people with the problem, bring your notes. A good agency will shorten its discovery rather than repeat your interviews, and one that insists on starting from nothing is pricing its process, not your product.",
          link: {
            text: "How to find the people with the problem before week one of an MVP.",
            href: "/blog/how-to-build-an-mvp",
          },
        },
      ],
    },
    {
      id: "discovery-output",
      heading: "What should a discovery phase produce?",
      blocks: [
        {
          type: "paragraph",
          text: "Enough for any competent developer to price the build, not only the agency that ran it. Apply that test before you pay: if the outputs only make sense to the team that wrote them, the discovery was part of a sales process.",
        },
        {
          type: "image",
          image: discoveryOutputs,
          alt: "A folder of discovery outputs: who it's for, the one journey, a tested prototype, what waits and a build price.",
        },
        {
          type: "checklist",
          items: [
            "A description of the first users and their problem, in their words rather than the agency's",
            "The one journey the first release supports, step by step, including what happens when it goes wrong",
            "A clickable prototype, with notes on what changed after real users tried it",
            "What the first release leaves out, with a reason for each",
            "The unknowns that could move the price, such as whether another system's API allows what you need, and how each will be settled",
            "A build price or a tight range, with the assumptions behind it written down",
            "A recommendation not to build, if that's what the research found",
          ],
        },
        {
          type: "paragraph",
          text: "Ask for the working files as well as the findings: the prototype in a design account your business owns, and the interview notes, plus recordings where people agreed to be recorded. A slide deck of conclusions is fine for investors and of little use to whoever builds the product.",
        },
      ],
    },
    {
      id: "discovery-cost",
      heading: "What does a discovery phase cost?",
      blocks: [
        {
          type: "paragraph",
          text: "Anything from nothing to a phase priced in its own right, and the free ones are rarely research. Magora, one of the UK web app companies we compared, publishes discovery from £3,000. Others fold discovery into the sales process at no charge, which usually means a few calls and a proposal rather than sessions with your users.",
        },
        {
          type: "paragraph",
          text: "The figure matters less than the answers to four questions:",
        },
        {
          type: "list",
          items: [
            "Is the discovery fee credited against the build if you go ahead?",
            "Is the build price fixed once discovery ends, or does discovery only produce another estimate?",
            "Can you take the outputs to a different developer without paying again?",
            "Who from discovery stays on for the build? Research that lives in the head of someone who leaves after week three is research you'll pay for twice.",
          ],
        },
        {
          type: "paragraph",
          text: "Before paying for discovery, run a rough version yourself. Our free MVP Scope Planner lets you list your features, size them and see what fits a one week build and what can wait.",
          link: { text: "Plan what fits the first build with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
        {
          type: "paragraph",
          text: "Then put what's left into the MVP Cost Calculator, which turns eight quick questions into a ballpark price and timeline. If an agency's estimate after discovery is several times that figure, ask what the research found that the calculator couldn't know.",
          link: { text: "Get a ballpark from the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
      ],
    },
    {
      id: "when-you-dont-need-one",
      heading: "When is a product agency more than you need?",
      blocks: [
        {
          type: "paragraph",
          text: "When the question it's paid to answer is already settled. You don't need a team to research what to build if any of these is true:",
        },
        {
          type: "list",
          items: [
            "You've spoken to the people with the problem and can say, in one sentence, the job the first release does for them.",
            "You're replacing something that already works, such as a spreadsheet, an Access database or a no-code app. The current tool is the specification, and the work is moving it to code without losing a record.",
            "People already use a prototype you made in Lovable, Bolt or Replit. What they do in it is better evidence than interviews about an app that doesn't exist.",
            "You have a technical co-founder, and what's missing is design rather than product strategy. A designer, freelance or from a design studio, is a much smaller buy.",
          ],
        },
        {
          type: "paragraph",
          text: "In each case a build studio gets you to a release sooner, or, for an existing tool, a migration that carries the data and users across.",
          link: { text: "How we move no-code and spreadsheet apps to production code.", href: "/services/no-code-migration" },
        },
        {
          type: "paragraph",
          text: "If you're not yet sure the idea needs custom software at all, settle that before paying anyone. The Build or No-Code Quiz asks seven questions about your idea, users and budget and tells you whether no-code will do or you need real code.",
          link: { text: "Check whether your idea needs code with the Build or No-Code Quiz.", href: "/tools/build-or-no-code" },
        },
        { type: "subheading", text: "When an agency earns its fee" },
        {
          type: "list",
          items: [
            "Several kinds of user with competing needs, such as patients, clinicians and practice managers, where the hard part is deciding whose problem comes first.",
            "Users you can't reach yourself, inside a large organisation or a regulated sector.",
            "A product that will need a product manager and designers every month after launch, not just at the start.",
            "A board or an investor who wants the case for the product made with research before the build budget is released.",
          ],
        },
      ],
    },
    {
      id: "is-the-research-real",
      heading: "How can you tell whether an agency's research is real?",
      blocks: [
        {
          type: "paragraph",
          text: "Ask for evidence that research has changed a decision. An agency whose discovery always confirms the brief it was given is selling a ritual that comes before the build.",
        },
        {
          type: "list",
          items: [
            "Ask to see the output of a past discovery, with the client's details removed, rather than the finished app.",
            "Ask what a past round of user testing made them drop or change. A specific answer, such as a feature cut because the people testing it never opened it, is a good sign.",
            "Ask how they'd measure your first release: which action counts as success, and how they'd see it happening in the product.",
            "Ask whether they've ever advised a client not to build. Good agencies have, and can tell you why.",
          ],
        },
        {
          type: "paragraph",
          text: "Those checks are specific to product agencies. For the ones every supplier should pass, from live apps you can try to a contract that assigns the code to you, and for what UK suppliers charge, use our buyer's checklist.",
          link: {
            text: "A buyer's checklist for choosing an app development company in the UK.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
        },
      ],
    },
    {
      id: "where-scryptic-fits",
      heading: "Where does Scryptic fit?",
      blocks: [
        {
          type: "paragraph",
          text: `We're a build studio, not a product agency. We don't sell a research phase: the scope is settled on free discovery calls, then the founder you spoke to designs and builds one core journey in a fixed-price sprint, from ${mvp.price} plus VAT, with a demo every Friday and a week of handover after launch.`,
        },
        {
          type: "paragraph",
          text: "That works when you arrive knowing who the app is for. If you don't, hiring an agency for discovery alone and taking its outputs to a build studio is a sensible split, and the list of discovery outputs above is how you make sure they travel. We'll price a build from another team's discovery as readily as from our own calls.",
          link: { text: "Compare our two fixed-price packages.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between a digital product agency and a venture studio?",
      answer:
        "A digital product agency is paid by a client to design and build the client's product. A venture studio starts companies of its own, often with a founder it recruits, and takes a large share of the equity for building the product. If someone offers to build your product in exchange for equity, you're dealing with something closer to a venture studio, and the terms deserve a solicitor's reading.",
    },
    {
      question: "What is a product design agency?",
      answer:
        "An agency that does the research and design but not the build. It hands over tested designs and a prototype for your own developers, or a separate studio, to build from. It suits a team that has developers but nobody who designs.",
    },
    {
      question: "How long does a digital product agency engagement last?",
      answer:
        "Discovery usually takes weeks, a first release a few months, and the iteration after it lasts as long as you keep paying. Ask for discovery and the first release as separate phases with their own prices, so you can stop or change supplier at the end of either.",
    },
  ],
}
