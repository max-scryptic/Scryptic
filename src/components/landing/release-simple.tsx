import { cn } from "cn"

import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/* Prototype: three simple redesigns of the release section. */

type Step = { id: string; name: string; text: string }

const pad = (n: number) => String(n + 1).padStart(2, "0")

/* A. Five steps in one row, like a spec strip. */
export function ReleaseStrip({ id, eyebrow, title, steps }: { id: string; eyebrow: string; title: string; steps: Step[] }) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`} />
      <ol className="mt-12 grid border-y border-border sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "flex flex-col gap-3 border-border px-6 py-8 sm:px-8 lg:px-6",
              index > 0 && "border-t sm:border-t-0 lg:border-l",
              index % 2 === 1 && "sm:border-l",
              index >= 2 && "sm:border-t lg:border-t-0",
            )}
          >
            <span className="flex items-center gap-3 font-mono text-xs tracking-widest text-primary">
              <span className={cn("size-2", index === steps.length - 1 ? "bg-primary" : "border border-primary")} />
              {pad(index)}
            </span>
            <h3 className="text-lg leading-snug tracking-tight">{step.name}</h3>
            <p className="text-sm text-pretty text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}

/* B. A short answer beside what we handle. */
const handled = [
  "Test builds on TestFlight and Google Play's testing tracks",
  "Store listing, screenshots and privacy details",
  "Submission from your Apple Developer and Play Console accounts",
  "Answers to any questions the reviewers ask",
  "Release on the day you pick",
]

export function ReleaseSplit({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <div className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", inset)}>
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} id={`${id}-heading`} />
          <p className="max-w-md text-lg text-pretty text-muted-foreground">
            We publish it for you. Your app goes out from your own Apple and Google accounts, under your
            company&apos;s name, and we handle every step from the first test build to approval.
          </p>
        </div>
        <div className="ticks self-start border border-border bg-card">
          <p className="border-b border-border px-6 py-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            What we handle
          </p>
          <ul className="flex flex-col divide-y divide-border">
            {handled.map((item) => (
              <li key={item} className="flex gap-3 px-6 py-4">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LandingSection>
  )
}

/* C. The two stores side by side. */
const stores = [
  {
    name: "App Store",
    rows: [
      ["Account", "Your Apple Developer account"],
      ["Testing", "TestFlight"],
      ["Submitted with", "Listing, screenshots, privacy details"],
      ["Reviewed by", "Apple"],
    ],
  },
  {
    name: "Google Play",
    rows: [
      ["Account", "Your Play Console account"],
      ["Testing", "Internal and closed testing tracks"],
      ["Submitted with", "Listing, screenshots, data safety form"],
      ["Reviewed by", "Google"],
    ],
  },
]

export function ReleaseStores({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`} />
      <div className="mt-12 grid gap-6 px-6 sm:px-8 md:grid-cols-2">
        {stores.map((store) => (
          <div key={store.name} className="ticks border border-border bg-card">
            <h3 className="border-b border-border px-6 py-4 text-xl tracking-tight">{store.name}</h3>
            <dl className="flex flex-col divide-y divide-border">
              {store.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-3.5 text-sm">
                  <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className={cn("mt-8 max-w-2xl text-pretty text-muted-foreground", inset)}>
        Once both approve, your app is live under your company&apos;s name, on the day you pick.
      </p>
    </LandingSection>
  )
}
