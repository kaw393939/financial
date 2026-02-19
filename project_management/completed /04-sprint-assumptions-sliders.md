# Sprint 04 — Assumptions: Tax Rate + Safety Buffer Sliders

## Goal
Add assumption controls and wire them into state: effective tax rate + optional safety buffer.

## In scope
- Tax rate slider: default 0.22, range 0.10–0.40
- Safety buffer slider: default 0, range 0–0.20
- Display current values near sliders
- Clamp values to allowed ranges

## Out of scope
- Full gross income results (next sprint)
- localStorage

## Acceptance criteria
- Both sliders exist with correct defaults.
- Adjusting sliders updates displayed values live.
- Values are clamped to allowed ranges.

## TDD test plan

### Unit tests
- `clamp(n, min, max)` helper
  - Positive: inside range returns same
  - Negative: below min => min
  - Negative: above max => max
- `formatPct(x)` helper (if used)
  - Positive: 0.22 => “22%” or “0.22” (pick a display and test it)

### Integration tests
- Tax slider
  - Positive: default shows 0.22
  - Positive: change to 0.30 updates display
  - Negative: attempting to set < 0.10 clamps to 0.10
  - Negative: attempting to set > 0.40 clamps to 0.40

- Buffer slider
  - Positive: default shows 0
  - Positive: change to 0.10 updates display
  - Negative: attempting to set < 0 clamps to 0
  - Negative: attempting to set > 0.20 clamps to 0.20

### E2E tests
- `assumptions_sliders.spec.ts`
  - Positive: move tax slider; verify results area (placeholder for now) reflects change in displayed assumption.
  - Negative: page reload keeps default until persistence sprint.
