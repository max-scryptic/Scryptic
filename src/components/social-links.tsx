import type { SocialProfile } from "@/lib/team"

/*
 * Outline brand icons from Tabler Icons (MIT), drawn on a 24px grid with a
 * 2px stroke so they sit with the site's line work. Each path list is one
 * network's glyph.
 */
const icons: Record<SocialProfile["network"], string[]> = {
  linkedin: [
    "M8 11v5",
    "M8 8v.01",
    "M12 16v-5",
    "M16 16v-3a2 2 0 1 0 -4 0",
    "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
  ],
  x: ["M4 4l11.733 16h4.267l-11.733 -16l-4.267 0", "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"],
  instagram: [
    "M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10",
    "M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0 -7 0",
    "M17 7v.01",
  ],
}

/**
 * A row of icon links to someone's profiles, in the primary colour. The icon
 * is the whole link; its label names the person and the network for screen
 * readers, and each opens in a new tab.
 */
export function SocialLinks({ name, profiles }: { name: string; profiles: SocialProfile[] }) {
  return (
    <ul className="flex items-center gap-2">
      {profiles.map((profile) => (
        <li key={profile.network}>
          <a
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${name} on ${profile.label}`}
            title={profile.label}
            className="flex size-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              {icons[profile.network].map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
