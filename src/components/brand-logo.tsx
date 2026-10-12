import { cn } from "cn"

/*
 * The Scryptic mark, "the split glass": a disc cut in half with the halves
 * slid apart, which also reads as an S. Drawn inline rather than loaded as an
 * image so it takes its colours from the theme tokens and follows the app
 * into dark mode without a second asset. The favicon, app icons and Open
 * Graph image are drawn from the same paths, so they follow.
 *
 * Construction on the 24x24 grid: two half discs of radius 8.5, the top one
 * 4 units left of the bottom one, 2 units apart. Keep it one colour and
 * never rotate it, or the S disappears.
 */

// 24x24 viewBox, filled rather than stroked.
export const BRAND_MARK_PATHS = [
  "M1.5 11A8.5 8.5 0 0 1 18.5 11Z",
  "M5.5 13A8.5 8.5 0 0 0 22.5 13Z",
]

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  // The bare mark on a transparent background, in the text colour, so it sits
  // on any surface and flips with the theme.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("aspect-square shrink-0 text-foreground", className)}
      aria-hidden="true"
    >
      {BRAND_MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
