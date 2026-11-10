import { cn } from "cn"

import { HeroWindow } from "@/components/landing/hero"
import { postsBySlug } from "@/lib/blog"

/*
 * The decorative card on the right of each service page's hero, one per page,
 * so the heroes share a layout but not a picture. Each sits in a HeroWindow,
 * which hides it from assistive tech: the copy beside it says the same thing.
 * Animations (hero-terminal, hero-wipe, hero-cycle in globals.css) only run
 * without reduced motion; otherwise the card shows its finished state.
 */

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/** MVP development: the sprint board, with what made v1, what was parked and how far through it is. */
export function SprintVisual() {
  const inScope = ["Core journey", "Sign-in", "Payments", "Analytics"]
  const parked = ["Team seats", "Integrations", "Native app"]

  return (
    <HeroWindow label="sprint.mvp" status="Week 2 of 2">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="truncate text-muted-foreground">
            <span className="hidden sm:inline">https://</span>
            <span className="text-foreground">yourproduct.com</span>
          </span>
          <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Live Friday</span>
        </div>

        <div className="hero-terminal flex flex-col gap-2.5">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">In v1</p>
          <ul className="flex flex-wrap gap-1.5 text-xs sm:gap-2 sm:text-sm">
            {inScope.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 bg-primary/15 px-2 py-1 text-primary sm:px-2.5 dark:bg-primary/30 dark:text-foreground"
              >
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Parked for v2
          </p>
          <ul className="flex flex-wrap gap-1.5 text-xs sm:gap-2 sm:text-sm">
            {parked.map((item) => (
              <li key={item} className="border border-dashed border-border px-2 py-1 text-muted-foreground sm:px-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <span>Week 1</span>
          <span className="h-2 bg-primary/15 dark:bg-primary/25">
            <span className="hero-wipe block h-full w-full bg-primary" />
          </span>
          <span>Build</span>
          <span>Week 2</span>
          <span className="h-2 bg-primary/15 dark:bg-primary/25">
            <span className="hero-wipe block h-full w-4/5 bg-primary" />
          </span>
          <span>Iterate</span>
        </div>
      </div>
    </HeroWindow>
  )
}

/** Web app development: a signed-in app mid-workflow, each record at its own stage. */
export function WebAppVisual() {
  const rows = [
    { item: "Quote for Unit 4", stage: "Approved", done: true },
    { item: "Site survey, Thursday", stage: "Booked", done: true },
    { item: "Invoice 1042", stage: "Paid", done: true },
    { item: "Repair request", stage: "New", done: false },
  ]

  return (
    <HeroWindow label="app.yourcompany.co.uk" status="Live">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="text-foreground">Jobs</span>
          <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Staff view</span>
        </div>

        <ul className="hero-terminal flex flex-col divide-y divide-border border-y border-border text-sm">
          {rows.map((row) => (
            <li key={row.item} className="flex items-center justify-between gap-4 py-2.5">
              <span className="truncate">{row.item}</span>
              <span
                className={cn(
                  "flex shrink-0 items-center gap-1.5 px-2 py-0.5 font-mono text-xs",
                  row.done
                    ? "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground"
                    : "border border-dashed border-border text-muted-foreground",
                )}
              >
                {row.done && <Check />}
                {row.stage}
              </span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <li>Roles</li>
          <li>Backups</li>
          <li>Your code</li>
        </ul>
      </div>
    </HeroWindow>
  )
}

/** Mobile app development: one release, a native build per platform, each on its way through store review. */
export function MobileAppVisual() {
  const builds = [
    { platform: "iPhone", code: "Swift", store: "App Store" },
    { platform: "Android", code: "Kotlin", store: "Google Play" },
  ]

  return (
    <HeroWindow label="release.v1" status="Week 2 of 2">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-xs">
          <span className="text-foreground">Your app 1.0</span>
          <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Native</span>
        </div>

        <ul className="hero-terminal grid gap-3 sm:grid-cols-2">
          {builds.map((build) => (
            <li key={build.platform} className="flex flex-col gap-3 border border-border bg-background p-3">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{build.platform}</span>
                <span className="font-mono text-xs text-muted-foreground">{build.code}</span>
              </span>
              <span className="flex items-center gap-1.5 self-start bg-primary/15 px-2 py-0.5 font-mono text-xs text-primary dark:bg-primary/30 dark:text-foreground">
                <Check />
                Build ready
              </span>
              <span className="flex items-center gap-1.5 self-start border border-dashed border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                {build.store} review
              </span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          <li>Your store accounts</li>
          <li>Your code</li>
        </ul>
      </div>
    </HeroWindow>
  )
}

// The builders the migration card cycles through, with their logos from the guides.
const cycledTools = postsBySlug([
  "migrate-from-bubble",
  "migrate-from-lovable",
  "migrate-from-glide",
  "migrate-from-airtable",
])

/** No-code migration: a rehearsal report, from a builder (cycling through a few) to your own codebase. */
export function MigrationVisual() {
  const rows = [
    { name: "Users", count: "2,418" },
    { name: "Records", count: "184,302" },
    { name: "Files", count: "9,771" },
    { name: "Redirects", count: "312" },
  ]

  return (
    <HeroWindow label="migrate.log" status="Rehearsal 3 of 3">
      <div className="flex flex-col gap-5 p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
          {/* The source tile cycles through builders; reduced motion shows the first only. */}
          <div className="relative h-16 border border-border bg-background">
            {cycledTools.map((post, index) => (
              <div
                key={post.slug}
                className={cn("hero-cycle absolute inset-0 flex items-center gap-3 px-3", index > 0 && "opacity-0")}
                style={{ animationDelay: `${index === 0 ? 0 : (index - cycledTools.length) * 2}s` }}
              >
                {post.logo && (
                  <span
                    className="size-7 shrink-0 bg-primary mask-contain mask-center mask-no-repeat dark:bg-[#c3caff]"
                    style={{ maskImage: `url(${post.logo.src})` }}
                  />
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">{post.topic}</span>
                  <span className="font-mono text-xs text-muted-foreground">from</span>
                </span>
              </div>
            ))}
          </div>
          <span className="flex items-center font-mono text-lg text-primary dark:text-[#c3caff]">→</span>
          <div className="flex h-16 flex-col justify-center bg-primary px-3 text-primary-foreground">
            <span className="text-sm font-medium">Your code</span>
            <span className="font-mono text-xs opacity-80">Next.js + Postgres</span>
          </div>
        </div>

        <ul className="hero-terminal flex flex-col divide-y divide-border border-y border-border font-mono text-xs">
          {rows.map((row) => (
            <li key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-2">
              <span className="text-muted-foreground">{row.name}</span>
              <span className="tabular-nums">
                {row.count} <span className="text-muted-foreground">→</span> {row.count}
              </span>
              <Check className="text-primary dark:text-[#c3caff]" />
            </li>
          ))}
        </ul>

        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-foreground">0 lost</span> · ready for cutover
        </p>
      </div>
    </HeroWindow>
  )
}

/** The services hub: each service as a short track from where you start to where you end up. */
export function ServicesVisual() {
  const tracks = [
    { name: "MVP development", steps: ["Idea", "Sprint", "Launched"] },
    { name: "Web app development", steps: ["Workflow", "Sprint", "Live app"] },
    { name: "Mobile app development", steps: ["Idea", "Native build", "In the stores"] },
    { name: "No-code migration", steps: ["Bubble app", "Rebuild", "Code you own"] },
  ]

  return (
    <HeroWindow label="services" status="4 ways in">
      <div className="flex flex-col gap-6 p-5">
        <div className="hero-terminal flex flex-col gap-6">
          {tracks.map((track, index) => (
            <div key={track.name} className="flex flex-col gap-3">
              <p className="font-mono text-xs text-primary dark:text-[#c3caff]">
                {String(index + 1).padStart(2, "0")} <span className="text-muted-foreground">/</span>{" "}
                <span className="text-foreground">{track.name}</span>
              </p>
              <ol className="flex items-center gap-2 text-sm">
                {track.steps.map((step, stepIndex) => {
                  const last = stepIndex === track.steps.length - 1
                  return (
                    <li key={step} className={cn("flex items-center gap-2", !last && "flex-1")}>
                      <span
                        className={cn(
                          "shrink-0 px-2.5 py-1 whitespace-nowrap",
                          last
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background text-foreground",
                        )}
                      >
                        {step}
                      </span>
                      {!last && <span className="hero-wipe h-px flex-1 bg-primary/60" />}
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <li>Fixed price</li>
          <li>Friday demos</li>
          <li>Yours to own</li>
        </ul>
      </div>
    </HeroWindow>
  )
}
