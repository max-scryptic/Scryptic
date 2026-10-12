import { cn } from "cn"

/*
 * The Scryptic mark: a single-stroke "S" with a terminal cursor after it,
 * ink on a mint tile. Drawn inline rather than loaded as an image so it
 * takes its colours from the theme tokens. The favicon, app icons and Open Graph image are
 * drawn from the same paths, so they follow any change here.
 */

// 24x24 viewBox, stroked rather than filled.
export const BRAND_MARK_PATHS = [
  "M15.5 4H9a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H5.5",
  "M15 20h4.5",
]

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "flex aspect-square shrink-0 items-center justify-center rounded-lg bg-primary",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Roughly 60% of the tile, so the clear space around the mark survives
        // at the smallest size this is used at.
        className="size-[60%] text-primary-foreground"
        aria-hidden="true"
      >
        {BRAND_MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </div>
  )
}
