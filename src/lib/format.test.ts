import { describe, expect, it } from "vitest";

import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("formats 0 as $0.00", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats typical values with commas and 2 decimals", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("handles NaN by falling back to $0.00", () => {
    expect(formatCurrency(Number.NaN)).toBe("$0.00");
  });

  it("handles Infinity by falling back to $0.00", () => {
    expect(formatCurrency(Number.POSITIVE_INFINITY)).toBe("$0.00");
  });

  it("clamps negatives to $0.00", () => {
    expect(formatCurrency(-1)).toBe("$0.00");
  });
});
