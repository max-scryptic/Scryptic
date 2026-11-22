"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

const reducedMotion = "(prefers-reduced-motion: reduce)"

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotion)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * Steps a hero card through its loop, one frame at a time: frame i lasts
 * durations[i] milliseconds, then the loop wraps back to frame 0.
 *
 * The card starts on frame `start`, on the server too. Its first frame is held
 * for an extra `entrance` ms, while the card itself animates in (.hero-card in
 * globals.css), so the loop gets going just as the card lands. It pauses while
 * the card is scrolled out of view or the tab is hidden.
 *
 * With reduced motion it returns null for good, which a card renders as its
 * finished picture, the same as its last frame.
 *
 * Pass a module-level (or memoised) durations array, so the timers are not
 * reset on every render.
 */
export function useHeroLoop(durations: readonly number[], start = 0, entrance = 600) {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(start)
  const [running, setRunning] = useState(false)
  const [entered, setEntered] = useState(false)
  // False on the server and during hydration, so both render the start frame.
  const reduced = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(reducedMotion).matches,
    () => false,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

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
      setRunning(false)
    }
  }, [reduced])

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(
      () => {
        setEntered(true)
        setStep((current) => (current + 1) % durations.length)
      },
      durations[step] + (entered ? 0 : entrance),
    )
    return () => window.clearTimeout(timer)
  }, [running, step, durations, entered, entrance])

  return [ref, reduced ? null : step] as const
}
