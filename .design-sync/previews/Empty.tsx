import { Empty } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// The empty-list state — centered dimmed text when a query returns no rows.
export const NoExecutions = () => (
  <Stage>
    <Empty message="No executions in the last 24 hours." />
  </Stage>
);

// A different domain message — empty reactor list / no triggers configured.
export const NoReactors = () => (
  <Stage>
    <Empty message="No reactors configured for this tenant yet." />
  </Stage>
);
