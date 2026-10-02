import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Open Graph fields shared by every page. Next.js replaces (not merges) a parent's `openGraph`
 * when a page defines its own, so pages that set `openGraph` should spread this in.
 */
export const openGraphBase = {
  type: "website",
  locale: "en_IN",
  siteName: site.name,
} satisfies Metadata["openGraph"];

export const keywords = [
  "WMT Manufacturing Co.",
  "Winding Machinery Traders",
  "WMT India",
  "precision winding machine",
  "cone winding machine",
  "cheese winding machine",
  "soft dye package winder",
  "WMT-PCP-08",
  "WMT-50",
  "ceramic yarn guides",
  "ceramic cutter",
  "carbide cutting blades",
  "ring frame spares",
  "autoconer spares",
  "Schlafhorst 238 spares",
  "Murata Mach Coner spares",
  "Savio spares",
  "TFO spares",
  "assembly winder spares",
  "textile machinery spare parts Mumbai",
  "textile machinery manufacturer Byculla",
];

export const ogImageAlt = `${site.name} — precision winders & textile machinery spares, Byculla, Mumbai`;
