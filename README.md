# Scryptic

Marketing site for Scryptic, a development-as-a-service studio. One service: a full app to market build (from £10,000). Next.js 16 with [Base UI](https://base-ui.com) as the UI primitive layer, styled with Tailwind CSS v4.

Brand: light surfaces (`#ffffff`) with ink text (`#0a0a0f`), one green signal colour (`#047857`) and no gradients, Geist and Geist Mono, and an "S_" terminal-cursor mark. Tokens live in `src/app/globals.css`, mirrored in `siteConfig.colors` for the generated images.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script                     | What it does                          |
| -------------------------- | ------------------------------------- |
| `npm run dev`              | Start the dev server                  |
| `npm run build`            | Production build                      |
| `npm run lint`             | ESLint                                |
| `npm run check:em-dashes`  | Fail if any source file has an em dash |

## Layout

```
src/
  app/                  Routes: / (landing page), /book-a-call (qualifying questions, then the booking link),
                        /work and /work/[slug] (case studies), /blog and /blog/[slug] (migration guides)
    globals.css         Theme tokens (light) and Tailwind setup
    robots.ts           robots.txt, sitemap.xml, manifest, llms.txt, icons and the
    sitemap.ts            Open Graph image are all generated from src/lib (see
    manifest.ts           "SEO and AEO" below)
    llms.txt/route.ts
    icon.svg, apple-icon.png, opengraph-image.tsx   From the brand kit in brand/
    not-found.tsx       Branded 404 (replaces Next's default and its "404: ..." title)
  components/
    ui/                 Generic widgets built on @base-ui/react (Button, Card, Field, Input, Label, Separator),
                        plus floating-navbar.tsx, a port of Aceternity UI's Floating Navbar (uses motion)
    site-header.tsx     Nav items and call to action for the floating navbar
    site-footer.tsx
    book-call-form.tsx  The qualifying form on /book-a-call
    brand-logo.tsx      The split glass mark, inline so it follows the theme
    theme-toggle.tsx    Light and dark mode: the navbar toggle and the pre-paint script
    post-card.tsx       A blog post card, used on /blog and under each post
    json-ld.tsx         Safe JSON-LD <script> + per-page WebPage/Breadcrumb graph
    em-dash-guard.tsx   Dev guard against em dashes in rendered text
  lib/
    site.ts             Brand facts, contact email and booking link, site URL, indexability
    services.ts         The service offer: card, price and Service JSON-LD
    booking.ts          /book-a-call questions, and how answers reach the booking link or email
    team.ts             The founder profile used on /, /book-a-call and as blog author
    blog/               Blog posts as data: types.ts (the shape), posts/<tool>.ts (one per post),
                        index.ts (the list, categories and helpers). A post is a file plus a line in index.ts
    seo.ts              Page registry + createMetadata()
    structured-data.ts  schema.org builders (Organization, WebSite, WebPage, FAQ, Article, ...)
    em-dash.ts          Em dash helpers used by the guard and the check script
```

## UI conventions

- **Base UI is the primitive layer.** Widgets in `src/components/ui` wrap `@base-ui/react`. Don't add Radix or another headless library next to it.
- **Feature code imports from `@/components/ui/*`**, never from `@base-ui/react` directly, so a widget can be restyled or swapped in one place.
- **Style with theme tokens** (`bg-background`, `text-muted-foreground`, `border-border`, ...) from `globals.css` rather than raw colours, so light and dark mode keep working.
- **One class helper:** `import { cn } from "cn"`.
- **Composition uses `render`, not `asChild`:** `<Button nativeButton={false} render={<Link href="/#services" />}>Services</Button>`.

## Adding widgets

`components.json` is set to the `base-nova` style, so the shadcn CLI installs the Base UI version of each component:

```bash
npx shadcn@latest add dialog select tabs
```

Other UI packs that publish a shadcn-compatible registry can be installed the same way, by namespace or by URL:

```bash
npx shadcn@latest add @<registry>/<item>
npx shadcn@latest add https://example.com/r/<item>.json
```

Before adding from another pack, check that it targets Base UI. A Radix-based item brings `radix-ui` back as a dependency.

To try a different look for the built-in widgets, change `style` in `components.json` to another `base-*` style (for example `base-vega`, `base-maia`, `base-lyra`, `base-mira`) and reinstall them with `npx shadcn@latest add <names> --overwrite`.

## SEO and AEO

Search engine (SEO) and answer engine (AEO: ChatGPT, Claude, Perplexity, Google AI Overviews) requirements are built in. What you configure:

1. **`src/lib/site.ts`**: name, one-sentence description, locale, brand colours, Twitter/X handle and every official profile URL (`sameAs`).
2. **`src/components/brand-logo.tsx`** and **`brand/`**: the mark on the site, and the brand kit the favicon, app icons and share image come from (see `brand/README.md`).
3. **Environment** (see `.env.example`): `NEXT_PUBLIC_SITE_URL` for non-Vercel hosts, and the search console verification tokens.
4. **`pages` in `src/lib/seo.ts`**: one entry per public route.

What you get, all derived from those:

| Concern | Where | Notes |
| --- | --- | --- |
| Title, description, canonical | `createMetadata()`, `pageTitle()` | Titles are pipe-delimited, most specific first: `Login \| Brand`, `Invoice 42 \| Billing \| Brand`. Colons and dashes as separators fail lint and are rewritten at runtime. Canonical is absolute via `metadataBase`. |
| Open Graph + Twitter/X cards | `createMetadata()`, `opengraph-image.tsx` | 1200x630 generated card on every page, `summary_large_image`. |
| Robots meta | `robotsFor()` | `max-snippet:-1`, `max-image-preview:large` so AI Overviews and rich results can quote freely. |
| `robots.txt` | `src/app/robots.ts` | Allows all crawlers, names AI search and AI training bots explicitly (`ALLOW_AI_TRAINING` toggles training only). |
| `sitemap.xml` | `src/app/sitemap.ts` | From the page registry. Only set `lastModified` when you know it. |
| `llms.txt` | `src/app/llms.txt/route.ts` | [llmstxt.org](https://llmstxt.org) map of the site for AI agents, from the same registry. |
| Structured data | `src/lib/structured-data.ts` | Organization + WebSite site-wide, WebPage + BreadcrumbList per page, linked by `@id`. FAQPage and Article builders ready to use. |
| Favicon, app icons, manifest | `icon.svg`, `apple-icon.png`, `public/favicon.ico`, `public/icon-*.png`, `manifest.ts` | SVG favicon that follows the browser theme, `favicon.ico` (16, 32, 48) for older browsers and crawlers, 192 and 512px manifest icons. All from `brand/`. |
| Search console verification | `GOOGLE_`, `BING_`, `YANDEX_SITE_VERIFICATION` | Rendered as meta tags when set. |
| Preview deployments | `isIndexable` | Anything but Vercel production (or a non-Vercel production build) sends `noindex` in meta, `X-Robots-Tag` and `robots.txt`. |

### Adding a page

```ts
// src/lib/seo.ts
pricing: {
  path: "/pricing",
  title: "Pricing",
  description: "Acme plans start free; paid plans add ... Compare features and limits.",
},
```

```tsx
// src/app/pricing/page.tsx
export const metadata = createMetadata(pages.pricing)

export default function PricingPage() {
  return (
    <main>
      <PageJsonLd page={pages.pricing} nodes={[faqJsonLd(pages.pricing, faqs)]} />
      ...
    </main>
  )
}
```

Titles from data (`generateMetadata` for a post or record) go through `pageTitle()` too: `title: { absolute: pageTitle(post.title, "Blog") }`.

Pages behind auth, or otherwise not worth a search result, get `noIndex: true`: they drop out of the sitemap and `llms.txt` and send `noindex, follow`.

### After launch (outside the code)

- Verify the domain in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) (ChatGPT search and Copilot draw on Bing's index), and submit `/sitemap.xml` to both.
- Check a page in the [Rich Results Test](https://search.google.com/test/rich-results) and a share link in the X and LinkedIn post inspectors.
- Keep the brand name, description and `sameAs` profiles identical everywhere the brand appears; answer engines reconcile entities across sources.
- Write answer-first copy: one `<h1>` per page, a direct answer under each heading, question-style headings and visible FAQs where people actually ask questions.
