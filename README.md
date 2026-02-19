# Budget-to-Income Planner (MVP)

A minimal 2-page web app for students:

- Enter a monthly budget.
- Adjust assumptions (effective tax rate + optional safety buffer).
- See the gross monthly/annual salary needed to afford the budget.

Live site:

- https://kaw393939.github.io/financial/

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
