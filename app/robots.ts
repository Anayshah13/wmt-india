import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Search and AI answer-engine crawlers are explicitly welcome — the site is public product information. */
const answerEngineCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: answerEngineCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
