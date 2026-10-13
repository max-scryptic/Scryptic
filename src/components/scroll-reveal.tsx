"use client"

import { useEffect } from "react"

/*
 * Scroll-triggered entrances for the page it is rendered on. Mark an element
 * with data-reveal and it fades up the first time it scrolls into view;
 * data-reveal="children" animates its direct children in turn instead. The
 * animations live in globals.css.
 *
 * The observer writes data-reveal-state: "waiting" while an element is still
 * below the fold, then "play" once it enters. Anything already on screen when
 * the page loads is left alone, so content never blinks out and back, and
 * without JavaScript (or with reduced motion) everything simply shows.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const seen = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          const first = !seen.has(el)
          seen.add(el)

          // On the first report, anything already visible (the margin below
          // included) stays as it is.
          const onScreen =
            entry.boundingClientRect.top < window.innerHeight && entry.boundingClientRect.bottom > 0
          if (first && onScreen) {
            observer.unobserve(el)
          } else if (entry.isIntersecting) {
            el.dataset.revealState = "play"
            observer.unobserve(el)
          } else {
            el.dataset.revealState = "waiting"
          }
        }
      },
      // Play a little after the element clears the bottom edge, not the moment it peeks in.
      { rootMargin: "0px 0px -10% 0px" },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
