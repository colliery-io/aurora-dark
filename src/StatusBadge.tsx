/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Execution-status pill: the status color at full strength on a tinted (`1c`
 *  alpha) background — radius 10, Plex Mono. Reused across overview, executions,
 *  drawers.
 */
import { statusColor, pillBg } from "./tokens";

export function StatusBadge({ status }: { status: string }) {
  const color = statusColor(status);
  return (
    <span
      style={{
        display: "inline-block",
        background: pillBg(color),
        color,
        borderRadius: 10,
        padding: "2px 9px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10.5,
        fontWeight: 500,
        lineHeight: 1.5,
        textTransform: "lowercase",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
