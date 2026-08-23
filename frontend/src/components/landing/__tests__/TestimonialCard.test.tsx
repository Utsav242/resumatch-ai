import React from "react";
import { render, screen } from "@testing-library/react";
import { TestimonialCard } from "../TestimonialCard";
import { TestimonialItem } from "../data/testimonials";

const mockTestimonial: TestimonialItem = {
  id: "t-1",
  quote: "Resumiq AI helped me double my callbacks within a week!",
  name: "Jordan Lee",
  role: "Senior Staff Architect",
  company: "CloudTech",
  avatarInitials: "JL",
  gradientColors: "from-blue-500 to-indigo-500",
  matchScore: 98,
};

describe("TestimonialCard Component", () => {
  test("a) Renders without crashing with valid testimonial prop", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText("Jordan Lee")).toBeInTheDocument();
  });

  test("b) Displays quote, author name, role, company, avatar initials", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(
      screen.getByText(/Resumiq AI helped me double my callbacks within a week!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Senior Staff Architect • CloudTech/i)).toBeInTheDocument();
    expect(screen.getByText("JL")).toBeInTheDocument();
  });

  test("c) Renders 5 star rating component", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByLabelText(/5 Stars/i)).toBeInTheDocument();
  });
});
