"use client";

import React from "react";
import { Container, Box, Typography, Card, CardContent, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { STEPS_DATA as defaultSteps, StepItem } from "@/components/landing/data/steps";
import { useReveal } from "@/hooks/useReveal";

export interface HowItWorksProps {
  steps?: StepItem[];
}

const STEP_ICONS = [CloudUploadIcon, WorkOutlinedIcon, AutoAwesomeIcon, CheckCircleOutlinedIcon];

export function HowItWorks({ steps = defaultSteps }: HowItWorksProps): React.JSX.Element {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <Box
      ref={sectionRef}
      id="how-it-works"
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: "background.paper",
        position: "relative",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 6, md: 9 } }}>
          <Chip
            label="Simple 3-Step Process"
            sx={{
              mb: 2,
              py: 2,
              px: 2,
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              color: "primary.main",
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
            How Resumiq Works
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            From raw PDF to interview-ready application in less than two minutes.
          </Typography>
        </Box>

        {/* Steps Grid Container */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3.5,
          }}
        >
          {steps.map((step, index) => {
            const IconComponent = STEP_ICONS[index % STEP_ICONS.length];
            return (
              <Box key={step.id || index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 2,
                    borderRadius: 5,
                    backgroundColor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    position: "relative",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "left" }}>
                    {/* Step Number & Icon Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          backgroundColor: "rgba(109, 94, 247, 0.12)",
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconComponent sx={{ fontSize: 24 }} />
                      </Box>

                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 900,
                          color: "primary.main",
                          opacity: 0.3,
                        }}
                      >
                        0{step.stepNumber || index + 1}
                      </Typography>
                    </Box>

                    {/* Step Content */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 800, mb: 1.5, color: "text.primary" }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6, mb: 2 }}
                    >
                      {step.description}
                    </Typography>

                    {/* Optional Arrow Indicator */}
                    {index < steps.length - 1 && (
                      <Box
                        sx={{
                          display: { xs: "none", md: "flex" },
                          alignItems: "center",
                          gap: 1,
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          pt: 1,
                        }}
                      >
                        <span>Next Step</span>
                        <ArrowForwardIcon sx={{ fontSize: 14, color: "primary.main" }} />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
