# Spec-driven development + agentic orchestration (what we’re doing here)

## What “spec-driven” means in this repo

Spec-driven development means we treat a written spec as the **source of truth** for what the product is and what “done” means.

In this project, the spec is intentionally short:

- ./project_management/letter1.md defines the MVP scope (2 pages, inputs, assumptions, outputs, localStorage, Reset/Example).
- ./project_management/completed /00-tdd-sprint-overview.md defines the calculation formula and the testing strategy.

The goal is not “documentation for documentation’s sake”. The goal is **alignment**:

- Humans can review it.
- A coding agent can implement it.
- Tests can enforce it.

## What “agentic orchestration” means (in practice)

Agentic orchestration is the workflow of using a coding agent as an implementation engine **under constraints**.

In practice, that means:

- You provide a spec and constraints (scope, acceptance criteria, non-goals).
- You ask the agent to produce an execution plan (here: sprints).
- Each sprint includes tests (positive + negative) across unit/integration/e2e.
- The agent implements one sprint at a time and keeps the build green.

Key idea: the agent is not “free-styling features” — it is being **orchestrated** by the spec + test suite.

## Why this matches industry software engineering (2026)

Modern delivery expectations typically include:

- A running deployed artifact (not just code on a laptop)
- Automated tests
- CI automation (build/test/deploy)
- Accessibility and basic mobile usability

This repo demonstrates all of that, at MVP scale.

## How the sprint system works

Each sprint doc follows the same pattern:

- Goal
- In scope / Out of scope
- Acceptance criteria
- TDD test plan
  - Unit tests (fast, pure logic)
  - Integration tests (React + state + storage + calc wiring)
  - E2E tests (real browser, real routes)

See ./project_management/completed / for the sprint set.

## “Definition of Done” (the rule that prevents chaos)

A sprint is “done” when:

- Acceptance criteria are met
- Tests for that sprint exist and pass
- No new type/lint errors
- Non-goals were respected (no scope creep)

This is the critical guardrail when using a coding agent: it keeps the work auditable.

## Where the code maps to the spec

- Pure calculations: ./src/lib/calc.ts
- Planner UI (client state + inputs + results): ./src/app/planner/planner-client.tsx
- Unit tests: ./src/lib/*.test.ts
- Integration/component tests: ./src/app/**/*.test.tsx
- E2E tests: ./e2e/*.spec.ts
- GitHub Pages deploy workflow: ./.github/workflows/deploy-pages.yml

## Further reading (authoritative)

- TDD (Red/Green/Refactor): https://martinfowler.com/bliki/TestDrivenDevelopment.html
- Test pyramid (test portfolio across levels): https://martinfowler.com/articles/practical-test-pyramid.html
- GitHub Actions: https://docs.github.com/en/actions
- GitHub Pages: https://docs.github.com/en/pages
