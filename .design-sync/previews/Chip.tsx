import { Chip } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>
);

const noop = () => {};

// A filter bar as it appears above the executions table — one active chip
// (ice fill, dark text) and the rest inactive (panel + border), each with a count.
export const FilterBar = () => (
  <Stage>
    <Row>
      <Chip label="All" count={1284} active onClick={noop} />
      <Chip label="Running" count={12} active={false} onClick={noop} />
      <Chip label="Succeeded" count={1190} active={false} onClick={noop} />
      <Chip label="Failed" count={47} active={false} onClick={noop} />
      <Chip label="Skipped" count={35} active={false} onClick={noop} />
    </Row>
  </Stage>
);

// Active vs inactive, side by side — the core visual contrast: ice fill +
// dark text + 600 weight when selected, muted panel chip otherwise.
export const ActiveVsInactive = () => (
  <Stage>
    <Row>
      <Chip label="Reactors" count={3} active onClick={noop} />
      <Chip label="Schedules" count={8} active={false} onClick={noop} />
    </Row>
  </Stage>
);

// Without counts — used as plain toggle tags (e.g. graph view modes).
export const NoCounts = () => (
  <Stage>
    <Row>
      <Chip label="Graph" active onClick={noop} />
      <Chip label="Timeline" active={false} onClick={noop} />
      <Chip label="Gantt" active={false} onClick={noop} />
    </Row>
  </Stage>
);
