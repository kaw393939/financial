# Sprint 05 — Results Panel (Net + Gross Monthly + Gross Annual)

## Goal
Wire the planner UI to the pure calculation module and display the results panel that updates live.

## In scope
- Use `/lib/calc.ts` to compute results on each input/slider change
- Results panel shows:
  - Net monthly needed
  - Gross monthly needed
  - Gross annual salary needed (big)
- Consistent formatting (2 decimals, commas)

## Out of scope
- localStorage
- Reset/Load Example

## Acceptance criteria
- Results update live as user types and as sliders move.
- Gross annual is visually emphasized.
- No crashes from empty/invalid inputs.

## TDD test plan

### Unit tests
- `formatCurrency(n)`
  - Positive: 0 => “$0.00”
  - Positive: 1234.5 => “$1,234.50”
  - Negative: NaN => “$0.00” (or fallback)

### Integration tests
- Rendering results for a known fixture
  - Positive: input rent=1000, tax=0.22, buffer=0 => annual matches expected value
  - Positive: set buffer=10% => annual increases
  - Negative: clear rent => numbers update and do not show NaN

- Update behavior
  - Positive: typing “1”, “10”, “100” updates results each time
  - Negative: rapid typing does not debounce incorrectly (results are always consistent)

### E2E tests
- `results_live_update.spec.ts`
  - Positive: fill multiple categories; verify annual salary updates
  - Positive: move tax slider higher; annual salary increases
  - Negative: set everything to empty; annual salary shows $0.00 (not blank/NaN)

## Notes
Keep calculations in the module; the UI should not re-implement math.
