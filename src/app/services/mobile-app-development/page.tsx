import Link from "next/link"

import { PageJsonLd } from "@/components/json-ld"
import type { AppLayer } from "@/components/landing/app-layers"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FaqSection, type Faq } from "@/components/landing/faq-section"
import { GuidesSection } from "@/components/landing/guides-section"
import { LandingHero } from "@/components/landing/hero"
import { MobileAppVisual } from "@/components/landing/hero-visuals"
import type { IconName } from "@/components/landing/icons"
import { PlatformSection } from "@/components/landing/mobile-sections"
import { ReleaseSection, type ReleaseStep } from "@/components/landing/release-phone"
import { PricingSection } from "@/components/landing/pricing-section"
import { calendarPackage, ProcessSection } from "@/components/landing/process-section"
import {
  FitCheckSection,
  HubSection,
  LayersSection,
  OptionsSection,
  type OptionRow,
} from "@/components/landing/service-sections"
import { ScrollReveal } from "@/components/scroll-reveal"
import { postsBySlug } from "@/lib/blog"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, pages } from "@/lib/seo"
import { extendedMvp, launchOffer, mvp, offerPrice, services } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { mobileTools } from "@/lib/stack"
import { founder } from "@/lib/team"
import { faqJsonLd, serviceJsonLd } from "@/lib/structured-data"

const page = pages.mobileAppDevelopment

export const metadata = createMetadata(page)

// The kinds of mobile app we build, each centred on one job. The first three
// sit left of the product in the hub, the last three right.
const kinds = [
  { icon: "users", name: "Customer apps", text: "Customers book, order and pay from their phone", tag: "Customers" },
  { icon: "flow", name: "Booking apps", text: "Slots, reminders and changes in one place", tag: "Bookings" },
  { icon: "file", name: "Field team apps", text: "Photos, forms and sign-offs captured on site", tag: "Field" },
  { icon: "card", name: "Subscription apps", text: "Paid plans sold through the stores", tag: "Billing" },
  { icon: "link", name: "Companion apps", text: "The phone side of your web product, same accounts", tag: "Sync" },
  { icon: "spark", name: "AI features", text: "The camera or voice feeding a model, its output checked", tag: "AI" },
] satisfies { icon: IconName; name: string; text: string; tag: string }[]

// The two platforms, each a native app of its own with a section of its own.
// Only claims every build delivers.
const platforms = {
  ios: {
    summary:
      "iPhone apps written in Swift, Apple's own language, using Apple's frameworks for the camera, location, notifications and payments.",
    points: [
      "Native Swift code in your repository",
      "Submitted to App Store review from your Apple Developer account",
      "In-app purchase wherever Apple's rules require it",
    ],
  },
  android: {
    summary:
      "Android apps written in Kotlin, the language Google recommends for Android, using Google's own libraries for the same device features.",
    points: [
      "Native Kotlin code in your repository",
      "Submitted to Google Play from your Play Console account",
      "Google Play Billing wherever Google's rules require it",
    ],
  },
}

// From the first build to the stores, as the phone in the release section shows it.
const releaseSteps: ReleaseStep[] = [
  {
    id: "build",
    name: "Built natively",
    text: "Swift for iPhone and Kotlin for Android, in your repository, with a demo every Friday.",
  },
  {
    id: "test",
    name: "Tested on real phones",
    text: "Test builds go out through TestFlight and Google Play's testing tracks, so you use the app on your own phone first.",
  },
  {
    id: "submit",
    name: "Submitted for review",
    text: "From your Apple Developer and Play Console accounts, with the listing, screenshots and privacy details filled in.",
  },
  {
    id: "review",
    name: "Approved by Apple and Google",
    text: "They set the review times, so the launch date allows for them, and we answer any questions the reviewers ask.",
  },
  {
    id: "live",
    name: "Live in the stores",
    text: "Your app, under your company's name, ready for customers to install.",
  },
]

// A mobile app as layers, top to bottom, and what each one is built with.
const layers: AppLayer[] = [
  { icon: "screen", from: "Screens", to: "Swift on iOS, Kotlin on Android", check: "Native on each", ghost: true },
  { icon: "flow", from: "Business rules", to: "Tested code on your server", check: "Tests pass" },
  { icon: "users", from: "Users and roles", to: "Sign-in and permissions", check: "Every role tested" },
  { icon: "card", from: "Payments", to: "In-app purchase or Stripe", check: "Store rules met" },
  { icon: "database", from: "Data", to: "Postgres, backed up", check: "A backup restored" },
  { icon: "lock", from: "Signing keys", to: "Kept where you control them", check: "Yours to update" },
  { icon: "globe", from: "Release", to: "App Store and Google Play", check: "From your accounts" },
]

// The self-check in the fit section. The ones in fitInitial start ticked.
const fitChecks = [
  "The app needs the phone itself: camera, location or notifications",
  "Your users expect to find you in the app stores",
  "One journey matters most",
  "You have, or can open, Apple and Google developer accounts",
  "You can join a call every Friday",
]
const fitInitial = [0, 2, 4]

// Price ranges for the other routes are the ones quoted in the app cost guide.
const optionColumns = ["What you get", "Price", "Time to first release", "Who owns it"]
const options: OptionRow[] = [
  {
    name: `${siteConfig.name} native sprint`,
    cells: [
      "Native Swift and Kotlin code, submitted to the stores from your accounts",
      `${mvp.price} or ${extendedMvp.price} + VAT, fixed before the build`,
      "2 or 3 weeks, then a week of support, plus store review",
      "You, from launch day",
    ],
  },
  {
    name: "Small UK app studio",
    cells: [
      "Usually one shared codebase for both platforms, with design and project management",
      "Roughly £25,000 to £60,000 or more",
      "Around 10 to 16 weeks",
      "Usually you, but check the contract",
    ],
  },
  {
    name: "Freelance developer",
    cells: [
      "One developer's time, with the scope and testing set by you",
      "Roughly £5,000 to £25,000",
      "Depends on their other clients",
      "Check the contract",
    ],
  },
  {
    name: "No-code app builder",
    cells: [
      "An app built and published through the builder's platform",
      "Hundreds of pounds plus your time",
      "Days to weeks of your own time",
      "The platform, so leaving often means a rebuild",
    ],
  },
]

const guides = postsBySlug([
  "mobile-app-development",
  "web-app-or-mobile-app-first",
  "react-native-vs-flutter",
  "hybrid-apps",
  "how-much-does-it-cost-to-build-an-app-uk",
  "how-to-choose-an-app-development-company-uk",
])

const tools = [freeTool("app-launch-checklist"), freeTool("mvp-cost-calculator")]

// Rendered in the FAQ section and emitted as FAQPage JSON-LD; keep them identical.
// Worded for this page rather than copied from the other service pages.
const faqs: Faq[] = [
  {
    question: "What does a mobile app development company do?",
    answer:
      "It designs, builds and releases the app, and the server and database behind it, then gets each version through Apple's and Google's review. A good one also leaves you holding the code, the store accounts and the signing keys, because whoever holds those controls every future update.",
    link: {
      text: "The checks mobile app development adds to a web build.",
      href: "/blog/mobile-app-development",
    },
  },
  {
    question: "How much does mobile app development cost in the UK?",
    answer: `With ${siteConfig.name} it is a fixed price, plus VAT. ${services.map((s) => `The ${s.name} package is ${s.price} for a ${s.sprint}`).join(", and ")}.${launchOffer ? ` For a limited time there is ${launchOffer.percentOff}% off ${launchOffer.appliesTo}, bringing them to ${services.map(offerPrice).join(" and ")}.` : ""} The scope and price are agreed after the discovery call, before any build starts. Apple's developer programme (US$99 a year) and Google Play's one-off US$25 registration are paid by you, into accounts in your name.`,
    link: {
      text: "What it costs to build an app in the UK, by route and type of app.",
      href: "/blog/how-much-does-it-cost-to-build-an-app-uk",
    },
  },
  {
    question: "Do you build for iPhone and Android?",
    answer:
      "Yes, as two native apps: Swift for iPhone and Kotlin for Android, each written with the platform's own tools. Which platforms the first release covers is part of the scope we agree and price on the discovery call.",
  },
  {
    question: "Why native rather than React Native or Flutter?",
    answer:
      "Native code uses Apple's and Google's own frameworks directly, so new phone features can be used as soon as the platforms release them, and there is no cross-platform layer between your app and the phone to update or debug. The trade-off is two codebases, one for each platform.",
    link: {
      text: "React Native vs Flutter for a startup app.",
      href: "/blog/react-native-vs-flutter",
    },
  },
  {
    question: "Who submits the app to the App Store and Google Play?",
    answer:
      "We do, from your accounts. You open the Apple Developer and Google Play Console accounts in your company's name and invite us as team members, then we submit each build and answer the reviewers' questions. Apple and Google set the review times, so the launch date allows for them.",
  },
  {
    question: "Do I need a mobile app, or would a web app do?",
    answer:
      "Build the app if it needs the phone itself, such as background location, the camera or notifications, or if your customers expect to find you in the stores. If it is mainly forms and records, a web app reaches every phone from one link and ships changes without waiting for review.",
    link: {
      text: "How our web app development works.",
      href: pages.webAppDevelopment.path,
    },
  },
  {
    question: "Who builds the app?",
    answer: `${founder.name}, the founder, a full-stack developer with five years of experience building software for enterprise clients and startups. You work with the same person from the discovery call to launch day, with a demo every Friday.`,
  },
  {
    question: "Who owns the app once it is built?",
    answer:
      "You do. The code lives in your repositories, the app is published under your developer accounts and the signing keys are kept somewhere you control. Any developer you hire later can build and release updates without us.",
  },
]

export default function MobileAppDevelopmentPage() {
  return (
    <main className="flex flex-col">
      <PageJsonLd
        page={page}
        nodes={[
          // The same packages as an MVP build, sold here as a mobile app.
          ...services.map((service) =>
            serviceJsonLd(page, { ...service, serviceType: "Mobile app development" }),
          ),
          faqJsonLd(page, faqs),
        ]}
      />
      <ScrollReveal />

      <LandingHero
        eyebrow={{ label: "Services", href: pages.services.path, current: "Mobile app development" }}
        tone="light"
        title={
          <>
            <span className="text-primary">Native mobile app development</span> for iOS and Android.
          </>
        }
        intro="A mobile app development company for UK founders and teams, building native iPhone and Android apps as production code at a fixed price."
        secondary={{ label: "See pricing", href: "#pricing" }}
        visual={<MobileAppVisual />}
        shape="studio"
      />
      <div aria-hidden="true" className="rail-joint" />

      <HubSection
        id="what-we-build"
        eyebrow="What we build"
        title="Mobile apps built around one job"
        intro="Each one does a real job for your customers or your team, from opening the app to the finished task."
        items={kinds}
        core={{ name: "Your app", tag: "iOS + Android" }}
      />

      <PlatformSection
        id="ios"
        eyebrow="iPhone"
        title="iOS app development"
        summary={platforms.ios.summary}
        points={platforms.ios.points}
        store="app-store"
        tools={mobileTools.ios}
      />

      <PlatformSection
        id="android"
        eyebrow="Android"
        title="Android app development"
        summary={platforms.android.summary}
        points={platforms.android.points}
        store="google-play"
        tools={mobileTools.android}
        reverse
      />

      <ReleaseSection
        eyebrow="From code to the stores"
        title="How your app gets into the App Store and Google Play"
        intro="Five steps from the first build to a listing customers can install, each one run from accounts in your name."
        steps={releaseSteps}
      />

      <LayersSection
        id="layers"
        eyebrow="How it is built"
        title="What goes into a mobile app"
        intro="An app is more than the screens on the phone. Every layer is built, tested and handed over in your name."
        layers={layers}
      />

      <PricingSection
        title="Fixed-price mobile app development"
        intro="Two sprints for the first release of your app, priced before the build starts."
      />

      <ProcessSection
        title="From brief to the app stores"
        intro={`A discovery call, a ${calendarPackage.sprint} with a demo every Friday, then a week of support.`}
      />

      <FitCheckSection
        id="fit"
        eyebrow="Who it is for"
        title="Is a sprint right for your app?"
        intro="It suits a clearly scoped first release. If a web app would serve you better, we will say so on the call."
        items={fitChecks}
        initial={fitInitial}
      />

      <OptionsSection
        id="options"
        eyebrow="Your options"
        title="Ways to get a mobile app built"
        intro="What you get, price, time to a first release and who owns the result, for the four usual routes."
        caption="Four ways to get a mobile app built, compared on what you get, price, time to a first release and ownership"
        columns={optionColumns}
        rows={options}
        footnote={
          <>
            Studio, freelancer and builder figures are the ranges UK founders are quoted.{" "}
            <Link
              href="/blog/how-much-does-it-cost-to-build-an-app-uk"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              See how UK app development costs break down
            </Link>
            .
          </>
        }
      />

      <ComparisonSection
        title="Who should build your mobile app?"
        intro="Native code from a small studio, with the price fixed before the build."
      />

      <GuidesSection
        title="Plan your app before the call"
        intro="Guides on mobile builds, costs and choosing who builds it, plus two free tools."
        posts={guides}
        tools={tools}
      />

      <FaqSection faqs={faqs} intro="Cost, platforms, the stores and who owns the result." />

      <ContactSection
        title="Talk through your app"
        text="Walk us through what the app has to do. You will leave knowing what the first release covers and what it costs."
      />
    </main>
  )
}
