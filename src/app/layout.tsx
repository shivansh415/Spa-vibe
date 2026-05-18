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
   SEO — Production-Grade Metadata
   ────────────────────────────────────────────── */
const SITE_URL = 'https://spavibe.in';

export const metadata: Metadata = {
  /* ── Core ── */
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Best Luxury Spa in Indore | Spa Vibe — Premium Massage & Wellness Center',
    template: '%s | Spa Vibe — Luxury Spa in Indore',
  },
  description:
    'Spa Vibe is the best luxury spa in Indore offering premium body massage, couple spa, aromatherapy, facials & holistic wellness treatments. Experience deep relaxation at our wellness center near Choithram Circle. Book now!',
  keywords: [
    'best spa in indore',
    'luxury spa in indore',
    'spa near me',
    'couple spa in indore',
    'massage spa in indore',
    'body massage in indore',
    'premium spa in indore',
    'full body spa in indore',
    'wellness spa in indore',
    'relaxing spa in indore',
    'best massage center in indore',
    'spa vibe indore',
    'spa near choithram indore',
    'body spa indore',
    'aromatherapy indore',
    'facial treatment indore',
    'professional spa therapy indore',
    'spa near vijay nagar indore',
    'relaxation therapy indore',
    'deep tissue massage indore',
  ],

  /* ── Canonical & Alternates ── */
  alternates: {
    canonical: SITE_URL,
  },

  /* ── Indexing ── */
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

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Spa Vibe',
    title: 'Best Luxury Spa in Indore | Spa Vibe — Premium Massage & Wellness Center',
    description:
      'Discover deep relaxation at Spa Vibe, Indore\'s finest luxury spa. Premium body massage, couple spa packages, aromatherapy & holistic wellness treatments. Book your session today.',
    images: [
      {
        url: '/images/og/spa-vibe-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Spa Vibe — Best Luxury Spa & Wellness Center in Indore',
        type: 'image/jpeg',
      },
    ],
  },

  /* ── Twitter ── */
  twitter: {
    card: 'summary_large_image',
    title: 'Best Luxury Spa in Indore | Spa Vibe',
    description:
      'Premium body massage, couple spa & wellness treatments at Spa Vibe, Indore. Experience luxury relaxation — book now.',
    images: ['/images/og/spa-vibe-og.jpg'],
  },

  /* ── Verification (add actual IDs when available) ── */
  // verification: {
  //   google: 'your-google-verification-code',
  // },

  /* ── Other ── */
  category: 'Health & Wellness',
  creator: 'Spa Vibe',
  publisher: 'Spa Vibe',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F4F1' },
    { media: '(prefers-color-scheme: dark)', color: '#2B2B2B' },
  ],
};

/* ──────────────────────────────────────────────
   JSON-LD Structured Data
   ────────────────────────────────────────────── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'DaySpa',
  '@id': `${SITE_URL}/#spa`,
  name: 'Spa Vibe',
  alternateName: 'Spa Vibes Indore',
  description:
    'Premium luxury spa & wellness center in Indore offering body massage, couple spa, aromatherapy, facials, and holistic wellness treatments.',
  url: SITE_URL,
  telephone: ['+91-9755500377', '+91-9755507408'],
  email: 'hello@spavibe.in',
  image: `${SITE_URL}/images/og/spa-vibe-og.jpg`,
  logo: `${SITE_URL}/logo.png`,
  priceRange: '₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G-01, Ground Floor, Samiksh Landmark, Choithram Circle, Choithram Mandi',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452012',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.6786485,
    longitude: 75.8515614,
  },
  hasMap: 'https://maps.app.goo.gl/UcKkceomVFqnwfrz7',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '10:30',
      closes: '23:30',
    },
  ],
  sameAs: [
    'https://www.instagram.com/spavibesindore',
    'https://www.facebook.com/people/Spa-Vibes/61574345188422/',
  ],
  areaServed: {
    '@type': 'City',
    name: 'Indore',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Full Body Massage',
        description: 'Relaxing full body massage therapy for deep muscle relief and stress reduction',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Couple Spa',
        description: 'Romantic couple spa experience with side-by-side treatments in a private suite',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Aromatherapy',
        description: 'Premium aromatherapy sessions using essential oils for holistic wellness',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Facial Treatment',
        description: 'Professional facial treatments for skin rejuvenation and glow',
      },
    },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Spa Vibe',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9755500377',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.instagram.com/spavibesindore',
    'https://www.facebook.com/people/Spa-Vibes/61574345188422/',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best spa in Indore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spa Vibe is rated as one of the best luxury spas in Indore, offering premium body massage, couple spa, aromatherapy, and holistic wellness treatments at Samiksh Landmark, Choithram Circle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Spa Vibe offer couple spa packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Spa Vibe offers exclusive couple spa experiences with side-by-side treatments in a private, luxurious suite — perfect for anniversaries and special occasions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the opening hours of Spa Vibe in Indore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spa Vibe is open 7 days a week, Monday through Sunday, from 10:30 AM to 11:30 PM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Spa Vibe located in Indore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spa Vibe is located at G-01, Ground Floor, Samiksh Landmark, Choithram Circle, Choithram Mandi, Indore, Madhya Pradesh 452012. We are easily accessible from Vijay Nagar and nearby areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I book a spa session at Spa Vibe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book instantly via WhatsApp at +91-9755500377 or call us directly. No registration required — instant confirmation guaranteed.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ],
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
      <head>
        {/* JSON-LD Structured Data — rendered as raw script tags for crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="grain-overlay antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
