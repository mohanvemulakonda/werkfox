import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth-context";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: '--font-open-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Livato CRM",
  description: "Customer Relationship Management System for Livato",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}