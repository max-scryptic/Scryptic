import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const mvpAgile: BlogPost = {
  slug: "mvp-agile",
  title: "How an MVP fits into agile development",
  series: "launch",
  topic: "MVP and agile",
  icon: "workflow",
  description:
    "How a minimum viable product fits into agile development: how it differs from a sprint increment, how to draw the MVP line on a backlog, and what to do after.",
  summary:
    "In agile development, the MVP is the first release you put in front of real users to test whether the product is worth building further. Agile is how you get there: short sprints, each ending in working software. Several sprint increments usually add up to one MVP, and what you learn once it is live decides the order of the backlog that follows.",
  datePublished: "2026-11-05",
  facts: [
    { label: "MVP is", value: "A product decision: what to release" },
    { label: "Agile is", value: "A delivery method: how to build it" },
    { label: "Worked example", value: "A waiting list for an allotment society" },
    { label: "Common mistake", value: "Calling every sprint's output an MVP" },
  ],
  sections: [
    {
      id: "what-it-means",
      heading: "What is an MVP in agile development?",
      blocks: [
        {
          type: "paragraph",
          text: "It is the point where the increments you have built add up to one complete job that real users can do without you, released so you can see whether they keep doing it. The MVP answers a question about the product. The sprints are how the team works towards that answer in small, checkable steps.",
        },
        {
          type: "paragraph",
          text: "The two ideas grew up separately. The Agile Manifesto, written in 2001, never uses the term minimum viable product; it came from lean startup thinking and was made popular by Eric Ries. They fit together because they share a principle the manifesto puts plainly: working software is the primary measure of progress. Agile keeps every step small and working. The MVP says which steps are worth taking before anyone outside the team sees the product.",
        },
        {
          type: "paragraph",
          text: "If the MVP itself is the part you are unsure about, start with what counts as one and how it differs from a prototype.",
          link: { text: "What MVP software is, and the five checks for one.", href: "/blog/what-is-mvp-software" },
        },
      ],
    },
    {
      id: "terms",
      heading: "How is an MVP different from a sprint increment or a release?",
      blocks: [
        {
          type: "paragraph",
          text: "An increment is what a sprint produces, a release is when you put software in front of users, and the MVP is the first release built to test whether the product deserves more work. Teams that blur the three end up either releasing half a job to users or never releasing at all.",
        },
        {
          type: "table",
          caption: "Five agile and product terms compared by what each one is, who decides it and how often it happens",
          columns: ["Term", "What it is", "Who decides", "How often"],
          rows: [
            ["Sprint", "A fixed block of time, usually one or two weeks, with one goal", "The team, with the product owner", "Back to back, all through the build"],
            ["Increment", "Working, tested software added during a sprint", "The team, against its definition of done", "At least once a sprint"],
            ["Release", "Increments made available to users", "The product owner", "Whenever the increments are worth using"],
            ["MVP", "The first release that lets real users finish the core job alone", "The founder or product owner", "Once, at the start"],
            ["Backlog", "The ordered list of work still to do", "The product owner", "Reordered every sprint"],
          ],
        },
        {
          type: "paragraph",
          text: "The Scrum Guide, the most widely used description of how agile teams run sprints, doesn't define an MVP either. That is why teams fill the gap differently, and why it pays to agree what your MVP is before the first sprint starts.",
        },
      ],
    },
    {
      id: "not-every-sprint",
      heading: "Is every sprint's output an MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "No, and treating it as one is the most common mix-up. A sprint increment should be finished to the standard you would release at, but on its own it rarely covers a whole job. Sign-in that works, with nothing to do after signing in, is a good increment and a useless release.",
        },
        {
          type: "paragraph",
          text: "The opposite mistake is just as common: calling the MVP phase one of a long plan, then building it in sprints that nobody outside the team sees until month six. That is a fixed plan delivered in fortnightly chunks, and it gives up the reason for building an MVP, which is to learn from real use early.",
        },
        {
          type: "list",
          items: [
            { term: "Too early to release", text: "The increments cover some steps of the job, but a user would get stuck or need you to finish it." },
            { term: "Ready to release", text: "One kind of user can finish the job start to finish, their data is kept and private, and you can measure whether they came back." },
            { term: "Released too late", text: "The job was finishable weeks ago, and the sprints since went on extras nobody has asked for yet." },
          ],
        },
      ],
    },
    {
      id: "backlog",
      heading: "How do you plan an MVP with an agile backlog?",
      blocks: [
        {
          type: "paragraph",
          text: "Write the job as a row of steps, put the stories for each step underneath, and draw a line across: everything above the line is the MVP, everything below waits for what users tell you. This is user story mapping, a technique popularised by Jeff Patton, and it stops the backlog turning into a flat list where every item looks equally urgent.",
        },
        {
          type: "paragraph",
          text: "The example here is an allotment society with a waiting list of eighty people and plots that come free a few times a year. Today the secretary works through a spreadsheet, emails whoever is next and chases them for an answer. The one job is getting a vacant plot taken up by the next person in line.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            { term: "Write the bet", text: "If offers go out automatically and lapse after a week, vacant plots are taken up faster and the secretary stops chasing. The measure is days from vacant to accepted." },
            { term: "Map the steps", text: "Join the list, plot falls vacant, offer sent, offer answered, plot handed over." },
            { term: "Draw the line", text: "Keep the stories that let one person move through every step. Move the rest below the line." },
            { term: "Mark the manual steps", text: "Anything a person can keep doing by hand for the first few months, such as collecting rent, stays manual." },
            { term: "Set the definition of done", text: "Include what viable needs, not just what works in a demo: data kept, each member sees only their own place on the list, and errors reported." },
          ],
        },
        {
          type: "table",
          caption: "The allotment society's stories above and below the MVP line, with the reason each one is placed where it is",
          columns: ["Story", "Above or below the line", "Why"],
          rows: [
            ["A resident joins the waiting list and sees their position", "Above", "The first step of the job"],
            ["The secretary marks a plot as vacant", "Above", "Starts every offer"],
            ["The next person gets an email offer with accept and decline links", "Above", "The step the secretary spends most time on today"],
            ["An unanswered offer passes to the next person after seven days", "Above", "Removes the chasing, which is the bet"],
            ["The secretary sees who holds each plot and who is next", "Above", "Needed to run the list without the spreadsheet"],
            ["Annual rent invoices and payment", "Below", "Collected by bank transfer today, and that can carry on"],
            ["A map of the site with each plot marked", "Below", "Nice to have; the plot numbers already work"],
            ["Text message reminders", "Below", "Wait to see whether email offers go unanswered"],
            ["Plot inspection notes", "Below", "A separate job for a different committee member"],
          ],
        },
        {
          type: "paragraph",
          text: "Five stories above the line is a small MVP, and that is the point. If your own list won't fit, our free MVP Scope Planner lets you size each feature and see what fits a first release.",
          link: { text: "Draw your own line with the MVP Scope Planner.", href: "/tools/mvp-scope-planner" },
        },
      ],
    },
    {
      id: "sprint-plan",
      heading: "How many sprints does it take to build an MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "For a focused MVP, usually between one and four sprints of one or two weeks each. Give each sprint a goal that is a step through the job, not a list of features, and end it with a demo of working software to someone who has the problem.",
        },
        {
          type: "table",
          caption: "The allotment society MVP as three one week sprints, with each sprint's goal and what is shown at the end",
          columns: ["Sprint", "Sprint goal", "Shown at the end"],
          rows: [
            ["One", "A plot can go from vacant to offered", "The secretary marks a test plot vacant and the next person gets the email"],
            ["Two", "An offer can be answered or lapse", "A tester accepts one offer, ignores another, and the second passes on after the set time"],
            ["Three", "The secretary can run the list alone", "The real waiting list imported, with positions checked against the spreadsheet"],
          ],
        },
        {
          type: "paragraph",
          text: "Each sprint leaves the product working end to end for the steps it covers, so you could stop after any of them and still have something to show. Our week by week MVP guide covers the scoping, design and launch weeks around the build sprints in more depth.",
          link: { text: "How to build an MVP, week by week.", href: "/blog/how-to-build-an-mvp" },
        },
      ],
    },
    {
      id: "habits",
      heading: "Which agile habits help an MVP, and which get in the way?",
      blocks: [
        {
          type: "paragraph",
          text: "The habits that keep feedback short help; the ones built for large teams on long-running products mostly slow a first release down. Keep the first group and scale the second to a team of two or three.",
        },
        { type: "subheading", text: "Habits worth keeping" },
        {
          type: "list",
          items: [
            { term: "One person who can say no", text: "The product owner, often the founder, decides what goes above the line and turns away anything that doesn't serve the job." },
            { term: "Demos to people with the problem", text: "Show each sprint's work to the secretary, not just to the team. They notice the missing step a developer won't." },
            { term: "A definition of done that includes viable", text: "Privacy, kept data and error reporting are part of done from the first sprint, not a hardening sprint at the end." },
            { term: "Short retrospectives", text: "Fifteen minutes on what slowed the sprint down is enough for a small team." },
          ],
        },
        { type: "subheading", text: "Habits that slow an MVP down" },
        {
          type: "list",
          items: [
            { term: "Velocity as the goal", text: "Points completed say nothing about whether users want the product. Measure the bet instead." },
            { term: "Estimating the whole backlog", text: "Most stories below the line will change or disappear once users arrive. Estimate them when they move up." },
            { term: "Full ceremony for a tiny team", text: "Separate planning, refinement and review meetings each week cost a small team a day it doesn't have." },
            { term: "Fixing it next sprint", text: "Fine for a rough screen; not for data that leaks between users, which has to be right before release." },
          ],
        },
      ],
    },
    {
      id: "after-launch",
      heading: "What happens to the backlog after the MVP ships?",
      blocks: [
        {
          type: "paragraph",
          text: "It gets reordered by what real users did, not by the plan you made before they arrived. The sprints carry on at the same rhythm; what changes is that each one starts from evidence. Ries calls this the build, measure, learn loop, and the decision at each turn is whether to carry on in the same direction or change it.",
        },
        {
          type: "paragraph",
          text: "For the allotment society, the measure is days from a plot falling vacant to an offer being accepted. If offers are accepted within two days, the bet held, and the next sprint can go on the rent invoices the treasurer has been asking for. If most offers lapse unanswered, the problem is reaching people, and text message reminders jump from below the line to the top.",
        },
        {
          type: "checklist",
          items: [
            "The measure you chose before launch is being recorded from day one.",
            "Someone reads it, and what users say, before each sprint is planned.",
            "Stories below the line are reordered against that evidence, not their original order.",
            "Anything users have worked around by hand is a candidate for the next sprint.",
          ],
        },
      ],
    },
    {
      id: "working-with-us",
      heading: "Can an MVP be built in a fixed-price sprint?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, if the scope is fixed first. Agile usually holds time and cost steady and lets scope move; a fixed price works when the line on the story map is drawn before the sprint starts and the stories below it are left for later.",
        },
        {
          type: "paragraph",
          text: `That is how we work: the scope agreed up front, then a fixed-price sprint of ${mvp.price} + VAT for two weeks or ${extendedMvp.price} + VAT for three, each with a week of changes from your feedback and a handover week after launch, and the code in your name.`,
          link: { text: "See what each MVP package includes.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is MVP a Scrum term?",
      answer:
        "No. The Scrum Guide talks about sprints, increments and a product goal, but not minimum viable products. The MVP comes from lean startup thinking. Many Scrum teams use both, with the MVP as the product goal for their first few sprints.",
    },
    {
      question: "Can you build an MVP without agile?",
      answer:
        "Yes. An MVP is defined by its scope, not by the method used to build it. A small, well-defined MVP can be built to a fixed plan. Agile helps most when you expect to learn things during the build that change what goes in, which is common for first products.",
    },
    {
      question: "What is the difference between an MVP and a minimum marketable feature?",
      answer:
        "An MVP is a whole first product released to test whether people want it. A minimum marketable feature is the smallest piece of new functionality worth releasing to customers who already use a product. MVPs come first; minimum marketable features are how many teams plan the releases after it.",
    },
  ],
}
