# Sprint 07 — Reset + Load Example Buttons

## Goal
Add two required buttons:
- Reset (clears planner state back to defaults)
- Load Example (fills realistic sample values)

## In scope
- Button UI + handlers
- Reset clears state and updates localStorage
- Load Example populates all (or most) fields with sensible sample data and updates results

## Out of scope
- README / deployment

## Acceptance criteria
- Clicking Reset sets all monthly fields to 0/empty, assumptions to defaults.
- Clicking Load Example sets a realistic budget and assumptions.
- Both actions update results immediately.
- Both actions persist (if autosave already exists).

## TDD test plan

### Unit tests
- `getDefaultState()`
  - Positive: returns tax=0.22, buffer=0, all expenses 0
- `getExampleState()`
  - Positive: returns non-zero values, all >= 0
  - Negative: example values do not exceed reasonable numeric range (sanity)

### Integration tests
- Reset
  - Positive: set some values; click Reset; all inputs cleared; results return to $0.00
  - Negative: if localStorage throws, Reset still updates UI state

- Load Example
  - Positive: click Load Example; multiple inputs filled; total > 0; annual > 0
  - Negative: clicking Load Example twice yields same consistent state (idempotent)

### E2E tests
- `reset_and_example.spec.ts`
  - Positive: load example -> reload -> values persist
  - Positive: reset -> reload -> stays reset
  - Negative: after reset, annual remains $0.00 and no NaN shown

## Notes
Define the example values once (single source of truth) and use for both UI and tests.
