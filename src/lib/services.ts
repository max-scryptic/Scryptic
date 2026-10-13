/*
 * The one thing Scryptic sells. The home page's service card, its Service
 * JSON-LD and the pricing answer in the FAQ all read from here, so a price or
 * scope change is one edit.
 */

export type ServiceOffer = {
  /** Anchor id on the home page and the JSON-LD @id fragment. */
  id: string
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

export const currency = "GBP"

export const service = {
  id: "app-to-market",
  name: "Full app to market",
  price: "From £10,000",
  priceNote: "Scoped to complexity",
  minPrice: 10000,
  summary:
    "A production app planned, designed, built, deployed and launched by one team, with you in the loop the whole way.",
  includes: [
    "Discovery call to map your goals, users and constraints",
    "Prioritised scope, recommended stack and a written estimate",
    "Product design and a clickable prototype",
    "Full-stack build: web app, API and database",
    "Authentication, payments and third-party integrations",
    "Hosting, analytics and search set up for launch",
    "Launch support and a clean handover",
  ],
  bestFor:
    "Founders and small teams who need a real product in front of customers, whether starting from an idea or an existing app.",
  cta: "Book a discovery call",
} satisfies ServiceOffer
