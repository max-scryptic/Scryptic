import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

import {
  scoreChecks,
  type CheckResult,
  type SiteCheckKind,
  type SiteReport,
} from "@/lib/free-tools/site-check"
import { absoluteUrl } from "@/lib/site"

/*
 * The engine behind the Agent Readiness Check and the SEO Check. It fetches a
 * page someone typed in, plus its robots.txt, sitemap and llms.txt, reads what
 * it needs from the HTML and runs one of two sets of checks over the result.
 *
 * Fetching a URL a stranger chooses is a server-side request forgery risk, so
 * every hop (the page and each redirect) must be http or https on the default
 * port, and must resolve only to public addresses. The address is resolved
 * again by fetch itself, so a DNS record that changes between the two lookups
 * could still slip through; with nothing private reachable from the
 * deployment, that is an accepted risk for a read-only check. Responses are
 * capped in time and size, and only text is read.
 */

export class SiteCheckError extends Error {}

const USER_AGENT = `Mozilla/5.0 (compatible; ScrypticSiteCheck/1.0; +${absoluteUrl("/tools")})`
const TIMEOUT_MS = 10_000
const MAX_PAGE_BYTES = 3_000_000
const MAX_FILE_BYTES = 500_000
const MAX_REDIRECTS = 5

/** Turns what someone typed into a URL, or explains why it cannot be checked. */
export function normalizeUrl(input: string) {
  const trimmed = input.trim()
  if (!trimmed) throw new SiteCheckError("Enter a website address.")
  let url: URL
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
  } catch {
    throw new SiteCheckError("That does not look like a website address.")
  }
  assertCheckable(url)
  return url
}

function assertCheckable(url: URL) {
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new SiteCheckError("Only http and https addresses can be checked.")
  }
  if (url.username || url.password) throw new SiteCheckError("Remove the username and password from the address.")
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new SiteCheckError("Only sites on the standard web ports can be checked.")
  }
  const host = url.hostname.replace(/^\[|\]$/g, "")
  if (isIP(host) ? isPrivateAddress(host) : !host.includes(".") || /\.(local|internal|localhost)$/i.test(host)) {
    throw new SiteCheckError("Only public websites can be checked.")
  }
}

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number)
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    )
  }
  const lower = address.toLowerCase()
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return isPrivateAddress(mapped[1])
  return (
    lower === "::" ||
    lower === "::1" ||
    /^f[cd]/.test(lower) ||
    /^fe[89ab]/.test(lower) ||
    lower.startsWith("64:ff9b:") ||
    lower.startsWith("ff")
  )
}

async function assertPublicHost(url: URL) {
  assertCheckable(url)
  const host = url.hostname.replace(/^\[|\]$/g, "")
  if (isIP(host)) return
  let addresses: { address: string }[]
  try {
    addresses = await lookup(host, { all: true })
  } catch {
    throw new SiteCheckError(`Could not find ${host}. Check the address and try again.`)
  }
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new SiteCheckError("Only public websites can be checked.")
  }
}

type Fetched = {
  url: URL
  status: number
  headers: Headers
  body: string
  /** Time to the final response's headers, in milliseconds. */
  ms: number
  bytes: number
}

async function readCapped(response: Response, maxBytes: number) {
  const reader = response.body?.getReader()
  if (!reader) return { body: "", bytes: 0 }
  const chunks: Uint8Array[] = []
  let bytes = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    bytes += value.byteLength
    if (bytes > maxBytes) {
      await reader.cancel()
      break
    }
    chunks.push(value)
  }
  const body = new TextDecoder().decode(Buffer.concat(chunks))
  return { body, bytes }
}

/** Fetches a public URL, following redirects one hop at a time so each is checked. */
async function safeFetch(start: URL, maxBytes: number): Promise<Fetched> {
  let url = start
  const signal = AbortSignal.timeout(TIMEOUT_MS)
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(url)
    const began = performance.now()
    const response = await fetch(url, {
      redirect: "manual",
      signal,
      headers: { "user-agent": USER_AGENT, accept: "text/html,text/plain,application/xml;q=0.9,*/*;q=0.5" },
      cache: "no-store",
    })
    const ms = Math.round(performance.now() - began)
    const location = response.headers.get("location")
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel()
      url = new URL(location, url)
      continue
    }
    const type = response.headers.get("content-type") ?? ""
    const textual = !type || /text|html|xml|json/i.test(type)
    const { body, bytes } = textual ? await readCapped(response, maxBytes) : { body: "", bytes: 0 }
    if (!textual) await response.body?.cancel()
    return { url, status: response.status, headers: response.headers, body, ms, bytes }
  }
  throw new SiteCheckError("The site redirects too many times.")
}

async function fetchOptional(url: URL) {
  try {
    const fetched = await safeFetch(url, MAX_FILE_BYTES)
    return fetched.status >= 200 && fetched.status < 300 ? fetched : undefined
  } catch {
    return undefined
  }
}

// --- Reading HTML -----------------------------------------------------------

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }

function decode(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match)
}

const clean = (text: string) =>
  decode(text.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/ ([,.;:!?])/g, "$1")
    .trim()

function attributes(tag: string) {
  const found: Record<string, string> = {}
  for (const match of tag.matchAll(/([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    found[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? "")
  }
  return found
}

function tags(html: string, name: string) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "gi"))].map((match) => attributes(match[1]))
}

function elements(html: string, name: string) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "gi"))].map((match) => match[1])
}

function readPage(html: string) {
  const source = html.replace(/<!--[\s\S]*?-->/g, "")
  const metas = tags(source, "meta")
  const meta = (key: string) =>
    metas.find((m) => (m.name ?? m.property ?? "").toLowerCase() === key)?.content?.trim()
  const links = tags(source, "link")
  const rel = (value: string) =>
    links.find((link) => (link.rel ?? "").toLowerCase().split(/\s+/).includes(value))

  const jsonLdTypes = new Set<string>()
  let jsonLdBlocks = 0
  let jsonLdInvalid = 0
  for (const match of source.matchAll(
    /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    jsonLdBlocks++
    try {
      const collect = (node: unknown) => {
        if (Array.isArray(node)) return node.forEach(collect)
        if (!node || typeof node !== "object") return
        const record = node as Record<string, unknown>
        const type = record["@type"]
        for (const t of Array.isArray(type) ? type : [type]) if (typeof t === "string") jsonLdTypes.add(t)
        if (record["@graph"]) collect(record["@graph"])
      }
      collect(JSON.parse(match[1]))
    } catch {
      jsonLdInvalid++
    }
  }

  const bodyMatch = source.match(/<body\b[^>]*>([\s\S]*)/i)
  const body = (bodyMatch?.[1] ?? source).replace(
    /<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi,
    " ",
  )
  const text = clean(body)
  const images = tags(source, "img")

  return {
    lang: tags(source, "html")[0]?.lang?.trim(),
    title: elements(source, "title").map(clean)[0],
    description: meta("description"),
    robots: [meta("robots"), meta("googlebot")].filter(Boolean).join(", ").toLowerCase(),
    viewport: meta("viewport"),
    canonical: rel("canonical")?.href?.trim(),
    favicon: !!(rel("icon") ?? rel("shortcut") ?? rel("apple-touch-icon")),
    og: {
      title: meta("og:title"),
      description: meta("og:description"),
      image: meta("og:image"),
    },
    twitterCard: meta("twitter:card"),
    h1s: elements(source, "h1").map(clean),
    h2Count: elements(source, "h2").length,
    hasMain: /<main\b/i.test(source) || /role\s*=\s*["']?main/i.test(source),
    images: { total: images.length, withAlt: images.filter((img) => "alt" in img).length },
    jsonLd: { blocks: jsonLdBlocks, invalid: jsonLdInvalid, types: [...jsonLdTypes] },
    words: text ? text.split(" ").length : 0,
  }
}

// --- robots.txt ---------------------------------------------------------------

type RobotsGroup = { agents: string[]; rules: { allow: boolean; path: string }[] }

function parseRobots(text: string) {
  const groups: RobotsGroup[] = []
  const sitemaps: string[] = []
  let current: RobotsGroup | undefined
  let lastWasAgent = false
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim()
    const match = line.match(/^([a-z-]+)\s*:\s*(.*)$/i)
    if (!match) continue
    const [, field, value] = match
    const key = field.toLowerCase()
    if (key === "user-agent") {
      if (!current || !lastWasAgent) groups.push((current = { agents: [], rules: [] }))
      current.agents.push(value.toLowerCase())
      lastWasAgent = true
      continue
    }
    lastWasAgent = false
    if (key === "sitemap" && value) sitemaps.push(value)
    if ((key === "allow" || key === "disallow") && current) {
      current.rules.push({ allow: key === "allow", path: value })
    }
  }
  return { groups, sitemaps }
}

/** Whether robots.txt lets `agent` fetch the home page, by the longest matching rule. */
function allowsHome(robots: ReturnType<typeof parseRobots>, agent: string) {
  const token = agent.toLowerCase()
  const own = robots.groups.filter((group) => group.agents.includes(token))
  const groups = own.length ? own : robots.groups.filter((group) => group.agents.includes("*"))
  const matching = groups
    .flatMap((group) => group.rules)
    .filter((rule) => rule.path && /^\/(\*|\$)?$|^\*$/.test(rule.path))
    .sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow))
  return matching[0]?.allow ?? true
}

const AI_SEARCH_AGENTS = [
  { token: "OAI-SearchBot", name: "ChatGPT search" },
  { token: "ChatGPT-User", name: "ChatGPT browsing" },
  { token: "Claude-SearchBot", name: "Claude search" },
  { token: "Claude-User", name: "Claude browsing" },
  { token: "PerplexityBot", name: "Perplexity" },
]

const AI_TRAINING_AGENTS = [
  { token: "GPTBot", name: "OpenAI training" },
  { token: "ClaudeBot", name: "Anthropic training" },
  { token: "Google-Extended", name: "Gemini training" },
  { token: "CCBot", name: "Common Crawl" },
]

// --- Gathering ----------------------------------------------------------------

async function gather(start: URL, kind: SiteCheckKind) {
  let page: Fetched
  try {
    page = await safeFetch(start, MAX_PAGE_BYTES)
  } catch (error) {
    if (error instanceof SiteCheckError) throw error
    throw new SiteCheckError(`Could not load ${start.hostname}. The site may be down or blocking automated checks.`)
  }
  if (page.status >= 400) {
    throw new SiteCheckError(`${page.url.hostname} answered with an error (HTTP ${page.status}), so there was nothing to check.`)
  }
  const type = page.headers.get("content-type") ?? ""
  if (type && !/html/i.test(type)) throw new SiteCheckError("That address is not a web page.")

  const origin = page.url.origin
  const robotsFile = await fetchOptional(new URL("/robots.txt", origin))
  const robots = robotsFile ? parseRobots(robotsFile.body) : undefined

  const sitemapCandidates = [
    ...(robots?.sitemaps ?? []).flatMap((href) => {
      try {
        return [new URL(href, origin)]
      } catch {
        return []
      }
    }),
    new URL("/sitemap.xml", origin),
    new URL("/sitemap_index.xml", origin),
  ]
  const findSitemap = async () => {
    for (const candidate of sitemapCandidates.slice(0, 3)) {
      const file = await fetchOptional(candidate)
      if (file && /<(urlset|sitemapindex)\b/i.test(file.body)) return file
    }
    return undefined
  }

  const [sitemap, llms] = await Promise.all([
    findSitemap(),
    kind === "agent" ? fetchOptional(new URL("/llms.txt", origin)) : Promise.resolve(undefined),
  ])

  return {
    page,
    html: readPage(page.body),
    robots,
    sitemap,
    llms,
    xRobots: (page.headers.get("x-robots-tag") ?? "").toLowerCase(),
  }
}

type Facts = Awaited<ReturnType<typeof gather>>

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`

// --- Shared checks ------------------------------------------------------------

function indexableCheck(facts: Facts, weight: number): CheckResult {
  const blocked = /noindex|none/.test(facts.html.robots) || /noindex|none/.test(facts.xRobots)
  return {
    id: "indexable",
    label: "Allowed in search results",
    weight,
    status: blocked ? "fail" : "pass",
    detail: blocked
      ? "The page tells search engines not to index it, so it cannot appear in results or AI answers."
      : "Nothing on the page asks search engines to leave it out.",
    fix: blocked ? 'Remove "noindex" from the robots meta tag and the X-Robots-Tag header, unless it is deliberate.' : undefined,
  }
}

function sitemapCheck(facts: Facts, weight: number): CheckResult {
  const count = facts.sitemap ? (facts.sitemap.body.match(/<loc>/gi) ?? []).length : 0
  return {
    id: "sitemap",
    label: "XML sitemap",
    weight,
    status: facts.sitemap ? "pass" : "warn",
    detail: facts.sitemap
      ? `Found ${facts.sitemap.url.pathname} listing ${plural(count, "URL")}.`
      : "No sitemap at /sitemap.xml or in robots.txt.",
    fix: facts.sitemap
      ? undefined
      : "Publish a sitemap.xml of every public page, name it in robots.txt and submit it to Google Search Console and Bing.",
  }
}

function structuredDataCheck(facts: Facts, weight: number, missing: CheckResult["status"]): CheckResult {
  const { blocks, invalid, types } = facts.html.jsonLd
  if (invalid) {
    return {
      id: "structured-data",
      label: "Structured data",
      weight,
      status: "fail",
      detail: `${plural(invalid, "JSON-LD block")} on the page could not be read.`,
      fix: "Fix the JSON syntax, then check the page in Google's Rich Results Test.",
    }
  }
  return {
    id: "structured-data",
    label: "Structured data",
    weight,
    status: blocks ? "pass" : missing,
    detail: blocks
      ? `JSON-LD describes ${types.length ? types.slice(0, 6).join(", ") : "the page"}.`
      : "No JSON-LD structured data on the page.",
    fix: blocks
      ? undefined
      : "Add schema.org JSON-LD: Organization and WebSite site-wide, plus a type for what each page shows (Product, Article, FAQPage).",
  }
}

function httpsCheck(facts: Facts, weight: number): CheckResult {
  const secure = facts.page.url.protocol === "https:"
  return {
    id: "https",
    label: "Served over HTTPS",
    weight,
    status: secure ? "pass" : "fail",
    detail: secure ? "The page loads over HTTPS." : "The page loads over plain HTTP.",
    fix: secure ? undefined : "Serve the site over HTTPS and redirect every http:// address to it.",
  }
}

function speedCheck(facts: Facts, weight: number): CheckResult {
  const { ms } = facts.page
  return {
    id: "speed",
    label: "Server response time",
    weight,
    status: ms < 1000 ? "pass" : ms < 2500 ? "warn" : "fail",
    detail: `The server answered in ${ms} ms.`,
    fix:
      ms < 1000
        ? undefined
        : "Cache the HTML at the edge or render it statically. Slow pages are crawled less and abandoned more.",
  }
}

function shareCheck(facts: Facts, weight: number): CheckResult {
  const { og, twitterCard } = facts.html
  const missing = [
    !og.title && "og:title",
    !og.description && "og:description",
    !og.image && "og:image",
    !twitterCard && "twitter:card",
  ].filter(Boolean)
  return {
    id: "share",
    label: "Link previews",
    weight,
    status: missing.length === 0 ? "pass" : og.image && og.title ? "warn" : "fail",
    detail: missing.length
      ? `Missing ${missing.join(", ")}.`
      : "Open Graph and Twitter tags give shared links a title, description and image.",
    fix: missing.length
      ? "Add Open Graph tags and a 1200 by 630 share image, so links look right in chats, social posts and AI tools."
      : undefined,
  }
}

// --- Agent readiness ------------------------------------------------------------

function agentChecks(facts: Facts): CheckResult[] {
  const { html, robots } = facts
  const blockedSearch = robots ? AI_SEARCH_AGENTS.filter((a) => !allowsHome(robots, a.token)) : []
  const blockedTraining = robots ? AI_TRAINING_AGENTS.filter((a) => !allowsHome(robots, a.token)) : []
  const llmsValid = !!facts.llms && /^\s*#\s+\S/.test(facts.llms.body) && !/<html/i.test(facts.llms.body)
  const identity = html.jsonLd.types.some((t) =>
    ["Organization", "LocalBusiness", "Corporation", "Person", "WebSite", "OnlineStore"].includes(t),
  )
  const semantic = [html.hasMain, html.h1s.length === 1, !!html.lang]

  return [
    {
      id: "ai-search",
      label: "AI search crawlers allowed",
      weight: 4,
      status: blockedSearch.length === 0 ? "pass" : blockedSearch.length === AI_SEARCH_AGENTS.length ? "fail" : "warn",
      detail: !robots
        ? "There is no robots.txt, so every crawler is allowed by default."
        : blockedSearch.length
          ? `robots.txt blocks ${blockedSearch.map((a) => a.name).join(", ")}.`
          : "robots.txt lets ChatGPT, Claude and Perplexity fetch the site to cite it.",
      fix: blockedSearch.length
        ? `Allow ${blockedSearch.map((a) => a.token).join(", ")} in robots.txt. Blocking them keeps the site out of AI answers.`
        : undefined,
    },
    {
      id: "ai-training",
      label: "AI training crawlers",
      weight: 1,
      status: blockedTraining.length ? "warn" : "pass",
      detail: blockedTraining.length
        ? `robots.txt blocks ${blockedTraining.map((a) => a.name).join(", ")}.`
        : "Model training crawlers are allowed, so the brand can make it into models' own knowledge.",
      fix: blockedTraining.length
        ? "Fine if it is deliberate. Allowing them helps AI models know your brand without searching for it."
        : undefined,
    },
    indexableCheck(facts, 3),
    {
      id: "rendered",
      label: "Readable without JavaScript",
      weight: 4,
      status: html.words >= 150 ? "pass" : html.words >= 50 ? "warn" : "fail",
      detail: `The HTML the server sends has ${plural(html.words, "word")} of readable text.`,
      fix:
        html.words >= 150
          ? undefined
          : "Most AI crawlers do not run JavaScript. Render the content on the server (SSR or static generation) so it is in the HTML.",
    },
    {
      id: "llms-txt",
      label: "llms.txt",
      weight: 2,
      status: llmsValid ? "pass" : "warn",
      detail: llmsValid
        ? "Found /llms.txt, a Markdown map of the site for language models."
        : facts.llms
          ? "/llms.txt exists but is not Markdown starting with a # heading."
          : "No /llms.txt.",
      fix: llmsValid
        ? undefined
        : "Add /llms.txt (llmstxt.org): the site name, a one-line summary and links to key pages with a sentence on each.",
    },
    structuredDataCheck(facts, 3, "fail"),
    {
      id: "identity",
      label: "Who is behind the site",
      weight: 2,
      status: identity ? "pass" : "warn",
      detail: identity
        ? "Structured data names the organization or site."
        : "No Organization or WebSite structured data, so agents have to guess who runs the site.",
      fix: identity
        ? undefined
        : "Add Organization JSON-LD with your name, logo, URL and sameAs links to your official profiles.",
    },
    {
      id: "summary",
      label: "Title and description",
      weight: 2,
      status: html.title && html.description ? "pass" : html.title || html.description ? "warn" : "fail",
      detail:
        html.title && html.description
          ? `"${html.title}"`
          : `Missing ${[!html.title && "a title", !html.description && "a meta description"].filter(Boolean).join(" and ")}.`,
      fix:
        html.title && html.description
          ? undefined
          : "Give every page a unique title and a one-sentence description: agents quote them when they summarise or cite you.",
    },
    {
      id: "semantic",
      label: "Clear page structure",
      weight: 2,
      status: semantic.every(Boolean) ? "pass" : semantic.some(Boolean) ? "warn" : "fail",
      detail: [
        html.hasMain ? "has a <main> landmark" : "has no <main> landmark",
        html.h1s.length === 1 ? "one h1" : `${plural(html.h1s.length, "h1")}`,
        html.lang ? `lang="${html.lang}"` : "no lang attribute",
      ].join(", ").replace(/^./, (c) => c.toUpperCase()) + ".",
      fix: semantic.every(Boolean)
        ? undefined
        : "Wrap the content in <main>, use exactly one <h1> and set <html lang>. Agents use them to find what matters on the page.",
    },
    sitemapCheck(facts, 1),
    shareCheck(facts, 1),
    httpsCheck(facts, 1),
    speedCheck(facts, 1),
  ]
}

// --- SEO ----------------------------------------------------------------------

function seoChecks(facts: Facts): CheckResult[] {
  const { html, robots, page } = facts
  const title = html.title ?? ""
  const description = html.description ?? ""
  const googleAllowed = robots ? allowsHome(robots, "Googlebot") : true
  const missingAlt = html.images.total - html.images.withAlt
  const altShare = html.images.total ? html.images.withAlt / html.images.total : 1
  let canonical: URL | undefined
  try {
    canonical = html.canonical ? new URL(html.canonical, page.url) : undefined
  } catch {
    canonical = undefined
  }
  const canonicalElsewhere = canonical && canonical.host !== page.url.host

  return [
    {
      id: "title",
      label: "Title tag",
      weight: 3,
      status: !title ? "fail" : title.length >= 30 && title.length <= 60 ? "pass" : "warn",
      detail: title ? `"${title}" (${title.length} characters).` : "The page has no <title>.",
      fix:
        title && title.length >= 30 && title.length <= 60
          ? undefined
          : "Write a unique title of 30 to 60 characters, most specific words first and the brand last.",
    },
    {
      id: "description",
      label: "Meta description",
      weight: 2,
      status: !description ? "fail" : description.length >= 110 && description.length <= 160 ? "pass" : "warn",
      detail: description ? `${description.length} characters: "${description}"` : "The page has no meta description.",
      fix:
        description && description.length >= 110 && description.length <= 160
          ? undefined
          : "Write a 110 to 160 character description that answers what the page is, so search results show your words.",
    },
    {
      id: "h1",
      label: "One h1 heading",
      weight: 2,
      status: html.h1s.length === 1 ? "pass" : html.h1s.length === 0 ? "fail" : "warn",
      detail:
        html.h1s.length === 1
          ? `"${html.h1s[0]}"`
          : html.h1s.length === 0
            ? "The page has no <h1>."
            : `The page has ${html.h1s.length} h1 headings.`,
      fix: html.h1s.length === 1 ? undefined : "Use exactly one <h1> that says what the page is about.",
    },
    {
      id: "headings",
      label: "Section headings",
      weight: 1,
      status: html.h2Count > 0 ? "pass" : "warn",
      detail: html.h2Count ? `${plural(html.h2Count, "h2 heading")} break up the page.` : "No h2 headings.",
      fix: html.h2Count ? undefined : "Break the page into sections with <h2> headings that match what people search for.",
    },
    indexableCheck(facts, 3),
    {
      id: "robots",
      label: "robots.txt",
      weight: 2,
      status: !googleAllowed ? "fail" : robots ? "pass" : "warn",
      detail: !robots
        ? "No robots.txt found."
        : googleAllowed
          ? "robots.txt lets Google crawl the site."
          : "robots.txt blocks Google from the site.",
      fix: !googleAllowed
        ? "Remove the Disallow: / rule that applies to Googlebot."
        : robots
          ? undefined
          : "Add a robots.txt that allows crawling and names your sitemap.",
    },
    sitemapCheck(facts, 2),
    {
      id: "canonical",
      label: "Canonical URL",
      weight: 2,
      status: canonical && !canonicalElsewhere ? "pass" : "warn",
      detail: canonical
        ? canonicalElsewhere
          ? `Points to another site: ${canonical.href}`
          : `Points to ${canonical.href}`
        : "No canonical link.",
      fix:
        canonical && !canonicalElsewhere
          ? undefined
          : 'Add <link rel="canonical"> with the page\'s own absolute URL, so duplicates do not split its ranking.',
    },
    {
      id: "alt",
      label: "Image alt text",
      weight: 2,
      status: altShare === 1 ? "pass" : altShare >= 0.8 ? "warn" : "fail",
      detail: html.images.total
        ? missingAlt
          ? `${missingAlt} of ${plural(html.images.total, "image")} have no alt attribute.`
          : `All ${plural(html.images.total, "image")} have an alt attribute.`
        : "No images on the page.",
      fix: missingAlt ? 'Describe each meaningful image in its alt text, and give decorative ones alt="".' : undefined,
    },
    {
      id: "viewport",
      label: "Mobile friendly",
      weight: 2,
      status: html.viewport ? "pass" : "fail",
      detail: html.viewport ? "The page sets a viewport for phones." : "No viewport meta tag, so phones show a zoomed-out desktop page.",
      fix: html.viewport ? undefined : 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
    },
    {
      id: "lang",
      label: "Page language",
      weight: 1,
      status: html.lang ? "pass" : "warn",
      detail: html.lang ? `<html lang="${html.lang}">` : "No lang attribute on <html>.",
      fix: html.lang ? undefined : 'Set the language, e.g. <html lang="en-GB">.',
    },
    httpsCheck(facts, 2),
    structuredDataCheck(facts, 1, "warn"),
    shareCheck(facts, 1),
    {
      id: "weight",
      label: "HTML size",
      weight: 1,
      status: page.bytes < 500_000 ? "pass" : page.bytes < 1_500_000 ? "warn" : "fail",
      detail: page.bytes < 1000 ? "The HTML is under 1 KB." : `The HTML is ${Math.round(page.bytes / 1000)} KB.`,
      fix: page.bytes < 500_000 ? undefined : "Trim inline scripts, styles and data from the HTML so it loads and parses quickly.",
    },
    speedCheck(facts, 1),
    {
      id: "favicon",
      label: "Favicon",
      weight: 1,
      status: html.favicon ? "pass" : "warn",
      detail: html.favicon ? "The page links an icon." : "No icon link in the page head.",
      fix: html.favicon ? undefined : "Add an icon link. Google shows it next to your result on phones.",
    },
  ]
}

export async function checkSite(input: string, kind: SiteCheckKind): Promise<SiteReport> {
  const facts = await gather(normalizeUrl(input), kind)
  const checks = kind === "agent" ? agentChecks(facts) : seoChecks(facts)
  return { kind, url: facts.page.url.href, score: scoreChecks(checks), checks }
}
