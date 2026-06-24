import { Dot } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#c3cbd5" }}>
    {children}
  </span>
);

// Execution status dots in the semantic palette — running / succeeded /
// skipped / failed — each with its soft glow ring on.
export const StatusColors = () => (
  <Stage>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Row>
        <Dot color="#7fb2ff" glow />
        <Label>running</Label>
      </Row>
      <Row>
        <Dot color="#4bd07f" glow />
        <Label>succeeded</Label>
      </Row>
      <Row>
        <Dot color="#cf83a4" glow />
        <Label>skipped</Label>
      </Row>
      <Row>
        <Dot color="#f06464" glow />
        <Label>failed</Label>
      </Row>
    </div>
  </Stage>
);

// Glow off vs glow on — the boxShadow ring is what reads as "live" in a
// status strip. Same teal accent both times for a clean A/B.
export const GlowToggle = () => (
  <Stage>
    <Row>
      <Dot color="#5fd0c5" />
      <Label>idle</Label>
      <span style={{ width: 16 }} />
      <Dot color="#5fd0c5" glow />
      <Label>active</Label>
    </Row>
  </Stage>
);

// Size scale — 6px inline marker, 8px default, 12px header indicator. Gold
// accent (manual trigger) so size differences are easy to read.
export const Sizes = () => (
  <Stage>
    <Row>
      <Dot color="#d8a657" size={6} glow />
      <Dot color="#d8a657" size={8} glow />
      <Dot color="#d8a657" size={12} glow />
    </Row>
  </Stage>
);
