import builderAiBuildcardCutDown from "@/assets/blog/images/builder-ai-buildcard-cut-down.webp"
import builderAiLostPropertyTags from "@/assets/blog/images/builder-ai-lost-property-tags.webp"
import type { BlogPost } from "@/lib/blog/types"

export const builderAi: BlogPost = {
  slug: "migrate-from-builder-ai",
  title: "Rescuing a Builder.ai app from what you still hold",
  series: "migration",
  topic: "Builder.ai",
  icon: "building",
  category: "AI app builders",
  description:
    "Builder.ai went into insolvency in May 2025. How to rescue a Builder.ai app: find what you still hold, repair the code you have or rebuild from the Buildcard.",
  summary:
    "A Builder.ai app can be rescued, but nobody at Builder.ai will help: the company went into insolvency in May 2025, and its squads, support and hosting went with it. Start by finding what you still hold, such as a repository invite, the Buildcard, the store listing and the domain. With the code, a developer repairs and rehosts the React Native app and Rails backend. Without it, the screens your users rely on and the data in services around the app become the spec for a rebuild.",
  datePublished: "2026-11-16",
  facts: [
    { label: "Builder.ai", value: "Insolvent since May 2025" },
    { label: "Stack", value: "React Native and Ruby on Rails" },
    { label: "Your code", value: "Foreground IP is yours" },
    { label: "Usual approach", value: "Repair with the code, rebuild without" },
  ],
  sections: [
    {
      id: "what-happened",
      heading: "What happened to Builder.ai apps?",
      blocks: [
        {
          type: "paragraph",
          text: "They lost the company that built and ran them. Builder.ai, the London company that priced apps feature by feature and built them with help from its AI assistant Natasha, ran out of money in May 2025 after lenders led by Viola Credit took most of its cash. Staff were told on 20 May that it was entering insolvency, and the company filed for bankruptcy in Delaware at the start of June.",
        },
        {
          type: "paragraph",
          text: "Customers lost three things at once. The squads building their apps were let go, support stopped answering, and apps on Builder.ai's hosting depended on cloud accounts it couldn't pay: it was reported to owe Amazon about $85 million and Microsoft about $30 million.",
        },
        {
          type: "paragraph",
          text: "Eighteen months on, nobody is coming back to finish the work. If your app is still running, treat that as luck with no date attached, and save everything you can reach this week.",
        },
      ],
    },
    {
      id: "what-you-hold",
      heading: "Find what you still hold before choosing a route",
      blocks: [
        {
          type: "paragraph",
          text: "The route depends on what survived, so take stock first. Most customers hold more than they think, spread across old emails, app store accounts and services set up in their own name during the build.",
        },
        {
          type: "image",
          image: builderAiLostPropertyTags,
          alt: "Luggage tags on a rail for repository, Buildcard, designs, store listing, domain and data, some ticked, some unknown.",
        },
        {
          type: "table",
          caption: "What a Builder.ai customer may still hold, where to look for it and what it decides",
          columns: ["What", "Where to look", "What it decides"],
          rows: [
            ["Source code", "An invite to a GitHub or similar repository, or a zip sent at a delivery milestone", "Whether you can repair rather than rebuild"],
            ["The Buildcard", "Builder.ai emails, invoices and any PDF or screenshot you saved", "The agreed feature list, the nearest thing to a spec"],
            ["Designs", "Figma or Sketch files shared with you, and any clickable prototype", "The screens to rebuild without guessing"],
            ["Store listings", "App Store Connect and Google Play Console, signed in as yourself", "Whether the next version can ship as an update"],
            ["Domain", "Your registrar account, or a WHOIS lookup on the address", "Whether you can point it at new hosting"],
            ["Data", "Admin panel exports, your payment provider and your email provider", "Which customers, payments and accounts carry over"],
          ],
        },
        {
          type: "paragraph",
          text: "If the app still runs, record it now. Sign in as each type of user and screen-record every journey, from sign-up to payment to the admin pages. Export whatever the admin panel lets you download. When the hosting goes, those recordings are the only description of how the app behaved.",
        },
      ],
    },
    {
      id: "who-owns-it",
      heading: "Do you own the code Builder.ai wrote?",
      blocks: [
        {
          type: "paragraph",
          text: "Mostly, with a gap. Builder.ai's intellectual property FAQ for Studio said the customer keeps full ownership of the Foreground IP, the work made for their project. Background IP, the material Builder.ai already owned or licensed and reused across projects, stayed with Builder.ai. Its apps were assembled from a library of reusable features, so most codebases contain both.",
        },
        {
          type: "paragraph",
          text: "The gap matters most if you plan to keep the code for years, sell the company or raise money, because buyers and investors ask who owns what. Have a solicitor read your contract alongside whatever the administrator says about Builder.ai's assets. Rewriting the reused parts as you upgrade them narrows the gap, and a rebuild closes it.",
        },
        {
          type: "paragraph",
          text: "Whoever builds next, get the code assigned to you in writing and keep it in your company's GitHub from the first commit, with the store and hosting accounts in your name.",
          link: { text: "What to put in writing about code ownership", href: "/blog/how-to-choose-an-app-development-company-uk#ownership" },
        },
      ],
    },
    {
      id: "repair",
      heading: "Getting a Builder.ai app running again from the code",
      blocks: [
        {
          type: "paragraph",
          text: "If you have the repository, try repairing before rebuilding. Builder.ai's engineering blog described its apps as React Native on the front end and Ruby on Rails on the back end, two stacks plenty of developers know. That makes a Builder.ai app a codebase to take over, not a proprietary model to decode.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Copy the repository, with its full history, into your company's GitHub organisation. An invite to a repository in Builder.ai's organisation can vanish along with it.",
            "Get the Rails backend booting on a laptop. Rails keeps its secrets in an encrypted credentials file that opens only with a master key, and that key is kept out of the repository by default. If nobody has it, create fresh credentials and new keys for every service the app calls.",
            "Search the code for Builder.ai hostnames, storage buckets and API keys belonging to Builder.ai's accounts rather than yours. Each one is a dependency that can disappear without warning.",
            "Bring the mobile app up to date. Google Play requires updates to target a recent Android version and Apple requires builds from a recent Xcode, so an app last built in early 2025 needs React Native upgrades before either store accepts a new release. Builder.ai wrote about building tooling just to keep customer apps upgraded, which shows how quickly these codebases fall behind.",
            "Write tests around sign-up, payments and anything else that touches money or customer data, then change it.",
          ],
        },
        {
          type: "paragraph",
          text: "Judge the code on what you find. Half-built features and missing tests are normal in a codebase a squad left mid-sprint. A backend nobody can get running after a week of trying is the signal to rebuild instead, using the code as a reference for the business rules. Before customers return, run the checks in our production audit, from secrets to rollbacks.",
          link: { text: "Run our production audit on the rescued app", href: "/blog/vibe-coding-to-production" },
        },
      ],
    },
    {
      id: "rebuild",
      heading: "Rebuilding when the code is gone",
      blocks: [
        {
          type: "paragraph",
          text: "Rebuild from what users actually do, not from the Buildcard alone. The Buildcard lists every feature you paid for, priced one by one, and some were never finished or never used. The screens your customers rely on, and the data behind them, are the real spec.",
        },
        {
          type: "image",
          image: builderAiBuildcardCutDown,
          alt: "A Buildcard of eight features: four in use move to a first release card, four unused are struck through for later.",
        },
        {
          type: "paragraph",
          text: "Data is usually more recoverable than people expect, because much of it never lived only in Builder.ai's database. Your payment provider holds customers, subscriptions and payment history. Your email provider holds the user list. Analytics, if the app had it, shows which screens people opened. Rebuild accounts from those, and ask users to set a new password on first sign-in.",
        },
        {
          type: "paragraph",
          text: "Then cut the list. Put each Buildcard feature into our free MVP Scope Planner, size it and split it into what the first release needs and what can wait. A feature nobody used before the collapse doesn't need rebuilding before relaunch.",
          link: { text: "Cut the feature list with the MVP Scope Planner", href: "/tools/mvp-scope-planner" },
        },
        {
          type: "paragraph",
          text: "Pick the platform again rather than copying the old one. If Builder.ai built you a mobile app but your users mostly book or pay at a desk, a web app is cheaper to build and change.",
          link: { text: "Whether to build a web app or a mobile app first", href: "/blog/web-app-or-mobile-app-first" },
        },
      ],
    },
    {
      id: "store-listing",
      heading: "Keeping the store listing and your users",
      blocks: [
        {
          type: "paragraph",
          text: "Ship the rescued or rebuilt app as an update to the existing listing wherever you can, so users keep their reviews and get it without reinstalling. Builder.ai's app store checklist told customers to open their own Apple and Google developer accounts, so many listings are already in the customer's name. Sign in to App Store Connect and the Play Console to check.",
        },
        {
          type: "list",
          items: [
            {
              term: "iOS",
              text: "The account holder can create new signing certificates, so any build with the original bundle identifier, signed from your Apple account, replaces the old version.",
            },
            {
              term: "Android",
              text: "With Play App Signing, Google signs the release and you sign each upload with an upload key. If that key left with Builder.ai's squad, the account owner can request a new one from the Play Console.",
            },
            {
              term: "A listing in Builder.ai's account",
              text: "Nobody there can transfer it, so publish a new listing from your own account and email existing users the link.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Our free App Launch Checklist builds the store, legal and analytics list for a relaunch from your answers about the app.",
          link: { text: "Build your relaunch list with the App Launch Checklist", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "repair-or-rebuild",
      heading: "Repair or rebuild, by what survived",
      blocks: [
        {
          type: "paragraph",
          text: "What you hold decides the route more than what you'd prefer. Find your row, then estimate from there.",
        },
        {
          type: "table",
          caption: "The usual route for a Builder.ai app, depending on what survived the collapse",
          columns: ["What survived", "Usual route", "Where the time goes"],
          rows: [
            ["Code that boots", "Repair, upgrade and rehost", "Store requirements, upgrades and fresh keys"],
            ["Code that won't boot or is half built", "Rebuild, reading the old code for business rules", "Working out which features were finished"],
            ["No code, app still live", "Rebuild from recordings and the Buildcard", "Getting the data out while it still runs"],
            ["No code, app offline", "Rebuild from designs, the Buildcard and other services", "Piecing accounts back together"],
          ],
        },
        {
          type: "paragraph",
          text: "For a first figure before any developer opens the code, the free MVP Cost Calculator turns eight answers about the app into development weeks and pounds.",
          link: { text: "Get a rough figure from the MVP Cost Calculator", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "paragraph",
          text: "We take on rescues and rebuilds like these, starting with a look at whatever you managed to keep.",
          link: { text: "Our no-code and low-code migration service", href: "/services/no-code-migration" },
        },
        {
          type: "paragraph",
          text: "Like Builder.ai, we quote a fixed price. Unlike Builder.ai, the code sits in your GitHub from the first day and every account is in your name, so a supplier's fate never decides your app's.",
          link: { text: "See what a fixed-price sprint includes", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can we get money back from Builder.ai?",
      answer:
        "Possibly a little. A customer owed money or unfinished work is an unsecured creditor, paid after the secured lenders, so recoveries in an insolvency like this are usually small. Register a claim with the administrator of the Builder.ai company you contracted with, and keep invoices, the Buildcard and correspondence as evidence.",
    },
    {
      question: "What happens to a domain Builder.ai registered for us?",
      answer:
        "Look up who the registrant is. If the domain is in your name, the registrar can move control to you once you prove it. If Builder.ai registered it in its own name, it counts as the company's asset and the request goes to the administrator. Check the renewal date either way, because a domain that lapses can be bought by anyone.",
    },
    {
      question: "Should we use an AI app builder for the rebuild?",
      answer:
        "It can work if the code lands in your own GitHub from the first day and the hosting and store accounts are in your name. Builders such as Lovable and Bolt write ordinary code you can take away. Tools that keep the app on their own platform bring back the risk Builder.ai customers have just lived through.",
    },
  ],
}
