/**
 * The card a free tool shows its result in: a label, an optional progress bar
 * and the result. It sticks beside the questions on wide screens and follows
 * them on phones. The result region is a polite live region, so screen
 * readers hear it change as answers come in.
 */
export function ResultPanel({
  id,
  label,
  progress,
  children,
}: {
  /** For links that jump to the result, such as a phone's sticky summary. */
  id?: string
  label: string
  progress?: { done: number; total: number }
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className="corners flex scroll-mt-28 flex-col border border-border bg-card shadow-xl shadow-black/5 lg:sticky lg:top-28"
    >
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:px-8">
        <div className="flex items-baseline justify-between gap-4 font-mono text-xs">
          <h2 className="tracking-widest text-primary uppercase">{label}</h2>
          {progress && (
            <p className="text-muted-foreground">
              {progress.done} of {progress.total} answered
            </p>
          )}
        </div>
        {progress && (
          <div className="h-1 overflow-hidden bg-muted" aria-hidden="true">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
        )}
      </div>
      <div aria-live="polite" className="flex flex-col gap-5 p-5 sm:p-8">
        {children}
      </div>
    </section>
  )
}
