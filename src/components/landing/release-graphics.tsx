import { cn } from "cn"

/*
 * The release section's phone (release-section.tsx): one phone outline whose
 * screen shows the current step, from the app being built to its icon landing
 * on a home screen. The screen is always drawn dark, like a phone's, in both
 * site themes. Decorative: the step list says the same thing, so the section
 * hides it from assistive tech.
 *
 * The section remounts the screen on each step, so its entrance animations
 * replay; with `animate` off (reduced motion) every screen draws in its end state.
 */

export type ReleaseStepId = "build" | "test" | "submit" | "review" | "live"

type Enter = (name: string, delay?: number, duration?: number) => React.CSSProperties | undefined

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/** A stand-in for the client's app icon. */
function AppMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex shrink-0 items-center justify-center rounded-[22%] bg-primary", className)}>
      <span className="size-1/2 rotate-45 rounded-[22%] border-[3px] border-primary-foreground" />
      <span className="absolute size-[14%] rounded-full bg-primary-foreground" />
    </span>
  )
}

/** The phone's status bar; lock screens leave the time to their big clock. */
function StatusBar({ time }: { time: boolean }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold">
      <span className={cn(!time && "invisible")}>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 flex h-[10px] w-[20px] rounded-[3px] border border-current/40 p-px">
          <span className="w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  )
}

function LockClock() {
  return (
    <div className="mt-6 text-center">
      <p className="text-[56px] leading-none font-light tracking-tight">9:41</p>
      <p className="mt-2 text-xs text-muted-foreground">Friday 14 March</p>
    </div>
  )
}

function Notification({ source, title, text, style }: { source: string; title: string; text: string; style?: React.CSSProperties }) {
  return (
    <div className="flex gap-2.5 rounded-[18px] bg-foreground/[0.09] p-3 text-[11.5px] leading-snug" style={style}>
      <AppMark className="size-8" />
      <span className="flex min-w-0 flex-col">
        <span className="font-mono text-[9.5px] tracking-wider text-muted-foreground uppercase">{source} · now</span>
        <span className="font-semibold">{title}</span>
        <span className="text-muted-foreground">{text}</span>
      </span>
    </div>
  )
}

function BuildScreen({ enter }: { enter: Enter }) {
  const keywords = new Set(["struct", "var", "some"])
  const code = ["struct Home: View {", "  var body: some View {", "    List(bookings) {", "      BookingRow($0)"]
  return (
    <div className="flex flex-1 flex-col px-5 pt-5">
      <div className="font-mono text-[10px] leading-[1.8] whitespace-pre text-muted-foreground">
        {code.map((line, index) => (
          <p key={index} style={enter("type-in", index * 120, 400)}>
            {line.split(/(\s+)/).map((word, w) => (
              <span key={w} className={cn(keywords.has(word) && "text-primary")}>
                {word}
              </span>
            ))}
          </p>
        ))}
      </div>
      <p className="mt-5 text-lg font-semibold" style={enter("rise", 600)}>
        Bookings
      </p>
      <ul className="mt-2 flex flex-col">
        {[72, 60, 66, 54].map((width, index) => (
          <li
            key={index}
            className="flex items-center gap-2.5 border-b border-border py-2.5"
            style={enter("rise", 750 + index * 150)}
          >
            <span className="size-6 rounded-full bg-primary/40" />
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="h-1.5 rounded-full bg-foreground/25" style={{ width: `${width}%` }} />
              <span className="h-1.5 w-2/5 rounded-full bg-foreground/10" />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex justify-around border-t border-border py-3" style={enter("rise", 1400)}>
        {[0, 1, 2, 3].map((tab) => (
          <span key={tab} className={cn("size-4 rounded-[5px]", tab === 0 ? "bg-primary" : "bg-foreground/15")} />
        ))}
      </div>
    </div>
  )
}

function TestScreen({ enter }: { enter: Enter }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-5">
      <LockClock />
      <div className="mt-auto">
        <Notification
          source="TestFlight"
          title="Your app 1.0 (14)"
          text="A new build is ready to test."
          style={enter("rise", 300)}
        />
      </div>
    </div>
  )
}

function SubmitScreen({ enter }: { enter: Enter }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 pb-10 text-center">
      <span className="relative flex size-36 items-center justify-center">
        <svg viewBox="0 0 140 140" className="absolute inset-0 -rotate-90">
          <circle cx="70" cy="70" r="62" fill="none" strokeWidth="4" className="stroke-foreground/10" />
          <circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100 100"
            className="stroke-primary"
            style={enter("hub-draw", 200, 2000)}
          />
        </svg>
        <span
          className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          style={enter("pop", 2200, 400)}
        >
          <Check className="size-5" />
        </span>
      </span>
      <p className="mt-6 text-sm font-semibold">Submitted for review</p>
      <p className="mt-1 font-mono text-[10px] text-muted-foreground">App Store Connect · Play Console</p>
    </div>
  )
}

function ReviewScreen({ enter }: { enter: Enter }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-5">
      <LockClock />
      <div className="mt-auto flex flex-col gap-2">
        <Notification
          source="App Store Connect"
          title="Approved"
          text="Your app is Ready for Distribution."
          style={enter("rise", 300)}
        />
        <Notification
          source="Play Console"
          title="Approved"
          text="Your app passed review."
          style={enter("rise", 900)}
        />
      </div>
    </div>
  )
}

function LiveScreen({ enter }: { enter: Enter }) {
  return (
    <div className="flex flex-1 flex-col px-4 pt-5 pb-3">
      <div className="grid grid-cols-4 gap-x-3.5 gap-y-3">
        {Array.from({ length: 16 }, (_, index) =>
          index === 9 ? (
            <span key={index} className="flex flex-col items-center gap-1.5">
              <span className="relative w-full" style={enter("voxel-drop", 250, 700)}>
                <AppMark className="aspect-square w-full shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_60%,transparent)]" />
                <span className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-background bg-[#ff6b6b]" />
              </span>
              <span className="text-[9px] leading-none whitespace-nowrap">Your app</span>
            </span>
          ) : (
            <span key={index} className="flex flex-col items-center gap-1.5">
              <span className="aspect-square w-full rounded-[22%] bg-foreground/[0.07]" />
              <span className="h-[5px] w-2/3 rounded-full bg-foreground/[0.06]" />
            </span>
          ),
        )}
      </div>
      <div className="mt-auto grid grid-cols-4 gap-3.5 rounded-[22px] bg-foreground/[0.07] p-2.5">
        {[0, 1, 2, 3].map((icon) => (
          <span key={icon} className="aspect-square rounded-[22%] bg-foreground/[0.08]" />
        ))}
      </div>
    </div>
  )
}

const screens = {
  build: BuildScreen,
  test: TestScreen,
  submit: SubmitScreen,
  review: ReviewScreen,
  live: LiveScreen,
} satisfies Record<ReleaseStepId, (props: { enter: Enter }) => React.ReactNode>

/** The phone, showing step `id`'s screen, with a caption line under it. */
export function ReleasePhone({
  id,
  caption,
  status,
  animate,
  className,
}: {
  id: ReleaseStepId
  caption: string
  status: string
  animate: boolean
  className?: string
}) {
  const Screen = screens[id]
  const enter: Enter = (name, delay = 0, duration = 600) =>
    animate ? { animation: `${name} ${duration}ms var(--ease-out) ${delay}ms both` } : undefined

  return (
    <div aria-hidden="true" className={cn("relative flex flex-col items-center gap-6", className)}>
      <div className="pointer-events-none absolute inset-x-0 -inset-y-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]" />
      <div className="relative h-[540px] w-[264px] rounded-[46px] border-2 border-foreground/20 p-2 shadow-2xl shadow-black/25">
        <div className="dark relative flex h-full flex-col overflow-hidden rounded-[38px] bg-background text-foreground">
          <span className="absolute top-2.5 left-1/2 z-10 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black" />
          <StatusBar time={id !== "test" && id !== "review"} />
          {/* Keyed by step, so moving to a step replays its screen's entrance. */}
          <div key={id} className="flex flex-1 flex-col" style={enter("hub-swap", 0, 400)}>
            <Screen enter={enter} />
          </div>
        </div>
      </div>
      <p className="relative flex w-[264px] items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{caption}</span>
        <span className="flex items-center gap-2 text-primary dark:text-[#c3caff]">
          <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
          {status}
        </span>
      </p>
    </div>
  )
}
