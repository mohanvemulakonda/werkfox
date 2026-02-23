import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ToolsFinder — Discover the Best Tools for Your Stack",
    template: "%s | ToolsFinder",
  },
  description:
    "Discover, compare, and review the best software tools. Find the perfect tool for your workflow — curated by the community.",
  keywords: [
    "software tools",
    "product discovery",
    "SaaS",
    "developer tools",
    "tool comparison",
  ],
  openGraph: {
    title: "ToolsFinder — Discover the Best Tools for Your Stack",
    description:
      "Discover, compare, and review the best software tools. Curated by the community.",
    url: "https://toolsfinder.io",
    siteName: "ToolsFinder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsFinder",
    description: "Discover the best tools for your stack",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
