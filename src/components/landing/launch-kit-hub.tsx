"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { Icon, type IconName } from "@/components/landing/icons"

export type HubItem = { icon: IconName; name: string; text: string; tag: string }

/** What the product card in the middle says before the hub starts going round. */
export type HubCore = { name: string; tag: string }

const defaultCore: HubCore = { name: "Your MVP", tag: "Launch day" }

/*
 * Six parts wired into the product in the middle: three on each side on wide
 * screens, one spine under the product card below lg. Rows on both sides are
 * the same height (auto-rows-fr), so their centres sit at 1/6, 1/2 and 5/6 of
 * the column and the SVG connectors can be drawn in percentages. The hub goes
 * round the parts in turn (clockwise on wide screens) once it is on screen,
 * unless the visitor prefers reduced motion. Hover does not affect it. "highlight" lights the
 * active card; "trace" leaves the cards as outlines and draws a line round
 * the active one, which follows itself off as the next one draws. The
 * connectors and the product card are decorative: the list says the same thing.
 */
const clockwise = [0, 3, 4, 5, 2, 1]
const step = 2600

/** The active part, stepped round on a timer while in view. Pointer input never changes it. */
function useCycle(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [previous, setPrevious] = useState<number | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const advance = () => {
      const order = window.matchMedia("(min-width: 64rem)").matches ? clockwise : [...Array(count).keys()]
      setActive((current) => {
        setPrevious(current)
        return current === null ? order[0] : order[(order.indexOf(current) + 1) % order.length]
      })
    }
    const first = window.setTimeout(advance, 400)
    const timer = window.setInterval(advance, step)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(timer)
    }
  }, [inView, count])

  return { ref, active, previous }
}

/** The line drawn round a card in "trace" mode, starting at the corner nearest the product. */
function Trace({ state, mirror }: { state: "on" | "leaving" | "off"; mirror: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-px -left-px h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible",
        mirror && "-scale-x-100",
      )}
    >
      <rect
        width="100%"
        height="100%"
        pathLength={100}
        fill="none"
        strokeWidth={1.5}
        data-state={state}
        className="hub-trace stroke-primary dark:stroke-[#c3caff]"
      />
    </svg>
  )
}
const centres = [100 / 6, 50, 500 / 6]

function Connectors({ side, active }: { side: 0 | 1; active: number | null }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "hidden h-full w-full overflow-visible lg:row-start-1 lg:block",
        side === 0 ? "lg:col-start-2" : "lg:col-start-4 -scale-x-100",
      )}
    >
      {centres.map((y, i) => {
        const on = active === side * 3 + i
        return (
          <path
            key={y}
            d={`M0 ${y} H50 V50 H100`}
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="4 4"
            className={cn(
              "hub-flow stroke-primary transition-[stroke-opacity,stroke-width] duration-300",
              on ? "[stroke-opacity:1] [stroke-width:1.5]" : active === null ? "[stroke-opacity:0.55]" : "[stroke-opacity:0.2]",
            )}
          />
        )
      })}
    </svg>
  )
}

function Core({ items, active, core }: { items: HubItem[]; active: number | null; core: HubCore }) {
  const item = active === null ? null : items[active]
  return (
    <div
      aria-hidden="true"
      className="corners flex flex-col border border-primary/50 bg-card shadow-2xl shadow-primary/10 lg:col-start-3 lg:row-start-1 lg:w-56 lg:self-center"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        <span className="size-1.5 bg-foreground/15" />
        <span className="size-1.5 bg-foreground/15" />
        <span className="size-1.5 bg-foreground/15" />
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.6875rem] text-primary dark:text-[#c3caff]">
          <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
          Live
        </span>
      </div>
      <div className="flex items-center gap-4 p-4 lg:flex-col lg:gap-3 lg:px-5 lg:py-7">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground lg:size-14">
          <Icon key={item?.icon ?? "spark"} name={item?.icon ?? "spark"} className="hub-swap size-6" />
        </span>
        <span className="flex flex-col gap-1 lg:items-center">
          <span key={item?.name ?? "core"} className="hub-swap text-lg font-medium">
            {item?.name ?? core.name}
          </span>
          <span key={item?.tag ?? "tag"} className="hub-swap font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {item ? item.tag : core.tag}
          </span>
        </span>
        <span className="ml-auto flex gap-1 lg:mt-2 lg:ml-0">
          {items.map((it, i) => (
            <span
              key={it.name}
              className={cn(
                "flex size-6 items-center justify-center rounded-full transition-colors duration-300",
                active === i ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground",
              )}
            >
              <Icon name={it.icon} className="size-3" />
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export function LaunchKitHub({
  items,
  mode = "trace",
  core = defaultCore,
}: {
  items: HubItem[]
  mode?: "highlight" | "trace"
  core?: HubCore
}) {
  const { ref, active, previous } = useCycle(items.length)
  const sides = [items.slice(0, 3), items.slice(3, 6)]

  return (
    <div ref={ref} className="grid lg:grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] xl:grid-cols-[1fr_3.5rem_auto_3.5rem_1fr]">
      <Core items={items} active={active} core={core} />
      <Connectors side={0} active={active} />
      <Connectors side={1} active={active} />
      {/* Below lg: one spine down the left, from the product card to the last part. */}
      <div className="relative pt-3 pl-7 lg:contents">
        <span aria-hidden="true" className="absolute top-0 left-3 h-3 border-l border-dashed border-primary/55 lg:hidden" />
        {sides.map((side, s) => (
          <ul
            key={s}
            data-reveal="children"
            className={cn("grid lg:row-start-1 lg:auto-rows-fr", s === 0 ? "lg:col-start-1" : "lg:col-start-5")}
          >
            {side.map((item, i) => {
              const index = s * 3 + i
              const last = index === items.length - 1
              return (
                <li
                  key={item.name}
                  className="relative flex py-1.5 lg:py-2"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-4 top-0 border-l border-dashed border-primary/55 lg:hidden",
                      last ? "h-1/2" : "h-full",
                    )}
                  />
                  <span aria-hidden="true" className="absolute top-1/2 -left-4 w-4 border-t border-dashed border-primary/55 lg:hidden" />
                  <span
                    className={cn(
                      "grid flex-1 grid-cols-[auto_1fr] items-center gap-4 border px-4 py-3.5 transition-colors duration-500 sm:px-5",
                      mode === "highlight"
                        ? cn(
                            "corners corners-grow bg-card [--corner-len:0px]",
                            active === index ? "border-primary/60 [--corner-len:18px]" : "border-border",
                          )
                        : cn("relative", active === index ? "border-border bg-card" : "border-border/70 bg-transparent"),
                    )}
                  >
                    {mode === "trace" && (
                      <Trace
                        mirror={s === 0}
                        state={active === index ? "on" : previous === index ? "leaving" : "off"}
                      />
                    )}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground">
                      <Icon name={item.icon} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="rounded-full border border-border px-2 py-px font-mono text-[0.6875rem] text-muted-foreground">
                          {item.tag}
                        </span>
                      </span>
                      <span className="text-sm text-pretty text-muted-foreground">{item.text}</span>
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}
