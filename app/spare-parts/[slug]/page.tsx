import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Chip, Container, CtaBand, PageHero } from "@/components/ui";
import { breadcrumbList, spareCategoryItemList } from "@/lib/schema";
import { openGraphBase } from "@/lib/seo";
import { spareCategories } from "@/lib/site";

export function generateStaticParams() {
  return spareCategories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/spare-parts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = spareCategories.find((x) => x.slug === slug);
  if (!c) return {};
  const title = c.seoTitle;
  return {
    title,
    description: c.summary,
    alternates: { canonical: `/spare-parts/${slug}` },
    openGraph: {
      ...openGraphBase,
      title,
      description: c.summary,
      url: `/spare-parts/${slug}`,
      images: [{ url: c.image.src, alt: c.image.alt, width: c.image.w, height: c.image.h }],
    },
  };
}

export default async function SpareCategoryPage({ params }: PageProps<"/spare-parts/[slug]">) {
  const { slug } = await params;
  const c = spareCategories.find((x) => x.slug === slug);
  if (!c) notFound();
  const others = spareCategories.filter((x) => x.slug !== slug);
  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/spare-parts", label: "Spare Parts" },
    { href: `/spare-parts/${c.slug}`, label: c.short },
  ];

  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <JsonLd data={spareCategoryItemList(c)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Spare parts"
        title={c.name}
        intro={c.summary}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {c.machines.map((m) => (
            <li key={m} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[13px] text-white/85">{m}</li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h2 className="text-2xl font-extrabold text-navy-950">{c.items.length > 1 ? `${c.items.length} part ranges` : "Part range"}</h2>
            <p className="text-sm text-muted">Tap an image to enlarge.</p>
          </div>
          <Gallery items={c.items} columns={c.items.length === 1 ? "grid-cols-1 max-w-4xl" : "sm:grid-cols-2 lg:grid-cols-3"} />
          <p className="mt-8 max-w-3xl text-sm text-muted">
            Brand names are used only to indicate machine compatibility
            and are trademarks of their respective owners.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="text-xl font-extrabold text-navy-950">Other spare-part ranges</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/spare-parts/${o.slug}`} className="group flex h-full flex-col rounded-2xl border border-line p-6 transition hover:border-navy-600/40 hover:shadow-lg">
                  <span className="font-display text-lg font-bold text-navy-950">{o.name}</span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {o.machines.slice(0, 3).map((m) => <Chip key={m}>{m}</Chip>)}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">View range <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={`Need ${c.short.toLowerCase()} spares?`} />
    </>
  );
}
