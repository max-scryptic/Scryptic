"use client"

import { HeroWindow } from "@/components/landing/hero-window"
import { useHeroLoop } from "@/components/landing/use-hero-loop"

/** Rest, then played forward and held; the rewind runs as the loop wraps. */
const durations = [2400, 4200]

/**
 * A service page's hero visual: the same drawing as that service's panel in
 * the home page's "What we build" row (components/landing/build-trio.tsx), in
 * the same window as the other hero cards (HeroWindow).
 *
 * On the home page a drawing plays forward on hover; here nothing is hovered,
 * so it plays forward and back on a loop instead (data-build="play", which
 * globals.css treats like a hovered .build-panel), once the card has come in
 * with the copy.
 *
 * With reduced motion it rests on the played picture, as the cards in
 * hero-visuals.tsx rest on their last frame. Decorative: HeroWindow hides it
 * from assistive tech, and the copy beside it says the same thing.
 */
export function HeroDrawing({
  label,
  status,
  children,
}: {
  label: string
  status?: string
  children: React.ReactNode
}) {
  const [ref, step] = useHeroLoop(durations)
  return (
    <HeroWindow ref={ref} label={label} status={status}>
      {/* The drawings fill their faces with the page background; here that is the card's colour. */}
      <div data-build={step === 0 ? "rest" : "play"} className="mx-auto w-full max-w-sm px-8 py-6 [--background:var(--card)]">
        {children}
      </div>
    </HeroWindow>
  )
}
