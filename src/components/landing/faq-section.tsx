import { cn } from "cn"

import { SectionHeading } from "@/components/landing/section-heading"
import { inset } from "@/lib/frame"

export type Faq = { question: string; answer: string }

/**
 * Questions as disclosure rows. Emit faqJsonLd() with exactly the same items:
 * markup must match what the page shows.
 */
export function FaqSection({ faqs, intro }: { faqs: Faq[]; intro: React.ReactNode }) {
  return (
    <section aria-labelledby="faq-heading" id="faq" className="scroll-mt-4 px-4 py-24 sm:px-6">
      <div className={cn("mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]", inset)}>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" id="faq-heading">
          {intro}
        </SectionHeading>
        <div data-reveal="children" className="flex flex-col divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-lg text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-4 text-pretty text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
