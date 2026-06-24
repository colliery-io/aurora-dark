import { RunCircles } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const MONO = "'IBM Plex Mono', monospace";

// A mostly-healthy history: one running (blue), a handful completed (green),
// one scheduled (gray). One colored count circle per state, active-first.
export const HealthyHistory = () => (
  <Stage>
    <RunCircles
      runs={[
        { id: "exec_7f3a91", status: "running", started_at: "2026-06-24T18:02:00Z" },
        { id: "exec_5d12c0", status: "completed", started_at: "2026-06-24T17:30:00Z" },
        { id: "exec_99ab4e", status: "completed", started_at: "2026-06-24T17:00:00Z" },
        { id: "exec_3c77d1", status: "completed", started_at: "2026-06-24T16:30:00Z" },
        { id: "exec_8b21f5", status: "completed", started_at: "2026-06-24T16:00:00Z" },
        { id: "exec_1a09e7", status: "completed", started_at: "2026-06-24T15:30:00Z" },
        { id: "exec_4e6c3b", status: "scheduled", started_at: null },
      ]}
    />
  </Stage>
);

// A failure-heavy history: failures (red) dominate, plus a cancellation
// (orange) and a couple completions (green) — the "this graph is unhappy" look.
export const FailureHeavy = () => (
  <Stage>
    <RunCircles
      runs={[
        { id: "exec_d41aa2", status: "running", started_at: "2026-06-24T18:05:00Z" },
        { id: "exec_b09e51", status: "failed", started_at: "2026-06-24T17:40:00Z" },
        { id: "exec_77c3de", status: "failed", started_at: "2026-06-24T17:10:00Z" },
        { id: "exec_2f88a0", status: "failed", started_at: "2026-06-24T16:50:00Z" },
        { id: "exec_a1b4c7", status: "failed", started_at: "2026-06-24T16:20:00Z" },
        { id: "exec_5e9012", status: "cancelled", started_at: "2026-06-24T15:55:00Z" },
        { id: "exec_c6d738", status: "completed", started_at: "2026-06-24T15:20:00Z" },
        { id: "exec_0fa3b9", status: "completed", started_at: "2026-06-24T14:50:00Z" },
      ]}
    />
  </Stage>
);

// As it reads inline against a graph name in the overview list.
export const InGraphRow = () => (
  <Stage>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: MONO,
        fontSize: 13,
        color: "#c3cbd5",
      }}
    >
      <span style={{ color: "#e6e9ee", fontWeight: 600, minWidth: 130 }}>session-aggregate</span>
      <RunCircles
        runs={[
          { id: "r1", status: "completed" },
          { id: "r2", status: "completed" },
          { id: "r3", status: "completed" },
          { id: "r4", status: "running" },
          { id: "r5", status: "failed" },
        ]}
      />
    </div>
  </Stage>
);
