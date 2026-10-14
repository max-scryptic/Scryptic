import type { BlogPost } from "@/lib/blog/types"

export const chooseAppDevelopmentCompany: BlogPost = {
  slug: "how-to-choose-an-app-development-company-uk",
  title: "A buyer's checklist for choosing an app development company in the UK",
  series: "launch",
  topic: "Hiring",
  description:
    "Choosing an app development company in the UK: the questions to ask, what good answers sound like, the red flags, and freelancer vs studio vs agency.",
  summary:
    "Choose an app development company by what you can check, not by the size of the quote: live apps you can use, a named person writing your code, and a contract that assigns the code and every account to you. Ask the questions below, listen for the answers, and walk away if several red flags turn up together.",
  datePublished: "2026-10-14",
  sections: [
    {
      id: "before-you-start",
      heading: "Most bad app projects are decided before any code is written",
      blocks: [
        {
          type: "paragraph",
          text: "Here's the uncomfortable part: by the time an app project goes wrong, the cause is usually months old. It was the supplier picked on price, the portfolio of screenshots nobody downloaded, the contract that licensed the code instead of assigning it. None of it was hidden. It just wasn't checked.",
        },
        {
          type: "paragraph",
          text: "So this is a checklist for the checking. Decide what kind of supplier you need, ask the questions with answers you can verify, watch for the red flags, and get ownership in writing. A low quote matters much less than any of those.",
        },
      ],
    },
    {
      id: "supplier-types",
      heading: "Freelancer, studio, agency or in-house",
      blocks: [
        {
          type: "paragraph",
          text: "Pick the kind of supplier before you pick the supplier. The choice comes down to how big the job is, how much of the non-coding work you'll do yourself, and whether you need developers for months or for years. The same four routes apply to a mobile app as to a web app.",
        },
        {
          type: "list",
          items: [
            {
              term: "Freelancer",
              text: "Cheapest, and you talk to the person writing the code. Great value if you'll write the scope, manage the work and handle testing yourself. If they fall ill or take a bigger contract, your project stops.",
            },
            {
              term: "Small studio",
              text: "A few people covering design, build and launch, often with the founders writing code. More continuity than a freelancer, less overhead than an agency, but limited capacity, so you may wait for a slot.",
            },
            {
              term: "Agency",
              text: "Project managers, designers, testers and a set process. Worth it for large or regulated builds, or when procurement needs a big supplier. Higher cost, slower decisions, and developers you may never meet.",
            },
            {
              term: "In-house hire",
              text: "Most control, and the knowledge stays with you. Slowest to start, and one hire won't cover every skill an app needs. We'd only go this way once the product is proven and needs work every week.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "A quick test: list the jobs that aren't coding, such as writing the scope, designing screens, testing on real phones, setting up hosting and submitting to the app stores. If you're happy to do those, a good freelancer is excellent value. If you'd rather spend that time with customers, pay a team that covers them.",
        },
      ],
    },
    {
      id: "questions-and-answers",
      heading: "Questions to ask, and what a good answer sounds like",
      blocks: [
        {
          type: "paragraph",
          text: "Ask questions with answers you can check, and listen for specifics. A good supplier answers all of these in one call without needing to get back to you.",
        },
        {
          type: "table",
          caption: "Questions to ask an app development company, with a good answer and a worrying one for each",
          columns: ["Question", "A good answer sounds like", "Worry if you hear"],
          rows: [
            ["Can I use apps you've built that are live today?", "Here are two in the stores, and one web app you can sign up to.", "Mostly mock-ups, or apps that have since been taken down."],
            ["Which parts of those did you build?", "We did design and build; the client's team ran marketing.", "We were part of a wider team, and no detail."],
            ["Who will write my code?", "Names, and those people are on this call.", "Our developers, with no names, or a team you never meet."],
            ["Is any of the work subcontracted?", "A clear yes or no, and where.", "A pause, then a change of subject."],
            ["Whose name are the accounts in?", "Yours from day one; we're invited as users.", "We set it all up and hand it over at the end."],
            ["Does the contract assign the IP to me?", "Yes, on payment of each stage, with any reused code licensed to you.", "You get a licence to use it."],
            ["How do scope changes get priced?", "A written change request with a price before any work starts.", "We'll work it out as we go."],
            ["How often will I see working software?", "Every week, as a version you can click through.", "At the end of each phase, or at launch."],
            ["What happens after launch?", "A bug fixing period, then a support option with a stated price.", "We'll discuss that later."],
            ["If we part ways, what do I get?", "Full source, database access and enough notes to hand over.", "The app, running on our hosting."],
            ["Why this technology for my app?", "A reason tied to your product, users or budget.", "It's what we always use, and nothing more."],
          ],
        },
        {
          type: "paragraph",
          text: "Then do the one check that beats every question: download their live apps, sign up, and use them for ten minutes. Screenshots prove someone can design. A live product with real users proves someone can ship. Ask for a reference from a past client with a similar project too.",
        },
      ],
    },
    {
      id: "red-flags",
      heading: "Red flags worth walking away over",
      blocks: [
        {
          type: "paragraph",
          text: "One of these deserves a direct question. Three or more together and we'd walk away, however good the price looks.",
        },
        {
          type: "checklist",
          items: [
            "A price within minutes of hearing the idea, with no questions about users, roles or integrations.",
            "Pushback on putting the repository, hosting or app store accounts in your name.",
            "A contract that licenses the code to you, or keeps ownership until a long retainer ends.",
            "A portfolio of designs with nothing live you can try.",
            "No straight answer about who writes the code, or a different team turning up after you sign.",
            "The whole fee upfront, rather than staged payments tied to things you can see working.",
            "No working software until the end of the project.",
            "Yes to every feature, every deadline and every budget.",
            "A top placement on a ranking site as the main evidence of quality. Those placements are often paid or driven by review counts.",
          ],
        },
      ],
    },
    {
      id: "ownership",
      heading: "Get the code assigned to you in writing",
      blocks: [
        {
          type: "paragraph",
          text: "Under UK copyright law, whoever writes the code owns it unless a written agreement assigns it to you. Paying the invoice doesn't transfer ownership. Employees are the exception, but freelancers, studios and agencies aren't your employees.",
        },
        {
          type: "paragraph",
          text: "The contract should assign all intellectual property in the work to your company, usually as each stage is paid. If the supplier reuses their own starter code or tools, the contract should list them and give you a permanent licence. Open source libraries keep their own licences, which is normal. And the GitHub organisation, hosting, database, domain, Apple and Google developer accounts and Stripe account should be registered to your business from the start. This is the general position, not legal advice; on a contract of any size, a solicitor reading the IP and termination clauses is money well spent.",
        },
      ],
    },
    {
      id: "pricing",
      heading: "Fixed price, day rates and what UK suppliers charge",
      blocks: [
        {
          type: "paragraph",
          text: "For a first release, push for a fixed price. It forces both sides to agree the scope properly and gives you a number to plan around. Time and materials, paid by the day or hour, suits ongoing work after launch, as long as you get detailed timesheets and a monthly cap.",
        },
        {
          type: "paragraph",
          text: "For a focused first version, typical UK prices are roughly £5,000 to £25,000 with a freelancer, £10,000 to £60,000 with a small studio and £40,000 to £150,000 or more with an agency. Freelance day rates usually sit around £300 to £700. A mid-level to senior in-house developer typically costs £50,000 to £90,000 a year in salary, more in London, before National Insurance, pension and recruitment fees. Scope moves these numbers more than the type of supplier does; our guide to the cost of building an app in the UK goes into what pushes them up or down.",
        },
        {
          type: "paragraph",
          text: "For reference, Scryptic is a founder-led studio in Brighton. Full app to market builds start from £10,000, the client owns the code and every account, and there's a catch-up every Friday.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Who owns the code if an agency builds my app?",
      answer:
        "In the UK, whoever writes the code owns the copyright unless a written contract assigns it to you, and paying the invoice is not enough on its own. Make sure your contract includes a full IP assignment to your company, and that the repository and accounts are in your name from the start.",
    },
    {
      question: "Does my app development company need to be in the UK?",
      answer:
        "No. A UK supplier makes contracts, time zones and meetings simpler, but plenty of founders work well with developers elsewhere over video calls. Clear communication, ownership terms and live products you can try matter far more than location.",
    },
    {
      question: "How many quotes should I get for an app?",
      answer:
        "Two or three is plenty, as long as every supplier gets the same written brief. Compare what each quote includes as well as the total, because the cheapest one often leaves out design, testing or launch support.",
    },
  ],
}
