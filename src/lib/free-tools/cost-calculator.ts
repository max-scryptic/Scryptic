import { formatPrice, services, weeklyRate, type ServiceOffer } from "@/lib/services"

/*
 * The MVP Cost Calculator: a few questions, each answer adding development
 * weeks to a one week base build, priced at the packages' weekly rate (see
 * services.ts). The base week already covers sign up and log in, a handful of
 * screens, transactional email, analytics and deployment, which is what the
 * MVP package ships with. Iteration and handover come on top of development
 * at no extra cost, as they do in the packages.
 */

export type CostOption = {
  value: string
  label: string
  /** Development weeks this answer adds to the base build. */
  weeks: number
  /** How the answer reads in the "what drives the price" list, when it adds time. */
  driver?: string
}

export type CostQuestion = {
  name: string
  label: string
  description?: string
  options: CostOption[]
}

export const costQuestions: CostQuestion[] = [
  {
    name: "platform",
    label: "What are you building?",
    options: [
      { value: "web", label: "A web app that works on phones too", weeks: 0 },
      {
        value: "mobile",
        label: "A native iOS and Android app",
        weeks: 1,
        driver: "Native iOS and Android apps",
      },
      {
        value: "both",
        label: "A web app and native mobile apps",
        weeks: 1.5,
        driver: "Native apps alongside the web app",
      },
    ],
  },
  {
    name: "accounts",
    label: "Who signs in?",
    options: [
      { value: "none", label: "Nobody, it is open to everyone", weeks: 0 },
      { value: "users", label: "Users, each with their own account", weeks: 0 },
      {
        value: "roles",
        label: "Different kinds of user, such as buyers and sellers",
        weeks: 0.5,
        driver: "Separate roles and permissions",
      },
      {
        value: "teams",
        label: "Companies, with teams, invites and permissions",
        weeks: 1,
        driver: "Team accounts with invites",
      },
    ],
  },
  {
    name: "features",
    label: "How many main features does it have?",
    description: "A feature is something a user does: book a slot, upload a video, see a report.",
    options: [
      { value: "few", label: "1 to 3", weeks: 0 },
      { value: "some", label: "4 to 8", weeks: 1, driver: "4 to 8 main features" },
      { value: "many", label: "9 or more", weeks: 2, driver: "9 or more main features" },
    ],
  },
  {
    name: "payments",
    label: "How does it take payment?",
    options: [
      { value: "none", label: "It does not, or not yet", weeks: 0 },
      { value: "one-off", label: "One-off payments", weeks: 0.5, driver: "Taking payments" },
      {
        value: "subscriptions",
        label: "Subscriptions with plans",
        weeks: 0.5,
        driver: "Subscriptions and billing",
      },
      {
        value: "marketplace",
        label: "A marketplace that pays other users",
        weeks: 1.5,
        driver: "Marketplace payments and payouts",
      },
    ],
  },
  {
    name: "integrations",
    label: "What else does it need to connect to?",
    description: "Calendars, CRMs, accounting tools, other companies' APIs.",
    options: [
      { value: "none", label: "Nothing beyond email", weeks: 0 },
      {
        value: "some",
        label: "One or two other services",
        weeks: 0.5,
        driver: "Integrations with other services",
      },
      {
        value: "many",
        label: "Three or more, or a system with no good API",
        weeks: 1,
        driver: "Several or awkward integrations",
      },
    ],
  },
  {
    name: "ai",
    label: "Does it use AI?",
    options: [
      { value: "none", label: "No", weeks: 0 },
      {
        value: "assist",
        label: "To write, summarise or chat",
        weeks: 0.5,
        driver: "AI writing or chat",
      },
      {
        value: "core",
        label: "AI is the product: it works over your data or acts as an agent",
        weeks: 1,
        driver: "AI at the core of the product",
      },
    ],
  },
  {
    name: "admin",
    label: "What do you need behind the scenes?",
    options: [
      { value: "none", label: "Nothing, the database will do for now", weeks: 0 },
      {
        value: "admin",
        label: "An admin panel to manage users and content",
        weeks: 0.5,
        driver: "An admin panel",
      },
      {
        value: "reporting",
        label: "Admin plus reporting dashboards",
        weeks: 1,
        driver: "Admin and reporting dashboards",
      },
    ],
  },
  {
    name: "design",
    label: "Where is the design?",
    options: [
      { value: "ready", label: "Designs are ready, in Figma or similar", weeks: 0 },
      { value: "rough", label: "Sketches, or an app to take the feel from", weeks: 0.25 },
      { value: "none", label: "Nothing yet, design it for me", weeks: 0.5, driver: "Design from scratch" },
    ],
  },
]

export type CostAnswers = Partial<Record<string, string>>

export type CostEstimate = {
  /** Development weeks, rounded to whole weeks. */
  weeks: number
  /** The top of the range for builds past the packages, which carry more unknowns. */
  maxWeeks: number
  price: number
  maxPrice: number
  /** The package this fits, if it fits one. */
  service?: ServiceOffer
  /** Weeks from kick-off to launch: development plus the week of iteration. */
  sprintWeeks: number
  drivers: { label: string; weeks: number }[]
  /** The biggest driver and what leaving it for later would bring the build down to. */
  saving?: { label: string; weeks: number; price: number }
  answered: number
}

function optionFor(question: CostQuestion, answers: CostAnswers) {
  return question.options.find((option) => option.value === answers[question.name])
}

const roundWeeks = (raw: number) => Math.max(1, Math.round(raw))

export function estimateCost(answers: CostAnswers): CostEstimate {
  const picked = costQuestions.map((question) => optionFor(question, answers))
  const raw = 1 + picked.reduce((sum, option) => sum + (option?.weeks ?? 0), 0)
  const weeks = roundWeeks(raw)
  const service = services.find((s) => s.developmentWeeks === weeks)
  const maxWeeks = service ? weeks : weeks + 1

  const drivers = picked
    .filter((option): option is CostOption => !!option?.driver && option.weeks > 0)
    .map((option) => ({ label: option.driver!, weeks: option.weeks }))
    .sort((a, b) => b.weeks - a.weeks)

  const biggest = drivers[0]
  const withoutBiggest = biggest ? roundWeeks(raw - biggest.weeks) : weeks
  const saving =
    biggest && withoutBiggest < weeks
      ? { label: biggest.label, weeks: withoutBiggest, price: withoutBiggest * weeklyRate }
      : undefined

  return {
    weeks,
    maxWeeks,
    price: service?.amount ?? weeks * weeklyRate,
    maxPrice: service?.amount ?? maxWeeks * weeklyRate,
    service,
    sprintWeeks: weeks + 1,
    drivers,
    saving,
    answered: picked.filter(Boolean).length,
  }
}

export function formatRange(low: number, high: number) {
  return low === high ? formatPrice(low) : `${formatPrice(low)} to ${formatPrice(high)}`
}

/** The answers and estimate as plain text, for the booking note. */
export function summarizeEstimate(answers: CostAnswers, estimate: CostEstimate) {
  const price = formatRange(estimate.price, estimate.maxPrice)
  const weeks =
    estimate.weeks === estimate.maxWeeks
      ? `${estimate.weeks}`
      : `${estimate.weeks} to ${estimate.maxWeeks}`
  const lines = [
    `MVP Cost Calculator: ${weeks} development weeks, ${price} + VAT${estimate.service ? ` (${estimate.service.name})` : ""}.`,
    ...costQuestions.map((question) => {
      const option = optionFor(question, answers)
      return `${question.label} ${option?.label ?? "Not answered"}`
    }),
  ]
  return lines.join("\n")
}
