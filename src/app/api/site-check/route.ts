import { checkSite, SiteCheckError } from "@/lib/free-tools/site-check.server"
import type { SiteCheckKind } from "@/lib/free-tools/site-check"

/*
 * POST { url, kind } runs the Agent Readiness Check ("agent") or the SEO
 * Check ("seo") on a public page and returns the report. robots.txt keeps
 * crawlers out of /api/.
 */

export const maxDuration = 30

const kinds: SiteCheckKind[] = ["agent", "seo"]

// A light per-instance limit, so the checker cannot be used to hammer a site.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const recent = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const times = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  times.push(now)
  recent.set(ip, times)
  if (recent.size > 5000) recent.clear()
  return times.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (limited(ip)) {
    return Response.json({ error: "Too many checks in a minute. Wait a moment and try again." }, { status: 429 })
  }

  let body: { url?: unknown; kind?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Send a JSON body with url and kind." }, { status: 400 })
  }
  const kind = kinds.find((k) => k === body.kind)
  if (typeof body.url !== "string" || !kind) {
    return Response.json({ error: "Send a JSON body with url and kind." }, { status: 400 })
  }

  try {
    const report = await checkSite(body.url.slice(0, 2048), kind)
    return Response.json(report, { headers: { "cache-control": "no-store" } })
  } catch (error) {
    if (error instanceof SiteCheckError) {
      return Response.json({ error: error.message }, { status: 422 })
    }
    console.error("site-check failed", error)
    return Response.json(
      { error: "Something went wrong while checking that site. Try again in a moment." },
      { status: 500 },
    )
  }
}
