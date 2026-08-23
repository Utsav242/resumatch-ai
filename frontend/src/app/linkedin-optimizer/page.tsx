"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Stack,
  Snackbar,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AppNav } from "@/components/common/AppNav";

export default function LinkedInOptimizerPage(): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const headline = "Staff AI Architect | Ex-TechScale | Scaling RAG & Vector Search (12M+ Daily Queries) | LLMs • PyTorch • FastAPI";
  const aboutText = `I am a Staff AI Infrastructure Architect specializing in production vector retrieval systems, LLM fine-tuning, and high-concurrency microservices. Recognized for building FAISS-based RAG engines processing 12M+ daily requests with P99 latencies under 45ms.\n\nKey Expertise: Vector Embeddings (bge-small), FastAPI, PostgreSQL, PyTorch, Kubernetes, MLOps.`;

  const recommendedSkills = [
    "Vector Embeddings (FAISS / Milvus)",
    "Retrieval-Augmented Generation (RAG)",
    "FastAPI & Microservices Architecture",
    "Large Language Models (LLMs)",
    "PyTorch & Deep Learning Infrastructure",
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip icon={<LinkedInIcon />} label="LINKEDIN SYNC READY" color="primary" sx={{ fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            LinkedIn Profile AI Optimizer
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Optimize your headline, About section, and featured skills to rank at the top of recruiter searches on LinkedIn.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    High-Converting Headline
                  </Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => handleCopy(headline)}>
                    Copy Headline
                  </Button>
                </Box>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, backgroundColor: "action.hover", borderLeft: "4px solid #06B6D4" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                    {headline}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Top Recommended Skills to Add
                </Typography>
                <Stack spacing={1}>
                  {recommendedSkills.map((sk, idx) => (
                    <Paper key={idx} elevation={0} sx={{ p: 1.5, borderRadius: 2, backgroundColor: "action.hover", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {sk}
                      </Typography>
                      <Chip label="High Recruiter Intent" color="success" size="small" sx={{ fontWeight: 700 }} />
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Optimized LinkedIn About Section
                  </Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => handleCopy(aboutText)}>
                    Copy Text
                  </Button>
                </Box>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, backgroundColor: "action.selected", whiteSpace: "pre-line", lineHeight: 1.7 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                    {aboutText}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)} message="Copied to clipboard!" />
      </Container>
    </Box>
  );
}
