import { SiteChecker } from "@/components/free-tools/site-checker"
import { ToolPage } from "@/components/free-tools/tool-page"
import { WhatWeCheck } from "@/components/free-tools/what-we-check"
import { freeTool } from "@/lib/free-tools"
import { createMetadata, toolPage } from "@/lib/seo"

const tool = freeTool("seo-check")

export const metadata = createMetadata(toolPage(tool))

const checked = [
  {
    name: "Title and description",
    text: "Whether the page has a title of 30 to 60 characters and a meta description of 110 to 160, the text people see in search results.",
  },
  {
    name: "Headings",
    text: "Exactly one h1 that says what the page is about, and h2 headings that break it into sections.",
  },
  {
    name: "Indexing",
    text: "Noindex tags and headers, whether robots.txt lets Google in, the sitemap, and a canonical URL that points at the page itself.",
  },
  {
    name: "Images and mobile",
    text: "Alt text on every image, a viewport for phones and the page language.",
  },
  {
    name: "Rich results and sharing",
    text: "Structured data for rich results, and the Open Graph and Twitter tags that shape how links look when shared.",
  },
  {
    name: "Speed and basics",
    text: "HTTPS, server response time, the size of the HTML and a favicon for mobile results.",
  },
]

const faqs = [
  {
    question: "What does the SEO Check look at?",
    answer:
      "The on-page basics search engines rely on: the title and meta description, headings, indexing rules, robots.txt, the sitemap, the canonical URL, image alt text, mobile setup, structured data, share tags, HTTPS and speed. Each gets a pass, improve or fix with a note on what to change.",
  },
  {
    question: "How long should a title tag and meta description be?",
    answer:
      "Aim for a title of 30 to 60 characters and a description of 110 to 160. Longer ones get cut off in results, and very short ones waste the space you have to say what the page offers.",
  },
  {
    question: "Does a high score mean I will rank first?",
    answer:
      "No. The check covers the technical and on-page basics that stop a page from ranking. Rankings also depend on how useful the content is, links from other sites and the competition for the search.",
  },
  {
    question: "Why check one page and not the whole site?",
    answer:
      "Most problems repeat across a site's templates, so checking the home page and one page of each type finds them quickly. Run the check on each kind of page: home, product, article and pricing.",
  },
  {
    question: "Is the SEO Check free?",
    answer: "Yes, with no sign up and no limit beyond a few checks a minute. Nothing about your site is stored.",
  },
]

export default function SeoCheckPage() {
  return (
    <ToolPage
      tool={tool}
      heading={
        <>
          Free <span className="text-primary">SEO check</span> for any page
        </>
      }
      intro="Enter a page address to audit the basics that decide whether it can rank: titles, descriptions, headings, indexing, sitemap, structured data, alt text and share previews, with a fix for each problem."
      faqs={faqs}
    >
      <SiteChecker kind="seo" />
      <WhatWeCheck items={checked} />
    </ToolPage>
  )
}
