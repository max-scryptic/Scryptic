"use client"

import { cn } from "cn"
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"

import { useScrollSparks } from "@/components/scroll-sparks"
import { Button } from "@/components/ui/button"
import { inset } from "@/lib/frame"

export type CarouselItem = {
  id: string
  /** The filter group the item belongs to, matched against `groups`. */
  group?: string
  /** The rendered card, built on the server. */
  card: ReactNode
}

/**
 * A row of post cards that scrolls sideways, so a series on /blog takes one
 * row however many posts it has. Every card is in the server HTML (the filter
 * starts on "All"), so crawlers see every link. With `groups`, chips above the
 * row narrow it to one group and show that group's description.
 */
export function PostCarousel({
  label,
  items,
  groups,
}: {
  /** Names the carousel for screen readers, e.g. "Choosing your stack posts". */
  label: string
  items: CarouselItem[]
  groups?: { name: string; text: string }[]
}) {
  const listId = useId()
  const listRef = useRef<HTMLUListElement>(null)
  const sparkRef = useRef<HTMLDivElement>(null)
  const [group, setGroup] = useState<string | null>(null)
  const [canScroll, setCanScroll] = useState({ prev: false, next: false })
  const [pages, setPages] = useState({ count: 1, current: 0 })
  // The page an arrow or dot last asked for, while its smooth scroll runs, so a
  // second click moves on from there rather than from wherever the row has got to.
  const target = useRef<{ page: number; timer?: number } | null>(null)

  const shown = group ? items.filter((item) => item.group === group) : items
  const activeGroup = groups?.find((g) => g.name === group)

  /**
   * Where each page starts, measured from the cards themselves. A page is as many
   * whole cards as fit; scrolling by the row's width instead overshoots by the
   * row's side padding, which leaves the cards off the guides wherever the browser
   * does not snap them back.
   */
  const layout = useCallback(() => {
    const list = listRef.current
    const cards = list ? (Array.from(list.children) as HTMLElement[]) : []
    if (!list || cards.length === 0) return null
    const style = getComputedStyle(list)
    const gap = parseFloat(style.columnGap) || 0
    const step = cards[0].getBoundingClientRect().width + gap
    const view = list.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    // The extra pixel absorbs rounding in the cards' calc() widths.
    const perPage = Math.max(1, Math.floor((view + gap + 1) / step))
    const pageWidth = perPage * step
    const max = list.scrollWidth - list.clientWidth
    return {
      count: Math.ceil(cards.length / perPage),
      max,
      pageWidth,
      offset: (page: number) => Math.min(max, page * pageWidth),
    }
  }, [])

  const sparks = useScrollSparks(listRef, sparkRef)

  const update = useCallback(() => {
    const list = listRef.current
    const l = layout()
    if (!list || !l) return
    const atEnd = list.scrollLeft >= l.max - 4
    const current =
      target.current?.page ??
      (atEnd ? l.count - 1 : Math.min(l.count - 1, Math.round(list.scrollLeft / l.pageWidth)))
    setCanScroll({ prev: list.scrollLeft > 4, next: !atEnd })
    setPages((p) => (p.count === l.count && p.current === current ? p : { count: l.count, current }))
  }, [layout])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    update()
    const observer = new ResizeObserver(update)
    observer.observe(list)
    return () => observer.disconnect()
  }, [update])

  useEffect(() => {
    listRef.current?.scrollTo({ left: 0 })
    update()
  }, [group, update])

  function settle() {
    if (target.current) window.clearTimeout(target.current.timer)
    target.current = null
    update()
  }

  function goToPage(page: number) {
    const list = listRef.current
    const l = layout()
    if (!list || !l) return
    const next = Math.max(0, Math.min(l.count - 1, page))
    if (target.current) window.clearTimeout(target.current.timer)
    // Cleared on scrollend, or after a while where that event is missing or the
    // scroll is cut short (a swipe part way through, say).
    target.current = { page: next, timer: window.setTimeout(settle, 1000) }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    list.scrollTo({ left: l.offset(next), behavior: reduceMotion ? "auto" : "smooth" })
    update()
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-6">
      <div className={cn("flex flex-wrap items-end justify-between gap-4", inset)}>
        {groups ? (
          <div className="flex flex-col gap-3">
            <ul className="flex flex-wrap gap-2 font-mono text-xs" aria-label="Filter by kind of tool">
              {[{ name: null, label: "All" }, ...groups.map((g) => ({ name: g.name, label: g.name }))].map(
                (chip) => (
                  <li key={chip.label}>
                    <button
                      type="button"
                      aria-pressed={group === chip.name}
                      onClick={() => setGroup(chip.name)}
                      className={cn(
                        "border px-3 py-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        group === chip.name
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {chip.label}
                    </button>
                  </li>
                )
              )}
            </ul>
            <p className="max-w-2xl text-sm text-pretty text-muted-foreground" aria-live="polite">
              {activeGroup ? activeGroup.text : `All ${items.length} guides, grouped by kind of tool.`}
            </p>
          </div>
        ) : (
          <p className="font-mono text-xs text-muted-foreground">
            {items.length} {items.length === 1 ? "post" : "posts"}
          </p>
        )}

        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            aria-controls={listId}
            aria-label="Previous posts"
            disabled={!canScroll.prev}
            onClick={() => goToPage(pages.current - 1)}
          >
            <Chevron direction="left" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            aria-controls={listId}
            aria-label="Next posts"
            disabled={!canScroll.next}
            onClick={() => goToPage(pages.current + 1)}
          >
            <Chevron direction="right" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* The row reaches a gutter past each guide, where its cards pass while it
            scrolls: they dissolve into pixels there (.dissolve-x) and throw off
            sparks, drawn in the layer over the row. */}
        <div className="relative">
          <ul
            id={listId}
            ref={listRef}
            onScroll={() => {
              update()
              sparks()
            }}
            onScrollEnd={settle}
            className="dissolve-x -mx-(--gutter) flex snap-x snap-mandatory scroll-px-(--gutter) gap-6 overflow-x-auto px-(--gutter) pt-px pb-2 [--gutter:--spacing(4)] [scrollbar-width:none] sm:[--gutter:--spacing(6)] [&::-webkit-scrollbar]:hidden"
          >
            {shown.map((item) => (
              <li
                key={item.id}
                className="grid w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                {item.card}
              </li>
            ))}
          </ul>
          <div ref={sparkRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
        </div>
        {/* Page dots. Their row is kept while the count is measured, so it does not shift the page. */}
        {shown.length > 1 && (
          <ul className={cn("flex min-h-6 flex-wrap justify-center gap-1", inset)} aria-label="Pages">
            {pages.count > 1 &&
              Array.from({ length: pages.count }, (_, page) => (
                <li key={page}>
                  <button
                    type="button"
                    aria-controls={listId}
                    aria-label={`Page ${page + 1} of ${pages.count}`}
                    aria-current={page === pages.current ? "true" : undefined}
                    onClick={() => goToPage(page)}
                    className="group/dot flex h-6 items-center px-1 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "block h-1.5 transition-all duration-300 motion-reduce:transition-none",
                        page === pages.current
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-muted-foreground/40 group-hover/dot:bg-muted-foreground"
                      )}
                    />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
