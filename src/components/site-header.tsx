import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  FloatingNav,
  FloatingNavAction,
  type FloatingNavItem,
} from "@/components/ui/floating-navbar"
import { bookingHref, siteConfig } from "@/lib/site"

// Root-relative hashes so the links work from every route, not just home.
export const navItems: FloatingNavItem[] = [
  { name: "Services", link: "/#services" },
  { name: "Process", link: "/#process", hideOnMobile: true },
  { name: "About", link: "/#about" },
  { name: "FAQ", link: "/#faq" },
]

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
          <ThemeToggle />
          <FloatingNavAction href={bookingHref}>Book a call</FloatingNavAction>
        </>
      }
    />
  )
}
