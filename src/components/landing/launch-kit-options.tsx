import { Icon, type IconName } from "@/components/landing/icons"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

type Item = { icon: IconName; name: string; text: string; tag: string }
type Props = { id: string; eyebrow: string; title: string; intro: React.ReactNode; items: Item[] }

function Badge({ icon, size = "size-10" }: { icon: IconName; size?: string }) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground`}
    >
      <Icon name={icon} />
    </span>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs whitespace-nowrap text-muted-foreground">
      {children}
    </span>
  )
}

/* A. Ledger: heading on the left, one framed panel of divided rows on the right. */
export function LedgerOption({ id, eyebrow, title, intro, items }: Props) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`} className="lg:grid lg:grid-cols-[1fr_1.25fr] lg:items-center">
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <ul data-reveal="children" className="corners guides divide-y divide-border border border-border bg-card">
        {items.map((item) => (
          <li key={item.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 sm:px-6">
            <Badge icon={item.icon} />
            <span className="flex min-w-0 flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-pretty text-muted-foreground">{item.text}</span>
            </span>
            <Tag>{item.tag}</Tag>
          </li>
        ))}
      </ul>
    </LandingSection>
  )
}

/* B. Tile grid: heading on top, a 3 by 2 grid of tiles sharing hairline borders. */
export function GridOption({ id, eyebrow, title, intro, items }: Props) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <ul
        data-reveal="children"
        className="corners guides grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-5 bg-card p-6 sm:p-8">
            <span className="flex items-center justify-between gap-4">
              <Badge icon={item.icon} />
              <Tag>{item.tag}</Tag>
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-lg font-medium">{item.name}</span>
              <span className="text-pretty text-muted-foreground">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </LandingSection>
  )
}

/* C. Hub: heading on top, the product in the middle, three parts wired in from each side. */
export function HubOption({ id, eyebrow, title, intro, items }: Props) {
  const half = Math.ceil(items.length / 2)
  const sides = [items.slice(0, half), items.slice(half)]
  const line = "border-dashed border-primary/60"

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={`${inset} mx-auto text-center [&>*]:mx-auto`} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="grid items-center gap-2.5 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
        {sides.map((side, s) => (
          <ul
            key={s}
            data-reveal="children"
            className={`flex flex-col gap-2.5 lg:row-start-1 lg:gap-4 ${s === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}
          >
            {side.map((item, i) => (
              <li key={item.name} className={`relative flex items-center ${s === 0 ? "" : "lg:flex-row-reverse"}`}>
                <span className="corners corners-grow grid flex-1 grid-cols-[auto_1fr_auto] items-center gap-4 border border-border bg-card px-4 py-3.5 transition-colors [--corner-len:0px] hover:border-primary/50 hover:[--corner-len:24px] sm:px-5">
                  <Badge icon={item.icon} />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-pretty text-muted-foreground">{item.text}</span>
                  </span>
                  <Tag>{item.tag}</Tag>
                </span>
                <span aria-hidden="true" className={`hidden w-6 border-t lg:block xl:w-8 ${line}`} />
                <span
                  aria-hidden="true"
                  className={`absolute hidden lg:block ${line} ${s === 0 ? "right-0 border-r" : "left-0 border-l"} ${
                    i === 0 ? "top-1/2 -bottom-2" : i === side.length - 1 ? "-top-2 bottom-1/2" : "-top-2 -bottom-2"
                  }`}
                />
              </li>
            ))}
          </ul>
        ))}
        <div aria-hidden="true" className="hidden items-center lg:col-start-2 lg:row-start-1 lg:flex">
          <span className={`w-6 border-t xl:w-8 ${line}`} />
          <div className="corners flex flex-col items-center gap-3 border border-primary/50 bg-card px-7 py-9 shadow-2xl shadow-primary/10">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon name="spark" className="size-6" />
            </span>
            <span className="text-lg font-medium">Your MVP</span>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Launch day</span>
          </div>
          <span className={`w-6 border-t xl:w-8 ${line}`} />
        </div>
      </div>
    </LandingSection>
  )
}

/* D. Two panels: heading on top, the parts customers touch beside the parts you own. */
export function SplitOption({
  id,
  eyebrow,
  title,
  intro,
  items,
  groups = ["What customers use", "What you own"],
}: Props & { groups?: [string, string] }) {
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div className="corners guides grid divide-y divide-border border border-border bg-card md:grid-cols-2 md:divide-x md:divide-y-0">
        {columns.map((column, c) => (
          <div key={groups[c]} className={`flex flex-col gap-6 p-6 sm:p-10 ${c === 0 ? "bg-primary/[0.03]" : ""}`}>
            <h3 className="w-fit font-mono text-xs tracking-widest text-muted-foreground uppercase">{groups[c]}</h3>
            <ul data-reveal="children" className="flex flex-col gap-6">
              {column.map((item) => (
                <li key={item.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <Badge icon={item.icon} />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-lg font-medium">{item.name}</span>
                    <span className="text-pretty text-muted-foreground">{item.text}</span>
                  </span>
                  <Tag>{item.tag}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </LandingSection>
  )
}
