import { cn } from "cn"

/*
 * The parts every landing-style page shares: the home page and each service
 * page are built from the sections in this folder, so they look and behave the
 * same. A section's copy is passed in; its layout lives here.
 */

/** The eyebrow, h2 and intro at the top of a landing section. */
export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  aside,
  className,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  id: string
  /** Shown right after the title on wide screens, and after the intro on narrower ones. */
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-reveal="children"
      className={cn(
        "grid content-start gap-4",
        aside ? "xl:grid-cols-[auto_auto] xl:justify-start xl:gap-x-6" : "max-w-2xl",
        className,
      )}
    >
      <p className="font-mono text-xs tracking-widest text-primary uppercase xl:col-start-1">{eyebrow}</p>
      <h2 id={id} className="max-w-2xl text-3xl tracking-tight text-balance sm:text-4xl xl:col-start-1 xl:self-center">
        {title}
      </h2>
      <p className="max-w-2xl text-lg text-pretty text-muted-foreground xl:col-start-1">{children}</p>
      {aside && (
        <div className="mt-2 justify-self-start xl:col-start-2 xl:row-start-2 xl:mt-0 xl:self-center">
          {aside}
        </div>
      )}
    </div>
  )
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-1 size-4 shrink-0 text-primary", className)}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("mt-1 size-4 shrink-0 text-muted-foreground", className)}
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/**
 * A landing section's outer frame: full width with the page gutters, its
 * content in the max-w-6xl column. Sections with py-24 take scroll-mt-4, not
 * scroll-mt-28: with the 6rem top padding their heading still lands 7rem down,
 * just under the fixed header.
 */
export function LandingSection({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string
  labelledBy: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={labelledBy} id={id} className="scroll-mt-4 px-4 py-24 sm:px-6">
      <div className={cn("mx-auto flex max-w-6xl flex-col gap-12", className)}>{children}</div>
    </section>
  )
}
