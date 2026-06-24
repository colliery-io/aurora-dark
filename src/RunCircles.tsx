/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Airflow-style recent-run summary. Rather than one dot per run, shows one
 *  colored circle per run state with the count of recent runs in that state.
 *  Counts are over the most recent `WINDOW` runs; `runs` is expected newest-first.
 */
import { Group, Text, Tooltip } from "@mantine/core";

import { executionStatusColor } from "./status";

/** Minimal recent-run shape (a slice of ExecutionSummary). */
export interface RunDot {
  id: string;
  status: string;
  started_at?: string | null;
}

const WINDOW = 25;

// Display order for the state circles — active first, then terminal.
const STATE_ORDER = [
  "running",
  "pending",
  "scheduled",
  "completed",
  "failed",
  "cancelled",
  "canceled",
];

function rank(status: string): number {
  const i = STATE_ORDER.indexOf(status);
  return i < 0 ? STATE_ORDER.length : i;
}

export function RunCircles({ runs }: { runs: RunDot[] }) {
  if (runs.length === 0) {
    return (
      <Text c="dimmed" size="xs">
        no recent runs
      </Text>
    );
  }

  const counts = new Map<string, number>();
  for (const r of runs.slice(0, WINDOW)) {
    const key = r.status.toLowerCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const entries = [...counts.entries()].sort((a, b) => rank(a[0]) - rank(b[0]));

  return (
    <Group gap={6} wrap="nowrap">
      {entries.map(([status, count]) => (
        <Tooltip key={status} label={`${count} ${status}`} withArrow openDelay={150}>
          <span
            style={{
              minWidth: 20,
              height: 20,
              padding: "0 5px",
              borderRadius: 10,
              background: `var(--mantine-color-${executionStatusColor(status)}-6)`,
              color: "var(--mantine-color-white)",
              fontSize: 11,
              fontWeight: 600,
              lineHeight: "20px",
              textAlign: "center",
              display: "inline-block",
              flex: "0 0 auto",
            }}
          >
            {count}
          </span>
        </Tooltip>
      ))}
    </Group>
  );
}
