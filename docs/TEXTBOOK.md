# Budget-to-Income Planner: a 2026 software engineering “mini textbook”

Hi — if you’re a student reading this, you’re in the right place.

This repository is not just “a small Next.js app.” It’s a compact example of how modern software gets built in 2026:

- We start from a spec (so people + tools agree on what we’re building).
- We break the spec into small sprints (so delivery is predictable).
- We drive implementation with automated tests (so we can change code safely).
- We ship a real hosted artifact (so it’s not just theoretical).

Live site:

- https://kaw393939.github.io/financial/

## 0) Quick orientation (what you’re looking at)

You will see three “kinds of things” in this repo:

1) Product code (the app)
- It lives mostly in `src/`.

2) Tests (proof the code works)
- Unit and integration tests live next to code in `src/`.
- End-to-end tests live in `e2e/`.

3) Process artifacts (how we planned and constrained the work)
- The spec is in `project_management/`.
- The sprint plans are also in `project_management/`.

If you only read one thing in `project_management/`, start with:

- [project_management/letter1.md](../project_management/letter1.md) (the MVP spec)

## 1) Spec-driven development (why we start with writing)

“Spec-driven development” means we treat a written spec as a **shared contract**:

- Humans can read it and critique it.
- A coding agent can implement it without guessing.
- Tests can enforce it.

In this repo, the spec is intentionally small on purpose.

- MVP spec: [project_management/letter1.md](../project_management/letter1.md)
- Source-of-truth formula + test strategy: [project_management/completed /00-tdd-sprint-overview.md](../project_management/completed%20/00-tdd-sprint-overview.md)

Why that matters:

- If the spec is vague, you can’t reliably test it.
- If you can’t reliably test it, you can’t reliably automate it.
- If you can’t automate it, you don’t have modern delivery — you have luck.

## 2) Agentic orchestration (what that phrase means without hype)

You’ll hear “agentic” a lot in 2026. Here’s the non-mystical version:

- An “agent” can plan + execute coding tasks.
- “Orchestration” means we **control** that work with constraints and checkpoints.

In this project, we orchestrate the work with:

- a spec (scope + non-goals)
- sprint docs (acceptance criteria)
- tests (the enforcement mechanism)

### Breaking the 4th wall (LLM voice)

I’m an LLM (a large language model). That means:

- I can generate code, plans, and explanations quickly.
- I can also misunderstand ambiguous requirements.

So when you use an LLM as a coding agent, you don’t “just ask it to build stuff.”
You give it guardrails:

- “Exactly 2 pages; no extra pages.”
- “Use this formula; do not invent new math.”
- “Write positive AND negative tests.”
- “Do not add new features beyond the sprint.”

That’s the core lesson: autonomy with guardrails.

## 3) TDD (Test-Driven Development) in real life

TDD is a workflow that repeats:

1) Write a test for the next behavior you want.
2) Write code until the test passes.
3) Refactor so the design stays clean.

If you skip step 3, you’ll still “get it working”… and end up with a mess.

If you want an authoritative short overview:

- https://martinfowler.com/bliki/TestDrivenDevelopment.html

## 4) Testing terms (what unit / integration / E2E mean here)

Testing vocabulary is messy across the industry. What matters is that a team is consistent.

This repo uses three practical levels:

### Unit tests (fast, small)

Unit tests validate pure logic in isolation.

In this repo, the most important unit tests are for the calculation module:

- [src/lib/calc.ts](../src/lib/calc.ts) and [src/lib/calc.test.ts](../src/lib/calc.test.ts)

Unit tests answer questions like:

- “If rent is 1000 and tax rate is 0.22, what gross annual income is required?”
- “If tax rate is 1, do we avoid division by zero?”

### Integration tests (components working together)

Integration tests check multiple parts working together:

- React UI
- state updates
- formatting
- localStorage persistence

Examples:

- [src/app/page.test.tsx](../src/app/page.test.tsx)
- [src/app/planner/planner-client.test.tsx](../src/app/planner/planner-client.test.tsx)

Integration tests answer questions like:

- “When I type into an input, does the total update?”
- “Does the UI clamp negative numbers?”

### End-to-end (E2E) tests (browser, real app behavior)

E2E tests drive the app like a user, in a browser environment.

- E2E tests live in [e2e/](../e2e/).

E2E tests answer questions like:

- “Can a user go from Home → Planner?”
- “Does reload restore saved state?”

Playwright is the E2E tool here:

- https://playwright.dev/docs/intro

### Positive vs negative tests (the most important distinction)

- Positive tests prove the app works when the user behaves normally.
- Negative tests prove the app stays safe when reality happens.

Reality includes:

- empty fields
- non-numeric input
- negative numbers
- corrupted localStorage
- weird edge cases (tax rate = 1)

Negative tests are not “being mean.” They are practicing engineering.

## 5) The test pyramid (why we don’t do only E2E)

A common industry rule of thumb:

- lots of unit tests
- some integration tests
- fewer E2E tests

Why?

- Unit tests are fast and precise.
- E2E tests are higher confidence but slower and more brittle.

Reference:

- https://martinfowler.com/articles/practical-test-pyramid.html

## 6) The technologies (what each one is doing)

This project’s stack is intentionally mainstream for 2026 web engineering.

### Next.js + React

- Next.js provides routing, build tooling, and a production-grade framework.
- React is the UI library.

Why you should care:

- It forces you to think about client vs server boundaries (especially with `localStorage`).

### TypeScript

TypeScript adds static types to JavaScript.

Why it matters in 2026:

- types are a major way teams keep large codebases safe as they evolve
- types also help coding agents by making intent explicit

### Tailwind CSS

Tailwind is a utility-first CSS framework.

Why it matters:

- it lets teams style consistently and quickly without inventing lots of custom CSS

### shadcn/ui

shadcn/ui is a component approach commonly used with Tailwind.

Why it matters:

- it standardizes UI primitives (buttons, inputs) so you focus on behavior, not styling from scratch

### Vitest

Vitest is the unit/integration test runner.

Why it matters:

- fast feedback loops (you can run tests constantly)

Docs:

- https://vitest.dev/guide/

### Playwright

Playwright is the E2E test runner.

Why it matters:

- it runs real browsers (Chromium/WebKit/Firefox) and supports CI

Docs:

- https://playwright.dev/docs/intro

### GitHub Actions

GitHub Actions is CI/CD automation.

Why it matters:

- every push can automatically build/test/deploy

Docs:

- https://docs.github.com/en/actions

### GitHub Pages

GitHub Pages hosts static sites directly from a repository (often via Actions).

Docs:

- https://docs.github.com/en/pages

## 7) “Write me the TDD sprints for this spec” (the prompt + what it teaches)

One key teaching prompt in this class is:

“Write me the TDD sprints for this spec: `project_management/letter1.md`.
Write as many sprints as you need to implement the project.
For each sprint include acceptance criteria and the positive and negative E2E, integration, and unit tests we need.”

What this teaches you:

- Turning ambiguous product ideas into a buildable plan
- Thinking in dependencies
- Thinking in test levels
- Writing negative tests for real failure modes

In this repo, those sprints exist already in `project_management/completed /`.
In this repo, those sprints exist already in [project_management/completed /](../project_management/completed%20/).

## 8) How to study this repo (recommended reading path)

If you’re new:

1) [project_management/letter1.md](../project_management/letter1.md) (the spec)
2) [project_management/completed /00-tdd-sprint-overview.md](../project_management/completed%20/00-tdd-sprint-overview.md) (formula + testing strategy)
3) Skim one sprint doc (e.g. Sprint 02 or Sprint 06)
4) Open the matching code + tests

Then run tests locally:

- `npm run test:unit`
- `npm run test:e2e`

## 9) Final teacher note

This repo is intentionally small so you can see the whole system:

- requirements → sprints → tests → code → deployment

That pipeline is what “software engineering” is in 2026.

The tools will keep changing. The workflow — clarity, constraints, tests, automation — is the durable part.
