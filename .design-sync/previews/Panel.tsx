import { Panel, Pill, StatusBadge } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const MONO = "'IBM Plex Mono', monospace";

// The standard card surface: 13/600 title + Mono caption + hairline divider.
export const WithCaption = () => (
  <Stage>
    <Panel title="Recent executions" caption="last 24h">
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: MONO, fontSize: 12.5, color: "#c3cbd5" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>exec_7f3a91</span>
          <StatusBadge status="completed" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>exec_5d12c0</span>
          <StatusBadge status="running" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>exec_99ab4e</span>
          <StatusBadge status="failed" />
        </div>
      </div>
    </Panel>
  </Stage>
);

// The `right` slot replaces the caption with a control or tag.
export const WithRightSlot = () => (
  <Stage>
    <Panel title="Inputs" right={<Pill color="#5fd0c5">3 declared</Pill>}>
      <div style={{ fontFamily: MONO, fontSize: 12.5, color: "#c3cbd5", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>window_minutes <span style={{ color: "#5b6573" }}>= 60</span></div>
        <div>source <span style={{ color: "#5b6573" }}>= "events"</span></div>
        <div>dry_run <span style={{ color: "#5b6573" }}>= false</span></div>
      </div>
    </Panel>
  </Stage>
);
