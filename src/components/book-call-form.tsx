"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  bookingDestination,
  bookingQuestions,
  underMinimumBudget,
  type BookingAnswers,
} from "@/lib/booking"
import { siteConfig } from "@/lib/site"

type Errors = Partial<Record<string, string>>

const steps = ["A few questions", "Pick a time"]

/*
 * The qualifying form on /book-a-call. Validation runs here rather than in the
 * browser so every unanswered question gets an inline message at once; on
 * success the visitor goes straight to the booking link with their answers.
 */
export function BookCallForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [budget, setBudget] = useState("")
  const [destination, setDestination] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sendsEmail = !siteConfig.bookingUrl

  // The confirmation is much shorter than the form, so bring it back into view.
  useEffect(() => {
    if (destination) cardRef.current?.scrollIntoView({ block: "start" })
  }, [destination])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? "").trim()

    const next: Errors = {}
    if (!value("name")) next.name = "Add your name."
    const email = form.elements.namedItem("email") as HTMLInputElement
    if (!value("email")) next.email = "Add your email."
    else if (!email.validity.valid) next.email = "Check the email address."
    for (const question of bookingQuestions) {
      if (!value(question.name)) next[question.name] = "Choose one."
    }

    setErrors(next)
    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid)
      const target = field instanceof RadioNodeList ? field[0] : field
      if (target instanceof HTMLElement) target.focus()
      return
    }

    const answers = Object.fromEntries(
      ["name", "email", "details", ...bookingQuestions.map((q) => q.name)].map((name) => [
        name,
        value(name),
      ]),
    ) as BookingAnswers

    const href = bookingDestination(answers)
    setDestination(href)
    window.location.assign(href)
  }

  function clearError(name: string) {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const step = destination ? 1 : 0

  return (
    <div
      ref={cardRef}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/5 sm:scroll-mt-32"
    >
      <ol className="grid grid-cols-2 border-b border-border font-mono text-xs">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={index === step ? "step" : undefined}
            className={cn(
              "flex items-center gap-2 px-5 py-4 sm:px-8",
              index === step ? "text-foreground" : "text-muted-foreground",
              index > 0 && "border-l border-border",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border",
                index <= step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border",
              )}
            >
              {index + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      {destination ? (
        <div role="status" className="flex flex-col items-start gap-4 p-5 sm:p-8">
          <h2 className="text-2xl tracking-tight">
            {sendsEmail ? "Check your email app" : "Opening the calendar"}
          </h2>
          <p className="text-pretty text-muted-foreground">
            {sendsEmail
              ? "A message with your answers should have opened. Send it and we will reply with times for your call."
              : "Your answers are attached, so pick a time that suits you and the call can start where it matters."}
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={destination} />}
            className="h-11 rounded-full px-5 text-base"
          >
            {sendsEmail ? "Open the email again" : "Go to the calendar"}
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-8 p-5 sm:p-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl tracking-tight">Tell us about your project</h2>
            <p className="text-sm text-muted-foreground">
              Takes about a minute. Then you pick a time.
            </p>
          </div>

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.name || undefined}>
              <FieldLabel htmlFor="book-name">Name</FieldLabel>
              <Input
                id="book-name"
                name="name"
                autoComplete="name"
                aria-invalid={!!errors.name || undefined}
                onChange={() => clearError("name")}
                aria-describedby={errors.name ? "book-name-error" : undefined}
                className="h-10"
              />
              <FieldError id="book-name-error">{errors.name}</FieldError>
            </Field>
            <Field data-invalid={!!errors.email || undefined}>
              <FieldLabel htmlFor="book-email">Email</FieldLabel>
              <Input
                id="book-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email || undefined}
                onChange={() => clearError("email")}
                aria-describedby={errors.email ? "book-email-error" : undefined}
                className="h-10"
              />
              <FieldError id="book-email-error">{errors.email}</FieldError>
            </Field>
          </FieldGroup>

          {bookingQuestions.map((question) => {
            const error = errors[question.name]
            const errorId = `book-${question.name}-error`

            return (
              <FieldSet
                key={question.name}
                aria-describedby={error ? errorId : undefined}
              >
                <FieldLegend variant="label" className="mb-3">
                  {question.label}
                </FieldLegend>
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex min-h-10 cursor-pointer items-center rounded-full border bg-background px-4 text-sm transition-colors select-none hover:border-foreground/30",
                        "has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground",
                        "has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                        error ? "border-destructive" : "border-border",
                      )}
                    >
                      <input
                        type="radio"
                        name={question.name}
                        value={option}
                        className="sr-only"
                        onChange={() => {
                          if (question.name === "budget") setBudget(option)
                          clearError(question.name)
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {question.name === "budget" && budget === underMinimumBudget && (
                  <FieldDescription>
                    Full builds start at £10k. The call is still worth booking: we can scope a
                    smaller first release, or point you to a better fit.
                  </FieldDescription>
                )}
                <FieldError id={errorId}>{error}</FieldError>
              </FieldSet>
            )
          })}

          <Field>
            <FieldLabel htmlFor="book-details">
              Anything else we should know?{" "}
              <span className="font-normal text-muted-foreground">Optional</span>
            </FieldLabel>
            <Textarea
              id="book-details"
              name="details"
              rows={3}
              placeholder="A link to your site or deck, what is stuck, what a good outcome looks like"
              className="min-h-24"
            />
          </Field>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <Button type="submit" size="lg" className="h-11 rounded-full px-5 text-base sm:self-start">
              Continue to booking
              <span aria-hidden="true">&rarr;</span>
            </Button>
            <p className="text-xs text-muted-foreground">
              {sendsEmail
                ? "Your answers go into an email to us, so you can check them before sending."
                : "Your answers are passed to the booking page and only used to prepare for your call."}
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
