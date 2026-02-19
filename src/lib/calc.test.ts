import { describe, expect, it } from "vitest";

import { calculateBudgetToIncome, DEFAULT_TAX_RATE } from "./calc";

describe("calculateBudgetToIncome", () => {
  it("returns zeros for all-zero inputs", () => {
    const result = calculateBudgetToIncome({
      monthly: {
        rent: 0,
        groceries: 0,
      },
      taxRate: DEFAULT_TAX_RATE,
      bufferPct: 0,
    });

    expect(result.expenses).toBe(0);
    expect(result.buffer).toBe(0);
    expect(result.netNeeded).toBe(0);
    expect(result.grossMonthlyNeeded).toBe(0);
    expect(result.grossAnnualNeeded).toBe(0);
  });

  it("sums monthly fields and applies buffer + tax rate", () => {
    // expenses = 1500
    // bufferPct = 0.10 => buffer = 150
    // netNeeded = 1650
    // taxRate = 0.22 => takeHome = 0.78
    // grossMonthly = 1650 / 0.78 = 2115.3846... => 2115.38
    // grossAnnual = 25384.56
    const result = calculateBudgetToIncome({
      monthly: {
        rent: 1000,
        groceries: 300,
        transportation: 200,
      },
      taxRate: 0.22,
      bufferPct: 0.1,
    });

    expect(result.expenses).toBe(1500);
    expect(result.buffer).toBe(150);
    expect(result.netNeeded).toBe(1650);
    expect(result.takeHomeRate).toBeCloseTo(0.78, 10);
    expect(result.grossMonthlyNeeded).toBe(2115.38);
    expect(result.grossAnnualNeeded).toBe(25384.56);
  });

  it("treats empty/NaN as 0 and prevents negatives", () => {
    const result = calculateBudgetToIncome({
      monthly: {
        rent: "",
        utilities: "abc",
        groceries: -10,
        misc: "50",
      },
      taxRate: "not-a-number",
      bufferPct: -1,
    });

    expect(result.expenses).toBe(50);
    expect(result.buffer).toBe(0);
    expect(result.netNeeded).toBe(50);
    expect(result.grossMonthlyNeeded).toBeGreaterThan(0);
    expect(Number.isFinite(result.grossAnnualNeeded)).toBe(true);
  });

  it("clamps takeHomeRate to 0.01 to avoid divide-by-zero", () => {
    const result = calculateBudgetToIncome({
      monthly: {
        rent: 100,
      },
      taxRate: 1,
      bufferPct: 0,
    });

    expect(result.takeHomeRate).toBe(0.01);
    expect(result.grossMonthlyNeeded).toBe(10000);
    expect(result.grossAnnualNeeded).toBe(120000);
  });
});
