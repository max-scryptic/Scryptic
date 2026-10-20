import { ScopePlanner } from "@/components/free-tools/scope-planner"
import { ToolPage } from "@/components/free-tools/tool-page"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"
import { services } from "@/lib/services"

const tool = freeTool("mvp-scope-planner")

export const metadata = createMetadata(toolPage(tool))

const faqs = [
  {
    question: "What should go in an MVP?",
    answer:
      "The one job your product does for its first customers, and only what that job needs to work end to end. Everything that makes it nicer, faster or bigger can wait until people are using it and telling you what matters.",
  },
  {
    question: "How are the feature sizes worked out?",
    answer:
      "They are rules of thumb from our builds. A small feature, such as email notifications or a search box, takes about a day. A medium one, such as subscriptions or an admin panel, takes two or three days. A large one, such as messaging between users or a reporting dashboard, takes about a week.",
  },
  {
    question: "Why are sign up and log in not on the list?",
    answer:
      "Because every build starts with them. Accounts, transactional email, analytics and deployment are part of the first week of every package, so they do not count against your features.",
  },
  {
    question: "What fits in a one week MVP?",
    answer: `One core feature built properly, plus two or three small ones around it. ${services.map((s) => `The ${s.name} has ${s.developmentWeeks} ${s.developmentWeeks === 1 ? "week" : "weeks"} of development`).join(" and the ")}, each followed by a week of iteration on your feedback and a week of handover after launch.`,
  },
  {
    question: "What should I save for later?",
    answer:
      "Anything your first customers can live without for a month: native mobile apps, reporting, messaging, team accounts and integrations nobody has asked for yet. Launching sooner tells you which of them are worth building.",
  },
]

export default function MvpScopePlannerPage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          Cut your idea down to a <span className="text-primary">first release</span>
        </>
      }
      intro="List the features you want, size each one and choose what launches first. The planner shows how many weeks the first release takes, which package it fits and what to move to later to launch sooner."
      faqs={faqs}
      related={{ href: "/blog/how-to-build-an-mvp", title: "How to build an MVP, week by week" }}
    >
      <ScopePlanner />
    </ToolPage>
  )
}
