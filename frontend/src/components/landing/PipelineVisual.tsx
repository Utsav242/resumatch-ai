"use client";

import React from "react";
import { Box, Typography, Card, Chip, keyframes } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useTheme } from "@/context/ThemeProvider";

export interface PipelineVisualProps {
  matchScore?: number;
  resumeFileName?: string;
  jobTitle?: string;
}

// Keyframe Animations
const aiGlowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.85), 0 0 60px rgba(139, 92, 246, 0.45), inset 0 0 15px rgba(255, 255, 255, 0.35);
    border-color: rgba(168, 85, 247, 0.85);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 50px rgba(168, 85, 247, 1), 0 0 90px rgba(139, 92, 246, 0.65), inset 0 0 25px rgba(255, 255, 255, 0.55);
    border-color: rgba(34, 211, 238, 0.95);
    transform: scale(1.02);
  }
`;

const pulseBeam = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
`;

const tagFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

export function PipelineVisual({
  matchScore = 94,
  resumeFileName = "RESUME.PDF",
  jobTitle = "Senior Frontend Engineer",
}: PipelineVisualProps): React.JSX.Element {
  let isDark = true;
  try {
    const themeContext = useTheme();
    isDark = themeContext.theme === "dark";
  } catch {
    isDark = true;
  }

  const circleRadius = 28;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (matchScore / 100) * circumference;

  // Colors & Theme Styling
  const cardBg = isDark ? "rgba(8, 12, 28, 0.88)" : "rgba(255, 255, 255, 0.96)";
  const cardBorder = isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(109, 94, 247, 0.2)";
  const textPrimary = isDark ? "#FFFFFF" : "#111827";
  const textSecondary = isDark ? "#8B95B0" : "#6B7280";
  const labelColor = isDark ? "#8B95B0" : "#4B5563";
  const neonPurple = isDark ? "#A855F7" : "#6D5EF7";
  const neonCyan = isDark ? "#22D3EE" : "#3B82F6";

  // Coordinates optimized for wide 880px layout
  const floatingTags = [
    { label: "React", color: neonCyan, top: "65px", left: "340px", delay: "0s", dur: "3.5s" },
    { label: "Python", color: neonPurple, top: "110px", left: "365px", delay: "0.8s", dur: "4s" },
    { label: "TypeScript", color: neonCyan, top: "155px", left: "385px", delay: "1.5s", dur: "3.8s" },
    { label: "RAG", color: neonPurple, top: "210px", left: "295px", delay: "0.5s", dur: "4.2s" },
    { label: "LLM", color: neonCyan, top: "255px", left: "295px", delay: "1.2s", dur: "3.6s" },
    { label: "AWS", color: neonPurple, top: "300px", left: "290px", delay: "2s", dur: "4.5s" },
  ];

  return (
    <Box
    >
    <Box
      aria-label="Resumiq AI Matching Interactive Diagram"
      sx={{
        position: "relative",
        width: { xs: "100%", md: 880 },
        height: { xs: "auto", md: 540 },
        mx: "auto",
      }}
    >
      {/* Background Radial Purple Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "40%",
          width: 450,
          height: 450,
          background: isDark
            ? "radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(34, 211, 238, 0.06) 55%, transparent 75%)"
            : "radial-gradient(circle, rgba(109, 94, 247, 0.12) 0%, rgba(59, 130, 246, 0.03) 55%, transparent 75%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ============= DESKTOP LAYOUT (>= md) ============= */}
      <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", inset: 0 }}>
        {/* SVG Stream Lines & Flow Connections */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 880 540"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="flowGradUpper" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="flowGradLower" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
            </linearGradient>
            <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Curved streams from Resume (right edge x=230) to AI Chip (left edge x=390) */}
          <g stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" strokeDasharray="3 4">
            <path d="M 230 120 C 275 85, 335 125, 390 190" fill="none" />
            <path d="M 230 160 C 275 145, 335 160, 390 205" fill="none" />
            <path d="M 230 200 C 275 205, 335 185, 390 220" fill="none" />
            <path d="M 230 240 C 275 250, 335 210, 390 235" fill="none" />
          </g>

          {/* Curved streams from Job Description (left edge x=640) to AI Chip (right edge x=490) */}
          <g stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" strokeDasharray="3 4">
            <path d="M 640 180 C 590 145, 530 160, 490 205" fill="none" />
            <path d="M 640 220 C 590 235, 530 210, 490 220" fill="none" />
          </g>

          {/* Flowing Pulse Particles along Stream (Resume -> AI) */}
          <circle r="3" fill="url(#flowGradUpper)" filter="url(#svgGlow)">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 230 120 C 275 85, 335 125, 390 190" />
          </circle>
          <circle r="3.5" fill="#38BDF8" filter="url(#svgGlow)">
            <animateMotion dur="6.5s" begin="1.5s" repeatCount="indefinite" path="M 230 160 C 275 145, 335 160, 390 205" />
          </circle>
          <circle r="3" fill="url(#flowGradLower)" filter="url(#svgGlow)">
            <animateMotion dur="5.5s" begin="2.8s" repeatCount="indefinite" path="M 230 200 C 275 205, 335 185, 390 220" />
          </circle>
          <circle r="2.5" fill="#A855F7" filter="url(#svgGlow)">
            <animateMotion dur="6s" begin="0.5s" repeatCount="indefinite" path="M 230 240 C 275 250, 335 210, 390 235" />
          </circle>

          {/* Flowing Pulse Particles along Stream (JD -> AI) */}
          <circle r="3" fill="url(#flowGradUpper)" filter="url(#svgGlow)">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 640 180 C 590 145, 530 160, 490 205" />
          </circle>
          <circle r="3.5" fill="#38BDF8" filter="url(#svgGlow)">
            <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M 640 220 C 590 235, 530 210, 490 220" />
          </circle>

          {/* Vertical Beam from AI Chip to MATCH SCORE Card */}
          <line x1="440" y1="262" x2="440" y2="330" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle r="3" fill="#38BDF8" filter="url(#svgGlow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 440 262 L 440 330" />
          </circle>

          {/* Dashed red connecting line from MATCH SCORE to MISSING SKILLS Card */}
          <line x1="590" y1="435" x2="640" y2="435" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="640" cy="435" r="3" fill="#EF4444" />
        </svg>

        {/* Local override for prefers-reduced-motion to gracefully pause animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (prefers-reduced-motion: reduce) {
            circle, line, path, div, svg {
              animation-delay: 0s !important;
              animation-duration: 0s !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0s !important;
            }
          }
        `}} />

        {/* Floating Skill Tags */}
        {floatingTags.map((tag) => (
          <Box
            key={tag.label}
            sx={{
              position: "absolute",
              top: tag.top,
              left: tag.left,
              zIndex: 4,
              px: 1.25,
              py: 0.35,
              borderRadius: 99,
              backgroundColor: isDark ? "rgba(8, 14, 35, 0.85)" : "rgba(255, 255, 255, 0.92)",
              border: `1px solid ${tag.color}44`,
              color: isDark ? "#E2E8F0" : "#1E293B",
              fontSize: "0.68rem",
              fontWeight: 700,
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              boxShadow: isDark
                ? `0 4px 14px rgba(0,0,0,0.65), 0 0 10px ${tag.color}25`
                : "0 2px 8px rgba(0,0,0,0.08)",
              animation: `${tagFloat} ${tag.dur} ease-in-out infinite ${tag.delay}`,
              whiteSpace: "nowrap",
            }}
          >
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: tag.color, boxShadow: `0 0 6px ${tag.color}` }} />
            {tag.label}
          </Box>
        ))}

        {/* ============= RESUME CARD (top-left) ============= */}
        <Card
          elevation={10}
          sx={{
            position: "absolute",
            top: "40px",
            left: "10px",
            width: "220px",
            height: "330px",
            p: 2.25,
            borderRadius: "12px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.65), 0 0 20px rgba(168, 85, 247, 0.15)"
              : "0 20px 50px rgba(0,0,0,0.08)",
            zIndex: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.75 }}>
            <InsertDriveFileOutlinedIcon sx={{ fontSize: 18, color: neonPurple }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, color: textPrimary, letterSpacing: "0.06em", fontFamily: "monospace", fontSize: "0.75rem" }}
            >
              {resumeFileName}
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 950, color: textPrimary, fontSize: "0.95rem", mb: 0.25 }}>
            Software Engineer
          </Typography>
          <Typography variant="caption" sx={{ color: textSecondary, display: "block", mb: 2, fontSize: "0.75rem" }}>
            4+ Years Experience
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: 800, color: labelColor, display: "block", mb: 1, fontSize: "0.7rem", letterSpacing: "0.04em" }}>
            Skills
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, alignItems: "flex-start" }}>
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
              <Box
                key={skill}
                sx={{
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "6px",
                  backgroundColor: isDark ? "rgba(17, 24, 39, 0.85)" : "rgba(243, 244, 246, 0.95)",
                  border: `1px solid ${isDark ? "rgba(168, 85, 247, 0.25)" : "rgba(209, 213, 219, 0.8)"}`,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: textPrimary,
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(109, 94, 247, 0.12)",
              border: `1px solid ${isDark ? "rgba(168, 85, 247, 0.45)" : "rgba(109, 94, 247, 0.3)"}`,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.6rem", fontWeight: 900, color: neonPurple, fontFamily: "monospace" }}>
              PDF
            </Typography>
          </Box>
        </Card>

        {/* ============= CENTRAL AI CHIP ============= */}
        <Box
          sx={{
            position: "absolute",
            top: "155px",
            left: "390px",
            width: "100px",
            height: "100px",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #A855F7 0%, #6D5EF7 50%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.35)",
              animation: `${aiGlowPulse} 3s ease-in-out infinite`,
              position: "relative",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 950, color: "#FFFFFF", letterSpacing: "-0.02em", fontSize: "2rem" }}>
              AI
            </Typography>
            {/* Corner highlights */}
            <Box sx={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: "1.5px solid rgba(255,255,255,0.6)", borderLeft: "1.5px solid rgba(255,255,255,0.6)" }} />
            <Box sx={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: "1.5px solid rgba(255,255,255,0.6)", borderRight: "1.5px solid rgba(255,255,255,0.6)" }} />
            <Box sx={{ position: "absolute", bottom: 6, left: 6, width: 8, height: 8, borderBottom: "1.5px solid rgba(255,255,255,0.6)", borderLeft: "1.5px solid rgba(255,255,255,0.6)" }} />
            <Box sx={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, borderBottom: "1.5px solid rgba(255,255,255,0.6)", borderRight: "1.5px solid rgba(255,255,255,0.6)" }} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              fontWeight: 800,
              color: neonCyan,
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              fontFamily: "monospace",
              animation: `${pulseBeam} 2s ease-in-out infinite`,
            }}
          >
            ANALYZING...
          </Typography>
        </Box>

        {/* ============= JOB DESCRIPTION CARD (top-right) ============= */}
        <Card
          elevation={10}
          sx={{
            position: "absolute",
            top: "80px",
            left: "640px",
            width: "220px",
            height: "290px",
            p: 2.25,
            borderRadius: "12px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.65), 0 0 20px rgba(56, 189, 248, 0.12)"
              : "0 20px 50px rgba(0,0,0,0.08)",
            zIndex: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.75 }}>
            <WorkOutlineOutlinedIcon sx={{ fontSize: 18, color: neonCyan }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, color: textPrimary, letterSpacing: "0.06em", fontFamily: "monospace", fontSize: "0.75rem" }}
            >
              JOB DESCRIPTION
            </Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 950, color: textPrimary, fontSize: "0.95rem", mb: 1.75 }}>
            {jobTitle}
          </Typography>

          <Typography variant="caption" sx={{ fontWeight: 800, color: labelColor, display: "block", mb: 1, fontSize: "0.7rem" }}>
            Key Requirements
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
            {["React", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs", "AWS"].map((req) => (
              <Box key={req} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: neonPurple, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: textSecondary, fontSize: "0.75rem" }}>
                  {req}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: isDark ? "rgba(34, 211, 238, 0.18)" : "rgba(59, 130, 246, 0.12)",
              border: `1px solid ${isDark ? "rgba(34, 211, 238, 0.4)" : "rgba(59, 130, 246, 0.3)"}`,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.6rem", fontWeight: 900, color: neonCyan, fontFamily: "monospace" }}>
              JD
            </Typography>
          </Box>
        </Card>

        {/* ============= MATCH SCORE CARD (bottom-center) ============= */}
        <Card
          elevation={12}
          sx={{
            position: "absolute",
            top: "330px",
            left: "290px",
            width: "300px",
            height: "200px",
            p: 2.5,
            borderRadius: "14px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 24px 60px rgba(0,0,0,0.75), 0 0 30px rgba(168, 85, 247, 0.2)"
              : "0 24px 60px rgba(0,0,0,0.1)",
            zIndex: 5,
            overflow: "visible", // Fix bottom badge clipping issue
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: labelColor, letterSpacing: "0.1em", fontFamily: "monospace", display: "block", mb: 1.5, fontSize: "0.72rem" }}
          >
            MATCH SCORE
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 1.5 }}>
            {/* Circular Gauge */}
            <Box sx={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle
                  cx="36"
                  cy="36"
                  r={circleRadius}
                  fill="none"
                  stroke={isDark ? "rgba(168, 85, 247, 0.18)" : "rgba(109, 94, 247, 0.1)"}
                  strokeWidth="5.5"
                />
                <circle
                  cx="36"
                  cy="36"
                  r={circleRadius}
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    transition: "stroke-dashoffset 1.5s ease-out",
                    filter: `drop-shadow(0 0 6px ${neonCyan})`,
                  }}
                />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography variant="body2" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontWeight: 950, color: textPrimary, fontSize: "1.05rem" }}>
                {matchScore}%
              </Typography>
            </Box>

            <Box sx={{ textAlign: "left" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 950, color: textPrimary, fontSize: "1.1rem", lineHeight: 1.15 }}>
                Excellent Match
              </Typography>
              <Chip
                label="Strong Match"
                size="small"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10B981",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                }}
              />
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`, pt: 1, mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
              <Typography variant="caption" sx={{ color: textSecondary, fontSize: "0.72rem" }}>Skills Matched</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: textPrimary, fontSize: "0.72rem" }}>18/20</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" sx={{ color: textSecondary, fontSize: "0.72rem" }}>Missing Skills</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#EF4444", fontSize: "0.72rem" }}>3</Typography>
            </Box>
          </Box>

          {/* AI Suggestion Ready Pill */}
          <Box
            sx={{
              position: "absolute",
              bottom: -16,
              left: "50%",
              transform: "translateX(-50%)",
              px: 2,
              py: 0.5,
              borderRadius: 99,
              backgroundColor: isDark ? "rgba(6, 10, 25, 0.95)" : "#FFFFFF",
              border: "1px solid rgba(16, 185, 129, 0.45)",
              color: "#10B981",
              fontSize: "0.7rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.55), 0 0 10px rgba(16,185,129,0.25)"
                : "0 4px 12px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
              zIndex: 6,
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px #10B981" }} />
            AI Suggestion Ready
          </Box>
        </Card>

        {/* ============= CARD: 3 MISSING SKILLS (bottom-right) ============= */}
        <Card
          elevation={8}
          sx={{
            position: "absolute",
            top: "385px",
            left: "640px",
            width: "220px",
            height: "145px",
            p: 2,
            borderRadius: "12px",
            backgroundColor: isDark ? "rgba(30, 8, 8, 0.88)" : "rgba(255, 250, 250, 0.95)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 16px 40px rgba(0,0,0,0.65), 0 0 20px rgba(239, 68, 68, 0.15)"
              : "0 16px 40px rgba(0,0,0,0.08)",
            zIndex: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <WarningAmberOutlinedIcon sx={{ fontSize: 16, color: "#EF4444" }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#EF4444", fontSize: "0.75rem" }}>
              3 Missing Skills
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
            {["GraphQL", "Docker", "CI/CD"].map((skill) => (
              <Box key={skill} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box sx={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#EF4444", flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: textSecondary, fontSize: "0.75rem" }}>
                  {skill}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      {/* ============= MOBILE LAYOUT (< md) ============= */}
      <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 3, pt: 2, px: 1 }}>
        {/* Resume Card - mobile */}
        <Card
          elevation={8}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <InsertDriveFileOutlinedIcon sx={{ fontSize: 16, color: neonPurple }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: textPrimary, letterSpacing: "0.05em", fontFamily: "monospace", fontSize: "0.7rem" }}>
              {resumeFileName}
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 950, color: textPrimary, mb: 0.25 }}>Software Engineer</Typography>
          <Typography variant="caption" sx={{ color: textSecondary, display: "block", mb: 1.5 }}>4+ Years Experience</Typography>
          <Typography variant="caption" sx={{ color: labelColor, display: "block", mb: 1, fontWeight: 800 }}>Skills</Typography>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.9)",
                  color: textPrimary,
                  border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)"}`,
                }}
              />
            ))}
          </Box>
        </Card>

        {/* AI Chip - mobile */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, my: 1 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #A855F7 0%, #6D5EF7 50%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: `${aiGlowPulse} 3s ease-in-out infinite`,
              border: "2px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 950, color: "#FFFFFF" }}>AI</Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: neonCyan, letterSpacing: "0.1em", fontFamily: "monospace", animation: `${pulseBeam} 2s ease-in-out infinite` }}>
            ANALYZING...
          </Typography>
        </Box>

        {/* Job Description Card - mobile */}
        <Card
          elevation={8}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <WorkOutlineOutlinedIcon sx={{ fontSize: 16, color: neonCyan }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: textPrimary, letterSpacing: "0.05em", fontFamily: "monospace", fontSize: "0.7rem" }}>
              JOB DESCRIPTION
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 950, color: textPrimary, mb: 1.5 }}>{jobTitle}</Typography>
          <Typography variant="caption" sx={{ color: labelColor, display: "block", mb: 1, fontWeight: 800 }}>Key Requirements</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {["React", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs", "AWS"].map((req) => (
              <Chip
                key={req}
                label={req}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.9)",
                  color: textPrimary,
                  border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)"}`,
                }}
              />
            ))}
          </Box>
        </Card>

        {/* Match Score Card - mobile */}
        <Card
          elevation={8}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: "blur(20px)",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: labelColor, letterSpacing: "0.08em", fontFamily: "monospace", display: "block", mb: 1.5 }}>MATCH SCORE</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
            <Box sx={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r={circleRadius} fill="none" stroke={isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(109, 94, 247, 0.12)"} strokeWidth="4" />
                <circle cx="32" cy="32" r={circleRadius} fill="none" stroke={neonCyan} strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeOffset} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", filter: `drop-shadow(0 0 6px ${neonCyan})` }} />
              </svg>
              <Typography variant="body2" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontWeight: 950, color: textPrimary, fontSize: "0.95rem" }}>{matchScore}%</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 950, color: textPrimary, fontSize: "1.05rem" }}>Excellent Match</Typography>
              <Chip label="Strong Match" size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 800, backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.3)" }} />
            </Box>
          </Box>
        </Card>

        {/* Missing Skills Card - mobile */}
        <Card
          elevation={8}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: isDark ? "rgba(30, 8, 8, 0.88)" : "rgba(255, 250, 250, 0.95)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.5 }}>
            <WarningAmberOutlinedIcon sx={{ fontSize: 16, color: "#EF4444" }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#EF4444", fontSize: "0.72rem" }}>3 Missing Skills</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {["GraphQL", "Docker", "CI/CD"].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  color: "#EF4444",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                }}
              />
            ))}
          </Box>
        </Card>
      </Box>
      </Box>
    </Box>
  );
}
