# Budget-to-Income Planner — TDD Sprint Overview (MVP)

Date: 2026-02-19

## Product summary
A minimal 2-page Next.js (App Router) web app for students:
- Home: brief explanation + Start button + show default assumptions.
- Planner: monthly budget inputs + assumptions sliders + results panel.
- Calculates gross income needed from expenses using effective tax rate and optional safety buffer.
- Live updates while typing.
- Autosave/restore full planner state via `localStorage`.
- Buttons: Reset, Load Example.

## Calculation spec (source of truth)
Let:
- `expenses = sum(all monthly fields)`
- `buffer = expenses * bufferPct`
- `netNeeded = expenses + buffer`
- `takeHomeRate = 1 - taxRate` (clamp to minimum `0.01` to avoid divide-by-zero)
- `grossMonthlyNeeded = netNeeded / takeHomeRate`
- `grossAnnualNeeded = grossMonthlyNeeded * 12`

Display:
- Net monthly needed
- Gross monthly needed
- Gross annual salary needed (big)

## Assumptions for testing stack (plan only)
- Unit: **Vitest**
- Component/integration: **@testing-library/react** + **@testing-library/user-event**
- E2E: **Playwright**

(If you prefer Jest/Cypress, the test cases still apply—only the tooling changes.)

## Test levels (definitions)
- Unit: pure functions (`/lib/calc.ts`, parsing/normalization helpers).
- Integration: React components + state + `localStorage` + calculation module together.
- E2E: full app in browser, navigation between pages, persistence, and user flows.

## Conventions (suggested)
- Put calc unit tests in `lib/calc.test.ts`.
- Put component tests near components: `app/planner/Planner.test.tsx`.
- Put Playwright tests in `e2e/*.spec.ts`.

## Global negative test themes
These should be covered across sprints:
- Empty input treated as 0.
- Non-numeric input does not break UI; treated as 0.
- Negative values are prevented (clamped to 0).
- Tax rate edge cases: min/max; takeHome clamp at 0.01.
- Buffer % edge cases: 0 and max.
- `localStorage` failures: unavailable, corrupted JSON, partial data.

## Definition of done (per sprint)
- Tests written first (or at least defined first) and pass.
- No new lint/type errors.
- Features implemented match letter requirements; no extra pages/features.
