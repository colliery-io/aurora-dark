import { PageHeader, Dot } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// The full header: 22/600 title, Mono subtitle caption, and a right-aligned
// status slot — the standard top-of-route chrome for a workflow detail view.
export const WithSubtitleAndSlot = () => (
  <Stage>
    <PageHeader
      title="nightly-rollup"
      sub="workflow · tenant acme-prod · 14 tasks"
      right={
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: "#4bd07f",
          }}
        >
          <Dot color="#4bd07f" glow />
          healthy
        </span>
      }
    />
  </Stage>
);

// Title + subtitle, no right slot — the common list-page heading.
export const WithSubtitle = () => (
  <Stage>
    <PageHeader title="Executions" sub="last 24h · 1,284 runs · 3 reactors active" />
  </Stage>
);

// Title only — minimal header for a settings or admin pane.
export const TitleOnly = () => (
  <Stage>
    <PageHeader title="Tenant Settings" />
  </Stage>
);
