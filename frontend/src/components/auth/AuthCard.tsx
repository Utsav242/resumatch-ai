"use client";

import React, { useState, useEffect, Suspense } from "react";
import NextLink from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  InputAdornment,
  CircularProgress,
  keyframes,
} from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyIcon from "@mui/icons-material/VpnKey";

export interface AuthCardProps {
  mode: "sign-in" | "sign-up";
}

interface ClerkApiError {
  errors?: Array<{
    code?: string;
    message?: string;
    longMessage?: string;
  }>;
}

// Keyframes
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowBorder = keyframes`
  0%, 100% { box-shadow: 0 0 0 1px rgba(109, 94, 247, 0.3), 0 20px 60px rgba(0,0,0,0.4); }
  50% { box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.5), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(109, 94, 247, 0.08); }
`;

function AuthCardInner({ mode }: AuthCardProps): React.JSX.Element {
  const isSignIn = mode === "sign-in";
  const clerk = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [accountExists, setAccountExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (searchParams?.get("account_exists") === "true") {
      setAccountExists(true);
      setError("An account with this email address already exists. Please Sign In below.");
    }
  }, [searchParams]);

  const parseClerkError = (err: unknown): { msg: string; exists: boolean } => {
    const clerkErr = err as ClerkApiError;
    const firstErr = clerkErr.errors?.[0];
    const codeStr = firstErr?.code || "";
    const msg =
      firstErr?.longMessage ||
      firstErr?.message ||
      "Authentication failed. Please verify your credentials.";

    const lowerMsg = msg.toLowerCase();
    const exists =
      codeStr === "form_identifier_exists" ||
      codeStr === "form_email_exists" ||
      lowerMsg.includes("already exists") ||
      lowerMsg.includes("already registered") ||
      lowerMsg.includes("taken");

    return { msg, exists };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAccountExists(false);
    setLoading(true);

    try {
      if (isSignIn) {
        if (!clerk.client.signIn) {
          setError("Sign in service unavailable. Please refresh.");
          setLoading(false);
          return;
        }
        const result = await clerk.client.signIn.create({
          identifier: email,
          password: password || "password123",
        });

        if (result.status === "complete") {
          await clerk.setActive({ session: result.createdSessionId });
          router.push("/dashboard");
        } else {
          setError("Sign in incomplete. Please check your credentials.");
        }
      } else {
        if (!clerk.client.signUp) {
          setError("Sign up service unavailable. Please refresh.");
          setLoading(false);
          return;
        }
        await clerk.client.signUp.create({
          emailAddress: email,
          password: password || "password123",
        });

        await clerk.client.signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
      }
    } catch (err: unknown) {
      const { msg, exists } = parseClerkError(err);
      if (exists) {
        setAccountExists(true);
        setError("An account with this email already exists. Please Sign In instead.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!clerk.client.signUp) return;
      const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await clerk.setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification incomplete. Please check the code.");
      }
    } catch (err: unknown) {
      const { msg } = parseClerkError(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError("");
    setAccountExists(false);

    try {
      if (isSignIn) {
        if (!clerk.client.signIn) return;
        await clerk.client.signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      } else {
        if (!clerk.client.signUp) return;
        await clerk.client.signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      }
    } catch (err: unknown) {
      const { msg, exists } = parseClerkError(err);
      if (exists) {
        setAccountExists(true);
        setError("An account with this email already exists. Please Sign In below.");
      } else {
        setError(msg);
      }
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 460 },
        animation: `${glowBorder} 5s ease-in-out infinite`,
        borderRadius: "20px",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(13, 19, 35, 0.88)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(24px)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(109, 94, 247, 0.25)"
            : "1px solid rgba(109, 94, 247, 0.15)",
        p: { xs: 3, sm: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top highlight */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Tab Switcher */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(6, 10, 22, 0.7)"
              : "rgba(241, 245, 249, 0.8)",
          borderRadius: "12px",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)",
          p: "4px",
          mb: 3.5,
          gap: "4px",
        }}
      >
        {[
          { label: "Create Account", href: "/sign-up", active: !isSignIn },
          { label: "Sign In", href: "/sign-in", active: isSignIn },
        ].map(({ label, href, active }) => (
          <Box
            key={label}
            component={NextLink}
            href={href}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 1.1,
              px: 1,
              borderRadius: "9px",
              fontSize: "0.875rem",
              fontWeight: 700,
              fontFamily: "var(--font-space-grotesk), sans-serif",
              textDecoration: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
              background: active
                ? "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)"
                : "transparent",
              color: active ? "#FFFFFF" : "text.secondary",
              boxShadow: active
                ? "0 2px 12px rgba(109, 94, 247, 0.4)"
                : "none",
              "&:hover": {
                color: active ? "#FFFFFF" : "text.primary",
                background: active
                  ? "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)"
                  : "rgba(109, 94, 247, 0.06)",
              },
            }}
          >
            {label}
          </Box>
        ))}
      </Box>

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 0.75,
            color: "text.primary",
            fontSize: { xs: "1.3rem", sm: "1.5rem" },
            letterSpacing: "-0.02em",
          }}
        >
          {isSignIn ? "Welcome back 👋" : "Start your first analysis"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.55, fontSize: "0.875rem" }}
        >
          {isSignIn
            ? "Sign in to access your resume intelligence dashboard."
            : "Upload resume → Add job description → Get instant AI match report."}
        </Typography>
      </Box>

      {/* Error / Warning Banners */}
      {accountExists && !isSignIn ? (
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            borderRadius: "10px",
            alignItems: "center",
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
            Account already exists!
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5, fontSize: "0.8rem" }}>
            An account with this email has already been created.
          </Typography>
          <Button
            component={NextLink}
            href="/sign-in"
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", fontSize: "0.8rem" }}
          >
            Click here to Sign In
          </Button>
        </Alert>
      ) : error ? (
        <Alert
          severity={accountExists ? "warning" : "error"}
          sx={{ mb: 3, borderRadius: "10px", fontSize: "0.85rem" }}
        >
          {error}
        </Alert>
      ) : null}

      {/* Verification Form */}
      {pendingVerification ? (
        <Box component="form" onSubmit={handleVerify}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              p: 2,
              borderRadius: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(109, 94, 247, 0.1)"
                  : "rgba(109, 94, 247, 0.06)",
              border: "1px solid rgba(109, 94, 247, 0.2)",
            }}
          >
            <KeyIcon color="primary" sx={{ fontSize: 20 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                Verify your email
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                We sent a 6-digit code to {email}
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            variant="outlined"
            sx={{
              mb: 2.5,
              "& .MuiOutlinedInput-root": { height: 56, borderRadius: "10px" },
            }}
            slotProps={{
              htmlInput: {
                style: {
                  textAlign: "center",
                  fontFamily: "monospace",
                  letterSpacing: "6px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
            sx={{
              height: 54,
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
              boxShadow: "0 4px 20px rgba(109, 94, 247, 0.4)",
              "&:hover": {
                boxShadow: "0 6px 28px rgba(109, 94, 247, 0.6)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Complete Verification
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Google OAuth Button */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            startIcon={
              googleLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )
            }
            sx={{
              height: 54,
              borderRadius: "10px",
              mb: 3,
              fontSize: "0.9rem",
              fontWeight: 700,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.12)",
              color: "text.primary",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.8)",
              "&:hover": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.25)",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(241, 245, 249, 0.9)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Continue with Google
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 2.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                px: 1.5,
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              or continue with email
            </Typography>
          </Divider>

          {/* Email & Password Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  mb: 0.75,
                  display: "block",
                  color: "text.primary",
                  fontSize: "0.8rem",
                  letterSpacing: "0.01em",
                }}
              >
                Email address
              </Typography>
              <TextField
                fullWidth
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlinedIcon
                          sx={{ color: "text.secondary", fontSize: 19 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 54,
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    "&.Mui-focused fieldset": {
                      borderWidth: "1.5px",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.75,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.8rem" }}
                >
                  Password
                </Typography>
                {isSignIn && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </Typography>
                )}
              </Box>
              <TextField
                fullWidth
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{ color: "text.secondary", fontSize: 19 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 54,
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    "&.Mui-focused fieldset": {
                      borderWidth: "1.5px",
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              endIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />
              }
              sx={{
                height: 54,
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 100%)",
                boxShadow: "0 4px 20px rgba(109, 94, 247, 0.35)",
                backgroundSize: "200% auto",
                animation: `${shimmer} 4s linear infinite`,
                backgroundImage:
                  "linear-gradient(135deg, #6D5EF7 0%, #8B5CF6 40%, #A855F7 60%, #6D5EF7 100%)",
                "&:hover": {
                  boxShadow: "0 6px 28px rgba(109, 94, 247, 0.55)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </Box>
        </Box>
      )}

      {/* Footer legal */}
      <Typography
        variant="caption"
        align="center"
        sx={{ display: "block", mt: 3, color: "text.secondary", fontSize: "0.75rem", lineHeight: 1.5 }}
      >
        By continuing, you agree to our{" "}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          Terms of Service
        </Typography>{" "}
        and{" "}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          Privacy Policy
        </Typography>
        .
      </Typography>
    </Box>
  );
}

export function AuthCard(props: AuthCardProps): React.JSX.Element {
  return (
    <Suspense fallback={<CircularProgress color="primary" />}>
      <AuthCardInner {...props} />
    </Suspense>
  );
}
