import incrementsAddUpToMvp from "@/assets/blog/images/increments-add-up-to-mvp.webp"
import mvpLineOnStoryMap from "@/assets/blog/images/mvp-line-on-story-map.webp"
import type { BlogPost } from "@/lib/blog/types"
import { extendedMvp, mvp } from "@/lib/services"

export const mvpAgile: BlogPost = {
  slug: "mvp-agile",
  title: "Planning an MVP in agile, from story map to release",
  series: "launch",
  topic: "MVP and agile",
  icon: "workflow",
  description:
    "An MVP in agile is the first release that lets users finish one whole job. How it differs from a sprint increment, where to draw the MVP line and what follows.",
  summary:
    "Sprints in agile development produce working software every week or two. An MVP in agile is the point where that software is first worth handing to real users, because it covers one whole job they can finish without you. It usually takes several sprints to get there, and once it's live, what users do sets the order of everything left on the backlog.",
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
          text: "It's the first release in a run of sprints that people outside the team rely on. Up to that point the work is judged by the team and whoever watches the demos. From then on it's judged by whether users come back.",
        },
        {
          type: "paragraph",
          text: "The two ideas come from different places. The Agile Manifesto, written in 2001, never mentions a minimum viable product; Eric Ries and the lean startup movement made the term popular later. They sit together easily because of one of the manifesto's principles, that working software is the primary measure of progress. An MVP applies that principle to the whole product, and raises the bar: the measure becomes whether strangers use it.",
        },
      ],
    },
    {
      id: "terms",
      heading: "How is an MVP different from a sprint increment or a release?",
      blocks: [
        {
          type: "paragraph",
          text: "Increments and releases describe how software moves from the team to users. The MVP is a judgement about what's in it: the first release that covers a whole job.",
        },
        {
          type: "table",
          caption: "Five agile and product terms compared by what each one is, who decides it and how often it happens",
          columns: ["Term", "What it is", "Who decides", "How often"],
          rows: [
            ["Sprint", "A fixed block of time, often one or two weeks, with one goal", "The team, with the product owner", "Back to back, all through the build"],
            ["Increment", "Working, tested software added during a sprint", "The team, against its definition of done", "At least once a sprint"],
            ["Release", "Increments made available to users", "The product owner", "Whenever the increments are worth using"],
            ["MVP", "The first release that lets real users finish the core job alone", "The founder or product owner", "Once, at the start"],
            ["Backlog", "The ordered list of work still to do", "The product owner", "Reordered every sprint"],
          ],
        },
        {
          type: "paragraph",
          text: "The Scrum Guide, the most widely used description of how agile teams run sprints, doesn't define an MVP, so every team fills the gap its own way. Write down what yours is, in one sentence, before the first sprint starts.",
        },
      ],
    },
    {
      id: "not-every-sprint",
      heading: "Is every sprint's output an MVP?",
      blocks: [
        {
          type: "paragraph",
          text: "No. Each increment should be finished to the standard you'd release at, but one increment rarely covers a whole job. Sign-in that works, with nothing to do after signing in, is a good increment and a useless release.",
        },
        {
          type: "image",
          image: incrementsAddUpToMvp,
          alt: "Three sprint increments, offer sent, reply or lapse and list imported, join into one MVP release.",
        },
        {
          type: "paragraph",
          text: "The opposite mistake is calling the MVP phase one of a long plan and building it in sprints nobody outside the team sees until month six. That's a fixed plan delivered in fortnightly chunks. It throws away the reason to build an MVP at all, which is to learn from real use early.",
        },
        {
          type: "paragraph",
          text: "The increments add up to an MVP once one kind of user can get from the start of the job to the end on their own, with their data kept and private. Our explainer on MVP software turns that moment into five checks you can run.",
          link: { text: "Run the five checks for MVP software.", href: "/blog/what-is-mvp-software" },
        },
      ],
    },
    {
      id: "mvp-line",
      heading: "Where do you draw the MVP line on a backlog?",
      blocks: [
        {
          type: "paragraph",
          text: "Lay the job out as a row of steps, put the stories for each step underneath, and draw a line across. Everything above the line is the MVP. Everything below waits until users have told you something. This is user story mapping, popularised by Jeff Patton, and it stops a backlog from becoming a flat list where every item looks equally urgent.",
        },
        {
          type: "image",
          image: mvpLineOnStoryMap,
          alt: "A story map with five job steps, one story under each above a green MVP line and later stories below it.",
        },
        {
          type: "paragraph",
          text: "Take an allotment society with eighty people on its waiting list and plots that come free a few times a year. Today the secretary works through a spreadsheet, emails whoever is next and chases them for an answer. The one job is getting a vacant plot taken up by the next person in line.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            { term: "Write the bet", text: "If offers go out automatically and lapse after a week, vacant plots are taken up faster and the secretary stops chasing. The measure is days from vacant to accepted." },
            { term: "Map the steps", text: "Join the list, plot falls vacant, offer sent, offer answered, plot handed over." },
            { term: "Draw the line", text: "Keep the stories that let one person move through every step, and move the rest below." },
            { term: "Mark the manual steps", text: "Anything a person can keep doing by hand for the first few months, such as collecting rent, stays manual." },
            { term: "Set the definition of done", text: "Write viable into it, so done means each member sees only their own place on the list and errors reach someone who'll read them." },
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
          text: "Five stories is a small MVP, which is the point. If your own list won't shrink that far, the free MVP Scope Planner sizes each feature you add and shows which ones fit a first release, which can wait and which package they match.",
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
          text: "For a focused MVP, between one and four sprints of one or two weeks each. Give each sprint a goal that moves a user one step further through the job, and judge the sprint by whether that step works.",
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
          text: "Stop after any of these sprints and you'd still have working software for the steps covered so far, which is what makes the plan safe to change halfway. Our week by week guide puts the scoping, design and launch weeks around the build.",
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
          text: "Keep the habits that shorten feedback. Scale the rest down to fit a team of two or three, because most agile practice was written for bigger teams working on products that already exist.",
        },
        { type: "subheading", text: "Worth keeping" },
        {
          type: "list",
          items: [
            "A product owner, often the founder, who decides what goes above the line and can turn down anything that doesn't serve the job.",
            "A demo at the end of each sprint for someone who has the problem. The allotment secretary will spot a missing step that a developer reading the stories won't.",
            "Privacy, kept data and error reporting in the definition of done from the first sprint, so there's nothing to bolt on at the end.",
            "A fifteen minute retrospective. For a small team that's long enough to find what slowed the sprint down.",
          ],
        },
        { type: "subheading", text: "Worth scaling down" },
        {
          type: "list",
          items: [
            "Velocity targets. Points completed say nothing about whether users want the product; the bet you wrote down does.",
            "Estimating the whole backlog. Most stories below the line will change or vanish once users arrive, so estimate each one when it moves up.",
            "Separate planning, refinement and review meetings every week, which can cost a team of two a day it doesn't have.",
            "Putting off fixes that touch data until next sprint. A rough screen can wait; members seeing each other's details can't.",
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
          text: "The stories below the line get reordered against what users actually did, and some get deleted. The sprint rhythm carries on as before. Where each sprint's goal comes from is what changes: before launch it came from the story map, and after launch it comes from the measure you chose.",
        },
        {
          type: "paragraph",
          text: "For the allotment society, the measure is days from a plot falling vacant to an offer being accepted. If offers are accepted within two days, the bet held, and the next sprint can go on the rent invoices the treasurer keeps asking for. If most offers lapse unanswered, the problem is reaching people, and text message reminders jump from below the line to the top.",
        },
        {
          type: "checklist",
          items: [
            "The measure you chose is recorded from the first day.",
            "Someone reads it, along with what users say, before each sprint is planned.",
            "Every story below the line is reordered against that evidence.",
            "Anything users are working around by hand is a candidate for the next sprint.",
          ],
        },
        {
          type: "paragraph",
          text: "The first item only works if the measure is wired up before launch, as part of the same list as legal pages and payments. The free App Launch Checklist builds that list for your app from five questions.",
          link: { text: "Build your list with the App Launch Checklist.", href: "/tools/app-launch-checklist" },
        },
      ],
    },
    {
      id: "fixed-price",
      heading: "Can an MVP be built in a fixed-price sprint?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes, once the scope is fixed. Agile normally holds time and cost steady and lets scope move. A fixed price works when the MVP line is drawn before the sprint starts and nothing from below it creeps in.",
        },
        {
          type: "paragraph",
          text: "For a rough idea of what the stories above your line add up to, the free MVP Cost Calculator asks eight questions about your app and gives an estimate in development weeks and pounds, along with what drives the price.",
          link: { text: "Estimate your build with the MVP Cost Calculator.", href: "/tools/mvp-cost-calculator" },
        },
        {
          type: "paragraph",
          text: `We work this way: the scope agreed up front, then a fixed-price sprint of ${mvp.price} + VAT for two weeks or ${extendedMvp.price} + VAT for three, each with a week of changes from your feedback and a handover week after launch, and the code in your name.`,
          link: { text: "See what each MVP package includes.", href: "/#pricing" },
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Should you use Scrum or Kanban for an MVP?",
      answer:
        "Either works. Scrum's fixed sprints give a small team a regular deadline and a demo to aim at, which suits a build with a launch date. Kanban drops sprints and pulls the next card whenever one is finished, which suits a single developer, or the months after launch when work arrives as user feedback in a steady trickle.",
    },
    {
      question: "What is the difference between an MVP and a minimum marketable feature?",
      answer:
        "An MVP is a whole first product released to test whether people want it. A minimum marketable feature is the smallest piece of new functionality worth releasing to customers who already use a product. The MVP comes first; minimum marketable features are how many teams plan the releases after it.",
    },
  ],
}
