"use client"

import { useHeroLoop } from "@/components/landing/use-hero-loop"

/** Rest, then played forward and held; the rewind runs as the loop wraps. */
const durations = [2400, 4200]

/**
 * A service page's hero visual: the same drawing as that service's panel in
 * the home page's "What we build" row (components/landing/build-trio.tsx),
 * larger and on its own. On the home page a drawing plays forward on hover;
 * here nothing is hovered, so it plays forward and back on a loop instead
 * (data-build="play", which globals.css treats like a hovered .build-panel),
 * once it has come in with the copy (.hero-card).
 *
 * With reduced motion it rests on the played picture, as the cards in
 * hero-visuals.tsx rest on their last frame. Decorative: the drawing is
 * hidden from assistive tech and the copy beside it says the same thing.
 */
export function HeroDrawing({ children }: { children: React.ReactNode }) {
  const [ref, step] = useHeroLoop(durations)
  return (
    <div
      ref={ref}
      data-build={step === 0 ? "rest" : "play"}
      className="hero-card mx-auto w-full max-w-sm px-6 sm:max-w-md lg:max-w-none lg:px-0"
    >
      {children}
    </div>
  )
}
