/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Build-status badge. Color is keyed off the server's status string; unknown
 *  values fall back to muted rather than crash. Aurora token pill.
 */
import { Pill } from "./primitives";
import { TOKEN } from "./tokens";

const COLOR: Record<string, string> = {
  success: TOKEN.ok,
  failed: TOKEN.bad,
  building: TOKEN.ice,
  pending: TOKEN.muted,
};

export function BuildStatusBadge({ status }: { status: string }) {
  return <Pill color={COLOR[status] ?? TOKEN.muted}>{status}</Pill>;
}
