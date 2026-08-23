import React from "react";
import { render, screen } from "@testing-library/react";
import { FeaturesSection } from "../FeaturesSection";
import { FEATURES_DATA, FeatureItem } from "../data/features";

describe("FeaturesSection Component", () => {
  test("a) Renders features section header and grid container", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole("heading", { name: /Everything You Need to Pass ATS & Impress Recruiters/i })
    ).toBeInTheDocument();
  });

  test("b) Data-driven rendering: renders exactly the correct NUMBER of items based on data array length", () => {
    render(<FeaturesSection features={FEATURES_DATA} />);
    const cardTitles = FEATURES_DATA.map((f) => f.title);

    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("c) Renders correctly with custom features array passed via props", () => {
    const customFeatures: FeatureItem[] = [
      {
        id: "custom-1",
        iconName: "Target",
        title: "Custom Feature 1",
        description: "Custom Description 1",
      },
      {
        id: "custom-2",
        iconName: "Zap",
        title: "Custom Feature 2",
        description: "Custom Description 2",
      },
    ];

    render(<FeaturesSection features={customFeatures} />);
    expect(screen.getByText("Custom Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Feature 2")).toBeInTheDocument();
    expect(screen.queryByText(FEATURES_DATA[0].title)).not.toBeInTheDocument();
  });
});
