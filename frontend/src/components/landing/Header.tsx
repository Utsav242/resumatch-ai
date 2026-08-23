"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
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
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ZapIcon from "@mui/icons-material/Bolt";
import { useTheme } from "@/context/ThemeProvider";

export interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export const NAV_LINKS = [
  { label: "Features", href: "#features", id: "features" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Interactive Demo", href: "#demo", id: "demo" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

export function Header({ onNavigate }: HeaderProps): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled
            ? theme === "dark"
              ? "rgba(18, 24, 38, 0.85)"
              : "rgba(255, 255, 255, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: "1px solid",
          borderColor: scrolled ? "divider" : "transparent",
          transition: "all 0.3s ease",
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72, justifyContent: "space-between" }}>
            {/* Brand Logo */}
            <Box
              component={Link}
              href="/"
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
                  width: 36,
                  height: 36,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(109, 94, 247, 0.3)",
                }}
              >
                <ZapIcon fontSize="small" />
              </Box>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                Resum
                <Box component="span" sx={{ color: "primary.main" }}>
                  iq
                </Box>
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Desktop Action Controls */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="Toggle dark/light theme"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                {theme === "dark" ? (
                  <Brightness7Icon fontSize="small" sx={{ color: "#F59E0B" }} />
                ) : (
                  <Brightness4Icon fontSize="small" sx={{ color: "#6D5EF7" }} />
                )}
              </IconButton>

              {isSignedIn ? (
                <>
                  <Button
                    component={Link}
                    href="/dashboard"
                    variant="outlined"
                    startIcon={<DashboardIcon />}
                  >
                    Dashboard
                  </Button>
                  <UserButton />
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    href="/sign-in"
                    variant="text"
                    sx={{
                      color: "text.primary",
                      fontWeight: 700,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button component={Link} href="/sign-up" variant="contained" color="primary">
                    Get Started Free
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile Menu Toggle Button */}
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="Toggle theme"
                size="small"
                sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
              >
                {theme === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
              <IconButton
                onClick={() => setMobileOpen(true)}
                color="inherit"
                aria-label="Open navigation menu"
                edge="end"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: 320,
              backgroundColor: "background.paper",
              p: 3,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ width: "100%" }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.id} disablePadding>
              <ListItemButton onClick={() => handleNavClick(link.id)} sx={{ borderRadius: 2, py: 1.5 }}>
                <ListItemText
                  primary={link.label}
                  slotProps={{ primary: { sx: { fontWeight: 600, fontSize: "1rem", color: "text.primary" } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isSignedIn ? (
            <>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<DashboardIcon />}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                <UserButton />
              </Box>
            </>
          ) : (
            <>
              <Button
                component={Link}
                href="/sign-in"
                variant="outlined"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                href="/sign-up"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                Get Started Free
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
