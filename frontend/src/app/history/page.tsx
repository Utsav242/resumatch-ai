"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { AppNav } from "@/components/common/AppNav";

export default function HistoryPage(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const [historyItems] = useState([
    {
      id: "scan_101",
      role: "Staff AI Infrastructure Architect",
      company: "Anthropic",
      matchScore: 94,
      status: "High Match",
      date: "August 5, 2026",
      version: "v2.4 (Optimized)",
    },
    {
      id: "scan_102",
      role: "Senior Full Stack Engineer",
      company: "Vercel",
      matchScore: 88,
      status: "Good Match",
      date: "August 4, 2026",
      version: "v2.1",
    },
    {
      id: "scan_103",
      role: "Lead Machine Learning Engineer",
      company: "OpenAI",
      matchScore: 76,
      status: "Gaps Found",
      date: "August 1, 2026",
      version: "v1.0 (Baseline)",
    },
  ]);

  const filteredItems = historyItems.filter(
    (item) =>
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {filteredItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
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
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: item.matchScore >= 90 ? "success.main" : "warning.main" }}>
                      {item.matchScore}%
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.matchScore >= 90 ? "success" : "warning"}
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
                        component={Link}
                        href={`/report/${item.id}`}
                        size="small"
                        variant="outlined"
                        startIcon={<AssessmentIcon fontSize="small" />}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                      >
                        Report
                      </Button>
                      <Button
                        component={Link}
                        href={`/editor/${item.id}`}
                        size="small"
                        variant="contained"
                        startIcon={<EditNoteIcon fontSize="small" />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                        }}
                      >
                        Editor
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
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
                    <Typography variant="h4" sx={{ fontWeight: 900, color: "warning.main", my: 1 }}>
                      76% Match
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      • Missing key vector search terms (FAISS, RAG).
                      <br />• Missing metric quantification in work history.
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
                        94% Match
                      </Typography>
                      <Chip icon={<ArrowUpwardIcon />} label="+18% Lift" color="success" size="small" sx={{ fontWeight: 800 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      • Added 14 high-impact ATS keywords.
                      <br />• Converted bullet points into metric achievements (+3.2x callback rate).
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
      </Container>
    </Box>
  );
}
