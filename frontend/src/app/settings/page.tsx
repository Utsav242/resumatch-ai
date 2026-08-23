"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Paper,
  Alert,
  Snackbar,
  Chip,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import TuneIcon from "@mui/icons-material/Tune";
import SecurityIcon from "@mui/icons-material/Security";
import { AppNav } from "@/components/common/AppNav";
import { ApiService } from "@/services/api";

export default function SettingsPage(): React.JSX.Element {
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");
      return ApiService.fetchCurrentUser(token);
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    targetRole: "",
    targetIndustry: "",
    enableRAG: true,
    strictATS: true,
    emailNotifications: true,
  });
  useEffect(() => {
    if (dbUser) {
      setFormData({
        firstName: dbUser.first_name || user?.firstName || "",
        lastName: dbUser.last_name || user?.lastName || "",
        targetRole: dbUser.target_role || "",
        targetIndustry: dbUser.target_industry || "",
        enableRAG: dbUser.enable_rag,
        strictATS: dbUser.strict_ats,
        emailNotifications: dbUser.email_notifications,
      });
    }
  }, [dbUser, user?.firstName, user?.lastName]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData: typeof formData) => {
      const token = await getToken();
      if (!token) throw new Error("No authentication token available");

      await ApiService.updateCurrentUser(token, {
        first_name: updatedData.firstName,
        last_name: updatedData.lastName,
        target_role: updatedData.targetRole,
        target_industry: updatedData.targetIndustry,
        enable_rag: updatedData.enableRAG,
        strict_ats: updatedData.strictATS,
        email_notifications: updatedData.emailNotifications,
      });

      if (
        user &&
        (updatedData.firstName !== user.firstName ||
          updatedData.lastName !== user.lastName)
      ) {
        await user.update({
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      setSavedSuccess(true);
    },
    onError: (err: Error) => {
      setErrorMessage(err.message || "Failed to save preferences.");
    },
  });

  const handleSave = () => {
    setErrorMessage("");
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <AppNav />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress color="primary" />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", pb: 8 }}>
      <AppNav />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
            Account & Resumiq Preferences
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Configure your candidate profile, target parameters, ATS scoring strictness, and export defaults.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon color="primary" /> Candidate Profile
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Default Target Role"
                      value={formData.targetRole}
                      onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Target Industry / Domain"
                      value={formData.targetIndustry}
                      onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <SecurityIcon color="primary" /> Security & Account
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                  Authentication and user credentials are managed securely via Clerk Single Sign-On.
                </Typography>
                <Chip label="Clerk OAuth Active" color="success" size="small" sx={{ fontWeight: 700 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Engine & Preference Settings */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <TuneIcon color="primary" /> Resumiq Engine Preferences
                </Typography>

                <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "action.hover" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.enableRAG}
                        onChange={(e) => setFormData({ ...formData, enableRAG: e.target.checked })}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          RAG Knowledge Base Augmentation
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Use FAISS vector store to pull HR guidelines and ATS keyword rules.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "action.hover" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.strictATS}
                        onChange={(e) => setFormData({ ...formData, strictATS: e.target.checked })}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Strict Enterprise ATS Audit Mode
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Strictly flag font compatibility, table parsing, and multi-column risks.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: "action.hover" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.emailNotifications}
                        onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Weekly Callback & Analysis Digest
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Receive weekly reports on your active resume match improvements.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                  sx={{
                    borderRadius: 2.5,
                    fontWeight: 800,
                    py: 1.2,
                    background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                  }}
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          open={savedSuccess}
          autoHideDuration={3000}
          onClose={() => setSavedSuccess(false)}
          message="Preferences saved successfully!"
        />

        <Snackbar
          open={!!errorMessage}
          autoHideDuration={4000}
          onClose={() => setErrorMessage("")}
        >
          <Alert severity="error" onClose={() => setErrorMessage("")} sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
