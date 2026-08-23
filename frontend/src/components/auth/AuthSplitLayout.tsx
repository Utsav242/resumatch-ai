"use client";

import React from "react";
import NextLink from "next/link";
import { Box, Typography, keyframes } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { AuthCard } from "@/components/auth/AuthCard";

export interface AuthSplitLayoutProps {
  mode: "sign-in" | "sign-up";
}

export const AUTH_FEATURES = [
  "ATS score in under 60 seconds",
  "Skill gap analysis with evidence",
  "AI rewrite suggestions per bullet",
  "Interview questions from the job post",
];

// Keyframes
const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulseBeat = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 24px rgba(168, 85, 247, 0.7), 0 0 48px rgba(109, 94, 247, 0.3), inset 0 0 12px rgba(255,255,255,0.2);
    border-color: rgba(168, 85, 247, 0.8);
  }
  50% {
    box-shadow: 0 0 40px rgba(168, 85, 247, 1), 0 0 80px rgba(109, 94, 247, 0.5), inset 0 0 20px rgba(255,255,255,0.4);
    border-color: rgba(34, 211, 238, 0.9);
  }
`;

const gridFade = keyframes`
  0% { opacity: 0.04; }
  50% { opacity: 0.09; }
  100% { opacity: 0.04; }
`;

const particleDrift = keyframes`
  0% { transform: translate(0px, 0px); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.4; }
  100% { transform: translate(30px, -60px); opacity: 0; }
`;

// Mini AI Pipeline Card component
function PipelineMiniCard({
  icon,
  title,
  subtitle,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  delay: string;
}) {
  return (
    <Box
      sx={{
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${color}44`,
        borderRadius: "12px",
        p: 1.75,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        animation: `${floatY} 4s ease-in-out infinite ${delay}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 16px ${color}18`,
        minWidth: 180,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "8px",
          backgroundColor: `${color}20`,
          border: `1px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 800,
            color: "#E8EAF2",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.68rem",
            color: "#6B7A99",
            fontFamily: "monospace",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export function AuthSplitLayout({ mode }: AuthSplitLayoutProps): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ============================================================
          LEFT COLUMN: Premium dark AI-themed hero panel
          Hidden on mobile (xs, sm, md) — shown from lg upward
      ============================================================ */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          flex: "0 0 52%",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, #060B18 0%, #0D1428 40%, #0B1020 70%, #070D1C 100%)",
          p: { lg: 6, xl: 8 },
        }}
      >
        {/* Animated grid background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(109, 94, 247, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(109, 94, 247, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: `${gridFade} 6s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />

        {/* Radial gradient glow orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "25%",
            width: 320,
            height: 320,
            background: "radial-gradient(circle, rgba(109, 94, 247, 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 260,
            height: 260,
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Drifting particles */}
        {[
          { top: "20%", left: "15%", delay: "0s", dur: "8s" },
          { top: "40%", left: "60%", delay: "2s", dur: "10s" },
          { top: "65%", left: "30%", delay: "4s", dur: "9s" },
          { top: "80%", left: "70%", delay: "1s", dur: "11s" },
        ].map((p, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: p.top,
              left: p.left,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "rgba(168, 85, 247, 0.8)" : "rgba(34, 211, 238, 0.8)",
              animation: `${particleDrift} ${p.dur} ease-in-out infinite ${p.delay}`,
              boxShadow: i % 2 === 0
                ? "0 0 8px rgba(168, 85, 247, 0.8)"
                : "0 0 8px rgba(34, 211, 238, 0.8)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Logo */}
        <Box
          component={NextLink}
          href="/"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(109, 94, 247, 0.45)",
            }}
          >
            <BoltIcon fontSize="small" />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, color: "#E8EAF2", letterSpacing: "-0.01em" }}
          >
            Resum<Box component="span" sx={{ color: "#A855F7" }}>iq</Box>
          </Typography>
        </Box>

        {/* Center content: headline, pipeline visual, features */}
        <Box sx={{ position: "relative", zIndex: 2, my: "auto", pt: 4, pb: 2 }}>
          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { lg: "2.75rem", xl: "3.25rem" },
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#E8EAF2",
              mb: 1.5,
            }}
          >
            Every match
            <br />
            explained,{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #A855F7 0%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              line by line.
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#6B7A99", fontSize: "1rem", mb: 5, lineHeight: 1.6 }}
          >
            Vector intelligence that bridges the gap between your resume and your dream job.
          </Typography>

          {/* Mini AI Pipeline Visual */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              mb: 5,
              position: "relative",
            }}
          >
            {/* Resume Card */}
            <PipelineMiniCard
              icon={<InsertDriveFileOutlinedIcon sx={{ fontSize: 18 }} />}
              title="RESUME.PDF"
              subtitle="Software Engineer • 4yr exp"
              color="#A855F7"
              delay="0s"
            />

            {/* Connector Line Resume → AI */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <svg width="2" height="32" viewBox="0 0 2 32">
                <line
                  x1="1" y1="0" x2="1" y2="32"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle r="2" fill="#A855F7">
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 1 0 L 1 32" />
                </circle>
              </svg>
            </Box>

            {/* AI Engine Node */}
            <Box
              sx={{
                width: 68,
                height: 68,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #A855F7 0%, #6D5EF7 50%, #3B82F6 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.25)",
                animation: `${glowPulse} 3s ease-in-out infinite`,
                position: "relative",
                cursor: "default",
              }}
            >
              <Typography sx={{ fontWeight: 900, color: "#FFFFFF", fontSize: "1.4rem", lineHeight: 1 }}>
                AI
              </Typography>
              {/* Corner decorations */}
              <Box sx={{ position: "absolute", top: 5, left: 5, width: 7, height: 7, borderTop: "1.5px solid rgba(255,255,255,0.5)", borderLeft: "1.5px solid rgba(255,255,255,0.5)" }} />
              <Box sx={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderTop: "1.5px solid rgba(255,255,255,0.5)", borderRight: "1.5px solid rgba(255,255,255,0.5)" }} />
              <Box sx={{ position: "absolute", bottom: 5, left: 5, width: 7, height: 7, borderBottom: "1.5px solid rgba(255,255,255,0.5)", borderLeft: "1.5px solid rgba(255,255,255,0.5)" }} />
              <Box sx={{ position: "absolute", bottom: 5, right: 5, width: 7, height: 7, borderBottom: "1.5px solid rgba(255,255,255,0.5)", borderRight: "1.5px solid rgba(255,255,255,0.5)" }} />
            </Box>
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 800,
                color: "#22D3EE",
                letterSpacing: "0.12em",
                fontFamily: "monospace",
                animation: `${pulseBeat} 2s ease-in-out infinite`,
                mt: 0.75,
                mb: 0,
              }}
            >
              ANALYZING...
            </Typography>

            {/* Connector Line AI → Job */}
            <svg width="2" height="32" viewBox="0 0 2 32">
              <line
                x1="1" y1="0" x2="1" y2="32"
                stroke="rgba(34, 211, 238, 0.5)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle r="2" fill="#22D3EE">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 1 0 L 1 32" />
              </circle>
            </svg>

            {/* Job Description Card */}
            <PipelineMiniCard
              icon={<WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
              title="JOB DESCRIPTION"
              subtitle="Sr. Frontend Engineer"
              color="#22D3EE"
              delay="0.6s"
            />

            {/* Score Badge */}
            <Box
              sx={{
                mt: 2,
                px: 2.5,
                py: 1,
                borderRadius: "99px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0.08) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.2)",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                  animation: `${pulseBeat} 2s ease-in-out infinite`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  color: "#10B981",
                  letterSpacing: "0.02em",
                }}
              >
                94% Match Score
              </Typography>
            </Box>
          </Box>

          {/* Feature Checklist */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {AUTH_FEATURES.map((feature, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  animation: `${floatY} ${4 + idx * 0.5}s ease-in-out infinite ${idx * 0.3}s`,
                }}
              >
                <CheckCircleIcon
                  sx={{ fontSize: 18, color: "#10B981", flexShrink: 0 }}
                />
                <Typography
                  sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#B8C4D8", lineHeight: 1.4 }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer trust note */}
        <Typography
          variant="caption"
          sx={{
            color: "#3D4D6A",
            fontFamily: "monospace",
            textAlign: "left",
            position: "relative",
            zIndex: 2,
            fontSize: "0.72rem",
          }}
        >
          Demo experience • no credit card • your files stay in your browser
        </Typography>
      </Box>

      {/* ============================================================
          RIGHT COLUMN: Auth Card
          Full width on mobile, 48% on desktop
      ============================================================ */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 4, md: 5, lg: 6 },
          backgroundColor: "background.default",
          position: "relative",
          minHeight: { xs: "100vh", lg: "auto" },
        }}
      >
        {/* Mobile-only logo */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            alignItems: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(109, 94, 247, 0.35)",
              }}
            >
              <BoltIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>
              Resum<Box component="span" sx={{ color: "primary.main" }}>iq</Box>
            </Typography>
          </Box>
        </Box>

        <AuthCard mode={mode} />

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 3,
            color: "text.secondary",
            textAlign: "center",
            fontSize: "0.75rem",
          }}
        >
          © {new Date().getFullYear()} Resumiq · Built for job seekers who mean business
        </Typography>
      </Box>
    </Box>
  );
}
