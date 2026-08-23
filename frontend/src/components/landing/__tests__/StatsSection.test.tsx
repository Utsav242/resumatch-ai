import React from "react";
import { render, screen } from "@testing-library/react";
import { StatsSection, STATS_DATA, StatItem } from "../StatsSection";

describe("StatsSection Component", () => {
  test("a) Renders stats section container without crashing", () => {
    render(<StatsSection />);
    expect(screen.getByText("ATS Compatibility")).toBeInTheDocument();
  });

  test("b) Renders correct number of stat cards matching STATS_DATA length", () => {
    render(<StatsSection stats={STATS_DATA} />);
    STATS_DATA.forEach((stat: StatItem) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.sublabel)).toBeInTheDocument();
    });
  });

  test("c) Accepts custom stats array via props", () => {
    const customStats: StatItem[] = [
      {
        value: "100%",
        label: "Custom Stat",
        sublabel: "Custom description",
      },
    ];

    render(<StatsSection stats={customStats} />);
    expect(screen.getByText("Custom Stat")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});
