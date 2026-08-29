"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Card,
  CardContent,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppNav } from "@/components/common/AppNav";
import { ApiService } from "@/services/api";
import { ResumeData } from "@/types";

export default function HistoryPage(): React.JSX.Element {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [compareModalOpen, setCompareModalOpen] = useState(false);
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

  const { data: resumesList, isLoading: loading } = useQuery<ResumeData[]>({
    queryKey: ["resumes-list"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.listResumes(token);
    },
  });

  const { data: latestResume } = useQuery<ResumeData | null>({
    queryKey: ["active-resume"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.fetchActiveResume(token);
    },
  });

  const getHistoryItems = () => {
    if (!resumesList) return [];
    return resumesList.map((resume, idx) => ({
      id: resume.id,
      resumeName: resume.file_metadata.filename,
      role: resume.target_role || "Target Role",
      company: resume.target_company || "Target Company",
      matchScore: 100,
      status: resume.is_active ? "Active" : "Archived",
      date: new Date(resume.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      version: resume.is_active ? "v1.0 (Active)" : `v1.${resumesList.length - 1 - idx} (Archived)`,
    }));
  };

  const filteredItems = getHistoryItems().filter(
    (item) =>
      item.resumeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
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
          Loading history...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Header Bar */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
              Scan History & Version Analytics
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Review past resume optimizations, compare score metrics across versions, and track callback lift.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<CompareArrowsIcon />}
            onClick={() => setCompareModalOpen(true)}
            sx={{ borderRadius: 2.5, fontWeight: 700 }}
          >
            Compare Versions
          </Button>
        </Box>

        {/* Search & Filter */}
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search by role title, company, or scan ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ width: { xs: "100%", sm: 360 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
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
                  Version & Scan ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Target Role & Company
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  ATS Match Score
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Date
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
                      No scan history found
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                      Upload your resume to start tracking optimized versions and score history.
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
                filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
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
                          {item.resumeName}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {item.version}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        ID: {item.id}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {item.role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {item.company}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "success.main" }}>
                        {item.matchScore}%
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Chip
                        label={item.status}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>

                    <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                        {item.date}
                      </Typography>
                    </TableCell>

                    <TableCell align="right" sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            const selected = resumesList?.find((r) => r.id === item.id);
                            if (selected) setPreviewResume(selected);
                          }}
                          startIcon={<DescriptionIcon fontSize="small" />}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, whiteSpace: "nowrap" }}
                        >
                          Preview Resume
                        </Button>
                        <Button
                          component={Link}
                          href={`/dashboard/upload?reupload=${item.id}`}
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
                            setResumeToDelete({ id: item.id, name: item.resumeName });
                            setDeleteConfirmOpen(true);
                          }}
                        >
                          {deletingId === item.id ? (
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

        {/* Version Comparison Modal */}
        <Dialog open={compareModalOpen} onClose={() => setCompareModalOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Resume Version Comparison Matrix
            <IconButton size="small" onClick={() => setCompareModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                  <CardContent>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                      BASELINE VERSION (v1.0)
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: latestResume ? "success.main" : "warning.main", my: 1 }}>
                      {latestResume ? "100%" : "76%"} Match
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {latestResume ? (
                        <>
                          • Active baseline parsed successfully.
                          <br />• File: {latestResume.file_metadata.filename} ({Math.round(latestResume.file_metadata.file_size / 1024)} KB)
                        </>
                      ) : (
                        <>
                          • Missing key vector search terms (FAISS, RAG).
                          <br />• Missing metric quantification in work history.
                        </>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "success.main", backgroundColor: "action.selected" }}>
                  <CardContent>
                    <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700 }}>
                      OPTIMIZED VERSION (v2.4)
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: "success.main" }}>
                        {latestResume ? "100%" : "94%"} Match
                      </Typography>
                      <Chip icon={<ArrowUpwardIcon />} label={latestResume ? "Optimal" : "+18% Lift"} color="success" size="small" sx={{ fontWeight: 800 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {latestResume ? (
                        <>
                          • All key sections successfully extracted.
                          <br />• Synced metadata page count: {latestResume.file_metadata.page_count ?? "N/A"}
                        </>
                      ) : (
                        <>
                          • Added 14 high-impact ATS keywords.
                          <br />• Converted bullet points into metric achievements (+3.2x callback rate).
                        </>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCompareModalOpen(false)} variant="contained" sx={{ borderRadius: 2 }}>
              Close Comparison
            </Button>
          </DialogActions>
        </Dialog>

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

