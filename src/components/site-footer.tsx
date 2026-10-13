import Link from "next/link"

import { BrandLogo, BrandWordmark } from "@/components/brand-logo"
import { navItems } from "@/components/site-header"
import { VoxelHills } from "@/components/voxel-hills"
import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 font-logo text-lg font-extrabold tracking-tight lowercase">
            <BrandLogo className="size-6" />
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.tagline}. From first call to launched app.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm sm:items-end">
          {navItems.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <a
            href={`mailto:${siteConfig.organization.email}`}
            className="text-primary hover:underline"
          >
            {siteConfig.organization.email}
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 font-mono text-xs text-muted-foreground sm:px-6">
        &copy; {new Date().getFullYear()} {siteConfig.organization.legalName}
      </div>
      {/* Its own band between the text and the wordmark, so it never sits behind either. */}
      <VoxelHills className="min-h-36 sm:min-h-48" />
      {/* Sign-off: the wordmark run edge to edge, sitting on the bottom of the page.
          The hills stand on its top border, and it is padded equally above and below. */}
      <div className="overflow-hidden border-t border-border p-4 sm:p-6">
        <BrandWordmark className="block h-auto w-full" />
      </div>
    </footer>
  )
}
