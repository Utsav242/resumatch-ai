import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer, FOOTER_COLUMNS } from "../Footer";

describe("Footer Component", () => {
  test("a) Renders footer logo and brand description without crashing", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /Resum/i })).toBeInTheDocument();
    expect(screen.getByText(/Next-generation resume analysis platform/i)).toBeInTheDocument();
  });

  test("b) Renders all footer columns and link items from FOOTER_COLUMNS data array", () => {
    render(<Footer />);
    FOOTER_COLUMNS.forEach((col) => {
      expect(screen.getByRole("heading", { name: col.title })).toBeInTheDocument();
      col.links.forEach((link) => {
        const elements = screen.getAllByRole("link", { name: link.label });
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });

  test("c) Renders social links with appropriate aria-labels", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Twitter/i })).toBeInTheDocument();
  });

  test("d) Renders current year copyright and tech stack note", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Resumiq Inc`, "i"))
    ).toBeInTheDocument();
  });
});
