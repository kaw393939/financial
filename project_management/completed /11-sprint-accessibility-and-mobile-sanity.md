# Sprint 11 — Accessibility + Mobile Sanity (No New Features)

## Goal
Ensure the UI is usable and understandable for keyboard users and on small screens, without adding new UX.

## In scope
- Labels correctly associated with inputs
- Keyboard navigation order is sensible
- Buttons have accessible names
- Mobile layout does not overflow or hide critical info

## Out of scope
- New UI components, modals, charts, etc.

## Acceptance criteria
- All inputs have visible labels.
- Can complete the full flow using keyboard only.
- Planner is usable on narrow viewport (e.g. iPhone width).

## TDD test plan

### Unit tests
- (If you create an input schema) validate all fields have labels/ids
  - Positive: schema includes label + key for every required field
  - Negative: missing label fails schema test

### Integration tests
- Accessibility assertions (lightweight)
  - Positive: each input is retrievable by `getByLabelText()`
  - Positive: Start/Reset/Load Example buttons are retrievable by role+name
  - Negative: no duplicate labels that cause ambiguous queries

- Keyboard interactions
  - Positive: tab order reaches inputs and buttons
  - Negative: focus does not get trapped

### E2E tests
- `a11y_mobile.spec.ts`
  - Positive: run a keyboard-only happy path (tab + type)
  - Positive: set viewport to small width; ensure total + annual result remain visible
  - Negative: verify no horizontal scroll required for core content

## Notes
Keep this sprint as “hardening only”: fix label/structure issues, not design changes.
