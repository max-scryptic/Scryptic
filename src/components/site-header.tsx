import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  FloatingNav,
  FloatingNavAction,
  type FloatingNavItem,
} from "@/components/ui/floating-navbar"
import { pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

// Pages of their own only. The home page's sections are linked from the
// footer, and the logo leads back home. Narrow bars drop the later links
// first; the footer still has them.
export const navItems: FloatingNavItem[] = [
  { name: "Case studies", link: pages.work.path },
  { name: "Free tools", link: pages.tools.path, hideBelow: "xs" },
  { name: "Blog", link: pages.blog.path, hideBelow: "sm" },
]

export function SiteHeader() {
  return (
    <FloatingNav
      navItems={navItems}
      brand={
        <Link
          href="/"
          className="flex min-h-10 items-center gap-2 px-1 font-logo text-lg font-extrabold tracking-tight lowercase sm:pr-2"
        >
          <BrandLogo className="size-7" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sr-only sm:hidden">{siteConfig.name} home</span>
        </Link>
      }
      action={
        <>
          <ThemeToggle />
          <FloatingNavAction href={pages.bookCall.path}>Book a call</FloatingNavAction>
        </>
      }
    />
  )
}
