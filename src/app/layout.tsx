import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/shared/Navbar";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance Board",
  description: "Personal finance dashboard",
};

import PageWrapper from "@/components/layout/PageWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background transition-colors duration-300">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <PageWrapper>{children}</PageWrapper>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
