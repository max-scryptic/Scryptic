import { cn } from "cn"

import { LandingSection } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

/** A run of the statement; `accent` ones light up in Lapis rather than ink. */
export type StatementPart = { text: string; accent?: boolean }

/**
 * One large sentence that lights up a word at a time as it scrolls up the
 * screen (the .lit-word animation in app/globals.css, on a CSS view timeline,
 * so nothing runs in JavaScript). Each word has its own slice of the range,
 * overlapping its neighbours so the light runs on smoothly. Without scroll
 * timelines, or with reduced motion, the sentence is simply shown whole.
 *
 * Keep it to one or two sentences, about 40 words, and say something only
 * this studio would: it is the page's loudest line after the hero.
 */
export function ProblemStatement({ parts, id = "statement" }: { parts: StatementPart[]; id?: string }) {
  const words = parts.flatMap(({ text, accent }) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, accent })),
  )
  // The light runs from 15% to 50% of the way through the heading's pass
  // across the viewport: in from below the middle, done by the top third.
  const start = 15
  const span = 35
  const step = span / words.length

  return (
    <LandingSection id={id} labelledBy={`${id}-heading`} space="loose">
      <h2
        id={`${id}-heading`}
        className={cn(
          "lit-words max-w-5xl text-[2rem] leading-[1.1] font-normal text-pretty sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]",
          inset,
        )}
      >
        {words.map(({ word, accent }, index) => (
          <span key={index}>
            <span
              className={cn("lit-word", accent && "text-primary")}
              style={
                {
                  "--a": `${(start + index * step).toFixed(2)}%`,
                  "--b": `${(start + (index + 3) * step).toFixed(2)}%`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>{" "}
          </span>
        ))}
      </h2>
    </LandingSection>
  )
}
