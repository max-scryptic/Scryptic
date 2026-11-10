"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * The mobile app development page's release journey: a phone whose screen
 * steps from the first build to the live store listing, beside the list of
 * steps it is showing. While the section is on screen it advances on a timer,
 * the current step's bar filling as it goes; hovering changes nothing. With
 * reduced motion it holds on the last step with every step ticked. The phone
 * is decorative and hidden from assistive tech; the list says the same thing.
 */

const STEP_MS = 3000

export type ReleaseStep = { id: ScreenId; name: string; text: string }

type ScreenId = "build" | "test" | "submit" | "review" | "live"

function useStepCycle(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [motion, setMotion] = useState(false)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(count - 1)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setMotion(true)
    setActive(0)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!motion || !inView) return
    const timer = window.setInterval(() => setActive((a) => (a + 1) % count), STEP_MS)
    return () => window.clearInterval(timer)
  }, [motion, inView, count])

  return { ref, motion, inView, active }
}

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

function AppMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex items-center justify-center rounded-[22%] bg-primary", className)}>
      <span className="size-1/2 rotate-45 rounded-[22%] border-[3px] border-primary-foreground" />
      <span className="absolute size-[14%] rounded-full bg-primary-foreground" />
    </span>
  )
}

/** Each step's screen, drawn at the phone's size. */
function Screen({ id }: { id: ScreenId }) {
  if (id === "build") {
    const code = [
      "import SwiftUI",
      "",
      "struct HomeView: View {",
      "  @State var bookings: [Booking]",
      "",
      "  var body: some View {",
      "    NavigationStack {",
      "      List(bookings) { booking in",
      "        BookingRow(booking)",
      "      }",
      "      .navigationTitle(\"Bookings\")",
      "    }",
      "  }",
      "}",
    ]
    const keywords = new Set(["import", "struct", "var", "some", "in", "@State"])
    return (
      <div className="flex h-full flex-col bg-[#14131b] px-4 pt-12 pb-6 font-mono text-[9px] leading-[1.7] text-white/80">
        <div className="mb-3 flex gap-2">
          <span className="bg-white/10 px-2 py-1 text-white">HomeView.swift</span>
          <span className="px-2 py-1 text-white/40">HomeScreen.kt</span>
        </div>
        {code.map((line, index) => (
          <p key={index} className="flex gap-3 whitespace-pre">
            <span className="w-3 shrink-0 text-right text-white/25">{index + 1}</span>
            <span>
              {line.split(/(\s+)/).map((word, w) => (
                <span key={w} className={cn(keywords.has(word) && "text-[#c3caff]")}>
                  {word}
                </span>
              ))}
            </span>
          </p>
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <span className="h-1.5 overflow-hidden bg-white/10">
            <span className="block h-full w-full bg-[#5a62e6]" />
          </span>
          <span className="flex items-center gap-1.5 text-[#c3caff]">
            <Check />
            Build succeeded
          </span>
        </div>
      </div>
    )
  }

  if (id === "test") {
    const rows = ["Dog walk, 9:00", "Grooming, 11:30", "Dog walk, 13:00", "Vet visit, 14:00", "Dog walk, 16:30"]
    return (
      <div className="flex h-full flex-col gap-3 bg-background px-4 pt-12 pb-6">
        <span className="self-start bg-primary/15 px-2 py-0.5 font-mono text-[9px] tracking-widest text-primary uppercase dark:bg-primary/30 dark:text-foreground">
          Test build
        </span>
        <p className="text-lg font-semibold tracking-tight">Bookings</p>
        {rows.map((row, index) => (
          <div key={row} className="flex items-center justify-between gap-2 border border-border bg-card px-3 py-2.5 text-xs">
            <span className="truncate">{row}</span>
            <span
              className={cn(
                "flex items-center gap-1 px-1.5 py-0.5 font-mono text-[9px]",
                index < 3
                  ? "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground"
                  : "border border-dashed border-border text-muted-foreground",
              )}
            >
              {index < 3 && <Check className="size-2.5" />}
              {index < 3 ? "Booked" : "New"}
            </span>
          </div>
        ))}
        <span className="mt-auto h-9 bg-primary" />
      </div>
    )
  }

  if (id === "submit") {
    const items = ["Store listing", "Screenshots", "Privacy details"]
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 bg-background px-5 pt-10 pb-6 text-center">
        <AppMark className="size-16" />
        <span className="flex flex-col">
          <span className="font-semibold">Your app 1.0</span>
          <span className="text-xs text-muted-foreground">Your company Ltd</span>
        </span>
        <ul className="flex w-full flex-col divide-y divide-border border-y border-border text-left text-xs">
          {items.map((item) => (
            <li key={item} className="flex items-center justify-between py-2">
              {item}
              <Check className="text-primary dark:text-[#c3caff]" />
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 font-mono text-[10px] text-primary dark:bg-primary/25 dark:text-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-primary dark:bg-[#c3caff]" />
          Waiting for review
        </span>
      </div>
    )
  }

  if (id === "review") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-background px-5 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-9" />
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-lg font-semibold tracking-tight">Approved</span>
          <span className="text-xs text-muted-foreground">Ready for release</span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4 bg-background px-4 pt-12 pb-6">
      <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">App Store · Google Play</span>
      <div className="flex items-center gap-3">
        <AppMark className="size-14 shrink-0" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-semibold">Your app</span>
          <span className="truncate text-xs text-muted-foreground">Your company Ltd</span>
        </span>
      </div>
      <span className="rounded-full bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground">Get</span>
      <span className="grid grid-cols-2 gap-2">
        {[0, 1].map((shot) => (
          <span key={shot} className="flex aspect-[9/16] flex-col gap-1.5 rounded-lg border border-border bg-card p-2">
            <span className="h-1.5 w-1/2 rounded-full bg-primary/50" />
            {[0, 1, 2, 3].map((line) => (
              <span key={line} className="h-1 rounded-full bg-muted-foreground/25" />
            ))}
            <span className="mt-auto h-3 rounded-sm bg-primary/70" />
          </span>
        ))}
      </span>
      <span className="flex flex-col gap-1 border-t border-border pt-3">
        <span className="text-xs font-semibold">What&apos;s new</span>
        <span className="text-[10px] text-muted-foreground">Version 1.0, the first release.</span>
      </span>
    </div>
  )
}

// Isometric cubes, drawn like the hero's voxel field: a top face and two shaded sides.
const ISO = 0.866

function cubeFaces(x: number, y: number, side: number) {
  const hw = side * ISO
  const hh = side / 2
  const r = (n: number) => Math.round(n * 10) / 10
  return {
    top: `M${r(x)} ${r(y)}L${r(x + hw)} ${r(y + hh)}L${r(x)} ${r(y + 2 * hh)}L${r(x - hw)} ${r(y + hh)}Z`,
    left: `M${r(x - hw)} ${r(y + hh)}L${r(x)} ${r(y + 2 * hh)}L${r(x)} ${r(y + 2 * hh + side)}L${r(x - hw)} ${r(y + hh + side)}Z`,
    right: `M${r(x)} ${r(y + 2 * hh)}L${r(x + hw)} ${r(y + hh)}L${r(x + hw)} ${r(y + hh + side)}L${r(x)} ${r(y + 2 * hh + side)}Z`,
  }
}

/** A step's marker: a small cube, solid once the phone has reached that step. */
function StepCube({ filled }: { filled: boolean }) {
  const { top, left, right } = cubeFaces(13, 1, 13)
  return (
    <svg viewBox="0 0 26 29" aria-hidden="true" className="h-[29px] w-[26px] shrink-0 overflow-visible">
      <g
        className={cn(
          "transition-[fill,stroke] duration-500",
          filled ? "stroke-transparent" : "fill-background stroke-muted-foreground/40",
        )}
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <path d={left} className={cn(filled && "fill-primary/80")} />
        <path d={right} className={cn(filled && "fill-primary/60")} />
        <path d={top} className={cn(filled && "fill-primary")} />
      </g>
    </svg>
  )
}

// The platform the phone stands on: a loose diamond of cubes, a few stacked at the back.
const STAGE_SIDE = 26
const STAGE_SIZE = 7
const stacked: Record<string, number> = { "0,0": 2, "0,1": 1, "1,0": 1, "0,4": 1, "4,0": 2, "0,6": 1, "6,0": 1 }
const missing = new Set(["6,6", "5,6", "6,5", "0,3", "3,0"])

function VoxelStage({ className }: { className?: string }) {
  const hw = STAGE_SIDE * ISO
  const hh = STAGE_SIDE / 2
  const ox = STAGE_SIZE * hw
  const oy = STAGE_SIDE * 2
  const cubes: { gx: number; gy: number; gz: number }[] = []
  for (let gx = 0; gx < STAGE_SIZE; gx++) {
    for (let gy = 0; gy < STAGE_SIZE; gy++) {
      if (missing.has(`${gx},${gy}`)) continue
      for (let gz = 0; gz <= (stacked[`${gx},${gy}`] ?? 0); gz++) cubes.push({ gx, gy, gz })
    }
  }
  cubes.sort((a, b) => a.gx + a.gy - (b.gx + b.gy) || a.gz - b.gz)
  const width = 2 * ox
  const height = oy + STAGE_SIZE * 2 * hh + STAGE_SIDE

  return (
    <svg viewBox={`0 0 ${Math.round(width)} ${Math.round(height)}`} aria-hidden="true" className={className}>
      {cubes.map(({ gx, gy, gz }) => {
        const { top, left, right } = cubeFaces(ox + (gx - gy) * hw, oy + (gx + gy) * hh - gz * STAGE_SIDE, STAGE_SIDE)
        return (
          <g key={`${gx},${gy},${gz}`}>
            <path d={left} className="fill-primary/18" />
            <path d={right} className="fill-primary/8" />
            <path d={top} className="fill-primary/30" />
          </g>
        )
      })}
    </svg>
  )
}

function Phone({ steps, active }: { steps: ReleaseStep[]; active: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[9/19] w-[250px] rounded-[44px] bg-[#14131b] p-[10px] shadow-2xl shadow-primary/20 ring-1 ring-black/10 sm:w-[270px] dark:ring-white/15"
    >
      <div className="relative h-full overflow-hidden rounded-[34px] bg-background">
        {/* Status bar and the camera cut-out. */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3 font-mono text-[10px] font-medium mix-blend-difference text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-px">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] bg-current" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-current p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        <span className="absolute top-2.5 left-1/2 z-20 h-6 w-[76px] -translate-x-1/2 rounded-full bg-[#14131b]" />

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
              index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
            )}
          >
            <Screen id={step.id} />
          </div>
        ))}

        <span className="absolute bottom-2 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/30" />
      </div>
    </div>
  )
}

export function ReleaseSection({
  id = "release",
  eyebrow,
  title,
  intro,
  steps,
}: {
  id?: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  steps: ReleaseStep[]
}) {
  const { ref, motion, inView, active } = useStepCycle(steps.length)

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div
        ref={ref}
        className={cn("mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20", inset)}
      >
        <ol className="flex flex-col">
          {steps.map((step, index) => {
            const on = index === active
            const reached = !motion || index <= active
            const last = index === steps.length - 1
            return (
              <li
                key={step.id}
                aria-current={on && motion ? "step" : undefined}
                className={cn("relative grid grid-cols-[26px_1fr] gap-x-5", !last && "pb-9")}
              >
                {/* The connector to the next step: grey track, filled once passed, filling while this step plays. */}
                {!last && (
                  <span className="absolute top-8 bottom-1 left-[12.5px] w-px bg-border">
                    {(!motion || index < active) && <span className="absolute inset-0 bg-primary" />}
                    {on && motion && inView && (
                      <span
                        key={active}
                        className="absolute inset-0 bg-primary"
                        style={{ animation: `fill-down ${STEP_MS}ms linear both` }}
                      />
                    )}
                  </span>
                )}
                <StepCube filled={reached} />
                <span
                  className={cn(
                    "flex flex-col gap-1.5 transition-opacity duration-500",
                    reached || on ? "opacity-100" : "opacity-55",
                  )}
                >
                  <span className="font-mono text-xs tracking-widest text-primary uppercase">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-xl tracking-tight", on && motion && "text-primary dark:text-[#c3caff]")}>
                    {step.name}
                  </span>
                  <span className="max-w-md text-pretty text-muted-foreground">{step.text}</span>
                </span>
              </li>
            )
          })}
        </ol>
        <div className="relative order-first pb-16 lg:order-last">
          <VoxelStage className="absolute bottom-0 left-1/2 w-[380px] max-w-[100vw] -translate-x-1/2" />
          <div className="relative">
            <Phone steps={steps} active={active} />
          </div>
        </div>
      </div>
    </LandingSection>
  )
}
