/*
 * The two things Scryptic sells. The home page's service cards, its Service
 * JSON-LD and the pricing answers in the FAQ all read from here, so a price or
 * scope change is one edit.
 */

export type ServiceOffer = {
  /** Anchor id on the home page and the JSON-LD @id fragment. */
  id: string
  step: string
  name: string
  /** Shown large on the card. */
  price: string
  priceNote: string
  /** Lowest price in `currency`, for structured data. Omit when unpublished. */
  minPrice?: number
  summary: string
  includes: string[]
  bestFor: string
  cta: string
}

export const currency = "USD"

export const services = [
  {
    id: "discovery-audit",
    step: "01",
    name: "Discovery call and audit",
    price: "Fixed fee",
    priceNote: "Quoted before we start",
    summary:
      "Know exactly what to build, what it will cost and what could sink it, before you spend a dollar on development.",
    includes: [
      "Discovery call to map your goals, users and constraints",
      "Audit of any existing product, codebase or prototype",
      "Recommended stack and architecture",
      "Prioritised scope for a first release",
      "Written estimate and timeline for the build",
    ],
    bestFor:
      "Founders validating an idea, and teams whose app has stalled or outgrown its first version.",
    cta: "Book a discovery call",
  },
  {
    id: "app-to-market",
    step: "02",
    name: "Full app to market",
    price: "From $10k",
    priceNote: "Scoped to complexity",
    minPrice: 10000,
    summary:
      "A production app designed, built, deployed and launched by one team, with you in the loop the whole way.",
    includes: [
      "Product design and a clickable prototype",
      "Full-stack build: web app, API and database",
      "Authentication, payments and third-party integrations",
      "Hosting, analytics and search set up for launch",
      "Launch support and a clean handover",
    ],
    bestFor:
      "Founders with a validated idea, or an audit in hand, who need a real product in front of customers.",
    cta: "Start with a discovery call",
  },
] satisfies ServiceOffer[]
