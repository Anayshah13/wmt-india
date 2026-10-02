"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const interests = [
  "WMT-PCP-08 Precision Winder",
  "WMT-50 Cone & Cheese Winder",
  "Ceramic Guides",
  "Ceramic / Carbide Cutters",
  "Ring Frame Spares",
  "Auto Winding Spares",
  "TFO Spares",
  "Cheese & Assembly Winder Spares",
  "Other",
];

/**
 * The site is static, so the enquiry is handed to the visitor's email client
 * pre-filled and addressed to WMT, instead of posting to a server.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Enquiry: ${get("interest") || "Products"} — ${get("company") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Country: ${get("country")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Interested in: ${get("interest")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${site.emails.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink shadow-sm outline-none transition placeholder:text-muted/60 focus:border-navy-600 focus:ring-4 focus:ring-navy-600/10";
  const label = "text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Name <span className="text-amber-deep">*</span></span>
        <input name="name" required autoComplete="name" className={field} placeholder="Your full name" />
      </label>
      <label className="block">
        <span className={label}>Company name</span>
        <input name="company" autoComplete="organization" className={field} placeholder="Mill / company" />
      </label>
      <label className="block">
        <span className={label}>Email <span className="text-amber-deep">*</span></span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+91 …" />
      </label>
      <label className="block">
        <span className={label}>Country</span>
        <input name="country" autoComplete="country-name" className={field} placeholder="India" />
      </label>
      <label className="block">
        <span className={label}>Interested in</span>
        <select name="interest" className={field} defaultValue="">
          <option value="">Select a product range</option>
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message</span>
        <textarea
          name="message"
          rows={5}
          className={field}
          placeholder="Machine make & model, part name or number, quantity required…"
        />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Fields marked * are mandatory. Submitting opens your email app with the enquiry ready to send.</p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-navy-700 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-navy-800"
        >
          Send enquiry
        </button>
      </div>
      {sent && (
        <p role="status" className="rounded-lg bg-navy-50 px-4 py-3 text-sm text-navy-800 sm:col-span-2">
          Your email app should now be open with the enquiry. If it didn’t open, write to{" "}
          <a className="font-semibold underline" href={`mailto:${site.emails[0]}`}>{site.emails[0]}</a>.
        </p>
      )}
    </form>
  );
}
