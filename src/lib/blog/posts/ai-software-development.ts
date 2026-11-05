import modelOutputCheckedInCode from "@/assets/blog/images/model-output-checked-in-code.webp"
import oneHarnessManyModels from "@/assets/blog/images/one-harness-many-models.webp"
import type { BlogPost } from "@/lib/blog/types"

export const aiSoftwareDevelopment: BlogPost = {
  slug: "ai-software-development",
  title: "AI software development with coding agents and models",
  series: "launch",
  topic: "AI software",
  icon: "sparkles",
  description:
    "AI software development explained: coding agents such as Claude Code and Codex, choosing models, and AI features that check their own output.",
  summary:
    "AI software development covers two jobs that often happen in the same project. Developers use coding agents such as Claude Code, Codex, Cursor and GitHub Copilot to write the code, and products call a model every time a customer uses an AI feature. The first speeds up the typing but leaves a person answerable for every change. The second puts a cost on each request and needs code that checks the answer before anyone sees it.",
  datePublished: "2026-11-03",
  dateModified: "2026-11-05",
  facts: [
    { label: "Coding agents compared", value: "4" },
    { label: "Our AI launches drawn on", value: "ReelEstate and Viewlio" },
  ],
  sections: [
    {
      id: "two-meanings",
      heading: "What does AI software development mean?",
      blocks: [
        {
          type: "paragraph",
          text: "It means either AI writing the software or AI running inside it, and an AI product usually involves both. They fail in different ways, so they need different safeguards.",
        },
        {
          type: "table",
          caption: "The two kinds of AI software development compared on who uses the model, what it costs and how its mistakes are caught",
          columns: ["Compared on", "AI writes the code", "AI runs inside the product"],
          rows: [
            ["Who uses the model", "The developer, while building", "Your customers, whenever they use the feature"],
            ["What it costs", "A subscription or usage while the build lasts", "A charge on every request, for as long as the product runs"],
            ["What goes wrong", "Code that looks right and is not", "Answers that look right and are not"],
            ["What catches it", "Code review, tests and the build", "Code you write to check each answer before a user sees it"],
          ],
        },
      ],
    },
    {
      id: "harness-and-model",
      heading: "How do Claude Code, Codex, Cursor and Copilot differ?",
      blocks: [
        {
          type: "paragraph",
          text: "An AI agent is software that uses a model to work towards a goal in steps, choosing and using tools as it goes, where a chatbot only replies to a message. A coding agent is one whose tools are your code: it reads the files, runs the tests and proposes the edits.",
        },
        {
          type: "paragraph",
          text: "Every coding agent pairs a model, which does the reasoning, with a harness, the program that lets the model read your files, run commands and propose edits. Claude Code and Codex are harnesses made by the companies that make the models they run. Cursor and GitHub Copilot let you pick models from several providers.",
        },
        {
          type: "image",
          image: oneHarnessManyModels,
          alt: "Interchangeable model blocks feed a harness frame, which works on a folder of code marked with a tick.",
        },
        {
          type: "table",
          caption: "Four widely used coding agents by maker, where you use them and which models they run, as of November 2026",
          columns: ["Agent", "Made by", "Where you use it", "Models it runs"],
          rows: [
            ["Claude Code", "Anthropic", "The terminal, editor extensions, a desktop app and the web", "Anthropic's Claude models"],
            ["Codex", "OpenAI", "The terminal, an editor extension and cloud tasks", "OpenAI's models"],
            ["Cursor", "Anysphere", "Its own editor, built on VS Code", "A choice of models from several providers"],
            ["GitHub Copilot", "GitHub", "VS Code and other editors, plus an agent that works on GitHub issues", "A choice of OpenAI, Anthropic and Google models"],
          ],
        },
        {
          type: "paragraph",
          text: "These products change every few weeks, so check each one's current plans and model list before you commit a team to it.",
        },
        {
          type: "paragraph",
          text: "The harness shapes your working day more than the model does. It decides whether the agent lives in your terminal or your editor, which commands it may run without asking, whether it can work on a copy of the repository in the cloud while you do something else, and how a change is shown to you before it is kept. The same model can feel like a different tool in a different harness.",
        },
        { type: "subheading", text: "Keep the project's rules where every agent reads them" },
        {
          type: "paragraph",
          text: "Agents read a plain text file of project instructions from the repository before they start work. Codex and several other agents look for AGENTS.md, and Claude Code looks for CLAUDE.md. Write the rules once in AGENTS.md and have CLAUDE.md include it, and any agent you try next starts with the same instructions.",
        },
        {
          type: "paragraph",
          text: "This site is set up that way. Its AGENTS.md holds our conventions, such as how every page gets its title and description, and its CLAUDE.md is a single line that pulls that file in. Next.js 16 writes a block into the same file telling agents to read the documentation that ships with the installed version, because the framework has changed since most models were trained. A model only knows what it learned up to its training date, and the rules file is where you tell it what has changed since.",
        },
      ],
    },
    {
      id: "working-with-agents",
      heading: "What should a team settle before agents write its code?",
      blocks: [
        {
          type: "paragraph",
          text: "Settle how changes get checked and what the agent is allowed to touch. Writing code has become quick, so most of the effort moves to deciding what to write and checking what comes back. The general case for code review and tests is in our guide to rebuilding off OutSystems, and it applies just as much to a two week MVP.",
          link: {
            text: "Where AI coding agents help on a low-code rebuild.",
            href: "/blog/migrate-from-outsystems",
          },
        },
        { type: "subheading", text: "Let the build enforce the rules" },
        {
          type: "paragraph",
          text: "A line in AGENTS.md is a request, while a check that fails is a rule. On this site, ESLint rejects any page title that uses a colon or a dash as a separator, and a script fails if an em dash turns up in the source. Agents follow written instructions most of the time, and checks like these catch the rest without anyone having to spot it.",
        },
        {
          type: "paragraph",
          text: "Type checks, tests and a production build on every change belong in the same category. Someone still reads the diff, but they read it to judge whether the change is right, because the machine has already confirmed that it compiles and the old behaviour still works.",
        },
        { type: "subheading", text: "Switch models for the task, and for review" },
        {
          type: "paragraph",
          text: "Both Claude Code and Codex let you change model in the middle of a session. A quicker, cheaper model is fine for renaming a field across forty files, and the strongest one you have earns its cost on planning a feature or chasing a bug that only happens in production. Models from different companies also tend to miss different things, so asking a second one to review a change before you merge it is a cheap extra check. It does not replace a person reading the change.",
        },
        { type: "subheading", text: "Limit what the agent can reach" },
        {
          type: "checklist",
          items: [
            "Approve safe commands such as running tests up front, and keep anything that deploys, deletes or pushes behind a prompt",
            "Give the agent test keys for payments and email, never the live ones",
            "Keep production database credentials off the machine the agent works on",
            "Have the agent work on a branch, so nothing reaches the main code without a review",
          ],
        },
        { type: "subheading", text: "A coding agent is not an app builder" },
        {
          type: "paragraph",
          text: "App builders such as Lovable and Bolt.new are designed around the preview: you describe a change and judge it on screen. Claude Code and Codex are designed around the diff and assume someone reads each change before it is kept. Most of the problems apps from AI builders launch with, like data any signed-in user can read, come from nobody reading the code.",
          link: {
            text: "Our production audit for vibe-coded apps.",
            href: "/blog/vibe-coding-to-production",
          },
        },
      ],
    },
    {
      id: "model-in-the-product",
      heading: "What changes when the product itself runs on a model?",
      blocks: [
        {
          type: "paragraph",
          text: "Each use of the feature now costs money and can come back wrong, so most of the engineering goes into the code around the model rather than the call to it. Two products we launched show what that code does.",
        },
        {
          type: "image",
          image: modelOutputCheckedInCode,
          alt: "Measured facts flow into a model, its output passes a check, and a dotted retry loop returns failures to the model.",
        },
        { type: "subheading", text: "Hand the model measurements, not raw material" },
        {
          type: "paragraph",
          text: "Viewlio explains why viewers stop watching a YouTube video. Before any model runs, it decides which drops in the audience curve are worth explaining: a drop has to be noticeably steeper than the video's normal decline, so the model is never asked to find a cause for ordinary fall-off. ffmpeg then measures cuts, freeze frames, loudness and silence around each moment, and Tesseract reads any on-screen text. The vision model receives those measurements as facts, which keeps its explanations tied to what is actually on screen.",
          link: { text: "How we built Viewlio.", href: "/work/viewlio" },
        },
        { type: "subheading", text: "Check every answer in code, and retry before a person has to" },
        {
          type: "paragraph",
          text: "ReelEstate turns listing photos into property videos, and the video models it uses occasionally cut to a room that does not exist. Every finished clip is decoded and its frames compared with that clip's own usual amount of change, so a sudden jump is flagged as an invented cut. The clip is regenerated automatically, and the estate agent only sees a Retry button if it fails twice.",
          link: { text: "How we built ReelEstate.", href: "/work/reelestate" },
        },
        { type: "subheading", text: "Charge the way the model charges you" },
        {
          type: "paragraph",
          text: "Without metering, a handful of heavy users can cost more in model calls than they pay you. Our two launches meter in different ways.",
        },
        {
          type: "list",
          items: [
            {
              term: "ReelEstate",
              text: "A credit is taken in the same database statement that creates each clip, and a failed clip puts it back.",
            },
            {
              term: "Viewlio",
              text: "Deep dives are metered by the minute of footage, and the cost of every model call is logged.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Our MVP Cost Calculator asks whether AI is one feature, for writing, summarising or chat, or the product itself, and allows more build time for the second.",
          link: { text: "Estimate your MVP with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "callout",
          title: "Version your prompts",
          text: "A small change to a prompt can alter every answer the product gives. Viewlio keeps its prompts in an admin panel with a version history, so a change that makes reports worse can be rolled back.",
        },
      ],
    },
    {
      id: "choosing-a-model",
      heading: "How do you choose a model for an AI feature?",
      blocks: [
        {
          type: "paragraph",
          text: "Test candidates on your own examples rather than trusting a leaderboard. Collect twenty or thirty real inputs with an answer you would accept for each, run every model you are considering over them, and pick the cheapest one that passes. Run the same set again whenever you change the prompt or the provider releases a new model.",
        },
        {
          type: "paragraph",
          text: "Keep every model call behind one function in your own code. Providers differ by the kind of model you need (Viewlio's analysis runs on OpenAI, while ReelEstate's video models run on fal.ai), and a better or cheaper option will turn up after launch. With one function, trying it is an edit in one place rather than a search through the app.",
        },
      ],
    },
    {
      id: "choosing-a-company",
      heading: "How do you choose an AI development company?",
      blocks: [
        {
          type: "paragraph",
          text: "Choose one that has launched an AI product to paying users and can show you the code around the model: how it checks each answer, what each request costs and what happens when the model gets it wrong. Polished demos are easy to make with AI; a product that copes with a bad answer is not.",
        },
        {
          type: "paragraph",
          text: "We build AI products ourselves. ReelEstate and Viewlio went from first sketch to launch through the same fixed-price sprint a client MVP does, and every check, metering rule and fallback described above comes from them.",
          link: { text: "See the AI products we have built.", href: "/work" },
        },
        { type: "subheading", text: "Questions to ask any AI development company" },
        {
          type: "checklist",
          items: [
            "Which AI product have you launched, and what does it do when the model gets an answer wrong?",
            "How will you test models on our own examples before choosing one?",
            "What will each use of the feature cost us, and how will it be metered?",
            "Can we change model provider later without rewriting the app?",
            "Whose name will the model provider account and API keys be in?",
            "How are prompt changes versioned, and how is a bad one rolled back?",
          ],
        },
        {
          type: "paragraph",
          text: "Be wary of a pitch that opens with training a custom model. For most products the work is in the pipeline, the checks and the billing around a model someone else has trained, and starting with training is usually the slowest and most expensive route to finding out whether customers want the feature.",
        },
        {
          type: "paragraph",
          text: "If you are planning a product with a model at its core, our fixed-price MVP sprints cover the whole of it: the AI pipeline, the checks on its output and the billing around it.",
          link: { text: "How our MVP development sprints work, AI products included.", href: "/services/mvp-development" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Does Scryptic build AI products?",
      answer:
        "Yes. ReelEstate turns listing photos into property videos, and Viewlio explains why viewers stop watching YouTube videos. Both were built through the same fixed-price sprint as a client MVP, including the model pipeline, the checks on its output and the metered billing.",
    },
    {
      question: "Is AI software development the same as machine learning?",
      answer:
        "Not usually any more. Machine learning traditionally means training a model on your own data. Most AI products now call a model someone else has trained through an API, and the development work is in what you send it, how you check what comes back and the product around it. Training your own model is rarely the right first step.",
    },
    {
      question: "Can I build an app with Claude Code or Codex if I am not a developer?",
      answer:
        "You can run them, and they will produce an app that works on screen. The risk is in the changes you cannot judge, such as who can read which data, what happens when a payment fails and where secret keys end up. If the app will store personal data or take money, have a developer review it before real users arrive.",
    },
    {
      question: "Whose name should the AI provider account be in?",
      answer:
        "Your business's. The account with OpenAI, Anthropic or whichever provider the product calls holds the API key and the bill, so it belongs alongside your hosting and database accounts. Give a developer a key you issued, and revoke it when their work is finished.",
    },
  ],
}
