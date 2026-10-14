/*
 * The one thing Scryptic sells. The home page's service card, its Service
 * JSON-LD and the pricing answer in the FAQ all read from here, so a price or
 * scope change is one edit.
 */

export type ServiceOffer = {
  /** Anchor id on the home page and the JSON-LD @id fragment. */
  id: string
  name: string
  /** The kind of service, in the words people search for. Structured data only. */
  serviceType: string
  /** Where the service is offered, as a country name. Structured data only. */
  areaServed: string
  /** Shown large on the card. */
  price: string
  /** Lowest price in `currency`, for structured data. Omit when unpublished. */
  minPrice?: number
  /** Typical time from kickoff to launch. */
  timeline: string
  summary: string
  includes: string[]
  bestFor: string
  cta: string
}

export const currency = "GBP"

export const service = {
  id: "app-to-market",
  name: "Full app to market",
  serviceType: "MVP and app development",
  areaServed: "United Kingdom",
  price: "From £10,000",
  minPrice: 10000,
  timeline: "1 to 2 months from kickoff to launch",
  summary:
    "A production app planned, designed, built, deployed and launched by one team in one to two months, with a catch-up every Friday so you are in the loop the whole way.",
  includes: [
    "Discovery call to map your goals, users and constraints",
    "Prioritised scope, recommended stack, a written estimate and a timeline",
    "Product design and a clickable prototype",
    "Full-stack build: web app, API and database",
    "Authentication, payments and third-party integrations",
    "A catch-up every Friday on progress, priorities and what is next",
    "Hosting, analytics and search set up for launch",
    "Launch support and a clean handover",
  ],
  bestFor:
    "Founders and small teams who need a real product in front of customers, whether starting from an idea or an existing app.",
  cta: "Book a discovery call",
} satisfies ServiceOffer
