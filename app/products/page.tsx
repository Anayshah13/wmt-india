import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Check, Chip, Container, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { breadcrumbList, linkList, productLinks } from "@/lib/schema";
import { components, machines, spareCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Winding Machines, Ceramic Guides & Cutters",
  description:
    "WMT-PCP-08 precision winder, WMT-50 cone & cheese winder, ceramic yarn guides, ceramic/carbide cutting blades and spare parts for ring frames, autoconers, TFOs and assembly winders.",
  alternates: { canonical: "/products" },
};

const crumbs = [{ href: "/", label: "Home" }, { href: "/products", label: "Products" }];

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <JsonLd data={linkList("WMT products", productLinks())} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Products"
        title="Winding machines, yarn-path components and spares."
      />

      <section className="bg-white py-20">
        <Container>
          <SectionHeading eyebrow="01 · Winding machines" title="Precision cone, cheese & spool winders" />
          <div className="mt-10 space-y-8">
            {machines.map((m) => (
              <article data-reveal key={m.slug} className="grid overflow-hidden rounded-3xl border border-line md:grid-cols-[320px_1fr]">
                <div className="relative aspect-square bg-white md:aspect-auto">
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="320px" className="object-contain p-6" />
                </div>
                <div className="border-t border-line bg-paper p-7 sm:p-9 md:border-l md:border-t-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-navy-600">{m.model}</span>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">{m.name}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{m.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {m.specs.slice(0, 4).map((s) => (
                      <li key={s.label}><Chip>{s.label}: {s.value.split(" — ")[0].split(",")[0]}</Chip></li>
                    ))}
                  </ul>
                  <Link href={`/products/${m.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
                    Full specifications <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container>
          <SectionHeading eyebrow="02 · Components" title="Ceramic guides & cutting blades" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {components.map((c) => (
              <article data-reveal key={c.slug} className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative aspect-[16/9]">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                </div>
                <div className="p-7 sm:p-9">
                  <h3 className="text-2xl font-extrabold text-navy-950">{c.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{c.summary}</p>
                  <ul className="mt-5 space-y-2">
                    {c.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex gap-2.5 text-[15px] text-ink/85"><Check className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />{p}</li>
                    ))}
                  </ul>
                  <Link href={`/products/${c.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
                    Read more <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="03 · Spare parts" title="Spares by machine type" />
            <Link href="/spare-parts" className="inline-flex items-center gap-2 font-semibold text-navy-700">All spare parts <ArrowRight /></Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {spareCategories.map((c) => (
              <Link data-reveal key={c.slug} href={`/spare-parts/${c.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-navy-950">{c.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{c.machines.slice(0, 4).join(" · ")}{c.machines.length > 4 ? " …" : ""}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
