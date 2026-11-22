/**
 * The window a hero's visual sits in: square edges, accent brackets, a title
 * bar with three squares, a file-like label and an optional status. Decorative,
 * so hidden from assistive tech; the copy beside it says the same thing.
 *
 * Kept apart from hero.tsx so the animated cards in hero-visuals.tsx, which
 * are client components, can use it without pulling in the band itself.
 */
export function HeroWindow({
  label,
  status,
  ref,
  children,
}: {
  label?: string
  /** A short live-looking status at the right of the title bar, e.g. "Week 2". */
  status?: string
  /** For useHeroLoop, which only runs the card's loop while it is on screen. */
  ref?: React.Ref<HTMLDivElement>
  children: React.ReactNode
}) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-card corners mx-6 flex min-h-[21.5rem] flex-col border sm:mx-8 lg:ml-0 border-border bg-card text-card-foreground shadow-2xl shadow-black/25 [--corner:var(--foreground)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        {label && <span className="ml-3 font-mono text-xs text-muted-foreground">{label}</span>}
        {status && (
          <span className="ml-auto flex items-center gap-2 font-mono text-xs text-primary dark:text-[#c3caff]">
            <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
            {status}
          </span>
        )}
      </div>
      {/* Every hero card is at least the same height, its content centred in the space. */}
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  )
}
