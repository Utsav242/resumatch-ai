"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * ThemeProvider component that supplies light/dark theme state across the application.
 * Updates the `data-theme` attribute on `document.documentElement`.
 * Uses React state rather than browser storage for maximum environment compatibility.
 *
 * @param props.children - Child components to render within theme scope.
 * @param props.defaultTheme - Initial theme state, defaults to 'dark'.
 * @returns JSX element wrapping children with ThemeContext.Provider.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps): React.JSX.Element {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
  };

  const toggleTheme = (): void => {
    setThemeState((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom React hook to access current theme state and theme toggle action.
 * Must be used within a ThemeProvider.
 *
 * @returns ThemeContextType containing theme, setTheme, and toggleTheme.
 * @throws Error if used outside ThemeProvider.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
