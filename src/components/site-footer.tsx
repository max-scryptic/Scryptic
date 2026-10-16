import Link from "next/link"

import { BrandLogo, BrandWordmark } from "@/components/brand-logo"
import { VoxelHills } from "@/components/voxel-hills"
import { postSeries } from "@/lib/blog"
import { pages } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { caseStudies } from "@/lib/work"

// The home page's sections, in the order they appear on it.
const homeLinks = [
  { name: "Pricing", href: "/#pricing" },
  { name: "Process", href: "/#process" },
  { name: "Our work", href: "/#work" },
  { name: `Why ${siteConfig.name}`, href: "/#compare" },
  { name: "About", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
]

const workLinks = [
  ...caseStudies.map((study) => ({ name: study.name, href: `/work/${study.slug}` })),
  { name: "All work", href: pages.work.path },
]

// Each series links to its section on /blog.
const blogLinks = [
  ...postSeries.map((series) => ({ name: series.name, href: `${pages.blog.path}#${series.id}` })),
  { name: "All posts", href: pages.blog.path },
]

function FooterColumn({
  title,
  links,
  children,
}: {
  title: string
  links: { name: string; href: string }[]
  children?: React.ReactNode
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h2 className="font-mono text-xs tracking-widest text-foreground uppercase">{title}</h2>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-logo text-lg font-extrabold tracking-tight lowercase">
            <BrandLogo className="size-6" />
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.tagline}. From first call to launched app.
          </p>
          <a
            href={`mailto:${siteConfig.organization.email}`}
            className="text-sm text-primary hover:underline"
          >
            {siteConfig.organization.email}
          </a>
        </div>
        <FooterColumn title={siteConfig.name} links={homeLinks} />
        <FooterColumn title="Work" links={workLinks} />
        <FooterColumn title="Blog" links={blogLinks} />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 font-mono text-xs text-muted-foreground sm:px-6">
        &copy; {new Date().getFullYear()} {siteConfig.organization.legalName}
      </div>
      {/* Its own band between the text and the wordmark, so it never sits behind either. */}
      <VoxelHills className="min-h-36 sm:min-h-48" />
      {/* Sign-off: the wordmark run edge to edge, sitting on the bottom of the page.
          It is set in the hills' periwinkle, the hills fade out just above it, and it is
          padded equally above and below. */}
      <div className="overflow-hidden p-4 sm:p-6">
        <BrandWordmark className="block h-auto w-full text-portrait" />
      </div>
    </footer>
  )
}
