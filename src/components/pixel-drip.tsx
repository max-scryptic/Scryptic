"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { cn } from "cn"

import { dropPixel } from "@/components/falling-pixel"
import { CELL, edgePatterns, HIDDEN, railX, type EdgePatternName } from "@/lib/pixel-drip"

/** Most falling pixels alive at once. */
const MAX = 10
/** Clear space either side of each guide line, so the rail squares sit on a clean edge. */
const CLEAR = 12
/** The shapes run out of the band a cell at a time, this long per cell, after a short pause. */
const INTRO_STEP = 80
const INTRO_DELAY = 200

/**
 * A Lapis band's edge, broken up into pixels (lib/pixel-drip.ts draws them):
 * drips run down off a bottom edge (`side="bottom"`, rendered straight after
 * the band), or piles of landed drips sit on a top edge (`side="top"`,
 * rendered straight before it). The band must paint above this (relative
 * z-[2]), as every shape runs back behind it.
 *
 * The shapes run out from behind the band to where they rest: on load
 * (`play="load"`, the hero), or once the edge scrolls into view
 * (`play="view"`). The hero's drips also slide down a few cells as the page
 * scrolls away (`stretch`, .drip-stretch in globals.css), so they lengthen
 * without coming loose. Once drips have run out, now and then a pixel falls
 * from the tip of a longer one. Every shape stays clear of the guide lines,
 * where the rail-joint squares sit. For reduced motion all of it is still.
 */
export function PixelDrip({
  className,
  pattern: name = "heroDrips",
  side = "bottom",
  play = "load",
  stretch = false,
}: {
  /** The band's background colour. */
  className: string
  pattern?: EdgePatternName
  side?: "top" | "bottom"
  play?: "load" | "view"
  stretch?: boolean
}) {
  const pattern = edgePatterns[name]
  const wrap = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const steps = pattern.longest / CELL
  const introEnd = INTRO_DELAY + steps * INTRO_STEP

  useEffect(() => {
    const box = wrap.current
    const shapes = strip.current
    const fall = layer.current
    if (!box || !shapes) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let timer: number | undefined
    let visible = false
    // No pixels fall until the drips have run out.
    let readyAt = play === "load" ? performance.now() + introEnd : Infinity
    let first = true
    const color = getComputedStyle(shapes).backgroundColor

    function tick() {
      timer = window.setTimeout(tick, 500 + Math.random() * 900)
      if (!visible || document.hidden || performance.now() < readyAt) return
      if (!box || !shapes || !fall || fall.childElementCount >= MAX) return
      const width = shapes.clientWidth
      const rail = railX(width, window.innerWidth)
      // The longer drips, in every repeat of the tile, away from the guides.
      const tips = []
      for (let start = 0; start < width; start += pattern.tile) {
        for (const drip of pattern.drips) {
          const centre = start + drip.x + drip.width / 2
          if (drip.length < 4 * CELL || centre > width) continue
          if (Math.abs(centre - rail) < CLEAR + 8 || Math.abs(centre - (width - rail)) < CLEAR + 8) continue
          tips.push({ x: start + drip.x, width: drip.width, length: drip.length })
        }
      }
      const tip = tips[Math.floor(Math.random() * tips.length)]
      if (!tip) return
      // Where the tip is now, after any slide down from the scroll.
      const slide = shapes.getBoundingClientRect().top - box.getBoundingClientRect().top + HIDDEN
      dropPixel(fall, {
        x: tip.x + Math.floor(Math.random() * (tip.width / CELL)) * CELL,
        y: slide + tip.length - CELL,
        size: CELL,
        fall: 16 + Math.random() * 28,
        color,
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (play === "view" && readyAt === Infinity) {
          // Below the fold at first: hide the shapes behind the band until it comes up.
          if (first && !visible) box.dataset.drip = "wait"
          if (visible) {
            box.dataset.drip = "play"
            readyAt = performance.now() + introEnd
          }
        }
        first = false
      },
      // Play a little after the edge clears the bottom of the screen, as ScrollReveal does.
      { rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(box)
    tick()
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [pattern, play, introEnd])

  const edge = side === "bottom" ? { top: -HIDDEN } : { bottom: -HIDDEN }

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      // The play-in moves this box, not the strip, which the scroll stretch may animate.
      data-drip={play === "load" ? "play" : undefined}
      className="pointer-events-none relative z-[1] h-0"
      style={
        {
          "--drip-in-from": `${side === "bottom" ? -pattern.longest : pattern.longest}px`,
          "--drip-in-steps": steps,
          "--drip-in-time": `${steps * INTRO_STEP}ms`,
          "--drip-in-delay": `${play === "load" ? INTRO_DELAY : 0}ms`,
        } as CSSProperties
      }
    >
      <div
        ref={strip}
        className={cn("absolute inset-x-0", stretch && "drip-stretch", className)}
        style={{
          ...edge,
          height: pattern.height,
          // The shapes, less a strip around each guide line.
          maskImage: `${pattern.mask}, linear-gradient(to right, transparent calc(var(--rail-x) - ${CLEAR}px), #000 0 calc(var(--rail-x) + ${CLEAR}px), transparent 0 calc(100% - var(--rail-x) - ${CLEAR}px), #000 0 calc(100% - var(--rail-x) + ${CLEAR}px), transparent 0)`,
          maskSize: `${pattern.tile}px ${pattern.height}px, 100% 100%`,
          maskRepeat: "repeat-x, no-repeat",
          maskPosition: "left top, left top",
          maskComposite: "subtract",
        }}
      />
      {pattern.drips.length > 0 && <div ref={layer} className="absolute inset-x-0 top-0" />}
    </div>
  )
}
