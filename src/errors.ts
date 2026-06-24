/*
 *  Copyright 2025-2026 Colliery Software
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Typed error classification. Maps an API error (or anything else) onto an
 *  actionable UI kind so views render the right state instead of a generic
 *  failure. Duck-typed: any error carrying a numeric `status` (the shape
 *  cloacina's `CloacinaApiError` exposes) classifies by HTTP status — so the
 *  design system stays free of an SDK dependency.
 */

export type ErrorKind =
  | "auth" // 401/403 — re-authenticate
  | "notfound" // 404 — not-found view
  | "validation" // 400/422 — inline, carries server `code`
  | "server" // 5xx — retryable
  | "network" // transport failure (server unreachable)
  | "unknown";

export interface ClassifiedError {
  kind: ErrorKind;
  /** Human-readable message (server `error` field when available). */
  message: string;
  /** Machine-readable server `code`, when present. */
  code?: string;
  status?: number;
}

export function classifyError(err: unknown): ClassifiedError {
  const e = err as { status?: unknown; code?: unknown; message?: unknown } | null;
  if (e && typeof e.status === "number") {
    const status = e.status;
    let kind: ErrorKind = "unknown";
    if (status === 401 || status === 403) kind = "auth";
    else if (status === 404) kind = "notfound";
    else if (status === 400 || status === 422) kind = "validation";
    else if (status >= 500) kind = "server";
    return {
      kind,
      message: typeof e.message === "string" ? e.message : "Request failed",
      code: typeof e.code === "string" ? e.code : undefined,
      status,
    };
  }
  if (err instanceof TypeError) {
    // fetch throws TypeError on network failure (server unreachable / CORS).
    return {
      kind: "network",
      message: "Could not reach the server. Check the URL and that CORS is enabled.",
    };
  }
  return {
    kind: "unknown",
    message: err instanceof Error ? err.message : String(err),
  };
}
