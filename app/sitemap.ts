import type { MetadataRoute } from "next";
import { abs } from "@/lib/schema";
import { components, machines, spareCategories } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1, images: [abs(machines[0].image.src)] },
    { url: abs("/products"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/spare-parts"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/about"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: abs("/contact"), lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];

  const products: MetadataRoute.Sitemap = [...machines, ...components].map((p) => ({
    url: abs(`/products/${p.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [abs(p.image.src)],
  }));

  const spares: MetadataRoute.Sitemap = spareCategories.map((c) => ({
    url: abs(`/spare-parts/${c.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: c.items.map((i) => abs(i.src)),
  }));

  return [...pages, ...products, ...spares];
}
