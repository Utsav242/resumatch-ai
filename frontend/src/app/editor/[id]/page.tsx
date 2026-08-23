"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AppNav } from "@/components/common/AppNav";

export default function EditorPage(): React.JSX.Element {
  const params = useParams();

  const [currentScore, setCurrentScore] = useState(91);
  const [acceptedCount, setAcceptedCount] = useState(0);

  const [suggestions, setSuggestions] = useState([
    {
      id: "s-1",
      section: "Work Experience — TechScale Inc.",
      original: "Built vector search for application handling high throughput.",
      rewritten:
        "Architected real-time RAG retrieval pipeline using FAISS and bge-small vector embeddings, scaling search to 12M daily requests with 45ms P99 latencies.",
      impact: "+4% ATS Score",
      addedKeywords: ["FAISS", "bge-small", "P99 Latencies"],
      status: "pending", // 'pending' | 'accepted' | 'rejected'
    },
    {
      id: "s-2",
      section: "Work Experience — CloudTech Solutions",
      original: "Maintained Python backend services and SQL database queries.",
      rewritten:
        "Engineered high-concurrency FastAPI microservices connected to PostgreSQL, optimizing SQL queries to reduce DB CPU load by 35%.",
      impact: "+3% ATS Score",
      addedKeywords: ["FastAPI", "PostgreSQL", "Concurrency"],
      status: "pending",
    },
    {
      id: "s-3",
      section: "Professional Summary",
      original: "Experienced software engineer specializing in AI and cloud systems.",
      rewritten:
        "Staff AI Infrastructure Architect with 8+ years leading production LLM deployments, vector RAG pipelines, and enterprise cloud microservices.",
      impact: "+3% ATS Score",
      addedKeywords: ["Staff AI Architect", "LLM Deployments"],
      status: "pending",
    },
  ]);

  const handleAccept = (id: string, impactScore: number) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "accepted" } : s))
    );
    setCurrentScore((prev) => Math.min(100, prev + impactScore));
    setAcceptedCount((prev) => prev + 1);
  };

  const handleReject = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" } : s))
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Top Bar */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button component={Link} href="/dashboard" startIcon={<ArrowBackIcon />} size="small" sx={{ fontWeight: 700 }}>
              Dashboard
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              AI Resume Diff Editor & Optimizer
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Paper elevation={0} sx={{ px: 2, py: 0.75, borderRadius: 2, border: "1px solid", borderColor: "primary.main", backgroundColor: "action.selected" }}>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                Live ATS Match Score:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "primary.main", display: "inline", ml: 1 }}>
                {currentScore}%
              </Typography>
            </Paper>

            <Button variant="outlined" startIcon={<DownloadIcon />} size="small" sx={{ borderRadius: 2 }}>
              Export PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              size="small"
              sx={{ borderRadius: 2, fontWeight: 700, background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)" }}
            >
              Re-Scan Document
            </Button>
          </Box>
        </Box>

        {/* Split Workbench Grid */}
        <Grid container spacing={3}>
          {/* Left Panel: AI Bullet Optimizer (Diff View) */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                AI Recommendations ({suggestions.filter((s) => s.status === "pending").length} Pending)
              </Typography>
              <Chip label={`${acceptedCount} Accepted`} color="success" size="small" sx={{ fontWeight: 700 }} />
            </Box>

            <Stack spacing={2.5}>
              {suggestions.map((sug) => (
                <Card
                  key={sug.id}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: sug.status === "accepted" ? "success.main" : sug.status === "rejected" ? "divider" : "primary.main",
                    opacity: sug.status === "rejected" ? 0.6 : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", textTransform: "uppercase" }}>
                        {sug.section}
                      </Typography>
                      <Chip label={sug.impact} color="primary" size="small" sx={{ fontWeight: 700 }} />
                    </Box>

                    {/* Diff View Comparison */}
                    <Paper elevation={0} sx={{ p: 2, mb: 1.5, borderRadius: 2, backgroundColor: "action.hover", borderLeft: "4px solid #EF4444" }}>
                      <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700, display: "block", mb: 0.5 }}>
                        ORIGINAL BULLET:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {sug.original}
                      </Typography>
                    </Paper>

                    <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "action.selected", borderLeft: "4px solid #10B981" }}>
                      <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700, display: "block", mb: 0.5 }}>
                        RESUMIQ AI REWRITTEN BULLET:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                        {sug.rewritten}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                        {sug.addedKeywords.map((kw, idx) => (
                          <Chip key={idx} label={`+ ${kw}`} size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700 }} />
                        ))}
                      </Box>
                    </Paper>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      {sug.status === "pending" ? (
                        <>
                          <Button size="small" color="error" variant="outlined" startIcon={<CloseIcon />} onClick={() => handleReject(sug.id)} sx={{ borderRadius: 2 }}>
                            Reject
                          </Button>
                          <Button size="small" color="success" variant="contained" startIcon={<CheckIcon />} onClick={() => handleAccept(sug.id, parseInt(sug.impact))} sx={{ borderRadius: 2, fontWeight: 700 }}>
                            Accept Rewrite
                          </Button>
                        </>
                      ) : (
                        <Chip
                          label={sug.status === "accepted" ? "Applied to Resume" : "Rejected"}
                          color={sug.status === "accepted" ? "success" : "default"}
                          sx={{ fontWeight: 700 }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Right Panel: Live Document Preview */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "#FFFFFF",
                color: "#111827",
                minHeight: 600,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 900, textAlign: "center", mb: 0.5, color: "#111827" }}>
                ALEX RIVERA
              </Typography>
              <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#4B5563", mb: 3 }}>
                alex.rivera@email.com • linkedin.com/in/alexrivera • San Francisco, CA
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#6D5EF7", textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>
                PROFESSIONAL SUMMARY
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151", mb: 3, lineHeight: 1.6 }}>
                Staff AI Infrastructure Architect with 8+ years leading production LLM deployments, vector RAG pipelines, and enterprise cloud microservices.
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#6D5EF7", textTransform: "uppercase", letterSpacing: "0.05em", mb: 1 }}>
                WORK EXPERIENCE
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                Lead AI Architect — TechScale Inc. (2022 - Present)
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151", mb: 2, lineHeight: 1.6 }}>
                • Architected real-time RAG retrieval pipeline using FAISS and bge-small vector embeddings, scaling search to 12M daily requests with 45ms P99 latencies.
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                Senior Systems Engineer — CloudTech Solutions (2019 - 2022)
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.6 }}>
                • Engineered high-concurrency FastAPI microservices connected to PostgreSQL, optimizing SQL queries to reduce DB CPU load by 35%.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
