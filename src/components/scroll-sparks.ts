import { useRef, type RefObject } from "react"

/** Scroll distance, in px, per spark thrown off each guide. */
const SPACING = 12
/** Most sparks per side from one scroll event, so a fast fling stays a trickle. */
const BURST = 3
/** Most sparks alive at once. */
const MAX = 48
/** A scroll event moving further than this is a jump (a filter reset, say), not a scroll. */
const JUMP = 240

/**
 * Square sparks where a sideways scroller's cards cross the guides, to go with
 * the pixel dissolve (`.dissolve-x`) past them. The card leaving the row sheds
 * sparks that fly on out past the guide and fade; the card coming in draws
 * sparks in from outside, which fade as they reach the guide. Sparks move
 * sideways only and in steps, sit on the dissolve's 4px grid, and are skipped
 * for visitors who ask for reduced motion.
 *
 * `layer` is an empty, positioned box from guide to guide over the row; the
 * returned handler goes on the row's scroll event.
 */
export function useScrollSparks(
  row: RefObject<HTMLElement | null>,
  layer: RefObject<HTMLElement | null>
) {
  const last = useRef<number | null>(null)
  const carry = useRef(0)

  return () => {
    const list = row.current
    const box = layer.current
    if (!list || !box) return
    const prev = last.current
    last.current = list.scrollLeft
    if (prev === null) return
    const dx = list.scrollLeft - prev
    if (dx === 0 || Math.abs(dx) > JUMP) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    carry.current += Math.abs(dx)
    const count = Math.min(BURST, Math.floor(carry.current / SPACING))
    carry.current %= SPACING
    if (count === 0) return

    const bounds = box.getBoundingClientRect()
    // The way the cards are moving on screen: left as the row scrolls right.
    const dir = dx > 0 ? -1 : 1
    const edges = [
      { at: dx > 0 ? bounds.left : bounds.right, leaving: true },
      { at: dx > 0 ? bounds.right : bounds.left, leaving: false },
    ]
    const cards = Array.from(list.children, (card) => card.getBoundingClientRect())

    for (const edge of edges) {
      // Only where a card is crossing the guide, not in the gap between two.
      const card = cards.find((r) => r.left < edge.at && r.right > edge.at)
      if (!card) continue
      for (let i = 0; i < count; i++) {
        if (box.childElementCount >= MAX) return
        spark(box, {
          x: edge.at - bounds.left,
          top: card.top - bounds.top,
          height: card.height,
          dir,
          leaving: edge.leaving,
        })
      }
    }
  }
}

function spark(
  box: HTMLElement,
  { x, top, height, dir, leaving }: { x: number; top: number; height: number; dir: number; leaving: boolean }
) {
  const size = 2 + Math.floor(Math.random() * 3)
  // Just outside the guide, on the side the cards are crossing to or from.
  const outward = leaving ? dir : -dir
  const left = outward < 0 ? x - 2 - size : x + 2
  const y = top + Math.floor((Math.random() * height) / 4) * 4
  const travel = Math.round(16 + Math.random() * 40) * outward

  const el = document.createElement("span")
  el.style.cssText = `position:absolute;left:${left}px;top:${y}px;width:${size}px;height:${size}px;background:var(--primary)`
  box.append(el)

  const animation = el.animate(
    leaving
      ? [
          { transform: "translateX(0)", opacity: 1 },
          { transform: `translateX(${travel}px)`, opacity: 0 },
        ]
      : [
          { transform: `translateX(${travel}px)`, opacity: 0 },
          { opacity: 1, offset: 0.6 },
          { transform: "translateX(0)", opacity: 0 },
        ],
    {
      duration: 380 + Math.random() * 320,
      // Stepped, not smooth, so the sparks tick across like the blocks they are.
      easing: `steps(${4 + Math.floor(Math.random() * 3)})`,
    }
  )
  animation.onfinish = animation.oncancel = () => el.remove()
}
