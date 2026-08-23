import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LivePreview } from "../LivePreview";

describe("LivePreview Component", () => {
  test("a) Renders live dashboard preview panel without crashing", () => {
    render(<LivePreview />);
    expect(
      screen.getByRole("heading", { name: /See What Your Match Report Looks Like/i })
    ).toBeInTheDocument();
  });

  test("b) Renders mock ATS score dial and skills breakdown", () => {
    render(<LivePreview />);
    expect(screen.getByText("Overall Semantic Match")).toBeInTheDocument();
    expect(screen.getByText("91%")).toBeInTheDocument();
    expect(screen.getByText("Python / PyTorch")).toBeInTheDocument();
  });

  test("c) Interactive behavior: tab buttons switch active panel content", async () => {
    const user = userEvent.setup();
    render(<LivePreview />);

    const rewritesTab = screen.getByRole("tab", { name: /AI Rewrites & Gaps/i });
    expect(rewritesTab).toBeInTheDocument();

    await user.click(rewritesTab);
    expect(screen.getByText(/AI Suggested Bullet Rewrites/i)).toBeInTheDocument();
    expect(screen.getByText(/Missing Keywords to Add/i)).toBeInTheDocument();

    const jdTab = screen.getByRole("tab", { name: /Target JD Breakdown/i });
    await user.click(jdTab);
    expect(screen.getByText(/Extracted Target Job Parameters/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior AI Infrastructure Architect/i)).toBeInTheDocument();

    const scoreTab = screen.getByRole("tab", { name: /Overall Match Score/i });
    await user.click(scoreTab);
    expect(screen.getByText("Overall Semantic Match")).toBeInTheDocument();
  });
});
