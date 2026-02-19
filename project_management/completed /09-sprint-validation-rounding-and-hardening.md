# Sprint 09 — Input Validation, Rounding, and Hardening

## Goal
Make the MVP robust: sanitize inputs, prevent negatives, and ensure formatting/rounding is consistent across the app.

## In scope
- Input sanitization rules applied everywhere
- Currency formatting consistency
- Guard against NaN/Infinity
- Take-home clamp to min 0.01

## Out of scope
- New features (non-goals remain non-goals)

## Acceptance criteria
- No NaN/Infinity appears in UI.
- Negative user input cannot persist.
- Results are rounded consistently.

## TDD test plan

### Unit tests
- Sanitization
  - Positive: "100" => 100
  - Positive: "" => 0
  - Negative: "-5" => 0
  - Negative: "abc" => 0

- Calculation guardrails
  - Negative: taxRate=1 => takeHome=0.01
  - Negative: taxRate=999 => takeHome=0.01
  - Negative: netNeeded very large still returns finite or capped value (define behavior)

- Formatting
  - Positive: always 2 decimals
  - Negative: NaN/Infinity => “$0.00” fallback

### Integration tests
- Form behavior
  - Negative: paste "-100" into input; state clamps to 0
  - Negative: paste "abc"; state becomes 0

- Result rendering
  - Negative: force internal state to NaN in test; UI still shows fallback values

### E2E tests
- `validation.spec.ts`
  - Negative: attempt to enter negative and non-numeric; confirm totals/results stay valid
  - Negative: set tax to max, buffer to max; results still show valid numbers

## Notes
This sprint is about trustworthiness and eliminating “weirdness” from user input.
