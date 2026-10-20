import { SiteChecker } from "@/components/free-tools/site-checker"
import { ToolPage } from "@/components/free-tools/tool-page"
import { WhatWeCheck } from "@/components/free-tools/what-we-check"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"

const tool = freeTool("agent-readiness-check")

export const metadata = createMetadata(toolPage(tool))

const checked = [
  {
    name: "AI crawler access",
    text: "Whether robots.txt lets ChatGPT, Claude and Perplexity fetch your pages to cite them, and whether model training crawlers are allowed.",
  },
  {
    name: "Content without JavaScript",
    text: "How much readable text is in the HTML your server sends. Most AI crawlers do not run JavaScript, so a page built in the browser looks empty to them.",
  },
  {
    name: "llms.txt",
    text: "Whether the site has an llms.txt: a short Markdown map that tells language models what the site is and where its key pages are.",
  },
  {
    name: "Structured data and identity",
    text: "Whether schema.org JSON-LD says what the page is and who is behind it, so answer engines can tie it to your brand.",
  },
  {
    name: "Indexing, structure and speed",
    text: "Noindex rules, the title and description agents quote, a clear main landmark and h1, the sitemap, link previews, HTTPS and response time.",
  },
]

const faqs = [
  {
    question: "What does it mean for a website to be AI agent ready?",
    answer:
      "It means AI assistants such as ChatGPT, Claude and Perplexity can reach your pages, read the content without running JavaScript, understand what each page is and who is behind it, and cite it in their answers.",
  },
  {
    question: "Should I block GPTBot and other AI crawlers?",
    answer:
      "Block AI search crawlers such as OAI-SearchBot, Claude-SearchBot and PerplexityBot only if you want to stay out of AI answers. Training crawlers such as GPTBot and ClaudeBot are a separate choice: blocking them keeps your content out of future models but does not remove you from AI search.",
  },
  {
    question: "What is llms.txt?",
    answer:
      "A proposed standard from llmstxt.org: a Markdown file at /llms.txt with your site's name, a short summary and links to its key pages. It gives language models a clean map of the site instead of making them guess from the navigation.",
  },
  {
    question: "Why does JavaScript matter for AI crawlers?",
    answer:
      "Google renders JavaScript, but most AI crawlers do not. If your content is only added in the browser, they see an empty page. Server-side rendering or static generation puts the content in the HTML they read.",
  },
  {
    question: "Does the checker store my site or results?",
    answer:
      "No. It fetches the page and a few public files, reads them and sends you the report. Nothing is saved, and it only checks public websites.",
  },
]

export default function AgentReadinessCheckPage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          Can <span className="text-primary">AI agents</span> find, read and cite your site?
        </>
      }
      intro="Enter your website to see it the way ChatGPT, Claude and Perplexity do. The check scores 13 signals, from robots.txt and llms.txt to structured data, and says how to fix each one."
      faqs={faqs}
    >
      <SiteChecker kind="agent" />
      <WhatWeCheck items={checked} />
    </ToolPage>
  )
}
