import { CostCalculator } from "@/components/free-tools/cost-calculator"
import { ToolPage } from "@/components/free-tools/tool-page"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"
import { formatPrice, services, weeklyRate } from "@/lib/services"

const tool = freeTool("mvp-cost-calculator")

export const metadata = createMetadata(toolPage(tool))

const faqs = [
  {
    question: "How much does an MVP cost to build in the UK?",
    answer: `Most MVPs we scope come to between one and three weeks of development, which at ${formatPrice(weeklyRate)} a week is ${formatPrice(weeklyRate)} to ${formatPrice(weeklyRate * 3)} plus VAT. ${services.map((s) => `The ${s.name} is ${s.price} for ${s.developmentWeeks} ${s.developmentWeeks === 1 ? "week" : "weeks"} of development`).join(" and ")}, each with a week of iteration and a week of handover included.`,
  },
  {
    question: "How does the calculator work out the price?",
    answer: `It starts from a one week build, which covers sign up and log in, a few core screens, email, analytics and deployment. Each answer adds the development time that part usually takes, the total is rounded to whole weeks and priced at ${formatPrice(weeklyRate)} a week, the same rate as our fixed-price packages.`,
  },
  {
    question: "Is the estimate a quote?",
    answer:
      "No, it is a ballpark to plan around. The real price comes from a short discovery call, where we agree the scope for the first release and a fixed price before any work starts.",
  },
  {
    question: "Why do iteration and handover not add to the price?",
    answer:
      "Because they are part of every package. After development there is a week of iteration on your feedback before launch, then a week of handover after launch for bug fixes and a smooth rollout.",
  },
  {
    question: "How can I bring the cost down?",
    answer:
      "Launch with less. The calculator shows what drives the price and what the first release would cost without the biggest item. Native apps, marketplace payments and reporting are the usual candidates for a second phase.",
  },
]

export default function MvpCostCalculatorPage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          How much will your <span className="text-primary">MVP</span> cost?
        </>
      }
      intro={`Answer eight questions about your app and get a ballpark price and timeline. It is priced the way we price real builds: ${formatPrice(weeklyRate)} per week of development, with iteration and handover included.`}
      faqs={faqs}
      related={{
        href: "/blog/how-much-does-it-cost-to-build-an-app-uk",
        title: "How much does it cost to build an app in the UK?",
      }}
    >
      <CostCalculator />
    </ToolPage>
  )
}
