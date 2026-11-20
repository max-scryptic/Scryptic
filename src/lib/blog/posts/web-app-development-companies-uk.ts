import quotesLeftOut from "@/assets/blog/images/web-app-quotes-what-each-leaves-out.webp"
import whoPaysOverrun from "@/assets/blog/images/who-pays-when-a-build-overruns.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const webAppDevelopmentCompaniesUk: BlogPost = {
  slug: "web-app-development-companies-uk",
  title: "Web app development companies in the UK, compared",
  series: "launch",
  service: "web-app-development",
  topic: "Web app agencies",
  icon: "building",
  description:
    "Seven UK web app development companies compared on base, pricing, timelines and code ownership, plus how to line up their quotes and when to hire by the hour.",
  summary:
    "UK web app development companies differ less in what they build than in how they charge, who writes the code and when it becomes yours. We set seven side by side from what each one publishes: Magora, GoodCore, Scorchsoft, Ronins, Priority Pixels, Box UK and ourselves. Then we show how to line up quotes that are built differently, and when hiring web application developers by the hour beats buying a project.",
  datePublished: "2026-11-20",
  facts: [
    { label: "Companies compared", value: "7" },
    { label: "Based in", value: "London, Surrey, Birmingham, Cardiff, Devon and Brighton" },
    { label: "Published first-release timelines", value: "2 weeks to 6 months" },
    { label: "Figures checked", value: "November 2026" },
  ],
  sections: [
    {
      id: "which-kind",
      heading: "Which kind of web app development company suits your project?",
      blocks: [
        {
          type: "paragraph",
          text: "Start from what the app is for, because companies that build web apps specialise more than their home pages suggest. A booking tool for a clinic, a members' area for a professional body and a SaaS product for paying customers all get called web apps, and each sits best with a different kind of supplier.",
        },
        {
          type: "table",
          caption: "Which kind of web app development company suits each kind of project, with examples from the companies compared below",
          columns: ["Your project", "Kind of company", "Examples below"],
          rows: [
            ["A first release of one workflow, on a fixed budget", "A small studio that fixes the price before the build", "Scryptic, Magora's first-release offer"],
            ["A system staff use every day, replacing spreadsheets or old software", "An agency that maps the process first and supports it for years", "Scorchsoft, Priority Pixels, Magora"],
            ["A membership or content site where logging in is one part of it", "A CMS agency working in Drupal or WordPress", "Box UK"],
            ["A product that needs launch marketing as much as code", "An agency that also runs SEO and paid media", "Ronins, Priority Pixels"],
            ["Extra developers for a product you already run", "A company that hires out developers or a dedicated team", "Magora, GoodCore, Ronins"],
          ],
        },
        {
          type: "paragraph",
          text: "If you're not yet sure the idea needs custom code at all, settle that before contacting anyone. Our free Build or No-Code Quiz asks seven questions about your idea, users and budget and tells you whether no-code is enough or you need real code.",
          link: { text: "Take the Build or No-Code Quiz before you shortlist.", href: "/tools/build-or-no-code" },
        },
        {
          type: "paragraph",
          text: "Building a SaaS product in particular? We've compared a different set of six UK studios on SaaS and MVP work.",
          link: { text: "UK SaaS development companies, compared.", href: "/blog/best-saas-development-company" },
        },
      ],
    },
    {
      id: "compared",
      heading: "UK web app development companies, side by side",
      blocks: [
        {
          type: "paragraph",
          text: "The seven below cover the main ways web app development is sold in the UK: a London software house with published prices, a London firm with offshore developers, a Birmingham team that sells two-week sprints, a small London and Surrey agency, a Devon digital agency, a Cardiff Drupal specialist, and our one-developer studio in Brighton.",
        },
        {
          type: "table",
          caption:
            "Seven UK web app development companies compared by base, what they mainly build, how they charge and the price and timeline each publishes, as of November 2026",
          columns: ["Company", "Base and team", "What it mainly builds", "How it charges", "Published price and timeline"],
          rows: [
            [
              "Scryptic (us)",
              "Brighton, founder-led, one developer",
              "Coded web apps and MVPs in Next.js, TypeScript and Postgres",
              "A fixed price per sprint",
              `${mvp.price} + VAT for a two week sprint, or ${extendedMvp.price} + VAT for three weeks`,
            ],
            [
              "Magora",
              "London (Shoreditch), since 2010, in-house team",
              "Customer portals, internal tools, booking systems and SaaS platforms in React, Node.js, Laravel or Python",
              "A paid discovery that ends in a fixed estimate, or developers by the hour",
              "Discovery from £3,000; first release from £10,000, mostly £10,000 to £25,000 over 6 to 8 weeks; full systems £25,000 to £60,000",
            ],
            [
              "GoodCore",
              "London, since 2005, with developers in offshore offices",
              "Web apps, portals and SaaS in React or Angular, with Node.js, .NET or Laravel",
              "Fixed price for a fixed scope, or time and materials with a dedicated team",
              "Not published",
            ],
            [
              "Scorchsoft",
              "Birmingham, in-house team, 16+ years",
              "Portals, platforms and AI-powered apps, plus React Native mobile apps",
              "Fixed-cost two-week sprints, or a fixed fee when the spec is clear",
              "No build price; it says bespoke builds under £7,500 are rare",
            ],
            [
              "Ronins",
              "London and Surrey, five people at the core plus a network of specialists",
              "Web apps, portals and dashboards in React, Node, Laravel or Python, alongside marketing",
              "Discovery, then a fully costed proposal",
              "Smaller builds often start around £25,000; most projects run 4 to 6 months",
            ],
            [
              "Priority Pixels",
              "Devon, a digital marketing agency with its own development team",
              "Booking systems, quoting tools, dashboards and internal tools for B2B and public sector clients",
              "A discovery call and scoping session, then a written proposal",
              "Not published",
            ],
            [
              "Box UK",
              "Cardiff and London, since 1998",
              "Platforms for membership bodies and enterprises, mainly on Drupal and WordPress",
              "Project builds, plus fixed-fee audits and managed services",
              "No build price; audits at fixed fees from £3,975 to £8,000",
            ],
          ],
        },
        {
          type: "callout",
          title: "Where these figures come from",
          text: "Every figure for another company comes from its own website in November 2026, mostly its web app service page and FAQ. Prices change, and some of these companies word things differently on different pages, so confirm the current offer with each one. We haven't worked with any of them, and the order of the table is not a ranking.",
        },
        { type: "subheading", text: "Four publish a price, and no two mean the same thing" },
        {
          type: "paragraph",
          text: "Magora gives a starting price and a typical band, Ronins a rough starting point, Scorchsoft only a floor, and we give a fixed price per sprint. GoodCore and Priority Pixels quote after discovery, and Box UK publishes fixed fees for its audits but not for builds.",
        },
        {
          type: "paragraph",
          text: "A \"from\" price tells you the smallest job a company takes, not what yours will cost. Magora's own page shows the spread: a first release from £10,000, a full system with several roles, an admin area and integrations at £25,000 to £60,000, and enterprise platforms from £80,000. Send your brief and ask which band it falls in, and what would move it into the next one.",
        },
        { type: "subheading", text: "Fixed price, per sprint or by the hour" },
        {
          type: "paragraph",
          text: "The real difference between these pricing models is who pays when the work takes longer than planned. With one fixed price the company does, with hourly billing you do, and with fixed-cost sprints your exposure is one sprint at a time.",
        },
        {
          type: "image",
          image: whoPaysOverrun,
          alt: "Bars for fixed price, per sprint and hourly billing, each with an overrun marked and who pays for it.",
        },
        {
          type: "paragraph",
          text: "Scorchsoft sells most projects as fixed-cost two-week sprints and says you can decide at the end of each one whether to carry on, change direction or stop. Magora writes its fixed estimate during a two-week discovery and also hires out developers by the hour. GoodCore offers a fixed price for a fixed scope or time and materials, and we price each sprint before it starts.",
        },
        {
          type: "paragraph",
          text: "Sprints suit a product you expect to change once people use it. A single fixed price suits a brief you can write down completely. Hourly billing suits work where you, not the supplier, decide what happens each week.",
        },
        { type: "subheading", text: "Who will write your code" },
        {
          type: "paragraph",
          text: "Ask this early, because these seven answer it very differently. Scorchsoft says its developers are an in-house team in Birmingham and you deal directly with them. GoodCore manages projects from London, with developers in its offshore offices. Ronins has five people at its core and brings in specialists from a wider network when a project needs them. With us, the developer on your first call writes all of it.",
        },
        {
          type: "paragraph",
          text: "Each model has a reason. GoodCore presents its offshore developers as the cost-effective half of its model, and a network gives a small agency skills it doesn't employ. Whichever you choose, find out which people will work on your app and speak to them before you sign.",
        },
        { type: "subheading", text: "First releases take two weeks to six months" },
        {
          type: "paragraph",
          text: "Our sprints are two or three weeks. Magora's first releases take six to eight weeks with two or three developers, Scorchsoft says a focused first release can take weeks and a larger system months, and Ronins puts most of its projects at four to six months.",
        },
        {
          type: "paragraph",
          text: "Most of that spread is in what each company counts as a first release. Ask every one for the screens, user roles and integrations its timeline covers, lay the lists next to each other, and you'll usually find each has pictured a different app.",
        },
        { type: "subheading", text: "When the code becomes yours" },
        {
          type: "paragraph",
          text: "Every company that addresses ownership says the code ends up yours, but not at the same moment. Magora says the repository is yours from the first commit, with the IP transferred on payment. Ronins and Scorchsoft say it's yours once the invoices are paid, and Scorchsoft keeps its own pre-existing tools, licensing you to use them. GoodCore says the intellectual property belongs to you. We didn't find a statement on Box UK's or Priority Pixels' pages, so ask them. Our builds sit in your repository and accounts, handed over at launch.",
        },
        {
          type: "paragraph",
          text: "Ownership on payment is normal. Having the repository in your own account from day one matters if you part ways halfway through, because you keep everything built so far.",
          link: {
            text: "What a UK contract should say about who owns the code.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
        },
        { type: "subheading", text: "Which to shortlist" },
        {
          type: "list",
          items: [
            { term: "Magora", text: "If you want published prices to budget against, and one team for design, testing and support after launch." },
            { term: "GoodCore", text: "If you want a long-established London firm and are comfortable with developers working from offshore offices." },
            { term: "Scorchsoft", text: "If you'd rather pay two weeks at a time with the option to stop, and want an in-house team in the Midlands." },
            { term: "Ronins", text: "If the app needs launch marketing, SEO and conversion work from the same agency." },
            { term: "Priority Pixels", text: "If you're a B2B or public sector organisation and accessibility to WCAG 2.2 AA has to be built in." },
            { term: "Box UK", text: "If what you need is a membership or content platform on Drupal or WordPress, or a review of an ageing system." },
            { term: "Scryptic", text: "If you want one coded web app at a fixed price, built in two or three weeks by the developer you speak to." },
          ],
        },
      ],
    },
    {
      id: "near-you",
      heading: "Do your web app developers need to be near you?",
      blocks: [
        {
          type: "paragraph",
          text: "Rarely for the build, sometimes for discovery. Most web app projects run on video calls and a shared test site, and the companies above say as much: Scorchsoft runs most projects remotely and welcomes nearby clients at its studio, Magora holds workshops at its office or yours, and we demo progress on a video call every Friday.",
        },
        {
          type: "paragraph",
          text: "Being close is worth more when the app replaces work people do away from a desk, on a warehouse floor, a building site or a clinic reception. Watching that work once beats any written description of it. If that's your situation, ask whether the company will come to you for discovery, even if the build itself is remote.",
        },
        {
          type: "paragraph",
          text: "A search for web app developers near you mostly turns up directory listings and agencies with a page for every town. The address on a company's contact page, or its Companies House record, tells you where its people actually work.",
        },
      ],
    },
    {
      id: "for-hire",
      heading: "When does hiring web app developers by the hour make sense?",
      blocks: [
        {
          type: "paragraph",
          text: "When someone on your side can run the product: decide what gets built each week, review the work and make the technical calls. Without that person you're paying for time, and nobody is answerable for the result.",
        },
        {
          type: "paragraph",
          text: "Magora publishes its rates: from £49 an hour for a developer, about £390 a day, and £65 to £70 an hour for a full team with testing and product ownership, on monthly rolling terms. GoodCore's time and materials option and Ronins' dedicated team model work the same way, with developers joining your sprint planning and code reviews. A UK freelancer typically charges £300 to £700 a day.",
        },
        {
          type: "paragraph",
          text: "For a first version with nobody technical in-house, a fixed price for an agreed scope is usually the safer buy, because the overrun is the supplier's problem rather than yours.",
          link: { text: "Web app developers for hire, compared on price and ownership.", href: "/services/web-app-development" },
        },
      ],
    },
    {
      id: "quotes",
      heading: "How do you compare web app quotes that are built differently?",
      blocks: [
        {
          type: "paragraph",
          text: "Line them up by what each one covers, not by the total. Two quotes for the same web app can be thousands of pounds apart because one leaves out discovery, testing or support that the other has priced in.",
        },
        {
          type: "image",
          image: quotesLeftOut,
          alt: "Three quotes for the same web app as rows of blocks, the cheapest leaving out discovery, testing and support.",
        },
        {
          type: "table",
          caption: "The lines that move a web app quote, why each one changes the total and what to ask",
          columns: ["Line on the quote", "Why the total moves", "What to ask"],
          rows: [
            ["Discovery", "Free at some companies, a paid phase at others; Magora's starts from £3,000", "Is it included, and is the build price fixed once it ends?"],
            ["Design", "Some quotes include clickable prototypes tried by your users, others build from your sketches", "Will real users try the screens before any code is written?"],
            ["Testing", "Magora says testing and product ownership come to 30% and 20% of development time, and includes both", "Is testing in this price, and who does it?"],
            ["Integrations", "Every outside system adds work; Magora suggests leaving them to a second phase unless the product can't work without them", "Which integrations does this price include?"],
            ["Support after launch", "Usually a separate monthly bill; Magora's starts from £1,000 a month", "Who fixes bugs found in the first month, and what does support cost after that?"],
            ["Running costs", "Hosting, email and other services are billed by each provider and grow with use", "Which accounts will I pay for, and whose name are they in?"],
          ],
        },
        {
          type: "paragraph",
          text: "Get a baseline of your own before the quotes arrive. Our free MVP Cost Calculator turns eight answers about your app into a ballpark in development weeks and pounds, so a quote far above or below it tells you which question to ask.",
          link: { text: "Get a baseline from the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "paragraph",
          text: "Then send every company the same brief: one kind of user, the journey they complete, the rules that govern it and what you've left for later.",
          link: { text: "Write the brief around the one job your web app does.", href: "/blog/how-to-build-a-web-app" },
        },
      ],
    },
    {
      id: "where-we-fit",
      heading: "Where Scryptic fits on this list",
      blocks: [
        {
          type: "paragraph",
          text: "We're the smallest company here and the narrowest offer: one web app first release, coded in Next.js, TypeScript and Postgres, at the fixed prices in the table, built by the founder you speak to on the first call. That suits a founder or a small business with one workflow to get live.",
          link: { text: "See what each fixed-price sprint includes.", href: "/#pricing" },
        },
        {
          type: "paragraph",
          text: "It doesn't suit a membership platform, a system that needs a team for years, or a project where discovery alone will take a month. If yours is one of those, we'll say so on the discovery call and point you to the kind of company above that fits. We also build the app rather than the marketing site, so if you need both, decide which comes first.",
          link: { text: "Whether to build the website or the app first.", href: "/blog/web-app-or-mobile-app-first#website-or-app-first" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the difference between a web app development company and a web design agency?",
      answer:
        "A web design agency mostly builds websites people read, such as a company site or a shop on a platform. A web app development company builds software people sign in to and work in, with its own database and rules. Some companies do both, like Ronins and Priority Pixels, while others, ourselves included, build the app and leave the marketing site on a builder such as Webflow or Framer.",
    },
    {
      question: "Should a web app development company use AI coding tools?",
      answer:
        "It's common now, and it can make a build quicker and cheaper. Priority Pixels, for example, says AI workflows speed up its delivery, with a developer reviewing every line that ships. Check the same things you would for any code: who reviews it, how it's tested and whether security checks happen before launch rather than after.",
    },
    {
      question: "Can a web app development company take over an app someone else built?",
      answer:
        "Usually, after a review. Scorchsoft offers an assessment that recommends supporting, stabilising, using as a reference or rebuilding an existing app, and we review prototypes from Lovable, Replit or Bubble during discovery. Expect the review before any price, because nobody can quote reliably for code they haven't read.",
    },
  ],
}
