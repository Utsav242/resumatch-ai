"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  LinearProgress,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { AppNav } from "@/components/common/AppNav";

export default function CareerRoadmapPage(): React.JSX.Element {
  const skillGaps = [
    { skill: "Vector Database Clustering (Pinecone/Milvus)", current: 70, target: 95, status: "High Priority" },
    { skill: "Distributed Model Training (DeEPSpeed/FSDP)", current: 65, target: 90, status: "Medium Priority" },
    { skill: "LLM Guardrails & Observability (LangSmith)", current: 80, target: 95, status: "High Priority" },
    { skill: "FastAPI Concurrency Tuning", current: 95, target: 95, status: "Mastered" },
  ];

  const quarterlyMilestones = [
    { quarter: "Q3 2026", title: "Master Vector Indexing & Sharding", desc: "Deploy distributed vector search benchmarks using Milvus and Pinecone." },
    { quarter: "Q4 2026", title: "LLM Observability Certification", desc: "Integrate LangSmith tracing across production RAG applications." },
    { quarter: "Q1 2027", title: "Principal AI Architect Promotion Target", desc: "Lead enterprise foundation model fine-tuning initiatives." },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip icon={<MapIcon />} label="CAREER INTELLIGENCE" color="primary" sx={{ fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            Skill-Gap & Career Roadmap Studio
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Benchmark your technical skills against Senior, Staff, and Principal AI Architect market standards.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Target Role Skill Gap Analysis
                </Typography>
                <Stack spacing={2.5}>
                  {skillGaps.map((item, idx) => (
                    <Box key={idx}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {item.skill}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: item.current >= 90 ? "success.main" : "primary.main" }}>
                          {item.current}% / {item.target}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.current}
                        sx={{ height: 8, borderRadius: 4, backgroundColor: "action.hover" }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Quarterly Career Milestones
                </Typography>
                <Stack spacing={2}>
                  {quarterlyMilestones.map((m, idx) => (
                    <Paper key={idx} elevation={0} sx={{ p: 2, borderRadius: 2.5, backgroundColor: "action.hover", borderLeft: "4px solid #6D5EF7" }}>
                      <Chip label={m.quarter} size="small" color="primary" sx={{ fontWeight: 800, mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                        {m.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {m.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
