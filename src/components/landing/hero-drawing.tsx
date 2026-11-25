"use client"

import { useHeroLoop } from "@/components/landing/use-hero-loop"

/** Rest, then played forward and held; the rewind runs as the loop wraps. */
const durations = [2400, 4200]

/** The hole's grid, in cells: about 12px each at full size, so the tear reads as pixels. */
const COLS = 36
const ROWS = 34
/** How far in from the grid's edge the hole's ragged edge sits, on average. */
const MARGIN = 3

/** A small seeded generator, so the server and the browser tear the same edge. */
function random(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * One ragged edge: how far in it sits at each cell along it. The depth holds
 * for a run of one to three cells, then steps, so the edge tears in chunks.
 */
function edge(length: number, next: () => number) {
  const depths: number[] = []
  while (depths.length < length) {
    const depth = MARGIN + Math.floor(next() * 4) - 2
    const run = 1 + Math.floor(next() * 3)
    for (let i = 0; i < run && depths.length < length; i++) depths.push(depth)
  }
  return depths
}

/**
 * The hole as one SVG path: the cells inside all four ragged edges, plus a few
 * loose pixels torn off just outside them. Each row's cells are merged into runs.
 */
function holePath(seed: number) {
  const next = random(seed)
  const top = edge(COLS, next)
  const bottom = edge(COLS, next)
  const left = edge(ROWS, next)
  const right = edge(ROWS, next)
  const inside = (x: number, y: number) =>
    x >= left[y] && x < COLS - right[y] && y >= top[x] && y < ROWS - bottom[x]

  const filled = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => inside(x, y)))
  // Loose pixels: a cell or two off the edge, never touching the hole's corners.
  for (let placed = 0, tries = 0; placed < 9 && tries < 400; tries++) {
    const x = Math.floor(next() * COLS)
    const y = Math.floor(next() * ROWS)
    if (filled[y][x]) continue
    const near = [-2, -1, 1, 2].some((d) => filled[y]?.[x + d] || filled[y + d]?.[x])
    const touching = [-1, 1].some((d) => filled[y]?.[x + d] || filled[y + d]?.[x])
    if (near && !touching) {
      filled[y][x] = true
      placed++
    }
  }

  let d = ""
  filled.forEach((row, y) => {
    for (let x = 0; x < COLS; x++) {
      if (!row[x]) continue
      const start = x
      while (x + 1 < COLS && row[x + 1]) x++
      d += `M${start} ${y}h${x - start + 1}v1h${-(x - start + 1)}z`
    }
  })
  return d
}

/**
 * A service page's hero visual: the same drawing as that service's panel in
 * the home page's "What we build" row (components/landing/build-trio.tsx),
 * larger, in a pixel-edged hole torn out of the band, so it sits on the flat
 * page colour as it does on the home page. `seed` tears each page's hole
 * differently.
 *
 * On the home page a drawing plays forward on hover; here nothing is hovered,
 * so it plays forward and back on a loop instead (data-build="play", which
 * globals.css treats like a hovered .build-panel), once it has come in with
 * the copy (.hero-card).
 *
 * With reduced motion it rests on the played picture, as the cards in
 * hero-visuals.tsx rest on their last frame. Decorative: hidden from assistive
 * tech, and the copy beside it says the same thing.
 */
export function HeroDrawing({ seed, children }: { seed: number; children: React.ReactNode }) {
  const [ref, step] = useHeroLoop(durations)
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-build={step === 0 ? "rest" : "play"}
      className="hero-card relative mx-auto aspect-[36/34] w-full max-w-sm sm:max-w-md lg:max-w-none"
    >
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        shapeRendering="crispEdges"
        className="absolute inset-0 size-full fill-background"
      >
        <path d={holePath(seed)} />
      </svg>
      <div className="absolute inset-[10%]">{children}</div>
    </div>
  )
}
