import { GraphHealth } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const MONO = "'IBM Plex Mono', monospace";

// The variant axis: a bare string ("live" → ok), a {state} object
// ("warming" → gold, "unreachable" → bad), and the null/unknown fallback
// (muted "unknown" pill). Same defensive renderer across all shapes.
export const Variants = () => (
  <Stage>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
      <GraphHealth value="live" />
      <GraphHealth value={{ state: "warming" }} />
      <GraphHealth value={{ state: "socket_only" }} />
      <GraphHealth value={{ state: "unreachable" }} />
      <GraphHealth value={null} />
    </div>
  </Stage>
);

// As it reads beside a computation-graph name in the overview.
export const InGraphRow = () => (
  <Stage>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: MONO,
        fontSize: 13,
        color: "#c3cbd5",
      }}
    >
      <span style={{ color: "#e6e9ee", fontWeight: 600 }}>events-rollup</span>
      <GraphHealth value={{ state: "live" }} />
      <span style={{ color: "#5b6573" }}>~42/min</span>
    </div>
  </Stage>
);
