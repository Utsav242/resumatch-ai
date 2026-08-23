import React from "react";
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "../FeatureCard";
import { FeatureItem } from "../data/features";

const mockFeature: FeatureItem = {
  id: "test-feature",
  iconName: "Cpu",
  title: "Test Vector Engine",
  description: "Test description for vector scanning capability.",
  badge: "Test Badge",
};

describe("FeatureCard Component", () => {
  test("a) Renders without crashing with valid feature prop", () => {
    render(<FeatureCard feature={mockFeature} />);
    expect(screen.getByText("Test Vector Engine")).toBeInTheDocument();
  });

  test("b) Displays title, description, and badge from props", () => {
    render(<FeatureCard feature={mockFeature} />);
    expect(screen.getByText("Test Vector Engine")).toBeInTheDocument();
    expect(
      screen.getByText("Test description for vector scanning capability.")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  test("c) Fallback icon renders gracefully when optional badge is omitted", () => {
    const featureWithoutBadge: FeatureItem = {
      id: "no-badge",
      iconName: "Zap",
      title: "No Badge Feature",
      description: "Feature without tag badge.",
    };

    render(<FeatureCard feature={featureWithoutBadge} />);
    expect(screen.getByText("No Badge Feature")).toBeInTheDocument();
    expect(screen.queryByText("Test Badge")).not.toBeInTheDocument();
  });
});
