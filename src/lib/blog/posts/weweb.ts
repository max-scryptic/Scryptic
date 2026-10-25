import wewebLogo from "@/assets/blog/logos/weweb.svg"
import type { BlogPost } from "@/lib/blog/types"

export const weweb: BlogPost = {
  slug: "migrate-from-weweb",
  title: "What founders get wrong about leaving WeWeb",
  series: "migration",
  topic: "WeWeb",
  logo: wewebLogo,
  category: "No-code app builders",
  description:
    "Five common assumptions about leaving WeWeb, from owning the exported Vue code to rebuilding everything, and what actually happens when you move to code.",
  summary:
    "Leaving WeWeb is usually smaller than founders fear and different from what they expect. The exported Vue build isn't source code you can maintain, but your Supabase or Xano backend and its data can stay put while the frontend is rebuilt against it, typically in four to eight weeks.",
  datePublished: "2026-10-13",
  dateModified: "2026-10-14",
  sections: [
    {
      id: "export-means-ownership",
      heading: "The exported Vue code means I own the app",
      blocks: [
        {
          type: "paragraph",
          text: "Not in the way that matters. WeWeb's code export, which is tied to a paid plan, gives you a built Vue.js single page app: compiled, minified HTML, CSS and JavaScript that runs on any static host. It's the output of WeWeb's build, not the readable source a developer would work in.",
        },
        {
          type: "paragraph",
          text: "Self-hosting it removes the hosting dependency, not the editor dependency. To change anything, you still open WeWeb and export again, and any hand edits to the bundle vanish the next time someone does. Two more details catch people out: some plugins route through WeWeb's own services and may stop working in a self-hosted copy, and files uploaded to WeWeb's CDN still live there.",
        },
        {
          type: "paragraph",
          text: "The export is still worth having. Keep it as a fallback and as a working reference while the real codebase is built.",
        },
      ],
    },
    {
      id: "rebuild-everything",
      heading: "Leaving means rebuilding everything",
      blocks: [
        {
          type: "paragraph",
          text: "Usually only the frontend gets rebuilt. WeWeb is a frontend sitting on top of a backend you connected, most often Supabase or Xano, so the data, users and much of the logic are already outside it.",
        },
        {
          type: "paragraph",
          text: "With Supabase, your data, auth and storage are in a Postgres project you can connect a new app to directly; just confirm it sits in your own account. With Xano, a new frontend can call the same endpoints. The new app is built screen by screen against that same backend, in a framework your team can maintain such as Next.js or Nuxt, while the WeWeb version keeps serving users until you switch the domain.",
        },
        {
          type: "paragraph",
          text: "If you used WeWeb's own newer backend features, such as WeWeb Tables and backend workflows, check the current export options before you plan around them, because they're younger than the frontend export.",
        },
      ],
    },
    {
      id: "interface-is-security",
      heading: "If users only see their own data, the app is secure",
      blocks: [
        {
          type: "paragraph",
          text: "The interface proves nothing about security. In many WeWeb and Supabase apps the browser queries the database directly, so the only thing keeping customers apart is row level security on every table. With Xano, it's whether each endpoint checks who's calling it.",
        },
        {
          type: "paragraph",
          text: "Hiding a button or filtering a list in the editor protects nothing; anyone with the browser's developer tools can make the same request without the filter. Before or during the move, write and test policies or endpoint checks for every table, and move secret keys and anything that charges money onto the server.",
        },
        {
          type: "paragraph",
          text: "If a list in WeWeb is filtered to the signed-in user's records but the table behind it has no policy enforcing the same rule, any user can read everyone else's records by changing a single value in the request. Fix that in the database first; it protects the WeWeb app today and the new app tomorrow.",
        },
      ],
    },
    {
      id: "screens-are-the-app",
      heading: "Rebuilding the screens rebuilds the app",
      blocks: [
        {
          type: "paragraph",
          text: "The screens are the easy part to see and the hard part to finish. A lot of a WeWeb app's behaviour lives in page workflows, global workflows, formulas and plugins, and none of it is visible from looking at the pages.",
        },
        {
          type: "paragraph",
          text: "The classic failure is a rebuilt app that looks identical but has quietly stopped updating a record or sending an email, because that happened in a workflow nobody listed. Before rebuilding, audit every page, workflow, formula, plugin, API call and backend function, and write down what each actually does, including the edge cases users rely on. Then move business logic onto the server as you go, so it lives in one reviewed place rather than split between the frontend and the backend.",
        },
        {
          type: "paragraph",
          text: "That audit also gives you something WeWeb never did: a written specification of the app. It becomes the test list for the rebuild, and the checklist you work through before switching the domain.",
        },
      ],
    },
    {
      id: "move-off-xano-too",
      heading: "We should move off Xano at the same time",
      blocks: [
        {
          type: "paragraph",
          text: "Rarely at the same time. Xano can export a workspace with its data and schema, and its endpoints can be read as XanoScript, but that logic only runs on Xano. Leaving means rewriting every endpoint, which is a project of its own.",
        },
        {
          type: "paragraph",
          text: "Doing both at once doubles the number of things that can break on cutover day and pushes the launch back by weeks. Rebuild the frontend against Xano first, ship it, then move the data to Postgres and replace endpoints one at a time if you still want to.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Can I export my code from WeWeb?",
      answer:
        "Yes, on a paid plan. WeWeb exports a built Vue.js app that you can host on your own servers. It's compiled output for deploying, not a source codebase meant for developers to maintain by hand, so changes still happen in the WeWeb editor.",
    },
    {
      question: "How long does it take to move a WeWeb app to custom code?",
      answer:
        "Usually four to eight weeks. Screens, workflows and user roles set the size of the job, and it runs longer when the backend is changing as well as the frontend.",
    },
  ],
}
