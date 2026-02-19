# Prompting a coding agent (templates for this repo)

These templates are designed to keep an agent aligned with:

- the spec
- the non-goals
- a test-first workflow

## Template 1 — generate the TDD sprint plan from a spec (the phrase to teach)

Copy/paste prompt:

“Write me the TDD sprints for this spec: ./project_management/letter1.md.
Write as many sprints as you need to implement the project.
For each sprint include acceptance criteria and the positive and negative E2E, integration, and unit tests we need.
Keep sprints small and ordered by dependencies. Respect the MVP non-goals.”

What you should expect back:

- A numbered list of sprints
- For each sprint:
  - what gets built
  - what does NOT get built
  - how we prove it works (tests)

## Template 2 — implement one sprint

Copy/paste prompt:

“Implement Sprint 03 from ./project_management/completed /03-sprint-planner-form-inputs-and-total.md.
Follow TDD: update/add unit/integration/e2e tests first, then implement.
Do not add features outside this sprint.
Run the relevant tests and fix failures caused by your change.”

## Template 3 — negative testing focus

Copy/paste prompt:

“Add negative tests for invalid inputs (empty, non-numeric, negative, extreme tax rate) across unit/integration/e2e.
Do not change UX. Only harden behavior to match existing spec.”

## Template 4 — explain the work (for a report)

Copy/paste prompt:

“Explain how this repo demonstrates spec-driven development and agentic orchestration.
Use ./project_management/letter1.md and ./project_management/completed / as the evidence.
Explain unit vs integration vs e2e and why we need positive and negative tests.”

## Notes on ‘agentic orchestration’ wording

In industry conversations, “agentic” usually implies the agent can plan and execute work.
In this class project, we still keep a human in control by:

- giving explicit constraints
- requiring tests
- using acceptance criteria
- reviewing outputs

That’s the point: autonomy with guardrails.

Further reading:

- GitHub Copilot docs (agents): https://docs.github.com/en/copilot
- TDD overview: https://martinfowler.com/bliki/TestDrivenDevelopment.html
