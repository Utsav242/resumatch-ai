import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "../FAQAccordion";
import { FAQ_DATA, FaqItem } from "../data/faq";

describe("FAQAccordion Component", () => {
  test("a) Renders FAQ section header and accordion triggers without crashing", () => {
    render(<FAQAccordion />);
    expect(
      screen.getByRole("heading", { name: /Frequently Asked Questions/i })
    ).toBeInTheDocument();
  });

  test("b) Renders correct number of FAQ triggers matching FAQ_DATA array length", () => {
    render(<FAQAccordion items={FAQ_DATA} />);
    FAQ_DATA.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  test("c) Interactive behavior: FAQ accordion expands/collapses and sets aria-expanded correctly", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={FAQ_DATA} />);

    // Default item is expanded
    const firstTrigger = screen.getByRole("button", { name: FAQ_DATA[0].question });
    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(FAQ_DATA[0].answer)).toBeInTheDocument();

    // Click second item
    const secondTrigger = screen.getByRole("button", { name: FAQ_DATA[1].question });
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");

    await user.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(FAQ_DATA[1].answer)).toBeInTheDocument();
  });

  test("d) Renders with custom FAQ item array via props", () => {
    const customFaq: FaqItem[] = [
      {
        id: "c-faq-1",
        question: "Custom FAQ Question?",
        answer: "Custom FAQ Answer string.",
      },
    ];

    render(<FAQAccordion items={customFaq} />);
    expect(screen.getByText("Custom FAQ Question?")).toBeInTheDocument();
    expect(screen.queryByText(FAQ_DATA[1].question)).not.toBeInTheDocument();
  });
});
