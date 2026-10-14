import type { BlogPost } from "@/lib/blog/types"

export const webAppVsMobileApp: BlogPost = {
  slug: "web-app-or-mobile-app-first",
  title: "Web app or mobile app first?",
  series: "stack",
  topic: "Web vs mobile",
  description:
    "Web app vs mobile app: which to build first, how PWAs compare with native apps on iOS, where React Native and Flutter fit, and a simple checklist to decide.",
  summary:
    "Most B2B and SaaS products should start with a web app: it's cheaper, you can ship fixes the same day, and your customers already work in a browser. Go mobile first when the product depends on the camera, sensors, offline use, reliable push notifications or a daily consumer habit. You can add a mobile app later without starting again if you plan for it.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Default for B2B and SaaS", value: "Web app first" },
    { label: "Mobile first when", value: "Camera, offline, daily habit" },
    { label: "Middle ground", value: "PWA, weaker on iOS" },
    { label: "Mobile later with", value: "React Native or Flutter" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Should you build a web app or a mobile app first?",
      blocks: [
        {
          type: "paragraph",
          text: "Build the web app first unless the product genuinely can't work without a phone. For B2B tools, SaaS products, marketplaces and anything people use at a desk, a web app gets you to paying customers faster and for less money, and every lesson you learn costs a deploy instead of an app store review.",
        },
        {
          type: "paragraph",
          text: "The mistake we see most is building mobile first because apps feel more real. An app icon on a phone doesn't create demand. If your first customers will mostly sign up from a link in an email or a sales call, they'll open it in a browser, and a responsive web app that works well on a phone covers them.",
        },
      ],
    },
    {
      id: "differences",
      heading: "What is the difference between a web app and a mobile app?",
      blocks: [
        {
          type: "paragraph",
          text: "A web app runs in the browser from a URL, and a mobile app is installed from the App Store or Google Play. That one difference drives almost everything else:",
        },
        {
          type: "list",
          items: [
            {
              term: "Cost",
              text: "One web app runs on every device. Native mobile means an iOS app and an Android app, or one cross-platform codebase plus the store setup, signing and device testing on both. Either way it's more work than a single web app.",
            },
            {
              term: "Shipping updates",
              text: "A web fix is live the moment you deploy. A mobile fix goes through store review, which is usually quick but sometimes isn't, and then waits for users to update. A bad release can sit on people's phones for weeks.",
            },
            {
              term: "Store review and fees",
              text: "Apple and Google review every release and take a commission on digital goods and subscriptions sold inside the app. At the time of writing Apple's standard rate is 30%, or 15% under its small business programme, and Google has been restructuring its fees, so check the current terms for your region. Physical goods and real-world services are generally exempt.",
            },
            {
              term: "Discovery",
              text: "Web pages can rank in Google and be shared as a link. Store listings get found through store search, which is crowded, and every new user has to install before they can try anything.",
            },
            {
              term: "Device features",
              text: "Native apps get full access to the camera, Bluetooth, background location, health data and the rest. Browsers get a growing subset, with Safari on iOS supporting the least.",
            },
          ],
        },
      ],
    },
    {
      id: "when-mobile-first",
      heading: "When should you build the mobile app first?",
      blocks: [
        {
          type: "paragraph",
          text: "Go mobile first when the phone is the product, not just a screen size. In practice that means one of these is core to the main workflow, not a nice extra:",
        },
        {
          type: "list",
          items: [
            "Heavy camera use: scanning, video capture, image recognition on the device.",
            "Sensors and hardware: Bluetooth devices, NFC, step counting, background location tracking.",
            "Real offline use, such as field engineers or inspectors working in basements and on farms with no signal.",
            "Push notifications that have to arrive reliably, every time, on iPhone as well as Android.",
            "A consumer habit people return to several times a day, where a home screen icon and a quick open matter.",
          ],
        },
        {
          type: "paragraph",
          text: "Be honest about the list. A sales dashboard that would be nice to check on the train isn't mobile first. A delivery driver app that tracks location in the background and captures proof of delivery photos is.",
        },
      ],
    },
    {
      id: "pwa",
      heading: "Is a progressive web app a good middle ground?",
      blocks: [
        {
          type: "paragraph",
          text: "Often, yes, especially on Android. A progressive web app is a web app with a manifest and a service worker, so it can be installed to the home screen, open full screen, cache pages for offline use and send notifications. In the PWA vs native app question it gets you most of the way for a fraction of the cost, but iOS is where it falls short.",
        },
        {
          type: "paragraph",
          text: "On Android, Chrome prompts users to install a PWA and you can even list it on Google Play. On iPhone the picture at the time of writing looks like this:",
        },
        {
          type: "list",
          items: [
            "Web push works since iOS 16.4, but only for web apps the user has added to their Home Screen, and only after they tap something that asks for permission.",
            "Safari doesn't show an install prompt. Users have to find Share, then Add to Home Screen, and most won't unless you show them how.",
            "Since iOS 26, any site added to the Home Screen opens as a web app by default, which makes the install step a bit less confusing.",
            "There's no Web Bluetooth, no Web NFC and no background sync, so hardware and reliable background work are still native only.",
          ],
        },
        {
          type: "callout",
          title: "Apple sets the rules, and they change",
          text: "In early 2024 Apple announced it would remove Home Screen web apps for users in the EU, then reversed the decision weeks later. If your product depends on a PWA feature working on iPhone, test on current iOS before committing, and have a plan if it changes.",
        },
      ],
    },
    {
      id: "native-hybrid-cross-platform",
      heading: "Native, hybrid or cross-platform: which kind of mobile app?",
      blocks: [
        {
          type: "paragraph",
          text: "For most startups we'd pick cross-platform: React Native or Flutter, one codebase for iOS and Android, with near native performance and full device access. Fully native apps in Swift and Kotlin make sense when you need the very best of one platform, such as heavy graphics or deep integration with Apple Health, and can afford two teams.",
        },
        {
          type: "paragraph",
          text: "Hybrid means wrapping your web app in a native shell with something like Capacitor. It's the fastest way into the stores and gives you some native plugins, but the app still feels like a website in places, and Apple's review guidelines reject apps that are little more than a repackaged site. It's worth doing when you need a store listing quickly and the app adds something real, such as push or the camera. If you're weighing the two cross-platform options, our guide React Native vs Flutter for a startup app goes through that choice.",
        },
      ],
    },
    {
      id: "web-first-to-mobile",
      heading: "How do you go from web first to mobile later?",
      blocks: [
        {
          type: "paragraph",
          text: "Build the web app so a second client can plug into it later. If you do that, adding mobile is a new frontend, not a rebuild. The choices that make it easy are mostly made in the first few weeks:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Keep business logic on the server",
              text: "Pricing rules, permissions and anything that touches money belong in the API, not in React components. A mobile app then calls the same endpoints and gets the same answers.",
            },
            {
              term: "Use TypeScript end to end",
              text: "With a TypeScript web app, React Native lets you share types, validation schemas and API clients with the mobile app, and your developers already know React.",
            },
            {
              term: "Plan auth for more than cookies",
              text: "Browser sessions usually rely on cookies. A mobile app wants tokens it can store securely on the device, so pick an auth setup that supports both from the start.",
            },
            {
              term: "Check the payment rules early",
              text: "If you sell a digital subscription on the web through Stripe, find out what the stores require before you build the mobile app. The rules on in-app purchases and linking out to the web differ by store and region, and they have been changing.",
            },
            {
              term: "Build mobile around the mobile jobs",
              text: "Don't port every screen. Ship the two or three things people actually do on their phones, and leave settings, billing and admin on the web.",
            },
          ],
        },
      ],
    },
    {
      id: "checklist",
      heading: "A simple checklist: web or mobile first?",
      blocks: [
        {
          type: "paragraph",
          text: "Answer these in order. If you reach the end with no yes, build the web app first.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Does the core workflow need the camera, Bluetooth, NFC or background location? If yes, go mobile first.",
            "Will users regularly be offline when they need the app? If yes, go mobile first.",
            "Does the product fail if a notification doesn't arrive on an iPhone? If yes, go mobile, or at least test a PWA on iOS very carefully.",
            "Is it a consumer product people should open several times a day? If yes, lean mobile, possibly with a PWA to test demand.",
            "Do your first customers find you through search, links or a sales call, and use the product at work? If yes, that's another point for web first.",
          ],
        },
        {
          type: "paragraph",
          text: "At Scryptic we usually start founders on a web app built with TypeScript, Next.js and Postgres, for the reasons above, and full builds start from £10,000 depending on complexity. Keeping the logic on the server and the code in TypeScript is what keeps the mobile option open.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is a web app cheaper than a mobile app?",
      answer:
        "Usually, yes. One web app works on every device, while mobile needs iOS and Android builds, store accounts, review cycles and device testing. A cross-platform framework narrows the gap but doesn't close it.",
    },
    {
      question: "Can a progressive web app replace a native app?",
      answer:
        "For many business tools and content apps, yes, particularly on Android. On iPhone, web push only works once the user adds the app to their Home Screen, there's no install prompt, and hardware access is limited. If the product depends on those things, build native or cross-platform.",
    },
    {
      question: "Do web apps work on phones?",
      answer:
        "Yes. A responsive web app runs in Safari or Chrome on any phone and can be saved to the home screen. For most B2B and SaaS products that covers mobile users well until there's a clear reason for an installed app.",
    },
    {
      question: "Should I use React Native or Flutter for the mobile version?",
      answer:
        "If your web app is in React and TypeScript, React Native is usually the better fit, because you can share types, validation and API code and your developers already know React. Flutter is a strong choice for a mobile-only team starting from scratch.",
    },
    {
      question: "Do I have to pay Apple and Google a commission?",
      answer:
        "Only on digital goods and subscriptions sold inside the app, and the rates vary by store, programme and region. Physical goods and real-world services are generally exempt. Both stores also charge a developer account fee to publish.",
    },
  ],
}
