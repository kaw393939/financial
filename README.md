# Budget-to-Income Planner (MVP)

A minimal 2-page web app for students:

- Enter a monthly budget.
- Adjust assumptions (effective tax rate + optional safety buffer).
- See the gross monthly/annual salary needed to afford the budget.

Live site:

- https://kaw393939.github.io/financial/

## Docs (how/why this was built)

This repository is also a teaching example of **spec-driven development** + **agentic orchestration** + **test-first delivery**.

- Start here (student docs index): [docs/README.md](docs/README.md)
- Textbook-style guide (recommended first read): [docs/TEXTBOOK.md](docs/TEXTBOOK.md)
- Process overview: [docs/PROCESS.md](docs/PROCESS.md)
- Testing guide (unit vs integration vs e2e, positive vs negative): [docs/TESTING.md](docs/TESTING.md)
- Agent prompt templates (including “write me the TDD sprints…”): [docs/AGENT_PROMPTS.md](docs/AGENT_PROMPTS.md)

Primary spec artifacts:

- MVP letter/spec: [project_management/letter1.md](project_management/letter1.md)
- TDD sprint overview (source-of-truth formula): [project_management/completed /00-tdd-sprint-overview.md](project_management/completed%20/00-tdd-sprint-overview.md)
- Completed sprint plan set: [project_management/completed /](project_management/completed%20/)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the URL shown in your terminal.

## Tests

```bash
# unit + integration
npm run test:unit

# end-to-end (Playwright)
npm run test:e2e

# everything
npm run test:all
```

## GitHub Pages

This repo is configured to deploy to GitHub Pages at:

- https://kaw393939.github.io/financial/

Deployment is handled by the workflow in `.github/workflows/deploy-pages.yml`.

## What the formula means

The app calculates the **gross income** required to cover your monthly costs after taxes.

Let:

- $\text{expenses}$ = sum of all monthly inputs
- $\text{buffer} = \text{expenses} \times \text{bufferPct}$
- $\text{netNeeded} = \text{expenses} + \text{buffer}$
- $\text{takeHomeRate} = 1 - \text{taxRate}$ (clamped to a minimum of $0.01$)
- $\text{grossMonthlyNeeded} = \frac{\text{netNeeded}}{\text{takeHomeRate}}$
- $\text{grossAnnualNeeded} = 12 \times \text{grossMonthlyNeeded}$

Displayed outputs:

- Net monthly needed
- Gross monthly needed
- Gross annual salary needed

## MVP non-goals

No login/auth, database, charts, multiple scenarios, PDF export, share links, or real tax tables.
