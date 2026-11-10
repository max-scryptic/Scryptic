"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { cubeFaces, Phone, STEP_MS, StepCube, VoxelStage, type ReleaseStep } from "@/components/landing/release-phone"
import { StepGraphic, StepWindow } from "@/components/landing/release-graphics"
import { inset } from "@/lib/frame"

/*
 * Alternative layouts for the release section, for comparison. Each one plays
 * through the steps on a timer while on screen; clicking a step jumps to it
 * and stops the timer. With reduced motion they hold on the last step.
 */

function useCycle(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [motion, setMotion] = useState(false)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
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

  const playing = motion && inView && !paused

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setActive((a) => (a + 1) % count), STEP_MS)
    return () => window.clearInterval(timer)
  }, [playing, count])

  function select(index: number) {
    setPaused(true)
    setActive(index)
  }

  return { ref, motion, playing, active, select }
}

const pad = (n: number) => String(n + 1).padStart(2, "0")

type SectionProps = {
  id?: string
  eyebrow: string
  title: string
  intro: React.ReactNode
  steps: ReleaseStep[]
}

/* ------------------------------------------------------------------------- */
/* A: a compact accordion. One line per step; only the current one opens.     */
/* ------------------------------------------------------------------------- */

export function ReleaseAccordion({ id = "release-a", eyebrow, title, intro, steps }: SectionProps) {
  const { ref, motion, playing, active, select } = useCycle(steps.length)

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div ref={ref} className={cn("grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20", inset)}>
        <ol className="flex flex-col border-t border-border">
          {steps.map((step, index) => {
            const on = index === active
            const reached = !motion || index <= active
            return (
              <li key={step.id} className="relative border-b border-border">
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-expanded={on}
                  aria-controls={`${id}-${step.id}`}
                  className={cn(
                    "grid w-full grid-cols-[26px_auto_1fr] items-center gap-x-5 py-5 text-left transition-colors",
                    !on && "hover:text-primary",
                  )}
                >
                  <StepCube filled={reached} />
                  <span
                    className={cn("font-mono text-xs tracking-widest", on ? "text-primary" : "text-muted-foreground")}
                  >
                    {pad(index)}
                  </span>
                  <span
                    className={cn("text-xl tracking-tight transition-colors", on && "text-primary dark:text-[#c3caff]")}
                  >
                    {step.name}
                  </span>
                </button>
                <div
                  id={`${id}-${step.id}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="overflow-hidden pl-[calc(26px+1.25rem)] text-pretty text-muted-foreground">
                    <span className="block max-w-md pb-6">{step.text}</span>
                  </p>
                </div>
                {/* The current step's progress, along its bottom edge. */}
                {on && playing && (
                  <span
                    key={active}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
                    style={{ animation: `grow-x ${STEP_MS}ms linear both` }}
                  />
                )}
              </li>
            )
          })}
        </ol>
        <div className="relative order-first pb-16 lg:order-last lg:w-[380px]">
          <VoxelStage className="absolute bottom-0 left-1/2 w-[380px] max-w-full -translate-x-1/2" />
          <div className="relative">
            <Phone steps={steps} active={active} />
          </div>
        </div>
      </div>
    </LandingSection>
  )
}

/* ------------------------------------------------------------------------- */
/* B: a horizontal track of cubes, with the current step beside the phone.   */
/* ------------------------------------------------------------------------- */

export function ReleaseTrack({ id = "release-b", eyebrow, title, intro, steps }: SectionProps) {
  const { ref, motion, playing, active, select } = useCycle(steps.length)
  const step = steps[active]

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div ref={ref} className={cn("grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-x-20", inset)}>
        <div className="flex flex-col gap-12 lg:col-start-1 lg:row-start-1 lg:self-center">
          <ol className="grid grid-cols-5">
            {steps.map((s, index) => {
              const on = index === active
              const reached = !motion || index <= active
              const last = index === steps.length - 1
              return (
                <li key={s.id} className="relative">
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="absolute top-[14px] right-0 left-[calc(26px+0.75rem)] h-px bg-border"
                    >
                      {(!motion || index < active) && <span className="absolute inset-0 bg-primary" />}
                      {on && playing && (
                        <span
                          key={active}
                          className="absolute inset-0 origin-left bg-primary"
                          style={{ animation: `grow-x ${STEP_MS}ms linear both` }}
                        />
                      )}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-current={on ? "step" : undefined}
                    className="group flex flex-col items-start gap-3 pr-4 text-left"
                  >
                    <StepCube filled={reached} />
                    <span className="flex flex-col gap-1">
                      <span
                        className={cn(
                          "font-mono text-xs tracking-widest",
                          on ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {pad(index)}
                      </span>
                      <span
                        className={cn(
                          "hidden text-sm tracking-tight transition-colors sm:block",
                          on ? "text-primary dark:text-[#c3caff]" : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {s.name}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex flex-col gap-4" aria-live="polite">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Step {pad(active)} of {pad(steps.length - 1)}
            </span>
            <h3
              key={step.id}
              className="animate-in fade-in slide-in-from-bottom-2 text-3xl tracking-tight duration-500"
            >
              {step.name}
            </h3>
            <p
              key={`${step.id}-text`}
              className="animate-in fade-in max-w-md text-lg text-pretty text-muted-foreground duration-700"
            >
              {step.text}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => select((active - 1 + steps.length) % steps.length)}
                className="border border-border px-4 py-2 font-mono text-xs tracking-widest uppercase hover:border-primary hover:text-primary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => select((active + 1) % steps.length)}
                className="border border-primary bg-primary px-4 py-2 font-mono text-xs tracking-widest text-primary-foreground uppercase"
              >
                Next step
              </button>
            </div>
          </div>
        </div>
        <div className="relative order-first pb-16 lg:order-none lg:col-start-2 lg:row-start-1 lg:w-[380px]">
          <VoxelStage className="absolute bottom-0 left-1/2 w-[380px] max-w-full -translate-x-1/2" />
          <div className="relative">
            <Phone steps={steps} active={active} />
          </div>
        </div>
      </div>
    </LandingSection>
  )
}

/* ------------------------------------------------------------------------- */
/* C: a staircase. Each step's screen stands on a stack of cubes one higher   */
/* than the last, so the release climbs from left to right.                   */
/* ------------------------------------------------------------------------- */

const STAIR_SIDE = 30

function CubeStack({ height, filled }: { height: number; filled: boolean }) {
  const hw = STAIR_SIDE * 0.866
  const width = 2 * hw
  const total = STAIR_SIDE * 2 + height * STAIR_SIDE
  const cubes = Array.from({ length: height }, (_, z) =>
    cubeFaces(hw, total - STAIR_SIDE * 2 - (z + 1) * STAIR_SIDE, STAIR_SIDE),
  )
  return (
    <svg
      viewBox={`0 0 ${width} ${total}`}
      aria-hidden="true"
      className="w-[52px] overflow-visible"
      style={{ height: total }}
    >
      {cubes.map(({ top, left, right }, z) => (
        <g
          key={z}
          className={cn(
            "transition-[fill,stroke] duration-500",
            filled ? "stroke-transparent" : "fill-background stroke-muted-foreground/35",
          )}
          strokeWidth="1.2"
          strokeLinejoin="round"
          style={{ transitionDelay: filled ? `${z * 60}ms` : "0ms" }}
        >
          <path d={left} className={cn(filled && "fill-primary/80")} />
          <path d={right} className={cn(filled && "fill-primary/55")} />
          <path d={top} className={cn(filled && "fill-primary")} />
        </g>
      ))}
    </svg>
  )
}

/** The full-size phone, scaled down to sit on a stack. */
function MiniPhone({ step, on }: { step: ReleaseStep; on: boolean }) {
  const scale = 0.5
  return (
    <div
      className={cn(
        "relative transition-[transform,opacity] duration-500 ease-out",
        on ? "-translate-y-2 opacity-100" : "opacity-60",
      )}
      style={{ width: 250 * scale, height: ((250 * 19) / 9) * scale }}
    >
      <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
        <Phone steps={[step]} active={0} className="w-[250px]" />
      </div>
    </div>
  )
}

export function ReleaseStaircase({ id = "release-c", eyebrow, title, intro, steps }: SectionProps) {
  const { ref, motion, playing, active, select } = useCycle(steps.length)

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div ref={ref} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ol className={cn("grid min-w-[880px] grid-cols-5 gap-6", inset)}>
          {steps.map((step, index) => {
            const on = index === active
            const reached = !motion || index <= active
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={on ? "step" : undefined}
                  className="group flex w-full flex-col text-left"
                >
                  <span className="flex h-[480px] flex-col items-center justify-end">
                    <MiniPhone step={step} on={on || !motion} />
                    <span className="-mt-3">
                      <CubeStack height={index + 1} filled={reached} />
                    </span>
                  </span>
                  <span className="relative mt-6 flex flex-col gap-1.5 border-t border-border pt-5">
                    {on && playing && (
                      <span
                        key={active}
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-px h-px origin-left bg-primary"
                        style={{ animation: `grow-x ${STEP_MS}ms linear both` }}
                      />
                    )}
                    <span className="font-mono text-xs tracking-widest text-primary uppercase">Step {pad(index)}</span>
                    <span
                      className={cn(
                        "text-lg leading-snug tracking-tight transition-colors",
                        on && motion ? "text-primary dark:text-[#c3caff]" : "group-hover:text-primary",
                      )}
                    >
                      {step.name}
                    </span>
                    <span className="text-sm text-pretty text-muted-foreground">{step.text}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </LandingSection>
  )
}

/* ------------------------------------------------------------------------- */
/* D: clickable steps beside a window that shows each step's own graphic.     */
/* ------------------------------------------------------------------------- */

const windowStatus: Record<ReleaseStep["id"], string> = {
  build: "Demo Friday",
  test: "Testing",
  submit: "Submitted",
  review: "Approved",
  live: "Live",
}

export function ReleaseTabs({ id = "release-d", eyebrow, title, intro, steps }: SectionProps) {
  const { ref, motion, playing, active, select } = useCycle(steps.length)

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className={inset}>
          <ol className="flex flex-col border-t border-border">
            {steps.map((step, index) => {
              const on = index === active
              const reached = !motion || index <= active
              return (
                <li key={step.id} className="relative border-b border-border">
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-expanded={on}
                    aria-controls={`${id}-${step.id}`}
                    className={cn(
                      "grid w-full grid-cols-[26px_auto_1fr] items-center gap-x-5 py-5 text-left transition-colors",
                      !on && "hover:text-primary",
                    )}
                  >
                    <StepCube filled={reached} />
                    <span
                      className={cn("font-mono text-xs tracking-widest", on ? "text-primary" : "text-muted-foreground")}
                    >
                      {pad(index)}
                    </span>
                    <span
                      className={cn(
                        "text-xl tracking-tight transition-colors",
                        on && "text-primary dark:text-[#c3caff]",
                      )}
                    >
                      {step.name}
                    </span>
                  </button>
                  <div
                    id={`${id}-${step.id}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pl-[calc(26px+1.25rem)] text-pretty text-muted-foreground">
                      <span className="block max-w-md pb-6">{step.text}</span>
                    </p>
                  </div>
                  {on && playing && (
                    <span
                      key={active}
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
                      style={{ animation: `grow-x ${STEP_MS}ms linear both` }}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
        <StepWindow
          title={`release.v1 / ${pad(active)} ${steps[active].id}`}
          status={windowStatus[steps[active].id]}
          className="order-first lg:order-last"
        >
          {/* Every graphic in one grid cell, so the window keeps the tallest one's height. */}
          <div className="grid p-5">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out",
                  index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <StepGraphic id={step.id} />
              </div>
            ))}
          </div>
        </StepWindow>
      </div>
    </LandingSection>
  )
}

/* ------------------------------------------------------------------------- */
/* E: every step on show at once, each card with its own graphic.             */
/* ------------------------------------------------------------------------- */

export function ReleaseBento({ id = "release-e", eyebrow, title, intro, steps }: SectionProps) {
  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`}>
        {intro}
      </SectionHeading>
      <ol className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-6">
        {/* Each card spans two rows of the list's grid, so graphics and copy line up across a row. */}
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "group row-span-2 grid grid-rows-subgrid",
              index < 3 ? "lg:col-span-2" : "lg:col-span-3",
              index === steps.length - 1 && "md:col-span-2 lg:col-span-3",
            )}
          >
            <div aria-hidden="true" className="flex items-center bg-background p-5">
              <div className="w-full">
                <StepGraphic id={step.id} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 bg-card p-6">
              <span className="font-mono text-xs tracking-widest text-primary uppercase">Step {pad(index)}</span>
              <h3 className="text-xl tracking-tight">{step.name}</h3>
              <p className="max-w-md text-pretty text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}
