"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

/** The line under the score at each band of ticks. */
export type FitVerdicts = {
  /** Nothing ticked. */
  none: string
  /** Every statement ticked. */
  all: string
  /** All but one ticked. */
  strong: string
  /** At least half ticked. */
  half: string
  /** Fewer than half ticked. */
  few: string
}

export const defaultVerdicts: FitVerdicts = {
  none: "Tick the ones that are true.",
  all: "A strong fit. Book the call.",
  strong: "A strong fit. Worth a call.",
  half: "Close. The call will settle the rest.",
  few: "A couple to talk through on the call.",
}

/** The line under the score, from the share of statements ticked. */
function verdict(count: number, total: number, verdicts: FitVerdicts) {
  if (count === 0) return verdicts.none
  if (count === total) return verdicts.all
  if (count >= total - 1) return verdicts.strong
  if (count * 2 >= total) return verdicts.half
  return verdicts.few
}

/**
 * The interactive half of FitCheckSection: statements a visitor ticks, and a
 * panel that scores them. Near the top of the score (all ticked, or all but
 * one) a button to the contact section fades in. Its space is always kept, so
 * the panel does not jump, and it is inert until then.
 */
export function FitCheck({
  items,
  initial,
  cta,
  verdicts = defaultVerdicts,
}: {
  items: string[]
  /** Which statements start ticked, by index. */
  initial: number[]
  cta: { label: string; href: string }
  verdicts?: FitVerdicts
}) {
  const [checked, setChecked] = useState(() => items.map((_, i) => initial.includes(i)))
  const count = checked.filter(Boolean).length
  const total = items.length
  const strong = count >= total - 1

  return (
    <div className="corners guides grid border border-border bg-card md:grid-cols-[1.4fr_1fr]">
      <ul data-reveal="children" className="grid auto-rows-fr divide-y divide-border">
        {items.map((item, index) => (
          <li key={item} className="flex">
            <label className="group flex flex-1 cursor-pointer items-center gap-4 px-6 py-5 text-lg text-pretty transition-colors -outline-offset-2 outline-primary hover:bg-primary/[0.04] has-[:focus-visible]:bg-primary/[0.04] has-[:focus-visible]:outline-2 sm:px-8">
              <input
                type="checkbox"
                className="sr-only"
                checked={checked[index]}
                onChange={() => setChecked((current) => current.map((value, i) => (i === index ? !value : value)))}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center border transition-colors",
                  checked[index]
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border group-hover:border-primary/60",
                )}
              >
                {checked[index] && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              <span className={cn("transition-colors", !checked[index] && "text-muted-foreground group-hover:text-foreground")}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between gap-8 border-t border-border bg-primary/[0.03] p-6 sm:p-8 md:border-t-0 md:border-l">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Your fit</p>
        <div className="flex flex-col gap-6">
          <p className="text-8xl leading-none tracking-tighter sm:text-9xl">
            {count}
            <span className="text-muted-foreground/60">/{total}</span>
            <span className="sr-only"> ticked</span>
          </p>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-hidden="true">
            {items.map((item, i) => (
              <span key={item} className={cn("h-3 transition-colors duration-300", i < count ? "bg-primary" : "bg-foreground/10")} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <p aria-live="polite" className="text-2xl tracking-tight text-pretty">
            {verdict(count, total, verdicts)}
          </p>
          <div
            inert={!strong}
            className={cn(
              "transition-[opacity,translate] duration-300 motion-reduce:transition-none",
              strong ? "opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            <Button size="lg" nativeButton={false} render={<Link href={cta.href} />} className="h-11 px-6 text-base">
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
