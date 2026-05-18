import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Poppins } from 'next/font/google';
import './globals.css';

import { SmoothScrollProvider } from '@/lib/smooth-scroll';

/* ──────────────────────────────────────────────
   Font Configuration
   ────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

/* ──────────────────────────────────────────────
   SEO Metadata
   ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'SPA VIBE — Premium Spa & Wellness Experience in Indore',
  description:
    'Discover pure tranquility at SPA VIBE. Premium spa offering body massage, aromatherapy, facials, and holistic wellness treatments in Indore. Book your session today.',
  keywords: [
    'spa', 'spa indore', 'body massage', 'aromatherapy', 'facial',
    'luxury spa', 'wellness', 'relaxation', 'spa vibe', 'body spa indore',
    'premium spa', 'massage therapy', 'holistic wellness',
  ],
  openGraph: {
    title: 'SPA VIBE — Premium Spa & Wellness Experience',
    description: 'Discover pure tranquility. Body, mind, and soul — restored.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SPA VIBE',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F8F4F1',
};

/* ──────────────────────────────────────────────
   Root Layout
   ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="grain-overlay antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
