"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"

import { dropPixel } from "@/components/falling-pixel"
import { CELL, drips, HEIGHT, HIDDEN, mask, railX, TILE } from "@/lib/pixel-drip"

/** Most falling pixels alive at once. */
const MAX = 10
/** Clear space either side of each guide line, so the rail squares sit on a clean edge. */
const CLEAR = 12

/**
 * The hero band's bottom edge, run down into the page as pixel drips
 * (lib/pixel-drip.ts draws them). Render it straight after the band, which
 * must paint above it (z-[2]): the drips run up behind the band, and slide
 * down a few cells as the page scrolls away (.drip-stretch in globals.css),
 * so they lengthen without coming loose. Now and then a pixel falls from
 * the tip of a longer drip. The drips stay clear of the guide lines, where
 * the rail-joint squares sit. For reduced motion the drips are still.
 */
export function PixelDrip({ className }: { className: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const dripRef = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = wrap.current
    const strip = dripRef.current
    const fall = layer.current
    if (!box || !strip || !fall) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let timer: number | undefined
    let visible = false
    const color = getComputedStyle(strip).backgroundColor

    function tick() {
      timer = window.setTimeout(tick, 500 + Math.random() * 900)
      if (!visible || document.hidden || !box || !strip || !fall ||fall.childElementCount >= MAX) return
      const width = strip.clientWidth
      const rail = railX(width, window.innerWidth)
      // The longer drips, in every repeat of the tile, away from the guides.
      const tips = []
      for (let start = 0; start < width; start += TILE) {
        for (const drip of drips) {
          const centre = start + drip.x + drip.width / 2
          if (drip.length < 4 * CELL || centre > width) continue
          if (Math.abs(centre - rail) < CLEAR + 8 || Math.abs(centre - (width - rail)) < CLEAR + 8) continue
          tips.push({ x: start + drip.x, width: drip.width, length: drip.length })
        }
      }
      const tip = tips[Math.floor(Math.random() * tips.length)]
      if (!tip) return
      // Where the tip is now, after any slide down from the scroll.
      const slide = strip.getBoundingClientRect().top - box.getBoundingClientRect().top + HIDDEN
      dropPixel(fall, {
        x: tip.x + Math.floor(Math.random() * (tip.width / CELL)) * CELL,
        y: slide + tip.length - CELL,
        size: CELL,
        fall: 16 + Math.random() * 28,
        color,
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(box)
    tick()
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none relative z-[1] h-0">
      <div
        ref={dripRef}
        className={cn("drip-stretch absolute inset-x-0", className)}
        style={{
          top: -HIDDEN,
          height: HEIGHT,
          // The drips, less a strip around each guide line.
          maskImage: `${mask}, linear-gradient(to right, transparent calc(var(--rail-x) - ${CLEAR}px), #000 0 calc(var(--rail-x) + ${CLEAR}px), transparent 0 calc(100% - var(--rail-x) - ${CLEAR}px), #000 0 calc(100% - var(--rail-x) + ${CLEAR}px), transparent 0)`,
          maskSize: `${TILE}px ${HEIGHT}px, 100% 100%`,
          maskRepeat: "repeat-x, no-repeat",
          maskPosition: "left top, left top",
          maskComposite: "subtract",
        }}
      />
      <div ref={layer} className="absolute inset-x-0 top-0" />
    </div>
  )
}
