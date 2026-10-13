import { bookingHref, siteConfig } from "@/lib/site"

/*
 * The qualifying questions on /book-a-call, and where the answers go once
 * they are in. There is no backend: the answers ride along to the booking
 * page (as the booking note on Cal.com or Calendly) or, while there is no
 * scheduling link, fill in the body of the fallback email.
 */

export type BookingQuestion = {
  /** Form field name. */
  name: string
  label: string
  options: string[]
}

/** Builds below this budget are flagged in the form so expectations are set before the call. */
export const underMinimumBudget = "Under £10k"

export const bookingQuestions = [
  {
    name: "need",
    label: "What do you need help with?",
    options: [
      "Building a new app",
      "Fixing or growing an existing app",
      "Scoping and an estimate",
      "Not sure yet",
    ],
  },
  {
    name: "stage",
    label: "Where is the project today?",
    options: ["Just an idea", "Designs or a prototype", "Live with users"],
  },
  {
    name: "budget",
    label: "What budget do you have in mind for the build?",
    options: [underMinimumBudget, "£10k to £25k", "£25k to £50k", "£50k+", "Not sure yet"],
  },
  {
    name: "timeline",
    label: "When would you like to start?",
    options: ["Right away", "In 1 to 3 months", "Just exploring"],
  },
] satisfies BookingQuestion[]

export type BookingAnswers = {
  name: string
  email: string
  details: string
} & Record<(typeof bookingQuestions)[number]["name"], string>

/** The answers as plain text, for the booking note or the email body. */
export function summarizeAnswers(answers: BookingAnswers) {
  const lines = bookingQuestions.map(
    (question) => `${question.label} ${answers[question.name]}`,
  )
  if (answers.details) lines.push(`Anything else: ${answers.details}`)
  return lines.join("\n")
}

/*
 * Scheduling tools that accept prefilled fields in the URL, keyed by host.
 * `notes` is the query parameter for the free-text box on the booking form:
 * Cal.com's "Additional notes", and Calendly's first custom question (a1),
 * which should be a long-text "Anything to prepare?" style question.
 */
const prefillParams: Record<string, { name: string; email: string; notes?: string }> = {
  "cal.com": { name: "name", email: "email", notes: "notes" },
  "calendly.com": { name: "name", email: "email", notes: "a1" },
}

function prefillFor(host: string) {
  const key = Object.keys(prefillParams).find(
    (domain) => host === domain || host.endsWith(`.${domain}`),
  )
  return key ? prefillParams[key] : undefined
}

/** Where the form sends someone once they have answered: the booking link with their answers attached. */
export function bookingDestination(answers: BookingAnswers) {
  const summary = summarizeAnswers(answers)

  if (!siteConfig.bookingUrl) {
    const body = `Hi, I'd like to book a discovery call.\n\nName: ${answers.name}\nEmail: ${answers.email}\n\n${summary}\n`
    return `${bookingHref}&body=${encodeURIComponent(body)}`
  }

  const url = new URL(siteConfig.bookingUrl)
  const params = prefillFor(url.hostname)
  if (params) {
    url.searchParams.set(params.name, answers.name)
    url.searchParams.set(params.email, answers.email)
    if (params.notes) url.searchParams.set(params.notes, summary)
  }
  return url.toString()
}
