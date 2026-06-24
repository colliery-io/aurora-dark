import { AccumulatorTable } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// All sources live and fresh — green freshness bars, recent "last event".
export const HealthySources = () => {
  const fresh = new Date(Date.now() - 4000).toISOString();
  return (
    <Stage>
      <AccumulatorTable
        accumulators={[
          { name: "orders.events", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 18240 },
          { name: "clicks.stream", reactor: "rollup-reactor", state: "live", last_event_at: new Date(Date.now() - 9000).toISOString(), events_total: 92110 },
          { name: "sessions.active", reactor: "rollup-reactor", state: "live", last_event_at: new Date(Date.now() - 6000).toISOString(), events_total: 4502 },
        ]}
      />
    </Stage>
  );
};

// Mixed health — a stale unreachable source plus one carrying an error line.
export const WithStaleAndError = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <AccumulatorTable
        accumulators={[
          { name: "orders.events", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 18240 },
          { name: "inventory.snapshots", reactor: "rollup-reactor", state: "unreachable", last_event_at: "2024-01-01T00:00:00Z", events_total: 312, error: "connection refused (econnrefused 10.0.4.12:5432)" },
          { name: "shipments.tracking", reactor: "rollup-reactor", state: "warming", last_event_at: null, events_total: 0 },
        ]}
      />
    </Stage>
  );
};

// Manual operator injects — "manual" pills, and the inject button via onInject.
export const WithManualInjects = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <AccumulatorTable
        onInject={() => {}}
        accumulators={[
          { name: "orders.events", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 18240, operator_injects: 3, last_operator_inject_at: new Date(Date.now() - 600000).toISOString() },
          { name: "ledger.entries", reactor: "billing-reactor", state: "live", last_event_at: new Date(Date.now() - 8000).toISOString(), events_total: 8810, operator_injects: 1, last_operator_inject_at: new Date(Date.now() - 3600000).toISOString() },
          { name: "clicks.stream", reactor: "rollup-reactor", state: "live", last_event_at: fresh, events_total: 92110 },
        ]}
      />
    </Stage>
  );
};
