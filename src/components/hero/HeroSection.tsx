'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const textWrapRef   = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLSpanElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const subtextRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);

  const imageWrapRef  = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<HTMLDivElement>(null);
  const glowRingRef   = useRef<HTMLDivElement>(null);
  const dotRef        = useRef<HTMLDivElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);

  // Leaf outer refs — used for scroll parallax
  const leaf1Ref      = useRef<HTMLDivElement>(null);
  const leaf2Ref      = useRef<HTMLDivElement>(null);
  const leaf3Ref      = useRef<HTMLDivElement>(null);
  // Leaf inner refs — used for float animation (separate element avoids conflict)
  const leaf1InnerRef = useRef<HTMLDivElement>(null);
  const leaf2InnerRef = useRef<HTMLDivElement>(null);
  const leaf3InnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Detect mobile for reduced intensity ──
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // ── Multipliers for mobile ──
    const intensity = isMobile ? 0.45 : 1;
    const floatDist = isMobile ? 6 : 14;
    const parallaxDist = isMobile ? 30 : 80;

    const ctx = gsap.context(() => {
      /* ─────────────────────────────────────
         1. ENTRANCE TIMELINE (after preloader ~3s)
         ───────────────────────────────────── */
      const tl = gsap.timeline({ delay: 1.3 });

      // Glow circle entrance
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        0
      )
      .fromTo(
        glowRingRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        0.15
      )

      // Image — subtle scale enhancement (starts visible for LCP)
      .fromTo(
        imageWrapRef.current,
        { scale: 1.04, y: 16 },
        { scale: 1, y: 0, duration: 1.3, ease: 'power3.out' },
        0.1
      )

      // Text block — stagger fade-up
      .fromTo(
        labelRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        0.25
      )
      .fromTo(
        headlineRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.13,
        },
        0.38
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
        0.72
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        0.88
      )

      // Leaves entrance — fade in the OUTER wrappers
      .fromTo(
        [leaf1Ref.current, leaf2Ref.current, leaf3Ref.current],
        { opacity: 0, scale: 0.75 },
        {
          opacity: (i: number) => [0.72, 0.6, 0.42][i],
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
        },
        0.45
      )

      // Decorative dot
      .fromTo(
        dotRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.6, ease: 'power2.out' },
        1.1
      )

      // Scroll indicator
      .fromTo(
        scrollIndRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.2
      );

      /* ─────────────────────────────────────
         2. CONTINUOUS FLOAT ANIMATIONS
            Animate the INNER element only.
            Outer element is reserved for parallax.
            This prevents two tweens fighting over
            the same y/rotation property → no flicker.
         ───────────────────────────────────── */

      // Leaf 1 inner — float only (no rotation conflict with parallax)
      gsap.to(leaf1InnerRef.current, {
        y: floatDist * -1,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.2,
      });

      // Leaf 2 inner — float only
      gsap.to(leaf2InnerRef.current, {
        y: floatDist * 1.15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });

      // Leaf 3 inner — float only
      gsap.to(leaf3InnerRef.current, {
        y: floatDist * 0.7,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.4,
      });

      // Hero image — subtle continuous float
      gsap.to(imageInnerRef.current, {
        y: isMobile ? -4 : -8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Scroll indicator line pulse
      const scrollLine = scrollIndRef.current?.querySelector('.scroll-line');
      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleY: 0.35,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      /* ─────────────────────────────────────
         3. SCROLL PARALLAX — ScrollTrigger
            Each layer at a different speed
            for cinematic layered depth
         ───────────────────────────────────── */
      const st = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: isMobile ? 1.5 : 1, // smoother on mobile
      };

      // Text block — slowest (depth front)
      gsap.to(textWrapRef.current, {
        y: parallaxDist * 0.5,
        ease: 'none',
        scrollTrigger: st,
      });

      // Hero image — medium speed
      gsap.to(imageWrapRef.current, {
        y: parallaxDist * 0.85,
        ease: 'none',
        scrollTrigger: st,
      });

      // Leaf 1 outer — parallax y + rotation (no float here, float is on inner)
      gsap.to(leaf1Ref.current, {
        y: parallaxDist * 1.4,
        rotation: isMobile ? 12 : 20,
        ease: 'none',
        scrollTrigger: st,
      });

      // Leaf 2 outer — parallax
      gsap.to(leaf2Ref.current, {
        y: parallaxDist * 1.7,
        rotation: isMobile ? -8 : -15,
        ease: 'none',
        scrollTrigger: st,
      });

      // Leaf 3 outer — parallax
      gsap.to(leaf3Ref.current, {
        y: parallaxDist * 1.1,
        rotation: isMobile ? 10 : 18,
        ease: 'none',
        scrollTrigger: st,
      });

      // Glow — fades out on scroll
      gsap.to([glowRef.current, glowRingRef.current], {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          ...st,
          end: 'center top',
        },
      });

      // Scroll indicator — fades out early
      gsap.to(scrollIndRef.current, {
        opacity: 0,
        y: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '15% top',
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Hero section — Spa Vibe, best luxury spa in Indore"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-linen)' }}
    >
      {/* ── Subtle background gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 75% 50%, rgba(232,198,193,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(221,183,175,0.08) 0%, transparent 60%),
            linear-gradient(180deg, var(--color-linen) 0%, var(--color-cream) 100%)
          `,
        }}
      />

      {/* ── Content container ── */}
      <div className="container-wide relative z-[5] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen pt-32 pb-16 lg:pt-28 lg:pb-12">

          {/* ═══ LEFT SIDE — Text ═══ */}
          <div
            ref={textWrapRef}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Label */}
            <span
              ref={labelRef}
              className="inline-flex items-center gap-2 mb-6 lg:mb-8"
              style={{ opacity: 0 }}
            >
              <span
                className="w-8 h-[1px]"
                style={{ backgroundColor: 'var(--color-rose)' }}
              />
              <span
                className="text-[11px] md:text-xs tracking-[0.3em] uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: 'var(--color-forest)',
                }}
              >
                Premium Wellness
              </span>
              <span
                className="w-8 h-[1px]"
                style={{ backgroundColor: 'var(--color-rose)' }}
              />
            </span>

            {/* Headline — each span animated as a separate child */}
            <h1 ref={headlineRef} style={{ opacity: 1 }}>
              <span
                className="block text-fluid-hero leading-[1.05] tracking-[-0.01em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  opacity: 0,
                }}
              >
                Renew.
              </span>
              <span
                className="block text-fluid-hero leading-[1.05] tracking-[-0.01em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-rose)',
                  opacity: 0,
                }}
              >
                Relax.
              </span>
              <span
                className="block text-fluid-hero leading-[1.05] tracking-[-0.01em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  opacity: 0,
                }}
              >
                Rebalance.
              </span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="mt-6 lg:mt-8 max-w-[420px] leading-[1.8]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 300,
                color: 'var(--color-warm-gray)',
                opacity: 0,
              }}
            >
              Experience premium spa therapies in Indore — designed to calm your body,
              refresh your skin, and restore your peace.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8 lg:mt-10"
              style={{ opacity: 0 }}
            >
              {/* Primary — CSS-only hover (no Framer Motion) */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn inline-flex items-center justify-center gap-2 rounded-full"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  backgroundColor: 'var(--color-charcoal)',
                  color: 'var(--color-linen)',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                Book Appointment
              </a>
            </div>
          </div>

          {/* ═══ RIGHT SIDE — Image Composition ═══ */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">

            {/* Glowing circle behind image */}
            <div
              ref={glowRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 'clamp(280px, 55vw, 480px)',
                height: 'clamp(280px, 55vw, 480px)',
                background: `radial-gradient(circle, rgba(232,198,193,0.35) 0%, rgba(221,183,175,0.15) 40%, transparent 70%)`,
                opacity: 0,
              }}
            />

            {/* Secondary glow ring */}
            <div
              ref={glowRingRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 'clamp(340px, 65vw, 560px)',
                height: 'clamp(340px, 65vw, 560px)',
                border: '1px solid rgba(232,198,193,0.12)',
                opacity: 0,
              }}
            />

            {/* Main spa image — GSAP scale reveal + continuous float */}
            <div
              ref={imageWrapRef}
              className="relative z-10"
              style={{
                width: 'clamp(280px, 50vw, 440px)',
                height: 'clamp(340px, 60vw, 540px)',
              }}
            >
              {/* Inner div driven by the float tween */}
              <div ref={imageInnerRef} className="relative w-full h-full">
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ borderRadius: '200px 200px 120px 120px' }}
                >
                  <Image
                    src="/images/hero/hero-man-spa.webp"
                    alt="Professional body massage therapy at Spa Vibe, the best luxury spa in Indore"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 440px"
                  />

                  {/* Soft overlay gradient at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(248,244,241,0.6) 0%, transparent 100%)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Floating Leaves (GSAP-driven) ── */}

            {/* Leaf 1 — Monstera top-right
                Mobile: z-[5] = behind image | Desktop: md:z-20 = cinematic foreground depth */}
            <div
              ref={leaf1Ref}
              className="absolute -top-4 -right-4 md:top-2 md:-right-8 lg:-right-12 z-[5] md:z-20"
              style={{ opacity: 0, willChange: 'transform' }}
              aria-hidden="true"
            >
              <div ref={leaf1InnerRef} style={{ willChange: 'transform' }}>
                <Image
                  src="/images/hero/leaf-monstera.webp"
                  alt="" width={140} height={140}
                  className="pointer-events-none select-none"
                  loading="lazy"
                  style={{ width: 'auto' }}
                />
              </div>
            </div>

            {/* Leaf 2 — Eucalyptus bottom-left
                Mobile: z-[5] = behind image | Desktop: md:z-20 */}
            <div
              ref={leaf2Ref}
              className="absolute -bottom-2 -left-6 md:-left-10 lg:-left-16 z-[5] md:z-20"
              style={{ opacity: 0, willChange: 'transform' }}
              aria-hidden="true"
            >
              <div ref={leaf2InnerRef} style={{ willChange: 'transform' }}>
                <Image
                  src="/images/hero/leaf-eucalyptus.webp"
                  alt="" width={100} height={120}
                  className="pointer-events-none select-none"
                  loading="lazy"
                  style={{ width: 'auto' }}
                />
              </div>
            </div>

            {/* Leaf 3 — Small accent bottom-right
                Always behind image for subtle background depth */}
            <div
              ref={leaf3Ref}
              className="absolute bottom-8 -right-2 md:bottom-12 md:-right-6 z-[3] rotate-45"
              style={{ opacity: 0, willChange: 'transform' }}
              aria-hidden="true"
            >
              <div ref={leaf3InnerRef} style={{ willChange: 'transform' }}>
                <Image
                  src="/images/hero/leaf-monstera.webp"
                  alt="" width={70} height={70}
                  className="pointer-events-none select-none"
                  loading="lazy"
                  style={{ width: 'auto' }}
                />
              </div>
            </div>

            {/* Decorative dot */}
            <div
              ref={dotRef}
              className="absolute top-16 -left-6 w-2 h-2 rounded-full pointer-events-none"
              style={{ backgroundColor: 'var(--color-rose)', opacity: 0 }}
            />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-stone)',
          }}
        >
          Scroll
        </span>
        <div
          className="scroll-line w-[1px] h-6 origin-top"
          style={{ backgroundColor: 'var(--color-rose)', opacity: 0.5 }}
        />
      </div>
    </section>
  );
}
