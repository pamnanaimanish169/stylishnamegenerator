import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141210",
          borderRadius: 40,
          border: "4px solid #ff2d95",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            background:
              "linear-gradient(135deg, rgba(250,246,239,0.18) 0%, rgba(250,246,239,0) 55%)",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            background: "linear-gradient(135deg, #ff2d95 0%, #c8ff00 50%, #00e8ff 100%)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            marginTop: -8,
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
