import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  FloatingNav,
  FloatingNavAction,
  FloatingNavLink,
  type FloatingNavItem,
} from "@/components/ui/floating-navbar"
import { pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

// Root-relative hashes so the links work from every route, not just home.
export const navItems: FloatingNavItem[] = [
  { name: "Services", link: "/#services" },
  { name: "Work", link: pages.work.path },
  { name: "Process", link: "/#process", hideOnMobile: true },
  { name: "About", link: "/#about", hideOnMobile: true },
  { name: "FAQ", link: "/#faq" },
]

// A page of its own rather than a section of home, so it sits next to the
// theme toggle instead of in the section links.
export const blogNavItem: FloatingNavItem = { name: "Blog", link: pages.blog.path }

export function SiteHeader() {
  return (
    <FloatingNav
      navItems={navItems}
      brand={
        <Link
          href="/"
          className="flex min-h-10 items-center gap-2 rounded-lg px-1 font-logo text-lg font-extrabold tracking-tight lowercase sm:pr-2"
        >
          <BrandLogo className="size-7" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sr-only sm:hidden">{siteConfig.name} home</span>
        </Link>
      }
      action={
        <>
          {/* Below 400px the bar has no room for it next to Book a call; the footer still links it. */}
          <FloatingNavLink href={blogNavItem.link} className="hidden min-[400px]:flex">
            {blogNavItem.name}
          </FloatingNavLink>
          <ThemeToggle />
          <FloatingNavAction href={pages.bookCall.path}>Book a call</FloatingNavAction>
        </>
      }
    />
  )
}
