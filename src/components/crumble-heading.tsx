"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"

import { dropPixel } from "@/components/falling-pixel"

/** Width of the crumbled end, matching --crumble in globals.css. */
const CRUMBLE = 40
/** Most falling pixels alive at once. */
const MAX = 8

/**
 * The 404 page's heading, its end broken up into pixels (.pixel-crumble in
 * globals.css). Once the crumble has played, a pixel falls from the broken
 * end every so often and fades. For reduced motion the heading stays crumbled
 * and nothing falls.
 */
export function CrumbleHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  const heading = useRef<HTMLHeadingElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heading.current
    const box = layer.current
    if (!el || !box) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const color = getComputedStyle(el).color
    let timer: number | undefined
    function tick() {
      timer = window.setTimeout(tick, 280 + Math.random() * 520)
      if (document.hidden || !el || !box || box.childElementCount >= MAX) return
      // Mostly from the thinnest cells, at the very end.
      const fromEnd = Math.floor(Math.random() * Math.random() * (CRUMBLE / 4)) * 4
      dropPixel(box, {
        x: el.offsetWidth - 4 - fromEnd,
        y: Math.floor((Math.random() * el.offsetHeight) / 4) * 4,
        fall: 20 + Math.random() * 44,
        color,
      })
    }
    // After the crumble animation (0.6s delay, 1s long).
    timer = window.setTimeout(tick, 1600)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <h1 ref={heading} className={cn("pixel-crumble", className)}>
        {children}
      </h1>
      <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0" />
    </div>
  )
}
