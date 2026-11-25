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
  /**
   * The pull quote that is the whole of the home page's About section, with
   * the founder's name and profile links under it. `highlight` is set in
   * Lapis after `lead`.
   */
  quote: {
    lead: "Enterprise work taught me to write code that lasts. Startups taught me to ship fast and cut what doesn't matter.",
    highlight: "You get both.",
  },
  /** The shorter, third-person bio in the "About the author" box on every blog post. */
  authorBio:
    "Max is the founder of Scryptic and a full-stack developer with five years of experience building software for enterprise clients and startups. He builds MVPs for UK founders and takes apps made with no-code and AI builders through to production.",
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
