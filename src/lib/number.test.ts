import { describe, expect, it } from "vitest";

import { clamp, formatPercent } from "./number";

describe("clamp", () => {
  it("returns the value when it is inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps values below min", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  it("clamps values above max", () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });
});

describe("formatPercent", () => {
  it("formats as percentage", () => {
    expect(formatPercent(0.22)).toBe("22%");
  });

  it("handles NaN", () => {
    expect(formatPercent(Number.NaN)).toBe("0%");
  });
});
