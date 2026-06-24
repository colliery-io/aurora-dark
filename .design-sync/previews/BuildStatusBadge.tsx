import { BuildStatusBadge } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const MONO = "'IBM Plex Mono', monospace";

// The four known build states: success (ok), failed (bad), building (ice),
// pending (muted). Unknown strings fall back to muted rather than crash.
export const AllStatuses = () => (
  <Stage>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <BuildStatusBadge status="success" />
      <BuildStatusBadge status="building" />
      <BuildStatusBadge status="failed" />
      <BuildStatusBadge status="pending" />
      <BuildStatusBadge status="queued" />
    </div>
  </Stage>
);

// As it reads beside a packaged-workflow build row.
export const InBuildRow = () => (
  <Stage>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: MONO,
        fontSize: 12.5,
        color: "#c3cbd5",
      }}
    >
      <span style={{ color: "#8b95a3" }}>events-rollup@1.4.2</span>
      <BuildStatusBadge status="building" />
      <span style={{ color: "#5b6573" }}>compiling · 0:14</span>
    </div>
  </Stage>
);
