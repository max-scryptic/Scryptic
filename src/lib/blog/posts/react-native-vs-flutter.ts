import type { BlogPost } from "@/lib/blog/types"

export const reactNativeVsFlutter: BlogPost = {
  slug: "react-native-vs-flutter",
  title: "React Native vs Flutter for a startup app",
  series: "stack",
  topic: "Mobile",
  icon: "tablet-smartphone",
  description:
    "React Native vs Flutter scored for a startup: language, UI, performance, UK hiring, web support and code sharing, with a clear rule for which one to pick.",
  summary:
    "For most startups, React Native with Expo is the better choice: it's TypeScript, far more developers can work on it, and it shares code with a React or Next.js web app. Flutter is the better choice when your team already writes Dart, or when the app is a heavily custom, animated interface that should look identical on every phone.",
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
      id: "scorecard",
      heading: "The scorecard",
      blocks: [
        {
          type: "paragraph",
          text: "React Native wins on the criteria that decide most startup apps, and Flutter wins on the ones that decide a few. Both ship iOS and Android from one codebase, and neither will hold back a normal product. Here's how they compare, criterion by criterion.",
        },
        {
          type: "table",
          caption: "React Native and Flutter compared for a startup app",
          columns: ["Criterion", "React Native", "Flutter", "Edge"],
          rows: [
            ["Language", "TypeScript, which web developers already write", "Dart, used almost only for Flutter", "React Native"],
            ["UI approach", "The platform's own native components", "Every pixel drawn by its own engine, Impeller", "Depends on the product"],
            ["Looking native on iOS", "Picks up new system styles when rebuilt", "Re-creates iOS styles, so waits for updates", "React Native"],
            ["Identical look everywhere", "Close, with platform differences", "Pixel for pixel the same", "Flutter"],
            ["Performance", "New Architecture removed the old bridge lag", "Small edge for heavy animation", "Draw for most apps"],
            ["Hiring in the UK", "Large pool of React and TypeScript developers", "Smaller, more specialist pool", "React Native"],
            ["Web support", "React Native Web, fine for internal tools", "Draws to a canvas, poor for search", "React Native"],
            ["Code sharing with a web app", "Types, validation and API client shared", "Nothing shared with a TypeScript stack", "React Native"],
            ["Tooling", "Expo, cloud builds and file-based routing", "One SDK with a full widget set", "Draw"],
            ["Over the air updates", "Built into Expo with EAS Update", "Through Shorebird, a third-party service", "React Native"],
          ],
        },
        {
          type: "paragraph",
          text: "Most of those rows won't change your decision. Three usually do: who you can hire, what the app has to share with your web product, and whether the interface itself is the product.",
        },
      ],
    },
    {
      id: "hiring",
      heading: "Hiring decides it more often than anything else",
      blocks: [
        {
          type: "paragraph",
          text: "TypeScript is far easier to hire for in the UK than Dart. Nearly every web developer can read a React Native codebase on day one; far fewer have written Dart, a language Google created and which is used almost entirely for Flutter.",
        },
        {
          type: "paragraph",
          text: "Dart itself isn't the problem. It's pleasant and strongly typed, and anyone who has written TypeScript, Kotlin or Swift picks it up in a couple of weeks. The real costs are the smaller pool and that nothing written in Dart carries over to your web app or backend.",
        },
        {
          type: "paragraph",
          text: "One caution on the React Native side: a good React web developer isn't automatically a good mobile developer. App store releases, push certificates, keyboard handling and native build errors are separate skills, so ask about apps they've actually shipped. Flutter developers tend to be mobile specialists by definition, so the smaller pool is often a more focused one.",
        },
      ],
    },
    {
      id: "code-sharing",
      heading: "Code sharing with your web app",
      blocks: [
        {
          type: "paragraph",
          text: "If you have, or will have, a React or Next.js web app, this criterion often settles it on its own. Put both apps in one monorepo and they can share TypeScript types, Zod validation schemas, the API client, and business rules such as how a price or a booking window is calculated. Add a field and the compiler shows every place it needs handling, on web and mobile, in one pull request.",
        },
        {
          type: "paragraph",
          text: "Don't expect to share the screens. A customer-facing site and a mobile app usually want different layouts, so share the logic and write the UI twice.",
        },
        {
          type: "paragraph",
          text: "With Flutter there's nothing to share with a TypeScript stack. You'd generate a Dart API client from an OpenAPI spec and keep it in step by hand. Flutter's web build draws to a canvas, which is wrong for a marketing site that needs to rank in Google.",
        },
      ],
    },
    {
      id: "ui-approach",
      heading: "When the interface is the product",
      blocks: [
        {
          type: "paragraph",
          text: "Flutter earns its place when the app is mostly custom visuals. Because it draws everything itself with Impeller, now its default renderer on iOS and modern Android, a heavily animated, branded interface looks and moves the same on an old Android phone as on the newest iPhone.",
        },
        {
          type: "paragraph",
          text: "React Native goes the other way. Your TypeScript describes the screen and React Native turns it into real UIKit and Android views. Since version 0.82 it runs only on the New Architecture, with JSI, the Fabric renderer and TurboModules replacing the old asynchronous bridge that made older apps feel laggy.",
        },
        {
          type: "callout",
          title: "What happens when Apple changes the look",
          text: "When Apple restyled its controls with Liquid Glass in iOS 26, apps built from native components picked up much of the new look once rebuilt with the new SDK. Flutter's iOS-style widgets are re-creations, so they wait for an update. If feeling exactly like an iPhone app matters, that counts for React Native. If you want your own brand look everywhere, it counts for Flutter.",
        },
      ],
    },
    {
      id: "the-rest",
      heading: "Performance and tooling are a draw",
      blocks: [
        {
          type: "paragraph",
          text: "For a typical startup app, nobody using it could tell the two apart. When an app feels slow, it's usually a slow API, uncached images or a list rendering thousands of rows, not the framework. Tooling is excellent on both sides: Expo gives React Native cloud builds through EAS, over the air fixes and Next.js-style routing, while Flutter's single SDK, stateful hot reload and DevTools mean fewer library decisions.",
        },
      ],
    },
    {
      id: "decision-rule",
      heading: "Pick React Native if, pick Flutter if",
      blocks: [
        {
          type: "paragraph",
          text: "The default is React Native with Expo, TypeScript and Expo Router, shipped with EAS. Move off that default only when one of the Flutter conditions is clearly true.",
        },
        {
          type: "list",
          items: [
            {
              term: "Pick React Native if",
              text: "you have or plan a React or Next.js web app, you'll hire from the general TypeScript pool, or the app should feel like a standard iPhone and Android app.",
            },
            {
              term: "Pick Flutter if",
              text: "your developer already ships Flutter well, or the product is a custom, animation-heavy interface that must look identical everywhere and has no web app to share code with.",
            },
            {
              term: "Go fully native if",
              text: "you only need one platform and have a Swift or Kotlin developer, or the core of the product is camera, audio, AR, hardware connections or widgets that live outside the main app.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "A competent developer in the framework they know will beat a great framework they're learning. And before either, ask whether the first version needs to be a store app at all; a web app skips app review and is cheaper to change. Most Scryptic builds are TypeScript, Next.js and Postgres, which is why React Native usually suits the founders we work with.",
        },
      ],
    },
  ],
  faqs: [],
}
