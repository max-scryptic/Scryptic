import pwaSaveStates from "@/assets/blog/images/pwa-save-states.webp"
import type { BlogPost } from "@/lib/blog/types"

export const pwaDevelopment: BlogPost = {
  slug: "pwa-development",
  title: "PWA development without the unnecessary extras",
  series: "launch",
  topic: "PWAs",
  description:
    "PWA development adds installing, offline use and notifications to a web app. What to build first, what a PWA can't do and what to test before launch.",
  summary:
    "PWA development adds browser features such as installing to the home screen, working offline and sending notifications to a web app. Build only the ones your users need to finish their task. A PWA is still a website underneath, so don't expect it to do everything a native mobile app can.",
  datePublished: "2026-10-25",
  facts: [
    { label: "Built from", value: "Manifest, service worker, HTTPS" },
    { label: "Hardest to get right", value: "Offline editing and sync" },
    { label: "Our fixed-price MVP", value: "From £10,000 + VAT" },
  ],
  sections: [
    {
      id: "what-it-adds",
      heading: "What does PWA development add to a web app?",
      blocks: [
        {
          type: "paragraph",
          text: "It adds a few browser features on top of a web app that already works. It doesn't replace building that app. You still need the screens, the business rules, the database and any payments or integrations, exactly as you would for any other web app.",
        },
        {
          type: "paragraph",
          text: "Three pieces do the PWA part. A web app manifest gives the browser the app's name and icons so it can be installed. A service worker sits between the app and the network, keeping copies of files and answering some requests when there's no connection. And the app has to be served over HTTPS, because browsers won't run a service worker without it.",
        },
        {
          type: "paragraph",
          text: "None of that makes every screen work offline by itself, and an install icon won't rescue an app that's slow or confusing. If people can't finish the main task in an ordinary browser tab, fix that first. Giving them another way to open it won't help.",
        },
      ],
    },
    {
      id: "pwa-limits",
      heading: "Can a PWA do everything a mobile app can?",
      blocks: [
        {
          type: "paragraph",
          text: "No. A PWA handles a lot of everyday app tasks, but what it can reach on the device, and what it can do in the background, depends on the browser and operating system. These are the requirements where that matters most.",
        },
        {
          type: "table",
          caption: "Five common app requirements, what to watch for in a PWA and what to check before you commit",
          columns: ["Requirement", "What to watch for in a PWA", "What to check"],
          rows: [
            ["Home screen icon", "Installing works differently in each browser", "The steps your users' browsers actually show"],
            ["Working offline", "Has to be designed in, screen by screen", "Which data people can read offline and which they can edit"],
            ["Push notifications", "Support and permission rules vary", "The devices, whether the app must be installed, and consent"],
            ["Background uploads", "Can be paused or stopped when the app closes", "What happens if someone closes the app mid-upload"],
            ["Specialist hardware", "Browser support may be patchy or missing", "The exact device and the browser feature it needs"],
          ],
        },
        {
          type: "paragraph",
          text: "If the product depends on continuous background tracking or a connection to a particular device, prove that works before you pay for the full build. A demo in a desktop browser doesn't count. It needs to run on the phones your users actually carry.",
        },
        {
          type: "paragraph",
          text: "If you haven't settled on a web app or a native one yet, read our guide on whether to build a web app or a mobile app first. Decide that before you pay for features your platform can't reliably support.",
        },
      ],
    },
    {
      id: "first-release",
      heading: "Which PWA features belong in the first release?",
      blocks: [
        {
          type: "paragraph",
          text: "Only the ones that remove a real obstacle from the main user journey. The browser allows plenty more, but every feature adds build and testing time.",
        },
        {
          type: "paragraph",
          text: "Say you're building an app for tenants to report repairs. A tenant opens a link, describes the problem, adds a photo and sends it. Most of them will have a signal at home, so a clear confirmation and a photo upload that doesn't fail matter far more than an install button or push notifications.",
        },
        {
          type: "paragraph",
          text: "Now picture an inspection tool used in basements and plant rooms with no reception. Keeping a half-finished inspection on the device might be essential there, and that one requirement changes the data model, the interface and the testing. Offline support isn't a setting you switch on at the end.",
        },
        {
          type: "paragraph",
          text: "For each feature someone proposes, write down three things:",
        },
        {
          type: "list",
          items: [
            { term: "The obstacle.", text: "What stops the user finishing their task today?" },
            {
              term: "The behaviour you need.",
              text: "What should happen when the connection drops, a permission is refused or the user never installs the app?",
            },
            { term: "What can wait.", text: "Which parts can sit until the user is back online?" },
          ],
        },
        {
          type: "paragraph",
          text: "If nobody can name the obstacle, leave the feature out for now. An install prompt on someone's first visit usually gets in the way of the thing they came to do.",
        },
      ],
    },
    {
      id: "before-launch",
      heading: "What needs to happen before a PWA is ready to launch?",
      blocks: [
        {
          type: "paragraph",
          text: "The main journey has to work on the devices you agreed, failures have to be obvious to the user, and an update must never put someone's work at risk. A demo on the developer's laptop proves none of that. The checks below turn a feature list into something you can accept or send back.",
        },
        {
          type: "image",
          image: pwaSaveStates,
          alt: "Three boxes labelled local draft, waiting and server saved, joined by arrows, with a broken link icon above the waiting stage.",
          caption: "Saved on the phone, waiting for a signal and saved on the server are three different states. The user should always be able to tell which one they're in.",
        },
        { type: "subheading", text: "Decide what happens without a connection" },
        {
          type: "paragraph",
          text: "Treat viewing, editing and submitting as three separate promises. Showing a page the user already loaded is easy compared with accepting new work offline and sending it later.",
        },
        {
          type: "paragraph",
          text: "For the inspection tool, the acceptance test might run like this:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Open an assigned inspection while connected.",
            "Switch to airplane mode and add a finding.",
            "Close the app, reopen it and check the finding is still there.",
            "Reconnect and submit.",
            "Check the server holds exactly one copy of the finding and the user sees a receipt.",
          ],
        },
        {
          type: "paragraph",
          text: "If offline submission isn't in the agreed scope, the interface should say so. \"Saved on this device\" and \"Submitted\" must never look the same.",
        },
        { type: "subheading", text: "Agree what happens when two edits clash" },
        {
          type: "paragraph",
          text: "Two people can change the same record before either sees the other's edit. Decide up front whether the app rejects the older edit, asks someone to choose or follows some other written rule. Quietly overwriting one person's work shouldn't be the default.",
        },
        {
          type: "paragraph",
          text: "Uploads need the same thought. If the connection drops just after the server receives a request, the user can't tell whether it worked, so they try again. That retry must not create a second report, booking or payment.",
        },
        { type: "subheading", text: "Test updates, not just first visits" },
        {
          type: "paragraph",
          text: "Because a PWA caches its files, an older version of the interface can keep running after you've deployed new code. Test someone who already has the app open going through an update, as well as a fresh visit in a clean browser.",
        },
        {
          type: "paragraph",
          text: "Check what happens if they have unsaved work when the new version arrives. A prompt to update is fine; reloading the page halfway through a form is not. For a while after each release, old cached screens will also be talking to the new server, so the two need to get along.",
        },
        { type: "subheading", text: "Check shared devices and sensitive data" },
        {
          type: "paragraph",
          text: "Offline storage puts another copy of your data on the device. Decide what goes there, how long it stays and what happens when someone signs out. On a shared tablet, the next person shouldn't be able to see the last person's records.",
        },
        {
          type: "paragraph",
          text: "Permissions still have to be checked on the server. Hiding a button protects nothing, whether the app is installed or open in a browser tab.",
        },
        { type: "subheading", text: "Test on real devices" },
        {
          type: "paragraph",
          text: "Before development starts, agree with whoever is building your PWA which browsers and operating systems it has to support. Then run the main journey on each of them, including refused permissions, dropped connections and people coming back a second time.",
        },
        {
          type: "paragraph",
          text: "Keep the brief specific. \"Works offline\" can mean almost anything. \"An inspector can reopen an unfinished inspection without a signal on the agreed devices\" is something both of you can test.",
        },
      ],
    },
    {
      id: "where-scryptic-fits",
      heading: "Can Scryptic build your first PWA release?",
      blocks: [
        {
          type: "paragraph",
          text: "Often, yes. We build and launch web apps and SaaS MVPs for UK founders, and on the discovery call we check whether the PWA features you need fit a fixed-price sprint. Making an app installable is a small job. Offline editing with sync is a much bigger one, and if it won't fit, we'll say so before you commit to anything.",
        },
        {
          type: "table",
          caption: "Scryptic's two fixed-price MVP packages, with the price, the sprint and what follows launch",
          columns: ["Package", "Fixed price", "Sprint", "After launch"],
          rows: [
            ["MVP", "£10,000 + VAT", "2 weeks: 1 of development, 1 of changes from your feedback", "1 week of bug fixes and support"],
            ["Extended MVP", "£20,000 + VAT", "3 weeks: 2 of development, 1 of changes from your feedback", "1 week of bug fixes and support"],
          ],
        },
        {
          type: "paragraph",
          text: "You work directly with our founder. We agree the scope and price before building starts, then go through progress and priorities on a call every Friday. The code lives in your repository and the accounts are in your name, and both are handed over at launch.",
        },
        {
          type: "paragraph",
          text: "Already have a prototype? We review the existing code and infrastructure during discovery and tell you what's worth keeping.",
        },
        {
          type: "paragraph",
          text: "Bring your main user journey, the devices your users have and any offline requirement to a free 30 minute discovery call. It's far better to talk through the awkward browser behaviour while we're agreeing the scope than to run into it halfway through the build.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do PWAs work on iPhone?",
      answer:
        "Yes, with limits. Safari never shows an install prompt, so people add the app from the Share menu, and web push notifications only work once it has been added to the Home Screen. Test the features you need on the iPhones your users actually have.",
    },
    {
      question: "Does a PWA need to be in the App Store or Google Play?",
      answer:
        "No. People open it from a link and can add it to their home screen, so there is no store listing or review to get through. If you need a store listing, a PWA can be packaged for Google Play, but Apple tends to reject apps that are little more than a website in a wrapper.",
    },
    {
      question: "Is a PWA cheaper than a native app?",
      answer:
        "Usually, because one codebase covers phones, tablets and desktops and there is no app store release process. The saving shrinks as you add offline editing and device features, which is why we scope those separately. Our MVP package is £10,000 plus VAT for a two week sprint.",
    },
  ],
}
