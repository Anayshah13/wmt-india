import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-amber-brand" : "text-navy-600"}`}>
      <span className={`h-px w-6 ${light ? "bg-amber-brand" : "bg-navy-600"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-3xl font-extrabold sm:text-4xl ${light ? "text-white" : "text-navy-950"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[17px] leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

export type Crumb = { href: string; label: string };

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="yarn-lines absolute inset-0" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-navy-600/30 blur-3xl" aria-hidden />
      <Container className="relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/55">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-white/85">{c.label}</span>
                ) : (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <div className="mt-8"><Eyebrow light>{eyebrow}</Eyebrow></div>}
        <h1 className={`${eyebrow ? "mt-4" : "mt-8"} max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl`}>{title}</h1>
        {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</div>}
        {children}
      </Container>
    </section>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity=".14" />
      <path d="m6 10.2 2.6 2.6L14.2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-navy-100 bg-navy-50 px-3 py-1 text-[12.5px] font-medium text-navy-800">
      {children}
    </span>
  );
}

export function CtaBand({ title = "Send us an enquiry", text }: { title?: string; text?: string }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-12 text-white sm:px-12 sm:py-14">
          <div className="yarn-lines absolute inset-0" aria-hidden />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-amber-brand/25 blur-3xl" aria-hidden />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
              <p className="mt-3 text-white/75">
                {text ??
                  "Share the machine make, part name or a photo of the part."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact#enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-6 py-3.5 font-semibold text-navy-950 transition hover:bg-white"
              >
                Send an enquiry <ArrowRight />
              </Link>
              <a
                href={site.phones[2].href}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Call {site.phones[2].display}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
