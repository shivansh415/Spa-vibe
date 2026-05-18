'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WA_NUMBER = '919755500377';
const WA_MESSAGE = encodeURIComponent(`Hi! I\u2019d like to book a spa experience at Spa Vibe. \uD83C\uDF3F`);

export default function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLSpanElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLAnchorElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Ambient glow pulse ── */
      gsap.to(glowRef.current, {
        opacity: 0.65, scale: 1.12,
        duration: 3.2, ease: 'sine.inOut',
        yoyo: true, repeat: -1,
      });

      /* ── Content stagger reveal ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(headRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }, '-=0.3'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4'
      );

      /* ── Subtle floating on headline ── */
      gsap.to(headRef.current, {
        y: -6, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 44px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-cream);
          background: linear-gradient(135deg, #c9856a 0%, #b5705a 60%, #9a5a48 100%);
          box-shadow: 0 8px 32px rgba(185,112,90,0.35), 0 2px 8px rgba(185,112,90,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          border-radius: 999px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 48px rgba(185,112,90,0.45), 0 4px 16px rgba(185,112,90,0.25);
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:active { transform: translateY(-1px) scale(0.99); }

        .cta-wa-icon {
          width: 18px; height: 18px;
          flex-shrink: 0;
        }

        @keyframes cta-ring-pulse {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .cta-ring {
          position: absolute; inset: -12px;
          border-radius: 999px;
          border: 1px solid rgba(185,112,90,0.35);
          animation: cta-ring-pulse 2.4s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="cta"
        aria-label="Book your spa experience at Spa Vibe Indore"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, var(--color-linen) 0%, #f5ede6 45%, var(--color-cream) 100%)',
          padding: 'clamp(80px, 12vw, 160px) clamp(20px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        {/* ── Large ambient background glow ── */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(400px, 70vw, 800px)',
            height: 'clamp(400px, 70vw, 800px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(221,183,175,0.22) 0%, rgba(221,183,175,0.08) 50%, transparent 75%)',
            pointerEvents: 'none',
            opacity: 0.45,
          }}
        />

        {/* ── Decorative corner accents ── */}
        <div style={{
          position: 'absolute', top: '32px', left: '32px',
          width: '48px', height: '48px',
          borderTop: '1px solid rgba(185,112,90,0.25)',
          borderLeft: '1px solid rgba(185,112,90,0.25)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '32px', right: '32px',
          width: '48px', height: '48px',
          borderBottom: '1px solid rgba(185,112,90,0.25)',
          borderRight: '1px solid rgba(185,112,90,0.25)',
          pointerEvents: 'none',
        }} />

        {/* ── Content ── */}
        <div ref={contentRef} style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>

          {/* Decorative line */}
          <div
            ref={dividerRef}
            style={{
              width: '48px', height: '1px',
              background: 'var(--color-rose)',
              margin: '0 auto 24px',
              transformOrigin: 'center',
              transform: 'scaleX(0)',   /* initial state — GSAP will animate this */
            }}
          />

          {/* Tag line */}
          <span
            ref={tagRef}
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '10px', fontWeight: 400,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'var(--color-forest)',
              marginBottom: '24px',
              opacity: 0,
            }}
          >
            Begin Your Journey
          </span>

          {/* Main headline */}
          <h2
            ref={headRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              color: 'var(--color-charcoal)',
              margin: '0 0 24px',
              opacity: 0,
            }}
          >
            Ready To Relax Your{' '}
            <em style={{
              fontStyle: 'italic',
              fontWeight: 200,
              color: 'var(--color-rose)',
            }}>
              Mind &amp; Body?
            </em>
          </h2>

          {/* Sub text */}
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              fontWeight: 300,
              color: 'var(--color-warm-gray)',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              maxWidth: '520px',
              margin: '0 auto 48px',
              opacity: 0,
            }}
          >
            Step into Indore’s finest luxury spa experience. Our expert therapists are ready to
            craft your perfect escape — from body massage to couple spa, one breath at a time.
          </p>

          {/* CTA Button */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Pulsing ring */}
            <div className="cta-ring" />

            <a
              ref={btnRef}
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{ opacity: 0 }}
            >
              {/* WhatsApp icon */}
              <svg className="cta-wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book Your Experience
            </a>
          </div>

          {/* Fine print */}
          <p style={{
            marginTop: '24px',
            fontFamily: 'var(--font-body)',
            fontSize: '11px', fontWeight: 300,
            color: 'rgba(110,95,88,0.55)',
            letterSpacing: '0.04em',
          }}>
            No registration required · Instant WhatsApp confirmation
          </p>
        </div>
      </section>
    </>
  );
}
