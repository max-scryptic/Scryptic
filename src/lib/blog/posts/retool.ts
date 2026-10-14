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
    "What changes when customers start logging in to an internal Retool app, from auth and row level permissions to tenancy, billing and design, and what to do.",
  summary:
    "When customers rather than staff start logging in, a Retool app stops being the right home for that part of the business. The interface cannot be exported as code, so the customer side is rebuilt as a proper web app on the same database, while Retool stays for internal admin. The work is less about screens and more about trust, tenancy and billing.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "internal-tool-to-product",
      heading: "Why an internal Retool app struggles once customers log in",
      blocks: [
        {
          type: "paragraph",
          text: "A Retool app built for your own team is designed around people you trust, a single organisation and no revenue of its own. Once customers log in, all three assumptions break, and fixing them is product work rather than a few extra screens.",
        },
        {
          type: "paragraph",
          text: "Most Retool apps start the same way. Someone connects Retool to the company database so the team can look things up, update records and stop working out of spreadsheets. It does that job well. It doesn't have to be pretty, because the only people using it sit in the same office or the same Slack workspace.",
        },
        {
          type: "paragraph",
          text: "The shift usually happens gradually. A customer asks to see their own data instead of emailing for updates, and gets a login. Then a few more ask. At some point the tool your staff use every day has become something customers rely on and would pay for, and it is still built like an internal tool. The rest of this guide goes through what changes when that happens, area by area, and what we would do about it.",
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
          text: "Retool handles staff logins neatly, usually through your company's Google account or single sign-on. Customers need something different: public sign-up or invitation by email, password resets, email verification, sessions that expire, and for larger customers, single sign-on with their own identity provider. Retool does support external users on some plans, billed separately from internal users, and for a modest portal that can be enough for a while. It gets awkward once the number of customer logins grows, once you want people to sign themselves up, or once the per-user cost starts influencing who you are willing to invite.",
        },
        {
          type: "paragraph",
          text: "Watch for one symptom in particular: customers sharing logins with colleagues because adding a new person means asking your team to do it. That is a sign the access model was never built for them. A product lets each customer's own admin invite and remove their own staff, and lets you see who actually did what.",
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
          text: "Most Retool apps connect to the database through a single resource with broad credentials, because staff were allowed to see everything. Queries are often written directly in SQL in the editor, with filters that depend on values from the interface. That is fine for a trusted team. For customers, one missed condition in one query means a customer sees another customer's records, which is both a commercial disaster and a reportable data breach under UK GDPR.",
        },
        {
          type: "paragraph",
          text: "The safer shape is a backend with an API between the interface and the database, its own database credentials with only the access it needs, and a check on every endpoint that the record belongs to the signed-in customer. Postgres row level security can enforce the same rule inside the database as a second line of defence, so a mistake in application code fails closed rather than leaking data.",
        },
      ],
    },
    {
      id: "multi-tenancy",
      heading: "One organisation becomes many",
      blocks: [
        {
          type: "paragraph",
          text: "A product with many customers needs multi-tenancy designed in, rather than patched on. Internal tools rarely have the concept of an organisation, because there is only one: yours.",
        },
        {
          type: "paragraph",
          text: "In practice that means an organisations table, every customer-owned record carrying an organisation ID, and users who belong to an organisation with a role inside it. It also means deciding early what happens when one person works with two of your customers, as agents, consultants and outsourced finance teams often do, and whether a customer's data can ever be deleted on request.",
        },
        {
          type: "paragraph",
          text: "Retrofitting an organisation ID onto a database that Retool apps already depend on takes care. The internal apps still need to work while the schema changes underneath them, so each migration is checked against the Retool queries that read those tables before it runs. Adding a column is usually harmless; renaming one or making it required can break a Retool screen your team uses all day.",
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
          text: "Pricing choices shape the data model too. Per-seat pricing needs a count of active users per organisation. Usage pricing, such as a fee per order processed or per record tracked, needs reliable usage records that can be reconciled against invoices. Decide the pricing model before building the billing, because changing it later touches every part of the app.",
        },
      ],
    },
    {
      id: "design",
      heading: "It has to look like yours",
      blocks: [
        {
          type: "paragraph",
          text: "Customers judge your company by the screens they log in to, so the customer app needs your branding and a design built for occasional visitors, not daily operators. Retool's components are built for people who use the same screen all day: dense tables, forms and buttons. Customers visit now and then and need to understand a screen in seconds. They expect your branding, a clear first-run experience, sensible empty states, emails that look like they came from you, and a layout that works on a phone.",
        },
        {
          type: "paragraph",
          text: "This is the part that cannot be carried across. Retool exports apps as JSON or Toolscript files that only Retool can run, which makes them excellent backups and a precise specification, but they cannot become a React app. The customer interface is designed and built fresh, usually in a framework such as Next.js.",
        },
      ],
    },
    {
      id: "what-to-do",
      heading: "What to do when your Retool app becomes a product",
      blocks: [
        {
          type: "paragraph",
          text: "Split by audience, not by technology. Your team keeps Retool, because it is very good at exactly that job and rebuilding admin screens in code is rarely a good use of money. Customers get a proper web app, built on the same Postgres database, with its own backend and credentials.",
        },
        {
          type: "paragraph",
          text: "Treat the Retool apps as the specification. Write down every query, JavaScript transformer and Retool Workflow behind the screens customers use, because the conditions hidden in them are easy to miss and they often quietly correct data. Scheduled workflows become backend jobs with retries and alerts. If any data lives in Retool Database, which is managed Postgres, it can be copied out with standard Postgres tools or exported as CSV.",
        },
        {
          type: "paragraph",
          text: "Then run the new app in parallel. Move a handful of friendly customers across first while everyone else stays on Retool, compare results on real data, and only then move the remaining customers and remove their Retool access. For a focused customer-facing app, four to eight weeks is a realistic timeline, and keeping internal admin in Retool is what keeps it that short.",
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
