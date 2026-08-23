"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Tabs,
  Tab,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppNav } from "@/components/common/AppNav";

export default function UploadPage(): React.JSX.Element {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string } | null>({
    name: "Alex_Rivera_Senior_Architect_Resume.pdf",
    size: "1.4 MB",
    type: "application/pdf",
  });
  const [jobDescription, setJobDescription] = useState(
    "We are seeking a Staff AI Infrastructure Architect to lead vector RAG retrieval pipelines, fine-tune LLMs, design high-throughput FastAPI microservices, and optimize ATS keyword density..."
  );
  const [targetRole, setTargetRole] = useState("Staff AI Infrastructure Architect");
  const [targetCompany, setTargetCompany] = useState("Anthropic / OpenAI");

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const scanStages = [
    "Parsing PDF document structure & work history...",
    "Generating dense semantic vector embeddings (bge-small)...",
    "Running deterministic ATS keyword & layout audit...",
    "Finalizing RAG citations and LLM improvement recommendations...",
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type,
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type,
      });
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanStages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/report/sample");
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Header Title */}
        <Box sx={{ mb: 4, textAlign: "left" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}>
            Upload Resume & Target Job Description
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Our multi-format parser extracts your background, converts text into semantic vector embeddings, and benchmarks ATS compatibility.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Side: Resume Upload Dropzone */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
              <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  1. Candidate Resume
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                  Drag and drop your PDF or DOCX file (Max 10MB).
                </Typography>

                {!selectedFile ? (
                  <Box
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    sx={{
                      border: "2px dashed",
                      borderColor: "primary.main",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "action.hover",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "action.selected",
                      },
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      id="resume-file-input"
                      onChange={handleFileInput}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="resume-file-input" style={{ cursor: "pointer", width: "100%" }}>
                      <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Click or Drag File Here to Upload
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                        Supports PDF, DOCX, TXT formats
                      </Typography>
                    </label>
                  </Box>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "primary.main",
                      backgroundColor: "action.selected",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: "primary.main", color: "#FFF" }}>
                          <InsertDriveFileIcon />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            {selectedFile.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {selectedFile.size} • Verified Format
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton size="small" color="error" onClick={() => setSelectedFile(null)}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DescriptionIcon fontSize="small" />}
                        onClick={() => setShowPreviewModal(true)}
                        sx={{ borderRadius: 2 }}
                      >
                        Preview Parsed Sections
                      </Button>
                    </Box>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side: Target Job Description & Parameters */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  2. Target Job Parameters
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  Paste the target posting description to extract key requirements.
                </Typography>

                <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{ mb: 2 }}>
                  <Tab label="Paste Text" sx={{ fontWeight: 700 }} />
                  <Tab label="LinkedIn / URL Import" sx={{ fontWeight: 700 }} />
                </Tabs>

                {tabIndex === 0 ? (
                  <Box>
                    <TextField
                      fullWidth
                      label="Target Role Title"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Job Description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job posting here..."
                    />
                  </Box>
                ) : (
                  <Box sx={{ py: 2 }}>
                    <TextField fullWidth label="Job Posting URL" placeholder="https://www.linkedin.com/jobs/view/..." size="small" sx={{ mb: 2 }} />
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      Resumiq will automatically scrape and extract target skills from supported job portals.
                    </Alert>
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={startScan}
                  disabled={isScanning || !selectedFile || !jobDescription}
                  startIcon={<AutoAwesomeIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                    boxShadow: "0 4px 16px rgba(109, 94, 247, 0.3)",
                  }}
                >
                  {isScanning ? "Executing Resumiq Neural Scan..." : "Analyze ATS & Match Score"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Scan Progress Bar */}
        {isScanning && (
          <Paper elevation={0} sx={{ p: 4, mt: 4, borderRadius: 3, border: "1px solid", borderColor: "primary.main", backgroundColor: "action.selected" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                {scanStages[scanStep]}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
                {((scanStep + 1) / scanStages.length) * 100}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={((scanStep + 1) / scanStages.length) * 100}
              sx={{ height: 10, borderRadius: 5, backgroundColor: "action.hover" }}
            />
          </Paper>
        )}

        {/* Parse Preview Modal */}
        <Dialog open={showPreviewModal} onClose={() => setShowPreviewModal(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Parsed Section Breakdown
            <IconButton size="small" onClick={() => setShowPreviewModal(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box>
                <Chip label="Summary" size="small" color="primary" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Staff AI Architect with 8+ years leading production LLM deployments, RAG retrieval pipelines, and distributed vector stores...
                </Typography>
              </Box>

              <Box>
                <Chip label="Technical Skills" size="small" color="secondary" sx={{ fontWeight: 700, mb: 1 }} />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {["Python", "PyTorch", "FastAPI", "PostgreSQL", "RAG", "FAISS", "LangChain", "Kubernetes", "TypeScript"].map((sk, idx) => (
                    <Chip key={idx} label={sk} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  ))}
                </Box>
              </Box>

              <Box>
                <Chip label="Experience (Extracted)" size="small" color="info" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Lead AI Architect — TechScale Inc (2022 - Present)
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  • Architected real-time RAG pipeline handling 12M vector search requests daily with 45ms latencies.
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setShowPreviewModal(false)} variant="contained" sx={{ borderRadius: 2 }}>
              Close Preview
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
