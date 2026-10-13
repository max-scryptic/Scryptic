import { cn } from "cn"

import { seeded } from "@/lib/voxel"

/*
 * Loose isometric cubes scattered behind the landing page hero, the same blocks
 * as the footer's hills. They gather in the top right corner and thin out
 * towards the headline, so text never sits on a busy patch. Small stacks of one
 * to three cubes sit on the same lattice as the hills.
 *
 * Fixed seed, so server and client draw the same picture. Rows drop in back to
 * front on load (the voxel-row animation in globals.css).
 */

const CUBE = 30
const W = 1600
const H = 900

const halfWidth = CUBE * 0.866
const halfHeight = CUBE * 0.5

const round = (n: number) => Math.round(n * 10) / 10
const smoothstep = (a: number, b: number, n: number) => {
  const t = Math.min(1, Math.max(0, (n - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function buildField() {
  const random = seeded(7)
  const rows: { top: string; left: string; right: string }[] = []
  const rowCount = Math.ceil(H / halfHeight) + 4
  const colCount = Math.ceil(W / halfWidth) + 2
  const w = round(halfWidth)

  for (let row = 0; row < rowCount; row++) {
    let top = ""
    let left = ""
    let right = ""
    for (let col = 0; col < colCount; col++) {
      if ((col + row) & 1) continue
      const x = round(col * halfWidth)
      const base = row * halfHeight
      const u = x / W
      const v = base / H
      // Dense in the top right, gone by the middle of the page and the lower third.
      const density = smoothstep(0.42, 0.95, u) * smoothstep(0.75, 0.05, v)
      // A slow wave clumps the cubes into islands instead of even noise.
      const clump = 0.55 + 0.45 * Math.sin(x / 140 + row * 0.7) * Math.sin(base / 90 - col * 0.3)
      if (random() > density * clump * 0.6) continue
      const height = 1 + Math.floor(random() * random() * 3)
      const peak = round(base - height * CUBE)
      const side = height * CUBE

      top += `M${x} ${round(peak - halfHeight)}l${w} ${halfHeight}l${-w} ${halfHeight}l${-w} ${-halfHeight}z`
      left += `M${round(x - w)} ${peak}l${w} ${halfHeight}v${side}l${-w} ${-halfHeight}z`
      right += `M${round(x + w)} ${peak}l${-w} ${halfHeight}v${side}l${w} ${-halfHeight}z`
    }
    if (top) rows.push({ top, left, right })
  }
  return rows
}

const field = buildField()

export function VoxelField({
  className,
  faces = ["fill-voxel-top", "fill-voxel-left", "fill-voxel-right"],
}: {
  className?: string
  /** Fill classes for the top, left and right faces. */
  faces?: [string, string, string]
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      data-state="play"
      aria-hidden="true"
      className={cn("pointer-events-none block select-none", className)}
    >
      {field.map((row, index) => (
        <g key={index} className="voxel-row" style={{ animationDelay: `${index * 25}ms` }}>
          <path d={row.left} className={faces[1]} />
          <path d={row.right} className={faces[2]} />
          <path d={row.top} className={faces[0]} />
        </g>
      ))}
    </svg>
  )
}
