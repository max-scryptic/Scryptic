import { cn } from "cn"

/*
 * A drawn store listing for the mobile app development page: how a client's
 * app looks on the App Store or on Google Play, published under their own
 * company name. Decorative, so hidden from assistive tech; the card's text
 * says the same thing. Drawn in the site's palette rather than with Apple's or
 * Google's marks, and with no ratings, downloads or other figures to invent.
 */

export type Store = "app-store" | "google-play"

const stores = {
  "app-store": {
    label: "App Store",
    button: "Get",
    footnote: "From your Apple Developer account",
  },
  "google-play": {
    label: "Google Play",
    button: "Install",
    footnote: "From your Play Console account",
  },
} satisfies Record<Store, { label: string; button: string; footnote: string }>

/** The app's icon: the same mark on both stores, in each store's corner shape. */
function AppIcon({ store }: { store: Store }) {
  return (
    <span
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center bg-primary sm:size-16",
        store === "app-store" ? "rounded-[22%]" : "rounded-[28%]",
      )}
    >
      <span className="size-6 rotate-45 rounded-[6px] border-[3px] border-primary-foreground sm:size-7" />
      <span className="absolute size-2 rounded-full bg-primary-foreground" />
    </span>
  )
}

/**
 * A rough screen of the app, as a store screenshot: a list, a chart or a form.
 * 3:4 on narrow screens; on wide ones it fills the height the card is given.
 */
function Screenshot({ variant }: { variant: "list" | "chart" | "form" }) {
  return (
    <span className="flex aspect-[3/4] flex-col lg:aspect-auto gap-1.5 overflow-hidden rounded-lg border border-border bg-card p-2">
      <span className="h-1.5 w-1/2 rounded-full bg-primary/50" />
      {variant === "list" &&
        [0, 1, 2, 3, 4].map((row) => (
          <span key={row} className="flex items-center gap-1.5">
            <span className="size-3 shrink-0 rounded-full bg-primary/20" />
            <span className="h-1 flex-1 rounded-full bg-muted-foreground/25" />
          </span>
        ))}
      {variant === "chart" && (
        <>
          <span className="mt-1 flex h-10 items-end gap-1">
            {[40, 70, 55, 90, 65].map((height) => (
              <span key={height} className="flex-1 rounded-t-sm bg-primary/40" style={{ height: `${height}%` }} />
            ))}
          </span>
          <span className="h-1 w-3/4 rounded-full bg-muted-foreground/25" />
          <span className="h-1 w-1/2 rounded-full bg-muted-foreground/25" />
          <span className="h-1 w-2/3 rounded-full bg-muted-foreground/25" />
        </>
      )}
      {variant === "form" && (
        <>
          {[0, 1, 2].map((field) => (
            <span key={field} className="h-3 rounded-sm border border-border bg-background" />
          ))}
          <span className="mt-auto h-3 rounded-sm bg-primary" />
        </>
      )}
    </span>
  )
}

export function StoreListing({ store, className }: { store: Store; className?: string }) {
  const { label, button, footnote } = stores[store]
  const ios = store === "app-store"

  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-4 border border-border bg-background p-4 sm:p-5", className)}>
      <span className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span className="tracking-widest uppercase">{label}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          Live
        </span>
      </span>

      <div className="flex items-center gap-4">
        <AppIcon store={store} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-foreground">Your app</span>
          <span className={cn("truncate text-sm", ios ? "text-muted-foreground" : "font-medium text-primary")}>
            Your company Ltd
          </span>
          {ios && <span className="text-xs text-muted-foreground">In-app purchases</span>}
        </span>
        {ios && (
          <span className="shrink-0 rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground">
            {button}
          </span>
        )}
      </div>

      {/* The App Store's info row and Google Play's install button take the same height, so the two cards line up. */}
      {ios && (
        <span className="grid grid-cols-3 divide-x divide-border border-y border-border py-2 text-center">
          {[
            ["Seller", "Your company"],
            ["Category", "Business"],
            ["Language", "English"],
          ].map(([name, value]) => (
            <span key={name} className="flex flex-col gap-0.5 px-1">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{name}</span>
              <span className="truncate text-xs font-medium text-foreground">{value}</span>
            </span>
          ))}
        </span>
      )}

      {!ios && (
        <span className="flex flex-col gap-1.5">
          <span className="rounded-full bg-primary py-2 text-center text-sm font-semibold text-primary-foreground">
            {button}
          </span>
          <span className="text-center text-xs text-muted-foreground">In-app purchases</span>
        </span>
      )}

      {/* Takes up the card's spare height, so the card can match the copy beside it. */}
      <span className="grid grid-cols-3 gap-2 lg:flex-1">
        <Screenshot variant="list" />
        <Screenshot variant="chart" />
        <Screenshot variant="form" />
      </span>

      <span className="border-t border-border pt-3 font-mono text-xs text-muted-foreground">{footnote}</span>
    </div>
  )
}
