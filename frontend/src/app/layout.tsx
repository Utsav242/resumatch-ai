import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";
import { MuiThemeRegistry } from "@/components/providers/MuiThemeRegistry";
import Providers from "./providers";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["monospace", "Courier New"],
});

export const metadata: Metadata = {
  title: "Resumiq — AI-Powered Resume & Job Match Intelligence",
  description:
    "Analyze and optimize your resume against target job postings using vector embeddings. Beat ATS filters and triple your interview callbacks.",
  keywords: [
    "Resumiq",
    "Resumiq AI",
    "ATS Scanner",
    "AI Resume Rewriter",
    "Job Matching Engine",
    "Vector Similarity",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6D5EF7",
          colorBackground: "var(--bg-elevated)",
          colorForeground: "var(--text-primary)",
          colorMutedForeground: "var(--text-secondary)",
          colorBorder: "var(--border)",
          colorInputForeground: "var(--text-primary)",
          colorInput: "var(--bg)",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
        data-theme="dark"
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-bg text-text-primary antialiased">
          <ThemeProvider defaultTheme="dark">
            <MuiThemeRegistry>
              <Providers>{children}</Providers>
            </MuiThemeRegistry>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
