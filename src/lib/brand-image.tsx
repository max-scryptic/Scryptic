import { BRAND_MARK_PATHS } from "@/components/brand-logo"
import { siteConfig } from "@/lib/site"

/*
 * The brand mark for next/og ImageResponse (favicon, app icons, Open Graph
 * image). Satori only understands inline styles and flexbox, so this mirrors
 * BrandLogo without Tailwind. Transparent by default, like BrandLogo; pass a
 * background where the platform needs an opaque icon (iOS fills transparency
 * with black).
 */
export function BrandMarkImage({
  size,
  background,
  color = siteConfig.colors.foreground,
}: {
  size: number
  background?: string
  color?: string
}) {
  // An opaque icon gets clear space around the mark; a bare one fills the box.
  const markSize = background ? size * 0.7 : size

  return (
    <div
      style={{
        width: size,
        height: size,
        background: background ?? "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={markSize} height={markSize} viewBox="0 0 24 24" fill={color}>
        {BRAND_MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </div>
  )
}
