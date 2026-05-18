'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis Smooth Scroll Provider
 * 
 * Wraps the application in a Lenis instance for butter-smooth
 * scroll behavior. Automatically handles RAF loop and cleanup.
 * Synchronizes Lenis scroll updates with GSAP ScrollTrigger.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose to window for GSAP ScrollTrigger integration
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis = lenis;
    }

    // Keep GSAP ScrollTrigger in sync with Lenis on every scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for the RAF loop to ensure single-frame sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0); // prevent lag-induced jumps

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
