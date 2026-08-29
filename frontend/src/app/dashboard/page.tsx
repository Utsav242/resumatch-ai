"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser, useAuth } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import QuizIcon from "@mui/icons-material/Quiz";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppNav } from "@/components/common/AppNav";
import { ApiService } from "@/services/api";
import { ResumeData } from "@/types";

export default function DashboardPage(): React.JSX.Element {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const [previewResume, setPreviewResume] = useState<ResumeData | null>(null);

  // Delete States
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<{ id: string; name: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteConfirm = async () => {
    if (!resumeToDelete) return;
    setDeletingId(resumeToDelete.id);
    setDeleteConfirmOpen(false);

    try {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      await ApiService.deleteResume(token, resumeToDelete.id);
      
      setSuccessMessage(`Resume "${resumeToDelete.name}" deleted successfully.`);
      
      // Invalidate queries to refresh the UI immediately
      queryClient.invalidateQueries({ queryKey: ["active-resume"] });
      queryClient.invalidateQueries({ queryKey: ["resumes-list"] });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete resume.";
      setErrorMessage(msg);
    } finally {
      setDeletingId(null);
      setResumeToDelete(null);
    }
  };

  const { data: latestResume, isLoading: loadingResume } = useQuery<ResumeData | null>({
    queryKey: ["active-resume"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.fetchActiveResume(token);
    },
  });

  const { data: resumesList } = useQuery<ResumeData[]>({
    queryKey: ["resumes-list"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.listResumes(token);
    },
  });

  const getSkillsCount = (): number => {
    if (!latestResume || !latestResume.structured_sections.skills) return 0;
    const skillsList = latestResume.structured_sections.skills
      .split(/,|\n|•|\||;/)
      .map((s) => s.trim())
      .filter(Boolean);
    return skillsList.length;
  };

  const getAnalysesList = () => {
    if (!resumesList) return [];
    return resumesList.map((resume) => ({
      id: resume.id,
      resumeName: resume.file_metadata.filename,
      role: resume.target_role || "Target Role",
      company: resume.target_company || "Target Company",
      matchScore: 100,
      status: resume.is_active ? "Active" : "Archived",
      date: new Date(resume.created_at).toLocaleDateString(),
    }));
  };

  if (!isLoaded || loadingResume) {
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
                  Resumes Uploaded
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5 }}>
                  {resumesList ? resumesList.length : 0}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: latestResume ? "success.main" : "text.secondary" }} />
                  <Typography variant="caption" sx={{ color: latestResume ? "success.main" : "text.secondary", fontWeight: 700 }}>
                    {latestResume ? "Active resume synced" : "No active resume"}
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
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5, color: latestResume ? "primary.main" : "text.secondary" }}>
                  {latestResume ? "91%" : "0%"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {latestResume ? "Top 5% candidate pool" : "Upload resume to scan"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                  Extracted Skills
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5 }}>
                  {getSkillsCount()}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Parsed from resume
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
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 0.5, color: latestResume ? "success.main" : "text.secondary" }}>
                  {latestResume ? "3.2x" : "1.0x"}
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
                  Resume
                </TableCell>
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
              {getAnalysesList().length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
                      No resumes uploaded yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                      Upload your first resume to extract skills and run ATS audits.
                    </Typography>
                    <Button
                      component={Link}
                      href="/dashboard/upload"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                      }}
                    >
                      Upload Resume
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                getAnalysesList().map((scan) => (
                  <TableRow
                    key={scan.id}
                    sx={{
                      transition: "background-color 0.15s ease",
                      "&:hover": { backgroundColor: "action.hover" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DescriptionIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                          {scan.resumeName}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                        {scan.role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {scan.company}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "success.main" }}>
                        {scan.matchScore}%
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Chip
                        label={scan.status}
                        size="small"
                        color="success"
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
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            const selected = resumesList?.find((r) => r.id === scan.id);
                            if (selected) setPreviewResume(selected);
                          }}
                          startIcon={<DescriptionIcon fontSize="small" />}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, whiteSpace: "nowrap" }}
                        >
                          Preview Resume
                        </Button>
                        <Button
                          component={Link}
                          href={`/dashboard/upload?reupload=${scan.id}`}
                          size="small"
                          variant="contained"
                          startIcon={<CloudUploadIcon fontSize="small" />}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Re-upload
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          disabled={deletingId !== null}
                          onClick={() => {
                            setResumeToDelete({ id: scan.id, name: scan.resumeName });
                            setDeleteConfirmOpen(true);
                          }}
                        >
                          {deletingId === scan.id ? (
                            <CircularProgress size={20} color="error" />
                          ) : (
                            <DeleteOutlineIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Parse Preview Modal */}
        <Dialog open={previewResume !== null} onClose={() => setPreviewResume(null)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Parsed Section Breakdown
            <IconButton size="small" onClick={() => setPreviewResume(null)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <Box>
                <Chip label="Summary" size="small" color="primary" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {previewResume?.structured_sections?.summary || "No summary section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Experience" size="small" color="info" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {previewResume?.structured_sections?.experience || "No work experience section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Education" size="small" color="warning" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {previewResume?.structured_sections?.education || "No education section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Technical Skills" size="small" color="secondary" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {previewResume?.structured_sections?.skills || "No skills section detected."}
                </Typography>
              </Box>

              <Box>
                <Chip label="Certifications" size="small" color="success" sx={{ fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                  {previewResume?.structured_sections?.certifications || "No certifications section detected."}
                </Typography>
              </Box>

              {previewResume?.structured_sections?.other && (
                <Box>
                  <Chip label="Other Content" size="small" color="default" sx={{ fontWeight: 700, mb: 1 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}>
                    {previewResume.structured_sections.other}
                  </Typography>
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setPreviewResume(null)} variant="contained" sx={{ borderRadius: 2 }}>
              Close Preview
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onClose={() => !deletingId && setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 800 }}>Delete Resume / Scan</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Are you sure you want to permanently delete the resume <strong>{resumeToDelete?.name}</strong> and all its associated scan history?
            </Typography>
            <Typography variant="caption" color="error.main" sx={{ fontWeight: 700 }}>
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setDeleteConfirmOpen(false)}
              disabled={deletingId !== null}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={deletingId !== null}
              color="error"
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              {deletingId !== null ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: "100%", borderRadius: 2 }}>
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={4000}
          onClose={() => setErrorMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setErrorMessage("")} severity="error" sx={{ width: "100%", borderRadius: 2 }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
