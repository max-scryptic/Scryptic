import { cn } from "cn"

import { seeded } from "@/lib/voxel"

/*
 * Loose isometric cubes scattered behind a landing page hero, the same blocks
 * as the footer's hills. Each page picks its own arrangement (voxelShapes),
 * all of which thin out towards the headline, so text never sits on a busy
 * patch. Stacks sit on the same lattice as the hills.
 *
 * Fixed seeds, so server and client draw the same picture. Rows drop in back to
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

/** Where the cubes gather and how tall they stack, as a fraction (u, v) of the field's width and height. */
type FieldShape = {
  seed: number
  /** 0 to 1: the chance of a cube at this point, before clumping. */
  density: (u: number, v: number) => number
  /** Cubes in the stack, from 1. */
  height: (u: number, v: number, random: () => number) => number
  /** Gather the cubes into islands with a slow wave. Off for solid blocks. */
  clump?: boolean
}

const blob = (u: number, v: number, cu: number, cv: number, ru: number, rv: number) =>
  Math.exp(-(((u - cu) / ru) ** 2 + ((v - cv) / rv) ** 2))

const looseHeight: FieldShape["height"] = (_u, _v, random) => 1 + Math.floor(random() * random() * 3)

/*
 * One arrangement per page, so each hero reads as its own. All of them keep
 * the left half and the lower third clear, where the headline sits.
 */
export const voxelShapes = {
  /** The home page: dense in the top right, gone by the middle and the lower third. */
  studio: {
    seed: 7,
    density: (u, v) => smoothstep(0.42, 0.95, u) * smoothstep(0.75, 0.05, v) * 0.6,
    height: looseHeight,
    clump: true,
  },
  /** MVP development: a ridge of stacks that grow taller towards the top right, like a launch curve. */
  growth: {
    seed: 21,
    density: (u, v) => {
      const ridge = 0.95 - 1.15 * (u - 0.45)
      return smoothstep(0.45, 0.7, u) * Math.exp(-(((v - ridge) / 0.16) ** 2)) * 0.85
    },
    height: (u, _v, random) => 1 + Math.floor(smoothstep(0.5, 1, u) * 3.4 * (0.6 + 0.4 * random())),
    clump: true,
  },
  /**
   * No-code migration: a thin stream of single cubes along the top that bends
   * down the right edge, gathering into taller stacks as it settles at the
   * bottom right, like data being carried across and landing.
   */
  migrate: {
    seed: 33,
    density: (u, v) => {
      // The stream's centre line: flat along the top, then curving down past the card.
      const path = 0.13 + 0.75 * smoothstep(0.8, 1.02, u)
      const stream = smoothstep(0.46, 0.78, u) * Math.exp(-(((v - path) / 0.09) ** 2)) * 0.7
      const pile = blob(u, v, 0.97, 0.76, 0.1, 0.24)
      return Math.max(stream, pile)
    },
    height: (u, v, random) => 1 + Math.floor(smoothstep(0.85, 1, u) * smoothstep(0.35, 0.85, v) * 3.2 * (0.6 + 0.4 * random())),
    clump: true,
  },
  /** Web app development: flat panels in the top right, laid out like the cards of a dashboard. */
  panels: {
    seed: 64,
    density: (u, v) => {
      const panel = (u0: number, u1: number, v0: number, v1: number) =>
        smoothstep(u0, u0 + 0.03, u) * smoothstep(u1, u1 - 0.03, u) * smoothstep(v0, v0 + 0.03, v) * smoothstep(v1, v1 - 0.03, v)
      return Math.max(panel(0.56, 0.76, 0.03, 0.28), panel(0.8, 1.02, 0.03, 0.28), panel(0.8, 1.02, 0.34, 0.6)) * 0.85
    },
    height: (_u, _v, random) => 1 + Math.floor(random() * 1.7),
    clump: false,
  },
  /** The services hub: two islands, one per service. */
  services: {
    seed: 48,
    density: (u, v) => Math.max(blob(u, v, 0.66, 0.06, 0.12, 0.16), blob(u, v, 0.97, 0.5, 0.1, 0.24)) * 0.75,
    height: looseHeight,
    clump: true,
  },
} satisfies Record<string, FieldShape>

export type VoxelShape = keyof typeof voxelShapes

function buildField({ seed, density, height: stack, clump = true }: FieldShape) {
  const random = seeded(seed)
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
      // A slow wave clumps the cubes into islands instead of even noise.
      const wave = clump
        ? 0.55 + 0.45 * Math.sin(x / 140 + row * 0.7) * Math.sin(base / 90 - col * 0.3)
        : 1
      if (random() > density(u, v) * wave) continue
      const height = stack(u, v, random)
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

// Built once per shape, on first use.
const fields = new Map<VoxelShape, ReturnType<typeof buildField>>()

function getField(shape: VoxelShape) {
  let field = fields.get(shape)
  if (!field) {
    field = buildField(voxelShapes[shape])
    fields.set(shape, field)
  }
  return field
}

export function VoxelField({
  className,
  shape = "studio",
  faces = ["fill-voxel-top", "fill-voxel-left", "fill-voxel-right"],
}: {
  className?: string
  /** Which arrangement to draw; see voxelShapes. */
  shape?: VoxelShape
  /** Fill classes for the top, left and right faces. */
  faces?: [string, string, string]
}) {
  const field = getField(shape)

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
