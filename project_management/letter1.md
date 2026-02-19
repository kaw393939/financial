Letter to Agentic Coding Agent: Build Budget-to-Income Planner (MVP)
Hi Agent,
Build an MVP web app called Budget-to-Income Planner for students. The app lets a student enter a monthly budget and outputs the gross annual salary needed to afford it (using a simple effective tax rate). Keep it fast, minimal, and clean.
1) Tech (keep it simple)
Next.js (App Router) + TypeScript
TailwindCSS + shadcn/ui
No database for MVP (use localStorage)
Deploy to Vercel
2) Pages (only 2)
Home
Short explanation + “Start” button
Default assumptions displayed
Planner
Single screen with:
Budget inputs (monthly)
Assumptions (tax rate slider)
Results panel (income required)
3) Budget Inputs (monthly)
Create a simple form with these fields (numbers, default 0, allow empty = 0):
Rent
Utilities
Internet/Phone
Groceries
Eating Out
Transportation
Insurance/Health
Debt Payments
Subscriptions
Misc
Savings (monthly $)
Show a Total Monthly Costs number at the bottom.
4) Assumptions
Effective tax rate slider (default 0.22, range 0.10–0.40)
Optional: “Safety buffer %” slider (default 0%, range 0–20%)
5) Core Calculations (must be correct)
Let:
expenses = sum(all monthly fields)
buffer = expenses * bufferPct
netNeeded = expenses + buffer
takeHomeRate = 1 - taxRate (clamp to minimum 0.01 to avoid divide-by-zero)
grossMonthlyNeeded = netNeeded / takeHomeRate
grossAnnualNeeded = grossMonthlyNeeded * 12
Display:
Net monthly needed
Gross monthly needed
Gross annual salary needed (big)
6) UX Requirements
Update results live as user types
Store the whole planner state in localStorage (autosave)
Add buttons:
Reset
Load Example (fills realistic sample values)
7) Implementation Notes
Put all calculations in a pure function module (/lib/calc.ts) with unit tests optional (nice-to-have).
Use cents internally if you want, but MVP can use dollars with rounding (2 decimals).
Validate inputs: treat NaN/empty as 0; prevent negative values.
8) Deliverables
Working deployed Vercel app
README: run locally + what the formula means
Non-goals for MVP:
Login/auth, database, charts, multiple scenarios, PDF export, share links, state tax tables.
—Keith