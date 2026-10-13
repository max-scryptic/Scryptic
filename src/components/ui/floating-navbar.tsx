import Link from "next/link"
import { cn } from "cn"

/*
 * Started as Aceternity UI's Floating Navbar
 * (ui.aceternity.com/components/floating-navbar), ported to this repo's tokens.
 * Changes from the original:
 * - It never hides: the bar stays pinned to the top while you scroll, so there
 *   is always a way to navigate.
 * - It is a solid card-coloured bar (white in light mode) with softly rounded
 *   corners, spanning the same width as the page content instead of hugging
 *   its links.
 * - Links are next/link inside a <nav> landmark, and the trailing slot takes
 *   any element (the call to action) instead of a hard-coded Login button.
 */

export type FloatingNavItem = {
  name: string
  link: string
  /**
   * Leave out of the bar below this breakpoint. Phones have room for about
   * two links and tablets (md) for about three; everything fits from lg.
   */
  hideBelow?: "md" | "lg"
}

// Literal class names, so Tailwind can see them.
const hideBelowClass = {
  md: "hidden md:block",
  lg: "hidden lg:block",
} as const

export function FloatingNav({
  navItems,
  brand,
  action,
  className,
}: {
  navItems: FloatingNavItem[]
  brand?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 mx-auto flex h-16 w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-0.5 rounded-xl border border-border bg-card px-1.5 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.18)] sm:top-5 sm:h-[4.5rem] sm:w-[calc(100%-3rem)] min-[360px]:gap-1 min-[360px]:px-2 sm:gap-2 sm:px-4",
        className,
      )}
    >
      {brand}
      <nav aria-label="Main" className="flex items-center">
        <ul className="flex items-center md:gap-1">
          {navItems.map((item) => (
            <li key={item.link} className={cn(item.hideBelow && hideBelowClass[item.hideBelow])}>
              <FloatingNavLink href={item.link}>{item.name}</FloatingNavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2">{action}</div>
    </header>
  )
}

/**
 * A plain text link styled like the nav items, for links that sit in the
 * trailing `action` slot instead of the main list.
 */
export function FloatingNavLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-10 items-center rounded-lg px-1 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:text-foreground min-[360px]:px-2 md:px-3 md:text-base",
        className,
      )}
    >
      {children}
    </Link>
  )
}

/**
 * The button that sits at the end of the bar. Pass it as FloatingNav's
 * `action`.
 */
export function FloatingNavAction({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex min-h-10 items-center rounded-lg bg-primary px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors hover:bg-primary/80 min-[360px]:px-3 sm:px-4 md:text-base"
    >
      {children}
    </Link>
  )
}
