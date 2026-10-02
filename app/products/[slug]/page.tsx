import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Check, Chip, Container, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import {
  components,
  gainerImages,
  machines,
  pcpFeatureGallery,
  standardSpec,
  wmt50Power,
  type Component,
  type Machine,
} from "@/lib/site";
import { breadcrumbList, componentProduct, machineProduct } from "@/lib/schema";
import { ogImageAlt as ogAlt, openGraphBase } from "@/lib/seo";

export function generateStaticParams() {
  return [...machines, ...components].map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function find(slug: string) {
  const machine = machines.find((m) => m.slug === slug);
  if (machine) return { kind: "machine" as const, item: machine };
  const component = components.find((c) => c.slug === slug);
  if (component) return { kind: "component" as const, item: component };
  return null;
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};
  const { item } = found;
  const title = found.kind === "machine" ? machineTitle(item as Machine) : item.name;
  return {
    title,
    description: item.summary,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      ...openGraphBase,
      title,
      description: item.summary,
      url: `/products/${slug}`,
      // Tiny source photos (the WMT-50 scan is ~200px) make poor share cards; fall back to the site-wide OG image.
      images:
        item.image.w >= 400
          ? [{ url: item.image.src, alt: item.image.alt, width: item.image.w, height: item.image.h }]
          : [{ url: "/opengraph-image", alt: ogAlt, width: 1200, height: 630 }],
    },
  };
}

/** "WMT-PCP-08 Precision Winder", "WMT-50 Cone & Cheese Winder" — model first, without repeating it. */
function machineTitle(m: Machine) {
  return m.name.includes(m.model) ? m.name : `${m.model} ${m.name.replace(/^WMT\s+/, "")}`;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  return found.kind === "machine" ? <MachineView m={found.item} /> : <ComponentView c={found.item} />;
}

function crumbs(label: string, slug: string) {
  return [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: `/products/${slug}`, label },
  ];
}

function MachineView({ m }: { m: Machine }) {
  const isPcp = m.slug.includes("pcp");
  const trail = crumbs(m.model, m.slug);
  return (
    <>
      <JsonLd data={breadcrumbList(trail)} />
      <JsonLd data={machineProduct(m)} />
      <PageHero crumbs={trail} eyebrow={`Winding machine · ${m.model}`} title={m.name} intro={m.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact#enquiry" className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-6 py-3 font-semibold text-navy-950 hover:bg-white">
            Request a quotation <ArrowRight />
          </Link>
          <a href="#specifications" className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10">
            Technical specifications
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="top-28 lg:sticky">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-white">
              <Image src={m.image.src} alt={m.image.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-contain p-8" />
            </div>
            {isPcp && (
              <div className="mt-4 relative aspect-[272/238] max-w-[50%] overflow-hidden rounded-2xl border border-line">
                <Image src="/images/machines/wmt-pcp-08-front.jpg" alt="Front view of the WMT-PCP-08 precision winder" fill sizes="280px" className="object-contain" />
              </div>
            )}
          </div>

          <div id="specifications" data-reveal className="scroll-mt-28">
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">{isPcp ? "Technical specifications" : "Specifications"}</h2>
            <dl className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line">
              {m.specs.map((s) => (
                <div key={s.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-navy-600 sm:pt-0.5">{s.label}</dt>
                  <dd className="text-[15px] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            {m.basicFeatures && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <FeatureList title="Basic features" items={m.basicFeatures} />
                <FeatureList title="Optional features" items={m.optionalFeatures ?? []} muted />
              </div>
            )}

            {m.mainFeatures && (
              <>
                <h2 className="mt-12 text-2xl font-extrabold text-navy-950">Main features of {m.model}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {m.mainFeatures.map((f) => (
                    <li key={f.title} className="rounded-2xl border border-line bg-paper p-5">
                      <p className="flex items-center gap-2 font-display font-bold text-navy-950"><Check className="h-5 w-5 text-navy-600" />{f.title}</p>
                      {f.text && <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-6 text-xs text-muted">* Design &amp; specifications are subject to change without notice.</p>
          </div>
        </Container>
      </section>

      {isPcp ? (
        <section className="bg-paper py-20">
          <Container>
            <SectionHeading eyebrow="Features" title="A closer look at the WMT-PCP-08" />
            <div className="mt-10">
              <Gallery items={pcpFeatureGallery} />
            </div>
          </Container>
        </section>
      ) : (
        <Wmt50Extras />
      )}

      <CtaBand title={`Interested in the ${m.model}?`} />
    </>
  );
}

function FeatureList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${muted ? "border border-line" : "bg-navy-900 text-white"}`}>
      <h3 className={`text-lg font-extrabold ${muted ? "text-navy-950" : ""}`}>{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[15px]">
            <Check className={`h-5 w-5 shrink-0 ${muted ? "text-navy-600" : "text-amber-brand"}`} />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Wmt50Extras() {
  return (
    <>
      <section className="bg-paper py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Gainer system" title="Gear gain & belt gain" intro="Gear gain for honeycomb or open-comb winding, and belt gain for close winding of sewing thread." />
            <ul className="mt-8 grid grid-cols-3 gap-4">
              {gainerImages.map((g) => (
                <li key={g.src} className="flex flex-col items-center rounded-2xl border border-line bg-white p-4">
                  <div className="relative h-36 w-full">
                    <Image src={g.src} alt={g.alt} fill sizes="160px" className="object-contain" />
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-navy-950">{g.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Power & floor space" title="Power & floor space" />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full text-left text-[15px]">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Spindles</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Power required</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Floor space (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {wmt50Power.map((r) => (
                    <tr key={r.spindles}>
                      <td className="px-5 py-4 font-semibold">{r.spindles}</td>
                      <td className="px-5 py-4">{r.power}</td>
                      <td className="px-5 py-4 font-mono text-sm">{r.floor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-2xl border border-line bg-white p-5">
              <p className="font-display font-bold text-navy-950">Drive system</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">Modified upper drive system introduced to increase the life of the driving belt as well as decrease the load on the motor.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading eyebrow="Standard specification" title="Standard specification for various purposes" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">WMT-50 standard winding specifications by yarn type</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  {["Yarn", "Package", "Lift", "Taper", "Max. dia (mm)", "Winding", "Wind", "Yarn speed (m/min)"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3.5 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {standardSpec.map((r, i) => (
                  <tr key={i} className="odd:bg-paper">
                    <th scope="row" className="px-4 py-3.5 font-semibold text-navy-950">{r.yarn}</th>
                    <td className="px-4 py-3.5">{r.shape}</td>
                    <td className="px-4 py-3.5">{r.lift}</td>
                    <td className="px-4 py-3.5 font-mono">{r.taper}</td>
                    <td className="px-4 py-3.5 font-mono">{r.dia}</td>
                    <td className="px-4 py-3.5">{r.winding}</td>
                    <td className="px-4 py-3.5 font-mono">{r.wind}</td>
                    <td className="px-4 py-3.5 font-mono">{r.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid items-center gap-8 rounded-3xl border border-line p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h3 className="text-xl font-extrabold text-navy-950">Winding patterns</h3>
              <p className="mt-2 text-muted">Close wind, open wind and honeycomb wind.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Close wind", "Open wind", "Honeycomb wind"].map((w) => <Chip key={w}>{w}</Chip>)}
              </div>
            </div>
            <div className="relative aspect-[425/252] overflow-hidden rounded-xl bg-white">
              <Image src="/images/features/winding-patterns.jpg" alt="Chart of close, open and honeycomb winding patterns at different wind ratios" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-contain" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ComponentView({ c }: { c: Component }) {
  const other = components.find((o) => o.slug !== c.slug)!;
  const trail = crumbs(c.name, c.slug);
  return (
    <>
      <JsonLd data={breadcrumbList(trail)} />
      <JsonLd data={componentProduct(c)} />
      <PageHero crumbs={trail} eyebrow="Products" title={c.name} intro={c.summary} />
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Gallery items={[{ ...c.image, title: c.name }]} columns="grid-cols-1" aspect="aspect-[797/467]" />
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-ink/85">{c.body}</p>
            <ul className="mt-8 space-y-3">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl border border-line bg-paper px-4 py-3.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact#enquiry" className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 font-semibold text-white hover:bg-navy-800">
                Request a quotation <ArrowRight />
              </Link>
              <Link href={`/products/${other.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold text-navy-800 hover:bg-paper">
                {other.name}
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
