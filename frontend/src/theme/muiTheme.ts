"use client";

import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

/**
 * Custom Material UI Theme for Resumiq
 * Preserves exact brand colors (#6D5EF7 primary, #8B5CF6 accent)
 * and dynamic light/dark mode palette definitions.
 *
 * Light Theme Typography Rules:
 * - Headings: #111827
 * - Body text: #374151
 * - Secondary text: #6B7280
 * - Labels: #4B5563
 * - Brand Purple: Preserved for highlights, links, and CTAs.
 */
export const getMuiTheme = (mode: "dark" | "light"): Theme => {
  const isDark = mode === "dark";

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#6D5EF7",
        light: "#8B5CF6",
        dark: "#5848E5",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#8B5CF6",
        light: "#A855F7",
        dark: "#7C3AED",
        contrastText: "#FFFFFF",
      },
      background: {
        default: isDark ? "#0B1020" : "#F8FAFC",
        paper: isDark ? "#121826" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#E8EAF2" : "#111827",
        secondary: isDark ? "#9AA3B8" : "#374151",
      },
      divider: isDark ? "rgba(30, 36, 54, 0.8)" : "rgba(226, 232, 240, 0.8)",
      success: {
        main: "#10B981",
      },
    },
    typography: {
      fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
      h1: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 800,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      h2: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 800,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      h3: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      h4: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      h5: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      h6: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      subtitle1: {
        fontWeight: 600,
        color: isDark ? "#E8EAF2" : "#111827",
      },
      subtitle2: {
        fontWeight: 600,
        color: isDark ? "#9AA3B8" : "#4B5563",
      },
      body1: {
        color: isDark ? "#9AA3B8" : "#374151",
      },
      body2: {
        color: isDark ? "#9AA3B8" : "#6B7280",
      },
      caption: {
        color: isDark ? "#9AA3B8" : "#6B7280",
      },
      button: {
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 24px",
            fontWeight: 700,
            fontSize: "0.875rem",
            transition: "all 0.2s ease-in-out",
          },
          contained: {
            background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(109, 94, 247, 0.25)",
            "&:hover": {
              opacity: 0.95,
              boxShadow: "0 6px 24px rgba(109, 94, 247, 0.35)",
            },
          },
          outlined: {
            borderColor: isDark ? "#1E2436" : "#CBD5E1",
            color: isDark ? "#E8EAF2" : "#111827",
            "&:hover": {
              borderColor: "#6D5EF7",
              backgroundColor: isDark ? "rgba(109, 94, 247, 0.08)" : "rgba(109, 94, 247, 0.04)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "rgba(18, 24, 38, 0.9)" : "#FFFFFF",
            border: `1px solid ${isDark ? "#1E2436" : "#E2E8F0"}`,
            borderRadius: 24,
            boxShadow: isDark
              ? "0 20px 40px -15px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#121826" : "#FFFFFF",
            border: `1px solid ${isDark ? "#1E2436" : "#E2E8F0"}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 10,
            color: isDark ? "#E8EAF2" : "#4B5563",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: isDark ? "#0E1428" : "#F8FAFC",
              color: isDark ? "#E8EAF2" : "#111827",
              "& fieldset": {
                borderColor: isDark ? "#1E2436" : "#CBD5E1",
              },
              "&:hover fieldset": {
                borderColor: "#6D5EF7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6D5EF7",
              },
            },
            "& .MuiInputLabel-root": {
              color: isDark ? "#9AA3B8" : "#4B5563",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#121826" : "#FFFFFF",
            border: `1px solid ${isDark ? "#1E2436" : "#E2E8F0"}`,
            borderRadius: "16px !important",
            marginBottom: 12,
            "&:before": {
              display: "none",
            },
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
