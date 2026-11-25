import { cn } from "cn"

import type { ReleaseStepId } from "@/components/landing/release-graphics"

/* Prototype: three alternatives to the release section's phone. */

const order: ReleaseStepId[] = ["build", "test", "submit", "review", "live"]
const stageName: Record<ReleaseStepId, string> = {
  build: "Build",
  test: "Test",
  submit: "Submit",
  review: "Review",
  live: "Live",
}

type Enter = (name: string, delay?: number, duration?: number) => React.CSSProperties | undefined
const enterFor =
  (animate: boolean): Enter =>
  (name, delay = 0, duration = 600) =>
    animate ? { animation: `${name} ${duration}ms var(--ease-out) ${delay}ms both` } : undefined

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Window({
  label,
  status,
  children,
  className,
}: {
  label: string
  status: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "corners flex flex-col border border-border bg-card text-card-foreground shadow-2xl shadow-black/25 [--corner:var(--foreground)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{label}</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs text-primary dark:text-[#c3caff]">
          <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
          {status}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Release board: two platform lanes moving through five stages.    */
/* ------------------------------------------------------------------ */

const boardDetail: Record<ReleaseStepId, { k: string; v: string; ok?: boolean }[]> = {
  build: [
    { k: "HomeView.swift", v: "SwiftUI · main", ok: true },
    { k: "HomeScreen.kt", v: "Compose · main", ok: true },
    { k: "Friday demo", v: "build 14 on your phone" },
  ],
  test: [
    { k: "TestFlight", v: "4 testers · installed", ok: true },
    { k: "Internal testing", v: "3 testers · installed", ok: true },
    { k: "Feedback", v: "2 notes · fixed in build 15" },
  ],
  submit: [
    { k: "Store listing", v: "name, text, keywords", ok: true },
    { k: "Screenshots", v: "6.9in, 6.5in, Pixel", ok: true },
    { k: "Privacy details", v: "data types declared", ok: true },
  ],
  review: [
    { k: "App Store Connect", v: "Ready for Distribution", ok: true },
    { k: "Play Console", v: "Approved", ok: true },
    { k: "Release date", v: "you pick it" },
  ],
  live: [
    { k: "App Store", v: "apps.apple.com/app/your-app", ok: true },
    { k: "Google Play", v: "play.google.com/store/apps/…", ok: true },
    { k: "Seller", v: "Your Company Ltd" },
  ],
}

export function ReleaseBoard({ id, status, animate }: { id: ReleaseStepId; status: string; animate: boolean }) {
  const enter = enterFor(animate)
  const at = order.indexOf(id)
  const lanes = [
    { name: "iPhone", sub: "Swift" },
    { name: "Android", sub: "Kotlin" },
  ]
  return (
    <Window label="release · Your app 1.0" status={status} className="w-full max-w-[560px]">
      <div className="grid grid-cols-[76px_repeat(5,minmax(0,1fr))] border-b border-border font-mono text-[10px] tracking-widest uppercase">
        <span />
        {order.map((stage, index) => (
          <span
            key={stage}
            className={cn(
              "border-l border-border px-2 py-2.5 transition-colors duration-500",
              index === at ? "bg-primary/10 text-primary dark:text-[#c3caff]" : "text-muted-foreground",
            )}
          >
            {stageName[stage]}
          </span>
        ))}
      </div>
      {lanes.map((lane, laneIndex) => (
        <div
          key={lane.name}
          className="grid grid-cols-[76px_repeat(5,minmax(0,1fr))] border-b border-border"
        >
          <span className="flex flex-col justify-center px-4 py-4">
            <span className="text-sm">{lane.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{lane.sub}</span>
          </span>
          {order.map((stage, index) => {
            const done = index < at
            const now = index === at
            return (
              <span
                key={stage}
                className={cn(
                  "relative flex items-center justify-center border-l border-border transition-colors duration-500",
                  now && "bg-primary/10",
                )}
              >
                {/* The track through the lane. */}
                <span
                  className={cn(
                    "absolute inset-x-0 top-1/2 h-px transition-colors duration-500",
                    index <= at ? "bg-primary/50" : "bg-border",
                  )}
                />
                {done && (
                  <span className="relative flex size-5 items-center justify-center bg-primary/20 text-primary dark:text-[#c3caff]">
                    <Check className="size-2.5" />
                  </span>
                )}
                {now && (
                  <span
                    key={id}
                    className="relative flex size-7 items-center justify-center bg-primary text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
                    style={enter("pop", laneIndex * 150, 400)}
                  >
                    {at === order.length - 1 ? <Check className="size-3.5" /> : <span className="size-1.5 bg-current" />}
                  </span>
                )}
                {!done && !now && <span className="relative size-2 border border-muted-foreground/40 bg-card" />}
              </span>
            )
          })}
        </div>
      ))}
      <ul key={id} className="flex flex-col px-4 py-3 font-mono text-[11px]">
        {boardDetail[id].map((row, index) => (
          <li
            key={row.k}
            className="flex items-center justify-between gap-3 border-b border-dashed border-border py-2 last:border-0"
            style={enter("type-in", 200 + index * 120, 400)}
          >
            <span className="text-foreground">{row.k}</span>
            <span className="flex items-center gap-2 truncate text-muted-foreground">
              {row.v}
              {row.ok && <Check className="size-2.5 text-primary dark:text-[#c3caff]" />}
            </span>
          </li>
        ))}
      </ul>
    </Window>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Release log: a terminal that adds lines as the release moves.    */
/* ------------------------------------------------------------------ */

const logLines: Record<ReleaseStepId, { t: string; tag: string; msg: string; ok?: boolean }[]> = {
  build: [
    { t: "Fri 09:02", tag: "build", msg: "ios 1.0 (14) · swift", ok: true },
    { t: "Fri 09:04", tag: "build", msg: "android 1.0 (14) · kotlin", ok: true },
  ],
  test: [
    { t: "Fri 10:15", tag: "testflight", msg: "sent to 4 testers" },
    { t: "Fri 10:16", tag: "play", msg: "internal track · 3 testers" },
    { t: "Mon 14:40", tag: "fix", msg: "2 notes closed in (15)", ok: true },
  ],
  submit: [
    { t: "Tue 09:30", tag: "asc", msg: "submitted · waiting for review" },
    { t: "Tue 09:31", tag: "play", msg: "submitted · in review" },
  ],
  review: [
    { t: "Wed 16:05", tag: "asc", msg: "ready for distribution", ok: true },
    { t: "Wed 18:20", tag: "play", msg: "approved", ok: true },
  ],
  live: [
    { t: "Thu 09:00", tag: "release", msg: "live on App Store + Google Play", ok: true },
    { t: "Thu 09:00", tag: "seller", msg: "Your Company Ltd" },
  ],
}

export function ReleaseLog({ id, status, animate }: { id: ReleaseStepId; status: string; animate: boolean }) {
  const enter = enterFor(animate)
  const at = order.indexOf(id)
  return (
    <Window label="release.log" status={status} className="w-full max-w-[520px]">
      <div className="flex min-h-[360px] flex-col gap-3 px-5 py-5 font-mono text-[11.5px] leading-relaxed">
        {order.slice(0, at + 1).map((stage, s) => (
          <div key={stage} className="flex flex-col">
            <p
              className={cn(
                "mb-1 text-[10px] tracking-widest uppercase",
                s === at ? "text-primary dark:text-[#c3caff]" : "text-muted-foreground/60",
              )}
              style={s === at ? enter("type-in", 0, 300) : undefined}
            >
              # {String(s + 1).padStart(2, "0")} {stageName[stage]}
            </p>
            {logLines[stage].map((line, index) => (
              <p
                key={index}
                className={cn("grid grid-cols-[68px_80px_1fr] gap-2", s < at && "opacity-50")}
                style={s === at ? enter("type-in", 150 + index * 250, 350) : undefined}
              >
                <span className="text-muted-foreground/70">{line.t}</span>
                <span className="text-primary dark:text-[#c3caff]">{line.tag}</span>
                <span className="flex items-center gap-2 truncate">
                  {line.msg}
                  {line.ok && <Check className="size-2.5 text-primary dark:text-[#c3caff]" />}
                </span>
              </p>
            ))}
          </div>
        ))}
        <p className="flex items-center gap-2 text-muted-foreground">
          <span className="text-primary">$</span>
          <span className="h-3.5 w-[7px] animate-pulse bg-foreground/60 motion-reduce:animate-none" />
        </p>
      </div>
    </Window>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Voxel stack: a column of cubes per step, growing to the app.     */
/* ------------------------------------------------------------------ */

function cubeFaces(x: number, y: number, side: number) {
  const hw = side * 0.866
  const hh = side / 2
  return {
    top: `M${x} ${y}L${x + hw} ${y + hh}L${x} ${y + 2 * hh}L${x - hw} ${y + hh}Z`,
    left: `M${x - hw} ${y + hh}L${x} ${y + 2 * hh}L${x} ${y + 2 * hh + side}L${x - hw} ${y + hh + side}Z`,
    right: `M${x} ${y + 2 * hh}L${x + hw} ${y + hh}L${x + hw} ${y + hh + side}L${x} ${y + 2 * hh + side}Z`,
  }
}

export function ReleaseStack({
  id,
  caption,
  status,
  animate,
}: {
  id: ReleaseStepId
  caption: string
  status: string
  animate: boolean
}) {
  const at = order.indexOf(id)
  const s = 36
  const hw = s * 0.866
  const hh = s / 2
  // Columns side by side, column i is i + 1 cubes tall.
  const gap = 2 * hw + 10
  const baseX = hw + 4
  const baseY = 4 * s + 30
  const cubes: { col: number; level: number; x: number; y: number }[] = []
  order.forEach((_, col) => {
    for (let level = 0; level <= col; level++) {
      cubes.push({ col, level, x: baseX + col * gap, y: baseY - level * s })
    }
  })
  const width = baseX * 2 + 4 * gap
  const height = baseY + 2 * hh + s + 28
  return (
    <div className="relative flex w-full max-w-[520px] flex-col items-center gap-6">
      <div className="pointer-events-none absolute inset-x-0 -inset-y-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]" />
      <svg viewBox={`0 0 ${width} ${height}`} className="relative w-full max-w-[440px] overflow-visible">
        {cubes.map(({ col, level, x, y }) => {
          const f = cubeFaces(x, y, s)
          const reached = col <= at
          const fresh = col === at
          const isTop = col === 4 && level === 4
          return (
            <g
              key={`${col}-${level}`}
              className={cn(
                "transition-[fill,stroke] duration-500",
                reached ? "stroke-transparent" : "fill-transparent stroke-muted-foreground/25",
              )}
              strokeWidth="1.2"
              strokeLinejoin="round"
              style={
                isTop && at === 4
                  ? {
                      filter: "drop-shadow(0 0 18px color-mix(in oklab, var(--primary) 70%, transparent))",
                      ...(animate ? { animation: `voxel-drop 600ms cubic-bezier(0.3, 1.3, 0.5, 1) ${level * 110}ms both` } : {}),
                    }
                  : fresh && animate
                  ? {
                      animation: `voxel-drop 600ms cubic-bezier(0.3, 1.3, 0.5, 1) ${level * 110}ms both`,
                    }
                  : undefined
              }
            >
              <path d={f.left} className={cn(reached && (fresh ? "fill-primary/80" : "fill-primary/45"))} />
              <path d={f.right} className={cn(reached && (fresh ? "fill-primary/60" : "fill-primary/30"))} />
              <path d={f.top} className={cn(reached && (fresh ? "fill-primary" : "fill-primary/60"))} />
              {isTop && at === 4 && (
                <g className="fill-none stroke-primary-foreground" strokeWidth="2.5">
                  <path
                    d={`M${x} ${y + hh * 0.45}L${x + hw * 0.5} ${y + hh}L${x} ${y + hh * 1.55}L${x - hw * 0.5} ${y + hh}Z`}
                  />
                </g>
              )}
            </g>
          )
        })}
        {order.map((stage, col) => (
          <text
            key={stage}
            x={baseX + col * gap}
            y={baseY + s + hh * 2 + 22}
            textAnchor="middle"
            className={cn(
              "font-mono text-[9px] tracking-widest uppercase transition-colors duration-500",
              col === at ? "fill-primary" : "fill-muted-foreground/60",
            )}
          >
            {String(col + 1).padStart(2, "0")}
          </text>
        ))}
      </svg>
      <p className="relative flex w-full max-w-[440px] items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{caption}</span>
        <span className="flex items-center gap-2 text-primary dark:text-[#c3caff]">
          <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
          {status}
        </span>
      </p>
    </div>
  )
}
