"use client";

import { HeroBackgroundAnimation } from "@/components/landing/HeroBackgroundAnimation";
import { PipelineVisual } from "@/components/landing/PipelineVisual";
import { useReveal } from "@/hooks/useReveal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export function Hero(): React.JSX.Element {
  const { ref: heroRef, isVisible } = useReveal({ threshold: 0.05 });

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: "relative",
        pt: { xs: 6, sm: 7, md: 5 },
        pb: { xs: 6, sm: 8, md: 6 },
        minHeight: { xs: "auto", md: "88vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
      }}
    >
      <HeroBackgroundAnimation />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3, lg: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1.2fr" },
            gap: { xs: 5, sm: 6, lg: 4 },
            alignItems: "center",
          }}
        >
          {/* ============= LEFT COLUMN ============= */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>

            {/* Top badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.7,
                borderRadius: "8px",
                backgroundColor: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                boxShadow: "0 4px 16px rgba(168, 85, 247, 0.12)",
                mb: 3.5,
              }}
            >
              <BoltIcon sx={{ fontSize: 15, color: "#A855F7" }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem", letterSpacing: "0.02em" }}>
                Next-Gen AI Resume &amp; Job Matcher
              </Typography>
            </Box>

            {/* Main Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.1rem", sm: "3rem", md: "3.6rem", lg: "4rem" },
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                mb: 2.5,
                color: "text.primary",
                wordBreak: "break-word",
              }}
            >
              Match Your Resume
              <br />
              to Target Jobs in
              <br />
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Milliseconds.
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                color: "text.secondary",
                lineHeight: 1.65,
                mb: 4,
                maxWidth: 520,
                mx: { xs: "auto", lg: 0 },
              }}
            >
              Analyze your resume against any job description using vector embeddings.
              Beat ATS filters, bridge critical skill gaps, and triple your interview callbacks.
            </Typography>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                mb: 5.5,
                justifyContent: { xs: "center", lg: "flex-start" },
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <Button
                component={Link}
                href="/sign-up"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: { xs: 1.4, sm: 1.6 },
                  px: { xs: 2.5, sm: 3.25 },
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  fontWeight: 800,
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #8B3CF7 0%, #7C3AED 50%, #6D5EF7 100%)",
                  boxShadow: "0 8px 28px rgba(124, 58, 237, 0.45)",
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    background: "linear-gradient(135deg, #7C28E0 0%, #6D28D9 50%, #5B4CE6 100%)",
                    boxShadow: "0 14px 36px rgba(124, 58, 237, 0.65)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Analyze My Resume Free
              </Button>

              <Button
                onClick={() => {
                  const el = document.getElementById("demo");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  py: { xs: 1.4, sm: 1.6 },
                  px: { xs: 2.5, sm: 3 },
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  fontWeight: 700,
                  borderRadius: "9999px",
                  borderColor: "rgba(255, 255, 255, 0.18)",
                  color: "text.primary",
                  backgroundColor: "rgba(15, 23, 42, 0.45)",
                  backdropFilter: "blur(12px)",
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    borderColor: "#A855F7",
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Watch Interactive Demo
              </Button>
            </Stack>

            {/* Trust Metrics Row */}
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 3, md: 4 }}
              sx={{
                justifyContent: { xs: "center", lg: "flex-start" },
                flexWrap: "wrap",
                gap: { xs: 2, sm: 2.5, md: 0 },
                rowGap: { xs: 2, sm: 2.5 },
              }}
            >
              {/* Metric 1 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, textAlign: "left" }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: "rgba(168, 85, 247, 0.12)", border: "1px solid rgba(168, 85, 247, 0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A855F7", flexShrink: 0 }}>
                  <ShieldOutlinedIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "text.primary", fontSize: "0.9rem", lineHeight: 1.2 }}>99.4%</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem", display: "block", lineHeight: 1.3 }}>ATS Compatibility<br />Rate</Typography>
                </Box>
              </Box>

              {/* Metric 2 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, textAlign: "left" }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38BDF8", flexShrink: 0 }}>
                  <PsychologyOutlinedIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "text.primary", fontSize: "0.9rem", lineHeight: 1.2 }}>Real-Time</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem", display: "block", lineHeight: 1.3 }}>Semantic Vector<br />Matching</Typography>
                </Box>
              </Box>

              {/* Metric 3 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, textAlign: "left" }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: "rgba(168, 85, 247, 0.12)", border: "1px solid rgba(168, 85, 247, 0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A855F7", flexShrink: 0 }}>
                  <TrackChangesOutlinedIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "text.primary", fontSize: "0.9rem", lineHeight: 1.2 }}>Tailored</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem", display: "block", lineHeight: 1.3 }}>Resume<br />Rewrites</Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ============= RIGHT COLUMN: Pipeline Visual ============= */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { md: 580 },
            }}
          >
            <PipelineVisual />
          </Box>
        </Box>

        {/* Bottom Centered Badge */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 2,
              py: 0.9,
              borderRadius: "9999px",
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <BoltIcon sx={{ fontSize: 15, color: "#A855F7" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.82rem" }}>
              Engineered for Callback Conversion
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
