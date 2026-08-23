"use client";

import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
  Chip,
  Card,
  LinearProgress,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useReveal } from "@/hooks/useReveal";

export function LivePreview(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  const skillsMatch = [
    { name: "Python / PyTorch", match: 96 },
    { name: "Vector Databases (Pinecone/Qdrant)", match: 92 },
    { name: "LLM Fine-Tuning & RAG", match: 89 },
    { name: "Microservices Architecture", match: 84 },
  ];

  const missingSkills = [
    "Kubernetes Operator Deployment",
    "Kafka Event Streaming",
    "GraphQL Subscriptions",
  ];

  return (
    <Box
      ref={sectionRef}
      id="demo"
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<AssessmentIcon sx={{ fontSize: 16, color: "primary.main" }} />}
            label="Live AI Match Dashboard Preview"
            sx={{
              mb: 2,
              py: 2,
              px: 1,
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 2,
              color: "text.primary",
            }}
          >
            See What Your Match Report Looks Like
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            Instant breakdown of ATS compatibility, keyword density, and bullet-by-bullet AI rewrites.
          </Typography>
        </Box>

        {/* Dashboard Shell Card */}
        <Paper
          elevation={6}
          sx={{
            maxWidth: 1040,
            mx: "auto",
            borderRadius: 6,
            overflow: "hidden",
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Top Window Bar */}
          <Box
            sx={{
              px: 3,
              py: 2,
              backgroundColor: "background.default",
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <Typography
                variant="caption"
                sx={{
                  ml: 1.5,
                  fontWeight: 700,
                  color: "text.secondary",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Resumiq Intelligence Workbench v2.4
              </Typography>
            </Box>

            <Chip
              label="Live Analysis Complete"
              color="success"
              size="small"
              sx={{ fontWeight: 700, fontSize: "0.75rem" }}
            />
          </Box>

          {/* Tab Navigation Controls */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 1 }}>
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="Match report navigation tabs"
            >
              <Tab icon={<AssessmentIcon />} iconPosition="start" label="Overall Match Score" />
              <Tab icon={<AutoAwesomeIcon />} iconPosition="start" label="AI Rewrites & Gaps" />
              <Tab icon={<WorkOutlinedIcon />} iconPosition="start" label="Target JD Breakdown" />
            </Tabs>
          </Box>

          {/* Tab Panel Content */}
          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            {activeTab === 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {/* Score Dial */}
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    backgroundColor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700 }}>
                    Overall Semantic Match
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "3rem", sm: "4.5rem" },
                      fontWeight: 900,
                      color: "primary.main",
                      my: 1,
                    }}
                  >
                    91%
                  </Typography>
                  <Chip
                    icon={<CheckCircleOutlinedIcon />}
                    label="High ATS Interview Probability"
                    color="success"
                    sx={{ fontWeight: 700 }}
                  />
                </Card>

                {/* Skills Match Progress Bars */}
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    Key Competency Alignment
                  </Typography>
                  {skillsMatch.map((skill, i) => (
                    <Box key={i} sx={{ mb: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                          fontSize: "0.875rem",
                          fontWeight: 700,
                        }}
                      >
                        <span>{skill.name}</span>
                        <span style={{ color: "#6D5EF7" }}>{skill.match}%</span>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.match}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "divider",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            background: "linear-gradient(90deg, #6D5EF7 0%, #8B5CF6 100%)",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  AI Suggested Bullet Rewrites
                </Typography>

                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    backgroundColor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700, display: "block", mb: 0.5 }}>
                    Original Resume Bullet:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    &ldquo;Built machine learning models to improve customer recommendation pipeline speeds.&rdquo;
                  </Typography>

                  <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700, display: "block", mb: 0.5 }}>
                    AI Optimized Rewrite (Matches Target JD):
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                    &ldquo;Engineered PyTorch vector search microservice handling 5M+ daily queries, improving recommendation pipeline throughput by 340% and lowering latency to &lt;45ms.&rdquo;
                  </Typography>
                </Card>

                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                  Missing Keywords to Add:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {missingSkills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={`+ ${skill}`}
                      variant="outlined"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Extracted Target Job Parameters
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                  <Card elevation={0} sx={{ p: 2.5, backgroundColor: "background.default", borderRadius: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <InsertDriveFileIcon color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Role: Senior AI Infrastructure Architect
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Location: Remote • Department: Core Machine Learning
                    </Typography>
                  </Card>
                  <Card elevation={0} sx={{ p: 2.5, backgroundColor: "background.default", borderRadius: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                      <WorkOutlinedIcon color="secondary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Core Stack: Python, PyTorch, Pinecone, FastAPI
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Seniority Requirement: 5+ Years Experience
                    </Typography>
                  </Card>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
