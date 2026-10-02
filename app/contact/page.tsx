import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageHero } from "@/components/ui";
import { breadcrumbList } from "@/lib/schema";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Byculla, Mumbai",
  description: `Contact WMT Manufacturing Co. at ${fullAddress}. Tel +91 22 2372 3837, mobile +91 98200 04055, email jigar@wmt-india.com.`,
  alternates: { canonical: "/contact" },
};

const crumbs = [{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbList(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Byculla, Mumbai"
        title="Contact us"
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <Card title="Office & Factory">
              <address className="not-italic leading-relaxed text-ink/85">
                <strong className="text-navy-950">{site.name}</strong>
                <br />
                {site.address.line1},<br />
                {site.address.line2},<br />
                {site.address.landmark},<br />
                {site.address.city} – {site.address.postalCode}, {site.address.region},<br />
                {site.address.country}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-navy-700 hover:underline"
              >
                Open in Google Maps ↗
              </a>
            </Card>
            <Card title="Contact numbers">
              <ul className="space-y-2">
                {site.phones.map((p) => (
                  <li key={p.href} className="flex justify-between gap-4">
                    <span className="text-muted">{p.label}</span>
                    <a href={p.href} className="font-semibold text-navy-800 hover:underline">{p.display}</a>
                  </li>
                ))}
                <li className="flex justify-between gap-4">
                  <span className="text-muted">Fax</span>
                  <span className="font-semibold text-navy-800">{site.fax}</span>
                </li>
              </ul>
            </Card>
            <Card title="Email">
              <ul className="space-y-2">
                {site.emails.map((e) => (
                  <li key={e}><a href={`mailto:${e}`} className="font-semibold text-navy-800 hover:underline">{e}</a></li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-8">
            <div id="enquiry" className="scroll-mt-28 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
              <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">Enquiry form</h2>
              <p className="mt-2 text-muted">Tell us what you need — machine make & model, part name or number and quantity help us quote faster.</p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <iframe
                title="Map showing WMT Manufacturing Co., Sussex Industrial Estate, Byculla East, Mumbai"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=16&output=embed`}
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">{title}</h2>
      {children}
    </div>
  );
}
