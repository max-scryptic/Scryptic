/*
 * The Build or No-Code Quiz. Each answer leans towards no-code (a negative
 * score) or custom code (positive); the total picks one of three verdicts.
 * Answers that lean hard carry the reason shown with the verdict, so the
 * result says why, not just what.
 */

export type QuizOption = {
  value: string
  label: string
  score: number
  /** Why this answer matters, shown with a verdict it supports. */
  reason?: string
}

export type QuizQuestion = { name: string; label: string; options: QuizOption[] }

export const quizQuestions: QuizQuestion[] = [
  {
    name: "goal",
    label: "What is the first version for?",
    options: [
      {
        value: "test",
        label: "Testing whether anyone wants it",
        score: -2,
        reason: "You are testing demand, and no-code is the cheapest way to find out.",
      },
      { value: "launch", label: "Launching to paying customers", score: 1 },
      {
        value: "invest",
        label: "Raising investment on a working product",
        score: 1,
        reason: "Investors look for a product you own and can grow without a rebuild.",
      },
    ],
  },
  {
    name: "core",
    label: "How unusual is the core of the product?",
    options: [
      {
        value: "standard",
        label: "Standard parts: forms, lists, bookings, dashboards",
        score: -2,
        reason: "Your product is made of the parts no-code tools do well.",
      },
      { value: "workflows", label: "A few workflows of its own", score: 1 },
      {
        value: "novel",
        label: "Something new: real-time, an editor, video, maps or heavy AI",
        score: 3,
        reason: "The core of your product is the kind of thing no-code tools fight against.",
      },
    ],
  },
  {
    name: "users",
    label: "How many users do you expect in the first year?",
    options: [
      { value: "few", label: "Under a hundred", score: -1 },
      { value: "some", label: "Hundreds to a few thousand", score: 0 },
      {
        value: "many",
        label: "Tens of thousands or more",
        score: 2,
        reason: "No-code pricing and speed get worse quickly as usage grows.",
      },
    ],
  },
  {
    name: "data",
    label: "What kind of data will it hold?",
    options: [
      { value: "basic", label: "Nothing sensitive", score: 0 },
      { value: "personal", label: "Personal details and payments", score: 1 },
      {
        value: "regulated",
        label: "Health, financial or children's data",
        score: 3,
        reason: "Regulated data needs control over where it is stored and who can reach it.",
      },
    ],
  },
  {
    name: "integrations",
    label: "What does it need to connect to?",
    options: [
      {
        value: "simple",
        label: "Nothing, or simple Zapier-style automations",
        score: -1,
      },
      { value: "apis", label: "A few other services' APIs", score: 1 },
      {
        value: "deep",
        label: "Its own API, or a deep two-way sync with another system",
        score: 2,
        reason: "An API of your own or a two-way sync is far easier to build and trust in code.",
      },
    ],
  },
  {
    name: "owner",
    label: "Who will keep it running after launch?",
    options: [
      {
        value: "me",
        label: "Me, and I do not write code",
        score: -2,
        reason: "You can change a no-code app yourself, without waiting on a developer.",
      },
      { value: "hire", label: "A developer we will hire", score: 1 },
      { value: "studio", label: "A studio or agency", score: 1 },
    ],
  },
  {
    name: "budget",
    label: "What can you spend on the first version?",
    options: [
      {
        value: "low",
        label: "Under £5,000",
        score: -3,
        reason: "On a budget under £5,000, no-code gets you much further than a custom build.",
      },
      { value: "mid", label: "£5,000 to £25,000", score: 1 },
      { value: "high", label: "£25,000 or more", score: 2 },
    ],
  },
]

export type QuizVerdict = "no-code" | "start-no-code" | "custom"

export const verdicts: Record<QuizVerdict, { title: string; summary: string }> = {
  "no-code": {
    title: "No-code will do, for now",
    summary:
      "Build the first version in a no-code tool such as Bubble, Glide or Softr, and spend the money you save on finding customers. Plan to move to code once the product works and starts to hit the tool's limits.",
  },
  "start-no-code": {
    title: "Start with no-code, plan the rebuild",
    summary:
      "A no-code or AI-built prototype will answer your first questions, but this product will outgrow it. Keep it simple, own your data from day one and budget for a rebuild in code once it has users.",
  },
  custom: {
    title: "Build it in real code",
    summary:
      "What you are building needs code from the start. A no-code version would cost you a rebuild just as it starts to work. Keep the first release small instead, and own the code and data from launch.",
  },
}

export type QuizAnswers = Partial<Record<string, string>>

export function scoreQuiz(answers: QuizAnswers) {
  const picked = quizQuestions
    .map((question) => question.options.find((option) => option.value === answers[question.name]))
    .filter((option): option is QuizOption => !!option)
  const score = picked.reduce((sum, option) => sum + option.score, 0)
  const verdict: QuizVerdict = score <= -3 ? "no-code" : score <= 2 ? "start-no-code" : "custom"
  // The reasons that pull the way the verdict went, strongest first.
  const leansCustom = verdict === "custom" || (verdict === "start-no-code" && score > 0)
  const reasons = picked
    .filter((option) => option.reason && (leansCustom ? option.score > 0 : option.score < 0))
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
    .slice(0, 3)
    .map((option) => option.reason!)

  return { answered: picked.length, score, verdict, reasons }
}
