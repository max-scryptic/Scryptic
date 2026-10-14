import Image, { type StaticImageData } from "next/image"
import { cn } from "cn"

/**
 * A screenshot shown inside a plain browser window: three dots and the
 * address bar, so a reader can tell at a glance that it is a live web app and
 * where it lives.
 */
export function BrowserFrame({
  src,
  alt,
  domain,
  sizes,
  priority = false,
  className,
}: {
  src: StaticImageData
  alt: string
  /** Shown in the address bar, without the protocol. */
  domain?: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/5",
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        {domain ? (
          <span className="mx-auto truncate rounded-md bg-muted px-3 py-0.5 font-mono text-xs text-muted-foreground">
            {domain}
          </span>
        ) : null}
        {/* Balances the dots so the address bar sits in the middle. */}
        <span className="w-[2.625rem]" />
      </div>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="block h-auto w-full"
      />
    </figure>
  )
}
