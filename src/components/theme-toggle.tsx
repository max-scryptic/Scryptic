"use client"

import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

/*
 * Light and dark mode. The theme is the .dark class on <html>. Dark is the
 * default: layout.tsx renders <html> with .dark, and themeScript (inlined in
 * <head>, before first paint) only switches to light when the visitor has
 * chosen it. The system setting is ignored. ThemeToggle flips the theme and
 * remembers the choice.
 */

const STORAGE_KEY = "theme"

export const themeScript = `(() => {
  try {
    const dark = localStorage.getItem("${STORAGE_KEY}") !== "light";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch {}
})()`

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ["class"] })
  return () => observer.disconnect()
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  )

  function toggle() {
    const next = !dark
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="size-10 text-muted-foreground hover:text-foreground"
    >
      {/* Sun in dark mode, moon in light mode: the icon shows where you will go. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        )}
      </svg>
    </Button>
  )
}
