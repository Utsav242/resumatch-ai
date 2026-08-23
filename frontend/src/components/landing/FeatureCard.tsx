"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CpuIcon from "@mui/icons-material/Memory";
import TargetIcon from "@mui/icons-material/TrackChanges";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import FileCheckIcon from "@mui/icons-material/FactCheck";
import ZapIcon from "@mui/icons-material/Bolt";
import ShieldCheckIcon from "@mui/icons-material/VerifiedUser";
import { FeatureItem } from "@/components/landing/data/features";

export interface FeatureCardProps {
  feature: FeatureItem;
}

const ICON_MAP = {
  Cpu: CpuIcon,
  Target: TargetIcon,
  Sparkles: SparklesIcon,
  FileCheck: FileCheckIcon,
  Zap: ZapIcon,
  ShieldCheck: ShieldCheckIcon,
};

export function FeatureCard({ feature }: FeatureCardProps): React.JSX.Element {
  const IconComponent = ICON_MAP[feature.iconName] || CpuIcon;

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
        borderRadius: 5,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "primary.main",
          boxShadow: "0 16px 32px rgba(109, 94, 247, 0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, textAlign: "left" }}>
        {/* Top Header: Icon & Optional Badge */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              backgroundColor: "rgba(109, 94, 247, 0.1)",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent sx={{ fontSize: 24 }} />
          </Box>
          {feature.badge && (
            <Chip
              label={feature.badge}
              size="small"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                backgroundColor: "rgba(139, 92, 246, 0.12)",
                color: "secondary.main",
                border: "1px solid",
                borderColor: "rgba(139, 92, 246, 0.2)",
              }}
            />
          )}
        </Box>

        {/* Feature Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 800, mb: 1.5, color: "text.primary" }}
        >
          {feature.title}
        </Typography>

        {/* Feature Description */}
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, mb: 3 }}>
          {feature.description}
        </Typography>
      </CardContent>

      {/* Card Footer Link */}
      <Box
        sx={{
          px: 4,
          pb: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "primary.main",
          fontWeight: 700,
          fontSize: "0.875rem",
          cursor: "pointer",
          "&:hover": {
            color: "secondary.main",
          },
        }}
      >
        <span>Learn how it works</span>
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </Box>
    </Card>
  );
}
