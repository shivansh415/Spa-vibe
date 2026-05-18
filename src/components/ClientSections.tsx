'use client';

import dynamic from 'next/dynamic';

/* ──────────────────────────────────────────────
   Client-Side Sections
   
   Architecture:
   • Preloader — ssr:false (overlay, doesn't need pre-rendering)
   • Navbar/Hero — SSR ENABLED for instant HTML paint (LCP)
   • Below-fold — ssr:false for code-splitting (lazy JS load)
   ────────────────────────────────────────────── */

// ── Above the fold — SSR enabled for LCP ──
const Preloader   = dynamic(() => import('@/components/Preloader'), { ssr: false });
const Navbar      = dynamic(() => import('@/components/layout/Navbar'));
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'));

// ── Below the fold — lazy loaded, no SSR ──
const EnquirySection = dynamic(() => import('@/components/enquiry/EnquirySection'), { ssr: false });
const WhySection     = dynamic(() => import('@/components/why/WhySection'),          { ssr: false });
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'),  { ssr: false });
const CTASection     = dynamic(() => import('@/components/cta/CTASection'),          { ssr: false });

export default function ClientSections() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main role="main" id="main-content">
        <HeroSection />
        <EnquirySection />
        <WhySection />
        <GallerySection />
        <CTASection />
      </main>
    </>
  );
}
