"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Stack,
  LinearProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { AppNav } from "@/components/common/AppNav";

export default function BillingPage(): React.JSX.Element {
  const plans = [
    {
      name: "Starter Free",
      price: "$0",
      period: "forever",
      description: "Essential ATS resume matching for active job seekers.",
      features: ["5 Resume Scans / Month", "Basic ATS Keyword Check", "Standard PDF Export"],
      buttonText: "Current Plan",
      isCurrent: false,
    },
    {
      name: "Pro Candidate",
      price: "$19",
      period: "per month",
      description: "Complete AI vector matching suite to maximize interview callbacks.",
      features: [
        "Unlimited Resume Scans",
        "AI Diff Bullet Rewriter",
        "RAG Citation Audit & Rule Mapping",
        "Interview Prep & Cover Letter AI",
        "LinkedIn Profile Optimizer",
      ],
      buttonText: "Upgrade to Pro",
      isCurrent: true,
      popular: true,
    },
    {
      name: "Executive & Recruiter",
      price: "$49",
      period: "per month",
      description: "For senior leaders, career coaches, and HR recruiting teams.",
      features: [
        "Everything in Pro",
        "Batch Candidate Resume Upload",
        "Recruiter Leaderboard & Matrix",
        "Priority Vector Processing",
        "Dedicated Account Manager",
      ],
      buttonText: "Get Executive",
      isCurrent: false,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Chip icon={<CreditCardIcon />} label="PLANS & BILLING" color="primary" sx={{ fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            Flexible Plans for Every Career Stage
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Upgrade anytime to unlock unlimited AI vector scans, bullet rewriters, and interview prep studios.
          </Typography>
        </Box>

        {/* Usage Meter Banner */}
        <Paper elevation={0} sx={{ p: 3, mb: 5, borderRadius: 3, border: "1px solid", borderColor: "primary.main", backgroundColor: "action.selected" }}>
          <Grid container spacing={3} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                Monthly Active Scan Usage (Pro Plan)
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                You have used 14 of your 50 high-priority neural vector scans this billing period.
              </Typography>
              <LinearProgress variant="determinate" value={28} sx={{ height: 10, borderRadius: 5, backgroundColor: "action.hover" }} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Chip label="28% Quota Used" color="success" sx={{ fontWeight: 800 }} />
            </Grid>
          </Grid>
        </Paper>

        {/* Pricing Cards */}
        <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
          {plans.map((plan, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: plan.popular ? "primary.main" : "divider",
                  position: "relative",
                  boxShadow: plan.popular ? "0 8px 30px rgba(109, 94, 247, 0.2)" : "none",
                }}
              >
                {plan.popular && (
                  <Chip
                    icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                    label="MOST POPULAR"
                    color="primary"
                    size="small"
                    sx={{ position: "absolute", top: -14, right: 24, fontWeight: 900, px: 1 }}
                  />
                )}
                <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                    {plan.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary" }}>
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      / {plan.period}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant={plan.popular ? "contained" : "outlined"}
                    size="large"
                    sx={{
                      borderRadius: 2.5,
                      fontWeight: 800,
                      mb: 4,
                      py: 1.2,
                      background: plan.popular ? "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)" : "transparent",
                    }}
                  >
                    {plan.buttonText}
                  </Button>

                  <Stack spacing={1.5} sx={{ mt: "auto" }}>
                    {plan.features.map((feat, fIdx) => (
                      <Box key={fIdx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <CheckIcon color="primary" fontSize="small" />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
