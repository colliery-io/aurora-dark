import { ErrorState } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// classifyError duck-types on a numeric `status` (the shape cloacina's
// CloacinaApiError exposes), so a plain object is enough to drive each kind.
const apiErr = (status: number, code: string, message: string) => ({ status, code, message });

// 404 — the not-found view. No retry (not retryable).
export const NotFound = () => (
  <Stage>
    <ErrorState error={apiErr(404, "not_found", "Workflow 'nightly-rollup' was not found in this tenant.")} />
  </Stage>
);

// 5xx — server error, retryable, so the Retry action shows.
export const ServerError = () => (
  <Stage>
    <ErrorState
      error={apiErr(503, "unavailable", "The scheduler is temporarily unavailable.")}
      onRetry={() => {}}
    />
  </Stage>
);

// 400/422 — validation, rendered in gold with the machine-readable code.
export const Validation = () => (
  <Stage>
    <ErrorState error={apiErr(422, "invalid_cron", "cron expression '* * *' is not a valid 6-field schedule.")} />
  </Stage>
);

// Transport failure (fetch TypeError) — network kind, retryable.
export const Network = () => (
  <Stage>
    <ErrorState error={new TypeError("Failed to fetch")} onRetry={() => {}} />
  </Stage>
);
