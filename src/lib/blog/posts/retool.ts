import retoolLogo from "@/assets/blog/logos/retool.svg"
import type { BlogPost } from "@/lib/blog/types"

export const retool: BlogPost = {
  slug: "migrate-from-retool",
  title: "When your Retool tool becomes the product",
  series: "migration",
  topic: "Retool",
  logo: retoolLogo,
  category: "Internal tool builders",
  description:
    "A worked example of an internal Retool app turning into a customer product, and what changes when customers log in: auth, permissions, tenancy and billing.",
  summary:
    "When customers rather than staff start logging in, a Retool app stops being the right home for that part of the business. The interface cannot be exported as code, so the customer side is rebuilt as a proper web app on the same database, while Retool stays for internal admin. The work is less about screens and more about trust, tenancy and billing.",
  datePublished: "2026-10-13",
  sections: [
    {
      id: "the-example",
      heading: "A hypothetical freight company and its Retool app",
      blocks: [
        {
          type: "paragraph",
          text: "Say you run a small freight forwarding business with twelve staff. Two years ago someone built a Retool app on top of your Postgres database so the operations team could track shipments, update statuses and chase paperwork. It works well. It is ugly, but nobody minds, because the only people using it are your own team.",
        },
        {
          type: "paragraph",
          text: "Then a large customer asks whether they can see their shipments themselves instead of emailing your team for updates. You give them a login. A few more customers ask. Within six months, some forty customers expect access, a competitor has launched a polished portal, and you realise the thing you built for staff has quietly become a product people would pay for.",
        },
        {
          type: "paragraph",
          text: "This example is hypothetical, but the pattern is common. What follows is what changes when that happens, area by area, and what the founder in this story would sensibly do about it.",
        },
      ],
    },
    {
      id: "auth",
      heading: "The day customers log in, the trust model flips",
      blocks: [
        {
          type: "paragraph",
          text: "Internal tools assume every user is a well-meaning colleague. Products have to assume some users are not. That one change ripples through everything else.",
        },
        {
          type: "paragraph",
          text: "Retool handled staff logins neatly, usually through your company's Google account or single sign-on. Customers need something different: public sign-up or invitation by email, password resets, email verification, sessions that expire, and for larger customers, single sign-on with their own identity provider. Retool does support external users on some plans, billed separately from internal users, and for a modest portal that can be enough for a while. It gets awkward once the number of customer logins grows, once you want people to sign themselves up, or once the per-user cost starts influencing who you are willing to invite.",
        },
        {
          type: "paragraph",
          text: "In our freight example, the founder would also notice that customers forward their logins to colleagues, because adding a new person means emailing your team. A product lets a customer's own admin invite and remove their own staff.",
        },
      ],
    },
    {
      id: "permissions",
      heading: "Permissions stop being about roles and start being about rows",
      blocks: [
        {
          type: "paragraph",
          text: "Staff permissions are about what kind of person you are: ops can edit, finance can see invoices. Customer permissions are about which records are yours. Every query has to be limited to the customer who is signed in, and that limit has to be enforced on the server, not trusted from the screen.",
        },
        {
          type: "paragraph",
          text: "Most Retool apps connect to the database through a single resource with broad credentials, because staff were allowed to see everything. Queries are often written directly in SQL in the editor, with filters that depend on values from the interface. That is fine for a trusted team. For customers, one missed condition in one query means a customer sees another customer's shipments, which is both a commercial disaster and a reportable data breach under UK GDPR.",
        },
        {
          type: "paragraph",
          text: "The safer shape is a backend with an API between the interface and the database, its own database credentials with only the access it needs, and a check on every endpoint that the record belongs to the signed-in customer. Postgres row level security can enforce the same rule inside the database as a second line of defence.",
        },
      ],
    },
    {
      id: "multi-tenancy",
      heading: "One customer becomes forty",
      blocks: [
        {
          type: "paragraph",
          text: "A product with many customers needs multi-tenancy designed in, rather than patched on. Internal tools rarely have the concept of an organisation, because there is only one: yours.",
        },
        {
          type: "paragraph",
          text: "In practice that means an organisations table, every customer-owned record carrying an organisation ID, and users who belong to an organisation with a role inside it. It also means deciding early what happens when one person works with two of your customers, as freight agents often do, and whether a customer's data can ever be deleted on request. Retrofitting an organisation ID onto a database that Retool apps already depend on takes care: the internal apps still need to work while the schema changes underneath them, so each migration is checked against the Retool queries that read those tables.",
        },
      ],
    },
    {
      id: "billing",
      heading: "Someone has to pay for it",
      blocks: [
        {
          type: "paragraph",
          text: "Retool has no way to bill your customers, so billing is new work, not a migration. Even a simple plan needs a payment provider such as Stripe, a subscription per organisation rather than per user, webhooks that turn access on and off when payments succeed or fail, invoices with VAT that a finance department will accept, and a way to handle the customer who wants to pay by bank transfer.",
        },
        {
          type: "paragraph",
          text: "Pricing choices shape the data model too. Per-seat pricing needs a count of active users per organisation. Usage pricing, such as a fee per shipment tracked, needs reliable usage records. It is worth deciding the pricing model before building the billing, because changing it later touches every part of the app.",
        },
      ],
    },
    {
      id: "design",
      heading: "It has to look like yours",
      blocks: [
        {
          type: "paragraph",
          text: "Retool's components are built for operators who use the same screen all day: dense tables, forms and buttons. Customers visit occasionally, need to understand the screen in seconds, and judge your company by it. They expect your branding, a clear first-run experience, sensible empty states, emails that look like they came from you, and a layout that works on a phone in a warehouse.",
        },
        {
          type: "paragraph",
          text: "This is the part that cannot be carried across. Retool exports apps as JSON or Toolscript files that only Retool can run, which makes them excellent backups and a precise specification, but they cannot become a React app. The customer interface is designed and built fresh, usually in a framework such as Next.js.",
        },
      ],
    },
    {
      id: "what-to-do",
      heading: "What the founder in this story should do",
      blocks: [
        {
          type: "paragraph",
          text: "Split by audience, not by technology. The operations team keeps Retool, because it is very good at exactly that job and rebuilding admin screens in code is rarely a good use of money. Customers get a proper web app, built on the same Postgres database, with its own backend and credentials.",
        },
        {
          type: "paragraph",
          text: "The Retool apps become the specification. Every query, JavaScript transformer and Retool Workflow behind the customer-facing screens gets written down, because the conditions hidden in them are easy to miss and they often quietly correct data. Scheduled workflows become backend jobs with retries and alerts. If any data lives in Retool Database, which is managed Postgres, it can be copied out with standard Postgres tools or exported as CSV.",
        },
        {
          type: "paragraph",
          text: "Then the new app runs in parallel. A handful of friendly customers use it while everyone else stays on Retool, results are compared on real data, and only then are the remaining customers moved across and their Retool access removed. For a product of this size, four to eight weeks is a realistic timeline for the customer-facing app.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export a Retool app as code?",
      answer:
        "No. Retool exports apps as JSON or Toolscript files that only run inside Retool. They are useful as backups and as a specification for a rebuild, but the interface has to be rebuilt in a framework such as React or Next.js to run anywhere else.",
    },
    {
      question: "Can customers use a Retool app?",
      answer:
        "Yes. Retool supports external users on some plans, billed separately from internal users, and that suits portals for a modest number of customers. Products that need public sign-up, a custom branded experience, billing or large user numbers are usually better built as their own app.",
    },
    {
      question: "Do I have to stop using Retool if I build my own app?",
      answer:
        "No. Many companies keep Retool for internal admin and build only the customer-facing product. Both can read and write the same database, as long as schema changes are planned with the Retool apps in mind and the new app uses its own, narrower database credentials.",
    },
    {
      question: "How long does it take to turn a Retool tool into a customer product?",
      answer:
        "Typically four to eight weeks for the customer-facing app, depending on how many workflows, user roles and billing rules it needs. Keeping internal tools in Retool rather than rebuilding them keeps the scope focused.",
    },
  ],
}
