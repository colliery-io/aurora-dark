/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Graph operational-view sections: degraded banner, reactor readiness, and the
 *  accumulator-freshness table. All three are prop-driven (no data hooks) — they
 *  render whatever accumulator rows the host passes in.
 */
import type { CSSProperties } from "react";
import { Tooltip } from "@mantine/core";

import { Dot, MONO, Panel, Pill } from "./primitives";
import { Empty } from "./states";
import { explainToken } from "./vocab";
import { formatAgo } from "./activity";
import { healthColor, TOKEN } from "./tokens";

/** Accumulator row as returned by the graph's accumulators endpoint. */
export interface Acc {
  name: string;
  reactor?: string | null;
  state?: string | null;
  last_event_at?: string | null;
  events_total?: number | null;
  error?: string | null;
  /** Operator-inject count + last-inject time — manual interventions. */
  operator_injects?: number | null;
  last_operator_inject_at?: string | null;
}

const STALE_MS = 30_000;

/** A source is stale if it's disconnected, never emitted, or hasn't emitted
 *  within the freshness window. */
export function accStale(a: Acc): boolean {
  const st = (a.state ?? "").toLowerCase();
  if (st === "disconnected" || st === "unreachable") return true;
  if (!a.last_event_at) return true;
  const age = Date.now() - Date.parse(a.last_event_at);
  return Number.isNaN(age) ? true : age > STALE_MS;
}

// ---- Degraded banner ----------------------------------------------------

export function DegradedBanner({ accumulators }: { accumulators: Acc[] }) {
  const stale = accumulators.filter(accStale);
  if (stale.length === 0) return null;
  const names = stale.map((a) => a.name).join(", ");
  const oldest = stale[0];
  const ago = oldest.last_event_at ? formatAgo(oldest.last_event_at) : "ever";
  return (
    <div style={{ background: "#d8a6571c", border: "1px solid #d8a65733", borderRadius: 9, padding: "10px 14px", display: "flex", gap: 10 }}>
      <span style={{ color: TOKEN.gold }}>⚠</span>
      <span style={{ fontSize: 12.5, color: "#e6c98a" }}>
        {stale.length} source{stale.length === 1 ? "" : "s"} degraded — <b>{names}</b> {stale.length === 1 ? "has" : "have"} no
        recent boundary data ({oldest.name} last seen {ago}). The graph still fires on the remaining sources,
        but that data is missing from output.
      </span>
    </div>
  );
}

// ---- Reactor readiness --------------------------------------------------

export function ReactorReadiness({
  reactor,
  reactionMode,
  inputStrategy,
  accumulators,
  lastFiredAt,
}: {
  reactor: string | null | undefined;
  reactionMode: string | null | undefined;
  inputStrategy: string | null | undefined;
  accumulators: Acc[];
  lastFiredAt: string | null | undefined;
}) {
  const mode = explainToken(reactionMode || "when_any").label;
  const inputLabel = explainToken(inputStrategy || "latest").label;
  const ready = accumulators.filter((a) => !accStale(a));
  const whenAll = (reactionMode || "").toLowerCase() === "when_all";

  return (
    <Panel title="Reactor readiness" caption={reactor ?? ""}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 260px", minWidth: 200 }}>
          <span style={{ fontSize: 12.5, color: "var(--fg-2)" }}>
            Fires when <b style={{ color: TOKEN.violet }}>{mode.toLowerCase()}</b> bound accumulator has new data, passing each
            source's <b style={{ color: TOKEN.teal }}>{inputLabel.toLowerCase()}</b> value.
          </span>
        </div>
        <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: 8 }}>
          {accumulators.map((a) => {
            const fresh = !accStale(a);
            return (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: fresh ? TOKEN.ok : TOKEN.gold }}>{fresh ? "✓" : "⚠"}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: "var(--fg-2)" }}>{a.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: fresh ? "var(--faint)" : TOKEN.gold }}>
                  {fresh ? "fresh · ready" : "no data · stale"}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ flex: "1 1 220px", background: "var(--panel-2)", border: "1px solid var(--border-soft)", borderRadius: 9, padding: "11px 13px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: ready.length === accumulators.length ? TOKEN.ok : TOKEN.gold }}>
            {whenAll && ready.length < accumulators.length
              ? `Waiting on ${accumulators.length - ready.length} of ${accumulators.length} sources`
              : `Firing on ${ready.length} of ${accumulators.length} sources`}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--faint)", marginTop: 5 }}>
            last fire {formatAgo(lastFiredAt)}
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ---- Accumulator table --------------------------------------------------

export function AccumulatorTable({ accumulators, onInject }: { accumulators: Acc[]; onInject?: (name: string) => void }) {
  const th: CSSProperties = { fontFamily: MONO, fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--faint)", textAlign: "left" };
  const COLS = "minmax(0,1fr) 110px 120px 72px 150px 70px";

  if (accumulators.length === 0) return <Empty message="No accumulators bound." />;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, paddingBottom: 9 }}>
        <span style={th}>Source</span>
        <span style={th}>State</span>
        <span style={th}>Last event</span>
        <span style={{ ...th, textAlign: "right" }}>Rate</span>
        <span style={th}>Freshness</span>
        <span style={th} />
      </div>
      {accumulators.map((a) => {
        const stale = accStale(a);
        const c = healthColor(a.state ?? "");
        const ageMs = a.last_event_at ? Date.now() - Date.parse(a.last_event_at) : Infinity;
        const freshPct = Number.isFinite(ageMs) ? Math.max(4, Math.min(100, 100 - (ageMs / STALE_MS) * 100)) : 0;
        const rate = a.events_total != null ? `~${a.events_total}/min` : "—";
        return (
          <div key={a.name} style={{ borderTop: "1px solid var(--border-fainter)", padding: "8px 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <Dot color={c} size={7} />
                <span style={{ fontFamily: MONO, fontSize: 12.5, color: "#dce2e9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                {(a.operator_injects ?? 0) > 0 && (
                  <Tooltip
                    label={`${a.operator_injects} operator inject${a.operator_injects === 1 ? "" : "s"}${a.last_operator_inject_at ? ` · last ${formatAgo(a.last_operator_inject_at)}` : ""}`}
                  >
                    <span style={{ flex: "none" }}>
                      <Pill color={TOKEN.gold}>manual</Pill>
                    </span>
                  </Tooltip>
                )}
              </span>
              <span style={{ fontSize: 12, color: c }}>{explainToken(a.state ?? "unknown").label}</span>
              <span style={{ fontFamily: MONO, fontSize: 11.5, color: stale ? TOKEN.gold : "var(--muted)" }}>{formatAgo(a.last_event_at)}</span>
              <span style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--muted)", textAlign: "right" }}>{rate}</span>
              <div style={{ height: 6, background: "var(--inset)", borderRadius: 3 }}>
                <div style={{ height: 6, width: `${freshPct}%`, background: stale ? TOKEN.bad : TOKEN.ok, borderRadius: 3 }} />
              </div>
              {onInject ? (
                <button
                  type="button"
                  onClick={() => onInject(a.name)}
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 7,
                    cursor: "pointer",
                    border: "1px solid var(--border-control)",
                    background: "var(--panel)",
                    color: TOKEN.ice,
                    justifySelf: "end",
                  }}
                >
                  inject ▸
                </button>
              ) : (
                <span />
              )}
            </div>
            {a.error && (
              <div style={{ fontFamily: MONO, fontSize: 11, marginTop: 4 }}>
                <span style={{ color: TOKEN.bad }}>✕ error</span> <span style={{ color: "#b97a7a" }}>{a.error}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
