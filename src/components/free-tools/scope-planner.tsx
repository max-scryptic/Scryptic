"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { cn } from "cn"

import { ResultPanel } from "@/components/free-tools/result-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { bookCallWith } from "@/lib/booking"
import {
  commonFeatures,
  featureSizes,
  planScope,
  summarizeScope,
  type FeatureSize,
  type ScopeFeature,
} from "@/lib/free-tools/scope-planner"
import { formatPrice, services } from "@/lib/services"

const segment =
  "flex min-h-9 cursor-pointer items-center justify-center px-3 text-sm transition-colors select-none hover:text-foreground has-checked:bg-card has-checked:text-foreground has-checked:shadow-sm has-focus-visible:ring-3 has-focus-visible:ring-ring/50"

/*
 * The MVP Scope Planner: an editable feature list on one side, and on the
 * other how big the first release is and which package it fits.
 */
export function ScopePlanner() {
  const nextId = useRef(1)
  const [features, setFeatures] = useState<ScopeFeature[]>([
    { id: "f0", name: "", size: "medium", launch: true },
  ])
  const plan = planScope(features)
  const scale = Math.max(3, Math.ceil(plan.launchWeeks))
  const listed = new Set(features.map((feature) => feature.name.trim().toLowerCase()))

  function add(name = "", size: FeatureSize = "medium") {
    const id = `f${nextId.current++}`
    setFeatures((current) => [...current, { id, name, size, launch: true }])
    return id
  }

  function update(id: string, change: Partial<ScopeFeature>) {
    setFeatures((current) =>
      current.map((feature) => (feature.id === id ? { ...feature, ...change } : feature)),
    )
  }

  function remove(id: string) {
    setFeatures((current) => current.filter((feature) => feature.id !== id))
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div className="corners flex flex-col gap-8 border border-border bg-card p-5 sm:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium tracking-tight">Your features</h2>
          <p className="text-sm text-muted-foreground">
            Name each thing a user can do, size it and choose whether it is in the first release.
            Sign up, log in, email and analytics come with every build, so leave them out.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <li
              key={feature.id}
              data-row={feature.id}
              className={cn(
                "flex flex-col gap-3 border border-border p-3 transition-colors",
                feature.launch ? "bg-background" : "bg-muted/60",
              )}
            >
              <div className="flex items-center gap-2">
                <Input
                  aria-label={`Feature ${index + 1}`}
                  placeholder={index === 0 ? "Your core feature, e.g. book a lesson" : "Feature"}
                  value={feature.name}
                  onChange={(event) => update(feature.id, { name: event.target.value })}
                  className={cn("h-10 bg-card", !feature.launch && "text-muted-foreground line-through")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => remove(feature.id)}
                  aria-label={`Remove ${feature.name.trim() || `feature ${index + 1}`}`}
                  className="shrink-0 text-muted-foreground"
                >
                  <span aria-hidden="true" className="text-lg">
                    &times;
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <fieldset className="flex bg-muted p-1 text-muted-foreground">
                  <legend className="sr-only">Size of {feature.name.trim() || `feature ${index + 1}`}</legend>
                  {featureSizes.map((size) => (
                    <label key={size.value} title={size.hint} className={segment}>
                      <input
                        type="radio"
                        name={`size-${feature.id}`}
                        checked={feature.size === size.value}
                        onChange={() => update(feature.id, { size: size.value })}
                        className="sr-only"
                      />
                      {size.label}
                    </label>
                  ))}
                </fieldset>
                <fieldset className="flex bg-muted p-1 text-muted-foreground">
                  <legend className="sr-only">When to build {feature.name.trim() || `feature ${index + 1}`}</legend>
                  {[
                    { launch: true, label: "First release" },
                    { launch: false, label: "Later" },
                  ].map((option) => (
                    <label key={option.label} className={segment}>
                      <input
                        type="radio"
                        name={`when-${feature.id}`}
                        checked={feature.launch === option.launch}
                        onChange={() => update(feature.id, { launch: option.launch })}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </fieldset>
              </div>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            const id = add()
            // Put the cursor in the new row once it has rendered.
            requestAnimationFrame(() =>
              document.querySelector<HTMLInputElement>(`[data-row="${id}"] input`)?.focus(),
            )
          }}
          className="h-11 self-start px-5 text-base"
        >
          <span aria-hidden="true">+</span> Add a feature
        </Button>

        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <h3 className="text-sm font-medium">Common features</h3>
          <ul className="flex flex-wrap gap-2">
            {commonFeatures
              .filter((common) => !listed.has(common.name.toLowerCase()))
              .map((common) => (
                <li key={common.name}>
                  <button
                    type="button"
                    onClick={() => add(common.name, common.size)}
                    className="border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span aria-hidden="true">+ </span>
                    {common.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <ResultPanel label="Your first release">
        {plan.launch.length === 0 ? (
          <p className="text-muted-foreground">
            Name a feature to see how big the first release is and which package it fits.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-medium tracking-tight sm:text-5xl">
                {plan.weeks} {plan.weeks === 1 ? "week" : "weeks"}
              </p>
              <p className="text-muted-foreground">
                of development for {plan.launch.length}{" "}
                {plan.launch.length === 1 ? "feature" : "features"}, {formatPrice(plan.price)} + VAT
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative h-3 overflow-hidden bg-muted">
                <div
                  className={cn(
                    "h-full transition-[width] duration-300",
                    plan.service ? "bg-primary" : "bg-chart-2",
                  )}
                  style={{ width: `${Math.min(100, (plan.launchWeeks / scale) * 100)}%` }}
                />
                {services.map((service) => (
                  <span
                    key={service.id}
                    aria-hidden="true"
                    className="absolute inset-y-0 w-0.5 bg-card"
                    style={{ left: `${(service.developmentWeeks / scale) * 100}%` }}
                  />
                ))}
              </div>
              <div className="relative h-4 font-mono text-[0.7rem] text-muted-foreground">
                {services.map((service) => (
                  <span
                    key={service.id}
                    className="absolute -translate-x-1/2 whitespace-nowrap"
                    style={{ left: `${(service.developmentWeeks / scale) * 100}%` }}
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>

            {plan.service ? (
              <p className="text-pretty">
                That fits the <strong className="font-medium">{plan.service.name}</strong>: launched
                after a {plan.service.sprint}, then a week of handover.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-pretty">
                  That is more than the {plan.largest.name}&apos;s {plan.largest.developmentWeeks}{" "}
                  weeks of development. To launch sooner, move these to later:
                </p>
                <ul className="flex flex-col gap-2">
                  {plan.toMove.map((feature) => (
                    <li key={feature.id} className="flex items-center justify-between gap-3 bg-chart-2/15 px-4 py-2 text-sm">
                      <span>{feature.name}</span>
                      <button
                        type="button"
                        onClick={() => update(feature.id, { launch: false })}
                        className="shrink-0 font-medium text-primary hover:underline"
                      >
                        Move to later
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan.later.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-border pt-5">
                <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Saved for later
                </h3>
                <ul className="flex flex-wrap gap-2 text-sm">
                  {plan.later.map((feature) => (
                    <li key={feature.id} className="bg-muted px-3 py-1">
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={bookCallWith(summarizeScope(plan))} />}
                className="h-11 px-6 text-base"
              >
                Book a call about this scope
              </Button>
              <p className="text-xs text-pretty text-muted-foreground">
                Sizes are rules of thumb. On the call we size each feature properly and agree the
                first release before any build starts. Your list comes with you.
              </p>
            </div>
          </>
        )}
      </ResultPanel>
    </div>
  )
}
