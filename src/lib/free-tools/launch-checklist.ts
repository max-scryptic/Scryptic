/*
 * The App Launch Checklist: five questions about the app pick which items a
 * launch needs, grouped by area. Every item applies to a UK business; items
 * with a `when` only show for the answers that call for them.
 */

export type ChecklistAnswers = {
  platform?: "web" | "mobile" | "both"
  accounts?: "yes" | "no"
  payments?: "none" | "one-off" | "subscriptions"
  market?: "uk" | "europe" | "worldwide"
  ai?: "yes" | "no"
}

export const checklistQuestions: {
  name: keyof ChecklistAnswers
  label: string
  options: { value: string; label: string }[]
}[] = [
  {
    name: "platform",
    label: "What are you launching?",
    options: [
      { value: "web", label: "A web app" },
      { value: "mobile", label: "A mobile app" },
      { value: "both", label: "Both" },
    ],
  },
  {
    name: "accounts",
    label: "Do people sign up for an account?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    name: "payments",
    label: "Does it take payment?",
    options: [
      { value: "none", label: "No" },
      { value: "one-off", label: "One-off payments" },
      { value: "subscriptions", label: "Subscriptions" },
    ],
  },
  {
    name: "market",
    label: "Where are your users?",
    options: [
      { value: "uk", label: "The UK" },
      { value: "europe", label: "The UK and Europe" },
      { value: "worldwide", label: "Worldwide" },
    ],
  },
  {
    name: "ai",
    label: "Does it use AI?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
]

export type ChecklistItem = {
  id: string
  text: string
  detail: string
  /** A page on this site that helps with it. */
  link?: { href: string; label: string }
  when?: (answers: ChecklistAnswers) => boolean
}

const web = (a: ChecklistAnswers) => a.platform !== "mobile"
const mobile = (a: ChecklistAnswers) => a.platform === "mobile" || a.platform === "both"
const accounts = (a: ChecklistAnswers) => a.accounts === "yes"
const paid = (a: ChecklistAnswers) => !!a.payments && a.payments !== "none"
const subscriptions = (a: ChecklistAnswers) => a.payments === "subscriptions"
const europe = (a: ChecklistAnswers) => a.market === "europe" || a.market === "worldwide"
const ai = (a: ChecklistAnswers) => a.ai === "yes"

export const checklistGroups: { name: string; items: ChecklistItem[] }[] = [
  {
    name: "Product",
    items: [
      {
        id: "journeys",
        text: "Walk every key journey on a phone and a laptop",
        detail: "Sign up, the core action, payment and cancelling, start to finish, on real devices and slow connections.",
      },
      {
        id: "errors",
        text: "Set up error tracking and uptime alerts",
        detail: "Hear about crashes and downtime from a tool such as Sentry before you hear about them from users.",
      },
      {
        id: "backups",
        text: "Turn on automatic database backups and test a restore",
        detail: "A backup you have never restored is a hope, not a backup.",
        when: accounts,
      },
      {
        id: "email",
        text: "Send email from your own domain with SPF, DKIM and DMARC",
        detail: "Without them, sign up and password reset emails land in spam.",
        when: accounts,
      },
      {
        id: "domain",
        text: "Put the app on its own domain over HTTPS",
        detail: "Redirect the bare domain and the www version to one address.",
        when: web,
      },
      {
        id: "404",
        text: "Add a helpful 404 page and error page",
        detail: "Link back to the home page and to support, so a dead end is not the end.",
        when: web,
      },
    ],
  },
  {
    name: "Legal and privacy",
    items: [
      {
        id: "privacy",
        text: "Publish a privacy policy",
        detail: "UK GDPR requires one whenever you collect personal data, including analytics and contact forms.",
      },
      {
        id: "terms",
        text: "Publish terms of service",
        detail: "What people can and cannot do, your liability and how disputes are handled.",
      },
      {
        id: "cookies",
        text: "Ask consent before analytics or advertising cookies",
        detail: "PECR requires consent for any cookie that is not strictly necessary. Cookieless analytics avoid the banner.",
        when: web,
      },
      {
        id: "ico",
        text: "Pay the ICO data protection fee",
        detail: "Most UK businesses that handle personal data must pay it. The ICO's online check takes a minute.",
        when: accounts,
      },
      {
        id: "processors",
        text: "List your data processors and sign their data agreements",
        detail: "Hosting, email, analytics and payments providers all handle your users' data on your behalf.",
        when: accounts,
      },
      {
        id: "eu-rep",
        text: "Appoint an EU representative if you have no office in the EU",
        detail: "EU GDPR requires one when you offer services to people in the EU from outside it.",
        when: europe,
      },
      {
        id: "refunds",
        text: "Set out refunds and the 14 day cancellation right",
        detail: "UK consumers can usually cancel online purchases within 14 days. Say how it applies to your product.",
        when: paid,
      },
      {
        id: "cancel",
        text: "Make cancelling as easy as signing up",
        detail: "Show the renewal price and date clearly and let people cancel online. UK subscription rules are tightening on both.",
        when: subscriptions,
      },
      {
        id: "ai-disclosure",
        text: "Say where AI is used and check your AI provider's data terms",
        detail: "Tell users when they are dealing with AI, and make sure their data is not used to train the provider's models.",
        when: ai,
      },
      {
        id: "ai-act",
        text: "Check the EU AI Act's transparency rules",
        detail: "Chatbots and AI-generated content offered in the EU must be labelled as such.",
        when: (a) => ai(a) && europe(a),
      },
    ],
  },
  {
    name: "Payments",
    items: [
      {
        id: "live",
        text: "Switch payments to live mode and make a real purchase",
        detail: "Then refund it. Check the receipt, the webhook and what the customer sees.",
        when: paid,
      },
      {
        id: "webhooks",
        text: "Verify payment webhooks and handle failed payments",
        detail: "Declined cards, expired cards and disputes all need a path, not just the happy one.",
        when: paid,
      },
      {
        id: "portal",
        text: "Give subscribers a billing portal",
        detail: "Upgrade, downgrade, update the card and download invoices without emailing you.",
        when: subscriptions,
      },
      {
        id: "vat",
        text: "Know where you stand on VAT",
        detail: "UK VAT registration is required above £90,000 of taxable turnover. Selling digital services to EU consumers has its own VAT rules.",
        when: paid,
      },
    ],
  },
  {
    name: "Search, AI and analytics",
    items: [
      {
        id: "seo",
        text: "Give every public page a title, description and share image",
        detail: "They are what people see in Google, in AI answers and when your link is shared.",
        link: { href: "/tools/seo-check", label: "Run the free SEO Check" },
        when: web,
      },
      {
        id: "console",
        text: "Submit your sitemap to Google Search Console and Bing",
        detail: "Bing's index also feeds ChatGPT search and Copilot.",
        when: web,
      },
      {
        id: "indexnow",
        text: "Ping IndexNow when you publish or change a page",
        detail: "Host your key file, then submit changed URLs so Bing, Yandex and others recrawl them within hours. Google does not use it, so keep your sitemap up to date as well.",
        when: web,
      },
      {
        id: "agents",
        text: "Make sure AI assistants can read and cite your site",
        detail: "Allow AI search crawlers in robots.txt, add an llms.txt and serve content without JavaScript.",
        link: { href: "/tools/agent-readiness-check", label: "Run the free Agent Readiness Check" },
        when: web,
      },
      {
        id: "analytics",
        text: "Track sign ups, activation and payments as events",
        detail: "Page views alone will not tell you where people drop out.",
      },
    ],
  },
  {
    name: "App stores",
    items: [
      {
        id: "accounts-stores",
        text: "Open Apple Developer and Google Play developer accounts",
        detail: "Apple charges a yearly fee and Google a one-off fee. Company accounts need a D-U-N-S number, which can take a week or two.",
        when: mobile,
      },
      {
        id: "privacy-labels",
        text: "Fill in Apple's privacy labels and Google's Data safety form",
        detail: "Both must match what the app and its SDKs actually collect.",
        when: mobile,
      },
      {
        id: "delete-account",
        text: "Let people delete their account from inside the app",
        detail: "Apple requires it for any app that lets people create an account, and Google asks for a web link too.",
        when: (a) => mobile(a) && accounts(a),
      },
      {
        id: "listing",
        text: "Prepare screenshots, a description and a beta test",
        detail: "Run a TestFlight and Play internal test first, and allow a few days for review.",
        when: mobile,
      },
      {
        id: "iap",
        text: "Check whether purchases must go through in-app payments",
        detail: "Digital goods and subscriptions used in the app usually have to use Apple's and Google's billing.",
        when: (a) => mobile(a) && paid(a),
      },
    ],
  },
  {
    name: "Launch day",
    items: [
      {
        id: "support",
        text: "Set up a support inbox and reply within a day",
        detail: "Early users who get a quick answer become the ones who tell others.",
      },
      {
        id: "feedback",
        text: "Ask for feedback in the product",
        detail: "A short question after the core action beats a survey nobody opens.",
      },
      {
        id: "announce",
        text: "Plan where you will announce it",
        detail: "Your waiting list first, then the communities and channels your users already read.",
      },
    ],
  },
]

export function buildChecklist(answers: ChecklistAnswers) {
  return checklistGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.when || item.when(answers)),
    }))
    .filter((group) => group.items.length > 0)
}

/** The checklist as Markdown, for copying into a doc or a task tracker. */
export function checklistMarkdown(groups: ReturnType<typeof buildChecklist>, done: Set<string>) {
  return [
    "# App launch checklist",
    "",
    ...groups.flatMap((group) => [
      `## ${group.name}`,
      "",
      ...group.items.map((item) => `- [${done.has(item.id) ? "x" : " "}] ${item.text}. ${item.detail}`),
      "",
    ]),
  ].join("\n")
}
