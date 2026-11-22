/**
 * Drops one square pixel into `layer` (an empty, positioned box) at `x`, `y`
 * in its coordinates: it falls `fall` px in steps, like the carousel sparks,
 * and fades out at the bottom. Removes itself when done. Callers skip this for
 * visitors who ask for reduced motion.
 */
export function dropPixel(
  layer: HTMLElement,
  { x, y, size = 4, fall, color }: { x: number; y: number; size?: number; fall: number; color: string }
) {
  const el = document.createElement("span")
  el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color}`
  layer.append(el)
  // Whole cells only, so it ticks down the 4px grid.
  const steps = Math.max(3, Math.round(fall / 4))
  const animation = el.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { opacity: 1, offset: 0.6 },
      { transform: `translateY(${steps * 4}px)`, opacity: 0 },
    ],
    { duration: 90 * steps + Math.random() * 200, easing: `steps(${steps})` }
  )
  animation.onfinish = animation.oncancel = () => el.remove()
}
