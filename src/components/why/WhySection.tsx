'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Feature data ── */
const LEFT_FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Professional Team',
    desc: 'Certified massage therapists trained in international wellness techniques — delivering the best body massage experience in Indore.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Personalized Wellness',
    desc: 'Bespoke spa therapy plans tailored to your unique body, mind, and wellness goals — from deep tissue to couple spa.',
  },
];

const RIGHT_FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Premium Therapies',
    desc: 'Curated luxury spa treatments including aromatherapy, full body massage, and facials using the finest organic oils.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Tranquil Environment',
    desc: 'A premium wellness sanctuary in Indore — designed to transport you far from the noise of everyday life.',
  },
];

/* ── Feature block sub-component ── */
function FeatureBlock({
  icon, title, desc, align,
}: {
  icon: React.ReactNode; title: string; desc: string; align: 'left' | 'right';
}) {
  return (
    <div
      className="why-feature-block"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        textAlign: align,
        flexDirection: align === 'right' ? 'row' : 'row',
        maxWidth: '340px',
      }}
    >
      {/* Icon circle */}
      <div style={{
        flexShrink: 0,
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'rgba(221,183,175,0.1)',
        borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s ease, transform 0.3s ease',
      }}>
        {icon}
      </div>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
          color: 'var(--color-charcoal)', margin: '0 0 6px',
          letterSpacing: '-0.01em', lineHeight: 1.2,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 300,
          fontSize: '13px', color: 'var(--color-warm-gray)',
          margin: 0, lineHeight: 1.65, letterSpacing: '0.01em',
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true } }
      );

      // Center image — scale reveal + float
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );

      // Subtle floating motion on image
      gsap.to(imageRef.current, {
        y: -8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      // Left features — stagger fade-up
      const leftItems = leftRef.current?.querySelectorAll('.why-feature-block');
      if (leftItems?.length) {
        gsap.fromTo(leftItems,
          { opacity: 0, x: -30, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.18,
            scrollTrigger: { trigger: leftRef.current, start: 'top 82%', once: true } }
        );
      }

      // Right features — stagger fade-up
      const rightItems = rightRef.current?.querySelectorAll('.why-feature-block');
      if (rightItems?.length) {
        gsap.fromTo(rightItems,
          { opacity: 0, x: 30, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.18, delay: 0.1,
            scrollTrigger: { trigger: rightRef.current, start: 'top 82%', once: true } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .why-feature-block:hover div:first-child {
          background: rgba(221,183,175,0.18) !important;
          transform: scale(1.08);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="why-us"
        style={{
          background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-linen) 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(60px, 8vw, 120px) 0',
        }}
      >
        {/* Subtle ambient glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 40% 40% at 15% 50%, rgba(221,183,175,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 85% 50%, rgba(221,183,175,0.06) 0%, transparent 70%)
          `,
        }} />

        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 60px)' }}>

          {/* ── Section heading ── */}
          <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)', opacity: 0 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 400,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'var(--color-forest)', marginBottom: '16px',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-rose)' }} />
              Our Promise
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-rose)' }} />
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--color-charcoal)', lineHeight: 1.1,
              letterSpacing: '-0.01em', margin: 0,
            }}>
              Why{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-rose)' }}>
                Spa Vibe
              </span>
            </h2>
          </div>

          {/* ── 3-column layout: Left features | Center Image | Right features ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 'clamp(20px, 3vw, 50px)',
            alignItems: 'center',
          }}>

            {/* ═══ LEFT FEATURES ═══ */}
            <div
              ref={leftRef}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(32px, 4vw, 56px)',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              {LEFT_FEATURES.map((f) => (
                <FeatureBlock key={f.title} icon={f.icon} title={f.title} desc={f.desc} align="left" />
              ))}
            </div>

            {/* ═══ CENTER IMAGE ═══ */}
            <div
              ref={imageRef}
              style={{
                position: 'relative',
                width: 'clamp(220px, 28vw, 400px)',
                height: 'clamp(280px, 36vw, 520px)',
                borderRadius: '999px',
                overflow: 'hidden',
                opacity: 0,
                boxShadow: '0 20px 60px rgba(221,183,175,0.15)',
              }}
            >
              {/* Soft rose glow behind */}
              <div style={{
                position: 'absolute', inset: '-20%',
                background: 'radial-gradient(circle, rgba(221,183,175,0.12) 0%, transparent 70%)',
                zIndex: 0, borderRadius: '50%',
              }} />

              <Image
                src="/images/why/spa-therapy-center.png"
                alt="Premium spa therapy center at Spa Vibe, best luxury wellness spa in Indore"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 1 }}
                sizes="(max-width: 768px) 220px, 400px"
                priority={false}
              />

              {/* Top + bottom gradient fade */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: `
                  linear-gradient(180deg, var(--color-cream) 0%, transparent 15%, transparent 85%, var(--color-linen) 100%)
                `,
              }} />
            </div>

            {/* ═══ RIGHT FEATURES ═══ */}
            <div
              ref={rightRef}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(32px, 4vw, 56px)',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {RIGHT_FEATURES.map((f) => (
                <FeatureBlock key={f.title} icon={f.icon} title={f.title} desc={f.desc} align="right" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
