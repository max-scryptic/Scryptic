import Link from "next/link"

import { BrandLogo, BrandWordmark } from "@/components/brand-logo"
import { blogNavItem, navItems } from "@/components/site-header"
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
          {[...navItems, blogNavItem].map((item) => (
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
      {/* Sign-off: the wordmark run edge to edge, sitting on the bottom of the page. */}
      <div className="overflow-hidden px-4 pb-4 sm:px-6 sm:pb-6">
        <BrandWordmark className="block h-auto w-full" />
      </div>
    </footer>
  )
}
