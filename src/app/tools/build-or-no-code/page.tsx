import { NoCodeQuiz } from "@/components/free-tools/no-code-quiz"
import { ToolPage } from "@/components/free-tools/tool-page"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"

const tool = freeTool("build-or-no-code")

export const metadata = createMetadata(toolPage(tool))

const faqs = [
  {
    question: "Should I build my MVP with no-code or code?",
    answer:
      "Use no-code when you are testing demand on a small budget and the product is made of standard parts like forms, lists and bookings. Build in code when the core is unusual, the data is sensitive, you expect real scale or you need to own what you have built.",
  },
  {
    question: "Is no-code cheaper than custom development?",
    answer:
      "At the start, yes: a no-code first version can cost a few thousand pounds or just your own time. The cost moves later, into monthly plans that rise with usage, workarounds for what the tool cannot do and a rebuild once the product outgrows it.",
  },
  {
    question: "Can I move from Bubble or another no-code tool to code later?",
    answer:
      "Yes, and many products do. Because no-code tools keep the app on their platform, the move is a planned rebuild that brings your data and users across. Our migration guides cover seventeen tools step by step.",
  },
  {
    question: "What about AI app builders like Lovable or Bolt?",
    answer:
      "They sit in between. They write real code you can export, which makes them a good fit for prototypes, but the code usually needs hardening before it holds real users, payments and data safely.",
  },
  {
    question: "How does the quiz decide?",
    answer:
      "Each answer leans towards no-code or towards code, by how much it matters. The total picks one of three answers: no-code will do, start with no-code and plan the rebuild, or build in code from the start. The reasons shown are the answers that weighed most.",
  },
]

export default function BuildOrNoCodePage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          Should you use <span className="text-primary">no-code</span> or build it in code?
        </>
      }
      intro="Answer seven questions about your idea, your users and your budget. You get a straight answer on whether a no-code tool is enough, and why, even when the answer is that you do not need us yet."
      faqs={faqs}
      related={{ href: "/blog/vibe-coding-to-production", title: "A production audit for your vibe-coded app" }}
    >
      <NoCodeQuiz />
    </ToolPage>
  )
}
