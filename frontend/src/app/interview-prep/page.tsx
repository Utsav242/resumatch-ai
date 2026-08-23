"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AppNav } from "@/components/common/AppNav";

export default function InterviewPrepPage(): React.JSX.Element {
  const [questions] = useState([
    {
      id: "q-1",
      category: "Technical Architecture",
      question: "How do you optimize dense vector retrieval latency in a high-throughput RAG pipeline?",
      starAnswer: {
        situation: "At TechScale Inc, vector search latencies spiked above 250ms when database volume exceeded 10 million vectors.",
        task: "Lower P99 latency below 50ms while maintaining retrieval recall accuracy.",
        action: "Implemented FAISS HNSW indexing paired with bge-small quantization and Redis caching layer.",
        result: "Reduced P99 latency to 45ms and handled 12M daily search requests smoothly.",
      },
    },
    {
      id: "q-2",
      category: "System Design",
      question: "How do you handle database failover and async worker queues during high traffic spikes?",
      starAnswer: {
        situation: "FastAPI backend services experienced connection pool exhaustion during peak candidate scan events.",
        task: "Implement async connection pooling and distributed task queue management.",
        action: "Configured SQLAlchemy 2.0 asyncpg connection pools and introduced Redis Celery task queues.",
        result: "Eliminated connection bottlenecks and achieved 99.9% uptime during peak loads.",
      },
    },
  ]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip label="PRO FEATURE" color="secondary" sx={{ fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            AI Interview Prep Studio
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Tailored technical & behavioral interview questions generated directly from your resume and target Job Description.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {questions.map((q) => (
            <Grid size={{ xs: 12 }} key={q.id}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Chip label={q.category} color="primary" size="small" sx={{ fontWeight: 700 }} />
                    <Chip icon={<AutoAwesomeIcon />} label="Resumiq STAR Answer Ready" color="success" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                    "{q.question}"
                  </Typography>

                  <Accordion sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", "&:before": { display: "none" } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                        View AI STAR Method Talking Points (Situation, Task, Action, Result)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={1.5}>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", display: "block" }}>
                            SITUATION:
                          </Typography>
                          <Typography variant="body2">{q.starAnswer.situation}</Typography>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: "secondary.main", display: "block" }}>
                            TASK:
                          </Typography>
                          <Typography variant="body2">{q.starAnswer.task}</Typography>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: "info.main", display: "block" }}>
                            ACTION:
                          </Typography>
                          <Typography variant="body2">{q.starAnswer.action}</Typography>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: "success.main", display: "block" }}>
                            RESULT:
                          </Typography>
                          <Typography variant="body2">{q.starAnswer.result}</Typography>
                        </Paper>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
