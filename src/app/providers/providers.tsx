"use client";

import theme from "@/app/theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
