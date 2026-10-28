import outsystemsLogo from "@/assets/blog/logos/outsystems.svg"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const outsystems: BlogPost = {
  slug: "migrate-from-outsystems",
  title: "Leaving OutSystems in phases for a codebase you own",
  series: "migration",
  topic: "OutSystems",
  logo: outsystemsLogo,
  category: "Enterprise low-code",
  description:
    "A phased OutSystems exit: the licence and lock-in case, a strangler-pattern plan, governance and risk, and what each OutSystems concept becomes in owned code.",
  summary:
    "Leaving OutSystems is a programme, not a project: you rebuild apps one at a time in a mainstream stack such as TypeScript, Next.js and Postgres, while OutSystems keeps running the rest until the last cutover. The case rests on the licence and the lock-in, and AI coding agents now make an owned codebase cheaper to build and change than it was a few years ago. A single app of modest size typically takes one to two months; a whole estate is measured in quarters.",
  datePublished: "2026-10-14",
  dateModified: "2026-10-28",
  facts: [
    { label: "Code export", value: "O11 only, all apps at once" },
    { label: "Data export", value: "Database access on O11, APIs on ODC" },
    { label: "Approach", value: "Strangler pattern, app by app" },
    { label: "Typical timeline", value: "1 to 2 months per app" },
  ],
  sections: [
    {
      id: "business-case",
      heading: "The business case rests on licence, lock-in and who can change the code",
      blocks: [
        {
          type: "paragraph",
          text: "Moving off OutSystems pays when the licence and the specialist team cost more than owning a codebase would, and when dependence on one vendor's model has become a risk the board cares about. AI coding agents have moved that line, because the work low-code was built to speed up is now the work agents speed up best.",
        },
        { type: "subheading", text: "Licence" },
        {
          type: "paragraph",
          text: "Both OutSystems platforms are sold mainly by application objects (screens, entities and API methods) and by internal and external end users, and ODC adds capacity entitlements such as compute and database. The quote grows with the estate, whether or not each app earns its place. Ask for the object and user count per app: it shows which apps are expensive to keep, and it is the most useful document in the business case.",
        },
        { type: "subheading", text: "Lock-in" },
        {
          type: "paragraph",
          text: "Your applications live in a proprietary visual model, in the vendor's format and tooling, rather than as text files in your repository. O11 offers a one-way detach of generated .NET code, for every app at once; we could not find a published equivalent for ODC, so ask what your contract allows. Hiring is the other half of lock-in: OutSystems developers are a far smaller pool than TypeScript or C# developers.",
        },
        { type: "subheading", text: "Agents" },
        {
          type: "paragraph",
          text: "Low-code was attractive because hand-written code was slow, and most enterprise apps are forms, lists, approvals and integrations. That is exactly the work coding agents such as Claude Code or Cursor now do well in a conventional codebase, having learned from enormous amounts of open TypeScript, C# and SQL. They are much weaker inside a proprietary visual model, so the conventional codebase keeps getting cheaper to change and the platform model mostly does not.",
        },
        {
          type: "callout",
          title: "What agents do not change",
          text: "Agents write plausible code quickly, including plausible wrong code. You still need code review, automated tests and an engineer who owns the architecture and says no. A team without that discipline swaps a licence problem for a quality problem.",
        },
        {
          type: "paragraph",
          text: "The usual triggers are a renewal quote that has grown again, a decision about converting from O11 to ODC (a project in its own right), and an auditor or acquirer that wants the code in your repository, scanned like the rest of your software.",
        },
      ],
    },
    {
      id: "o11-or-odc",
      heading: "O11 or ODC decides your exit route",
      blocks: [
        {
          type: "paragraph",
          text: "Your platform decides how the data comes out and whether any code comes with it. O11 is the long-running platform: apps built in Service Studio, compiled to .NET, run on OutSystems Cloud or your own servers. ODC, OutSystems Developer Cloud, is the newer cloud-native platform, running apps as containers on AWS infrastructure that OutSystems operates.",
        },
        {
          type: "list",
          items: [
            {
              term: "Code",
              text: "O11 has a documented detach process that produces a standard .NET solution: C# on the server and generated JavaScript in the browser. It covers every app at once, it is one way, and it ends your use of Service Studio, Service Center and LifeTime. ODC has no published equivalent that we could find.",
            },
            {
              term: "Data on O11",
              text: "Entities are ordinary tables, typically in SQL Server or Azure SQL, with Oracle as an option. On OutSystems Cloud you can request direct database access to copy them out.",
            },
            {
              term: "Data on ODC",
              text: "App data sits in Amazon Aurora, a PostgreSQL-compatible database, one per stage, and it is not reachable directly from outside. Plan to expose data through REST APIs built in the apps, and ask OutSystems what else they can provide.",
            },
          ],
        },
        {
          type: "callout",
          title: "Why most teams treat detached code as a reference",
          text: "Detached code is readable, but it is compiler output: generated names, OutSystems runtime libraries you now maintain, and a .NET Framework app on IIS on Windows. It is a precise record of what the apps do and a poor foundation for the next ten years.",
        },
      ],
    },
    {
      id: "concept-map",
      heading: "What each OutSystems concept becomes",
      blocks: [
        {
          type: "paragraph",
          text: "Every OutSystems building block has a conventional equivalent. The effort sits in the ones the platform ran for you without anyone noticing, such as timers, deployment and monitoring. Use this table as the checklist for each app's inventory.",
        },
        {
          type: "table",
          caption: "OutSystems concepts and their equivalents in a codebase you own",
          columns: ["OutSystems concept", "What it does on the platform", "Equivalent in your own stack"],
          rows: [
            [
              "Entities",
              "Tables in the platform database, with generated names on O11 such as OSUSR_abc_Customer",
              "Postgres tables with clean names, defined in schema migrations",
            ],
            [
              "Static entities",
              "Fixed lookup values shipped with the app",
              "Enums or seeded lookup tables under version control",
            ],
            ["Aggregates", "Visual queries over entities", "Queries through an ORM or query builder, with indexes you choose"],
            ["Advanced SQL", "Hand-written SQL inside a module", "Plain SQL in the repository, covered by tests"],
            ["Server actions", "Business logic run on the server", "Service functions behind API routes"],
            ["Client actions", "Logic run in the browser or on the device", "React event handlers and client components"],
            ["Screens and blocks", "Pages and reusable interface pieces", "Next.js routes and React components"],
            ["OutSystems UI", "The built-in pattern and theme library", "Your own component library on an open-source base"],
            ["Timers", "Scheduled server work", "Scheduled jobs with retries and alerting"],
            ["BPT processes", "Long-running, multi-step business processes", "A job queue or a workflow table with explicit states"],
            [
              "Integration Studio extensions",
              "Custom C# packaged for the platform",
              "Ordinary C# libraries, or rewritten TypeScript modules",
            ],
            ["Forge components", "Community and vendor add-ons", "npm or NuGet packages, or your own code"],
            ["Consumed REST and SOAP", "Integrations defined in Service Studio", "Typed API clients in the codebase"],
            ["Roles", "Access checks on screens and actions", "Server-side authorisation, tested as each role"],
            ["Site properties and settings", "Configuration changed at runtime", "Environment variables and a settings table"],
            ["LifeTime and 1-Click Publish", "Environments, staging and deployment", "A CI pipeline with development, staging and production"],
            ["Service Center logs", "Errors, monitoring and timer status", "Error tracking, structured logs and uptime checks"],
          ],
        },
        {
          type: "paragraph",
          text: "Mobile apps are the one item that needs its own scope. They move to React Native or a responsive web app, and they bring app store work with them.",
        },
        {
          type: "paragraph",
          text: "The right-hand column assumes TypeScript, Next.js and Postgres, one of the most common combinations in web development and therefore one agents handle well. If your developers are C# people, ASP.NET Core with React is just as sound: Integration Studio extensions are already C#, and SQL Server data moves more easily if you stay on it. Pick the stack your team can review with confidence. An agent writing code nobody on the team can judge is the failure to avoid.",
        },
      ],
    },
    {
      id: "phased-plan",
      heading: "A strangler-pattern plan in five phases",
      blocks: [
        {
          type: "paragraph",
          text: "Replace OutSystems one app or module at a time, with the new system growing around the old one until nothing is left on the platform. Detach does not fit this approach, because it is all or nothing, so a phased move is a rebuild, using the logic visible in Service Studio (or the detached code) as the specification.",
        },
        { type: "subheading", text: "Phase 0. Inventory and dependency map" },
        {
          type: "paragraph",
          text: "List every app, module, timer, process and integration, with object and user counts per app, then draw the dependency graph. Shared Core modules decide the order far more than business priority does. Expect a few weeks, and keep the output current throughout.",
        },
        { type: "subheading", text: "Phase 1. Foundations" },
        {
          type: "paragraph",
          text: "Build what every app will share before any app moves, so the first migration is not also the place where you invent your platform.",
        },
        {
          type: "list",
          items: [
            "One repository layout and a CI pipeline that runs tests on every pull request.",
            "Sign-in through your existing identity provider, such as Entra ID or Okta.",
            "One domain with path routing in front of both systems, so users cross between old and new without noticing.",
            "A data bridge: remaining OutSystems apps read moved tables as an external database, which both O11 and ODC support, or call REST APIs on whichever side owns the data.",
            "Error tracking, structured logging and a job runner.",
          ],
        },
        { type: "subheading", text: "Phase 2. The pilot app" },
        {
          type: "paragraph",
          text: "Choose an app that is loosely coupled, changes often and carries a fair share of the licence. Not the most critical app in the business, and not the one with the most dependants. A single app of modest size typically takes one to two months from inventory to cutover, in this order:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Write behaviour tests against the running OutSystems app.",
            "Rebuild against the same tests until both versions pass.",
            "Give a pilot team the new app, with the old one still available.",
            "Freeze the OutSystems app, run the final data copy, check row counts and switch the route.",
            "Keep the old app read-only for a few weeks before removing it.",
          ],
        },
        { type: "subheading", text: "Phase 3. Waves" },
        {
          type: "paragraph",
          text: "Group the remaining apps into waves by dependency. Move shared Core modules early, behind APIs, so later apps stop depending on the platform. Each wave reuses the pilot's foundations and cutover runbook, which should make later apps quicker than the first.",
        },
        { type: "subheading", text: "Phase 4. Decommission and renewal" },
        {
          type: "paragraph",
          text: "Time the final waves against the renewal date. Licences run on fixed subscription terms, so savings land at renewal rather than on the day an app moves, and you keep the licence until the last cutover is done. If you will be partway through at a renewal, ask OutSystems early whether a smaller subscription is possible. At the end, archive a final data export, record what was retired and why, and only then let the contract lapse.",
        },
      ],
    },
    {
      id: "agents-in-the-programme",
      heading: "Where AI coding agents earn their place",
      blocks: [
        {
          type: "paragraph",
          text: "Agents take most of the typing out of the rebuild: schema, screens, tests and migration scripts. They do not decide what to build.",
        },
        {
          type: "list",
          items: [
            {
              term: "Reading the old logic",
              text: "Give the agent an advanced SQL query, a written description of an action flow or the detached C# for a module, and ask for a plain English specification with the edge cases. A developer then checks it against Service Studio.",
            },
            {
              term: "Tests from old behaviour",
              text: "Have the agent write Playwright tests against the running OutSystems app, then run the same tests against the new one. Where they disagree, someone decides which version is right.",
            },
            {
              term: "The data model",
              text: "Agents are quick at mapping generated O11 table names to a clean Postgres schema and writing the copy scripts.",
            },
            {
              term: "CRUD screens",
              text: "List, detail, edit and approval screens are where low-code saved the most time. They are now where agents save the most time.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Where they do not help: an agent does not know that five apps depend on one Core module, or why an odd validation exists, and it writes confident code for cases it has never seen. Review every change.",
        },
      ],
    },
    {
      id: "governance-and-risk",
      heading: "Governance and risk",
      blocks: [
        {
          type: "paragraph",
          text: "Run the migration with the controls you would apply to any change to production systems: one accountable architect, a clear owner for every table, a test suite that acts as the contract, and a cutover gate every app has to pass.",
        },
        {
          type: "list",
          items: [
            {
              term: "One accountable architect",
              text: "A named engineer owns the target architecture and can say no, to the business and to the agents.",
            },
            {
              term: "A system of record register",
              text: "For every entity, record whether OutSystems or the new app is the system of record during the transition. Never let both write to the same table.",
            },
            {
              term: "Freeze rules",
              text: "Agree how long each OutSystems app is frozen before its cutover, and how urgent fixes are handled in that window.",
            },
            {
              term: "Security review per wave",
              text: "Code in your own repository can be scanned, reviewed and penetration tested like the rest of your software. Build that into each wave rather than leaving it to the end.",
            },
            {
              term: "Steering",
              text: "A short monthly review with IT, finance and the business owners of the next wave, tracking cutovers against the renewal date.",
            },
          ],
        },
        { type: "subheading", text: "The cutover gate" },
        {
          type: "checklist",
          items: [
            "Shared behaviour tests pass against the new app",
            "Row counts and key totals match after a rehearsal data copy",
            "Every role has been tested as that role, not as an admin",
            "Timers and processes have scheduled equivalents with alerting",
            "A rollback route is agreed and someone is named to run it",
            "Support staff are briefed and users know what changes",
          ],
        },
        { type: "subheading", text: "Risks to watch" },
        {
          type: "list",
          items: [
            {
              term: "Hidden dependants",
              text: "An app nobody listed still calls a module that has moved. The dependency map, kept current, is the defence.",
            },
            {
              term: "Rebuilds turning into redesigns",
              text: "Aim for parity first and put improvements in the release after cutover, or every wave slips.",
            },
            {
              term: "Paying twice",
              text: "Both platforms cost money during the programme. Put the overlap in the business case rather than discovering it.",
            },
            {
              term: "Knowledge walking out",
              text: "The OutSystems developers who know the edge cases may leave mid-programme. Keep them involved in specification and testing.",
            },
          ],
        },
      ],
    },
    {
      id: "cost-and-timeline",
      heading: "Cost and timeline for the business case",
      blocks: [
        {
          type: "paragraph",
          text: "One app of modest size typically takes one to two months to rebuild and cut over. An estate of dozens of apps is a programme measured in quarters, often more than a year, because dependencies set the order and each app needs its own cutover.",
        },
        {
          type: "paragraph",
          text: `Set the rebuild cost against what each app costs to keep: its share of application objects and end users at the next renewal, plus the specialist time it needs. Then add what you take on: hosting, monitoring, security patching and the developers who maintain the code. For scale, a fixed-price sprint with us runs two weeks at ${mvp.price} + VAT or three at ${extendedMvp.price} + VAT. That is enough for a small first app in a phased exit, if its scope fits, but never for an estate.`,
        },
      ],
    },
    {
      id: "convert-or-stay",
      heading: "When converting to ODC, or staying put, is the better call",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if you run a large estate that works, with a well-staffed OutSystems team and a licence the business accepts. Rebuilding dozens of stable apps costs real money and gives users little they would notice. Convert from O11 to ODC if you intend to stay long term, but compare the effort with a rebuild of the same apps first, because both are substantial.",
        },
        {
          type: "paragraph",
          text: "OutSystems is also moving. Mentor builds and edits ODC apps from prompts, and OutSystems MCP lets agents such as Claude Code or Cursor request changes that Mentor applies to the model. For a team that wants AI help without a rewrite, that is a reasonable place to be. The trade is that the code, the runtime and the pricing stay with the vendor.",
        },
      ],
    },
  ],
  faqHeading: "Questions IT and procurement usually ask",
  faqs: [
    {
      question: "Can I get the source code out of OutSystems?",
      answer:
        "On O11, yes: the detach process hands over the generated .NET and JavaScript code for your apps when you stop using the platform. It is one way and covers every app at once. We could not find an equivalent published process for ODC, so check your contract and ask OutSystems directly.",
    },
    {
      question: "Can I detach one app from OutSystems and keep the rest?",
      answer:
        "No. The O11 detach documentation says the process applies to all applications, and you cannot detach a subset while others keep running on the platform. A phased migration therefore means rebuilding apps one at a time, with OutSystems running the rest until the end.",
    },
    {
      question: "Can an AI coding agent convert an OutSystems app automatically?",
      answer:
        "Not in one step. Agents are good at reading exported logic, writing tests and scaffolding screens in TypeScript or C#, which speeds a rebuild up considerably. A developer still has to decide the architecture, check the business rules and review every change.",
    },
  ],
}
