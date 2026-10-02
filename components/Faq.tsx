import { faqs } from "@/lib/site";

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <h3 className="font-display text-[17px] font-bold text-navy-950">{f.q}</h3>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition group-open:rotate-45" aria-hidden>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 4v12M4 10h12" /></svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
