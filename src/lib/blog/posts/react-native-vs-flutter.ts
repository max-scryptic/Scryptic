import type { BlogPost } from "@/lib/blog/types"

export const reactNativeVsFlutter: BlogPost = {
  slug: "react-native-vs-flutter",
  title: "React Native vs Flutter for a startup app",
  series: "stack",
  topic: "Mobile",
  description:
    "React Native vs Flutter for a startup app: language, how each draws the UI, Expo, hiring, sharing code with a web app, performance and what to pick for an MVP.",
  summary:
    "For most startups, React Native with Expo is the better choice: it's TypeScript, there are far more developers who can work on it, and it shares code and skills with a React or Next.js web app. Flutter is the better choice when your team already writes Dart, or when the app is a heavily custom, animated interface that should look identical on every phone.",
  datePublished: "2026-10-14",
  facts: [
    { label: "React Native language", value: "TypeScript or JavaScript" },
    { label: "Flutter language", value: "Dart" },
    { label: "React Native UI", value: "Real native components" },
    { label: "Flutter UI", value: "Drawn by its own engine" },
    { label: "Usual MVP pick", value: "React Native with Expo" },
  ],
  sections: [
    {
      id: "which-to-choose",
      heading: "React Native or Flutter: which should a startup choose?",
      blocks: [
        {
          type: "paragraph",
          text: "Pick React Native, built with Expo, unless you have a specific reason not to. Both let one team ship iOS and Android apps from a single codebase, and neither will hold back a normal startup app. So the React Native vs Flutter decision is mostly about people and the rest of your stack.",
        },
        {
          type: "paragraph",
          text: "React Native wins on those. It's TypeScript, which your web developers already write, and the mobile app can share types and API code with a React or Next.js web app. Flutter wins when you already have Dart developers, or when the product is the interface itself: custom drawing and animation that has to look the same everywhere.",
        },
      ],
    },
    {
      id: "language-and-hiring",
      heading: "TypeScript or Dart: which is easier to hire for?",
      blocks: [
        {
          type: "paragraph",
          text: "TypeScript, by a long way. React Native apps are written in JavaScript or, in any project worth starting today, TypeScript. Flutter apps are written in Dart, a language Google created and which is used almost entirely for Flutter. Nearly every web developer can read a React Native codebase on day one. Far fewer people have written Dart.",
        },
        {
          type: "paragraph",
          text: "Dart isn't a reason to avoid Flutter, though. It's a pleasant, strongly typed language, and anyone who has written TypeScript, Kotlin or Swift picks it up in a couple of weeks. The real cost is the smaller hiring pool, and that nothing in Dart carries over to your web app or backend.",
        },
        {
          type: "paragraph",
          text: "One caution on the React Native side: a good React web developer is not automatically a good React Native developer. App store releases, push certificates, keyboard handling and native build errors are their own skills, so ask about apps they've actually shipped to the stores. Flutter developers tend to be mobile specialists by definition, so the smaller pool is often a more focused one.",
        },
      ],
    },
    {
      id: "how-they-draw-the-ui",
      heading: "How do React Native and Flutter draw the UI?",
      blocks: [
        {
          type: "paragraph",
          text: "React Native renders real native components: a button in a React Native app is the platform's own button. Flutter draws every pixel itself with its own rendering engine, Impeller, onto a blank canvas, so a Flutter button is a picture of a button that Flutter painted.",
        },
        {
          type: "list",
          items: [
            {
              term: "React Native",
              text: "Your TypeScript describes the screen, and React Native turns it into UIKit views on iOS and Android views on Android. Since version 0.82 it runs only on the New Architecture, which replaced the old asynchronous bridge with JSI, the Fabric renderer and TurboModules, and removed most of the lag older React Native apps were known for.",
            },
            {
              term: "Flutter",
              text: "Flutter ships its own widgets and draws them with Impeller, now the default renderer on iOS and modern Android, which was built to fix the stutter older Flutter apps had the first time an animation ran. Because Flutter controls every pixel, the app looks the same on an old Android phone as on the newest iPhone.",
            },
          ],
        },
        {
          type: "callout",
          title: "What this means when Apple changes the look",
          text: "When Apple restyled its controls with Liquid Glass in iOS 26, apps built from native components picked up much of the new look once rebuilt with the new SDK. Flutter's iOS-style widgets are re-creations, so they wait for an update. If feeling exactly like an iPhone app matters, that counts for React Native. If you want your own brand look everywhere, it counts for Flutter.",
        },
      ],
    },
    {
      id: "developer-experience",
      heading: "What does Expo change about the developer experience?",
      blocks: [
        {
          type: "paragraph",
          text: "Expo takes most of the pain out of React Native, and it's now the way the React Native docs recommend starting a new app. Plain React Native used to mean wrestling Xcode and Gradle within the first week. With Expo you rarely open either.",
        },
        {
          type: "list",
          items: [
            {
              term: "EAS Build",
              text: "Builds your iOS and Android binaries in the cloud, so a developer on Windows or Linux can still produce an iOS build.",
            },
            {
              term: "EAS Update",
              text: "Pushes JavaScript fixes straight to users' phones without waiting for app review, within Apple's and Google's rules. Fixing a broken checkout screen in an hour instead of two days matters in the first months.",
            },
            {
              term: "Expo Router",
              text: "File-based routing that works like the Next.js app router, so web developers recognise the structure straight away.",
            },
            {
              term: "Development builds and config plugins",
              text: "When you need a native library Expo doesn't include, you add it and Expo regenerates the native projects. The old advice to eject no longer applies.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Flutter's developer experience is excellent out of the box and more uniform: one SDK, a full set of first-party widgets, stateful hot reload that keeps your place in the app while you change code, and solid DevTools. You make fewer library decisions because Flutter ships more itself. Over the air updates aren't built in, but Shorebird, a third-party service, adds code push.",
        },
      ],
    },
    {
      id: "sharing-code-with-web",
      heading: "Can you share code with a React or Next.js web app?",
      blocks: [
        {
          type: "paragraph",
          text: "With React Native, yes, and this is often what settles it. Put the web app and the mobile app in one monorepo and they can share the TypeScript types for your data, Zod schemas for validation, the API client, and business logic such as how a price or a booking window is calculated. When you add a field, the compiler tells you everywhere it needs handling, on web and mobile, in one pull request.",
        },
        {
          type: "paragraph",
          text: "Don't expect to share the screens themselves. Expo can build for the web through React Native Web, which is fine for an internal tool, but a customer-facing Next.js site and a mobile app usually want different layouts anyway. Share the logic and write the UI twice.",
        },
        {
          type: "paragraph",
          text: "With Flutter, you share nothing with a TypeScript web app or backend. You'd generate a Dart API client from an OpenAPI spec and keep it in step. Flutter can build for the web too, but it draws to a canvas, which is wrong for a marketing site that needs to rank in Google.",
        },
      ],
    },
    {
      id: "performance",
      heading: "Is Flutter faster than React Native in practice?",
      blocks: [
        {
          type: "paragraph",
          text: "For a typical startup app, no one using it could tell them apart. Flutter has a small edge for animation-heavy interfaces, because it controls the whole drawing pipeline, and React Native has a small edge in feeling native, because it is.",
        },
        {
          type: "paragraph",
          text: "When a startup app feels slow, the framework is rarely the reason. It's usually a slow API, uncached images, or a list rendering thousands of rows at once. In React Native, check lists first, where Shopify's FlashList is a good swap for FlatList, then animations, which should run through Reanimated on the UI thread. In Flutter, look for widgets rebuilding far more often than they need to.",
        },
      ],
    },
    {
      id: "fully-native",
      heading: "When should you go fully native instead of React Native or Flutter?",
      blocks: [
        {
          type: "paragraph",
          text: "Go native with Swift and Kotlin when the app lives on platform features or you only need one platform. Native vs React Native is a smaller gap than it used to be, and both frameworks let you drop into native code for one module, so most apps don't need it. We'd consider it when:",
        },
        {
          type: "list",
          items: [
            "The core of the product is something the cross-platform layer makes awkward: heavy camera or audio processing, AR, or long-running Bluetooth connections to hardware.",
            "Much of the experience lives outside the main app, in home screen widgets, Live Activities, Apple Watch or CarPlay. Those are written in Swift and Kotlin whichever framework you choose.",
            "You only need iOS for now and you have a Swift developer.",
            "You already have experienced iOS and Android developers in the team.",
          ],
        },
        {
          type: "paragraph",
          text: "The cost is two codebases, two sets of bugs and every feature built twice. For a pre-revenue startup that's hard to justify.",
        },
      ],
    },
    {
      id: "mvp",
      heading: "What should you pick for an MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "For a React Native MVP, use Expo, TypeScript and Expo Router, and ship with EAS. That gets you to both app stores fastest, with the most people able to help later. A Flutter MVP is the right call if your developer knows Flutter well or the app is mostly custom visuals. A competent developer in the framework they know will beat a great framework they're learning.",
        },
        {
          type: "paragraph",
          text: "Before either, ask whether the MVP needs to be a store app at all. Many first versions are better as a web app, which skips app review and is cheaper to change; our guide Web app or mobile app first? covers that. At Scryptic most builds are TypeScript, Next.js and Postgres, which is one reason React Native suits the founders we work with: the mobile app shares a language, types and API with the web app beside it.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is React Native or Flutter better for a startup?",
      answer:
        "React Native with Expo suits most startups, because it uses TypeScript, has a much larger hiring pool and shares code with a React or Next.js web app. Flutter is better if your team already knows Dart or the app depends on custom, animation-heavy design.",
    },
    {
      question: "Is Flutter faster than React Native?",
      answer:
        "Not in a way most users would notice. Flutter has an edge for complex custom animation, and React Native's New Architecture removed most of its old performance problems. Slow apps are usually down to the API, images or long lists.",
    },
    {
      question: "Should I build my MVP natively in Swift and Kotlin?",
      answer:
        "Usually not. Building two native apps roughly doubles the work for an MVP. Go native only if you need one platform, or the product depends on platform features such as widgets, AR or hardware connections.",
    },
    {
      question: "Do I need Expo for React Native?",
      answer:
        "You don't need it, but you should use it for a new app. The React Native docs recommend starting with a framework such as Expo, which adds cloud builds, over the air updates and file-based routing.",
    },
    {
      question: "Can a web developer build a React Native app?",
      answer:
        "A React developer can be productive in React Native quickly, because the language, components and state management are the same. Mobile-specific work such as navigation, app store releases and push notifications takes extra experience, so check they have shipped an app to the stores before.",
    },
  ],
}
