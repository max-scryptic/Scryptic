"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { cn } from "cn"

import { pixelLabel } from "@/components/landing/section-heading"

export type MobileNavMenuItem = { name: string; link: string }

/*
 * The "Menu" button that stands in for the header's links on screens too
 * narrow to show them all. It opens a panel under the bar listing every
 * top-level page. The panel closes on navigation, Escape, a tap outside it or
 * a second tap on the button. Pass `className` to hide it where the full
 * links show.
 */
export function MobileNavMenu({ items, className }: { items: MobileNavMenuItem[]; className?: string }) {
  const pathname = usePathname()
  // The page the menu was opened on: navigating anywhere, the back button
  // included, closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenOn(null)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenOn(null)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenOn(open ? null : pathname)}
        className={cn(
          "flex min-h-10 items-center gap-1.5 px-2 whitespace-nowrap text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:text-foreground aria-expanded:text-foreground min-[360px]:px-3",
          pixelLabel,
        )}
      >
        Menu
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {/* Positioned against the fixed header, so the panel spans the bar's full width. */}
      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full pt-2">
        <ul className="corners flex flex-col border border-border bg-card p-2 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.3)] [--corner:var(--foreground)]">
          {items.map((item) => {
            const current =
              pathname === item.link || (item.link !== "/" && pathname.startsWith(`${item.link}/`))
            return (
              <li key={item.link}>
                <Link
                  href={item.link}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpenOn(null)}
                  className={cn(
                    "flex min-h-12 items-center px-3 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:text-foreground aria-[current=page]:text-foreground",
                    pixelLabel,
                  )}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
