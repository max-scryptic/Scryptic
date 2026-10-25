import providerChecksGates from "@/assets/blog/images/provider-checks-gates.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const bestSaasDevelopmentCompany: BlogPost = {
  slug: "best-saas-development-company",
  title: "Best SaaS development company for your first release",
  series: "launch",
  topic: "SaaS agencies",
  description:
    "Compare UK SaaS development companies on price, timeline and ownership, from Bubble studios to fixed-price MVP sprints, and what to check before you sign.",
  summary:
    "The best SaaS development company is the one that can ship your next usable release for an agreed price and leave you owning the code and the accounts. Below we compare six UK options, including Goodspeed, Augustova, Neptune Digital and ourselves, on what they build, how they charge and how long an MVP takes, then give you seven checks to run before you sign.",
  datePublished: "2026-10-22",
  facts: [
    { label: "Companies compared", value: "6" },
    { label: "Published MVP prices", value: "From about £8,000 to $50,000+" },
    { label: "Published MVP timelines", value: "2 to 12 weeks" },
  ],
  sections: [
    {
      id: "depends-on-stage",
      heading: "Which SaaS development company is best for your stage?",
      blocks: [
        {
          type: "paragraph",
          text: "The right company depends far more on where your product is than on whose portfolio looks best. A founder testing whether people will pay for a workflow needs a different partner from a business replacing software its customers already rely on. Both will type the same search into Google, but they should send very different briefs.",
        },
        {
          type: "table",
          caption: "Which kind of provider suits each product stage, and the main trade-off of each",
          columns: ["Your situation", "Provider to consider", "Main trade-off"],
          rows: [
            ["A focused first SaaS release", "Fixed-scope MVP studio", "Speed depends on keeping the scope narrow"],
            ["A prototype with real users", "A developer who reviews it before rebuilding", "Some existing code may need replacing"],
            ["A mature, business-critical product", "An engineering partner with ongoing capacity", "Continuity matters more than launch speed"],
            ["A permanent product roadmap", "Your own in-house team", "Hiring and managing developers becomes your job"],
            ["Unclear demand or workflow", "Customer research before any build", "You delay the build to cut the risk"],
          ],
        },
        {
          type: "paragraph",
          text: "Hiring a large agency to build a small first release usually means paying for project managers and process you do not need yet. The reverse mistake is just as common: a short MVP sprint will not give an established product the steady engineering time it needs every month.",
        },
        {
          type: "paragraph",
          text: "If you are still working out whether a service or a set of automations should become software at all, read our guide on when to turn automations into a SaaS product first. No development quote can tell you whether the problem is worth solving.",
        },
      ],
    },
    {
      id: "uk-companies-compared",
      heading: "How do UK SaaS development companies compare?",
      blocks: [
        {
          type: "paragraph",
          text: "The UK studios founders most often shortlist differ most on three choices: whether they write code or build on a platform like Bubble or FileMaker, whether they charge a fixed price or bill for time, and what they offer once the app is live. The table sets six of them side by side, using what each company publishes about itself.",
        },
        {
          type: "table",
          caption:
            "Six UK SaaS and MVP development companies compared by base, what they build, how they charge and the MVP price and timeline each publishes, as of October 2026",
          columns: ["Company", "Base and size", "What it mainly builds", "How it charges", "Published MVP price and timeline"],
          rows: [
            [
              "Scryptic (us)",
              "UK, founder-led, one developer",
              "Coded web apps and SaaS MVPs",
              "Fixed price per sprint",
              `${mvp.price} + VAT for 2 weeks, or ${extendedMvp.price} + VAT for 3 weeks`,
            ],
            [
              "Goodspeed",
              "London",
              "Bubble apps by default, plus custom Next.js builds",
              "A scoping sprint first, then the build; most clients move to a monthly retainer",
              "From $5,000, typically $10,000 to $50,000+; 8 to 12 weeks for its main MVP offer",
            ],
            [
              "Augustova",
              "London, small founder-led team",
              "Coded web and mobile apps (Next.js, Supabase, React Native) and AI automation",
              "Fixed price per phase, no day rates",
              "£8,000 to £15,000 + VAT for an app MVP, over 5 to 7 weeks",
            ],
            [
              "Neptune Digital",
              "London and Manchester, founded 2019",
              "Custom business systems and CRMs, mostly on Claris FileMaker",
              "Mostly time on account (you pay for hours spent)",
              "£10,000 to £20,000 for a new FileMaker project, over 8 to 12 weeks",
            ],
            [
              "thoughtbot",
              "Long-established consultancy that works with UK clients, now remote-first",
              "Web and mobile products in Ruby on Rails, React and React Native",
              "Per person, per week",
              "No rate published; its typical \"idea to version 1\" project is 3 people for 8 to 12 weeks",
            ],
            [
              "Studio Graphene",
              "London headquarters, founded 2014, 100+ people",
              "Web, mobile and AI products for startups and larger firms",
              "Not published",
              "Not published",
            ],
          ],
        },
        {
          type: "callout",
          title: "How we put this together",
          text: "Every figure for another company comes from its own website in October 2026, mostly its main service page. Several of these sites quote different prices or timelines on different pages, so treat the numbers as a starting point and confirm the current offer with each company. We have not worked with any of them, and this is not a ranking.",
        },
        { type: "subheading", text: "Goodspeed and Neptune Digital build on someone else's platform" },
        {
          type: "paragraph",
          text: "Goodspeed builds on Bubble by default and Neptune Digital on Claris FileMaker. The other four write conventional code. A platform build can be quick to change in the early weeks, but the app runs on a service you rent, so its pricing, limits and roadmap become part of your business. Moving off later usually means a rebuild, which our Bubble migration guide covers in detail.",
        },
        {
          type: "paragraph",
          text: "FileMaker is mostly licensed per user and built around internal business systems. That suits a CRM for your own staff well. For a SaaS product sold to the public, check how the licensing scales before you commit.",
        },
        { type: "subheading", text: "Fixed price or paying for time" },
        {
          type: "paragraph",
          text: "We and Augustova fix the price before work starts. Neptune Digital mostly bills for hours spent, thoughtbot charges per person per week, and Goodspeed scopes the work in a sprint before quoting the build. With a fixed price, the studio carries the risk of the work taking longer, so the scope has to be tight. With time-based billing you can change direction more freely, but you carry the risk of an overrun.",
        },
        {
          type: "paragraph",
          text: "Neither is better in general. Fixed prices suit a first release with a clear core journey. Paying for time suits a product whose shape is still moving, or ongoing work on something already live.",
        },
        { type: "subheading", text: "Why the timelines run from 2 to 12 weeks" },
        {
          type: "paragraph",
          text: "The gap between a 2 week sprint and a 12 week build comes from how much is in the first release, how many people work on it, and how much discovery happens before the clock starts. Our sprints are short because the scope is settled on discovery calls beforehand and one developer builds one core journey. thoughtbot's typical first version puts three people on a product for up to 12 weeks, which covers far more ground.",
        },
        {
          type: "paragraph",
          text: "So comparing weeks, or price per week, tells you little on its own. Ask each studio what a user will be able to do at the end, and compare that.",
        },
        { type: "subheading", text: "Support after launch is where the offers differ most" },
        {
          type: "paragraph",
          text: "Goodspeed says most of its clients move onto a monthly retainer. Neptune Digital sells support plans from £460 a month, and Augustova offers monthly support at a price agreed at go-live. Our packages end with a handover week of bug fixes and support. If you want one company looking after the product for years, the retainer studios are built for that and we are not.",
        },
        { type: "subheading", text: "Ownership is worth asking about every time" },
        {
          type: "paragraph",
          text: "Augustova, like us, says the accounts and code sit in your name. For any other company, ask directly and check the contract. On a Bubble or FileMaker build, remember what ownership means: your own account on the platform, rather than code you can take to any host.",
        },
        { type: "subheading", text: "Which company should you shortlist?" },
        {
          type: "list",
          items: [
            {
              term: "Goodspeed",
              text: "If you are happy on Bubble and want a team to keep building after launch on a retainer.",
            },
            {
              term: "Augustova",
              text: "If you want a coded product in fixed-price phases and expect to need a mobile app too.",
            },
            {
              term: "Neptune Digital",
              text: "If what you need is an internal CRM or operations system, especially one already on FileMaker.",
            },
            {
              term: "thoughtbot or Studio Graphene",
              text: "If you have a bigger budget and want a multi-person team with an established process.",
            },
            {
              term: "Scryptic",
              text: "If you want one coded web app or SaaS MVP, at a fixed price, in two or three weeks, with everything in your name.",
            },
          ],
        },
      ],
    },
    {
      id: "define-the-release",
      heading: "What should you define before comparing quotes?",
      blocks: [
        {
          type: "paragraph",
          text: "Define the release as one complete user journey before you ask anyone for a price. \"A booking SaaS with payments and a dashboard\" is too loose to compare: one studio will price a simple booking flow, another will quietly assume calendar sync, refunds, staff permissions and reporting.",
        },
        {
          type: "paragraph",
          text: "Say you are building software for training providers to manage course bookings. A sensible first release lets an organiser publish a course, lets a customer book and pay, and shows the organiser who is coming. The marketplace, referral scheme and custom reports can wait unless the booking cannot happen without them.",
        },
        {
          type: "paragraph",
          text: "Write down what happens when things go wrong, too: a card payment fails, a course sells out, someone cancels the day before. Those three answers tell a developer more about the size of the job than another page of dashboard ideas.",
        },
        {
          type: "paragraph",
          text: "Then send every provider the same short brief:",
        },
        {
          type: "list",
          items: [
            { term: "User", text: "Who will use it and what they need to get done." },
            { term: "Core journey", text: "Every step from starting the task to finishing it." },
            { term: "Launch essentials", text: "The features without which that journey breaks." },
            { term: "Existing assets", text: "Any code, prototypes, data, designs and accounts you already have." },
            { term: "Constraints", text: "Budget, deadline, integrations and any sensitive data." },
            { term: "Exclusions", text: "What you have deliberately left for later." },
          ],
        },
        {
          type: "paragraph",
          text: "Ask each provider to list the assumptions they made. When one quote comes in far below the others, check what it leaves out before you call it better value.",
        },
      ],
    },
    {
      id: "checks",
      heading: "How do you check a SaaS development company before signing?",
      blocks: [
        {
          type: "paragraph",
          text: "Put every shortlisted provider through the same seven checks, following the product from scope through delivery to handover. You do not need to be technical to ask any of them.",
        },
        {
          type: "image",
          image: providerChecksGates,
          alt: "Three gates labelled scope, delivery and ownership stand on the path to a finished product.",
        },
        { type: "subheading", text: "1. Ask them to walk you through comparable work" },
        {
          type: "paragraph",
          text: "Ask the provider to talk you through a project like yours and say exactly what their team built. What was hard? What did they leave out on purpose? How did they test it? Polished screenshots show design skill, but they tell you nothing about whether permissions, billing or failed requests were handled properly.",
        },
        {
          type: "paragraph",
          text: "The example does not have to come from your industry. A clear account of a similar workflow is worth more than a familiar-looking homepage. If client confidentiality rules out a demo, ask what they can show you instead.",
        },
        { type: "subheading", text: "2. Agree what \"finished\" means" },
        {
          type: "paragraph",
          text: "Write acceptance checks you can test yourself. \"Membership works\" is vague. \"A paid member can sign in and see their organisation's records, and cannot see anyone else's\" is something you can try on launch day.",
        },
        {
          type: "paragraph",
          text: "For each essential journey, agree how it will be tested and who signs it off. Include the awkward cases: bad input, an expired session, a double click on the pay button, a declined card. A two page list like this is plenty; you do not need a full specification.",
        },
        { type: "subheading", text: "3. Get the existing product reviewed before agreeing to a rebuild" },
        {
          type: "paragraph",
          text: "If you already have an app, ask what can be kept. Sometimes a rebuild is the right call, but it should come out of an assessment, not the first sales meeting.",
        },
        {
          type: "paragraph",
          text: "How much survives depends on how the app was made. Code from AI builders such as Lovable, Bolt.new, v0 or Replit can often be hardened rather than replaced. Bubble, Adalo and Glide apps have no code to take away, so they are rebuilt with the data and users brought across. We make that call during discovery, before quoting.",
        },
        {
          type: "paragraph",
          text: "Whoever you hire, ask how user accounts, stored data and live workflows will move across and how they will check nothing was lost. A new interface is no help if your existing users cannot get to their information.",
        },
        { type: "subheading", text: "4. Find out who decides when the scope changes" },
        {
          type: "paragraph",
          text: "You will want changes once you can click around the real thing, so ask how they are handled before you sign. If you ask for something new halfway through, can it replace a lower priority item? Does it need a new agreement? Who decides?",
        },
        {
          type: "paragraph",
          text: "Our Friday video calls are where we review what shipped and agree the next priorities, and each package includes a week of changes based on your feedback. New features still have to fit inside the scope we agreed, or replace something in it.",
        },
        { type: "subheading", text: "5. Check ownership before you pay a deposit" },
        {
          type: "paragraph",
          text: "Owning your product means more than being sent a zip of source code. Read the ownership clause in the contract and ask whose name the code repository, hosting, database and payment accounts will be in.",
        },
        {
          type: "paragraph",
          text: "With us, all four are in your name and handed over at launch. It matters the day you hire your first developer or switch supplier.",
        },
        {
          type: "paragraph",
          text: "A useful test for any provider: ask what a new developer would need to run and deploy the app without them. If the honest answer involves the original supplier, find out before signing.",
        },
        { type: "subheading", text: "6. Separate the build price from the running costs" },
        {
          type: "paragraph",
          text: "A fixed build price is not the cost of owning the software. Hosting, the database, email sending and payment processing are usually billed separately by each service, and most grow with usage.",
        },
        {
          type: "paragraph",
          text: "Ask which outside services the release needs, who pays each bill and how the bills change as you grow. Treat any estimate of future usage costs as a guess, not a budget.",
        },
        {
          type: "paragraph",
          text: "Agree what happens after launch as well: who makes changes, applies security updates and gives technical help once the build is finished, whether that is a retainer, a freelancer or your own hire.",
        },
        { type: "subheading", text: "7. Ask what they need from you" },
        {
          type: "paragraph",
          text: "Someone on your side has to answer product questions, hand over account access and test each build. Ask when the provider will need you and what happens to the date if you reply late. A provider who spells this out is planning properly; one who promises a date without asking anything of you is guessing.",
        },
      ],
    },
    {
      id: "decision",
      heading: "How should you make the final decision?",
      blocks: [
        {
          type: "paragraph",
          text: "Pick the provider that can describe the smallest complete release worth launching, explain how it will be tested, and leave you free to change supplier afterwards. Price and portfolio come after those three.",
        },
        {
          type: "paragraph",
          text: "If your release fits a focused MVP sprint, send us the brief you wrote for the quotes. On a discovery call we will tell you which of our two packages it fits, or that it fits neither.",
        },
        {
          type: "paragraph",
          text: "If you need ongoing engineering capacity, or you are still not sure what the first release is, sort that out first. We would rather tell you it is too early on the call than sell you a sprint for the wrong build.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How much does a SaaS development company charge in the UK?",
      answer:
        `Among the UK companies we compared, published MVP prices run from about £8,000 at the low end to $50,000 or more, and larger consultancies such as thoughtbot and Studio Graphene do not publish rates. Ours are fixed: ${mvp.price} plus VAT for the two week MVP sprint, or ${extendedMvp.price} plus VAT for the three week Extended MVP.`,
    },
    {
      question: "How long does it take to build a SaaS MVP?",
      answer:
        "Published timelines run from two weeks to about twelve. The difference comes from how much the first release includes and how many people build it, so compare what a user can do at the end rather than the number of weeks.",
    },
    {
      question: "Should I use a no-code agency or a coded build for my SaaS?",
      answer:
        "A no-code agency building on Bubble can be quick to change early on, but the product runs on a platform you rent and moving off it later usually means a rebuild. A coded build need not cost more for a focused first release, and it gives you code you can host anywhere and hand to any developer.",
    },
    {
      question: "Do I own the code when a development company builds my SaaS?",
      answer:
        "Only if the contract says so, so read the ownership clause and ask whose name the repository, hosting, database and payment accounts will be in. With Scryptic, the code is in your repository and every account is in your name, handed over at launch.",
    },
  ],
}
