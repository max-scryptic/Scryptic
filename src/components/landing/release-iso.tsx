import { cn } from "cn"

import {
  Cube,
  Drawing,
  Pixel,
  Platform,
  Slab,
  faint,
  onWall,
  pts,
  tones,
  vars,
  type Tone,
} from "@/components/landing/build-trio"
import { CheckIcon, LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/* Prototype: the release section redrawn in the build trio's isometric style. */

/* ---------------------------------------------------------------- */
/* Drawings                                                          */
/* ---------------------------------------------------------------- */

/** Code tokens per line of the editor: [indent, width, tone]. */
const code: [number, number, Tone][][] = [
  [[0, 14, "lapis"], [17, 24, "ink"], [44, 10, "dim"]],
  [[8, 10, "lapis"], [21, 16, "ink"], [40, 12, "periwinkle"]],
  [[16, 22, "mint"], [41, 18, "dim"]],
  [[24, 28, "ink"], [55, 8, "glint"]],
  [[16, 6, "dim"]],
  [[8, 6, "dim"]],
]

/** Built and tested: the code in an editor behind, the app running on a phone in front. */
export function BuildDrawing() {
  const phone = { x: 134, y: 96 }
  return (
    <Drawing fit="translate(-4 -2)">
      <g className="build-hover" style={vars({ "--hx": "-9px", "--hy": "-5px" })}>
        <Slab x={44} y={104} w={124} h={92} r={6} depth={6} className={faint}>
          <line x1={0} y1={14} x2={124} y2={14} />
          <circle cx={9} cy={7} r={2} />
          <circle cx={15.5} cy={7} r={2} />
          <circle cx={22} cy={7} r={2} />
          {code.map((tokens, row) =>
            tokens.map(([at, width, tone]) => (
              <rect
                key={`${row}-${at}`}
                x={10 + at}
                y={23 + row * 10}
                width={width}
                height={4}
                rx={1}
                className={cn("stroke-none", tones[tone])}
              />
            )),
          )}
        </Slab>
      </g>
      <g className="build-hover" style={vars({ "--hy": "-6px" })}>
        <Slab x={phone.x} y={phone.y} w={66} h={132} r={11} depth={7}>
          <rect x={4.5} y={4.5} width={57} height={123} rx={7.5} className="stroke-foreground/25" />
          <rect x={23} y={9} width={20} height={4.5} rx={2.25} className="fill-foreground/30 stroke-none" />
          {/* The app: a title and a list of bookings. */}
          <line x1={10} y1={25} x2={36} y2={25} />
          {(["lapis", "mint", "periwinkle", "glint"] as const).map((tone, row) => (
            <g key={tone}>
              <Pixel x={10} y={34 + row * 17} size={8} rx={4} tone={tone} twinkle={row % 2 === 0 ? row : undefined} />
              <line x1={23} y1={37 + row * 17} x2={row % 2 ? 46 : 52} y2={37 + row * 17} />
              <line x1={23} y1={41.5 + row * 17} x2={38} y2={41.5 + row * 17} className="stroke-foreground/20" />
            </g>
          ))}
          {/* Tab bar, the first tab active. */}
          <line x1={4.5} y1={108} x2={61.5} y2={108} className="stroke-foreground/25" />
          {[0, 1, 2, 3].map((n) => (
            <rect
              key={n}
              x={11 + n * 12.5}
              y={113}
              width={6}
              height={6}
              rx={1.5}
              className={n === 0 ? "fill-primary stroke-none" : "fill-none stroke-foreground/35"}
            />
          ))}
        </Slab>
      </g>
    </Drawing>
  )
}

/** Submitted for review: the store listing, filled in and ticked off, with the approval mark. */
export function ReviewDrawing() {
  const x = 92
  const y = 94
  const w = 94
  const [bx, by] = onWall(x, y, w - 4, 6)
  return (
    <Drawing fit="translate(-6 0)">
      {/* The other store's listing behind. */}
      <g className="build-hover" style={vars({ "--hx": "-9px", "--hy": "-5px" })}>
        <Slab x={x - 34} y={y - 16} w={w} h={122} r={6} depth={6} className={faint}>
          <line x1={0} y1={14} x2={w} y2={14} />
        </Slab>
      </g>
      <Slab x={x} y={y} w={w} h={122} r={6} depth={7}>
        {/* Icon and name. */}
        <Pixel x={9} y={9} size={16} rx={4} tone="lapis" />
        <line x1={31} y1={13} x2={64} y2={13} />
        <line x1={31} y1={20} x2={52} y2={20} className="stroke-foreground/25" />
        {/* Screenshots. */}
        {(["periwinkle", "mint", "glint"] as const).map((tone, n) => (
          <g key={tone}>
            <rect x={9 + n * 26} y={32} width={22} height={36} rx={3} className="stroke-foreground/30" />
            <rect x={12 + n * 26} y={35} width={16} height={6} className={cn("stroke-none", tones[tone])} />
            <rect x={12 + n * 26} y={44} width={16} height={3} className="fill-foreground/15 stroke-none" />
            <rect x={12 + n * 26} y={50} width={11} height={3} className="fill-foreground/15 stroke-none" />
          </g>
        ))}
        {/* The checklist: listing, screenshots, privacy details. */}
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <Pixel x={9} y={80 + row * 12} size={6} tone="mint" twinkle={row} />
            <line x1={21} y1={83 + row * 12} x2={row === 1 ? 62 : 76} y2={83 + row * 12} />
          </g>
        ))}
      </Slab>
      {/* The approval mark, flat to the screen. */}
      <g className="build-hover" style={vars({ "--hy": "-8px" })}>
        <g transform={`translate(${bx} ${by})`} className="build-float">
          <circle r={13} className="fill-primary stroke-background" />
          <path d="M-5.5 0.5 -1.5 4.5 6 -4" className="fill-none stroke-primary-foreground" strokeWidth={2.5} />
        </g>
      </g>
    </Drawing>
  )
}

/** Live in both stores: the app's store page on a phone, a second phone behind for the other store. */
export function LiveDrawing() {
  const x = 120
  const y = 80
  return (
    <Drawing fit="translate(4 -6)">
      <g className="build-hover" style={vars({ "--hx": "-11px", "--hy": "6px" })}>
        <Slab x={x - 46} y={y - 6} w={70} h={140} r={12} depth={6} className={faint}>
          <rect x={5} y={5} width={60} height={130} rx={8} />
          <rect x={12} y={26} width={14} height={14} rx={4} />
          <line x1={31} y1={30} x2={52} y2={30} />
          <rect x={31} y={36} width={16} height={6} rx={3} />
        </Slab>
      </g>
      <g className="build-hover" style={vars({ "--hy": "-6px" })}>
        <Slab x={x} y={y} w={70} h={140} r={12} depth={7}>
          <rect x={5} y={5} width={60} height={130} rx={8} className="stroke-foreground/25" />
          <rect x={25} y={10} width={20} height={4.5} rx={2.25} className="fill-foreground/30 stroke-none" />
          {/* Icon, name and the install button. */}
          <Pixel x={11} y={24} size={18} rx={5} tone="lapis" />
          <line x1={35} y1={28} x2={58} y2={28} />
          <line x1={35} y1={33} x2={50} y2={33} className="stroke-foreground/25" />
          <rect x={35} y={37} width={18} height={6} rx={3} className="fill-primary stroke-none" />
          {/* Rating. */}
          {[0, 1, 2, 3, 4].map((n) => (
            <Pixel key={n} x={11 + n * 7} y={50} size={4.5} tone={n < 4 ? "glint" : "dim"} twinkle={n === 3 ? 2 : undefined} />
          ))}
          {/* Screenshots. */}
          {(["periwinkle", "mint"] as const).map((tone, n) => (
            <g key={tone}>
              <rect x={11 + n * 25} y={62} width={22} height={44} rx={3} className="stroke-foreground/30" />
              <rect x={14 + n * 25} y={66} width={16} height={8} className={cn("stroke-none", tones[tone])} />
              <rect x={14 + n * 25} y={78} width={16} height={3} className="fill-foreground/15 stroke-none" />
              <rect x={14 + n * 25} y={84} width={10} height={3} className="fill-foreground/15 stroke-none" />
            </g>
          ))}
          <line x1={27} y1={128} x2={43} y2={128} className="stroke-foreground/45" />
        </Slab>
      </g>
      {/* A new install. */}
      <circle cx={onWall(x, y, 29, 24)[0]} cy={onWall(x, y, 29, 24)[1]} r={3.2} className="build-pulse fill-glint stroke-background" />
    </Drawing>
  )
}

/* The scene for the split layout: your code, then the app landing on a platform per store. */

function TravellingCube({ path, tone, order }: { path: string; tone: Tone; order: number }) {
  return (
    <g className="build-travel" style={{ offsetPath: `path("${path}")`, "--d": order } as React.CSSProperties}>
      <polygon points={pts([[0, -7], [6, -3.5], [0, 0], [-6, -3.5]])} className={cn(tones[tone], "stroke-none")} />
      <polygon points={pts([[-6, -3.5], [0, 0], [0, 6], [-6, 2.5]])} className="fill-foreground/40 stroke-none" />
      <polygon points={pts([[0, 0], [6, -3.5], [6, 2.5], [0, 6]])} className="fill-foreground/25 stroke-none" />
    </g>
  )
}

export function StoresScene() {
  const s = 16
  const apple = { ox: 306, oy: 34 }
  const google = { ox: 306, oy: 140 }
  const toApple = "M98 86 C 140 10, 250 -6, 306 18"
  const toGoogle = "M114 100 C 180 70, 260 80, 306 124"
  const stack: { i: number; j: number; k: number; top?: Tone }[] = [
    { i: 1, j: 0, k: 0 },
    { i: 0, j: 1, k: 0 },
    { i: 1, j: 1, k: 0 },
    { i: 1, j: 1, k: 1, top: "lapis" },
  ]
  return (
    <svg
      viewBox="0 0 400 250"
      aria-hidden="true"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-auto w-full overflow-visible [&_*]:[vector-effect:non-scaling-stroke]"
    >
      {/* Your code. */}
      <Slab x={24} y={128} w={104} h={78} r={6} depth={6}>
        <line x1={0} y1={14} x2={104} y2={14} />
        <circle cx={9} cy={7} r={2} />
        <circle cx={15.5} cy={7} r={2} />
        <circle cx={22} cy={7} r={2} />
        {code.slice(0, 5).map((tokens, row) =>
          tokens.map(([at, width, tone]) => (
            <rect
              key={`${row}-${at}`}
              x={9 + at * 0.85}
              y={22 + row * 10}
              width={width * 0.85}
              height={4}
              rx={1}
              className={cn("stroke-none", tones[tone])}
            />
          )),
        )}
      </Slab>
      <path d={toApple} className="fill-none stroke-foreground/30" strokeDasharray="2 4" />
      <path d={toGoogle} className="fill-none stroke-foreground/30" strokeDasharray="2 4" />
      {[apple, google].map((store, n) => (
        <g key={n}>
          <Platform {...store} s={s} n={3} t={8} />
          {stack.map((b) => (
            <Cube key={`${b.i}${b.j}${b.k}`} {...store} s={s} {...b} />
          ))}
        </g>
      ))}
      <TravellingCube path={toApple} tone="lapis" order={0} />
      <TravellingCube path={toGoogle} tone="lapis" order={1} />
      {/* Labels under the code and each platform. */}
      {[
        { at: [70, 236], text: "Your code" },
        { at: [apple.ox, apple.oy + 48 + 26], text: "App Store" },
        { at: [google.ox, google.oy + 48 + 26], text: "Google Play" },
      ].map(({ at: [lx, ly], text }) => (
        <text
          key={text}
          x={lx}
          y={ly}
          textAnchor="middle"
          className="fill-muted-foreground stroke-none font-mono text-[10px] tracking-widest uppercase"
        >
          {text}
        </text>
      ))}
    </svg>
  )
}

/* ---------------------------------------------------------------- */
/* Layouts                                                           */
/* ---------------------------------------------------------------- */

const panels = [
  { name: "Built and tested", summary: "Native code, on your own phone every Friday", Drawing: BuildDrawing },
  { name: "Submitted for review", summary: "Listing, screenshots and privacy details done", Drawing: ReviewDrawing },
  { name: "Live in both stores", summary: "Under your company's name, on the day you pick", Drawing: LiveDrawing },
]

type SectionProps = { id: string; eyebrow: string; title: string }

/* A. Three panels, laid out like the home page's build trio. */
export function ReleaseTrio({ id, eyebrow, title }: SectionProps) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`} />
      <ol data-reveal="children" className="guides mt-12 grid border-y md:grid-cols-3">
        {panels.map(({ name, summary, Drawing: Art }, index) => (
          <li key={name} className={cn("relative", index > 0 && "border-t md:border-t-0 md:border-l")}>
            {index > 0 && (
              <>
                <span aria-hidden="true" className="build-joint top-[-4px] max-md:hidden" />
                <span aria-hidden="true" className="build-joint bottom-[-4px] max-md:hidden" />
              </>
            )}
            <div className="build-panel group flex h-full flex-col items-center gap-8 px-6 py-10 transition-colors hover:bg-foreground/[0.03] sm:px-8 sm:py-12 lg:py-14">
              <div className="w-full max-w-[15rem] sm:max-w-[18rem]">
                <Art />
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="font-mono text-xs tracking-widest text-primary">0{index + 1}</span>
                <h3 className="text-xl sm:text-2xl">{name}</h3>
                <p className="text-pretty text-muted-foreground">{summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}

/* B. A short answer beside one drawing: your code landing in both stores. */
export function ReleaseScene({ id, eyebrow, title }: SectionProps) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <div className={cn("grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16", inset)}>
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} id={`${id}-heading`} />
          <p className="max-w-md text-lg text-pretty text-muted-foreground">
            We publish it for you, from your own Apple and Google accounts, so the app is listed under your
            company&apos;s name.
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              "Test builds on your phone through TestFlight and Play testing",
              "Listing, screenshots and privacy details filled in",
              "Reviewers' questions answered, release on the day you pick",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[34rem]">
          <StoresScene />
        </div>
      </div>
    </LandingSection>
  )
}

/* C. The three drawings in one connected row, no panels. */
function Connector({ order }: { order: number }) {
  const path = "M4 30 C 30 0, 66 0, 92 30"
  return (
    <svg
      viewBox="0 0 96 40"
      aria-hidden="true"
      className="hidden w-24 shrink-0 self-center overflow-visible md:block [&_*]:[vector-effect:non-scaling-stroke]"
      strokeWidth="1.25"
    >
      <path d={path} className="fill-none stroke-foreground/30" strokeDasharray="2 4" />
      <path d="M87 24 92 30 84 31" className="fill-none stroke-foreground/30" />
      <TravellingCube path={path} tone={order ? "mint" : "lapis"} order={order} />
    </svg>
  )
}

export function ReleaseFlow({ id, eyebrow, title }: SectionProps) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`} />
      <ol className={cn("mt-14 flex flex-col gap-12 md:flex-row md:gap-2", inset)}>
        {panels.map(({ name, summary, Drawing: Art }, index) => (
          <li key={name} className="contents">
            {index > 0 && <Connector order={index - 1} />}
            <div className="build-panel flex flex-1 flex-col items-center gap-6 text-center">
              <div className="w-full max-w-[13rem]">
                <Art />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-mono text-xs tracking-widest text-primary">0{index + 1}</span>
                <h3 className="text-xl">{name}</h3>
                <p className="max-w-[16rem] text-sm text-pretty text-muted-foreground">{summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}
