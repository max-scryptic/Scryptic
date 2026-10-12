import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import {
  FloatingNav,
  FloatingNavAction,
  type FloatingNavItem,
} from "@/components/ui/floating-navbar"
import { bookingHref, siteConfig } from "@/lib/site"

// Root-relative hashes so the links work from every route, not just home.
export const navItems: FloatingNavItem[] = [
  { name: "Services", link: "/#services" },
  { name: "Process", link: "/#process" },
  { name: "FAQ", link: "/#faq" },
]

export function SiteHeader() {
  return (
    <FloatingNav
      navItems={navItems}
      brand={
        <Link
          href="/"
          className="flex min-h-9 items-center gap-2 rounded-full pr-1 font-semibold tracking-tight sm:pr-2"
        >
          <BrandLogo className="size-7 rounded-full" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sr-only sm:hidden">{siteConfig.name} home</span>
        </Link>
      }
      action={<FloatingNavAction href={bookingHref}>Book a call</FloatingNavAction>}
    />
  )
}
