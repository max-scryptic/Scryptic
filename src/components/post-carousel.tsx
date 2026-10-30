"use client"

import { cn } from "cn"
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"

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
  const [group, setGroup] = useState<string | null>(null)
  const [canScroll, setCanScroll] = useState({ prev: false, next: false })

  const shown = group ? items.filter((item) => item.group === group) : items
  const activeGroup = groups?.find((g) => g.name === group)

  const update = useCallback(() => {
    const list = listRef.current
    if (!list) return
    setCanScroll({
      prev: list.scrollLeft > 4,
      next: list.scrollLeft + list.clientWidth < list.scrollWidth - 4,
    })
  }, [])

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

  function scrollByPage(direction: 1 | -1) {
    const list = listRef.current
    if (!list) return
    list.scrollBy({ left: direction * list.clientWidth, behavior: "smooth" })
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
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
                        "rounded-full border px-3 py-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
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
            className="rounded-full"
            aria-controls={listId}
            aria-label="Previous posts"
            disabled={!canScroll.prev}
            onClick={() => scrollByPage(-1)}
          >
            <Chevron direction="left" />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full"
            aria-controls={listId}
            aria-label="Next posts"
            disabled={!canScroll.next}
            onClick={() => scrollByPage(1)}
          >
            <Chevron direction="right" />
          </Button>
        </div>
      </div>

      <ul
        id={listId}
        ref={listRef}
        onScroll={update}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
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
