"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HistoryIcon from "@mui/icons-material/History";
import QuizIcon from "@mui/icons-material/Quiz";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@/context/ThemeProvider";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  category?: "core" | "tools" | "account";
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon fontSize="small" />, category: "core" },
  { label: "Upload & Match", href: "/dashboard/upload", icon: <CloudUploadIcon fontSize="small" />, badge: "AI Scan", category: "core" },
  { label: "ATS Report", href: "/report/sample", icon: <AssessmentIcon fontSize="small" />, category: "core" },
  { label: "AI Resume Editor", href: "/editor/sample", icon: <EditNoteIcon fontSize="small" />, badge: "Diff View", category: "core" },
  { label: "Scan History", href: "/history", icon: <HistoryIcon fontSize="small" />, category: "core" },
  
  { label: "Interview Prep", href: "/interview-prep", icon: <QuizIcon fontSize="small" />, badge: "PRO", category: "tools" },
  { label: "Cover Letter AI", href: "/cover-letter", icon: <EmailIcon fontSize="small" />, category: "tools" },
  { label: "LinkedIn Optimizer", href: "/linkedin-optimizer", icon: <LinkedInIcon fontSize="small" />, category: "tools" },
  { label: "Career Roadmap", href: "/career-roadmap", icon: <MapIcon fontSize="small" />, category: "tools" },
  { label: "Recruiter Portal", href: "/recruiter", icon: <PeopleIcon fontSize="small" />, badge: "Enterprise", category: "tools" },

  { label: "Settings", href: "/settings", icon: <SettingsIcon fontSize="small" />, category: "account" },
  { label: "Billing & Plans", href: "/billing", icon: <CreditCardIcon fontSize="small" />, category: "account" },
];

export function AppNav(): React.JSX.Element {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isLoaded } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(12px)",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 64, justifyContent: "space-between" }}>
            {/* Left Brand Logo & Mobile Trigger */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                color="inherit"
                aria-label="Open Navigation Drawer"
                onClick={toggleMobileDrawer}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>

              <Box
                component={Link}
                href="/dashboard"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textDecoration: "none",
                  color: "text.primary",
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2.5,
                    background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(109, 94, 247, 0.3)",
                  }}
                >
                  <BoltIcon fontSize="small" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Resum
                  <Box component="span" sx={{ color: "primary.main" }}>
                    iq
                  </Box>
                </Typography>
              </Box>

              {/* Core Nav Links (Desktop) */}
              <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 0.5, ml: 3 }}>
                {NAV_ITEMS.filter((i) => i.category === "core").map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Button
                      key={item.href}
                      component={Link}
                      href={item.href}
                      startIcon={item.icon}
                      size="small"
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 2,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "primary.main" : "text.secondary",
                        backgroundColor: isActive ? "action.selected" : "transparent",
                        "&:hover": {
                          backgroundColor: "action.hover",
                          color: "primary.main",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            </Box>

            {/* Right Tools & User Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button
                component={Link}
                href="/dashboard/upload"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  borderRadius: 2,
                  fontWeight: 700,
                  px: 2,
                  py: 0.75,
                  background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                  boxShadow: "0 4px 14px rgba(109, 94, 247, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5B4CE6 0%, #7C4DEF 100%)",
                  },
                }}
              >
                New Scan
              </Button>

              <Tooltip title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton
                  onClick={toggleTheme}
                  color="inherit"
                  size="small"
                  sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
                >
                  {theme === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>
              </Tooltip>

              {isLoaded && <UserButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, px: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <BoltIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Resum<Box component="span" sx={{ color: "primary.main" }}>iq</Box>
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List disablePadding>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={toggleMobileDrawer}
                    selected={isActive}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: isActive ? "primary.main" : "text.secondary" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: "0.875rem",
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "primary.main" : "text.primary",
                          },
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        color={item.badge === "PRO" ? "secondary" : "primary"}
                        variant="outlined"
                        sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700 }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
