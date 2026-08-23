"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import QuizIcon from "@mui/icons-material/Quiz";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HistoryIcon from "@mui/icons-material/History";
import { AppNav } from "@/components/common/AppNav";

export default function DashboardPage(): React.JSX.Element {
  const { user, isLoaded } = useUser();

  const [recentAnalyses] = useState([
    {
      id: "scan_101",
      role: "Staff AI Infrastructure Architect",
      company: "Anthropic",
      matchScore: 94,
      status: "High Match",
      date: "2 hours ago",
    },
    {
      id: "scan_102",
      role: "Senior Full Stack Engineer",
      company: "Vercel",
      matchScore: 88,
      status: "Good Match",
      date: "1 day ago",
    },
    {
      id: "scan_103",
      role: "Lead Machine Learning Engineer",
      company: "OpenAI",
      matchScore: 76,
      status: "Gaps Found",
      date: "3 days ago",
    },
  ]);

  if (!isLoaded) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Loading candidate dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
              Welcome back, {user?.firstName || "Candidate"} 👋
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Your Resumiq Intelligence Workbench is ready. Match resumes to target roles in seconds.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/dashboard/upload"
            variant="contained"
            size="large"
            startIcon={<CloudUploadIcon />}
            sx={{
              borderRadius: 2.5,
              fontWeight: 700,
              px: 3,
              py: 1.2,
              background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
              boxShadow: "0 4px 16px rgba(109, 94, 247, 0.3)",
            }}
          >
            Start New AI Scan
          </Button>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                  Total Scans
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5 }}>
                  14
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: "success.main" }} />
                  <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700 }}>
                    +3 this week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                  Avg ATS Match
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5, color: "primary.main" }}>
                  91%
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Top 5% candidate pool
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                  Keywords Added
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5 }}>
                  42
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Across 6 target JDs
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                  Estimated Callback Lift
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5, color: "success.main" }}>
                  3.2x
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Based on keyword density
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Launch Tools */}
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Resumiq AI Suite Launchpad
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={Link}
              href="/editor/sample"
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(109, 94, 247, 0.15)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ p: 1.5, width: 44, height: 44, borderRadius: 2, backgroundColor: "action.hover", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "primary.main" }}>
                  <EditNoteIcon />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  AI Diff Rewriter
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  Side-by-side bullet point optimization with live PDF preview.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={Link}
              href="/report/sample"
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(109, 94, 247, 0.15)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ p: 1.5, width: 44, height: 44, borderRadius: 2, backgroundColor: "action.hover", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "secondary.main" }}>
                  <AssessmentIcon />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  ATS Match Report
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  Detailed 0-100% score dial, skill gaps, & citation map.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={Link}
              href="/interview-prep"
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(109, 94, 247, 0.15)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ p: 1.5, width: 44, height: 44, borderRadius: 2, backgroundColor: "action.hover", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "success.main" }}>
                  <QuizIcon />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Interview Studio
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  AI-generated technical & STAR behavioral questions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              component={Link}
              href="/cover-letter"
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(109, 94, 247, 0.15)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ p: 1.5, width: 44, height: 44, borderRadius: 2, backgroundColor: "action.hover", display: "flex", alignItems: "center", justifyContent: "center", mb: 2, color: "warning.main" }}>
                  <EmailIcon />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Cover Letter Writer
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  Tailored multi-tone cover letters matched to job parameters.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Analyses Table */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Recent Resume Match Scans
          </Typography>
          <Button component={Link} href="/history" endIcon={<ArrowForwardIcon />} size="small" sx={{ fontWeight: 700 }}>
            View Full History
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "divider",
            backgroundColor: "transparent",
            overflow: "hidden",
            boxShadow: "none",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "action.hover" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Target Role & Company
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Match Score
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Date Scanned
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentAnalyses.map((scan) => (
                <TableRow
                  key={scan.id}
                  sx={{
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                      {scan.role}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {scan.company}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: scan.matchScore >= 90 ? "success.main" : "warning.main" }}>
                      {scan.matchScore}%
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Chip
                      label={scan.status}
                      size="small"
                      color={scan.matchScore >= 90 ? "success" : "warning"}
                      variant="outlined"
                      sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                    />
                  </TableCell>

                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                      {scan.date}
                    </Typography>
                  </TableCell>

                  <TableCell align="right" sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        component={Link}
                        href={`/report/${scan.id}`}
                        size="small"
                        variant="outlined"
                        startIcon={<AssessmentIcon fontSize="small" />}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                      >
                        Report
                      </Button>
                      <Button
                        component={Link}
                        href={`/editor/${scan.id}`}
                        size="small"
                        variant="contained"
                        startIcon={<EditNoteIcon fontSize="small" />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                        }}
                      >
                        Optimize
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
