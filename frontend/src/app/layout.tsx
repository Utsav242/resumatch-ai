import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "ResumeMatch AI - Enterprise AI Resume Intelligence Platform",
  description:
    "AI-powered Resume Intelligence Platform analyzing resumes against Job Descriptions using RAG, ATS scoring, and LLMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
