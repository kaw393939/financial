export const DEFAULT_TAX_RATE = 0.22;
export const DEFAULT_BUFFER_PCT = 0;

export const MONTHLY_FIELDS = [
  "rent",
  "utilities",
  "internetPhone",
  "groceries",
  "eatingOut",
  "transportation",
  "insuranceHealth",
  "debtPayments",
  "subscriptions",
  "misc",
  "savings",
] as const;

export type MonthlyField = (typeof MONTHLY_FIELDS)[number];

export type NumberLike = number | string | null | undefined;

export type MonthlyValues = Partial<Record<MonthlyField, NumberLike>>;

export interface CalcInput {
  monthly?: MonthlyValues;
  taxRate?: NumberLike;
  bufferPct?: NumberLike;
}

export interface CalcOutput {
  expenses: number;
  buffer: number;
  netNeeded: number;
  takeHomeRate: number;
  grossMonthlyNeeded: number;
  grossAnnualNeeded: number;
}

function toNonNegativeNumber(value: NumberLike): number {
  const parsed = typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0;
  return parsed < 0 ? 0 : parsed;
}

function round2(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) return 0;
  return Math.round(value * 100) / 100;
}

export function calculateBudgetToIncome(input: CalcInput): CalcOutput {
  const monthly = input.monthly ?? {};

  const expenses = round2(
    MONTHLY_FIELDS.reduce((sum, field) => sum + toNonNegativeNumber(monthly[field]), 0)
  );

  const bufferPct = toNonNegativeNumber(input.bufferPct ?? DEFAULT_BUFFER_PCT);
  const buffer = round2(expenses * bufferPct);
  const netNeeded = round2(expenses + buffer);

  const taxRate = toNonNegativeNumber(input.taxRate ?? DEFAULT_TAX_RATE);
  const takeHomeRateRaw = 1 - taxRate;
  const takeHomeRate = Math.max(takeHomeRateRaw, 0.01);

  const grossMonthlyNeeded = round2(netNeeded / takeHomeRate);
  const grossAnnualNeeded = round2(grossMonthlyNeeded * 12);

  return {
    expenses,
    buffer,
    netNeeded,
    takeHomeRate,
    grossMonthlyNeeded,
    grossAnnualNeeded,
  };
}
