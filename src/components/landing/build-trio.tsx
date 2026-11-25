import Link from "next/link"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"
import { pages } from "@/lib/seo"

/*
 * The three things we build, in a row of panels under the home page's
 * statement: web apps, mobile apps and migrations. Each panel is an
 * isometric line drawing in the page's hairline colour, lit by a few square
 * pixels of the brand accents, with a short label under it, and links to that
 * service's page. The row sits on the guides, its top and bottom edges run out
 * across the page (.guides), with a rail square where each divider meets them.
 *
 * The drawings are decorative (the label says the same thing), on a 260 by 240
 * grid. Their pixels twinkle, and the migration's travel across, only without
 * reduced motion (.build-* in app/globals.css).
 *
 * Hovering or focusing anywhere on a panel plays its drawing forward: the
 * chart grows and the cursor moves onto it, the phones part and the empty
 * icons fill in, the old platform fades as one more block lands on the new.
 * Those changes are classes on parts of the drawing (build-hover, build-show,
 * build-drop, build-fill, build-dim), with --hx, --hy, --fill and the stagger
 * --h set per part.
 */

/** cos 30°: how far a unit along an isometric axis moves across the screen. */
const C = 0.866

/** Lays a flat drawing (x right, y down) on an upright panel that runs up and to the right. */
const wall = (x: number, y: number) => `matrix(${C} -0.5 0 1 ${x} ${y})`

/** A point on a wall at (x, y), in screen units. */
const onWall = (x: number, y: number, u: number, v: number) => [x + C * u, y - 0.5 * u + v] as const

/** Custom properties for a part's hover state. */
const vars = (v: Record<string, string | number>) => v as React.CSSProperties

/** Lines and the faces they bound: hairlines that stay 1.25px whatever the drawing's size. */
const line = "fill-background stroke-foreground/45"
const faint = "fill-background stroke-foreground/20"

/*
 * Pixel fills, in the order the drawings pick from. Foreground reads white on
 * Night and ink on Mist, so the drawings work in either theme.
 */
const tones = {
  ink: "fill-foreground",
  dim: "fill-foreground/20",
  lapis: "fill-primary",
  periwinkle: "fill-portrait",
  glint: "fill-glint",
  mint: "fill-mint",
} as const
type Tone = keyof typeof tones

/**
 * An upright slab: a rounded panel with some thickness, its back edge showing
 * up and to the left. `children` are drawn on its face, in the panel's own flat
 * units (x right from its left edge, y down from its top).
 */
function Slab({
  x,
  y,
  w,
  h,
  r,
  depth,
  className = line,
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  r: number
  depth: number
  className?: string
  children?: React.ReactNode
}) {
  const bx = x - C * depth
  const by = y - 0.5 * depth
  // Join the faces at the middle of each rounded corner, near enough to where the silhouette turns.
  const k = r * (1 - Math.SQRT1_2)
  const corners = [
    [k, k],
    [w - k, k],
    [w - k, h - k],
    [k, h - k],
  ]
  return (
    <g className={className}>
      <rect transform={wall(bx, by)} width={w} height={h} rx={r} />
      {corners.map(([u, v]) => {
        const [x1, y1] = onWall(x, y, u, v)
        const [x2, y2] = onWall(bx, by, u, v)
        return <line key={`${u}-${v}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      })}
      <g transform={wall(x, y)}>
        <rect width={w} height={h} rx={r} />
        {children}
      </g>
    </g>
  )
}

/** A square pixel on a face; `twinkle` sets it blinking, offset by `--d` steps. */
function Pixel({
  x,
  y,
  size,
  tone,
  twinkle,
  rx = 0,
}: {
  x: number
  y: number
  size: number
  tone: Tone
  twinkle?: number
  rx?: number
}) {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      rx={rx}
      className={cn("stroke-none", tones[tone], twinkle !== undefined && "build-twinkle")}
      style={twinkle !== undefined ? ({ "--d": twinkle } as React.CSSProperties) : undefined}
    />
  )
}

/**
 * The drawings' shared frame: hairlines that do not scale with the drawing.
 * `fit` moves (and scales) a drawing to centre it in the frame.
 */
function Drawing({ fit, children }: { fit?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 260 240"
      aria-hidden="true"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="build-drawing h-auto w-full overflow-visible [&_*]:[vector-effect:non-scaling-stroke]"
    >
      <g transform={fit}>{children}</g>
    </svg>
  )
}

/* Web app: a browser window, its dashboard's bar chart built from pixels, a cursor on it. */

/** Pixels per column of the chart, left to right. */
const bars = [2, 3, 2, 4, 3, 5, 4, 6]
/** The top pixel of each column; the cells under it stay dim. */
const barTops: Tone[] = ["periwinkle", "ink", "lapis", "ink", "mint", "periwinkle", "lapis", "glint"]
/** The most pixels a column reaches once the chart has grown. */
const maxBar = 7

function WebAppDrawing() {
  const x = 78
  const y = 120
  const cell = 7
  const step = 9.5
  // The cursor sits on the chart's last columns.
  const [cx, cy] = onWall(x, y, 118, 62)
  return (
    <Drawing fit="translate(5 6)">
      {/* A second window behind, showing the app runs on more than one screen. */}
      <g className="build-hover" style={vars({ "--hx": "-9px", "--hy": "-6px" })}>
        <Slab x={x - 30} y={y - 38} w={150} h={104} r={6} depth={6} className={faint}>
          <line x1={0} y1={16} x2={150} y2={16} />
        </Slab>
      </g>
      <Slab x={x} y={y} w={150} h={104} r={6} depth={7}>
        {/* Title bar: window dots and the address bar. */}
        <line x1={0} y1={16} x2={150} y2={16} />
        <circle cx={10} cy={8} r={2.2} />
        <circle cx={17.5} cy={8} r={2.2} />
        <circle cx={25} cy={8} r={2.2} />
        <rect x={40} y={4.5} width={72} height={7} rx={3.5} />
        {/* Sidebar, its first item active. */}
        <line x1={36} y1={16} x2={36} y2={104} />
        <Pixel x={8} y={25} size={5} tone="lapis" />
        <line x1={16} y1={27.5} x2={28} y2={27.5} />
        <line x1={8} y1={37.5} x2={26} y2={37.5} />
        <line x1={8} y1={47.5} x2={22} y2={47.5} />
        <line x1={8} y1={57.5} x2={25} y2={57.5} />
        {/* Page heading. */}
        <line x1={46} y1={27} x2={84} y2={27} />
        <line x1={46} y1={34} x2={68} y2={34} className="stroke-foreground/25" />
        {/* The chart: a baseline and columns of pixels. */}
        <line x1={46} y1={95} x2={140} y2={95} className="stroke-foreground/25" />
        {bars.map((height, column) =>
          Array.from({ length: height }, (_, row) => {
            const top = row === height - 1
            return (
              <Pixel
                key={`${column}-${row}`}
                x={48 + column * step + (step - cell) / 2 - 1}
                y={95 - 2 - (row + 1) * step + (step - cell)}
                size={cell}
                tone={top ? barTops[column] : "dim"}
                twinkle={top && column % 3 !== 1 ? column : undefined}
              />
            )
          }),
        )}
        {/* On hover the chart grows: up to two more pixels a column, column by column. */}
        {bars.map((height, column) =>
          Array.from({ length: Math.min(2, maxBar - height) }, (_, extra) => {
            const row = height + extra
            return (
              <rect
                key={`${column}-${row}`}
                x={48 + column * step + (step - cell) / 2 - 1}
                y={95 - 2 - (row + 1) * step + (step - cell)}
                width={cell}
                height={cell}
                className={cn("build-show stroke-none", tones[barTops[column]])}
                style={vars({ "--h": column * 2 + extra })}
              />
            )
          }),
        )}
      </Slab>
      {/* The cursor, flat to the screen like a real one; on hover it moves up onto the tallest column. */}
      <g className="build-hover" style={vars({ "--hx": "-6px", "--hy": "-22px" })}>
        <path
          transform={`translate(${cx} ${cy})`}
          d="M0 0v17l4.6-4.3 3 6.8 3-1.3-3-6.6h6.3z"
          className="build-float fill-foreground stroke-background"
        />
      </g>
    </Drawing>
  )
}

/* Mobile app: a phone in front of a second one, for iPhone and Android, its home screen a grid of pixel icons. */

/** The home screen's icons, row by row; null leaves an outline. */
const icons: (Tone | null)[] = [
  "lapis", "ink", "periwinkle", null,
  "mint", null, "ink", "lapis",
  null, "glint", "dim", "periwinkle",
  "ink", "periwinkle", null, "mint",
  "dim", null, "lapis", "ink",
]

/** The colours the empty slots fill with on hover. */
const installs = ["var(--primary)", "var(--mint)", "var(--portrait)", "var(--glint)"]

function MobileAppDrawing() {
  const x = 116
  const y = 78
  const size = 11
  const gap = 5
  const left = (74 - (4 * size + 3 * gap)) / 2
  return (
    <Drawing fit="translate(7 -9)">
      {/* On hover the phones part: the back one slides out along its edge, the front one lifts. */}
      <g className="build-hover" style={vars({ "--hx": "-11px", "--hy": "6px" })}>
        <Slab x={x - 46} y={y - 6} w={74} h={148} r={12} depth={6} className={faint}>
          <rect x={5} y={5} width={64} height={138} rx={8} />
          {[30, 44, 58, 72, 86].map((v) => (
            <line key={v} x1={14} y1={v} x2={v % 28 === 2 ? 46 : 58} y2={v} />
          ))}
        </Slab>
      </g>
      <g className="build-hover" style={vars({ "--hy": "-6px" })}>
      <Slab x={x} y={y} w={74} h={148} r={12} depth={7}>
        <rect x={5} y={5} width={64} height={138} rx={8} className="stroke-foreground/25" />
        {/* The camera cut-out. */}
        <rect x={27} y={10} width={20} height={5} rx={2.5} className="fill-foreground/30 stroke-none" />
        {icons.map((tone, i) => {
          const ix = left + (i % 4) * (size + gap)
          const iy = 26 + Math.floor(i / 4) * (size + gap)
          return tone ? (
            <Pixel key={i} x={ix} y={iy} size={size} rx={3} tone={tone} twinkle={i % 3 === 0 ? i : undefined} />
          ) : (
            // An empty slot; on hover an app installs into it.
            <rect
              key={i}
              x={ix}
              y={iy}
              width={size}
              height={size}
              rx={3}
              className="build-fill fill-none stroke-foreground/35"
              style={vars({ "--fill": installs[i % installs.length], "--h": i })}
            />
          )
        })}
        {/* A notification badge on the first icon. */}
        <circle cx={left + size} cy={26} r={3.2} className="build-pulse fill-glint stroke-background" />
        {/* The dock and the home bar. */}
        <rect x={9} y={114} width={56} height={17} rx={5} className="fill-foreground/5 stroke-foreground/25" />
        {[0, 1, 2, 3].map((n) => (
          <rect
            key={n}
            x={14 + n * 12.5}
            y={117.5}
            width={9}
            height={9}
            rx={2.5}
            className={n === 1 ? "fill-primary stroke-none" : "fill-none stroke-foreground/35"}
          />
        ))}
        <line x1={28} y1={137} x2={46} y2={137} className="stroke-foreground/45" />
      </Slab>
      </g>
    </Drawing>
  )
}

/* Migration: an app's blocks lifted off a dashed, no-code platform and stacked on a solid one of your own. */

/** A point on the floor grid: i runs down and right, j down and left, k up, in cubes of `s`. */
const iso = (ox: number, oy: number, s: number, i: number, j: number, k = 0) =>
  [ox + C * s * (i - j), oy + 0.5 * s * (i + j) - s * k] as const

const pts = (points: (readonly [number, number])[]) => points.map(([px, py]) => `${px},${py}`).join(" ")

/** A cube whose back corner on the floor is at grid point (i, j, k); `top` colours its top face. */
function Cube({
  ox,
  oy,
  s,
  i,
  j,
  k,
  top,
  dashed,
}: {
  ox: number
  oy: number
  s: number
  i: number
  j: number
  k: number
  top?: Tone
  dashed?: boolean
}) {
  const p = (di: number, dj: number, dk: number) => iso(ox, oy, s, i + di, j + dj, k + dk)
  const dash = dashed ? "3 3" : undefined
  const face = dashed ? faint : line
  return (
    <g>
      <polygon points={pts([p(0, 1, 1), p(1, 1, 1), p(1, 1, 0), p(0, 1, 0)])} className={face} strokeDasharray={dash} />
      <polygon points={pts([p(1, 0, 1), p(1, 1, 1), p(1, 1, 0), p(1, 0, 0)])} className={face} strokeDasharray={dash} />
      <polygon
        points={pts([p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)])}
        className={top ? cn(tones[top], "stroke-foreground/45") : face}
        strokeDasharray={dash}
      />
    </g>
  )
}

/** A square platform, `n` cubes a side and `t` thick, whose back corner is at (ox, oy). */
function Platform({ ox, oy, s, n, t, dashed }: { ox: number; oy: number; s: number; n: number; t: number; dashed?: boolean }) {
  const p = (i: number, j: number, dz = 0) => {
    const [px, py] = iso(ox, oy, s, i, j)
    return [px, py + dz] as const
  }
  const dash = dashed ? "3 3" : undefined
  const face = dashed ? faint : line
  return (
    <g strokeDasharray={dash}>
      <polygon points={pts([p(0, n), p(n, n), p(n, n, t), p(0, n, t)])} className={face} />
      <polygon points={pts([p(n, 0), p(n, n), p(n, n, t), p(n, 0, t)])} className={face} />
      <polygon points={pts([p(0, 0), p(n, 0), p(n, n), p(0, n)])} className={face} />
      {/* The floor grid, faint. */}
      {Array.from({ length: n - 1 }, (_, g) => (
        <g key={g} className="stroke-foreground/12">
          <line x1={p(g + 1, 0)[0]} y1={p(g + 1, 0)[1]} x2={p(g + 1, n)[0]} y2={p(g + 1, n)[1]} />
          <line x1={p(0, g + 1)[0]} y1={p(0, g + 1)[1]} x2={p(n, g + 1)[0]} y2={p(n, g + 1)[1]} />
        </g>
      ))}
    </g>
  )
}

/** The blocks left on the old platform, and those stacked on the new one, back to front. */
const oldBlocks = [
  { i: 0, j: 0, k: 0 },
  { i: 1, j: 0, k: 0 },
  { i: 0, j: 1, k: 0 },
  { i: 0, j: 0, k: 1 },
]
const newBlocks: { i: number; j: number; k: number; top?: Tone }[] = [
  { i: 0, j: 0, k: 0 },
  { i: 1, j: 0, k: 0 },
  { i: 0, j: 0, k: 1 },
  { i: 0, j: 1, k: 0 },
  { i: 1, j: 0, k: 1, top: "mint" },
  { i: 0, j: 0, k: 2, top: "lapis" },
  { i: 1, j: 1, k: 0 },
  { i: 0, j: 1, k: 1, top: "periwinkle" },
  { i: 2, j: 0, k: 0, top: "ink" },
  { i: 1, j: 1, k: 1, top: "glint" },
]

/** The arc the blocks travel along, from the old stack's top to the new one's. */
const arc = "M62 104 C 88 34, 168 30, 196 92"

function MigrationDrawing() {
  const s = 16
  const n = 3
  // Old platform up and to the left, new one down and to the right.
  const old = { ox: 62, oy: 112 }
  const fresh = { ox: 190, oy: 112 }
  return (
    <Drawing fit="translate(130 122) scale(1.15) translate(-126 -108)">
      <Platform {...old} s={s} n={n} t={8} dashed />
      {/* On hover what is left on the old platform fades out. */}
      <g className="build-dim">
        {oldBlocks.map((b) => (
          <Cube key={`${b.i}${b.j}${b.k}`} {...old} s={s} {...b} dashed />
        ))}
      </g>
      <Platform {...fresh} s={s} n={n} t={8} />
      {newBlocks.map((b) => (
        <Cube key={`${b.i}${b.j}${b.k}`} {...fresh} s={s} {...b} />
      ))}
      {/* And one more block drops onto the new stack. */}
      <g className="build-drop" style={vars({ "--h": 3 })}>
        <Cube {...fresh} s={s} i={2} j={0} k={1} top="lapis" />
      </g>
      <path d={arc} className="fill-none stroke-foreground/30" strokeDasharray="2 4" />
      {/* Pixels in transit, each a small cube that rides the arc in turn. */}
      {(["lapis", "glint", "mint"] as const).map((tone, order) => (
        <g
          key={tone}
          className="build-travel"
          style={{ offsetPath: `path("${arc}")`, "--d": order } as React.CSSProperties}
        >
          <polygon points={pts([[0, -7], [6, -3.5], [0, 0], [-6, -3.5]])} className={cn(tones[tone], "stroke-none")} />
          <polygon points={pts([[-6, -3.5], [0, 0], [0, 6], [-6, 2.5]])} className="fill-foreground/40 stroke-none" />
          <polygon points={pts([[0, 0], [6, -3.5], [6, 2.5], [0, 6]])} className="fill-foreground/25 stroke-none" />
        </g>
      ))}
    </Drawing>
  )
}

const panels = [
  {
    name: "Web apps",
    summary: "Portals, dashboards and SaaS, built to scale",
    href: pages.webAppDevelopment.path,
    Drawing: WebAppDrawing,
  },
  {
    name: "Mobile apps",
    summary: "Native iOS and Android, live in both stores",
    href: pages.mobileAppDevelopment.path,
    Drawing: MobileAppDrawing,
  },
  {
    name: "Migrations",
    summary: "Off no-code builders, onto code you own",
    href: pages.noCodeMigration.path,
    Drawing: MigrationDrawing,
  },
]

export function BuildTrio() {
  return (
    <LandingSection id="what-we-build" labelledBy="what-we-build-heading">
        <SectionHeading
          eyebrow="What we build"
          title="Web apps, mobile apps and migrations"
          id="what-we-build-heading"
          className={inset}
        />
        <ul data-reveal="children" className="guides grid border-y md:grid-cols-3">
          {panels.map(({ name, summary, href, Drawing }, index) => (
            <li
              key={name}
              className={cn("relative", index > 0 && "border-t md:border-t-0 md:border-l")}
            >
              {/* Rail squares where the divider meets the row's top and bottom edges. */}
              {index > 0 && (
                <>
                  <span aria-hidden="true" className="build-joint top-[-4px] max-md:hidden" />
                  <span aria-hidden="true" className="build-joint bottom-[-4px] max-md:hidden" />
                </>
              )}
              <Link
                href={href}
                className="build-panel group corners corners-grow flex h-full flex-col items-center gap-8 px-6 py-10 outline-none transition-colors [--corner:transparent] hover:bg-foreground/[0.03] hover:[--corner:var(--primary)] focus-visible:bg-foreground/[0.03] focus-visible:[--corner:var(--primary)] sm:px-8 sm:py-12 lg:py-14"
              >
                <div className="w-full max-w-[15rem] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:max-w-[18rem]">
                  <Drawing />
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <h3 className="relative text-xl text-foreground transition-colors group-hover:text-primary group-focus-visible:text-primary sm:text-2xl">
                    {name}
                    {/* An arrow slides in beside the name, out of the centring. */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="absolute top-1/2 left-full ml-2 size-5 -translate-x-1.5 -translate-y-1/2 opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </h3>
                  <p className="text-pretty text-muted-foreground">{summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
    </LandingSection>
  )
}
