import type { BlogPost } from "@/lib/blog/types"

export const outsystems: BlogPost = {
  slug: "migrate-from-outsystems",
  title: "Migrating from OutSystems to an agentic stack",
  series: "migration",
  topic: "OutSystems",
  category: "Enterprise low-code",
  description:
    "How to migrate from OutSystems to code you own: O11 detach versus ODC, getting your data out, what to rebuild, and how AI coding agents change the sums.",
  summary:
    "Migrating from OutSystems to an agentic stack means rebuilding your apps, one at a time, as a codebase your company owns in mainstream tools such as TypeScript, Next.js and Postgres, maintained by developers who work with AI coding agents like Claude Code or Cursor. O11 can hand over generated .NET code through its detach process, but most teams use that as a reference and rebuild instead, moving the data across and running both systems side by side until each app cuts over.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Code export", value: "O11 only, all apps at once" },
    { label: "Data export", value: "Database access on O11, APIs on ODC" },
    { label: "Usual approach", value: "Rebuild app by app, run side by side" },
    { label: "Typical timeline", value: "1 to 2 months per app" },
  ],
  sections: [
    {
      id: "when-to-move",
      heading: "When does it make sense to migrate from OutSystems?",
      blocks: [
        {
          type: "paragraph",
          text: "It makes sense when the licence and the specialist team cost more than owning a codebase would, and AI coding agents have moved that line. By an agentic stack we mean a codebase your company owns, written in mainstream languages such as TypeScript with Next.js and Postgres, built and maintained by developers who work with AI coding agents such as Claude Code or Cursor.",
        },
        {
          type: "paragraph",
          text: "Low-code was attractive because hand-written code was slow and expensive, and most enterprise apps are forms, lists, approvals and integrations. That is exactly the work agents now do well in a conventional codebase, because they have learned from enormous amounts of open TypeScript, C# and SQL. They are much weaker inside a proprietary visual model that lives in the vendor's format and tooling, not in text files in your git repository. So the conventional codebase keeps getting cheaper to change, and the platform code mostly does not.",
        },
        {
          type: "callout",
          title: "What agents do not change",
          text: "Agents write plausible code quickly, including plausible wrong code. You still need code review, automated tests and an engineer who owns the architecture and says no. A team without that discipline swaps a licence problem for a quality problem.",
        },
        { type: "paragraph", text: "The signs usually look like this:" },
        {
          type: "list",
          items: [
            "The renewal quote keeps growing with your application object count, and the business is asking why internal tools cost what they do.",
            "OutSystems developers are hard to hire or replace.",
            "You are weighing a move from O11 to ODC, which is a project in its own right, so it is a natural moment to ask where the apps should live.",
            "Security, audit or an acquirer wants the code in your own repository, scanned and reviewed like the rest of your software.",
          ],
        },
      ],
    },
    {
      id: "o11-vs-odc",
      heading: "What is the difference between O11 and ODC for a migration?",
      blocks: [
        {
          type: "paragraph",
          text: "O11 is the long-running OutSystems platform: apps are built in Service Studio, compiled to .NET and run on OutSystems Cloud or on servers you manage. ODC, OutSystems Developer Cloud, is the newer cloud-native platform: apps are built in ODC Studio and run as containers on Kubernetes clusters in AWS that OutSystems operates for you. Which one you are on changes the exit.",
        },
        {
          type: "list",
          items: [
            {
              term: "Code export",
              text: "O11 has a documented detach process that hands over generated source code. We could not find a published equivalent for ODC, so ask your account manager what your contract allows before you plan around one.",
            },
            {
              term: "Database",
              text: "O11 apps typically sit on SQL Server or Azure SQL, with Oracle as an option. ODC keeps app data in Amazon Aurora Serverless, a PostgreSQL-compatible database, one per stage, and it is not exposed directly to the internet.",
            },
            {
              term: "Licensing",
              text: "Both are sold mainly by application objects (the screens, database tables and API methods across your apps) and by internal and external end users. ODC adds capacity entitlements such as compute and database. Ask for the count per app: it shows which apps are expensive to keep.",
            },
          ],
        },
      ],
    },
    {
      id: "what-you-can-export",
      heading: "What can you take out of OutSystems?",
      blocks: [
        {
          type: "paragraph",
          text: "You can take your data, your business logic as a specification and, on O11, the generated source code. What you cannot take is a codebase a team would choose to maintain for the next ten years.",
        },
        {
          type: "list",
          items: [
            {
              term: "Data",
              text: "On O11, entities are ordinary database tables, and on OutSystems Cloud you can request direct database access to copy them out. On ODC the database is not reachable directly, so plan to expose data through REST APIs built in the app, and ask OutSystems what else they can provide.",
            },
            {
              term: "Generated code (O11)",
              text: "Detaching gives you a standard .NET solution: C# on the server and generated JavaScript in the browser (Reactive Web screens are React components). It covers every app at once, it is one way, and it ends your use of Service Studio, Service Center and LifeTime.",
            },
            {
              term: "Business logic",
              text: "Every action flow, aggregate, advanced SQL query and validation can be read in Service Studio. That is your specification, and a more exact one than most requirements documents.",
            },
            {
              term: "Integrations",
              text: "REST and SOAP consumers, Integration Studio extensions and Forge components. Extensions are already C#, so they are often the easiest code to reuse.",
            },
            {
              term: "Users and roles",
              text: "Roles and group memberships come out as data. People who sign in through your company identity provider keep doing so; for passwords held in OutSystems, plan a reset or magic link.",
            },
          ],
        },
        {
          type: "callout",
          title: "Why most teams do not keep the detached code",
          text: "Detached code is readable, but it is compiler output: generated names, OutSystems runtime libraries you now maintain, and a .NET Framework app hosted on IIS on Windows. Nobody chose its structure. It is a useful reference and a poor foundation for new work.",
        },
      ],
    },
    {
      id: "what-you-rebuild",
      heading: "What do you have to rebuild?",
      blocks: [
        {
          type: "paragraph",
          text: "You rebuild everything the platform did for you without being asked. Teams remember the screens and forget the platform services, which is where cutovers go wrong.",
        },
        {
          type: "list",
          items: [
            {
              term: "Deployment and environments",
              text: "LifeTime staging and 1-Click Publish become a CI pipeline with development, staging and production, and database migrations under version control.",
            },
            {
              term: "Timers and processes",
              text: "Timers become scheduled jobs. BPT processes become a job queue or a workflow table, with retries and an alert when something fails.",
            },
            {
              term: "Permissions",
              text: "Role checks in screens and actions become server-side authorisation, tested as each role rather than as an admin.",
            },
            {
              term: "Interface and monitoring",
              text: "OutSystems UI patterns become a component library, Forge components become npm packages or your own code, and Service Center logs become error tracking and uptime checks.",
            },
            {
              term: "Mobile apps",
              text: "These need a new home, usually React Native or a responsive web app. Scope them separately.",
            },
          ],
        },
      ],
    },
    {
      id: "target-stack",
      heading: "What does the target stack look like as an OutSystems alternative?",
      blocks: [
        {
          type: "paragraph",
          text: "For most estates we would pick TypeScript, Next.js and Postgres on a mainstream cloud, with your existing identity provider for sign-in. It is one of the most common combinations in web development, which is exactly why agents are good at it.",
        },
        {
          type: "paragraph",
          text: "If your developers are C# people, moving from OutSystems to .NET and React is just as sound: ASP.NET Core on the server, React in the browser. Your Integration Studio extensions are already C#, and SQL Server data moves more easily if you stay on it. Pick the stack your team can review with confidence. An agent writing code nobody on the team can judge is the failure to avoid.",
        },
        {
          type: "paragraph",
          text: "Either way the codebase needs one repository, schema migrations, SSO through Entra ID or Okta, a job queue and tests that run on every pull request.",
        },
      ],
    },
    {
      id: "ai-agents",
      heading: "How do AI coding agents speed up an OutSystems rebuild?",
      blocks: [
        {
          type: "paragraph",
          text: "They take most of the typing out of it: the schema, the screens, the tests and the migration scripts. They do not decide what to build. In practice, these are the places they earn their keep:",
        },
        {
          type: "list",
          items: [
            {
              term: "Reading the old logic",
              text: "Give the agent an advanced SQL query, a written description of an action flow or the detached C# for a module, and ask for a plain English spec with the edge cases. A developer then checks it against Service Studio.",
            },
            {
              term: "Tests from old behaviour",
              text: "Have the agent write Playwright tests against the running OutSystems app, then run the same tests against the new one. Where they disagree, someone decides which version is right.",
            },
            {
              term: "The data model",
              text: "O11 tables carry generated names such as OSUSR_abc_Customer. Agents are quick at mapping them to a clean Postgres schema and writing the copy scripts.",
            },
            {
              term: "CRUD screens",
              text: "List, detail, edit and approval screens are where low-code saved the most time. They are now where agents save the most time.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Where they do not help: an agent does not know that five apps depend on one shared Core module, why an odd validation exists, or what your identity team will allow, and it writes confident code for cases it has never seen. Review every change, treat the test suite as the contract, and keep one named engineer accountable for the architecture.",
        },
      ],
    },
    {
      id: "migration-plan",
      heading: "How do you migrate from OutSystems, step by step?",
      blocks: [
        {
          type: "paragraph",
          text: "Go app by app with the strangler pattern: the new system takes over one app or module at a time while OutSystems keeps running the rest. Detach does not fit this, because it is all or nothing, so a phased move is a rebuild.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Inventory the estate",
              text: "List every app, module, timer, process and integration, with application object and user counts. Draw the dependency graph; the shared Core modules decide the order.",
            },
            {
              term: "Pick the first app",
              text: "Choose one that is loosely coupled, changes often and costs a fair share of the licence. Not the most critical app in the business.",
            },
            {
              term: "Give every table one owner",
              text: "For each entity, decide whether OutSystems or the new app is the system of record during the transition. Never let both write to the same table.",
            },
            {
              term: "Bridge the data",
              text: "Move a table to Postgres and let the remaining OutSystems apps read it as an external database, which both O11 and ODC support, or expose it through REST from whichever side owns it.",
            },
            {
              term: "Keep one sign-in",
              text: "Point the new app at the same identity provider, and put both behind one domain with path routing, so users move between old and new without noticing.",
            },
            {
              term: "Run side by side",
              text: "Run the shared test suite against both versions until they match, then give a pilot team the new app with the OutSystems version still available.",
            },
            {
              term: "Cut over",
              text: "Freeze the OutSystems app, run the final data copy, check row counts, switch the routing, and keep the old app read-only for a few weeks before deleting it.",
            },
            {
              term: "Repeat, and plan the end",
              text: "Time the remaining apps against your renewal date, and keep the licence until the last cutover is done.",
            },
          ],
        },
      ],
    },
    {
      id: "cost-and-timeline",
      heading: "How long does an OutSystems migration take, and what does it cost?",
      blocks: [
        {
          type: "paragraph",
          text: "One app of modest size typically takes 1 to 2 months to rebuild and cut over. An estate of dozens of apps is a programme measured in quarters, often more than a year, because dependencies set the order and each app needs its own cutover.",
        },
        {
          type: "paragraph",
          text: "For the business case, set the rebuild cost against what each app costs to keep: its share of application objects and end users at the next renewal, plus the specialist time it needs. Then add what you take on: hosting, monitoring, security patches and the developers who maintain the code. Licences run on fixed subscription terms, so savings land at renewal, not on the day an app moves.",
        },
        {
          type: "paragraph",
          text: "At Scryptic, rebuilding a single app or product usually takes 1 to 2 months and starts from £10,000, depending on complexity. Those figures are for one app, not an estate.",
        },
      ],
    },
    {
      id: "when-to-stay",
      heading: "Should you stay on OutSystems instead?",
      blocks: [
        {
          type: "paragraph",
          text: "Stay if you run a large estate that works, with a well staffed OutSystems team and a licence the business accepts. Rebuilding dozens of stable apps costs real money and gives users little they would notice.",
        },
        {
          type: "paragraph",
          text: "OutSystems is also moving. Mentor builds and edits ODC apps from prompts, and OutSystems MCP lets agents such as Claude Code or Cursor request changes that Mentor applies to the model. For a team that wants AI help without a rewrite, that is a reasonable place to be. The trade is that the code, the runtime and the pricing stay with the vendor.",
        },
      ],
    },
  ],
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
      question: "Should we convert from O11 to ODC or move off OutSystems?",
      answer:
        "Convert to ODC if you plan to stay on OutSystems for the long term and want its newer cloud platform and AI tooling. If you are already questioning the licence or the lock-in, conversion is a large project that keeps both. Compare it with rebuilding the same apps in a codebase you own before you commit.",
    },
    {
      question: "Can an AI coding agent convert an OutSystems app automatically?",
      answer:
        "Not in one step. Agents are good at reading exported logic, writing tests and scaffolding screens in TypeScript or C#, which speeds the rebuild up considerably. A developer still has to decide the architecture, check the business rules and review every change.",
    },
    {
      question: "How long does it take to migrate from OutSystems?",
      answer:
        "Typically 1 to 2 months for a single app of modest size, from inventory to cutover. A whole estate takes much longer, often more than a year, because shared modules and data set the order and each app needs its own cutover.",
    },
  ],
}
