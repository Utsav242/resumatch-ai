"use client";

import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { useReveal } from "@/hooks/useReveal";

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export const STATS_DATA: StatItem[] = [
  { value: "99.4%", label: "ATS Compatibility", sublabel: "Verified across Workday & Greenhouse" },
  { value: "3.4x", label: "More Callbacks", sublabel: "Average interview rate increase" },
  { value: "< 45ms", label: "Vector Processing", sublabel: "Real-time semantic analysis" },
  { value: "14,000+", label: "Resumes Optimized", sublabel: "Trusted by top tech candidates" },
];

export interface StatsSectionProps {
  stats?: StatItem[];
}

export function StatsSection({ stats = STATS_DATA }: StatsSectionProps): React.JSX.Element {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                backgroundColor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  fontWeight: 900,
                  color: "primary.main",
                  letterSpacing: "-0.02em",
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: "text.primary" }}>
                {stat.label}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {stat.sublabel}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
