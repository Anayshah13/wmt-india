"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);


  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="hidden bg-navy-950 text-[12.5px] text-white/75 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>B-120, Sussex Industrial Estate, Byculla (E), Mumbai</span>
          <span className="flex items-center gap-5">
            <a href={site.phones[2].href} className="hover:text-white">{site.phones[2].display}</a>
            <a href={`mailto:${site.emails[0]}`} className="hover:text-white">{site.emails[0]}</a>
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="WMT Manufacturing Co. — home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
                    isActive(item.href) ? "text-navy-700" : "text-ink/75 hover:text-navy-700"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact#enquiry"
            className="hidden rounded-full bg-navy-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-800 sm:inline-flex"
          >
            Request a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white lg:hidden" onClick={() => setOpen(false)}>
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-base font-medium ${
                    isActive(item.href) ? "bg-navy-50 text-navy-700" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/contact#enquiry" className="block rounded-full bg-navy-700 px-5 py-3 text-center font-semibold text-white">
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
