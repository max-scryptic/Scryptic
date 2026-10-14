import type { BlogPost } from "@/lib/blog/types"

export const vibeCoding: BlogPost = {
  slug: "vibe-coding-to-production",
  title: "From vibe coding to a production app",
  series: "launch",
  topic: "Vibe coding",
  description:
    "What vibe coding is, what it is good for, where vibe-coded apps break in production, and a practical checklist to make one secure and ready for real users.",
  summary:
    "Vibe coding gets you from an idea to a working app quickly, but a vibe-coded app is rarely ready for production as it stands. Getting it there usually means owning the code, locking down data access and secrets, adding tests and a staging environment, and fixing the edge cases the AI never saw. Most of the time that's a hardening job, not a rewrite.",
  datePublished: "2026-10-14",
  facts: [
    { label: "Term coined", value: "Andrej Karpathy, early 2025" },
    { label: "Good for", value: "Prototypes, validation, internal tools" },
    { label: "Biggest risk", value: "Open data access and exposed secrets" },
    { label: "Usual fix", value: "Harden the code, not rebuild" },
  ],
  sections: [
    {
      id: "what-is-vibe-coding",
      heading: "What is vibe coding?",
      blocks: [
        {
          type: "paragraph",
          text: "Vibe coding is building software by describing what you want in plain English and letting an AI write the code, accepting its changes without really reading them. Andrej Karpathy, a founding member of OpenAI and former director of AI at Tesla, coined the term in early 2025 for exactly that: going with the vibes and more or less forgetting the code exists.",
        },
        {
          type: "paragraph",
          text: "The phrase now gets used for any AI-assisted building, but the original meaning is the useful one. A developer using Cursor or Claude Code and reviewing every diff isn't vibe coding. Vibe coding is when nobody reads the code, so nobody knows what it does beyond what the preview shows. For a weekend project that's fine. For an app holding customers' data it's a problem that hasn't happened yet.",
        },
      ],
    },
    {
      id: "tools",
      heading: "Which tools do people use for vibe coding?",
      blocks: [
        {
          type: "paragraph",
          text: "Most vibe coding happens in browser-based app builders aimed at non-developers. A second group of AI coding tools works on a codebase on your own machine.",
        },
        {
          type: "list",
          items: [
            {
              term: "Lovable",
              text: "Writes React and TypeScript with Supabase behind it, and syncs the code to GitHub. A Lovable app can usually go to production once the work in the checklist below is done.",
            },
            {
              term: "Bolt",
              text: "Generates and runs full-stack JavaScript apps in the browser. You can download the code or push it to GitHub.",
            },
            {
              term: "v0",
              text: "Vercel's builder. Strongest at React and Next.js interfaces, and deploys straight to Vercel.",
            },
            {
              term: "Replit",
              text: "A browser-based development environment where an AI agent builds, runs and hosts the app in one place.",
            },
            {
              term: "Cursor, Claude Code and similar",
              text: "Editors and command line agents that work on a real codebase. You can vibe code with them, but they're just as useful to a developer who reads what they write.",
            },
          ],
        },
      ],
    },
    {
      id: "good-for",
      heading: "What is vibe coding actually good for?",
      blocks: [
        {
          type: "paragraph",
          text: "It's good for anything where learning fast matters more than being reliable. A founder with no coding background can now put a working product in front of users in a week, and that's a real change. A working prototype beats a slide in any customer conversation, and you can find out whether people sign up and come back before paying anyone to build it properly.",
        },
        {
          type: "paragraph",
          text: "It's also fine, often permanently, for internal tools: a dashboard three colleagues use, with no sensitive data and nothing public. Don't spend money hardening that. And if a developer later rebuilds parts of a vibe-coded app, it'll be one of the clearest specs they've been handed.",
        },
      ],
    },
    {
      id: "where-it-breaks",
      heading: "Where do vibe-coded apps break in production?",
      blocks: [
        {
          type: "paragraph",
          text: "They break wherever the preview never looked: other users, attackers, failures and data volume. You tested the happy path, so the happy path works. Production is mostly everything else.",
        },
        {
          type: "list",
          items: [
            {
              term: "Data access rules",
              text: "Lovable and several other builders have the browser talk straight to Supabase. The anon key sits in your frontend by design, so row level security is the only thing between one user and every other user's rows. A table with RLS off, or a policy that simply returns true, is readable by anyone who opens the browser's developer tools. This is the most common serious flaw we see in vibe-coded apps, and the first thing to check.",
            },
            {
              term: "Secrets in the browser",
              text: "In a Vite app, any environment variable starting with VITE_ ends up in the JavaScript bundle. In Next.js it's NEXT_PUBLIC_. Put an OpenAI or Stripe secret key behind either prefix and anyone can copy it, and a leaked AI key can run up a large bill overnight.",
            },
            {
              term: "Authentication edge cases",
              text: "Sign-in works. Password resets, expired sessions, changing an email address, deleting an account, and the same person signing up once with Google and once with email are where it gets shaky.",
            },
            {
              term: "Payment webhooks",
              text: "Taking money is the easy part. Stripe can deliver the same event more than once, so a handler that doesn't check for duplicates can book the same class twice or add a month's credit twice. Failed renewals, refunds and cancellations need handling too.",
            },
            {
              term: "No tests, no staging",
              text: "Every prompt goes straight to the live app and the live database. Without tests you find out something broke when a customer emails you.",
            },
            {
              term: "Error handling",
              text: "When an API call fails, generated code often shows a blank screen or swallows the error, and nobody gets told.",
            },
            {
              term: "Performance",
              text: "Fetching every row and filtering in the browser is fine with ten records and painful with ten thousand. Missing database indexes are the other usual culprit.",
            },
            {
              term: "A codebase nobody understands",
              text: "Components hundreds of lines long, the same logic pasted into five files, and two half-finished approaches to the same problem. Every change is a gamble, for the AI and for whoever you hire.",
            },
          ],
        },
      ],
    },
    {
      id: "is-it-safe",
      heading: "Is vibe coding safe?",
      blocks: [
        {
          type: "paragraph",
          text: "For prototypes, yes. For production, not without a review, because AI generated code is only as secure as the checking it gets. The model isn't careless. It's trying to make the feature work in front of you, and security holes don't show up in a preview.",
        },
        {
          type: "paragraph",
          text: "This isn't hypothetical. In 2025 security researchers found many apps built with AI builders whose databases anyone could read, because the access rules were missing or wrong. The fixes are the same boring basics as for any code: decide who can read and write each table, keep secrets on the server, validate input on the server, and keep dependencies updated.",
        },
        {
          type: "callout",
          title: "Check yours this afternoon",
          text: "If you're on Supabase, open the Security Advisor in the dashboard, which flags tables with RLS turned off. Then sign in as an ordinary test user, open the network tab in your browser's developer tools, and try loading another user's record by changing its ID in a request. If you can see it, fix that before anything else.",
        },
      ],
    },
    {
      id: "checklist",
      heading: "How do you get a vibe-coded app production ready?",
      blocks: [
        {
          type: "paragraph",
          text: "Own it, secure it, make it safe to change, then make it reliable, in that order. The app keeps working at every step, so your users don't have to wait for you.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            {
              term: "Take ownership",
              text: "The repository in your own GitHub organisation, and the Supabase project, hosting, domain and Stripe account all in your name.",
            },
            {
              term: "Pick one place to make changes",
              text: "Either keep prompting in the builder or work in the repository. Doing both through two-way sync is how you lose an afternoon to merge conflicts.",
            },
            {
              term: "Lock down data access",
              text: "RLS on every table, a policy written for each one, and every policy tested as a normal user and as a signed-out visitor.",
            },
            {
              term: "Move secrets to the server and rotate them",
              text: "Search the repository for sk_, sk- and api_key, and for anything long and random. Anything that isn't meant to be public goes into server code or an edge function, and any key that has ever been in the frontend gets rotated, not just moved.",
            },
            {
              term: "Validate on the server",
              text: "Anything that costs money, sends email or changes another user's data gets checked server-side, whatever the form in the browser does.",
            },
            {
              term: "Set up staging",
              text: "Separate development, staging and production databases, with schema changes made through migrations in the repository instead of by clicking around the Supabase dashboard.",
            },
            {
              term: "Test what makes money",
              text: "End to end tests for sign-up, sign-in, checkout and the core workflow, run on every push. Playwright is a good default for these.",
            },
            {
              term: "Handle payments properly",
              text: "Process Stripe webhooks on the server, verify the signature, record which event IDs you've already handled, and cover failed payments and cancellations.",
            },
            {
              term: "Add monitoring and backups",
              text: "Error tracking such as Sentry, an uptime check, and automatic database backups that you've actually restored at least once.",
            },
            {
              term: "Refactor where it hurts",
              text: "Tidy the files you change every week. Leave stable screens alone, however ugly they are.",
            },
          ],
        },
      ],
    },
    {
      id: "when-to-bring-in-a-developer",
      heading: "When should you bring in a developer?",
      blocks: [
        {
          type: "paragraph",
          text: "Before you take payments, store personal data, or sign a customer who'll ask how their data is protected. That's when a hidden flaw stops being embarrassing and starts being a liability, possibly a data breach you have to report under UK GDPR.",
        },
        {
          type: "paragraph",
          text: "The other signs are that every prompt fixes one thing and breaks another, you're spending more credits undoing changes than making them, or an investor wants someone to look at the code. A decent developer will keep most of what you have and harden it. If the first thing someone suggests is a full rewrite, ask them why. The blog has step by step migration guides for Lovable, Bolt, v0 and Replit that show what the work looks like for each tool. If you'd rather hand it over, Scryptic takes vibe-coded apps to production as part of its full builds, from £10,000 depending on complexity, and you own the code and every account throughout.",
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
        "It's safe for prototypes and internal experiments, but risky in production without a review. The usual problems are database access rules that let users read each other's data, and secret keys exposed in the browser. Both are fixable, but someone has to go looking for them.",
    },
    {
      question: "Can a vibe-coded app go to production?",
      answer:
        "Yes, once it's been hardened. That means securing data access, moving secrets to the server, adding tests, a staging environment and monitoring, and handling payments properly. Most vibe-coded apps are worth keeping rather than rebuilding.",
    },
    {
      question: "Do I need to rewrite my Lovable app before launch?",
      answer:
        "Usually not. A Lovable app is standard React and TypeScript backed by Supabase, so the work is reviewing row level security, getting secrets out of the frontend, adding tests and environments, and tidying the code you change most. A rewrite only makes sense if the app has outgrown its original design.",
    },
    {
      question: "Is AI generated code secure?",
      answer:
        "Not automatically. It can be perfectly secure, but it's written to make a feature work, and security gaps don't show up in a preview. Treat it like code from a quick but unsupervised junior developer: review it, test it, and check data access before real users rely on it.",
    },
  ],
}
