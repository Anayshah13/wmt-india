import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Chip, Container, CtaBand, PageHero } from "@/components/ui";
import { breadcrumbList, linkList, spareLinks } from "@/lib/schema";
import { spareCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ring Frame, Autoconer & TFO Spare Parts",
  description:
    "Spare parts for ring frames (Zinser, Toyoda, Howa, Rieter, LR-6, Marzoli), autoconers (Schlafhorst 238/338, Murata Mach Coner, Savio), TFO twisters and cheese & assembly winders — from WMT, Mumbai.",
  alternates: { canonical: "/spare-parts" },
};

const crumbs = [{ href: "/", label: "Home" }, { href: "/spare-parts", label: "Spare Parts" }];

export default function SparePartsPage() {
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <JsonLd data={linkList("Textile machinery spare-part ranges", spareLinks())} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Spare parts"
        title="Textile machinery spare parts, organised by machine."
      />
      <section className="bg-white py-20">
        <Container className="space-y-8">
          {spareCategories.map((c, i) => (
            <article data-reveal key={c.slug} className={`grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="grid grid-cols-2 gap-1 bg-line">
                {c.items.slice(0, 4).map((it, j) => (
                  <div key={it.src} className={`relative bg-white ${c.items.length === 1 ? "col-span-2 row-span-2 aspect-[4/3]" : c.items.length === 3 && j === 0 ? "col-span-2 aspect-[2/1]" : "aspect-[4/3]"}`}>
                    <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center bg-paper p-8 sm:p-12">
                <span className="font-mono text-xs uppercase tracking-wider text-navy-600">0{i + 1} · {c.items.length} {c.items.length === 1 ? "range" : "ranges"}</span>
                <h2 className="mt-3 text-3xl font-extrabold text-navy-950">{c.name}</h2>
                <p className="mt-3 leading-relaxed text-muted">{c.summary}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">For machines by</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.machines.map((m) => <li key={m}><Chip>{m}</Chip></li>)}
                </ul>
                <Link href={`/spare-parts/${c.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-navy-700 px-6 py-3 font-semibold text-white hover:bg-navy-800">
                  View {c.short.toLowerCase()} spares <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
