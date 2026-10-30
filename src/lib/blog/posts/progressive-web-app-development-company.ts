import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const progressiveWebAppDevelopmentCompany: BlogPost = {
  slug: "progressive-web-app-development-company",
  title: "Choosing a progressive web app development company",
  series: "launch",
  topic: "PWA development",
  icon: "download",
  description:
    "Choose a PWA development company by testing offline saves, browser support and code ownership, not the PWA label. Compare five routes and what to ask.",
  summary:
    "Choose the progressive web app development company that can show you the browser behaviour your product needs, ship a usable first release and leave you owning the code. You are buying a working user journey, not a promise that your website will feel like an app. For a lot of first releases, the honest answer is that you need very little PWA work at all.",
  datePublished: "2026-10-24",
  dateModified: "2026-10-28",
  facts: [
    { label: "Routes compared", value: "5" },
    { label: "Hardest part to get right", value: "Saving work offline" },
    { label: "Best single test", value: "Drop the connection mid-task" },
  ],
  sections: [
    {
      id: "what-a-pwa-is",
      heading: "What does a PWA development company actually build?",
      blocks: [
        {
          type: "paragraph",
          text: "A PWA development company builds a web app that can also be installed to a phone or desktop, keep files on the device and carry on working when the connection drops. Which of those it does, and on which devices, is up to the design. The label on its own tells you very little.",
        },
        {
          type: "paragraph",
          text: "That matters because the browsers don't all support the same things. On Android, Chrome offers to install a PWA and supports most of the features people expect. On iPhone, Safari shows no install prompt, web push notifications only work after the user adds the app to their Home Screen, and there is no Bluetooth or NFC from the browser at all. An app described as a PWA might work offline, or it might just have an icon.",
        },
        {
          type: "paragraph",
          text: "This is our guide, so we include ourselves in the comparison below. That doesn't mean every PWA requirement fits our packages; the ones that need checking, we check on discovery calls before quoting.",
        },
      ],
    },
    {
      id: "do-you-need-one",
      heading: "Do you need a PWA at all?",
      blocks: [
        {
          type: "paragraph",
          text: "Often not for a first release. If your customers open the product now and then, have a connection and complete one short task, an ordinary web app that is easy to use on a small screen is all they need. Installation and offline working can wait until users give you a reason to add them.",
        },
        {
          type: "paragraph",
          text: "At the other end, if the product depends on something the target browsers cannot do reliably, such as background location or Bluetooth on iPhone, build a native or cross-platform app rather than forcing the workflow into a PWA.",
          link: { text: "Web app or mobile app first? The decision, row by row.", href: "/blog/web-app-or-mobile-app-first" },
        },
        {
          type: "paragraph",
          text: "A PWA earns its place in between: people come back to it often, a home screen icon helps, and some of the work has to survive a weak signal. Pick the platform for the task, not for the appeal of an app icon.",
          link: { text: "What each PWA feature involves and adds to a build.", href: "/blog/pwa-development" },
        },
      ],
    },
    {
      id: "routes-compared",
      heading: "Which kind of company should you shortlist?",
      blocks: [
        {
          type: "paragraph",
          text: "Shortlist by the hardest thing your app has to do. The table compares the five usual routes by what they suit, the proof to ask each one for and where each one falls short. It's a way to compare offers, not a ranking of agencies.",
        },
        {
          type: "table",
          caption: "Five ways to get a progressive web app built, compared by best fit, the evidence to ask for and the main constraint",
          columns: ["Route", "Best fit", "PWA evidence to ask for", "Main constraint"],
          rows: [
            ["Specialist PWA agency", "Complex offline workflows", "A demo of that behaviour in the browsers you need", "Scope and delivery terms vary widely"],
            ["Scryptic (us)", "A scoped first web app release", "A feasibility check of the behaviour you need, before the build", "PWA features have to fit the agreed scope"],
            ["Independent developer", "Working directly with the person building it", "Working examples and a test plan", "One person's availability and skill set"],
            ["Your existing supplier", "Adding to an app that already works", "An audit of how the app caches and stores data", "The current architecture may need changes"],
            ["In-house team", "Continuous product development", "The right skills and the time to use them", "Recruiting and managing developers becomes your job"],
          ],
        },
        {
          type: "paragraph",
          text: "A specialist agency makes sense when offline work is the core of the product rather than a nice extra. An independent developer suits a founder who wants direct access and can judge the approach they propose. Your existing supplier deserves a look first if it already knows your app and your data.",
        },
        {
          type: "paragraph",
          text: "An in-house team is right when the product needs engineering every month, but hiring permanently is a different commitment from paying for a tightly scoped first release. Whichever names end up on your shortlist, ask them all for the same evidence. A polished portfolio can't show you whether an app loses a half-finished form when the connection drops.",
        },
      ],
    },
    {
      id: "what-to-test",
      heading: "What should a PWA company prove before you sign?",
      blocks: [
        {
          type: "paragraph",
          text: "Ask each company to show you what happens when the connection drops halfway through a task: what the user sees, where their data sits and how the app recovers. That one question separates suppliers faster than any feature list. Field work is the classic case, where a form or a survey gets filled in somewhere the signal comes and goes, but the same question applies to any app people use on the move.",
        },
        { type: "subheading", text: "An installable app is not an offline app" },
        {
          type: "paragraph",
          text: "A web app can be installed from the home screen and still need a connection to load records or save anything. Ask the company to separate three things: caching the interface so the app opens, showing information the user already loaded, and accepting new work while offline. Each one is a separate requirement, with its own build and testing cost.",
        },
        {
          type: "paragraph",
          text: "Turn the one you need into a test you can run yourself. For example: open a record while connected, switch to airplane mode, reopen the app and check what is still there. If the first release only works online, the proposal should say so plainly, so your users don't find out the hard way.",
        },
        { type: "subheading", text: "Saving offline means keeping track of two copies" },
        {
          type: "paragraph",
          text: "\"We'll sync it later\" is not a design. Saved on the phone and saved on the server are two different states, and the user needs to know which one they are in.",
        },
        {
          type: "paragraph",
          text: "Ask what happens when someone closes the app before it uploads, taps submit twice, or edits a record somebody else changed in the meantime. A retry must never quietly create a second booking, order or report.",
        },
        {
          type: "paragraph",
          text: "A good proposal describes pending, successful and failed saves. Where two people can change the same thing, it says whether the app prevents the clash, asks the user to choose or follows a written rule. You may not need full sync in the first release, but someone needs to have decided that on purpose.",
        },
        {
          type: "paragraph",
          text: "Ask, too, how long unsent work can safely wait on the device. Browsers can clear stored data when a device runs low on space, and Safari can clear a site's data after a week without a visit unless it was added to the Home Screen. Drafts should reach the server as soon as there is a signal.",
        },
        { type: "subheading", text: "Browser support needs a written test list" },
        {
          type: "paragraph",
          text: "\"Works on mobile\" is too vague to put in a contract. Ask which browsers and operating systems are covered, and whether testing includes the app installed as well as in an ordinary browser tab.",
        },
        {
          type: "paragraph",
          text: "Install prompts, notification permissions and background behaviour differ between browsers. The Background Sync API, which lets an app finish an upload after the user has closed it, works in Chrome and Edge but not in Safari or Firefox at the time of writing. So a feature that works in a demo on one phone can behave differently for your customers.",
        },
        {
          type: "paragraph",
          text: "Start from the browsers your users actually have. If you don't know yet, write that down as an assumption. Then ask the supplier to name what won't work and what happens instead. A clear limitation is worth more than a blanket promise of compatibility.",
        },
        { type: "subheading", text: "Check notifications and device access separately" },
        {
          type: "paragraph",
          text: "If reminders are essential, ask for a demo of the notification flow on the phones you are targeting, including what happens when someone taps \"Don't allow\". The app still needs a sensible path for the people who say no.",
        },
        {
          type: "paragraph",
          text: "The same goes for the camera, location, Bluetooth and anything else on the device. Support and restrictions vary, so \"PWAs can do that\" is not proof that your workflow will work. Where a feature is uncertain, pay for a short technical check before committing to the full build. Finding a browser limit early is far cheaper than finding it once the rest of the product depends on it.",
        },
        { type: "subheading", text: "Plan for security and updates" },
        {
          type: "paragraph",
          text: "Offline access can leave business data sitting on a phone. Ask what is stored, what happens when someone signs out and whether sensitive information needs to be available offline at all.",
        },
        {
          type: "paragraph",
          text: "Cached app files also need an update plan. Ask what happens when you release a new version while someone has the old one open: stale screens, changed data formats and any work they haven't sent yet. You don't need to pick the technical solution yourself. You do need the supplier to explain it in plain terms and turn the important behaviours into tests you can watch before you accept the release.",
        },
      ],
    },
    {
      id: "acceptance-brief",
      heading: "What should your brief to every supplier include?",
      blocks: [
        {
          type: "paragraph",
          text: "Send every company the same short brief built around one workflow you can test. Quotes are only comparable when they describe the same outcome, and a feature list headed \"modern PWA\" gives each supplier room to price something different.",
        },
        {
          type: "paragraph",
          text: "Start from the user, the task and what must work at launch, as you would for any web app.",
          link: { text: "How to define the task at the heart of the brief.", href: "/blog/how-to-build-a-web-app" },
        },
        {
          type: "paragraph",
          text: "Then add the two things a PWA brief can't do without:",
        },
        {
          type: "list",
          items: [
            { term: "The conditions", text: "The browsers and devices, how often the connection drops and whether devices are shared." },
            { term: "Checks you can watch", text: "A dropped connection, a retry, signing out and an app update, wherever they apply." },
          ],
        },
        {
          type: "paragraph",
          text: "Ask each company to send back its assumptions and exclusions with the price. One quote may cover viewing records offline while another includes editing and sync. Both say \"PWA development\", but they are not the same offer.",
        },
        {
          type: "paragraph",
          text: "Where you can, ask for a walkthrough of a similar app that is already live. If client confidentiality rules that out, ask how they can show the same behaviour without exposing anyone's data. Screenshots won't answer any of these questions.",
        },
        {
          type: "paragraph",
          text: "The rest of the vetting, from who writes the code to whose name the accounts are in, is the same for any app.",
          link: {
            text: "The general questions to ask any app developer.",
            href: "/blog/how-to-choose-an-app-development-company-uk",
          },
        },
      ],
    },
    {
      id: "where-scryptic-fits",
      heading: "Which PWA work fits a Scryptic sprint?",
      blocks: [
        {
          type: "paragraph",
          text: "Making the app installable, yes: that is a small job on a modern framework. Offline editing with sync is a large one, and like background processing and some device integrations it may not fit a short sprint, so we check those requirements on the discovery call before we agree the build.",
        },
        {
          type: "paragraph",
          text: "The two packages differ in development time, which is what offline work uses up. Both are fixed price, and in both the build is followed by a week of changes from your feedback and a handover week after launch.",
        },
        {
          type: "table",
          caption: "How much development time each Scryptic package gives a PWA build, with its fixed price and the weeks that follow",
          columns: ["Package", "Fixed price", "Development time", "Then"],
          rows: [
            ["MVP", `${mvp.price} + VAT`, "1 week", "1 week of changes, then 1 handover week after launch"],
            ["Extended MVP", `${extendedMvp.price} + VAT`, "2 weeks", "1 week of changes, then 1 handover week after launch"],
          ],
        },
        {
          type: "paragraph",
          text: "The code lives in a repository you own and the accounts move to you at launch, so whoever works on the app next can pick it up straight away.",
        },
      ],
    },
    {
      id: "decision",
      heading: "Which route should you choose?",
      blocks: [
        {
          type: "paragraph",
          text: "Choose the route that is strongest at the hardest part of your product. Price and portfolio come after that.",
        },
        {
          type: "list",
          items: [
            {
              term: "A specialist PWA company",
              text: "If the product's value depends on demanding offline work or browser features. Ask to see that behaviour working on your users' devices.",
            },
            {
              term: "Scryptic",
              text: "If you need a scoped web app MVP, direct access to the developer and a fixed-price launch sprint. Check the PWA behaviour you need fits first.",
            },
            {
              term: "An independent developer",
              text: "If you want to work directly with one person and can check their skills, availability and handover plans.",
            },
            {
              term: "Your existing supplier",
              text: "If an audit shows the current app can take the changes sensibly. A rebuild should fix a real problem, not just replace code nobody likes.",
            },
            {
              term: "An in-house team",
              text: "If the business needs steady product engineering and can take on recruiting and managing developers.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Before you sign, ask your preferred supplier to walk you through the worst failure in your brief, such as a form submitted twice on a dropping connection. Their answer will tell you more than another page of technology logos.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Does a progressive web app work offline?",
      answer:
        "Only as far as it was built to. Some PWAs cache their screens or the content you have already viewed; others let you add or edit data offline and sync it later. Write down exactly which tasks must work without a connection and test them before you accept the app.",
    },
    {
      question: "Can an existing website become a PWA?",
      answer:
        "Sometimes. Making a site installable is usually a contained job, while handling data offline can mean substantial changes to the app. Get the existing code, sign-in and data flows reviewed before you accept a conversion quote.",
    },
    {
      question: "How much does PWA development cost?",
      answer:
        `It depends on the workflow, any app you already have and the browser behaviour you need, and offline editing with sync costs far more than installability alone. Our fixed-price packages start at ${mvp.price} plus VAT, and we check which PWA features fit that scope before the build starts.`,
    },
    {
      question: "What support should be agreed before launch?",
      answer:
        "Agree who fixes bugs, who has deployment access, who handles browser changes and who does future development, and what falls outside the contract. Our packages include one week of bug fixes and support after launch; it is a handover week, not an ongoing maintenance plan.",
    },
  ],
}
