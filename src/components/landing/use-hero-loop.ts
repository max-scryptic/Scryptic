"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Steps a hero card through its loop, one frame at a time: frame i lasts
 * durations[i] milliseconds, then the loop wraps back to frame 0.
 *
 * Returns null until the loop starts, and for good with reduced motion. A card
 * renders null as its finished picture, the same as the loop's last frame, so
 * the server render, the entrance animation and the first loop join up without
 * a jump. The loop starts `delay` ms after mount, once the entrance has played
 * and the finished card has been on screen for a moment, and it pauses while
 * the card is scrolled out of view or the tab is hidden.
 *
 * Pass a module-level (or memoised) durations array, so the timers are not
 * reset on every render.
 */
export function useHeroLoop(durations: readonly number[], delay = 4500) {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<number | null>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let visible = false
    const update = () => setRunning(visible && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(el)
    document.addEventListener("visibilitychange", update)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", update)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const wait = step === null ? delay : durations[step]
    const timer = window.setTimeout(
      () => setStep((current) => (current === null ? 0 : (current + 1) % durations.length)),
      wait,
    )
    return () => window.clearTimeout(timer)
  }, [running, step, durations, delay])

  return [ref, step] as const
}
