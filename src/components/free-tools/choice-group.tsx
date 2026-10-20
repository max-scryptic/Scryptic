"use client"

import { cn } from "cn"

import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field"

export type Choice = { value: string; label: string; hint?: string }

/**
 * One multiple-choice question in a free tool: a legend and a set of radio
 * cards, the same look as the questions on /book-a-call. Controlled, so the
 * tool can work out its result as answers come in.
 */
export function ChoiceGroup({
  name,
  legend,
  description,
  choices,
  value,
  onChange,
  number,
  columns = 2,
}: {
  name: string
  legend: string
  description?: string
  choices: Choice[]
  value: string | undefined
  onChange: (value: string) => void
  /** Shown before the legend, e.g. 1 for "01". */
  number?: number
  columns?: 1 | 2
}) {
  return (
    <FieldSet className="gap-3">
      {/* A direct child of the fieldset, so it names the group for screen readers. */}
      <FieldLegend className="mb-3 flex gap-3 font-medium tracking-tight data-[variant=legend]:text-lg">
        {number !== undefined && (
          <span aria-hidden="true" className="w-6 shrink-0 pt-1 font-mono text-sm text-primary">
            {String(number).padStart(2, "0")}
          </span>
        )}
        <span>{legend}</span>
      </FieldLegend>
      {description && (
        <FieldDescription className={cn("-mt-2", number !== undefined && "pl-9")}>
          {description}
        </FieldDescription>
      )}
      <div className={cn("grid gap-2", columns === 2 && "sm:grid-cols-2")}>
        {choices.map((choice) => (
          <label
            key={choice.value}
            className={cn(
              "group flex min-h-12 cursor-pointer flex-col justify-center gap-0.5 rounded-xl border border-border bg-background px-4 py-2.5 text-base transition-colors select-none hover:border-foreground/30",
              "has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground",
              "has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              className="sr-only"
            />
            <span>{choice.label}</span>
            {choice.hint && (
              <span className="text-sm text-muted-foreground group-has-checked:text-primary-foreground/80">
                {choice.hint}
              </span>
            )}
          </label>
        ))}
      </div>
    </FieldSet>
  )
}
