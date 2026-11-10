import { cn } from "cn"

/*
 * The mobile app development page's store listings: a client's app on the App
 * Store, inside an iPhone, and on Google Play, inside an Android phone, each
 * published under their own company name. Decorative, so hidden from
 * assistive tech; the section's copy says the same thing.
 *
 * Each store page is drawn at the phone's real size in points (393 by 852, an
 * iPhone 15's screen) with the store's own layout, type and colours, light or
 * dark with the site's theme, then zoomed down to fit the column. No Apple or
 * Google marks, and no ratings, downloads or chart positions to invent: the
 * info rows show only facts any new app has. The app itself (its icon and its
 * store screenshots) wears the site's palette, as it would in a real listing.
 */

export type Store = "app-store" | "google-play"

const stores = {
  "app-store": { label: "App Store", footnote: "From your Apple Developer account" },
  "google-play": { label: "Google Play", footnote: "From your Play Console account" },
} satisfies Record<Store, { label: string; footnote: string }>

const fonts = {
  ios: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif',
  android: '"Google Sans", Roboto, "Helvetica Neue", system-ui, sans-serif',
}

// The app's own colours: Lapis to Periwinkle, fixed in both themes like a real icon.
const brand = {
  deep: "#1f2db0",
  lapis: "#2b3fd6",
  mid: "#5a62e6",
  periwinkle: "#7d8bff",
  night: "#14131b",
}

/* Icons, drawn on a 24 grid in the current colour. */

function Svg({ className, children, fill = false }: { className?: string; children: React.ReactNode; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

const icons = {
  chevronLeft: <path d="M15 4 7 12l8 8" />,
  arrowLeft: <path d="M20 12H4m6-7-7 7 7 7" />,
  arrowRight: <path d="M4 12h16m-6-7 7 7-7 7" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.8-4.8" />
    </>
  ),
  more: (
    <>
      <circle cx="12" cy="5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </>
  ),
  shareIos: <path d="M12 3v12m-4-8 4-4 4 4M8 10H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2" />,
  shareAndroid: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.6m-7.6 7 7.6 4.6" />
    </>
  ),
  wishlist: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Zm6 4v6m-3-3h6" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
    </>
  ),
  person: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19a6 6 0 0 1 11 0" />
    </>
  ),
  today: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M8 8h8M8 12h5" />
    </>
  ),
  games: (
    <>
      <path d="M7 8h10a4 4 0 0 1 4 4.5l-.6 3.5a2.5 2.5 0 0 1-4.3 1.2L14.5 15h-5l-1.6 2.2A2.5 2.5 0 0 1 3.6 16L3 12.5A4 4 0 0 1 7 8Z" />
      <path d="M8 11v3m-1.5-1.5h3" />
    </>
  ),
  apps: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </>
  ),
} satisfies Record<string, React.ReactNode>

function Glyph({ name, className }: { name: keyof typeof icons; className?: string }) {
  return <Svg className={className}>{icons[name]}</Svg>
}

/* The app: its icon and its store screenshots, the same on both stores. */

function AppIcon({ size, radius }: { size: number; radius: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] ring-1 ring-black/5"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(150deg, ${brand.periwinkle} 0%, ${brand.lapis} 55%, ${brand.deep} 100%)`,
      }}
    >
      <span
        className="rotate-45 border-white"
        style={{ width: size * 0.4, height: size * 0.4, borderWidth: size * 0.065, borderRadius: size * 0.09 }}
      />
      <span className="absolute rounded-full bg-white" style={{ width: size * 0.13, height: size * 0.13 }} />
      <span className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/15 to-transparent" />
    </span>
  )
}

type Shot = "bookings" | "week" | "checkout"

const shots: Record<Shot, { headline: string; background: string }> = {
  bookings: {
    headline: "Book in a few taps",
    background: `linear-gradient(165deg, ${brand.lapis} 0%, ${brand.mid} 100%)`,
  },
  week: {
    headline: "Your week at a glance",
    background: `linear-gradient(165deg, ${brand.night} 0%, #262a6b 100%)`,
  },
  checkout: {
    headline: "Pay without leaving the app",
    background: `linear-gradient(165deg, ${brand.periwinkle} 0%, ${brand.lapis} 100%)`,
  },
}

/** The app's own screens, as they appear inside a store screenshot: always light, like a real image. */
function AppScreen({ shot }: { shot: Shot }) {
  if (shot === "bookings") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    const rows = [
      ["09:00", "Dog walk", "Booked"],
      ["11:30", "Grooming", "Booked"],
      ["13:00", "Dog walk", "Booked"],
      ["16:30", "Vet visit", "New"],
    ]
    return (
      <div className="flex flex-col gap-2.5 px-3 pt-4">
        <p className="text-[15px] font-bold tracking-tight">Bookings</p>
        <div className="flex gap-1">
          {days.map((day, index) => (
            <span
              key={day}
              className={cn(
                "flex flex-1 flex-col items-center rounded-lg py-1 text-[8px] font-semibold",
                index === 2 ? "bg-[#2b3fd6] text-white" : "bg-[#eef1f5] text-[#5b6072]",
              )}
            >
              {day}
              <span className="text-[11px]">{12 + index}</span>
            </span>
          ))}
        </div>
        {rows.map(([time, name, status]) => (
          <div key={time} className="flex items-center gap-2 rounded-xl bg-[#eef1f5] p-2">
            <span className="size-6 shrink-0 rounded-full bg-[#2b3fd6]/20" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[10px] font-semibold">{name}</span>
              <span className="text-[8px] text-[#5b6072]">{time}</span>
            </span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[7px] font-semibold",
                status === "Booked" ? "bg-[#2b3fd6]/15 text-[#2b3fd6]" : "bg-[#f2a93b]/20 text-[#a1650f]",
              )}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (shot === "week") {
    const bars = [45, 70, 55, 90, 65, 35, 25]
    return (
      <div className="flex flex-col gap-2.5 px-3 pt-4">
        <p className="text-[15px] font-bold tracking-tight">This week</p>
        <div className="flex flex-col gap-0.5 rounded-xl bg-[#eef1f5] p-2.5">
          <span className="text-[8px] text-[#5b6072]">Bookings</span>
          <span className="text-[18px] font-bold tracking-tight">38</span>
          <span className="mt-1 flex h-14 items-end gap-1">
            {bars.map((height, index) => (
              <span
                key={index}
                className={cn("flex-1 rounded-t-[3px]", index === 3 ? "bg-[#2b3fd6]" : "bg-[#2b3fd6]/30")}
                style={{ height: `${height}%` }}
              />
            ))}
          </span>
        </div>
        {["Busiest day: Thursday", "Next: Dog walk, 09:00"].map((line) => (
          <div key={line} className="flex items-center gap-2 rounded-xl bg-[#eef1f5] p-2">
            <span className="size-4 shrink-0 rounded-md bg-[#2b3fd6]/25" />
            <span className="truncate text-[9px] font-medium">{line}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 px-3 pt-4">
      <p className="text-[15px] font-bold tracking-tight">Checkout</p>
      {[
        ["Dog walk, 1 hour", "£18.00"],
        ["Grooming", "£35.00"],
      ].map(([item, price]) => (
        <div key={item} className="flex items-center justify-between rounded-xl bg-[#eef1f5] p-2 text-[9px]">
          <span className="font-medium">{item}</span>
          <span className="text-[#5b6072]">{price}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-[#14131b]/10 px-1 pt-2 text-[10px] font-bold">
        <span>Total</span>
        <span>£53.00</span>
      </div>
      <span className="mt-1 h-3 rounded bg-[#eef1f5]" />
      <span className="h-3 w-2/3 rounded bg-[#eef1f5]" />
      <span className="mt-2 rounded-full bg-[#2b3fd6] py-1.5 text-center text-[10px] font-semibold text-white">Pay now</span>
    </div>
  )
}

/**
 * A store screenshot as the client would upload it: a headline over the app on
 * a phone. Drawn at 226 by 490 points (the iPhone's screenshot ratio, which
 * Google Play takes too) and zoomed to the store's size.
 */
function StoreShot({ shot, width, radius }: { shot: Shot; width: number; radius: number }) {
  const { headline, background } = shots[shot]
  return (
    <span
      className="relative flex h-[490px] w-[226px] shrink-0 flex-col items-center overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
      style={{ zoom: width / 226, borderRadius: (radius * 226) / width, background }}
    >
      <span className="px-4 pt-[22px] text-center text-[19px] leading-tight font-bold tracking-tight text-balance text-white">
        {headline}
      </span>
      <span
        className="absolute inset-x-[22px] top-[130px] bottom-0 overflow-hidden rounded-t-[22px] border-[5px] border-b-0 border-[#14131b] bg-white text-[#14131b] shadow-xl"
        style={{ fontFamily: fonts.ios }}
      >
        <span className="mx-auto mt-1.5 block h-2.5 w-12 rounded-full bg-[#14131b]" />
        <AppScreen shot={shot} />
      </span>
    </span>
  )
}

/* The phones. Both screens are 393 by 852 points; the frames add their bezels. */

function IosStatusBar() {
  return (
    <div className="relative flex h-[54px] shrink-0 items-center justify-between px-[34px] pt-[6px] text-[17px] font-semibold">
      <span className="w-[54px] text-center">9:41</span>
      <span className="flex items-center gap-[6px]">
        {/* Signal */}
        <svg viewBox="0 0 18 12" className="h-[12px] w-[18px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* Wi-Fi */}
        <svg viewBox="0 0 16 12" className="h-[12px] w-[16px]" fill="currentColor">
          <path d="M8 2.5c2.2 0 4.2.8 5.7 2.2l1.2-1.3A10 10 0 0 0 8 .7 10 10 0 0 0 1.1 3.4l1.2 1.3A8.2 8.2 0 0 1 8 2.5Zm0 3.6c1.2 0 2.3.4 3.2 1.2l1.2-1.3A6.6 6.6 0 0 0 8 4.3a6.6 6.6 0 0 0-4.4 1.7l1.2 1.3c.9-.8 2-1.2 3.2-1.2Zm0 3.5c.5 0 .9.2 1.2.4L8 11.3 6.8 10c.3-.3.7-.4 1.2-.4Z" />
        </svg>
        {/* Battery */}
        <span className="flex items-center gap-px">
          <span className="flex h-[13px] w-[25px] items-center rounded-[4px] border border-current/40 p-[1.5px]">
            <span className="h-full w-full rounded-[2px] bg-current" />
          </span>
          <span className="h-[4px] w-[1.5px] rounded-r-full bg-current/40" />
        </span>
      </span>
    </div>
  )
}

function AppStorePage() {
  const info = [
    { label: "Ages", value: "4+", sub: "Years Old" },
    { label: "Category", icon: "briefcase", sub: "Business" },
    { label: "Developer", icon: "person", sub: "Your company" },
    { label: "Language", value: "EN", sub: "English" },
  ] satisfies { label: string; value?: string; icon?: keyof typeof icons; sub: string }[]
  const tabs = [
    { name: "Today", icon: "today" },
    { name: "Games", icon: "games" },
    { name: "Apps", icon: "apps" },
    { name: "Search", icon: "search" },
  ] satisfies { name: string; icon: keyof typeof icons }[]
  const blue = "text-[#007aff] dark:text-[#0a84ff]"
  const grey = "text-[#8a8a8e] dark:text-[#8d8d93]"
  const rule = "border-[#3c3c43]/20 dark:border-[#545458]/60"

  return (
    <div
      className="relative flex h-full flex-col bg-white text-black dark:bg-black dark:text-white"
      style={{ fontFamily: fonts.ios }}
    >
      <IosStatusBar />

      <div className={cn("flex h-[44px] shrink-0 items-center px-[8px] text-[17px]", blue)}>
        <Glyph name="chevronLeft" className="size-[26px] stroke-[2.6]" />
        Search
      </div>

      <div className="flex gap-[16px] px-[20px] pt-[6px]">
        <AppIcon size={118} radius={27} />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[22px] leading-[1.15] font-bold tracking-[-0.01em]">Your app</span>
          <span className={cn("mt-[2px] text-[15px] leading-tight", grey)}>Bookings and payments</span>
          <div className="mt-auto flex items-center gap-[10px]">
            <span className="flex h-[30px] items-center rounded-full bg-[#007aff] px-[22px] text-[15px] font-bold text-white dark:bg-[#0a84ff]">
              Get
            </span>
            <span className={cn("text-[10px] leading-[1.15]", grey)}>
              In-App
              <br />
              Purchases
            </span>
            <Glyph name="shareIos" className={cn("ml-auto size-[24px]", blue)} />
          </div>
        </div>
      </div>

      <div className={cn("mx-[20px] mt-[22px] flex border-t", rule)}>
        {info.map(({ label, value, icon, sub }, index) => (
          <div
            key={label}
            className={cn(
              "relative flex w-[104px] shrink-0 flex-col items-center gap-[3px] py-[12px] text-center",
              grey,
              index > 0 &&
                "before:absolute before:top-1/2 before:left-0 before:h-[38px] before:-translate-y-1/2 before:border-l before:border-[#3c3c43]/20 dark:before:border-[#545458]/60",
            )}
          >
            <span className="text-[11px] font-semibold tracking-[0.04em] uppercase">{label}</span>
            {value ? (
              <span className="text-[20px] leading-[24px] font-bold">{value}</span>
            ) : (
              <Glyph name={icon ?? "person"} className="size-[24px]" />
            )}
            <span className="max-w-full truncate px-1 text-[12px]">{sub}</span>
          </div>
        ))}
      </div>

      <div className={cn("mx-[20px] border-t", rule)} />
      <div className="flex gap-[10px] overflow-hidden px-[20px] pt-[18px]">
        <StoreShot shot="bookings" width={226} radius={20} />
        <StoreShot shot="week" width={226} radius={20} />
        <StoreShot shot="checkout" width={226} radius={20} />
      </div>

      {/* The tab bar floats over the page, as in the store. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex h-[83px] justify-around border-t bg-[#f9f9f9]/90 px-[10px] pt-[7px] backdrop-blur-xl dark:bg-[#161618]/90",
          rule,
        )}
      >
        {tabs.map(({ name, icon }) => (
          <span
            key={name}
            className={cn(
              "flex w-[70px] flex-col items-center gap-[3px] text-[10px] font-medium",
              name === "Search" ? blue : "text-[#999]",
            )}
          >
            <Glyph name={icon} className="size-[26px] stroke-[1.8]" />
            {name}
          </span>
        ))}
        <span className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black dark:bg-white" />
      </div>
    </div>
  )
}

function AndroidStatusBar() {
  return (
    <div className="flex h-[40px] shrink-0 items-center justify-between px-[26px] pt-[6px] text-[14px] font-medium">
      <span>9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg viewBox="0 0 16 12" className="h-[12px] w-[16px]" fill="currentColor">
          <path d="M8 12 0 3.2A11.6 11.6 0 0 1 8 0c3 0 5.9 1.2 8 3.2L8 12Z" />
        </svg>
        <svg viewBox="0 0 12 12" className="h-[12px] w-[12px]" fill="currentColor">
          <path d="M12 0v12H0L12 0Z" />
        </svg>
        <span className="flex h-[13px] w-[7px] flex-col justify-end rounded-[2px] border border-current p-px">
          <span className="h-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  )
}

function GooglePlayPage() {
  const stats = [
    { top: <span className="flex size-[22px] items-center justify-center rounded-[3px] border-2 border-current text-[11px] font-bold">3</span>, label: "PEGI 3" },
    { top: <Glyph name="briefcase" className="size-[20px]" />, label: "Business" },
    { top: <span className="text-[15px] font-medium">EN</span>, label: "English" },
  ]
  const green = "text-[#01875f] dark:text-[#a8dab5]"
  const grey = "text-[#444746] dark:text-[#c4c7c5]"

  return (
    <div
      className="relative flex h-full flex-col bg-white text-[#1f1f1f] dark:bg-[#131314] dark:text-[#e3e3e3]"
      style={{ fontFamily: fonts.android }}
    >
      <AndroidStatusBar />

      <div className={cn("flex h-[56px] shrink-0 items-center gap-[4px] px-[14px]", grey)}>
        <Glyph name="arrowLeft" className="size-[24px]" />
        <span className="flex-1" />
        <Glyph name="search" className="mx-[10px] size-[24px]" />
        <Glyph name="more" className="size-[24px]" />
      </div>

      <div className="flex items-center gap-[22px] px-[24px] pt-[4px]">
        <AppIcon size={76} radius={18} />
        <div className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-[26px] leading-[1.15] font-normal">Your app</span>
          <span className={cn("text-[15px] font-medium", green)}>Your company Ltd</span>
          <span className={cn("text-[12px]", grey)}>In-app purchases</span>
        </div>
      </div>

      <div className="mt-[26px] flex items-start px-[12px]">
        {stats.map(({ top, label }, index) => (
          <div
            key={label}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-[6px]",
              index > 0 &&
                "before:absolute before:top-1/2 before:left-0 before:h-[24px] before:-translate-y-1/2 before:border-l before:border-[#c4c7c5] dark:before:border-[#444746]",
            )}
          >
            <span className="flex h-[22px] items-center">{top}</span>
            <span className={cn("text-[12px]", grey)}>{label}</span>
          </div>
        ))}
      </div>

      <span className="mx-[24px] mt-[24px] flex h-[42px] shrink-0 items-center justify-center rounded-full bg-[#01875f] text-[15px] font-medium text-white dark:bg-[#a8dab5] dark:text-[#00391f]">
        Install
      </span>

      <div className={cn("mt-[14px] flex justify-center gap-[30px] text-[14px] font-medium", green)}>
        <span className="flex items-center gap-[8px]">
          <Glyph name="shareAndroid" className="size-[18px]" />
          Share
        </span>
        <span className="flex items-center gap-[8px]">
          <Glyph name="wishlist" className="size-[18px]" />
          Add to wishlist
        </span>
      </div>

      <div className="flex gap-[8px] overflow-hidden px-[24px] pt-[24px]">
        <StoreShot shot="bookings" width={166} radius={10} />
        <StoreShot shot="week" width={166} radius={10} />
        <StoreShot shot="checkout" width={166} radius={10} />
      </div>

      <div className="flex items-center justify-between px-[24px] pt-[26px]">
        <span className="text-[20px] font-medium">About this app</span>
        <Glyph name="arrowRight" className={cn("size-[22px]", grey)} />
      </div>
      <p className={cn("px-[24px] pt-[10px] text-[14px] leading-[1.45]", grey)}>
        Book, pay and manage everything in one place, from your phone.
      </p>

      <span className="absolute bottom-[10px] left-1/2 h-[4px] w-[108px] -translate-x-1/2 rounded-full bg-[#1f1f1f]/70 dark:bg-white/70" />
    </div>
  )
}

function Phone({ store }: { store: Store }) {
  const ios = store === "app-store"
  return (
    <div
      className={cn(
        "relative bg-[#2b2b30] shadow-2xl shadow-primary/25 ring-1 ring-black/20 dark:bg-[#3a3a40] dark:ring-white/15",
        ios ? "rounded-[68px] p-[4px]" : "rounded-[50px] p-[3px]",
      )}
    >
      {/* Side buttons. */}
      {ios ? (
        <>
          <span className="absolute top-[120px] -left-[3px] h-[32px] w-[3px] rounded-l bg-[#2b2b30] dark:bg-[#3a3a40]" />
          <span className="absolute top-[180px] -left-[3px] h-[62px] w-[3px] rounded-l bg-[#2b2b30] dark:bg-[#3a3a40]" />
          <span className="absolute top-[256px] -left-[3px] h-[62px] w-[3px] rounded-l bg-[#2b2b30] dark:bg-[#3a3a40]" />
          <span className="absolute top-[210px] -right-[3px] h-[100px] w-[3px] rounded-r bg-[#2b2b30] dark:bg-[#3a3a40]" />
        </>
      ) : (
        <>
          <span className="absolute top-[170px] -right-[3px] h-[56px] w-[3px] rounded-r bg-[#2b2b30] dark:bg-[#3a3a40]" />
          <span className="absolute top-[260px] -right-[3px] h-[110px] w-[3px] rounded-r bg-[#2b2b30] dark:bg-[#3a3a40]" />
        </>
      )}
      <div className={cn("bg-black", ios ? "rounded-[64px] p-[10px]" : "rounded-[47px] p-[9px]")}>
        <div
          className={cn(
            "relative h-[852px] w-[393px] overflow-hidden",
            ios ? "rounded-[54px]" : "rounded-[38px]",
          )}
        >
          {ios ? <AppStorePage /> : <GooglePlayPage />}
          {/* The Dynamic Island on the iPhone, a punch-hole camera on Android. */}
          {ios ? (
            <span className="absolute top-[11px] left-1/2 h-[37px] w-[124px] -translate-x-1/2 rounded-full bg-black" />
          ) : (
            <span className="absolute top-[12px] left-1/2 size-[22px] -translate-x-1/2 rounded-full bg-black ring-2 ring-black/10" />
          )}
        </div>
      </div>
    </div>
  )
}

export function StoreListing({ store, className }: { store: Store; className?: string }) {
  const { label, footnote } = stores[store]

  return (
    <div
      aria-hidden="true"
      className={cn("relative flex flex-col gap-6 overflow-hidden border border-border bg-background p-4 sm:p-6", className)}
    >
      <span className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span className="tracking-widest uppercase">{label}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          Live
        </span>
      </span>

      {/* A soft glow behind the phone; the phone is drawn at full size and zoomed to fit the column. */}
      <div className="relative flex flex-1 items-center justify-center">
        <span className="absolute top-1/2 left-1/2 size-[70%] -translate-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative [zoom:0.5] min-[360px]:[zoom:0.56] min-[400px]:[zoom:0.64] sm:[zoom:0.8] lg:[zoom:0.7] xl:[zoom:0.76]">
          <Phone store={store} />
        </div>
      </div>

      <span className="border-t border-border pt-3 font-mono text-xs text-muted-foreground">{footnote}</span>
    </div>
  )
}
