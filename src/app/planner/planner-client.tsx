"use client";

import { useEffect, useMemo, useState } from "react";

import type { MonthlyField } from "@/lib/calc";
import { calculateBudgetToIncome } from "@/lib/calc";
import { formatCurrency } from "@/lib/format";
import { clamp, formatPercent } from "@/lib/number";
import {
  PLANNER_STORAGE_KEY,
  createDefaultPlannerState,
  createExamplePlannerState,
  deserializePlannerState,
  serializePlannerState,
} from "@/lib/planner-persistence";

const INPUTS: Array<{ key: MonthlyField; label: string }> = [
  { key: "rent", label: "Rent" },
  { key: "utilities", label: "Utilities" },
  { key: "internetPhone", label: "Internet/Phone" },
  { key: "groceries", label: "Groceries" },
  { key: "eatingOut", label: "Eating Out" },
  { key: "transportation", label: "Transportation" },
  { key: "insuranceHealth", label: "Insurance/Health" },
  { key: "debtPayments", label: "Debt Payments" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "misc", label: "Misc" },
  { key: "savings", label: "Savings (monthly $)" },
];

type MonthlyInputState = Record<MonthlyField, string>;

const EMPTY_STATE: MonthlyInputState = createDefaultPlannerState().monthly;

function parseNonNegativeNumber(value: string): number {
  if (value.trim() === "") return 0;
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0;
  return parsed < 0 ? 0 : parsed;
}

export default function PlannerClient() {
  const [monthly, setMonthly] = useState<MonthlyInputState>(EMPTY_STATE);
  const [taxRate, setTaxRate] = useState(0.22);
  const [bufferPct, setBufferPct] = useState(0);

  useEffect(() => {
    try {
      const restored = deserializePlannerState(window.localStorage.getItem(PLANNER_STORAGE_KEY));
      setMonthly(restored.monthly);
      setTaxRate(restored.taxRate);
      setBufferPct(restored.bufferPct);
    } catch {
      // Ignore storage access failures (private mode / security policy).
    }
  }, []);

  useEffect(() => {
    try {
      const json = serializePlannerState({ monthly, taxRate, bufferPct });
      window.localStorage.setItem(PLANNER_STORAGE_KEY, json);
    } catch {
      // Ignore quota/security failures.
    }
  }, [monthly, taxRate, bufferPct]);

  const totalMonthlyCosts = useMemo(() => {
    return INPUTS.reduce((sum, { key }) => sum + parseNonNegativeNumber(monthly[key]), 0);
  }, [monthly]);

  const results = useMemo(() => {
    return calculateBudgetToIncome({ monthly, taxRate, bufferPct });
  }, [monthly, taxRate, bufferPct]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Autosaves to your browser.
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            data-testid="reset"
            onClick={() => {
              const defaults = createDefaultPlannerState();
              setMonthly(defaults.monthly);
              setTaxRate(defaults.taxRate);
              setBufferPct(defaults.bufferPct);
            }}
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Reset
          </button>
          <button
            type="button"
            data-testid="load-example"
            onClick={() => {
              const example = createExamplePlannerState();
              setMonthly(example.monthly);
              setTaxRate(example.taxRate);
              setBufferPct(example.bufferPct);
            }}
            className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Load Example
          </button>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="taxRate" className="text-sm font-medium">
                Effective tax rate
              </label>
              <div data-testid="tax-rate-value" className="text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
                {formatPercent(taxRate, 0)}
              </div>
            </div>
            <input
              id="taxRate"
              type="range"
              min={0.1}
              max={0.4}
              step={0.01}
              value={taxRate}
              onChange={(e) => {
                const next = clamp(Number.parseFloat(e.target.value), 0.1, 0.4);
                setTaxRate(next);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="bufferPct" className="text-sm font-medium">
                Safety buffer
              </label>
              <div data-testid="buffer-pct-value" className="text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
                {formatPercent(bufferPct, 0)}
              </div>
            </div>
            <input
              id="bufferPct"
              type="range"
              min={0}
              max={0.2}
              step={0.01}
              value={bufferPct}
              onChange={(e) => {
                const next = clamp(Number.parseFloat(e.target.value), 0, 0.2);
                setBufferPct(next);
              }}
            />
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {INPUTS.map(({ key, label }) => {
          const id = `monthly-${key}`;
          return (
            <div key={key} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                name={key}
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={monthly[key]}
                onKeyDown={(e) => {
                  if (e.key === "-") e.preventDefault();
                }}
                onChange={(e) => {
                  const next = e.target.value;
                  if (next === "") {
                    setMonthly((prev) => ({ ...prev, [key]: "" }));
                    return;
                  }

                  const parsed = Number.parseFloat(next);
                  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
                    setMonthly((prev) => ({ ...prev, [key]: "" }));
                    return;
                  }

                  setMonthly((prev) => ({ ...prev, [key]: String(Math.max(0, parsed)) }));
                }}
                className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
              />
            </div>
          );
        })}
      </form>

      <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-baseline justify-between gap-4">
          <div className="text-sm font-medium">Total Monthly Costs</div>
          <div data-testid="total-monthly-costs" className="text-lg font-semibold tabular-nums">
            {formatCurrency(totalMonthlyCosts)}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Net monthly needed</div>
            <div data-testid="net-needed" className="text-base font-semibold tabular-nums">
              {formatCurrency(results.netNeeded)}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Gross monthly needed</div>
            <div data-testid="gross-monthly" className="text-base font-semibold tabular-nums">
              {formatCurrency(results.grossMonthlyNeeded)}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Gross annual salary needed</div>
            <div data-testid="gross-annual" className="text-2xl font-bold tabular-nums">
              {formatCurrency(results.grossAnnualNeeded)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
