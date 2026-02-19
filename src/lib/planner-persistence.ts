import {
  DEFAULT_BUFFER_PCT,
  DEFAULT_TAX_RATE,
  MONTHLY_FIELDS,
  type MonthlyField,
} from "./calc";
import { clamp } from "./number";

export const PLANNER_STORAGE_KEY = "btiplanner:v1";

export type MonthlyInputState = Record<MonthlyField, string>;

export interface PlannerState {
  monthly: MonthlyInputState;
  taxRate: number;
  bufferPct: number;
}

export function createDefaultPlannerState(): PlannerState {
  const monthly = MONTHLY_FIELDS.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {} as MonthlyInputState);

  return {
    monthly,
    taxRate: DEFAULT_TAX_RATE,
    bufferPct: DEFAULT_BUFFER_PCT,
  };
}

export function createExamplePlannerState(): PlannerState {
  const state = createDefaultPlannerState();

  state.monthly.rent = "1200";
  state.monthly.utilities = "120";
  state.monthly.internetPhone = "60";
  state.monthly.groceries = "320";
  state.monthly.eatingOut = "160";
  state.monthly.transportation = "110";
  state.monthly.insuranceHealth = "90";
  state.monthly.debtPayments = "200";
  state.monthly.subscriptions = "35";
  state.monthly.misc = "125";
  state.monthly.savings = "200";

  state.taxRate = DEFAULT_TAX_RATE;
  state.bufferPct = 0.05;

  return state;
}

export function serializePlannerState(state: PlannerState): string {
  return JSON.stringify(state);
}

function toNumberOrDefault(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value) && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed) && !Number.isNaN(parsed)) return parsed;
  }
  return fallback;
}

export function deserializePlannerState(raw: string | null | undefined): PlannerState {
  const defaults = createDefaultPlannerState();
  if (!raw) return defaults;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaults;

    const obj = parsed as Record<string, unknown>;
    const monthlyObj = (obj.monthly && typeof obj.monthly === "object" ? obj.monthly : {}) as Record<
      string,
      unknown
    >;

    const monthly = MONTHLY_FIELDS.reduce((acc, field) => {
      const value = monthlyObj[field];
      acc[field] = typeof value === "string" ? value : "";
      return acc;
    }, {} as MonthlyInputState);

    const taxRate = clamp(toNumberOrDefault(obj.taxRate, defaults.taxRate), 0.1, 0.4);
    const bufferPct = clamp(toNumberOrDefault(obj.bufferPct, defaults.bufferPct), 0, 0.2);

    return { monthly, taxRate, bufferPct };
  } catch {
    return defaults;
  }
}
