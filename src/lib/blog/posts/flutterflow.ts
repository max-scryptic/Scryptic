import flutterflowLogo from "@/assets/blog/logos/flutterflow.svg"
import type { BlogPost } from "@/lib/blog/types"

export const flutterflow: BlogPost = {
  slug: "migrate-from-flutterflow",
  title: "What to keep, refactor or rewrite in a FlutterFlow code export",
  series: "migration",
  topic: "FlutterFlow",
  logo: flutterflowLogo,
  category: "No-code app builders",
  description:
    "A part by part assessment of FlutterFlow's exported Flutter code: which widgets, state, custom code, backend wiring and routing to keep, refactor or rewrite.",
  summary:
    "Most of a FlutterFlow export is worth keeping: it is standard Flutter, and the routing, backend wiring and custom code are usable as they are. The global app state, the generated API calls and any public Flutter web build are the parts that usually need refactoring or replacing, and the release pipeline has to be built from scratch.",
  datePublished: "2026-10-13",
  facts: [
    { label: "Code export", value: "Flutter project, download or GitHub" },
    { label: "Backend", value: "Your own Firebase or Supabase project" },
    { label: "Usual verdict", value: "Keep mobile, refactor state" },
    { label: "Typical timeline", value: "4 to 8 weeks" },
  ],
  sections: [
    {
      id: "verdict",
      heading: "The export is better than its reputation",
      blocks: [
        {
          type: "paragraph",
          text: "Keep it. For a native iOS and Android app, the code FlutterFlow generates is a reasonable starting point for a production codebase, and rewriting it from scratch usually costs months for very little gain. It is verbose and it repeats itself, but it is ordinary Flutter and Dart, it builds with the standard Flutter tools, and your data already lives in a Firebase or Supabase project that FlutterFlow never hosted.",
        },
        {
          type: "paragraph",
          text: "On paid plans you can download the project or push it to a GitHub repository. Check which plan you are on, because code and GitHub features are tied to the plan tier. The one rule to understand before anything else is that the export is one way. FlutterFlow regenerates its files on every push, so hand edits to generated files get overwritten, and nothing you change in the repository flows back into the editor. Once you start editing by hand, the editor is retired.",
        },
      ],
    },
    {
      id: "what-is-inside",
      heading: "What is inside the exported project",
      blocks: [
        {
          type: "paragraph",
          text: "The project follows a predictable layout, and knowing it makes the assessment much quicker. These are the parts worth recognising in the lib folder:",
        },
        {
          type: "list",
          items: [
            {
              term: "Page folders",
              text: "One folder per page or component, each with a widget file and a matching model file that holds the page's controllers and local state.",
            },
            {
              term: "app_state.dart",
              text: "A single FFAppState class holding every app state variable, with persisted values written to local storage on the device.",
            },
            {
              term: "flutter_flow",
              text: "FlutterFlow's own helpers: the theme class, utility functions, shared widgets such as its button, custom functions and the navigation setup.",
            },
            {
              term: "backend",
              text: "Generated record classes for Firestore collections or Supabase tables, plus the API calls you defined in the editor.",
            },
            {
              term: "custom_code",
              text: "Your custom actions and custom widgets, written in Dart, usually the most valuable code in the project.",
            },
            {
              term: "auth",
              text: "A wrapper around Firebase Auth or Supabase Auth with the sign-in methods you switched on.",
            },
          ],
        },
      ],
    },
    {
      id: "part-by-part",
      heading: "Keep, refactor or rewrite, part by part",
      blocks: [
        {
          type: "paragraph",
          text: "Most parts are a keep or a refactor. Only a handful need replacing, and they are the parts FlutterFlow handled for you behind the scenes: security rules, deployment and the web build.",
        },
        {
          type: "table",
          caption: "Each part of a FlutterFlow export, with a verdict and the reason for it",
          columns: ["Part of the export", "Verdict", "Why"],
          rows: [
            ["Page and component widgets", "Refactor when touched", "They work, but layouts are deeply nested with styling inline. Tidy the screens you change most."],
            ["Page model files", "Keep", "A sensible home for controllers and local state. Move business logic out into services."],
            ["FFAppState global state", "Refactor", "One class for everything means every change rebuilds widely. Split it by feature with Provider, Riverpod or Bloc."],
            ["Custom actions and widgets", "Keep", "Already your own Dart. Add tests, since the editor never checked them."],
            ["Custom functions", "Keep", "Small pure functions, easy to test as they are."],
            ["Firestore record classes", "Keep", "Generated but readable. Put a repository layer in front so screens stop querying directly."],
            ["Supabase table classes", "Keep", "Built on the standard supabase_flutter package. Same advice on a repository layer."],
            ["Generated API calls", "Refactor", "JSON is read by path with little typing. Replace with typed models, and move secret keys to a server."],
            ["Auth wrapper", "Keep", "Thin and standard. Review the sign-in flows and account deletion."],
            ["Routing and navigation", "Keep", "Built on go_router. Rename routes sensibly and test deep links."],
            ["FlutterFlowTheme", "Keep, then migrate", "Works fine, but standard widgets ignore it. Map colours and text styles into ThemeData over time."],
            ["FlutterFlow helper widgets", "Keep for now", "Replace with plain Flutter widgets as screens are rewritten, not in one go."],
            ["Firestore rules or row level security", "Rewrite", "Generated or test mode rules are a starting point. Write and test a rule for every collection or table."],
            ["Flutter web build", "Rewrite if public", "Fine behind a login. Public pages that must rank and load fast belong in a framework such as Next.js."],
            ["Build and release", "Rewrite", "One-click deploys stay in the editor. You need your own signed builds for both stores."],
          ],
        },
        {
          type: "callout",
          title: "Where the real risk sits",
          text: "The app talks to Firestore or Supabase straight from the device, so the security rules or row level security policies are the only thing between one user and another user's data. Of everything in the table, that row deserves the most time. Test each rule as a normal user and as a signed-out visitor before launch.",
        },
      ],
    },
    {
      id: "what-shifts-the-verdict",
      heading: "Three things that change the verdict for your app",
      blocks: [
        {
          type: "paragraph",
          text: "The table is the usual case. Three questions move individual rows towards keep or towards rewrite.",
        },
        {
          type: "list",
          items: [
            {
              term: "How much is custom code?",
              text: "If most features already live in custom actions and widgets, the project is closer to hand-written Flutter than it looks, and the case for keeping it is stronger.",
            },
            {
              term: "Is the web side public?",
              text: "Flutter web draws the interface itself rather than using normal HTML, which makes search indexing, first load size, text selection and screen readers harder. Flutter's own guidance aims it at app-like experiences, not content sites.",
            },
            {
              term: "How old are the packages?",
              text: "The generated pubspec pins package versions to whatever FlutterFlow used at the time. Upgrading Flutter and those packages is a task of its own, and it is better done early, while the code is still close to what was generated.",
            },
          ],
        },
      ],
    },
    {
      id: "plan",
      heading: "A short plan for the first few weeks",
      blocks: [
        {
          type: "paragraph",
          text: "Take ownership first, protect the data second, and refactor only where the product is actually changing. A mobile app that is mostly kept typically reaches a proper release process in four to eight weeks, longer if the web side is being rebuilt alongside it.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Push the final version to a GitHub repository in your own organisation, stop editing in FlutterFlow, and confirm you own the Firebase or Supabase project, both store accounts, the signing keys and the domain.",
            "Write and test security rules or row level security policies for every collection or table, and move payment, email and AI keys into Cloud Functions, edge functions or a server.",
            "Set up separate development, staging and production backends.",
            "Build a pipeline that produces signed releases and uploads them to TestFlight and the Play Console without anyone opening the editor.",
            "Add crash reporting, error tracking and tests on sign-up, payment and the core flow.",
            "Upgrade Flutter and the pinned packages, then start on the refactors in the table, beginning with app state.",
            "If the web side is public, build it as a separate web app on the same backend and data model.",
          ],
        },
        {
          type: "paragraph",
          text: "The mistake to avoid is the full rewrite. The mobile app usually only needs restructuring, and starting from nothing throws away working screens and months of fixes along with the clutter.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I keep editing in FlutterFlow after I change the exported code?",
      answer:
        "Not safely. FlutterFlow regenerates its code on each push and overwrites hand edits to generated files, and changes made in your repository do not sync back into the editor. Choose one place to work: the editor or the code.",
    },
    {
      question: "Is Flutter web good enough for a production web app?",
      answer:
        "For an app behind a login, it can be. For public pages that need to rank in search, load quickly and work well with screen readers, a standard web framework such as Next.js is usually the better choice, sharing the same backend as the Flutter mobile app.",
    },
    {
      question: "Can I export code from FlutterFlow on the free plan?",
      answer:
        "Code download and GitHub push are features of FlutterFlow's paid plans, and the exact features vary by tier. Check the current plan comparison before you rely on an export, and take one as soon as you are on a plan that allows it.",
    },
  ],
}
