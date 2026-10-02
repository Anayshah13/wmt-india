# wmt-india

Redesigned website for **WMT Manufacturing Co. (Winding Machinery Traders)**, Byculla, Mumbai — manufacturer of precision winding machines, ceramic guides, cutters and textile machinery spare parts.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `lib/site.ts` — all company, product and spare-part content (single source of truth)
- `lib/schema.ts`, `lib/seo.ts` — JSON-LD structured data and shared metadata
- `app/` — pages, sitemap, robots, manifest and Open Graph image
- `public/images/` — product images carried over from the original wmt-india.com
- `next.config.ts` — permanent redirects from the old `.php` URLs
