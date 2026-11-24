"use client"

import { useEffect, useId, useRef, useState } from "react"

type Size = { width: number; height: number }

/** Grid cell size, in pixels. */
const grid = 16

/**
 * The pattern behind our column of the comparison table: one drawing down the
 * whole column, not a motif per row. A grid of spacetime carries a
 * gravitational-wave chirp. It is almost still under the wordmark, its waves
 * then tighten and swell down the column into a merger about two thirds of the
 * way down (where the grid sags into a well and glows), and they ring down
 * and fade below it. Drawn in SVG to fit its positioned parent, once measured.
 */
export function SpacetimeColumn() {
  const ref = useRef<HTMLDivElement>(null)
  const glowId = useId()
  const [size, setSize] = useState<Size | null>(null)

  useEffect(() => {
    const box = ref.current
    if (!box) return
    const measure = () => setSize({ width: box.clientWidth, height: box.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  const merger = size && { x: size.width * 0.62, y: size.height * 0.66 }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {size && merger && size.width > 0 ? (
        <svg
          width={size.width}
          height={size.height}
          className="absolute inset-0 animate-in text-primary opacity-70 duration-1000 fade-in dark:opacity-90"
          fill="none"
          stroke="currentColor"
        >
          <defs>
            <radialGradient id={glowId}>
              <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx={merger.x}
            cy={merger.y}
            rx={size.width * 0.7}
            ry={size.width * 0.9}
            fill={`url(#${glowId})`}
            stroke="none"
          />
          <path d={fabric(size, merger)} strokeOpacity={0.24} />
        </svg>
      ) : null}
    </div>
  )
}

/** The warped grid as one path. */
function fabric({ width, height }: Size, merger: { x: number; y: number }) {
  // Everything scales down with the column on phones.
  const scale = Math.min(1, width / 180)
  const peak = 4.5 * scale // the waves' height at the merger
  // Their length at the merger, in pixels. Kept long enough for the peak that a
  // line never curls back on itself (peak × 2π / shortest under 1).
  const shortest = 32
  const settle = 20 // how soon before the merger the chirp is at its height
  const ringdown = 50 // how fast the waves die away after it
  const sigma = 34 * scale // the well's width

  // Phase grows ever faster towards the merger (wavelength ∝ t^3/8, as in a real
  // chirp, so phase ∝ t^5/8), then at a steady rate through the ringdown.
  const phaseBefore = (t: number) =>
    -((2 * Math.PI) / shortest) * settle ** 0.375 * ((t + settle) ** 0.625 / 0.625)
  const atMerger = phaseBefore(0)

  const warp = (x: number, y: number): [number, number] => {
    const t = merger.y - y
    let amplitude: number
    let phase: number
    if (t > 0) {
      amplitude = peak * ((t + settle) / settle) ** -1
      phase = phaseBefore(t)
    } else {
      amplitude = peak * Math.exp(t / ringdown)
      phase = atMerger - ((2 * Math.PI) / shortest) * t
    }
    // Lines across the column are a little out of step, so the fronts run on a slant.
    phase += ((x - width / 2) / width) * 1.6
    let px = x + amplitude * Math.sin(phase)
    let py = y + amplitude * 0.5 * Math.cos(phase)

    // The well at the merger pulls the grid in towards it.
    const dx = px - merger.x
    const dy = py - merger.y
    const pull = 0.5 * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
    px -= dx * pull
    py -= dy * pull
    return [px, py]
  }

  const parts: string[] = []
  const line = (points: [number, number][]) =>
    parts.push(
      points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(""),
    )
  const sample = (from: number, to: number) => {
    const values: number[] = []
    for (let v = from; v < to; v += 2) values.push(v)
    return values
  }

  const cx = width / 2
  for (let x = cx - Math.ceil(cx / grid + 1) * grid; x <= width + grid; x += grid) {
    line(sample(-grid, height + grid).map((y) => warp(x, y)))
  }
  for (let y = -grid; y <= height + grid; y += grid) {
    line(sample(-grid, width + grid).map((x) => warp(x, y)))
  }
  return parts.join("")
}
