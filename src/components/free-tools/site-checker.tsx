"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { bookCallWith } from "@/lib/booking"
import {
  grade,
  type CheckResult,
  type CheckStatus,
  type SiteCheckKind,
  type SiteReport,
} from "@/lib/free-tools/site-check"

const statusOrder: Record<CheckStatus, number> = { fail: 0, warn: 1, pass: 2 }

const statusStyle: Record<CheckStatus, { label: string; className: string; icon: React.ReactNode }> = {
  pass: {
    label: "Pass",
    className: "bg-primary/10 text-primary",
    icon: <path d="M20 6 9 17l-5-5" />,
  },
  warn: {
    label: "Improve",
    className: "bg-chart-2/20 text-foreground",
    icon: <path d="M12 8v5M12 16.5h.01" />,
  },
  fail: {
    label: "Fix",
    className: "bg-destructive/10 text-destructive",
    icon: <path d="M18 6 6 18M6 6l12 12" />,
  },
}

type State =
  | { phase: "idle" }
  | { phase: "checking"; url: string }
  | { phase: "error"; message: string }
  | { phase: "done"; report: SiteReport }

/*
 * The form and report for the Agent Readiness Check and the SEO Check. The
 * checks run on the server (POST /api/site-check), since a browser cannot read
 * another site's robots.txt or HTML.
 */
export function SiteChecker({ kind }: { kind: SiteCheckKind }) {
  const [state, setState] = useState<State>({ phase: "idle" })
  const checking = state.phase === "checking"

  async function run(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const url = String(new FormData(event.currentTarget).get("url") ?? "").trim()
    if (!url) return setState({ phase: "error", message: "Enter a website address." })
    setState({ phase: "checking", url })
    try {
      const response = await fetch("/api/site-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, kind }),
      })
      const data = await response.json()
      if (!response.ok) return setState({ phase: "error", message: data.error ?? "That check did not work." })
      setState({ phase: "done", report: data as SiteReport })
    } catch {
      setState({ phase: "error", message: "Could not reach the checker. Check your connection and try again." })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={run}
        aria-label={kind === "agent" ? "Check a site for AI agents" : "Check a page for SEO"}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:p-8"
      >
        <label htmlFor={`${kind}-url`} className="font-medium">
          {kind === "agent" ? "Website address" : "Page address"}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id={`${kind}-url`}
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="yourcompany.com"
            aria-describedby={state.phase === "error" ? `${kind}-error` : undefined}
            aria-invalid={state.phase === "error" || undefined}
            className="h-12 flex-1 bg-background text-base md:text-base"
          />
          <Button type="submit" size="lg" disabled={checking} className="h-12 rounded-full px-6 text-base">
            {checking ? "Checking..." : kind === "agent" ? "Check my site" : "Run the audit"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {kind === "agent"
            ? "Checks the home page, robots.txt, llms.txt and sitemap the way an AI crawler sees them."
            : "Checks the page you enter, plus the site's robots.txt and sitemap."}{" "}
          Takes a few seconds. Nothing is stored.
        </p>
        {state.phase === "error" && (
          <p id={`${kind}-error`} role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        )}
      </form>

      <div aria-live="polite" aria-busy={checking}>
        {checking && (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-muted-foreground sm:p-8">
            <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent motion-reduce:animate-none" />
            Fetching {state.url} and reading it like {kind === "agent" ? "an AI crawler" : "a search engine"}...
          </div>
        )}
        {state.phase === "done" && <Report report={state.report} />}
      </div>
    </div>
  )
}

function Report({ report }: { report: SiteReport }) {
  const checks = [...report.checks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
  const counts = { pass: 0, warn: 0, fail: 0 }
  for (const check of checks) counts[check.status]++
  const toFix = checks.filter((check) => check.status !== "pass")
  const host = new URL(report.url).host
  const name = report.kind === "agent" ? "Agent Readiness Check" : "SEO Check"

  return (
    <section
      aria-label={`Results for ${host}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="grid gap-6 border-b border-border p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <ScoreRing score={report.score} />
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-widest break-all text-primary uppercase">{host}</p>
          <h2 className="text-3xl tracking-tight">{grade(report.score)}</h2>
          <p className="text-muted-foreground">
            {counts.pass} passed, {counts.warn} to improve and {counts.fail} to fix.
          </p>
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {checks.map((check) => (
          <CheckRow key={check.id} check={check} />
        ))}
      </ul>

      <div className="flex flex-col items-start gap-3 border-t border-border bg-muted/40 p-5 sm:p-8">
        <h3 className="text-xl tracking-tight">
          {toFix.length ? "Want these fixed?" : "Building something new?"}
        </h3>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          {toFix.length
            ? "Most of these are a day's work for a developer who knows where to look. Book a call and we will go through the report with you."
            : "Every app we build launches with all of this in place. Book a call to talk about yours."}
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={
            <Link
              href={bookCallWith(
                [
                  `${name} for ${report.url}: ${report.score}/100.`,
                  ...toFix.map((check) => `- ${check.label}: ${check.detail}`),
                ].join("\n"),
              )}
            />
          }
          className="h-11 rounded-full px-6 text-base"
        >
          Book a call about this report
        </Button>
      </div>
    </section>
  )
}

function CheckRow({ check }: { check: CheckResult }) {
  const style = statusStyle[check.status]
  return (
    <li className="flex gap-4 p-5 sm:px-8">
      <span
        className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", style.className)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-4"
        >
          {style.icon}
        </svg>
        <span className="sr-only">{style.label}</span>
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-medium">{check.label}</h3>
        <p className="text-sm break-words text-muted-foreground">{check.detail}</p>
        {check.fix && <p className="text-sm text-pretty">{check.fix}</p>}
      </div>
    </li>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="8" className="stroke-muted" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          className={cn(
            "transition-[stroke-dashoffset] duration-700",
            score >= 70 ? "stroke-primary" : score >= 50 ? "stroke-chart-2" : "stroke-destructive",
          )}
        />
      </svg>
      <p className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-medium tracking-tight">{score}</span>
        <span className="font-mono text-xs text-muted-foreground">out of 100</span>
      </p>
    </div>
  )
}
