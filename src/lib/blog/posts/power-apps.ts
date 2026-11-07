import powerAppsLogo from "@/assets/blog/logos/power-apps.svg"
import powerAppsWhatComesOut from "@/assets/blog/images/power-apps-what-comes-out.webp"
import powerAppsOneAppAtATime from "@/assets/blog/images/power-apps-one-app-at-a-time.webp"
import type { BlogPost } from "@/lib/blog/types"

export const powerApps: BlogPost = {
  slug: "migrate-from-power-apps",
  title: "When a Power Apps migration pays off, and how to run it",
  series: "migration",
  topic: "Power Apps",
  logo: powerAppsLogo,
  category: "Enterprise low-code",
  description:
    "A Power Apps migration pays off once customers need access or premium licences track headcount. What comes out, what Dataverse becomes and how to move apps.",
  summary:
    "A Power Apps migration pays off when an app's users are customers or partners, or when premium licences for a growing user base cost more than owning the code would. The apps themselves can't leave, because canvas and model-driven apps only run on Power Platform, so each one is rebuilt. Your data in Dataverse, SharePoint or SQL Server comes with you, and staff keep signing in with their Microsoft work accounts.",
  datePublished: "2026-11-07",
  facts: [
    { label: "Code export", value: "Source files you can read but not run" },
    { label: "Data export", value: "Dataverse Web API, Fabric or Synapse Link" },
    { label: "Staff sign-in", value: "Keep Microsoft Entra ID" },
    { label: "Typical timeline", value: "4 to 8 weeks per canvas app" },
  ],
  sections: [
    {
      id: "when-to-leave",
      heading: "Which Power Apps are worth moving?",
      blocks: [
        {
          type: "paragraph",
          text: "The ones that now serve people Power Apps was never priced for: anyone outside your Microsoft 365 tenant, or hundreds of occasional users. An app your colleagues use every day, with licences already covered by a wider Microsoft agreement, is usually best left where it is.",
        },
        {
          type: "paragraph",
          text: "The example in this guide is a property maintenance firm. Its office staff approve jobs in one canvas app, its engineers file reports from site in another, and both run on Dataverse. Then the landlords it works for ask to see their own jobs, and the question of moving comes up.",
        },
        {
          type: "list",
          items: [
            "Landlords are outsiders. Canvas apps sign people in through Microsoft Entra ID, so each landlord would join the firm's tenant as a guest and still need a licence. Power Pages is Microsoft's product for external users, but it runs in the browser only and has its own capacity pricing, and a canvas app embedded in a page still has to be licensed.",
            "The licence bill follows headcount. An app that uses Dataverse or a premium connector, such as SQL Server or a custom API, needs each user on a premium licence or a monthly pay-as-you-go charge for every active user of every app. Twenty office staff on that model is easy to justify. Three hundred landlords who check in twice a month is harder.",
            "The data has grown past delegation. A canvas app hands filtering and sorting to the data source only when both the function and the source support it. Anything else runs on the first 500 rows by default, and never more than 2,000, so the jobs list quietly drops older records as the table grows.",
          ],
        },
        {
          type: "paragraph",
          text: "There's one more reason that rarely makes it into a business case. Plenty of Power Apps were built by one capable person in operations, with the logic spread across hundreds of control properties, and nobody else will touch them. That's a continuity risk whatever the licences cost.",
        },
        {
          type: "callout",
          title: "Check what you already pay for",
          text: "Many Microsoft 365 plans include Power Apps for apps that only use standard connectors such as SharePoint and Excel. If your app stays inside that boundary the licence saving is small, so the case for moving has to rest on who uses the app and who can maintain it.",
        },
      ],
    },
    {
      id: "what-comes-out",
      heading: "What can you take out of Power Apps?",
      blocks: [
        {
          type: "paragraph",
          text: "Your data comes out ready to import. The apps and flows come out as a detailed description of themselves, which makes a good specification for the rebuild and nothing more.",
        },
        {
          type: "image",
          image: powerAppsWhatComesOut,
          alt: "Canvas apps and flows leave Power Platform as a specification to rebuild from, while Dataverse tables leave as data.",
        },
        {
          type: "list",
          items: [
            "Canvas apps can be saved as .pa.yaml source files through Git integration, now generally available. Every screen, control and Power Fx formula is there in readable text, but Microsoft treats the files as generated output and they only run inside Power Apps.",
            "Model-driven apps export inside a solution, a zip of files describing the tables, forms, views, business rules and security roles. Nothing outside Dataverse can run them, though they list every rule you'll have to rebuild.",
            "Dataverse data can be read table by table through the Dataverse Web API, which speaks OData. For large volumes, link the environment to Microsoft Fabric or Azure Synapse Link and copy tables in bulk; both need change tracking turned on for each table.",
            "SharePoint lists and SQL Server databases are already yours. The new app can use them directly while you decide where the data should live long term.",
            "Power Automate flows export with a solution as JSON definitions that show every trigger, condition and action the rebuild has to cover.",
          ],
        },
        {
          type: "paragraph",
          text: "Microsoft also offers code apps: React and TypeScript apps written in your own repository but hosted on Power Platform, using its connectors and sign-in. They give you the interface code and leave the licensing as it is, since every user still needs a premium licence. If ownership of the code is your only worry, price them before a full move.",
        },
      ],
    },
    {
      id: "concept-map",
      heading: "Where each part of a Power App ends up",
      blocks: [
        {
          type: "paragraph",
          text: "Every Power Platform building block has an ordinary equivalent in a web stack. Expect the time to go on the parts Microsoft ran for you without anyone noticing, such as security roles and connectors.",
        },
        {
          type: "table",
          caption: "Power Platform building blocks and their equivalents in a web app you own",
          columns: ["In Power Platform", "What it does", "In your own stack"],
          rows: [
            ["Canvas screens and controls", "Pages built by placing controls on a canvas", "React components and routes in a framework such as Next.js"],
            ["Power Fx formulas", "Logic held in properties such as OnSelect and Items", "TypeScript functions, with the rules that matter moved to the server"],
            ["Collections and variables", "Data held in the app while it runs", "Component state, a data-fetching cache and server queries"],
            ["Model-driven forms and views", "Screens generated from Dataverse tables", "List and detail pages designed for each task"],
            ["Dataverse tables", "A managed database with typed columns and relationships", "Postgres tables defined in versioned migrations"],
            ["Choice columns", "Option sets stored as numbers with labels", "Enums or lookup tables, with numbers mapped to labels on import"],
            ["Business rules and calculated columns", "Validation and derived values on a table", "Database constraints, generated columns and server checks"],
            ["Plug-ins and custom APIs", "C# that runs inside Dataverse when records change", "Server functions called from your API or a job queue"],
            ["Security roles, business units and teams", "Who can read or change which records", "Authorisation checks in the API, backed by Postgres row level security"],
            ["Connectors", "Prebuilt links to SharePoint, Outlook, SQL and hundreds of services", "API clients for the few services the app really uses"],
            ["Power Automate flows", "Automation triggered by events or schedules", "Background jobs and webhooks with retries and alerts"],
            ["Environments and solutions", "Development, test and production, and moving changes between them", "Git branches, a CI pipeline and separate deployments"],
          ],
        },
        {
          type: "paragraph",
          text: "Choice columns catch out most first imports. Dataverse stores the number behind each option, so the firm's job status column arrives as 100000001 where the office expects to read Approved. Pull the option labels from the table metadata and map them before loading a single row.",
        },
      ],
    },
    {
      id: "data-and-sign-in",
      heading: "Moving the data and keeping Microsoft sign-in",
      blocks: [
        {
          type: "paragraph",
          text: "Use the Web API for a modest app and a Fabric or Synapse link for a large one, keep the Dataverse row IDs, and let staff carry on signing in with their work accounts.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Export the schema first: tables, columns, relationships and choice labels from the metadata, so the Postgres design is deliberate rather than guessed from a spreadsheet.",
            "Keep each row's Dataverse GUID in a column on the new table. Lookups between tables point at those GUIDs, and you need them to rebuild relationships and to rerun the import safely.",
            "Copy file and image columns, and any SharePoint attachments, into your own object storage, recording which record each file belongs to. For the maintenance firm, that's every engineer's site photo.",
            "Rehearse the full copy, compare row counts and a few key totals per table, then book the final copy for a quiet window.",
          ],
        },
        {
          type: "paragraph",
          text: "Staff should barely notice the sign-in change. Register the new app in Microsoft Entra ID and use it as the identity provider, and people sign in with the same work account under the same multi-factor rules. Landlords get a sign-up of their own, with email and password or magic links, kept apart from the firm's tenant.",
          link: { text: "How we build customer-facing web apps.", href: "/services/web-app-development" },
        },
        {
          type: "paragraph",
          text: "When customers have become the main users of what started as an internal tool, the rebuild also picks up product work such as tenancy and billing.",
          link: { text: "What changes when an internal tool becomes the product.", href: "/blog/migrate-from-retool" },
        },
        {
          type: "paragraph",
          text: "Opening an app to the public for the first time also brings launch admin: a privacy policy, cookie consent and someone watching for errors. Our free App Launch Checklist asks five questions about your app and builds a launch checklist covering legal, payments, SEO, analytics and the app stores.",
          link: { text: "Build your launch list with the App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "one-app-at-a-time",
      heading: "Rebuild one app at a time and keep the rest running",
      blocks: [
        {
          type: "paragraph",
          text: "Start with the app that hurts most, usually the one with external users or the steepest licence bill, while the others stay on Power Platform until their turn. For the maintenance firm that's the landlord portal, then the engineers' reports, with office approvals last.",
        },
        {
          type: "image",
          image: powerAppsOneAppAtATime,
          alt: "Three stages of a Power Apps migration, with one app moving to your own stack at each stage while the rest keep running.",
        },
        {
          type: "paragraph",
          text: "During the overlap, write down which system owns each table. When the new app owns a table, the remaining Power Apps read it through the PostgreSQL connector or a custom connector to your API. When Dataverse still owns it, the new app reads it through the Web API. Both connectors are premium, so budget licences for the overlap, and never let both systems write the same table.",
        },
        {
          type: "paragraph",
          text: "Long-lived apps collect screens nobody opens. Sorting them into rebuild now, later or never is the same job as scoping a first release, and our free MVP Scope Planner lets you list features, size them and see what fits and what can wait.",
          link: { text: "Sort the screens with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
        { type: "subheading", text: "Before you switch an app off" },
        {
          type: "checklist",
          items: [
            "Each security role has been tested by signing in as a user who holds it",
            "Flows that touched the app's tables have a replacement job, or a reason to retire",
            "Row counts and key totals match after a rehearsal copy",
            "The Power App is made read-only, then unshared once users confirm the new one works",
            "Licences are reduced at the next renewal date rather than assumed to stop at cutover",
          ],
        },
        {
          type: "paragraph",
          text: "Moving a whole estate follows the same pattern at a larger scale, with shared modules and renewal dates setting the order.",
          link: { text: "How a phased exit runs across a larger low-code estate.", href: "/blog/migrate-from-outsystems" },
        },
      ],
    },
    {
      id: "how-long",
      heading: "How long does a Power Apps migration take?",
      blocks: [
        {
          type: "paragraph",
          text: "A canvas app with up to a dozen screens and one data source typically takes four to eight weeks to rebuild and cut over. Model-driven apps over many Dataverse tables, with layered security roles and plug-ins, take longer, and the count of tables and roles sets the pace far more than the count of screens.",
        },
        {
          type: "paragraph",
          text: "Weigh that against what the app costs to keep each year in premium licences and external access, plus the hours lost working around delegation. Then add what you take on, which is hosting and someone to maintain the code. If every user is on staff and the totals come out close, keep the app. A focused first app often fits one of our fixed-price sprints.",
          link: { text: "See what each package includes.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do Power BI reports on Dataverse stop working?",
      answer:
        "Not if you repoint them. Power BI connects to PostgreSQL, so each report moves to the new database as its tables move. Check any measures that relied on Dataverse system columns such as owner or status reason, because those columns may be named or shaped differently in the new schema.",
    },
    {
      question: "Can an AI coding agent turn .pa.yaml files into a React app?",
      answer:
        "It can draft one. Agents read Power Fx formulas and control trees well and will scaffold matching screens and functions, which saves a lot of typing. A developer still designs the data model and checks each rule, because Power Fx behaviour, such as how blanks and delegation work, doesn't translate line for line.",
    },
    {
      question: "Will our Microsoft 365 subscription change?",
      answer:
        "Usually not. Power Apps premium licences are bought on top of Microsoft 365, so you reduce or drop them at renewal while Outlook, Teams and SharePoint carry on as before.",
    },
  ],
}
