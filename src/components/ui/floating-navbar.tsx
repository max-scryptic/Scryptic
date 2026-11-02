import Link from "next/link"
import { cn } from "cn"

/*
 * Started as Aceternity UI's Floating Navbar
 * (ui.aceternity.com/components/floating-navbar), ported to this repo's tokens.
 * Changes from the original:
 * - It never hides: the bar stays pinned to the top while you scroll, so there
 *   is always a way to navigate.
 * - It is a solid card-coloured bar (white in light mode) with square corners
 *   marked by small accent brackets, spanning the page content instead of
 *   hugging its links. Its edges sit on the edges of the max-w-6xl content
 *   column, so the bar lines up with the cards and guide lines below.
 * - Links are next/link inside a <nav> landmark, centred in the bar, and the
 *   trailing slot takes any element (the call to action) instead of a
 *   hard-coded Login button.
 */

export type FloatingNavItem = {
  name: string
  link: string
  /**
   * Leave out of the bar below this breakpoint: xs is 420px, roughly the
   * widest phones, and the rest are Tailwind's.
   */
  hideBelow?: "xs" | "sm" | "md" | "lg"
  /**
   * Pages under this one, shown in a menu that opens on hover or keyboard
   * focus on wide screens. The item itself stays a link to an index of the
   * same pages, which is all narrow screens and touch get.
   */
  children?: { name: string; link: string; description?: string }[]
}

// Literal class names, so Tailwind can see them.
const hideBelowClass = {
  xs: "hidden min-[420px]:block",
  sm: "hidden sm:block",
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
        "fixed inset-x-0 top-3 z-50 mx-auto grid h-16 [--corner:var(--foreground)] w-[calc(100%-2rem)] max-w-6xl corners grid-cols-[1fr_auto_1fr] items-center gap-0.5 border border-border bg-card px-1.5 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.18)] sm:top-5 sm:h-[4.5rem] sm:w-[calc(100%-3rem)] min-[360px]:gap-1 min-[360px]:px-2 sm:gap-2 sm:pr-5 sm:pl-4",
        className,
      )}
    >
      {/* Equal outer columns keep the links centred in the bar, whatever the brand and action widths. */}
      <div className="flex justify-self-start">{brand}</div>
      <nav aria-label="Main" className="flex items-center">
        <ul className="flex items-center md:gap-1">
          {navItems.map((item) => (
            <li
              key={item.link}
              className={cn(item.hideBelow && hideBelowClass[item.hideBelow], item.children && "group/menu relative")}
            >
              <FloatingNavLink href={item.link}>
                {item.name}
                {item.children && <ChevronIcon />}
              </FloatingNavLink>
              {item.children && <NavMenu items={item.children} label={item.name} />}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-0.5 justify-self-end min-[360px]:gap-1 sm:gap-2">{action}</div>
    </header>
  )
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ml-1 hidden size-3.5 transition-transform group-hover/menu:rotate-180 group-focus-within/menu:rotate-180 md:block"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/*
 * The dropdown under a nav item with children. Pure CSS: it shows while the
 * pointer is over the item or focus is inside it, so tabbing onto the item
 * opens it and tabbing on walks through its links. Below md it is never
 * shown, and the item's own link leads to the index page instead. The top
 * padding is a hover bridge between the item and the panel.
 */
function NavMenu({ items, label }: { items: NonNullable<FloatingNavItem["children"]>; label: string }) {
  return (
    <div className="invisible absolute top-full left-1/2 z-50 hidden w-80 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-150 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100 md:block">
      <ul
        aria-label={label}
        className="corners flex flex-col border border-border bg-card p-2 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.3)] [--corner:var(--foreground)]"
      >
        {items.map((child) => (
          <li key={child.link}>
            <Link
              href={child.link}
              className="flex flex-col gap-0.5 px-3 py-2.5 transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5"
            >
              <span className="font-medium text-foreground">{child.name}</span>
              {child.description && (
                <span className="text-sm text-pretty text-muted-foreground">{child.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
        "flex min-h-10 items-center px-1 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:text-foreground min-[360px]:px-2 md:px-3 md:text-base",
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
      className="flex min-h-10 items-center bg-primary px-2.5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-colors hover:bg-primary/80 min-[360px]:px-3 sm:px-4 md:text-base"
    >
      {children}
    </Link>
  )
}
