import Link from "next/link"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

/** The usual ways to get an app built, the columns after ours. */
export const alternatives = ["In-house hire", "Agency", "Freelancer", "AI-only tools"] as const

type Alternative = (typeof alternatives)[number]

/** One row of the table. Scryptic always gets a tick, so it is drawn from the column rather than stored. */
export type ComparisonRow = {
  name: string
  text: string
  values: Record<Alternative, boolean>
}

/** How the studio compares on getting a product built, used on the home and MVP pages. */
export const studioComparison: ComparisonRow[] = [
  {
    name: "Speed",
    text: "Launched after a 2 or 3 week sprint, not a hiring round",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Quality",
    text: "Production code that holds up with real users",
    values: { "In-house hire": true, Agency: true, Freelancer: false, "AI-only tools": false },
  },
  {
    name: "Flexibility",
    text: "Priorities revisited every week as you learn",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": false },
  },
  {
    name: "Yours to own",
    text: "Code and accounts handed over to you",
    values: { "In-house hire": true, Agency: false, Freelancer: true, "AI-only tools": true },
  },
  {
    name: "Cost vs value",
    text: "A fixed price for a launched product",
    values: { "In-house hire": false, Agency: false, Freelancer: true, "AI-only tools": true },
  },
]

function ComparisonMark({ value, highlight = false }: { value: boolean; highlight?: boolean }) {
  return (
    <>
      <span className="sr-only">{value ? "Yes" : "No"}</span>
      {highlight ? (
        <span
          aria-hidden="true"
          className="reveal-pop mx-auto flex size-8 items-center justify-center bg-primary text-primary-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={value ? 2.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("mx-auto size-5", value ? "text-foreground" : "text-muted-foreground/60")}
        >
          {value ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
        </svg>
      )}
    </>
  )
}

export function ComparisonSection({
  title,
  intro,
  rows = studioComparison,
}: {
  title: string
  intro: React.ReactNode
  rows?: ComparisonRow[]
}) {
  return (
    <LandingSection id="compare" labelledBy="compare-heading">
      <div className={cn("flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between", inset)}>
        <SectionHeading eyebrow={`Why ${siteConfig.name}`} title={title} id="compare-heading">
          {intro}
        </SectionHeading>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={pages.bookCall.path} />}
          className="h-11 w-fit shrink-0 px-6 text-base"
        >
          Book a discovery call
        </Button>
      </div>

      {/* The brackets and guides sit on an outer box, as the scroll area would clip them.
          Relative so the visually hidden labels stay inside the scroll area on phones. */}
      <div className="corners guides border border-border bg-card">
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left sm:min-w-[720px]">
            <caption className="sr-only">
              How {siteConfig.name} compares with an in-house hire, an agency, a freelancer and
              AI-only tools
            </caption>
            <thead>
              <tr className="border-b border-border">
                <td className="sticky left-0 z-10 w-[24%] bg-card" />
                <th
                  scope="col"
                  className="w-[16%] bg-primary/10 px-4 py-6 text-center font-logo text-xl font-extrabold tracking-tight lowercase"
                >
                  {siteConfig.name}
                </th>
                {alternatives.map((alternative) => (
                  <th
                    key={alternative}
                    scope="col"
                    className="w-[15%] px-4 py-6 text-center text-sm font-medium"
                  >
                    {alternative}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-reveal="children" className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className="sticky left-0 z-10 bg-card px-4 py-5 font-normal sm:px-8">
                    <span className="block font-medium">{row.name}</span>
                    <span className="hidden text-sm text-pretty text-muted-foreground sm:block">
                      {row.text}
                    </span>
                  </th>
                  <td className="bg-primary/10 px-4 py-5">
                    <ComparisonMark value highlight />
                  </td>
                  {alternatives.map((alternative) => (
                    <td key={alternative} className="px-4 py-5">
                      <ComparisonMark value={row.values[alternative]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LandingSection>
  )
}
