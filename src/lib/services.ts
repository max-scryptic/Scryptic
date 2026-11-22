/*
 * What Scryptic sells: two fixed-price MVP packages. The home page's pricing
 * cards, their Service JSON-LD and the pricing answers in the FAQ all read
 * from here, so a price or scope change is one edit.
 */

export type ServiceOffer = {
  /** Anchor id on the home page and the JSON-LD @id fragment. */
  id: string
  name: string
  /** The kind of service, in the words people search for. Structured data only. */
  serviceType: string
  /** Where the service is offered, as a country name. Structured data only. */
  areaServed: string
  /** Shown under the name, e.g. "2 week development sprint". */
  sprint: string
  /** Weeks of development in the sprint, not counting iteration or handover. Prices are per development week. */
  developmentWeeks: number
  /** Shown large on the card. */
  price: string
  /** The same price as a number in `currency`, for structured data. */
  amount: number
  includes: string[]
  /** Highlighted with a "Preferred" tag. At most one package should set it. */
  preferred?: boolean
}

export const currency = "GBP"

/**
 * Optional, recommended monthly support once the handover week ends, on
 * either package. Shown with a "Recommended" tag.
 * The "After launch" box on /pricing, its Service JSON-LD and the FAQs on
 * what happens after launch all read from here.
 */
export const supportPlan = {
  id: "support",
  name: "Support plan",
  serviceType: "App maintenance and support",
  areaServed: "United Kingdom",
  price: "£750",
  amount: 750,
  /** Billing period, completing "£750 + VAT a ...". */
  per: "month",
  includes: [
    "Bug fixes",
    "Security and dependency updates",
    "Uptime and error monitoring",
    "Up to half a day of small changes each month",
  ],
  terms: "Optional, cancel any time",
}

/**
 * Founding-client slots: extra work added free to the next few builds, on
 * either package, in return for a case study. The price stays the same; the
 * pricing section shows it under the cards and the pricing FAQs mention it.
 * Set to null once the last slot is booked.
 */
export const foundingOffer: {
  /** How many builds get it, e.g. 2. */
  slots: number
  /** When the slots run, completing "2 founding-client slots ...". */
  period: string
  /** What is added free, each completing "Free: ...". */
  extras: string[]
  /** What the client gives in return, completing "In return for ...". */
  inReturn: string
} | null = {
  slots: 2,
  period: "this quarter",
  extras: [
    `an extra month of our support plan after handover (worth ${supportPlan.price})`,
    "a launch landing page for your product, built and set up for search",
  ],
  inReturn: "a case study and an honest testimonial once you have launched",
}

/** The offer in one sentence, for FAQ answers. Empty when there is no offer. */
export function foundingOfferSentence() {
  if (!foundingOffer) return ""
  const { slots, period, extras, inReturn } = foundingOffer
  return ` ${period[0].toUpperCase()}${period.slice(1)}, ${slots} founding-client slots come at the same price with these added free: ${extras.join("; and ")}. In return we ask for ${inReturn}.`
}

const shared = {
  serviceType: "MVP development",
  areaServed: "United Kingdom",
}

export const services: ServiceOffer[] = [
  {
    ...shared,
    id: "mvp",
    name: "MVP",
    sprint: "2 week development sprint",
    developmentWeeks: 1,
    price: "£7,500",
    amount: 7500,
    preferred: true,
    includes: [
      "A fully built MVP, ready to take to market",
      "1 week of development by our team",
      "1 week of iteration based on your feedback",
      "1 week of handover after launch: bug fixes and a smooth rollout",
    ],
  },
  {
    ...shared,
    id: "extended-mvp",
    name: "Extended MVP",
    sprint: "3 week development sprint",
    developmentWeeks: 2,
    price: "£15,000",
    amount: 15000,
    includes: [
      "A fully built MVP, ready to take to market",
      "2 weeks of development by our team",
      "1 week of iteration based on your feedback",
      "1 week of handover after launch: bug fixes and a smooth rollout",
    ],
  },
]

/** Each package on its own, for copy that quotes one, such as a blog post's "from £7,500". */
export const [mvp, extendedMvp] = services

/** What a week of development costs, read off the packages: the MVP is one week for £7,500. */
export const weeklyRate = services[0].amount / services[0].developmentWeeks

/** The answer to "What happens after launch, and what does support cost?", for the FAQs. */
export function afterLaunchAnswer() {
  const items = supportPlan.includes.map((item) => item[0].toLowerCase() + item.slice(1))
  const list = `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`
  return `Every package ends with a week of handover for bug fixes and a smooth rollout. After that, support is optional but recommended: our ${supportPlan.name.toLowerCase()} is ${supportPlan.price} + VAT a ${supportPlan.per} for ${list}, and you can cancel any time. Bigger features are another sprint, priced like the packages, or you can hand the code to your own developer, since the code, hosting and accounts are already yours. Hosting and third-party services are billed to you directly, at cost.`
}

/** One sentence on support, for the pricing FAQs. Starts with a space, like `foundingOfferSentence`. */
export function supportPriceSentence() {
  return ` Support after the handover week is optional, at ${supportPlan.price} + VAT a ${supportPlan.per}.`
}

/** "£7,500" for 7500. */
export function formatPrice(amount: number) {
  return `£${Math.round(amount).toLocaleString("en-GB")}`
}
