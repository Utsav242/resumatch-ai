import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";
import { ThemeProvider } from "@/context/ThemeProvider";

const renderHero = () => {
  return render(
    <ThemeProvider>
      <Hero />
    </ThemeProvider>
  );
};

describe("Hero Component", () => {
  test("a) Renders without crashing and displays exact reference headline", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Match Your Resume to Target Jobs in/i)).toBeInTheDocument();
    expect(screen.getByText(/Milliseconds\./i)).toBeInTheDocument();
  });

  test("b) Renders primary and secondary call-to-action buttons with correct labels", () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: /Analyze My Resume Free/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Watch Interactive Demo/i })
    ).toBeInTheDocument();
  });

  test("c) Embedded PipelineVisual component is present inside Hero", () => {
    renderHero();
    expect(screen.getByText(/retrieving context\.\.\./i)).toBeInTheDocument();
  });

  test("d) Renders trust badges and benefits", () => {
    renderHero();
    expect(screen.getByText(/99.4% ATS Compatibility Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-Time Semantic Vector Matching/i)).toBeInTheDocument();
  });
});
