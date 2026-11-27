import aiSaasCostGrowsWithUse from "@/assets/blog/images/ai-saas-cost-grows-with-use.webp"
import aiSaasFromPaidTaskToProduct from "@/assets/blog/images/ai-saas-from-paid-task-to-product.webp"
import type { BlogPost } from "@/lib/blog/types"
import { mvp } from "@/lib/services"

export const aiSaas: BlogPost = {
  slug: "what-is-ai-saas",
  title: "What is AI SaaS, and how do you start an AI business?",
  series: "launch",
  topic: "AI SaaS",
  icon: "atom",
  description:
    "AI SaaS is subscription software where an AI model does the work customers pay for. How its business model makes money, and how to start one around a paid task.",
  summary:
    "AI SaaS is subscription software in which an AI model does the work the customer pays for, so they buy a finished task, such as a written report, rather than somewhere to do it themselves. It runs on a model rented from a provider, so every task costs you something that ordinary SaaS doesn't, and most of the business model comes down to how you charge for that. To start one, sell a single task that one trade already pays a person to do, delivering it by hand at first, before you build the product around it.",
  datePublished: "2026-11-27",
  facts: [
    { label: "Customers pay for", value: "A finished task" },
    { label: "What each use costs you", value: "A call to the model" },
    { label: "Ways to charge", value: "Seats, credits or results" },
    { label: "Where to start", value: "One task a trade pays for" },
  ],
  sections: [
    {
      id: "what-ai-saas-is",
      heading: "AI SaaS, and how it differs from SaaS with an AI feature",
      blocks: [
        {
          type: "paragraph",
          text: "It's SaaS where the model's output is the thing being sold. The quickest test is to imagine the model switched off. A job management app that uses AI to tidy up engineers' notes still schedules jobs without it. An app that turns a letting agent's walk-round photos and voice notes into a check-in inventory report has nothing left to sell. Both are SaaS, with many businesses sharing one app and paying monthly, but only the second is AI SaaS, the same thing some people call SaaS AI.",
        },
        {
          type: "paragraph",
          text: "That inventory app is the example this guide follows. It's an illustration rather than a product we've built, chosen because letting agents already pay an inventory clerk for each property: the task has a buyer and a price before any software exists.",
        },
        {
          type: "table",
          caption: "SaaS with an AI feature, AI SaaS and AI as a service, compared on what the customer buys and who buys it",
          columns: ["", "What the customer buys", "Typical customer", "Example"],
          rows: [
            [
              "SaaS with an AI feature",
              "Software they'd use anyway, with AI drafting or summarising inside it",
              "The business that opens the software every day",
              "A job management app that writes up engineers' notes",
            ],
            [
              "AI SaaS",
              "The result of the model's work, delivered in an app built for their trade",
              "A business that pays a person or a supplier for that task today",
              "An app that writes check-in inventory reports for letting agents",
            ],
            [
              "AI as a service",
              "Access to a model through an API, charged per request",
              "Developers building products, AI SaaS among them",
              "The model APIs from OpenAI, Anthropic and Google",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "AI as a service, sometimes shortened to AIaaS, is the layer underneath. Nearly every AI SaaS product is a paying customer of one of those providers, and that relationship shapes how it has to make money.",
        },
      ],
    },
    {
      id: "business-model",
      heading: "How the AI SaaS business model makes money",
      blocks: [
        {
          type: "paragraph",
          text: "By charging more for each task than the task costs to run. Ordinary SaaS gets to ignore the second half of that: once a subscription app is built, a customer who uses it twice as much costs almost nothing extra. An AI SaaS product pays its model provider every time a customer presses the button, so twice the use costs roughly twice as much.",
        },
        {
          type: "image",
          image: aiSaasCostGrowsWithUse,
          alt: "Cost to serve a customer against use: flat for ordinary SaaS, rising with every model call for AI SaaS.",
        },
        {
          type: "paragraph",
          text: "There are three common ways to charge, and the choice settles who carries that cost when a customer's use jumps.",
        },
        {
          type: "table",
          caption: "Three ways to charge for an AI SaaS product, with what each suits and where it can go wrong",
          columns: ["How you charge", "What the customer sees", "Suits", "The risk"],
          rows: [
            [
              "Per seat",
              "A monthly price for each person on the team",
              "AI used lightly inside software people open every day",
              "One heavy user can cost more in model calls than their seat brings in",
            ],
            [
              "A plan with credits",
              "A monthly plan that includes a set number of tasks, with more available to buy",
              "Tasks with an obvious unit, such as a report, a clip or a minute of footage",
              "Customers have to understand what one credit buys before they'll commit to a plan",
            ],
            [
              "Per result",
              "A price for each finished task",
              "Tasks the customer already pays for one at a time",
              "You pay for attempts that fail, and someone has to agree what counts as finished",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Credits are where many AI products settle, because the unit matches what the model provider charges for. ReelEstate, which we built, sells estate agents monthly and yearly credit plans: each video clip takes a credit from a balance the whole team shares, and a clip that fails gives it back.",
          link: { text: "How ReelEstate's credit plans work.", href: "/work/reelestate" },
        },
        {
          type: "paragraph",
          text: "For the inventory app, a price per report fits best at the start. Agents already think of an inventory as a cost per property, so they can set the price straight against last month's invoice from the clerk.",
        },
        { type: "subheading", text: "Work out what one task costs you" },
        {
          type: "paragraph",
          text: "Cost one task from start to finish before you set a price. Take the rates from your provider's current pricing page, because they change:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Count the model calls in one task, including the ones your checks reject and run again.",
            "Multiply each call by its size, in tokens for text or seconds for video, at the provider's current rate.",
            "Add what the task leaves behind: the photos stored, the report kept and the email sent.",
            "Allow for the share of tasks that fail and are redone or refunded for nothing.",
          ],
        },
        {
          type: "paragraph",
          text: "Then price for your busiest likely customer rather than the average one. Building the metering into the app, so nobody can run up model costs you haven't charged for, is covered in our AI software development guide.",
          link: {
            text: "How to meter an AI feature so it pays its way.",
            href: "/blog/ai-software-development#model-in-the-product",
          },
        },
        {
          type: "paragraph",
          text: "The model is one line on the running bill. Hosting, storage, email and payment fees sit beside it and also grow with every customer.",
          link: { text: "What a SaaS product costs to run after launch.", href: "/blog/saas-cost-before-and-after-launch" },
        },
      ],
    },
    {
      id: "more-than-a-wrapper",
      heading: "What makes an AI SaaS more than a wrapper",
      blocks: [
        {
          type: "paragraph",
          text: "Owning the parts of the job the model can't do on its own. A wrapper is a product whose whole value is a prompt sent to someone else's model, and it has two weaknesses. A customer can get much the same result by pasting the same request into ChatGPT, and the provider can add the feature to its own app whenever it chooses.",
        },
        {
          type: "paragraph",
          text: "In the inventory app, the model writes the descriptions, and everything listed below is what an agent actually pays for:",
        },
        {
          type: "list",
          items: [
            "The format agents need at check-out: every room in order, and every item with its condition and cleanliness.",
            "A check before anything is shown, so a room in the photos that's missing from the report sends the draft back for another pass.",
            "Damage that comes with its photo attached, because a description on its own won't settle a dispute over a deposit.",
            "A copy that goes straight into the lettings software the agency already uses, instead of a document someone has to file.",
            "The check-in report kept for a year, ready to compare with the check-out one, which is the comparison the agent wanted all along.",
          ],
        },
        {
          type: "paragraph",
          text: "All of that is ordinary software around the model, and it's where most of the build goes.",
          link: { text: "What goes into building your own AI app.", href: "/blog/build-your-own-ai" },
        },
      ],
    },
    {
      id: "start-an-ai-business",
      heading: "How to start an AI business around one paid task",
      blocks: [
        {
          type: "paragraph",
          text: "Sell the task before you build the software. Choose one job a particular trade already pays someone to do, deliver it to a handful of customers using an off-the-shelf model and your own checking, and build the product once you know they'll pay and where the model goes wrong.",
        },
        {
          type: "image",
          image: aiSaasFromPaidTaskToProduct,
          alt: "Four steps: a task a trade pays for, done by hand before any code, a one-task product, then more tasks.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Find a task with a price on it. For letting agents, that's the inventory, booked with a clerk and paid for property by property.",
            "Deliver it by hand. Offer ten agents their next inventory for less than the clerk charges, then write each one yourself with a general AI assistant and check it before it goes out. You'll learn whether agents pay, how long the model's draft takes to fix and what one report really costs.",
            "Write down every correction. Each fix to the model's draft becomes a check the product will run, or a point where the work goes to a person.",
            "Build one task from end to end. Sign-up, the upload, the finished report, payment per report and a cap on use, for one kind of customer. Check-out reports, other trades and an assistant for tenants' questions wait until agents ask for them.",
          ],
        },
        {
          type: "paragraph",
          text: "Sizing that first version is easier with a number in front of you. Our free MVP Cost Calculator asks eight questions about your app, including whether AI is one feature or the product itself, and gives a ballpark in development weeks and pounds.",
          link: { text: "Estimate your first version with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "paragraph",
          text: "If the business already exists as Zapier, Make or n8n workflows you run for clients, you've done the by-hand stage, and the workflow you repeat most is the task to build first.",
          link: { text: "Ten signs your automations should become a SaaS product.", href: "/blog/turn-automations-into-a-saas-product" },
        },
      ],
    },
    {
      id: "ai-business-opportunities",
      heading: "Which AI business opportunities suit a small team?",
      blocks: [
        {
          type: "paragraph",
          text: "Narrow, paid-for paperwork in a single trade, where the customer can check the output in a minute. Broad ideas, such as a general assistant, a writing tool or an AI for everyone's inbox, are the ones the model providers build into their own apps, so you'd be competing with a company that pays nothing for its model.",
        },
        {
          type: "table",
          caption: "Signs an AI business idea suits a small team, and signs it will be hard going",
          columns: ["", "Suits a small team", "Hard going for a small team"],
          rows: [
            ["The task", "Something a trade pays a person or supplier to do today", "Something people do for free and wouldn't pay to skip"],
            ["The buyer", "A kind of business you can name and reach, such as letting agents", "Anyone who writes emails"],
            ["Checking the output", "The customer can see in a minute whether it's right", "Mistakes only surface later, as with legal or medical advice"],
            ["The inputs", "Files the customer already has, such as photos, PDFs or recordings", "Data you'd have to collect or buy first"],
            ["The competition", "A general chatbot does it badly because it needs the trade's format and rules", "The model provider's own app already does it well"],
          ],
        },
        {
          type: "paragraph",
          text: "An idea that sits in the middle column all the way down can still fail. If it does, it fails cheaply, at the by-hand stage, before anything has been built.",
        },
      ],
    },
    {
      id: "selling-ai",
      heading: "Selling AI to your first customers",
      blocks: [
        {
          type: "paragraph",
          text: "Sell the finished task in the customer's own terms and leave the model out of the pitch. What a letting agent wants is an inventory on the day the tenancy is agreed, at a known price, in a form that will hold up at check-out.",
        },
        {
          type: "list",
          items: [
            "Run it on their own properties. Offer the next three inventories free and let the agent compare them with the clerk's.",
            "Tell them which parts a person checks, and why. An agent who knows where the model needs help will trust the rest.",
            "Price it against what they pay now, so the per-report figure sits next to the clerk's invoice and needs no explaining.",
            "Have an answer ready about tenants' photos: where they're sent, who can see them and how long they're kept.",
          ],
        },
        {
          type: "paragraph",
          text: "That last question comes up early with any business holding other people's details, so check what your model provider does with what you send it before the first sales call.",
          link: { text: "Where an AI-built app's data is kept, and what UK GDPR asks.", href: "/blog/uk-data-residency-ai-built-apps" },
        },
        {
          type: "paragraph",
          text: `When you're ready to build the one-task version, we do it as a fixed-price sprint from ${mvp.price} + VAT, and the code, hosting and model provider account are in your company's name from launch.`,
          link: { text: "See what a fixed-price sprint includes.", href: "/pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What happens to an AI SaaS when the model provider changes its prices?",
      answer:
        "Your margin moves with them, which is the main risk of building on a rented model. Make switching models a configuration change rather than a rebuild, keep a set of real tasks to test any cheaper or newer model against, leave headroom in your prices, and say in your terms that plan prices can change with notice.",
    },
    {
      question: "Who owns the reports an AI SaaS produces for its customers?",
      answer:
        "Your model provider's terms say who owns what the model returns, so read them before you write your own. Then state plainly in your terms that customers own what the product makes for them, and set out what you may do with their uploads, such as using their corrections to improve the product.",
    },
    {
      question: "Should an AI SaaS have a free plan?",
      answer:
        "A free allowance capped by tasks works better than an open free trial, because every free task still costs you a model call. Viewlio, which we built, gives creators ten free analyses a month, then moves them to Starter and Pro plans with credits charged per minute of footage.",
    },
  ],
}
