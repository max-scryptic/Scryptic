import framerLogo from "@/assets/blog/logos/framer.svg"
import type { BlogPost } from "@/lib/blog/types"

export const framer: BlogPost = {
  slug: "migrate-from-framer",
  title: "Keep your Framer site and build the app next to it",
  series: "migration",
  topic: "Framer",
  logo: framerLogo,
  category: "Website builders",
  description:
    "Outgrowing Framer? Keep the marketing site where your team edits it and build the product on a subdomain. Why that beats a full move, and when it does not.",
  summary:
    "Most founders who outgrow Framer should not leave it. Keep the marketing site in Framer, build the product as a proper app on a subdomain such as app.yourdomain.com, and only rebuild the site when you need one codebase or more control than Framer gives.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "keep-the-site",
      heading: "Move the product, not the brochure",
      blocks: [
        {
          type: "paragraph",
          text: "Our verdict is simple: Framer is very good at the thing it was built for, and the thing you have outgrown is not that thing. Framer designs and publishes marketing sites faster than almost anything you could build in code, and your team can change a headline without a developer. What it does not have is a backend. Once customers sign in, pay, upload files or see their own data, you are building an app, and Framer has no database, server code or user system to hold one.",
        },
        {
          type: "paragraph",
          text: "So far that gap has probably been filled with plugins: a membership tool such as Outseta or FramerAuth for logins, forms that land in a spreadsheet or a webhook, a CMS stretched to hold listings users submit, and code overrides that have quietly grown into a small application with no tests and no history outside Framer. None of that is wrong for a launch. It just should not be where your product lives.",
        },
        {
          type: "paragraph",
          text: "The split is straightforward. The site stays at yourdomain.com in Framer. The app is built separately, with a real database, server-side authentication, payments through a provider such as Stripe, and business logic as tested code in a repository, then deployed at app.yourdomain.com. Copy your colours, type styles and spacing into shared design tokens so the two look like one product, link the sign-up and log-in buttons on the site into the app, and you are done. Your search rankings do not move, because no public page changes address.",
        },
        {
          type: "callout",
          title: "There is nothing to migrate out of Framer for the app",
          text: "Because Framer never held your product's data or logic, building the app is not a migration at all. Export members and billing records from whichever membership and payment tools you used, plan a password reset or magic link at launch because those tools rarely export password hashes, and copy any code components you wrote. Everything else is new work.",
        },
      ],
    },
    {
      id: "when-to-leave",
      heading: "When leaving Framer completely is worth the rebuild",
      blocks: [
        {
          type: "paragraph",
          text: "Leave completely only when the site itself has become part of the product. Framer does not offer an HTML export for self-hosting, so a full move means rebuilding every page. Scraped copies of a published site are not meant to be maintained, and canvas animations and effects stay behind.",
        },
        {
          type: "paragraph",
          text: "That rebuild earns its cost in a few cases: public pages generated from your own database, such as a directory or marketplace with thousands of listings; a need for one codebase and one deployment; finer control over markup and performance than Framer allows; or CMS needs beyond what your plan covers. If you do go, export each CMS collection to CSV with a marketplace plugin, download images rather than linking to Framer's hosting, map every old URL to its new one with a permanent 301 redirect, and carry over titles, meta descriptions and social images. Then watch Google Search Console for the first month. If none of those cases apply, keep publishing in Framer and spend the money on the app.",
        },
      ],
    },
  ],
  faqHeading: "Two questions we hear every time",
  faqs: [
    {
      question: "Can I export my Framer site as code?",
      answer:
        "Not officially. Framer does not offer HTML export for self-hosting. You can export CMS collections to CSV with a plugin and copy your code components and overrides, but the pages themselves need rebuilding if you leave Framer.",
    },
    {
      question: "Will I lose my SEO if I move off Framer?",
      answer:
        "Not if you add the app on a subdomain and keep the site in Framer, because your existing pages are not touched at all. If the site itself moves, keep URLs the same where possible, add a permanent 301 redirect for every one that changes, give each new page the old title and meta description, and send Google the new sitemap through Search Console.",
    },
  ],
}
