import { ImageResponse } from "next/og";

export type OgCardVariant = "home" | "weapons" | "bunkers" | "loot";

type OgCardOptions = {
  variant: OgCardVariant;
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
  accent?: string;
};

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630
};

const variantBackground: Record<OgCardVariant, string> = {
  home: "linear-gradient(135deg, #050505 0%, #0f172a 55%, #071d17 100%)",
  weapons: "linear-gradient(135deg, #070707 0%, #1f0707 52%, #2a0f0f 100%)",
  bunkers: "linear-gradient(135deg, #030712 0%, #111827 48%, #064e3b 100%)",
  loot: "linear-gradient(135deg, #050505 0%, #1e1b4b 48%, #431407 100%)"
};

const variantAccent: Record<OgCardVariant, string> = {
  home: "#16f2b3",
  weapons: "#ef4444",
  bunkers: "#22c55e",
  loot: "#f59e0b"
};

function Pattern({ accent }: { accent: string }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 82% 18%, ${accent}44, transparent 32%), radial-gradient(circle at 12% 85%, ${accent}28, transparent 38%)`
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.23,
          backgroundImage: `linear-gradient(115deg, transparent 0 42%, ${accent}55 43%, transparent 44% 100%)`,
          backgroundSize: "120px 120px"
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -90,
          top: 54,
          width: 430,
          height: 430,
          borderRadius: 999,
          border: `5px solid ${accent}55`,
          boxShadow: `0 0 80px ${accent}55`
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 92,
          bottom: 78,
          width: 270,
          height: 270,
          borderRadius: 999,
          border: `2px solid ${accent}44`
        }}
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 70 + index * 96,
            top: 88 + index * 46,
            width: 220,
            height: 3,
            borderRadius: 999,
            background: `${accent}66`,
            boxShadow: `0 0 18px ${accent}`,
            transform: "skewX(-22deg)"
          }}
        />
      ))}
    </>
  );
}

export function createOgImage(options: OgCardOptions) {
  const accent = options.accent ?? variantAccent[options.variant];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: variantBackground[options.variant],
          color: "white",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <Pattern accent={accent} />

        <div
          style={{
            position: "absolute",
            inset: 34,
            border: `1px solid ${accent}55`,
            borderRadius: 42,
            boxShadow: `inset 0 0 60px ${accent}18`
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "70px",
            zIndex: 2
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: accent,
                  boxShadow: `0 0 30px ${accent}`
                }}
              />
              <div
                style={{
                  fontSize: 32,
                  color: accent,
                  fontWeight: 900,
                  letterSpacing: 4,
                  textTransform: "uppercase"
                }}
              >
                {options.eyebrow}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                padding: "12px 20px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.42)",
                border: `1px solid ${accent}55`,
                color: "#e5e7eb",
                fontSize: 22,
                fontWeight: 800
              }}
            >
              scumdbpro.duckdns.org
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div
              style={{
                fontSize: 78,
                fontWeight: 900,
                lineHeight: 0.96,
                marginBottom: 26,
                textTransform: "uppercase",
                textShadow: `0 0 28px ${accent}66`
              }}
            >
              {options.title}
            </div>

            <div
              style={{
                maxWidth: 850,
                fontSize: 32,
                lineHeight: 1.35,
                color: "#d1d5db"
              }}
            >
              {options.subtitle}
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {options.tags.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 22px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: `1px solid ${accent}66`,
                  fontSize: 23,
                  fontWeight: 800,
                  color: "#f3f4f6"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    OG_IMAGE_SIZE
  );
}
