import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
  metadataBase: new URL('https://werkfox.com'),
  title: {
    default: 'WerkFox - ERP & CRM for Manufacturing',
    template: '%s | WerkFox'
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  description: 'Complete ERP & CRM solution for small manufacturing companies. Inventory management, production planning, sales, and customer management in one powerful platform.',
  keywords: [
    'ERP software',
    'CRM software',
    'manufacturing ERP',
    'inventory management',
    'production planning',
    'small business ERP',
    'manufacturing software India',
    'factory management',
    'work order management',
    'sales management',
    'invoicing software',
    'GST billing',
    'cloud ERP',
    'affordable ERP'
  ],
  authors: [{ name: 'WerkFox' }],
  creator: 'WerkFox',
  publisher: 'WerkFox',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://werkfox.com',
    siteName: 'WerkFox',
    title: 'WerkFox - ERP & CRM for Manufacturing',
    description: 'Complete ERP & CRM solution for small manufacturing companies. Run your factory smarter.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WerkFox - ERP & CRM for Manufacturing',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WerkFox - ERP & CRM for Manufacturing',
    description: 'Complete ERP & CRM solution for small manufacturing companies.',
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
  alternates: {
    canonical: 'https://werkfox.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}