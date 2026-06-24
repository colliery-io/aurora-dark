import { DegradedBanner } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// One stale source — the banner renders the singular ("1 source … has").
export const OneStale = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <DegradedBanner
        accumulators={[
          { name: "orders.events", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 18240 },
          { name: "clicks.stream", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 92110 },
          { name: "inventory.snapshots", reactor: "rollup-reactor", state: "unreachable", last_event_at: "2024-01-01T00:00:00Z", events_total: 312 },
        ]}
      />
    </Stage>
  );
};

// Multiple stale sources — plural copy, names listed, oldest "ever" (never emitted).
export const MultipleStale = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <DegradedBanner
        accumulators={[
          { name: "payments.settled", reactor: "billing-reactor", state: null, last_event_at: null, events_total: 0 },
          { name: "refunds.issued", reactor: "billing-reactor", state: "unreachable", last_event_at: "2024-03-12T08:15:00Z", events_total: 44 },
          { name: "ledger.entries", reactor: "billing-reactor", state: "live", last_event_at: fresh, events_total: 8810 },
        ]}
      />
    </Stage>
  );
};
