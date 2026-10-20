"use client"

import Link from "next/link"
import { useState } from "react"

import { ChoiceGroup } from "@/components/free-tools/choice-group"
import { ResultPanel } from "@/components/free-tools/result-panel"
import { Button } from "@/components/ui/button"
import { bookCallWith } from "@/lib/booking"
import {
  quizQuestions,
  scoreQuiz,
  verdicts,
  type QuizAnswers,
  type QuizVerdict,
} from "@/lib/free-tools/no-code-quiz"
import { pages } from "@/lib/seo"

// Where to go next from each verdict.
const nextSteps: Record<QuizVerdict, { href: string; label: string }[]> = {
  "no-code": [
    { href: "/blog/migrate-from-bubble", label: "How to move off Bubble when the time comes" },
    { href: `${pages.blog.path}#migration`, label: "All our no-code migration guides" },
  ],
  "start-no-code": [
    { href: "/tools/mvp-scope-planner", label: "Plan what the coded version launches with" },
    { href: `${pages.blog.path}#migration`, label: "Our no-code migration guides" },
  ],
  custom: [
    { href: "/tools/mvp-cost-calculator", label: "Estimate what the build costs" },
    { href: "/tools/mvp-scope-planner", label: "Cut it down to a first release" },
  ],
}

export function NoCodeQuiz() {
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const result = scoreQuiz(answers)
  const done = result.answered === quizQuestions.length
  const verdict = verdicts[result.verdict]

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
      <form
        aria-label="About your idea"
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-10 rounded-2xl border border-border bg-card p-5 sm:p-8"
      >
        {quizQuestions.map((question, index) => (
          <ChoiceGroup
            key={question.name}
            name={question.name}
            number={index + 1}
            legend={question.label}
            choices={question.options}
            columns={1}
            value={answers[question.name]}
            onChange={(value) => setAnswers((current) => ({ ...current, [question.name]: value }))}
          />
        ))}
      </form>

      <ResultPanel
        label="Your answer"
        progress={{ done: result.answered, total: quizQuestions.length }}
      >
        {!done ? (
          <p className="text-muted-foreground">
            Answer all {quizQuestions.length} questions to see whether no-code will do or your idea
            needs real code.
          </p>
        ) : (
          <>
            <h3 className="text-3xl tracking-tight text-balance">{verdict.title}</h3>
            <p className="text-pretty">{verdict.summary}</p>

            {result.reasons.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-border pt-5">
                <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  Why
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  {result.reasons.map((reason) => (
                    <li key={reason} className="flex gap-3">
                      <span aria-hidden="true" className="text-primary">
                        &rarr;
                      </span>
                      <span className="text-pretty">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Next
              </h4>
              <ul className="flex flex-col gap-2">
                {nextSteps[result.verdict].map((step) => (
                  <li key={step.href}>
                    <Link href={step.href} className="text-primary hover:underline">
                      {step.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant={result.verdict === "no-code" ? "outline" : "default"}
                nativeButton={false}
                render={
                  <Link
                    href={bookCallWith(
                      [
                        `Build or No-Code Quiz: ${verdict.title}.`,
                        ...quizQuestions.map((question) => {
                          const option = question.options.find((o) => o.value === answers[question.name])
                          return `${question.label} ${option?.label}`
                        }),
                      ].join("\n"),
                    )}
                  />
                }
                className="mt-2 h-11 rounded-full px-6 text-base"
              >
                Talk it through on a call
              </Button>
            </div>
          </>
        )}
      </ResultPanel>
    </div>
  )
}
