import { Pill } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>
);

// The Aurora accent palette — ice / teal / violet / gold, each at full strength
// on its own 1c-alpha tint. The pill's standard use is a kind/status tag.
export const AccentColors = () => (
  <Stage>
    <Row>
      <Pill color="#7fb2ff">accumulator</Pill>
      <Pill color="#5fd0c5">string</Pill>
      <Pill color="#9d8cff">reactor</Pill>
      <Pill color="#d8a657">manual</Pill>
    </Row>
  </Stage>
);

// Semantic status colors — ok / failed / skipped / muted.
export const SemanticColors = () => (
  <Stage>
    <Row>
      <Pill color="#4bd07f">healthy</Pill>
      <Pill color="#f06464">unreachable</Pill>
      <Pill color="#cf83a4">skipped</Pill>
      <Pill color="#8b95a3">pending</Pill>
    </Row>
  </Stage>
);

// Inline alongside text — the pill is display:inline-block, Plex Mono, radius 10.
export const InContext = () => (
  <Stage>
    <div style={{ fontSize: 13, color: "#c3cbd5", lineHeight: 2 }}>
      Param <Pill color="#5fd0c5">STRING</Pill> · retries <Pill color="#7fb2ff">INTEGER</Pill> · enabled{" "}
      <Pill color="#9d8cff">BOOLEAN</Pill>
    </div>
  </Stage>
);
