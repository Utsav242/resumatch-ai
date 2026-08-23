"use client";

import React from "react";
import Link from "next/link";
import { Container, Paper, Box, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useReveal } from "@/hooks/useReveal";

export function FinalCTA(): React.JSX.Element {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        backgroundColor: "background.default",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, sm: 8, md: 10 },
            borderRadius: 8,
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(109, 94, 247, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
            border: "1px solid",
            borderColor: "primary.main",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.25rem", sm: "3.25rem", md: "4rem" },
              fontWeight: 900,
              letterSpacing: "-0.03em",
              mb: 2.5,
              color: "text.primary",
            }}
          >
            Ready to Triple Your Interview Callbacks?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
              color: "text.secondary",
              maxWidth: 680,
              mx: "auto",
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            Join over 14,000+ job seekers using vector embedding intelligence to beat ATS filters
            and land dream job offers.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 4, justifyContent: "center" }}
          >
            <Button
              component={Link}
              href="/sign-up"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 2,
                px: 5,
                fontSize: "1.125rem",
              }}
            >
              Analyze Your Resume Free Now
            </Button>
          </Stack>

          {/* Guarantee Badges */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem", fontWeight: 600 }}>
              <CheckCircleIcon sx={{ fontSize: 18, color: "success.main" }} />
              <span>No credit card required</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem", fontWeight: 600 }}>
              <CheckCircleIcon sx={{ fontSize: 18, color: "success.main" }} />
              <span>Free 3 full resume match scans</span>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
