# Testing in practice (unit vs integration vs end-to-end)

This project uses three “levels” of tests.

Important: the names are not perfect industry-wide. What matters is that your team uses the terms consistently.

## Positive vs negative tests

- Positive tests (“happy path”): prove the feature works for valid inputs.
- Negative tests (“break it”): prove the app behaves safely for invalid inputs or failure modes.

In this repo, negative tests target real-world failure patterns:

- empty input
- non-numeric input
- negative numbers
- corrupted localStorage
- tax rate edge cases that could cause divide-by-zero

## Unit tests

### What they are

Unit tests validate small, isolated logic (usually pure functions).

### Why we use them

- fastest feedback
- easiest to debug
- best place to lock down math and edge cases

### In this repo

- Calc logic: ./src/lib/calc.ts with tests in ./src/lib/calc.test.ts
- Formatting/number helpers: ./src/lib/format.ts, ./src/lib/number.ts (with tests)

Example unit test intent (not code):

- Positive: rent=1000, tax=0.22, buffer=0 ⇒ grossAnnual matches expected
- Negative: taxRate=1 ⇒ takeHomeRate clamps to 0.01 (no Infinity)

## Integration tests (React/component)

### What they are

Integration tests verify multiple pieces work together:

- React components
- state updates
- calling the calc module
- reading/writing localStorage

These tests are “bigger than unit tests” but still run without a real browser automation stack.

### In this repo

- Home page tests: ./src/app/page.test.tsx
- Planner client tests: ./src/app/planner/planner-client.test.tsx

Example integration test intent:

- Positive: typing values updates Total + results live
- Negative: pasting "-100" clamps to 0 and results remain valid

## End-to-end (E2E) tests

### What they are

E2E tests run the app like a user would, in a real browser environment.

They validate:

- routing works
- UI is usable
- persistence works across reloads

### Why we keep E2E smaller

E2E tests are higher confidence but higher cost (slower and sometimes flaky). We target only the highest-value user journeys.

### In this repo

E2E specs live in ./e2e/.

Examples:

- ./e2e/home-to-planner.spec.ts (navigation)
- ./e2e/planner-inputs-total.spec.ts (form + total)
- ./e2e/results-live-update.spec.ts (results update)
- ./e2e/persistence.spec.ts (localStorage restore)
- ./e2e/validation.spec.ts (negative inputs)

## How to run tests

From the repo root:

- Unit/integration: `npm run test:unit`
- E2E: `npm run test:e2e`
- Everything: `npm run test:all`

## The “test pyramid” idea (why we mix levels)

A healthy test portfolio usually has:

- many unit tests
- some integration tests
- fewer E2E tests

Reference: https://martinfowler.com/articles/practical-test-pyramid.html
