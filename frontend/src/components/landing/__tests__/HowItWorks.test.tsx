import React from "react";
import { render, screen } from "@testing-library/react";
import { HowItWorks } from "../HowItWorks";
import { STEPS_DATA, StepItem } from "../data/steps";

describe("HowItWorks Component", () => {
  test("a) Renders section heading without crashing", () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: /How Resumiq Works/i })
    ).toBeInTheDocument();
  });

  test("b) Renders correct number of steps based on STEPS_DATA array length", () => {
    render(<HowItWorks steps={STEPS_DATA} />);
    STEPS_DATA.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      expect(screen.getByText(`0${step.stepNumber}`)).toBeInTheDocument();
    });
  });

  test("c) Renders correctly with custom step list passed via props", () => {
    const customSteps: StepItem[] = [
      {
        stepNumber: 1,
        id: "c-step-1",
        title: "Custom Step One",
        description: "Custom step one description text.",
        badge: "Step 01",
        highlightText: "Highlight 1",
      },
    ];

    render(<HowItWorks steps={customSteps} />);
    expect(screen.getByText("Custom Step One")).toBeInTheDocument();
    expect(screen.queryByText(STEPS_DATA[1].title)).not.toBeInTheDocument();
  });
});
