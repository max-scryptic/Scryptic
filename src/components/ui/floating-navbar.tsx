"use client"

import { useState } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"
import { cn } from "cn"

/*
 * Aceternity UI's Floating Navbar (ui.aceternity.com/components/floating-navbar),
 * ported to this repo's tokens. Changes from the original:
 * - It shows at the top of the page instead of starting hidden, so there is
 *   always a way to navigate on first load. It still slides away as you scroll
 *   down and comes back as soon as you scroll up.
 * - It tracks scroll distance in pixels rather than scroll progress, so it
 *   behaves the same on short and long pages.
 * - It stays put for reduced-motion users and reappears when a link inside it
 *   receives keyboard focus.
 * - Links are next/link inside a <nav> landmark, and the trailing slot takes
 *   any element (the call to action) instead of a hard-coded Login button.
 */

export type FloatingNavItem = {
  name: string
  link: string
  /** Leave out of the bar on phones, where the pill has room for about three links. */
  hideOnMobile?: boolean
}

// Below this many pixels from the top the bar is always shown.
const REVEAL_ZONE = 120

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
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const goingUp = current < previous
    setVisible(current < REVEAL_ZONE || goingUp)
  })

  const shown = visible || reduceMotion

  return (
    <motion.header
      initial={false}
      animate={{ y: shown ? 0 : -120, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onFocusCapture={() => setVisible(true)}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border border-border bg-background/80 py-1.5 pr-1.5 pl-2 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.15)] backdrop-blur-md sm:top-6 sm:gap-2 sm:pl-3",
        className,
      )}
    >
      {brand}
      <nav aria-label="Main" className="flex items-center">
        <ul className="flex items-center">
          {navItems.map((item) => (
            <li key={item.link} className={cn(item.hideOnMobile && "hidden sm:block")}>
              <Link
                href={item.link}
                className="flex min-h-9 items-center rounded-full px-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground sm:px-3"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {action}
    </motion.header>
  )
}

/**
 * The pill button that sits at the end of the bar. Pass it as FloatingNav's
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
      className="flex min-h-9 items-center rounded-full border border-input px-3 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 sm:px-4"
    >
      {children}
    </a>
  )
}
