import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders a Start link to /planner", () => {
    render(<Home />);

    const startLink = screen.getByRole("link", { name: /start/i });
    expect(startLink).toHaveAttribute("href", "/planner");
  });

  it("shows the default assumptions", () => {
    render(<Home />);

    expect(screen.getByText(/default assumptions/i)).toBeInTheDocument();
    expect(screen.getByText(/effective tax rate:\s*22%/i)).toBeInTheDocument();
    expect(screen.getByText(/safety buffer:\s*0%/i)).toBeInTheDocument();
  });
});

