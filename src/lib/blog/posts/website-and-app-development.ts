import oneCompanyOrTwo from "@/assets/blog/images/website-and-app-one-company-or-two.webp"
import splitAtTheClick from "@/assets/blog/images/website-and-app-split-at-the-click.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp, supportPlan } from "@/lib/services"

export const websiteAndAppDevelopment: BlogPost = {
  slug: "website-and-app-development",
  title: "Website and app development as one job or two",
  series: "launch",
  service: "web-app-development",
  topic: "Website and app",
  icon: "globe",
  description:
    "Website and app development priced as separate lines: UK build and running costs, what a combined quote should split out, and when one company should do both.",
  summary: `Website and app development are two jobs that meet at your domain, your brand and the sign-up button, so price them as two lines even when one company quotes for both. UK studios publish starting prices of £1,500 to £12,500 for a marketing site on Webflow, plus a builder plan of $10 to $39 a month, while a first web app costs ${mvp.price} with us and typically £10,000 to £40,000 at a small studio. One company for both is the better buy when the app's own public pages are the website, or when nobody on your side has time to manage two suppliers.`,
  datePublished: "2026-11-24",
  facts: [
    { label: "Website build, published starting prices", value: "£1,500 to £12,500" },
    { label: "Website builder plans", value: "$10 to $39 a month" },
    { label: "Shared items a quote should name", value: "6" },
    { label: "Figures checked", value: "November 2026" },
  ],
  sections: [
    {
      id: "two-jobs",
      heading: "What does website and app development cover?",
      blocks: [
        {
          type: "paragraph",
          text: "Two products that share an address. The website is what people find through search and read before they decide anything, and it changes whenever your marketing does. The app is what they sign in to and use, and it changes when a developer ships a release. Website and app development gets sold as one service because the two meet in a few places: the domain, the brand, the sign-up button and the numbers that tell you whether visitors turn into users.",
        },
        {
          type: "paragraph",
          text: "Those meeting points are the seam between the two jobs, and most of the trouble in a website and app project happens there rather than inside either build. A site can be finished and an app can pass every test while the button between them still points at a page that no longer exists.",
        },
        {
          type: "paragraph",
          text: "Order matters less than people think. A one-page site with a waitlist can go live in days and test interest while the app is still being scoped, so most founders start there.",
          link: { text: "Whether to build the website or the app first.", href: "/blog/web-app-or-mobile-app-first#website-or-app-first" },
        },
      ],
    },
    {
      id: "costs",
      heading: "What website and app development costs in the UK",
      blocks: [
        {
          type: "paragraph",
          text: "The two arrive as different kinds of bill. A website is a build fee plus a builder plan you pay every month; an app is a larger build fee, hosting that grows with use, and support. These are the figures UK studios and the builders themselves publish.",
        },
        {
          type: "table",
          caption:
            "Published prices for a marketing website and a first web app in the UK, split into build, monthly platform and support, as of November 2026",
          columns: ["Line", "Marketing website", "Web app"],
          rows: [
            [
              "Build",
              "Devflow, a Birmingham Webflow studio, publishes sites from £1,500 delivered in about two weeks. ViDesigns publishes Webflow builds from £12,500",
              `${mvp.price} for our two week sprint or ${extendedMvp.price} for three weeks; £10,000 to £40,000 is typical for a first version at a small UK studio`,
            ],
            [
              "Platform, each month",
              "Webflow's Premium site plan, which includes the CMS, is $25 a month billed yearly or $39 billed monthly. Framer's Basic and Pro plans are $10 and $30 a month",
              "Hosting and a database, tens of pounds a month at first, rising with traffic and storage",
            ],
            [
              "Support",
              "Devflow's support retainers start from £300 a month. ViDesigns lists Webflow support at £2,500 a month",
              `Our optional support plan is ${supportPlan.price} a ${supportPlan.per}`,
            ],
            [
              "Who you pay",
              "The studio for the build, and Webflow or Framer directly for the plan",
              "The developer for the build, and each provider directly for hosting and services, in accounts in your name",
            ],
          ],
        },
        {
          type: "callout",
          title: "Where these figures come from",
          text: "Devflow's and ViDesigns' prices come from their own websites, and Webflow's and Framer's from their pricing pages, in November 2026. Both studios word their prices a little differently from page to page, ViDesigns states its prices exclude VAT, and the builder plans are listed in US dollars, so confirm the current figure with each. We haven't worked with either studio.",
        },
        {
          type: "paragraph",
          text: "The two build fees overlap more than most founders expect. A small marketing site can cost a fifth of a first app, while a designed site with a content plan can cost as much as the app does. That is the first reason to see them as separate lines: neither number tells you anything about the other.",
        },
        {
          type: "paragraph",
          text: "The app line moves with the number of user roles, the depth of the admin side and every outside system it talks to, and the app cost guide goes through each.",
          link: { text: "What a custom web app costs in the UK, and why.", href: "/blog/how-much-does-it-cost-to-build-an-app-uk#web-app-cost" },
        },
        {
          type: "paragraph",
          text: "To have your own number for the app line before any quote arrives, our free MVP Cost Calculator gives a ballpark in development weeks and pounds from eight questions about the app.",
          link: { text: "Price the app side with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
      ],
    },
    {
      id: "split-the-quote",
      heading: "What a combined website and app quote should split out",
      blocks: [
        {
          type: "paragraph",
          text: "The website and the app as separate lines, and six shared items named against one supplier or the other. The two builds are easy to price. The shared items are the ones each side assumes the other has covered, and they tend to surface in launch week.",
        },
        {
          type: "table",
          caption: "Six items a website and app quote should name, why each falls between the two builds, and what to ask",
          columns: ["Item", "Why it falls between the two", "What to ask"],
          rows: [
            [
              "Domain and DNS",
              "The site uses the root domain and the app a subdomain, and whoever holds the registrar login can break either",
              "Is the domain registered in my company's name, and who changes its DNS records?",
            ],
            [
              "Email sending",
              "Site forms and app emails both send from your domain, and a domain can publish only one SPF record, so a second one added for a new email service breaks the check for both",
              "Which services send email from our domain, and who sets up the records for each?",
            ],
            [
              "Analytics",
              "The site counts visitors and the app counts sign-ups, and unless both report to one place nobody can say which page brought a paying customer",
              "Which analytics tool covers both, and does the app record where each new account came from?",
            ],
            [
              "Design files",
              "The app should look like the site, but a web designer may hand over finished pages rather than the colours, type and components behind them",
              "Will the website's design files and its colour and type styles be handed over for the app?",
            ],
            [
              "The sign-up handoff",
              "The button lives on the site and the page it opens lives in the app, so a renamed plan or a moved page breaks it with neither build at fault",
              "Who owns the sign-up and log-in links, and who tests them after each release?",
            ],
            [
              "Legal pages and accounts",
              "One privacy policy has to cover the site's forms and cookies and the app's stored data, and every builder, hosting and payment account needs an owner",
              "Who writes the privacy policy, and whose name is on each account?",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "For the app side of that list, the free App Launch Checklist builds the launch steps from five questions about your app, from legal pages to payments set-up. Put a supplier's name next to each step before anyone starts.",
          link: { text: "Build your launch list with the App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
        {
          type: "paragraph",
          text: "If one company quotes a single total for both, ask for it split anyway. You'll want to know what the website costs on its own on the day you move it to another designer, and that day usually comes long before you'd move the app.",
        },
      ],
    },
    {
      id: "separate-suppliers",
      heading: "Running the website and app with separate suppliers",
      blocks: [
        {
          type: "paragraph",
          text: "It works well as long as one person on your side owns the seam. Give that person the registrar login and the analytics account, and make them the one who signs off any change to the sign-up and log-in links.",
        },
        {
          type: "image",
          image: splitAtTheClick,
          alt: "A website and an app as two browser windows, with the sign-up click marking where each supplier's job ends.",
        },
        { type: "subheading", text: "Draw the line at the click" },
        {
          type: "paragraph",
          text: "Agree in writing where each supplier's job ends. The simplest line is the click: the website supplier owns every page up to the sign-up and log-in buttons, and the app supplier owns the page each button opens and everything after it. Keep the link targets, such as /signup?plan=team, in a short shared document, so a plan renamed in the app is a change both sides see before it ships.",
        },
        {
          type: "paragraph",
          text: "DNS changes need both to agree. A record edited for a website job, such as connecting a new email or form tool, can stop the app's subdomain or its emails working, and the app supplier is usually the last to hear about it.",
        },
        { type: "subheading", text: "Follow a visitor from the site into the app" },
        {
          type: "paragraph",
          text: "Use one analytics tool on both, and check that a visit moving from yourdomain.com to app.yourdomain.com shows as one journey rather than a new visit referred by your own site. Then have the app save where each account came from, the campaign and the page that sent them, at the moment of sign-up.",
        },
        {
          type: "paragraph",
          text: "That saved record is the one to trust. Ad blockers and cookie banners mean the site's analytics undercount, while the app's own database knows exactly which accounts exist and which of them pay.",
        },
        { type: "subheading", text: "Keep the app looking like the site" },
        {
          type: "paragraph",
          text: "Ask the website's designer for the colours, type and spacing as named styles, not only the finished pages, and reuse them in the app so moving from one to the other feels like one product. The Webflow guide covers the rest of keeping an app on a subdomain tidy, from keeping app screens out of search to which cookie the site may read.",
          link: { text: "Details that keep an app on a subdomain tidy.", href: "/blog/migrate-from-webflow#subdomain-or-subpath" },
        },
      ],
    },
    {
      id: "one-supplier",
      heading: "When should one company do your website and app development?",
      blocks: [
        {
          type: "paragraph",
          text: "When the app's own public pages are the website, or when nobody on your side can own the seam. Outside those cases, one company mostly buys convenience, and the cost of it shows up later, when marketing wants a new page and has to wait for a developer to make it.",
        },
        {
          type: "image",
          image: oneCompanyOrTwo,
          alt: "Decision tree: one company if the app's pages must rank or nobody owns the seam, otherwise two suppliers.",
        },
        {
          type: "list",
          items: [
            {
              term: "The app's pages are what people search for",
              text: "A directory, a marketplace or a site of public profiles earns its traffic from pages the app generates. Whoever builds the app has to build those pages, so the website is really part of it, and a second supplier would only be looking after a handful of static pages.",
            },
            {
              term: "Nobody on your side can own the seam",
              text: "If no one has time to hold the domain, check the links after each release and decide which supplier a bug belongs to, pay one company to do it. That coordination is most of what you're buying.",
            },
            {
              term: "The site is a single page",
              text: "A launch page with a waitlist form can live in the app's own codebase, and adding it costs the app developer far less than a separate website project would.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "If you do want one company, choose it for the app. A disappointing website can be rebuilt on a builder in a few weeks, but an app built badly holds your customers' data and is far harder to replace. Of the UK companies we compared for web app work, Ronins and Priority Pixels run website and marketing work alongside their app builds.",
          link: { text: "UK web app development companies, compared.", href: "/blog/web-app-development-companies-uk" },
        },
      ],
    },
    {
      id: "where-we-fit",
      heading: "What we build, and what we leave to your web designer",
      blocks: [
        {
          type: "paragraph",
          text: "We build the app and work alongside whoever builds your website. On our side of the click we take the sign-up and log-in pages, the DNS record for the app's subdomain, the app's emails and the record of where each account came from. The website stays with a designer and a builder your team can edit without us.",
        },
        {
          type: "paragraph",
          text: "Where the website is the app, as with a directory or a marketplace, we build its public pages too, because they're part of the product we're building.",
          link: { text: "How we build web apps at a fixed price.", href: "/services/web-app-development" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is it cheaper to have one company build the website and the app?",
      answer:
        "Not usually on the invoice, because each part takes the same work whoever does it. What one company saves you is coordination: one contract, one person to call when sign-up breaks and no argument about whose bug it is. Two suppliers can cost less in total when the site goes to a web designer working on a builder rather than to an app team writing it in code.",
    },
    {
      question: "Can we change website supplier later without touching the app?",
      answer:
        "Yes, if the app sits on its own subdomain and the domain is registered in your company's name. The app only depends on the links into it and its own DNS records, so a new designer can rebuild the site as long as the sign-up and log-in links still point at the same pages and the app's records are left alone.",
    },
    {
      question: "Does a mobile app need a website as well?",
      answer:
        "Yes, a small one at least. Apple asks for a privacy policy URL and a support URL for every App Store listing, and Google Play asks for a privacy policy link, so the store listing needs pages on the web to point to. Those pages sit naturally on the marketing site.",
    },
  ],
}
