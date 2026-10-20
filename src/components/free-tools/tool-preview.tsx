import { cn } from "cn"

import type { FreeToolSlug } from "@/lib/free-tools"
import { verdicts } from "@/lib/free-tools/no-code-quiz"
import { grade } from "@/lib/free-tools/site-check"
import { formatPrice, services, weeklyRate } from "@/lib/services"

/**
 * The top of a tool's card: a made-up example of what the tool gives back,
 * so people can see the result before they click. Every preview has the same
 * three parts (a label, a headline and one supporting line or bar) so the
 * cards read as a set. Decorative, so hidden from assistive tech; the card's
 * name and summary say the same. Wording comes from the tools' own modules
 * where it can, so a preview keeps in step with the real result.
 */
export function ToolPreview({ slug }: { slug: FreeToolSlug }) {
  const { label, headline, detail } = previews[slug]
  return (
    <div
      aria-hidden="true"
      className="flex h-40 flex-col justify-center gap-2 border-b border-border bg-primary/5 px-6 transition-colors group-hover:bg-primary/10 sm:px-8"
    >
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
      <p className="truncate text-2xl font-medium tracking-tight">{headline}</p>
      <div className="text-sm text-muted-foreground">{detail}</div>
    </div>
  )
}

/** A thin bar filled to `value` out of 100, with a caption beside it. */
function Meter({ value, caption, warn }: { value: number; caption: string; warn?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
        <div className={cn("h-full rounded-full", warn ? "bg-chart-2" : "bg-primary")} style={{ width: `${value}%` }} />
      </div>
      <span className="shrink-0 font-mono text-xs">{caption}</span>
    </div>
  )
}

function score(value: number) {
  return { headline: grade(value), detail: <Meter value={value} caption={`${value} / 100`} warn={value < 70} /> }
}

const previews: Record<FreeToolSlug, { label: string; headline: string; detail: React.ReactNode }> = {
  "mvp-cost-calculator": {
    label: "Example estimate",
    headline: "2 to 3 weeks",
    detail: `${formatPrice(2 * weeklyRate)} to ${formatPrice(3 * weeklyRate)} + VAT`,
  },
  "mvp-scope-planner": {
    label: "Example scope",
    headline: `Fits the ${services[0].name}`,
    detail: "4 features in the first release, 3 saved for later",
  },
  "build-or-no-code": {
    label: "Example verdict",
    headline: verdicts.custom.title,
    detail: <Meter value={80} caption="Real code" />,
  },
  "app-launch-checklist": {
    label: "Example checklist",
    headline: "9 of 24 done",
    detail: <Meter value={37.5} caption="38%" />,
  },
  "agent-readiness-check": { label: "Example report", ...score(78) },
  "seo-check": { label: "Example audit", ...score(64) },
}
