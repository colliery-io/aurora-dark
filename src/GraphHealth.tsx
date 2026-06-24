/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Defensive renderer for the free-form `health`/`status` JSON. The API types
 *  these as `unknown`, so we never assume a shape: a bare string (e.g.
 *  `"socket_only"`) or a `{"state": ...}` object both resolve to a state token;
 *  anything else pretty-prints. Never crashes on an unexpected shape.
 */
import { Tooltip } from "@mantine/core";

import { explainToken } from "./vocab";
import { MONO, Pill } from "./primitives";
import { healthColor, TOKEN } from "./tokens";

export function healthState(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "state" in value) {
    const s = (value as { state: unknown }).state;
    if (typeof s === "string") return s;
  }
  return null;
}

export function GraphHealth({ value }: { value: unknown }) {
  const state = healthState(value);
  if (state != null) {
    const { label, tip } = explainToken(state);
    return (
      <Tooltip label={tip} disabled={!tip} multiline w={260} withArrow>
        <span style={{ display: "inline-flex" }}>
          <Pill color={healthColor(state)}>{label}</Pill>
        </span>
      </Tooltip>
    );
  }
  if (value == null) {
    return <Pill color={TOKEN.muted}>unknown</Pill>;
  }
  return (
    <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--faint)" }}>{JSON.stringify(value)}</span>
  );
}
