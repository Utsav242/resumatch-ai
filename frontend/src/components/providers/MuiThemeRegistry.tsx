"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "@/context/ThemeProvider";
import { getMuiTheme } from "@/theme/muiTheme";

export function MuiThemeRegistry({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const muiTheme = React.useMemo(() => getMuiTheme(theme), [theme]);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
