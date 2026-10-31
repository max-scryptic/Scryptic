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
  detailsParam,
  underMinimumBudget,
  type BookingAnswers,
  type BookingQuestion,
} from "@/lib/booking"
import { siteConfig } from "@/lib/site"

type Errors = Partial<Record<string, string>>

type Slide =
  | { kind: "question"; question: BookingQuestion }
  | { kind: "details" }
  | { kind: "contact" }

const steps = ["A few questions", "Pick a time"]

/** One question per slide: the qualifying questions, then anything else, then who to book. */
const slides: Slide[] = [
  ...bookingQuestions.map((question) => ({ kind: "question" as const, question })),
  { kind: "details" },
  { kind: "contact" },
]

const lastSlide = slides.length - 1

function fieldsOn(slide: Slide) {
  if (slide.kind === "question") return [slide.question.name]
  if (slide.kind === "contact") return ["name", "email"]
  return []
}

/*
 * The qualifying form on /book-a-call, as a wizard with one question per
 * slide. Every slide stays mounted (just hidden) inside a single form, so the
 * answers are read straight from the form data at the end. Picking an option
 * with a pointer moves on by itself; keyboard users move on with Enter or the
 * Next button, so arrowing through the options never skips a slide. On
 * success the visitor goes straight to the booking link with their answers.
 */
export function BookCallForm() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [errors, setErrors] = useState<Errors>({})
  const [budget, setBudget] = useState("")
  const [destination, setDestination] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const pickedWithPointer = useRef(false)
  const autoAdvance = useRef<ReturnType<typeof setTimeout>>(undefined)
  const moved = useRef(false)
  const detailsRef = useRef<HTMLTextAreaElement>(null)
  const sendsEmail = !siteConfig.bookingUrl

  // A free tool can send its result along (see bookCallWith): start the details box with it.
  useEffect(() => {
    const details = new URLSearchParams(window.location.search).get(detailsParam)
    if (details && detailsRef.current && !detailsRef.current.value) detailsRef.current.value = details
  }, [])

  // Keep the card in view: the confirmation and some slides are shorter than others.
  useEffect(() => {
    if (destination) cardRef.current?.scrollIntoView({ block: "start" })
  }, [destination])

  // After moving between slides, put focus on the new slide's first field.
  useEffect(() => {
    if (!moved.current) return
    const slide = formRef.current?.querySelector<HTMLElement>(`[data-slide="${current}"]`)
    const target =
      slide?.querySelector<HTMLElement>("input:checked") ??
      slide?.querySelector<HTMLElement>("input, textarea")
    target?.focus({ preventScroll: true })
    const card = cardRef.current
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: "start" })
  }, [current])

  useEffect(() => () => clearTimeout(autoAdvance.current), [])

  function validate(form: HTMLFormElement, indexes: number[]) {
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? "").trim()
    const found: Errors = {}

    for (const index of indexes) {
      for (const name of fieldsOn(slides[index])) {
        if (name === "name") {
          if (!value("name")) found.name = "Add your name."
        } else if (name === "email") {
          const email = form.elements.namedItem("email") as HTMLInputElement
          if (!value("email")) found.email = "Add your email."
          else if (!email.validity.valid) found.email = "Check the email address."
        } else if (!value(name)) {
          found[name] = "Choose one."
        }
      }
    }
    return found
  }

  function goTo(index: number) {
    clearTimeout(autoAdvance.current)
    moved.current = true
    setDirection(index < current ? "back" : "forward")
    setCurrent(index)
  }

  function focusFirstInvalid(form: HTMLFormElement, found: Errors) {
    const firstInvalid = Object.keys(found)[0]
    if (!firstInvalid) return
    const field = form.elements.namedItem(firstInvalid)
    const target = field instanceof RadioNodeList ? field[0] : field
    if (target instanceof HTMLElement) target.focus()
  }

  function next() {
    const form = formRef.current
    if (!form) return
    const found = validate(form, [current])
    setErrors((existing) => ({ ...existing, ...found }))
    if (Object.keys(found).length) return focusFirstInvalid(form, found)
    goTo(current + 1)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (current < lastSlide) return next()

    const form = event.currentTarget
    const found = validate(form, slides.map((_, index) => index))
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      const index = slides.findIndex((slide) => fieldsOn(slide).includes(firstInvalid))
      if (index === current) focusFirstInvalid(form, found)
      else goTo(index)
      return
    }

    const data = new FormData(form)
    const answers = Object.fromEntries(
      ["name", "email", "details", ...bookingQuestions.map((q) => q.name)].map((name) => [
        name,
        String(data.get(name) ?? "").trim(),
      ]),
    ) as BookingAnswers

    const href = bookingDestination(answers)
    setDestination(href)
    window.location.assign(href)
  }

  function clearError(name: string) {
    if (errors[name]) setErrors((existing) => ({ ...existing, [name]: undefined }))
  }

  function handlePick(question: BookingQuestion, option: string) {
    if (question.name === "budget") setBudget(option)
    clearError(question.name)

    const byPointer = pickedWithPointer.current
    pickedWithPointer.current = false
    // Stay put on an under-minimum budget so the note about it can be read.
    if (!byPointer || option === underMinimumBudget) return
    clearTimeout(autoAdvance.current)
    autoAdvance.current = setTimeout(() => goTo(current + 1), 250)
  }

  const step = destination ? 1 : 0
  const progress = ((current + 1) / slides.length) * 100

  return (
    <div
      ref={cardRef}
      className="corners flex scroll-mt-28 flex-col border border-border bg-card shadow-xl shadow-black/5 sm:scroll-mt-32"
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
                "flex size-6 shrink-0 items-center justify-center border",
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
            className="h-11 px-5 text-base"
          >
            {sendsEmail ? "Open the email again" : "Go to the calendar"}
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          aria-label="Tell us about your project"
          className="flex flex-col gap-8 p-5 sm:p-8"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted-foreground">
              <p aria-live="polite">
                Question {current + 1} of {slides.length}
              </p>
              {current === 0 && <p>Takes about a minute</p>}
            </div>
            <div className="h-1 overflow-hidden bg-muted" aria-hidden="true">
              <div
                className="h-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-56">
            {slides.map((slide, index) => (
              <div
                key={slide.kind === "question" ? slide.question.name : slide.kind}
                data-slide={index}
                hidden={index !== current}
                className={cn(
                  "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300",
                  direction === "forward"
                    ? "motion-safe:slide-in-from-right-4"
                    : "motion-safe:slide-in-from-left-4",
                )}
              >
                {slide.kind === "question" && (
                  <QuestionSlide
                    question={slide.question}
                    error={errors[slide.question.name]}
                    budget={budget}
                    onPointerPick={() => (pickedWithPointer.current = true)}
                    onPick={(option) => handlePick(slide.question, option)}
                  />
                )}

                {slide.kind === "details" && (
                  <Field>
                    <FieldLabel
                      htmlFor="book-details"
                      className="text-2xl font-normal tracking-tight"
                    >
                      Anything else we should know?
                    </FieldLabel>
                    <FieldDescription>
                      Optional. A link to your site or deck, what is stuck, or what a good outcome
                      looks like.
                    </FieldDescription>
                    <Textarea
                      ref={detailsRef}
                      id="book-details"
                      name="details"
                      rows={4}
                      className="min-h-32"
                    />
                  </Field>
                )}

                {slide.kind === "contact" && (
                  <FieldSet>
                    <FieldLegend className="mb-1 font-normal tracking-tight data-[variant=legend]:text-2xl">
                      Where should we send the invite?
                    </FieldLegend>
                    <FieldDescription className="mb-4">
                      Your name and email are filled in on the booking page for you.
                    </FieldDescription>
                    <FieldGroup className="gap-5">
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
                  </FieldSet>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <div className="flex items-center justify-between gap-3">
              {current > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={() => goTo(current - 1)}
                  className="h-11 px-4 text-base"
                >
                  <span aria-hidden="true">&larr;</span>
                  Back
                </Button>
              ) : (
                <span />
              )}
              <Button type="submit" size="lg" className="h-11 px-5 text-base">
                {current === lastSlide ? "Continue to booking" : "Next"}
                <span aria-hidden="true">&rarr;</span>
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

function QuestionSlide({
  question,
  error,
  budget,
  onPointerPick,
  onPick,
}: {
  question: BookingQuestion
  error?: string
  budget: string
  onPointerPick: () => void
  onPick: (option: string) => void
}) {
  const errorId = `book-${question.name}-error`

  return (
    <FieldSet aria-describedby={error ? errorId : undefined}>
      <FieldLegend className="mb-5 font-normal tracking-tight data-[variant=legend]:text-2xl">
        {question.label}
      </FieldLegend>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <label
            key={option}
            onPointerDown={onPointerPick}
            className={cn(
              "flex min-h-12 cursor-pointer items-center border bg-background px-4 text-base transition-colors select-none hover:border-foreground/30",
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
              onChange={() => onPick(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {question.name === "budget" && budget === underMinimumBudget && (
        <FieldDescription>
          MVP builds start from £10,000 + VAT. The call is still worth booking: we can scope a smaller
          first release, or point you to a better fit.
        </FieldDescription>
      )}
      <FieldError id={errorId}>{error}</FieldError>
    </FieldSet>
  )
}
