"use client"

import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

/*
 * Light and dark mode. The theme is the .dark class on <html>: the visitor's
 * saved choice if they have made one, otherwise their system setting.
 * themeScript applies it before first paint (layout.tsx inlines it in <head>);
 * ThemeToggle flips it and remembers the choice.
 */

const STORAGE_KEY = "theme"

export const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("${STORAGE_KEY}");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch {}
})()`

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

function subscribe(onChange: () => void) {
  // Follow the system setting until the visitor picks a theme themselves.
  const media = matchMedia("(prefers-color-scheme: dark)")
  const onSystemChange = () => {
    if (readSaved() === null) applyTheme(media.matches)
    onChange()
  }
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ["class"] })
  media.addEventListener("change", onSystemChange)
  return () => {
    observer.disconnect()
    media.removeEventListener("change", onSystemChange)
  }
}

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
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
      className="size-10 rounded-lg text-muted-foreground hover:text-foreground"
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
