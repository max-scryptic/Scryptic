"use client"

import Link from "next/link"
import { useState } from "react"

import { ChoiceGroup } from "@/components/free-tools/choice-group"
import { ResultPanel } from "@/components/free-tools/result-panel"
import { Button } from "@/components/ui/button"
import { bookCallWith } from "@/lib/booking"
import {
  costQuestions,
  estimateCost,
  formatRange,
  summarizeEstimate,
  type CostAnswers,
} from "@/lib/free-tools/cost-calculator"
import { formatPrice, launchOffer, offerPrice, weeklyRate } from "@/lib/services"

/*
 * The MVP Cost Calculator: every question on the page, with the estimate in a
 * panel beside them (below on phones) that updates as each answer comes in.
 */
export function CostCalculator() {
  const [answers, setAnswers] = useState<CostAnswers>({})
  const estimate = estimateCost(answers)
  const done = estimate.answered === costQuestions.length
  const { service } = estimate

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
      <form
        aria-label="About your app"
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-10 rounded-2xl border border-border bg-card p-5 sm:p-8"
      >
        {costQuestions.map((question, index) => (
          <ChoiceGroup
            key={question.name}
            name={question.name}
            number={index + 1}
            legend={question.label}
            description={question.description}
            choices={question.options}
            value={answers[question.name]}
            onChange={(value) => setAnswers((current) => ({ ...current, [question.name]: value }))}
          />
        ))}

        {/* On phones the estimate sits below every question, so keep the running total in view. */}
        {estimate.answered > 0 && (
          <a
            href="#estimate"
            className="sticky bottom-4 -mx-1 flex items-center justify-between gap-4 rounded-xl bg-primary px-4 py-3 text-primary-foreground shadow-xl shadow-black/20 lg:hidden"
          >
            <span className="font-medium">{formatRange(estimate.price, estimate.maxPrice)} + VAT</span>
            <span className="text-sm">
              {done ? "See your estimate" : `${estimate.answered} of ${costQuestions.length}`}{" "}
              <span aria-hidden="true">&darr;</span>
            </span>
          </a>
        )}
      </form>

      <ResultPanel
        id="estimate"
        label="Your estimate"
        progress={{ done: estimate.answered, total: costQuestions.length }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-medium tracking-tight sm:text-5xl">
            {formatRange(estimate.price, estimate.maxPrice)}
          </p>
          <p className="text-muted-foreground">
            + VAT,{" "}
            {estimate.weeks === estimate.maxWeeks
              ? `${estimate.weeks} ${estimate.weeks === 1 ? "week" : "weeks"}`
              : `${estimate.weeks} to ${estimate.maxWeeks} weeks`}{" "}
            of development at {formatPrice(weeklyRate)} a week
            {done ? "" : ", so far"}
          </p>
        </div>

        {service ? (
          <p className="text-pretty">
            That is our <strong className="font-medium">{service.name}</strong> package: launched
            after a {service.sprint}, then a week of handover.
            {launchOffer && (
              <>
                {" "}
                With {launchOffer.percentOff}% off {launchOffer.appliesTo}, it is{" "}
                <strong className="font-medium text-primary">{offerPrice(service)}</strong>.
              </>
            )}
          </p>
        ) : (
          <p className="text-pretty">
            That is past our fixed-price packages, so it would be a custom build: launch after
            about {estimate.sprintWeeks} weeks, then a week of handover. Most builds this size
            launch faster as phases, starting with the core on the Extended MVP.
          </p>
        )}

        {estimate.drivers.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              What drives the price
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {estimate.drivers.map((driver) => (
                <li key={driver.label} className="flex justify-between gap-4">
                  <span>{driver.label}</span>
                  <span className="shrink-0 font-mono text-muted-foreground">
                    +{driver.weeks} wk
                  </span>
                </li>
              ))}
            </ul>
            {estimate.saving && (
              <p className="rounded-xl bg-primary/10 p-4 text-sm text-pretty">
                Leave <strong className="font-medium">{estimate.saving.label.toLowerCase()}</strong>{" "}
                for a later phase and the first release comes to about{" "}
                <strong className="font-medium">{formatPrice(estimate.saving.price)}</strong>.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={bookCallWith(summarizeEstimate(answers, estimate))} />}
            className="h-11 rounded-full px-6 text-base"
          >
            Book a call about this estimate
          </Button>
          <p className="text-xs text-pretty text-muted-foreground">
            A ballpark, not a quote. The scope and a fixed price are agreed on the call, before any
            build starts. Your answers come with you.
          </p>
        </div>
      </ResultPanel>
    </div>
  )
}
