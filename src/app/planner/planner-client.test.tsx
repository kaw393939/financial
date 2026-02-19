import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlannerClient from "./planner-client";

import { PLANNER_STORAGE_KEY } from "@/lib/planner-persistence";

describe("PlannerClient", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders all monthly input fields", () => {
    render(<PlannerClient />);

    expect(screen.getByLabelText("Rent")).toBeInTheDocument();
    expect(screen.getByLabelText("Utilities")).toBeInTheDocument();
    expect(screen.getByLabelText("Internet/Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Groceries")).toBeInTheDocument();
    expect(screen.getByLabelText("Eating Out")).toBeInTheDocument();
    expect(screen.getByLabelText("Transportation")).toBeInTheDocument();
    expect(screen.getByLabelText("Insurance/Health")).toBeInTheDocument();
    expect(screen.getByLabelText("Debt Payments")).toBeInTheDocument();
    expect(screen.getByLabelText("Subscriptions")).toBeInTheDocument();
    expect(screen.getByLabelText("Misc")).toBeInTheDocument();
    expect(screen.getByLabelText("Savings (monthly $)")).toBeInTheDocument();
  });

  it("updates total monthly costs live as the user types", async () => {
    const user = userEvent.setup();
    render(<PlannerClient />);

    const rent = screen.getByLabelText("Rent");
    const groceries = screen.getByLabelText("Groceries");

    await user.type(rent, "1000");
    await user.type(groceries, "250");

    expect(screen.getByTestId("total-monthly-costs")).toHaveTextContent("$1,250.00");
  });

  it("shows default assumptions and updates when sliders change", async () => {
    render(<PlannerClient />);

    expect(screen.getByTestId("tax-rate-value")).toHaveTextContent("22%");
    expect(screen.getByTestId("buffer-pct-value")).toHaveTextContent("0%");

    const tax = screen.getByLabelText("Effective tax rate");
    const buffer = screen.getByLabelText("Safety buffer");

    fireEvent.change(tax, { target: { value: "0.3" } });
    expect(screen.getByTestId("tax-rate-value")).toHaveTextContent("30%");

    fireEvent.change(buffer, { target: { value: "0.1" } });
    expect(screen.getByTestId("buffer-pct-value")).toHaveTextContent("10%");
  });

  it("treats empty and negative values as 0", async () => {
    const user = userEvent.setup();
    render(<PlannerClient />);

    const misc = screen.getByLabelText("Misc");

    await user.click(misc);
    await user.paste("-10");
    expect(screen.getByTestId("total-monthly-costs")).toHaveTextContent("$0.00");

    await user.clear(misc);
    expect(screen.getByTestId("total-monthly-costs")).toHaveTextContent("$0.00");
  });

  it("updates results live from inputs and assumptions", async () => {
    const user = userEvent.setup();
    render(<PlannerClient />);

    const rent = screen.getByLabelText("Rent");
    const groceries = screen.getByLabelText("Groceries");

    await user.type(rent, "1000");
    await user.type(groceries, "500");

    expect(screen.getByTestId("net-needed")).toHaveTextContent("$1,500.00");

    // Increase tax rate to make gross higher.
    const tax = screen.getByLabelText("Effective tax rate");
    fireEvent.change(tax, { target: { value: "0.3" } });

    expect(screen.getByTestId("gross-annual")).not.toHaveTextContent("$0.00");
  });

  it("restores state from localStorage on load", async () => {
    window.localStorage.setItem(
      PLANNER_STORAGE_KEY,
      JSON.stringify({
        monthly: { rent: "999" },
        taxRate: 0.22,
        bufferPct: 0,
      })
    );

    render(<PlannerClient />);

    // Restored via effect; wait for it to show up.
    expect(await screen.findByDisplayValue("999")).toBeInTheDocument();
  });

  it("loads example values and resets back to defaults", async () => {
    const user = userEvent.setup();
    render(<PlannerClient />);

    await user.click(screen.getByTestId("load-example"));
    expect(screen.getByLabelText("Rent")).toHaveValue(1200);
    expect(screen.getByTestId("gross-annual")).not.toHaveTextContent("$0.00");

    await user.click(screen.getByTestId("reset"));
    expect((screen.getByLabelText("Rent") as HTMLInputElement).value).toBe("");
    expect(screen.getByTestId("total-monthly-costs")).toHaveTextContent("$0.00");
  });
});
