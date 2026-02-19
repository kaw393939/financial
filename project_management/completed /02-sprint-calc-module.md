# Sprint 02 — Pure Calculations Module (`/lib/calc.ts`)

## Goal
Implement the core formula in a **pure** module and lock it down with unit tests.

## In scope
- `calc.ts` pure function(s), e.g. `calculateBudgetToIncome(state)`
- Input normalization helpers (treat empty/NaN as 0; prevent negatives)
- Rounding rules (2 decimals) for displayed outputs

## Out of scope
- UI, localStorage, routing

## Acceptance criteria
- Given a set of monthly values, tax rate, buffer %, outputs:
  - `expenses`
  - `buffer`
  - `netNeeded`
  - `takeHomeRate` (clamped)
  - `grossMonthlyNeeded`
  - `grossAnnualNeeded`
- Matches letter formula.

## TDD test plan

### Unit tests (high coverage)

#### Positive cases
- Sums all monthly fields correctly.
- Computes buffer correctly at typical values:
  - `bufferPct = 0` => buffer 0
  - `bufferPct = 0.1` => buffer = expenses * 0.1
- Computes take-home and gross correctly with tax rate default 0.22.
- Computes annual = monthly * 12.
- Rounds to 2 decimals (define rounding strategy and test it).

#### Negative / edge cases
- Empty inputs treated as 0:
  - missing fields
  - empty string
  - `undefined` / `null` (depending on state type)
- NaN treated as 0.
- Negative values are prevented:
  - rent = -100 => treated as 0
  - taxRate negative => clamped to min allowed by UI (or at least to 0)
  - bufferPct negative => clamped to 0
- Tax rate near 1:
  - taxRate = 0.99 => takeHomeRate = 0.01 (clamp)
  - taxRate = 1 => takeHomeRate = 0.01 (clamp)
  - taxRate > 1 => still clamp takeHomeRate = 0.01
- Very large numbers do not overflow UI formatting (calculation returns finite numbers).

### Integration tests
- (Optional in this sprint) A tiny component calls `calculate…` and displays results.
  - Positive: correct rendering for a known fixture.
  - Negative: fixture with NaN/empty does not crash.

### E2E tests
- Not required yet; keep formula coverage in unit tests.

## Fixtures to include in tests
- `allZeros` (everything 0)
- `typicalStudentBudget`
- `highTaxHighBuffer`
- `taxRateEdgeClamp`
