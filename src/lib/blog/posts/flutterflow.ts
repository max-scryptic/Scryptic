import flutterflowLogo from "@/assets/blog/logos/flutterflow.svg"
import type { BlogPost } from "@/lib/blog/types"

export const flutterflow: BlogPost = {
  slug: "migrate-from-flutterflow",
  title: "Migrating from FlutterFlow to a production app",
  series: "migration",
  topic: "FlutterFlow",
  logo: flutterflowLogo,
  category: "No-code app builders",
  description:
    "How to take a FlutterFlow app to production: what the exported Flutter code gives you, when to keep it, when to rebuild the web side, and a step by step plan.",
  summary:
    "FlutterFlow generates real Flutter and Dart code, so a native mobile app can usually be kept and hardened rather than rebuilt. The web side is different: Flutter web struggles with search, load time and accessibility, so public and browser-first products often move to a React or Next.js web app that shares the same backend.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Yes, Flutter code on paid plans" },
    { label: "Data export", value: "Already yours, in Firebase or Supabase" },
    { label: "Usual approach", value: "Harden mobile, rebuild web if needed" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When is it time to move a FlutterFlow app to production?",
      blocks: [
        {
          type: "paragraph",
          text: "It is time when you are spending more effort working around the visual builder than building with it. FlutterFlow is a fast way to design and ship a cross-platform app. It gets harder to live with once the app has paying users, a growing team and logic that does not fit in a drag and drop editor.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "Most new features need custom code, and you are pasting Dart into custom widgets and actions that the editor cannot check or test.",
            "Two people cannot work on the same screens without stepping on each other, and there is no proper code review before a release.",
            "Your web version is slow to load, hard to use with a screen reader, or not showing up in Google.",
            "You need background jobs, webhooks, complex permissions or an integration that is awkward to express as a visual action.",
            "An investor, acquirer or new developer wants to see the code and the release process, and both live inside a third-party tool.",
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of FlutterFlow?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take the full Flutter project. On paid plans FlutterFlow lets you download the generated code or push it to a GitHub repository, and the backend is usually Firebase or Supabase, which you already own. Check which plan includes GitHub push, as code features are tied to the plan you are on.",
        },
        {
          type: "list",
          items: [
            {
              term: "App code",
              text: "A standard Flutter project in Dart, including your custom widgets, actions and functions. It builds with the normal Flutter tools for iOS, Android and the web.",
            },
            {
              term: "Database and auth",
              text: "FlutterFlow does not host your data. If you used Firebase, your Firestore data, users and storage sit in a Firebase project. If you used Supabase, it is a Postgres database you can connect to directly. Make sure the project is in your own account, not a freelancer's.",
            },
            {
              term: "Server logic",
              text: "Cloud Functions or Supabase edge functions you deployed are separate from FlutterFlow and keep running. Logic built only as client-side actions moves with the app code.",
            },
            {
              term: "What stays behind",
              text: "The visual editor, FlutterFlow's one-click deployment and any FlutterFlow-specific settings. You will need your own build and release pipeline for the app stores and the web.",
            },
          ],
        },
        {
          type: "callout",
          title: "Export is a one-way street",
          text: "FlutterFlow regenerates its code on every push. Hand edits made to the generated files are overwritten, and changes made in your repository do not flow back into the editor. Once you start editing the code by hand, plan to stop building in FlutterFlow.",
        },
      ],
    },
    {
      id: "what-is-missing",
      heading: "What does a FlutterFlow app usually need before launch?",
      blocks: [
        {
          type: "paragraph",
          text: "Most FlutterFlow apps need security rules, structure and a release process before they can carry real users. The generated code works, but it was written for the editor to regenerate, not for a team to maintain.",
        },
        {
          type: "list",
          items: [
            {
              term: "Database rules",
              text: "The app talks to Firestore or Supabase directly from the device, so Firebase security rules or Supabase row level security are the only thing protecting each user's data. Test them as an ordinary user and as a signed-out visitor.",
            },
            {
              term: "Secrets off the device",
              text: "Any key compiled into a mobile or web app can be extracted. Payment, email and AI provider keys belong in Cloud Functions, edge functions or a server.",
            },
            {
              term: "Code structure",
              text: "Generated code is verbose and repeats itself across screens. Pulling shared logic into services and state management makes later changes far cheaper.",
            },
            {
              term: "Tests and builds",
              text: "Automated tests on sign-up, payment and the core flow, plus a build pipeline that produces signed iOS and Android releases without anyone clicking through the editor.",
            },
            {
              term: "Monitoring",
              text: "Crash reporting, error tracking and backups. Firebase Crashlytics or a similar service is quick to add once the code is yours.",
            },
            {
              term: "A web app that suits the web",
              text: "Flutter web draws the interface itself instead of using normal HTML, which makes search indexing, first load size, text selection and screen reader support harder than in a regular web app. Flutter's own guidance points it at app-like experiences, not content sites.",
            },
          ],
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate a FlutterFlow app, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Decide what each platform needs first, then take ownership, secure the backend and build the release process. Mobile and web can follow different paths while sharing one backend.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Choose the path per platform",
              text: "For iOS and Android, keeping the Flutter code is usually right. For the web, keep Flutter only if it is an app behind a login. If it needs to rank, load fast or work well with assistive technology, plan a React or Next.js web app.",
            },
            {
              term: "Freeze and take ownership",
              text: "Push the final version to a GitHub repository in your own organisation, stop editing in FlutterFlow, and confirm you own the Firebase or Supabase project, the app store accounts, signing keys and the domain.",
            },
            {
              term: "Audit",
              text: "List every collection or table, security rule, function, API call, custom code file and third-party package. Note what users actually rely on today.",
            },
            {
              term: "Lock down the backend",
              text: "Write and test security rules or row level security policies for every collection or table, and move secret keys into server functions.",
            },
            {
              term: "Set up environments and builds",
              text: "Create separate development, staging and production backends, and a pipeline that builds, signs and uploads releases to TestFlight and the Play Console.",
            },
            {
              term: "Refactor where it hurts",
              text: "Restructure the screens and data access you change most. Leave stable screens alone.",
            },
            {
              term: "Build the web app if needed",
              text: "Build the web product against the same backend, with server rendering for public pages. Reuse the data model and rules so mobile and web stay consistent.",
            },
            {
              term: "Release and cut over",
              text: "Ship an app store update built from your repository, point the domain at the new web app, and keep the FlutterFlow project read-only for a few weeks before retiring it.",
            },
          ],
        },
      ],
    },
    {
      id: "pitfalls",
      heading: "What goes wrong in FlutterFlow migrations?",
      blocks: [
        {
          type: "paragraph",
          text: "The common mistakes are carrying on in the editor after the code has been hand edited, and treating Flutter web as a drop-in website.",
        },
        {
          type: "list",
          items: [
            "Editing the generated code and then pushing again from FlutterFlow, which overwrites the hand edits.",
            "Losing the app signing keys or store access, which can block updates to the existing listing.",
            "Leaving Firestore rules in test mode, or Supabase tables without row level security, because the app looked fine in testing.",
            "Rewriting the mobile app from scratch when the Flutter code only needed restructuring, and losing months.",
            "Keeping a Flutter web build for a marketing site and wondering why it does not rank.",
          ],
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on FlutterFlow instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay while the app is mostly screens, forms and standard data, and your team builds faster in the editor than they would in code. FlutterFlow is good at cross-platform mobile apps, and plenty run happily on it. Move when custom code dominates, when you need a proper review and release process, or when the web side needs to behave like a real website.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from FlutterFlow?",
      answer:
        "Yes, on paid plans. You can download the generated Flutter project or push it to a GitHub repository. It is standard Flutter and Dart code that builds with the normal Flutter tools, without FlutterFlow.",
    },
    {
      question: "Can I keep editing in FlutterFlow after I change the exported code?",
      answer:
        "Not safely. FlutterFlow regenerates the code on each push and overwrites hand edits, and changes made in your repository do not sync back into the editor. Pick one place to work: the editor or the code.",
    },
    {
      question: "Is Flutter web good enough for a production web app?",
      answer:
        "For an app behind a login, it can be. For public pages that need to rank in search, load quickly and work well with screen readers, a standard web framework such as Next.js is usually the better choice.",
    },
    {
      question: "How long does it take to move a FlutterFlow app to production?",
      answer:
        "Typically four to eight weeks, depending on how much custom code the app has, how many user roles it needs, and whether the web side is being rebuilt as a separate web app.",
    },
  ],
}
