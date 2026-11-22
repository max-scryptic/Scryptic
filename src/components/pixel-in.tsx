import { Fragment } from "react"

/**
 * A highlighted phrase in a page heading that builds itself out of pixels on
 * load (`.pixel-in` in globals.css). Each word is masked on its own: a masked
 * inline that wraps onto a second line is split into fragments, and browsers
 * repaint those out of step, so a phrase that wraps stutters instead of
 * building in. A single word never wraps, so each mask stays one box.
 */
export function PixelIn({ children, className }: { children: string; className?: string }) {
  return (
    <span className={className}>
      {children.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="pixel-in">{word}</span>
        </Fragment>
      ))}
    </span>
  )
}
