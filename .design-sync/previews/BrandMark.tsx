import { BrandMark } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// The confluence mark at its three natural sizes — favicon (16), default nav
// (22), and a large splash glyph (48). Three ice/teal/violet strokes flowing
// down into a single node.
export const Sizes = () => (
  <Stage>
    <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
      <BrandMark size={16} />
      <BrandMark size={22} />
      <BrandMark size={48} />
    </div>
  </Stage>
);

// Lockup — the mark beside the product wordmark, as it appears in the app shell
// top-left. Wordmark uses Aurora bright text + Mono caption.
export const Lockup = () => (
  <Stage>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <BrandMark size={26} />
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#e6e9ee", letterSpacing: 0.2 }}>
          Cloacina
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#5b6573" }}>
          orchestration
        </div>
      </div>
    </div>
  </Stage>
);
