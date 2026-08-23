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
  TextField,
  Chip,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { AppNav } from "@/components/common/AppNav";

export default function CoverLetterPage(): React.JSX.Element {
  const [tone, setTone] = useState("Executive");
  const [company, setCompany] = useState("Anthropic");
  const [role, setRole] = useState("Staff AI Infrastructure Architect");
  const [copied, setCopied] = useState(false);

  const [generatedLetter, setGeneratedLetter] = useState(
    `Dear Hiring Manager at ${company},\n\nI am writing to express my strong interest in the ${role} position. With over 8 years of experience architecting distributed AI infrastructure and vector RAG retrieval pipelines, I have consistently scaled search performance while maintaining ultra-low latencies.\n\nIn my previous role at TechScale Inc., I led the implementation of FAISS vector embeddings and high-concurrency FastAPI microservices, scaling search to 12M daily queries with P99 latencies under 45ms.\n\nI admire ${company}'s commitment to AI safety and foundation model scaling, and I am excited about the opportunity to contribute to your engineering team.\n\nSincerely,\nAlex Rivera`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            AI Tailored Cover Letter Writer
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Generate high-converting cover letters perfectly aligned with target company culture and job requirements.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Cover Letter Parameters
                </Typography>

                <TextField
                  fullWidth
                  label="Target Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Target Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Tone of Voice</InputLabel>
                  <Select value={tone} label="Tone of Voice" onChange={(e) => setTone(e.target.value)}>
                    <MenuItem value="Executive">Executive & Authoritative</MenuItem>
                    <MenuItem value="Professional">Professional & Corporate</MenuItem>
                    <MenuItem value="Modern">Modern Tech Startup</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AutoAwesomeIcon />}
                  sx={{ borderRadius: 2.5, fontWeight: 800, py: 1.2, background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)" }}
                >
                  Generate AI Cover Letter
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider", backgroundColor: "#FFFFFF", color: "#111827" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Chip label={`Tone: ${tone}`} color="primary" size="small" sx={{ fontWeight: 700 }} />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
                    Copy Text
                  </Button>
                  <Button variant="contained" size="small" startIcon={<DownloadIcon />}>
                    Export PDF
                  </Button>
                </Box>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={14}
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#111827",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)} message="Cover letter copied to clipboard!" />
      </Container>
    </Box>
  );
}
