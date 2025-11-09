import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth-context";
import Analytics from "./components/Analytics";

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
  metadataBase: new URL('https://livatosolutions.com'),
  title: {
    default: 'Livato Solutions - Custom Labels, Barcode Printers & Thermal Ribbons',
    template: '%s | Livato Solutions'
  },
  icons: {
    icon: '/Livato Logo.png',
    shortcut: '/Livato Logo.png',
    apple: '/Livato Logo.png',
  },
  description: 'Leading provider of custom labeling solutions in India. Specialized in pharmaceutical labels, barcode printers, thermal ribbons, and complete labeling systems for healthcare, logistics, retail, and manufacturing industries.',
  keywords: [
    'custom labels India',
    'pharmaceutical labels',
    'barcode labels',
    'thermal labels',
    'barcode printers',
    'thermal ribbons',
    'label printing solutions',
    'healthcare labels',
    'logistics labels',
    'retail labels',
    'manufacturing labels',
    'Zebra printers India',
    'TSC printers',
    'SATO printers',
    'label design services',
    'FDA compliant labels',
    'GMP labels',
    'variable data printing',
    'RFID labels',
    'label configurator',
    'Hyderabad label supplier'
  ],
  authors: [{ name: 'Livato Solutions LLP' }],
  creator: 'Livato Solutions LLP',
  publisher: 'Livato Solutions LLP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://livatosolutions.com',
    siteName: 'Livato Solutions',
    title: 'Livato Solutions - Custom Labels, Barcode Printers & Thermal Ribbons',
    description: 'Leading provider of custom labeling solutions in India. Pharmaceutical labels, barcode printers, thermal ribbons, and complete labeling systems.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Livato Solutions - Custom Labeling Solutions',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livato Solutions - Custom Labels & Barcode Printers',
    description: 'Leading provider of custom labeling solutions in India. Pharmaceutical labels, barcode printers, thermal ribbons.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://livatosolutions.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className={inter.className}>
        <Analytics />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}