import oneCodebaseOrTwo from "@/assets/blog/images/mobile-one-codebase-or-two.webp"
import whoseNameOnTheApp from "@/assets/blog/images/whose-name-is-on-the-app.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp, supportPlan } from "@/lib/services"

export const mobileAppDevelopmentCompaniesUk: BlogPost = {
  slug: "mobile-app-development-companies-uk",
  title: "Which UK mobile app development company fits your app?",
  series: "launch",
  service: "mobile-app-development",
  topic: "Mobile app agencies",
  icon: "smartphone",
  description:
    "Seven UK mobile app development companies compared on how they build, the prices they publish, support after launch and who holds the code and store accounts.",
  summary:
    "The right UK mobile app development company depends first on how your app should be built, natively for each platform or once for both, and then on the size of team behind it. We set seven side by side from what each publishes, from Apadmi with 450 people to our one-developer studio. Three publish a price for a first app, from £15,000 at Foresight Mobile to £100,000 or more at The Distance, and only one puts in writing that the code is yours.",
  datePublished: "2026-11-23",
  facts: [
    { label: "Companies compared", value: "7" },
    { label: "Based in", value: "Manchester, York, Bournemouth, Sussex and Dundee" },
    { label: "Publish a first-app price", value: "3 of the 6 others" },
    { label: "Figures checked", value: "November 2026" },
  ],
  sections: [
    {
      id: "how-they-build",
      heading: "Native or cross-platform, how does each company build?",
      blocks: [
        {
          type: "paragraph",
          text: "Ask this before anything else, because most mobile companies have a house answer and it shapes the price for years. Native means two apps, one written in Swift for iPhone and one in Kotlin for Android. Cross-platform means one codebase, usually Flutter or React Native, published to both stores.",
        },
        {
          type: "image",
          image: oneCodebaseOrTwo,
          alt: "Native builds two apps, Swift and Kotlin, one per store; cross-platform builds one app that ships to both.",
        },
        {
          type: "paragraph",
          text: "Foresight Mobile and Waracle mostly build in Flutter, which is what Waracle used for The People's Pension app it launched in May 2024. The Distance builds in React Native and Expo on top of The Core, its own library of components and modules, which it says gets a project 20 to 30% done before any new code is typed. Brightec builds mostly cross-platform, 3 Sided Cube offers iOS, Android or cross-platform, and Apadmi lists native, Kotlin Multiplatform, React Native, Flutter and hybrid. We write native Swift and Kotlin.",
        },
        {
          type: "paragraph",
          text: "One codebase is usually the cheaper way onto both platforms: Foresight Mobile says its cross-platform apps typically cost half as much as separate iOS and Android ones. Two native apps suit an app that leans hard on the phone, such as background location, the camera or alarms that must ring on time. If a company only works one way, ask what it would do if your app needed the other.",
          link: { text: "React Native vs Flutter, compared for a startup app.", href: "/blog/react-native-vs-flutter" },
        },
      ],
    },
    {
      id: "compared",
      heading: "Which mobile app development company suits which app?",
      blocks: [
        {
          type: "paragraph",
          text: "Match the company to the app and to the size of team you want behind it. The seven below run from a group of more than 450 people with offices on three continents to our studio of one, and between them they cover the main ways a mobile app gets built for a UK business.",
        },
        {
          type: "table",
          caption:
            "Seven UK mobile app development companies compared by base and size, how each builds, apps it names and the price it publishes, as of November 2026",
          columns: ["Company", "Base and size", "How it builds", "Apps it names", "Published price"],
          rows: [
            [
              "Scryptic (us)",
              "Brighton, founder-led, one developer",
              "Native Swift for iPhone and Kotlin for Android",
              "Get Out Of Bed, our own Android alarm clock",
              `${mvp.price} for a two week sprint, or ${extendedMvp.price} for three weeks`,
            ],
            [
              "Apadmi",
              "Manchester, with London and Edinburgh offices and teams in Europe, the US and Asia; 450+ people; founded 2009",
              "Native, Kotlin Multiplatform, React Native, Flutter or hybrid, chosen per project",
              "Co-op Membership, Domino's, the NHS, BBC iPlayer Radio",
              "Not published",
            ],
            [
              "The Distance",
              "York",
              "React Native and Expo, on The Core, its own component library",
              "A crypto wallet for GNY users, an award-winning employee app",
              "£100,000 to £300,000 for a first release with a full discovery",
            ],
            [
              "3 Sided Cube",
              "Bournemouth, with offices in London and the US; an in-house team",
              "iOS, Android or cross-platform",
              "Work for IFRC, the NHS and Glastonbury Festival",
              "£50,000 to £250,000 for a first app on both platforms, in a 2022 guide",
            ],
            [
              "Brightec",
              "Shoreham-by-Sea, over 10 years in mobile",
              "Mostly cross-platform, plus native iOS and Android",
              "Virgin Red, Waterstones, Ziffit",
              "Not published",
            ],
            [
              "Waracle",
              "Dundee, with Edinburgh, Glasgow, London and Sofia offices",
              "Mobile and web products; Flutter for The People's Pension",
              "The People's Pension, ScottishPower",
              "Not published",
            ],
            [
              "Foresight Mobile",
              "Near Manchester, with Birmingham and London offices; 11 UK staff; since 2017",
              "Flutter, plus native Swift and Kotlin",
              "50+ apps since 2017",
              "£3,500 discovery, then £15,000 to £40,000 for a simple app, £40,000 to £80,000 for a medium one, £80,000+ for complex",
            ],
          ],
        },
        {
          type: "callout",
          title: "Where these figures come from",
          text: "Every figure for another company comes from its own website in November 2026: service pages, FAQs, cost guides and case studies. 3 Sided Cube's prices come from a 2022 cost guide it still links in its site footer, so ask whether they've moved. We haven't worked with any of them, and the order of the table is not a ranking.",
        },
        { type: "subheading", text: "Three publish a price, and they start £85,000 apart" },
        {
          type: "paragraph",
          text: "Foresight Mobile's bottom band starts at £15,000 and The Distance's range starts at £100,000, and most of that gap is in what each one is picturing. The Distance's figure assumes a full discovery to design the app and several features. 3 Sided Cube's assumes iOS and Android versions, a medium-sized team and a couple of complicated features. Foresight Mobile's lowest band covers core features and a light backend, with three to six weeks of development.",
        },
        {
          type: "paragraph",
          text: "Foresight Mobile also prices the steps around the build. Its App Gameplan is a four-week discovery at a fixed £3,500, credited against the first sprint, and it adds three to six weeks of design and two to four weeks of launch around the development. So send every company the same description of your app and ask which band it lands in, and what moves it into the next.",
          link: { text: "What a mobile app costs in the UK, by route and type of app.", href: "/blog/how-much-does-it-cost-to-build-an-app-uk#mobile-app-cost" },
        },
        {
          type: "paragraph",
          text: "Have a figure of your own before the quotes come back. Our free MVP Cost Calculator starts by asking whether you're building a web app, a native iOS and Android app or both, then seven more, and gives a ballpark in development weeks and pounds.",
          link: { text: "Get a baseline from the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
        { type: "subheading", text: "Who writes the code" },
        {
          type: "paragraph",
          text: "Ask to meet them, because the seven organise this very differently. 3 Sided Cube says everything is built in-house, with no outsourcing or offshoring. Apadmi has grown through acquisitions in the Netherlands and Poland and opened a hub in Sri Lanka in 2026. Foresight Mobile has 11 staff in the UK, a senior developer in Serbia and partners it works with regularly. Brightec says the developer on your project is always the person you deal with, and with us the developer on your first call writes all of it.",
        },
        { type: "subheading", text: "Which to shortlist" },
        {
          type: "list",
          items: [
            { term: "Apadmi", text: "If you're a large retailer or brand building a loyalty or ordering app for millions of customers, with 24/7 support after launch." },
            { term: "The Distance", text: "If React Native suits your app and you'd value starting from a library it has maintained since 2010." },
            { term: "3 Sided Cube", text: "If you're a charity, public body or mission-led organisation and want a team whose whole focus is tech for good." },
            { term: "Brightec", text: "If you want a cross-platform consumer app from a Sussex studio where you speak to the developer directly." },
            { term: "Waracle", text: "If you're in financial services or healthcare and want a team used to the security and compliance that comes with them." },
            { term: "Foresight Mobile", text: "If you want price bands up front, a fixed-price discovery before you commit, and a Flutter app for both platforms." },
            { term: "Scryptic", text: "If you want a native app at a fixed price, built by one developer and published from your own accounts." },
          ],
        },
      ],
    },
    {
      id: "store-accounts",
      heading: "Who will hold the code, the store accounts and the signing keys?",
      blocks: [
        {
          type: "paragraph",
          text: "You should hold all three, and only one of the six other companies says so on its pages. Foresight Mobile promises full ownership of your source code and intellectual property, and publishes a guide to moving an app into your own Apple and Google Play accounts after a previous developer published it from theirs. For the rest, ask before you sign.",
        },
        {
          type: "image",
          image: whoseNameOnTheApp,
          alt: "Four things a mobile app depends on, the code, the Apple account, the Google Play account and the signing key, all in your name.",
        },
        {
          type: "paragraph",
          text: "With a mobile app, the code is only part of it. The Apple and Google accounts the app is published from decide who can ship an update and whose name appears as the seller on the listing. The signing key proves each update comes from the same publisher. Both stores can move an app between accounts, but as Foresight Mobile's guide points out, only the current account holder can start the transfer, so a supplier who has gone quiet can hold up every future release.",
        },
        {
          type: "paragraph",
          text: "Two answers to listen for. The Distance says it handles the whole store submission for you, which saves work, so ask whether it submits from your accounts or its own. It also builds on The Core, so ask what licence you get to that code if you later move to another supplier. Reusing a library is normal and is part of what keeps the price down. What matters is that you can keep running and updating the app without it.",
          link: {
            text: "More questions to ask a mobile app development company before you sign.",
            href: "/blog/how-to-choose-an-app-development-company-uk#mobile-checks",
          },
        },
      ],
    },
    {
      id: "after-launch",
      heading: "What does a mobile app cost to keep running after launch?",
      blocks: [
        {
          type: "paragraph",
          text: "Budget for a monthly bill, because Apple and Google change something every year and the app has to keep up. Foresight Mobile is the only one of the six to publish maintenance prices: its App Care plans are £675, £995 or £1,495 a month for an iOS app, and it reminds clients that Apple releases a new version of iOS each September.",
        },
        {
          type: "paragraph",
          text: `Apadmi and 3 Sided Cube both offer 24/7 support, which matters for an app people use at any hour, such as ordering food, checking a pension or booking a blood donation. 3 Sided Cube's cost guide calls support your insurance policy, and points out that the ideas left over from the build become an improvement plan with costs of its own. Ours is optional, at ${supportPlan.price} plus VAT a ${supportPlan.per}, for bug fixes, security updates, monitoring and small changes.`,
        },
        {
          type: "paragraph",
          text: "Some of the cost of launch day sits with you rather than the company: developer accounts, privacy details for each store, payment setup and a privacy policy. Our free App Launch Checklist asks five questions about your app and lists the legal, payments, analytics and app store steps your launch needs, so you can see which ones the company you choose will take on.",
          link: { text: "Build your launch list with the App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "where-we-fit",
      heading: "Where Scryptic sits among them",
      blocks: [
        {
          type: "paragraph",
          text: `We're the smallest company on the list: one developer writing native Swift for iPhone and Kotlin for Android, at ${mvp.price} for a two week sprint or ${extendedMvp.price} for three, plus VAT. Which platforms the first release covers is part of the scope we agree on the discovery call, and every build is published from your own Apple and Google accounts.`,
          link: { text: "How our mobile app development services work, and what they cost.", href: "/services/mobile-app-development" },
        },
        {
          type: "paragraph",
          text: "Get Out Of Bed, our own alarm clock, shows the kind of app this suits. It's written in Kotlin, rings on time through Android's battery savers, matches photos on the phone and sells Premium through Google Play.",
          link: { text: "How we built Get Out Of Bed.", href: "/work/get-out-of-bed" },
        },
        {
          type: "paragraph",
          text: "We're the wrong choice for an app that has to connect to a retailer's tills, a bank's core systems or patient records from day one, or one that needs a team on call through the night. Apadmi, Waracle and 3 Sided Cube are set up for that. And if your app doesn't need the phone itself, a web app reaches every phone from one link and is cheaper to change.",
          link: { text: "UK web app development companies, compared.", href: "/blog/web-app-development-companies-uk" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What does a mobile app development company need from me before it can quote?",
      answer:
        "A short written description of the one journey that matters most, who uses it, which platforms it has to be on, which other systems it connects to and how it makes money. Have your Apple and Google developer accounts opened, or at least know whose company they will be in. Expect a discovery step before a firm price: Foresight Mobile's takes four weeks and five to seven hours of your time.",
    },
    {
      question: "Is a mobile app development company with developers abroad cheaper?",
      answer:
        "Often by the day, not always by the app. Apadmi has teams in Poland and Sri Lanka as well as the UK, and Foresight Mobile works with a developer in Serbia, while 3 Sided Cube keeps everything in-house. Where people sit matters less than whether you meet the developers who will write your app and can talk to them during the build.",
    },
    {
      question: "Can a mobile app development company take over an app built with Lovable or another AI builder?",
      answer:
        "Yes, and more of them offer it now. Foresight Mobile sells Lovable to production and Base44 to production services, and The Distance has a vibe coding to production service. Expect a review of the code before any price, because an app built that way usually needs its data access, sign-in and hosting checked before real customers rely on it. We take on apps from Lovable, Bolt and Replit as well.",
    },
  ],
}
