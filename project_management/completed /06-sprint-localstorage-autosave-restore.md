# Sprint 06 — localStorage Autosave + Restore (Whole Planner State)

## Goal
Persist the entire planner state to `localStorage` automatically and restore it on load.

## In scope
- Serialize/deserialize all inputs + assumptions
- Autosave on change
- Restore on page load
- Version key (optional but recommended), e.g. `btiplanner:v1`

## Out of scope
- Reset/Load Example buttons (next sprint)

## Acceptance criteria
- Changing any field or slider saves state.
- Reloading the page restores values and results.
- Corrupted storage does not break the app (falls back to defaults).

## TDD test plan

### Unit tests
- `serializeState(state)` / `deserializeState(json)`
  - Positive: round-trip equality for typical state
  - Negative: invalid JSON => defaults
  - Negative: missing fields => defaults/0
  - Negative: extra unknown fields ignored

### Integration tests
- With `localStorage` mocked
  - Positive: typing in rent triggers `setItem` with expected payload
  - Positive: initial render reads `getItem` and hydrates inputs
  - Negative: `getItem` returns invalid JSON => app still renders defaults
  - Negative: `setItem` throws (quota/security) => app continues without crashing

### E2E tests
- `persistence.spec.ts`
  - Positive: set values; reload; verify values persist
  - Positive: set buffer/tax; reload; verify results unchanged
  - Negative: manually inject corrupted localStorage value; load planner; verify it resets to defaults and works

## Notes
Be careful with Next.js server/client boundaries—`localStorage` access must be client-side only.
