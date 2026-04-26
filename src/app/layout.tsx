import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Ark Spa & Salon — Premium Spa Experience',
  description:
    'Surrender to ancient healing rituals at The Ark Spa & Salon. Japanese & Thai luxury fusion spa offering body massage, aromatherapy, facials, and more. Book your session today.',
  keywords: [
    'spa',
    'salon',
    'massage',
    'aromatherapy',
    'body spa',
    'facial',
    'luxury spa',
    'relaxation',
    'wellness',
  ],
  openGraph: {
    title: 'The Ark Spa & Salon — Premium Spa Experience',
    description:
      'Surrender to ancient healing rituals. Body, mind, and soul — restored.',
    type: 'website',
  },
};

import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="grain-overlay" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
