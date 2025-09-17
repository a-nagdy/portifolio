import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { YearsOfExpDate } from "@/lib/YearsOfExpDate";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Ahmed Mohamed - Full Stack Developer",
  description: `Portfolio of Ahmed Mohamed, a Full Stack Developer with ${YearsOfExpDate()} years of experience in React, Next.js, and Magento2`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
