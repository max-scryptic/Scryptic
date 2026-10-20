/*
 * What the site checks report, shared by the API route that runs them
 * (src/app/api/site-check/route.ts, via site-check.server.ts) and the page
 * that shows them. Safe to import from client components.
 */

export type SiteCheckKind = "agent" | "seo"

export type CheckStatus = "pass" | "warn" | "fail"

export type CheckResult = {
  id: string
  label: string
  status: CheckStatus
  /** What was found, in a sentence. */
  detail: string
  /** How to fix it, when it is not a pass. */
  fix?: string
  /** How much it counts towards the score. */
  weight: number
}

export type SiteReport = {
  kind: SiteCheckKind
  /** The page that was checked, after redirects. */
  url: string
  score: number
  checks: CheckResult[]
}

export const statusScore: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 }

export function scoreChecks(checks: CheckResult[]) {
  const total = checks.reduce((sum, check) => sum + check.weight, 0)
  const earned = checks.reduce((sum, check) => sum + check.weight * statusScore[check.status], 0)
  return total ? Math.round((earned / total) * 100) : 0
}

/** A plain-language grade for a score, for the result heading. */
export function grade(score: number) {
  if (score >= 90) return "In great shape"
  if (score >= 70) return "Mostly there"
  if (score >= 50) return "Needs work"
  return "Hard to find"
}
