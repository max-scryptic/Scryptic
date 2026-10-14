import softrLogo from "@/assets/blog/logos/softr.svg"
import type { BlogPost } from "@/lib/blog/types"

export const softr: BlogPost = {
  slug: "migrate-from-softr",
  title: "The Softr to custom app migration checklist",
  series: "migration",
  topic: "Softr",
  logo: softrLogo,
  category: "No-code app builders",
  description:
    "A checklist for replacing a Softr portal with a coded app: permissions to write down, data and users to move, a safe cutover and what to check after launch.",
  summary:
    "Softr doesn't export code, so replacing it means rebuilding the app, but your data usually already sits in Airtable, Google Sheets or a database you control. That lets you build the new app against the same data, run both side by side, and only then move everything into Postgres. Most Softr rebuilds reach a first production release in three to six weeks.",
  datePublished: "2026-10-13",
  sections: [
    {
      id: "before-you-start",
      heading: "Before you start",
      blocks: [
        {
          type: "paragraph",
          text: "Say your Softr client portal has grown to a few hundred customers, each seeing their own projects, invoices and files, and you're now hitting user limits and building workarounds for features the blocks can't express. That's the point where a rebuild pays off. Start by writing down what the Softr app really does, because none of it exports.",
        },
        {
          type: "checklist",
          items: [
            "List every page and which user groups can reach it",
            "List every block, with the filters and conditions set on it",
            "List every form, what it writes and where",
            "List every Softr workflow and what triggers it",
            "List every outside automation in Zapier, Make or Airtable that touches the same data",
            "Note which pages each group actually uses, and mark the rest to drop",
            "Write the permission rules for each user group in plain words: which records they can see, create, edit and delete",
            "Get the business owner to sign off those rules",
            "Decide what not to rebuild on day one",
          ],
        },
        {
          type: "callout",
          title: "Permissions are the hard part",
          text: "In Softr, who sees what is often spread across user groups, page visibility and filters on each block. A missed filter in the rebuild means one client seeing another client's records. The plain-language rules you write here become the most important tests in the new app.",
        },
      ],
    },
    {
      id: "data-and-users",
      heading: "Data and users",
      blocks: [
        {
          type: "paragraph",
          text: "Where your data lives decides how much work this is. Softr is a front end over a data source, so the records are usually already yours.",
        },
        {
          type: "subheading",
          text: "If Softr reads from Airtable or Google Sheets",
        },
        {
          type: "checklist",
          items: [
            "Confirm the base or sheet is in a business account, not someone's personal login",
            "Build the new app against the same base through its API, behind one layer of server code",
            "Map each table to Postgres, replacing linked records with foreign keys",
            "Keep each Airtable record ID in a legacy column",
            "Script the import into Postgres and rehearse it until counts and links match",
          ],
        },
        {
          type: "subheading",
          text: "If Softr reads from a SQL database or Softr Databases",
        },
        {
          type: "checklist",
          items: [
            "For PostgreSQL, MySQL, SQL Server, MariaDB, Supabase or Xano, leave the database where it is and point the new app at it",
            "For Softr Databases, read the records through the Softr Database API into Postgres",
            "Check whether a direct CSV export is available in your workspace, as this has been changing",
            "Keep each Softr record ID in a legacy column",
          ],
        },
        {
          type: "subheading",
          text: "Users",
        },
        {
          type: "checklist",
          items: [
            "Download the user list as a CSV from Softr's Users area",
            "Map each Softr user group to a role in the new app",
            "Import accounts without passwords, because they don't export",
            "Set up a magic link or set-password email for first sign-in",
            "Send it from your own domain, with email authentication in place",
          ],
        },
      ],
    },
    {
      id: "cutover",
      heading: "Cutover",
      blocks: [
        {
          type: "paragraph",
          text: "Run both apps in parallel first, then switch in one short window. While the new app reads the same Airtable base or sheet as Softr, nothing needs syncing, which makes the overlap easy.",
        },
        {
          type: "checklist",
          items: [
            "Invite a small group of users to the new app while Softr serves everyone else",
            "Test as each user group, signed in as an ordinary user, not as an admin",
            "Email all users a few days ahead so the sign-in email is expected",
            "Pause outside automations that write to the old data source",
            "Run the final data import into Postgres and compare counts",
            "Repoint those automations at the new app, or rebuild them as server jobs",
            "Point your custom domain at the new app",
            "Add redirects from old Softr page paths, which still sit in client emails and documents",
            "Switch Softr to read-only rather than deleting it",
          ],
        },
      ],
    },
    {
      id: "after-launch",
      heading: "After launch",
      blocks: [
        {
          type: "paragraph",
          text: "Give it a few weeks before you close anything. Softr stays as your reference while you watch for gaps.",
        },
        {
          type: "checklist",
          items: [
            "Check error tracking daily for the first week",
            "Resend sign-in links to anyone who hasn't logged in",
            "Re-run the permission tests against live data",
            "Confirm every workflow and email that Softr used to send is now firing",
            "Make sure nothing still writes to Airtable or Sheets after the data has moved",
            "Cancel the Softr plan once nobody has needed it for a couple of weeks",
            "Archive the old base or sheet, read-only, for your records",
          ],
        },
        {
          type: "paragraph",
          text: "Not every Softr app needs this. A portal or internal tool that does its job within comfortable plan limits is often better left alone, because non-developers can change it in minutes. Rebuild when the app is your core product, when permissions have become risky to manage by configuration, or when seat and record limits are shaping your pricing.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my Softr app as code?",
      answer:
        "No. Softr does not export source code. Your data usually already lives in Airtable, Google Sheets or a SQL database you control, and Softr Databases can be read through its API, but the pages, permissions and workflows have to be rebuilt.",
    },
    {
      question: "Can I keep using Airtable after leaving Softr?",
      answer:
        "Yes, for a while. A new app can read and write the same Airtable base, which lets you launch without moving data first. Plan to move to Postgres soon after, because Airtable's API rate limits and record limits are not built for a busy app.",
    },
    {
      question: "How long does it take to replace a Softr app?",
      answer:
        "Typically three to six weeks to a production first release, depending on the number of pages and user groups, how complex the permission rules are, and how much data needs cleaning.",
    },
  ],
}
