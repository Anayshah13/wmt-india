import { ImageResponse } from "next/og";
import { ogImageAlt } from "@/lib/seo";
import { site } from "@/lib/site";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Uses the built-in default font only — no external font fetches.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0c1a3d",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 168,
              height: 84,
              borderRadius: 84,
              background: "#2350b0",
              fontSize: 44,
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: -1,
            }}
          >
            WMT
          </div>
          <div style={{ display: "flex", marginLeft: 28, fontSize: 26, color: "#f0a531", letterSpacing: 4 }}>
            {site.tradeName.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 31, color: "rgba(255,255,255,0.78)" }}>
            Precision winders & textile machinery spares · Byculla, Mumbai
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex", width: 64, height: 4, background: "#f0a531", marginRight: 20 }} />
          www.wmt-india.com
        </div>
      </div>
    ),
    size,
  );
}
