import type { BlogPost } from "@/lib/blog/types"

export const chooseAppDevelopmentCompany: BlogPost = {
  slug: "how-to-choose-an-app-development-company-uk",
  title: "How to choose an app development company in the UK",
  series: "launch",
  topic: "Hiring",
  description:
    "How to choose an app development company in the UK: freelancer, studio, agency or in-house, what to check, red flags, who owns the code and questions to ask.",
  summary:
    "To choose an app development company in the UK, first pick the right kind of supplier for your project, then check that they have live products you can use, that you know who will write your code, and that the contract assigns the code and every account to you. A low quote matters much less than those checks.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Main options", value: "Freelancer, studio, agency, in-house" },
    { label: "Check first", value: "Live products you can use" },
    { label: "Must be in writing", value: "IP assignment to you" },
    { label: "Accounts", value: "In your name from day one" },
    { label: "Pricing models", value: "Fixed price or time and materials" },
  ],
  sections: [
    {
      id: "your-options",
      heading: "What are your options for building an app in the UK?",
      blocks: [
        {
          type: "paragraph",
          text: "There are four realistic routes: a freelance app developer, a small studio, a larger app development agency, or hiring your own developers. The same four apply if you're looking for a mobile app development company in the UK rather than a web build. Which one fits depends on how big the job is, how much of it you can manage yourself, and how long you'll need developers for: a few months, or years.",
        },
        {
          type: "list",
          items: [
            {
              term: "Freelancer",
              text: "Cheapest, and you talk directly to the person writing the code. Quality varies enormously, and one person rarely does design, development, testing and project management equally well. If they get ill or land a bigger contract, your project stops.",
            },
            {
              term: "Small studio",
              text: "A few people covering design, build and launch, often with the founders writing code. More continuity than a freelancer, less overhead than an agency. The catch is capacity: a studio only takes on a few projects at once, so you may have to wait for a slot.",
            },
            {
              term: "Agency",
              text: "Project managers, designers, QA testers and a defined process. Worth it for large or regulated builds, or when your organisation needs procurement paperwork and a supplier with a big bench. More layers mean higher cost and slower decisions, and the developers may be people you never meet.",
            },
            {
              term: "In-house hire",
              text: "The most control, and knowledge that stays in the business. Also the slowest start, since a good hire can take months, and one developer won't have every skill an app needs. We'd only go this way once the product is proven and needs work every week.",
            },
          ],
        },
      ],
    },
    {
      id: "developer-vs-agency",
      heading: "Should you hire an app developer or an agency?",
      blocks: [
        {
          type: "paragraph",
          text: "Hire an app developer directly if the scope is small and you're happy to run the project yourself. If you'd rather have one team own design, build and launch, and be accountable for all of it, go to a studio or agency.",
        },
        {
          type: "paragraph",
          text: "The quickest way to decide is to list the jobs that aren't coding: writing the scope, designing screens, testing on real phones, setting up hosting and environments, submitting to the app stores. If you're going to do those yourself anyway, a good freelancer is excellent value. If you'd rather spend that time talking to customers, pay a team to cover it.",
        },
        {
          type: "callout",
          title: "About lists of the best app development companies",
          text: "Ranking sites are fine for finding names. Placements are often paid, or driven by how many reviews a firm has collected rather than how good the work is, so treat them as a long list and do your own checks.",
        },
      ],
    },
    {
      id: "what-to-check",
      heading: "What should you check before hiring an app development company?",
      blocks: [
        {
          type: "paragraph",
          text: "Check things you can verify. The first thing we'd look at is whether their portfolio contains apps that are live today. Download them, sign up, click around. Screenshots and Dribbble shots prove someone can design; a live product with real users proves someone can ship. Then ask what that company built and what was done by others, because portfolios often include work where the agency did the branding and someone else wrote the code.",
        },
        {
          type: "paragraph",
          text: "Next, find out who'll actually write your code. Are the people on the sales call the people who build? Is any work subcontracted, in the UK or abroad? Neither is automatically a problem, but you should know before you sign, not discover it from the commit history.",
        },
        {
          type: "paragraph",
          text: "Then the practical bits. Your GitHub organisation, hosting, database, domain, Apple and Google developer accounts and Stripe account should all be registered to your business, with the supplier invited as a user. Progress should be visible every week, ideally as a working version you can click through, not a reveal at the end. And there should be a written answer to what happens after launch: a bug fixing period, a support retainer, or a clean handover to another developer. Ask for a reference from a past client with a similar project while you're at it.",
        },
      ],
    },
    {
      id: "who-owns-the-code",
      heading: "Who owns the code when someone else builds your app?",
      blocks: [
        {
          type: "paragraph",
          text: "Under UK copyright law, whoever writes the code owns it unless a written agreement assigns it to you. Paying the invoice doesn't transfer ownership on its own. Employees are the exception, since work they do as part of their job belongs to the employer, but freelancers, studios and agencies aren't your employees.",
        },
        {
          type: "paragraph",
          text: "So the contract needs to assign all intellectual property in the work to your company, usually once each stage is paid. If the supplier reuses their own starter code or internal tools, the contract should list them and give you a permanent licence to use them in your app. Open source libraries keep their own licences, which is normal; just ask that nothing with unusual licence terms goes in without your say. And you should get the full source, database access and enough documentation for another developer to run it. A working build on its own isn't enough.",
        },
        {
          type: "callout",
          title: "Not legal advice",
          text: "That's the general position. On a contract of any size, it's worth paying a solicitor to read the IP and termination clauses before you sign.",
        },
      ],
    },
    {
      id: "fixed-price-or-time-and-materials",
      heading: "Fixed price or time and materials?",
      blocks: [
        {
          type: "paragraph",
          text: "For a first release, we'd push for a fixed price. Fixed price software development gives you a number you can plan around, and it forces both sides to agree the scope properly up front. Suppliers add a margin for risk, and changes go through a change request, so ask how those are priced before you sign.",
        },
        {
          type: "paragraph",
          text: "Time and materials, where you pay a day or hourly rate for time spent, fits better once the product is live and the work is a stream of smaller changes. It only works if you get detailed timesheets and agree a monthly cap. The hybrid that suits most founders is a fixed price for version one, then a retainer or day rate afterwards.",
        },
      ],
    },
    {
      id: "red-flags",
      heading: "What are the red flags when choosing an app developer?",
      blocks: [
        {
          type: "paragraph",
          text: "The big ones are vagueness about who owns the code, who does the work and what's included. One of these is worth a direct question. Several together and we'd walk away.",
        },
        {
          type: "list",
          items: [
            "A price within minutes of hearing the idea, with no questions about users, roles or integrations.",
            "Pushback on putting the repository, hosting or app store accounts in your name.",
            "A contract that licenses the code to you instead of assigning it, or keeps ownership until a long retainer ends.",
            "A portfolio of mock-ups with nothing live you can try.",
            "No straight answer about who writes the code, or a different team turning up after you sign.",
            "The whole fee upfront, rather than staged payments tied to things you can see working.",
            "Yes to every feature, every deadline and every budget.",
          ],
        },
      ],
    },
    {
      id: "questions-to-ask",
      heading: "What questions should you ask before signing?",
      blocks: [
        {
          type: "paragraph",
          text: "Ask questions with answers you can check. A good supplier will answer all of these in one call without hesitating.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Can I use a couple of apps you've built that are live today?",
            "Who will write the code, and could that change mid-project?",
            "Will the code, hosting, database, domain and store accounts be in my name from the start?",
            "Does the contract assign all intellectual property to my company?",
            "Is the price fixed, and how are scope changes priced?",
            "What's included: design, testing, store submission, launch support?",
            "How often will I see working software?",
            "What happens after launch, and what does support cost?",
            "If we part ways, what do I get to hand the app to someone else?",
            "Which technologies will you use, and why those for this app?",
          ],
        },
      ],
    },
    {
      id: "typical-costs",
      heading: "How much do UK app development companies charge?",
      blocks: [
        {
          type: "paragraph",
          text: "For a focused first version, typical UK prices are around £5,000 to £25,000 with a freelancer, £10,000 to £60,000 with a small studio and £40,000 to £150,000 or more with an agency. They're ranges, not price lists, and scope moves them more than the type of supplier does.",
        },
        {
          type: "paragraph",
          text: "Freelance developers typically charge around £300 to £700 a day. Agency day rates are usually higher because they carry project managers and other specialists. An in-house developer typically costs £50,000 to £90,000 a year in salary at mid-level to senior, more in London, before employer National Insurance, pension, equipment and recruitment fees.",
        },
        {
          type: "paragraph",
          text: "Small studios sit between freelancers and agencies on price. Scryptic is one example: a founder-led studio in Brighton where full app to market builds start from £10,000, the client owns the code and every account, and there's a catch-up every Friday. For what pushes a price up or down, see our guide How much does it cost to build an app in the UK?",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is it better to hire a freelance app developer or an agency?",
      answer:
        "A freelancer is cheaper and works well for small, clearly scoped projects you're happy to manage. A studio or agency costs more but takes design, build, testing and launch off your plate as one accountable job. Decide based on how much of the non-coding work you want to do yourself.",
    },
    {
      question: "Who owns the code if an agency builds my app?",
      answer:
        "In the UK, whoever writes the code owns the copyright unless a written contract assigns it to you. Make sure yours includes a full IP assignment to your company, and that the repository and accounts are in your name from the start.",
    },
    {
      question: "Should I choose a fixed price or time and materials contract?",
      answer:
        "For a first release, fixed price is usually the better choice because it forces a clear scope and gives you a number to plan around. Time and materials suits ongoing work after launch, as long as you get detailed timesheets and a monthly cap.",
    },
    {
      question: "Does my app development company need to be in the UK?",
      answer:
        "No. A UK supplier makes contracts, time zones and meetings simpler, but plenty of founders work happily with developers in other cities or countries over video calls. Clear communication, ownership terms and live products matter far more than location.",
    },
    {
      question: "How many quotes should I get for an app?",
      answer:
        "Two or three is plenty, as long as every supplier gets the same written brief. Compare what's included as well as the total, because the cheapest quote often leaves out design, testing or launch support.",
    },
  ],
}
