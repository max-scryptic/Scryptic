import { cn } from "cn"

import type { FreeToolSlug } from "@/lib/free-tools"
import { verdicts } from "@/lib/free-tools/no-code-quiz"
import { grade } from "@/lib/free-tools/site-check"
import { formatPrice, weeklyRate } from "@/lib/services"

/**
 * The top of a tool's card: a cropped, made-up example of what the tool
 * gives back, so people can see the result before they click. Decorative,
 * so hidden from assistive tech; the card's name and summary say the same.
 * Wording comes from the tools' own modules where it can, so a preview
 * keeps in step with the real result.
 */
export function ToolPreview({ slug }: { slug: FreeToolSlug }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-48 overflow-hidden border-b border-border bg-primary/5 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-size-[18px_18px]"
    >
      <div className="absolute top-7 -right-6 -bottom-10 left-7 flex flex-col gap-2.5 rounded-xl border border-border bg-card py-4.5 pr-12 pl-5 text-sm shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)] transition-transform duration-400 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {previews[slug]}
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[0.6875rem] tracking-widest text-muted-foreground uppercase">{children}</p>
}

function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3", className)}
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  )
}

/** A score out of 100 with its grade, like the site checks' result heading. */
function Score({ score, url }: { score: number; url: string }) {
  const radius = 26
  const circumference = 2 * Math.PI * radius
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-16 shrink-0">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="6" className="stroke-secondary" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            className={score >= 70 ? "stroke-primary" : "stroke-chart-2"}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-medium">{score}</span>
      </div>
      <div className="min-w-0">
        <Label>{url}</Label>
        <p className="text-lg font-medium">{grade(score)}</p>
      </div>
    </div>
  )
}

function Check({ pass, children }: { pass: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      {pass ? (
        <Tick className="text-primary" />
      ) : (
        <span className="w-3 text-center font-mono leading-none text-destructive">&times;</span>
      )}
      {children}
    </li>
  )
}

const previews: Record<FreeToolSlug, React.ReactNode> = {
  "mvp-cost-calculator": (
    <>
      <Label>Example estimate</Label>
      <div>
        <p className="text-3xl leading-tight font-medium tracking-tight">2 to 3 weeks</p>
        <p className="text-muted-foreground">
          {formatPrice(2 * weeklyRate)} to {formatPrice(3 * weeklyRate)} + VAT
        </p>
      </div>
      <ul className="flex flex-col gap-1 text-[0.8125rem]">
        {["Taking payments", "Separate roles and permissions"].map((driver) => (
          <li key={driver} className="flex justify-between gap-3 rounded-lg bg-secondary px-2.5 py-1">
            {driver}
            <span className="font-mono text-primary">+0.5 wk</span>
          </li>
        ))}
      </ul>
    </>
  ),
  "mvp-scope-planner": (
    <>
      <Label>First release</Label>
      <ul className="flex flex-wrap gap-1.5 text-[0.8125rem]">
        {["Bookings", "Payments", "Admin panel", "Email reminders"].map((feature) => (
          <li key={feature} className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
            {feature}
          </li>
        ))}
      </ul>
      <Label>Later</Label>
      <ul className="flex flex-wrap gap-1.5 text-[0.8125rem] text-muted-foreground">
        {["Messaging", "Reviews", "Mobile app"].map((feature) => (
          <li key={feature} className="rounded-full border border-border px-2.5 py-1 line-through">
            {feature}
          </li>
        ))}
      </ul>
    </>
  ),
  "build-or-no-code": (
    <>
      <Label>Example verdict</Label>
      <p className="text-xl leading-snug font-medium tracking-tight text-balance">
        {verdicts["start-no-code"].title}
      </p>
      <div className="relative mt-1 h-2 rounded-full bg-linear-to-r from-secondary to-primary/60">
        <span className="absolute top-1/2 left-[58%] size-4.5 -translate-1/2 rounded-full border-3 border-card bg-primary ring-1 ring-primary" />
      </div>
      <p className="flex justify-between font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase">
        <span>No-code</span>
        <span>Real code</span>
      </p>
    </>
  ),
  "app-launch-checklist": (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <Label>Your launch</Label>
        <p className="font-mono text-xs text-muted-foreground">9 of 24 done</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[37.5%] bg-primary" />
      </div>
      <ul className="flex flex-col gap-1.5">
        {[
          { item: "Privacy policy and cookie notice", done: true },
          { item: "Stripe switched to live keys", done: true },
          { item: "App Store screenshots and listing", done: false },
          { item: "Analytics goal for sign ups", done: false },
        ].map(({ item, done }) => (
          <li key={item} className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded border-[1.5px]",
                done ? "border-primary bg-primary text-primary-foreground" : "border-border",
              )}
            >
              {done && <Tick className="size-2.5" />}
            </span>
            <span className={cn("truncate", done && "text-muted-foreground line-through")}>{item}</span>
          </li>
        ))}
      </ul>
    </>
  ),
  "agent-readiness-check": (
    <>
      <Score score={78} url="example.co.uk" />
      <ul className="flex flex-col gap-1 text-[0.8125rem]">
        <Check pass>GPTBot and ClaudeBot allowed</Check>
        <Check pass>Organization structured data</Check>
        <Check pass={false}>No llms.txt</Check>
      </ul>
    </>
  ),
  "seo-check": (
    <>
      <Score score={64} url="example.co.uk/pricing" />
      <div className="flex flex-col gap-0.5 rounded-lg bg-secondary px-3 py-2.5 text-[0.8125rem]">
        <span className="font-mono text-[0.6875rem] text-muted-foreground">example.co.uk › pricing</span>
        <span className="text-[0.9375rem] text-primary">Pricing | Example</span>
        <span className="text-muted-foreground">No meta description, so search engines pick their own snippet.</span>
      </div>
    </>
  ),
}
