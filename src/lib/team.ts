/** A profile on another site, shown as an icon link. */
export type SocialProfile = {
  network: "linkedin" | "x" | "instagram"
  /** The network's name, for the link's accessible label. */
  label: string
  href: string
}

/**
 * The person behind Scryptic, shown in the home page's About section, on
 * /book-a-call and as the author of every blog post.
 */
export const founder = {
  name: "Max",
  /** Used where a reader or search engine needs the whole name: author bylines and JSON-LD. */
  fullName: "Max Winter-Leinweber",
  role: "Founder",
  image: "/team/max.png",
  bio: [
    "I'm a full-stack developer. For the past five years I've worked in small, close-knit teams, building software for enterprise clients and helping startups get from a rough idea to a live product.",
    "Enterprise work taught me to write code that's secure and easy to maintain. Startups taught me to move fast and cut what doesn't matter. I bring both to every project, and I'll only use a new tool if it makes your product better, faster or cheaper to build, not just because it's new.",
  ],
  /** Also emitted as the author's schema.org sameAs on every post. */
  socials: [
    {
      network: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/maxwinter-leinweber/",
    },
    { network: "x", label: "X", href: "https://x.com/MaxWinterL" },
    {
      network: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/max_eutonix/",
    },
  ] satisfies SocialProfile[],
}
