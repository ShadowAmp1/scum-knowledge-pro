import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SCUM DB PRO";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #050505 0%, #0f172a 55%, #071d17 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(22,242,179,0.25), transparent 35%), radial-gradient(circle at bottom left, rgba(34,197,94,0.18), transparent 40%)"
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "70px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px"
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "999px",
                background: "#16f2b3",
                boxShadow: "0 0 30px #16f2b3"
              }}
            />
            <div
              style={{
                fontSize: 34,
                color: "#16f2b3",
                fontWeight: 700,
                letterSpacing: 4
              }}
            >
              SCUM DB PRO
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "900px"
            }}
          >
            <div
              style={{
                fontSize: 82,
                fontWeight: 900,
                lineHeight: 1,
                marginBottom: 26,
                textTransform: "uppercase"
              }}
            >
              БАЗА ЗНАНИЙ
              <br />
              ПО SCUM
            </div>

            <div
              style={{
                fontSize: 34,
                lineHeight: 1.4,
                color: "#d1d5db"
              }}
            >
              Оружие • Лут • Бункеры • Карта • Гайды • Транспорт
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}
          >
            {[
              "Интерактивная карта",
              "Админ-панель",
              "Трекинг лута",
              "Актуальные гайды"
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(22,242,179,0.35)",
                  fontSize: 24,
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
    {
      ...size
    }
  );
}
