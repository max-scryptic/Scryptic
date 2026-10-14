import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Graph,
  ItemList,
  Organization,
  Service,
  Thing,
  WebApplication,
  WebPage,
  WebSite,
} from "schema-dts"

import { pages, type PageEntry } from "@/lib/seo"
import { currency, type ServiceOffer } from "@/lib/services"
import { absoluteUrl, siteConfig } from "@/lib/site"
import type { CaseStudy } from "@/lib/work"

/*
 * schema.org builders. Search engines use JSON-LD for rich results; answer
 * engines use it to resolve who said what. Every node gets a stable @id so the
 * root layout's Organization and WebSite can be referenced from each page's
 * graph instead of being repeated.
 *
 * Only describe what is visible on the page. Markup for content a reader
 * cannot see is a spam signal and makes the page ineligible for rich results.
 */

export const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  logo: absoluteUrl("/#logo"),
  webPage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
}

const optional = <T extends object>(value: unknown, fields: T) =>
  value && (!Array.isArray(value) || value.length > 0) ? fields : {}

export function organizationJsonLd(): Organization {
  const { organization } = siteConfig

  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl("/icon-512.png"),
      width: "512",
      height: "512",
      caption: siteConfig.name,
    },
    ...optional(organization.legalName, { legalName: organization.legalName }),
    ...optional(organization.foundingDate, {
      foundingDate: organization.foundingDate,
    }),
    ...optional(siteConfig.sameAs, { sameAs: [...siteConfig.sameAs] }),
  }
}

export function websiteJsonLd(): WebSite {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ids.organization },
  }
}

export function breadcrumbJsonLd(page: PageEntry): BreadcrumbList {
  const trail = [pages.home, ...(page.parents ?? []), page].filter(
    (entry, index, all) => all.findIndex((e) => e.path === entry.path) === index,
  )

  return {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(page.path),
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      item: absoluteUrl(entry.path),
    })),
  }
}

export function webPageJsonLd(page: PageEntry): WebPage {
  return {
    "@type": "WebPage",
    "@id": ids.webPage(page.path),
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    ...optional(page.path !== "/", {
      breadcrumb: { "@id": ids.breadcrumb(page.path) },
    }),
    ...(page.lastModified
      ? { dateModified: new Date(page.lastModified).toISOString() }
      : {}),
  }
}

/**
 * Pair with a visible FAQ section that shows exactly these questions and
 * answers. Question-and-answer blocks are the format answer engines lift most
 * readily, even where Google no longer shows the FAQ rich result.
 */
export function faqJsonLd(
  page: PageEntry,
  items: { question: string; answer: string }[],
): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#faq`,
    isPartOf: { "@id": ids.webPage(page.path) },
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

/** For blog posts, guides and docs. Real dates and a named author matter. */
export function articleJsonLd(
  page: PageEntry,
  article: {
    headline?: string
    datePublished: string
    dateModified?: string
    authorName: string
    authorUrl?: string
    image?: string
  },
): Article {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(page.path)}#article`,
    headline: article.headline ?? page.title,
    description: page.description,
    mainEntityOfPage: { "@id": ids.webPage(page.path) },
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      "@type": "Person",
      name: article.authorName,
      ...optional(article.authorUrl, { url: article.authorUrl }),
    },
    publisher: { "@id": ids.organization },
    image: absoluteUrl(article.image ?? "/opengraph-image"),
    inLanguage: siteConfig.language,
  }
}

/** A service the organization sells, shown as a card on `page`. */
export function serviceJsonLd(page: PageEntry, service: ServiceOffer): Service {
  const url = `${absoluteUrl(page.path)}#${service.id}`

  return {
    "@type": "Service",
    "@id": url,
    name: service.name,
    serviceType: service.serviceType,
    description: service.summary,
    url,
    provider: { "@id": ids.organization },
    areaServed: { "@type": "Country", name: service.areaServed },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      ...optional(service.minPrice, {
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: service.minPrice,
          priceCurrency: currency,
        },
      }),
    },
  }
}

/** The pages listed on an index page, in the order shown. */
export function itemListJsonLd(page: PageEntry, items: PageEntry[]): ItemList {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(page.path)}#list`,
    name: page.title,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: absoluteUrl(item.path),
    })),
  }
}

/** The live product a case study describes, made by the organization. */
export function caseStudyJsonLd(page: PageEntry, study: CaseStudy): WebApplication {
  return {
    "@type": "WebApplication",
    "@id": `${absoluteUrl(page.path)}#app`,
    name: study.name,
    url: study.url,
    description: study.summary,
    applicationCategory: study.category,
    operatingSystem: "Web browser",
    image: absoluteUrl(study.cover.src.src),
    creator: { "@id": ids.organization },
    subjectOf: { "@id": ids.webPage(page.path) },
  }
}

export function graph(...nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes } as Graph
}
