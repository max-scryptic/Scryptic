"use client"

import { useEffect, useId, useRef, useState } from "react"
import { cn } from "cn"

/*
 * The footer's sign-off landscape: a band of low, rolling hills built from
 * isometric cubes, sitting between the footer text and the wordmark. It has its
 * own band so it never runs behind text. The band is cut flat along the front
 * row, and the hills fade out as they come down to the wordmark.
 *
 * The terrain comes from a fixed seed, so server and client draw the same
 * picture on every load. Each column is drawn as three faces (its full left
 * side, right side and top) rather than cube by cube: neighbouring cubes in a
 * column share a colour, so the result looks the same and the markup stays
 * small. Columns are grouped by row so the rows can build in back to front.
 */

const CUBE = 44
const ROWS = 9
const SPAN = 2800
// Share of the band's height, up from its bottom edge, over which the hills fade out.
const FADE = 0.45

const halfWidth = CUBE * 0.866
const halfHeight = CUBE * 0.5

// mulberry32: a tiny seeded PRNG.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Two overlapping waves make the hills; the random term roughens the tops.
function columnHeight(x: number, row: number, random: () => number) {
  const z =
    1.3 +
    1.4 * Math.sin(x / 360 + row * 0.5) +
    1.0 * Math.sin(x / 150 - row * 0.4 + 2) +
    random() * 0.9 -
    row * 0.08
  return Math.max(0, Math.floor(z))
}

const round = (n: number) => Math.round(n * 10) / 10

function buildTerrain() {
  const random = seeded(13)
  const reach = Math.ceil(SPAN / 2 / halfWidth) + 1
  const rows: { top: string; left: string; right: string }[] = []
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity

  for (let row = 0; row < ROWS; row++) {
    let top = ""
    let left = ""
    let right = ""
    for (let col = -reach; col <= reach; col++) {
      // Columns sit on an isometric lattice: every other position per row.
      if ((col + row) & 1) continue
      const x = round(col * halfWidth)
      const base = row * halfHeight
      // The front row is never empty, so the ground meets the line without gaps.
      const height = Math.max(row === ROWS - 1 ? 1 : 0, columnHeight(col * halfWidth, row, random))
      const peak = round(base - height * CUBE)
      const w = round(halfWidth)

      top += `M${x} ${round(peak - halfHeight)}l${w} ${halfHeight}l${-w} ${halfHeight}l${-w} ${-halfHeight}z`
      if (height > 0) {
        const side = height * CUBE
        left += `M${round(x - w)} ${peak}l${w} ${halfHeight}v${side}l${-w} ${-halfHeight}z`
        right += `M${round(x + w)} ${peak}l${-w} ${halfHeight}v${side}l${w} ${-halfHeight}z`
      }
      minX = Math.min(minX, x - w)
      maxX = Math.max(maxX, x + w)
      minY = Math.min(minY, peak - halfHeight)
    }
    rows.push({ top, left, right })
  }

  // Cut along the front row's base: everything behind it ends above this line,
  // and the front columns are sliced flat, so the band has a straight bottom edge.
  const maxY = (ROWS - 1) * halfHeight
  return { rows, box: [minX, minY, maxX - minX, maxY - minY].map(round) }
}

const terrain = buildTerrain()

export function VoxelHills({ className }: { className?: string }) {
  const id = useId()
  const ref = useRef<SVGSVGElement>(null)
  const [x, y, width, height] = terrain.box

  // Rows build in when the band scrolls into view. Until the observer reports
  // (and without JavaScript) the terrain simply shows.
  const [state, setState] = useState<"rest" | "waiting" | "play">("rest")
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("play")
          observer.disconnect()
        } else {
          setState("waiting")
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox={terrain.box.join(" ")}
      // Full width at the landscape's own proportions on large screens. Below
      // the minimum height it crops in from the sides instead of shrinking, so
      // the cubes stay chunky on phones.
      preserveAspectRatio="xMidYMax slice"
      style={{ aspectRatio: `${width} / ${height}` }}
      data-state={state}
      aria-hidden="true"
      className={cn("pointer-events-none block w-full select-none", className)}
    >
      <defs>
        <linearGradient
          id={`${id}-fade`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={y + height * (1 - FADE)}
          x2="0"
          y2={y + height}
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={x} y={y} width={width} height={height}>
          <rect x={x} y={y} width={width} height={height} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        {terrain.rows.map((row, index) => (
          <g key={index} className="voxel-row" style={{ animationDelay: `${index * 90}ms` }}>
            <path d={row.left} className="fill-voxel-left" />
            <path d={row.right} className="fill-voxel-right" />
            <path d={row.top} className="fill-voxel-top" />
          </g>
        ))}
      </g>
    </svg>
  )
}
