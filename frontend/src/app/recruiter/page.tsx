"use client";

import React, { useState } from "react";
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
  Card,
  CardContent,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { AppNav } from "@/components/common/AppNav";

export default function RecruiterPage(): React.JSX.Element {
  const [candidates] = useState([
    { name: "Alex Rivera", role: "Staff AI Architect", matchScore: 94, skills: ["RAG", "FAISS", "FastAPI"], status: "Top Shortlist" },
    { name: "Sarah Chen", role: "Lead Frontend Architect", matchScore: 91, skills: ["Next.js 16", "React 19", "TypeScript"], status: "Shortlist" },
    { name: "Marcus Vance", role: "DevOps Engineer", matchScore: 88, skills: ["Kubernetes", "PostgreSQL", "Docker"], status: "Reviewed" },
  ]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Chip label="ENTERPRISE PORTAL" color="primary" sx={{ fontWeight: 800, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
              Recruiter & HR Candidate Leaderboard
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Batch scan hundreds of candidate resumes against target job postings and rank candidates by vector ATS fit.
            </Typography>
          </Box>

          <Button variant="contained" startIcon={<CloudUploadIcon />} sx={{ borderRadius: 2.5, fontWeight: 800, background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)" }}>
            Batch Upload Resumes
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
                  Candidate Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Target Role
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Match Score
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Key Extracted Skills
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Status
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary", py: 1.5, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((c, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    transition: "background-color 0.15s ease",
                    "&:hover": { backgroundColor: "action.hover" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontWeight: 800, py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>{c.name}</TableCell>
                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>{c.role}</TableCell>
                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "success.main" }}>
                      {c.matchScore}%
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {c.skills.map((sk, sIdx) => (
                        <Chip key={sIdx} label={sk} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Chip label={c.status} size="small" color="success" sx={{ fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 2, px: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Button size="small" variant="outlined" startIcon={<AssessmentIcon fontSize="small" />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
                      View Full Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
