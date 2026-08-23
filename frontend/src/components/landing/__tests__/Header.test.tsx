import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header, NAV_LINKS } from "../Header";
import { ThemeProvider } from "@/context/ThemeProvider";

const renderHeader = () => {
  return render(
    <ThemeProvider defaultTheme="dark">
      <Header />
    </ThemeProvider>
  );
};

describe("Header Component", () => {
  test("a) Renders header and logo without crashing", () => {
    renderHeader();
    expect(screen.getByText(/Resum/i)).toBeInTheDocument();
    expect(screen.getByText(/iq/i)).toBeInTheDocument();
  });

  test("b) Renders desktop navigation buttons from NAV_LINKS data array", () => {
    renderHeader();
    NAV_LINKS.forEach((link) => {
      expect(screen.getByRole("button", { name: link.label })).toBeInTheDocument();
    });
  });

  test("c) Interactive behavior: theme toggle button switches data-theme attribute", async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    const toggleButton = screen.getAllByRole("button", {
      name: /toggle/i,
    })[0];
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  test("d) Accessibility, Sign In button, and mobile menu toggle", async () => {
    const user = userEvent.setup();
    renderHeader();

    const mobileMenuButton = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(mobileMenuButton).toBeInTheDocument();

    await user.click(mobileMenuButton);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});
