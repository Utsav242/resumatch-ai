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
  Tabs,
  Tab,
  Divider,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppNav } from "@/components/common/AppNav";

export default function ReportPage(): React.JSX.Element {
  const params = useParams();
  const reportId = params?.id || "scan_101";

  const [tabValue, setTabValue] = useState(0);

  const matchedKeywords = [
    { name: "Vector Embeddings", category: "Hard Skill", relevance: "Critical" },
    { name: "FastAPI", category: "Framework", relevance: "Critical" },
    { name: "PostgreSQL", category: "Database", relevance: "High" },
    { name: "PyTorch", category: "AI / ML", relevance: "High" },
    { name: "RAG Retrieval", category: "Architecture", relevance: "Critical" },
  ];

  const missingKeywords = [
    { name: "Pinecone / Milvus", category: "Vector Store", Impact: "+4% Match" },
    { name: "LangSmith / Tracing", category: "Observability", Impact: "+3% Match" },
    { name: "CUDA Optimization", category: "Performance", Impact: "+2% Match" },
    { name: "Kubeflow", category: "MLOps", Impact: "+2% Match" },
  ];

  const atsAuditList = [
    { system: "Workday ATS", status: "Compatible", score: "98/100", note: "Clean single-column structure parsed flawlessly." },
    { system: "Greenhouse", status: "Compatible", score: "96/100", note: "Standard section headers detected." },
    { system: "Lever", status: "Compatible", score: "95/100", note: "Contact details and LinkedIn URL verified." },
    { system: "Taleo", status: "Compatible", score: "92/100", note: "Font family (Inter/Arial) fully supported." },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Top Breadcrumb & Action Bar */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Button component={Link} href="/dashboard" startIcon={<ArrowBackIcon />} size="small" sx={{ fontWeight: 700 }}>
            Back to Dashboard
          </Button>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<ShareIcon />} size="small" sx={{ borderRadius: 2 }}>
              Share Report
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />} size="small" sx={{ borderRadius: 2 }}>
              Export PDF
            </Button>
            <Button
              component={Link}
              href={`/editor/${reportId}`}
              variant="contained"
              startIcon={<EditNoteIcon />}
              size="small"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
              }}
            >
              Open AI Diff Editor
            </Button>
          </Box>
        </Box>

        {/* Hero Score Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(109, 94, 247, 0.12) 0%, rgba(139, 92, 246, 0.05) 100%)",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            {/* Main Score Dial */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    border: "8px solid",
                    borderColor: "primary.main",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 24px rgba(109, 94, 247, 0.3)",
                  }}
                >
                  <Typography variant="h2" sx={{ fontWeight: 900, color: "primary.main", lineHeight: 1 }}>
                    94%
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mt: 0.5 }}>
                    MATCH SCORE
                  </Typography>
                </Box>
              </Box>

              <Chip label="Strong Candidate Match" color="success" sx={{ mt: 2, fontWeight: 800, px: 1 }} />
            </Grid>

            {/* Target Role Parameters & Sub-scores */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                Staff AI Infrastructure Architect
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Target Company: Anthropic • Scanned on August 5, 2026 • Verified against 14 ATS Standards
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      Formatting
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "success.main" }}>
                      98%
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      Keyword Density
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                      91%
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      Hard Skills
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "success.main" }}>
                      95%
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      Leadership Scope
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "warning.main" }}>
                      88%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Detailed Tabs Breakdown */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab label="Keyword & Skill Gaps" sx={{ fontWeight: 700 }} />
            <Tab label="ATS Compatibility Audit" sx={{ fontWeight: 700 }} />
            <Tab label="Strengths & Weaknesses" sx={{ fontWeight: 700 }} />
            <Tab label="RAG Citations & Rules" sx={{ fontWeight: 700 }} />
          </Tabs>
        </Box>

        {/* Tab 0: Keyword Gaps */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "success.main", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon /> Matched Keywords ({matchedKeywords.length})
                  </Typography>
                  <Stack spacing={1.5}>
                    {matchedKeywords.map((kw, idx) => (
                      <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: 2, backgroundColor: "action.hover", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {kw.name}
                        </Typography>
                        <Chip label={kw.category} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "warning.main", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <WarningIcon /> Missing Target Keywords ({missingKeywords.length})
                  </Typography>
                  <Stack spacing={1.5}>
                    {missingKeywords.map((kw, idx) => (
                      <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: 2, backgroundColor: "action.selected", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {kw.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {kw.category}
                          </Typography>
                        </Box>
                        <Chip label={kw.Impact} size="small" color="primary" sx={{ fontWeight: 700 }} />
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tab 1: ATS Audit */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            {atsAuditList.map((ats, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 32, mt: 0.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {ats.system}
                      </Typography>
                      <Chip label={`Compatibility: ${ats.score}`} size="small" color="success" sx={{ my: 1, fontWeight: 700 }} />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {ats.note}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Tab 2: Strengths & Weaknesses */}
        {tabValue === 2 && (
          <Stack spacing={2}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "success.main", backgroundColor: "action.hover" }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "success.main", mb: 1 }}>
                🎯 Top Strengths
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                • High metric density in experience bullets (e.g. "45ms latency", "12M vector search requests").
                <br />
                • Strong alignment with Senior/Staff level architecture terminology.
              </Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "warning.main", backgroundColor: "action.selected" }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "warning.main", mb: 1 }}>
                💡 Key Recommendations
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                • Add explicit mention of observability tooling (LangSmith / Tracing) to boost ATS score by +3%.
                <br />
                • Enhance project summary section with target company keywords ("Foundation Model Scaling").
              </Typography>
            </Paper>
          </Stack>
        )}

        {/* Tab 3: RAG Citations */}
        {tabValue === 3 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Knowledge Base Citations & Rule Mapping
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "action.hover" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Rule #ATS-204: Single-Column Layout Protocol
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Source: Enterprise Recruiting Standard 2026 • Verified 100% compliant.
                </Typography>
              </Box>

              <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "action.hover" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                  Rule #RAG-118: Dense Vector Keyword Weighting
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Source: bge-small Embedding Similarity Benchmark • Similarity score: 0.942.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
