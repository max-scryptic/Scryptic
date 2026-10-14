import glideLogo from "@/assets/blog/logos/glide.svg"
import type { BlogPost } from "@/lib/blog/types"

export const glide: BlogPost = {
  slug: "migrate-from-glide",
  title: "Leaving Glide? Five questions to answer before you rebuild",
  series: "migration",
  topic: "Glide",
  logo: glideLogo,
  category: "No-code app builders",
  description:
    "Thinking of leaving Glide? Five questions to settle first: tool or product, Sheets or Glide Tables, row and update limits, emailed codes, and what you lose.",
  summary:
    "Leave Glide when the app has become a customer-facing product or a critical system, not just because it feels limited. Glide does not export code, so leaving means a rebuild, but your data comes with you and your users will barely notice the sign-in change.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  facts: [
    { label: "Code export", value: "No, the app is rebuilt" },
    { label: "Data export", value: "CSV, the Glide API, or your own sheets" },
    { label: "Usual approach", value: "Staged rebuild, then move the data" },
    { label: "Typical timeline", value: "3 to 6 weeks" },
  ],
  sections: [
    {
      id: "tool-or-product",
      heading: "Is my app still a tool, or has it become the product?",
      blocks: [
        {
          type: "paragraph",
          text: "If it's an internal tool that works and costs a steady amount, stay. Glide is one of the quickest ways to give a team a clean interface on its data, and a rebuild would only add maintenance.",
        },
        {
          type: "paragraph",
          text: "It's a different story once customers log in, pay, or expect their own branded app, an app store listing, or straight answers about where their data lives. The same goes for an internal app the business would stop without. At that point you need server-side rules, tests and a release process, and those are hard to bolt onto a spreadsheet front end.",
        },
      ],
    },
    {
      id: "sheets-or-glide-tables",
      heading: "Does it matter whether my data is in Google Sheets or Glide Tables?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, it changes the order of the move. Data in Google Sheets, Airtable or Excel already sits in your own account, so nothing needs exporting and you can build the new app against it before moving anything.",
        },
        {
          type: "list",
          items: [
            {
              term: "Google Sheets or Airtable",
              text: "Build the new app to read and write through their APIs, behind your own server code. Run it alongside Glide with a small group, then move the data to Postgres once the app has proved itself. Treat the sheet as temporary: API rate limits and hand edits catch up with a busy app.",
            },
            {
              term: "Glide Tables",
              text: "Export each table to CSV from the Data Editor, then import straight into Postgres.",
            },
            {
              term: "Big Tables",
              text: "These also export to CSV, with the file sent by email, and can be read through Glide's API. API reads count towards your update usage, so check your plan before scripting a big pull.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Whichever source you have, export the row ID columns too. If tables are linked by Glide row IDs and those columns are missing, you can't reconnect the records afterwards.",
        },
      ],
    },
    {
      id: "limits",
      heading: "Am I actually hitting row and update limits, or just worried about them?",
      blocks: [
        {
          type: "paragraph",
          text: "Look at the usage page before deciding. Glide plans cap rows and bill for updates, and the figures change between plans and over time, so check your current plan rather than a forum post.",
        },
        {
          type: "paragraph",
          text: "If you're close to the row cap, or the update count rises with every new customer so the bill grows faster than the value each user brings, that's a real reason to move. If the app is merely slow on one big table, try a Big Table or trimming the computed columns on that screen first. That's an afternoon's work, not a rebuild.",
        },
      ],
    },
    {
      id: "emailed-codes",
      heading: "What happens to users who sign in with emailed codes?",
      blocks: [
        {
          type: "paragraph",
          text: "Very little, which is good news. Glide's default sign-in emails a one-time code instead of using passwords, so there are no password hashes to lose.",
        },
        {
          type: "paragraph",
          text: "Export the users table with emails, roles and profile columns, import it, and give the new app magic links or one-time codes. People sign in the way they always have. The part that doesn't carry over is row owners: Glide uses them to decide which rows reach each device, and in a coded app every request is checked on the server instead. Rebuild those rules and test them signed in as each kind of user, never only as an admin.",
        },
      ],
    },
    {
      id: "what-you-lose",
      heading: "What do I lose when I leave, and how big is the rebuild?",
      blocks: [
        {
          type: "paragraph",
          text: "You lose the screens, actions, workflows and computed columns, and you keep everything else. Most first releases take 3 to 6 weeks, depending on screens, roles and how much the data needs cleaning.",
        },
        {
          type: "callout",
          title: "Computed columns are logic, not data",
          text: "Relations, lookups, rollups, if-then-else and template columns are calculated by Glide, so they never appear in a CSV. List every one with what it does before you export anything, then rebuild each as a database query, view or piece of code. Forgotten rollups are the usual reason totals and statuses go missing after launch.",
        },
        {
          type: "paragraph",
          text: "Clean the data while you're at it: inconsistent dates, duplicate rows and free text where there should be a fixed list are fine in a sheet and rejected by a database. At cutover, point your domain at the new app, keep the Glide app read-only for a few weeks, and remove staff edit access to the old sheet so nobody keeps updating the wrong copy.",
        },
      ],
    },
  ],
  faqs: [],
}
