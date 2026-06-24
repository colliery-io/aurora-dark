import { ReactorReadiness } from "@colliery-io/aurora-dark";
import { Stage } from "./_stage";

// All sources fresh, when_all + latest — "Firing on N of N sources" in green.
export const AllFresh = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <ReactorReadiness
        reactor="rollup-reactor"
        reactionMode="when_all"
        inputStrategy="latest"
        lastFiredAt={new Date(Date.now() - 12000).toISOString()}
        accumulators={[
          { name: "orders.events", state: "live", last_event_at: fresh },
          { name: "clicks.stream", state: "live", last_event_at: fresh },
          { name: "sessions.active", state: "live", last_event_at: fresh },
        ]}
      />
    </Stage>
  );
};

// when_all with a stale source — gold "Waiting on 1 of 3 sources".
export const PartiallyStale = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <ReactorReadiness
        reactor="rollup-reactor"
        reactionMode="when_all"
        inputStrategy="latest"
        lastFiredAt={new Date(Date.now() - 95000).toISOString()}
        accumulators={[
          { name: "orders.events", state: "live", last_event_at: fresh },
          { name: "clicks.stream", state: "live", last_event_at: fresh },
          { name: "inventory.snapshots", state: "unreachable", last_event_at: "2024-01-01T00:00:00Z" },
        ]}
      />
    </Stage>
  );
};

// when_any + latest — fires on whichever source has data; one warming/stale source.
export const WhenAny = () => {
  const fresh = new Date(Date.now() - 5000).toISOString();
  return (
    <Stage>
      <ReactorReadiness
        reactor="alerts-reactor"
        reactionMode="when_any"
        inputStrategy="latest"
        lastFiredAt={new Date(Date.now() - 4000).toISOString()}
        accumulators={[
          { name: "metrics.cpu", state: "live", last_event_at: fresh },
          { name: "metrics.memory", state: "warming", last_event_at: null },
        ]}
      />
    </Stage>
  );
};
