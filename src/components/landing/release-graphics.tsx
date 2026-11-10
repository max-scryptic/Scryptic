"use client"

import { cn } from "cn"

/*
 * One graphic per release step for the release section (release-section.tsx),
 * drawn in the same style as the service heroes' cards. Decorative: the step's
 * copy says the same thing, so the section hides these from assistive tech.
 */

export type ReleaseStepId = "build" | "test" | "submit" | "review" | "live"

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
    <span className={cn("relative flex items-center justify-center rounded-[22%] bg-primary", className)}>
      <span className="size-1/2 rotate-45 rounded-[22%] border-[3px] border-primary-foreground" />
      <span className="absolute size-[14%] rounded-full bg-primary-foreground" />
    </span>
  )
}

const chip = "flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px]"
const chipDone = cn(chip, "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground")
const chipWaiting = cn(chip, "border border-dashed border-border text-muted-foreground")
const label = "font-mono text-[11px] tracking-widest text-muted-foreground uppercase"

function Code({ file, lang, lines }: { file: string; lang: string; lines: string[] }) {
  const keywords = new Set(["import", "struct", "var", "some", "fun", "val", "@Composable", "LazyColumn", "List"])
  return (
    <div className="flex min-w-0 flex-col border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5 font-mono text-[11px]">
        <span className="truncate text-foreground">{file}</span>
        <span className="text-muted-foreground">{lang}</span>
      </div>
      <div className="flex flex-col px-3 py-2 font-mono text-[10.5px] leading-[1.75] text-muted-foreground">
        {lines.map((line, index) => (
          <p key={index} className="flex gap-2.5 whitespace-pre">
            <span className="w-3 shrink-0 text-right text-foreground/25">{index + 1}</span>
            <span className="overflow-hidden text-ellipsis whitespace-pre">
              {line.split(/(\s+)/).map((word, w) => (
                <span key={w} className={cn(keywords.has(word) && "text-primary dark:text-[#c3caff]")}>
                  {word}
                </span>
              ))}
            </span>
          </p>
        ))}
      </div>
    </div>
  )
}

function BuildGraphic() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Code
          file="HomeView.swift"
          lang="Swift"
          lines={[
            "struct HomeView: View {",
            "  var body: some View {",
            "    List(bookings) {",
            "      BookingRow($0)",
            "    }",
            "  }",
            "}",
          ]}
        />
        <Code
          file="HomeScreen.kt"
          lang="Kotlin"
          lines={[
            "@Composable",
            "fun HomeScreen() {",
            "  LazyColumn {",
            "    items(bookings) {",
            "      BookingRow(it)",
            "    }",
            "  }",
          ]}
        />
      </div>
      <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-[11px]">
        <span className="truncate text-muted-foreground">
          <span className="text-foreground">main</span> · Friday demo build
        </span>
        <span className={chipDone}>
          <Check className="size-2.5" />
          Passed
        </span>
      </div>
    </div>
  )
}

function TestGraphic() {
  const devices = [
    { name: "Your iPhone", track: "TestFlight", done: true },
    { name: "Your Android phone", track: "Internal testing", done: true },
    { name: "Ops manager's iPhone", track: "TestFlight", done: true },
    { name: "Field team tablet", track: "Internal testing", done: false },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 border border-border bg-background px-3 py-2 font-mono text-[11px]">
        <span className="text-foreground">Your app 1.0 (build 14)</span>
        <span className="shrink-0 bg-primary px-2 py-0.5 text-primary-foreground">Test build</span>
      </div>
      <ul className="flex flex-col divide-y divide-border border-y border-border text-sm">
        {devices.map((device) => (
          <li key={device.name} className="flex items-center justify-between gap-3 py-2">
            <span className="flex min-w-0 flex-col">
              <span className="truncate">{device.name}</span>
              <span className="font-mono text-[10.5px] text-muted-foreground">{device.track}</span>
            </span>
            <span className={device.done ? chipDone : chipWaiting}>
              {device.done && <Check className="size-2.5" />}
              {device.done ? "Installed" : "Invited"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SubmitGraphic() {
  const items = ["Store listing", "Screenshots", "Privacy details", "Age rating"]
  return (
    <div className="grid grid-cols-2 gap-3">
      {["App Store Connect", "Play Console"].map((store) => (
        <div key={store} className="flex min-w-0 flex-col gap-3 border border-border bg-background p-3">
          <span className={label}>{store}</span>
          <ul className="flex flex-col gap-1.5 text-[13px]">
            {items.map((item) => (
              <li key={item} className="flex items-center justify-between gap-2">
                <span className="truncate">{item}</span>
                <Check className="text-primary dark:text-[#c3caff]" />
              </li>
            ))}
          </ul>
          <span className="flex gap-1">
            {[0, 1, 2].map((shot) => (
              <span key={shot} className="flex h-14 flex-1 flex-col gap-1 border border-border bg-card p-1">
                <span className="h-1 w-1/2 bg-primary/50" />
                <span className="h-0.5 bg-muted-foreground/25" />
                <span className="h-0.5 bg-muted-foreground/25" />
                <span className="mt-auto h-1.5 bg-primary/60" />
              </span>
            ))}
          </span>
          <span className={cn(chipWaiting, "max-w-full self-start sm:whitespace-nowrap")}>
            <span className="size-1.5 animate-pulse bg-primary motion-reduce:animate-none" />
            Waiting for review
          </span>
        </div>
      ))}
    </div>
  )
}

function ReviewGraphic() {
  const stages = ["Submitted", "In review", "Approved"]
  return (
    <div className="flex flex-col gap-3">
      {["App Store", "Google Play"].map((store) => (
        <div key={store} className="flex flex-col gap-2.5 border border-border bg-background p-3">
          <span className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{store}</span>
            <span className={chipDone}>
              <Check className="size-2.5" />
              Approved
            </span>
          </span>
          <span className="grid grid-cols-3 gap-1">
            {stages.map((stage) => (
              <span key={stage} className="flex flex-col gap-1.5">
                <span className="h-1.5 bg-primary" />
                <span className="font-mono text-[10.5px] text-muted-foreground">{stage}</span>
              </span>
            ))}
          </span>
        </div>
      ))}
      <div className="flex gap-2.5 border-l-2 border-primary bg-primary/10 px-3 py-2 text-[13px] dark:bg-primary/20">
        <span className="font-mono text-[11px] text-primary dark:text-[#c3caff]">Reply</span>
        <span className="text-muted-foreground">Reviewer&apos;s question on sign-in answered with a demo account.</span>
      </div>
    </div>
  )
}

function LiveGraphic() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["App Store", "Google Play"].map((store) => (
        <div key={store} className="flex min-w-0 flex-col gap-3 border border-border bg-background p-3">
          <span className={label}>{store}</span>
          <span className="flex items-center gap-2.5">
            <AppMark className="size-11 shrink-0" />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold">Your app</span>
              <span className="truncate text-[11px] text-muted-foreground">Your company Ltd</span>
            </span>
          </span>
          <span className="bg-primary py-1 text-center text-xs font-semibold text-primary-foreground">
            {store === "App Store" ? "Get" : "Install"}
          </span>
          <span className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((shot) => (
              <span key={shot} className="flex h-20 flex-col gap-1 border border-border bg-card p-1">
                <span className="h-1 w-1/2 bg-primary/50" />
                <span className="h-0.5 bg-muted-foreground/25" />
                <span className="h-0.5 bg-muted-foreground/25" />
                <span className="mt-auto h-1.5 bg-primary/60" />
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

export function StepGraphic({ id }: { id: ReleaseStepId }) {
  if (id === "build") return <BuildGraphic />
  if (id === "test") return <TestGraphic />
  if (id === "submit") return <SubmitGraphic />
  if (id === "review") return <ReviewGraphic />
  return <LiveGraphic />
}

/** The window the section shows the current step's graphic in, like the heroes' cards. */
export function StepWindow({
  title,
  status,
  className,
  children,
}: {
  title: string
  status?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "corners flex flex-col border border-border bg-card text-card-foreground shadow-2xl shadow-black/25 [--corner:var(--foreground)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="size-2 bg-foreground/15" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{title}</span>
        {status && (
          <span className="ml-auto flex items-center gap-2 font-mono text-xs text-primary dark:text-[#c3caff]">
            <span className="size-1.5 animate-pulse bg-current motion-reduce:animate-none" />
            {status}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
