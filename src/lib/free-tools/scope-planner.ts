import { formatPrice, services, weeklyRate } from "@/lib/services"

/*
 * The MVP Scope Planner: a list of features, each sized and put in the first
 * release or saved for later. The first release's total, in development
 * weeks, is matched against the packages. Sign up and log in, email,
 * analytics and deployment come with every build, so they are not listed.
 */

export type FeatureSize = "small" | "medium" | "large"

export const featureSizes: { value: FeatureSize; label: string; hint: string; weeks: number }[] = [
  { value: "small", label: "Small", hint: "About a day", weeks: 0.2 },
  { value: "medium", label: "Medium", hint: "Two or three days", weeks: 0.5 },
  { value: "large", label: "Large", hint: "About a week", weeks: 1 },
]

export type ScopeFeature = {
  id: string
  name: string
  size: FeatureSize
  /** In the first release, or saved for a later phase. */
  launch: boolean
}

/** One click adds these, sized the way they usually turn out. */
export const commonFeatures: { name: string; size: FeatureSize }[] = [
  { name: "Payments or subscriptions", size: "medium" },
  { name: "Admin panel", size: "medium" },
  { name: "Team accounts and invites", size: "medium" },
  { name: "File and image uploads", size: "small" },
  { name: "Email notifications", size: "small" },
  { name: "Search and filters", size: "small" },
  { name: "Public profiles", size: "small" },
  { name: "Booking and calendars", size: "medium" },
  { name: "AI writing or chat", size: "medium" },
  { name: "Maps and location", size: "medium" },
  { name: "Reporting dashboard", size: "large" },
  { name: "Messaging between users", size: "large" },
  { name: "Native mobile app", size: "large" },
]

const weeksFor = (size: FeatureSize) => featureSizes.find((s) => s.value === size)!.weeks

export function planScope(features: ScopeFeature[]) {
  const named = features.filter((feature) => feature.name.trim())
  const launch = named.filter((feature) => feature.launch)
  const later = named.filter((feature) => !feature.launch)
  const launchWeeks = launch.reduce((sum, feature) => sum + weeksFor(feature.size), 0)
  // Small rounding headroom, so five small features still count as one week.
  const weeks = Math.max(1, Math.ceil(launchWeeks - 0.05))
  const service = services.find((s) => s.developmentWeeks === weeks)
  const largest = services[services.length - 1]

  // When the first release outgrows the largest package, the biggest features
  // that would bring it back inside, moved one at a time.
  const toMove: ScopeFeature[] = []
  if (!service) {
    let remaining = launchWeeks
    for (const feature of [...launch].sort((a, b) => weeksFor(b.size) - weeksFor(a.size))) {
      if (remaining - 0.05 <= largest.developmentWeeks) break
      toMove.push(feature)
      remaining -= weeksFor(feature.size)
    }
  }

  return {
    launch,
    later,
    launchWeeks,
    weeks,
    price: service?.amount ?? weeks * weeklyRate,
    service,
    largest,
    toMove,
  }
}

export type ScopePlan = ReturnType<typeof planScope>

const sizeLabel = (size: FeatureSize) => featureSizes.find((s) => s.value === size)!.label

/** The plan as plain text, for the booking note. */
export function summarizeScope(plan: ScopePlan) {
  const fit = plan.service ? `the ${plan.service.name}` : "a custom build"
  return [
    `MVP Scope Planner: about ${plan.weeks} development ${plan.weeks === 1 ? "week" : "weeks"} for the first release (${fit}, ${formatPrice(plan.price)} + VAT).`,
    "First release:",
    ...plan.launch.map((feature) => `- ${feature.name.trim()} (${sizeLabel(feature.size)})`),
    ...(plan.later.length
      ? ["Later:", ...plan.later.map((feature) => `- ${feature.name.trim()} (${sizeLabel(feature.size)})`)]
      : []),
  ].join("\n")
}
