"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"

import { LandingSection } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/** A run of the statement; `accent` ones light up in Lapis rather than ink. */
export type StatementPart = { text: string; accent?: boolean }

/** Where the heading's top is, as a fraction of the viewport, when the first word starts to light. */
const START = 0.9
/** Where the heading's centre is when the last word is fully lit: just below the middle, so it is whole by the time it is read. */
const END = 0.6

/**
 * One large sentence that lights up a word at a time as it scrolls up the
 * screen. A scroll listener sets one progress value (--lit, 0 to 1) on the
 * heading each frame, and each word works out its own brightness from it and
 * its place in the sentence (.lit-word in app/globals.css), with the light
 * trailing over about three words. It is measured from the heading's position
 * rather than run on a CSS scroll timeline, so it behaves the same in every
 * browser and always lands on the same words for the same position.
 *
 * Until the script runs, and for reduced motion, the sentence is shown whole.
 *
 * Keep it to one or two sentences, about 40 words, and say something only
 * this studio would: it is the page's loudest line after the hero.
 */
export function ProblemStatement({ parts, id = "statement" }: { parts: StatementPart[]; id?: string }) {
  const heading = useRef<HTMLHeadingElement>(null)
  const words = parts.flatMap(({ text, accent }) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent })),
  )

  useEffect(() => {
    const el = heading.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    function update() {
      frame = 0
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const from = window.innerHeight * START
      const to = window.innerHeight * END - height / 2
      const progress = Math.min(1, Math.max(0, (from - top) / (from - to)))
      el.style.setProperty("--lit", progress.toFixed(4))
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    el.dataset.lit = "on"
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      delete el.dataset.lit
    }
  }, [])

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`} space="loose">
      <h2
        ref={heading}
        id={`${id}-heading`}
        style={{ "--n": words.length } as React.CSSProperties}
        className={cn(
          "lit-words max-w-5xl text-[2rem] leading-[1.1] font-normal text-pretty sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]",
          inset,
        )}
      >
        {words.map(({ word, accent }, index) => (
          <span key={index}>
            <span
              className={cn("lit-word", accent && "text-primary")}
              style={{ "--i": index } as React.CSSProperties}
            >
              {word}
            </span>{" "}
          </span>
        ))}
      </h2>
    </LandingSection>
  )
}
