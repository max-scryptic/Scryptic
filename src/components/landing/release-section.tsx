"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { ReleasePhone, type ReleaseStepId } from "@/components/landing/release-graphics"
import { LandingSection, SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/*
 * The mobile app development page's release journey: the steps from the first
 * build to the live store listing, beside a phone whose screen shows the
 * current step. Only the current step's copy is open. While the section is on
 * screen it advances on a timer, a bar along the step's bottom edge filling as
 * it goes; clicking a step opens it and stops the timer. With reduced motion
 * it starts on the last step with every step reached, and still opens on
 * click. The phone is decorative; the list says the same thing.
 */

const STEP_MS = 4000

export type ReleaseStep = { id: ReleaseStepId; name: string; text: string }

// The status under the phone for each step.
const phoneStatus: Record<ReleaseStepId, string> = {
  build: "Demo Friday",
  test: "Testing",
  submit: "Submitted",
  review: "Approved",
  live: "Live",
}

function useStepCycle(count: number) {
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

// Isometric cube faces, drawn like the hero's voxel field: a top face and two shaded sides.
function cubeFaces(x: number, y: number, side: number) {
  const hw = side * 0.866
  const hh = side / 2
  const r = (n: number) => Math.round(n * 10) / 10
  return {
    top: `M${r(x)} ${r(y)}L${r(x + hw)} ${r(y + hh)}L${r(x)} ${r(y + 2 * hh)}L${r(x - hw)} ${r(y + hh)}Z`,
    left: `M${r(x - hw)} ${r(y + hh)}L${r(x)} ${r(y + 2 * hh)}L${r(x)} ${r(y + 2 * hh + side)}L${r(x - hw)} ${r(y + hh + side)}Z`,
    right: `M${r(x)} ${r(y + 2 * hh)}L${r(x + hw)} ${r(y + hh)}L${r(x + hw)} ${r(y + hh + side)}L${r(x)} ${r(y + 2 * hh + side)}Z`,
  }
}

/** A step's marker: a small cube, solid once the release has reached that step. */
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

const pad = (n: number) => String(n + 1).padStart(2, "0")

export function ReleaseSection({
  id = "release",
  eyebrow,
  title,
  steps,
}: {
  id?: string
  eyebrow: string
  title: string
  steps: ReleaseStep[]
}) {
  const { ref, motion, playing, active, select } = useStepCycle(steps.length)

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`}>
      <SectionHeading className={inset} eyebrow={eyebrow} title={title} id={`${id}-heading`} />
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className={inset}>
          <ol className="flex flex-col border-t border-border">
            {steps.map((step, index) => {
              const on = index === active
              const reached = !motion || index <= active
              return (
                <li key={step.id} className="relative border-b border-border">
                  <h3>
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
                        className={cn(
                          "font-mono text-xs tracking-widest",
                          on ? "text-primary" : "text-muted-foreground",
                        )}
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
                  </h3>
                  {/* Closed steps keep their copy in the page, collapsed to no height. */}
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
        <ReleasePhone
          id={steps[active].id}
          caption={`${pad(active)} / ${steps[active].id}`}
          status={phoneStatus[steps[active].id]}
          animate={motion}
          className="order-first lg:order-last"
        />
      </div>
    </LandingSection>
  )
}
