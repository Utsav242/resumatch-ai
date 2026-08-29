"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ResumeData } from "@/types";
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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppNav } from "@/components/common/AppNav";
import { ApiService } from "@/services/api";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export default function UploadPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const reuploadId = searchParams.get("reupload");
  
  // Resume states
  const [resumeFileDetails, setResumeFileDetails] = useState<{ name: string; size: string; type: string } | null>(null);
  const [parsedResumeData, setParsedResumeData] = useState<ResumeData | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Job Description states
  const [pastedJobDescription, setPastedJobDescription] = useState("");
  const [jdError, setJdError] = useState<string | null>(null);

  // General Job Details
  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");

  // Scan states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Fetch specific resume for re-upload if query param is set
  const { data: reuploadResume } = useQuery<ResumeData | null>({
    queryKey: ["reupload-resume", reuploadId],
    queryFn: async () => {
      if (!reuploadId) return null;
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.fetchResumeById(token, reuploadId);
    },
    enabled: !!reuploadId,
  });

  useEffect(() => {
    if (reuploadResume) {
      setParsedResumeData(reuploadResume);
      setResumeFileDetails({
        name: reuploadResume.file_metadata.filename,
        size: formatBytes(reuploadResume.file_metadata.file_size),
        type: reuploadResume.file_metadata.content_type,
      });
      setTargetRole(reuploadResume.target_role || "");
      setTargetCompany(reuploadResume.target_company || "");
      setPastedJobDescription(reuploadResume.job_description_text || "");
    }
  }, [reuploadResume]);

  const scanStages = [
    "Parsing PDF document structure & work history...",
    "Generating dense semantic vector embeddings (bge-small)...",
    "Running deterministic ATS keyword & layout audit...",
    "Finalizing RAG citations and LLM improvement recommendations...",
  ];

  // Helper to format file size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Helper for Clerk Auth API execution
  const executeWithAuth = async <T,>(apiCall: (token: string) => Promise<T>): Promise<T> => {
    const token = await getToken();
    if (!token) {
      throw new Error("User session expired. Please sign in again.");
    }
    return apiCall(token);
  };


  // ==========================================
  // RESUME UPLOAD HANDLERS
  // ==========================================
  const handleResumeFile = async (file: File) => {
    setResumeError(null);
    
    // Validate File Size (10MB)
    if (file.size > MAX_FILE_SIZE) {
      setResumeError("Resume file exceeds 10MB limit.");
      return;
    }

    // Validate File Type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    const isAllowedExt = extension === "pdf" || extension === "docx";

    if (!allowedTypes.includes(file.type) && !isAllowedExt) {
      setResumeError("Unsupported format. Only PDF and DOCX files are allowed.");
      return;
    }

    // Call API
    setResumeUploading(true);
    try {
      const parsedResume = await executeWithAuth((token) => ApiService.uploadResume(token, file));
      setParsedResumeData(parsedResume);
      setResumeFileDetails({
        name: file.name,
        size: formatBytes(file.size),
        type: file.type || (extension === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      });
      queryClient.invalidateQueries({ queryKey: ["active-resume"] });
      queryClient.invalidateQueries({ queryKey: ["resumes-list"] });
    } catch (err: unknown) {

      const errorMsg = err instanceof Error ? err.message : "Failed to upload and parse resume.";
      setResumeError(errorMsg);
      setParsedResumeData(null);
      setResumeFileDetails(null);
    } finally {
      setResumeUploading(false);
    }
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleResumeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleResumeFile(e.target.files[0]);
    }
  };

  const handleResumeReset = () => {
    setResumeFileDetails(null);
    setParsedResumeData(null);
    setResumeError(null);
  };

  // ==========================================
  // ==========================================
  // SCAN ORCHESTRATION
  // ==========================================
  const startScan = async () => {
    if (!parsedResumeData || !pastedJobDescription.trim()) return;

    setJdError(null);
    setResumeError(null);
    setIsScanning(true);
    setScanStep(0);

    try {
      // Validate & normalize pasted Job Description with the backend and create scan record
      await executeWithAuth((token) =>
        ApiService.pasteJobDescription(token, {
          text: pastedJobDescription,
          target_role: targetRole || undefined,
          target_company: targetCompany || undefined,
          resume_id: parsedResumeData.id,
        })
      );

      // Invalidate queries so that dashboard/history show the updated scan immediately
      await queryClient.invalidateQueries({ queryKey: ["active-resume"] });
      await queryClient.invalidateQueries({ queryKey: ["resumes-list"] });

      // Run visual scanner animation stages
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
    } catch (err: unknown) {
      setIsScanning(false);
      const errorMsg = err instanceof Error ? err.message : "Failed to submit job description.";
      setJdError(errorMsg);
    }
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

                {resumeError && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {resumeError}
                  </Alert>
                )}

                {resumeUploading ? (
                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: "primary.main",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "action.hover",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <CircularProgress size={40} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Parsing resume text & sections...
                    </Typography>
                  </Box>
                ) : !resumeFileDetails ? (
                  <Box
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleResumeDrop}
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
                      accept=".pdf,.docx"
                      id="resume-file-input"
                      onChange={handleResumeFileInput}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="resume-file-input" style={{ cursor: "pointer", width: "100%" }}>
                      <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Click or Drag File Here to Upload
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                        Supports PDF and DOCX formats
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
                        <Box sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            {resumeFileDetails.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {resumeFileDetails.size} • Verified Format
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton size="small" color="error" onClick={handleResumeReset}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {parsedResumeData && (
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
                    )}
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
                  Paste or upload the target posting description to extract key requirements.
                </Typography>

                {jdError && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {jdError}
                  </Alert>
                )}

                <Box sx={{ mt: 1 }}>
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
                    rows={6}
                    label="Job Description"
                    value={pastedJobDescription}
                    onChange={(e) => setPastedJobDescription(e.target.value)}
                    placeholder="Paste the full job posting here..."
                  />
                </Box>


                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={startScan}
                  disabled={
                    isScanning ||
                    !parsedResumeData ||
                    !pastedJobDescription.trim()
                  }
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
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {parsedResumeData?.structured_sections?.summary || "No summary section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Experience" size="small" color="info" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {parsedResumeData?.structured_sections?.experience || "No work experience section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Education" size="small" color="warning" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {parsedResumeData?.structured_sections?.education || "No education section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Technical Skills" size="small" color="secondary" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {parsedResumeData?.structured_sections?.skills || "No skills section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Certifications" size="small" color="success" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {parsedResumeData?.structured_sections?.certifications || "No certifications section detected."}
                </Typography>
              </Box>

              {parsedResumeData?.structured_sections?.other && (
                <Box>
                  <Chip label="Other Content" size="small" color="default" sx={{ fontWeight: 700, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                    {parsedResumeData.structured_sections.other}
                  </Typography>
                </Box>
              )}
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
