# Sprint 08 — Home Page Copy + Default Assumptions Display

## Goal
Finalize Home page content: short explanation, Start button, and show the default assumptions.

## In scope
- Add concise copy describing what the app does
- Display defaults:
  - Effective tax rate default 0.22
  - Safety buffer default 0%

## Out of scope
- Any extra pages/features

## Acceptance criteria
- Home page has short explanation + Start.
- Default assumptions are visible on Home.
- Start navigates to Planner.

## TDD test plan

### Unit tests
- `DEFAULTS` constants module (if used)
  - Positive: matches spec values

### Integration tests
- Home
  - Positive: shows “Tax rate: 22%” (or equivalent) and “Buffer: 0%”
  - Negative: does not show planner inputs

### E2E tests
- `home_defaults.spec.ts`
  - Positive: Home shows defaults
  - Positive: go to planner and confirm defaults match
  - Negative: if planner has persisted state, Home still shows defaults (per letter) unless you intentionally choose to show last-used (if you choose otherwise, document it and test it).

## Notes
Letter requirement is explicit about showing default assumptions on Home; keep it minimal.
