import React from "react";
import { render, screen } from "@testing-library/react";
import { PipelineVisual } from "../PipelineVisual";

describe("PipelineVisual Component", () => {
  test("a) Renders vertical pipeline visual container without crashing", () => {
    render(<PipelineVisual />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  test("b) Displays default match score readout, AI ENGINE node, and floating status badges", () => {
    render(<PipelineVisual matchScore={94} />);
    expect(screen.getByText("94%")).toBeInTheDocument();
    expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/3 Missing Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Suggestion Ready/i)).toBeInTheDocument();
    expect(screen.getByText(/Strong Match/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellent Match/i)).toBeInTheDocument();
  });

  test("c) Accepts custom prop values for matchScore, resumeFileName, and jobTitle", () => {
    render(
      <PipelineVisual
        matchScore={98}
        resumeFileName="Alex_Resume.pdf"
        jobTitle="Staff DevOps Engineer"
      />
    );
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText(/Alex_Resume.pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff DevOps Engineer/i)).toBeInTheDocument();
  });
});
