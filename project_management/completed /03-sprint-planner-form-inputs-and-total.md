# Sprint 03 — Planner Budget Inputs + Total Monthly Costs

## Goal
Build the Planner form with the required monthly inputs and a running “Total Monthly Costs”.

## In scope
- Inputs (number fields, default 0, allow empty => 0):
  - Rent, Utilities, Internet/Phone, Groceries, Eating Out, Transportation,
    Insurance/Health, Debt Payments, Subscriptions, Misc, Savings
- Total Monthly Costs display
- Basic layout on single screen

## Out of scope
- Results panel calculations (beyond total)
- localStorage
- Reset/Load Example

## Acceptance criteria
- All fields exist with correct labels.
- Empty input is allowed and treated as 0 in total.
- Total updates live as user types.
- Negative entry is prevented (cannot persist negative value).

## TDD test plan

### Unit tests
- Helper `toNumberOrZero(value)`
  - Positive: "123" => 123
  - Positive: "" => 0
  - Negative: "abc" => 0
  - Negative: -5 => 0 (if you clamp)

### Integration tests (React)
- Renders all required labels/inputs.
- Positive: typing values updates total immediately.
- Positive: clearing a field sets that field to 0 and total recalculates.
- Negative: entering `-1` results in displayed value 0 (or input rejects).
- Negative: extremely large input does not break rendering (still shows a total).

### E2E tests
- `planner_inputs_total.spec.ts`
  - Positive: fill rent and groceries; total shows sum.
  - Positive: clear groceries; total decreases.
  - Negative: attempt to type negative; confirm it is not accepted / is clamped.

## Notes
Treat “allow empty = 0” as: input UI may be blank, but internal numeric state should behave as 0.
