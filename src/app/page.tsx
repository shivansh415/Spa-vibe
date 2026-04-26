'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoSection from '@/components/VideoSection';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar onBookingOpen={openBooking} />

      <main>
        <Hero onBookingOpen={openBooking} />
        <About />
        <VideoSection />
        <Services onBookingOpen={openBooking} />
        <Pricing onBookingOpen={openBooking} />
        <Gallery />
        <Testimonials />
      </main>

      <Footer onBookingOpen={openBooking} />
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
    </>
  );
}
