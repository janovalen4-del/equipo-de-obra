import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Equipo de Obra — Construcción y refacciones";

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
          padding: "80px",
          background: "#101a2a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "20px",
              border: "2px solid #ed6a2c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 40 40" width="60" height="60" fill="none">
              <path
                d="M5 34V16L20 5l15 11v18H23V23h-6v11H5Z"
                stroke="#ed6a2c"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 17h4m8 0h4"
                stroke="#ed6a2c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "40px",
                fontWeight: 800,
                letterSpacing: "3px",
              }}
            >
              EQUIPO DE OBRA
            </div>
            <div style={{ fontSize: "22px", color: "#aab4c4" }}>
              Construcción · Refacciones
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          <div>Tu proyecto merece</div>
          <div style={{ color: "#ed6a2c" }}>una buena base.</div>
        </div>

        <div style={{ fontSize: "22px", color: "#c6cfdb" }}>
          Construcción, electricidad, herrería, pintura y refacciones en CABA y
          Zona Norte.
        </div>
      </div>
    ),
    { ...size },
  );
}
