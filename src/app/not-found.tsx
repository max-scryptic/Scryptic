import type { Metadata } from "next"
import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { CrumbleHeading } from "@/components/crumble-heading"
import { Button } from "@/components/ui/button"
import { pageTitle, robotsFor } from "@/lib/seo"

// Replaces Next's built-in 404, whose "404: This page could not be found."
// title breaks the pipe-delimited title rule. The robots override stops the
// root layout's "index, follow" contradicting the noindex Next adds to 404s.
export const metadata: Metadata = {
  title: { absolute: pageTitle("Page not found") },
  robots: robotsFor(true),
}

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-muted px-4 py-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <BrandLogo className="size-14" />
        <CrumbleHeading className="text-4xl tracking-tight sm:text-5xl">Page not found</CrumbleHeading>
        <p className="max-w-sm text-balance text-muted-foreground">
          The page you are looking for does not exist or has moved.
        </p>
      </div>
      <Button size="lg" nativeButton={false} render={<Link href="/" />}>
        Back to home
      </Button>
    </main>
  )
}
