import Link from "next/link";
import { components, machines, site, spareCategories } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="yarn-lines">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Manufacturer of precision winding machines, ceramic guides, cutters and textile machinery spare parts —
              from our factory in Byculla, Mumbai.
            </p>
            <blockquote className="mt-6 border-l-2 border-amber-brand pl-4 text-sm italic text-white/80">
              “{site.motto}”
            </blockquote>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Products</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {machines.map((m) => (
                <li key={m.slug}>
                  <Link className="hover:text-white" href={`/products/${m.slug}`}>{m.model} {m.slug.includes("pcp") ? "Precision Winder" : "Cone Winder"}</Link>
                </li>
              ))}
              {components.map((c) => (
                <li key={c.slug}>
                  <Link className="hover:text-white" href={`/products/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Spare Parts</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {spareCategories.map((c) => (
                <li key={c.slug}>
                  <Link className="hover:text-white" href={`/spare-parts/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li><Link className="hover:text-white" href="/about">Company profile</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Office &amp; Factory</h2>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>{site.address.city} – {site.address.postalCode}, {site.address.country}</p>
            </address>
            <ul className="mt-4 space-y-1.5 text-sm">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <span className="text-white/45">{p.label}: </span>
                  <a className="hover:text-white" href={p.href}>{p.display}</a>
                </li>
              ))}
              <li><span className="text-white/45">Fax: </span>{site.fax}</li>
              {site.emails.map((e) => (
                <li key={e}>
                  <a className="hover:text-white" href={`mailto:${e}`}>{e}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} WMT Manufacturing Co. (Winding Machinery Traders). All rights reserved.</p>
          <p>Machine brand names are trademarks of their respective owners and are used only to indicate compatibility.</p>
        </div>
      </div>
    </footer>
  );
}
