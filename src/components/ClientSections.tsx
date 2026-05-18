'use client';

import dynamic from 'next/dynamic';

/* ──────────────────────────────────────────────
   Client-Side Dynamic Imports
   
   Heavy interactive components are loaded here
   with ssr:false to reduce bundle size and
   improve Time to Interactive.
   ────────────────────────────────────────────── */
const Preloader      = dynamic(() => import('@/components/Preloader'),                   { ssr: false });
const Navbar         = dynamic(() => import('@/components/layout/Navbar'),                { ssr: false });
const HeroSection    = dynamic(() => import('@/components/hero/HeroSection'),             { ssr: false });
const EnquirySection = dynamic(() => import('@/components/enquiry/EnquirySection'),       { ssr: false });
const WhySection     = dynamic(() => import('@/components/why/WhySection'),               { ssr: false });
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'),       { ssr: false });
const CTASection     = dynamic(() => import('@/components/cta/CTASection'),               { ssr: false });
const Footer         = dynamic(() => import('@/components/footer/Footer'),                { ssr: false });

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
      <Footer />
    </>
  );
}
