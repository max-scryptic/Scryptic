import type { BlogPost } from "@/lib/blog/types"

export const vibeCoding: BlogPost = {
  slug: "vibe-coding-to-production",
  title: "A production audit for your vibe-coded app",
  series: "launch",
  topic: "Vibe coding",
  description:
    "Seven checks a founder can run on a vibe-coded app before real users arrive: data access, secrets, auth, payments, deploys, tests and cost, with fixes.",
  summary:
    "A vibe-coded app is rarely ready for production as it stands, but you can find out how far off it is yourself in an afternoon. Run the seven checks below, one area at a time, and compare what you find with what good looks like. Most apps need hardening, not a rewrite.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Term coined", value: "Andrej Karpathy, early 2025" },
    { label: "Areas to audit", value: "Seven" },
    { label: "Check first", value: "Data access rules" },
    { label: "Usual fix", value: "Harden the code, not rebuild" },
  ],
  sections: [
    {
      id: "how-to-use",
      heading: "How to use this audit",
      blocks: [
        {
          type: "paragraph",
          text: "Would your app survive one curious user opening the browser's developer tools? That's the question this audit answers. Work through the seven areas in order, because they're ranked by how much damage a failure does, and note each one as fine, needs work or broken.",
        },
        {
          type: "paragraph",
          text: "Vibe coding, the term Andrej Karpathy coined in early 2025, means describing what you want to an AI and accepting the code without reading it. Lovable, Bolt, v0 and Replit made it possible for founders without a coding background to ship a working product in a week. The catch is that the AI tested what you saw in the preview: the happy path, with one user, on a good day. Production is everyone else.",
        },
        {
          type: "paragraph",
          text: "You'll need a second browser or a private window, two test accounts, and access to your hosting, database and Stripe dashboards. You don't need to read the code.",
        },
      ],
    },
    {
      id: "data-access",
      heading: "1. Data access",
      blocks: [
        {
          type: "paragraph",
          text: "This is the most serious flaw we see in vibe-coded apps, so check it first. Lovable and several other builders have the browser talk straight to Supabase, using a public key that sits in your frontend by design. Row level security (RLS) is then the only thing stopping one user reading every other user's rows.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "list",
          ordered: true,
          items: [
            "Open the Security Advisor in the Supabase dashboard and note every table flagged with RLS disabled.",
            "Read each policy and look for ones that simply return true, which allow everything.",
            "Sign in as test user A, open the network tab, find a request that loads a record, and change the ID to one belonging to test user B.",
            "Repeat while signed out.",
          ],
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "RLS is on for every table, each table has policies for read, insert, update and delete written for its purpose, and swapping IDs returns nothing. If you can see user B's data from user A's session, stop the audit and fix this today.",
        },
      ],
    },
    {
      id: "secrets",
      heading: "2. Secrets",
      blocks: [
        {
          type: "paragraph",
          text: "Any secret key that reaches the browser is public. In a Vite app, every environment variable starting with VITE_ is bundled into the JavaScript. In Next.js it's NEXT_PUBLIC_. A leaked OpenAI or Stripe secret key can run up a large bill overnight.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "paragraph",
          text: "Search the repository for sk_, sk-, api_key and secret, and look at every environment variable with a public prefix. Then load the live site, open developer tools, and search the loaded JavaScript files for the same strings.",
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "The only keys in the frontend are ones designed to be public, such as the Supabase anon key and the Stripe publishable key. Everything else lives in server code or an edge function, and any key that was ever exposed has been rotated, not just moved.",
        },
      ],
    },
    {
      id: "auth-edge-cases",
      heading: "3. Auth edge cases",
      blocks: [
        {
          type: "paragraph",
          text: "Sign-in almost always works. The paths around it are where vibe-coded apps get shaky, because nobody prompted for them.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "checklist",
          items: [
            "Reset a password and use the link twice",
            "Leave a session open overnight and try to save something",
            "Change the account's email address",
            "Delete an account, then sign up again with the same email",
            "Sign up with Google, sign out, then try email and password with the same address",
            "Open a page that needs a login while signed out",
          ],
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "Each case ends in a clear message or a sensible redirect, never a blank screen, a duplicate account or a page that half loads. Deleted accounts take their data with them, which UK GDPR expects anyway.",
        },
      ],
    },
    {
      id: "payments",
      heading: "4. Payments",
      blocks: [
        {
          type: "paragraph",
          text: "Taking money is easy. Handling what happens after is where it goes wrong. Stripe can send the same webhook event more than once, so a handler that doesn't check for duplicates can add a month's credit twice or book the same slot twice.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "paragraph",
          text: "In Stripe's test mode, run a successful payment, a declined card, a cancellation and a refund. Then resend one webhook event from the Stripe dashboard and see whether anything happens twice. Finally, find where the app decides a user has paid: is it a webhook on the server, or a redirect to a thank you page that anyone could visit?",
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "Webhooks are processed on the server with the signature verified, handled event IDs are recorded so repeats do nothing, failed renewals and cancellations change the user's access, and the success page grants nothing on its own.",
        },
      ],
    },
    {
      id: "deploys-and-rollbacks",
      heading: "5. Deploys and rollbacks",
      blocks: [
        {
          type: "paragraph",
          text: "If every prompt goes straight to the live app and the live database, one bad change reaches every user at once. The question is how quickly you can undo it.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "list",
          items: [
            "Is there a staging environment with its own database, or does everything happen in production?",
            "Can you roll the site back to yesterday's version in a couple of clicks? Vercel and Netlify both keep previous deployments for this.",
            "Are database changes stored as migration files in the repository, or made by clicking around the dashboard?",
            "When did you last restore a database backup, and did it work?",
            "Are you making changes in the builder and in the repository at the same time?",
          ],
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "Separate development, staging and production databases, schema changes through migrations, one place where changes are made, and a backup you have actually restored at least once. The repository, hosting, domain, database and Stripe account are all in your name.",
        },
      ],
    },
    {
      id: "tests",
      heading: "6. Tests",
      blocks: [
        {
          type: "paragraph",
          text: "Most vibe-coded apps have no automated tests at all, which means customers are the test suite. You don't need many. You need the few that cover what makes money.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "paragraph",
          text: "Look for a tests or e2e folder and a workflow file under .github in the repository. If there are tests, check whether they run on every push and whether the last run passed. Then notice how often a prompt that fixed one thing broke another in the last month.",
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "End to end tests for sign-up, sign-in, checkout and the core workflow, run automatically on every push, with a failing test blocking the deploy. Playwright is a good default. Error tracking such as Sentry catches what the tests miss, so you hear about failures before customers email.",
        },
      ],
    },
    {
      id: "cost",
      heading: "7. Cost",
      blocks: [
        {
          type: "paragraph",
          text: "Generated code is written to work, not to be cheap. The usual surprises are AI calls with no limits, queries that fetch every row, and builder credits spent undoing changes.",
        },
        { type: "subheading", text: "How to check" },
        {
          type: "paragraph",
          text: "Find every endpoint that calls an AI model and ask what stops one user calling it a thousand times. Check whether spending limits and alerts are set on your AI provider, hosting and database accounts. Load your busiest page with the network tab open and look for requests that return far more rows than the screen shows.",
        },
        { type: "subheading", text: "What good looks like" },
        {
          type: "paragraph",
          text: "Rate limits on anything that costs money per call, a hard spending cap where the provider offers one and alerts where it doesn't, pagination and database indexes on large tables, and a rough monthly cost per active user you could explain to an investor.",
        },
      ],
    },
    {
      id: "scoring",
      heading: "Reading your results",
      blocks: [
        {
          type: "paragraph",
          text: "Anything broken in areas 1, 2 or 4 is a launch blocker. Fix those before you take payments or store personal data, because a flaw there can become a data breach you have to report under UK GDPR. Areas 5 to 7 can be improved while the app is live.",
        },
        {
          type: "paragraph",
          text: "If most areas came back as needs work, that's normal, and it still usually means hardening rather than rebuilding. A good developer keeps what works, fixes what the audit found and tidies only the files you change every week. If someone's first suggestion is a full rewrite, ask them why. Scryptic does this work as part of full builds, from £10,000 depending on complexity, and you keep the code and every account throughout.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is vibe coding?",
      answer:
        "Vibe coding is building software by describing what you want to an AI in plain English and accepting the code it writes without reading it closely. Andrej Karpathy coined the term in early 2025. Tools like Lovable, Bolt, v0 and Replit have made it popular with people who don't code.",
    },
    {
      question: "Is vibe coding safe?",
      answer:
        "It's safe for prototypes and internal experiments, but risky in production without a review. The most common problems are database access rules that let users read each other's data and secret keys exposed in the browser. Both are fixable once someone goes looking for them.",
    },
    {
      question: "Do I need to rewrite my vibe-coded app before launch?",
      answer:
        "Usually not. Most vibe-coded apps are standard React and TypeScript, often backed by Supabase, so the work is locking down data access, moving secrets to the server, handling payments properly, and adding tests, staging and monitoring. A rewrite only makes sense if the app has outgrown its original design.",
    },
    {
      question: "Is AI generated code secure?",
      answer:
        "Not automatically. It can be secure, but it is written to make a feature work, and security gaps don't show up in a preview. Treat it like code from a quick but unsupervised junior developer: review it, test it, and check who can read each table before real users rely on it.",
    },
  ],
}
