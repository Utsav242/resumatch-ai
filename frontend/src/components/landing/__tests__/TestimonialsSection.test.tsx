import React from "react";
import { render, screen } from "@testing-library/react";
import { TestimonialsSection } from "../TestimonialsSection";
import { TESTIMONIALS_DATA, TestimonialItem } from "../data/testimonials";

describe("TestimonialsSection Component", () => {
  test("a) Renders testimonials section header without crashing", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByRole("heading", { name: /Loved by Job Seekers at Top Tech Companies/i })
    ).toBeInTheDocument();
  });

  test("b) Data-driven rendering: renders exactly the correct NUMBER of testimonial cards matching data array length", () => {
    render(<TestimonialsSection testimonials={TESTIMONIALS_DATA} />);
    TESTIMONIALS_DATA.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.avatarInitials)).toBeInTheDocument();
    });
  });

  test("c) Renders correctly with custom testimonials array passed via props", () => {
    const customTestimonials: TestimonialItem[] = [
      {
        id: "ct-1",
        quote: "Custom testimonial quote text.",
        name: "Taylor Swift",
        role: "Lead Engineer",
        company: "MusicTech",
        avatarInitials: "TS",
        gradientColors: "from-purple-500 to-pink-500",
        matchScore: 99,
      },
    ];

    render(<TestimonialsSection testimonials={customTestimonials} />);
    expect(screen.getByText("Taylor Swift")).toBeInTheDocument();
    expect(screen.getByText("TS")).toBeInTheDocument();
    expect(screen.queryByText(TESTIMONIALS_DATA[0].name)).not.toBeInTheDocument();
  });
});
