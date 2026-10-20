import { LaunchChecklist } from "@/components/free-tools/launch-checklist"
import { ToolPage } from "@/components/free-tools/tool-page"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"

const tool = freeTool("app-launch-checklist")

export const metadata = createMetadata(toolPage(tool))

const faqs = [
  {
    question: "What do I need before launching an app in the UK?",
    answer:
      "A privacy policy and terms of service, consent for any non-essential cookies, the ICO data protection fee if you handle personal data, error tracking and backups, and analytics that track sign ups and payments. Payments, subscriptions, mobile apps and AI each add their own steps.",
  },
  {
    question: "Do I need a cookie banner?",
    answer:
      "Only for cookies that are not strictly necessary, such as most analytics and all advertising cookies. A log in cookie needs no consent. Cookieless analytics tools let many apps launch with no banner at all.",
  },
  {
    question: "Do I need to register with the ICO?",
    answer:
      "Most UK businesses that process personal data, including user accounts and customer emails, must pay the ICO data protection fee. The ICO has a short online check that tells you whether you are exempt.",
  },
  {
    question: "How long does app store review take?",
    answer:
      "Usually a day or two for Apple and a few hours to a few days for Google, but first submissions are often rejected once. Allow a week, and run a TestFlight and Play internal test beforehand.",
  },
  {
    question: "Is this checklist legal advice?",
    answer:
      "No. It covers what a typical UK app launch needs so nothing is missed, but the legal, privacy and VAT items depend on your business, so check them with an adviser.",
  },
]

export default function AppLaunchChecklistPage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          Your app <span className="text-primary">launch checklist</span>
        </>
      }
      intro="Answer five questions about your app and get the checklist for its launch: product, legal and privacy, payments, search and analytics, app stores and launch day. Tick items off as you go and copy it into your own tracker."
      faqs={faqs}
      related={{ href: "/blog/web-app-or-mobile-app-first", title: "Web app or mobile app first?" }}
    >
      <LaunchChecklist />
    </ToolPage>
  )
}
