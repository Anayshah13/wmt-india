/** Vector redraw of the original WMT oval logo: white striped lettering on a navy ellipse. */
export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 100" className={className} role="img" aria-label="WMT logo">
      <defs>
        <pattern id="wmt-stripes" width="4" height="5" patternUnits="userSpaceOnUse">
          <rect width="4" height="3.4" fill="#fff" />
        </pattern>
        <radialGradient id="wmt-oval" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#2a56b8" />
          <stop offset="1" stopColor="#0f2a6b" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="50" rx="108" ry="47" fill="url(#wmt-oval)" />
      <text
        x="110"
        y="70"
        textAnchor="middle"
        fontFamily="Arial Black, Archivo, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="58"
        letterSpacing="-2"
        fill="url(#wmt-stripes)"
      >
        WMT
      </text>
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-10 w-auto shrink-0" />
      <span className="leading-tight">
        <span className={`block font-display text-[15px] font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>
          WMT Manufacturing Co.
        </span>
        <span className={`block text-[11px] font-medium uppercase tracking-[0.14em] ${dark ? "text-white/60" : "text-muted"}`}>
          Winding Machinery Traders
        </span>
      </span>
    </span>
  );
}
