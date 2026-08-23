"use client";

import React from "react";
import { Container, Box, Typography, Chip } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { FEATURES_DATA as defaultFeatures, FeatureItem } from "@/components/landing/data/features";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { useReveal } from "@/hooks/useReveal";

export interface FeaturesSectionProps {
  features?: FeatureItem[];
}

export function FeaturesSection({ features = defaultFeatures }: FeaturesSectionProps): React.JSX.Element {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <Box
      ref={sectionRef}
      id="features"
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: "background.default",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 6, md: 9 } }}>
          <Chip
            icon={<BoltIcon sx={{ fontSize: 16, color: "primary.main" }} />}
            label="Engineered for Callback Conversion"
            sx={{
              mb: 2,
              py: 2,
              px: 1,
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 2,
              color: "text.primary",
            }}
          >
            Everything You Need to Pass ATS & Impress Recruiters
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            Powered by high-dimensional vector embeddings, custom LLM rewriters, and instant gap
            detection.
          </Typography>
        </Box>

        {/* Feature Layout Container */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 3.5,
          }}
        >
          {features.map((feature) => (
            <Box key={feature.id}>
              <FeatureCard feature={feature} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
