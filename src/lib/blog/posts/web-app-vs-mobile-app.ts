import type { BlogPost } from "@/lib/blog/types"
import { mvp } from "@/lib/services"

export const webAppVsMobileApp: BlogPost = {
  slug: "web-app-or-mobile-app-first",
  title: "Web app or mobile app first?",
  series: "stack",
  topic: "Web vs mobile",
  description:
    "Build the web app first unless the phone is the product. A one-table decision guide to web, PWA, React Native or native for your first release.",
  summary:
    "Build a web app first unless your product can't work without a phone. Go mobile first only when the camera, sensors, offline use, reliable push notifications or a several-times-a-day consumer habit sit at the heart of the product. Everything else starts on the web, built so a mobile app can be added later.",
  datePublished: "2026-10-14",
  sections: [
    {
      id: "verdict",
      heading: "The verdict",
      blocks: [
        {
          type: "paragraph",
          text: "Build the web app first. For B2B tools, SaaS products, marketplaces and anything people use at a desk, a web app reaches paying customers sooner and for less money, and every lesson you learn costs a deploy instead of an app store review.",
        },
        {
          type: "paragraph",
          text: "The reasons are practical. One web app runs on every device, while mobile means iOS and Android builds, developer accounts, store review and testing on real phones. A web fix is live the moment you ship it; a mobile fix waits for review and then for users to update. Web pages can be found in Google and shared as a link, while every mobile user has to install something before they can try anything. And Apple and Google take a commission on digital subscriptions sold inside an app, so check the current terms for your region before you price.",
        },
        {
          type: "paragraph",
          text: "The mistake we see most is going mobile first because an app feels more real. An icon on a phone doesn't create demand. If your first customers will sign up from an email, a search or a sales call, they'll open a browser, and a responsive web app that works well on a phone covers them.",
        },
        {
          type: "paragraph",
          text: "The exception is when the phone is the product rather than a screen size. A sales dashboard that's nice to check on the train is not mobile first. A delivery driver app that tracks location in the background and captures proof of delivery photos is.",
        },
      ],
    },
    {
      id: "decision-table",
      heading: "Find your row",
      blocks: [
        {
          type: "paragraph",
          text: "Go down the table and stop at the first row that is true of your core workflow, not of a nice-to-have feature. If none of them fits, the answer is a web app.",
        },
        {
          type: "table",
          caption: "What to build first, depending on what the product needs",
          columns: ["If the core workflow needs", "Then build", "Why"],
          rows: [
            ["Bluetooth, NFC or background location", "A mobile app", "Browsers can't do these on iPhone"],
            ["Reliable offline use in the field", "A mobile app", "Proper offline storage and sync are far easier natively"],
            ["Heavy camera work, like scanning or video", "A mobile app", "Native camera access is faster and more dependable"],
            ["Push that must arrive on every iPhone", "A mobile app", "iOS web push only works once the user adds the app to the Home Screen"],
            ["A daily consumer habit", "A PWA to test demand, then mobile", "A home screen icon matters, but prove the habit cheaply first"],
            ["Mostly Android users and light offline needs", "A PWA", "Chrome prompts users to install it, and it can be listed on Google Play"],
            ["A store listing quickly, plus push or the camera", "A web app wrapped with Capacitor", "Fastest route into the stores, if the app adds something a website can't"],
            ["Desk work, a B2B tool or a SaaS product", "A web app", "Customers already work in a browser"],
            ["Customers who find you through search or links", "A web app", "Web pages rank and share, store listings don't"],
            ["None of the above", "A web app", "Cheapest, fastest and easiest to change"],
          ],
        },
        {
          type: "paragraph",
          text: "When the table does point to mobile, we'd usually pick cross-platform, React Native or Flutter, for one codebase across iOS and Android with full device access. Separate Swift and Kotlin apps only make sense when you need the very best of one platform and can afford two teams.",
        },
        {
          type: "paragraph",
          text: `When it points to the web, build so mobile can follow. Keep pricing, permissions and anything touching money on the server, where a future app can call the same endpoints. Use TypeScript throughout so React Native can share types and validation later. Choose sign-in that supports tokens as well as browser cookies. Do those three things and a mobile app becomes a new frontend rather than a rebuild. It's the reason we start most founders on TypeScript, Next.js and Postgres, for builds from ${mvp.price} upwards.`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is a web app cheaper than a mobile app?",
      answer:
        "Usually, yes. One web app works on every device, while mobile needs iOS and Android builds, store accounts, review cycles and device testing. A cross-platform framework such as React Native or Flutter narrows the gap but doesn't close it.",
    },
    {
      question: "Can a progressive web app replace a native app?",
      answer:
        "For many business tools and content apps, yes, particularly on Android. On iPhone, web push only works once the user adds the app to their Home Screen, Safari shows no install prompt, and there's no Web Bluetooth or Web NFC. If the product depends on those things, build native or cross-platform.",
    },
    {
      question: "Do web apps work on phones?",
      answer:
        "Yes. A responsive web app runs in Safari or Chrome on any phone and can be saved to the home screen. For most B2B and SaaS products that covers mobile users well until there's a clear reason for an installed app.",
    },
  ],
}
