/**
 * SPA VIBE — Site Configuration
 * 
 * Single source of truth for all branding, contact,
 * and content configuration across the website.
 */
export const siteConfig = {
  // ── Branding ──
  brandName: 'SPA VIBE',
  brandShortName: 'SPA VIBE',
  tagline: 'Where Relaxation Meets Luxury',
  description: 'Premium spa & wellness experience',

  // ── SEO ──
  seo: {
    title: 'Best Luxury Spa in Indore | Spa Vibe — Premium Massage & Wellness Center',
    description:
      'Spa Vibe is the best luxury spa in Indore offering premium body massage, couple spa, aromatherapy, facials & holistic wellness treatments. Book now!',
  },

  // ── Contact ──
  contact: {
    phones: ['+91-9755500377', '+91-9755507408'],
    whatsappNumber: '919755500377',
    hours: 'Mon–Sun 10:30AM–11:30PM',
    address:
      'G-01, Ground Floor, Samiksh Landmark, Choithram Circle, Choithram Mandi, Indore, Madhya Pradesh 452012',
    googleMapsUrl: 'https://maps.app.goo.gl/EKbQh2CP9FYcfDF69',
    email: 'hello@spavibe.in',
  },

  // ── Social ──
  socials: {
    instagram: 'https://www.instagram.com/spavibesindore?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    facebook: 'https://www.facebook.com/people/Spa-Vibes/61574345188422/#',
  },

  // ── Map ──
  map: {
    center: [75.8577, 22.7196] as [number, number], // Indore coordinates
    zoom: 15,
  },

  // ── Navigation ──
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Book Session', href: '#book-session' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
  ],
} as const;
