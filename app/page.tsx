import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Chip, Container, CtaBand, Eyebrow, SectionHeading } from "@/components/ui";
import { faqPage } from "@/lib/schema";
import { allBrands, components, machines, site, spareCategories } from "@/lib/site";

// Title & description come from the root layout defaults.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const conveyor = spareCategories.flatMap((c) => c.items.map((i) => ({ ...i, href: `/spare-parts/${c.slug}` })));

const delay = (i: number) => ({ "--reveal-delay": `${i * 90}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <JsonLd data={faqPage()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="yarn-lines absolute inset-0" aria-hidden />
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-navy-600/35 blur-3xl" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Eyebrow light>Byculla, Mumbai</Eyebrow>
            <h1 className="mt-6 text-[2.6rem] font-black leading-[1.03] sm:text-6xl">
              Winding machines &amp; <span className="text-amber-brand">textile machinery spares.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Precision winders, ceramic guides, cutters and spare parts for ring frames, auto winders, TFOs and
              assembly winders.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-6 py-3.5 font-semibold text-navy-950 transition hover:bg-white">
                View products <ArrowRight />
              </Link>
              <Link href="/contact#enquiry" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold transition hover:bg-white/10">
                Send an enquiry
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px]">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#c4dcf7] via-[#dbe9fa] to-[#eef5ff] px-8 pt-10 pb-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <div className="mascot-walk">
                <Image
                  src="/images/brand/wmt-machine-man.png"
                  alt="The WMT machine man mascot, a walking robot made of winding-machine parts"
                  width={312}
                  height={456}
                  priority
                  className="mascot-bob mx-auto h-auto w-[62%]"
                />
              </div>
              <p className="mt-6 text-center font-display text-[1.35rem] font-extrabold uppercase leading-tight tracking-[0.06em] text-navy-900">
                Shape the future
                <br />
                of winding
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="grid-dots bg-paper py-20 sm:py-24">
        <Container>
          <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Products" title="What we make" />
            <Link href="/products" className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
              All products <ArrowRight />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {machines.map((m, i) => (
              <Link data-reveal style={delay(i)} key={m.slug} href={`/products/${m.slug}`} className="group grid overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[1fr_1.1fr]">
                <div className="relative aspect-square bg-white sm:aspect-auto">
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-contain p-6 transition duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col border-t border-line p-7 sm:border-l sm:border-t-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-navy-600">Winding machine · {m.model}</span>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy-950">{m.name}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{m.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
                    View specifications <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
            {components.map((c, i) => (
              <Link data-reveal style={delay(i)} key={c.slug} href={`/products/${c.slug}`} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-extrabold text-navy-950">{c.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
                    Read more <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Spare parts — a nod to the original site's sliding showcase */}
      <section className="overflow-hidden bg-white py-20 sm:py-24">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Spare parts" title="Spares for ring frame, auto winding, TFO & assembly winders" />
          </div>
        </Container>
        <div data-reveal className="marquee-pause mt-12">
          <ul className="animate-marquee flex w-max gap-5 pl-5">
            {[...conveyor, ...conveyor].map((item, i) => (
              <li key={i} aria-hidden={i >= conveyor.length} className="w-64 shrink-0">
                <Link href={item.href} tabIndex={i >= conveyor.length ? -1 : 0} className="block overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-lg">
                  <div className="relative aspect-[4/3]">
                    <Image src={item.src} alt={item.alt} fill sizes="256px" className="object-cover" />
                  </div>
                  <p className="px-4 py-3 font-display text-sm font-bold text-navy-950">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Container>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {spareCategories.map((c, i) => (
              <Link data-reveal style={delay(i)} key={c.slug} href={`/spare-parts/${c.slug}`} className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition hover:border-navy-600/40 hover:bg-white hover:shadow-lg">
                <h3 className="text-lg font-extrabold text-navy-950">{c.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.machines.join(" · ")}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
                  View <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="border-y border-line bg-paper py-12">
        <Container>
          <div data-reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">Spares for machines by</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {allBrands.map((b) => (
                <li key={b}><Chip>{b}</Chip></li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/features/multipurpose-winding.jpg" alt="WMT precision winder heads winding filament yarn packages" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div data-reveal style={delay(1)}>
            <SectionHeading
              eyebrow="Company profile"
              title="About WMT"
              intro="WMT has been manufacturing quality spare parts for the textile industry for decades, and has established the “WMT” brand in India and in international markets."
            />
            <blockquote className="mt-8 border-l-4 border-amber-brand pl-5 font-display text-xl font-bold leading-snug text-navy-900">
              “{site.motto}”
            </blockquote>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-navy-900">
              Company profile <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div data-reveal>
            <SectionHeading eyebrow="FAQ" title="Common questions" />
          </div>
          <div data-reveal style={delay(1)}>
            <Faq />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
