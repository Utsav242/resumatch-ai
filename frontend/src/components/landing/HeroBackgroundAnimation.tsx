"use client";

import React from "react";
import { Box, keyframes } from "@mui/material";
import { useTheme } from "@/context/ThemeProvider";

const pixelPulse = keyframes`
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.45; }
`;

const particleFloat = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  33% { transform: translateY(-8px) translateX(4px); opacity: 0.6; }
  66% { transform: translateY(4px) translateX(-3px); opacity: 0.2; }
`;

const gridPulse = keyframes`
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.12; }
`;

export function HeroBackgroundAnimation(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Coordinates of grid points/nodes to render a futuristic circuit/network background
  const networkNodes = [
    { x: "12%", y: "15%", delay: 0 },
    { x: "28%", y: "25%", delay: 0.5 },
    { x: "18%", y: "45%", delay: 1.2 },
    { x: "32%", y: "65%", delay: 0.8 },
    { x: "8%", y: "80%", delay: 0.3 },
    { x: "42%", y: "85%", delay: 1.5 },
    { x: "55%", y: "15%", delay: 0.9 },
    { x: "72%", y: "10%", delay: 0.2 },
    { x: "62%", y: "30%", delay: 1.1 },
    { x: "88%", y: "25%", delay: 0.4 },
    { x: "68%", y: "60%", delay: 0.7 },
    { x: "82%", y: "50%", delay: 1.3 },
    { x: "75%", y: "80%", delay: 0.6 },
    { x: "92%", y: "75%", delay: 1.0 },
  ];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: isDark ? "#060814" : "#F0F4FF",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Primary large purple ambient glow - right */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: "5%",
          width: { xs: 400, md: 700 },
          height: { xs: 400, md: 650 },
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(120, 40, 220, 0.22) 0%, rgba(90, 30, 180, 0.1) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(109, 94, 247, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Secondary cyan glow - bottom center */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: 300, md: 500 },
          height: { xs: 200, md: 300 },
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Futuristic digital grid overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: isDark ? 0.07 : 0.04,
          backgroundImage: isDark
            ? "linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px)"
            : "linear-gradient(rgba(109, 94, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(109, 94, 247, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: `${gridPulse} 6s ease-in-out infinite`,
        }}
      />

      {/* SVG Network circuit lines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: isDark ? 0.12 : 0.08 }}
      >
        <g stroke={isDark ? "rgba(168, 85, 247, 0.3)" : "rgba(109, 94, 247, 0.2)"} strokeWidth="1" fill="none">
          {/* Faint network lines connecting nodes */}
          <line x1="12%" y1="15%" x2="28%" y2="25%" />
          <line x1="28%" y1="25%" x2="18%" y2="45%" />
          <line x1="18%" y1="45%" x2="32%" y2="65%" />
          <line x1="32%" y1="65%" x2="8%" y2="80%" />
          <line x1="32%" y1="65%" x2="42%" y2="85%" />
          
          <line x1="55%" y1="15%" x2="72%" y2="10%" />
          <line x1="72%" y1="10%" x2="62%" y2="30%" />
          <line x1="62%" y1="30%" x2="88%" y2="25%" />
          <line x1="62%" y1="30%" x2="68%" y2="60%" />
          <line x1="68%" y1="60%" x2="82%" y2="50%" />
          <line x1="68%" y1="60%" x2="75%" y2="80%" />
          <line x1="75%" y1="80%" x2="92%" y2="75%" />
        </g>
      </svg>

      {/* Glowing network nodes */}
      {networkNodes.map((node, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: node.x,
            top: node.y,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: isDark
              ? i % 2 === 0 ? "#A855F7" : "#22D3EE"
              : i % 2 === 0 ? "#6D5EF7" : "#3B82F6",
            boxShadow: isDark
              ? i % 2 === 0 ? "0 0 8px #A855F7" : "0 0 8px #22D3EE"
              : "none",
            animation: `${pixelPulse} ${3 + (i % 3)}s ease-in-out infinite ${node.delay}s`,
          }}
        />
      ))}

      {/* Floating particle dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            width: 3,
            height: 3,
            borderRadius: "50%",
            backgroundColor: isDark
              ? i % 2 === 0 ? "rgba(168, 85, 247, 0.7)" : "rgba(34, 211, 238, 0.7)"
              : i % 2 === 0 ? "rgba(109, 94, 247, 0.5)" : "rgba(59, 130, 246, 0.5)",
            boxShadow: isDark
              ? i % 2 === 0 ? "0 0 10px rgba(168, 85, 247, 0.9)" : "0 0 10px rgba(34, 211, 238, 0.9)"
              : "none",
            animation: `${particleFloat} ${5 + i * 0.8}s ease-in-out infinite ${i * 0.3}s`,
          }}
        />
      ))}
      {/* Local override for prefers-reduced-motion to gracefully pause animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: reduce) {
          div, svg {
            animation-delay: 0s !important;
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0s !important;
          }
        }
      `}} />
    </Box>
  );
}
