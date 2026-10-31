"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "cn"

import { ChoiceGroup } from "@/components/free-tools/choice-group"
import { Button } from "@/components/ui/button"
import {
  buildChecklist,
  checklistMarkdown,
  checklistQuestions,
  type ChecklistAnswers,
} from "@/lib/free-tools/launch-checklist"

/*
 * The App Launch Checklist: the questions on one side, and on the other the
 * checklist they produce, which updates as answers change and can be ticked
 * off and copied out as Markdown.
 */
export function LaunchChecklist() {
  const [answers, setAnswers] = useState<ChecklistAnswers>({})
  const [done, setDone] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const groups = buildChecklist(answers)
  const items = groups.flatMap((group) => group.items)
  const doneCount = items.filter((item) => done.has(item.id)).length

  function toggle(id: string) {
    setDone((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(checklistMarkdown(groups, done))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
      <form
        aria-label="About your launch"
        onSubmit={(event) => event.preventDefault()}
        className="corners flex flex-col gap-8 border border-border bg-card p-5 sm:p-8 lg:sticky lg:top-28"
      >
        {checklistQuestions.map((question, index) => (
          <ChoiceGroup
            key={question.name}
            name={question.name}
            number={index + 1}
            legend={question.label}
            choices={question.options}
            value={answers[question.name]}
            onChange={(value) => setAnswers((current) => ({ ...current, [question.name]: value }))}
          />
        ))}
      </form>

      <section
        aria-labelledby="checklist-heading"
        className="corners flex flex-col border border-border bg-card shadow-xl shadow-black/5"
      >
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="checklist-heading" className="font-mono text-xs tracking-widest text-primary uppercase">
              Your launch checklist
            </h2>
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
                {doneCount} of {items.length} done
              </p>
              <Button type="button" variant="outline" size="sm" onClick={copy} className="px-3">
                {copied ? "Copied" : "Copy as Markdown"}
              </Button>
            </div>
          </div>
          <div className="h-1 overflow-hidden bg-muted" aria-hidden="true">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${items.length ? (doneCount / items.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 p-5 sm:p-8">
          {groups.map((group) => (
            <div key={group.name} className="flex flex-col gap-3">
              <h3 className="text-lg font-medium tracking-tight">{group.name}</h3>
              <ul className="flex flex-col divide-y divide-border border border-border">
                {group.items.map((item) => (
                  <li key={item.id} className="flex gap-3 p-4">
                    <input
                      id={`check-${item.id}`}
                      type="checkbox"
                      checked={done.has(item.id)}
                      onChange={() => toggle(item.id)}
                      className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary"
                    />
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor={`check-${item.id}`}
                        className={cn(
                          "cursor-pointer font-medium text-pretty",
                          done.has(item.id) && "text-muted-foreground line-through",
                        )}
                      >
                        {item.text}
                      </label>
                      <p className="text-sm text-pretty text-muted-foreground">{item.detail}</p>
                      {item.link && (
                        <Link href={item.link.href} className="text-sm text-primary hover:underline">
                          {item.link.label}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-xs text-pretty text-muted-foreground">
            A starting point, not legal or tax advice. Check the legal and VAT items with an adviser
            for your situation.
          </p>
        </div>
      </section>
    </div>
  )
}
