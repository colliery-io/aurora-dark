import { Loading } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// Default — the ice Loader spinner with the standard "Loading…" caption,
// centered in its 160px min-height well.
export const Default = () => (
  <Stage>
    <Loading />
  </Stage>
);

// Custom label — the same spinner with a context-specific message while a
// workflow execution graph is being fetched.
export const CustomLabel = () => (
  <Stage>
    <Loading label="Loading execution graph…" />
  </Stage>
);
