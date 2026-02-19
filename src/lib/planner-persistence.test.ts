import { describe, expect, it } from "vitest";

import {
  createDefaultPlannerState,
  deserializePlannerState,
  serializePlannerState,
} from "./planner-persistence";

describe("planner persistence", () => {
  it("round-trips a typical state", () => {
    const state = createDefaultPlannerState();
    state.monthly.rent = "1000";
    state.taxRate = 0.3;
    state.bufferPct = 0.1;

    const json = serializePlannerState(state);
    const restored = deserializePlannerState(json);

    expect(restored.monthly.rent).toBe("1000");
    expect(restored.taxRate).toBe(0.3);
    expect(restored.bufferPct).toBe(0.1);
  });

  it("returns defaults for invalid JSON", () => {
    const restored = deserializePlannerState("not-json");
    expect(restored.taxRate).toBe(0.22);
    expect(restored.bufferPct).toBe(0);
  });

  it("fills missing fields with defaults", () => {
    const restored = deserializePlannerState(JSON.stringify({ taxRate: 0.25 }));
    expect(restored.taxRate).toBe(0.25);
    expect(restored.monthly.rent).toBe("");
  });
});
