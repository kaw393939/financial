# Sprint 10 — README, Scripts, and Build/Runtime Smoke Coverage

## Goal
Make the MVP easy to run locally and ensure build/runtime basics don’t regress.

## In scope
- README:
  - how to run locally
  - what the formula means (brief)
  - note MVP non-goals
- Package scripts for test/build/lint (plan)
- Smoke tests for build + minimal runtime

## Out of scope
- New product features

## Acceptance criteria
- README exists and is accurate.
- `npm run test` (or equivalent) runs unit/integration/E2E as separate scripts.
- `npm run build` succeeds.

## TDD test plan

### Unit tests
- (Optional) `formatCurrency` locale behavior
  - Positive: consistent output for typical values
  - Negative: does not depend on machine locale (if you fix locale)

### Integration tests
- App-level render smoke
  - Positive: Home renders without throwing
  - Positive: Planner renders without throwing
  - Negative: Planner render does not access `localStorage` on server (no ReferenceError)

### E2E tests
- `smoke.spec.ts`
  - Positive: Home loads (HTTP 200) and Start works
  - Positive: Planner loads and results area is visible
  - Negative: refresh Planner does not crash (persistence + hydration)

## Notes
If you add CI later, these smoke tests become the first gate.
