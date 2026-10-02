"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; w: number; h: number; title: string };

export function Gallery({
  items,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
  aspect = "aspect-[4/3]",
  fit = "cover",
}: {
  items: GalleryItem[];
  columns?: string;
  aspect?: string;
  fit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const active = index === null ? null : items[index];

  return (
    <>
      <ul className={`grid gap-5 ${columns}`}>
        {items.map((item, i) => (
          <li key={item.src + i} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
            >
              <div className={`relative ${aspect} overflow-hidden bg-navy-50`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={`${fit === "cover" ? "object-cover" : "object-contain p-3"} transition duration-500 group-hover:scale-[1.04]`}
                />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-navy-800 opacity-0 shadow transition group-hover:opacity-100" aria-hidden>
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H3v5M12 3h5v5M8 17H3v-5M12 17h5v-5" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="font-display text-[15px] font-bold text-navy-950">{item.title}</span>
                <span className="text-xs font-medium text-navy-600">View</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <figure className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative overflow-hidden rounded-2xl bg-white">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="mx-auto max-h-[78vh] w-auto object-contain"
                priority
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-white">
              <span className="font-display text-lg font-bold">{active.title}</span>
              <span className="text-sm text-white/60">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-navy-900 shadow hover:bg-white">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 4-6 6 6 6" /></svg>
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-navy-900 shadow hover:bg-white">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m8 4 6 6-6 6" /></svg>
                </button>
              </>
            )}
            <button type="button" onClick={close} aria-label="Close" className="absolute -top-3 -right-3 rounded-full bg-amber-brand p-2.5 text-navy-950 shadow-lg">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 5l10 10M15 5 5 15" /></svg>
            </button>
          </figure>
        </div>
      )}
    </>
  );
}
