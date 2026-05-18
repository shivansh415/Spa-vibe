'use client';

import Preloader from '@/components/Preloader';
import { Navbar } from '@/components/layout';
import { HeroSection } from '@/components/hero';
import { EnquirySection } from '@/components/enquiry';
import { WhySection } from '@/components/why';
import { GallerySection } from '@/components/gallery';
import { CTASection } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
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

