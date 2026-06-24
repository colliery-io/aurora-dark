import { StatusBadge } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// Every execution status the badge colors — running (ice), completed (ok),
// failed (bad), scheduled (violet), pending/paused (muted), cancelled (gold),
// skipped (rose). Unknown strings fall back to muted rather than crash.
export const AllStatuses = () => (
  <Stage>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <StatusBadge status="running" />
      <StatusBadge status="completed" />
      <StatusBadge status="failed" />
      <StatusBadge status="scheduled" />
      <StatusBadge status="pending" />
      <StatusBadge status="cancelled" />
      <StatusBadge status="skipped" />
    </div>
  </Stage>
);

// As it reads inside an executions table row.
export const InRow = () => (
  <Stage>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12.5,
        color: "#c3cbd5",
      }}
    >
      <span style={{ color: "#8b95a3" }}>exec_7f3a91</span>
      <StatusBadge status="running" />
      <span style={{ color: "#5b6573" }}>started 2m ago</span>
    </div>
  </Stage>
);
