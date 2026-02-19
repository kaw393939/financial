# Sprint 01 — Foundation, Routing, and Smoke Tests

## Goal
Create the smallest possible shell of the app with **exactly 2 pages** (Home + Planner) and a test harness that can run unit/integration/E2E.

## In scope
- Next.js App Router skeleton
- Routes: `/` (Home), `/planner` (Planner)
- Basic layout with Tailwind + shadcn/ui primitives (no custom theme tokens)
- CI-friendly test scripts (plan)

## Out of scope
- Any calculations, inputs, persistence, example values

## Acceptance criteria
- Visiting `/` renders explanation + Start button.
- Clicking Start navigates to `/planner`.
- Planner page renders a placeholder “Planner” heading.
- No extra routes.

## TDD test plan

### Unit tests (positive + negative)
- (Minimal) `routes` constants module (if used)
  - Positive: exports correct paths.
  - Negative: no undefined routes referenced.

### Integration tests (positive + negative)
- Home component
  - Positive: renders title, short explanation, Start button.
  - Positive: Start button is enabled and has correct accessible name.
  - Negative: does not render planner-only controls (Reset, Load Example).

- Navigation
  - Positive: clicking Start changes route to `/planner` (mock router if needed).
  - Negative: Start does not open a new tab/window.

### E2E tests (positive + negative)
- `home_to_planner.spec.ts`
  - Positive: load `/`, click Start, confirm URL includes `/planner`.
  - Positive: planner heading visible.
  - Negative: direct navigation to `/planner` should not 404.
  - Negative: navigating to an unknown route (e.g. `/foo`) returns 404 (optional, if default Next behavior is acceptable).

## Notes
Keep this sprint deliberately tiny; it unlocks the rest of TDD work.
