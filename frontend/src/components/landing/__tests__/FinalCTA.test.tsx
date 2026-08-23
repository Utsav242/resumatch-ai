import React from "react";
import { render, screen } from "@testing-library/react";
import { FinalCTA } from "../FinalCTA";

describe("FinalCTA Component", () => {
  test("a) Renders final CTA banner without crashing", () => {
    render(<FinalCTA />);
    expect(
      screen.getByRole("heading", { name: /Ready to Triple Your Interview Callbacks\?/i })
    ).toBeInTheDocument();
  });

  test("b) Renders primary call-to-action button with text", () => {
    render(<FinalCTA />);
    expect(
      screen.getByRole("link", { name: /Analyze Your Resume Free Now/i })
    ).toBeInTheDocument();
  });

  test("c) Renders feature checklist items and trust callouts", () => {
    render(<FinalCTA />);
    expect(screen.getByText(/No credit card required/i)).toBeInTheDocument();
    expect(screen.getByText(/Free 3 full resume match scans/i)).toBeInTheDocument();
  });
});
