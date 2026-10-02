import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Container, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { breadcrumbList } from "@/lib/schema";
import { components, machines, site, spareCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "WMT Manufacturing Co. (Winding Machinery Traders), Byculla, Mumbai — manufacturer of winding machines, ceramic guides, cutters and textile machinery spare parts.",
  alternates: { canonical: "/about" },
};

const crumbs = [{ href: "/", label: "Home" }, { href: "/about", label: "Company Profile" }];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow="Company profile" title="About WMT" />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal className="space-y-6 text-[17px] leading-relaxed text-ink/85">
            <p>
              WMT has been manufacturing quality spare parts for the textile industry for decades. Our experience has
              helped us deliver high quality products at very competitive rates.
            </p>
            <p>
              The company has established strong equity for the <strong className="text-navy-950">“WMT”</strong> brand
              and has successfully penetrated the international market.
            </p>
            <figure className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
              <blockquote className="font-display text-2xl font-bold leading-snug sm:text-3xl">“{site.motto}”</blockquote>
              <figcaption className="mt-4 text-sm uppercase tracking-[0.16em] text-white/55">Our motto</figcaption>
            </figure>
          </div>

          <aside data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <dl className="divide-y divide-line rounded-3xl border border-line">
              {[
                ["Company", site.name],
                ["Trade name", site.tradeName],
                ["Proprietor", site.owner],
                ["Address", `${site.address.line1}, ${site.address.line2}, ${site.address.city} – ${site.address.postalCode}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 px-6 py-4 text-sm">
                  <dt className="shrink-0 text-muted">{k}</dt>
                  <dd className="text-right font-medium text-navy-950">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Product guide" title="Our range" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <GuideCol i={0} title="Winding Machines" links={machines.map((m) => ({ href: `/products/${m.slug}`, label: m.model }))} />
            <GuideCol i={1} title="Ceramic Guides" links={[{ href: `/products/${components[0].slug}`, label: components[0].name }]} />
            <GuideCol i={2} title="Cutters" links={[{ href: `/products/${components[1].slug}`, label: components[1].name }]} />
            <GuideCol i={3} title="Spare Parts" links={spareCategories.map((c) => ({ href: `/spare-parts/${c.slug}`, label: `Spares for ${c.short}` }))} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function GuideCol({ title, links, i }: { title: string; links: { href: string; label: string }[]; i: number }) {
  return (
    <div data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="rounded-2xl border border-line bg-white p-6">
      <h3 className="text-lg font-extrabold text-navy-950">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-2 text-[15px] text-navy-700 hover:text-navy-900">
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /> {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
