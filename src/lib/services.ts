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
 * A limited discount on the next few builds, on either package. The hero, the
 * pricing cards and the pricing FAQ all show it. Set to null once the last
 * discounted build is booked and the full prices come back everywhere.
 */
export const launchOffer: {
  percentOff: number
  /** What the discount covers, completing "25% off ...". */
  appliesTo: string
} | null = {
  percentOff: 25,
  appliesTo: "our next two MVPs",
}

/** The offer's price for a package, formatted like `price`, e.g. "£7,500". */
export function offerPrice(service: ServiceOffer) {
  if (!launchOffer) return service.price
  const amount = Math.round(service.amount * (1 - launchOffer.percentOff / 100))
  return `£${amount.toLocaleString("en-GB")}`
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
    price: "£10,000",
    amount: 10000,
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
    price: "£20,000",
    amount: 20000,
    includes: [
      "A fully built MVP, ready to take to market",
      "2 weeks of development by our team",
      "1 week of iteration based on your feedback",
      "1 week of handover after launch: bug fixes and a smooth rollout",
    ],
  },
]
