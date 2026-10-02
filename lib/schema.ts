/**
 * schema.org JSON-LD builders. Every value is derived from lib/site.ts — never add facts here
 * that aren't visible on the site (no ratings, prices, founding dates, etc.).
 */
import {
  components,
  faqs,
  machines,
  site,
  spareCategories,
  type Component,
  type Machine,
  type SpareCategory,
} from "@/lib/site";

type Json = Record<string, unknown>;

const CONTEXT = "https://schema.org";
export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

/** Absolute URL for a site-relative path ("/" → "https://www.wmt-india.com/"). */
export const abs = (path: string) => new URL(path, site.url).toString();

const brand = { "@type": "Brand", name: "WMT" };
const manufacturerRef = { "@type": "Organization", "@id": orgId, name: site.name, url: abs("/") };

const areaServed = [
  { "@type": "Country", name: "India" },
  { "@type": "Place", name: "Worldwide" },
];

/** Organization + LocalBusiness and WebSite, rendered once in the root layout. */
export function siteGraph(): Json {
  const organization = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.name,
    alternateName: site.tradeName,
    url: abs("/"),
    logo: {
      "@type": "ImageObject",
      url: abs("/images/brand/wmt-logo-original.png"),
      width: 219,
      height: 97,
    },
    image: [abs("/images/brand/wmt-logo-original.png"), abs(machines[0].image.src)],
    description: site.description,
    slogan: site.tagline,
    brand,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    telephone: site.phones[0].display,
    email: site.emails[0],
    faxNumber: site.fax,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phones.map((p) => p.display),
      email: [...site.emails],
      faxNumber: site.fax,
      areaServed,
    },
    areaServed,
    knowsAbout: [
      "Textile machinery manufacturing",
      "Precision cone winding machines",
      "Cheese and spool winding machines",
      "Soft dye package winding",
      "Ceramic yarn guides",
      "Ceramic and carbide yarn cutting blades",
      "Ring frame spare parts",
      "Autoconer (automatic cone winder) spare parts",
      "TFO twister spare parts",
      "Cheese and assembly winder spare parts",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: abs("/"),
    name: site.name,
    alternateName: site.tradeName,
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };

  return { "@context": CONTEXT, "@graph": [organization, website] };
}

export type Crumb = { href: string; label: string };

/** BreadcrumbList — pass the same crumbs array that PageHero renders. */
export function breadcrumbList(crumbs: Crumb[]): Json {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };
}

/** FAQPage built from the FAQs rendered by components/Faq.tsx. */
export function faqPage(items: { q: string; a: string }[] = faqs): Json {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const prop = (name: string, value: string) => ({ "@type": "PropertyValue", name, value });

export function machineProduct(m: Machine): Json {
  const url = abs(`/products/${m.slug}`);
  const images = [abs(m.image.src)];
  if (m.slug.includes("pcp")) images.push(abs("/images/machines/wmt-pcp-08-front.jpg"));
  const extra = [
    ...(m.basicFeatures ? [prop("Basic features", m.basicFeatures.join(", "))] : []),
    ...(m.optionalFeatures?.length ? [prop("Optional features", m.optionalFeatures.join(", "))] : []),
    ...(m.mainFeatures ? [prop("Main features", m.mainFeatures.map((f) => f.title).join(", "))] : []),
  ];
  return {
    "@context": CONTEXT,
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: m.name,
    model: m.model,
    brand,
    manufacturer: manufacturerRef,
    image: images,
    description: m.intro,
    category: "Textile winding machines",
    additionalProperty: [...m.specs.map((s) => prop(s.label, s.value)), ...extra],
  };
}

export function componentProduct(c: Component): Json {
  const url = abs(`/products/${c.slug}`);
  return {
    "@context": CONTEXT,
    "@type": "Product",
    "@id": `${url}#product`,
    url,
    name: c.name,
    brand,
    manufacturer: manufacturerRef,
    image: abs(c.image.src),
    description: c.body,
    category: "Textile machinery yarn-path components",
    additionalProperty: c.points.map((p) => prop("Feature", p)),
  };
}

/** How each category's compatible machines read as product names (e.g. "Zinser ring frame"). */
const machineNoun: Record<string, string> = {
  "ring-frame": "ring frame",
  "auto-winding": "",
  tfo: "TFO twister",
  "cheese-assembly-winder": "cheese / assembly winder",
};

/** ItemList of the part ranges on a spare-part category page, each a Product tied to its compatible machines. */
export function spareCategoryItemList(c: SpareCategory): Json {
  const url = abs(`/spare-parts/${c.slug}`);
  const noun = machineNoun[c.slug] ?? "";
  const compatible = `Compatible with ${c.machines.join(", ")}${noun ? ` ${noun}s` : ""}.`;
  const isRelatedTo = c.machines.map((m) => ({ "@type": "Product", name: noun ? `${m} ${noun}` : m }));
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    "@id": `${url}#parts`,
    url,
    name: c.name,
    description: `${c.summary} ${compatible}`,
    numberOfItems: c.items.length,
    itemListElement: c.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: c.slug === "auto-winding" ? `${it.title} spare parts` : it.title,
        image: abs(it.src),
        description: `${it.alt}. ${compatible}`,
        category: c.name,
        isRelatedTo,
      },
    })),
  };
}

/** ItemList of links — used on the /products and /spare-parts hubs. */
export function linkList(name: string, links: { href: string; name: string }[]): Json {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name,
    numberOfItems: links.length,
    itemListElement: links.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: l.name, url: abs(l.href) })),
  };
}

export const productLinks = () => [
  ...machines.map((m) => ({ href: `/products/${m.slug}`, name: m.name.includes(m.model) ? m.name : `${m.name} (${m.model})` })),
  ...components.map((c) => ({ href: `/products/${c.slug}`, name: c.name })),
];

export const spareLinks = () => spareCategories.map((c) => ({ href: `/spare-parts/${c.slug}`, name: c.name }));
