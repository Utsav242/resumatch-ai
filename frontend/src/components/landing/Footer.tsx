"use client";

import React from "react";
import NextLink from "next/link";
import { Container, Box, Typography, Link, Divider, IconButton } from "@mui/material";
import ZapIcon from "@mui/icons-material/Bolt";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Resume ATS Matcher", href: "#features" },
      { label: "AI Bullet Rewriter", href: "#features" },
      { label: "Skill Gap Analysis", href: "#features" },
      { label: "Interactive Demo", href: "#demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "ATS Optimization Guide", href: "#" },
      { label: "Resume Templates", href: "#" },
      { label: "Interview Prep Kit", href: "#" },
      { label: "FAQ & Help Center", href: "#faq" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security & Encryption", href: "#" },
      { label: "Cookie Preferences", href: "#" },
    ],
  },
];

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        pt: { xs: 8, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "4fr repeat(3, 2fr)" },
            gap: 5,
            mb: 8,
          }}
        >
          {/* Brand Info */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
              >
                <ZapIcon fontSize="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Resum<Box component="span" sx={{ color: "primary.main" }}>iq</Box>
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, mb: 3, maxWidth: 320, textAlign: "left" }}>
              Next-generation resume analysis platform leveraging vector similarity embeddings and LLMs to double ATS callback rates.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton aria-label="GitHub" color="inherit" size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit" size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit" size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Navigation Links */}
          {FOOTER_COLUMNS.map((section, idx) => (
            <Box key={idx}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.primary", textAlign: "left" }}>
                {section.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, textAlign: "left" }}>
                {section.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    component={NextLink}
                    href={link.href}
                    underline="hover"
                    sx={{ color: "text.secondary", fontSize: "0.875rem", "&:hover": { color: "primary.main" } }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © {currentYear} Resumiq Inc. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Built with React 19, Next.js 16, Material UI (MUI), & Clerk
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
