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
  /** Leave out of the bar on phones, where there is room for about three links. */
  hideOnMobile?: boolean
}

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
        "fixed inset-x-0 top-3 z-50 mx-auto flex h-16 w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-1 rounded-xl border border-border bg-card px-2 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.18)] sm:top-5 sm:h-[4.5rem] sm:w-[calc(100%-3rem)] sm:gap-2 sm:px-4",
        className,
      )}
    >
      {brand}
      <nav aria-label="Main" className="flex items-center">
        <ul className="flex items-center sm:gap-1">
          {navItems.map((item) => (
            <li key={item.link} className={cn(item.hideOnMobile && "hidden sm:block")}>
              <Link
                href={item.link}
                className="flex min-h-10 items-center rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:text-foreground sm:px-3 sm:text-base"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-1 sm:gap-2">{action}</div>
    </header>
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
    <a
      href={href}
      className="flex min-h-10 items-center rounded-lg border border-input px-3 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 sm:px-4 sm:text-base"
    >
      {children}
    </a>
  )
}
